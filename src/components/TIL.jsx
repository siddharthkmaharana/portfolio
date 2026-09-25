import initialTilEntries from '../data/til'

export function TIL({ entries = initialTilEntries }) {
  return (
    <div className="view til-view">
      <div className="timeline">
        {entries.map((item, index) => {
          // Supports both { date, notes } object or [date, ...notes] array
          const date = item.date || item[0]
          const notes = item.notes || item.slice(1)

          return (
            <article key={date || index} className="timeline-item">
              <div className="timeline-date-col">
                <span className="date-badge">{date}</span>
              </div>
              <div className="timeline-marker" />
              <div className="timeline-copy">
                {notes.map((note, nIdx) => (
                  <p key={nIdx}>{note}</p>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default TIL
