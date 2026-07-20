// ─────────────────────────────────────────────────────────────────────────────
// images.js — the template's default TAMIL NADU wedding photos, COMMITTED into the
// repo (public/img). Every image was reviewed by eye to read as a genuinely South
// Indian / Tamil wedding (Kanjeevaram silk, temple gold, jasmine/malligai, gopuram,
// kuthuvilakku, banana-leaf & thoranam décor) AND premium. Crucially, NO client
// face is revealed — the set is silhouettes, back-of-bride, and détail/décor shots
// only (risk-avoidance for a sample site). Served from the site's own GitHub Pages
// CDN — no external hotlink. A client later swaps these for their own photos by
// replacing files in public/img.
// ─────────────────────────────────────────────────────────────────────────────

const img = (name) => `${import.meta.env.BASE_URL || './'}img/${name}`

export const HERO = img('hero.jpg')     // reception silhouette — couple standing, faces hidden
export const ABOUT = img('about.jpg')   // modern reception stage (no people)

// "What We Shoot" story images — paired by index with siteData.services[]:
//   0 Candid Wedding  1 Wedding Films  2 Pre-Wedding  3 Maternity/Newborn  4 Events/Birthdays
export const SERVICE_IMGS = [
  img('svc-candid.jpg'),     // bride from behind — jasmine (malligai) hair strands, no face
  img('svc-films.jpg'),      // Meenakshi Amman gopuram, Madurai (cinematic)
  img('svc-prewedding.jpg'), // couple silhouette (jasmine-braided plait)
  img('svc-maternity.jpg'),  // valaikaappu belly detail (no face)
  img('svc-events.jpg'),     // brass kuthuvilakku deepam
]

// Portfolio gallery
export const PROJECT_IMGS = [
  img('p1.jpg'),          // sage-green draped reception stage (no people)
  img('svc-candid.jpg'),  // bride from behind — jasmine hair strands
  img('p4.jpg'),          // banana-leaf backdrop + marigold & jasmine strings
  img('p2.jpg'),          // banana-plant + thoranam entrance décor
  img('svc-events.jpg'),  // brass kuthuvilakku deepam
  img('p3.jpg'),          // bridal back-hair (jadai, malligai) — pure back, no face
  img('svc-films.jpg'),   // Meenakshi gopuram
  img('about.jpg'),       // reception stage
]

// Films section stills (most cinematic of the set)
export const FILM_IMGS = [img('svc-prewedding.jpg'), img('svc-films.jpg'), img('svc-events.jpg')]
