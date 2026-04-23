import { useEffect, useRef } from 'react'

export default function GlowingGrid() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let dots = []
    const SPACING = 52

    function buildDots() {
      dots = []
      const cols = Math.ceil(canvas.width  / SPACING) + 1
      const rows = Math.ceil(canvas.height / SPACING) + 1
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x:          i * SPACING,
            y:          j * SPACING,
            phase:      Math.random() * Math.PI * 2,
            speed:      0.004 + Math.random() * 0.008,
            maxOpacity: 0.2 + Math.random() * 0.3,
          })
        }
      }
    }

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      buildDots()
    }
    resize()
    window.addEventListener('resize', resize)

    function getAccentRgb() {
      const isDay = document.documentElement.getAttribute('data-theme') === 'day'
      return isDay ? '91,33,182' : '124,58,237'
    }

    function draw() {
      const rgb = getAccentRgb()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      dots.forEach(dot => {
        dot.phase += dot.speed
        const opacity = ((Math.sin(dot.phase) + 1) / 2) * dot.maxOpacity
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${opacity})`
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="section-canvas-bg" />
}
