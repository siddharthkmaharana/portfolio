import {
  CalendarDays,
  ChevronDown,
  Clock3,
  MapPin,
  X,
} from 'lucide-react'

export function ScheduleModal({ onClose }) {
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

        <div className="modal-kicker">
          <Clock3 size={14} /> 15 MINUTES · ASIA/KOLKATA
        </div>

        <h2 id="schedule-title">Let's connect.</h2>
        <p className="modal-description">
          Pick a time for a quick conversation about software, ideas, or whatever
          you are building.
        </p>

        <div className="booking-grid">
          <div>
            <p className="calendar-label">September 2026</p>
            <div className="calendar-head">
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
            </div>
            <div className="calendar-days">
              {Array.from({ length: 30 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  className={index === 23 ? 'selected' : ''}
                  disabled={index < 22}
                >
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

        <p className="modal-footnote">
          A calendar invite and location details will be shared after
          confirmation.
        </p>
      </div>
    </div>
  )
}

export function FloatingCalendarButton({ onClick }) {
  return (
    <button
      type="button"
      className="floating-calendar-btn"
      onClick={onClick}
      aria-label="Schedule a call"
      title="Schedule a call"
    >
      <CalendarDays size={18} />
    </button>
  )
}

export default ScheduleModal
