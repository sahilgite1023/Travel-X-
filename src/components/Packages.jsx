function Packages({
  packages,
  onViewDetails,
  onBookNow,
  activePackage,
  onCloseDetails,
  selectedPackageId,
}) {
  return (
    <section id="packages" className="container section-block" aria-labelledby="packages-heading">
      <div className="section-head">
        <p className="eyebrow">Travel Packages</p>
        <h2 id="packages-heading">Choose Your Perfect Tour Plan</h2>
      </div>

      <div className="package-grid">
        {packages.map((travelPackage) => (
          <article
            key={travelPackage.id}
            className={`package-card ${selectedPackageId === travelPackage.id ? 'selected' : ''}`}
          >
            <img src={travelPackage.image} alt={travelPackage.name} loading="lazy" />
            <div className="package-content">
              <h3>{travelPackage.name}</h3>
              <p className="package-destination">{travelPackage.destination}</p>
              <p className="package-meta">{travelPackage.duration}</p>
              <ul>
                {travelPackage.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <p className="package-price">₹{travelPackage.price.toLocaleString('en-IN')}</p>
              <div className="package-actions">
                <button type="button" className="secondary-btn" onClick={() => onViewDetails(travelPackage.id)}>
                  View Details
                </button>
                <button type="button" className="primary-btn" onClick={() => onBookNow(travelPackage.id)}>
                  Book Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {activePackage ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="package-modal-title">
          <div className="package-modal">
            <button type="button" className="modal-close" onClick={onCloseDetails} aria-label="Close package details">
              ×
            </button>
            <img src={activePackage.image} alt={activePackage.name} />
            <h3 id="package-modal-title">{activePackage.name}</h3>
            <p className="package-destination">{activePackage.destination}</p>
            <p>{activePackage.summary}</p>

            <div className="modal-meta">
              <p>
                <strong>Duration:</strong> {activePackage.duration}
              </p>
              <p>
                <strong>Price:</strong> ₹{activePackage.price.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="modal-columns">
              <div>
                <h4>Itinerary</h4>
                <ul>
                  {activePackage.itinerary.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Inclusions</h4>
                <ul>
                  {activePackage.inclusions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h4>Exclusions</h4>
                <ul>
                  {activePackage.exclusions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="package-actions">
              <button type="button" className="secondary-btn" onClick={onCloseDetails}>
                Close
              </button>
              <button
                type="button"
                className="primary-btn"
                onClick={() => {
                  onBookNow(activePackage.id)
                  onCloseDetails()
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default Packages
