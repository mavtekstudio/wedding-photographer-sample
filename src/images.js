// ─────────────────────────────────────────────────────────────────────────────
// images.js — the template's default INDIAN wedding photos, COMMITTED into the
// repo (public/img). Every image was reviewed by eye to read as a genuinely
// Indian wedding (red-gold lehengas, safa/turban, mehendi, chooda, haldi, mandap)
// AND premium. Served from the site's own GitHub Pages CDN — no external hotlink.
// A client later swaps these for their own photos by replacing files in public/img.
// ─────────────────────────────────────────────────────────────────────────────

const img = (name) => `${import.meta.env.BASE_URL || './'}img/${name}`

export const HERO = img('hero.jpg')     // North-Indian bride & groom (safa, red-gold lehenga)
export const ABOUT = img('about.jpg')   // tender couple portrait

// "What We Shoot" story images — paired by index with siteData.services[]:
//   0 Candid Wedding  1 Wedding Films  2 Pre-Wedding  3 Maternity/Newborn  4 Events/Birthdays
export const SERVICE_IMGS = [
  img('svc-candid.jpg'),     // bridal portrait, maang tikka + nath
  img('svc-films.jpg'),      // bridal entry through a marigold mandap (cinematic)
  img('svc-prewedding.jpg'), // pre-wedding hilltop couple
  img('svc-maternity.jpg'),  // maternity studio portrait
  img('svc-events.jpg'),     // haldi ceremony
]

// Portfolio gallery
export const PROJECT_IMGS = [
  img('p1.jpg'),          // mehendi hands + red lehenga
  img('svc-candid.jpg'),  // bridal portrait close-up
  img('p4.jpg'),          // mehendi-function bride (yellow)
  img('p2.jpg'),          // couple portrait
  img('svc-events.jpg'),  // haldi ceremony
  img('p3.jpg'),          // mehendi hands detail
  img('svc-films.jpg'),   // bridal entry
  img('about.jpg'),       // tender couple
]

// Films section stills
export const FILM_IMGS = [img('hero.jpg'), img('svc-films.jpg'), img('p2.jpg')]
