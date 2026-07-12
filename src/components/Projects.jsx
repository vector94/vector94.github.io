import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import TiltCard from './TiltCard'
import BokehParticles from './BokehParticles'
import { PROJECTS } from '../data/projects'

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
      className="project-bento-item"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay: (index % 3) * 0.18 }}
    >
      <TiltCard intensity={10}>
        <div
          ref={cardRef}
          className="project-card glass"
          onMouseMove={handleMouseMove}
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(124,58,237,0.13) 0%, transparent 55%), var(--bg-card)`,
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
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section className="section-wrap projects-section" id="projects">
      <BokehParticles />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="section-tag">What I've Built</span>
          <h2 className="section-title">My <span>Projects</span></h2>
        </motion.div>

        <div className="projects-bento">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
