import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Text, Billboard } from '@react-three/drei'
import { useThemeColors, isSmallScreen, prefersReducedMotion, LABEL_FONT } from './useThemeColors'

const HUB_RADIUS = 3.2
const SAT_RADIUS = 1.3
const IDLE_SPIN = 0.12

/*
 * Skills as a constellation: category hubs on a tilted ring, top
 * technologies orbiting each hub, everything connected like a
 * knowledge graph. Drag to rotate, with inertia.
 */
export default function SkillConstellation({ categories, highlight = null, onHubHover }) {
  const colors = useThemeColors()
  const small = useMemo(isSmallScreen, [])
  const reduced = useMemo(prefersReducedMotion, [])

  const { hubs, sats, linePositions } = useMemo(() => {
    const hubs = []
    const sats = []
    const pts = []
    const n = categories.length

    const up = new THREE.Vector3(0, 1, 0)
    categories.forEach((cat, i) => {
      const angle = (i / n) * Math.PI * 2
      const pos = new THREE.Vector3(
        Math.cos(angle) * HUB_RADIUS,
        Math.sin(angle * 2) * 0.55,
        Math.sin(angle) * HUB_RADIUS
      )
      hubs.push({ title: cat.title, pos, even: i % 2 === 0 })

      // Fan satellites outward from the ring so labels never pile
      // up in the middle of the constellation
      const out = pos.clone().normalize()
      const v1 = new THREE.Vector3().crossVectors(out, up).normalize()
      const v2 = new THREE.Vector3().crossVectors(out, v1).normalize()
      const tags = cat.tags.slice(0, small ? 3 : 4)
      tags.forEach((tag, j) => {
        const a = (j / tags.length) * Math.PI * 2 + i
        const dir = out
          .clone()
          .multiplyScalar(1.0)
          .addScaledVector(v1, Math.cos(a) * 0.85)
          .addScaledVector(v2, Math.sin(a) * 0.85)
          .normalize()
        const sp = pos.clone().addScaledVector(dir, SAT_RADIUS)
        sats.push({ label: tag, pos: sp })
        pts.push(pos, sp)
      })
    })

    // constellation ring between hubs
    for (let i = 0; i < n; i++) pts.push(hubs[i].pos, hubs[(i + 1) % n].pos)

    const linePositions = new Float32Array(pts.length * 3)
    pts.forEach((p, i) => p.toArray(linePositions, i * 3))
    return { hubs, sats, linePositions }
  }, [categories, small])

  const groupRef = useRef()
  const velRef = useRef({ x: 0, y: IDLE_SPIN })
  const draggingRef = useRef(false)
  const lastRef = useRef({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(null)

  const onPointerDown = useCallback(e => {
    draggingRef.current = true
    lastRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  useEffect(() => {
    function onMove(e) {
      if (!draggingRef.current) return
      const dx = e.clientX - lastRef.current.x
      const dy = e.clientY - lastRef.current.y
      lastRef.current = { x: e.clientX, y: e.clientY }
      const g = groupRef.current
      if (!g) return
      g.rotation.y += dx * 0.006
      g.rotation.x = THREE.MathUtils.clamp(g.rotation.x + dy * 0.004, -0.55, 0.55)
      velRef.current.y = dx * 0.25
      velRef.current.x = dy * 0.12
    }
    function onUp() { draggingRef.current = false }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  useFrame((_, delta) => {
    const g = groupRef.current
    if (!g || draggingRef.current) return
    const vel = velRef.current
    const idle = reduced ? 0 : IDLE_SPIN
    vel.y += (idle - vel.y) * 0.02
    vel.x *= 0.94
    g.rotation.y += vel.y * delta
    g.rotation.x = THREE.MathUtils.clamp(g.rotation.x + vel.x * delta, -0.55, 0.55)
  })

  const hubColor = i => (hubs[i].even ? colors.accent1 : colors.accent2)
  const textColor = colors.isDay ? '#0f172a' : '#ffffff'
  const satTextColor = colors.isDay ? '#334155' : '#cbd5e1'
  // a hub lights up from 3D pointer hover OR from hovering its bento card
  const active = hovered !== null ? hovered : highlight

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.4, small ? 10.6 : 7.4]} fov={46} />

      <group ref={groupRef}>
        {/* invisible drag surface */}
        <mesh visible={false} onPointerDown={onPointerDown}>
          <sphereGeometry args={[4.6, 12, 12]} />
        </mesh>

        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={linePositions.length / 3}
              array={linePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={colors.line}
            transparent
            opacity={colors.isDay ? 0.4 : 0.55}
            depthWrite={false}
            blending={colors.isDay ? THREE.NormalBlending : THREE.AdditiveBlending}
          />
        </lineSegments>

        {hubs.map((hub, i) => (
          <group key={hub.title} position={hub.pos}>
            <mesh
              onPointerOver={() => { setHovered(i); onHubHover?.(i) }}
              onPointerOut={() => {
                setHovered(h => (h === i ? null : h))
                onHubHover?.(null)
              }}
              scale={active === i ? 1.45 : 1}
            >
              <sphereGeometry args={[0.17, 24, 24]} />
              <meshBasicMaterial color={hubColor(i)} />
            </mesh>
            {/* halo */}
            <mesh scale={active === i ? 2.6 : 1.9}>
              <sphereGeometry args={[0.17, 16, 16]} />
              <meshBasicMaterial
                color={hubColor(i)}
                transparent
                opacity={0.22}
                depthWrite={false}
              />
            </mesh>
            <Billboard>
              <Text
                font={LABEL_FONT}
                position={[0, 0.34, 0]}
                fontSize={0.27}
                color={active === i ? hubColor(i) : textColor}
                anchorX="center"
                anchorY="bottom"
                outlineWidth={0.008}
                outlineColor={colors.isDay ? '#fafafa' : '#0a0a0a'}
              >
                {hub.title}
              </Text>
            </Billboard>
          </group>
        ))}

        {sats.map(sat => (
          <group key={sat.label} position={sat.pos}>
            <mesh>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshBasicMaterial color={colors.line} transparent opacity={0.85} />
            </mesh>
            <Billboard>
              <Text
                font={LABEL_FONT}
                position={[0, 0.13, 0]}
                fontSize={0.16}
                color={satTextColor}
                anchorX="center"
                anchorY="bottom"
                outlineWidth={0.006}
                outlineColor={colors.isDay ? '#fafafa' : '#0a0a0a'}
              >
                {sat.label}
              </Text>
            </Billboard>
          </group>
        ))}
      </group>
    </>
  )
}
