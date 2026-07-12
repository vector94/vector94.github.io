import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BokehParticles from './BokehParticles'
import TiltCard from './TiltCard'
import { ITEMS, FILTERS } from '../data/gallery'

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const visible = ITEMS.filter(item => filter === 'all' || item.cat === filter)

  useEffect(() => {
    if (!lightbox) return
    function onKey(e) { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <section className="section-wrap gallery-section" id="gallery">
      <BokehParticles />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="section-tag">Moments</span>
          <h2 className="section-title">My <span>Gallery</span></h2>
        </motion.div>

        <div className="filter-bar">
          {FILTERS.map(f => (
            <button
              key={f.value}
              className={`filter-btn${filter === f.value ? ' active' : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="gallery-masonry">
          <AnimatePresence>
            {visible.map((item, i) => (
              <TiltCard key={item.id} intensity={6}>
              <motion.div
                className="gallery-masonry-item glass"
                initial={{ opacity: 0, scale: 0.9, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                onClick={() => !item.video && setLightbox(item)}
                style={{ cursor: item.video ? 'default' : 'zoom-in' }}
              >
                {item.video ? (
                  <video
                    src={item.video}
                    muted loop playsInline
                    preload="metadata"
                    controls
                    style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', background: '#000', borderRadius: 'inherit' }}
                  />
                ) : (
                  <div className="gallery-img-wrap">
                    <img src={item.img} alt={item.label} loading="lazy" />
                    <div className="gallery-overlay">
                      <p>{item.label}</p>
                      <span className="gallery-zoom"><i className="fa fa-expand" /></span>
                    </div>
                  </div>
                )}
              </motion.div>
              </TiltCard>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="lightbox-inner"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={lightbox.img} alt={lightbox.label} className="lightbox-img" />
              <p className="lightbox-label">{lightbox.label}</p>
            </motion.div>
            <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
              <i className="fa fa-times" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
