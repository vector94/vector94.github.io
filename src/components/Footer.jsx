import { motion } from 'framer-motion'
import BokehParticles from './BokehParticles'

export default function Footer() {
  return (
    <footer className="footer">
      <BokehParticles intensity={0.6} />
      <div className="footer-accent-line" />
      <div className="footer-inner">
        <motion.span
          className="footer-text"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          © 2021 – 2026 Md Asif Iqbal Ahmed. All rights reserved.
        </motion.span>
      </div>
    </footer>
  )
}
