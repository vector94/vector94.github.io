import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import BokehParticles from './BokehParticles'

function CountUp({ value, duration = 1500 }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [display, setDisplay] = useState('0')

  const isNum = !isNaN(parseFloat(value))
  const num = parseFloat(value)
  const suffix = isNum ? value.replace(/[\d.]/g, '') : ''
  const isDecimal = isNum && value.includes('.')

  useEffect(() => {
    if (!inView || !isNum) { setDisplay(value); return }
    const start = performance.now()
    function tick(now) {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const cur = num * eased
      setDisplay((isDecimal ? cur.toFixed(1) : Math.floor(cur)) + suffix)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, isNum, num, suffix, isDecimal, value, duration])

  return <span ref={ref}>{display}</span>
}

const STATS = [
  { val: '3.5+', label: 'Years Experience' },
  { val: '2000+', label: 'Problems Solved' },
  { val: 'Expert', label: 'on Codeforces' },
  { val: 'Knight', label: 'on LeetCode' },
]

const SOCIALS = [
  ['fa-linkedin', 'https://www.linkedin.com/in/md-asif-iqbal-ahmed/', 'LinkedIn'],
  ['fa-github',   'https://github.com/vector94',                       'GitHub'],
  ['fa-envelope', 'mailto:asif.ahmed9414@gmail.com',                   'Email'],
  ['fa-whatsapp', 'https://wa.me/46769786257',                         'WhatsApp'],
  ['fa-phone',    'tel:+46769786257',                                  'Phone'],
]

export default function About() {
  const sectionRef = useRef()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section className="section-wrap about-section" id="about" ref={sectionRef}>
      <BokehParticles />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="section-tag">Who I Am</span>
          <h2 className="section-title">About <span>Me</span></h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-img-wrap"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          >
            <div className="about-layer about-layer-1" />
            <div className="about-layer about-layer-2" />
            <motion.img
              src="/img/about.jpg"
              alt="Md Asif Iqbal Ahmed"
              style={{ y: imgY }}
            />
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          >
            <p className="about-subtitle">
              Master's Student · Software Engineer · Competitive Programmer
            </p>
            <p>I am currently pursuing a Master's degree in Software Engineering at Blekinge Institute of Technology in Sweden. I have 3.5+ years of professional experience in software development, working across backend systems, cloud infrastructure, and full stack projects.</p>
            <p>Competitive programming has been a big part of my journey. I have solved 2000+ problems across various online judges including Codeforces, LeetCode, UVa and others, participated in ICPC Dhaka Regional, and hold Expert rank on Codeforces and Knight rank on LeetCode.</p>
            <p>During my free time, I am a fitness enthusiast who has recently gotten more serious about powerlifting and now competes as a licensed athlete under swedish official federation.</p>

            <div className="about-stats">
              {STATS.map(({ val, label }, i) => (
                <motion.div
                  key={label}
                  className="about-stat"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.14 }}
                >
                  <span className="about-stat-val"><CountUp value={val} /></span>
                  <span className="about-stat-label">{label}</span>
                </motion.div>
              ))}
            </div>

            <div className="about-actions">
              <div className="about-social">
                {SOCIALS.map(([icon, href, label]) => (
                  <a key={label} href={href} aria-label={label} target="_blank" rel="noopener">
                    <i className={`fa ${icon}`} />
                  </a>
                ))}
              </div>
              <div className="about-cta">
                <a href="#contact" className="btn-primary" style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                  <i className="fa fa-envelope-o" /> Get In Touch
                </a>
                <a href="/assets/Resume_Md Asif Iqbal Ahmed.pdf" download className="btn-outline" style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                  <i className="fa fa-download" /> Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
