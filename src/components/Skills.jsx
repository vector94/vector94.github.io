import { motion } from 'framer-motion'
import TiltCard from './TiltCard'

const SKILLS = [
  {
    icon: 'fa-server',
    title: 'Backend & Cloud',
    accent: 'var(--accent-1)',
    tags: ['C#', '.NET Core', 'ASP.NET Core', 'EF Core', 'LINQ', 'Dapper', 'Python', 'FastAPI', 'SQL Server', 'PostgreSQL', 'TimescaleDB', 'Azure Services', 'Redis', 'RabbitMQ', 'Docker'],
  },
  {
    icon: 'fa-cogs',
    title: 'Software Engineering',
    accent: 'var(--accent-2)',
    tags: ['Design Patterns', 'SOLID Principles', 'DDD', 'Software Architecture', 'RESTful APIs', 'Microservices', 'xUnit Testing', 'Performance Optimization'],
  },
  {
    icon: 'fa-sitemap',
    title: 'System Design',
    accent: 'var(--accent-2)',
    tags: ['Solution Architecture', 'Distributed Systems', 'Event-Driven', 'API Design', 'Caching Strategies', 'DB Optimization', 'Monitoring & Logging'],
  },
  {
    icon: 'fa-code',
    title: 'Frontend',
    accent: 'var(--accent-1)',
    tags: ['Angular', 'React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
  },
]

export default function Skills() {
  return (
    <section className="section-wrap skills-section" id="skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">What I Do</span>
          <h2 className="section-title">My <span>Skills</span></h2>
        </motion.div>

        <div className="skills-bento">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.title}
              className="skill-bento-item"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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
                        transition={{ duration: 0.22, delay: i * 0.08 + j * 0.04 }}
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
