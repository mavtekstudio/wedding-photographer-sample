# Interior Designer Template — "The Monograph"

A premium, image-led, animated single-page website for Indian interior designers.
Part of the Lead Machine multi-niche factory. Same build/deploy contract as the other
niche templates (Vite + React + Tailwind base → GitHub Pages via `.github/workflows/deploy.yml`).

**Per-client, only `src/siteData.js` changes** (text). Photos live in `src/images.js`
(shared template assets) so the AI content generator never touches image URLs. Icons are
restricted to `UserRound | Sparkles | UsersRound | HeartHandshake | Video` (lucide-react).

- `npm run dev` — local preview
- `npm run build` — production build to `dist/`

Design: quiet-luxury editorial (Fraunces + Inter, warm lime-wash / clay / olive / brass),
clip-path hero reveal, scroll-reveal, count-up stats, blur-up images, 3D-tilt portfolio,
category marquee, magnetic CTA — all `prefers-reduced-motion` safe.
