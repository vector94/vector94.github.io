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

export default function Contact() {
  return (
    <section className="section-wrap contact-section" id="contact">
      <div className="container">
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
