import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { href: '#hero',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#timeline', label: 'Experience' },
  { href: '#skills',   label: 'Skills' },
  { href: '#gallery',  label: 'Gallery' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive]       = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.4 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="nav-container">
          <a href="#hero" className="nav-brand">
            <img src="/img/logo.png" alt="Vector" />
            VECTOR
          </a>

          <div className="nav-links">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link${active === link.href.slice(1) ? ' active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <button className="btn-theme" onClick={onToggleTheme} aria-label="Toggle theme">
              {theme === 'day' ? '☀️' : '🌙'}
            </button>
            <a href="/assets/Resume_Md Asif Iqbal Ahmed.pdf" download className="btn-classic">Resume</a>
            <a href="classic.html" className="btn-classic">Classic</a>
            <button
              className={`hamburger${mobileOpen ? ' open' : ''}`}
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </motion.nav>

      <motion.div
        className="mobile-nav"
        initial={false}
        animate={{ x: mobileOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 35 }}
      >
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link"
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <button className="btn-theme" onClick={onToggleTheme}>
            {theme === 'day' ? '☀️' : '🌙'}
          </button>
          <a href="classic.html" className="btn-classic">Classic</a>
        </div>
      </motion.div>
    </>
  )
}
