import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const SOCIALS = [
  { icon: 'fa-linkedin', href: 'https://www.linkedin.com/in/md-asif-iqbal-ahmed/', label: 'LinkedIn' },
  { icon: 'fa-github',   href: 'https://github.com/vector94',                       label: 'GitHub' },
  { icon: 'fa-envelope', href: 'mailto:asif.ahmed9414@gmail.com',                   label: 'Email' },
  { icon: 'fa-whatsapp', href: 'https://wa.me/46769786257',                         label: 'WhatsApp' },
  { icon: 'fa-phone',    href: 'tel:+46769786257',                                  label: 'Phone' },
]

function ParticleCanvas() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let particles = []

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 14000))
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        a: Math.random() * 0.45 + 0.15,
      })
    }

    function getAccentRgb() {
      const isDay = document.documentElement.getAttribute('data-theme') === 'day'
      return isDay ? '91,33,182' : '124,58,237'
    }

    function draw() {
      const rgb = getAccentRgb()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${p.a})`
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${rgb},${0.1 * (1 - d / 110)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="contact-particles" />
}

export default function Contact() {
  return (
    <section className="section-wrap contact-section" id="contact">
      <ParticleCanvas />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="contact-hero-text"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">Say Hello</span>
          <h2 className="contact-heading">
            Let's Build<br /><span>Something</span>
          </h2>
          <p className="contact-sub">
            Open to opportunities, collaborations, and interesting conversations.
          </p>
          <div className="contact-meta">
            <span><i className="fa fa-map-marker" /> Karlskrona, Sweden</span>
            <a href="mailto:asif.ahmed9414@gmail.com">
              <i className="fa fa-envelope" /> asif.ahmed9414@gmail.com
            </a>
          </div>
        </motion.div>

        <motion.div
          className="contact-pills"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {SOCIALS.map(({ icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              className="contact-pill glass"
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }}
              whileHover={{ y: -4, scale: 1.05 }}
            >
              <i className={`fa ${icon}`} />
              <span>{label}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
