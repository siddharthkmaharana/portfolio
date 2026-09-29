import { useState, useEffect } from 'react'
import { GitBranch } from 'lucide-react'
import initialDesigns, { designProjects } from '../data/designs'

const REMOTE_MANIFEST_URL = 'https://raw.githubusercontent.com/siddharthkmaharana/landing_page_gallery/main/designs.json'
const CACHE_KEY = 'portfolio_landing_page_gallery_designs'

export function Designs({ designs: propDesigns }) {
  const [designs, setDesigns] = useState(() => {
    if (propDesigns && propDesigns.length > 0) return propDesigns
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {
      // ignore JSON parse or localStorage errors
    }
    return designProjects || initialDesigns
  })

  // Automatically sync with GitHub repository manifest on load
  useEffect(() => {
    let isMounted = true

    async function syncFromGitHub() {
      try {
        const res = await fetch(`${REMOTE_MANIFEST_URL}?t=${Date.now()}`)
        if (!res.ok) return
        const remoteList = await res.json()
        if (isMounted && Array.isArray(remoteList) && remoteList.length > 0) {
          setDesigns(remoteList)
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(remoteList))
          } catch {
            // ignore localStorage quota errors
          }
        }
      } catch (err) {
        // Silently use cached/local entries if offline
        console.debug('Designs auto-sync note:', err)
      }
    }

    syncFromGitHub()
    return () => {
      isMounted = false
    }
  }, [])

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
                onError={(e) => {
                  if (project.fallbackImage && e.currentTarget.src !== project.fallbackImage) {
                    e.currentTarget.src = project.fallbackImage
                  }
                }}
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

