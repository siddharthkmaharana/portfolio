import { flushSync } from 'react-dom'
import {
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
        <a
          className="resume-btn mobile-jump-btn"
          href="#content"
          onClick={(e) => {
            e.preventDefault()
            const el = document.getElementById('content')
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        >
          View Work ↓
        </a>
        <div className="social-links" aria-label="Social links">
          {/* GITHUB */}
          {personalInfo.socials.github && (
            <a
              href={personalInfo.socials.github}
              {...externalProps}
              aria-label="GitHub"
              title="GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
          )}

          {/* LINKEDIN */}
          {personalInfo.socials.linkedin && (
            <a
              href={personalInfo.socials.linkedin}
              {...externalProps}
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          )}

          {/* X (TWITTER) */}
          {personalInfo.socials.twitter && (
            <a
              href={personalInfo.socials.twitter}
              {...externalProps}
              aria-label="X"
              title="X"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          )}

          {/* GMAIL */}
          {personalInfo.contact.emailComposeUrl && (
            <a
              href={personalInfo.contact.emailComposeUrl}
              {...externalProps}
              aria-label="Gmail"
              title="Gmail"
            >
              <Mail size={16} />
            </a>
          )}

          {/* WHATSAPP */}
          {(personalInfo.contact.whatsapp || personalInfo.contact.phone) && (
            <a
              href={
                personalInfo.contact.whatsapp ||
                `https://wa.me/${personalInfo.contact.phone.replace(/[^0-9]/g, '')}`
              }
              {...externalProps}
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z" />
              </svg>
            </a>
          )}

          {/* PHONE */}
          {personalInfo.contact.phone && (
            <a
              href={`tel:${personalInfo.contact.phone}`}
              aria-label="Phone"
              title="Phone"
            >
              <Phone size={16} />
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
