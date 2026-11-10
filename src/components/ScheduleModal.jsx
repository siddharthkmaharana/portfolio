import { useState, useMemo, useEffect } from 'react'
import {
  CalendarDays,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  X,
  Check,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Mail,
  User,
} from 'lucide-react'
import { personalInfo } from '../data/personalInfo'

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const DURATIONS = [
  { value: 15, label: '15 min', text: '15 minutes' },
  { value: 30, label: '30 min', text: '30 minutes' },
  { value: 45, label: '45 min', text: '45 minutes' },
  { value: 60, label: '1 hr', text: '1 hour' },
]

const DEFAULT_TIME_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '02:00 PM',
  '03:30 PM',
  '04:30 PM',
  '06:00 PM',
]

function isSameDay(d1, d2) {
  if (!d1 || !d2) return false
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

function isPastDay(year, month, day, today) {
  const target = new Date(year, month, day).getTime()
  const current = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ).getTime()
  return target < current
}

function formatSelectedDateLong(date) {
  if (!date) return ''
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function generateGoogleCalendarUrl({ date, time, duration = 15, name, email, topic }) {
  const parts = time.split(' ')
  const timeNums = parts[0].split(':').map(Number)
  let hours = timeNums[0]
  const minutes = timeNums[1]
  if (parts[1] === 'PM' && hours < 12) hours += 12
  if (parts[1] === 'AM' && hours === 12) hours = 0

  const start = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes
  )
  const end = new Date(start.getTime() + duration * 60 * 1000)

  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const durationStr = duration === 60 ? '1-Hour' : `${duration}-Min`
  const durationDesc = duration === 60 ? '1 hour' : `${duration} minutes`

  const title = encodeURIComponent(
    `${durationStr} Call: ${name || 'Guest'} & Siddharth Kumar Maharana`
  )
  const details = encodeURIComponent(
    `${durationDesc} Conversation with Siddharth Kumar Maharana\n\nGuest: ${name} (${email})\nDuration: ${durationDesc}\nTopic: ${topic || 'General Discussion / Portfolio Connect'}\nLocation: Google Meet\n\nMeeting link will be auto-attached when saving to Google Calendar.`
  )
  const dates = `${fmt(start)}/${fmt(end)}`
  const hostEmail = personalInfo.contact?.email || 'siddharthk.maharana@gmail.com'

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&add=${encodeURIComponent(hostEmail)}`
}

function generateMailtoUrl({ date, time, duration = 15, name, email, topic }) {
  const hostEmail = personalInfo.contact?.email || 'siddharthk.maharana@gmail.com'
  const dateStr = formatSelectedDateLong(date)
  const durationText = duration === 60 ? '1 hour' : `${duration} minutes`
  const subject = encodeURIComponent(
    `Scheduled Call: ${name} & Siddharth (${dateStr} at ${time}, ${durationText})`
  )
  const body = encodeURIComponent(
    `Hi Siddharth,\n\nI have scheduled a ${durationText} call with you:\n\nDate: ${dateStr}\nTime: ${time} (Asia/Kolkata)\nDuration: ${durationText}\nGuest: ${name} (${email})\nTopic: ${topic || 'General Discussion'}\nPlatform: Google Meet\n\nLooking forward to speaking with you!`
  )
  return `mailto:${hostEmail}?subject=${subject}&body=${body}`
}

export function ScheduleModal({ onClose }) {
  const today = useMemo(() => new Date(), [])

  // Selected duration in minutes (defaults to 15 min, can be 15, 30, 45, 60)
  const [selectedDuration, setSelectedDuration] = useState(15)

  // Month currently viewed in the calendar
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  // Selected date defaults to today
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [selectedTime, setSelectedTime] = useState(null)

  // Step flow: 'select' (date/time/duration) -> 'form' (guest details) -> 'success' (confirmed)
  const [step, setStep] = useState('select')

  // Guest details form state
  const [form, setForm] = useState({ name: '', email: '', topic: '' })
  const [errors, setErrors] = useState({})

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const viewYear = viewDate.getFullYear()
  const viewMonth = viewDate.getMonth()

  // Can user navigate to previous month? (Disallow browsing months before current month)
  const canGoPrev = useMemo(() => {
    return (
      viewYear > today.getFullYear() ||
      (viewYear === today.getFullYear() && viewMonth > today.getMonth())
    )
  }, [viewYear, viewMonth, today])

  const handlePrevMonth = () => {
    if (!canGoPrev) return
    setViewDate(new Date(viewYear, viewMonth - 1, 1))
  }

  const handleNextMonth = () => {
    setViewDate(new Date(viewYear, viewMonth + 1, 1))
  }

  // Days matrix for the current viewed month
  const { firstDayOfWeek, totalDaysInMonth } = useMemo(() => {
    return {
      firstDayOfWeek: new Date(viewYear, viewMonth, 1).getDay(),
      totalDaysInMonth: new Date(viewYear, viewMonth + 1, 0).getDate(),
    }
  }, [viewYear, viewMonth])

  const handleSelectDay = (day) => {
    const newSelected = new Date(viewYear, viewMonth, day)
    setSelectedDate(newSelected)
  }

  const handleSelectTime = (time) => {
    setSelectedTime(time)
  }

  const handleContinueToForm = () => {
    if (!selectedTime) return
    setStep('form')
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.name.trim()) {
      newErrors.name = 'Please enter your name.'
    }
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setStep('success')
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="schedule-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* STEP 1: DATE, TIME & DURATION PICKER */}
        {step === 'select' && (
          <>
            <div className="modal-kicker">
              <Clock3 size={14} />{' '}
              {selectedDuration === 60 ? '1 HOUR' : `${selectedDuration} MINUTES`}{' '}
              · ASIA/KOLKATA
            </div>

            <h2 id="schedule-title">Let's connect.</h2>
            <p className="modal-description">
              Pick a duration, date, and time for a 1-on-1 conversation about
              software, ideas, or whatever you are building.
            </p>

            {/* CALL DURATION SELECTOR */}
            <div className="duration-selector-row">
              <span className="duration-selector-label">Duration:</span>
              <div
                className="duration-pills"
                role="radiogroup"
                aria-label="Call duration"
              >
                {DURATIONS.map((dur) => {
                  const isSelected = selectedDuration === dur.value
                  return (
                    <button
                      key={dur.value}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`duration-pill ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedDuration(dur.value)}
                    >
                      {dur.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="booking-grid">
              {/* LEFT COLUMN: INTERACTIVE CALENDAR */}
              <div>
                <div className="calendar-header-row">
                  <span className="calendar-label">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                  </span>
                  <div className="calendar-nav-group">
                    <button
                      type="button"
                      className="calendar-nav-btn"
                      onClick={handlePrevMonth}
                      disabled={!canGoPrev}
                      aria-label="Previous month"
                      title="Previous month"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      className="calendar-nav-btn"
                      onClick={handleNextMonth}
                      aria-label="Next month"
                      title="Next month"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="calendar-head">
                  {DAYS_OF_WEEK.map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </div>

                <div className="calendar-days">
                  {/* Empty cells for weekday offset before the 1st of the month */}
                  {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="calendar-day-empty" />
                  ))}

                  {/* Month days */}
                  {Array.from({ length: totalDaysInMonth }, (_, idx) => {
                    const day = idx + 1
                    const cellDate = new Date(viewYear, viewMonth, day)
                    const isPast = isPastDay(viewYear, viewMonth, day, today)
                    const isSelected = isSameDay(cellDate, selectedDate)
                    const isToday = isSameDay(cellDate, today)

                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={isPast}
                        onClick={() => handleSelectDay(day)}
                        className={`calendar-day-btn ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                        aria-label={`Select ${MONTH_NAMES[viewMonth]} ${day}, ${viewYear}`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* RIGHT COLUMN: AVAILABLE TIMES */}
              <div className="availability">
                <p className="calendar-label">
                  Available times ·{' '}
                  <span className="selected-date-chip">
                    {selectedDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </p>
                <p className="availability-note">
                  <MapPin size={14} /> Google Meet ·{' '}
                  {selectedDuration === 60 ? '1 hr' : `${selectedDuration} mins`}
                </p>

                <div className="time-slots-list">
                  {DEFAULT_TIME_SLOTS.map((time) => {
                    const isSelected = selectedTime === time
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleSelectTime(time)}
                        className={`time-slot ${isSelected ? 'selected' : ''}`}
                        aria-pressed={isSelected}
                      >
                        <span>{time}</span>
                        {isSelected ? (
                          <Check size={14} className="time-slot-icon" />
                        ) : (
                          <span className="time-slot-sub">Select</span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {selectedTime && (
                  <button
                    type="button"
                    className="confirm-time-btn"
                    onClick={handleContinueToForm}
                  >
                    <span>Continue with {selectedTime}</span>
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </div>

            <p className="modal-footnote">
              Select a duration, date, and time slot above, then click continue
              to finalize your booking.
            </p>
          </>
        )}

        {/* STEP 2: GUEST DETAILS FORM */}
        {step === 'form' && (
          <div className="booking-form-view">
            <button
              type="button"
              className="modal-back-btn"
              onClick={() => setStep('select')}
            >
              <ArrowLeft size={15} />
              <span>Back to date & time</span>
            </button>

            <h2>Enter your details</h2>
            <p className="modal-description">
              Please provide your contact information so the calendar invitation
              and Google Meet link can be sent to you.
            </p>

            <div className="meeting-summary-banner">
              <div className="meeting-summary-item">
                <Calendar size={15} />
                <span>{formatSelectedDateLong(selectedDate)}</span>
              </div>
              <div className="meeting-summary-item">
                <Clock3 size={15} />
                <span>
                  {selectedTime} –{' '}
                  {selectedDuration === 60
                    ? '1 hour'
                    : `${selectedDuration} minutes`}{' '}
                  (Asia/Kolkata timezone)
                </span>
              </div>
              <div className="meeting-summary-item">
                <MapPin size={15} />
                <span>Google Meet (web link provided automatically)</span>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="booking-form" noValidate>
              <div className="form-group">
                <label htmlFor="booking-name">Your Full Name *</label>
                <input
                  id="booking-name"
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  autoFocus
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="booking-email">Your Email Address *</label>
                <input
                  id="booking-email"
                  type="email"
                  placeholder="e.g. alex@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
                {errors.email && (
                  <span className="form-error">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="booking-topic">
                  What would you like to discuss? (optional)
                </label>
                <textarea
                  id="booking-topic"
                  rows={3}
                  placeholder="Briefly describe your project, idea, or questions..."
                  value={form.topic}
                  onChange={(e) =>
                    setForm({ ...form, topic: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="booking-submit-btn">
                <span>Confirm & Schedule Call</span>
                <Check size={16} />
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION */}
        {step === 'success' && (
          <div className="booking-success-view">
            <div className="success-badge-icon">
              <Check size={28} />
            </div>

            <h2>You're Scheduled!</h2>
            <p className="success-subtext">
              A{' '}
              {selectedDuration === 60
                ? '1-hour'
                : `${selectedDuration}-minute`}{' '}
              call is arranged with Siddharth Kumar Maharana.
            </p>

            <div className="success-details-card">
              <div className="success-card-row">
                <Calendar size={15} />
                <span>
                  <strong>Date:</strong> {formatSelectedDateLong(selectedDate)}
                </span>
              </div>
              <div className="success-card-row">
                <Clock3 size={15} />
                <span>
                  <strong>Time:</strong> {selectedTime} (
                  {selectedDuration === 60
                    ? '1 hr'
                    : `${selectedDuration} mins`}
                  , Asia/Kolkata IST)
                </span>
              </div>
              <div className="success-card-row">
                <MapPin size={15} />
                <span>
                  <strong>Location:</strong> Google Meet
                </span>
              </div>
              <div className="success-card-row">
                <User size={15} />
                <span>
                  <strong>Guest:</strong> {form.name} ({form.email})
                </span>
              </div>
            </div>

            <div className="success-actions-row">
              <a
                href={generateGoogleCalendarUrl({
                  date: selectedDate,
                  time: selectedTime,
                  duration: selectedDuration,
                  name: form.name,
                  email: form.email,
                  topic: form.topic,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="gcal-btn"
                title="Add this meeting directly to your Google Calendar"
              >
                <CalendarDays size={16} />
                <span>Add to Google Calendar (1-Click)</span>
                <ExternalLink size={14} />
              </a>

              <a
                href={generateMailtoUrl({
                  date: selectedDate,
                  time: selectedTime,
                  duration: selectedDuration,
                  name: form.name,
                  email: form.email,
                  topic: form.topic,
                })}
                className="email-invite-btn"
                title="Send confirmation email notification"
              >
                <Mail size={15} />
                <span>Send Email Notification</span>
              </a>

              <button
                type="button"
                className="done-close-btn"
                onClick={onClose}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function TopScheduleButton({ onClick }) {
  return (
    <button
      type="button"
      className="top-schedule-btn"
      onClick={onClick}
      aria-label="Schedule a call"
      title="Schedule a call"
    >
      <CalendarDays size={15} />
      <span>Schedule a call</span>
    </button>
  )
}

export const FloatingCalendarButton = TopScheduleButton

export default ScheduleModal
