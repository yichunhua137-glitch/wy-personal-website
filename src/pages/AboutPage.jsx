import SectionHeader from '../components/SectionHeader'
import { awards, education, storyCards } from '../siteData'

const pianoVideo = '/Weiyi%20piano/Weixin%20Videos2026-07-02_191852_317.mp4'

function AboutPage() {
  return (
    <section className="section page-section about-page-shell">
      <div className="about-hero-grid">
        <article className="panel about-intro-card">
          <SectionHeader
            eyebrow="About"
            title="Technical focus and personal rhythm"
            text="I care about building software that feels structured, usable, and thoughtful. My interests sit across frontend systems, backend work, problem solving, and clear communication."
          />
          <div className="about-intro-copy">
            <p>
              I am currently studying Computer Science at the University of
              Waterloo. My work spans interface design, backend APIs,
              algorithms, data modeling, and practical software structure.
            </p>
            <p>
              What ties everything together for me is the balance between
              technical depth and communication. Competitive programming,
              projects, teaching, and marketing all shaped how I approach clean
              systems and user-facing work.
            </p>
          </div>
          <div className="about-focus-strip">
            <span>Frontend systems</span>
            <span>Backend APIs</span>
            <span>Algorithms</span>
            <span>Clear communication</span>
          </div>
        </article>

        <article className="panel about-video-card feature">
          <div className="about-video-copy">
            <p className="eyebrow">Piano</p>
            <h3>Outside of software</h3>
          </div>
          <video className="about-video-player" controls playsInline preload="metadata">
            <source src={pianoVideo} type="video/mp4" />
          </video>
        </article>
      </div>

      <div className="about-story-grid">
        {storyCards.map((card) => (
          <article className="story-card about-story-card" key={card.title}>
            <p className="eyebrow">About</p>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>

      <div className="about-bottom-grid">
        <article className="panel fact-stack about-education-card">
          <p className="eyebrow">Education</p>
          <h3>{education.school}</h3>
          <p>{education.degree}</p>
          <span>{education.location}</span>
          <span>{education.period}</span>
        </article>

        <article className="panel awards-panel about-awards-card">
          <p className="eyebrow">Awards</p>
          <ul>
            {awards.map((award) => (
              <li key={award}>{award}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}

export default AboutPage
