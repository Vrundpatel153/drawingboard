import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import './PricingPage.css';

const SERVICES_DATA = [
  {
    name: 'Brand Identity',
    eyebrow: '01 // Brand Identity & Strategy',
    priceINR: '₹3,50,000',
    priceUSD: '$3,650',
    headline: 'Be chosen. Not compared.',
    description: 'A distinctive brand built on strategic clarity, not decoration. Full positioning, visual identity system, master packaging direction, and brand guidelines.',
    duration: '4–6 weeks sprint',
    scope: 'One comprehensive brand identity system; applications, master packaging direction, and quantities agreed in the proposal.',
    chapters: [
      {
        title: 'Discovery & strategy',
        items: [
          'Founder workshop & brand discovery questionnaire',
          'Market positioning & competitive whitespace audit',
          'Audience definition & customer journey mapping',
          'Core brand narrative & verbal messaging framework'
        ]
      },
      {
        title: 'Visual identity',
        items: [
          'Primary, secondary & monogram logo architecture',
          'Typographic scale & font pairing curation',
          'Color system, ratios & contrast tokens',
          'Graphic language, patterns & art direction',
          'Agreed collateral & brand application concepts'
        ]
      },
      {
        title: 'Brand handover',
        items: [
          'Comprehensive digital brand guidelines (PDF & Web)',
          'Stationery, presentation & social launch direction',
          '100% production-ready vector assets (AI, SVG, EPS, PNG)',
          'Complete intellectual property & copyright ownership'
        ]
      }
    ]
  },
  {
    name: 'Brand + Packaging + Web',
    eyebrow: '02 // Brand-to-Market Suite',
    priceINR: '₹4,75,000',
    priceUSD: '$4,960',
    headline: 'Shelf to screen. One coherent system.',
    description: 'The complete Brand-to-Market system: strategic identity, master structural packaging with up to 5 SKU adaptations, and a custom high-performance digital storefront or web experience.',
    duration: '6–8 weeks sprint',
    scope: 'Unified brand identity, structural packaging system, and custom website design & development.',
    chapters: [
      {
        title: 'Brand strategy & identity',
        items: [
          'Market positioning & strategic narrative workshop',
          'Complete mathematical logomark system & monograms',
          'Typographic scale & tokenized color architecture',
          'Comprehensive brand guidelines manual'
        ]
      },
      {
        title: 'Packaging design & dielines',
        items: [
          'Master structural packaging architecture',
          'Up to 5 SKU adaptations across your product range',
          'Front & back labeling information hierarchy',
          'Print-ready dielines & manufacturer production handover'
        ]
      },
      {
        title: 'Digital storefront & web build',
        items: [
          'Custom responsive UI/UX design (desktop + mobile)',
          'Headless Shopify or custom React frontend development',
          'Sub-second page speed & technical SEO schemas',
          'Full deployment, analytics & CMS handover'
        ]
      }
    ]
  },
  {
    name: 'Packaging Design',
    eyebrow: '03 // Structural Packaging & Print',
    priceINR: '₹3,75,000',
    priceUSD: '$3,920',
    headline: 'Make the shelf yours.',
    description: 'Packaging that makes your product recognisable, desirable and easy to navigate on retail shelves and memorable during unboxing.',
    duration: '4–6 weeks sprint',
    scope: 'One packaging system; formats and SKU count agreed before commencement.',
    chapters: [
      {
        title: 'Packaging strategy',
        items: [
          'Category & shelf landscape analysis',
          'Competitor structural & visual whitespace research',
          'Packaging hierarchy & front-of-pack communication'
        ]
      },
      {
        title: 'Design & development',
        items: [
          'Primary master packaging design & dielines',
          'Secondary packaging where scoped',
          'Multi-SKU variant system & label extensions',
          '3D photorealistic studio product visualisations'
        ]
      },
      {
        title: 'Production handover',
        items: [
          'Print-ready prepress artwork on approved dielines',
          'Material recommendations (paper stocks, foils, embossing)',
          'Printer handover coordination & sample reviews'
        ]
      }
    ]
  },
  {
    name: 'Web Development',
    eyebrow: '04 // Frontend & High-Code',
    priceINR: '₹1,15,000',
    priceUSD: '$1,250',
    headline: 'Beyond the screenshot.',
    description: 'High-speed digital platforms engineered around your brand and business objectives — sub-second performance, editorial typography, and high conversion.',
    duration: '4–6 weeks sprint',
    scope: 'Page count, platform and integrations agreed in the proposal.',
    chapters: [
      {
        title: 'Digital strategy',
        items: [
          'Discovery & business objective mapping',
          'Information architecture & sitemap planning',
          'User journeys & wireframe prototype flows'
        ]
      },
      {
        title: 'Design & development',
        items: [
          'Custom responsive UI/UX across all breakpoints',
          'Agreed CMS or Shopify implementation',
          'Custom micro-interactions, animations & states'
        ]
      },
      {
        title: 'Launch & speed optimization',
        items: [
          'Technical SEO & JSON-LD structured schemas',
          'Analytics setup & conversion tracking',
          'Sub-second page speed testing & deployment',
          'Website handover & CMS training'
        ]
      }
    ]
  },
  {
    name: 'SaaS Branding',
    eyebrow: '05 // SaaS Branding & UI/UX',
    priceINR: '₹4,75,000',
    priceUSD: '$4,960',
    headline: 'One brand. One product.',
    description: 'A connected identity and product experience for technology businesses — system-grade visual identity and tokenized software surfaces.',
    duration: '6–8 weeks sprint',
    scope: 'Priority screens and product flows agreed in advance; engineering separate unless scoped.',
    chapters: [
      {
        title: 'Brand foundation',
        items: [
          'Product discovery & competitive positioning audit',
          'Positioning narrative & messaging framework',
          'Visual identity, mark architecture & design tokens'
        ]
      },
      {
        title: 'Product experience',
        items: [
          'Core user workflows & key application screens',
          'Comprehensive tokenized Figma design system',
          'Interactive prototype for user testing'
        ]
      },
      {
        title: 'Handover & tokens',
        items: [
          'Figma component library with auto-layout & states',
          'Design token documentation (JSON/CSS variables)',
          'Engineering handover calls & brand guidelines'
        ]
      }
    ]
  },
  {
    name: 'App Design & Development',
    eyebrow: '06 // Mobile & Digital Products',
    priceINR: 'Custom quote',
    priceUSD: 'Custom quote',
    headline: 'Make complexity simple.',
    description: 'Intuitive digital products and mobile applications built around verified user workflows and high-converting micro-interactions.',
    duration: 'Scope dependent',
    scope: 'Engineering stack, target platforms and screen counts quoted after technical discovery.',
    chapters: [
      {
        title: 'Product discovery',
        items: [
          'Technical requirements & platform selection',
          'User journeys & interactive wireframes',
          'Information architecture & database schema planning'
        ]
      },
      {
        title: 'Interface design',
        items: [
          'High-fidelity iOS & Android native UI screens',
          'Micro-interactions, haptics & transition choreography',
          'Clickable interactive prototype'
        ]
      },
      {
        title: 'Development scope',
        items: [
          'React Native / Flutter or native mobile engineering',
          'API integration, authentication & state handling',
          'App Store & Google Play deployment'
        ]
      }
    ]
  },
  {
    name: 'Spatial Branding',
    eyebrow: '07 // Environments & Spaces',
    priceINR: 'Custom quote',
    priceUSD: 'Custom quote',
    headline: 'Brands you can step into.',
    description: 'Connected commercial environments, retail stores, cafes and hospitality destinations that immerse customers in your brand story.',
    duration: 'Scope dependent',
    scope: 'Design and execution coordination only as agreed; construction and vendor costs separate.',
    chapters: [
      {
        title: 'Brand experience',
        items: [
          'Spatial brand discovery & physical touchpoint mapping',
          'Customer journey mapping from facade to checkout',
          'Conceptual design direction & spatial mood boards'
        ]
      },
      {
        title: 'Interior & environmental design',
        items: [
          'Spatial planning, zoning & circulation flows',
          'Materials and furniture direction & finish schedules',
          '3D photorealistic architectural concept visualisation',
          'Signage, wayfinding & environmental graphics'
        ]
      },
      {
        title: 'Execution coordination',
        items: [
          'Comprehensive design documentation',
          'Vendor and contractor briefing coordination',
          'Implementation reviews & quality sign-offs'
        ]
      }
    ]
  },
  {
    name: 'Performance Marketing',
    eyebrow: '08 // Growth Partnerships',
    priceINR: '₹45,000–55,000 / mo or 15%',
    priceUSD: '$550–$680 / mo or 15%',
    headline: 'You grow. We grow.',
    description: 'Two growth partnerships, based on your total monthly brand revenue.',
    duration: 'Monthly engagement',
    scope: 'Up to ₹4 lakh revenue: ₹45,000–55,000 monthly retainer. Above ₹4 lakh and up to ₹50 lakh: 15% of total monthly revenue. Above ₹50 lakh: discuss scope. Media spend separate; revenue definition and reporting agreed before commencement.',
    chapters: [
      {
        title: 'Campaign strategy',
        items: [
          'Audience segmentation & creative angle research',
          'Full-funnel campaign planning (Prospecting, Retargeting)',
          'High-converting ad creative direction & copy frameworks'
        ]
      },
      {
        title: 'Management & optimization',
        items: [
          'Meta Ads & Google Ads daily account management',
          'Creative iteration & multi-variant A/B testing',
          'Conversion rate optimization & landing page alignment'
        ]
      },
      {
        title: 'Reporting & insights',
        items: [
          'Real-time performance monitoring dashboard',
          'Weekly spend pacing & blended ROAS reviews',
          'Monthly strategic growth review & scale recommendations'
        ]
      }
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
    '$6,000 – $6,300',
    '$6,300+',
    'I need guidance / Custom scope'
  ]
};

export default function PricingPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [currency, setCurrency] = useState('INR');
  const [activeStep, setActiveStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formBudget, setFormBudget] = useState('');
  const [formBrief, setFormBrief] = useState('');
  const [formAgreed, setFormAgreed] = useState(false);
  const [formOutput, setFormOutput] = useState('');
  const [copiedStatus, setCopiedStatus] = useState('');

  const investmentRef = useRef(null);
  const chapterRefs = useRef([]);

  useSEO({
    title: 'Pricing & Investment Guide — The Drawing Board',
    description: 'Clear, transparent sprint pricing for brand identity (from ₹3,50,000 / $3,650), packaging design (from ₹3,75,000), web development (from ₹1,15,000), and SaaS branding.',
    canonical: 'https://drawingsboard.com/pricing'
  });

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress((window.scrollY / maxScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Chapter Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepNum = parseInt(entry.target.getAttribute('data-step') || '0', 10);
            setActiveStep(stepNum);
          }
        });
      },
      { rootMargin: '-20% 0px -40% 0px' }
    );

    chapterRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeIdx]);

  const activeService = SERVICES_DATA[activeIdx];
  const stepTitles = ['Think first.', 'Make it distinct.', 'Make it yours.'];

  const handleSelectService = (idx) => {
    setActiveIdx(idx);
    setActiveStep(0);
    if (investmentRef.current) {
      investmentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const activePrice = currency === 'INR' ? activeService.priceINR : activeService.priceUSD;
    const briefText = `Project enquiry — The Drawing Board\n\nName: ${formName}\nEmail: ${formEmail}\nService: ${activeService.name} (${activePrice})\nBudget: ${formBudget}\nBrief: ${formBrief}\n\nGenerated via drawingsboard.com/pricing`;
    setFormOutput(briefText);
    setCopiedStatus('Your enquiry brief is prepared. You can copy it or send directly via WhatsApp.');
  };

  const handleCopy = async () => {
    if (!formOutput) return;
    try {
      await navigator.clipboard.writeText(formOutput);
      setCopiedStatus('Copied to clipboard! ↗');
    } catch {
      setCopiedStatus('Please select and copy the text manually.');
    }
  };

  const handleWhatsApp = () => {
    if (!formOutput) return;
    const encoded = encodeURIComponent(formOutput);
    window.open(`https://wa.me/919998818818?text=${encoded}`, '_blank');
  };

  return (
    <div className="pricing-page-root">
      {/* Header */}
      <header>
        <div className="wrap nav">
          <Link className="logo" to="/">THE DRAWING BOARD.</Link>
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
              style={{ padding: '8px 18px', fontSize: '13px' }}
              onClick={() => setMenuOpen(false)}
            >
              Start a project ↗
            </a>
          </nav>
        </div>
        <div className="progress" style={{ width: `${scrollProgress}%` }}></div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="wrap">
            <div className="mono">Independent strategy &amp; design studio / Investment guide</div>
            <h1>
              <span>GOOD DESIGN.</span>
              <span>CLEAR</span>
              <span>INVESTMENT.</span>
              <b className="tag a">No guesswork.</b>
              <b className="tag b">Good thinking included.</b>
            </h1>
            <p>Know what goes in. Know what comes out. Distinctive design begins with a clear understanding of what we're building together.</p>
            <a className="pill" href="#pricing">Explore our pricing ↓</a>

            <svg aria-hidden="true" className="art" viewBox="0 0 480 210">
              <g fill="none" stroke="var(--o)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
                <path d="M30 170Q95 85 145 155L195 185M450 170Q385 85 335 155L285 185"></path>
                <rect height="135" rx="8" transform="rotate(-7 240 100)" width="180" x="150" y="35"></rect>
                <path d="M170 75l130 -16M176 99l95 -12M180 123l120 -15"></path>
                <path d="M55 50l18 18m-18 0l18 -18M405 35v30m-15 -15h30"></path>
              </g>
              <g className="coin">
                <circle cx="335" cy="130" fill="#fae3e2" r="43" stroke="var(--ink)" strokeWidth="3"></circle>
                <text className="coin-text" textAnchor="middle" x="335" y="146">
                  {currency === 'INR' ? '₹' : '$'}
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* Marquee */}
        <div className="marquee">
          <div>
            GOOD THINKING INCLUDED • NO GUESSWORK • BUILT TO BE CHOSEN • FIXED SCOPE TRANSPARENCY • GOOD THINKING INCLUDED • NO GUESSWORK • BUILT TO BE CHOSEN • FIXED SCOPE TRANSPARENCY • 
          </div>
        </div>

        <div id="pricing" style={{ scrollMarginTop: '68px' }}></div>

        {/* Sticky Service Tabs */}
        <nav aria-label="Services" className="tabs" role="tablist">
          {SERVICES_DATA.map((s, i) => (
            <button
              key={s.name}
              type="button"
              role="tab"
              aria-selected={activeIdx === i}
              onClick={() => handleSelectService(i)}
            >
              {s.name}
            </button>
          ))}
        </nav>

        {/* Investment Split Section */}
        <section className="section" id="investment" ref={investmentRef}>
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

              {activeIdx === 7 ? (
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
              ) : (
                <>
                  <div className="price">
                    {currency === 'INR' ? activeService.priceINR : activeService.priceUSD}
                  </div>
                  <div className="duration">{activeService.duration}</div>
                  <p className="rule">{activeService.scope}</p>
                </>
              )}

              <div style={{ marginTop: '24px' }}>
                <a className="pill" href="#enquire">Discuss this project ↗</a>
              </div>
            </div>
          </div>
        </section>

        {/* 01 Deliverables */}
        <section className="section blush">
          <div className="wrap">
            <div className="mono">01 / The deliverables</div>
            <h2>What goes<br/>into it.</h2>
            <div className="process">
              <aside className="pin">
                <div>
                  <div className="mono">
                    0{activeStep + 1} / {activeService.chapters[activeStep]?.title || 'Deliverables'}
                  </div>
                  <h3>{stepTitles[activeStep] || 'Deliver.'}</h3>
                </div>
                <svg aria-hidden="true" viewBox="0 0 250 140">
                  <g fill="none" stroke="#fae3e2" strokeWidth="3">
                    <circle cx="125" cy="70" r="48"></circle>
                    <ellipse cx="125" cy="70" rx="110" ry="25"></ellipse>
                    <ellipse cx="125" cy="70" rx="110" ry="25" transform="rotate(55 125 70)"></ellipse>
                    <ellipse cx="125" cy="70" rx="110" ry="25" transform="rotate(-55 125 70)"></ellipse>
                  </g>
                </svg>
              </aside>
              <div>
                {activeService.chapters.map((ch, j) => (
                  <article
                    key={ch.title}
                    className="chapter"
                    data-step={j}
                    ref={(el) => (chapterRefs.current[j] = el)}
                  >
                    <div className="mono">0{j + 1} / DELIVERABLES</div>
                    <h3>{ch.title}</h3>
                    <ul>
                      {ch.items.map((item, k) => (
                        <li key={k}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02 Commercial Details */}
        <section className="section white">
          <div className="wrap">
            <div className="mono">02 / The commercial details</div>
            <h2>Nothing left<br/>to guess.</h2>
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

        {/* 03 FAQ Accordion */}
        <section className="section blush faq">
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
              <h2>Worth<br/>choosing.</h2>
              <p className="intro">Tell us what you're building. We'll review your project details and discuss the right scope, investment, and schedule within 24 hours.</p>
            </div>
            <form onSubmit={handleSubmitForm}>
              <div className="formgrid">
                <label>Name
                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label>Email
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="you@brand.com"
                    required
                  />
                </label>
                <label className="full">Service
                  <select
                    value={activeService.name}
                    onChange={(e) => {
                      const idx = SERVICES_DATA.findIndex((s) => s.name === e.target.value);
                      if (idx !== -1) setActiveIdx(idx);
                    }}
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </label>
                <label className="full">Project budget
                  <select
                    value={formBudget}
                    onChange={(e) => setFormBudget(e.target.value)}
                    required
                  >
                    <option value="">Select your budget</option>
                    {BUDGET_OPTIONS[currency].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </label>
                <label className="full">Tell us about your project
                  <textarea
                    value={formBrief}
                    onChange={(e) => setFormBrief(e.target.value)}
                    placeholder="What are you building? Share your timeline, current stage, and objectives."
                    required
                  ></textarea>
                </label>
                <label className="full checkbox-label">
                  <input
                    type="checkbox"
                    checked={formAgreed}
                    onChange={(e) => setFormAgreed(e.target.checked)}
                    required
                  />
                  <span>I understand the selected service's starting investment and sprint scope.</span>
                </label>
                <button className="pill full" type="submit" style={{ width: '100%' }}>
                  Prepare my enquiry ↗
                </button>
              </div>

              {copiedStatus && (
                <p className="form-status" style={{ color: 'var(--o)', fontWeight: '600' }}>
                  {copiedStatus}
                </p>
              )}

              {formOutput && (
                <div className="form-output-box">
                  <textarea value={formOutput} readOnly rows={7} />
                  <div className="output-actions">
                    <button className="pill" type="button" onClick={handleCopy}>
                      Copy enquiry brief ↗
                    </button>
                    <button
                      className="pill"
                      type="button"
                      onClick={handleWhatsApp}
                      style={{ background: '#25D366', borderColor: '#25D366' }}
                    >
                      Send via WhatsApp ↗
                    </button>
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
          <Link className="logo" to="/" style={{ fontSize: '18px' }}>THE DRAWING BOARD.</Link>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/work">Work</Link>
            <Link to="/services">Services</Link>
            <Link to="/brand-readiness">Brand Readiness</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
