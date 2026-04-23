import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Timeline from './components/Timeline'
import Skills from './components/Skills'
import Gallery from './components/Gallery'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import AuroraBackground from './components/AuroraBackground'
import CursorGlow from './components/CursorGlow'

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('v94-theme') || 'night'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('v94-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'night' ? 'day' : 'night'))

  return (
    <>
      <AuroraBackground />
      <CursorGlow />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Skills />
        <Gallery />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
