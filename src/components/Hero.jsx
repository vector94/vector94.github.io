import { motion, useScroll, useTransform } from 'framer-motion'
import { useTyped } from '../hooks/useTyped'
import { Hero3D } from '../three/lazy'
import { TYPED_STRINGS, SOCIALS } from '../data/profile'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.35 } },
}

const item = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: 'easeOut' } },
}

export default function Hero() {
  const typed = useTyped(TYPED_STRINGS)
  const { scrollY } = useScroll()
  const exitOpacity = useTransform(scrollY, [0, 550], [1, 0])
  const exitY = useTransform(scrollY, [0, 550], [0, -110])
  const indicatorOpacity = useTransform(scrollY, [0, 180], [1, 0])

  return (
    <section className="hero" id="hero">
      <Hero3D />

      <motion.div className="hero-overlay" style={{ opacity: exitOpacity, y: exitY }}>
        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero-welcome" variants={item}>
            Welcome to my portfolio
          </motion.p>

          <motion.h1 className="hero-name" variants={item}>
            Md Asif Iqbal Ahmed
          </motion.h1>

          <motion.p className="hero-typed" variants={item}>
            I am a <span className="typed-text">{typed}</span>
            <span className="typed-cursor">|</span>
          </motion.p>

          <motion.div className="hero-social" variants={item}>
            {SOCIALS.map(({ icon, href, label }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noopener">
                <i className={`fa ${icon}`} />
              </a>
            ))}
          </motion.div>

          <motion.div className="hero-cta" variants={item}>
            <a href="#gallery" className="btn-primary">
              <i className="fa fa-th" /> View Gallery
            </a>
            <a href="#contact" className="btn-outline">
              <i className="fa fa-envelope-o" /> Contact Me
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div className="scroll-indicator" style={{ opacity: indicatorOpacity }}>
        <div className="scroll-mouse" />
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}
