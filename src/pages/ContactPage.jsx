import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { contactLinks, profile } from '../siteData'

const EMAILJS_SERVICE_ID = 'service_j5lbii8'
const EMAILJS_TEMPLATE_ID = 'template_17snlta'
const EMAILJS_PUBLIC_KEY = 'E_2jDjvTwnBae-e3-'

const initialForm = {
  from_name: '',
  email_address: '',
  subject: '',
  message: '',
}

function ContactPage() {
  const [formData, setFormData] = useState(initialForm)
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSending) return

    setIsSending(true)
    setStatus({ type: '', message: '' })

    try {
      const templateParams = {
        from_name: formData.from_name,
        name: formData.from_name,
        Email_Address: formData.email_address,
        reply_to: formData.email_address,
        subject: formData.subject,
        message: formData.message,
      }

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })

      setFormData(initialForm)
      setStatus({ type: 'success', message: 'Message sent successfully.' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="section page-section contact-section">
      <div className="contact-layout panel">
        <div className="contact-intro">
          <p className="eyebrow">Contact</p>
          <h2>Get in touch.</h2>
          <p>
            If you want to talk about internships, projects, or collaboration,
            feel free to send a message here or reach out directly by email or
            LinkedIn.
          </p>
          <div className="contact-intro-badges">
            <span>Internships</span>
            <span>Projects</span>
            <span>Collaboration</span>
          </div>
          <div className="contact-note">
            <strong>{profile.email}</strong>
            <span>{profile.location}</span>
          </div>
          <div className="contact-grid compact">
            {contactLinks.map((item) => (
              <a
                className="contact-card"
                href={item.href === '#' ? undefined : item.href}
                key={item.label}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                target={item.href.startsWith('http') ? '_blank' : undefined}
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </a>
            ))}
          </div>
        </div>

        <form className="contact-form-card" onSubmit={handleSubmit}>
          <div className="contact-form-head">
            <p className="eyebrow">Send a message</p>
            <h3>Write directly here</h3>
          </div>
          <div className="contact-form-grid">
            <label className="contact-field">
              <span>Name</span>
              <input
                name="from_name"
                onChange={handleChange}
                placeholder="Your name"
                required
                value={formData.from_name}
              />
            </label>

            <label className="contact-field">
              <span>Email</span>
              <input
                name="email_address"
                onChange={handleChange}
                placeholder="you@example.com"
                required
                type="email"
                value={formData.email_address}
              />
            </label>
          </div>

          <label className="contact-field">
            <span>Subject</span>
            <input
              name="subject"
              onChange={handleChange}
              placeholder="What would you like to talk about?"
              required
              value={formData.subject}
            />
          </label>

          <label className="contact-field">
            <span>Message</span>
            <textarea
              name="message"
              onChange={handleChange}
              placeholder="Write your message here..."
              required
              rows={7}
              value={formData.message}
            />
          </label>

          {status.message && (
            <p className={status.type === 'success' ? 'contact-status success' : 'contact-status error'}>
              {status.message}
            </p>
          )}

          <div className="contact-form-actions">
            <button className="button primary" disabled={isSending} type="submit">
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactPage
