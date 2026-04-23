import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef()

  useEffect(() => {
    let raf
    const target = { x: -600, y: -600 }
    const current = { x: -600, y: -600 }

    function onMove(e) {
      target.x = e.clientX
      target.y = e.clientY
    }

    function tick() {
      current.x += (target.x - current.x) * 0.07
      current.y += (target.y - current.y) * 0.07
      if (ref.current) {
        ref.current.style.transform = `translate(${current.x - 200}px, ${current.y - 200}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
