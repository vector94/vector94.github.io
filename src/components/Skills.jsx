import { motion } from 'framer-motion'
import TiltCard from './TiltCard'
import BokehParticles from './BokehParticles'

const SKILLS = [
  {
    icon: 'fa-server',
    title: 'Backend & Cloud',
    accent: 'var(--accent-1)',
    tags: ['C#', 'Python', '.NET Core', 'ASP.NET Core', 'FastAPI', 'EF Core', 'Dapper', 'SQL Server', 'PostgreSQL', 'TimescaleDB', 'Redis', 'RabbitMQ', 'Azure Services', 'Docker', 'CI/CD', 'DevOps'],
  },
  {
    icon: 'fa-sitemap',
    title: 'System Design',
    accent: 'var(--accent-2)',
    tags: ['Solution Architecture', 'Distributed Systems', 'Scalability', 'Event-Driven', 'API Design', 'Load Balancing', 'Caching Strategies', 'Performance Tuning', 'DB Optimization', 'Monitoring & Logging'],
  },
  {
    icon: 'fa-cogs',
    title: 'Software Engineering',
    accent: 'var(--accent-2)',
    tags: ['SOLID Principles', 'Design Patterns', 'Clean Architecture', 'DDD', 'CQRS', 'MediatR', 'Microservices', 'RESTful APIs', 'xUnit Testing', 'Agile', 'Scrum', 'SDLC'],
  },
  {
    icon: 'fa-shield',
    title: 'Security',
    accent: 'var(--accent-1)',
    tags: ['Authentication', 'Authorization', 'IAM', 'Secure Coding', 'Encryption', 'Application Security', 'Data Security'],
  },
  {
    icon: 'fa-code',
    title: 'Frontend',
    accent: 'var(--accent-1)',
    tags: ['React', 'Next.js', 'Angular', 'TypeScript'],
  },
  {
    icon: 'fa-trophy',
    title: 'Competitive Programming',
    accent: 'var(--accent-2)',
    tags: ['C++', 'Data Structures', 'Algorithms', 'Dynamic Programming', 'Graph Theory', 'Codeforces', 'LeetCode'],
  },
]

export default function Skills() {
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

        <div className="skills-bento">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.title}
              className="skill-bento-item"
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
