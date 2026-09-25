import initialDesigns from '../data/designs'

export function Designs({ designs = initialDesigns }) {
  return (
    <div className="view designs-view">
      <div className="design-grid">
        {designs.map((design) => (
          <article
            className={`design-card ${design.className}`}
            key={design.title}
          >
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

export default Designs
