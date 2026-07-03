import SectionHeader from '../components/SectionHeader'

const galleryPhotos = [
  '../portray/e1966cb83cf6f747568d003df42cf989.jpg',
  '13b2178818b48acab24d419de63dd5d7.jpg',
  '180884c4f0e6cba323f5ffeca9eeb9ef.jpg',
  '1dc5406f716ac846e71739241a962d94.jpg',
  '2033bb3fa83a673cb6f65835916ab013.jpg',
  '242a442157f929cb0bf4329f880492d2.jpg',
  '37d41bb8205a2436c009a5f8ec3a9fde.jpg',
  '3e42e7c5f81f666199d084bfc124d998.jpg',
  '5cf998c8ee47fe8ef93c2222b8428793.jpg',
  '6b85df50acea9504c2077427ceadcbef.jpg',
  '71c1c825e8b8ab278827b548974cec64.jpg',
  '8177a9d381c9b5eba54d238483c2565b.jpg',
  '9176103dbcca0eb9f4b72a9b86f2c146.jpg',
  '919d24cddebcc3c9562734c80c31aa94.jpg',
  'a709d6fd0fa44fe28de71014363db312.jpg',
  'ae8302716b061ea63e5608245da8483d.jpg',
  'b1f1780e7ab92bf1ac59fd1adf2184bf.jpg',
  'b2dbab6b50254a20c25ce11047dc2960.jpg',
  'b78f986ea2a5136de8044b98a8ae1cb2.jpg',
  'caecd4e4f56e250588ed3044453ecae3.jpg',
  'd3c042b7ae28c9eb7dee5eea62a3ea3f.jpg',
  'd67b364eb8eb98cdfef5d64563401c00.jpg',
  'de3477a342d23d32dc612cf7952d8463.png',
  'df5b4f52dc5f6f310d99fd23ecebc2af.jpg',
  'e44d37d000bf9de2423d14b1a6b2c80f.jpg',
  'Weixin Image_20260702181539_5406_822.jpg',
].map((fileName) =>
  fileName.startsWith('../')
    ? `/portray/${encodeURIComponent(fileName.replace('../portray/', ''))}`
    : `/photos/${encodeURIComponent(fileName)}`,
)

function PhotosPage() {
  return (
    <section className="section page-section">
      <SectionHeader eyebrow="Photos" title="Portraits and moments" text="" />

      <div className="photo-masonry-grid">
        {galleryPhotos.map((photo, index) => (
          <article className="panel photo-tile" key={photo}>
            <img alt={`Yi Wei gallery photo ${index + 1}`} src={photo} />
          </article>
        ))}
      </div>
    </section>
  )
}

export default PhotosPage
