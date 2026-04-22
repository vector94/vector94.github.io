import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const PROJECTS = [
  {
    name: 'Nazar',
    tech: 'Python · FastAPI · TimescaleDB · RabbitMQ',
    desc: 'Performance monitoring platform with event-driven architecture and anomaly detection.',
    img: '/img/project/nazar.png',
    badge: 'Full-Stack',
    link: 'https://github.com/vector94/nazar',
  },
  {
    name: 'LeetKhata',
    tech: 'C#',
    desc: 'Automatically syncs your accepted LeetCode solutions to GitHub.',
    img: '/img/project/leetkhata.png',
    badge: 'Tool',
    link: 'https://github.com/vector94/leetkhata',
  },
  {
    name: 'Codepodium',
    tech: '.NET 8 · React · PostgreSQL',
    desc: 'A programming contest aggregator that pulls contests from Codeforces and LeetCode, with search and real-time statistics.',
    img: '/img/project/codepodium.png',
    badge: 'Full-Stack',
    link: 'https://github.com/vector94/codepodium',
  },
  {
    name: 'Iker Finance',
    tech: '.NET Core · PostgreSQL · Next.js',
    desc: 'Multi-currency finance manager built with Clean Architecture and CQRS pattern.',
    img: '/img/project/ikerfinance.png',
    badge: 'Full-Stack',
    link: 'https://github.com/vector94/iker-finance-backend',
  },
  {
    name: 'Blekingetrafiken Test Suite',
    tech: 'C# · NUnit · Selenium WebDriver',
    desc: 'Automated GUI regression test suite for Blekingetrafiken.se, the public transport website for Blekinge, Sweden.',
    img: '/img/project/blekingetrafiken.png',
    badge: 'Testing',
    link: 'https://github.com/vector94/blekingetrafiken-test-suite',
  },
  {
    name: 'Personal Portfolio Website',
    tech: 'React · Three.js · Framer Motion',
    desc: 'Personal portfolio website showcasing projects, skills, and achievements.',
    img: '/img/project/vector94.png',
    badge: 'Web Design',
    link: 'https://github.com/vector94/vector94.github.io',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef()
  const [glow, setGlow] = useState({ x: 50, y: 50 })

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect()
    setGlow({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className="project-card glass"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(124,58,237,0.14) 0%, transparent 55%), var(--bg-card)`,
      }}
    >
      <div className="project-img">
        {project.img
          ? <img src={project.img} alt={project.name} loading="lazy" />
          : <div className="project-img-placeholder"><i className="fa fa-code" /></div>
        }
        <span className="project-badge">{project.badge}</span>
      </div>
      <div className="project-body">
        <div className="project-name">{project.name}</div>
        <div className="project-tech">{project.tech}</div>
        <p className="project-desc">{project.desc}</p>
        <a href={project.link} className="project-link" target="_blank" rel="noopener">
          View on GitHub <i className="fa fa-arrow-right" />
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section className="section-wrap projects-section" id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">What I've Built</span>
          <h2 className="section-title">My <span>Projects</span></h2>
        </motion.div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
