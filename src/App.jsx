import { useMemo, useState } from 'react'
import './App.css'

const packages = [
  {
    id: 1,
    name: 'Goa Beach Escape',
    destination: 'Goa, India',
    duration: '4 Days / 3 Nights',
    price: '$399',
    description:
      'Relax on sunny beaches, enjoy water sports, and explore lively coastal markets.',
  },
  {
    id: 2,
    name: 'Himalayan Adventure',
    destination: 'Manali, India',
    duration: '6 Days / 5 Nights',
    price: '$699',
    description:
      'Experience mountain treks, river rafting, and breathtaking views of the Himalayas.',
  },
  {
    id: 3,
    name: 'Royal Rajasthan Tour',
    destination: 'Jaipur, Udaipur, Jodhpur',
    duration: '7 Days / 6 Nights',
    price: '$849',
    description:
      'Discover forts, palaces, and traditional cuisine across Rajasthan\'s iconic cities.',
  },
]

function Home() {
  return (
    <section id="home" className="section">
      <h1>Travel-X</h1>
      <p className="lead">
        Plan unforgettable journeys with curated destinations and handpicked tour packages.
      </p>
    </section>
  )
}

function Destinations() {
  return (
    <section id="destinations" className="section">
      <h2>Destinations</h2>
      <ul className="list">
        <li>Goa</li>
        <li>Manali</li>
        <li>Jaipur</li>
        <li>Udaipur</li>
        <li>Jodhpur</li>
      </ul>
    </section>
  )
}

function Packages({ onSelect, selectedId }) {
  return (
    <section id="packages" className="section">
      <h2>Tour Packages</h2>
      <div className="cards">
        {packages.map((travelPackage) => (
          <article key={travelPackage.id} className="card">
            <h3>{travelPackage.name}</h3>
            <p>{travelPackage.destination}</p>
            <p>{travelPackage.duration}</p>
            <p className="price">{travelPackage.price}</p>
            <button type="button" onClick={() => onSelect(travelPackage.id)}>
              {selectedId === travelPackage.id ? 'Selected' : 'View Details'}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

function PackageDetails({ travelPackage }) {
  if (!travelPackage) {
    return null
  }

  return (
    <section id="package-details" className="section details">
      <h2>Package Details</h2>
      <h3>{travelPackage.name}</h3>
      <p>
        <strong>Destination:</strong> {travelPackage.destination}
      </p>
      <p>
        <strong>Duration:</strong> {travelPackage.duration}
      </p>
      <p>
        <strong>Price:</strong> {travelPackage.price}
      </p>
      <p>{travelPackage.description}</p>
    </section>
  )
}

function BookingForm({ packageName }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    travelers: '1',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="booking" className="section">
      <h2>Booking Form</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="date">Travel Date</label>
        <input id="date" type="date" name="date" value={formData.date} onChange={handleChange} required />

        <label htmlFor="travelers">Travelers</label>
        <input
          id="travelers"
          type="number"
          name="travelers"
          min="1"
          value={formData.travelers}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Booking Request</button>
      </form>
      {submitted && (
        <p className="success" role="status">
          Booking request submitted for {packageName}. We will contact you at {formData.email}.
        </p>
      )}
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section">
      <h2>Contact</h2>
      <p>Email: support@travelx.com</p>
      <p>Phone: +1 555 010 2026</p>
    </section>
  )
}

function App() {
  const [selectedPackageId, setSelectedPackageId] = useState(packages[0].id)

  const selectedPackage = useMemo(
    () => packages.find((travelPackage) => travelPackage.id === selectedPackageId),
    [selectedPackageId],
  )

  return (
    <>
      <header className="header">
        <p className="brand">Travel-X Booking</p>
        <nav>
          <a href="#home">Home</a>
          <a href="#destinations">Destinations</a>
          <a href="#packages">Packages</a>
          <a href="#booking">Booking Form</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <Home />
        <Destinations />
        <Packages onSelect={setSelectedPackageId} selectedId={selectedPackageId} />
        <PackageDetails travelPackage={selectedPackage} />
        <BookingForm packageName={selectedPackage?.name ?? 'your selected package'} />
        <Contact />
      </main>
    </>
  )
}

export default App
