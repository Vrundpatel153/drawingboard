import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { WHATSAPP_NUMBER } from '../utils/siteConfig';
import './PricingPage.css';

const SERVICES_DATA = [
  {
    name: 'Brand Identity',
    eyebrow: '01 // Brand Identity & Strategy',
    priceINR: '₹3,50,000',
    priceUSD: '$3,650',
    headline: 'Be chosen. Not compared.',
    description: 'A distinctive brand built on strategic clarity, not decoration. Complete market positioning, mathematical marks, typography hierarchy, and brand guidelines.',
    duration: '4–6 weeks sprint',
    scope: 'One comprehensive brand identity system; positioning, master logomarks, typography, color tokens, and vector file handover.',
    chapters: [
      ['Discovery & strategy', 'Founder workshop & vision alignment', 'Market & competitor whitespace research', 'Audience definition & customer profiling', 'Positioning & brand narrative framework'],
      ['Visual identity', 'Primary & secondary mathematical logomarks', 'Monogram, wordmark & responsive lockups', 'Typography scale & art direction', 'Color system, token ratios & accessibility guidelines'],
      ['Brand handover', 'Comprehensive digital brand guidelines (PDF/Web)', 'Stationery, packaging direction & social visual system', '100% vector production source files (AI, SVG, PDF, EPS)']
    ]
  },
  {
    name: 'Brand + Packaging + Web',
    eyebrow: '02 // Brand-to-Market Suite',
    priceINR: '₹4,75,000',
    priceUSD: '$4,960',
    headline: 'One connected brand experience from shelf to screen.',
    description: 'Our flagship end-to-end sprint: complete brand strategy and identity, master packaging system with up to 5 SKU adaptations, and a custom high-performance digital web experience.',
    duration: '6–8 weeks sprint',
    scope: 'Complete brand architecture, master packaging with up to 5 SKU adaptations, and custom responsive web platform design & development.',
    chapters: [
      ['Strategy & identity', 'Full market positioning & competitive audit', 'Primary, secondary & monogram marks', 'Typographic system & brand guidelines book'],
      ['Structural packaging', 'Master packaging concept & shelf hierarchy', 'Up to 5 SKU adaptations on approved dielines', 'Print-ready vector artwork & finish specs', 'Manufacturer prepress coordination'],
      ['Digital web platform', 'Custom responsive UI/UX architecture', 'Headless Shopify or React/Next.js frontend build', 'Sub-second speed optimization & technical SEO', 'Deployment, domain configuration & handover']
    ]
  },
  {
    name: 'Packaging Design',
    eyebrow: '03 // Structural Packaging & Print',
    priceINR: '₹3,75,000',
    priceUSD: '$3,920',
    headline: 'Make the shelf yours.',
    description: 'Packaging engineered to command retail shelves and unboxing moments. Making your product recognisable, desirable, and easy to navigate.',
    duration: '4–6 weeks sprint',
    scope: 'One master packaging system; structural concept, up to 5 SKU adaptations, and print-ready production files.',
    chapters: [
      ['Packaging strategy', 'Category & retail shelf whitespace analysis', 'Competitor packaging audit', 'Information hierarchy & compliance mapping'],
      ['Design & prototyping', 'Primary packaging design direction', 'Secondary packaging & unboxing sleeve design', 'Variant system & flavor/shade differentiation', '3D photorealistic studio product renders'],
      ['Production handover', '100% print-ready vector dieline artwork', 'Substrate, foil, embossing & finish specifications', 'Direct manufacturer printer handover coordination']
    ]
  },
  {
    name: 'Web Development',
    eyebrow: '04 // Frontend & High-Code',
    priceINR: '₹1,15,000',
    priceUSD: '$1,250',
    headline: 'Beyond the screenshot.',
    description: 'A custom digital experience engineered for sub-second speeds, flawless responsiveness, and high conversion without template bloat.',
    duration: '4–6 weeks sprint',
    scope: 'Custom responsive frontend; page count, CMS / Shopify integration, and technical scope agreed in proposal.',
    chapters: [
      ['Digital strategy', 'Information architecture & sitemap', 'Wireframing & user journey mapping', 'Conversion architecture & UX design'],
      ['Design & engineering', 'Bespoke responsive UI/UX across all breakpoints', 'Headless Shopify, React/Vite, or Framer build', 'Interactive motion & micro-interactions'],
      ['Launch & optimization', 'Sub-second Core Web Vitals optimization', 'Technical SEO, OpenGraph & JSON-LD schemas', 'Analytics (GA4, GTM) & deployment']
    ]
  },
  {
    name: 'SaaS Branding',
    eyebrow: '05 // SaaS Branding & UI/UX',
    priceINR: '₹4,75,000',
    priceUSD: '$4,960',
    headline: 'One brand. One product.',
    description: 'System-grade visual identity and tokenized Figma component libraries for B2B software, fintech, and venture-backed SaaS platforms.',
    duration: '6–8 weeks sprint',
    scope: 'Core brand identity, master design tokens, marketing site foundation, and key product workflow surfaces.',
    chapters: [
      ['Brand foundation', 'Product discovery & positioning audit', 'Software category whitespace definition', 'Visual identity & brand tokens'],
      ['Product experience', 'User journeys & multi-device interface flows', 'Priority interface screens & dashboards', 'Tokenized Figma design system & components'],
      ['Developer handover', 'Component state documentation & specs', 'CSS/JSON variable export & tokens', 'Interactive prototype for engineering handoff']
    ]
  },
  {
    name: 'App Design & Development',
    eyebrow: '06 // Mobile & Digital Products',
    priceINR: 'Custom quote',
    priceUSD: 'Custom quote',
    headline: 'Make complexity simple.',
    description: 'Intuitive digital products and native mobile applications engineered around verified user journeys and commercial performance.',
    duration: 'Scope dependent',
    scope: 'Engineering tech stack, iOS/Android platforms, and screen counts quoted following discovery audit.',
    chapters: [
      ['Product discovery', 'Technical feasibility & requirements audit', 'User personas & flow architecture', 'Information architecture & wireframes'],
      ['Interface engineering', 'High-fidelity UI systems for iOS & Android', 'Interactive mobile prototype', 'Design tokens & motion specifications'],
      ['Development scope', 'Component specifications & API integrations', 'Agreed engineering and cross-device testing requirements']
    ]
  },
  {
    name: 'Spatial Branding',
    eyebrow: '07 // Environments & Spaces',
    priceINR: 'Custom quote',
    priceUSD: 'Custom quote',
    headline: 'Brands you can step into.',
    description: 'Translating brand identity into physical rooms, environmental graphics, material palettes, and connected commercial experiences.',
    duration: 'Scope dependent',
    scope: 'Commercial space planning, architectural graphic direction, and vendor coordination; construction costs separate.',
    chapters: [
      ['Spatial brand strategy', 'Site audit & customer journey mapping', 'Spatial brand principles & zoning', 'Concept moodboards & narrative'],
      ['Interior & environmental design', 'Architectural space planning & circulation', 'Material palette, textures & lighting direction', '3D photorealistic architectural renders', 'Signage, wayfinding & environmental graphics'],
      ['Execution coordination', 'Detailed graphic specifications & dielines', 'Vendor & contractor collaboration guidelines', 'Implementation quality reviews']
    ]
  },
  {
    name: 'Performance Marketing',
    eyebrow: '08 // Growth Partnerships',
    priceINR: '₹45,000–55,000 / mo or 15%',
    priceUSD: '$550–$680 / mo or 15%',
    headline: 'You grow. We grow.',
    description: 'Two performance growth models engineered around total monthly brand revenue, aligning our incentives directly with your scale.',
    duration: 'Monthly engagement',
    scope: 'Meta Ads management, creative testing, CRO, and analytics. Media spend separate; revenue reporting agreed in advance.',
    chapters: [
      ['Campaign strategy', 'Audience segmentation & competitor research', 'Funnel planning & ad angle strategy', 'Creative direction & offer engineering'],
      ['Growth management', 'Full-funnel Meta Ads campaign execution', 'Continuous creative A/B testing', 'Landing page conversion rate optimization'],
      ['Reporting & iteration', 'Weekly performance tracking & attribution', 'Monthly executive growth review', 'Strategic scaling recommendations']
    ]
  }
];

const BUDGET_OPTIONS = {
  INR: [
    'Below ₹3,50,000',
    '₹3,50,000 – ₹4,00,000',
    '₹4,50,000 – ₹5,75,000',
    '₹5,75,000 – ₹6,00,000',
    '₹6,00,000+',
    'I need guidance / Custom scope'
  ],
  USD: [
    'Below $3,650',
    '$3,650 – $4,200',
    '$4,700 – $6,000',
    '$6,00,000 – $6,300',
    '$6,300+',
    'I need guidance / Custom scope'
  ]
};

export default function PricingPage() {
  useSEO({
    title: 'Pricing & Investment Guide — The Drawing Board',
    description: 'Transparent, fixed-scope sprint pricing for brand identity, packaging design, high-code web development, and SaaS design systems. No hidden fees or retainer creep.',
    canonical: 'https://drawingsboard.com/pricing'
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const [currency, setCurrency] = useState('INR');
  const [pinnedStep, setPinnedStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    brief: '',
    agreed: false
  });
  const [formOutput, setFormOutput] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  const activeService = SERVICES_DATA[activeIdx];
  const activePrice = currency === 'INR' ? activeService.priceINR : activeService.priceUSD;

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(100, Math.max(0, (scrolled / maxScroll) * 100)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for chapters
  const chaptersRef = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const stepIndex = parseInt(e.target.getAttribute('data-step') || '0', 10);
          setPinnedStep(stepIndex);
        }
      });
    }, { rootMargin: '-25% 0px -40% 0px' });

    chaptersRef.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeIdx]);

  const handleSelectService = (index) => {
    setActiveIdx(index);
    setPinnedStep(0);
    const investmentSec = document.getElementById('investment');
    if (investmentSec) {
      investmentSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const briefText = `Project enquiry — The Drawing Board\n\nName: ${formData.name}\nEmail: ${formData.email}\nSelected Service: ${activeService.name} (${activePrice})\nProject Budget: ${formData.budget}\nBrief: ${formData.brief}\n\nGenerated via drawingsboard.com/pricing`;
    
    setFormOutput(briefText);
    setShowOutput(true);
    setFormStatus('Your brief is ready below. You can copy it or send it directly via WhatsApp.');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formOutput);
      setFormStatus('Copied to clipboard! You can paste this in an email to hello@drawingsboard.com');
    } catch {
      setFormStatus('Please select and copy the text manually.');
    }
  };

  const stepTitles = ['Think first.', 'Make it distinct.', 'Make it yours.'];

  const waMsg = encodeURIComponent(
    `Hi The Drawing Board team,\n\nI just prepared a project brief on your pricing page:\n\n*Name:* ${formData.name}\n*Service:* ${activeService.name} (${activePrice})\n*Budget:* ${formData.budget}\n*Brief:* ${formData.brief}`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${waMsg}`;

  return (
    <div className="pricing-page-root">
      {/* Sticky Header */}
      <header>
        <div className="wrap nav">
          <Link to="/" className="logo">THE DRAWING BOARD.</Link>
          <div className="nav-actions">
            <div className="currency-toggle" role="group" aria-label="Currency selector">
              <button
                type="button"
                className={currency === 'INR' ? 'active' : ''}
                onClick={() => setCurrency('INR')}
              >
                INR ₹
              </button>
              <button
                type="button"
                className={currency === 'USD' ? 'active' : ''}
                onClick={() => setCurrency('USD')}
              >
                USD $
              </button>
            </div>
            <button
              className="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Menu
            </button>
          </div>
          <nav className={`navlinks ${menuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/work" onClick={() => setMenuOpen(false)}>Work</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
            <Link to="/brand-readiness" onClick={() => setMenuOpen(false)}>Brand Readiness</Link>
            <a
              href="#enquire"
              className="pill"
              onClick={() => setMenuOpen(false)}
            >
              Start a project ↗
            </a>
          </nav>
        </div>
        <div className="progress" style={{ width: `${scrollProgress}%` }}></div>
      </header>

      <main>
        {/* Hero Section (V17 Left-aligned) */}
        <section className="hero">
          <div className="wrap">
            <div className="mono">Independent strategy &amp; design studio / Investment guide</div>
            <h1>
              <span>GOOD DESIGN.</span>
              <span>CLEAR</span>
              <span>INVESTMENT.</span>
            </h1>
            <p>Thoughtfully considered engagements. Clearly defined deliverables. Good thinking included.</p>
            <a className="pill" href="#pricing">Explore our pricing ↓</a>

            {/* V17 Spirograph Hero Art */}
            <svg aria-hidden="true" className="art" viewBox="0 0 320 145">
              <g fill="none" stroke="#2B2675" strokeWidth="1.5">
                <ellipse cx="160" cy="72" rx="115" ry="32" transform="rotate(0.0 160 72)"></ellipse>
                <ellipse cx="160" cy="72" rx="115" ry="32" transform="rotate(22.5 160 72)"></ellipse>
                <ellipse cx="160" cy="72" rx="115" ry="32" transform="rotate(45.0 160 72)"></ellipse>
                <ellipse cx="160" cy="72" rx="115" ry="32" transform="rotate(67.5 160 72)"></ellipse>
                <ellipse cx="160" cy="72" rx="115" ry="32" transform="rotate(90.0 160 72)"></ellipse>
                <ellipse cx="160" cy="72" rx="115" ry="32" transform="rotate(112.5 160 72)"></ellipse>
                <ellipse cx="160" cy="72" rx="115" ry="32" transform="rotate(135.0 160 72)"></ellipse>
                <ellipse cx="160" cy="72" rx="115" ry="32" transform="rotate(157.5 160 72)"></ellipse>
              </g>
              <circle cx="160" cy="72" fill="#D1D84E" r="34" stroke="#2B2675"></circle>
              <text fill="#2B2675" fontSize="44" fontWeight="800" textAnchor="middle" x="160" y="87">
                {currency === 'INR' ? '₹' : '$'}
              </text>
            </svg>
          </div>
        </section>

        {/* Marquee Banner */}
        <div className="marquee">
          <div>
            GOOD THINKING INCLUDED • NO GUESSWORK • BUILT TO BE CHOSEN • FIXED SCOPE TRANSPARENCY • GOOD THINKING INCLUDED • NO GUESSWORK • BUILT TO BE CHOSEN • FIXED SCOPE TRANSPARENCY •&nbsp;
          </div>
        </div>

        {/* Sticky Services Tabs */}
        <div id="pricing" style={{ scrollMarginTop: '68px' }}></div>
        <nav aria-label="Services" className="tabs" role="tablist">
          {SERVICES_DATA.map((srv, idx) => (
            <button
              key={srv.name}
              type="button"
              role="tab"
              aria-selected={activeIdx === idx}
              tabIndex={activeIdx === idx ? 0 : -1}
              onClick={() => handleSelectService(idx)}
            >
              {srv.name}
            </button>
          ))}
        </nav>

        {/* Dynamic Investment Section */}
        <section className="section" id="investment">
          <div className="wrap split">
            <div>
              <div className="mono">{activeService.eyebrow}</div>
              <h2>{activeService.headline}</h2>
              <p className="intro">{activeService.description}</p>
            </div>
            <div className="pricebox">
              <div className="mono">
                {activeIdx === 7 ? `Growth partnerships / ${currency}` : `Starting investment / ${currency}`}
              </div>

              {activeIdx !== 7 ? (
                <>
                  <div className="price">{activePrice}</div>
                  <div className="duration">{activeService.duration}</div>
                  <p className="rule">{activeService.scope}</p>
                </>
              ) : (
                <div style={{ margin: '20px 0', display: 'grid', gap: '12px' }}>
                  {currency === 'INR' ? (
                    <>
                      <article className="growth-card">
                        <small>01 / EMERGING BRANDS</small>
                        <div className="amount">₹45,000–55,000</div>
                        <p className="unit">Monthly retainer</p>
                        <p>For brands generating up to ₹4 lakh in monthly revenue.</p>
                      </article>
                      <article className="growth-card">
                        <small>02 / SCALING BRANDS</small>
                        <div className="amount">15%</div>
                        <p className="unit">Of total monthly revenue</p>
                        <p>For brands generating above ₹4 lakh and up to ₹50 lakh per month.</p>
                      </article>
                      <p className="growth-note">
                        Media spend is separate. Revenue above ₹50 lakh is quoted individually. Revenue definition and reporting are agreed before commencement.
                      </p>
                    </>
                  ) : (
                    <>
                      <article className="growth-card">
                        <small>01 / EMERGING BRANDS</small>
                        <div className="amount">$550–$680</div>
                        <p className="unit">Monthly retainer</p>
                        <p>For brands generating up to $4,800 in monthly revenue.</p>
                      </article>
                      <article className="growth-card">
                        <small>02 / SCALING BRANDS</small>
                        <div className="amount">15%</div>
                        <p className="unit">Of total monthly revenue</p>
                        <p>For brands generating above $4,800 and up to $60,000 per month.</p>
                      </article>
                      <p className="growth-note">
                        Media spend is separate. Revenue above $60,000 is quoted individually. Revenue definition and reporting are agreed before commencement.
                      </p>
                    </>
                  )}
                </div>
              )}

              <a className="pill" href="#enquire">Discuss this project ↗</a>
            </div>
          </div>
        </section>

        {/* 01 Deliverables Section (V17 Deep Blue Full-bleed #deliverables-v17) */}
        <section className="section blush" id="deliverables-v17">
          <div className="wrap">
            <div className="mono">01 / The deliverables</div>
            <h2>What goes<br />into it.</h2>
            <div className="process">
              <aside className="pin">
                <div className="mono">
                  {`0${pinnedStep + 1} / ${activeService.chapters[pinnedStep] ? activeService.chapters[pinnedStep][0] : ''}`}
                </div>
                <h3 id="stepTitle">{stepTitles[pinnedStep] || activeService.chapters[pinnedStep]?.[0]}</h3>
                <svg aria-hidden="true" viewBox="0 0 250 140">
                  <g fill="none" stroke="#A99BF7" strokeWidth="2.5">
                    <circle cx="125" cy="70" r="48"></circle>
                    <ellipse cx="125" cy="70" rx="110" ry="25"></ellipse>
                    <ellipse cx="125" cy="70" rx="110" ry="25" transform="rotate(55 125 70)"></ellipse>
                    <ellipse cx="125" cy="70" rx="110" ry="25" transform="rotate(-55 125 70)"></ellipse>
                  </g>
                </svg>
              </aside>

              <div>
                {activeService.chapters.map((group, j) => (
                  <article
                    key={group[0]}
                    className="chapter"
                    data-step={j}
                    ref={(el) => (chaptersRef.current[j] = el)}
                  >
                    <div className="mono">0{j + 1} / DELIVERABLES</div>
                    <h3>{group[0]}</h3>
                    <ul>
                      {group.slice(1).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02 Commercial Details */}
        <section className="section">
          <div className="wrap">
            <div className="mono">02 / The commercial details</div>
            <h2>Nothing left<br />to guess.</h2>
            <div className="terms">
              <article>
                <h3>50 / 50.</h3>
                <p>Proposed project payment structure: 50% to begin, 50% before final production-ready handover. Retainers and growth partnerships are billed on a monthly cycle.</p>
              </article>
              <article>
                <h3>Clear scope.</h3>
                <p>Deliverable quantities, review milestones, and delivery sprint schedules are agreed in writing before commencement. No retainer creep or surprise hourly billing.</p>
              </article>
              <article>
                <h3>Yours to own.</h3>
                <p>You receive 100% intellectual property ownership and full vector AI, SVG, EPS, and PDF source files upon project completion and final payment.</p>
              </article>
              <article>
                <h3>No hidden extras.</h3>
                <p>Taxes if applicable, third-party printing, packaging fabrication, domain hosting, font licences, and ad spend are separate unless expressly scoped.</p>
              </article>
            </div>
          </div>
        </section>

        {/* 03 Good Questions FAQ */}
        <section className="section faq">
          <div className="wrap">
            <div className="mono">03 / Good questions</div>
            <h2>Before we begin.</h2>
            <details>
              <summary>Is the starting price the final price?</summary>
              <p>It is the transparent starting investment for the agreed base engagement sprint. Additional deliverables, extra SKU adaptations, or complex features are clearly quoted before work begins.</p>
            </details>
            <details>
              <summary>Can I combine services into a connected sprint?</summary>
              <p>Yes. Our flagship <b>Brand-to-Market Suite (₹4,75,000 / $4,960)</b> unifies strategic brand identity, master packaging with SKU adaptations, and custom responsive web design &amp; development into one cohesive engagement.</p>
            </details>
            <details>
              <summary>How many revisions and concepts are included?</summary>
              <p>Each sprint includes structured collaborative milestones. We explore distinct creative routes in Phase 1, followed by refined development rounds and final artwork polish. All review rounds are specified in your proposal.</p>
            </details>
            <details>
              <summary>Do you work with international clients?</summary>
              <p>Yes. Over 40% of our clients operate across the US, UK, UAE, Europe, and Australia. We work smoothly across timezones with tailored proposals in USD, GBP, or EUR and clear digital review cadences.</p>
            </details>
            <details>
              <summary>When can we start?</summary>
              <p>To maintain senior creative leadership and rigorous quality, we limit intake to 2–3 active client sprints per cycle. We confirm availability and project timelines during our initial discovery call.</p>
            </details>
          </div>
        </section>

        {/* 04 Enquiry Form */}
        <section className="section" id="enquire">
          <div className="wrap split">
            <div>
              <div className="mono">04 / Let's get to work</div>
              <h2>Worth<br />choosing.</h2>
              <p className="intro">Tell us what you're building. We'll review your project details and discuss the right scope, investment, and schedule within 24 hours.</p>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="formgrid">
                <label>
                  Name
                  <input
                    name="name"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    placeholder="you@brand.com"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </label>
                <label className="full">
                  Service
                  <select
                    value={activeService.name}
                    onChange={(e) => {
                      const idx = SERVICES_DATA.findIndex((s) => s.name === e.target.value);
                      if (idx !== -1) setActiveIdx(idx);
                    }}
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="full">
                  Project budget
                  <select
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="">Select your budget</option>
                    {BUDGET_OPTIONS[currency].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="full">
                  Tell us about your project
                  <textarea
                    name="brief"
                    placeholder="What are you building? Share your timeline, current stage, and objectives."
                    required
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  ></textarea>
                </label>
                <label className="full checkbox-label">
                  <input
                    required
                    type="checkbox"
                    checked={formData.agreed}
                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                  />
                  I understand the selected service's starting investment and sprint scope.
                </label>
                <button className="pill full" type="submit">
                  Prepare my enquiry ↗
                </button>
              </div>

              {formStatus && (
                <p className="form-status" role="status">
                  {formStatus}
                </p>
              )}

              {showOutput && (
                <div className="form-output-box">
                  <textarea
                    aria-label="Prepared enquiry"
                    readOnly
                    value={formOutput}
                  ></textarea>
                  <div className="output-actions">
                    <button
                      className="pill"
                      type="button"
                      style={{ padding: '10px 20px', fontSize: '13px' }}
                      onClick={handleCopy}
                    >
                      Copy enquiry brief
                    </button>
                    <a
                      className="pill"
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '10px 20px',
                        fontSize: '13px',
                        background: '#25D366',
                        borderColor: '#25D366',
                        color: 'white'
                      }}
                    >
                      Send via WhatsApp ↗
                    </a>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="wrap footer-content">
          <span className="logo">THE DRAWING BOARD.</span>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/work">Work</Link>
            <Link to="/services">Services</Link>
            <Link to="/brand-readiness">Brand Readiness</Link>
            <a href="#">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
