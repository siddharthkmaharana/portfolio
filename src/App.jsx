import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  FolderGit2,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Globe2,
  Link2,
  Mail,
  MapPin,
  Moon,
  Phone,
  Rss,
  Search,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'
import './App.css'
import githubRealStreak from './github-real-streak.json'

const projects = [
  {
    title: 'Cortexa',
    date: 'May 7, 2026',
    description: 'Cross-platform AI desktop assistant combining computer vision, conversational AI, voice interactions, and desktop/browser automation.',
    tags: ['Electron', 'React', 'FastAPI', 'Python', 'Claude API', 'Playwright', 'Whisper'],
    features: 'Real-time object detection, OCR, barcode scanning, scene understanding, voice interaction, and persistent memory.',
    source: 'https://github.com/siddharthkmaharana/Cortexa',
    accent: 'coral',
    image: '/projects/cortexa.jpg',
  },
  {
    title: 'Merkle Tree Visualizer',
    date: 'January 5, 2026',
    description: 'Interactive visualization tool for understanding and verifying data integrity with Merkle Trees and SHA-256 hashing.',
    tags: ['HTML', 'CSS', 'JavaScript', 'SHA-256', 'Cryptography', 'Visualization'],
    type: 'Research Project',
    live: 'https://wanderlustt-ziz3.onrender.com/',
    source: 'https://github.com/siddharthkmaharana/Merkle-Tree-Visualizer',
    accent: 'mint',
    image: '/projects/merkle.jpg',
  },
  {
    title: 'Integrated Food Delivery & Dine-Out Platform',
    date: 'July 28, 2025',
    description: 'Full-stack food ordering and dine-out platform with geospatial restaurant discovery, gamified reviews, real-time order tracking, and state-based order management.',
    tags: ['React', 'Vite', 'Node.js', 'MongoDB Atlas', 'Socket.io', 'JWT', 'AWS EC2'],
    features: 'GeoJSON restaurant discovery, gamified reviews, live tracking, and a six-state order workflow from placement to delivery.',
    live: 'https://integrated-food-delivery-and-dine-o.vercel.app/',
    source: 'https://github.com/siddharthkmaharana/Integrated-Food-Delivery-and-Dine-Out-Hospitality-Platform',
    accent: 'blue',
    image: '/projects/food_delivery.jpg',
  },
  {
    title: 'Telemedicine & EHR Platform',
    date: 'November 20, 2024',
    description: 'Secure telemedicine platform featuring appointment scheduling, electronic health records, QR-verified prescriptions, and WebRTC consultations.',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'WebRTC', 'Socket.io', 'AES-256'],
    features: 'Patient, doctor, and admin roles with JWT authentication, encryption, audit logging, and collision-aware scheduling.',
    source: 'https://github.com/siddharthkmaharana/Telemedicine-EHR-Platform',
    accent: 'violet',
    image: '/projects/telemedicine.jpg',
  },
]

const til = [
  ['August 30, 2025', 'Added the Stats section to the portfolio.'],
  ['August 29, 2025', 'Finished the Zentry project sections, including Features, Nav, and CTA.', 'My favorite design project till date.'],
  ['August 28, 2025', 'Progressed on zentry.com.', 'Added the Navbar, About section, and an audio player.'],
  ['August 27, 2025', 'Started a design-heavy recreation of the Awwwards-winning zentry.com.', 'Built its Hero section today.'],
  ['August 9, 2025', 'Did a lot of work on PrepWise.', 'Implemented authentication and the complete home page; explored Firebase.'],
  ['August 8, 2025', 'Started my new project PrepWise.', 'Did basic setup and started working on quant.'],
  ['August 7, 2025', 'Grinded LeetCode quite a bit for placement season.', 'Attended a Grant Thornton session.'],
  ['August 6, 2025', "Worked on the UI for my internship project with buttery scrolls and fluid glass designs.", "Tomorrow's submission day!"],
  ['August 5, 2025', 'Stayed awake all night revamping my portfolio.', 'Heck of a night.'],
]

const designs = [
  { title: "Zentry's Replica", description: 'My favourite design project till date. Recreating the zentry.com web, an Awwwards-winning website.', className: 'zentry', label: 'ZENTRY / 01' },
  { title: 'my first portfolio attempt', description: 'A futuristic Apple-ish design for portfolio.', className: 'apple', label: 'PORTFOLIO / 02' },
  { title: 'my second portfolio revamp', description: 'A sleek, modern UI designed portfolio with buttery smooth scrolling and minimalism.', className: 'glass', label: 'REVAMP / 03' },
  { title: 'Spotify Clone', description: 'A focused music interface study with playlists, bold color, and motion.', className: 'spotify', label: 'MUSIC / 04' },
]

const skillGroups = [
  ['Programming Languages', 'Java, JavaScript, TypeScript'],
  ['Frontend', 'React.js, Next.js, TailwindCSS, Bootstrap, Material-UI, Chart.js, HTML, SCSS, Skiper UI, Framer Motion, React Hook Form'],
  ['Javascript runtime', 'Node.js'],
  ['Backend', 'Express.js, REST APIs'],
  ['Database', 'MongoDB, MySQL'],
  ['Cloud', 'Render, Vercel, Cloudinary'],
  ['Tools', 'Git, Mapbox, Cloudflare, Firebase'],
  ['Tech Stack', 'MERN'],
]

const externalProps = { target: '_blank', rel: 'noreferrer' }

function App() {
  const [activeTab, setActiveTab] = useState('Projects')
  const [query, setQuery] = useState('')
  const [dark, setDark] = useState(true)
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim()
    if (!normalizedQuery) return projects
    return projects.filter((project) =>
      [project.title, project.description, ...project.tags].join(' ').toLowerCase().includes(normalizedQuery)
    )
  }, [query])

  return (
    <div className={dark ? 'app dark' : 'app light'}>
      <div className="layout-frame">
        <main className="page-shell">
          {/* LEFT SIDEBAR / PROFILE */}
          <aside className="profile-header">
            <div className="topline">
              <span className="topline-spacer" />
              <div className="topline-controls">
                <a
                  href="https://siddharthkmaharana.github.io"
                  {...externalProps}
                  className="topline-icon-btn"
                  aria-label="Feed"
                  title="Feed"
                >
                  <Rss size={16} />
                </a>
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

            <div className="intro-copy">
              <h1>Siddharth</h1>
              <p className="tagline">Bringing Ideas to Reality ✨</p>
              <p className="bio">
                Hey there 👋 I'm <span className="text-highlight">Siddharth Kumar Maharana</span> - I'm an aspiring software developer. I mostly work on web and i like to fiddle around with what's trendy, <span className="text-highlight">unique</span> and cool. I've been grinding <span className="text-highlight">DSA</span> & <span className="text-highlight">Development</span> quite sometime now, I love Modern UI/UX, Computer Science, and creating elegant solutions to complex problems.
              </p>
            </div>

            <div className="header-actions">
              <button className="schedule-call-btn" type="button" onClick={() => setScheduleOpen(true)}>
                Schedule a call
              </button>
              <a
                className="resume-btn"
                href="https://drive.google.com/drive/folders/1SudVVuHk8fNFA_Akuoe5ap9LSgTFrxHp?usp=drive_link"
                {...externalProps}
              >
                Resume
              </a>
              <div className="social-links" aria-label="Social links">
                <a href="https://github.com/siddharthkmaharana" {...externalProps} aria-label="GitHub" title="GitHub">
                  <GitBranch size={16} />
                </a>
                <a href="https://x.com/Siddharth_km2" {...externalProps} aria-label="X" title="X">
                  <span className="x-symbol">𝕏</span>
                </a>
                <a href="https://mail.google.com/mail/u/0/?fs=1&to=dharaindrayudh16@gmail.com&tf=cm" {...externalProps} aria-label="Email" title="Email">
                  <Mail size={16} />
                </a>
                <a href="tel:+916370553290" aria-label="Phone" title="Phone">
                  <Phone size={16} />
                </a>
                <a href="https://www.linkedin.com/in/siddharth-kumar-maharana/" {...externalProps} aria-label="LinkedIn" title="LinkedIn">
                  <Link2 size={16} />
                </a>
              </div>
            </div>

            <div className="skills-list">
              {skillGroups.map(([label, value]) => (
                <div key={label} className="skill-row">
                  <span className="skill-label">{label}:</span>
                  <span className="skill-val">{value}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* RIGHT CONTENT SECTION */}
          <section className="content-section" id="content">
            <div className="tab-bar-wrapper">
              <nav className="tab-bar" aria-label="Portfolio sections">
                {['Projects', 'Experience', 'TIL', 'Designs', 'Stats'].map((tab) => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="content-body">
              {activeTab === 'Projects' && (
                <ProjectsView
                  projects={filteredProjects}
                  query={query}
                  setQuery={setQuery}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                />
              )}
              {activeTab === 'Experience' && <ExperienceView />}
              {activeTab === 'TIL' && <TilView />}
              {activeTab === 'Designs' && <DesignsView />}
              {activeTab === 'Stats' && <StatsView />}
            </div>
          </section>
        </main>
      </div>

      {/* FLOATING CALENDAR BUTTON */}
      <button
        type="button"
        className="floating-calendar-btn"
        onClick={() => setScheduleOpen(true)}
        aria-label="Schedule a call"
        title="Schedule a call"
      >
        <CalendarDays size={18} />
      </button>

      {scheduleOpen && <ScheduleModal onClose={() => setScheduleOpen(false)} />}
    </div>
  )
}

function ProjectsView({ projects: visibleProjects, query, setQuery, selectedProject, setSelectedProject }) {
  return (
    <div className="view projects-view">
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

      <div className="project-list">
        {visibleProjects.map((project) => (
          <article
            className={`project-card ${selectedProject === project.title ? 'expanded' : ''}`}
            key={project.title}
            onClick={() => setSelectedProject(selectedProject === project.title ? null : project.title)}
          >
            <div className="project-content">
              <div className="project-title-row">
                <h3>{project.title}</h3>
                <span className="date-badge">{project.date}</span>
              </div>
              <p className="project-desc">{project.description}</p>
              {project.features && (
                <p className="project-features-text">{project.features}</p>
              )}
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-badge">{tag}</span>
                ))}
              </div>
              <div className="project-links-row">
                {project.live && (
                  <a
                    href={project.live}
                    {...externalProps}
                    aria-label={`${project.title} live project`}
                    onClick={(event) => event.stopPropagation()}
                    className="project-action-btn"
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
                  >
                    <GitBranch size={16} />
                  </a>
                )}
              </div>
            </div>

            {project.image && (
              <div className="project-preview-box">
                <img src={project.image} alt={project.title} className="project-preview-image" />
              </div>
            )}
          </article>
        ))}
        {!visibleProjects.length && (
          <div className="empty-state">
            <Search size={22} />
            <p>No projects match “{query}”.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ExperienceView() {
  return (
    <div className="view experience-view">
      <div className="experience-card">
        <div className="experience-top">
          <div>
            <h2>Infotact Solutions, Bengaluru</h2>
            <p className="role">Web Development Intern <span>· On-site</span></p>
          </div>
          <span className="date-badge">February 2026 – May 2026</span>
        </div>
        <ul>
          <li>Developed and tested 5+ responsive React.js modules integrated with Node.js/Express.js REST APIs.</li>
          <li>Integrated frontend components with MongoDB backend services, implementing data-fetching patterns and state management.</li>
          <li>Collaborated in an Agile environment through sprint planning, daily standups, and code reviews.</li>
          <li>Wrote unit and integration tests using Jest and maintained 80%+ coverage on assigned modules.</li>
          <li>Earned “Top Performer” recognition on two occasions.</li>
        </ul>
        <div className="experience-stamp">
          <Check size={14} /> TOP PERFORMER × 2
        </div>
      </div>
    </div>
  )
}

function TilView() {
  return (
    <div className="view til-view">
      <div className="timeline">
        {til.map(([date, ...notes]) => (
          <article key={date} className="timeline-item">
            <div className="timeline-date-col">
              <span className="date-badge">{date}</span>
            </div>
            <div className="timeline-marker" />
            <div className="timeline-copy">
              {notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function DesignsView() {
  return (
    <div className="view designs-view">
      <div className="design-grid">
        {designs.map((design) => (
          <article className={`design-card ${design.className}`} key={design.title}>
            <div className="design-art">
              <span>{design.label}</span>
              <i />
            </div>
            <div className="design-copy">
              <h3>{design.title}</h3>
              <p>{design.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function StatsView() {
  const [hoveredCell, setHoveredCell] = useState(null)
  const totalContributions = githubRealStreak.total || '449'

  return (
    <div className="view stats-view">
      <div className="stats-container">
        {/* REAL GITHUB CONTRIBUTIONS STREAK CARD */}
        <article className="stat-card github-contributions-card">
          {/* HEADER */}
          <div className="github-contributions-header">
            <div className="github-contributions-title-area">
              <h2 className="github-contributions-title">GitHub Contributions</h2>
              <p className="github-contributions-subtitle">
                {totalContributions} contributions in the last year
              </p>
            </div>
            <a
              href="https://github.com/siddharthkmaharana"
              {...externalProps}
              className="github-profile-link-btn"
              title="Open Siddharth's GitHub Profile"
            >
              <GitBranch size={15} />
              <span>siddharthkmaharana</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* STREAK MAP CALENDAR BOX */}
          <div className="streak-calendar-box">
            <div className="streak-calendar-scroll">
              <div className="streak-calendar-content">
                {/* Month labels along the top */}
                <div className="streak-months-row">
                  {githubRealStreak.monthHeaders.map((m, idx) => (
                    <span
                      key={idx}
                      className="streak-month-label"
                      style={{ left: `${30 + m.col * 14.5}px` }}
                    >
                      {m.name}
                    </span>
                  ))}
                </div>

                {/* Day labels + 53 Week Columns */}
                <div className="streak-grid-wrapper">
                  <div className="streak-day-labels">
                    <span className="streak-day-label" />
                    <span className="streak-day-label">Mon</span>
                    <span className="streak-day-label" />
                    <span className="streak-day-label">Wed</span>
                    <span className="streak-day-label" />
                    <span className="streak-day-label">Fri</span>
                    <span className="streak-day-label" />
                  </div>

                  <div className="streak-grid">
                    {githubRealStreak.weeks.map((week, wIdx) => (
                      <div key={wIdx} className="streak-col">
                        {week.map((day) => (
                          <div
                            key={day.row}
                            className={`streak-cell level-${day.level}`}
                            title={day.tip || `${day.count} contributions on ${day.formattedDate}`}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect()
                              setHoveredCell({
                                count: day.count,
                                date: day.formattedDate,
                                tip: day.tip,
                                x: rect.left + rect.width / 2,
                                top: rect.top - 8,
                              })
                            }}
                            onMouseLeave={() => setHoveredCell(null)}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Custom scrollbar track */}
            <div className="streak-scrollbar-track">
              <div className="streak-scrollbar-thumb" />
            </div>
          </div>

          {/* FOOTER ROW */}
          <div className="streak-footer-row">
            <div className="streak-count-label">
              <span>{totalContributions} contributions in the last year</span>
            </div>
            <div className="streak-legend">
              <span className="legend-label">Less</span>
              <span className="streak-cell level-0" title="No contributions" />
              <span className="streak-cell level-1" title="1-3 contributions" />
              <span className="streak-cell level-2" title="4-8 contributions" />
              <span className="streak-cell level-3" title="9-14 contributions" />
              <span className="streak-cell level-4" title="15+ contributions" />
              <span className="legend-label">More</span>
            </div>
          </div>
        </article>

        {/* FLOATING HOVER TOOLTIP */}
        {hoveredCell && (
          <div
            className="streak-tooltip-bubble"
            style={{ left: `${hoveredCell.x}px`, top: `${hoveredCell.top}px` }}
          >
            {hoveredCell.count > 0 ? (
              <>
                <strong>{hoveredCell.count} {hoveredCell.count === 1 ? 'contribution' : 'contributions'}</strong> on {hoveredCell.date}
              </>
            ) : (
              <>No contributions on {hoveredCell.date}</>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const GitHubView = StatsView

function ScheduleModal({ onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="schedule-modal" role="dialog" aria-modal="true" aria-labelledby="schedule-title" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <div className="modal-kicker">
          <Clock3 size={14} /> 15 MINUTES · ASIA/KOLKATA
        </div>
        <h2 id="schedule-title">Let's connect.</h2>
        <p className="modal-description">Pick a time for a quick conversation about software, ideas, or whatever you are building.</p>
        <div className="booking-grid">
          <div>
            <p className="calendar-label">September 2026</p>
            <div className="calendar-head">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="calendar-days">
              {Array.from({ length: 30 }, (_, index) => (
                <button key={index} type="button" className={index === 23 ? 'selected' : ''} disabled={index < 22}>
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="availability">
            <p className="calendar-label">Available times</p>
            <p className="availability-note">
              <MapPin size={14} /> Google Meet · 4 locations
            </p>
            {['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((time) => (
              <button key={time} type="button" className="time-slot">
                {time}
                <ChevronDown size={14} />
              </button>
            ))}
          </div>
        </div>
        <p className="modal-footnote">A calendar invite and location details will be shared after confirmation.</p>
      </div>
    </div>
  )
}

export default App
