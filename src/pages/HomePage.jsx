import { Link } from 'react-router-dom'
import portraitImage from '../../photos/05c07af5dffb063b220c865eb4adc06e.jpg'
import PortfolioAssistant from '../components/PortfolioAssistant'
import { heroStats, highlights, profile } from '../siteData'

function HomePage() {
  return (
    <>
      <section className="hero page-section">
        <div className="hero-main">
          <div className="hero-main-grid">
            <div className="hero-copy-block">
              <p className="eyebrow">Personal Portfolio</p>
              <h1>{profile.name}</h1>
              <p className="hero-text">
                {profile.headline}
              </p>
              <p className="hero-subtext">{profile.intro}</p>

              <div className="highlight-strip">
                {highlights.map((item) =>
                  item.external ? (
                    <a href={item.href} key={item.label} rel="noreferrer" target="_blank">
                      {item.label}
                    </a>
                  ) : (
                    <Link key={item.label} to={item.href}>
                      {item.label}
                    </Link>
                  ),
                )}
              </div>

              <div className="hero-actions">
                <Link className="button primary" to="/projects">
                  View Projects
                </Link>
                <Link className="button secondary" to="/resume">
                  View Resume
                </Link>
                <a className="button secondary" href={profile.linkedin} rel="noreferrer" target="_blank">
                  LinkedIn
                </a>
              </div>
            </div>

            <article className="portrait-card hero-portrait-card">
              <img alt={`${profile.name} portrait`} className="portrait-image" src={portraitImage} />
            </article>
          </div>

          <div className="hero-stats">
            {heroStats.map((item) => (
              <article className="stat-card" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>

          <div className="home-extra-grid hero-extra-grid">
            <article className="panel home-photo-card">
              <div
                aria-hidden="true"
                className="home-photo-media"
                style={{ backgroundImage: `url("${portraitImage}")` }}
              ></div>
              <div className="home-photo-content">
                <p className="eyebrow">Photo Spotlight</p>
                <h3>Portrait</h3>
                <p className="home-card-copy">
                  A softer editorial portrait treatment that balances the
                  technical resume with a more personal first impression.
                </p>
                <Link className="button secondary" to="/about">
                  View Profile
                </Link>
              </div>
            </article>

            <article className="panel home-map-card">
              <iframe
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=University%20of%20Waterloo%2C%20Waterloo%2C%20ON&output=embed"
                title="Google Map showing University of Waterloo"
              ></iframe>
              <div className="home-map-content">
                <p className="eyebrow">Current Base</p>
                <h3>Waterloo, Ontario</h3>
                <p className="home-card-copy">
                  Studying and building around the University of Waterloo, with
                  coursework, projects, and internship goals rooted in the local
                  tech community.
                </p>
                <a
                  className="button secondary"
                  href="https://maps.google.com/?q=University%20of%20Waterloo%2C%20Waterloo%2C%20ON"
                  rel="noreferrer"
                  target="_blank"
                >
                  Open Map
                </a>
              </div>
            </article>
          </div>
        </div>

        <aside className="hero-side">
          <article className="intro-card">
            <span className="intro-chip">Hello</span>
            <h3>Quick profile</h3>
            <p>
              A Waterloo CS student with interests spanning frontend systems,
              backend development, algorithmic problem solving, and practical
              software design.
            </p>
            <ul>
              <li>{profile.school}</li>
              <li>{profile.location}</li>
              <li>Open to software engineering and technical internship roles</li>
            </ul>
          </article>

          <article className="floating-note">
            <p className="eyebrow">Contact</p>
            <p>
              {profile.email}
              <br />
              {profile.phone}
              <br />
              {profile.linkedinLabel}
            </p>
          </article>

          <PortfolioAssistant />
        </aside>
      </section>
    </>
  )
}

export default HomePage
