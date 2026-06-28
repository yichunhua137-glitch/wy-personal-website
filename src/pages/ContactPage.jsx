import { contactLinks, profile } from '../siteData'

function ContactPage() {
  return (
    <section className="section page-section contact-section">
      <div className="contact-layout panel">
        <div className="contact-intro">
          <p className="eyebrow">Contact</p>
          <h2>Reach out to Yi Wei.</h2>
          <p>
            For internships, technical projects, or collaborations, the fastest
            contact method is email or LinkedIn.
          </p>
          <div className="contact-note">
            <strong>{profile.email}</strong>
            <span>{profile.location}</span>
          </div>
        </div>
        <div className="contact-grid">
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
    </section>
  )
}

export default ContactPage
