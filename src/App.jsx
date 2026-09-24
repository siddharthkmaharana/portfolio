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

const streakMonthHeaders = [
  { name: 'Dec', col: 0 },
  { name: 'Jan', col: 4 },
  { name: 'Feb', col: 8 },
  { name: 'Mar', col: 12 },
  { name: 'Apr', col: 17 },
  { name: 'May', col: 21 },
  { name: 'Jun', col: 26 },
  { name: 'Jul', col: 30 },
  { name: 'Aug', col: 34 },
  { name: 'Sep', col: 39 },
]

const streakHighlights = {
  '9-1': [3, 11],
  '13-2': [3, 12],
  '14-2': [3, 10],
  '16-3': [3, 14],
  '23-3': [3, 12],
  '25-6': [3, 13],
  '26-0': [3, 11],
  '27-3': [3, 12],
  '27-4': [3, 14],
  '27-5': [3, 11],
  '27-6': [3, 10],
  '36-2': [3, 12],
  '38-1': [4, 22],
  '39-0': [4, 24],
  '40-2': [3, 11],
}

const streakInactives = new Set([
  '41-5', '41-6',
  '42-0', '42-1', '42-3', '42-4', '42-5', '42-6',
  '43-0', '43-1', '43-2', '43-3', '43-4', '43-5', '43-6',
])

function generateStreakWeeks() {
  const startDate = new Date(2025, 11, 7) // Dec 7, 2025 (Sunday)
  const weeks = []

  for (let w = 0; w < 44; w++) {
    const days = []
    for (let d = 0; d < 7; d++) {
      const cellDate = new Date(startDate)
      cellDate.setDate(startDate.getDate() + w * 7 + d)
      const dateStr = cellDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })

      const key = `${w}-${d}`
      let level = 2
      let count = 5 + ((w * 3 + d * 5) % 4)

      if (streakInactives.has(key)) {
        level = 0
        count = 0
      } else if (streakHighlights[key]) {
        level = streakHighlights[key][0]
        count = streakHighlights[key][1]
      } else if ((w + d) % 9 === 0) {
        level = 1
        count = 2 + (d % 2)
      }

      days.push({ level, count, date: dateStr })
    }
    weeks.push(days)
  }
  return weeks
}

const streakWeeksData = generateStreakWeeks()

function StatsView() {
  const [hoveredCell, setHoveredCell] = useState(null)

  return (
    <div className="view stats-view">
      <div className="stats-container">
        {/* MANUAL GITHUB CONTRIBUTIONS & ACTIVITY CARD */}
        <article className="stat-card github-contributions-card">
          {/* HEADER */}
          <div className="github-contributions-header">
            <div className="github-contributions-title-area">
              <h2 className="github-contributions-title">GitHub Contributions</h2>
              <p className="github-contributions-subtitle">
                My contributions to GitHub repositories in the past 12 months
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
                {/* Month labels */}
                <div className="streak-months-row">
                  {streakMonthHeaders.map((m) => (
                    <span
                      key={m.name}
                      className="streak-month-label"
                      style={{ left: `${m.col * 15.5}px` }}
                    >
                      {m.name}
                    </span>
                  ))}
                </div>

                {/* 7x44 Grid */}
                <div className="streak-grid">
                  {streakWeeksData.map((week, wIdx) => (
                    <div key={wIdx} className="streak-col">
                      {week.map((day, dIdx) => (
                        <div
                          key={dIdx}
                          className={`streak-cell level-${day.level}`}
                          title={`${day.count} activities on ${day.date}`}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            setHoveredCell({
                              count: day.count,
                              date: day.date,
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

            {/* Custom scrollbar track matching reference image */}
            <div className="streak-scrollbar-track">
              <div className="streak-scrollbar-thumb" />
            </div>
          </div>

          {/* FOOTER ROW */}
          <div className="streak-footer-row">
            <div className="streak-count-label">
              <span>4575 activities in past 12 months</span>
            </div>
            <div className="streak-legend">
              <span className="legend-label">Less</span>
              <span className="streak-cell level-0" title="0 activities" />
              <span className="streak-cell level-1" title="1-3 activities" />
              <span className="streak-cell level-2" title="4-8 activities" />
              <span className="streak-cell level-3" title="9-14 activities" />
              <span className="streak-cell level-4" title="15+ activities" />
              <span className="legend-label">More</span>
            </div>
          </div>

          {/* CONTRIBUTION ACTIVITY SECTION */}
          <div className="contribution-activity-section">
            <div className="activity-section-header">
              <h3>Contribution activity</h3>
            </div>

            <div className="activity-month-divider">
              <span className="activity-month-tag">
                September <strong>2026</strong>
              </span>
              <span className="activity-month-line" />
            </div>

            <div className="activity-timeline">
              {/* COMMITS ITEM */}
              <div className="activity-item">
                <div className="activity-icon-col">
                  <div className="activity-icon-badge">
                    <GitCommit size={15} />
                  </div>
                  <div className="activity-timeline-line" />
                </div>
                <div className="activity-content-col">
                  <div className="activity-heading-row">
                    <h4>Created 30 commits in 5 repositories</h4>
                  </div>
                  <div className="activity-repos-list">
                    <div className="activity-repo-row">
                      <div className="activity-repo-info">
                        <a
                          href="https://github.com/siddharthkmaharana/siddharthkmaharana"
                          {...externalProps}
                          className="activity-repo-name"
                        >
                          siddharthkmaharana/siddharthkmaharana
                        </a>
                        <span className="activity-commit-count">19 commits</span>
                      </div>
                      <div className="activity-progress-track">
                        <div className="activity-progress-fill" style={{ width: '68%' }} />
                      </div>
                    </div>

                    <div className="activity-repo-row">
                      <div className="activity-repo-info">
                        <a
                          href="https://github.com/siddharthkmaharana/leetcode-solutions"
                          {...externalProps}
                          className="activity-repo-name"
                        >
                          siddharthkmaharana/leetcode-solutions
                        </a>
                        <span className="activity-commit-count">4 commits</span>
                      </div>
                      <div className="activity-progress-track">
                        <div className="activity-progress-fill" style={{ width: '22%' }} />
                      </div>
                    </div>

                    <div className="activity-repo-row">
                      <div className="activity-repo-info">
                        <a
                          href="https://github.com/siddharthkmaharana/Merkle-Tree-Visualizer"
                          {...externalProps}
                          className="activity-repo-name"
                        >
                          siddharthkmaharana/Merkle-Tree-Visualizer
                        </a>
                        <span className="activity-commit-count">4 commits</span>
                      </div>
                      <div className="activity-progress-track">
                        <div className="activity-progress-fill" style={{ width: '22%' }} />
                      </div>
                    </div>

                    <div className="activity-repo-row">
                      <div className="activity-repo-info">
                        <a
                          href="https://github.com/siddharthkmaharana/Integrated-Food-Delivery-and-Dine-Out-Hospitality-Platform"
                          {...externalProps}
                          className="activity-repo-name"
                        >
                          siddharthkmaharana/Integrated-Food-De...
                        </a>
                        <span className="activity-commit-count">2 commits</span>
                      </div>
                      <div className="activity-progress-track">
                        <div className="activity-progress-fill" style={{ width: '12%' }} />
                      </div>
                    </div>

                    <div className="activity-repo-row">
                      <div className="activity-repo-info">
                        <a
                          href="https://github.com/siddharthkmaharana/portfolio"
                          {...externalProps}
                          className="activity-repo-name"
                        >
                          siddharthkmaharana/portfolio
                        </a>
                        <span className="activity-commit-count">1 commit</span>
                      </div>
                      <div className="activity-progress-track">
                        <div className="activity-progress-fill" style={{ width: '6%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* REPOSITORY CREATED ITEM */}
              <div className="activity-item">
                <div className="activity-icon-col">
                  <div className="activity-icon-badge">
                    <FolderGit2 size={15} />
                  </div>
                  <div className="activity-timeline-line" />
                </div>
                <div className="activity-content-col">
                  <div className="activity-heading-row">
                    <h4>Created 1 repository</h4>
                  </div>
                  <div className="activity-repo-created-card">
                    <div className="activity-repo-created-left">
                      <Code2 size={15} className="repo-code-icon" />
                      <a
                        href="https://github.com/siddharthkmaharana/portfolio"
                        {...externalProps}
                        className="activity-repo-name"
                      >
                        siddharthkmaharana/portfolio
                      </a>
                    </div>
                    <div className="activity-repo-created-right">
                      <span className="lang-pill">
                        <span className="lang-dot purple" />
                        CSS
                      </span>
                      <span className="activity-date-badge">Sep 2</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PULL REQUEST ITEM */}
              <div className="activity-item">
                <div className="activity-icon-col">
                  <div className="activity-icon-badge">
                    <GitPullRequest size={15} />
                  </div>
                </div>
                <div className="activity-content-col">
                  <div className="activity-heading-row">
                    <h4>Opened 1 pull request in 1 repository</h4>
                  </div>
                  <div className="activity-pr-block">
                    <div className="activity-pr-repo-row">
                      <a
                        href="https://github.com/siddharthkmaharana/Merkle-Tree-Visualizer"
                        {...externalProps}
                        className="activity-repo-name"
                      >
                        siddharthkmaharana/Merkle-Tree-Visualizer
                      </a>
                      <span className="pr-status-pill merged">
                        <span className="pr-merged-count">1</span> merged
                      </span>
                    </div>
                    <div className="activity-pr-detail-row">
                      <div className="activity-pr-title">
                        <GitPullRequest size={13} className="pr-inline-icon" />
                        <a
                          href="https://github.com/siddharthkmaharana/Merkle-Tree-Visualizer/pulls"
                          {...externalProps}
                        >
                          feat: decouple base44 leftovers, add client API, fix visualization al...
                        </a>
                      </div>
                      <span className="activity-date-badge">Sep 14</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SHOW MORE ACTIVITY LINK */}
            <div className="activity-footer">
              <a
                href="https://github.com/siddharthkmaharana"
                {...externalProps}
                className="show-more-activity-btn"
              >
                Show more activity
              </a>
            </div>
          </div>
        </article>

        {/* FLOATING HOVER TOOLTIP */}
        {hoveredCell && (
          <div
            className="streak-tooltip-bubble"
            style={{ left: `${hoveredCell.x}px`, top: `${hoveredCell.top}px` }}
          >
            <strong>{hoveredCell.count} activities</strong> on {hoveredCell.date}
          </div>
        )}

        {/* BOTTOM ROW: TAKE U FORWARD + LEETCODE & NOTION */}
        <div className="stats-subgrid">
          <article className="stat-card progress-stat">
            <div className="stat-card-title">
              <span>Take U Forward</span>
              <ArrowUpRight size={14} />
            </div>
            <div className="progress-number">
              <strong>61 <small>/ 191</small></strong>
              <span>32%</span>
            </div>
            <div className="progress-bar">
              <i />
            </div>
            <div className="progress-breakdown">
              <span>Easy <b>17 / 32</b></span>
              <span>Medium <b>34 / 95</b></span>
              <span>Hard <b>10 / 64</b></span>
            </div>
          </article>

          <div className="stats-secondary-col">
            <a className="stat-card leetcode-stat" href="https://leetcode.com/u/siddharthkmleetcode/" {...externalProps}>
              <div className="stat-card-title">
                <span>LeetCode Heatmap</span>
                <ArrowUpRight size={14} />
              </div>
              <div className="leetcode-mark">LC</div>
              <p>Consistency compounds.</p>
            </a>

            <article className="stat-card notion-stat">
              <div className="notion-mark">N</div>
              <div>
                <strong>Learning archive</strong>
                <p>Notion embed / currently collecting notes.</p>
              </div>
              <ArrowUpRight size={14} />
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}

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
