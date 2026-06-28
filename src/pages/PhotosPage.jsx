import portraitImage from '../../photos/05c07af5dffb063b220c865eb4adc06e.jpg'
import SectionHeader from '../components/SectionHeader'

function PhotosPage() {
  return (
    <section className="section page-section">
      <SectionHeader
        eyebrow="Photos"
        title="A more personal visual note"
        text="A dedicated photo page for portrait-led visuals, with space to grow into a fuller gallery as more images are added."
      />

      <div className="photo-gallery-layout">
        <article className="panel photo-feature-card">
          <div className="photo-feature-media">
            <img alt="Yi Wei portrait" src={portraitImage} />
          </div>
          <div className="photo-feature-copy">
            <p className="eyebrow">Featured Portrait</p>
            <h3>Editorial profile frame</h3>
            <p>
              This image anchors the softer side of the portfolio, balancing the
              resume, projects, and technical sections with a cleaner personal
              visual identity.
            </p>
          </div>
        </article>

        <article className="panel photo-note-card">
          <p className="eyebrow">Gallery Note</p>
          <h3>Ready for more photos</h3>
          <p>
            The page structure is already in place. Once more images are added
            to the local photo folder, this can expand into a fuller gallery,
            slider, or scrapbook-style layout.
          </p>
        </article>
      </div>
    </section>
  )
}

export default PhotosPage
