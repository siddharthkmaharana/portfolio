import { useState, useMemo } from 'react'
import {
  Award,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { credentials as defaultCredentials, credentialCategories } from '../data/credentials'

const externalProps = { target: '_blank', rel: 'noreferrer' }

export function Credentials({ data = defaultCredentials }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState(null)

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredCredentials = useMemo(() => {
    return data.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory

      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesCategory

      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.issuer.toLowerCase().includes(query) ||
        (item.skills && item.skills.some((s) => s.toLowerCase().includes(query))) ||
        (item.credentialId && item.credentialId.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [data, selectedCategory, searchQuery])

  return (
    <div className="view credentials-view">
      {/* FILTER & SEARCH BAR */}
      <div className="credentials-controls">
        <div className="cred-categories-bar" role="tablist" aria-label="Credential categories">
          {credentialCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cred-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="cred-search-box">
          <Search size={14} className="cred-search-icon" aria-hidden="true" />
          <input
            type="text"
            className="cred-search-input"
            placeholder="Search certificates, skills, or issuers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search credentials"
          />
          {searchQuery && (
            <button
              type="button"
              className="cred-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* CREDENTIALS GRID */}
      {filteredCredentials.length > 0 ? (
        <div className="credentials-grid">
          {filteredCredentials.map((item) => (
            <article key={item.id} className="credential-card">
              {/* TOP ROW: ICON + TITLE + BADGE */}
              <div className="cred-card-header">
                <div className="cred-icon-title-group">
                  <div className="cred-icon-box" aria-hidden="true">
                    <Award size={20} />
                  </div>
                  <div className="cred-title-meta">
                    <h3 className="cred-title">{item.title}</h3>
                    <p className="cred-issuer-row">
                      <span className="cred-issuer">{item.issuer}</span>
                      <span className="cred-dot" aria-hidden="true">·</span>
                      <span className="cred-date">{item.date}</span>
                    </p>
                  </div>
                </div>

                {item.badge && (
                  <span className="cred-status-badge">
                    <ShieldCheck size={12} />
                    <span>{item.badge}</span>
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              {item.description && (
                <p className="cred-description">{item.description}</p>
              )}

              {/* SKILLS PILLS */}
              {item.skills && item.skills.length > 0 && (
                <div className="cred-skills-list">
                  {item.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="cred-skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* FOOTER: CREDENTIAL ID + VERIFY LINK */}
              <div className="cred-card-footer">
                {item.credentialId ? (
                  <button
                    type="button"
                    className="cred-id-copy-btn"
                    onClick={() => handleCopyId(item.credentialId)}
                    title="Click to copy Credential ID"
                  >
                    {copiedId === item.credentialId ? (
                      <>
                        <Check size={13} className="copy-success-icon" />
                        <span className="copy-success-text">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>ID: {item.credentialId}</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span />
                )}

                {item.url && (
                  <a
                    href={item.url}
                    {...externalProps}
                    className="cred-verify-link"
                    title={`Verify ${item.title}`}
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="cred-empty-state">
          <Award size={32} className="cred-empty-icon" />
          <p className="cred-empty-title">No credentials found</p>
          <p className="cred-empty-sub">
            Try adjusting your search query or selecting a different category.
          </p>
          <button
            type="button"
            className="cred-reset-btn"
            onClick={() => {
              setSelectedCategory('All')
              setSearchQuery('')
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Credentials
