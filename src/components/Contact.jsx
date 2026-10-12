import { useState } from 'react'

function Contact({ contactDetails }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitState, setSubmitState] = useState('idle')

  const validate = () => {
    const currentErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.name.trim()) {
      currentErrors.name = 'Please enter your name.'
    }

    if (!emailPattern.test(formData.email.trim())) {
      currentErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.subject.trim()) {
      currentErrors.subject = 'Please enter a subject.'
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      currentErrors.message = 'Please enter a message with at least 10 characters.'
    }

    return currentErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setSubmitState('idle')
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
      window.setTimeout(resolve, 1000)
    })

    setSubmitState('success')
  }

  return (
    <section id="contact" className="container section-block" aria-labelledby="contact-heading">
      <div className="section-head">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-heading">Let’s Plan Your Next Escape</h2>
      </div>

      <div className="contact-grid">
        <article className="contact-info-card">
          <h3>Get in Touch</h3>
          <p>Our travel specialists are ready to help with package details and custom plans.</p>
          <ul>
            <li>
              <strong>Email:</strong> {contactDetails.email}
            </li>
            <li>
              <strong>Phone:</strong> {contactDetails.phone}
            </li>
            <li>
              <strong>Office:</strong> {contactDetails.office}
            </li>
            <li>
              <strong>Support Hours:</strong> {contactDetails.supportHours}
            </li>
          </ul>
          <p className="demo-note">Demo mode: Contact form currently validates locally.</p>
        </article>

        <form className="contact-form" noValidate onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? <span className="field-error">{errors.name}</span> : null}
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
            Subject
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              aria-invalid={Boolean(errors.subject)}
            />
            {errors.subject ? <span className="field-error">{errors.subject}</span> : null}
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your travel plans"
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message ? <span className="field-error">{errors.message}</span> : null}
          </label>

          <button type="submit" className="primary-btn" disabled={submitState === 'processing'}>
            {submitState === 'processing' ? 'Sending...' : 'Send Message'}
          </button>

          {submitState === 'success' ? (
            <p className="success" role="status">
              Demo message received. Our team will contact you at {formData.email}.
            </p>
          ) : null}

          {submitState === 'error' ? (
            <p className="field-error" role="alert">
              Please fix the form errors and submit again.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}

export default Contact
