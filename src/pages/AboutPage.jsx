import SectionHeader from '../components/SectionHeader'
import { awards, education, storyCards } from '../siteData'

function AboutPage() {
  return (
    <>
      <section className="section page-section story-grid">
        {storyCards.map((card) => (
          <article className="story-card" key={card.title}>
            <p className="eyebrow">About</p>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </section>

      <section className="section about-layout">
        <div className="about-copy">
          <SectionHeader
            eyebrow="About Yi Wei"
            title="Technical focus with strong academic momentum"
            text="This page pulls together the broader story behind the resume: academic direction, problem-solving background, and the kind of engineering foundation Yi is building."
          />
          <div className="about-panels">
            <article className="panel about-panel large">
              <p>
                Yi Wei is currently studying Computer Science at the University
                of Waterloo. Her portfolio spans frontend interface work,
                backend API development, algorithms, data modeling, and applied
                software structure.
              </p>
              <p>
                Her resume shows a useful combination of technical depth and
                communication skill: competitive programming results, classroom
                and internship-style project work, plus teaching and marketing
                experience that translates into stronger teamwork and clearer
                user thinking.
              </p>
            </article>
            <article className="panel about-panel quote">
              <p>
                She is especially strong in environments where logical rigor,
                structured code, and usability all matter at the same time.
              </p>
            </article>
          </div>
        </div>

        <aside className="about-side">
          <article className="panel fact-stack">
            <p className="eyebrow">Education</p>
            <h3>{education.school}</h3>
            <p>{education.degree}</p>
            <span>{education.location}</span>
            <span>{education.period}</span>
          </article>
          <article className="panel awards-panel">
            <p className="eyebrow">Awards</p>
            <ul>
              {awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </article>
        </aside>
      </section>
    </>
  )
}

export default AboutPage
