import { useMemo, useState } from 'react'
import { GitBranch, Globe2, Search, ExternalLink } from 'lucide-react'
import initialClientProjects from '../data/clientProjects'
import '../styles/clientWork.css'

const externalProps = { target: '_blank', rel: 'noreferrer' }

// Automatically bundle all assets in src/assets/ (including projects/)
const assetMap = import.meta.glob('../assets/**/*', { eager: true, import: 'default' })

function resolveAssetUrl(path) {
  if (!path || typeof path !== 'string') return path
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  const cleanName = path.replace(/^\/?(src\/)?assets\//, '')
  const fileName = cleanName.split('/').pop()
  const foundKey = Object.keys(assetMap).find(
    (k) => k.endsWith('/' + cleanName) || k.endsWith('/' + fileName)
  )
  if (foundKey && assetMap[foundKey]) {
    return assetMap[foundKey]
  }
  return path.startsWith('src/') ? '/' + path : path
}

export function ClientWork({ projects = initialClientProjects, dark = false }) {
  const [query, setQuery] = useState('')

  const getImage = (project) => {
    let src =
      !dark && (project.image2 || project.imageLight || project.image_lm)
        ? (project.image2 || project.imageLight || project.image_lm)
        : (project.image || project.imageDark || project.image_dm)

    return resolveAssetUrl(src)
  }

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim()
    if (!normalizedQuery) return projects
    return projects.filter((project) =>
      [project.title, project.client, project.description, project.role, ...(project.tags || [])]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    )
  }, [projects, query])

  return (
    <div className="view projects-view client-work-view">
      {/* SEARCH BAR */}
      <div className="search-bar-container">
        <div className="search-input-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            aria-label="search client work and freelance projects"
            placeholder="search client work & freelance projects..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      {/* CLIENT WORK LIST */}
      <div className="project-list">
        {filteredProjects.map((project) => (
          <article className="project-card" key={project.title}>
            {/* LEFT HALF: INFO */}
            <div className="project-content">
              <div>
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  <span className="client-work-pill">Client Work / Freelance Project</span>
                  {project.date && <span className="date-badge">{project.date}</span>}
                </div>

                {project.role && (
                  <div className="client-role-row">
                    <span className="client-role-label">Role</span>
                    <span>
                      {project.role}
                      {project.roleScope ? ` • ${project.roleScope}` : ''}
                    </span>
                  </div>
                )}

                <p className="project-desc">{project.description}</p>

                {project.features && (
                  <p className="project-features-text">{project.features}</p>
                )}
              </div>

              <div>
                {project.tags && project.tags.length > 0 && (
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="project-links-row">
                  {project.live && (
                    <a
                      href={project.live}
                      {...externalProps}
                      className="client-visit-btn"
                      title="Visit Live Platform"
                    >
                      <Globe2 size={15} />
                      <span>Visit Live Platform</span>
                      <ExternalLink size={13} style={{ opacity: 0.7 }} />
                    </a>
                  )}

                  {project.source && (
                    <a
                      href={project.source}
                      {...externalProps}
                      aria-label={`${project.title} source`}
                      className="project-action-btn"
                      title="View Source Code"
                    >
                      <GitBranch size={16} />
                    </a>
                  )}

                  <span className="client-note-badge">Production Deliverable</span>
                </div>
              </div>
            </div>

            {/* RIGHT HALF: PREVIEW IMAGE */}
            {(project.image || project.image2) && (
              <a
                href={project.live || '#'}
                {...externalProps}
                className="project-preview-box"
                title={`Open ${project.title}`}
              >
                <img
                  src={getImage(project)}
                  alt={project.title}
                  className="project-preview-image"
                />
              </a>
            )}
          </article>
        ))}

        {!filteredProjects.length && (
          <div className="empty-state">
            <Search size={22} />
            <p>No client or freelance projects match “{query}”.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientWork

