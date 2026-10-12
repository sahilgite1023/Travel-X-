function Home({ featuredDestinations, onExploreDestinations, onViewPackages }) {
  return (
    <section id="home" className="home-hero-section">
      <div className="hero container">
        <div className="hero-surface">
          <p className="eyebrow">Premium Journey Design</p>
          <h1>Discover Beautiful Journeys Crafted for Every Traveler</h1>
          <p>
            Curated destinations, thoughtfully planned itineraries, and seamless support from discovery
            to departure.
          </p>
          <div className="hero-actions">
            <button type="button" className="primary-btn" onClick={onExploreDestinations}>
              Explore Destinations
            </button>
            <button type="button" className="secondary-btn" onClick={onViewPackages}>
              View Packages
            </button>
          </div>

          <div className="discovery-panel" aria-label="Travel discovery panel">
            <div>
              <span>Top Picks</span>
              <strong>Goa, Manali, Rajasthan</strong>
            </div>
            <div>
              <span>Duration</span>
              <strong>4 to 7 days</strong>
            </div>
            <div>
              <span>Starting From</span>
              <strong>₹32,999</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="container home-subsections">
        <section className="section-block featured-strip" aria-labelledby="featured-strip-heading">
          <h2 id="featured-strip-heading">Featured Escapes</h2>
          <div className="featured-list">
            {featuredDestinations.map((destination) => (
              <article key={destination.id}>
                <img src={destination.image} alt={destination.name} loading="lazy" />
                <h3>{destination.name}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block why-us" aria-labelledby="why-us-heading">
          <h2 id="why-us-heading">Why Travelers Choose TravelABC</h2>
          <div className="why-grid">
            <article>
              <h3>Thoughtful Itineraries</h3>
              <p>Every plan balances iconic sights, local culture, and relaxed personal time.</p>
            </article>
            <article>
              <h3>Premium Assistance</h3>
              <p>Responsive support before and during your trip for a smooth travel experience.</p>
            </article>
            <article>
              <h3>Transparent Pricing</h3>
              <p>Clear inclusions, practical exclusions, and no hidden surprises.</p>
            </article>
          </div>
        </section>
      </div>
    </section>
  )
}

export default Home
