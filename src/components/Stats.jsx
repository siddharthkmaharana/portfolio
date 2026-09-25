import { useState } from 'react'
import { ArrowUpRight, GitBranch } from 'lucide-react'
import { statsData } from '../data/stats'

const externalProps = { target: '_blank', rel: 'noreferrer' }

export function Stats({ data = statsData }) {
  const [hoveredCell, setHoveredCell] = useState(null)
  const streak = data.realStreak || {}
  const totalContributions = streak.total || '449'
  const username = data.githubUsername || 'siddharthkmaharana'
  const profileUrl = data.githubProfileUrl || `https://github.com/${username}`

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
            <div className="streak-calendar-scroll">
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
