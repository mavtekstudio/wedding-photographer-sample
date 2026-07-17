import { useEffect, useRef, useState } from 'react'
import {
  UserRound, HeartHandshake, Video, UsersRound, Sparkles,
  Phone, MessageCircle, ArrowUpRight, Star, Plus, AtSign, Mail, MapPin, Play, Check,
} from 'lucide-react'
import { siteData } from './siteData.js'
import { HERO, ABOUT, SERVICE_IMGS, PROJECT_IMGS, FILM_IMGS } from './images.js'

const ICONS = { UserRound, HeartHandshake, Video, UsersRound, Sparkles }
const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const canHover = () => typeof window !== 'undefined' && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches

// ── Fade-in image ─────────────────────────────────────────────────────────────
function Img({ src, alt = '', priority = false, ratio }) {
  const [loaded, setLoaded] = useState(false)
  const style = ratio ? { aspectRatio: ratio } : undefined
  return (
    <div className={`imgwrap${loaded ? ' loaded' : ''}`} style={style}>
      <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : 'auto'} onLoad={() => setLoaded(true)} />
    </div>
  )
}

// ── Count-up ──────────────────────────────────────────────────────────────────
function StatNum({ value, suffix }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReduced()) { setN(value); return }
    const io = new IntersectionObserver((e) => {
      if (!e[0].isIntersecting) return
      io.disconnect()
      const dur = 1600, t0 = performance.now()
      const tick = (t) => { const p = Math.min(1, (t - t0) / dur); setN(Math.round(value * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick) }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [value])
  return <span ref={ref}>{n}{suffix}</span>
}

// ── 3D tilt (desktop) ───────────────────────────────────────────────────────────
function useTilt() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !canHover() || prefersReduced()) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`)
    }
    const onLeave = () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg') }
    el.addEventListener('mousemove', onMove); el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])
  return ref
}

function ProjectCard({ p, src }) {
  const ref = useTilt()
  return (
    <article className="project" data-reveal>
      <div ref={ref} className="project-media">
        <Img src={src} alt={`${p.scope} — ${p.place}`} />
        {p.scope && <span className="project-scope">{p.scope}</span>}
        <div className="project-cap"><h3>{p.couple || p.title}</h3><span>{p.place}</span></div>
      </div>
    </article>
  )
}

// ── Magnetic button (desktop) ─────────────────────────────────────────────────
function Magnetic({ children, className, href }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !canHover() || prefersReduced()) return
    const onMove = (e) => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.25}px, ${(e.clientY - (r.top + r.height / 2)) * 0.35}px)` }
    const onLeave = () => { el.style.transform = 'translate(0,0)' }
    el.addEventListener('mousemove', onMove); el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])
  return <a ref={ref} href={href} className={className}>{children}</a>
}

// ── "What We Shoot" story (Instagram-style: auto-advance 2s, tap/swipe, 3D) ──
function ServicesStory({ services, ids }) {
  const n = services.length
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const start = useRef(null)
  const go = (i) => setIdx(((i % n) + n) % n)
  useEffect(() => {
    if (n <= 1 || paused || prefersReduced()) return
    const t = setTimeout(() => setIdx((i) => (i + 1) % n), 2000)
    return () => clearTimeout(t)
  }, [idx, paused, n])
  const onDown = (e) => { start.current = e.clientX }
  const onUp = (e) => {
    const sx = start.current; start.current = null
    if (sx == null) return
    const r = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - sx
    if (Math.abs(dx) > 40) return go(idx + (dx < 0 ? 1 : -1))
    go(idx + ((e.clientX - r.left) / r.width < 0.35 ? -1 : 1))
  }
  return (
    <div className="story" data-reveal onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="story-stage" onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => (start.current = null)}>
        {services.map((s, i) => {
          const Icon = ICONS[s.icon] || Sparkles
          return (
            <article key={i} className={`story-slide${i === idx ? ' current' : ''}`} style={{ '--pos': i - idx }} aria-hidden={i !== idx}>
              <div className="story-img"><img src={ids[i % ids.length]} alt={s.title} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" draggable="false" /></div>
              <div className="story-scrim" />
              <div className="story-copy">
                <span className="story-count">{String(i + 1).padStart(2, '0')}<i> / </i>{String(n).padStart(2, '0')}</span>
                <div className="story-ico"><Icon size={20} strokeWidth={1.6} /></div>
                <h3>{s.title}</h3>
                <p>{s.detail}</p>
              </div>
            </article>
          )
        })}
        <div className="story-bars" aria-hidden="true">
          {services.map((_, i) => (<span key={i} className={`sb${i < idx ? ' done' : ''}${i === idx ? ' active' : ''}`}><i style={{ animationPlayState: paused ? 'paused' : 'running' }} /></span>))}
        </div>
        <span className="story-hint" aria-hidden="true">tap or swipe →</span>
      </div>
      <div className="story-dots">{services.map((s, i) => (<button key={i} className={`sd${i === idx ? ' on' : ''}`} onClick={() => go(i)} aria-label={s.title} />))}</div>
    </div>
  )
}

export default function App() {
  const d = siteData
  const p = d.profile || {}
  const num = (p.whatsappNumber || '').replace(/[^\d]/g, '')
  const waText = encodeURIComponent(`Hi ${p.studioName || ''}, I'd love to check your availability for our wedding.`)
  const wa = num ? `https://wa.me/${num}?text=${waText}` : '#contact'
  const tel = num ? `tel:+${num}` : null
  const [loaded, setLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { const r = requestAnimationFrame(() => setLoaded(true)); return () => cancelAnimationFrame(r) }, [])
  useEffect(() => {
    let raf = 0
    const onScroll = () => { if (raf) return; raf = requestAnimationFrame(() => { setScrolled(window.scrollY > 60); raf = 0 }) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]')]
    if (prefersReduced()) { els.forEach((el) => el.classList.add('in')); return }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } })
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' })
    els.forEach((el, i) => { el.style.setProperty('--i', i % 8); io.observe(el) })
    return () => io.disconnect()
  }, [])

  const nav = [['work', 'Portfolio'], ['films', 'Films'], ['services', 'What We Shoot'], ['pricing', 'Investment'], ['contact', 'Contact']]
  const services = d.services || []
  const projects = (d.projects || []).slice(0, PROJECT_IMGS.length)
  const packages = d.pricing?.packages || []

  return (
    <div className={`site${loaded ? ' loaded' : ''}`}>
      {/* ── Header ── */}
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap nav-in">
          <a href="#top" className="wordmark">{p.studioName || d.brand?.wordmark || 'Studio'}<i>.</i></a>
          <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
            {nav.map(([id, label]) => (<a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>))}
          </nav>
          <div className="nav-actions">
            {tel && <a href={tel} className="icon-btn" aria-label="Call"><Phone size={17} /></a>}
            <a href={wa} className="icon-btn wa" aria-label="WhatsApp" target="_blank" rel="noopener"><MessageCircle size={17} /></a>
            <a href={wa} className="btn btn-solid nav-cta" target="_blank" rel="noopener">Check Your Date</a>
            <button className="burger" aria-label="Menu" onClick={() => setMenuOpen((v) => !v)}><span /><span /><span /></button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="top" className="hero">
        <div className="hero-media">
          <div className="hero-imgwrap"><img src={HERO} alt="" fetchPriority="high" decoding="async" /></div>
          <div className="hero-scrim" />
        </div>
        <div className="wrap hero-in">
          <span className="eyebrow light">{p.heroEyebrow || 'Wedding Films & Photography'}</span>
          <h1 className="hero-title">
            {(p.heroHeadline || 'Your story, told for generations').split(' ').map((w, i) => (
              <span key={i} className="word"><span style={{ '--wd': i }}>{w}&nbsp;</span></span>
            ))}
          </h1>
          <p className="hero-sub">{p.heroSubline}</p>
          <div className="hero-cta">
            <a href={wa} className="btn btn-solid" target="_blank" rel="noopener">Check Your Date</a>
            <a href="#work" className="btn btn-ghost light">See the Portfolio <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <a href="#work" className="scroll-cue" aria-hidden="true"><span /></a>
      </section>

      {/* ── As seen in ── */}
      {d.press?.length > 0 && (
        <section className="press">
          <div className="wrap press-in" data-reveal>
            <span className="eyebrow">As featured in</span>
            <div className="press-row">{d.press.map((m, i) => (<span key={i}>{m}</span>))}</div>
          </div>
        </section>
      )}

      {/* ── Marquee ── */}
      {d.marquee?.length > 0 && (
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">{[...d.marquee, ...d.marquee].map((m, i) => (<span key={i}>{m}<i>✦</i></span>))}</div>
        </div>
      )}

      {/* ── Stats ── */}
      {d.stats?.length > 0 && (
        <section className="stats">
          <div className="wrap stats-in">
            {d.stats.map((s, i) => (
              <div className="stat" key={i} data-reveal>
                <div className="stat-num"><StatNum value={s.value} suffix={s.suffix || ''} /></div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── About ── */}
      <section id="about" className="about">
        <div className="wrap about-in">
          <div className="about-media" data-reveal><Img src={ABOUT} alt="Wedding by the studio" ratio="4 / 5" /></div>
          <div className="about-copy">
            <span className="eyebrow" data-reveal>The Studio</span>
            <h2 data-reveal>{p.aboutHeading || 'We don’t pose your day. We remember it.'}</h2>
            {(p.aboutParagraphs || []).map((t, i) => (<p key={i} data-reveal>{t}</p>))}
            <div className="about-sign" data-reveal>
              <span className="sig">{p.founderName || ''}</span>
              <span className="sig-role">{p.founderCredential || ''}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Portfolio ── */}
      {projects.length > 0 && (
        <section id="work" className="work">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow center" data-reveal>Recent weddings</span>
              <h2 data-reveal>Moments we’ve kept forever</h2>
            </div>
            <div className="work-grid">
              {projects.map((pr, i) => (<ProjectCard key={i} p={pr} src={PROJECT_IMGS[i % PROJECT_IMGS.length]} />))}
            </div>
            <div className="work-more"><a href={wa} className="btn btn-ghost" target="_blank" rel="noopener">See more of our work <ArrowUpRight size={16} /></a></div>
          </div>
        </section>
      )}

      {/* ── Films ── */}
      {d.films?.length > 0 && (
        <section id="films" className="films">
          <div className="films-glow" aria-hidden="true" />
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow gold center" data-reveal>Wedding films</span>
              <h2 data-reveal>Relive the day, don’t just look back</h2>
            </div>
            <div className="films-grid">
              {d.films.map((f, i) => (
                <a key={i} href={wa} className="film" data-reveal target="_blank" rel="noopener">
                  <Img src={FILM_IMGS[i % FILM_IMGS.length]} alt={f.title} ratio="4 / 5" />
                  <div className="film-scrim" />
                  <span className="film-play"><Play size={22} fill="currentColor" strokeWidth={0} /></span>
                  <div className="film-cap"><h3>{f.title}</h3><span>{f.couple} · <i>{f.place}</i></span></div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── What We Shoot (story carousel) ── */}
      {services.length > 0 && (
        <section id="services" className="services">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow center" data-reveal>What we shoot</span>
              <h2 data-reveal>From the first mehendi to the last dance</h2>
            </div>
            <ServicesStory services={services} ids={SERVICE_IMGS} />
          </div>
        </section>
      )}

      {/* ── Testimonials ── */}
      {d.testimonials?.length > 0 && (
        <section className="quotes">
          <div className="quotes-glow" aria-hidden="true" />
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow gold center" data-reveal>Kind words</span>
              <h2 data-reveal>Loved by the couples we’ve shot</h2>
            </div>
            <div className="quotes-grid">
              {d.testimonials.map((t, i) => (
                <figure className="quote" key={i} data-reveal>
                  <div className="stars">{Array.from({ length: t.rating || 5 }).map((_, s) => (<Star key={s} size={14} fill="currentColor" strokeWidth={0} />))}</div>
                  <blockquote>“{t.quote}”</blockquote>
                  <figcaption>
                    <span className="avatar">{(t.name || '?').split(/[& ]+/).filter(Boolean).map((x) => x[0]).slice(0, 2).join('')}</span>
                    <span><b>{t.name}</b><i>{t.place}</i></span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Pricing ── */}
      {packages.length > 0 && (
        <section id="pricing" className="pricing">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow center" data-reveal>Investment</span>
              <h2 data-reveal>Packages that flex to your wedding</h2>
            </div>
            <div className="price-grid">
              {packages.map((pk, i) => (
                <div className={`price-card${pk.badge ? ' feat' : ''}`} key={i} data-reveal>
                  {pk.badge && <span className="price-badge">{pk.badge}</span>}
                  <span className="price-name">{pk.name}</span>
                  <div className="price-amt">{pk.price}</div>
                  <span className="price-unit">{pk.unit ? `for ${pk.unit}` : ''}</span>
                  <ul className="price-feats">
                    {(pk.features || []).map((f, j) => (<li key={j}><Check size={16} strokeWidth={2} />{f}</li>))}
                  </ul>
                </div>
              ))}
            </div>
            {d.pricing?.note && <p className="price-note" data-reveal>{d.pricing.note}</p>}
            <div className="price-note-cta" data-reveal><a href={wa} className="btn btn-solid" target="_blank" rel="noopener">Request a bespoke quote</a></div>
          </div>
        </section>
      )}

      {/* ── Process ── */}
      {d.process?.length > 0 && (
        <section className="process">
          <div className="wrap">
            <div className="section-head center"><span className="eyebrow center" data-reveal>How it works</span><h2 data-reveal>Easy from hello to album</h2></div>
            <div className="process-row">
              <span className="process-line" data-reveal />
              {d.process.map((st, i) => (
                <div className="step" key={i} data-reveal>
                  <div className="step-num">{String(st.step ?? i + 1).padStart(2, '0')}</div>
                  <h3>{st.title}</h3><p>{st.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Why ── */}
      {d.reasons?.length > 0 && (
        <section className="why">
          <div className="wrap why-in">
            {d.reasons.map((r, i) => {
              const Icon = ICONS[r.icon] || Sparkles
              return (<div className="reason" key={i} data-reveal><Icon size={20} strokeWidth={1.6} /><h3>{r.title}</h3><p>{r.text}</p></div>)
            })}
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {d.faqs?.length > 0 && (
        <section className="faq">
          <div className="wrap faq-in">
            <div className="section-head"><span className="eyebrow" data-reveal>Good to know</span><h2 data-reveal>Questions, answered</h2></div>
            <div className="faq-list">
              {d.faqs.map((f, i) => (
                <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={i} data-reveal>
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{f.question}</span><Plus size={18} className="faq-plus" /></button>
                  <div className="faq-a"><div><p>{f.answer}</p></div></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      <section id="contact" className="cta">
        <div className="cta-glow" aria-hidden="true" />
        <div className="wrap cta-in" data-reveal>
          <span className="eyebrow gold">Let’s begin</span>
          <h2>Dates book out fast — is yours still free?</h2>
          <p>Tell us your wedding dates and the events you’d love covered. {p.studioName || 'We'}’ll get back to you the same day — no pressure, no obligation.</p>
          <div className="cta-btns">
            <Magnetic href={wa} className="btn btn-solid lg">Check Your Date</Magnetic>
            <a href={wa} className="btn btn-ghost light lg" target="_blank" rel="noopener"><MessageCircle size={18} /> Chat on WhatsApp</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="wrap footer-in">
          <div className="footer-brand">
            <a href="#top" className="wordmark">{p.studioName || 'Studio'}<i>.</i></a>
            <p>{p.tagline || 'Wedding Films & Photography'}{p.city ? ` · ${p.city}` : ''}</p>
          </div>
          <div className="footer-col">
            <h4>Get in touch</h4>
            {tel && <a href={tel}><Phone size={14} /> +{num}</a>}
            <a href={wa} target="_blank" rel="noopener"><MessageCircle size={14} /> WhatsApp</a>
            {p.email && <a href={`mailto:${p.email}`}><Mail size={14} /> {p.email}</a>}
            {p.instagram && <a href={`https://instagram.com/${p.instagram.replace(/^@/, '')}`} target="_blank" rel="noopener"><AtSign size={14} /> {p.instagram.replace(/^@/, '')}</a>}
          </div>
          {p.serviceAreas?.length > 0 && (
            <div className="footer-col">
              <h4><MapPin size={14} /> Where we shoot</h4>
              <div className="chips">{p.serviceAreas.map((a, i) => (<span key={i}>{a}</span>))}</div>
            </div>
          )}
        </div>
        <div className="wrap footer-legal">
          <span>{d.footer?.copyright || `© ${p.studioName || ''}`} {new Date().getFullYear()}</span>
          <span>Wedding Photography{p.city ? ` · ${p.city}` : ''}</span>
        </div>
      </footer>

      {/* ── Floating WhatsApp ── */}
      <a href={wa} className="fab-wa" aria-label="Chat on WhatsApp" target="_blank" rel="noopener"><MessageCircle size={26} /></a>
    </div>
  )
}
