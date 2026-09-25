import { Check } from 'lucide-react'
import initialExperiences from '../data/experience'

export function Experience({ experiences = initialExperiences }) {
  return (
    <div className="view experience-view">
      {experiences.map((exp, index) => (
        <div className="experience-card" key={index}>
          <div className="experience-top">
            <div>
              <h2>{exp.company}</h2>
              <p className="role">
                {exp.role} {exp.workType && <span>· {exp.workType}</span>}
              </p>
            </div>
            {exp.period && <span className="date-badge">{exp.period}</span>}
          </div>

          <ul>
            {exp.bullets.map((bullet, bIndex) => (
              <li key={bIndex}>{bullet}</li>
            ))}
          </ul>

          {exp.badge && (
            <div className="experience-stamp">
              <Check size={14} /> {exp.badge}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Experience
