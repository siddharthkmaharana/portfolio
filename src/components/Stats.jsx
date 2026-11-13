import { useLayoutEffect, useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { ArrowUpRight, GitBranch, Flame, Zap, RotateCw } from 'lucide-react'
import { statsData } from '../data/stats'

const externalProps = { target: '_blank', rel: 'noreferrer' }

export function Stats({ data = statsData }) {
  const [hoveredCell, setHoveredCell] = useState(null)
  const scrollRef = useRef(null)
  const leetcodeScrollRef = useRef(null)
  const username = data.githubUsername || 'siddharthkmaharana'
  const profileUrl = data.githubProfileUrl || `https://github.com/${username}`
  const leetcodeUsername = data.leetcode?.username || 'siddharthkmleetcode'

  const [streak, setStreak] = useState(() => {
    try {
      const cached = localStorage.getItem(`gh_streak_${username}`)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (Date.now() - parsed.timestamp < 10 * 60 * 1000 && parsed.data?.weeks?.length === 53) {
          return parsed.data
        }
      }
    } catch (e) {}
    return data.realStreak || {}
  })

  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSynced, setLastSynced] = useState(() => {
    return streak.lastUpdated ? new Date(streak.lastUpdated) : null
  })

  // LeetCode live sync state
  const [leetcodeData, setLeetcodeData] = useState(() => {
    try {
      const cached = localStorage.getItem(`lc_stats_${leetcodeUsername}`)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (Date.now() - parsed.timestamp < 10 * 60 * 1000 && parsed.data) {
          return parsed.data
        }
      }
    } catch (e) {}
    return data.leetcode || {}
  })
  const [isLeetcodeSyncing, setIsLeetcodeSyncing] = useState(false)

  const syncWithGithub = useCallback(async (showLoading = true) => {
    if (showLoading) setIsSyncing(true)
    try {
      let days = null
      let total = null

      // Primary live contributions API
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
          headers: { Accept: 'application/json' },
        })
        if (res.ok) {
          const json = await res.json()
          if (Array.isArray(json.contributions) && json.contributions.length > 0) {
            days = json.contributions
            total = json.total?.lastYear
          }
        }
      } catch (err1) {
        console.warn('Primary contributions API unreachable, attempting secondary...', err1)
      }

      // Secondary fallback live API
      if (!days) {
        try {
          const res2 = await fetch(`https://github-contributions.vercel.app/api/v1/${username}`)
          if (res2.ok) {
            const json2 = await res2.json()
            if (Array.isArray(json2.contributions) && json2.contributions.length > 0) {
              days = [...json2.contributions].reverse().map((d) => ({
                date: d.date,
                count: d.count || 0,
                level: Math.min(4, Math.max(0, parseInt(d.intensity, 10) || (d.count > 0 ? 1 : 0))),
              }))
              total = json2.years?.[0]?.total
            }
          }
        } catch (err2) {
          console.warn('Secondary contributions API unreachable:', err2)
        }
      }

      if (!days || days.length === 0) {
        throw new Error('Unable to retrieve contributions data from network')
      }

      // Calculate streak stats across all days
      let currentStreak = 0
      let maxStreak = 0
      let tempStreak = 0

      for (let i = 0; i < days.length; i++) {
        if (days[i].count > 0) {
          tempStreak++
          if (tempStreak > maxStreak) maxStreak = tempStreak
        } else {
          tempStreak = 0
        }
      }

      // Count current streak backwards starting from today or yesterday
      const lastIndex = days.length - 1
      let startIndex = -1
      if (days[lastIndex] && days[lastIndex].count > 0) {
        startIndex = lastIndex
      } else if (days[lastIndex - 1] && days[lastIndex - 1].count > 0) {
        startIndex = lastIndex - 1
      }

      if (startIndex !== -1) {
        for (let i = startIndex; i >= 0; i--) {
          if (days[i].count > 0) {
            currentStreak++
          } else {
            break
          }
        }
      }

      // Build 53 week columns aligned with standard Sunday-Saturday weekday rows
      const weeks = []
      let currentWeek = []
      const monthHeaders = []
      let lastHeaderMonth = null
      let lastHeaderCol = -10

      // Pad initial week if days[0] is not Sunday (row 0)
      const firstDayObj = new Date(days[0].date + 'T00:00:00Z')
      const firstDayOfWeek = firstDayObj.getUTCDay()
      for (let r = 0; r < firstDayOfWeek; r++) {
        currentWeek.push({ row: r, col: 0, empty: true })
      }

      for (let i = 0; i < days.length; i++) {
        const d = days[i]
        const parts = d.date.split('-')
        const dObj = new Date(Date.UTC(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)))
        const dayOfWeek = dObj.getUTCDay()

        // Push completed week on Sunday
        if (dayOfWeek === 0 && currentWeek.length > 0) {
          weeks.push(currentWeek)
          currentWeek = []
        }

        const col = weeks.length
        const month = dObj.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })

        // Avoid month header overlap by enforcing at least 2 columns separation
        if (month !== lastHeaderMonth && col - lastHeaderCol >= 2) {
          monthHeaders.push({ name: month, col })
          lastHeaderMonth = month
          lastHeaderCol = col
        }

        const formattedDate = dObj.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          timeZone: 'UTC',
        })
        const tip = d.count === 0 ? 'No contributions' : d.count === 1 ? '1 contribution' : `${d.count} contributions`

        currentWeek.push({
          row: dayOfWeek,
          col,
          date: d.date,
          formattedDate,
          level: d.level,
          count: d.count,
          tip: `${tip} on ${formattedDate}`,
        })
      }

      if (currentWeek.length > 0) {
        // Pad the remainder of the final week up to Saturday (row 6)
        const lastRow = currentWeek[currentWeek.length - 1].row
        const col = weeks.length
        for (let r = lastRow + 1; r < 7; r++) {
          currentWeek.push({ row: r, col, empty: true })
        }
        weeks.push(currentWeek)
      }

      const newStreakData = {
        total: total ?? days.reduce((sum, d) => sum + d.count, 0),
        currentStreak,
        longestStreak: maxStreak,
        monthHeaders,
        weeks,
        lastUpdated: new Date().toISOString(),
      }

      setStreak(newStreakData)
      setLastSynced(new Date())
      try {
        localStorage.setItem(`gh_streak_${username}`, JSON.stringify({
          data: newStreakData,
          timestamp: Date.now(),
        }))
      } catch (e) {}
    } catch (err) {
      console.warn('Live GitHub streak sync failed, using cached/static data:', err)
    } finally {
      if (showLoading) setIsSyncing(false)
    }
  }, [username])

  // Sync with GitHub on mount
  useEffect(() => {
    syncWithGithub(false)
  }, [syncWithGithub])

  // LeetCode live sync callback
  const syncWithLeetCode = useCallback(async (showLoading = true) => {
    if (showLoading) setIsLeetcodeSyncing(true)
    try {
      let remoteData = null

      // Primary live API: leetcode-api-faisalshohag.vercel.app (CORS-enabled)
      try {
        const res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${leetcodeUsername}`, {
          signal: AbortSignal.timeout(7000),
        })
        if (res.ok) {
          const json = await res.json()
          if (json && typeof json.totalSolved === 'number') {
            remoteData = json
          }
        }
      } catch (err1) {
        console.warn('Primary LeetCode API unreachable, attempting fallback...', err1)
      }

      // Secondary fallback live API: alfa-leetcode-api.onrender.com
      if (!remoteData) {
        try {
          const res2 = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${leetcodeUsername}`, {
            signal: AbortSignal.timeout(7000),
          })
          if (res2.ok) {
            const json2 = await res2.json()
            if (json2 && typeof json2.totalSolved === 'number') {
              remoteData = json2
            }
          }
        } catch (err2) {
          console.warn('Secondary LeetCode API unreachable:', err2)
        }
      }

      if (remoteData) {
        const submissionMap = {}
        const rawCalendar = remoteData.submissionCalendar || {}

        for (const [key, val] of Object.entries(rawCalendar)) {
          let dateStr = key
          if (/^\d{10,}$/.test(key)) {
            dateStr = new Date(parseInt(key, 10) * 1000).toISOString().slice(0, 10)
          }
          submissionMap[dateStr] = (submissionMap[dateStr] || 0) + val
        }

        const totalSubmissions = Array.isArray(remoteData.totalSubmissions)
          ? remoteData.totalSubmissions.find((s) => s.difficulty === 'All')?.submissions || remoteData.totalSolved
          : typeof remoteData.totalSubmissions === 'number'
          ? remoteData.totalSubmissions
          : 14

        const acceptanceRate = totalSubmissions > 0
          ? `${((remoteData.totalSolved / totalSubmissions) * 100).toFixed(1)}%`
          : '78.6%'

        const updatedLeetcode = {
          ...data.leetcode,
          username: leetcodeUsername,
          profileUrl: data.leetcode?.profileUrl || `https://leetcode.com/u/${leetcodeUsername}/`,
          totalSolved: remoteData.totalSolved,
          totalQuestions: remoteData.totalQuestions || 4060,
          totalSubmissions,
          acceptanceRate,
          submissionCalendar: submissionMap,
          breakdown: [
            { difficulty: 'Easy', solved: remoteData.easySolved || 8, total: remoteData.totalEasy || 966, color: '#00b8a3' },
            { difficulty: 'Medium', solved: remoteData.mediumSolved || 2, total: remoteData.totalMedium || 2117, color: '#ffc01e' },
            { difficulty: 'Hard', solved: remoteData.hardSolved || 1, total: remoteData.totalHard || 977, color: '#ff375f' },
          ],
          recentSubmissions: Array.isArray(remoteData.recentSubmissions) && remoteData.recentSubmissions.length > 0
            ? remoteData.recentSubmissions.slice(0, 7).map((sub) => ({
                title: sub.title,
                slug: sub.titleSlug || sub.slug || sub.title.toLowerCase().replace(/\s+/g, '-'),
                difficulty: sub.difficulty || 'Easy',
                time: 'Recent',
              }))
            : data.leetcode?.recentSubmissions,
          lastUpdated: new Date().toISOString(),
        }

        setLeetcodeData(updatedLeetcode)
        try {
          localStorage.setItem(`lc_stats_${leetcodeUsername}`, JSON.stringify({
            data: updatedLeetcode,
            timestamp: Date.now(),
          }))
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Live LeetCode sync failed, using static data:', err)
    } finally {
      if (showLoading) setIsLeetcodeSyncing(false)
    }
  }, [leetcodeUsername, data.leetcode])

  // Sync with LeetCode on mount
  useEffect(() => {
    syncWithLeetCode(false)
  }, [syncWithLeetCode])

  const totalContributions = streak.total ?? data.realStreak?.total ?? 463
  const currentStreak = streak.currentStreak ?? data.realStreak?.currentStreak ?? 5
  const longestStreak = streak.longestStreak ?? data.realStreak?.longestStreak ?? 14

  const activeLeetcode = leetcodeData || data.leetcode || {}

  // Generate 53-week submission streak for LeetCode
  const leetcodeStreak = useMemo(() => {
    const rawMap = activeLeetcode.submissionCalendar || {}

    // Normalize timestamps (numeric seconds) or YYYY-MM-DD
    const submissionMap = {}
    for (const [key, val] of Object.entries(rawMap)) {
      let dateStr = key
      if (/^\d{10,}$/.test(key)) {
        dateStr = new Date(parseInt(key, 10) * 1000).toISOString().slice(0, 10)
      }
      submissionMap[dateStr] = (submissionMap[dateStr] || 0) + val
    }

    const today = new Date()
    const startSunday = new Date(today)
    startSunday.setUTCDate(today.getUTCDate() - 52 * 7 - today.getUTCDay())

    const days = []
    const totalDays = Math.round((today - startSunday) / (1000 * 60 * 60 * 24)) + 1

    for (let i = 0; i < totalDays; i++) {
      const d = new Date(startSunday)
      d.setUTCDate(d.getUTCDate() + i)
      const dateStr = d.toISOString().slice(0, 10)
      const count = submissionMap[dateStr] || 0
      let level = 0
      if (count === 1) level = 1
      else if (count === 2) level = 2
      else if (count === 3) level = 3
      else if (count >= 4) level = 4
      days.push({ date: dateStr, count, level })
    }

    // Calculate streaks across all days
    let currentStreak = 0
    let maxStreak = 0
    let tempStreak = 0

    for (let i = 0; i < days.length; i++) {
      if (days[i].count > 0) {
        tempStreak++
        if (tempStreak > maxStreak) maxStreak = tempStreak
      } else {
        tempStreak = 0
      }
    }

    const lastIndex = days.length - 1
    let startIndex = -1
    if (days[lastIndex] && days[lastIndex].count > 0) {
      startIndex = lastIndex
    } else if (days[lastIndex - 1] && days[lastIndex - 1].count > 0) {
      startIndex = lastIndex - 1
    }

    if (startIndex !== -1) {
      for (let i = startIndex; i >= 0; i--) {
        if (days[i].count > 0) currentStreak++
        else break
      }
    }

    const weeks = []
    let currentWeek = []
    const monthHeaders = []
    let lastHeaderMonth = null
    let lastHeaderCol = -10

    for (let i = 0; i < days.length; i++) {
      const d = days[i]
      const parts = d.date.split('-')
      const dObj = new Date(Date.UTC(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)))
      const dayOfWeek = dObj.getUTCDay()

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek)
        currentWeek = []
      }

      const col = weeks.length
      const month = dObj.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })
      if (month !== lastHeaderMonth && col - lastHeaderCol >= 2) {
        monthHeaders.push({ name: month, col })
        lastHeaderMonth = month
        lastHeaderCol = col
      }

      const formattedDate = dObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
      const tip = d.count === 0 ? 'No submissions' : d.count === 1 ? '1 submission' : `${d.count} submissions`
      currentWeek.push({
        row: dayOfWeek,
        col,
        date: d.date,
        formattedDate,
        level: d.level,
        count: d.count,
        tip: `${tip} on ${formattedDate}`,
      })
    }

    if (currentWeek.length > 0) {
      const lastRow = currentWeek[currentWeek.length - 1].row
      const col = weeks.length
      for (let r = lastRow + 1; r < 7; r++) {
        currentWeek.push({ row: r, col, empty: true })
      }
      weeks.push(currentWeek)
    }

    return {
      total: Object.values(submissionMap).reduce((a, b) => a + b, 0),
      currentStreak,
      longestStreak: maxStreak,
      monthHeaders,
      weeks,
    }
  }, [activeLeetcode])

  // Automatically scroll to the right edge on mount so recent contributions are shown first
  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
    }
    if (leetcodeScrollRef.current) {
      leetcodeScrollRef.current.scrollLeft = leetcodeScrollRef.current.scrollWidth
    }
  }, [streak, leetcodeStreak])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
      }
      if (leetcodeScrollRef.current) {
        leetcodeScrollRef.current.scrollLeft = leetcodeScrollRef.current.scrollWidth
      }
    })
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
      }
      if (leetcodeScrollRef.current) {
        leetcodeScrollRef.current.scrollLeft = leetcodeScrollRef.current.scrollWidth
      }
    }, 60)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [streak, leetcodeStreak])

  return (
    <div className="view stats-view">
      <div className="stats-container">
        {/* REAL GITHUB CONTRIBUTIONS STREAK CARD */}
        <article className="stat-card github-contributions-card">
          {/* HEADER */}
          <div className="github-contributions-header">
            <div className="github-contributions-title-area">
              <div className="github-title-top-row">
                <h2 className="github-contributions-title">GitHub Contributions & Streak</h2>
                <button
                  type="button"
                  className={`streak-sync-btn ${isSyncing ? 'syncing' : ''}`}
                  onClick={() => syncWithGithub(true)}
                  title="Click to sync live with GitHub"
                  aria-label="Sync with GitHub"
                >
                  <RotateCw size={11} className={isSyncing ? 'spinning' : ''} />
                  <span>{isSyncing ? 'Syncing...' : 'Live'}</span>
                </button>
              </div>

              <div className="streak-metrics-row">
                <span className="streak-metric-badge current-streak" title="Consecutive days with contributions">
                  <Flame size={13} />
                  <span>Current: <strong>{currentStreak} {currentStreak === 1 ? 'day' : 'days'}</strong></span>
                </span>
                <span className="streak-metric-badge longest-streak" title="Longest contribution streak">
                  <Zap size={13} />
                  <span>Longest: <strong>{longestStreak} days</strong></span>
                </span>
                <span className="streak-metric-badge total-badge" title="Total contributions in the last year">
                  <span>Total: <strong>{totalContributions}</strong></span>
                </span>
              </div>
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
                          {week.map((day) =>
                            day.empty ? (
                              <div
                                key={day.row}
                                className="streak-cell empty"
                                style={{ opacity: 0, pointerEvents: 'none' }}
                              />
                            ) : (
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
                                    unit: 'contribution',
                                    x: rect.left + rect.width / 2,
                                    top: rect.top - 8,
                                  })
                                }}
                                onMouseLeave={() => setHoveredCell(null)}
                              />
                            )
                          )}
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
        {activeLeetcode && (
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
                  <h2 className="leetcode-title">LeetCode Submissions & Streak</h2>
                  <button
                    type="button"
                    className={`streak-sync-btn leetcode-sync-btn ${isLeetcodeSyncing ? 'syncing' : ''}`}
                    onClick={() => syncWithLeetCode(true)}
                    title="Click to sync live with LeetCode"
                    aria-label="Sync with LeetCode"
                  >
                    <RotateCw size={11} className={isLeetcodeSyncing ? 'spinning' : ''} />
                    <span>{isLeetcodeSyncing ? 'Syncing...' : 'Live'}</span>
                  </button>
                </div>

                <div className="streak-metrics-row">
                  <span className="streak-metric-badge current-streak" title="Consecutive days with submissions">
                    <Flame size={13} />
                    <span>Current: <strong>{leetcodeStreak.currentStreak || 0} {leetcodeStreak.currentStreak === 1 ? 'day' : 'days'}</strong></span>
                  </span>
                  <span className="streak-metric-badge longest-streak" title="Longest submission streak">
                    <Zap size={13} />
                    <span>Longest: <strong>{leetcodeStreak.longestStreak || 2} days</strong></span>
                  </span>
                  <span className="streak-metric-badge total-badge" title="Total submissions in the last year">
                    <span>Total: <strong>{leetcodeStreak.total || activeLeetcode.totalSubmissions}</strong></span>
                  </span>
                </div>

                <p className="leetcode-subtitle">
                  {activeLeetcode.totalSolved} problems solved · {activeLeetcode.acceptanceRate} acceptance rate
                </p>
              </div>
              <a
                href={activeLeetcode.profileUrl}
                {...externalProps}
                className="github-profile-link-btn leetcode-profile-btn"
                title="View Siddharth's LeetCode Profile"
              >
                <span>{activeLeetcode.username}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* CONTRIBUTION STREAK LIKE GITHUB (ADDED AFTER HEADER) */}
            <div className="streak-calendar-box leetcode-calendar-box">
              <div className="streak-calendar-scroll" ref={leetcodeScrollRef}>
                <div className="streak-calendar-content">
                  {/* Month labels along the top */}
                  {leetcodeStreak.monthHeaders && (
                    <div className="streak-months-row">
                      {leetcodeStreak.monthHeaders.map((m, idx) => (
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
                      {leetcodeStreak.weeks &&
                        leetcodeStreak.weeks.map((week, wIdx) => (
                          <div key={wIdx} className="streak-col">
                            {week.map((day) =>
                              day.empty ? (
                                <div
                                  key={day.row}
                                  className="streak-cell empty"
                                  style={{ opacity: 0, pointerEvents: 'none' }}
                                />
                              ) : (
                                <div
                                  key={day.row}
                                  className={`streak-cell level-${day.level}`}
                                  title={
                                    day.tip ||
                                    `${day.count} submissions on ${day.formattedDate}`
                                  }
                                  onMouseEnter={(e) => {
                                    const rect =
                                      e.currentTarget.getBoundingClientRect()
                                    setHoveredCell({
                                      count: day.count,
                                      date: day.formattedDate,
                                      tip: day.tip,
                                      unit: 'submission',
                                      x: rect.left + rect.width / 2,
                                      top: rect.top - 8,
                                    })
                                  }}
                                  onMouseLeave={() => setHoveredCell(null)}
                                />
                              )
                            )}
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
                <span>{leetcodeStreak.total || activeLeetcode.totalSubmissions} submissions in the last year</span>
              </div>
              <div className="streak-legend">
                <span className="legend-label">Less</span>
                <span className="streak-cell level-0" title="No submissions" />
                <span className="streak-cell level-1" title="1 submission" />
                <span className="streak-cell level-2" title="2 submissions" />
                <span className="streak-cell level-3" title="3 submissions" />
                <span className="streak-cell level-4" title="4+ submissions" />
                <span className="legend-label">More</span>
              </div>
            </div>

            {/* LEETCODE BODY GRID */}
            <div className="leetcode-body-grid">
              {/* LEFT: SOLVED BREAKDOWN */}
              <div className="leetcode-overview-panel">
                <div className="leetcode-total-box">
                  <div className="leetcode-circle-stat">
                    <span className="leetcode-big-num">{activeLeetcode.totalSolved}</span>
                    <span className="leetcode-total-label">solved</span>
                  </div>
                  <div className="leetcode-sub-stats">
                    <div className="leetcode-sub-row">
                      <span className="sub-stat-label">Total Submissions</span>
                      <span className="sub-stat-val">{activeLeetcode.totalSubmissions}</span>
                    </div>
                    <div className="leetcode-sub-row">
                      <span className="sub-stat-label">Acceptance Rate</span>
                      <span className="sub-stat-val highlight">{activeLeetcode.acceptanceRate}</span>
                    </div>
                  </div>
                </div>

                {/* DIFFICULTY PROGRESS BARS */}
                <div className="difficulty-bars-list">
                  {(activeLeetcode.breakdown || []).map((item) => {
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
                  {(activeLeetcode.recentSubmissions || []).map((sub, idx) => (
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
                  {hoveredCell.count === 1
                    ? hoveredCell.unit || 'contribution'
                    : hoveredCell.unit === 'submission'
                    ? 'submissions'
                    : 'contributions'}
                </strong>{' '}
                on {hoveredCell.date}
              </>
            ) : (
              <>No {hoveredCell.unit === 'submission' ? 'submissions' : 'contributions'} on {hoveredCell.date}</>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Stats
