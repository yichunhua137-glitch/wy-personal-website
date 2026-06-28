import SectionHeader from '../components/SectionHeader'
import { projects } from '../siteData'

function ProjectsPage() {
  return (
    <section className="section page-section">
      <SectionHeader
        eyebrow="Projects"
        title="Work highlights"
        text="This row-based card layout is cleaner than the previous even grid and gives each project more visual presence."
      />
      <div className="project-showcase">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <span className="project-tag">{project.tag}</span>
            <h3>{project.title}</h3>
            <p className="project-meta">
              {project.stack} · {project.period}
            </p>
            <p>{project.text}</p>
            <ul className="project-bullets">
              {project.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProjectsPage
