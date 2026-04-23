import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const CARDS = [
  { icon: 'fa-map-marker', label: 'Location', value: 'Kolonivägen 1F, 371 54\nKarlskrona, Sweden' },
  { icon: 'fa-envelope',   label: 'Email',    value: 'asif.ahmed9414@gmail.com' },
  { icon: 'fa-phone',      label: 'Phone',    value: '(+46) 769786257' },
]

const SOCIALS = [
  ['fa-linkedin',  'https://www.linkedin.com/in/md-asif-iqbal-ahmed/', 'LinkedIn'],
  ['fa-github',    'https://github.com/vector94',                        'GitHub'],
  ['fa-facebook',  'https://www.facebook.com/asif.ahmed181/',            'Facebook'],
  ['fa-instagram', 'https://www.instagram.com/asif_ahmed181/',           'Instagram'],
  ['fa-whatsapp',  'https://wa.link/5srvtl',                             'WhatsApp'],
  ['fa-telegram',  'https://t.me/vector944',                             'Telegram'],
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
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r:  Math.random() * 1.8 + 0.6,
        a:  Math.random() * 0.5 + 0.15,
      })
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(124,58,237,${p.a})`
        ctx.fill()
      })

      // draw faint connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - dist / 110)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="contact-particles" />
}

export default function Contact() {
  return (
    <section className="section-wrap contact-section" id="contact">
      <ParticleCanvas />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Say Hello</span>
          <h2 className="section-title">Get In <span>Touch</span></h2>
        </motion.div>

        <div className="contact-grid">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              className="contact-card glass"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="contact-icon">
                <i className={`fa ${card.icon}`} />
              </div>
              <div className="contact-label">{card.label}</div>
              <div className="contact-value" style={{ whiteSpace: 'pre-line' }}>
                {card.value}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="contact-social"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {SOCIALS.map(([icon, href, label]) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener"
              whileHover={{ y: -4, scale: 1.1 }}
              transition={{ duration: 0.18 }}
            >
              <i className={`fa ${icon}`} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
