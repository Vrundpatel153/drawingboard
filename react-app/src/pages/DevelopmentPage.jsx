import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import MoreServicesSection from '../components/MoreServicesSection';
import { WHATSAPP_URL } from '../utils/siteConfig';
import { trackMetaFormSubmission } from '../utils/metaEvents';

/* ─────────────────────────────────────────────────────────────────────────────
   DevelopmentPage — Architectural Blueprint Redesign
   Integrated with locked project links, images, case studies, and interactive demos
   ───────────────────────────────────────────────────────────────────────────── */
export default function DevelopmentPage() {
  // Scroll Progress Rail
  const [scrollProgress, setScrollProgress] = useState(0);

  // Hero Cycling Words
  const cycleWords = ['Sell.', 'Explain.', 'Impress.', 'Convert.', 'Automate.'];
  const [cycleIdx, setCycleIdx] = useState(0);
  const [cycleFading, setCycleFading] = useState(false);

  // Scroll-linked Layer Strip
  const [activeLayer, setActiveLayer] = useState(0);

  // Diagnostic Interactive Tool
  const [selectedDiag, setSelectedDiag] = useState(null);

  // Commerce Product Demo Toggle
  const [commercePp, setCommercePp] = useState('standard');

  // Experience Scroll-State Demo
  const [expStateIdx, setExpStateIdx] = useState(0);

  // Systems Dashboard Demo
  const [dashMetricKey, setDashMetricKey] = useState('leads');

  // Project Estimator State
  const [estState, setEstState] = useState({ need: null, complexity: null, brand: null, copy: null });


  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Case Studies Category Filter
  const [activeCategory, setActiveCategory] = useState('all');

  // Lead Modal Overlay State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStepIdx, setModalStepIdx] = useState(0);
  const [modalData, setModalData] = useState({
    build: '',
    problem: '',
    stage: '',
    budget: '',
    timeline: '',
    name: '',
    company: '',
    email: '',
    phone: '',
    website: ''
  });

  // Cycle words interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCycleFading(true);
      setTimeout(() => {
        setCycleIdx((prev) => (prev + 1) % cycleWords.length);
        setCycleFading(false);
      }, 350);
    }, 2200);
    return () => clearInterval(timer);
  }, [cycleWords.length]);

  // Scroll Progress & Layer strip active index
  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollProgress(pct || 0);

      const scrollPct = window.scrollY / (h.scrollHeight - window.innerHeight);
      const layerIdx = Math.min(6, Math.max(0, Math.floor(scrollPct * 7 * 1.5)));
      setActiveLayer(layerIdx);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Diagnostic Data Mapping
  const diagData = {
    commerce: {
      tag: 'RECOMMENDED',
      title: 'Commerce',
      desc: 'Built for brands where the website is part storefront, part salesperson.',
      price: '$1,200 / £889 (₹1,14,156)'
    },
    experience: {
      tag: 'RECOMMENDED',
      title: 'Experience',
      desc: 'Built for brands where being remembered matters as much as being understood.',
      price: '$1,500 / £1,111 (₹1,42,695)'
    },
    systems: {
      tag: 'RECOMMENDED',
      title: 'Systems',
      desc: "Built when the website isn't really a website anymore — it's a product.",
      price: 'Starting $2,800 / £2,074 (₹2,66,364)'
    }
  };

  // Experience Demo Data
  const expData = [
    { scale: 0.5, opacity: 0.6, caption: '' },
    { scale: 0.7, opacity: 0.8, caption: '' },
    { scale: 0.85, opacity: 0.9, caption: 'Typography moves around the image.' },
    { scale: 1, opacity: 1, caption: '' },
    { scale: 0.9, opacity: 1, caption: 'The brand object appears.' },
    { scale: 0.95, opacity: 1, caption: 'Your website can tell a story without asking people to read an essay.' }
  ];

  // Systems Dashboard Data
  const dashData = {
    leads: { metric: '128', lbl: 'Active leads this month', bars: [40, 55, 35, 70, 60, 80] },
    orders: { metric: '342', lbl: 'Orders this month', bars: [50, 60, 45, 65, 72, 58] },
    customers: { metric: '1,204', lbl: 'Total customers', bars: [30, 45, 50, 55, 65, 75] },
    revenue: { metric: '₹18.4L', lbl: 'Revenue this month', bars: [45, 50, 60, 55, 70, 85] },
    projects: { metric: '12', lbl: 'Active projects', bars: [60, 40, 50, 45, 55, 65] },
    inventory: { metric: '86%', lbl: 'Stock availability', bars: [70, 65, 80, 75, 60, 85] }
  };

  // FAQs
  const faqs = [
    {
      q: 'How much does a website cost?',
      a: "Shopify builds are fixed at $1,200 / £889 (₹1,14,156), custom website builds at $1,500 / £1,111 (₹1,42,695), and custom platform systems starting from $2,800 / £2,074 (₹2,66,364). Exact investment depends on catalog size, page count, integrations, and complexity — we'll give you an exact figure after understanding scope."
    },
    {
      q: 'Why does custom development cost more than a template?',
      a: "A template is designed for nobody in particular. Custom work means the layout, hierarchy and interactions are built specifically around your customer's decision path — that thinking is where most of the cost sits, not the code itself."
    },
    {
      q: 'Do you handle both design and development?',
      a: 'Yes. Strategy, UX, UI and build happen under one roof, so nothing is lost in translation between a designer and a developer who never speak to each other.'
    },
    {
      q: 'Can you redesign my existing website?',
      a: "Yes — most projects start as a redesign. We'll audit what's working, what isn't, and scope accordingly rather than starting from a blank page for the sake of it."
    },
    {
      q: 'Can you migrate my current Shopify store?',
      a: 'Yes. We can rebuild on your existing Shopify backend, carrying over products, customers and order history without disrupting your store.'
    },
    {
      q: 'Can you build SaaS products?',
      a: 'Yes — this falls under Systems. We scope SaaS MVPs individually since functionality, data model and integrations vary project to project.'
    },
    {
      q: 'Can you integrate our CRM, API or payment system?',
      a: "Yes. Third-party integrations are scoped as part of Commerce and Systems engagements — tell us what you're already running and we'll confirm feasibility on the call."
    },
    {
      q: 'Who owns the code?',
      a: 'You do, completely. Full codebase, source files and credentials transfer to you at handoff — no licensing fees, no lock-in.'
    },
    {
      q: 'What happens after launch?',
      a: 'Every engagement includes a post-launch support window for fixes and handoff questions. Ongoing maintenance beyond that is available but never mandatory.'
    },
    {
      q: 'Do you provide maintenance?',
      a: "Yes, as an optional retainer once the support window ends — you're never required to keep us on to keep your site running."
    },
    {
      q: 'How long does a project take?',
      a: 'Commerce: 3–5 weeks. Experience: 4–7 weeks. Systems: 6–12+ weeks, depending on scope. You\'ll get an exact timeline once we understand the brief.'
    },
    {
      q: 'Do you work with international clients?',
      a: 'Yes, regularly. All pricing is specified in USD ($), GBP (£), and INR (₹) based on current market rates (1 USD = 95.13 INR, 1 GBP = 128.34 INR / 1.35 USD), and calls are scheduled conveniently across time zones.'
    },
    {
      q: 'What do you need from us before starting?',
      a: "Ideally brand assets and any existing copy — but if you don't have those yet, that's fine. We'll flag what's needed and when during scoping."
    }
  ];

  // Cases (Preserving existing portfolio items, images & links)
  const cases = [
    { cat: 'ecommerce', href: 'https://heydoh.co/', img: 'https://framerusercontent.com/images/TW8nh45W2f0jJxIXkfCtK2I9qo.webp?width=1876&height=1821', label: 'E-COMMERCE', title: 'Heydoh Soy Sauce' },
    { cat: 'ecommerce', href: 'https://eu.dockers.com/', img: 'https://framerusercontent.com/images/wwljvqAiXbHPskZq2H2HFW16ug.png?width=3414&height=2092', label: 'E-COMMERCE', title: 'Dockers — Shopify Migration' },
    { cat: 'ecommerce', href: 'https://www.jumpinggoatliquor.com/', img: 'https://framerusercontent.com/images/eGKHd2k1Xl1bURsuiHtL9zH6g.png?width=1888&height=919', label: 'E-COMMERCE', title: 'Jumping Goat Liquor' },
    { cat: 'ecommerce', href: 'https://cocolab.com/', img: 'https://framerusercontent.com/images/RavNTGjDTPqSEMREtfyXj01cY.png?width=1889&height=918', label: 'E-COMMERCE', title: 'Cocolab' },
    { cat: 'ecommerce', href: 'https://nothingfitsbut.com/', img: 'https://framerusercontent.com/images/zv7NiL9CBlTkrXSJTwve6Mv6qM.png?width=1891&height=909', label: 'E-COMMERCE', title: 'Nothing Fits But' },
    { cat: 'ecommerce', href: 'https://eyeondesign.pl/', img: 'https://framerusercontent.com/images/ijj6fkRjp1O3Mp4IrpgojY7yxFQ.png?width=1881&height=908', label: 'E-COMMERCE', title: 'Eye on Design' },
    { cat: 'ecommerce', href: 'https://camillebrinch.com/', img: 'https://framerusercontent.com/images/ucduo19dulaHKebxzb9S6G6KEKI.png?width=1878&height=913', label: 'E-COMMERCE', title: 'Camillebrinch' },
    { cat: 'ecommerce', href: 'https://www.silkandwillow.com/', img: 'https://framerusercontent.com/images/awsgdlBGitGj1gIX9hUlSDspTk.png?width=1895&height=913', label: 'E-COMMERCE', title: 'Silk and Willow' },
    { cat: 'ecommerce', href: 'https://bruvi.com/', img: 'https://framerusercontent.com/images/q24RBOXyuxkTVhwL9ED2h520.png?width=1896&height=912', label: 'E-COMMERCE', title: 'Bruvi' },
    { cat: 'ecommerce', href: 'https://thedealdepartment.nz/', img: 'https://framerusercontent.com/images/m5BV46AM2GF69Q4LrYe7EyScHFg.png?width=1887&height=913', label: 'E-COMMERCE', title: 'The Deal Department' },
    { cat: 'ecommerce', href: 'https://marstonmoor.co.nz/', img: 'https://framerusercontent.com/images/OmlzVJQtnCAhnmFG8RDgQnElSGM.png?width=1890&height=918', label: 'E-COMMERCE', title: 'Marstonmoor' },
    { cat: 'ecommerce', href: 'https://musicradiocreative.com/', img: 'https://framerusercontent.com/images/Rk5BGoMsH6b2qOHJlT6ctjDzsE.png?width=1895&height=914', label: 'E-COMMERCE', title: 'Music Radio Creative' },
    { cat: 'ecommerce', href: 'https://gojushots.com/', img: 'https://framerusercontent.com/images/fNEFSng1yYgatD7qwHHUaX20ujM.png?width=1904&height=916', label: 'E-COMMERCE', title: 'Goju Shots' },
    { cat: 'ecommerce', href: 'https://commafootball.com/', img: 'https://framerusercontent.com/images/Z2DLzSMyLAGZ55XhkPQ0trRP9S0.png?width=1896&height=923', label: 'E-COMMERCE', title: 'Commafootball' },
    { cat: 'native', href: 'https://shaktimat.ca/', img: 'https://framerusercontent.com/images/lzCMGdCVl4l1qY3JFkJc2NDPtg.png?width=1914&height=908', label: 'NATIVE CODE', title: 'Shaktimat' },
    { cat: 'ecommerce', href: 'https://mejuri.com/world/en/', img: 'https://framerusercontent.com/images/QG53iYrspe8Dj6EfSYdN7CPbujs.png?width=1188&height=728', label: 'E-COMMERCE', title: 'Mejuri' },
    { cat: 'ecommerce', href: 'https://doublestandard.nyc/', img: 'https://framerusercontent.com/images/9IlxJ5r43604P3SNziHlW8Z1W5U.png?width=1892&height=917', label: 'E-COMMERCE', title: 'Double Standard' },
    { cat: 'ecommerce', href: 'https://yowy.com.au/', img: 'https://framerusercontent.com/images/T9KFx1ujfIf7GMlF8nOqthYCd8Q.png?width=1891&height=916', label: 'E-COMMERCE', title: 'yowy' },
    { cat: 'ecommerce', href: 'https://www.coastalcowboys.com.au/', img: 'https://framerusercontent.com/images/i0cw87sMetqrsTVcOT6FH6pdAn4.png?width=1898&height=915', label: 'E-COMMERCE', title: 'Coastal Cowboys' },
    { cat: 'ecommerce', href: 'https://alshalofficial.com/', img: 'https://framerusercontent.com/images/vC6hFSd3652b1Yh8rSiDz7w03M.png?width=1903&height=919', label: 'E-COMMERCE', title: 'Alshal Official' }
  ];

  const row1Logos = [
    '/logos/Clip-path-group.png',
    '/logos/Group-1000001687.png',
    '/logos/Group-1000001964.png',
    '/logos/Group-1000001965.png',
    '/logos/Group-1000001966.png',
    '/logos/Group-1000002217.png',
    '/logos/Group-1000002324.png',
    '/logos/Group-1000003522.png',
    '/logos/Group-1000003523.png',
    '/logos/Group-1000004603.png'
  ];

  const row2Logos = [
    '/logos/Group-13.png',
    '/logos/Group-17-2.png',
    '/logos/Group-18-4.png',
    '/logos/Group-19-2.png',
    '/logos/Group-2-6.png',
    '/logos/Group-20-3.png',
    '/logos/Group-24-2.png',
    '/logos/Group-25-2.png',
    '/logos/Group-26-2.png',
    '/logos/Group-30-1.png'
  ];

  const row3Logos = [
    '/logos/Group-4-6.png',
    '/logos/Group-5-5.png',
    '/logos/Group-5137-1.png',
    '/logos/Group-5148.png',
    '/logos/Group-5139-1.png',
    '/logos/Group-5140-3.png',
    '/logos/Group-5141-3.png',
    '/logos/Group-5145.png',
    '/logos/Group-6-9.png'
  ];

  const whatsappScreenshots = [
    '/_assets/images/whatsap_screenshots/WhatsApp Image 2026-08-01 at 11.41.10 PM (1).jpeg',
    '/_assets/images/whatsap_screenshots/WhatsApp Image 2026-08-01 at 11.41.10 PM.jpeg',
    '/_assets/images/whatsap_screenshots/WhatsApp Image 2026-08-01 at 11.41.11 PM.jpeg',
    '/_assets/images/whatsap_screenshots/WhatsApp Image 2026-08-01 at 11.41.12 PM (1).jpeg',
    '/_assets/images/whatsap_screenshots/WhatsApp Image 2026-08-01 at 11.41.12 PM.jpeg',
    '/_assets/images/whatsap_screenshots/WhatsApp Image 2026-08-01 at 11.41.13 PM (1).jpeg',
    '/_assets/images/whatsap_screenshots/WhatsApp Image 2026-08-01 at 11.41.13 PM (2).jpeg',
    '/_assets/images/whatsap_screenshots/WhatsApp Image 2026-08-01 at 11.41.13 PM.jpeg'
  ];

  const founderQuotes = [
    {
      text: "The website architecture and speed optimization they built was game-changing. Our conversion rates jumped 42% in the first month post-launch.",
      name: "Arjun Mehta",
      role: "Co-founder, Sonar Platform",
      av: "A"
    },
    {
      text: "We needed a custom Shopify build that felt like a high-end luxury digital experience. The team delivered flawless code with zero friction.",
      name: "Sarah Jenkins",
      role: "Design Director, Apex Digital",
      av: "S"
    },
    {
      text: "Our mobile web performance score went from 48 to 96 on Google PageSpeed. Customers constantly compliment the smooth page transitions.",
      name: "Rohan Gupta",
      role: "Founder, Good Protein",
      av: "R"
    },
    {
      text: "Clean react components, modular styling, and flawless animation logic. Developer handoff and ongoing updates have been seamless.",
      name: "Elena Rostova",
      role: "Brand Lead, Northbyte",
      av: "E"
    }
  ];

  // Lead Modal Helpers
  const openLeadModal = (prefillBuild = '') => {
    setModalData((prev) => ({ ...prev, build: prefillBuild || prev.build }));
    setModalStepIdx(0);
    setModalOpen(true);
  };

  const closeLeadModal = () => {
    setModalOpen(false);
  };

  const modalStepsKeys = ['1', '2', '3', '4', '5', '6', 'confirm'];

  const getEstResult = () => {
    if (!estState.need || !estState.complexity || !estState.brand || !estState.copy) return null;
    const estMap = {
      'Shopify / E-Commerce': { title: 'Shopify / E-Commerce', price: '$1,200 / £889 (₹1,14,156)', time: '3–5 weeks' },
      'Immersive Website': { title: 'Immersive Experience', price: '$1,500 / £1,111 (₹1,42,695)', time: '4–7 weeks' },
      'Custom Platform': { title: 'Custom Platform / Systems', price: 'Starting $2,800 / £2,074 (₹2,66,364)', time: '6–12+ weeks' }
    };
    return estMap[estState.need] || { title: estState.need, price: 'Starting $1,200 / £889 (₹1,14,156)', time: '3–6 weeks' };
  };

  const estResult = getEstResult();

  return (
    <>
      <RegistrationMarks />
      <Navbar />

      {/* Top Scroll Progress Rail */}
      <div
        className="bp-progress-rail"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          background: 'var(--marker)',
          zIndex: 1000,
          width: `${scrollProgress}%`,
          transition: 'width 0.1s linear'
        }}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        /* ── BLUEPRINT DESIGN SYSTEM TOKENS ── */
        .dev-bp-page {
          --paper: #F3EEE2;
          --paper-deep: #ECE5D4;
          --card: #FAF7EE;
          --paper-line: #D8CFB8;
          --ink: #2A2822;
          --ink-soft: #6E6857;
          --pine: #24463B;
          --pine-deep: #173028;
          --pine-soft: #3E6659;
          --marker: #B5502F;
          --radius: 3px;
          --mono: 'IBM Plex Mono', monospace;
          --serif: 'Fraunces', serif;
          --sans: 'Inter', sans-serif;

          background-color: var(--paper);
          color: var(--ink);
          font-family: var(--sans);
          font-weight: 300;
          line-height: 1.5;
          width: 100%;
          overflow-x: hidden;

          /* graph / grid paper — fine lines with a bolder line every 5th square */
          background-image:
            repeating-linear-gradient(to right, rgba(42,40,34,0.09) 0 1px, transparent 1px 120px),
            repeating-linear-gradient(to bottom, rgba(42,40,34,0.09) 0 1px, transparent 1px 120px),
            repeating-linear-gradient(to right, rgba(42,40,34,0.035) 0 1px, transparent 1px 24px),
            repeating-linear-gradient(to bottom, rgba(42,40,34,0.035) 0 1px, transparent 1px 24px);
          background-position: -1px -1px;
        }

        .dev-bp-page .annot-card,
        .dev-bp-page .demo-panel,
        .dev-bp-page .diag-result,
        .dev-bp-page .diag-opt,
        .dev-bp-page .value-row,
        .dev-bp-page .work-card,
        .dev-bp-page .faq-item,
        .dev-bp-page .estimator,
        .dev-bp-page .decision-row,
        .dev-bp-page .testi,
        .dev-bp-page .compare-col,
        .dev-bp-page .diagnostic,
        .dev-bp-page .svc,
        .dev-bp-page .sheet-label .tag,
        .dev-bp-page section[data-band],
        .dev-bp-page .modal-box {
          background-image:
            repeating-linear-gradient(to right, rgba(42,40,34,0.05) 0 1px, transparent 1px 24px),
            repeating-linear-gradient(to bottom, rgba(42,40,34,0.05) 0 1px, transparent 1px 24px);
          background-position: -1px -1px;
        }

        .dev-bp-page h1, .dev-bp-page h2, .dev-bp-page h3, .dev-bp-page h4 {
          font-family: var(--serif);
          font-weight: 600;
          color: var(--ink);
          line-height: 1.08;
          letter-spacing: -0.01em;
        }
        .dev-bp-page .wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        @media (max-width: 768px) {
          .dev-bp-page .wrap {
            padding: 0 16px;
          }
        }

        .dev-bp-page section {
          padding: 88px 0;
        }
        @media (max-width: 768px) {
          .dev-bp-page section {
            padding: 54px 0;
          }
        }

        .dev-bp-page .eyebrow {
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--marker);
          margin-bottom: 12px;
        }
        .dev-bp-page .section-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }
        .dev-bp-page .section-head h2 {
          font-size: clamp(26px, 3.4vw, 42px);
          max-width: 680px;
        }
        .dev-bp-page .section-head p {
          color: var(--ink-soft);
          max-width: 380px;
          font-size: 15px;
        }

        /* Buttons */
        .dev-bp-page .btn-primary {
          background: var(--pine);
          color: var(--paper);
          padding: 15px 26px;
          font-size: 14.5px;
          font-weight: 600;
          border-radius: var(--radius);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background .15s, transform .15s;
          border: none;
          cursor: pointer;
          font-family: var(--sans);
          text-decoration: none;
        }
        .dev-bp-page .btn-primary:hover {
          background: var(--pine-deep);
          transform: translateY(-1px);
        }
        .dev-bp-page .btn-secondary {
          border: 1.5px solid var(--ink);
          padding: 13.5px 22px;
          font-size: 14.5px;
          font-weight: 600;
          border-radius: var(--radius);
          background: transparent;
          color: var(--ink);
          cursor: pointer;
          font-family: var(--sans);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .dev-bp-page .btn-secondary:hover {
          background: var(--ink);
          color: var(--paper);
        }
        .dev-bp-page .btn-link {
          font-size: 14.5px;
          border-bottom: 1px solid currentColor;
          padding-bottom: 2px;
          color: var(--ink-soft);
          cursor: pointer;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          font-family: var(--sans);
          text-decoration: none;
        }
        .dev-bp-page .btn-link:hover {
          color: var(--pine);
        }

        /* Hero */
        .dev-bp-page .hero {
          padding: 28px 0 60px;
        }
        .dev-bp-page .crumb {
          font-size: 12.5px;
          color: var(--ink-soft);
          margin-bottom: 22px;
        }
        .dev-bp-page .crumb a {
          border-bottom: 1px dashed var(--ink-soft);
          color: var(--ink-soft);
        }
        .dev-bp-page .crumb .sep {
          margin: 0 8px;
          opacity: 0.5;
        }
        .dev-bp-page .crumb .cur {
          color: var(--ink);
        }
        .dev-bp-page .sheet-label {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 26px;
        }
        .dev-bp-page .sheet-label .tag {
          font-size: 12px;
          padding: 6px 10px;
          border: 1px solid var(--ink);
          font-family: var(--mono);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background-color: var(--card);
        }
        .dev-bp-page .sheet-label .rule {
          flex: 1;
          height: 1px;
          background: var(--ink-soft);
          opacity: 0.4;
        }
        .dev-bp-page .sheet-label .scale {
          font-size: 12px;
          color: var(--ink-soft);
          font-family: var(--mono);
        }

        .dev-bp-page .hero h1 {
          font-size: clamp(34px, 5.4vw, 66px);
          max-width: 880px;
        }
        .dev-bp-page .hero h1 .cycle-wrap {
          display: inline-block;
          position: relative;
          color: var(--pine);
          min-width: 1ch;
        }
        .dev-bp-page .hero .cycle-word {
          transition: opacity .35s ease, transform .35s ease;
          display: inline-block;
        }

        .dev-bp-page .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: start;
          margin-top: 24px;
        }
        .dev-bp-page .hero-copy p.desc {
          font-size: 17px;
          color: var(--ink-soft);
          max-width: 520px;
          margin-bottom: 28px;
          line-height: 1.6;
        }
        .dev-bp-page .cta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .dev-bp-page .price-note {
          font-size: 13px;
          color: var(--ink-soft);
        }
        .dev-bp-page .price-note b {
          color: var(--ink);
        }
        .dev-price-blocks {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          margin-top: 18px;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        .dev-price-chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #FFFFFF;
          border: 1px solid var(--ink, #1B1B17);
          color: var(--ink, #1B1B17);
          padding: 7px 13px;
          border-radius: 2px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          transition: transform 0.15s ease, border-color 0.15s ease;
          max-width: 100%;
          box-sizing: border-box;
        }
        .dev-price-chip:hover {
          transform: translateY(-1px);
          border-color: var(--pine, #24463B);
        }
        .dev-chip-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #FFFFFF;
          background: var(--pine, #24463B);
          border: none;
          padding: 3px 8px;
          border-radius: 2px;
          white-space: nowrap;
        }
        .dev-chip-price {
          font-size: 12.5px;
          color: #1B1B17;
          font-family: 'IBM Plex Mono', monospace;
          white-space: nowrap;
        }
        .dev-chip-price b {
          font-weight: 700;
          color: #1B1B17;
        }
        .dev-chip-price .inr-sub {
          color: #5A584E;
          font-size: 11.5px;
          font-weight: 500;
        }
        .final-cta .dev-price-chip {
          background: rgba(255, 255, 255, 0.08) !important;
          border: 1px solid rgba(255, 255, 255, 0.25) !important;
          color: #FFFFFF !important;
          box-shadow: none !important;
        }
        .final-cta .dev-chip-label {
          background: rgba(255, 255, 255, 0.2) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          color: #FFFFFF !important;
        }
        .final-cta .dev-chip-price {
          color: #FFFFFF !important;
        }
        .final-cta .dev-chip-price b {
          color: #FFFFFF !important;
        }
        .final-cta .dev-chip-price .inr-sub {
          color: #CFE0DA !important;
        }
        @media (max-width: 600px) {
          .dev-price-blocks {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
          }
          .dev-price-chip {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            padding: 9px 12px;
          }
          .dev-chip-label {
            font-size: 10px;
          }
          .dev-chip-price {
            font-size: 11.5px;
            white-space: normal;
            line-height: 1.4;
            word-break: break-word;
          }
          .dev-bp-page .sheet-label {
            flex-wrap: wrap;
            gap: 8px;
          }
          .dev-bp-page .sheet-label .rule {
            display: none;
          }
        }

        .dev-bp-page .annot-card {
          background-color: var(--card);
          border: 1px solid var(--ink);
          padding: 26px;
          position: relative;
        }
        .dev-bp-page .annot-card .corner {
          position: absolute;
          top: -1px;
          right: -1px;
          width: 26px;
          height: 26px;
          background: var(--marker);
          clip-path: polygon(0 0, 100% 0, 100% 100%);
        }
        .dev-bp-page .annot-title {
          font-size: 12px;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-bottom: 14px;
          font-family: var(--mono);
        }
        .dev-bp-page .annot-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px dashed var(--paper-line);
          padding: 10px 0;
          font-size: 13px;
          gap: 14px;
        }
        .dev-bp-page .annot-row:last-child {
          border-bottom: none;
        }
        .dev-bp-page .annot-row span:first-child {
          color: var(--ink-soft);
        }
        .dev-bp-page .annot-row span:last-child {
          font-weight: 500;
          text-align: right;
        }

        /* Sonar Featured Card inside hero */
        .dev-bp-page .sonar-card {
          margin-top: 18px;
          border: 1px solid var(--ink);
          background: var(--card);
          overflow: hidden;
        }
        .dev-bp-page .sonar-card .simg {
          aspect-ratio: 16/9;
          overflow: hidden;
          background: var(--paper-deep);
        }
        .dev-bp-page .sonar-card .simg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .dev-bp-page .sonar-card .sbody {
          padding: 14px 18px;
        }
        .dev-bp-page .sonar-card .stag {
          font-family: var(--mono);
          font-size: 10.5px;
          color: var(--marker);
          margin-bottom: 4px;
          text-transform: uppercase;
        }

        /* Blueprint layer strip */
        .dev-bp-page .layer-strip {
          display: flex;
          border-top: 1px solid var(--ink);
          border-bottom: 1px solid var(--ink);
          margin-top: 56px;
          overflow-x: auto;
        }
        .dev-bp-page .layer {
          flex: 1;
          min-width: 110px;
          padding: 16px 14px;
          border-right: 1px solid var(--ink);
          font-family: var(--mono);
          font-size: 11.5px;
          text-align: center;
          letter-spacing: 0.03em;
          color: var(--ink-soft);
          position: relative;
          transition: color .25s, background .25s;
          cursor: pointer;
        }
        .dev-bp-page .layer:last-child {
          border-right: none;
        }
        .dev-bp-page .layer .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--ink-soft);
          margin: 0 auto 8px;
          transition: background .25s, transform .25s;
        }
        .dev-bp-page .layer.active {
          color: var(--pine);
          background: rgba(36, 70, 59, 0.06);
        }
        .dev-bp-page .layer.active .dot {
          background: var(--pine);
          transform: scale(1.5);
        }

        /* Diagnostic */
        .dev-bp-page .diagnostic {
          background-color: var(--card);
          border-top: 1px solid var(--ink);
          border-bottom: 1px solid var(--ink);
        }
        .dev-bp-page .diag-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .dev-bp-page .diag-options {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .dev-bp-page .diag-opt {
          border: 1px solid var(--ink);
          background-color: var(--paper);
          padding: 12px 16px;
          font-size: 12px;
          font-weight: 500;
          font-family: var(--sans);
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all .15s;
          text-transform: uppercase;
        }
        .dev-bp-page .diag-opt:hover {
          background: var(--ink);
          color: var(--paper);
        }
        .dev-bp-page .diag-opt.sel {
          background: var(--pine);
          color: var(--paper);
          border-color: var(--pine);
        }
        .dev-bp-page .diag-result {
          border: 1px solid var(--ink);
          background-color: var(--paper);
          padding: 30px;
          min-height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }
        .dev-bp-page .diag-result .placeholder {
          color: var(--ink-soft);
          font-size: 14px;
          font-family: var(--mono);
        }
        .dev-bp-page .diag-result .rec-tag {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--marker);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 10px;
        }
        .dev-bp-page .diag-result h3 {
          font-size: 26px;
          margin-bottom: 10px;
        }
        .dev-bp-page .diag-result .rec-desc {
          color: var(--ink-soft);
          font-size: 14.5px;
          margin-bottom: 18px;
          max-width: 420px;
        }
        .dev-bp-page .diag-result .rec-price {
          font-family: var(--serif);
          font-size: 22px;
          color: var(--pine);
          font-weight: 600;
          margin-bottom: 18px;
        }

        /* Services stack */
        .dev-bp-page .services-stack {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: var(--ink);
          border: 1px solid var(--ink);
        }
        .dev-bp-page .svc {
          background-color: var(--card);
          padding: 56px 0;
        }
        .dev-bp-page .svc-inner {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 56px;
          align-items: start;
        }
        .dev-bp-page .svc-label {
          font-family: var(--mono);
          font-size: 12px;
          color: var(--marker);
          letter-spacing: 0.04em;
          margin-bottom: 14px;
        }
        .dev-bp-page .svc h3 {
          font-size: clamp(24px, 3vw, 36px);
          margin-bottom: 8px;
        }
        .dev-bp-page .svc .tagline {
          font-family: var(--serif);
          font-style: italic;
          font-size: 18px;
          color: var(--ink-soft);
          margin-bottom: 20px;
        }
        .dev-bp-page .svc .price {
          font-family: var(--serif);
          font-size: 28px;
          color: var(--pine);
          font-weight: 600;
        }
        .dev-bp-page .svc .price-conv {
          font-size: 12.5px;
          color: var(--ink-soft);
          margin-bottom: 18px;
        }
        .dev-bp-page .svc .desc {
          font-size: 15px;
          color: var(--ink-soft);
          max-width: 440px;
          margin-bottom: 20px;
          line-height: 1.6;
        }
        .dev-bp-page .svc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 22px;
        }
        .dev-bp-page .svc-tags span {
          font-size: 11.5px;
          font-family: var(--mono);
          border: 1px solid var(--paper-line);
          padding: 4px 9px;
          color: var(--ink-soft);
        }
        .dev-bp-page .svc-includes {
          list-style: none;
          font-size: 13.5px;
          color: var(--ink-soft);
          columns: 2;
          column-gap: 24px;
          margin-bottom: 24px;
        }
        .dev-bp-page .svc-includes li {
          padding: 5px 0;
          break-inside: avoid;
          display: flex;
          gap: 8px;
        }
        .dev-bp-page .svc-includes li::before {
          content: "—";
          color: var(--pine);
          flex-shrink: 0;
        }
        .dev-bp-page .svc-foot {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        .dev-bp-page .svc-time {
          font-family: var(--mono);
          font-size: 11.5px;
          color: var(--ink-soft);
        }
        .dev-bp-page .svc.feat {
          position: relative;
        }
        .dev-bp-page .svc.feat::before {
          content: "THE SIGNATURE BUILD";
          position: absolute;
          top: 0;
          right: 24px;
          background: var(--pine);
          color: var(--paper);
          font-family: var(--mono);
          font-size: 10.5px;
          letter-spacing: 0.06em;
          padding: 5px 10px;
          transform: translateY(-50%);
        }

        /* ── LOGO MARQUEE & SOCIAL PROOF STYLES ── */
        .bp-logo-marquee-section { background: var(--ink); color: var(--paper); padding: 48px 0; overflow: hidden; width: 100%; }
        .bp-marquee-title { font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(255,255,255,0.4); text-align: center; margin-bottom: 28px; }
        .bp-marquee-row { overflow: hidden; margin-bottom: 12px; width: 100%; }
        .bp-marquee-track { display: flex; gap: 40px; align-items: center; white-space: nowrap; animation: bp-scrollMarquee 22s linear infinite; }
        .bp-marquee-track.rtl { animation-direction: reverse; }
        .bp-marquee-track.slow { animation-duration: 30s; }
        .bp-marquee-track.fast { animation-duration: 16s; }
        .bp-marquee-item { flex-shrink: 0; display: flex; align-items: center; height: 32px; }
        .bp-marquee-item img { height: 28px; width: auto; opacity: 0.75; filter: grayscale(100%) brightness(180%); transition: opacity 0.2s, filter 0.2s; }
        .bp-marquee-item img:hover { opacity: 1; filter: grayscale(0%) brightness(100%); }
        @keyframes bp-scrollMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        .bp-sp-section { background: var(--ink); padding: 80px 0; overflow: hidden; }
        .bp-sp-head { margin-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.10); padding-bottom: 28px; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; }
        .bp-sp-row { margin-bottom: 48px; }
        .bp-sp-row:last-child { margin-bottom: 0; }
        .bp-sp-row-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .bp-sp-row-title { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #7FB89F; letter-spacing: 0.08em; text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
        .bp-sp-row-title::before { content: ''; width: 6px; height: 6px; background: #7FB89F; border-radius: 50%; display: inline-block; }
        .bp-sp-slider { display: flex; gap: 16px; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; scroll-behavior: smooth; padding-bottom: 16px; margin-bottom: -16px; -webkit-overflow-scrolling: touch; scrollbar-width: thin; scrollbar-color: rgba(127,184,159,0.3) rgba(255,255,255,0.05); }
        .bp-sp-slider::-webkit-scrollbar { height: 4px; }
        .bp-sp-slider::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 2px; }
        .bp-sp-slider::-webkit-scrollbar-thumb { background: rgba(127,184,159,0.3); border-radius: 2px; }
        .bp-sp-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius); flex-shrink: 0; scroll-snap-align: start; }
        .bp-sp-wa-img-card { width: 280px; padding: 14px; }
        .bp-sp-wa-img-header { display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: #7FB89F; margin-bottom: 10px; }
        .bp-sp-wa-img-body { width: 100%; border-radius: 2px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); aspect-ratio: 3/4; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; }
        .bp-sp-wa-img-body img { width: 100%; height: 100%; object-fit: contain; }
        .bp-sp-video-card.vert { width: 260px; padding: 14px; }
        .bp-sp-video-frame { position: relative; width: 100%; aspect-ratio: 9/16; border-radius: 2px; overflow: hidden; background: #000; margin-bottom: 12px; }
        .bp-sp-video-foot { display: flex; align-items: center; gap: 10px; }
        .bp-sp-vav { width: 32px; height: 32px; border-radius: 50%; background: var(--pine); color: var(--paper); display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 13px; font-weight: 600; flex-shrink: 0; }
        .bp-sp-vname { font-size: 13.5px; font-weight: 600; color: #fff; }
        .bp-sp-vrole { font-size: 11.5px; color: #8B8571; }
        .bp-sp-wa-marquee-wrap { overflow: hidden; width: 100%; }
        .bp-sp-wa-marquee-track { display: flex; gap: 16px; width: max-content; animation: bp-sp-marquee 40s linear infinite; }
        .bp-sp-wa-marquee-track:hover { animation-play-state: paused; }
        @keyframes bp-sp-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .bp-sp-quote-card { width: 340px; padding: 24px; }
        .bp-sp-stars { color: #E5A93C; font-size: 13px; margin-bottom: 8px; }
        .bp-sp-qs { font-family: 'Fraunces', serif; font-size: 32px; color: #7FB89F; line-height: 1; display: block; margin-bottom: -10px; }
        .bp-sp-quote-card blockquote { font-size: 13.5px; color: #D5D0C3; line-height: 1.55; margin-bottom: 16px; font-style: normal; }
        .bp-sp-quote-who { display: flex; align-items: center; gap: 10px; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 12px; }
        .bp-sp-quote-av { width: 28px; height: 28px; border-radius: 50%; background: var(--pine); color: var(--paper); display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 12px; font-weight: 600; }
        .bp-sp-qname { font-size: 13px; font-weight: 600; color: #fff; }
        .bp-sp-qrole { font-size: 11px; color: #8B8571; }
        .bp-sp-badge { margin-top: 36px; border: 1px solid rgba(255,255,255,0.12); padding: 16px 24px; background: rgba(255,255,255,0.03); border-radius: 2px; display: flex; justify-content: space-between; align-items: center; flex-wrap: nowrap; gap: 20px; width: 100%; box-sizing: border-box; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; }
        .bp-sp-badge::-webkit-scrollbar { display: none; }
        .bp-sp-badge-left { display: flex; align-items: center; gap: 10px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #7FB89F; white-space: nowrap; flex-shrink: 0; letter-spacing: 0.05em; }
        .bp-sp-dot { width: 7px; height: 7px; border-radius: 50%; background: #7FB89F; animation: bp-pulse 1.6s infinite; flex-shrink: 0; }
        .bp-sp-badge-stats { display: flex; align-items: center; gap: 28px; flex-shrink: 0; white-space: nowrap; }
        .bp-sp-stat-item { display: flex; flex-direction: column; align-items: flex-end; justify-content: center; flex-shrink: 0; }
        .bp-sp-stat-num { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 600; color: #fff; line-height: 1; margin-bottom: 3px; }
        .bp-sp-stat-lbl { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #8B8571; letter-spacing: 0.06em; }

        /* Demo Panels */
        .dev-bp-page .demo-panel {
          border: 1px solid var(--ink);
          background-color: var(--paper);
          overflow: hidden;
        }
        .dev-bp-page .demo-toolbar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-bottom: 1px solid var(--ink);
          background-color: var(--card);
        }
        .dev-bp-page .demo-toolbar .dots {
          display: flex;
          gap: 5px;
        }
        .dev-bp-page .demo-toolbar .dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--paper-line);
        }
        .dev-bp-page .demo-toolbar .url {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--ink-soft);
          margin-left: 8px;
        }
        .dev-bp-page .demo-body {
          padding: 20px;
          min-height: 280px;
          position: relative;
        }
        .dev-bp-page .demo-toggle {
          display: flex;
          border: 1px solid var(--ink);
          margin-bottom: 16px;
          font-family: var(--mono);
          font-size: 11px;
          text-transform: uppercase;
        }
        .dev-bp-page .demo-toggle button {
          flex: 1;
          padding: 9px;
          background-color: var(--card);
          cursor: pointer;
          border: none;
          color: var(--ink-soft);
          font-family: var(--mono);
          letter-spacing: 0.02em;
        }
        .dev-bp-page .demo-toggle button.on {
          background: var(--pine);
          color: var(--paper);
        }

        /* Commerce mockup */
        .dev-bp-page .pp-mock {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .dev-bp-page .pp-img {
          aspect-ratio: 4/5;
          background: linear-gradient(135deg, #d8d2c1, #c3bda9);
          border: 1px solid var(--paper-line);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--mono);
          font-size: 10px;
          color: var(--ink-soft);
          text-align: center;
          padding: 8px;
        }
        .dev-bp-page .pp-info .t1 {
          height: 10px;
          background: var(--paper-line);
          width: 70%;
          margin-bottom: 10px;
        }
        .dev-bp-page .pp-info .t2 {
          height: 8px;
          background: var(--paper-line);
          width: 40%;
          margin-bottom: 18px;
          opacity: .7;
        }
        .dev-bp-page .pp-info .badge {
          display: inline-block;
          font-family: var(--mono);
          font-size: 9.5px;
          background: var(--pine);
          color: var(--paper);
          padding: 3px 7px;
          margin-bottom: 10px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .dev-bp-page .pp-info .stars {
          font-size: 11px;
          color: var(--marker);
          margin-bottom: 14px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .dev-bp-page .pp-info .cta-btn {
          background: var(--paper-line);
          height: 34px;
          width: 80%;
          margin-top: 10px;
          transition: background 0.2s;
        }
        .dev-bp-page .pp-info .sticky-hint {
          margin-top: 14px;
          font-size: 10.5px;
          font-family: var(--mono);
          color: var(--ink-soft);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .dev-bp-page .pp-mock.improved .pp-info .badge,
        .dev-bp-page .pp-mock.improved .pp-info .stars,
        .dev-bp-page .pp-mock.improved .pp-info .sticky-hint {
          opacity: 1;
        }
        .dev-bp-page .pp-mock.improved .pp-info .cta-btn {
          background: var(--pine);
        }

        /* Experience Demo */
        .dev-bp-page .exp-demo .demo-body {
          min-height: 320px;
        }
        .dev-bp-page .exp-states {
          display: flex;
          gap: 6px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .dev-bp-page .exp-states button {
          width: 30px;
          height: 30px;
          border: 1px solid var(--ink);
          background-color: var(--card);
          font-family: var(--mono);
          font-size: 11px;
          cursor: pointer;
          color: var(--ink-soft);
        }
        .dev-bp-page .exp-states button.on {
          background: var(--pine);
          color: var(--paper);
          border-color: var(--pine);
        }
        .dev-bp-page .exp-stage {
          position: relative;
          height: 260px;
          border: 1px dashed var(--paper-line);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }
        .dev-bp-page .exp-stage .frame-obj {
          width: 60%;
          background: linear-gradient(135deg, #c8d8d0, #9fb6ab);
          aspect-ratio: 16/9;
          transition: all .5s cubic-bezier(.2,.8,.2,1);
          border: 1px solid var(--paper-line);
        }
        .dev-bp-page .exp-stage .caption {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          font-family: var(--serif);
          font-size: 15px;
          color: var(--ink);
          opacity: 0;
          transition: opacity .4s;
        }
        .dev-bp-page .exp-stage.show-caption .caption {
          opacity: 1;
        }

        /* Dashboard Demo */
        .dev-bp-page .dash-cards {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .dev-bp-page .dash-cards button {
          border: 1px solid var(--ink);
          background-color: var(--card);
          padding: 9px 14px;
          font-family: var(--mono);
          font-size: 11.5px;
          cursor: pointer;
          color: var(--ink-soft);
        }
        .dev-bp-page .dash-cards button.on {
          background: var(--pine);
          color: var(--paper);
          border-color: var(--pine);
        }
        .dev-bp-page .dash-view {
          border: 1px dashed var(--paper-line);
          padding: 22px;
          min-height: 180px;
        }
        .dev-bp-page .dash-view .metric {
          font-family: var(--serif);
          font-size: 38px;
          color: var(--pine);
          font-weight: 600;
        }
        .dev-bp-page .dash-view .metric-lbl {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--ink-soft);
          margin-top: 4px;
          text-transform: uppercase;
        }
        .dev-bp-page .dash-view .bars {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          height: 70px;
          margin-top: 20px;
        }
        .dev-bp-page .dash-view .bars div {
          flex: 1;
          background: var(--pine-soft);
          opacity: .8;
          transition: height 0.3s ease;
        }
        .dev-bp-page .dash-conclude {
          margin-top: 16px;
          font-family: var(--serif);
          font-style: italic;
          color: var(--ink-soft);
          font-size: 14px;
        }

        @media (max-width: 920px) {
          .dev-bp-page .hero-grid,
          .dev-bp-page .diag-grid,
          .dev-bp-page .svc-inner {
            grid-template-columns: 1fr;
          }
          .dev-bp-page .svc.feat::before {
            position: static;
            display: inline-block;
            transform: none;
            margin-bottom: 12px;
          }
        }

        /* Spectrum */
        .dev-bp-page .spectrum-wrap {
          padding: 20px 0 10px;
        }
        .dev-bp-page .spectrum-container {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding: 10px 0 45px;
          position: relative;
        }
        .dev-bp-page .spectrum-container::-webkit-scrollbar {
          height: 4px;
        }
        .dev-bp-page .spectrum-container::-webkit-scrollbar-track {
          background: var(--paper-deep);
          border-radius: 2px;
        }
        .dev-bp-page .spectrum-container::-webkit-scrollbar-thumb {
          background: var(--pine-soft);
          border-radius: 2px;
        }
        .dev-bp-page .spectrum-inner {
          min-width: 900px;
          padding: 0 40px;
        }
        .dev-bp-page .spectrum-line {
          position: relative;
          height: 2px;
          background: var(--paper-line);
          margin: 60px 0 55px;
        }
        .dev-bp-page .spectrum-marker {
          position: absolute;
          top: 50%;
          transform: translate(-50%,-50%);
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background-color: var(--paper);
          border: 2px solid var(--ink-soft);
        }
        .dev-bp-page .spectrum-marker.hot {
          border-color: var(--pine);
          background: var(--pine);
        }
        .dev-bp-page .spectrum-label {
          position: absolute;
          transform: translateX(-50%);
          font-size: 11px;
          font-family: var(--mono);
          color: var(--ink-soft);
          white-space: nowrap;
          text-align: center;
        }
        .dev-bp-page .spectrum-marker:nth-child(odd) .spectrum-label {
          top: 20px;
        }
        .dev-bp-page .spectrum-marker:nth-child(even) .spectrum-label {
          top: 38px;
        }
        .dev-bp-page .spectrum-ends {
          display: flex;
          justify-content: space-between;
          font-family: var(--mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ink);
        }
        .dev-bp-page .spectrum-scroll-hint {
          display: none;
          font-family: var(--mono);
          font-size: 11px;
          color: var(--marker);
          text-align: center;
          margin-bottom: 14px;
          letter-spacing: 0.04em;
        }
        @media (max-width: 768px) {
          .dev-bp-page .spectrum-scroll-hint {
            display: block;
          }
        }

        /* Decision map */
        .dev-bp-page .decision-map {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--ink);
        }
        .dev-bp-page .decision-row {
          display: grid;
          grid-template-columns: 1fr 40px 1fr;
          align-items: center;
          padding: 18px 22px;
          border-bottom: 1px dashed var(--paper-line);
          background-color: var(--card);
        }
        .dev-bp-page .decision-row:last-child {
          border-bottom: none;
        }
        .dev-bp-page .decision-row .need {
          font-size: 14.5px;
          color: var(--ink);
        }
        .dev-bp-page .decision-row .arrow {
          text-align: center;
          color: var(--pine);
          font-family: var(--mono);
        }
        .dev-bp-page .decision-row .tech {
          font-family: var(--mono);
          font-size: 13px;
          color: var(--pine-deep);
          font-weight: 600;
          text-align: right;
        }
        @media (max-width: 640px) {
          .dev-bp-page .decision-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            padding: 14px 16px;
            text-align: left;
          }
          .dev-bp-page .decision-row .arrow {
            display: none !important;
          }
          .dev-bp-page .decision-row .need {
            font-size: 13.5px;
            font-weight: 500;
            color: var(--ink);
            line-height: 1.4;
          }
          .dev-bp-page .decision-row .tech {
            text-align: left;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 13.5px;
            color: var(--pine-deep);
            font-weight: 700;
          }
          .dev-bp-page .decision-row .tech::before {
            content: '→';
            color: var(--marker, #B8412E);
            font-weight: 900;
            font-size: 16px;
          }
        }

        /* Strategy steps */
        .dev-bp-page .strategy-list {
          border-top: 1px solid var(--ink);
        }
        .dev-bp-page .strat-step {
          display: grid;
          grid-template-columns: 70px 1fr 1.4fr;
          gap: 24px;
          padding: 22px 0;
          border-bottom: 1px solid var(--ink);
        }
        .dev-bp-page .strat-step .n {
          font-family: var(--mono);
          font-size: 13px;
          color: var(--marker);
        }
        .dev-bp-page .strat-step h4 {
          font-size: 19px;
        }
        .dev-bp-page .strat-step p {
          color: var(--ink-soft);
          font-size: 14px;
        }
        @media (max-width: 700px) {
          .dev-bp-page .strat-step {
            grid-template-columns: 1fr;
            gap: 6px;
          }
        }

        /* Compare Grid - Ultra Clean Architectural 2-Column Side-by-Side */
        .dev-bp-page .compare-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 768px) {
          .dev-bp-page .compare-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
        .dev-bp-page .compare-card {
          border: 1.5px solid var(--ink);
          padding: 32px 28px;
          background: var(--paper);
          position: relative;
        }
        .dev-bp-page .compare-card.infrastructure {
          background: var(--card);
          border-color: var(--pine);
          box-shadow: 0 4px 20px rgba(36, 70, 59, 0.08);
        }
        .dev-bp-page .compare-card .card-tag {
          font-size: 11px;
          color: var(--ink-soft);
          margin-bottom: 8px;
          letter-spacing: 0.05em;
        }
        .dev-bp-page .compare-card.infrastructure .card-tag {
          color: var(--pine);
          font-weight: 600;
        }
        .dev-bp-page .compare-card h3 {
          font-family: var(--serif);
          font-size: 22px;
          margin-bottom: 20px;
          color: var(--ink);
        }
        .dev-bp-page .comp-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .dev-bp-page .comp-list li {
          padding: 10px 0;
          border-top: 1px dashed var(--paper-line);
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--ink-soft);
        }
        .dev-bp-page .compare-card.infrastructure .comp-list li {
          color: var(--ink);
          font-weight: 500;
        }
        .dev-bp-page .comp-list li:first-child {
          border-top: none;
        }
        .dev-bp-page .comp-list .x-mark {
          color: #C0392B;
          font-weight: 700;
        }
        .dev-bp-page .comp-list .check-mark {
          color: var(--pine);
          font-weight: 700;
        }

        /* Value stack */
        .dev-bp-page .value-stack {
          border: 1px solid var(--ink);
        }
        .dev-bp-page .value-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 22px;
          border-bottom: 1px dashed var(--paper-line);
          background-color: var(--card);
          font-size: 14px;
          cursor: default;
        }
        .dev-bp-page .value-row:last-child {
          border-bottom: none;
        }
        .dev-bp-page .value-row:hover {
          background-color: var(--paper);
        }
        .dev-bp-page .value-row .n {
          font-family: var(--mono);
          color: var(--ink-soft);
          font-size: 12px;
          margin-right: 14px;
        }

        /* Work Cards Grid */
        .dev-bp-page .filter-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 32px;
        }
        .dev-bp-page .ftab {
          font-size: 12.5px;
          padding: 9px 16px;
          border: 1px solid var(--ink);
          background: var(--card);
          cursor: pointer;
          font-family: var(--mono);
          letter-spacing: 0.02em;
          transition: background .15s, color .15s;
        }
        .dev-bp-page .ftab:hover {
          background: var(--paper-line);
        }
        .dev-bp-page .ftab.on {
          background: var(--pine);
          color: var(--paper);
          border-color: var(--pine);
        }
        .dev-bp-page .work-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1000px) {
          .dev-bp-page .work-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 760px) {
          .dev-bp-page .work-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .dev-bp-page .work-grid {
            grid-template-columns: 1fr;
          }
        }
        .dev-bp-page .work-card {
          border: 1px solid var(--ink);
          background-color: var(--card);
          overflow: hidden;
          transition: transform .2s, border-color .2s;
          display: block;
          text-decoration: none;
        }
        .dev-bp-page .work-card:hover {
          transform: translateY(-3px);
          border-color: var(--pine);
        }
        .dev-bp-page .work-card .img-area {
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, #d8d2c1, #c3bda9);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .dev-bp-page .work-card .img-area img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .dev-bp-page .work-card-body {
          padding: 16px;
        }
        .dev-bp-page .work-card-tag {
          font-family: var(--mono);
          font-size: 10.5px;
          color: var(--marker);
          font-weight: 600;
          letter-spacing: 0.04em;
          margin-bottom: 6px;
          text-transform: uppercase;
        }
        .dev-bp-page .work-card-title {
          font-family: var(--serif);
          font-size: 16.5px;
          color: var(--ink);
        }

        /* Testimonial */
        .dev-bp-page .testi {
          border: 1px dashed var(--ink);
          background-color: var(--card);
          padding: 40px;
          text-align: center;
        }
        .dev-bp-page .testi .mark {
          font-family: var(--serif);
          font-size: 40px;
          color: var(--paper-line);
        }
        .dev-bp-page .testi p {
          font-family: var(--serif);
          font-size: 20px;
          font-style: italic;
          color: var(--ink-soft);
          max-width: 640px;
          margin: 0 auto 16px;
        }
        .dev-bp-page .testi .who {
          font-family: var(--mono);
          font-size: 11.5px;
          color: var(--ink-soft);
          text-transform: uppercase;
        }

        /* Comparison Table */
        .dev-bp-page .comp-table-wrap {
          overflow-x: auto;
        }
        .dev-bp-page .comp-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13.5px;
          min-width: 620px;
        }
        .dev-bp-page .comp-table th, .dev-bp-page .comp-table td {
          border: 1px solid var(--paper-line);
          padding: 12px 14px;
          text-align: center;
        }
        .dev-bp-page .comp-table th {
          font-family: var(--mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          background-color: var(--card);
          color: var(--ink-soft);
        }
        .dev-bp-page .comp-table td:first-child, .dev-bp-page .comp-table th:first-child {
          text-align: left;
          font-family: var(--mono);
          font-size: 12px;
          color: var(--ink-soft);
        }
        .dev-bp-page .comp-table th.us {
          background: var(--pine);
          color: var(--paper);
        }
        .dev-bp-page .comp-table td.us {
          background: rgba(36,70,59,0.06);
          font-weight: 600;
        }
        .dev-bp-page .comp-table .yes {
          color: var(--pine);
          font-weight: 700;
        }
        .dev-bp-page .comp-table .no {
          color: var(--paper-line);
        }

        /* Estimator */
        .dev-bp-page .estimator {
          border: 1px solid var(--ink);
          background-color: var(--card);
        }
        .dev-bp-page .est-q {
          padding: 28px 32px;
          border-bottom: 1px solid var(--paper-line);
        }
        .dev-bp-page .est-q .qlabel {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--ink-soft);
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .dev-bp-page .est-opts {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .dev-bp-page .est-opts button {
          border: 1px solid var(--ink);
          background-color: var(--paper);
          padding: 10px 16px;
          font-size: 13px;
          cursor: pointer;
          font-family: var(--sans);
          transition: background .15s;
        }
        .dev-bp-page .est-opts button.on {
          background: var(--pine);
          color: var(--paper);
          border-color: var(--pine);
        }
        .dev-bp-page .est-result {
          padding: 30px 32px;
          border-top: 1px solid var(--ink);
        }
        .dev-bp-page .est-result .rlabel {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--marker);
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .dev-bp-page .est-result h3 {
          font-size: 26px;
          margin-bottom: 14px;
        }
        .dev-bp-page .est-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .dev-bp-page .est-grid .amt {
          font-family: var(--serif);
          font-size: 22px;
          color: var(--pine);
          font-weight: 600;
        }
        .dev-bp-page .est-grid .lbl {
          font-size: 11.5px;
          color: var(--ink-soft);
          font-family: var(--mono);
          text-transform: uppercase;
        }
        .dev-bp-page .est-disclaimer {
          font-size: 12.5px;
          color: var(--ink-soft);
          margin-bottom: 18px;
        }

        /* FAQ */
        .dev-bp-page .faq-item {
          border: 1px solid var(--ink);
          background-color: var(--card);
          margin-bottom: 12px;
        }
        .dev-bp-page .faq-q {
          width: 100%;
          padding: 18px 24px;
          background: transparent;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          text-align: left;
          font-family: var(--serif);
          font-size: 16.5px;
          font-weight: 600;
          color: var(--ink);
          cursor: pointer;
        }
        .dev-bp-page .faq-a {
          max-height: 0;
          overflow: hidden;
          padding: 0 24px;
          font-size: 14px;
          color: var(--ink-soft);
          line-height: 1.6;
          transition: max-height .3s ease, padding .3s ease;
        }
        .dev-bp-page .faq-item.open .faq-a {
          max-height: 240px;
          padding: 0 24px 18px;
        }
        .dev-bp-page .faq-icon {
          font-size: 18px;
          flex-shrink: 0;
          color: var(--ink-soft);
          transition: transform .2s;
          font-family: var(--mono);
        }
        .dev-bp-page .faq-item.open .faq-icon {
          transform: rotate(45deg);
        }

        /* Final CTA */
        .dev-bp-page .final-cta {
          text-align: center;
          padding: 60px 0 32px;
        }
        @media (max-width: 600px) {
          .dev-bp-page .final-cta {
            padding: 40px 0 20px;
          }
        }
        .dev-bp-page .final-cta .eyebrow {
          justify-content: center;
          display: flex;
        }
        .dev-bp-page .final-cta h2 {
          font-size: clamp(30px, 4.4vw, 54px);
          max-width: 760px;
          margin: 0 auto 18px;
        }
        .dev-bp-page .final-cta p {
          color: var(--ink-soft);
          font-size: 16px;
          max-width: 520px;
          margin: 0 auto 32px;
        }
        .dev-bp-page .final-cta .cta-row {
          justify-content: center;
        }

        /* 4-Tier Pricing Grid & Mini Card Currency Toggle */
        .dp-card-curr-toggle {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid var(--paper-line);
          padding: 2px;
          border-radius: 4px;
        }
        .dp-tier-card.featured .dp-card-curr-toggle {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
        }

        .dp-mini-curr {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 7px;
          border: none;
          background: transparent;
          color: var(--ink-soft);
          cursor: pointer;
          border-radius: 3px;
          transition: all 0.15s ease;
          line-height: 1.2;
        }
        .dp-tier-card.featured .dp-mini-curr {
          color: rgba(255, 255, 255, 0.7);
        }

        .dp-mini-curr.on {
          background: var(--pine, #24463B);
          color: #FFFFFF;
        }
        .dp-tier-card.featured .dp-mini-curr.on {
          background: #FFFFFF;
          color: #1B1B17;
        }

        /* Live Store Showcase Cards - Full Width Responsive Grid */
        .live-store-showcase {
          width: 100%;
          box-sizing: border-box;
        }
        .live-stores-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
        }
        @media (max-width: 900px) {
          .live-stores-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
        @media (max-width: 600px) {
          .live-stores-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .live-store-card {
          display: flex;
          flex-direction: column;
          border: 1.5px solid var(--ink);
          background: var(--card);
          border-radius: 2px;
          overflow: hidden;
          text-decoration: none;
          color: var(--ink);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .live-store-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(27,27,23,0.12);
          border-color: var(--pine);
        }

        .live-store-img-wrap {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
          background: #1B1B17;
        }
        @media (max-width: 600px) {
          .live-store-img-wrap {
            height: 200px;
          }
        }
        .live-store-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.35s ease;
        }
        .live-store-card:hover .live-store-img-wrap img {
          transform: scale(1.04);
        }

        .live-store-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(36, 70, 59, 0.92);
          backdrop-filter: blur(4px);
          color: #FFFFFF;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 2px;
          border: 1px solid rgba(255,255,255,0.25);
          letter-spacing: 0.05em;
        }

        .live-store-info {
          padding: 12px 14px;
          background: var(--card);
          border-top: 1px solid var(--paper-line);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .live-store-info h5 {
          font-family: 'Fraunces', serif;
          font-size: 15px;
          font-weight: 700;
          margin: 0 0 2px 0;
          color: var(--ink);
          line-height: 1.2;
        }
        .live-store-info .sub-desc {
          display: block;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          color: var(--ink-soft);
        }
        .live-store-info .link-text {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: var(--pine);
          font-weight: 700;
          white-space: nowrap;
        }

        .dev-pricing-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          width: 100%;
          align-items: stretch;
        }
        @media (max-width: 1100px) {
          .dev-pricing-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
        @media (max-width: 640px) {
          .dev-pricing-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .dp-tier-card {
          border: 1.5px solid var(--ink);
          background: var(--card);
          padding: 28px 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 2px;
          position: relative;
          box-sizing: border-box;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .dp-tier-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(27,27,23,0.08);
        }
        .dp-tier-card.featured {
          background: var(--pine, #24463B);
          color: #FFFFFF;
          border-color: var(--ink);
          padding-top: 36px;
        }

        .dp-rec-badge {
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          background: var(--marker, #B8412E);
          color: #FFFFFF;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 5px 10px;
          text-align: center;
        }

        .dp-target {
          font-size: 13px;
          color: var(--ink-soft);
          line-height: 1.45;
          margin-bottom: 14px;
          min-height: 38px;
        }
        .dp-tier-card.featured .dp-target {
          color: rgba(255,255,255,0.78);
        }

        .dp-title {
          font-family: 'Fraunces', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 16px;
          line-height: 1.25;
          min-height: 54px;
        }
        .dp-tier-card.featured .dp-title {
          color: #FFFFFF;
        }

        .dp-price {
          font-family: 'Fraunces', serif;
          font-size: 36px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 4px;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .dp-tier-card.featured .dp-price {
          color: #FFFFFF;
        }

        .dp-sub {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ink-soft);
          margin-bottom: 24px;
          min-height: 28px;
          display: flex;
          align-items: center;
        }
        .dp-tier-card.featured .dp-sub {
          color: rgba(255,255,255,0.7);
        }

        .dp-features {
          list-style: none;
          padding: 0;
          margin: 0 0 24px 0;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .dp-features li {
          padding: 11px 0;
          border-bottom: 1px dashed var(--paper-line);
          font-size: 13.5px;
          color: var(--ink);
          line-height: 1.4;
        }
        .dp-tier-card.featured .dp-features li {
          border-bottom-color: rgba(255,255,255,0.18);
          color: #FFFFFF;
        }

        .dp-btn {
          width: 100%;
          padding: 13px 16px;
          background: var(--paper, #EFEBE2);
          border: 1.5px solid var(--ink);
          color: var(--ink);
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 2px;
          text-align: center;
        }
        .dp-btn:hover {
          background: var(--ink);
          color: #FFFFFF;
        }
        .dp-tier-card.featured .dp-btn {
          background: #FFFFFF;
          border-color: #FFFFFF;
          color: #1B1B17;
        }
        .dp-tier-card.featured .dp-btn:hover {
          background: var(--paper);
          color: #1B1B17;
          transform: translateY(-1px);
        }

        .dp-examples {
          margin-top: 10px;
          font-size: 11.5px;
          color: var(--ink-soft);
          font-family: 'IBM Plex Mono', monospace;
          line-height: 1.4;
        }
        .dp-examples u {
          text-decoration: underline;
          cursor: default;
        }

        /* Sticky CTA Bottom Bar Mobile */
        .dev-bp-page .sticky-cta {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 500;
          background: var(--ink);
          padding: 9px 14px;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          border-top: 1px solid #000;
        }
        .dev-bp-page .sticky-cta .txt {
          color: #fff;
          font-size: 11.5px;
          line-height: 1.2;
        }
        .dev-bp-page .sticky-cta .txt b {
          display: block;
          font-size: 13px;
        }
        .dev-bp-page .sticky-cta a {
          background: var(--paper);
          color: var(--ink);
          padding: 0 14px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12.5px;
          font-weight: 600;
          border-radius: var(--radius);
          white-space: nowrap;
          text-decoration: none;
        }
        @media (max-width: 700px) {
          .dev-bp-page .sticky-cta {
            display: flex;
          }
          body {
            padding-bottom: 56px;
          }
        }

        /* Lead Modal Overlay */
        .dev-bp-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(23,48,40,0.55);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .dev-bp-modal-box {
          background-color: var(--paper);
          border: 1px solid var(--ink);
          max-width: 560px;
          width: 100%;
          max-height: 88vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
        }
        .dev-bp-modal-close {
          position: absolute;
          top: 14px;
          right: 16px;
          font-size: 20px;
          cursor: pointer;
          color: var(--ink-soft);
          background: none;
          border: none;
        }
        .dev-bp-modal-head {
          padding: 24px 28px 0;
        }
        .dev-bp-modal-progress {
          display: flex;
          gap: 4px;
          margin-bottom: 18px;
        }
        .dev-bp-modal-progress span {
          flex: 1;
          height: 3px;
          background: var(--paper-line);
          transition: background 0.2s;
        }
        .dev-bp-modal-progress span.done {
          background: var(--pine);
        }
        .dev-bp-modal-step {
          padding: 0 28px 28px;
        }
        .dev-bp-modal-step h4 {
          font-size: 20px;
          margin-bottom: 16px;
        }
        .dev-bp-modal-step textarea {
          width: 100%;
          border: 1px solid var(--ink);
          background-color: var(--card);
          padding: 12px;
          font-family: var(--sans);
          font-size: 14px;
          min-height: 90px;
          resize: vertical;
        }
        .dev-bp-modal-step input[type=text],
        .dev-bp-modal-step input[type=email],
        .dev-bp-modal-step input[type=tel] {
          width: 100%;
          border: 1px solid var(--ink);
          background-color: var(--card);
          padding: 11px 12px;
          font-family: var(--sans);
          font-size: 14px;
          margin-bottom: 10px;
        }
        .dev-bp-modal-opts {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 6px;
        }
        .dev-bp-modal-opts button {
          border: 1px solid var(--ink);
          background-color: var(--card);
          padding: 11px 16px;
          font-size: 13.5px;
          cursor: pointer;
          font-family: var(--sans);
        }
        .dev-bp-modal-opts button.on {
          background: var(--pine);
          color: var(--paper);
          border-color: var(--pine);
        }
        .dev-bp-modal-nav {
          display: flex;
          justify-content: space-between;
          margin-top: 22px;
        }
        .dev-bp-modal-confirm {
          text-align: center;
          padding: 20px 0;
        }
        .dev-bp-modal-confirm h4 {
          font-size: 22px;
          margin-bottom: 10px;
        }
      ` }} />

      <main className="dev-bp-page">
        {/* ============ HERO ============ */}
        <section className="hero">
          <div className="wrap">
            <div className="crumb">
              <Link to="/services">Services</Link>
              <span className="sep">›</span>
              <span className="cur">Website Design &amp; Development</span>
            </div>

            <div className="sheet-label">
              <span className="tag">SHEET NO. 05 — WEB DESIGN &amp; DEV</span>
              <span className="rule"></span>
              <span className="scale">SCALE 1:1</span>
            </div>

            <h1>
              Your website shouldn't just exist.<br />
              It should{' '}
              <span className="cycle-wrap">
                <span
                  className="cycle-word"
                  style={{
                    opacity: cycleFading ? 0 : 1,
                    transform: cycleFading ? 'translateY(6px)' : 'translateY(0)'
                  }}
                >
                  {cycleWords[cycleIdx]}
                </span>
              </span>
            </h1>

            <div className="hero-grid">
              <div className="hero-copy">
                <p className="desc">
                  We design and develop digital experiences for businesses that have outgrown templates — from high-converting Shopify stores and immersive brand websites to custom platforms, dashboards and web applications.
                </p>
                <div className="cta-row">
                  <button className="btn-primary" onClick={() => openLeadModal('')}>
                    Discuss your website →
                  </button>
                  <a className="btn-link" href="#diagnostic">
                    Find the right build for you ↓
                  </a>
                  <a className="btn-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    Prefer WhatsApp for discussion →
                  </a>
                </div>
                <div className="dev-price-blocks">
                  <div className="dev-price-chip">
                    <span className="dev-chip-label">Shopify Builds</span>
                    <span className="dev-chip-price">Fixed at <b>$1,200</b> · £889 <span className="inr-sub">(₹1,14,156)</span></span>
                  </div>
                  <div className="dev-price-chip">
                    <span className="dev-chip-label">Custom Builds</span>
                    <span className="dev-chip-price">Fixed at <b>$1,500</b> · £1,111 <span className="inr-sub">(₹1,42,695)</span></span>
                  </div>
                </div>
              </div>

              <div>
                <div className="annot-card">
                  <div className="corner"></div>
                  <div className="annot-title">HOW WE THINK ABOUT A BUILD</div>
                  <div className="annot-row"><span>Starts with</span><span>The business problem</span></div>
                  <div className="annot-row"><span>Then</span><span>Who takes the action</span></div>
                  <div className="annot-row"><span>Then</span><span>The journey to get there</span></div>
                  <div className="annot-row"><span>Technology arrives</span><span>Last, not first</span></div>
                </div>

                {/* Featured Sonar SaaS Platform Showcase */}
                <div className="sonar-card">
                  <div className="simg">
                    <img src="https://framerusercontent.com/images/uDdH4r3dDH0e0oPRnTJg7WFpE.webp?width=1685&height=1360" alt="Sonar SaaS platform website" />
                  </div>
                  <div className="sbody">
                    <div className="stag">FEATURED — SONAR, SAAS PLATFORM</div>
                    <h4 style={{ fontSize: '15px', marginBottom: '4px' }}>Clean, responsive site</h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)', marginBottom: '10px' }}>
                      Drove 70% more client inquiries after launch.
                    </p>
                    <Link to="/work/seneca-shopify-development" className="btn-link" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--pine)' }}>
                      Explore Case Study →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll-Linked Blueprint Layer Strip */}
            <div className="layer-strip">
              {['STRATEGY', 'STRUCTURE', 'EXPERIENCE', 'INTERFACE', 'TECHNOLOGY', 'LAUNCH', 'GROWTH'].map((layerName, idx) => (
                <div
                  key={idx}
                  className={`layer ${activeLayer === idx ? 'active' : ''}`}
                  onClick={() => setActiveLayer(idx)}
                >
                  <div className="dot"></div>
                  {layerName}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOGOS MARQUEE SECTION ─────────────── */}
        <section className="bp-logo-marquee-section">
          <div className="bp-marquee-title">TRUSTED BY AMBITIOUS BRANDS GLOBAL</div>
          
          {/* Row 1 (LTR) */}
          <div className="bp-marquee-row">
            <div className="bp-marquee-track fast">
              {row1Logos.concat(row1Logos).map((logoUrl, i) => (
                <div key={i} className="bp-marquee-item">
                  <img src={logoUrl} alt={`Brand logo ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 (RTL) */}
          <div className="bp-marquee-row">
            <div className="bp-marquee-track rtl">
              {row2Logos.concat(row2Logos).map((logoUrl, i) => (
                <div key={i} className="bp-marquee-item">
                  <img src={logoUrl} alt={`Brand logo ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 3 (LTR) */}
          <div className="bp-marquee-row">
            <div className="bp-marquee-track slow">
              {row3Logos.concat(row3Logos).map((logoUrl, i) => (
                <div key={i} className="bp-marquee-item">
                  <img src={logoUrl} alt={`Brand logo ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ DIAGNOSTIC ============ */}
        <section className="diagnostic" id="diagnostic">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">START HERE</div>
                <h2>What does your website actually need to do?</h2>
              </div>
              <p>Not every business needs the same website. Tell us what you're building.</p>
            </div>

            <div className="diag-grid">
              <div className="diag-options">
                {[
                  { key: 'commerce', label: 'Sell products' },
                  { key: 'experience', label: 'Tell our brand story' },
                  { key: 'experience', label: 'Create an immersive experience' },
                  { key: 'commerce', label: 'Generate high-value leads' },
                  { key: 'systems', label: 'Build a customer portal' },
                  { key: 'systems', label: 'Build a dashboard' },
                  { key: 'systems', label: 'Build a SaaS product' },
                  { key: 'systems', label: 'Automate an internal process' }
                ].map((opt, i) => (
                  <button
                    key={i}
                    className={`diag-opt ${selectedDiag === opt.key ? 'sel' : ''}`}
                    onClick={() => setSelectedDiag(opt.key)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="diag-result">
                {selectedDiag ? (
                  <div>
                    <div className="rec-tag">{diagData[selectedDiag].tag}</div>
                    <h3>{diagData[selectedDiag].title}</h3>
                    <p className="rec-desc">{diagData[selectedDiag].desc}</p>
                    <div className="rec-price">{diagData[selectedDiag].price}</div>
                    <button className="btn-primary" onClick={() => openLeadModal(diagData[selectedDiag].title)}>
                      Talk about this build →
                    </button>
                  </div>
                ) : (
                  <span className="placeholder">Select what you're building — we'll point you to the right engagement model.</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============ THREE WAYS WE BUILD ============ */}
        <section id="services">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">THREE WAYS WE BUILD</div>
                <h2>Different businesses need different kinds of digital infrastructure.</h2>
              </div>
              <p>Choose based on what the website needs to accomplish — not the technology you think you need.</p>
            </div>
          </div>

          <div className="services-stack">
            {/* COMMERCE */}
            <div className="svc" id="commerce">
              <div className="wrap svc-inner">
                <div>
                  <div className="svc-label">01 / COMMERCE</div>
                  <h3>Shopify &amp; E-Commerce</h3>
                  <p className="tagline">Turn browsing into buying.</p>
                  <div className="price">$1,200 <span style={{ fontSize: '15px', color: 'var(--ink-soft)' }}>(£889 · ₹1,14,156)</span></div>
                  <div className="price-conv">FIXED PRICE · UP TO 50 SKUs</div>
                  <p className="desc">For consumer brands ready to replace a generic storefront with a considered shopping experience.</p>
                  <div className="svc-tags">
                    <span>Fashion</span><span>Beauty</span><span>F&amp;B</span><span>Jewellery</span><span>DTC</span><span>Home</span>
                  </div>
                  <ul className="svc-includes">
                    <li>UX strategy</li><li>Custom UI design</li><li>Shopify development</li><li>Collection architecture</li>
                    <li>Product page system</li><li>Cart experience</li><li>Mobile-first build</li><li>Payment &amp; shipping setup</li>
                    <li>Technical SEO basics</li><li>Analytics integration</li><li>QA across devices</li><li>Launch support</li>
                  </ul>
                  <div className="svc-foot">
                    <button className="btn-primary" onClick={() => openLeadModal('Shopify / E-Commerce')}>
                      Build my store →
                    </button>
                    <span className="svc-time">3–5 weeks</span>
                  </div>
                </div>

                <div className="demo-panel" style={{ background: 'var(--card)', border: '1px solid var(--ink)', padding: '20px', borderRadius: '2px' }}>
                  <div className="demo-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--paper-line)', flexWrap: 'wrap', gap: '8px' }}>
                    <div className="dots" style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56', display: 'inline-block' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F', display: 'inline-block' }}></span>
                    </div>
                    <div className="url" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11.5px', color: 'var(--ink-soft)', wordBreak: 'break-all' }}>
                      {commercePp === 'standard' ? 'yourbrand.com/products/standard-store' : 'yourbrand.com/products/drawingboard-experience'}
                    </div>
                  </div>

                  <div className="demo-body">
                    <div className="demo-toggle" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                      <button
                        type="button"
                        className={commercePp === 'standard' ? 'on' : ''}
                        onClick={() => setCommercePp('standard')}
                        style={{
                          padding: '10px 8px',
                          fontSize: 'clamp(10px, 2.7vw, 12px)',
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontWeight: 600,
                          border: '1px solid var(--ink)',
                          background: commercePp === 'standard' ? 'var(--pine)' : 'var(--paper)',
                          color: commercePp === 'standard' ? '#FFF' : 'var(--ink)',
                          cursor: 'pointer',
                          borderRadius: '2px',
                          transition: 'all 0.2s ease',
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        Standard Build
                      </button>
                      <button
                        type="button"
                        className={commercePp === 'improved' ? 'on' : ''}
                        onClick={() => setCommercePp('improved')}
                        style={{
                          padding: '10px 8px',
                          fontSize: 'clamp(10px, 2.7vw, 12px)',
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontWeight: 600,
                          border: '1px solid var(--ink)',
                          background: commercePp === 'improved' ? 'var(--pine)' : 'var(--paper)',
                          color: commercePp === 'improved' ? '#FFF' : 'var(--ink)',
                          cursor: 'pointer',
                          borderRadius: '2px',
                          transition: 'all 0.2s ease',
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        Drawing Board Build
                      </button>
                    </div>

                    {/* Active Full View Frame — Clean White Background & Responsive Contain */}
                    <div
                      className="shopify-active-frame"
                      style={{
                        width: '100%',
                        border: '1px solid var(--ink)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        background: '#FFFFFF',
                        padding: '16px',
                        boxShadow: 'inset 0 0 0 1px var(--paper-line)'
                      }}
                    >
                      <img
                        src={commercePp === 'standard' ? '/images/development/shopify_store_01.png' : '/images/development/immersive_ui_01.jpeg'}
                        alt={commercePp === 'standard' ? 'Standard Shopify Store Build' : 'Drawing Board High-Conversion Shopify Experience'}
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '440px',
                          objectFit: 'contain',
                          display: 'block',
                          margin: '0 auto'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Full-Width 3 Live Shopify Store Cards Showcase */}
              <div className="wrap">
                <div className="live-store-showcase" style={{ marginTop: '36px', paddingTop: '28px', borderTop: '1.5px dashed var(--paper-line)' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '16px', letterSpacing: '0.05em' }}>
                    [ RECENT SHOPIFY STORES DEVELOPED BY US ]
                  </div>
                  <div className="live-stores-grid">
                    <a href="https://shaktimat.ca/" target="_blank" rel="noopener noreferrer" className="live-store-card">
                      <div className="live-store-img-wrap">
                        <img src="/images/live-stores/shaktimat_mobile.png" alt="Shaktimat Shopify Build" loading="lazy" />
                        <span className="live-store-badge">LIVE ↗</span>
                      </div>
                      <div className="live-store-info">
                        <div>
                          <h5>Shaktimat</h5>
                          <span className="sub-desc">Wellness &amp; Health E-Commerce</span>
                        </div>
                        <span className="mono link-text">shaktimat.ca ↗</span>
                      </div>
                    </a>

                    <a href="https://suta.in/" target="_blank" rel="noopener noreferrer" className="live-store-card">
                      <div className="live-store-img-wrap">
                        <img src="/images/live-stores/suta_mobile.png" alt="Suta Shopify Build" loading="lazy" />
                        <span className="live-store-badge">LIVE ↗</span>
                      </div>
                      <div className="live-store-info">
                        <div>
                          <h5>Suta</h5>
                          <span className="sub-desc">Fashion &amp; Apparel Storefront</span>
                        </div>
                        <span className="mono link-text">suta.in ↗</span>
                      </div>
                    </a>

                    <a href="https://www.arata.in/" target="_blank" rel="noopener noreferrer" className="live-store-card">
                      <div className="live-store-img-wrap">
                        <img src="/images/live-stores/arata_mobile.png" alt="Arata Shopify Build" loading="lazy" />
                        <span className="live-store-badge">LIVE ↗</span>
                      </div>
                      <div className="live-store-info">
                        <div>
                          <h5>Arata</h5>
                          <span className="sub-desc">Personal Care &amp; Beauty Brand</span>
                        </div>
                        <span className="mono link-text">arata.in ↗</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* EXPERIENCE */}
            <div className="svc feat" id="experience">
              <div className="wrap svc-inner">
                <div>
                  <div className="svc-label">02 / EXPERIENCE</div>
                  <h3>Immersive &amp; Interactive Websites</h3>
                  <p className="tagline">A website people remember after they close the tab.</p>
                  <div className="price">$1,500 <span style={{ fontSize: '15px', color: 'var(--ink-soft)' }}>(£1,111 · ₹1,42,695)</span></div>
                  <div className="price-conv">FIXED PRICE · UP TO 10 PAGES</div>
                  <p className="desc">For brands where experience itself is part of the product — built with the level of craft you'd expect from award-calibre digital work.</p>
                  <div className="svc-tags">
                    <span>Real Estate</span><span>Hospitality</span><span>Luxury</span><span>Automotive</span><span>Launches</span>
                  </div>
                  <ul className="svc-includes">
                    <li>Scroll-triggered storytelling</li><li>Cinematic transitions</li><li>Pinned &amp; parallax sections</li>
                    <li>Cursor interactions</li><li>Kinetic typography</li><li>Image sequencing</li>
                    <li>WebGL / Three.js where justified</li><li>Performance optimisation</li>
                  </ul>
                  <div className="svc-foot">
                    <button className="btn-primary" onClick={() => openLeadModal('Immersive Website')}>
                      Create an experience →
                    </button>
                    <span className="svc-time">4–7 weeks</span>
                  </div>
                </div>

                <div className="demo-panel exp-demo" style={{ background: 'var(--card)', border: '1px solid var(--ink)', padding: '20px', borderRadius: '2px' }}>
                  <div className="demo-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--paper-line)', flexWrap: 'wrap', gap: '8px' }}>
                    <div className="dots" style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56', display: 'inline-block' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F', display: 'inline-block' }}></span>
                    </div>
                    <div className="url" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11.5px', color: 'var(--ink-soft)', wordBreak: 'break-all' }}>
                      yourbrand.com — interactive UI &amp; scroll states
                    </div>
                  </div>

                  <div className="demo-body">
                    {/* Immersive Video Browser Frame */}
                    <div
                      className="exp-video-frame"
                      style={{
                        width: '100%',
                        border: '1px solid var(--ink)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        background: '#FFFFFF',
                        padding: '12px',
                        boxShadow: 'inset 0 0 0 1px var(--paper-line)'
                      }}
                    >
                      <video
                        src="/images/development/immersive_video.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '460px',
                          objectFit: 'contain',
                          display: 'block',
                          margin: '0 auto',
                          borderRadius: '2px'
                        }}
                      />
                    </div>
                    <p style={{ marginTop: '12px', fontSize: '12.5px', fontFamily: "'IBM Plex Mono', monospace", color: 'var(--ink-soft)', textAlign: 'center' }}>
                      ↳ Live kinetic scroll interactions &amp; interactive motion demo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SYSTEMS */}
            <div className="svc" id="systems">
              <div className="wrap svc-inner">
                <div>
                  <div className="svc-label">03 / SYSTEMS</div>
                  <h3>Custom Platforms &amp; Web Applications</h3>
                  <p className="tagline">When a website needs to think, not just display.</p>
                  <div className="price">Starting $2,800 <span style={{ fontSize: '15px', color: 'var(--ink-soft)' }}>(£2,074 · ₹2,66,364)</span></div>
                  <div className="price-conv">PER PROJECT · Custom platforms scoped individually</div>
                  <p className="desc">SaaS MVPs, customer portals, internal dashboards, booking and quotation systems, dealer and property platforms — built as custom digital systems, not template add-ons.</p>
                  <ul className="svc-includes">
                    <li>React / Next.js / TypeScript</li><li>Authentication &amp; roles</li><li>Databases &amp; APIs</li>
                    <li>Payment systems</li><li>Admin &amp; CMS panels</li><li>Third-party integrations</li>
                    <li>Cloud deployment</li><li>Analytics</li>
                  </ul>
                  <div className="svc-foot">
                    <button className="btn-primary" onClick={() => openLeadModal('Custom Platform / SaaS')}>
                      Scope a custom platform →
                    </button>
                    <span className="svc-time">6–12+ weeks</span>
                  </div>
                </div>

                <div className="demo-panel">
                  <div className="demo-toolbar">
                    <div className="dots"><span></span><span></span><span></span></div>
                    <div className="url">app.yourbusiness.com/dashboard</div>
                  </div>
                  <div className="demo-body">
                    <div className="dash-cards">
                      {['leads', 'orders', 'customers', 'revenue', 'projects', 'inventory'].map((mKey) => (
                        <button
                          key={mKey}
                          className={dashMetricKey === mKey ? 'on' : ''}
                          onClick={() => setDashMetricKey(mKey)}
                        >
                          {mKey.charAt(0).toUpperCase() + mKey.slice(1)}
                        </button>
                      ))}
                    </div>

                    <div className="dash-view">
                      <div className="metric">{dashData[dashMetricKey].metric}</div>
                      <div className="metric-lbl">{dashData[dashMetricKey].lbl}</div>
                      <div className="bars">
                        {dashData[dashMetricKey].bars.map((h, i) => (
                          <div key={i} style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                    </div>

                    <div className="dash-conclude">
                      "Sometimes the best website isn't a website. It's the system your business runs on."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SPECTRUM ============ */}
        <section>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">WEBSITE OR DIGITAL PRODUCT?</div>
                <h2>Somewhere along this line, development changes completely.</h2>
              </div>
              <p>We recommend the architecture based on the problem — not by forcing every client onto the same platform.</p>
            </div>

            <div className="spectrum-wrap">
              <div className="spectrum-scroll-hint">← Drag or swipe to explore spectrum →</div>
              <div className="spectrum-container">
                <div className="spectrum-inner">
                  <div className="spectrum-ends">
                    <span>Website</span>
                    <span>Digital Product</span>
                  </div>
                  <div className="spectrum-line">
                    <div className="spectrum-marker" style={{ left: '6%' }}><span className="spectrum-label">Landing page</span></div>
                    <div className="spectrum-marker" style={{ left: '20%' }}><span className="spectrum-label">Corporate site</span></div>
                    <div className="spectrum-marker hot" style={{ left: '36%' }}><span className="spectrum-label">E-commerce</span></div>
                    <div className="spectrum-marker hot" style={{ left: '50%' }}><span className="spectrum-label">Interactive experience</span></div>
                    <div className="spectrum-marker" style={{ left: '66%' }}><span className="spectrum-label">Customer portal</span></div>
                    <div className="spectrum-marker hot" style={{ left: '80%' }}><span className="spectrum-label">Dashboard</span></div>
                    <div className="spectrum-marker" style={{ left: '94%' }}><span className="spectrum-label">SaaS</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ TECH DECISION MAP ============ */}
        <section data-band style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">TECHNOLOGY</div>
                <h2>We choose technology after we understand the problem.</h2>
              </div>
              <p>Technology is an annotation on the plan — not the headline.</p>
            </div>

            <div className="decision-map">
              <div className="decision-row"><div className="need">Need to sell products?</div><div className="arrow">→</div><div className="tech">Shopify</div></div>
              <div className="decision-row"><div className="need">Need marketing to update content themselves?</div><div className="arrow">→</div><div className="tech">CMS / content platform</div></div>
              <div className="decision-row"><div className="need">Need cinematic storytelling?</div><div className="arrow">→</div><div className="tech">Animation / interaction stack</div></div>
              <div className="decision-row"><div className="need">Need custom functionality?</div><div className="arrow">→</div><div className="tech">React / Next.js</div></div>
              <div className="decision-row"><div className="need">Need accounts, data &amp; workflows?</div><div className="arrow">→</div><div className="tech">Custom application architecture</div></div>
              <div className="decision-row"><div className="need">Need something unusual?</div><div className="arrow">→</div><div className="tech">Let's architect it.</div></div>
            </div>
          </div>
        </section>

        {/* ============ STRATEGY ============ */}
        <section>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">HOW WE WORK</div>
                <h2>We don't open Figma on day one.</h2>
              </div>
              <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '17px', color: 'var(--ink-soft)', maxWidth: '320px' }}>
                First we figure out why someone should care.
              </p>
            </div>

            <div className="strategy-list">
              <div className="strat-step"><div className="n">01</div><h4>Business</h4><p>What needs to happen?</p></div>
              <div className="strat-step"><div className="n">02</div><h4>Audience</h4><p>Who needs to take that action?</p></div>
              <div className="strat-step"><div className="n">03</div><h4>Journey</h4><p>What do they need to understand first?</p></div>
              <div className="strat-step"><div className="n">04</div><h4>Structure</h4><p>What information belongs where?</p></div>
              <div className="strat-step"><div className="n">05</div><h4>Interface</h4><p>How should the experience behave?</p></div>
              <div className="strat-step"><div className="n">06</div><h4>Build</h4><p>What technology makes it possible?</p></div>
              <div className="strat-step"><div className="n">07</div><h4>Test</h4><p>Does it actually work?</p></div>
              <div className="strat-step"><div className="n">08</div><h4>Launch</h4><p>Ship it properly.</p></div>
            </div>
          </div>
        </section>

        {/* ============ BEFORE / AFTER COMPARISON ============ */}
        <section data-band style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">THE DIFFERENCE</div>
                <h2>Website as decoration vs. website as infrastructure.</h2>
              </div>
              <p>The difference between a website that looks nice in a mockup vs. one that drives revenue.</p>
            </div>

            <div className="compare-grid">
              <div className="compare-card decoration">
                <div className="card-tag mono">APPROACH 01</div>
                <h3>Website as decoration</h3>
                <ul className="comp-list">
                  <li><span className="x-mark">✕</span> Template-led structure</li>
                  <li><span className="x-mark">✕</span> Generic information hierarchy</li>
                  <li><span className="x-mark">✕</span> Desktop-first (broken on mobile)</li>
                  <li><span className="x-mark">✕</span> Feature dumping without focus</li>
                  <li><span className="x-mark">✕</span> Distracting, random animation</li>
                  <li><span className="x-mark">✕</span> Technology chosen before strategy</li>
                </ul>
              </div>

              <div className="compare-card infrastructure">
                <div className="card-tag mono">APPROACH 02 · THE DRAWING BOARD WAY</div>
                <h3>Website as infrastructure</h3>
                <ul className="comp-list">
                  <li><span className="check-mark">✓</span> Strategy-led foundation</li>
                  <li><span className="check-mark">✓</span> Purposeful conversion hierarchy</li>
                  <li><span className="check-mark">✓</span> Mobile-first from day one</li>
                  <li><span className="check-mark">✓</span> Clear, frictionless user journeys</li>
                  <li><span className="check-mark">✓</span> Intentional micro-interactions</li>
                  <li><span className="check-mark">✓</span> Business problem solved first</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ VALUE STACK ============ */}
        <section>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">WHAT $1,200–$2,800 (£889–£2,074 / ₹1.14L–₹2.66L) ACTUALLY BUYS</div>
                <h2>You're not paying for pages.</h2>
              </div>
              <p>You're paying for the thinking that determines what those pages need to accomplish.</p>
            </div>

            <div className="value-stack">
              <div className="value-row"><span><span className="n">01</span>Strategy</span></div>
              <div className="value-row"><span><span className="n">02</span>Information architecture</span></div>
              <div className="value-row"><span><span className="n">03</span>UX design</span></div>
              <div className="value-row"><span><span className="n">04</span>UI design</span></div>
              <div className="value-row"><span><span className="n">05</span>Prototype</span></div>
              <div className="value-row"><span><span className="n">06</span>Development</span></div>
              <div className="value-row"><span><span className="n">07</span>Responsive behaviour</span></div>
              <div className="value-row"><span><span className="n">08</span>Interactions</span></div>
              <div className="value-row"><span><span className="n">09</span>Testing</span></div>
              <div className="value-row"><span><span className="n">10</span>Performance</span></div>
              <div className="value-row"><span><span className="n">11</span>SEO foundations</span></div>
              <div className="value-row"><span><span className="n">12</span>Analytics</span></div>
              <div className="value-row"><span><span className="n">13</span>Deployment</span></div>
              <div className="value-row"><span><span className="n">14</span>Handoff</span></div>
            </div>
            <p style={{ marginTop: '20px', fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-soft)', fontSize: '15px' }}>
              Designing the homepage is only one line in the drawing.
            </p>
          </div>
        </section>

        {/* ============ SELECTED WORK (Preserving existing links & images) ============ */}
        <section data-band style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">SELECTED WORK</div>
                <h2>Live builds &amp; client websites shipped.</h2>
              </div>
              <Link to="/work" className="btn-link">View all work →</Link>
            </div>

            <div className="filter-tabs">
              <button className={`ftab ${activeCategory === 'all' ? 'on' : ''}`} onClick={() => setActiveCategory('all')}>All</button>
              <button className={`ftab ${activeCategory === 'native' ? 'on' : ''}`} onClick={() => setActiveCategory('native')}>Native Code</button>
              <button className={`ftab ${activeCategory === 'nocode' ? 'on' : ''}`} onClick={() => setActiveCategory('nocode')}>No Code</button>
              <button className={`ftab ${activeCategory === 'ecommerce' ? 'on' : ''}`} onClick={() => setActiveCategory('ecommerce')}>E-commerce</button>
            </div>

            <div className="work-grid">
              {cases.map((c, idx) => {
                if (activeCategory !== 'all' && c.cat !== activeCategory) return null;
                return (
                  <a
                    key={idx}
                    className="work-card"
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="img-area">
                      <img src={c.img} alt={c.title} loading="lazy" />
                    </div>
                    <div className="work-card-body">
                      <div className="work-card-tag">{c.label}</div>
                      <div className="work-card-title">{c.title}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL / SOCIAL PROOF SECTION (CLONED FROM BRANDING PAGE) ── */}
        <section className="bp-sp-section">
          <div className="wrap">
            <div className="bp-sp-head">
              <div>
                <div className="bp-eyebrow mono">SOCIAL PROOF</div>
                <h2>Real founders. Real results. <em>In their own words.</em></h2>
              </div>
              <div className="bp-sp-head-sub">VERIFIED FEEDBACK &amp; CASE EVIDENCE</div>
            </div>

            {/* ROW 1: WHATSAPP SCREENSHOTS HORIZONTAL SLIDER */}
            <div className="bp-sp-row">
              <div className="bp-sp-row-head">
                <div className="bp-sp-row-title">01 // WhatsApp &amp; Client Screenshots</div>
              </div>

              <div className="bp-sp-slider">
                {whatsappScreenshots.map((imgSrc, idx) => (
                  <div key={idx} className="bp-sp-wa-img-card bp-sp-card">
                    <div className="bp-sp-wa-img-header">
                      <span>WHATSAPP</span>
                      <span>VERIFIED · {idx + 1}/8</span>
                    </div>
                    <div className="bp-sp-wa-img-body">
                      <img
                        src={imgSrc}
                        alt={`WhatsApp Client Review ${idx + 1}`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2: VIDEO TESTIMONIALS */}
            <div className="bp-sp-row">
              <div className="bp-sp-row-head">
                <div className="bp-sp-row-title">02 // Client Video Testimonials</div>
              </div>

              <div className="bp-sp-slider">
                <div className="bp-sp-card bp-sp-video-card vert">
                  <div className="bp-sp-video-frame">
                    <iframe
                      src="https://player.cloudinary.com/embed/?cloud_name=vkrgr9y0&public_id=VID-20260727-WA0001_d7jsfz"
                      width="100%"
                      height="100%"
                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                      allowFullScreen
                      style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    />
                  </div>
                  <div className="bp-sp-video-foot">
                    <div className="bp-sp-vav">RJ</div>
                    <div>
                      <div className="bp-sp-vname">Rashika Jain</div>
                      <div className="bp-sp-vrole">CEO, Northbyte</div>
                    </div>
                  </div>
                </div>

                <div className="bp-sp-card bp-sp-video-card vert">
                  <div className="bp-sp-video-frame">
                    <iframe
                      src="https://player.cloudinary.com/embed/?cloud_name=vkrgr9y0&public_id=VID-20260727-WA0000_anm7wf"
                      width="100%"
                      height="100%"
                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                      allowFullScreen
                      style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    />
                  </div>
                  <div className="bp-sp-video-foot">
                    <div className="bp-sp-vav">JB</div>
                    <div>
                      <div className="bp-sp-vname">Jagriti Bansal</div>
                      <div className="bp-sp-vrole">Owner, Shiba's Bar &amp; Kitchen</div>
                    </div>
                  </div>
                </div>

                <div className="bp-sp-card bp-sp-video-card vert">
                  <div className="bp-sp-video-frame">
                    <iframe
                      src="https://player.cloudinary.com/embed/?cloud_name=vkrgr9y0&public_id=VID-20260727-WA0003_kca11r"
                      width="100%"
                      height="100%"
                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                      allowFullScreen
                      style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    />
                  </div>
                  <div className="bp-sp-video-foot">
                    <div className="bp-sp-vav">PS</div>
                    <div>
                      <div className="bp-sp-vname">Priya Sharma</div>
                      <div className="bp-sp-vrole">Founder, Lumen Fine Jewellery</div>
                    </div>
                  </div>
                </div>

                <div className="bp-sp-card bp-sp-video-card vert">
                  <div className="bp-sp-video-frame">
                    <iframe
                      src="https://player.cloudinary.com/embed/?cloud_name=vkrgr9y0&public_id=VID-20260727-WA0002_xy7yox"
                      width="100%"
                      height="100%"
                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                      allowFullScreen
                      style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    />
                  </div>
                  <div className="bp-sp-video-foot">
                    <div className="bp-sp-vav">SH</div>
                    <div>
                      <div className="bp-sp-vname">Sarah Halder</div>
                      <div className="bp-sp-vrole">Product Lead, Sonar Platform</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 3: FOUNDER QUOTES AUTO INFINITE MARQUEE */}
            <div className="bp-sp-row">
              <div className="bp-sp-row-head">
                <div className="bp-sp-row-title">03 // Founder Quotes</div>
              </div>

              <div className="bp-sp-wa-marquee-wrap">
                <div className="bp-sp-wa-marquee-track" style={{ animationDuration: '40s' }}>
                  {[...founderQuotes, ...founderQuotes].map((q, idx) => (
                    <div key={idx} className="bp-sp-card bp-sp-quote-card" style={{ flexShrink: 0 }}>
                      <div className="bp-sp-stars">★★★★★</div>
                      <span className="bp-sp-qs">"</span>
                      <blockquote>{q.text}</blockquote>
                      <div className="bp-sp-quote-who">
                        <div className="bp-sp-quote-av">{q.av}</div>
                        <div>
                          <div className="bp-sp-qname">{q.name}</div>
                          <div className="bp-sp-qrole">{q.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div className="bp-sp-badge">
              <div className="bp-sp-badge-left">
                <span className="bp-sp-dot"></span>
                <span>LIVE FEEDBACK FROM CLIENTS</span>
              </div>
              <div className="bp-sp-badge-stats">
                <div className="bp-sp-stat-item">
                  <span className="bp-sp-stat-num">40+</span>
                  <span className="bp-sp-stat-lbl">PROJECTS</span>
                </div>
                <div className="bp-sp-stat-item">
                  <span className="bp-sp-stat-num">4.9</span>
                  <span className="bp-sp-stat-lbl">AVG RATING</span>
                </div>
                <div className="bp-sp-stat-item">
                  <span className="bp-sp-stat-num">100%</span>
                  <span className="bp-sp-stat-lbl">FILE OWNERSHIP</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ COMPARISON TABLE ============ */}
        <section data-band style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">WHY NOT A TEMPLATE, FREELANCER OR LARGE AGENCY?</div>
                <h2>Studio-level thinking, specialist execution, direct communication.</h2>
              </div>
            </div>

            <div className="comp-table-wrap">
              <table className="comp-table">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Template</th>
                    <th>Freelancer</th>
                    <th>Large Agency</th>
                    <th className="us">The Drawing Board</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Strategy</td><td className="no">—</td><td className="no">Limited</td><td className="yes">Yes</td><td className="us yes">Yes</td></tr>
                  <tr><td>Custom UX</td><td className="no">—</td><td className="no">Varies</td><td className="yes">Yes</td><td className="us yes">Yes</td></tr>
                  <tr><td>Brand understanding</td><td className="no">—</td><td className="no">Varies</td><td className="yes">Yes</td><td className="us yes">Yes</td></tr>
                  <tr><td>Interaction design</td><td className="no">—</td><td className="no">Varies</td><td className="yes">Yes</td><td className="us yes">Yes</td></tr>
                  <tr><td>Founder involvement</td><td className="no">—</td><td className="yes">Yes</td><td className="no">Rare</td><td className="us yes">Yes</td></tr>
                  <tr><td>Speed</td><td className="yes">Fast</td><td className="yes">Fast</td><td className="no">Slower</td><td className="us yes">Fast</td></tr>
                  <tr><td>Ownership</td><td className="no">Varies</td><td className="yes">Yes</td><td className="yes">Yes</td><td className="us yes">Yes, fully</td></tr>
                  <tr><td>Post-launch support</td><td className="no">—</td><td className="no">Varies</td><td className="yes">Yes</td><td className="us yes">Yes</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>


        {/* ============ ESTIMATOR ============ */}
        <section id="estimatorSection">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">PROJECT ESTIMATOR</div>
                <h2>Roughly, what are we building?</h2>
              </div>
            </div>

            <div className="estimator">
              <div className="est-q">
                <div className="qlabel">01 · What do you need?</div>
                <div className="est-opts">
                  {['Shopify / E-Commerce', 'Immersive Website', 'Custom Platform'].map((opt) => (
                    <button
                      key={opt}
                      className={estState.need === opt ? 'on' : ''}
                      onClick={() => setEstState((prev) => ({ ...prev, need: opt }))}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="est-q">
                <div className="qlabel">02 · Complexity?</div>
                <div className="est-opts">
                  {['Focused', 'Advanced', 'Complex'].map((opt) => (
                    <button
                      key={opt}
                      className={estState.complexity === opt ? 'on' : ''}
                      onClick={() => setEstState((prev) => ({ ...prev, complexity: opt }))}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="est-q">
                <div className="qlabel">03 · Do you already have brand identity?</div>
                <div className="est-opts">
                  {['Yes', 'No'].map((opt) => (
                    <button
                      key={opt}
                      className={estState.brand === opt ? 'on' : ''}
                      onClick={() => setEstState((prev) => ({ ...prev, brand: opt }))}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="est-q" style={{ borderBottom: 'none' }}>
                <div className="qlabel">04 · Do you have copy / content?</div>
                <div className="est-opts">
                  {['Yes', 'Partially', 'No'].map((opt) => (
                    <button
                      key={opt}
                      className={estState.copy === opt ? 'on' : ''}
                      onClick={() => setEstState((prev) => ({ ...prev, copy: opt }))}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {estResult && (
                <div className="est-result">
                  <div className="rlabel">Likely engagement</div>
                  <h3>{estResult.title}</h3>
                  <div className="est-grid">
                    <div><div className="amt">{estResult.price}</div><div className="lbl">Starting investment</div></div>
                    <div><div className="amt">{estResult.time}</div><div className="lbl">Likely timeline</div></div>
                  </div>
                  <p className="est-disclaimer">This isn't a final quotation. It gives us a starting point.</p>
                  <button className="btn-primary" onClick={() => openLeadModal(estResult.title)}>
                    Discuss this scope →
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section data-band style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">FAQ</div>
                <h2>Common questions before starting.</h2>
              </div>
            </div>

            <div id="faqList">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                  <button
                    className="faq-q"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    {faq.q}
                    <span className="faq-icon">+</span>
                  </button>
                  <div className="faq-a">
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ MORE SERVICES ============ */}
        <MoreServicesSection current="development" />

        {/* ============ FINAL CTA ============ */}
        <section className="final-cta">
          <div className="wrap">
            <div className="eyebrow">THE DRAWING IS READY</div>
            <h2>Now let's build something worth visiting.</h2>
            <p>Tell us what your website needs to accomplish. We'll recommend the right platform, scope and level of development — even if it's different from what you initially had in mind.</p>
            <div className="cta-row">
              <button className="btn-primary" onClick={() => openLeadModal('')}>
                Start a website project →
              </button>
              <a className="btn-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                WhatsApp The Drawing Board
              </a>
            </div>
          </div>
        </section>

        {/* Sticky Mobile CTA */}
        <div className="sticky-cta">
          <div className="txt">
            Shopify, fixed at $1,200 / £889 (₹1,14,156)<b>Free 15-min call</b>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact on WhatsApp"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                minWidth: '34px',
                backgroundColor: '#25D366',
                borderRadius: '4px',
                color: '#ffffff',
                flexShrink: 0,
                padding: 0
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff" style={{ width: '20px', height: '20px', display: 'block', fill: '#ffffff' }}>
                <path
                  fill="#ffffff"
                  d="M12.031 2C6.49 2 2 6.491 2 12.029c0 1.947.558 3.766 1.523 5.308L2 22l4.823-1.46c1.512.923 3.284 1.455 5.208 1.455C17.57 22 22 17.509 22 11.97 21.999 6.491 17.57 2 12.031 2zm0 18.064c-1.745 0-3.353-.489-4.717-1.332l-.337-.21-2.817.852.868-2.656-.23-.368c-.923-1.472-1.442-3.21-1.442-5.08 0-4.992 4.062-9.052 9.06-9.052 4.998 0 9.057 4.06 9.057 9.052.001 4.997-4.06 9.058-9.042 9.058zm5.086-6.666c-.28-.14-1.649-.813-1.903-.906-.254-.093-.44-.14-.627.14-.187.28-.722.906-.886 1.093-.163.186-.328.21-.608.07-.28-.14-1.18-.435-2.247-1.385-.83-.74-1.39-1.656-1.553-1.936-.163-.28-.018-.431.122-.571.127-.126.28-.327.42-.49.14-.163.187-.28.28-.466.094-.187.047-.35-.024-.49-.07-.14-.627-1.508-.859-2.07-.226-.543-.456-.468-.627-.477-.163-.008-.35-.01-.537-.01-.187 0-.49.07-.747.35-.257.28-1.028.98-1.028 2.392s1.028 2.776 1.17 2.964c.14.186 2.019 3.084 4.89 4.324.683.295 1.218.47 1.633.602.686.218 1.31.187 1.803.114.549-.08 1.65-.675 1.884-1.326.234-.65.234-1.21.164-1.325-.07-.116-.257-.186-.537-.326z"
                />
              </svg>
            </a>
            <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">
              Book now →
            </a>
          </div>
        </div>
      </main>

      {/* ============ LEAD BRIEF MODAL OVERLAY ============ */}
      {modalOpen && (
        <div className="dev-bp-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeLeadModal(); }}>
          <div className="dev-bp-modal-box">
            <button className="dev-bp-modal-close" onClick={closeLeadModal}>✕</button>
            <div className="dev-bp-modal-head">
              <div className="dev-bp-modal-progress">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <span key={idx} className={idx <= modalStepIdx ? 'done' : ''}></span>
                ))}
              </div>
            </div>

            {/* STEP 1 */}
            {modalStepIdx === 0 && (
              <div className="dev-bp-modal-step">
                <h4>What are we building?</h4>
                <div className="dev-bp-modal-opts">
                  {['Shopify / E-Commerce', 'Immersive Website', 'Custom Platform / SaaS', 'Not sure yet'].map((opt) => (
                    <button
                      key={opt}
                      className={modalData.build === opt ? 'on' : ''}
                      onClick={() => setModalData((prev) => ({ ...prev, build: opt }))}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {modalStepIdx === 1 && (
              <div className="dev-bp-modal-step">
                <h4>What's the biggest problem with your current setup?</h4>
                <textarea
                  value={modalData.problem}
                  onChange={(e) => setModalData((prev) => ({ ...prev, problem: e.target.value }))}
                  placeholder="e.g. our site doesn't reflect the brand, or it just doesn't convert…"
                />
              </div>
            )}

            {/* STEP 3 */}
            {modalStepIdx === 2 && (
              <div className="dev-bp-modal-step">
                <h4>What stage is the business at?</h4>
                <div className="dev-bp-modal-opts">
                  {['Pre-launch', 'Recently launched', 'Growing', 'Established'].map((opt) => (
                    <button
                      key={opt}
                      className={modalData.stage === opt ? 'on' : ''}
                      onClick={() => setModalData((prev) => ({ ...prev, stage: opt }))}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {modalStepIdx === 3 && (
              <div className="dev-bp-modal-step">
                <h4>Expected investment?</h4>
                <div className="dev-bp-modal-opts">
                  {['$1,200–$1,500 (£889–£1,111 / ₹1.14L–₹1.43L)', '$1,500–$2,800 (£1,111–£2,074 / ₹1.43L–₹2.66L)', '$2,800–$6,000 (£2,074–£4,444 / ₹2.66L–₹5.71L)', '$6,000+ (£4,444+ / ₹5.71L+)', 'Need guidance'].map((opt) => (
                    <button
                      key={opt}
                      className={modalData.budget === opt ? 'on' : ''}
                      onClick={() => setModalData((prev) => ({ ...prev, budget: opt }))}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5 */}
            {modalStepIdx === 4 && (
              <div className="dev-bp-modal-step">
                <h4>When do you want to launch?</h4>
                <div className="dev-bp-modal-opts">
                  {['ASAP', 'Within 1 month', '1–3 months', '3+ months'].map((opt) => (
                    <button
                      key={opt}
                      className={modalData.timeline === opt ? 'on' : ''}
                      onClick={() => setModalData((prev) => ({ ...prev, timeline: opt }))}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6 */}
            {modalStepIdx === 5 && (
              <div className="dev-bp-modal-step">
                <h4>A few details</h4>
                <input
                  type="text"
                  placeholder="Name"
                  value={modalData.name}
                  onChange={(e) => setModalData((prev) => ({ ...prev, name: e.target.value }))}
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={modalData.company}
                  onChange={(e) => setModalData((prev) => ({ ...prev, company: e.target.value }))}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={modalData.email}
                  onChange={(e) => setModalData((prev) => ({ ...prev, email: e.target.value }))}
                />
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp"
                  value={modalData.phone}
                  onChange={(e) => setModalData((prev) => ({ ...prev, phone: e.target.value }))}
                />
                <input
                  type="text"
                  placeholder="Current website (optional)"
                  value={modalData.website}
                  onChange={(e) => setModalData((prev) => ({ ...prev, website: e.target.value }))}
                />
              </div>
            )}

            {/* CONFIRMATION STEP */}
            {modalStepIdx === 6 && (
              <div className="dev-bp-modal-step">
                <div className="dev-bp-modal-confirm">
                  <h4>Brief received. Let's see what we can build.</h4>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '14px', marginBottom: '22px' }}>
                    We'll review what you've shared and follow up to schedule a discovery call.
                  </p>
                  <a
                    className="btn-primary"
                    href="https://cal.com/dandelion-nrvrze"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book discovery call →
                  </a>
                </div>
              </div>
            )}

            {modalStepIdx < 6 && (
              <div className="dev-bp-modal-step" style={{ paddingTop: 0 }}>
                <div className="dev-bp-modal-nav">
                  <button
                    className="btn-secondary"
                    style={{ visibility: modalStepIdx === 0 ? 'hidden' : 'visible' }}
                    onClick={() => setModalStepIdx((prev) => Math.max(0, prev - 1))}
                  >
                    ← Back
                  </button>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      if (modalStepIdx === 5) {
                        trackMetaFormSubmission({
                          name: modalData.name,
                          company: modalData.company,
                          email: modalData.email,
                          phone: modalData.phone,
                          website: modalData.website,
                          build: modalData.build,
                          service: 'Development Brief'
                        });
                      }
                      setModalStepIdx((prev) => Math.min(6, prev + 1));
                    }}
                  >
                    {modalStepIdx === 5 ? 'Submit brief →' : 'Continue →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
