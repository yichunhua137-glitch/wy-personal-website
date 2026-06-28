import SectionHeader from '../components/SectionHeader'
import { awards, education, profile, resumePdf } from '../siteData'

function ResumePage() {
  return (
    <section className="section page-section resume-page">
      <SectionHeader
        eyebrow="Resume"
        title="Resume overview"
        text="This page gives a web version of the resume while still letting visitors open the original PDF."
      />
      <div className="resume-overview-grid">
        <article className="resume-card panel resume-page-card">
          <p className="eyebrow">Profile</p>
          <h3>{profile.name}</h3>
          <p>{profile.headline}</p>
          <div className="resume-actions">
            <a className="button primary" href={resumePdf} rel="noreferrer" target="_blank">
              Open PDF
            </a>
            <a className="button secondary" download href={resumePdf}>
              Download
            </a>
          </div>
        </article>

        <article className="panel resume-summary-card">
          <p className="eyebrow">Education</p>
          <h3>{education.degree}</h3>
          <p>{education.school}</p>
          <span>{education.location}</span>
          <span>{education.period}</span>
        </article>

        <article className="panel resume-summary-card awards">
          <p className="eyebrow">Selected Honors</p>
          <ul>
            {awards.slice(0, 3).map((award) => (
              <li key={award}>{award}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}

export default ResumePage
