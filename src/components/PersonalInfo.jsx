import { flushSync } from 'react-dom'
import {
  GitBranch,
  Link2,
  Mail,
  Moon,
  Phone,
  Sun,
} from 'lucide-react'
import personalInfo from '../data/personalInfo'

const externalProps = { target: '_blank', rel: 'noreferrer' }

export function PersonalInfo({ dark, setDark, onScheduleCall }) {
  const handleToggleTheme = (e) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = Math.round(rect.left + rect.width / 2)
    const y = Math.round(rect.top + rect.height / 2)

    const endRadius = Math.ceil(
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
    )

    // Pass coordinates to CSS custom properties
    document.documentElement.style.setProperty('--toggle-x', `${x}px`)
    document.documentElement.style.setProperty('--toggle-y', `${y}px`)
    document.documentElement.style.setProperty('--toggle-radius', `${endRadius}px`)

    const isReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Fallback if View Transitions API is not supported or reduced motion requested
    if (!document.startViewTransition || isReducedMotion) {
      setDark((prev) => !prev)
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setDark((prev) => !prev)
      })
    })

    transition.ready.then(() => {
      try {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 650,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        )
      } catch {
        // Handled by CSS @keyframes fallback in theme.css
      }
    })
  }

  return (
    <aside className="profile-header">
      {/* TOP CONTROLS (DARK/LIGHT THEME SWITCH - UPPER LEFT) */}
      <div className="topline">
        <button
          className="topline-icon-btn"
          type="button"
          onClick={handleToggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>

      {/* NAME, TAGLINE, BIO */}
      <div className="intro-copy">
        <h1>{personalInfo.name}</h1>
        <p className="tagline">{personalInfo.tagline}</p>
        <p
          className="bio"
          dangerouslySetInnerHTML={{ __html: personalInfo.bio }}
        />
      </div>

      {/* CALL TO ACTION BUTTONS & SOCIALS */}
      <div className="header-actions">
        {personalInfo.resumeUrl && (
          <a
            className="resume-btn"
            href={personalInfo.resumeUrl}
            {...externalProps}
          >
            Resume
          </a>
        )}
        <div className="social-links" aria-label="Social links">
          {personalInfo.socials.github && (
            <a
              href={personalInfo.socials.github}
              {...externalProps}
              aria-label="GitHub"
              title="GitHub"
            >
              <GitBranch size={16} />
            </a>
          )}
          {personalInfo.socials.twitter && (
            <a
              href={personalInfo.socials.twitter}
              {...externalProps}
              aria-label="X"
              title="X"
            >
              <span className="x-symbol">𝕏</span>
            </a>
          )}
          {personalInfo.contact.emailComposeUrl && (
            <a
              href={personalInfo.contact.emailComposeUrl}
              {...externalProps}
              aria-label="Email"
              title="Email"
            >
              <Mail size={16} />
            </a>
          )}
          {personalInfo.contact.phone && (
            <a
              href={`tel:${personalInfo.contact.phone}`}
              aria-label="Phone"
              title="Phone"
            >
              <Phone size={16} />
            </a>
          )}
          {personalInfo.socials.linkedin && (
            <a
              href={personalInfo.socials.linkedin}
              {...externalProps}
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Link2 size={16} />
            </a>
          )}
        </div>
      </div>

      {/* EDUCATION SECTION */}
      {personalInfo.education && personalInfo.education.length > 0 && (
        <div className="education-section">
          <h2 className="sidebar-section-title">Education</h2>
          <div className="education-list">
            {personalInfo.education.map((edu, idx) => (
              <div key={idx} className="education-item">
                <div className="education-header">
                  <span className="education-degree">{edu.degree}</span>
                  {edu.period && (
                    <span className="education-period">{edu.period}</span>
                  )}
                </div>
                <div className="education-sub">
                  <span>{edu.institution}</span>
                  {edu.score && (
                    <>
                      <span className="edu-dot">·</span>
                      <span className="education-score">{edu.score}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SKILLS LIST */}
      <div className="skills-list">
        {personalInfo.skills.map(({ category, list }) => (
          <div key={category} className="skill-row">
            <span className="skill-label">{category}:</span>
            <span className="skill-val">{list}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default PersonalInfo
