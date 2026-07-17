// ─────────────────────────────────────────────────────────────────────────────
// siteData.js — THE ONLY FILE REGENERATED PER CLIENT (text only).
// App.jsx layout + images.js photos never change per client. The automation engine
// (Claude Code headless) overwrites this file with content for each photographer.
//
// CONTRACT (keep this shape):
//   meta       → SEO/social tags injected into index.html at deploy time
//   brand      → { initials, wordmark }
//   profile    → studio identity + hero/about copy + contact (contact fields filled by deploy.js)
//   stats[4]   → { value:number, suffix, label }        (count-up trust strip)
//   marquee[]  → words for the moving strip
//   services[5]→ { title, detail, icon }  "What We Shoot"  icon ∈ Sparkles|Video|HeartHandshake|UsersRound|UserRound
//   projects[] → { title, couple, place, scope }         (portfolio, paired with images.js by index)
//   films[3]   → { title, couple, place }
//   pricing    → { note, packages:[ { name, price, unit, badge?, features[] } ] }  (section hides if empty)
//   process[]  → { step, title, detail }
//   reasons[]  → { title, text, icon }
//   testimonials[] → { quote, name, place, rating }
//   press[]    → publication names (section hides if empty)
//   faqs[]     → { question, answer }
//
// Rules for generated content: warm, image-first, India-appropriate, NO invented
// awards / weddings-shot counts / publications / testimonials for real clients.
// ─────────────────────────────────────────────────────────────────────────────

export const siteData = {
  meta: {
    title: 'Saanjh — Wedding Films & Photography in Chennai',
    description:
      'Saanjh is a Chennai wedding photography & films studio — unposed, cinematic coverage of weddings, pre-weddings and celebrations across India and destination.',
    ogTitle: 'Saanjh — Your story, told for generations',
    ogDescription: 'Candid wedding photography & cinematic films in Chennai and beyond. Check your date.',
    siteName: 'Saanjh Wedding Films & Photography',
    url: 'https://example.github.io/professional-website-client/', // filled by deploy.js
    themeColor: '#B8935A', // filled by deploy.js
  },

  brand: { initials: 'S', wordmark: 'Saanjh' },

  profile: {
    studioName: 'Saanjh',
    tagline: 'Wedding Films & Photography',
    city: 'Chennai',
    heroEyebrow: 'Wedding Films & Photography · Chennai · Destination',
    heroHeadline: 'Your story, told for generations',
    heroSubline:
      'Unposed, cinematic wedding photography & films — across Chennai and wherever you say “I do”. The way the day actually felt, kept forever.',
    founderName: 'Aravind & Nithya',
    founderCredential: 'Lead Photographers',
    aboutHeading: 'We don’t pose your day. We remember it.',
    aboutParagraphs: [
      'Saanjh is a small, hands-on wedding studio. We shoot quietly and stay out of the way — so the glances, the happy tears, the chaos of the baraat and the calm of the pheras all stay exactly as they happened.',
      'Every wedding is led by us, start to finish — one team you’ll actually know by name, a cinematic film and a set of photographs your family will still be opening in twenty years.',
    ],
    whatsappNumber: '', // filled by deploy.js (the studio's phone)
    email: 'hello@example.com',
    instagram: '',
    serviceAreas: ['Chennai', 'Coimbatore', 'Bengaluru', 'Madurai', 'Pondicherry', 'Goa', 'Destination'],
  },

  stats: [
    { value: 300, suffix: '+', label: 'Weddings filmed' },
    { value: 40, suffix: '+', label: 'Cities & destinations' },
    { value: 9, suffix: ' yrs', label: 'Behind the lens' },
    { value: 500, suffix: '+', label: 'Happy families' },
  ],

  marquee: ['Candid', 'Cinematic Films', 'Muhurtham', 'Oonjal', 'Mehendi', 'Kanjeevaram', 'Reception', 'Portraits', 'Destination'],

  // What We Shoot (paired by index with images.js SERVICE_IMGS)
  services: [
    { title: 'Candid Wedding Photography', detail: 'Unposed, documentary coverage of every glance, tear and celebration — the real story of your day.', icon: 'Sparkles' },
    { title: 'Wedding Films & Cinematography', detail: 'Cinematic teasers and highlight films that let you relive the day, not just look back on it.', icon: 'Video' },
    { title: 'Pre-Wedding & Couple Shoots', detail: 'A relaxed, story-led shoot at a place you love — the perfect opening chapter to your album.', icon: 'HeartHandshake' },
    { title: 'Maternity & Newborn', detail: 'Gentle, tasteful maternity, newborn and baby-shower sessions to hold on to the first chapter.', icon: 'UsersRound' },
    { title: 'Events, Birthdays & Portraits', detail: 'First birthdays, family functions and portrait sessions — shot with the same care as a wedding.', icon: 'UserRound' },
  ],

  // Portfolio (paired by index with images.js PROJECT_IMGS)
  projects: [
    { title: 'The Kanjeevaram Bride', couple: 'Priya & Karthik', place: 'Chennai', scope: 'Bridal Portrait' },
    { title: 'Golden Hour Bride', couple: 'Divya & Aravind', place: 'Madurai', scope: 'Candid' },
    { title: 'Talambralu Showers', couple: 'Sneha & Vishnu', place: 'Thanjavur', scope: 'Muhurtham' },
    { title: 'By the Nilavilakku', couple: 'Meera & Surya', place: 'Kumbakonam', scope: 'Ceremony' },
    { title: 'Under the Kireedam', couple: 'Anjali & Hari', place: 'Chennai', scope: 'Muhurtham' },
    { title: 'Malligai & Gold', couple: 'Lakshmi & Ramesh', place: 'Coimbatore', scope: 'Bridal Detail' },
    { title: 'At the Gopuram', couple: 'Nithya & Arjun', place: 'Madurai', scope: 'Portrait' },
    { title: 'The Maalai Exchange', couple: 'Kavya & Vikram', place: 'Pondicherry', scope: 'Maalai Exchange' },
  ],

  films: [
    { title: 'Priya & Karthik', couple: 'A Chennai temple wedding', place: '3:42 film' },
    { title: 'Nithya & Arjun', couple: 'Golden hour at the gopuram', place: '2:58 film' },
    { title: 'Meera & Surya', couple: 'A Kumbakonam muhurtham', place: '1:40 teaser' },
  ],

  pricing: {
    note: 'Every wedding is different, so every quote is bespoke — these are starting points. Tell us your dates and events and we’ll build a package around them.',
    packages: [
      { name: 'Silver', price: '₹75,000', unit: 'one event', features: ['1 photographer + 1 cinematographer', 'Candid + traditional photos', 'Highlight teaser (60s)', '300+ edited images', 'Online gallery'] },
      { name: 'Gold', price: '₹1,50,000', unit: 'wedding day', badge: 'Most booked', features: ['2 photographers + 1 cinematographer', 'Full-day candid coverage', 'Cinematic highlight film', '500+ edited images', 'Premium layflat album'] },
      { name: 'Platinum', price: '₹2,50,000', unit: 'wedding + reception', features: ['2 photographers + 2 cinematographers', 'Multi-day coverage', 'Teaser + full film + reels', '750+ edited images', 'Drone + two premium albums'] },
    ],
  },

  process: [
    { step: 1, title: 'Say hello', detail: 'Tell us your dates, venues and the events you want covered.' },
    { step: 2, title: 'Lock your date', detail: 'We confirm availability and hold your date with a simple booking.' },
    { step: 3, title: 'Plan the shoot', detail: 'A quick call to understand your families, must-haves and vibe.' },
    { step: 4, title: 'The big day', detail: 'We shoot quietly and fully — you just live your wedding.' },
    { step: 5, title: 'Films & albums', detail: 'Teaser in 48 hours, full film and album delivered soon after.' },
  ],

  reasons: [
    { title: 'The people you meet shoot your day', text: 'No swapping teams last-minute — the photographers you talk to are the ones behind the lens.', icon: 'UserRound' },
    { title: 'Photos and films, one team', text: 'Stills and cinema in sync, so nothing important is missed by either.', icon: 'Video' },
    { title: 'Teaser in 48 hours', text: 'A short reel to share with family while the memories are still warm.', icon: 'Sparkles' },
    { title: 'Destination-ready', text: 'We travel light and pan-India — Goa, Udaipur, the hills, wherever.', icon: 'HeartHandshake' },
  ],

  testimonials: [
    { quote: 'Watching our film felt like living the day again — even my grandmother cried. They were everywhere and nowhere, we never once felt watched.', name: 'Priya & Karthik', place: 'Chennai', rating: 5 },
    { quote: 'The teaser came in two days and broke the family group chat. Every candid caught exactly the moment we’d have wanted.', name: 'Divya & Aravind', place: 'Madurai', rating: 5 },
    { quote: 'Calm, kind and completely on time. The album is the one thing from our wedding we’ll keep forever.', name: 'Kavya & Vikram', place: 'Pondicherry', rating: 5 },
  ],

  press: ['WedMeGood', 'WeddingSutra', 'The Wedding Brigade', 'Vogue Weddings', 'Condé Nast Traveller'],

  faqs: [
    { question: 'How much does a wedding cost?', answer: 'It depends on how many events and days you want covered and the team size. Our wedding-day coverage typically starts around ₹75,000 and packages scale from there — share your dates and we’ll send a clear, itemised quote with no hidden costs.' },
    { question: 'Do you travel for destination weddings?', answer: 'Yes — we shoot pan-India and destination weddings regularly (Goa, Udaipur, the hills and abroad). Travel and stay are added at actuals; just tell us the location.' },
    { question: 'How far in advance should we book?', answer: 'Popular wedding dates go months ahead, so the earlier the better — often 6–10 months. Use “Check Your Date” and we’ll tell you straight away if we’re free.' },
    { question: 'When do we get our photos and film?', answer: 'A teaser reel lands within 48 hours. Edited photographs and the full film follow within a few weeks, with your album after final selections.' },
  ],

  footer: { copyright: '© Saanjh Wedding Films & Photography' },
}

export default siteData
