import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { useTyped } from '../hooks/useTyped'
import Scene from './Scene'

const TYPED_STRINGS = [
  'Software Engineer',
  'Competitive Programmer',
  'Backend Developer',
  'System Designer',
  'Powerlifter',
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const item = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
}

export default function Hero() {
  const typed = useTyped(TYPED_STRINGS)

  return (
    <section className="hero" id="hero">
      {/* Full-screen Three.js canvas */}
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

      {/* Text overlay */}
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
              ['fa-linkedin',  'https://www.linkedin.com/in/md-asif-iqbal-ahmed/', 'LinkedIn'],
              ['fa-github',    'https://github.com/vector94',                        'GitHub'],
              ['fa-facebook',  'https://www.facebook.com/asif.ahmed181/',             'Facebook'],
              ['fa-instagram', 'https://www.instagram.com/asif_ahmed181/',            'Instagram'],
              ['fa-whatsapp',  'https://wa.link/5srvtl',                              'WhatsApp'],
              ['fa-telegram',  'https://t.me/vector944',                              'Telegram'],
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
