import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ITEMS = [
  { id: 1,  cat: 'programming-contest', img: '/img/portfolio/IEEE Power Buzz Programming Contest.jpg',                     label: 'IEEE Power Buzz Programming Contest' },
  { id: 2,  cat: 'programming-contest', img: '/img/portfolio/SUST Intra University Programming Contest.jpg',               label: 'SUST Intra University Programming Contest' },
  { id: 3,  cat: 'programming-contest', img: '/img/portfolio/Intra NSU Programming Contest.jpg',                           label: 'Intra NSU Programming Contest' },
  { id: 4,  cat: 'programming-contest', img: '/img/portfolio/SUB Intra University Programming Contest.jpg',                label: 'SUB Intra University Programming Contest' },
  { id: 5,  cat: 'programming-contest', img: '/img/portfolio/International Collegiate Programming Contest Dhaka Regional.jpg', label: 'ICPC Dhaka Regional' },
  { id: 6,  cat: 'programming-contest', img: '/img/portfolio/National Collegiate Programming Contest.jpg',                 label: 'National Collegiate Programming Contest' },
  { id: 7,  cat: 'programming-contest', img: '/img/portfolio/Intra NSU Programming Contest (2).jpg',                      label: 'Intra NSU Programming Contest' },
  { id: 8,  cat: 'programming-contest', img: '/img/portfolio/Expert, Codeforces.png',                                     label: 'Expert — Codeforces' },
  { id: 9,  cat: 'programming-contest', img: '/img/portfolio/Knight, LeetCode.png',                                       label: 'Knight — LeetCode' },
  { id: 10, cat: 'programming-contest', img: '/img/portfolio/SUST Intra University Programming Contest (2).jpg',          label: 'SUST Intra University Programming Contest' },
  { id: 11, cat: 'programming-contest', img: '/img/portfolio/BUP Intra University Programming Contest.jpg',               label: 'BUP Intra University Programming Contest' },
  { id: 12, cat: 'powerlifting',        video: '/video/squat_160kg.mov',    label: 'Squat 160kg' },
  { id: 13, cat: 'powerlifting',        video: '/video/deadlift_200kg.mov', label: 'Deadlift 200kg' },
]

const FILTERS = [
  { label: 'All',                  value: 'all' },
  { label: 'Programming Contests', value: 'programming-contest' },
  { label: 'Powerlifting',         value: 'powerlifting' },
]

export default function Gallery() {
  const [filter, setFilter] = useState('all')

  const visible = ITEMS.filter(item => filter === 'all' || item.cat === filter)

  return (
    <section className="section-wrap gallery-section" id="gallery">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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

        <motion.div className="gallery-grid" layout>
          <AnimatePresence mode="popLayout">
            {visible.map(item => (
              <motion.div
                key={item.id}
                className="gallery-card glass"
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.32 }}
              >
                <div className="gallery-img-wrap">
                  {item.video ? (
                    <video
                      src={item.video}
                      muted loop playsInline
                      preload="metadata"
                      controls
                    />
                  ) : (
                    <>
                      <img src={item.img} alt={item.label} loading="lazy" />
                      <div className="gallery-overlay"><p>{item.label}</p></div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
