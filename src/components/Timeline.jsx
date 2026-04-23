import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const COLS = [
  {
    icon: 'fa-graduation-cap',
    title: 'Education',
    items: [
      { role: 'MSc in Software Engineering',            date: 'Sep. 2025 – Present',    org: 'Blekinge Institute of Technology' },
      { role: 'B.Sc. in Computer Science & Engineering', date: 'Jan. 2018 – May 2022', org: 'North South University' },
    ],
  },
  {
    icon: 'fa-briefcase',
    title: 'Experience',
    items: [
      { role: 'Senior Software Engineer', date: 'Jan. 2024 – Jul. 2025', org: 'Enosis Solutions' },
      { role: 'Software Engineer',        date: 'Jan. 2022 – Dec. 2023', org: 'Enosis Solutions' },
      { role: 'Competitive Programmer',   date: 'Feb. 2018 – May 2022', org: 'NSU Problem Solver' },
    ],
  },
  {
    icon: 'fa-trophy',
    title: 'Achievements',
    items: [
      { role: 'Expert',                       date: 'Codeforces',             org: '@vector94',         link: 'https://codeforces.com/profile/vector94' },
      { role: 'Knight',                       date: 'LeetCode',               org: '@vector94',         link: 'https://leetcode.com/u/vector94/' },
      { role: 'Microsoft Back-End Developer', date: 'Professional Certificate', org: 'Verify on Coursera', link: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/BPBBFFUTQ14G' },
    ],
  },
]

function TimelineCol({ icon, title, items, delay }) {
  const lineRef = useRef()
  const lineInView = useInView(lineRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      className="timeline-col glass"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="timeline-col-title">
        <i className={`fa ${icon}`} /> {title}
      </div>
      <div className="timeline-items" ref={lineRef}>
        <motion.div
          className="timeline-connector"
          initial={{ scaleY: 0 }}
          animate={lineInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.1, delay: delay + 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ originY: 0 }}
        />
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="timeline-item"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + 0.4 + i * 0.12 }}
          >
            <div className="timeline-role">{item.role}</div>
            <div className="timeline-date">{item.date}</div>
            <div className="timeline-org">
              {item.link
                ? <a href={item.link} target="_blank" rel="noopener">{item.org}</a>
                : item.org}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Timeline() {
  return (
    <section className="section-wrap timeline-section" id="timeline">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">My Journey</span>
          <h2 className="section-title">
            Education, Experience &amp; <span>Achievements</span>
          </h2>
        </motion.div>

        <div className="timeline-grid">
          {COLS.map((col, i) => (
            <TimelineCol key={col.title} {...col} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
