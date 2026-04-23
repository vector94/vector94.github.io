import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

function TorusKnot() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.9}>
      <group>
        <mesh>
          <torusKnotGeometry args={[1, 0.32, 220, 32]} />
          <meshPhysicalMaterial
            color="#e11d48"
            emissive="#e11d48"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.08}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh scale={1.045}>
          <torusKnotGeometry args={[1, 0.32, 220, 32]} />
          <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.12} />
        </mesh>
      </group>
    </Float>
  )
}

function ParticleField() {
  const ref = useRef()
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 500 : 1400

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 4 + Math.random() * 14
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.022
    ref.current.rotation.x = clock.elapsedTime * 0.013
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color="#e11d48" transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

function CameraRig() {
  useFrame(({ camera, mouse }) => {
    camera.position.x += (mouse.x * 1.8 - camera.position.x) * 0.04
    camera.position.y += (mouse.y * 1.2 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]}   color="#e11d48" intensity={2} />
      <pointLight position={[-6, -6, -6]} color="#f97316" intensity={1.2} />
      <pointLight position={[0, 4, 4]}   color="#ffffff"  intensity={0.6} />
      <TorusKnot />
      <ParticleField />
      <CameraRig />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          intensity={0.8}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}
