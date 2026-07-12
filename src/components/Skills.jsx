import { useState } from 'react'
import { motion } from 'framer-motion'
import TiltCard from './TiltCard'
import BokehParticles from './BokehParticles'
import { Constellation3D } from '../three/lazy'
import { SKILLS } from '../data/skills'

export default function Skills() {
  // two-way hover link between the bento cards and constellation hubs
  const [cardHover, setCardHover] = useState(null)
  const [hubHover, setHubHover] = useState(null)

  return (
    <section className="section-wrap skills-section" id="skills">
      <BokehParticles />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="section-tag">What I Do</span>
          <h2 className="section-title">My <span>Skills</span></h2>
        </motion.div>

        <motion.div
          className="skills-constellation"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1 }}
        >
          <Constellation3D
            categories={SKILLS}
            highlight={cardHover}
            onHubHover={setHubHover}
          />
          <span className="constellation-hint">
            <i className="fa fa-hand-paper-o" /> Drag to explore
          </span>
        </motion.div>

        <div className="skills-bento">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.title}
              className={`skill-bento-item${hubHover === i ? ' hub-linked' : ''}`}
              onMouseEnter={() => setCardHover(i)}
              onMouseLeave={() => setCardHover(c => (c === i ? null : c))}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.18 }}
            >
              <TiltCard intensity={6}>
                <div className="skill-card glass" style={{ '--skill-accent': skill.accent }}>
                  <div className="skill-card-header">
                    <div className="skill-icon-wrap">
                      <i className={`fa ${skill.icon}`} />
                    </div>
                    <div className="skill-card-title">{skill.title}</div>
                  </div>
                  <div className="skill-tags">
                    {skill.tags.map((tag, j) => (
                      <motion.span
                        key={tag}
                        className="skill-tag"
                        initial={{ opacity: 0, scale: 0.75 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.12 + j * 0.06 }}
                        whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
