import { useEffect, useRef } from 'react'

const SYMBOLS = ['{}', '()', '<>', '=>', '[]', '/*', '#', '@', '++', '&&', '||', '===', '>>', '::']

export default function FloatingSymbols() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = 22
    const symbols = Array.from({ length: count }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      vx:      (Math.random() - 0.5) * 0.25,
      vy:      (Math.random() - 0.5) * 0.25,
      symbol:  SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      size:    16 + Math.random() * 14,
      opacity: 0.18 + Math.random() * 0.18,
    }))

    function getAccentRgb() {
      const isDay = document.documentElement.getAttribute('data-theme') === 'day'
      return isDay ? '91,33,182' : '124,58,237'
    }

    function draw() {
      const rgb = getAccentRgb()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      symbols.forEach(s => {
        s.x += s.vx
        s.y += s.vy
        if (s.x < -60) s.x = canvas.width + 60
        if (s.x > canvas.width  + 60) s.x = -60
        if (s.y < -60) s.y = canvas.height + 60
        if (s.y > canvas.height + 60) s.y = -60

        ctx.font = `${s.size}px monospace`
        ctx.fillStyle = `rgba(${rgb},${s.opacity})`
        ctx.fillText(s.symbol, s.x, s.y)
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="section-canvas-bg" />
}
