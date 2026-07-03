import { useEffect, useRef, useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import { trackResumeEvent } from '../lib/analytics'
import {
  awards,
  education,
  experiences,
  profile,
  projects,
  resumePdf,
  skillGroups,
  skillLinkMap,
  skillLogoMap,
} from '../siteData'

const awardImages = [
  '/awards/5091e6761eda19728c947bb978176c32.jpg',
  '/awards/736ef5b4fec9e2d032a4a4c3d1cb258f.jpg',
  '/awards/8730e5789fd3c508d049dd0629a23ee4.jpg',
]

function AwardFlipbook() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [flipDirection, setFlipDirection] = useState('')
  const timeoutRef = useRef(null)

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  const flipTo = (nextIndex, direction) => {
    if (flipDirection || nextIndex === activeIndex) return

    setFlipDirection(direction)
    timeoutRef.current = window.setTimeout(() => {
      setActiveIndex(nextIndex)
      setFlipDirection('')
    }, 320)
  }

  const previousIndex = (activeIndex - 1 + awardImages.length) % awardImages.length
  const nextIndex = (activeIndex + 1) % awardImages.length

  return (
    <div className="award-flipbook">
      <div className={`award-flip-stage ${flipDirection ? `is-flipping-${flipDirection}` : ''}`}>
        <img
          alt={`Award certificate ${activeIndex + 1}`}
          className="award-flip-image"
          src={awardImages[activeIndex]}
        />
      </div>
      <div className="award-flip-controls">
        <button
          className="button secondary award-flip-button"
          onClick={() => flipTo(previousIndex, 'backward')}
          type="button"
        >
          Previous
        </button>
        <span className="award-flip-count">
          {activeIndex + 1} / {awardImages.length}
        </span>
        <button
          className="button secondary award-flip-button"
          onClick={() => flipTo(nextIndex, 'forward')}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  )
}

function SkillBadge({ skill }) {
  const logo = skillLogoMap[skill]
  const href = skillLinkMap[skill]

  if (!logo || !href) return null

  return (
    <a className="skill-badge has-logo" href={href} rel="noreferrer" target="_blank">
      <img alt="" src={logo} />
      {skill}
    </a>
  )
}

function ResumePage() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const groupsWithLogos = skillGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => skillLogoMap[item] && skillLinkMap[item]),
    }))
    .filter((group) => group.items.length > 0)

  const previousProjectIndex = (activeProjectIndex - 1 + projects.length) % projects.length
  const nextProjectIndex = (activeProjectIndex + 1) % projects.length
  const activeProject = projects[activeProjectIndex]

  return (
    <section className="section page-section resume-page merged-resume-page">
      <SectionHeader
        eyebrow="Resume"
        title="Resume, projects, skills, and experience"
        text="Everything is collected here in one place: resume details, selected projects, technical skills, and experience."
      />

      <div className="resume-overview-grid">
        <article className="resume-card panel resume-page-card">
          <p className="eyebrow">Profile</p>
          <h3>{profile.name}</h3>
          <p>{profile.headline}</p>
          <div className="resume-actions">
            <a
              className="button primary"
              href={resumePdf}
              onClick={() => trackResumeEvent('resume_open')}
              rel="noreferrer"
              target="_blank"
            >
              Open PDF
            </a>
            <a
              className="button secondary"
              download
              href={resumePdf}
              onClick={() => trackResumeEvent('resume_download')}
            >
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

        <article className="panel resume-awards-gallery">
          <div className="resume-awards-copy">
            <p className="eyebrow">Selected Honors</p>
            <ul>
              {awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </div>
          <AwardFlipbook />
        </article>
      </div>

      <div className="resume-section-stack">
        <div className="resume-inline-header">
          <p className="eyebrow">Projects</p>
          <h3>Projects</h3>
        </div>
        <section className="resume-project-slider">
          <div className="resume-project-controls">
            <button
              className="button secondary project-nav-button"
              onClick={() => setActiveProjectIndex(previousProjectIndex)}
              type="button"
            >
              Previous
            </button>
            <span className="resume-project-count">
              {activeProjectIndex + 1} / {projects.length}
            </span>
            <button
              className="button secondary project-nav-button"
              onClick={() => setActiveProjectIndex(nextProjectIndex)}
              type="button"
            >
              Next
            </button>
          </div>

          <article
            className={`project-card resume-project-slide ${activeProject.href ? 'has-preview' : ''}`}
            key={`${activeProject.title}-${activeProjectIndex}`}
          >
            <div className="project-card-body">
              <span className="project-tag">{activeProject.tag}</span>
              <h3>{activeProject.title}</h3>
              <p className="project-meta">
                {activeProject.stack} | {activeProject.period}
              </p>
              <p>{activeProject.text}</p>
              {activeProject.href && (
                <p className="project-link-row">
                  <a href={activeProject.href} rel="noreferrer" target="_blank">
                    Visit Project
                  </a>
                </p>
              )}
              <ul className="project-bullets">
                {activeProject.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>

            {activeProject.href && (
              <div className="project-preview-shell">
                <p className="eyebrow">Live Preview</p>
                <div className="project-preview-frame">
                  <iframe
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    src={activeProject.href}
                    title={`${activeProject.title} preview`}
                  ></iframe>
                </div>
              </div>
            )}
          </article>
        </section>

        <div className="resume-inline-header">
          <p className="eyebrow">Skills</p>
          <h3>Skills</h3>
        </div>
        <div className="skills-grid expanded">
          {groupsWithLogos.map((group) => (
            <article className="panel skill-card" key={group.title}>
              <div className="skill-card-header">
                <h3>{group.title}</h3>
              </div>
              <p className="skill-card-copy">{group.description}</p>
              <div className="skill-marquee" aria-label={`${group.title} skills`}>
                <div className="skill-marquee-track">
                  {[...group.items, ...group.items, ...group.items, ...group.items].map((item, index) => (
                    <SkillBadge key={`${item}-${index}`} skill={item} />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="resume-inline-header">
          <p className="eyebrow">Experience</p>
          <h3>Experience</h3>
        </div>
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
      </div>
    </section>
  )
}

export default ResumePage
