import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'

/*
 * Single shared WebGL context for every 3D section.
 * Each section renders a <View> div; pixels are scissored onto this
 * fixed canvas, so we never pay for multiple GL contexts.
 */
export default function SceneCanvas() {
  return (
    <Canvas
      className="scene-canvas"
      flat
      eventSource={document.getElementById('root')}
      eventPrefix="client"
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.75]}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <View.Port />
    </Canvas>
  )
}
