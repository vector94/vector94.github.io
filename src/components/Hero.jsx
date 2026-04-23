import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { useTyped } from '../hooks/useTyped'
import Scene from './Scene'

const TYPED_STRINGS = [
  'Software Engineer',
  'Competitive Programmer',
  'Backend Developer',
]

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

  return (
    <section className="hero" id="hero">
      <Canvas
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <div className="hero-overlay">
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
            {[
              ['fa-linkedin', 'https://www.linkedin.com/in/md-asif-iqbal-ahmed/', 'LinkedIn'],
              ['fa-github',   'https://github.com/vector94',                       'GitHub'],
              ['fa-envelope', 'mailto:asif.ahmed9414@gmail.com',                   'Email'],
              ['fa-whatsapp', 'https://wa.me/46769786257',                         'WhatsApp'],
              ['fa-phone',    'tel:+46769786257',                                  'Phone'],
            ].map(([icon, href, label]) => (
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
      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
