import { View } from '@react-three/drei'
import HeroFlowField from './HeroFlowField'
import SkillConstellation from './SkillConstellation'
import ContactGlobe from './ContactGlobe'

/*
 * Every drei/three import used by page sections funnels through this
 * module so the whole 3D stack loads in one lazy chunk (see lazy.jsx).
 * Sections must never import from three/@react-three directly.
 */
export { default as SceneCanvas } from './SceneCanvas'

export function HeroView() {
  return (
    <View className="section-3d-view" aria-hidden="true">
      <HeroFlowField />
    </View>
  )
}

export function ConstellationView({ highlight, onHubHover, categories }) {
  return (
    <View className="section-3d-view" aria-hidden="true">
      <SkillConstellation
        categories={categories}
        highlight={highlight}
        onHubHover={onHubHover}
      />
    </View>
  )
}

export function GlobeView() {
  return (
    <View className="section-3d-view" aria-hidden="true">
      <ContactGlobe />
    </View>
  )
}
