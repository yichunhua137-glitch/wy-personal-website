import SectionHeader from '../components/SectionHeader'
import { skillGroups, skillLinkMap, skillLogoMap } from '../siteData'

function SkillBadge({ skill }) {
  const logo = skillLogoMap[skill]
  const href = skillLinkMap[skill]

  return (
    <a
      className={logo ? 'skill-badge has-logo' : 'skill-badge'}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {logo && <img alt="" src={logo} />}
      {skill}
    </a>
  )
}

function SkillsPage() {
  const groupsWithLogos = skillGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => skillLogoMap[item]),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <section className="section page-section">
      <SectionHeader
        eyebrow="Skills"
        title="Capabilities and strengths"
        text="A cleaner breakdown of Yi Wei's technical toolkit, from programming fundamentals to frontend systems, backend work, and daily engineering workflow."
      />
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
    </section>
  )
}

export default SkillsPage
