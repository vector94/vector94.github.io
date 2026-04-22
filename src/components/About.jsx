import { motion } from 'framer-motion'

const STATS = [
  ['3.5+', 'Years Experience'],
  ['2000+', 'Problems Solved'],
  ['Expert', 'on Codeforces'],
  ['Knight', 'on LeetCode'],
]

const SOCIALS = [
  ['fa-linkedin',  'https://www.linkedin.com/in/md-asif-iqbal-ahmed/', 'LinkedIn'],
  ['fa-github',    'https://github.com/vector94',                        'GitHub'],
  ['fa-telegram',  'https://t.me/vector944',                             'Telegram'],
  ['fa-facebook',  'https://www.facebook.com/asif.ahmed181/',            'Facebook'],
]

const vp = { once: true, margin: '-80px' }

export default function About() {
  return (
    <section className="section-wrap about-section" id="about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Who I Am</span>
          <h2 className="section-title">About <span>Me</span></h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-img-wrap"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <img src="/img/about.jpg" alt="Md Asif Iqbal Ahmed" />
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <p className="about-subtitle">
              Master's Student · Software Engineer · Competitive Programmer
            </p>
            <p>
              I am currently pursuing a Master's degree in Software Engineering at Blekinge
              Institute of Technology in Sweden, with 3.5+ years of professional experience
              in software development.
            </p>
            <p>
              As a competitive programmer, I participated in ICPC Dhaka Regional and solved
              2000+ problems, achieving Expert rank on Codeforces and Knight rank on LeetCode.
            </p>
            <p>Also regularly into strength training and powerlifting.</p>

            <div className="about-stats">
              {STATS.map(([val, label], i) => (
                <motion.span
                  key={label}
                  className="stat-chip"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <span>{val}</span> {label}
                </motion.span>
              ))}
            </div>

            <div className="about-social">
              {SOCIALS.map(([icon, href, label]) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener">
                  <i className={`fa ${icon}`} />
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="btn-primary"
              style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}
            >
              <i className="fa fa-envelope-o" /> Get In Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
