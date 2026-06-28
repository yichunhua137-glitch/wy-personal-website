import SectionHeader from '../components/SectionHeader'
import { experiences } from '../siteData'

function ExperiencePage() {
  return (
    <section className="section page-section">
      <SectionHeader
        eyebrow="Experience"
        title="Resume-style detail, website-style presentation"
        text="The timeline now sits in rounded glassy panels with more spacing and better scanability than the previous compact block layout."
      />
      <div className="experience-list">
        {experiences.map((item) => (
          <article className="experience-item" key={`${item.role}-${item.period}`}>
            <div className="experience-period">{item.period}</div>
            <div className="panel experience-card">
              <h3>{item.role}</h3>
              <p className="experience-org">{item.org}</p>
              <p className="experience-location">{item.location}</p>
              <p className="experience-summary">{item.summary}</p>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ExperiencePage
