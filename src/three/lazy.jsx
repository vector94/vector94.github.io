import { lazy, Suspense } from 'react'

/*
 * Lazy boundary for the entire 3D stack (~250 KB gzipped of three +
 * r3f + drei). The page paints instantly; scenes stream in right after
 * and fade in via the .scene-canvas CSS animation.
 */
const load = () => import('./views')

const make = name => {
  const Comp = lazy(() => load().then(m => ({ default: m[name] })))
  return function Lazy3D(props) {
    return (
      <Suspense fallback={null}>
        <Comp {...props} />
      </Suspense>
    )
  }
}

export const SceneCanvas3D = make('SceneCanvas')
export const Hero3D = make('HeroView')
export const Constellation3D = make('ConstellationView')
export const Globe3D = make('GlobeView')
