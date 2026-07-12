import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Text, Billboard } from '@react-three/drei'
import { useThemeColors, isSmallScreen, prefersReducedMotion, LABEL_FONT } from './useThemeColors'

const R = 1.6
// Karlskrona, Sweden
const HOME = { lat: 56.16, lon: 15.59 }

function latLonToVec3(lat, lon, r = R) {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lon + 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

/*
 * "Based in Karlskrona, reachable worldwide": a dotted wireframe globe,
 * a pulsing marker on Sweden, and connection arcs from around the world
 * landing on it.
 */
export default function ContactGlobe() {
  const colors = useThemeColors()
  const small = useMemo(isSmallScreen, [])
  const reduced = useMemo(prefersReducedMotion, [])
  const groupRef = useRef()
  const pulseRef = useRef()
  const arcRefs = useRef([])

  const home = useMemo(() => latLonToVec3(HOME.lat, HOME.lon), [])
  // ring lies tangent to the sphere at the marker
  const homeQuat = useMemo(
    () =>
      new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        home.clone().normalize()
      ),
    [home]
  )

  // Fibonacci-sphere dot shell
  const dotPositions = useMemo(() => {
    const n = small ? 500 : 900
    const arr = new Float32Array(n * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2
      const rad = Math.sqrt(1 - y * y)
      const theta = golden * i
      arr[i * 3] = Math.cos(theta) * rad * R
      arr[i * 3 + 1] = y * R
      arr[i * 3 + 2] = Math.sin(theta) * rad * R
    }
    return arr
  }, [small])

  // Arcs from world cities to home
  const arcs = useMemo(() => {
    const cities = [
      { lat: 23.81, lon: 90.41 },   // Dhaka
      { lat: 37.77, lon: -122.42 }, // San Francisco
      { lat: 35.68, lon: 139.69 },  // Tokyo
      { lat: 51.5, lon: -0.13 },    // London
      { lat: -33.87, lon: 151.21 }, // Sydney
      { lat: 40.71, lon: -74.0 },   // New York
    ]
    return cities.map((c, i) => {
      const from = latLonToVec3(c.lat, c.lon)
      const mid = from
        .clone()
        .add(home)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(R * 1.45)
      const curve = new THREE.QuadraticBezierCurve3(from, mid, home)
      const geo = new THREE.TubeGeometry(curve, 60, 0.012, 6, false)
      return { geo, from, offset: i / cities.length, total: geo.index.count }
    })
  }, [home])

  useFrame((state, delta) => {
    const g = groupRef.current
    if (g && !reduced) {
      g.rotation.y += delta * 0.12
      // gentle tilt toward the pointer
      const tx = state.pointer.y * 0.15
      g.rotation.x += (tx - g.rotation.x) * 0.03
    }
    if (pulseRef.current) {
      const s = 1 + 0.55 * (0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 2.4))
      pulseRef.current.scale.setScalar(s)
      pulseRef.current.material.opacity = 0.9 - (s - 1) * 1.2
    }
    const t = state.clock.elapsedTime * 0.14
    arcRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const phase = (t + arcs[i].offset) % 1
      const grow = Math.min(phase / 0.55, 1)
      mesh.geometry.setDrawRange(0, Math.floor(arcs[i].total * grow))
      mesh.material.opacity = phase < 0.55 ? 0.85 : Math.max(0, 0.85 * (1 - (phase - 0.55) / 0.35))
    })
  })

  const blending = colors.isDay ? THREE.NormalBlending : THREE.AdditiveBlending

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.3, small ? 5.6 : 4.6]} fov={50} />

      <group ref={groupRef} rotation={[0.25, 2.4, 0]}>
        {/* dot shell */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={dotPositions.length / 3}
              array={dotPositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color={colors.line}
            size={0.028}
            sizeAttenuation
            transparent
            opacity={colors.isDay ? 0.5 : 0.45}
            depthWrite={false}
          />
        </points>

        {/* sparse wireframe */}
        <mesh>
          <sphereGeometry args={[R, 18, 12]} />
          <meshBasicMaterial
            color={colors.line}
            wireframe
            transparent
            opacity={colors.isDay ? 0.1 : 0.08}
            depthWrite={false}
          />
        </mesh>

        {/* connection arcs */}
        {arcs.map((arc, i) => (
          <group key={i}>
            <mesh ref={el => (arcRefs.current[i] = el)} geometry={arc.geo}>
              <meshBasicMaterial
                color={colors.accent2}
                transparent
                opacity={0}
                depthWrite={false}
                blending={blending}
              />
            </mesh>
            <mesh position={arc.from}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color={colors.accent2} transparent opacity={0.9} />
            </mesh>
          </group>
        ))}

        {/* home marker */}
        <group position={home}>
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color={colors.accent1} />
          </mesh>
          <mesh ref={pulseRef} quaternion={homeQuat}>
            <ringGeometry args={[0.1, 0.13, 40]} />
            <meshBasicMaterial
              color={colors.accent1}
              transparent
              opacity={0.9}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          <Billboard>
            <Text
              font={LABEL_FONT}
              position={[0, 0.28, 0]}
              fontSize={0.17}
              color={colors.isDay ? '#0f172a' : '#ffffff'}
              anchorX="center"
              anchorY="bottom"
              outlineWidth={0.007}
              outlineColor={colors.isDay ? '#fafafa' : '#0a0a0a'}
            >
              Karlskrona
            </Text>
          </Billboard>
        </group>
      </group>
    </>
  )
}
