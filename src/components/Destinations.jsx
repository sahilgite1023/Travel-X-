function Destinations({ destinations, onExplorePackages }) {
  return (
    <section id="destinations" className="container section-block" aria-labelledby="destinations-heading">
      <div className="section-head">
        <p className="eyebrow">Destinations</p>
        <h2 id="destinations-heading">Explore Signature Places</h2>
      </div>

      <div className="destination-grid">
        {destinations.map((destination) => (
          <article key={destination.id} className="destination-card">
            <div className="destination-image-wrap">
              <img src={destination.image} alt={destination.name} loading="lazy" />
            </div>
            <div className="destination-content">
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
              <ul>
                {destination.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <button type="button" className="primary-btn" onClick={() => onExplorePackages(destination.packageId)}>
                Explore Packages
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Destinations
