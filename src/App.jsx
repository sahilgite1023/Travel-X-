import { useMemo, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Destinations from './components/Destinations.jsx'
import Packages from './components/Packages.jsx'
import BookingForm from './components/BookingForm.jsx'
import Contact from './components/Contact.jsx'

const packages = [
  {
    id: 'goa-escape',
    name: 'Goa Beach Escape',
    destination: 'Goa, India',
    duration: '4 Days / 3 Nights',
    price: 32999,
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=80',
    summary: 'Relax on sunny beaches, enjoy water sports, and explore lively coastal markets.',
    highlights: ['Beachfront stay', 'Sunset cruise', 'Water sports'],
    itinerary: [
      'Arrival and leisure by the beach',
      'North Goa sightseeing and local markets',
      'Adventure activities and sunset cruise',
      'Breakfast and departure',
    ],
    inclusions: ['Boutique stay', 'Daily breakfast', 'Airport transfers', 'Guided city tour'],
    exclusions: ['Airfare', 'Personal expenses', 'Travel insurance'],
  },
  {
    id: 'himalayan-adventure',
    name: 'Himalayan Adventure',
    destination: 'Manali, India',
    duration: '6 Days / 5 Nights',
    price: 56999,
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
    summary: 'Experience mountain treks, river rafting, and breathtaking Himalayan views.',
    highlights: ['River rafting', 'Snow point excursion', 'Guided mountain hike'],
    itinerary: [
      'Check-in and old town walk',
      'Solang Valley adventure day',
      'Naggar Castle and art trail',
      'High-altitude exploration',
      'Leisure and local cuisine',
      'Departure',
    ],
    inclusions: ['Premium hotel', 'Breakfast and dinner', 'Local transfers', 'Adventure permits'],
    exclusions: ['Airfare', 'Lunch', 'Personal activity upgrades'],
  },
  {
    id: 'royal-rajasthan',
    name: 'Royal Rajasthan Tour',
    destination: 'Jaipur, Udaipur, Jodhpur',
    duration: '7 Days / 6 Nights',
    price: 68999,
    image:
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=80',
    summary: "Discover forts, palaces, and cuisine across Rajasthan's iconic cities.",
    highlights: ['Heritage stays', 'Fort tours', 'Cultural evening'],
    itinerary: [
      'Arrival in Jaipur and city palace tour',
      'Amber Fort and artisan markets',
      'Travel to Jodhpur and old city walk',
      'Mehrangarh Fort and local cuisine',
      'Transfer to Udaipur and lakefront evening',
      'City of Lakes guided tour',
      'Departure',
    ],
    inclusions: ['Heritage hotels', 'Daily breakfast', 'Intercity transport', 'Local guide'],
    exclusions: ['Airfare', 'Entry tickets not listed', 'Personal purchases'],
  },
]

function App() {
  const [selectedPackageId, setSelectedPackageId] = useState(packages[0].id)
  const [activePackageId, setActivePackageId] = useState(null)

  const activePackage = useMemo(
    () => packages.find((travelPackage) => travelPackage.id === activePackageId) ?? null,
    [activePackageId],
  )

  const destinations = useMemo(
    () => [
      {
        id: 'goa',
        name: 'Goa Coastline',
        description: 'Golden sands, ocean breeze, and vibrant coastal culture.',
        highlights: ['Candolim Beach', 'Sunset sailing', 'Seafood trail'],
        image:
          'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=1200&q=80',
        packageId: 'goa-escape',
      },
      {
        id: 'manali',
        name: 'Manali Highlands',
        description: 'Snow-dusted peaks and alpine adventures in the Himalayas.',
        highlights: ['Solang Valley', 'Mountain trek', 'Riverside cafés'],
        image:
          'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
        packageId: 'himalayan-adventure',
      },
      {
        id: 'rajasthan',
        name: 'Royal Rajasthan',
        description: 'Majestic forts, lakeside sunsets, and timeless heritage.',
        highlights: ['Amber Fort', 'Mehrangarh', 'Lake Pichola'],
        image:
          'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
        packageId: 'royal-rajasthan',
      },
    ],
    [],
  )

  const contactDetails = useMemo(
    () => ({
      email: 'support@travelx.com',
      phone: '+1 555 010 2026',
      office: 'Travel-X Guest Relations, India',
      supportHours: 'Mon - Sat, 9:00 AM - 7:00 PM IST',
    }),
    [],
  )

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleOpenPackageDetails = (packageId) => {
    setActivePackageId(packageId)
  }

  const handleClosePackageDetails = () => {
    setActivePackageId(null)
  }

  const handleBookPackage = (packageId) => {
    setSelectedPackageId(packageId)
    scrollToSection('booking')
  }

  const handleExploreDestinationPackages = (packageId) => {
    setSelectedPackageId(packageId)
    scrollToSection('packages')
  }

  return (
    <>
      <Navbar onBookTrip={() => scrollToSection('booking')} />
      <main>
        <Home
          featuredDestinations={destinations}
          onExploreDestinations={() => scrollToSection('destinations')}
          onViewPackages={() => scrollToSection('packages')}
        />
        <Destinations
          destinations={destinations}
          onExplorePackages={handleExploreDestinationPackages}
        />
        <Packages
          packages={packages}
          onViewDetails={handleOpenPackageDetails}
          onBookNow={handleBookPackage}
          activePackage={activePackage}
          onCloseDetails={handleClosePackageDetails}
          selectedPackageId={selectedPackageId}
        />
        <BookingForm
          packages={packages}
          selectedPackageId={selectedPackageId}
          onPackageChange={setSelectedPackageId}
        />
        <Contact contactDetails={contactDetails} />
      </main>
    </>
  )
}

export default App
