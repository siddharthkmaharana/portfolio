import { useState, useMemo } from 'react'
import {
  ExternalLink,
  Copy,
  Check,
  Search,
  Maximize2,
  X,
  FileText,
  Award,
} from 'lucide-react'
import { credentials as defaultCredentials, credentialCategories } from '../data/credentials'

const externalProps = { target: '_blank', rel: 'noreferrer' }

// Map all images in src/assets/credentials/ for production bundler
const credAssetMap = import.meta.glob('../assets/credentials/*', { eager: true, import: 'default' })

function resolveCredAsset(path) {
  if (!path || typeof path !== 'string') return path
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  const cleanName = path.replace(/^\/?(src\/)?assets\/credentials\//, '')
  const fileName = cleanName.split('/').pop()
  const foundKey = Object.keys(credAssetMap).find(
    (k) => k.endsWith('/' + cleanName) || k.endsWith('/' + fileName)
  )
  if (foundKey && credAssetMap[foundKey]) {
    return credAssetMap[foundKey]
  }
  return path.startsWith('src/') ? '/' + path : path
}

/**
 * Synthetic Certificate component for credentials that don't have an uploaded image yet
 */
function SyntheticCertificate({ item }) {
  return (
    <div className="synthetic-cert">
      <div className="synthetic-cert-inner">
        <div className="synthetic-cert-frame">
          <div className="synthetic-cert-top">
            <div className="synthetic-issuer-brand">
              <span className="synthetic-issuer-name">{item.issuer}</span>
              <span className="synthetic-issuer-sub">CERTIFICATION PROGRAM</span>
            </div>
            <div className="synthetic-seal-badge">
              <Award size={18} />
              <span>{item.badge || 'VERIFIED'}</span>
            </div>
          </div>

          <div className="synthetic-cert-center">
            <p className="synthetic-cert-label">Certificate of Recognition</p>
            <h4 className="synthetic-recipient">Siddharth Kumar Maharana</h4>
            <p className="synthetic-cert-context">has successfully completed all requirements for</p>
            <h3 className="synthetic-cert-title">{item.title}</h3>
          </div>

          <div className="synthetic-cert-bottom">
            <div className="synthetic-bottom-item">
              <span className="synthetic-bottom-label">Issue Date</span>
              <span className="synthetic-bottom-value">{item.date}</span>
            </div>
            <div className="synthetic-bottom-sig">
              <div className="synthetic-sig-mark" />
              <span className="synthetic-bottom-label">Authorized Verification</span>
            </div>
            <div className="synthetic-bottom-item right">
              <span className="synthetic-bottom-label">Credential ID</span>
              <span className="synthetic-bottom-value mono">{item.credentialId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Credentials({ data = defaultCredentials }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState(null)
  const [previewCert, setPreviewCert] = useState(null)

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

      {/* CREDENTIALS GRID - MINIMAL DESIGN MATCHING MOCKUP */}
      {filteredCredentials.length > 0 ? (
        <div className="credentials-grid">
          {filteredCredentials.map((item) => (
            <article key={item.id} className="credential-card">
              {/* TOP: CERTIFICATE IMAGE / PREVIEW */}
              <div
                className="cred-cert-wrapper"
                onClick={() => setPreviewCert(item)}
                title="Click to view full certificate"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setPreviewCert(item)}
              >
                {item.image ? (
                  <img
                    src={resolveCredAsset(item.image)}
                    alt={item.title}
                    className="cred-cert-img"
                    loading="lazy"
                  />
                ) : (
                  <SyntheticCertificate item={item} />
                )}

                {/* Subtle hover indicator at bottom-right */}
                <div className="cred-cert-hint">
                  <Maximize2 size={13} />
                  <span>View Full</span>
                </div>
              </div>

              {/* FOOTER: ID (LEFT) + VERIFY CREDENTIAL (RIGHT) */}
              <div className="cred-card-footer">
                {item.credentialId ? (
                  <button
                    type="button"
                    className="cred-id-copy-btn"
                    onClick={() => handleCopyId(item.credentialId)}
                    title="Click to copy Credential ID"
                    aria-label={`Copy Credential ID ${item.credentialId}`}
                  >
                    {copiedId === item.credentialId ? (
                      <>
                        <Check size={14} className="copy-success-icon" />
                        <span className="copy-success-text">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>ID: {item.credentialId}</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span />
                )}

                {item.url ? (
                  <a
                    href={item.url}
                    {...externalProps}
                    className="cred-verify-link"
                    title={`Verify ${item.title}`}
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <button
                    type="button"
                    className="cred-verify-link cred-verify-btn"
                    onClick={() => setPreviewCert(item)}
                    title={`View and verify ${item.title}`}
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={14} />
                  </button>
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

      {/* FULLSCREEN CERTIFICATE MODAL */}
      {previewCert && (
        <div
          className="cred-modal-backdrop"
          onClick={() => setPreviewCert(null)}
          role="dialog"
          aria-modal="true"
          aria-label={previewCert.title}
        >
          <div
            className="cred-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cred-modal-header">
              <div className="cred-modal-title-area">
                <h3>{previewCert.title}</h3>
                <p>{previewCert.issuer} · Issued {previewCert.date}</p>
              </div>
              <button
                type="button"
                className="cred-modal-close-btn"
                onClick={() => setPreviewCert(null)}
                aria-label="Close certificate preview"
              >
                <X size={18} />
              </button>
            </div>

            <div className="cred-modal-image-body">
              {previewCert.image ? (
                <img
                  src={resolveCredAsset(previewCert.image)}
                  alt={previewCert.title}
                  className="cred-modal-full-img"
                />
              ) : (
                <div className="cred-modal-synthetic-wrap">
                  <SyntheticCertificate item={previewCert} />
                </div>
              )}
            </div>

            <div className="cred-modal-footer">
              <span className="cred-modal-id">ID: {previewCert.credentialId}</span>
              {previewCert.url && (
                <a
                  href={previewCert.url}
                  {...externalProps}
                  className="cred-modal-link-btn"
                >
                  <FileText size={14} />
                  <span>Download / View Official Document</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Credentials

