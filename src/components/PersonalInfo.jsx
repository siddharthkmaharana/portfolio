import {
  GitBranch,
  Link2,
  Mail,
  Moon,
  Phone,
  Rss,
  Sun,
} from 'lucide-react'
import personalInfo from '../data/personalInfo'

const externalProps = { target: '_blank', rel: 'noreferrer' }

export function PersonalInfo({ dark, setDark, onScheduleCall }) {
  return (
    <aside className="profile-header">
      {/* TOP CONTROLS (RSS FEED & THEME TOGGLE) */}
      <div className="topline">
        <span className="topline-spacer" />
        <div className="topline-controls">
          {personalInfo.feedUrl && (
            <a
              href={personalInfo.feedUrl}
              {...externalProps}
              className="topline-icon-btn"
              aria-label="Feed"
              title="Feed"
            >
              <Rss size={16} />
            </a>
          )}
          <button
            className="topline-icon-btn"
            type="button"
            onClick={() => setDark((value) => !value)}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
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
        <button
          className="schedule-call-btn"
          type="button"
          onClick={onScheduleCall}
        >
          Schedule a call
        </button>
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
