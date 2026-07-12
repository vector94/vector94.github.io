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
import { SceneCanvas3D } from './three/lazy'

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
      <div className="grain-overlay" aria-hidden="true" />
      <AuroraBackground />
      <SceneCanvas3D />
      <CursorGlow />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Skills />
        <Projects />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
