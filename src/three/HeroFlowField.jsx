import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js'
import { useThemeColors, isSmallScreen, prefersReducedMotion } from './useThemeColors'

const BOUNDS = { x: 8.5, y: 4.6, z: 2.2 }
const NOISE_FREQ = 0.24
const NOISE_EPS = 0.35
const FLOW_SPEED = 1.15
const MOUSE_RADIUS = 2.4
const STREAK_LEN = 0.55

function makeGlowTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.55)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

/*
 * The handle is "vector94" — so the hero is literally a vector field:
 * every particle is drawn as a streak along its velocity (a vector),
 * advected by divergence-free curl noise, with a vortex around the cursor.
 */
function FlowParticles() {
  const pointsRef = useRef()
  const linesRef = useRef()
  const colors = useThemeColors()
  const reduced = useMemo(prefersReducedMotion, [])
  const count = useMemo(() => (isSmallScreen() ? 1800 : 4200), [])
  const noise = useMemo(() => new ImprovedNoise(), [])
  const glowTex = useMemo(makeGlowTexture, [])
  const { viewport } = useThree()

  const buffers = useMemo(() => {
    const headPos = new Float32Array(count * 3)      // glow sprite per particle
    const headCol = new Float32Array(count * 3)
    const linePos = new Float32Array(count * 2 * 3)  // head + tail vertex
    const lineCol = new Float32Array(count * 2 * 3)
    const mix = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      headPos[i * 3] = (Math.random() * 2 - 1) * BOUNDS.x
      headPos[i * 3 + 1] = (Math.random() * 2 - 1) * BOUNDS.y
      headPos[i * 3 + 2] = (Math.random() * 2 - 1) * BOUNDS.z
      mix[i] = Math.random()
    }
    return { headPos, headCol, linePos, lineCol, mix }
  }, [count])

  // Refill color buffers whenever the theme flips.
  // Line tails fade toward the color's dark end so streaks taper off.
  useEffect(() => {
    const { headCol, lineCol, mix } = buffers
    const c1 = new THREE.Color(colors.accent1)
    const c2 = new THREE.Color(colors.accent2)
    const c = new THREE.Color()
    const tailScale = colors.isDay ? 0.75 : 0.12
    for (let i = 0; i < count; i++) {
      c.lerpColors(c1, c2, buffers.mix[i])
      headCol[i * 3] = c.r
      headCol[i * 3 + 1] = c.g
      headCol[i * 3 + 2] = c.b
      // head vertex
      lineCol[i * 6] = c.r
      lineCol[i * 6 + 1] = c.g
      lineCol[i * 6 + 2] = c.b
      // tail vertex
      lineCol[i * 6 + 3] = c.r * tailScale
      lineCol[i * 6 + 4] = c.g * tailScale
      lineCol[i * 6 + 5] = c.b * tailScale
    }
    if (pointsRef.current) pointsRef.current.geometry.attributes.color.needsUpdate = true
    if (linesRef.current) linesRef.current.geometry.attributes.color.needsUpdate = true
  }, [colors, count, buffers])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05) * (reduced ? 0.25 : 1)
    const t = state.clock.elapsedTime * 0.09
    const { headPos, linePos } = buffers

    const mx = (state.pointer.x * viewport.width) / 2
    const my = (state.pointer.y * viewport.height) / 2

    const f = NOISE_FREQ
    const e = NOISE_EPS
    for (let i = 0; i < count; i++) {
      const ix = i * 3
      let x = headPos[ix]
      let y = headPos[ix + 1]
      let z = headPos[ix + 2]

      // Divergence-free 2D flow: v = rot90(grad n)
      let vx = (noise.noise(x * f, (y + e) * f, t) - noise.noise(x * f, (y - e) * f, t)) / (2 * e)
      let vy = -(noise.noise((x + e) * f, y * f, t) - noise.noise((x - e) * f, y * f, t)) / (2 * e)
      let vz = 0.25 * noise.noise(x * f + 31.4, y * f + 47.2, t + 12.7)

      // Cursor vortex: swirl + gentle push away
      if (!reduced) {
        const dx = x - mx
        const dy = y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS && dist > 0.001) {
          const s = 1 - dist / MOUSE_RADIUS
          const inv = 1 / dist
          vx += -dy * inv * s * 2.6 + dx * inv * s * 1.1
          vy += dx * inv * s * 2.6 + dy * inv * s * 1.1
        }
      }

      x += vx * FLOW_SPEED * dt
      y += vy * FLOW_SPEED * dt
      z += vz * FLOW_SPEED * dt

      // Wrap at the bounds so the field never empties
      if (x > BOUNDS.x) x = -BOUNDS.x; else if (x < -BOUNDS.x) x = BOUNDS.x
      if (y > BOUNDS.y) y = -BOUNDS.y; else if (y < -BOUNDS.y) y = BOUNDS.y
      if (z > BOUNDS.z) z = -BOUNDS.z; else if (z < -BOUNDS.z) z = BOUNDS.z

      headPos[ix] = x
      headPos[ix + 1] = y
      headPos[ix + 2] = z

      // Streak: head at the particle, tail trailing against velocity
      const speed = Math.sqrt(vx * vx + vy * vy + vz * vz) || 1
      const len = STREAK_LEN * Math.min(speed, 1.6)
      const lx = i * 6
      linePos[lx] = x
      linePos[lx + 1] = y
      linePos[lx + 2] = z
      linePos[lx + 3] = x - (vx / speed) * len
      linePos[lx + 4] = y - (vy / speed) * len
      linePos[lx + 5] = z - (vz / speed) * len
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    linesRef.current.geometry.attributes.position.needsUpdate = true
  })

  const blending = colors.isDay ? THREE.NormalBlending : THREE.AdditiveBlending

  return (
    <group>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count * 2} array={buffers.linePos} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count * 2} array={buffers.lineCol} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={colors.isDay ? 0.5 : 0.55}
          depthWrite={false}
          blending={blending}
        />
      </lineSegments>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={buffers.headPos} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={buffers.headCol} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          map={glowTex}
          vertexColors
          size={colors.isDay ? 0.085 : 0.075}
          sizeAttenuation
          transparent
          opacity={colors.isDay ? 0.65 : 0.85}
          depthWrite={false}
          blending={blending}
        />
      </points>
    </group>
  )
}

function CameraRig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.04
    camera.position.y += (pointer.y * 0.9 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroFlowField() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={55} />
      <FlowParticles />
      <CameraRig />
    </>
  )
}
