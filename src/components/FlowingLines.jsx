import { useEffect, useRef } from 'react'

export default function FlowingLines() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      buildLines()
    }

    let lines = []
    function buildLines() {
      const count = Math.max(6, Math.floor(canvas.width / 120))
      lines = Array.from({ length: count }, (_, i) => ({
        x: (canvas.width / (count + 1)) * (i + 1),
        droplets: Array.from({ length: 3 }, () => ({
          y:       Math.random() * canvas.height,
          speed:   0.4 + Math.random() * 0.8,
          length:  60  + Math.random() * 80,
          opacity: 0.25 + Math.random() * 0.35,
        })),
      }))
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

      lines.forEach(line => {
        ctx.beginPath()
        ctx.moveTo(line.x, 0)
        ctx.lineTo(line.x, canvas.height)
        ctx.strokeStyle = `rgba(${rgb},0.04)`
        ctx.lineWidth = 1
        ctx.stroke()

        line.droplets.forEach(drop => {
          drop.y += drop.speed
          if (drop.y > canvas.height + drop.length) drop.y = -drop.length

          const grad = ctx.createLinearGradient(line.x, drop.y - drop.length, line.x, drop.y)
          grad.addColorStop(0,   `rgba(${rgb},0)`)
          grad.addColorStop(0.5, `rgba(${rgb},${drop.opacity})`)
          grad.addColorStop(1,   `rgba(${rgb},0)`)

          ctx.beginPath()
          ctx.moveTo(line.x, drop.y - drop.length)
          ctx.lineTo(line.x, drop.y)
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.5
          ctx.stroke()
        })
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="section-canvas-bg" />
}
