import { useEffect, useRef } from 'react'

export default function BokehParticles({ intensity = 1 }) {
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

    const orbs = Array.from({ length: 14 }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      r:       30 + Math.random() * 55,
      vx:      (Math.random() - 0.5) * 0.15,
      vy:      (Math.random() - 0.5) * 0.15,
      phase:   Math.random() * Math.PI * 2,
      speed:   0.003 + Math.random() * 0.005,
      opacity: 0.1 + Math.random() * 0.12,
    }))

    function getAccentRgb() {
      const isDay = document.documentElement.getAttribute('data-theme') === 'day'
      return isDay ? '159,18,57' : '225,29,72'
    }

    function draw() {
      const rgb = getAccentRgb()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      orbs.forEach(orb => {
        orb.x += orb.vx
        orb.y += orb.vy
        orb.phase += orb.speed
        if (orb.x < -orb.r * 2) orb.x = canvas.width  + orb.r
        if (orb.x > canvas.width  + orb.r * 2) orb.x = -orb.r
        if (orb.y < -orb.r * 2) orb.y = canvas.height + orb.r
        if (orb.y > canvas.height + orb.r * 2) orb.y = -orb.r

        const pulse = ((Math.sin(orb.phase) + 1) / 2) * orb.opacity * intensity
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r)
        grad.addColorStop(0,   `rgba(${rgb},${pulse})`)
        grad.addColorStop(0.5, `rgba(${rgb},${pulse * 0.4})`)
        grad.addColorStop(1,   `rgba(${rgb},0)`)

        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="section-canvas-bg" />
}
