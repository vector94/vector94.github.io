import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BokehParticles from './BokehParticles'

const ITEMS = [
  { id: 1,  cat: 'programming-contest', img: '/img/portfolio/Intra NSU Programming Contest.png',                              label: 'Intra NSU Programming Contest' },
  { id: 2,  cat: 'programming-contest', img: '/img/portfolio/International Collegiate Programming Contest Dhaka Regional.png', label: 'ICPC Dhaka Regional' },
  { id: 3,  cat: 'programming-contest', img: '/img/portfolio/Intra NSU Programming Contest (2).png',                          label: 'Intra NSU Programming Contest' },
  { id: 4,  cat: 'programming-contest', img: '/img/portfolio/IEEE Power Buzz Programming Contest (2).png',                    label: 'IEEE Power Buzz Programming Contest' },
  { id: 5,  cat: 'programming-contest', img: '/img/portfolio/BUP Intra University Programming Contest.png',                   label: 'BUP Intra University Programming Contest' },
  { id: 6,  cat: 'programming-contest', img: '/img/portfolio/SUST Intra University Programming Contest.png',                  label: 'SUST Intra University Programming Contest' },
  { id: 7,  cat: 'programming-contest', img: '/img/portfolio/Expert, Codeforces.png',                                         label: 'Expert — Codeforces' },
  { id: 8,  cat: 'programming-contest', img: '/img/portfolio/National Collegiate Programming Contest.png',                    label: 'National Collegiate Programming Contest' },
  { id: 9,  cat: 'programming-contest', img: '/img/portfolio/SUB Intra University Programming Contest.png',                   label: 'SUB Intra University Programming Contest' },
  { id: 10, cat: 'programming-contest', img: '/img/portfolio/Knight, LeetCode.png',                                           label: 'Knight — LeetCode' },
  { id: 11, cat: 'programming-contest', img: '/img/portfolio/Intra NSU Programming Contest (3).png',                          label: 'Intra NSU Programming Contest' },
  // { id: 12, cat: 'programming-contest', img: '/img/portfolio/Hackerrank 5 Star Gold Badge.png',                            label: '5★ Problem Solving — HackerRank' },
  // { id: 13, cat: 'programming-contest', img: '/img/portfolio/SUST Intra University Programming Contest (2).png',           label: 'SUST Intra University Programming Contest' },
  { id: 14, cat: 'programming-contest', img: '/img/portfolio/LeetCode 500 Days Badge.png',                                    label: '500 Days Badge — LeetCode' },
  // { id: 15, cat: 'programming-contest', img: '/img/portfolio/IEEE Power Buzz Programming Contest.png',                     label: 'IEEE Power Buzz Programming Contest' },
  // { id: 14, cat: 'powerlifting', video: '/video/squat_160kg.mov',    label: 'Squat 160kg' },
  // { id: 15, cat: 'powerlifting', video: '/video/deadlift_200kg.mov', label: 'Deadlift 200kg' },
]

const FILTERS = [
  { label: 'All',                  value: 'all' },
  { label: 'Programming Contests', value: 'programming-contest' },
  // { label: 'Powerlifting', value: 'powerlifting' },
]

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
            {visible.map(item => (
              <motion.div
                key={item.id}
                className="gallery-masonry-item glass"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
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
