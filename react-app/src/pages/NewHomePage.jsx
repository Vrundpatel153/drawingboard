import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { WHATSAPP_NUMBER } from '../utils/siteConfig';
import './NewHomePage.css';

const WORDS = ['brands', 'packaging', 'websites', 'launches'];

const CASE_STUDIES = [
  {
    slug: 'after8®---reimagining-intimacy-for-a-new-generation.',
    title: 'After8®',
    category: 'Wellness',
    index: '01',
    description: 'Intimate care for a generation that’s done whispering. A full identity, packaging and digital system.',
    image: 'https://framerusercontent.com/images/GI9hs6gABp4QhAbVBk1Ej9TVE0.png',
    spanClass: 's7',
    bg: '#D1D84E',
    color: '#2B2675',
    tags: ['Identity', 'Packaging', 'Digital']
  },
  {
    slug: 'forte-luxury-architecture-brand-identity',
    title: 'Forte',
    category: 'Architecture',
    index: '02',
    description: 'A refined identity for an architecture and real estate practice: arch monogram, high-contrast serif, forest green and warm cream, from signage to shopping bags.',
    image: 'https://res.cloudinary.com/f4xvzpqg/image/upload/v1795471086/drawingsboard/01-case-studies/forte-luxury-architecture/forte_01.png',
    spanClass: 's5',
    bg: '#A99BF7',
    color: '#2B2675',
    tags: ['Identity', 'Signage']
  },
  {
    slug: 'dabbo-madrid-hot-dog-coffee-branding',
    title: 'Dabbo',
    category: 'Food & beverage',
    index: '03',
    description: 'Retro street food for Madrid: folding hot dog clamshells, carrier boxes, coffee cups and greaseproof paper, made to be held and photographed.',
    image: 'https://res.cloudinary.com/f4xvzpqg/image/upload/v1795470425/drawingsboard/01-case-studies/dabbo-madrid/dabbo_01.jpg',
    spanClass: 's5',
    bg: '#FCFAEF',
    color: '#2B2675',
    tags: ['Packaging', 'Identity']
  },
  {
    slug: 'high-life-residences',
    title: 'High Life',
    category: 'Real estate',
    index: '04',
    description: '“It’s High Life.” Light trails and architectural grids for a luxury residential tower, from gold-foil sales folios to a resident app.',
    image: 'https://res.cloudinary.com/f4xvzpqg/image/upload/v1795471371/drawingsboard/01-case-studies/high-life-residences/high_life_02.jpg',
    spanClass: 's7',
    bg: '#FCFAEF',
    color: '#2B2675',
    tags: ['Identity', 'Campaign', 'App']
  },
  {
    slug: 'orient-developers-spatial-branding',
    title: 'Orient Developers',
    category: 'Spatial',
    index: '05',
    description: 'Crafting spaces, building legacies. Spatial design, wayfinding, a corporate identity suite and a sales gallery system.',
    image: 'https://res.cloudinary.com/f4xvzpqg/image/upload/v1795472292/drawingsboard/01-case-studies/orient-developers/orient_page_02.jpg',
    spanClass: 's7',
    bg: '#D1D84E',
    color: '#2B2675',
    tags: ['Spatial', 'Identity']
  },
  {
    slug: 'bonta-gelato-outdoor-packaging-branding',
    title: 'Bontà',
    category: 'Food & beverage',
    index: '06',
    description: 'Gelato from the great outdoors. Cascade mountain contours meet melting-gelato texture on bright, activewear-style packaging.',
    image: 'https://res.cloudinary.com/f4xvzpqg/image/upload/v1795470037/drawingsboard/01-case-studies/bonta-gelato/bonta_01.jpg',
    spanClass: 's5',
    bg: '#A99BF7',
    color: '#2B2675',
    tags: ['Packaging']
  }
];

const STRIP_IMAGES = [
  'https://framerusercontent.com/images/GI9hs6gABp4QhAbVBk1Ej9TVE0.png',
  'https://res.cloudinary.com/f4xvzpqg/image/upload/v1795471086/drawingsboard/01-case-studies/forte-luxury-architecture/forte_01.png',
  'https://res.cloudinary.com/f4xvzpqg/image/upload/v1795470425/drawingsboard/01-case-studies/dabbo-madrid/dabbo_01.jpg',
  'https://res.cloudinary.com/f4xvzpqg/image/upload/v1795472292/drawingsboard/01-case-studies/orient-developers/orient_page_02.jpg',
  'https://res.cloudinary.com/f4xvzpqg/image/upload/v1795470037/drawingsboard/01-case-studies/bonta-gelato/bonta_01.jpg',
  'https://res.cloudinary.com/f4xvzpqg/image/upload/v1795471270/drawingsboard/01-case-studies/gusto-pottery/gusto_01.png',
  'https://res.cloudinary.com/f4xvzpqg/image/upload/v1795471371/drawingsboard/01-case-studies/high-life-residences/high_life_02.jpg',
  'https://framerusercontent.com/images/lDJGRw6ojn1T4R3Kty0DiGRtA.jpg'
];

const STORY_DATA = [
  {
    stage: 0,
    word: 'ASK.',
    label: '01 / Discovery',
    title: 'Understand before we design.',
    desc: 'We explore your business, audience, competitive whitespace, and core ambitions. Settling architectural clarity before visual styling begins.'
  },
  {
    stage: 1,
    word: 'DEFINE.',
    label: '02 / Strategy',
    title: 'Find the idea worth owning.',
    desc: 'We establish positioning, narrative angles, and an undeniable brand idea engineered to win commercial headspace and shelf dominance.'
  },
  {
    stage: 2,
    word: 'MAKE.',
    label: '03 / Design',
    title: 'One idea. Every touchpoint.',
    desc: 'We translate strategic clarity into custom mathematical marks, tokenized typography, production dielines, and ultra-fast digital experiences.'
  },
  {
    stage: 3,
    word: 'LAUNCH.',
    label: '04 / Delivery',
    title: 'Built for the real world.',
    desc: '100% production-ready vector assets, prepress coordination, comprehensive digital brand guidelines book, and deployment with zero junior handoffs.'
  }
];

const SERVICES_LIST = [
  {
    num: '01',
    name: 'Strategy',
    desc: 'Positioning, audience whitespace, and a sharp reason to exist, settled before any mark is drawn.',
    link: '/branding'
  },
  {
    num: '02',
    name: 'Identity',
    desc: 'Marks, color systems, tokenized type, and visual patterns built as a living system that commands the real world.',
    link: '/branding'
  },
  {
    num: '03',
    name: 'Packaging',
    desc: 'Print-ready structural dielines in the right paper stocks, foils, and tactile finishes, engineered to be picked up first.',
    link: '/packaging'
  },
  {
    num: '04',
    name: 'Web Platform',
    desc: 'Custom React, Headless Shopify, or Framer builds that carry the brand experience seamlessly from shelf to screen.',
    link: '/web-development'
  },
  {
    num: '05',
    name: 'Spatial & Interiors',
    desc: 'Your visual identity extended into physical retail stores, hospitality spaces, signage, and sales galleries.',
    link: '/spatial-branding'
  }
];

const FAQS = [
  {
    q: 'How are you different from a traditional agency?',
    a: 'You work directly with the senior design engineers who craft your brand. No account managers, no junior dilution, no bloated agency markups, and no more than two or three active clients per sprint.'
  },
  {
    q: 'How long does a brand sprint take?',
    a: 'Our core Brand-to-Shelf sprint runs 4 to 6 weeks from kickoff to production-ready files. Full Brand-to-Market engagements (with custom web engineering) span 6 to 8 weeks.'
  },
  {
    q: 'What deliverables do we get at handover?',
    a: 'Complete intellectual property ownership, mathematical master logos, color tokens, comprehensive guidelines book, print-ready dieline vector files with substrate/foil callouts, social templates, and every raw vector source file.'
  },
  {
    q: 'What is your pricing model?',
    a: 'Fixed-scope sprint pricing with 100% upfront transparency: Brand Identity starting at ₹3,50,000 / $3,650; Brand + Packaging + Web suite at ₹4,75,000 / $4,960. No hourly billing, no surprise change orders.'
  },
  {
    q: 'Can you refresh or elevate an existing brand?',
    a: 'Yes. We audit what you have, preserve what is earning its place in the market, and re-engineer what is holding you back from commanding your category.'
  },
  {
    q: 'Do you build the website and packaging under one roof?',
    a: 'Yes. Identity, structural packaging, and high-performance digital engineering are built together so the brand experience never fragments.'
  }
];

export default function NewHomePage() {
  useSEO({
    title: 'The Drawing Board — Draw first. Argue later.',
    description: 'Independent brand, packaging & web studio. We design brands people choose before they compare. Senior hands only, transparent fixed pricing.',
    canonical: 'https://drawingsboard.com/newhome'
  });

  const [wordIdx, setWordIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [storyStage, setStoryStage] = useState(0);
  const [penOffset, setPenOffset] = useState(0);
  const [activeModalCase, setActiveModalCase] = useState(null);

  // Brief Form State
  const [briefData, setBriefData] = useState({
    name: '',
    email: '',
    service: 'Brand identity',
    budget: '₹4–7 lakh',
    notes: ''
  });
  const [briefOutput, setBriefOutput] = useState('');
  const [briefStatus, setBriefStatus] = useState('');

  const storyRefs = useRef([]);

  // Word Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % WORDS.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  // Scroll Listener for progress bar & mascot parallax
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress((y / maxScroll) * 100);
      setPenOffset(Math.min(y * 0.18, 160));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Story Observer for Pinned Process
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = parseInt(e.target.getAttribute('data-index') || '0', 10);
            setStoryStage(idx);
          }
        });
      },
      { rootMargin: '-20% 0px -40% 0px' }
    );

    storyRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleBriefSubmit = (e) => {
    e.preventDefault();
    const formatted = `Project Brief — The Drawing Board\n\nName: ${briefData.name}\nEmail: ${briefData.email}\nService: ${briefData.service}\nBudget Range: ${briefData.budget}\nProject Context: ${briefData.notes}\n\nPrepared via drawingsboard.com/newhome`;
    setBriefOutput(formatted);
    setBriefStatus('Your brief is formatted below! Copy it or send it directly via WhatsApp.');
  };

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(briefOutput);
      setBriefStatus('Copied to clipboard! Send to hello@drawingsboard.com or paste into your message.');
    } catch {
      setBriefStatus('Please highlight and copy the brief manually.');
    }
  };

  const waMsg = encodeURIComponent(
    `Hi The Drawing Board team,\n\nI just prepared a project brief on your website:\n\n*Name:* ${briefData.name}\n*Service:* ${briefData.service}\n*Budget:* ${briefData.budget}\n*Context:* ${briefData.notes}`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${waMsg}`;

  return (
    <div className="newhome-root">
      {/* Top Scroll Indicator */}
      <div id="bar" style={{ transform: `scaleX(${scrollProgress / 100})` }}></div>

      {/* SVG Mascot Sprite */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <symbol id="newhome-penn" viewBox="0 0 250 340">
          <path d="M168 305Q226 306 220 252Q217 226 234 212" fill="none" stroke="#2B2675" strokeWidth="16" strokeLinecap="round" />
          <path d="M120 130C62 140 50 240 55 290Q58 316 90 316H150Q182 316 185 290C190 240 178 140 120 130Z" fill="#2B2675" />
          <ellipse cx="120" cy="232" rx="22" ry="42" fill="#FCFAEF" />
          <ellipse cx="97" cy="312" rx="19" ry="9" fill="#FCFAEF" />
          <ellipse cx="143" cy="312" rx="19" ry="9" fill="#FCFAEF" />
          <path d="M76 84L70 32L110 62ZM164 84L170 32L130 62Z" fill="#2B2675" />
          <path d="M81 75L78 46L99 62ZM159 75L162 46L141 62Z" fill="#D1D84E" />
          <ellipse cx="120" cy="102" rx="53" ry="44" fill="#2B2675" />
          <circle cx="100" cy="102" r="11" fill="#D1D84E" />
          <circle cx="140" cy="102" r="11" fill="#D1D84E" />
          <ellipse cx="100" cy="106" rx="3" ry="6" fill="#2B2675" />
          <ellipse cx="140" cy="106" rx="3" ry="6" fill="#2B2675" />
          <path d="M88 102A12 12 0 0 1 112 102ZM128 102A12 12 0 0 1 152 102Z" fill="#2B2675" />
          <path d="M114 118H126L120 125Z" fill="#FCFAEF" />
          <path d="M120 125Q114 133 107 128M120 125Q126 133 133 128M90 120L58 113M90 126L56 130M150 120L182 113M150 126L184 130" fill="none" stroke="#FCFAEF" strokeWidth="2" strokeLinecap="round" />
          <path d="M120 150L94 138V162ZM120 150L146 138V162Z" fill="#D1D84E" />
          <circle cx="120" cy="150" r="7" fill="#D1D84E" stroke="#2B2675" strokeWidth="2" />
        </symbol>
      </svg>

      {/* Header & Navigation */}
      <nav>
        <div className="wrap">
          <Link to="/" className="logo">
            <i>TDB</i>The Drawing Board
          </Link>
          <div className="links mono">
            <Link to="/work">Work</Link>
            <Link to="/services">Services</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/studio">Studio</Link>
            <Link to="/brand-readiness">Brand Readiness</Link>
          </div>
          <div className="nav-actions">
            <Link to="/brand-readiness" className="btn">
              Let’s talk ↗
            </Link>
            <button
              className="menu-btn"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? 'Close −' : 'Menu +'}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-links mono">
            <Link to="/work" onClick={() => setMenuOpen(false)}>Work</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
            <Link to="/studio" onClick={() => setMenuOpen(false)}>Studio</Link>
            <Link to="/brand-readiness" onClick={() => setMenuOpen(false)}>Brand Readiness</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="wrap">
          {/* Rotating Stamp from Immersive V17 */}
          <div className="stamp" aria-hidden="true">
            THINK.<br />MAKE.<br />MATTER. ✳
          </div>

          {/* Kern Mascot Badge from Home V17 */}
          <div className="pen" style={{ transform: `translateY(${penOffset}px)` }} aria-hidden="true">
            <span className="bub">Kern. I sign off on every letter-space.</span>
            <svg viewBox="0 0 250 340">
              <use href="#newhome-penn" />
            </svg>
          </div>

          <p className="mono hero-eyebrow">
            Independent brand, packaging &amp; web studio · India → everywhere
          </p>

          <h1 className="d">
            Draw first.
            <span className="l2">
              <span className="hl">Argue</span> <span className="blue">later.</span>
            </span>
          </h1>

          <div className="hero-stickers">
            <span>Independent studio</span>
            <span>Strategy &amp; design</span>
            <span>Made to matter</span>
          </div>

          <div className="row">
            <p>
              We design <span id="w">{WORDS[wordIdx]}</span> people choose before they compare.
              Identity, packaging and web from one senior team, one system, one transparent investment.
            </p>
            <div className="hero-ctas">
              <Link className="btn" to="/brand-readiness">
                Get a quote ↗
              </Link>
              <Link className="btn y" to="/pricing">
                Explore our pricing ↓
              </Link>
              <a className="btn outline" href="#work">
                See the work
              </a>
            </div>
          </div>

          {/* Orbital Hero Art from Immersive V17 */}
          <div className="hero-art">
            <p>
              Good thinking.<br />
              Distinctive design.<br />
              <b style={{ color: 'var(--ink)' }}>Real-world impact.</b>
            </p>
            <svg aria-label="Original abstract drawing of ideas coming together" role="img" viewBox="0 0 320 180">
              <g fill="none" stroke="#2B2675" strokeWidth="2">
                <circle cx="160" cy="90" r="65"></circle>
                <g className="orbit">
                  <ellipse cx="160" cy="90" rx="125" ry="40"></ellipse>
                  <ellipse cx="160" cy="90" rx="125" ry="40" transform="rotate(60 160 90)"></ellipse>
                  <ellipse cx="160" cy="90" rx="125" ry="40" transform="rotate(120 160 90)"></ellipse>
                  <circle cx="285" cy="90" fill="#D1D84E" r="9"></circle>
                </g>
              </g>
              <path d="M160 55v70M125 90h70M135 65l50 50M185 65l-50 50" stroke="#2B2675" strokeLinecap="round" strokeWidth="10"></path>
            </svg>
          </div>
        </div>
      </header>

      {/* Marquee Banner */}
      <div className="mq" aria-hidden="true">
        <div>
          STRATEGY FIRST <b>✺</b> DIELINES NEVER LIE <b>✺</b> SHELF TO SCREEN <b>✺</b> SENIOR HANDS ONLY <b>✺</b> NO ACCOUNT MANAGERS <b>✺</b> BUILT TO BE CHOSEN <b>✺</b> FIXED SCOPE TRANSPARENCY <b>✺</b> STRATEGY FIRST <b>✺</b> DIELINES NEVER LIE <b>✺</b> SHELF TO SCREEN <b>✺</b> SENIOR HANDS ONLY <b>✺</b>&nbsp;
        </div>
      </div>

      {/* Infinite Work Image Strip */}
      <div className="stripw" aria-hidden="true">
        <div className="strip">
          {[...STRIP_IMAGES, ...STRIP_IMAGES].map((src, i) => (
            <img key={i} src={src} alt="Studio work preview" loading="lazy" />
          ))}
        </div>
      </div>

      {/* Manifesto Section */}
      <section className="man">
        <div className="wrap">
          <span className="mono">/ Manifesto</span>
          <p>
            Most brands look fine and say nothing. We build the ones <em>people remember,</em> from the idea to the dieline to the website, with the same senior hands on every pixel.
          </p>
        </div>
      </section>

      {/* Selected Work Bento Grid */}
      <section id="work">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="mono">01 / Selected work</span>
              <h2 className="d">Brands we’ve<br />built</h2>
            </div>
            <Link className="btn y" to="/work">
              All projects ↗
            </Link>
          </div>

          <div className="grid">
            {CASE_STUDIES.map((c) => (
              <div
                key={c.slug}
                className={`c ${c.spanClass}`}
                style={{ '--b': c.bg, '--t': c.color }}
              >
                <div className="c-top mono">
                  <span>{c.category}</span>
                  <span>{c.index}</span>
                </div>
                <div className="im" onClick={() => setActiveModalCase(c)}>
                  <img loading="lazy" src={c.image} alt={`${c.title} case study`} />
                  <span className="im-hint mono">Click for Quick Preview ↗</span>
                </div>
                <div className="c-info">
                  <div className="c-head">
                    <Link to={`/work/${c.slug}`}>
                      <h3>{c.title}</h3>
                    </Link>
                    <button
                      type="button"
                      className="quick-view-btn mono"
                      onClick={() => setActiveModalCase(c)}
                    >
                      Quick View ↗
                    </button>
                  </div>
                  <p>{c.description}</p>
                  <div className="tg">
                    {c.tags.map((t) => (
                      <b key={t}>{t}</b>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Process / Scroll-Story Section (From Immersive V17) */}
      <section className="scroll-story" id="process">
        <div className="wrap">
          <small className="mono">02 / How we work</small>
          <h2 className="d">Good brands<br />aren’t accidents.</h2>

          <div className="story-grid">
            <div className={`story-pin stage-${storyStage}`}>
              <strong>{STORY_DATA[storyStage].word}</strong>
              <small className="mono">{STORY_DATA[storyStage].label}</small>
            </div>

            <div className="story-chapters">
              {STORY_DATA.map((ch, idx) => (
                <article
                  key={ch.label}
                  data-index={idx}
                  className={`story-chapter ${storyStage === idx ? 'active' : ''}`}
                  ref={(el) => (storyRefs.current[idx] = el)}
                >
                  <small className="mono">{ch.label}</small>
                  <h3>{ch.title}</h3>
                  <p>{ch.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities / What We Make */}
      <section className="svc-section" id="services">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="mono">03 / Capabilities</span>
              <h2 className="d">What we<br /><span className="blue">make</span></h2>
            </div>
            <Link className="btn y" to="/services">
              Full Services Guide ↗
            </Link>
          </div>

          <div className="svc">
            {SERVICES_LIST.map((srv) => (
              <Link key={srv.num} to={srv.link}>
                <span className="mono">{srv.num}</span>
                <h3>{srv.name}</h3>
                <p>{srv.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Typographic Studio Section (From Immersive V17) */}
      <section className="studio-section" id="studio">
        <div className="wrap studio-grid">
          <div className="studio-art" aria-label="Typographic studio artwork">
            <strong>DRAW.<br /><span>THINK.</span><br />MAKE.</strong>
          </div>
          <div className="studio-text">
            <small className="mono">04 / The Studio</small>
            <h2 className="d">Few clients.<br />Full attention.</h2>
            <p>
              We are an independent, senior-led design studio. We bring strategy, identity, structural packaging, and bespoke digital platforms together, with creative direction directly involved in every phase.
            </p>
            <p>
              Built specifically for founders launching ambitious brands, or scaling businesses ready to establish an unassailable category position.
            </p>
            <Link to="/brand-readiness" className="btn y">
              Meet us through your project ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props / Fine Print Upfront (From Home V17) */}
      <section className="yel">
        <div className="wrap">
          <h2 className="d" style={{ fontSize: 'clamp(44px, 9vw, 130px)' }}>
            The fine print,<br />upfront
          </h2>
          <div className="rg">
            <div>
              <b>2–3</b>
              <h3>Clients per sprint</h3>
              <p>Every brand gets dedicated senior engineering.</p>
            </div>
            <div>
              <b>0</b>
              <h3>Account managers</h3>
              <p>You work directly with the team that designs.</p>
            </div>
            <div>
              <b>100%</b>
              <h3>Yours to keep</h3>
              <p>Full IP and complete production vector source files.</p>
            </div>
            <div>
              <b>Fixed</b>
              <h3>Scope &amp; price</h3>
              <p>Agreed upfront on day one. No retainer creep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & Brief Builder */}
      <section className="faq-section" id="contact">
        <div className="wrap faq-grid">
          <div>
            <h2 className="d" style={{ fontSize: 'clamp(44px, 7vw, 100px)' }}>
              Questions<br />founders ask
            </h2>
            <div className="faq-list">
              {FAQS.map((f, i) => (
                <details key={i}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="brief-card">
            <span className="mono">/ Instant Project Brief</span>
            <h3>Tell us what you're building.</h3>
            <p>Draft your requirements to generate an architectural brief ready to send.</p>

            <form onSubmit={handleBriefSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Sharma"
                  value={briefData.name}
                  onChange={(e) => setBriefData({ ...briefData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. maya@brand.com"
                  value={briefData.email}
                  onChange={(e) => setBriefData({ ...briefData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Primary Service</label>
                <select
                  value={briefData.service}
                  onChange={(e) => setBriefData({ ...briefData, service: e.target.value })}
                >
                  <option value="Brand identity">Brand Strategy &amp; Identity</option>
                  <option value="Packaging design">Structural Packaging Design</option>
                  <option value="Web development">High-Code Web Development</option>
                  <option value="Brand-to-Market Suite">Brand-to-Market (Brand + Packaging + Web)</option>
                  <option value="SaaS branding">SaaS Branding &amp; UI/UX</option>
                  <option value="Spatial branding">Spatial &amp; Retail Environments</option>
                </select>
              </div>

              <div className="form-group">
                <label>Target Investment Range</label>
                <select
                  value={briefData.budget}
                  onChange={(e) => setBriefData({ ...briefData, budget: e.target.value })}
                >
                  <option value="₹2–4 lakh">₹2–4 lakh</option>
                  <option value="₹4–7 lakh">₹4–7 lakh</option>
                  <option value="₹7–10 lakh">₹7–10 lakh</option>
                  <option value="₹10 lakh+">₹10 lakh+</option>
                  <option value="International / USD">International / Custom Quote</option>
                </select>
              </div>

              <div className="form-group">
                <label>Project Context</label>
                <textarea
                  rows="3"
                  required
                  placeholder="What is your brand building, and what does success look like?"
                  value={briefData.notes}
                  onChange={(e) => setBriefData({ ...briefData, notes: e.target.value })}
                />
              </div>

              <button type="submit" className="btn full">
                Prepare Brief ↗
              </button>
            </form>

            {briefStatus && <p className="brief-status mono">{briefStatus}</p>}

            {briefOutput && (
              <div className="brief-output">
                <textarea readOnly value={briefOutput} rows="5" />
                <div className="brief-actions">
                  <button type="button" className="btn y" onClick={handleCopyBrief}>
                    Copy to Clipboard
                  </button>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    Send via WhatsApp ↗
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position: 'relative' }}>
        <svg className="pen2" viewBox="0 0 250 340" aria-hidden="true">
          <use href="#newhome-penn" />
        </svg>
        <div className="wrap">
          <p className="mono">/ Founders, start here</p>
          <h2 className="d" style={{ marginTop: '14px' }}>
            Your shelf<br />is <span>waiting.</span>
          </h2>
          <div style={{ marginTop: '28px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link className="btn" to="/brand-readiness">
              Start a project ↗
            </Link>
            <Link className="btn y" to="/pricing">
              View Pricing Guide ↗
            </Link>
          </div>
          <div className="bar mono">
            <span>© 2026 The Drawing Board Studio</span>
            <span>
              <a href="https://linkedin.com/company/thedrawingboard" target="_blank" rel="noreferrer">LinkedIn</a> ·{' '}
              <a href="https://twitter.com/thedrawingboard" target="_blank" rel="noreferrer">X</a> ·{' '}
              <a href="mailto:hello@drawingsboard.com">Email</a>
            </span>
            <span>Designed by people, proofed by Kern</span>
          </div>
        </div>
      </footer>

      {/* Quick View Case Modal */}
      {activeModalCase && (
        <div className="case-modal-backdrop" onClick={() => setActiveModalCase(null)}>
          <div className="case-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="case-modal-close"
              aria-label="Close modal"
              onClick={() => setActiveModalCase(null)}
            >
              Close ×
            </button>
            <span className="mono">{activeModalCase.category} // {activeModalCase.index}</span>
            <h2>{activeModalCase.title}</h2>
            <div className="case-modal-img">
              <img src={activeModalCase.image} alt={activeModalCase.title} />
            </div>
            <p>{activeModalCase.description}</p>
            <div className="case-modal-actions">
              <Link
                to={`/work/${activeModalCase.slug}`}
                className="btn"
                onClick={() => setActiveModalCase(null)}
              >
                Read Full Case Study ↗
              </Link>
              <Link
                to="/brand-readiness"
                className="btn y"
                onClick={() => setActiveModalCase(null)}
              >
                Discuss a Similar Project ↗
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
