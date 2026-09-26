import { useLayoutEffect, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, GitBranch } from 'lucide-react'
import { statsData } from '../data/stats'

const externalProps = { target: '_blank', rel: 'noreferrer' }

export function Stats({ data = statsData }) {
  const [hoveredCell, setHoveredCell] = useState(null)
  const scrollRef = useRef(null)
  const streak = data.realStreak || {}
  const totalContributions = streak.total || '449'
  const username = data.githubUsername || 'siddharthkmaharana'
  const profileUrl = data.githubProfileUrl || `https://github.com/${username}`

  // Automatically scroll to the right edge on mount so recent contributions are shown first
  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
    }
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
      }
    })
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
      }
    }, 60)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [])

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
              href={profileUrl}
              {...externalProps}
              className="github-profile-link-btn"
              title="Open Siddharth's GitHub Profile"
            >
              <GitBranch size={15} />
              <span>{username}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* STREAK MAP CALENDAR BOX */}
          <div className="streak-calendar-box">
            <div className="streak-calendar-scroll" ref={scrollRef}>
              <div className="streak-calendar-content">
                {/* Month labels along the top */}
                {streak.monthHeaders && (
                  <div className="streak-months-row">
                    {streak.monthHeaders.map((m, idx) => (
                      <span
                        key={idx}
                        className="streak-month-label"
                        style={{ left: `${30 + m.col * 14.5}px` }}
                      >
                        {m.name}
                      </span>
                    ))}
                  </div>
                )}

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
                    {streak.weeks &&
                      streak.weeks.map((week, wIdx) => (
                        <div key={wIdx} className="streak-col">
                          {week.map((day) => (
                            <div
                              key={day.row}
                              className={`streak-cell level-${day.level}`}
                              title={
                                day.tip ||
                                `${day.count} contributions on ${day.formattedDate}`
                              }
                              onMouseEnter={(e) => {
                                const rect =
                                  e.currentTarget.getBoundingClientRect()
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

        {/* LEETCODE SUBMISSIONS CARD */}
        {data.leetcode && (
          <article className="stat-card leetcode-contributions-card">
            {/* HEADER */}
            <div className="leetcode-header">
              <div className="leetcode-title-area">
                <div className="leetcode-title-row">
                  <span className="leetcode-badge-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.874 5.874 0 0 0 .349 1.017 5.938 5.938 0 0 0 .481.82 5.763 5.763 0 0 0 3.513 2.35 5.46 5.46 0 0 0 1.258.125 5.434 5.434 0 0 0 2.238-.475 5.753 5.753 0 0 0 1.625-1.125l3.854-4.126 5.406-5.788a1.374 1.374 0 0 0-.012-1.928 1.374 1.374 0 0 0-1.928-.012l-5.394 5.788-3.854 4.126a3.02 3.02 0 0 1-.856.592 2.71 2.71 0 0 1-1.125.238 2.735 2.735 0 0 1-.628-.063 2.973 2.973 0 0 1-1.815-1.213 3.064 3.064 0 0 1-.25-.425 3.03 3.03 0 0 1-.175-.525 2.8 2.8 0 0 1-.038-1.2 2.72 2.72 0 0 1 .625-1.075l3.854-4.126 5.406-5.788A1.374 1.374 0 0 0 13.483 0z" />
                    </svg>
                  </span>
                  <h2 className="leetcode-title">LeetCode Submissions</h2>
                </div>
                <p className="leetcode-subtitle">
                  {data.leetcode.totalSolved} problems solved · {data.leetcode.acceptanceRate} acceptance rate
                </p>
              </div>
              <a
                href={data.leetcode.profileUrl}
                {...externalProps}
                className="github-profile-link-btn leetcode-profile-btn"
                title="View Siddharth's LeetCode Profile"
              >
                <span>{data.leetcode.username}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* LEETCODE BODY GRID */}
            <div className="leetcode-body-grid">
              {/* LEFT: SOLVED BREAKDOWN */}
              <div className="leetcode-overview-panel">
                <div className="leetcode-total-box">
                  <div className="leetcode-circle-stat">
                    <span className="leetcode-big-num">{data.leetcode.totalSolved}</span>
                    <span className="leetcode-total-label">solved</span>
                  </div>
                  <div className="leetcode-sub-stats">
                    <div className="leetcode-sub-row">
                      <span className="sub-stat-label">Total Submissions</span>
                      <span className="sub-stat-val">{data.leetcode.totalSubmissions}</span>
                    </div>
                    <div className="leetcode-sub-row">
                      <span className="sub-stat-label">Acceptance Rate</span>
                      <span className="sub-stat-val highlight">{data.leetcode.acceptanceRate}</span>
                    </div>
                  </div>
                </div>

                {/* DIFFICULTY PROGRESS BARS */}
                <div className="difficulty-bars-list">
                  {data.leetcode.breakdown.map((item) => {
                    const percent = Math.max(6, Math.min(100, Math.round((item.solved / 15) * 100)))
                    return (
                      <div key={item.difficulty} className="diff-bar-item">
                        <div className="diff-bar-header">
                          <span className={`diff-name ${item.difficulty.toLowerCase()}`}>
                            {item.difficulty}
                          </span>
                          <span className="diff-counts">
                            <b>{item.solved}</b> <small>/ {item.total}</small>
                          </span>
                        </div>
                        <div className="diff-progress-track">
                          <div
                            className={`diff-progress-fill ${item.difficulty.toLowerCase()}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* RIGHT: RECENT ACCEPTED SUBMISSIONS */}
              <div className="leetcode-recent-panel">
                <div className="recent-panel-header">
                  <h3>Recent Accepted Solutions</h3>
                </div>
                <div className="recent-submissions-list">
                  {data.leetcode.recentSubmissions.map((sub, idx) => (
                    <a
                      key={idx}
                      href={`https://leetcode.com/problems/${sub.slug}/`}
                      {...externalProps}
                      className="recent-submission-row"
                    >
                      <div className="recent-sub-info">
                        <span className="recent-sub-dot" />
                        <span className="recent-sub-title">{sub.title}</span>
                      </div>
                      <div className="recent-sub-meta">
                        <span className={`diff-badge ${sub.difficulty.toLowerCase()}`}>
                          {sub.difficulty}
                        </span>
                        <ArrowUpRight size={13} className="sub-arrow" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </article>
        )}

        {/* FLOATING HOVER TOOLTIP */}
        {hoveredCell && (
          <div
            className="streak-tooltip-bubble"
            style={{
              left: `${hoveredCell.x}px`,
              top: `${hoveredCell.top}px`,
            }}
          >
            {hoveredCell.count > 0 ? (
              <>
                <strong>
                  {hoveredCell.count}{' '}
                  {hoveredCell.count === 1 ? 'contribution' : 'contributions'}
                </strong>{' '}
                on {hoveredCell.date}
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

export default Stats
