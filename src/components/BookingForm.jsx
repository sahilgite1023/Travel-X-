import { useEffect, useMemo, useState } from 'react'

const getMinDate = () => {
  const currentDate = new Date()
  const month = `${currentDate.getMonth() + 1}`.padStart(2, '0')
  const day = `${currentDate.getDate()}`.padStart(2, '0')
  return `${currentDate.getFullYear()}-${month}-${day}`
}

function BookingForm({ packages, selectedPackageId, onPackageChange }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedPackageId,
    travelDate: '',
    travellers: '2',
    specialRequests: '',
  })
  const [errors, setErrors] = useState({})
  const [submitState, setSubmitState] = useState('idle')

  useEffect(() => {
    setFormData((current) => ({ ...current, selectedPackageId }))
  }, [selectedPackageId])

  const selectedPackageName = useMemo(() => {
    return packages.find((travelPackage) => travelPackage.id === formData.selectedPackageId)?.name ?? ''
  }, [formData.selectedPackageId, packages])

  const validate = () => {
    const currentErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phonePattern = /^\+?[0-9\s-]{10,15}$/

    if (!formData.fullName.trim()) {
      currentErrors.fullName = 'Please enter your full name.'
    }

    if (!emailPattern.test(formData.email.trim())) {
      currentErrors.email = 'Please enter a valid email address.'
    }

    if (!phonePattern.test(formData.phone.trim())) {
      currentErrors.phone = 'Please enter a valid phone number with 10 to 15 digits.'
    }

    if (!formData.selectedPackageId) {
      currentErrors.selectedPackageId = 'Please select a package.'
    }

    if (!formData.travelDate) {
      currentErrors.travelDate = 'Please choose a travel date.'
    } else if (formData.travelDate < getMinDate()) {
      currentErrors.travelDate = 'Travel date cannot be in the past.'
    }

    const travellers = Number(formData.travellers)
    if (!Number.isInteger(travellers) || travellers < 1 || travellers > 20) {
      currentErrors.travellers = 'Please enter a traveller count between 1 and 20.'
    }

    return currentErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setSubmitState('idle')

    if (name === 'selectedPackageId') {
      onPackageChange(value)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (submitState === 'processing') {
      return
    }

    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setSubmitState('error')
      return
    }

    setSubmitState('processing')

    await new Promise((resolve) => {
      window.setTimeout(resolve, 1200)
    })

    setSubmitState('success')
  }

  return (
    <section id="booking" className="container section-block" aria-labelledby="booking-heading">
      <div className="section-head">
        <p className="eyebrow">Booking</p>
        <h2 id="booking-heading">Book Your Trip</h2>
      </div>

      <p className="demo-note" role="status">
        Demo mode: Booking requests are validated locally and not sent to a backend service yet.
      </p>

      <form className="booking-form" noValidate onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              aria-invalid={Boolean(errors.fullName)}
            />
            {errors.fullName ? <span className="field-error">{errors.fullName}</span> : null}
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <span className="field-error">{errors.email}</span> : null}
          </label>

          <label>
            Phone
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
          </label>

          <label>
            Selected Package
            <select
              name="selectedPackageId"
              value={formData.selectedPackageId}
              onChange={handleChange}
              aria-invalid={Boolean(errors.selectedPackageId)}
            >
              {packages.map((travelPackage) => (
                <option key={travelPackage.id} value={travelPackage.id}>
                  {travelPackage.name} — ₹{travelPackage.price.toLocaleString('en-IN')}
                </option>
              ))}
            </select>
            {errors.selectedPackageId ? <span className="field-error">{errors.selectedPackageId}</span> : null}
          </label>

          <label>
            Travel Date
            <input
              type="date"
              name="travelDate"
              min={getMinDate()}
              value={formData.travelDate}
              onChange={handleChange}
              aria-invalid={Boolean(errors.travelDate)}
            />
            {errors.travelDate ? <span className="field-error">{errors.travelDate}</span> : null}
          </label>

          <label>
            Number of Travellers
            <input
              type="number"
              name="travellers"
              min="1"
              max="20"
              value={formData.travellers}
              onChange={handleChange}
              placeholder="2"
              aria-invalid={Boolean(errors.travellers)}
            />
            {errors.travellers ? <span className="field-error">{errors.travellers}</span> : null}
          </label>
        </div>

        <label>
          Special Requests
          <textarea
            name="specialRequests"
            rows="4"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="Any dietary needs, room preferences, or special plans?"
          />
        </label>

        <button type="submit" className="primary-btn" disabled={submitState === 'processing'}>
          {submitState === 'processing' ? 'Submitting...' : 'Submit Booking Request'}
        </button>

        {submitState === 'success' ? (
          <p className="success" role="status">
            Demo request saved for {selectedPackageName}. We will reach out at {formData.email}.
          </p>
        ) : null}

        {submitState === 'error' ? (
          <p className="field-error" role="alert">
            Please review the highlighted fields and try again.
          </p>
        ) : null}
      </form>
    </section>
  )
}

export default BookingForm
