import { useState } from 'react'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'destinations', label: 'Destinations' },
  { id: 'packages', label: 'Packages' },
  { id: 'booking', label: 'Booking' },
  { id: 'contact', label: 'Contact' },
]

function Navbar({ onBookTrip }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = () => {
    setMobileOpen(false)
  }

  return (
    <header className="navbar-wrap">
      <div className="navbar container">
        <a href="#home" className="brand-mark" onClick={handleNavClick}>
          TravelABC
        </a>

        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setMobileOpen((current) => !current)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <button type="button" className="book-trip-btn desktop-book" onClick={onBookTrip}>
          Book a Trip
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${mobileOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={handleNavClick}>
            {item.label}
          </a>
        ))}
        <button
          type="button"
          className="book-trip-btn"
          onClick={() => {
            onBookTrip()
            handleNavClick()
          }}
        >
          Book a Trip
        </button>
      </nav>
    </header>
  )
}

export default Navbar
