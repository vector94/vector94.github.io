import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── SVG border tracer ──────────────────────────────────── */
function BorderTracer({ color, hovering }) {
  const svgRef   = useRef()
  const [size, setSize]   = useState({ w: 0, h: 0 })
  const [perim, setPerim] = useState(0)
  const RADIUS = 20

  useEffect(() => {
    const parent = svgRef.current?.parentElement
    if (!parent) return
    const ro = new ResizeObserver(([e]) => {
      const { width: w, height: h } = e.contentRect
      setSize({ w, h })
      setPerim(2 * (w + h) - (8 - 2 * Math.PI) * RADIUS)
    })
    ro.observe(parent)
    return () => ro.disconnect()
  }, [])

  const dur     = hovering ? 1.6 : 3.8
  const dashLen = 36
  const glowId  = `glow-${color.replace('#', '')}`

  return (
    <svg
      ref={svgRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2, overflow: 'visible' }}
    >
      <defs>
        <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {perim > 0 && (
        <rect
          x="1.5" y="1.5"
          width={size.w - 3} height={size.h - 3}
          rx={RADIUS} ry={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${dashLen} ${perim}`}
          filter={`url(#${glowId})`}
        >
          <animate
            attributeName="stroke-dashoffset"
            from={perim + dashLen}
            to="0"
            dur={`${dur}s`}
            repeatCount="indefinite"
            calcMode="linear"
          />
        </rect>
      )}
    </svg>
  )
}

/* ── Typewriter text ────────────────────────────────────── */
function TypewriterText({ text, started, delay = 0 }) {
  const [display, setDisplay] = useState('')
  const [done, setDone]       = useState(false)

  useEffect(() => {
    if (!started) { setDisplay(''); setDone(false); return }
    let timer, interval
    timer = setTimeout(() => {
      let i = 0
      interval = setInterval(() => {
        i++
        setDisplay(text.slice(0, i))
        if (i >= text.length) { clearInterval(interval); setDone(true) }
      }, 26)
    }, delay)
    return () => { clearTimeout(timer); clearInterval(interval) }
  }, [started, text, delay])

  return (
    <span>
      {display}
      {started && !done && (
        <span className="tw-cursor" />
      )}
    </span>
  )
}

/* ── Column data ────────────────────────────────────────── */
const COLUMNS = [
  {
    label: 'Education',
    icon:  'fa-graduation-cap',
    color: '#7c3aed',
    items: [
      { role: 'B.Sc. in Computer Science & Engineering', org: 'North South University',           date: 'Jan 2018 – May 2022' },
      { role: 'MSc in Software Engineering',             org: 'Blekinge Institute of Technology',  date: 'Sep 2025 – Present'  },
    ],
  },
  {
    label: 'Experience',
    icon:  'fa-briefcase',
    color: '#06b6d4',
    items: [
      { role: 'Competitive Programmer',    org: 'NSU Problem Solver', date: 'Feb 2018 – May 2022' },
      { role: 'Software Engineer',          org: 'Enosis Solutions',   date: 'Jan 2022 – Dec 2023' },
      { role: 'Senior Software Engineer',  org: 'Enosis Solutions',   date: 'Jan 2024 – Jul 2025' },
    ],
  },
  {
    label: 'Achievements',
    icon:  'fa-trophy',
    color: '#f59e0b',
    items: [
      { role: 'Expert',                       org: 'Codeforces · @vector94',   link: 'https://codeforces.com/profile/vector94' },
      { role: 'Knight',                       org: 'LeetCode · @vector94',     link: 'https://leetcode.com/u/vector94/'        },
      { role: 'Microsoft Back-End Developer', org: 'Professional Certificate', link: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/BPBBFFUTQ14G' },
    ],
  },
]

/* ── Tower ──────────────────────────────────────────────── */
function Tower({ col, colIndex, hovered, onEnter, onLeave }) {
  const towerRef  = useRef()
  const inView    = useInView(towerRef, { once: true, margin: '-80px' })
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (inView && !active) setActive(true)
  }, [inView])

  const isHovered  = hovered === colIndex
  const isDimmed   = hovered !== null && !isHovered

  // stagger: give each item's typewriter a delay based on cumulative chars before it
  let charOffset = 0
  const delays = col.items.map((item) => {
    const d = charOffset * 26 + colIndex * 180
    charOffset += item.role.length + 8
    return d
  })

  return (
    <motion.div
      ref={towerRef}
      className="tl-tower glass"
      style={{ '--tower-color': col.color, position: 'relative' }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: colIndex * 0.12 }}
      animate={{
        scale:   isDimmed ? 0.97 : 1,
        opacity: isDimmed ? 0.38 : 1,
        filter:  isDimmed ? 'blur(2px)' : 'blur(0px)',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* always-running tracer */}
      <BorderTracer color={col.color} hovering={isHovered} />

      {/* activate flash */}
      {active && (
        <motion.div
          className="tl-flash"
          initial={{ opacity: 0.18 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ background: col.color }}
        />
      )}

      {/* header */}
      <div className="tl-tower-header">
        <div className="tl-tower-icon">
          <i className={`fa ${col.icon}`} />
        </div>
        <h3 className="tl-tower-label">{col.label}</h3>
      </div>

      {/* items */}
      <div className="tl-tower-body">
        {col.items.map((item, ii) => (
          <div key={ii} className="tl-tower-item">
            <div className="tl-tower-dot" />
            <div className="tl-tower-content">
              <div className="tl-tower-role">
                <TypewriterText
                  text={item.role}
                  started={active}
                  delay={delays[ii]}
                />
              </div>
              {item.date && (
                <div className="tl-tower-date">
                  <i className="fa fa-calendar-o" /> {item.date}
                </div>
              )}
              <div className="tl-tower-org">
                {item.link
                  ? <a href={item.link} target="_blank" rel="noopener">{item.org}</a>
                  : item.org}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ── Section ────────────────────────────────────────────── */
export default function Timeline() {
  const [hovered, setHovered] = useState(null)

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

        <div className="tl-towers">
          {COLUMNS.map((col, ci) => (
            <Tower
              key={col.label}
              col={col}
              colIndex={ci}
              hovered={hovered}
              onEnter={() => setHovered(ci)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
