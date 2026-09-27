import { GitBranch } from 'lucide-react'
import initialDesigns, { designProjects } from '../data/designs'

export function Designs({ designs = designProjects || initialDesigns }) {
  return (
    <div className="view designs-view">
      <div className="design-list design-grid">
        {designs.map((project) => (
          <a
            key={project.id || project.title}
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="design-card group"
          >
            {/* Top preview frame */}
            <div className="preview-container">
              {project.tag && <span className="design-preview-tag">{project.tag}</span>}
              <img
                src={project.image}
                alt={project.title}
                className="preview-image"
                loading="lazy"
              />
            </div>

            {/* Bottom details */}
            <div className="card-body">
              <h3 className="title">{project.title}</h3>
              <p className="description">{project.description}</p>

              {project.tags && project.tags.length > 0 && (
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="card-actions">
                <span className="action-live">View Live ↗</span>
                {project.githubUrl && (
                  <span
                    role="button"
                    tabIndex={0}
                    className="action-github"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        e.stopPropagation()
                        window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                      }
                    }}
                  >
                    <GitBranch size={14} /> Source
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Designs
