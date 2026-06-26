import './App.css'
import resumePdf from '../Software_Engineer_Resume (1).pdf'

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#resume', label: 'Resume' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const heroStats = [
  { value: '03', label: 'Featured sections' },
  { value: '18', label: 'React-ready components' },
  { value: '01', label: 'Downloadable resume' },
]

const storyCards = [
  {
    title: 'Identity',
    text: 'Use this card to introduce WeiYi in one concise paragraph: major, interests, personal style, and what kind of work she wants to be known for.',
  },
  {
    title: 'Direction',
    text: 'This layout works best when the copy is specific: internship focus, design taste, technical interests, or the kind of teams she wants to join.',
  },
  {
    title: 'Presence',
    text: 'The page is intentionally softer and more editorial than the previous version, with blue and pink gradients, layered cards, and lighter spacing rhythm.',
  },
]

const experiences = [
  {
    period: '2025 - Present',
    role: 'Student Developer',
    org: 'Your School or Program',
    summary:
      'Replace this with WeiYi’s current academic or professional focus. Keep it concrete and directional rather than generic.',
    bullets: [
      'Describe one area of ownership or a recurring responsibility.',
      'Mention one technical tool, platform, or workflow she uses.',
      'Mention one visible outcome, improvement, or deliverable.',
    ],
  },
  {
    period: '2024 - 2025',
    role: 'Club / Internship / Research Role',
    org: 'Organization Name',
    summary:
      'Use this second block to show range: teamwork, leadership, building, research, communication, or design support.',
    bullets: [
      'Highlight one collaboration or initiative.',
      'Show one skill that matches the positions she wants.',
      'Keep each bullet useful and easy to scan.',
    ],
  },
]

const projects = [
  {
    title: 'Portfolio Project',
    tag: 'Frontend',
    text:
      'Describe a project with a clear user-facing goal. Explain what WeiYi designed or built and why the result matters.',
  },
  {
    title: 'Team Project',
    tag: 'Collaboration',
    text:
      'Use this section for a group project, lab, club tool, or internship deliverable that shows communication and execution.',
  },
  {
    title: 'Creative Build',
    tag: 'Personal',
    text:
      'A more personal project helps the site feel human. This can be visual design, content, a side build, or a more experimental idea.',
  },
]

const skillGroups = [
  {
    title: 'Design + Frontend',
    items: ['React 18', 'JavaScript', 'HTML', 'CSS', 'Responsive UI'],
  },
  {
    title: 'Workflow + Tools',
    items: ['Vite', 'Git', 'Figma', 'VS Code', 'Presentation'],
  },
  {
    title: 'Personal Strengths',
    items: ['Communication', 'Research', 'Execution', 'Creativity', 'Teamwork'],
  },
]

const contactLinks = [
  { label: 'Email', value: 'weiyi@example.com', href: 'mailto:weiyi@example.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/weiyi', href: 'https://linkedin.com' },
  { label: 'GitHub', value: 'github.com/weiyi', href: 'https://github.com' },
]

function SectionHeader({ eyebrow, title, text }) {
  return (
    <header className="section-header">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <span>{text}</span>
    </header>
  )
}

function App() {
  return (
    <main className="site-shell">
      <div className="page-glow page-glow-left" aria-hidden="true"></div>
      <div className="page-glow page-glow-right" aria-hidden="true"></div>

      <header className="topbar">
        <a className="brand" href="#home">
          WeiYi
        </a>
        <nav className="nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-main">
          <p className="eyebrow">Personal Portfolio</p>
          <h1>Blue pink editorial layout for a softer personal brand.</h1>
          <p className="hero-text">
            The whole page has been redesigned around a lighter, more feminine
            visual direction: pastel blue, blush pink, floating cards, clearer
            content hierarchy, and a more polished landing experience.
          </p>

          <div className="hero-actions">
            <a className="button primary" href={resumePdf} target="_blank" rel="noreferrer">
              View Resume
            </a>
            <a className="button secondary" href="#projects">
              Explore Projects
            </a>
          </div>

          <div className="hero-stats">
            {heroStats.map((item) => (
              <article className="stat-card" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>

        <aside className="hero-side">
          <article className="intro-card">
            <span className="intro-chip">Hello</span>
            <h3>WeiYi&apos;s page starter</h3>
            <p>
              This panel is designed for a short first impression: school,
              direction, personality, and what kind of opportunities she is
              looking for.
            </p>
            <ul>
              <li>Major or program</li>
              <li>City or campus base</li>
              <li>Target role or focus</li>
            </ul>
          </article>

          <article className="floating-note">
            <p className="eyebrow">Style Note</p>
            <p>
              Replace the placeholder text with real information and the layout
              will still hold up cleanly.
            </p>
          </article>
        </aside>
      </section>

      <section className="section story-grid" id="about">
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
            eyebrow="About WeiYi"
            title="A homepage that feels more personal"
            text="The previous version was straightforward, but visually flat. This version gives the site a more distinct voice through softer color, layered composition, and more deliberate content zones."
          />
          <div className="about-panels">
            <article className="panel about-panel large">
              <p>
                This area should become WeiYi&apos;s real introduction. A strong
                version explains what she studies, what kinds of work she enjoys,
                and how she thinks about building, creating, or collaborating.
              </p>
              <p>
                The layout supports longer writing better than before, so she can
                sound thoughtful instead of just listing keywords.
              </p>
            </article>
            <article className="panel about-panel quote">
              <p>
                Soft visuals do not mean weak structure. The goal here is clearer
                hierarchy, better spacing, and a more memorable first impression.
              </p>
            </article>
          </div>
        </div>

        <aside className="about-side" id="resume">
          <article className="resume-card panel">
            <p className="eyebrow">Resume</p>
            <h3>Software Engineer Resume</h3>
            <p>
              The resume action now points to the local PDF already in this
              project, so visitors can open or download it directly.
            </p>
            <div className="resume-actions">
              <a className="button primary" href={resumePdf} target="_blank" rel="noreferrer">
                Open PDF
              </a>
              <a className="button secondary" href={resumePdf} download>
                Download
              </a>
            </div>
          </article>
        </aside>
      </section>

      <section className="section" id="projects">
        <SectionHeader
          eyebrow="Projects"
          title="Work highlights"
          text="This row-based card layout is cleaner than the previous even grid and gives each project more visual presence."
        />
        <div className="project-ribbon">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <span className="project-tag">{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="skills">
        <SectionHeader
          eyebrow="Skills"
          title="Capabilities and strengths"
          text="Grouped skill cards keep the page readable and make it easier to tune toward software, design, product, or hybrid roles."
        />
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="panel skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <div className="chips">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="experience">
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

      <section className="section contact-section" id="contact">
        <div className="contact-layout panel">
          <div className="contact-intro">
            <p className="eyebrow">Contact</p>
            <h2>Let the page end on something warm and direct.</h2>
            <p>
              Replace the links below with real contact details. This footer-style
              block is designed to feel lighter and more inviting than a plain
              list of buttons.
            </p>
          </div>
          <div className="contact-grid">
            {contactLinks.map((item) => (
              <a
                className="contact-card"
                href={item.href}
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
    </main>
  )
}

export default App
