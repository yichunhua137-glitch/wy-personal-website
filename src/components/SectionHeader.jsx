function SectionHeader({ eyebrow, title, text }) {
  return (
    <header className="section-header">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <span>{text}</span>
    </header>
  )
}

export default SectionHeader
