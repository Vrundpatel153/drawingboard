import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import MoreServicesSection from '../components/MoreServicesSection';
import { WHATSAPP_URL } from '../utils/siteConfig';

/* ─────────────────────────────────────────────────────────────────────────────
   BrandingPage — Redesign integrated with locked Testimonials, Pricing & Logos
   ───────────────────────────────────────────────────────────────────────────── */
export default function BrandingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [growthSlide, setGrowthSlide] = useState(0);
  const [scaleSlide, setScaleSlide] = useState(0);
  const [leadFormData, setLeadFormData] = useState({ email: '', brand: '', web: '', stage: '' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const growthPrices = {
    INR: '₹4,75,000/-',
    USD: '$4,960/-',
    GBP: '£3,715/-',
  };

  const scalePrices = {
    INR: '₹6,50,000/-',
    USD: '$6,780/-',
    GBP: '£5,080/-',
  };

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
      text: "The positioning work they did upfront changed everything. By the time we saw the first logo directions, everyone on our team already agreed — because the strategy made the right answer obvious.",
      name: "Arjun Mehta",
      role: "Co-founder, Sonar Platform",
      av: "A"
    },
    {
      text: "We'd worked with traditional agencies before, but the speed, clarity, and attention to typographic detail here was on an entirely different level. Worth every rupee.",
      name: "Sarah Jenkins",
      role: "Design Director, Apex Digital",
      av: "S"
    },
    {
      text: "Our packaging finally looks like it belongs on the exact same retail shelf as global brands three times our size. Our retail distributors commented on it immediately.",
      name: "Rohan Gupta",
      role: "Founder, Good Protein",
      av: "R"
    },
    {
      text: "They delivered a full design system with Figma component tokens, guidelines PDF, and print assets. Zero friction during developer handoff.",
      name: "Elena Rostova",
      role: "Brand Lead, Northbyte",
      av: "E"
    }
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
    '/logos/Group-5138-2.png',
    '/logos/Group-5139-1.png',
    '/logos/Group-5140-3.png',
    '/logos/Group-5141-3.png',
    '/logos/Group-5145.png',
    '/logos/Group-5148.png',
    '/logos/Group-6-9.png'
  ];

  const faqs = [
    { q: 'What is included in the ₹4,75,000 engagement?', a: 'The Brand-to-Shelf engagement includes strategy, positioning, messaging direction, a complete identity system, brand guidelines, one master packaging direction, front and back information hierarchy, up to five straightforward SKU adaptations, presentation mockups, print-ready artwork on approved dielines and editable source files.' },
    { q: 'What is included in the ₹6,50,000 engagement?', a: 'Brand-to-Market includes everything in Brand-to-Shelf plus website strategy, sitemap, customer journey, content hierarchy, responsive UI/UX design, an agreed page-template system, website development, testing, launch support and handover.' },
    { q: 'Can we begin with branding and packaging and add the website later?', a: 'Yes. Brand-to-Shelf can be completed first, with the website scoped as a second phase. This works especially well when product information, photography or website content will not be ready during the branding stage.' },
    { q: 'How many packaging SKUs are included?', a: 'Brand-to-Shelf includes one master packaging direction and up to five straightforward SKU adaptations using the approved structure. Additional SKUs, sizes, structures or formats are quoted separately.' },
    { q: 'What counts as a straightforward SKU adaptation?', a: 'A straightforward adaptation keeps the approved packaging structure while changing controlled elements such as flavour, ingredient, product name, colour, quantity or approved content.' },
    { q: 'Is website development included in ₹6,50,000?', a: 'Yes, within the platform, page-template system, product count and functionality defined in the proposal. Advanced applications, unusual integrations, large catalogues or custom backend requirements may require separate scope.' },
    { q: 'Which website platform will you use?', a: 'The platform is selected according to your business model. Depending on the project, this may include Shopify, Framer or another agreed platform. The recommendation is confirmed after reviewing your requirements.' },
    { q: 'Do you write the website or packaging copy?', a: 'Messaging direction, content hierarchy and key brand language are included. Full website copywriting, large product-description libraries, legal copy and regulated packaging content are separate unless explicitly included.' },
    { q: 'Do you create packaging dielines?', a: 'The standard engagement applies approved artwork to client- or manufacturer-supplied dielines. Structural engineering and technical dieline creation are not included by default.' },
    { q: 'Do you manage printing or manufacturing?', a: 'Printing and manufacturing are not included in the design fee. The studio provides artwork, finish recommendations, printer notes and handoff support.' },
    { q: 'Do you verify legal or regulatory packaging compliance?', a: 'No. We organise approved information into a clear hierarchy, but final legal, nutrition, ingredient, certification and regulatory accuracy remains the client\'s responsibility.' },
    { q: 'How many creative directions will we see?', a: 'After strategy alignment, we present one or two carefully considered creative territories rather than a large collection of unrelated options. One direction is selected and developed into the complete system.' },
    { q: 'How are revisions handled?', a: 'The proposal defines revision rounds at the strategy, creative direction, identity, packaging and website checkpoints. Feedback must be consolidated by nominated decision-makers.' },
    { q: 'Do we own the final files?', a: 'After final payment, you receive the agreed editable source files and export-ready assets. Nothing is held back or licensed to us.' },
    { q: 'What are the payment terms?', a: 'The standard structure is 50% to begin, 25% after approval of the identity and master packaging direction, and 25% before final launch and complete file handover.' },
    { q: 'How long does the project take?', a: 'Brand-to-Shelf typically takes approximately 6–8 weeks. Brand-to-Market typically takes approximately 8–12 weeks.' },
    { q: 'Can you work with an existing identity?', a: 'Yes. If the existing identity is strong enough to support the required packaging or website system, we can assess a focused scope.' },
    { q: 'Do you work with international clients?', a: 'Yes. Discovery, presentations, approvals and handover can be completed remotely.' },
    { q: 'What happens after the introductory call?', a: 'We review your business stage, product range, current brand, launch requirements and timeline. If the project is a fit, you receive a tailored proposal defining scope, deliverables, investment and exclusions.' }
  ];

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    setLeadSubmitted(true);
  };

  return (
    <>
      <RegistrationMarks />
      <Navbar />

      <style>{`
        /* ── Scoped Redesign Styles ────────────────────────────────────────── */
        .bp-hero { padding: 28px 0 56px; position: relative; }
        @media (max-width: 768px) { .bp-hero { padding: 18px 0 40px; } }
        
        .bp-sheet-label { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }
        .bp-sheet-label .tag { font-size: 12px; padding: 6px 10px; border: 1px solid var(--ink); background: var(--card); font-family: 'IBM Plex Mono', monospace; text-transform: uppercase; }
        .bp-sheet-label .rule { flex: 1; height: 1px; background: var(--ink-soft); opacity: 0.4; }
        .bp-sheet-right { font-size: 12px; color: var(--ink-soft); text-transform: uppercase; letter-spacing: 0.05em; font-family: 'IBM Plex Mono', monospace; }

        .bp-avail { display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--pine); font-family: 'IBM Plex Mono', monospace; margin-bottom: 20px; background: rgba(36,70,59,0.08); border: 1px solid rgba(36,70,59,0.2); padding: 7px 14px; border-radius: 100px; line-height: 1.4; }
        
        .bp-hero h1 { font-size: clamp(34px, 5vw, 66px); max-width: 880px; margin-bottom: 0; }
        .bp-hero h1 em { font-style: normal; color: var(--pine); }
        .bp-hero-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 56px; align-items: start; margin-top: 34px; }
        @media (max-width: 920px) { .bp-hero-grid { grid-template-columns: 1fr; } }
        .bp-hero-sub { font-size: 17.5px; color: var(--ink-soft); max-width: 540px; margin-bottom: 14px; line-height: 1.6; }
        
        .bp-cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; margin: 24px 0 14px; }
        .bp-btn-primary { background: var(--pine); color: var(--paper); padding: 15px 26px; font-size: 14.5px; font-weight: 600; border-radius: var(--radius); display: inline-flex; align-items: center; gap: 8px; transition: background .15s; text-decoration: none; }
        .bp-btn-primary:hover { background: var(--pine-deep); }
        .bp-btn-link { font-size: 14.5px; border-bottom: 1px solid currentColor; padding-bottom: 2px; color: var(--ink-soft); text-decoration: none; }
        .bp-btn-link:hover { color: var(--ink); }
        
        .bp-price-note { font-size: 13px; color: var(--ink-soft); }
        .bp-price-note b { color: var(--ink); }

        .bp-annot-card { background: var(--card); border: 1px solid var(--ink); padding: 26px; position: relative; }
        .bp-annot-card .corner { position: absolute; top: -1px; right: -1px; width: 26px; height: 26px; background: var(--marker); clip-path: polygon(0 0, 100% 0, 100% 100%); }
        .bp-annot-title { font-size: 12px; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 14px; font-family: 'IBM Plex Mono', monospace; }
        .bp-annot-row { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px dashed var(--paper-line); padding: 10px 0; font-size: 13.5px; gap: 12px; }
        .bp-annot-row:last-child { border-bottom: none; }
        .bp-annot-row span:first-child { color: var(--ink-soft); }
        .bp-annot-row span:last-child { font-weight: 500; text-align: right; }

        .bp-stat-strip { display: flex; gap: 0; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); margin-top: 48px; }
        .bp-stat { flex: 1; padding: 22px 24px; border-right: 1px solid var(--ink); }
        .bp-stat:last-child { border-right: none; }
        .bp-stat .num { font-family: 'Fraunces', serif; font-size: 34px; font-weight: 600; color: var(--pine); line-height: 1; }
        .bp-stat .lbl { font-size: 12.5px; color: var(--ink-soft); margin-top: 6px; }
        @media (max-width: 700px) { .bp-stat-strip { flex-wrap: wrap; } .bp-stat { flex: 1 1 50%; border-bottom: 1px solid var(--ink); } }

        /* Category Strip */
        .category-strip { padding: 22px 0; background: var(--card); border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); }
        .category-strip .lbl2 { font-size: 11px; color: var(--ink-soft); margin-bottom: 14px; display: block; letter-spacing: 0.06em; }
        .category-row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; font-size: 12.5px; color: var(--ink-soft); }
        .category-row span { font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.05em; padding: 6px 12px; border: 1px solid var(--paper-line); background: var(--paper); }

        /* Problem Section */
        .bp-problem-section { background: var(--ink); color: var(--paper); padding: 80px 0; }
        .bp-problem-section .bp-section-head h2 { color: var(--paper); }
        .bp-problem-section .bp-section-head p, .bp-problem-section .bp-eyebrow { color: #C9C3B4; }
        .bp-problem-copy { font-size: 18px; line-height: 1.65; color: #E7E3D8; max-width: 800px; }
        .bp-problem-copy p { margin-bottom: 16px; }
        .bp-problem-copy strong { color: #FFF; }

        /* Qualification Grid */
        .bp-qual-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 760px) { .bp-qual-grid { grid-template-columns: 1fr; } }
        .bp-qual-col { border: 1px solid var(--ink); background: var(--card); padding: 28px; }
        .bp-qual-col h4 { font-size: 18px; margin-bottom: 18px; display: flex; align-items: center; gap: 10px; }
        .bp-qual-col .mark { font-size: 18px; flex-shrink: 0; }
        .bp-qual-col.bp-yes .mark { color: var(--pine); }
        .bp-qual-col.bp-no .mark { color: var(--marker); }
        .bp-qual-col ul { list-style: none; }
        .bp-qual-col li { padding: 10px 0; border-top: 1px dashed var(--paper-line); font-size: 14px; color: var(--ink-soft); line-height: 1.45; }
        .bp-qual-col li:first-child { border-top: none; }

        /* Connected System Sequence */
        .system-sequence { display: flex; align-items: stretch; gap: 0; flex-wrap: wrap; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); background: var(--card); }
        .seq-stage { flex: 1; min-width: 170px; padding: 26px 20px; border-right: 1px dashed var(--paper-line); position: relative; }
        .seq-stage:last-child { border-right: none; }
        .seq-stage .step-n { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--marker); margin-bottom: 8px; }
        .seq-stage h4 { font-size: 16px; margin-bottom: 6px; }
        .seq-stage p { font-size: 12.5px; color: var(--ink-soft); line-height: 1.4; }
        @media (min-width: 768px) {
          .seq-stage:not(:last-child)::after { content: '→'; position: absolute; right: -12px; top: 26px; color: var(--marker); font-family: 'IBM Plex Mono', monospace; z-index: 2; }
        }
        .bp-seq-caption { margin-top: 20px; font-size: 13.5px; color: var(--ink-soft); line-height: 1.6; }
        .bp-seq-caption strong { color: var(--ink); }

        /* Case Grid */
        .case-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 900px) { .case-grid { grid-template-columns: 1fr; } }
        .case-card { border: 1px solid var(--ink); background: var(--card); overflow: hidden; transition: transform 0.2s; display: flex; flex-direction: column; }
        .case-card:hover { transform: translateY(-2px); }
        .case-card .img { aspect-ratio: 4/3; background: linear-gradient(135deg, #d8d2c1, #c3bda9); position: relative; overflow: hidden; width: 100%; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: rgba(27,27,23,0.4); text-align: center; padding: 12px; }
        .case-body { padding: 20px; display: flex; flex-direction: column; flex: 1; }
        .case-body .tag { font-size: 11px; color: var(--marker); margin-bottom: 6px; font-family: 'IBM Plex Mono', monospace; text-transform: uppercase; }
        .case-body h4 { font-size: 19px; margin-bottom: 6px; }
        .case-body p { font-size: 13.5px; color: var(--ink-soft); line-height: 1.45; }
        .case-body .sys-list { list-style: none; font-size: 12.5px; color: var(--ink-soft); margin: 14px 0; padding: 12px 0; border-top: 1px dashed var(--paper-line); border-bottom: 1px dashed var(--paper-line); }
        .case-body .sys-list li { padding: 4px 0; }
        .case-body .demo { font-size: 12px; color: var(--ink-soft); margin-top: auto; padding-top: 12px; }
        .case-body .demo b { display: block; font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: var(--marker); text-transform: uppercase; margin-bottom: 4px; }
        .bp-cases-foot { display: flex; justify-content: center; margin-top: 40px; }

        /* Think Grid */
        .think-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 900px) { .think-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .think-grid { grid-template-columns: 1fr; } }
        .think-card { border: 1px solid var(--ink); background: var(--card); }
        .think-card .img { aspect-ratio: 3/2; background: linear-gradient(135deg, #d8d2c1, #c3bda9); display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: rgba(27,27,23,0.4); text-align: center; padding: 12px; }
        .think-body { padding: 18px 20px; }
        .think-body .n { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--marker); margin-bottom: 6px; }
        .think-body h4 { font-size: 16px; margin-bottom: 6px; }
        .think-body p { font-size: 13px; color: var(--ink-soft); line-height: 1.45; }

        /* Deliverables Grid */
        .bp-deliv-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--ink); border: 1px solid var(--ink); }
        @media (max-width: 900px) { .bp-deliv-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .bp-deliv-grid { grid-template-columns: 1fr; } }
        .bp-deliv-col { background: var(--card); padding: 26px 22px; display: flex; flex-direction: column; }
        .bp-deliv-col h4 { font-size: 16px; margin-bottom: 4px; }
        .bp-deliv-col .sub { font-size: 12px; color: var(--marker); margin-bottom: 16px; font-family: 'IBM Plex Mono', monospace; }
        .bp-deliv-col ul { list-style: none; font-size: 13.5px; color: var(--ink-soft); flex: 1; }
        .bp-deliv-col li { padding: 8px 0; border-top: 1px dashed var(--paper-line); }
        .bp-deliv-col li:first-child { border-top: none; }
        .bp-deliv-col .note { font-size: 12px; color: var(--ink-soft); margin-top: 16px; padding-top: 14px; border-top: 1px dashed var(--paper-line); line-height: 1.5; }

        /* Process Steps */
        .bp-process { display: flex; gap: 0; overflow-x: auto; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); background: var(--paper); }
        .bp-pstep { flex: 1; min-width: 190px; padding: 24px 20px; border-right: 1px solid var(--ink); }
        .bp-pstep:last-child { border-right: none; }
        .bp-pstep .n { font-family: 'IBM Plex Mono', monospace; font-size: 22px; color: var(--pine); font-weight: 600; }
        .bp-pstep h4 { font-size: 17px; margin: 8px 0 6px; }
        .bp-pstep p { font-size: 13px; color: var(--ink-soft); line-height: 1.45; }
        .bp-pstep .chk { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--marker); margin-top: 10px; padding-top: 10px; border-top: 1px dashed var(--paper-line); }

        /* Comparison Table */
        .compare-wrap { overflow-x: auto; }
        .compare-table { width: 100%; border-collapse: collapse; font-size: 13.5px; min-width: 640px; }
        .compare-table th, .compare-table td { padding: 14px 18px; border: 1px solid var(--ink); text-align: left; vertical-align: top; }
        .compare-table th { background: var(--card); font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 500; }
        .compare-table th.hl, .compare-table td.hl { background: var(--pine); color: var(--paper); }
        .compare-table tr:nth-child(even) td:not(.hl) { background: rgba(239,235,226,0.5); }

        /* Guarantee / Alignment */
        .bp-guarantee { background: var(--card); border: 1px solid var(--ink); padding: 40px; display: flex; gap: 30px; align-items: flex-start; }
        @media (max-width: 700px) { .bp-guarantee { flex-direction: column; } }
        .bp-guarantee .bp-badge { width: 76px; height: 76px; border: 2px solid var(--pine); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-family: 'Fraunces', serif; font-size: 10.5px; text-align: center; color: var(--pine); line-height: 1.2; padding: 8px; font-weight: 600; text-transform: uppercase; }
        .bp-guarantee h3 { font-size: 21px; margin-bottom: 8px; }
        .bp-guarantee p { font-size: 14.5px; color: var(--ink-soft); max-width: 680px; line-height: 1.55; }

        /* Scope Boundaries */
        .scope-wrap { border: 1px solid var(--ink); background: var(--card); }
        .scope-grid { display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 760px) { .scope-grid { grid-template-columns: 1fr; } .scope-col:first-child { border-right: none !important; border-bottom: 1px solid var(--ink); } }
        .scope-col { padding: 30px 32px; }
        .scope-col:first-child { border-right: 1px solid var(--ink); }
        .scope-col h4 { font-size: 15px; margin-bottom: 16px; font-family: 'IBM Plex Mono', monospace; text-transform: uppercase; letter-spacing: 0.03em; }
        .scope-col.in h4 { color: var(--pine); }
        .scope-col.out h4 { color: var(--marker); }
        .scope-col ul { list-style: none; font-size: 13.5px; color: var(--ink-soft); }
        .scope-col li { padding: 7px 0; border-top: 1px dashed var(--paper-line); line-height: 1.4; }
        .scope-col li:first-child { border-top: none; }
        .scope-note { padding: 22px 32px; border-top: 1px solid var(--ink); font-size: 13px; color: var(--ink-soft); line-height: 1.6; }

        /* Checklist */
        .checklist { columns: 2; column-gap: 32px; list-style: none; font-size: 14px; color: var(--ink-soft); }
        .checklist li { break-inside: avoid; padding: 10px 0 10px 26px; border-top: 1px dashed var(--paper-line); position: relative; }
        .checklist li:first-child, .checklist li:nth-child(2) { border-top: none; }
        .checklist li::before { content: '—'; position: absolute; left: 0; color: var(--marker); }
        @media (max-width: 640px) { .checklist { columns: 1; } .checklist li:nth-child(2) { border-top: 1px dashed var(--paper-line); } }

        /* FAQ Accordion */
        .bp-faq-item { border: 1px solid var(--ink); background: var(--card); margin-bottom: 12px; }
        .bp-faq-q { width: 100%; padding: 18px 24px; background: transparent; border: none; display: flex; justify-content: space-between; align-items: center; gap: 16px; text-align: left; font-family: 'Fraunces', serif; font-size: 17px; font-weight: 600; color: var(--ink); cursor: pointer; }
        .bp-faq-a { padding: 0 24px 18px; font-size: 14px; color: var(--ink-soft); line-height: 1.6; }
        .bp-plus { font-size: 18px; color: var(--ink-soft); transition: transform 0.25s ease; }
        .bp-faq-item.open .bp-plus { transform: rotate(45deg); }

        /* Lead Magnet */
        .lead-magnet { background: var(--ink); color: var(--paper); padding: 80px 0; }
        .lead-magnet .bp-eyebrow { color: #C9C3B4; }
        .lead-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        @media (max-width: 860px) { .lead-grid { grid-template-columns: 1fr; } }
        .lead-grid h2 { color: var(--paper); font-size: clamp(24px,3vw,34px); margin-bottom: 12px; }
        .lead-grid > div:first-child p { color: #C9C3B4; font-size: 15px; line-height: 1.6; margin-bottom: 20px; }
        .lead-benefits { list-style: none; font-size: 13.5px; color: #E7E3D8; }
        .lead-benefits li { padding: 8px 0 8px 20px; border-top: 1px dashed rgba(255,255,255,0.15); position: relative; }
        .lead-benefits li:first-child { border-top: none; }
        .lead-benefits li::before { content: '—'; position: absolute; left: 0; color: #8EC4B3; }
        .lead-form { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); padding: 28px; }
        .lead-form .field { margin-bottom: 16px; }
        .lead-form label { display: block; font-size: 12.5px; color: #C9C3B4; margin-bottom: 6px; font-family: 'IBM Plex Mono', monospace; text-transform: uppercase; letter-spacing: 0.03em; }
        .lead-form input, .lead-form select { width: 100%; padding: 12px 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.25); color: var(--paper); font-size: 14px; border-radius: var(--radius); font-family: 'Inter', sans-serif; }
        .lead-form input::placeholder { color: rgba(255,255,255,0.4); }
        .lead-form select option { background: var(--ink); color: var(--paper); }

        .btn-outline-light { display: inline-flex; align-items: center; gap: 8px; padding: 15px 26px; border: 1.5px solid rgba(255,255,255,0.3); color: var(--paper); font-size: 14.5px; font-weight: 600; border-radius: var(--radius); transition: background 0.15s, border-color 0.15s; text-decoration: none; }
        .btn-outline-light:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.5); }

        /* Locked Social Proof Styles */
        .bp-sp-section { background: var(--ink); padding: 80px 0; overflow: hidden; }
        .bp-sp-head { margin-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.10); padding-bottom: 28px; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; }
        .bp-sp-section .bp-eyebrow { color: #C9C3B4; }
        .bp-sp-section h2 { color: #fff; font-size: clamp(24px, 3vw, 38px); max-width: 580px; margin: 0; }
        .bp-sp-section h2 em { font-style: normal; color: #7FB89F; }
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
        .bp-sp-wa-img-body { width: 100%; border-radius: 2px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); aspect-ratio: 3/4; background: rgba(0,0,0,0.3); }
        .bp-sp-wa-img-body img { width: 100%; height: 100%; object-fit: cover; }
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
        .bp-sp-badge { margin-top: 36px; border: 1px solid rgba(255,255,255,0.12); padding: 18px 24px; background: rgba(255,255,255,0.03); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
        .bp-sp-badge-left { display: flex; align-items: center; gap: 10px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #7FB89F; }
        .bp-sp-dot { width: 7px; height: 7px; border-radius: 50%; background: #7FB89F; animation: bp-pulse 1.6s infinite; }
        .bp-sp-stat-item { text-align: right; }
        .bp-sp-stat-num { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 600; color: #fff; display: block; line-height: 1; }
        .bp-sp-stat-lbl { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #8B8571; }

        /* Unified Pricing Cards Styles */
        .bp-tiers { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; align-items: stretch; }
        @media (max-width: 900px) { .bp-tiers { grid-template-columns: 1fr; } }
        .bp-tier { background: var(--card); border: 1.5px solid var(--ink); display: flex; flex-direction: column; overflow: hidden; height: 100%; border-radius: 2px; }
        .bp-tier-head { background: var(--paper); border-bottom: 1.5px solid var(--ink); padding: 26px 28px; min-height: 184px; display: flex; flex-direction: column; justify-content: space-between; }
        .bp-tier-head .name { font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-soft); margin-bottom: 4px; }
        .bp-tier-head h3 { font-size: 22px; color: var(--ink); margin-bottom: 4px; }
        .bp-tier-head .desc { font-size: 13.5px; color: var(--ink-soft); line-height: 1.45; }
        .bp-slot-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; color: var(--pine); background: rgba(36,70,59,0.08); border: 1px solid rgba(36,70,59,0.2); padding: 4px 10px; border-radius: 100px; width: fit-content; }
        .bp-slot-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--pine); animation: bp-pulse 1.6s infinite; }
        .bp-tier-price { padding: 20px 28px; border-bottom: 1.5px solid var(--ink); background: var(--card); min-height: 88px; display: flex; align-items: center; }
        .bp-tier-price .amt { font-family: 'Fraunces', serif; font-size: 36px; font-weight: 600; color: var(--pine); }
        .bp-tier-price .per { font-size: 12.5px; color: var(--ink-soft); margin-top: 2px; }
        .bp-currency-toggle { display: flex; gap: 4px; }
        .bp-curr-btn { background: transparent; border: 1px solid var(--ink); padding: 3px 8px; font-size: 10.5px; cursor: pointer; color: var(--ink); border-radius: 2px; font-family: 'IBM Plex Mono', monospace; transition: all 0.15s; }
        .bp-curr-btn.active { background: var(--ink); color: var(--paper); border-color: var(--ink); font-weight: 600; }
        .bp-deliv-bar { display: flex; justify-content: space-between; align-items: center; padding: 12px 28px; background: rgba(27,27,23,0.04); border-bottom: 1px dashed var(--paper-line); }
        .bp-tier-slide { width: 100%; flex-shrink: 0; padding: 20px 28px; min-height: 240px; display: flex; flex-direction: column; justify-content: flex-start; }
        .bp-tier-list { list-style: none; }
        .bp-tier-list li { padding: 10px 0; border-bottom: 1px dashed var(--paper-line); font-size: 13.5px; color: var(--ink-soft); line-height: 1.45; }
        .bp-tier-list li:last-child { border-bottom: none; }
        .bp-tier-foot { padding: 22px 28px; border-top: 1.5px solid var(--ink); background: var(--paper); display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-top: auto; }
        .bp-tier-btn { background: var(--pine); color: var(--paper); padding: 13px 22px; font-size: 14px; font-weight: 600; border-radius: var(--radius); text-decoration: none; transition: background 0.15s; display: inline-flex; align-items: center; }
        .bp-tier-btn:hover { background: var(--pine-deep); }
        .bp-tier-time { font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: var(--ink-soft); }

        /* Locked Logos Marquee Styles */
        .bp-logo-marquee-section { background: var(--ink); color: var(--paper); padding: 48px 0; overflow: hidden; }
        .bp-marquee-title { font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(255,255,255,0.4); text-align: center; margin-bottom: 28px; }
        .bp-marquee-row { overflow: hidden; margin-bottom: 12px; }
        .bp-marquee-track { display: flex; gap: 40px; align-items: center; white-space: nowrap; animation: bp-scrollMarquee 22s linear infinite; }
        .bp-marquee-track.rtl { animation-direction: reverse; }
        .bp-marquee-track.slow { animation-duration: 30s; }
        .bp-marquee-track.fast { animation-duration: 16s; }
        .bp-marquee-item { flex-shrink: 0; display: flex; align-items: center; height: 32px; }
        .bp-marquee-item img { height: 28px; width: auto; opacity: 0.75; filter: grayscale(100%) brightness(180%); transition: opacity 0.2s, filter 0.2s; }
        .bp-marquee-item img:hover { opacity: 1; filter: grayscale(0%) brightness(100%); }
        @keyframes bp-scrollMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* Sticky Mobile CTA */
        .bp-sticky-cta { position: fixed; bottom: 0; left: 0; right: 0; z-index: 200; background: var(--paper); border-top: 1px solid var(--ink); padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        @media (min-width: 768px) { .bp-sticky-cta { display: none; } }
        .bp-sticky-cta .bp-txt { font-size: 12px; color: var(--ink-soft); font-family: 'IBM Plex Mono', monospace; }
        .bp-sticky-cta .bp-txt b { display: block; font-size: 14px; color: var(--ink); font-family: 'Inter', sans-serif; }
      `}</style>

      <main className="bp-full-page">
        {/* ── 1. NEW HERO (Redesign from branding (1).html) ─────────────────── */}
        <section className="bp-hero">
          <div className="wrap">
            <div className="bp-sheet-label">
              <span className="tag mono">SHEET NO. 02 — BRAND SYSTEMS</span>
              <span className="rule"></span>
              <span className="bp-sheet-right mono">POSITION / IDENTITY / PACKAGING / DIGITAL</span>
            </div>

            <div className="bp-avail">
              <span aria-hidden="true">●</span>
              We work with a limited number of founder-led brands at a time so strategy and senior creative direction stay closely involved.
            </div>

            <h1>Build the brand people choose <em>before they compare.</em></h1>

            <div className="bp-hero-grid">
              <div>
                <p className="bp-hero-sub">
                  The Drawing Board creates strategy-led identities, packaging and digital experiences for ambitious consumer brands preparing to launch, reposition or scale.
                </p>
                <p className="bp-hero-sub">
                  From how your brand is understood to how it looks on the shelf and performs online, we build one connected system designed to earn attention, communicate value and support growth.
                </p>
                <div className="bp-cta-row">
                  <a className="bp-btn-primary" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Discuss Your Project →</a>
                  <a className="bp-btn-link" href="#case-studies">View Selected Work</a>
                </div>
                <p style={{ marginBottom: '14px' }}>
                  <a className="bp-btn-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Prefer WhatsApp? Message the studio.</a>
                </p>
                <p className="bp-price-note">Brand and packaging engagements begin at <b>₹4,75,000</b>.</p>
              </div>

              <div className="bp-annot-card">
                <div className="corner" aria-hidden="true"></div>
                <div className="bp-annot-title mono">Project System — Engagement Overview</div>
                <div className="bp-annot-row"><span>Core thinking</span><span>Positioning before design</span></div>
                <div className="bp-annot-row"><span>Brand system</span><span>Identity + packaging</span></div>
                <div className="bp-annot-row"><span>Extended system</span><span>Identity + packaging + website</span></div>
                <div className="bp-annot-row"><span>Collaboration</span><span>Direct founder-to-studio</span></div>
                <div className="bp-annot-row"><span>Starting investment</span><span>₹4,75,000</span></div>
                <div className="bp-annot-row"><span>Typical engagement</span><span>6–12 weeks</span></div>
              </div>
            </div>

            <div className="bp-stat-strip">
              <div className="bp-stat"><div className="num">01</div><div className="lbl mono">Connected brand idea</div></div>
              <div className="bp-stat"><div className="num">04</div><div className="lbl mono">Core system layers</div></div>
              <div className="bp-stat"><div class="num">100%</div><div className="lbl mono">Editable file handover</div></div>
              <div className="bp-stat"><div className="num">01:01</div><div className="lbl mono">Direct studio communication</div></div>
            </div>
          </div>
        </section>

        {/* ── 2. NEW CATEGORY STRIP ────────────────────────────────────── */}
        <div className="category-strip">
          <div className="wrap">
            <span className="lbl2 mono">BUILT FOR AMBITIOUS CONSUMER BRANDS</span>
            <div className="category-row">
              <span>Food &amp; Beverage</span>
              <span>Beauty &amp; Wellness</span>
              <span>Fashion &amp; Lifestyle</span>
              <span>Hospitality</span>
              <span>Jewellery &amp; Gifting</span>
              <span>Premium FMCG</span>
              <span>D2C &amp; E-commerce</span>
            </div>
          </div>
        </div>

        {/* ── 3. NEW GROWTH PROBLEM SECTION ───────────────────────────── */}
        <section className="bp-problem-section">
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">WHEN THE EARLY BRAND STOPS WORKING</div>
                <h2>Growth exposes the gaps your first identity could hide.</h2>
              </div>
            </div>
            <div className="bp-problem-copy">
              <p>What worked for the first launch often stops working when the product range expands, the price increases or the business enters a more competitive market.</p>
              <p>The identity begins to feel inconsistent. Packaging variants lose cohesion. The website tells a different story. Every new campaign requires another visual decision.</p>
              <p>We replace that collection of disconnected assets with one clear system — built around what the brand should own, how customers should recognise it and how it should grow across products, packaging and digital touchpoints.</p>
              <p><strong>A stronger brand does not add decoration. It removes doubt.</strong></p>
            </div>
          </div>
        </section>

        {/* ── 4. NEW QUALIFICATION SECTION ────────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">IS THIS THE RIGHT STAGE?</div>
                <h2>Built for businesses with a real product and a serious next move.</h2>
              </div>
              <p>A focused engagement works best when the business, product and decision-makers are ready to move together.</p>
            </div>
            <div className="bp-qual-grid">
              <div className="bp-qual-col bp-yes">
                <h4><span className="mark" aria-hidden="true">✓</span>A strong fit when</h4>
                <ul>
                  <li>You have a validated product or a well-defined launch plan.</li>
                  <li>Your current identity no longer reflects the quality or scale of the business.</li>
                  <li>You need brand, packaging and digital touchpoints to work as one system.</li>
                  <li>You are preparing to launch, reposition, enter retail or expand into more SKUs.</li>
                  <li>You value research, clear reasoning and structured collaboration.</li>
                  <li>You are prepared to invest in a foundation intended to serve the business for years.</li>
                  <li>The core decision-makers can participate in major approvals.</li>
                </ul>
              </div>
              <div className="bp-qual-col bp-no">
                <h4><span className="mark" aria-hidden="true">✕</span>Probably too early when</h4>
                <ul>
                  <li>Your product, audience or business model is changing every week.</li>
                  <li>You need only a temporary logo or quick label adaptation.</li>
                  <li>Your main selection criterion is the lowest quotation.</li>
                  <li>You need the entire engagement completed within a few days.</li>
                  <li>Final product information, claims or packaging requirements are unavailable.</li>
                  <li>No one involved has authority to approve strategy and creative direction.</li>
                </ul>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <a className="bp-btn-link" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">This sounds like our stage → Discuss the project</a>
            </div>
          </div>
        </section>

        {/* ── 5. NEW CONNECTED SYSTEM PHILOSOPHY ─────────────────────── */}
        <section>
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">ONE IDEA, EVERY TOUCHPOINT</div>
                <h2>Identity, packaging and website should not feel like three different companies.</h2>
              </div>
              <p>We begin by deciding what the brand should stand for, what it should own in the market and why customers should choose it.</p>
            </div>
            <p style={{ maxWidth: '760px', fontSize: '15.5px', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '40px' }}>
              That central idea then guides the identity, packaging hierarchy, product range and digital journey. The result is not a collection of attractive assets. It is one recognisable system designed to build familiarity wherever the customer meets the brand.
            </p>

            <div className="system-sequence">
              <div className="seq-stage"><div className="step-n mono">01</div><h4>Positioning</h4><p>The reason to choose you</p></div>
              <div className="seq-stage"><div className="step-n mono">02</div><h4>Identity</h4><p>The recognisable visual language</p></div>
              <div className="seq-stage"><div className="step-n mono">03</div><h4>Packaging</h4><p>The shelf and product system</p></div>
              <div className="seq-stage"><div className="step-n mono">04</div><h4>Digital</h4><p>The path from interest to action</p></div>
              <div className="seq-stage"><div className="step-n mono">05</div><h4>Launch</h4><p>The tools needed to enter the market coherently</p></div>
            </div>
            <p className="bp-seq-caption"><strong>When each piece reinforces the same idea,</strong> the brand becomes easier to recognise, trust and grow.</p>
          </div>
        </section>

        {/* ── 6. NEW SELECTED BRAND SYSTEMS (CASE STUDIES) ─────────────── */}
        <section id="case-studies">
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">SELECTED BRAND SYSTEMS</div>
                <h2>Work designed to live beyond a single mockup.</h2>
              </div>
              <p>Each project reveals the business problem, strategic decision and system created — not only the final logo.</p>
            </div>

            <div className="case-grid">
              <article className="case-card">
                <div className="img" style={{ background: 'none' }}>
                  <img
                    src="https://framerusercontent.com/images/GI9hs6gABp4QhAbVBk1Ej9TVE0.png"
                    alt="AFTER8® Brand System"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="case-body">
                  <div className="tag mono">Personal Wellness</div>
                  <h4>AFTER8®</h4>
                  <p><strong>Challenge:</strong> Enter a sensitive and visually crowded category without feeling clinical, crude or generic.</p>
                  <p style={{ marginTop: '8px' }}><strong>Direction:</strong> A confident after-hours identity balancing discretion, modernity and clear product recognition.</p>
                  <ul className="sys-list">
                    <li>Positioning direction</li>
                    <li>Visual identity</li>
                    <li>Packaging architecture</li>
                    <li>Variant logic</li>
                    <li>Digital launch direction</li>
                  </ul>
                  <div className="demo"><b>What This Project Demonstrates</b>How one central brand idea can remain recognisable across identity, product packaging and digital communication.</div>
                </div>
              </article>

              <article className="case-card">
                <div className="img" style={{ background: 'none' }}>
                  <img
                    src="https://framerusercontent.com/images/Gj0gd8TaOnBqjox9iFb1KV8EbY.jpeg"
                    alt="LUMIEN Packaging System"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="case-body">
                  <div className="tag mono">Fine Jewellery</div>
                  <h4>LUMIEN</h4>
                  <p><strong>Challenge:</strong> Build a modern jewellery brand that feels aspirational and refined without relying on predictable luxury codes.</p>
                  <p style={{ marginTop: '8px' }}><strong>Direction:</strong> Restraint, proportion and tactile detail used to create a distinctive identity and gifting experience.</p>
                  <ul className="sys-list">
                    <li>Brand story</li>
                    <li>Identity</li>
                    <li>Packaging</li>
                    <li>Retail details</li>
                    <li>Digital art direction</li>
                  </ul>
                  <div className="demo"><b>What This Project Demonstrates</b>How a restrained visual system can communicate value through consistency, tactility and thoughtful detail.</div>
                </div>
              </article>

              <article className="case-card">
                <div className="img" style={{ background: 'none' }}>
                  <img
                    src="https://framerusercontent.com/images/hm5rbPr45EhYVKWHrF6fMu8xGA.png"
                    alt="CARDAMOM Brand System"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="case-body">
                  <div className="tag mono">Tea &amp; Coffee</div>
                  <h4>CARDAMOM</h4>
                  <p><strong>Challenge:</strong> Create one recognisable house language across tea, coffee, matcha and future product formats.</p>
                  <p style={{ marginTop: '8px' }}><strong>Direction:</strong> A calm, ingredient-led system with clear product differentiation and consistent brand recognition.</p>
                  <ul className="sys-list">
                    <li>Identity application</li>
                    <li>Packaging hierarchy</li>
                    <li>SKU logic</li>
                    <li>Product-format adaptation</li>
                    <li>Retail and digital presentation</li>
                  </ul>
                  <div className="demo"><b>What This Project Demonstrates</b>How a master packaging language can expand across categories without making every product look identical.</div>
                </div>
              </article>
            </div>

            <div className="bp-cases-foot">
              <Link className="bp-btn-link" to="/work">See the strategy behind the work →</Link>
            </div>
          </div>
        </section>

        {/* ── 7. NEW SHOW THE THINKING SECTION ───────────────────────── */}
        <section style={{ background: 'var(--card)' }}>
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">BEFORE THE FINAL MOCKUPS</div>
                <h2>The value is in the decisions that make the design feel inevitable.</h2>
              </div>
            </div>
            <div className="think-grid">
              <div className="think-card">
                <div className="img">Category Audit Board</div>
                <div className="think-body"><div className="n mono">01</div><h4>Category audit</h4><p>What competitors repeat and where the brand can create distance.</p></div>
              </div>
              <div className="think-card">
                <div className="img">Audience Context Strategy</div>
                <div className="think-body"><div class="n mono">02</div><h4>Audience understanding</h4><p>What the customer needs to recognise, believe and remember.</p></div>
              </div>
              <div className="think-card">
                <div className="img">Positioning Matrix</div>
                <div className="think-body"><div className="n mono">03</div><h4>Positioning territory</h4><p>The idea the brand should own in the market.</p></div>
              </div>
              <div className="think-card">
                <div className="img">Hierarchy Blueprint</div>
                <div className="think-body"><div className="n mono">04</div><h4>Information hierarchy</h4><p>What customers must understand first, second and third.</p></div>
              </div>
              <div className="think-card">
                <div className="img">Typography & Symbol Lab</div>
                <div className="think-body"><div className="n mono">05</div><h4>Creative exploration</h4><p>Typography, symbols, imagery, colour and composition tested against the strategy.</p></div>
              </div>
              <div className="think-card">
                <div className="img">System Architecture Plan</div>
                <div className="think-body"><div className="n mono">06</div><h4>System planning</h4><p>How identity, SKUs, formats and digital components remain consistent as the brand grows.</p></div>
              </div>
            </div>
            <p style={{ marginTop: '32px', fontSize: '14.5px', color: 'var(--ink-soft)', maxWidth: '600px' }}>
              <strong style={{ color: 'var(--ink)' }}>A polished result matters.</strong> A repeatable reason behind every decision matters more.
            </p>
          </div>
        </section>

        {/* ── 8. NEW SCOPE AND DELIVERABLES (WHAT WE BUILD) ────────────── */}
        <section>
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">WHAT WE BUILD</div>
                <h2>One strategic foundation, translated across the places customers meet the brand.</h2>
              </div>
              <p>The exact scope depends on the engagement, but every project begins with positioning and ends with a usable system.</p>
            </div>
            <div className="bp-deliv-grid">
              <div className="bp-deliv-col">
                <h4>Strategic Foundation</h4>
                <div className="sub mono">WHAT THE BRAND SHOULD OWN</div>
                <ul>
                  <li>Founder discovery</li>
                  <li>Business and product understanding</li>
                  <li>Audience and buying-context review</li>
                  <li>Category and competitor audit</li>
                  <li>Positioning opportunity</li>
                  <li>Core brand idea</li>
                  <li>Brand personality</li>
                  <li>Messaging direction</li>
                  <li>Creative brief and success criteria</li>
                </ul>
              </div>
              <div className="bp-deliv-col">
                <h4>Identity System</h4>
                <div className="sub mono">HOW THE BRAND IS RECOGNISED</div>
                <ul>
                  <li>Primary and secondary logo system</li>
                  <li>Supporting mark or icon where relevant</li>
                  <li>Typography system</li>
                  <li>Colour system</li>
                  <li>Visual language</li>
                  <li>Layout principles</li>
                  <li>Imagery or illustration direction</li>
                  <li>Practical identity applications</li>
                  <li>Brand guidelines</li>
                  <li>Editable master files</li>
                </ul>
              </div>
              <div className="bp-deliv-col">
                <h4>Packaging System</h4>
                <div className="sub mono">HOW THE PRODUCT IS CHOSEN</div>
                <ul>
                  <li>Master packaging direction</li>
                  <li>Front, back and side hierarchy</li>
                  <li>Product and claims communication</li>
                  <li>SKU naming and variant logic</li>
                  <li>Colour and product differentiation</li>
                  <li>Packaging mockups</li>
                  <li>Artwork on client-supplied approved dielines</li>
                  <li>Up to five straightforward SKU adaptations</li>
                  <li>Print-ready artwork</li>
                  <li>Editable source files</li>
                </ul>
                <div className="note">The ₹4,75,000 engagement includes one master packaging direction and up to five straightforward SKU adaptations using the approved structure. New formats, structural changes, new sizes, additional SKUs or substantial copy changes are quoted separately.</div>
              </div>
              <div className="bp-deliv-col">
                <h4>Digital Experience</h4>
                <div className="sub mono">HOW INTEREST BECOMES ACTION</div>
                <ul>
                  <li>Website strategy</li>
                  <li>Sitemap and content hierarchy</li>
                  <li>Customer journey</li>
                  <li>Responsive UI/UX design</li>
                  <li>Core page-template system</li>
                  <li>Website development</li>
                  <li>Enquiry or e-commerce flow</li>
                  <li>Responsive testing</li>
                  <li>Basic launch support</li>
                  <li>Website handover</li>
                </ul>
                <div className="note">Digital experience is included only in the ₹6,50,000 Brand-to-Market engagement. Exact platform, page templates, product count, e-commerce requirements, integrations and content responsibilities are confirmed in the proposal.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. NEW HOW WE WORK / PROCESS ────────────────────────────── */}
        <section style={{ background: 'var(--card)' }}>
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">HOW WE WORK</div>
                <h2>Major decisions are aligned before the next layer is built.</h2>
              </div>
            </div>
            <div className="bp-process">
              <div className="bp-pstep"><div className="n mono">01</div><h4>Discover</h4><p>Understand the business, product, customer, category, launch plan and growth goals.</p><div className="chk mono">✓ Discovery inputs approved</div></div>
              <div className="bp-pstep"><div className="n mono">02</div><h4>Position</h4><p>Define the opportunity, central brand idea, audience relevance and messaging direction.</p><div className="chk mono">✓ Strategy alignment approved</div></div>
              <div className="bp-pstep"><div className="n mono">03</div><h4>Direct</h4><p>Translate the strategy into one or two carefully considered creative territories.</p><div className="chk mono">✓ Creative territory selected</div></div>
              <div className="bp-pstep"><div className="n mono">04</div><h4>Build</h4><p>Develop the selected identity and master packaging system.</p><div className="chk mono">✓ Core system approved</div></div>
              <div className="bp-pstep"><div className="n mono">05</div><h4>Extend</h4><p>Adapt the approved system across SKUs, website templates and launch applications.</p><div className="chk mono">✓ Applications approved</div></div>
              <div className="bp-pstep"><div className="n mono">06</div><h4>Prepare</h4><p>Organise production-ready artwork, source files, guidelines, testing and handover.</p><div className="chk mono">✓ Final balance and handover</div></div>
            </div>
            <p className="process-scroll-note">Scroll to see all six stages →</p>
            <p style={{ marginTop: '28px', fontSize: '14px', color: 'var(--ink-soft)', maxWidth: '640px', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--ink)' }}>Typical timeline:</strong> Brand-to-Shelf runs approximately 6–8 weeks; Brand-to-Market runs approximately 8–12 weeks. Timelines depend on feedback speed, decision-maker availability, final copy, approved claims, approved dielines, SKU complexity, website content readiness and integration requirements.
            </p>
          </div>
        </section>

        {/* ── 10. NEW STUDIO MODEL & COMPARISON ───────────────────────── */}
        <section>
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">THE STUDIO MODEL</div>
                <h2>Small enough to stay close. Structured enough to build the whole system.</h2>
              </div>
            </div>
            <p style={{ maxWidth: '720px', fontSize: '15.5px', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '36px' }}>
              The Drawing Board combines direct access and focused creative attention with a structured approach to strategy, identity, packaging and digital execution. Fewer handoffs mean fewer reinterpretations of the brand. The people making the strategic and creative decisions remain closely involved from discovery through delivery.
            </p>
            <div className="bp-deliv-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '40px' }}>
              <div className="bp-deliv-col"><ul><li>Direct access to the working team</li><li>Strategy and design developed together</li></ul></div>
              <div className="bp-deliv-col"><ul><li>Identity, packaging and digital under one system</li><li>Defined checkpoints and approval stages</li></ul></div>
              <div className="bp-deliv-col"><ul><li>Senior attention without unnecessary agency layers</li><li>Files and guidelines prepared for implementation</li></ul></div>
            </div>

            <div className="compare-wrap">
              <table className="compare-table">
                <thead>
                  <tr><th scope="col">Comparison</th><th scope="col">Independent Specialist</th><th scope="col">Large Agency</th><th scope="col" className="hl">The Drawing Board</th></tr>
                </thead>
                <tbody>
                  <tr><th scope="row">Strategic foundation</th><td>Depends on specialisation</td><td>Usually extensive</td><td className="hl">Included</td></tr>
                  <tr><th scope="row">Direct creative access</th><td>Usually direct</td><td>Often account-led</td><td className="hl">Direct and structured</td></tr>
                  <tr><th scope="row">Multi-touchpoint system</th><td>May require additional partners</td><td>Fully supported</td><td className="hl">Identity, pack and web connected</td></tr>
                  <tr><th scope="row">Approval structure</th><td>Varies</td><td>Multi-layered</td><td className="hl">Defined project checkpoints</td></tr>
                  <tr><th scope="row">Pace</th><td>Fast but variable</td><td>Longer internal layers</td><td className="hl">Focused project team</td></tr>
                  <tr><th scope="row">Operating model</th><td>Individual-led</td><td>Department-led</td><td className="hl">Senior boutique studio</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 11. LOCKED TESTIMONIAL / SOCIAL PROOF SECTION (NO CHANGE) ── */}
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
                    <div className="bp-sp-vav">LF</div>
                    <div>
                      <div className="bp-sp-vname">Lena F.</div>
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
                    <div className="bp-sp-vav">SK</div>
                    <div>
                      <div className="bp-sp-vname">Shiba Krishnan</div>
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
                    <div className="bp-sp-vav">MC</div>
                    <div>
                      <div className="bp-sp-vname">Marcus Chen</div>
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
                    <div className="bp-sp-vav">VR</div>
                    <div>
                      <div className="bp-sp-vname">Vikram R.</div>
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

        {/* ── 12. HARMONIZED PRICING SECTION ───────────────────────────── */}
        <section id="pricing">
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">ENGAGEMENT MODELS</div>
                <h2>Choose the scope that fits where you are.</h2>
              </div>
              <p>Every tier ships a complete, usable identity — the difference is depth and launch-readiness.</p>
            </div>

            <div className="bp-tiers">
              {/* Growth — Card 1 */}
              <div className="bp-tier">
                <div className="bp-tier-head">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <div className="name mono" style={{ margin: 0 }}>GROWTH (BRAND-TO-SHELF)</div>
                    <div className="bp-currency-toggle mono" style={{ margin: 0 }}>
                      <button
                        type="button"
                        className={`bp-curr-btn ${currency === 'INR' ? 'active' : ''}`}
                        onClick={() => setCurrency('INR')}
                        title="Indian Rupee (₹)"
                      >
                        ₹ INR
                      </button>
                      <button
                        type="button"
                        className={`bp-curr-btn ${currency === 'USD' ? 'active' : ''}`}
                        onClick={() => setCurrency('USD')}
                        title="US Dollar ($)"
                      >
                        $ USD
                      </button>
                      <button
                        type="button"
                        className={`bp-curr-btn ${currency === 'GBP' ? 'active' : ''}`}
                        onClick={() => setCurrency('GBP')}
                        title="British Pound (£)"
                      >
                        £ GBP
                      </button>
                    </div>
                  </div>
                  <h3>Full Brand System</h3>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--pine)', marginBottom: '6px' }}>Brand Identity + Packaging</div>
                  <p className="desc" style={{ margin: 0 }}>For funded or scaling brands that need to look the part everywhere.</p>
                  <div className="bp-slot-badge mono" style={{ marginTop: '12px' }}>
                    <span className="bp-slot-dot"></span>
                    <span>5 SLOTS AVAILABLE</span>
                  </div>
                </div>

                <div className="bp-tier-price">
                  <div>
                    <span className="amt">{growthPrices[currency]}</span>
                    <div className="per">per project</div>
                  </div>
                </div>

                <div className="bp-deliv-bar">
                  <span className="mono" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--ink-soft)', letterSpacing: '0.05em' }}>
                    DELIVERABLES ({growthSlide + 1}/3)
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => setGrowthSlide(0)}
                      className={`bp-curr-btn mono ${growthSlide === 0 ? 'active' : ''}`}
                      style={{ fontSize: '10px', padding: '3px 7px' }}
                    >
                      1
                    </button>
                    <button
                      type="button"
                      onClick={() => setGrowthSlide(1)}
                      className={`bp-curr-btn mono ${growthSlide === 1 ? 'active' : ''}`}
                      style={{ fontSize: '10px', padding: '3px 7px' }}
                    >
                      2
                    </button>
                    <button
                      type="button"
                      onClick={() => setGrowthSlide(2)}
                      className={`bp-curr-btn mono ${growthSlide === 2 ? 'active' : ''}`}
                      style={{ fontSize: '10px', padding: '3px 7px' }}
                    >
                      3
                    </button>
                    <button
                      type="button"
                      onClick={() => setGrowthSlide((prev) => (prev > 0 ? prev - 1 : 2))}
                      style={{ background: 'var(--card)', border: '1px solid var(--ink)', borderRadius: '2px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', marginLeft: '4px', lineHeight: 1 }}
                      title="Previous slide"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => setGrowthSlide((prev) => (prev < 2 ? prev + 1 : 0))}
                      style={{ background: 'var(--card)', border: '1px solid var(--ink)', borderRadius: '2px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', marginLeft: '4px', lineHeight: 1 }}
                      title="Next slide"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div style={{ flex: 1, overflow: 'hidden', width: '100%' }}>
                  <div style={{ display: 'flex', transform: `translateX(-${growthSlide * 100}%)`, transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)', width: '100%' }}>
                    <div className="bp-tier-slide">
                      <ul className="bp-tier-list" style={{ padding: 0, margin: 0 }}>
                        <li>Founder discovery and business understanding</li>
                        <li>Category, competitor and audience research</li>
                        <li>Positioning and central brand idea</li>
                        <li>Messaging direction</li>
                        <li>Complete visual identity system</li>
                      </ul>
                    </div>
                    <div className="bp-tier-slide">
                      <ul className="bp-tier-list" style={{ padding: 0, margin: 0 }}>
                        <li>Typography, colour and visual language</li>
                        <li>Brand guidelines</li>
                        <li>One master packaging direction</li>
                        <li>Front, back and side-panel hierarchy</li>
                        <li>SKU architecture and variant logic</li>
                      </ul>
                    </div>
                    <div className="bp-tier-slide">
                      <ul className="bp-tier-list" style={{ padding: 0, margin: 0 }}>
                        <li>Up to five straightforward SKU adaptations</li>
                        <li>Packaging presentation mockups</li>
                        <li>Print-ready artwork on approved dielines</li>
                        <li>Editable brand and packaging source files</li>
                        <li>Final handover</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bp-tier-foot">
                  <a className="bp-tier-btn" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book a 15-min call</a>
                  <div className="bp-tier-time">6–8 week delivery</div>
                </div>
              </div>

              {/* Scale — Card 2 */}
              <div className="bp-tier">
                <div className="bp-tier-head">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <div className="name mono" style={{ margin: 0 }}>SCALE (BRAND-TO-MARKET)</div>
                    <div className="bp-currency-toggle mono" style={{ margin: 0 }}>
                      <button
                        type="button"
                        className={`bp-curr-btn ${currency === 'INR' ? 'active' : ''}`}
                        onClick={() => setCurrency('INR')}
                        title="Indian Rupee (₹)"
                      >
                        ₹ INR
                      </button>
                      <button
                        type="button"
                        className={`bp-curr-btn ${currency === 'USD' ? 'active' : ''}`}
                        onClick={() => setCurrency('USD')}
                        title="US Dollar ($)"
                      >
                        $ USD
                      </button>
                      <button
                        type="button"
                        className={`bp-curr-btn ${currency === 'GBP' ? 'active' : ''}`}
                        onClick={() => setCurrency('GBP')}
                        title="British Pound (£)"
                      >
                        £ GBP
                      </button>
                    </div>
                  </div>
                  <h3>Brand + Packaging + Web</h3>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--pine)', marginBottom: '6px' }}>Brand Identity + Packaging + Website</div>
                  <p className="desc" style={{ margin: 0 }}>For product brands going to retail or e-commerce shelf.</p>
                  <div className="bp-slot-badge mono" style={{ marginTop: '12px' }}>
                    <span className="bp-slot-dot"></span>
                    <span>3 SLOTS AVAILABLE</span>
                  </div>
                </div>
                <div className="bp-tier-price">
                  <div>
                    <span className="amt">{scalePrices[currency]}</span>
                    <div className="per">per project, up to 6 SKUs</div>
                  </div>
                </div>

                <div className="bp-deliv-bar">
                  <span className="mono" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--ink-soft)', letterSpacing: '0.05em' }}>
                    DELIVERABLES ({scaleSlide + 1}/3)
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => setScaleSlide(0)}
                      className={`bp-curr-btn mono ${scaleSlide === 0 ? 'active' : ''}`}
                      style={{ fontSize: '10px', padding: '3px 7px' }}
                    >
                      1
                    </button>
                    <button
                      type="button"
                      onClick={() => setScaleSlide(1)}
                      className={`bp-curr-btn mono ${scaleSlide === 1 ? 'active' : ''}`}
                      style={{ fontSize: '10px', padding: '3px 7px' }}
                    >
                      2
                    </button>
                    <button
                      type="button"
                      onClick={() => setScaleSlide(2)}
                      className={`bp-curr-btn mono ${scaleSlide === 2 ? 'active' : ''}`}
                      style={{ fontSize: '10px', padding: '3px 7px' }}
                    >
                      3
                    </button>
                    <button
                      type="button"
                      onClick={() => setScaleSlide((prev) => (prev > 0 ? prev - 1 : 2))}
                      style={{ background: 'var(--card)', border: '1px solid var(--ink)', borderRadius: '2px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', marginLeft: '4px', lineHeight: 1 }}
                      title="Previous slide"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => setScaleSlide((prev) => (prev < 2 ? prev + 1 : 0))}
                      style={{ background: 'var(--card)', border: '1px solid var(--ink)', borderRadius: '2px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', marginLeft: '4px', lineHeight: 1 }}
                      title="Next slide"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div style={{ flex: 1, overflow: 'hidden', width: '100%' }}>
                  <div style={{ display: 'flex', transform: `translateX(-${scaleSlide * 100}%)`, transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)', width: '100%' }}>
                    <div className="bp-tier-slide">
                      <ul className="bp-tier-list" style={{ padding: 0, margin: 0 }}>
                        <li>Everything in Brand-to-Shelf</li>
                        <li>Website strategy</li>
                        <li>Sitemap and customer journey</li>
                        <li>Content hierarchy</li>
                        <li>Responsive UI/UX design</li>
                      </ul>
                    </div>
                    <div className="bp-tier-slide">
                      <ul className="bp-tier-list" style={{ padding: 0, margin: 0 }}>
                        <li>Core page-template system</li>
                        <li>Website development</li>
                        <li>Enquiry or e-commerce flow</li>
                        <li>Responsive testing</li>
                        <li>Basic launch support</li>
                      </ul>
                    </div>
                    <div className="bp-tier-slide">
                      <ul className="bp-tier-list" style={{ padding: 0, margin: 0 }}>
                        <li>Website handover</li>
                        <li>30-day technical defect-support window</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bp-tier-foot">
                  <a className="bp-tier-btn" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book a 15-min call</a>
                  <div className="bp-tier-time">8–12 week delivery</div>
                </div>
              </div>
            </div>

            <div className="payment-terms" style={{ marginTop: '24px' }}>
              <h4 className="mono" style={{ textTransform: 'uppercase', fontSize: '12.5px', color: 'var(--ink-soft)' }}>Payment Structure</h4>
              <ol style={{ paddingLeft: '18px', fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                <li>50% to begin</li>
                <li>25% after approval of the identity and master packaging direction</li>
                <li>25% before final website launch and complete file handover</li>
              </ol>
              <p className="fine" style={{ fontSize: '12px', color: 'var(--ink-soft)', marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--paper-line)' }}>
                For Brand-to-Shelf, the final payment is due before complete print-ready and editable-file handover.
              </p>
            </div>
          </div>
        </section>

        {/* ── 13. NEW VALUE EXPLANATION SECTION ───────────────────────── */}
        <section style={{ background: 'var(--card)' }}>
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">WHY THE ENGAGEMENT IS STRUCTURED THIS WAY</div>
                <h2>This is not three disconnected design services bundled together.</h2>
              </div>
            </div>
            <div className="bp-problem-copy" style={{ color: 'var(--ink-soft)', fontSize: '16px', lineHeight: 1.7 }}>
              <p>The engagement begins by deciding what the brand should own, how it should be recognised and why customers should choose it. That central idea then guides the identity, packaging architecture and digital experience.</p>
              <p>This prevents the business from paying different specialists to reinterpret the brand at every stage — and gives your internal team, printers, developers and future partners one coherent system to work from.</p>
              <p>The investment reflects the research, strategic decisions, creative development, production preparation and implementation required to make that system usable beyond a single launch.</p>
              <p style={{ color: 'var(--ink)', fontWeight: 500 }}>You are investing in the decisions the business should not need to remake every time it adds a product, campaign or customer touchpoint.</p>
            </div>
          </div>
        </section>

        {/* ── 14. NEW ALIGNMENT CHECKPOINT SECTION ───────────────────── */}
        <section>
          <div className="wrap">
            <div className="bp-guarantee">
              <div className="bp-badge mono">Alignment<br/>Checkpoint</div>
              <div>
                <h3>We align the strategic and creative direction before building the complete system.</h3>
                <p>The project begins with research, positioning and clearly defined creative territories. A selected direction is approved before the complete identity, packaging range and digital experience are developed.</p>
                <p style={{ marginTop: '8px' }}>This keeps major decisions visible, reduces late-stage surprises and ensures each new layer is built on an agreed foundation.</p>
                <p style={{ marginTop: '8px' }}>Included revisions, decision-makers, feedback windows and scope boundaries are documented in the project proposal before work begins.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 15. NEW SCOPE BOUNDARIES SECTION ───────────────────────── */}
        <section style={{ background: 'var(--card)' }}>
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">SCOPE CLARITY</div>
                <h2>Clear boundaries protect the quality, timeline and launch.</h2>
              </div>
            </div>
            <div className="scope-wrap">
              <div className="scope-grid">
                <div className="scope-col in">
                  <h4>Included when stated in the engagement</h4>
                  <ul>
                    <li>Strategy and agreed research</li>
                    <li>Identity system</li>
                    <li>Master packaging design</li>
                    <li>Agreed SKU adaptations</li>
                    <li>Print-ready artwork on approved dielines</li>
                    <li>Website strategy and agreed page templates for Brand-to-Market</li>
                    <li>Development on the platform agreed in the proposal</li>
                    <li>Editable source-file handover</li>
                    <li>Agreed revision rounds</li>
                    <li>Handover support</li>
                  </ul>
                </div>
                <div className="scope-col out">
                  <h4>Quoted or supplied separately</h4>
                  <ul>
                    <li>Additional SKUs</li>
                    <li>New packaging structures or formats</li>
                    <li>Structural packaging engineering</li>
                    <li>Dieline creation or technical verification</li>
                    <li>Printing and manufacturing</li>
                    <li>Legal or regulatory certification</li>
                    <li>Product photography</li>
                    <li>Custom illustration beyond the agreed scope</li>
                    <li>Paid fonts, imagery or licences</li>
                    <li>Website copywriting</li>
                    <li>Large product catalogues</li>
                    <li>Advanced e-commerce functionality</li>
                    <li>Third-party subscriptions</li>
                    <li>Hosting and domains</li>
                  </ul>
                </div>
              </div>
              <div className="scope-note">
                The client or manufacturer must provide final, technically verified packaging dielines and legally approved product information. The Drawing Board can organise content hierarchy but does not certify claims, ingredients, nutrition, regulatory statements or legal compliance.
              </div>
            </div>
          </div>
        </section>

        {/* ── 16. NEW CLIENT INPUTS CHECKLIST ────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">WHAT WE NEED FROM YOU</div>
                <h2>Clear inputs create stronger work and a smoother launch.</h2>
              </div>
            </div>
            <ul className="checklist">
              <li>Final business and product information</li>
              <li>Access to core decision-makers</li>
              <li>Existing research and customer insight</li>
              <li>Approved product names</li>
              <li>Approved product claims</li>
              <li>Final packaging copy</li>
              <li>Ingredient and nutrition information where relevant</li>
              <li>Manufacturer-approved dielines</li>
              <li>Barcodes and certification marks</li>
              <li>Website content and product information</li>
              <li>Required integrations</li>
              <li>Feedback within the agreed review window</li>
            </ul>
          </div>
        </section>

        {/* ── 17. NEW EXPANDED FAQ SECTION ───────────────────────────── */}
        <section style={{ background: 'var(--card)' }}>
          <div className="wrap" style={{ maxWidth: '920px' }}>
            <div className="bp-section-head" style={{ display: 'block' }}>
              <div className="bp-eyebrow mono">QUESTIONS</div>
              <h2>Frequently asked questions.</h2>
            </div>

            <div>
              {faqs.map((faq, idx) => (
                <div key={idx} className={`bp-faq-item${openFaq === idx ? ' open' : ''}`}>
                  <button className="bp-faq-q" onClick={() => toggleFaq(idx)}>
                    <span>{faq.q}</span>
                    <span className="bp-plus">+</span>
                  </button>
                  {openFaq === idx && (
                    <div className="bp-faq-a">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 18. NEW LEAD MAGNET SECTION ─────────────────────────────── */}
        <section className="lead-magnet">
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="eyebrow mono">NOT READY TO DISCUSS A PROJECT?</div>
                <h2>Use the Founder’s Brand Readiness Audit.</h2>
              </div>
            </div>
            <div className="lead-grid">
              <div>
                <p>A practical review for founders preparing to reposition, redesign packaging or build a stronger digital experience.</p>
                <ul className="lead-benefits">
                  <li>Assess whether your positioning is clear enough to guide design</li>
                  <li>Identify gaps between identity, packaging and website</li>
                  <li>Review SKU consistency and product hierarchy</li>
                  <li>Understand which inputs should be ready before hiring a studio</li>
                  <li>Separate design needs from legal, manufacturing and operational requirements</li>
                </ul>
              </div>
              
              <form className="lead-form" onSubmit={handleLeadSubmit}>
                {leadSubmitted ? (
                  <div style={{ color: '#8EC4B3', fontSize: '15px', fontFamily: 'IBM Plex Mono, monospace', padding: '20px 0' }}>
                    ✓ Thank you! Audit checklist requested. Connect your email workflow to receive it automatically.
                  </div>
                ) : (
                  <>
                    <div className="field">
                      <label htmlFor="leadEmail">Work email</label>
                      <input
                        type="email"
                        id="leadEmail"
                        placeholder="you@company.com"
                        value={leadFormData.email}
                        onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="leadBrand">Brand name</label>
                      <input
                        type="text"
                        id="leadBrand"
                        placeholder="Your brand name"
                        value={leadFormData.brand}
                        onChange={(e) => setLeadFormData({ ...leadFormData, brand: e.target.value })}
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="leadWeb">Website or Instagram</label>
                      <input
                        type="text"
                        id="leadWeb"
                        placeholder="URL or @handle"
                        value={leadFormData.web}
                        onChange={(e) => setLeadFormData({ ...leadFormData, web: e.target.value })}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="leadStage">Current stage</label>
                      <select
                        id="leadStage"
                        value={leadFormData.stage}
                        onChange={(e) => setLeadFormData({ ...leadFormData, stage: e.target.value })}
                        required
                      >
                        <option value="">Select one</option>
                        <option value="launch">Preparing to launch</option>
                        <option value="reposition">Repositioning an existing brand</option>
                        <option value="expand">Expanding products or SKUs</option>
                        <option value="website">Rebuilding the website</option>
                        <option value="exploring">Exploring options</option>
                      </select>
                    </div>
                    <button type="submit" className="bp-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      Send the audit →
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* ── 19. LOCKED LOGOS MARQUEE SECTION (NO CHANGE) ─────────────── */}
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

        <MoreServicesSection current="branding" />

        {/* ── 20. NEW FINAL CTA ────────────────────────────────────────── */}
        <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '80px 0' }}>
          <div className="wrap">
            <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 44px)', marginBottom: '14px', color: 'var(--paper)', maxWidth: '720px' }}>
              Your next stage should not inherit the limitations of your first brand.
            </h2>
            <p style={{ color: '#C9C3B4', fontSize: '16px', marginBottom: '28px', maxWidth: '560px', lineHeight: 1.6 }}>
              Tell us what you are launching, changing or preparing to scale. We will review the requirement and recommend whether you need the Brand-to-Shelf system, the complete Brand-to-Market engagement or a different scope altogether.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer" className="bp-btn-primary">
                Discuss Your Project →
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
                Message The Drawing Board on WhatsApp
              </a>
            </div>
            <p style={{ color: '#C9C3B4', fontSize: '13px' }}>Engagements begin at ₹4,75,000.</p>
          </div>
        </section>
      </main>

      {/* ── STICKY MOBILE CTA ────────────────────────────────────────── */}
      <div className="bp-sticky-cta">
        <div className="bp-txt">
          Projects from ₹4,75,000/-
          <b>Free 15-min call</b>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact on WhatsApp"
            className="wa-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              minWidth: '38px',
              backgroundColor: '#25D366',
              borderRadius: '4px',
              color: '#ffffff',
              flexShrink: 0,
              padding: 0,
              textDecoration: 'none'
            }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff" style={{ width: '22px', height: '22px', display: 'block', fill: '#ffffff' }}>
              <path
                fill="#ffffff"
                d="M12.031 2C6.49 2 2 6.491 2 12.029c0 1.947.558 3.766 1.523 5.308L2 22l4.823-1.46c1.512.923 3.284 1.455 5.208 1.455C17.57 22 22 17.509 22 11.97 21.999 6.491 17.57 2 12.031 2zm0 18.064c-1.745 0-3.353-.489-4.717-1.332l-.337-.21-2.817.852.868-2.656-.23-.368c-.923-1.472-1.442-3.21-1.442-5.08 0-4.992 4.062-9.052 9.06-9.052 4.998 0 9.057 4.06 9.057 9.052.001 4.997-4.06 9.058-9.042 9.058zm5.086-6.666c-.28-.14-1.649-.813-1.903-.906-.254-.093-.44-.14-.627.14-.187.28-.722.906-.886 1.093-.163.186-.328.21-.608.07-.28-.14-1.18-.435-2.247-1.385-.83-.74-1.39-1.656-1.553-1.936-.163-.28-.018-.431.122-.571.127-.126.28-.327.42-.49.14-.163.187-.28.28-.466.094-.187.047-.35-.024-.49-.07-.14-.627-1.508-.859-2.07-.226-.543-.456-.468-.627-.477-.163-.008-.35-.01-.537-.01-.187 0-.49.07-.747.35-.257.28-1.028.98-1.028 2.392s1.028 2.776 1.17 2.964c.14.186 2.019 3.084 4.89 4.324.683.295 1.218.47 1.633.602.686.218 1.31.187 1.803.114.549-.08 1.65-.675 1.884-1.326.234-.65.234-1.21.164-1.325-.07-.116-.257-.186-.537-.326z"
              />
            </svg>
          </a>
          <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'var(--pine)', fontWeight: 600, fontSize: '13px' }}>Book now →</a>
        </div>
      </div>

      <Footer />
    </>
  );
}
