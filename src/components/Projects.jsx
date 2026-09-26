import { useMemo, useState } from 'react'
import { GitBranch, Globe2, Search } from 'lucide-react'
import initialProjects from '../data/projects'

const externalProps = { target: '_blank', rel: 'noreferrer' }

// Automatically bundle all assets in src/assets/ (including projects/ and credentials/)
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

export function Projects({ projects = initialProjects, dark = true }) {
  const [query, setQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)

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
      [project.title, project.description, ...(project.tags || [])]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    )
  }, [projects, query])

  return (
    <div className="view projects-view">
      {/* SEARCH BAR */}
      <div className="search-bar-container">
        <div className="search-input-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            aria-label="search projects"
            placeholder="search projects"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      {/* PROJECT LIST */}
      <div className="project-list">
        {filteredProjects.map((project) => (
          <article
            className={`project-card ${selectedProject === project.title ? 'expanded' : ''}`}
            key={project.title}
            onClick={() =>
              setSelectedProject(
                selectedProject === project.title ? null : project.title
              )
            }
          >
            {/* LEFT HALF: INFO */}
            <div className="project-content">
              <div>
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  {project.date && <span className="date-badge">{project.date}</span>}
                </div>
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
                      aria-label={`${project.title} live project`}
                      onClick={(event) => event.stopPropagation()}
                      className="project-action-btn"
                      title="View Live Demo"
                    >
                      <Globe2 size={16} />
                    </a>
                  )}
                  {project.source && (
                    <a
                      href={project.source}
                      {...externalProps}
                      aria-label={`${project.title} source`}
                      onClick={(event) => event.stopPropagation()}
                      className="project-action-btn"
                      title="View Source Code"
                    >
                      <GitBranch size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT HALF: PREVIEW IMAGE */}
            {(project.image || project.image2) && (
              <div className="project-preview-box">
                <img
                  src={getImage(project)}
                  alt={project.title}
                  className="project-preview-image"
                />
              </div>
            )}
          </article>
        ))}

        {!filteredProjects.length && (
          <div className="empty-state">
            <Search size={22} />
            <p>No projects match “{query}”.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects
