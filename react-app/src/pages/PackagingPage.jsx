import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import MoreServicesSection from '../components/MoreServicesSection';
import { WHATSAPP_URL } from '../utils/siteConfig';



/* ─────────────────────────────────────────────────────────────────────────────
   PackagingPage — pixel-perfect React port of packaging-design.html
   ───────────────────────────────────────────────────────────────────────────── */
export default function PackagingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [checklistEmail, setChecklistEmail] = useState('');
  const [checklistBrand, setChecklistBrand] = useState('');
  const [checklistCategory, setChecklistCategory] = useState('');
  const [submitMessage, setSubmitMessage] = useState('Send me the checklist →');

  const faqRefs = useRef([]);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleChecklistSubmit = (e) => {
    e.preventDefault();
    setSubmitMessage('Connect this form to send the checklist');
  };

  const faqs = [
    {
      q: "What is included in the $2,500 (₹1,75,000) packaging engagement?",
      a: "One master packaging direction covering front, back and side-panel design, typography and colour system, claims hierarchy, up to five straightforward SKU adaptations, presentation mockups, print-ready artwork on approved dielines, editable source files, and printer handoff support."
    },
    {
      q: "How many SKUs are included?",
      a: "Up to five straightforward SKU adaptations of the approved master direction — typically flavour, variant or size changes within the same structure."
    },
    {
      q: "What counts as a straightforward SKU adaptation?",
      a: "A colour, name, or claims change within the same pack structure and dieline. It does not include a new pack shape, size, or material."
    },
    {
      q: "What is considered a new packaging format?",
      a: "Any change to the physical structure — a new box shape, pouch size, cap type, or material — rather than a variant of the existing one. New formats are quoted separately once we know the structure."
    },
    {
      q: "Can you work with my existing logo and brand identity?",
      a: "Yes. Most packaging engagements start from an existing identity — we extend it into packaging-specific applications rather than starting over."
    },
    {
      q: "Can you also redesign my complete brand identity?",
      a: "Yes, as a separate engagement. See our Branding service if your logo, positioning, or visual system needs to be rebuilt first."
    },
    {
      q: "Do you create packaging dielines?",
      a: "No. Dielines are structural engineering and should come from your manufacturer or a structural packaging engineer. We design the artwork onto the dieline you provide."
    },
    {
      q: "Do you arrange printing or manufacturing?",
      a: "No, but we prepare fully print-ready files and support your printer or manufacturer through handoff and pre-production review."
    },
    {
      q: "Do you check food, cosmetic or legal compliance?",
      a: "No. We organise claims, ingredient lists, and regulatory text into a clear hierarchy, but final legal, nutritional, and regulatory approval remains your responsibility."
    },
    {
      q: "What files will I receive?",
      a: "CMYK print-ready PDFs, editable Adobe source files, a linked asset package, colour references, and printer handoff notes."
    },
    {
      q: "Can you work with my printer or manufacturer?",
      a: "Yes. We prepare files to their specifications and stay available during pre-production review and any print-run questions."
    },
    {
      q: "How many packaging concepts do you present?",
      a: "One master direction, developed after strategy and positioning are agreed — not several unrelated options. This keeps the process focused and avoids paying for directions that were never going to be chosen."
    },
    {
      q: "How are revisions handled?",
      a: "Revision rounds and boundaries are documented in your project proposal before work begins, so there's no ambiguity mid-project."
    },
    {
      q: "What are your payment terms?",
      a: "50% advance to begin, 25% after approval of the master packaging direction, and 25% before final print-ready file handover."
    },
    {
      q: "How long does the project take?",
      a: "Approximately 3–5 weeks, depending on the number of SKUs, feedback speed, dieline readiness, and production complexity."
    },
    {
      q: "Can you design only one product?",
      a: "Yes — the base scope is built around one product and its direct variants; a fuller multi-product range can be scoped once we understand your line."
    },
    {
      q: "Can the system expand to future products?",
      a: "Yes, that's part of what \"master direction\" means — the structure and logic are built so future SKUs and products can extend it without starting from zero."
    },
    {
      q: "What happens after the discovery call?",
      a: "If it's a fit, we send a scoped proposal within 48 hours covering price, timeline, and what we need from you to start."
    },
    {
      q: "Do you work with international brands?",
      a: "Yes. We work remotely with brands anywhere — your manufacturer supplies the production specifications relevant to your country and packaging line."
    },
    {
      q: "Will you keep the project confidentiality?",
      a: "Yes. Product details, formulas, and unreleased packaging stay confidential; we're happy to sign an NDA before discovery if you need one."
    }
  ];

  return (
    <>
      <style>{`
        /* ── Scoped Packaging Page Styles ───────────────────────────── */
        .pp-page .wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
        @media (min-width: 1024px) { .pp-page .wrap { max-width: 100% !important; padding-left: 64px !important; padding-right: 64px !important; } }
        @media (max-width: 768px) { .pp-page .wrap { padding: 0 24px !important; } }
        @media (max-width: 480px) { .pp-page .wrap { padding: 0 20px !important; } }
        .pp-page .crumb { padding: 22px 0 0; font-size: 12.5px; color: var(--ink-soft); }

        .pp-page .crumb a { color: var(--ink-soft); border-bottom: 1px dashed var(--ink-soft); text-decoration: none; }
        .pp-page .crumb a:hover { color: var(--pine); border-color: var(--pine); }
        .pp-page .crumb span.sep { margin: 0 8px; opacity: 0.5; }
        .pp-page .crumb span.cur { color: var(--ink); }

        .pp-page .hero { padding: 24px 0 64px; position: relative; }
        @media (max-width: 768px) {
          .pp-page .hero { padding: 16px 0 40px; }
        }

        .pp-page .sheet-label { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }
        .pp-page .sheet-label .tag { font-size: 12px; padding: 6px 10px; border: 1px solid var(--ink); }
        .pp-page .sheet-label .rule { flex: 1; height: 1px; background: var(--ink-soft); opacity: 0.4; }
        .pp-page .hero h1 { font-size: clamp(34px, 5vw, 64px); max-width: 920px; }
        .pp-page .hero h1 em { font-style: normal; color: var(--pine); }
        .pp-page .hero-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 56px; align-items: start; margin-top: 34px; }
        @media (max-width: 920px) { .pp-page .hero-grid { grid-template-columns: 1fr; } }
        .pp-page .hero-sub { font-size: 18px; color: var(--ink-soft); max-width: 520px; margin-bottom: 30px; }
        .pp-page .cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; margin-bottom: 20px; }
        .pp-page .btn-primary { background: var(--pine); color: var(--paper); padding: 15px 26px; font-size: 14.5px; font-weight: 600; border-radius: var(--radius); display: inline-flex; align-items: center; gap: 8px; transition: background .15s; border: none; cursor: pointer; text-decoration: none; }
        .pp-page .btn-primary:hover { background: var(--pine-deep); }
        .pp-page .btn-link { font-size: 14.5px; border-bottom: 1px solid currentColor; padding-bottom: 2px; color: var(--ink-soft); text-decoration: none; }
        .pp-page .price-note { font-size: 13px; color: var(--ink-soft); }
        .pp-page .price-note b { color: var(--ink); }

        .pp-page .annot-card { background: var(--card); border: 1px solid var(--ink); padding: 26px; position: relative; }
        .pp-page .annot-card .corner { position: absolute; top: -1px; right: -1px; width: 26px; height: 26px; background: var(--marker); clip-path: polygon(0 0, 100% 0, 100% 100%); }
        .pp-page .annot-row { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px dashed var(--paper-line); padding: 10px 0; font-size: 13px; gap: 14px; }
        .pp-page .annot-row:last-child { border-bottom: none; }
        .pp-page .annot-row span:first-child { color: var(--ink-soft); }
        .pp-page .annot-title { font-size: 12px; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 14px; }

        .pp-page .stat-strip { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); margin-top: 56px; }
        .pp-page .stat { flex: 1; min-width: 140px; padding: 22px 24px; border-right: 1px solid var(--ink); }
        .pp-page .stat:last-child { border-right: none; }
        .pp-page .stat .num { font-family: 'Fraunces', serif; font-size: 32px; font-weight: 600; color: var(--pine); }
        .pp-page .stat .lbl { font-size: 12.5px; color: var(--ink-soft); margin-top: 4px; }
        @media (max-width: 700px) { .pp-page .stat-strip { flex-wrap: wrap; } .pp-page .stat { flex: 1 1 50%; border-bottom: 1px solid var(--ink); border-right: 1px solid var(--ink); } .pp-page .stat:nth-child(even) { border-right: none; } }

        .pp-page .urgency { display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; background: var(--card); border: 1px solid var(--ink); padding: 7px 12px; margin-bottom: 22px; }
        .pp-page .urgency .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--marker); animation: pp-pulse 1.6s infinite; }
        @keyframes pp-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        .pp-page .logo-strip { border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); padding: 0; }
        .pp-page .logo-strip .wrap { display: flex; align-items: center; gap: 0; padding: 0; }
        .pp-page .logo-strip .lbl2 { font-size: 11px; color: var(--ink-soft); padding: 18px 24px 18px 0; white-space: nowrap; border-right: 1px solid var(--paper-line); }
        .pp-page .logo-row { display: flex; flex: 1; overflow-x: auto; }
        .pp-page .logo-row span { flex: 1; text-align: center; padding: 18px 20px; font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 13px; letter-spacing: 0.03em; color: var(--ink-soft); border-right: 1px solid var(--paper-line); white-space: nowrap; }
        .pp-page .logo-row span:last-child { border-right: none; }

        .pp-page section { padding: 80px 0; }
        .pp-page .section-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 44px; flex-wrap: wrap; }
        .pp-page .eyebrow { font-size: 12px; color: var(--marker); margin-bottom: 10px; }
        .pp-page .section-head h2 { font-size: clamp(26px, 3.4vw, 42px); max-width: 660px; }
        .pp-page .section-head p { color: var(--ink-soft); max-width: 380px; font-size: 15px; }

        .pp-page .problem { background: var(--ink); color: var(--paper); }
        .pp-page .problem .section-head p, .pp-page .problem .eyebrow { color: #C9C3B4; }
        .pp-page .problem-copy { font-size: 19px; line-height: 1.65; max-width: 760px; color: #E7E3D8; }
        .pp-page .problem-copy strong { color: #fff; }
        .pp-page .problem-copy p+p { margin-top: 14px; }
        .pp-page .problem-close { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 450; color: #fff; margin-top: 22px; max-width: 640px; }

        .pp-page .qual-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--ink); border: 1px solid var(--ink); }
        @media (max-width: 760px) { .pp-page .qual-grid { grid-template-columns: 1fr; } }
        .pp-page .qual-col { background: var(--card); padding: 30px 28px; }
        .pp-page .qual-col.no { background: #EFEBE2; }
        .pp-page .qual-col h4 { font-size: 16px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
        .pp-page .qual-col h4 .mark { width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
        .pp-page .qual-col.yes h4 .mark { background: var(--pine); color: var(--paper); }
        .pp-page .qual-col.no h4 .mark { background: transparent; border: 1.5px solid var(--ink-soft); color: var(--ink-soft); }
        .pp-page .qual-col ul { list-style: none; font-size: 14px; color: var(--ink-soft); }
        .pp-page .qual-col li { padding: 8px 0; border-top: 1px dashed var(--paper-line); }
        .pp-page .qual-col li:first-child { border-top: none; }
        .pp-page .qual-note { font-size: 13px; color: var(--ink-soft); margin-top: 20px; border-left: 3px solid var(--marker); padding: 6px 0 6px 18px; max-width: 680px; }

        .pp-page .strategy-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--ink); border: 1px solid var(--ink); }
        @media (max-width: 900px) { .pp-page .strategy-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .pp-page .strategy-grid { grid-template-columns: 1fr; } }
        .pp-page .strategy-card { background: var(--card); padding: 24px 22px; }
        .pp-page .strategy-card .n { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--marker); margin-bottom: 8px; }
        .pp-page .strategy-card h4 { font-size: 16.5px; margin-bottom: 8px; }
        .pp-page .strategy-card p { font-size: 13px; color: var(--ink-soft); }
        .pp-page .strategy-close { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 450; margin-top: 26px; max-width: 680px; }

        .pp-page .deliv-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--ink); border: 1px solid var(--ink); }
        @media (max-width: 900px) { .pp-page .deliv-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .pp-page .deliv-grid { grid-template-columns: 1fr; } }
        .pp-page .deliv-col { background: var(--card); padding: 24px 22px; }
        .pp-page .deliv-col h4 { font-size: 15px; margin-bottom: 6px; }
        .pp-page .deliv-col .sub { font-size: 12px; color: var(--marker); margin-bottom: 16px; }
        .pp-page .deliv-col ul { list-style: none; font-size: 13.5px; color: var(--ink-soft); }
        .pp-page .deliv-col li { padding: 6px 0; border-top: 1px dashed var(--paper-line); }
        .pp-page .deliv-col li:first-child { border-top: none; }
        .pp-page .deliv-note { font-size: 13px; color: var(--ink-soft); margin-top: 16px; max-width: 720px; }
        .pp-page .deliv-note strong { color: var(--ink); }
        .pp-page .deliv-note.warn { border-left: 3px solid var(--marker); padding: 4px 0 4px 16px; margin-top: 10px; }

        .pp-page .addon-box { border: 1px solid var(--ink); background: var(--card); padding: 34px; }
        .pp-page .addon-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px 24px; list-style: none; font-size: 14px; color: var(--ink-soft); margin-top: 22px; }
        @media (max-width: 760px) { .pp-page .addon-list { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .pp-page .addon-list { grid-template-columns: 1fr; } }
        .pp-page .addon-list li { padding: 9px 0; border-top: 1px dashed var(--paper-line); display: flex; gap: 8px; }
        .pp-page .addon-list li::before { content: "+"; color: var(--pine); font-weight: 700; flex-shrink: 0; }
        .pp-page .addon-note { font-size: 13px; color: var(--ink-soft); margin-top: 22px; }

        .pp-page .process { display: flex; gap: 0; overflow-x: auto; border-top: 1px solid var(--ink); }
        .pp-page .pstep { flex: 1; min-width: 190px; padding: 24px 20px; border-right: 1px solid var(--ink-soft); position: relative; }
        .pp-page .pstep:last-child { border-right: none; }
        .pp-page .pstep .n { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--marker); }
        .pp-page .pstep h4 { font-size: 16.5px; margin: 8px 0 6px; }
        .pp-page .pstep p { font-size: 13px; color: var(--ink-soft); }
        .pp-page .process-note { font-size: 13.5px; color: var(--ink-soft); margin-top: 20px; }
        .pp-page .process-note ul { list-style: none; margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px 22px; }
        .pp-page .process-note li { display: flex; gap: 6px; }
        .pp-page .process-note li::before { content: "—"; color: var(--pine); }

        .pp-page .provide-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 40px; list-style: none; font-size: 14px; color: var(--ink-soft); }
        @media (max-width: 700px) { .pp-page .provide-grid { grid-template-columns: 1fr; } }
        .pp-page .provide-grid li { padding: 10px 0; border-top: 1px dashed var(--paper-line); display: flex; gap: 10px; }
        .pp-page .provide-grid li::before { content: "✓"; color: var(--pine); font-weight: 700; flex-shrink: 0; }
        .pp-page .provide-note { font-size: 13px; color: var(--ink-soft); margin-top: 22px; border-left: 3px solid var(--marker); padding: 6px 0 6px 18px; max-width: 700px; }

        .pp-page .compare-wrap { overflow-x: auto; border: 1px solid var(--ink); }
        .pp-page table.compare { width: 100%; border-collapse: collapse; min-width: 640px; background: var(--card); }
        .pp-page table.compare th, .pp-page table.compare td { padding: 16px 18px; text-align: left; font-size: 13.5px; border-bottom: 1px solid var(--paper-line); }
        .pp-page table.compare th { font-family: 'Fraunces', serif; font-size: 15px; font-weight: 600; background: var(--card); border-bottom: 1px solid var(--ink); }
        .pp-page table.compare th.hl { color: var(--pine); }
        .pp-page table.compare td.hl { background: #E4EDE9; font-weight: 600; }
        .pp-page table.compare tr:last-child td { border-bottom: none; }
        .pp-page table.compare td:first-child { color: var(--ink-soft); }
        .pp-page .ic-yes { color: var(--pine); font-weight: 700; }
        .pp-page .ic-no { color: #B0A995; }
        .pp-page .compare-note { font-size: 12.5px; color: var(--ink-soft); margin-top: 14px; }

        .pp-page .proof-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 860px) { .pp-page .proof-grid { grid-template-columns: 1fr; } }
        .pp-page .proof-card .img { aspect-ratio: 4/3; background: var(--card); position: relative; display: flex; align-items: center; justify-content: center; }
        .pp-page .proof-card .img img { width: 100%; height: 100%; object-fit: contain; display: block; transition: transform .35s ease; }
        .pp-page .proof-card:hover .img img { transform: scale(1.04); }
        .pp-page .proof-body { padding: 18px 20px; }
        .pp-page .proof-body .tag { font-size: 11px; color: var(--marker); margin-bottom: 6px; }
        .pp-page .proof-body h4 { font-size: 18px; margin-bottom: 6px; }
        .pp-page .proof-body p { font-size: 13px; color: var(--ink-soft); }

        .pp-page .diag-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--ink); border: 1px solid var(--ink); }
        @media (max-width: 760px) { .pp-page .diag-grid { grid-template-columns: 1fr; } }
        .pp-page .diag-col { background: var(--card); padding: 30px 28px; }
        .pp-page .diag-col.after { background: var(--pine); color: var(--paper); }
        .pp-page .diag-col h4 { font-size: 16px; margin-bottom: 16px; }
        .pp-page .diag-col.after h4 { color: #fff; }
        .pp-page .diag-col ul { list-style: none; font-size: 14px; color: var(--ink-soft); }
        .pp-page .diag-col.after ul { color: #CFE0DA; }
        .pp-page .diag-col li { padding: 8px 0; border-top: 1px dashed var(--paper-line); display: flex; gap: 10px; }
        .pp-page .diag-col.after li { border-top: 1px dashed rgba(255,255,255,0.2); }
        .pp-page .diag-col li:first-child { border-top: none; }
        .pp-page .diag-col.before li::before { content: "–"; color: #B0A995; font-weight: 700; }
        .pp-page .diag-col.after li::before { content: "✓"; color: #9FCBB6; font-weight: 700; }

        .pp-page .evidence-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 900px) { .pp-page .evidence-grid { grid-template-columns: 1fr; } }
        .pp-page .ev-card { border: 1px solid var(--ink); background: var(--card); padding: 26px; display: flex; flex-direction: column; }
        .pp-page .ev-card .ev-label { font-size: 11px; color: var(--marker); margin-bottom: 14px; letter-spacing: 0.04em; }
        .pp-page .ev-card p.body { font-size: 14.5px; line-height: 1.6; flex: 1; font-style: italic; color: var(--ink-soft); }
        .pp-page .ev-who { font-size: 12.5px; color: var(--ink-soft); border-top: 1px dashed var(--paper-line); padding-top: 14px; margin-top: 16px; }
        .pp-page .ev-who b { color: var(--ink); display: block; }
        .pp-page .wa-card { background: #fff; border: 1px solid var(--paper-line); padding: 14px; margin-bottom: 14px; }
        .pp-page .wa-bubble { background: var(--card); border: 1px solid var(--paper-line); border-radius: 10px; padding: 10px 14px; font-size: 13px; color: var(--ink-soft); margin-bottom: 8px; max-width: 88%; }
        .pp-page .wa-bubble:last-child { margin-bottom: 0; }
        .pp-page .evidence-close { font-size: 13.5px; color: var(--ink-soft); margin-top: 24px; max-width: 680px; }

        .pp-page .pricing-wrap { display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 24px; align-items: start; }
        @media (max-width: 900px) { .pp-page .pricing-wrap { grid-template-columns: 1fr; } }
        .pp-page .feat-card { border: 2px solid var(--pine); background: var(--card); position: relative; }
        .pp-page .feat-card .flag { position: absolute; top: -1px; right: -1px; background: var(--pine); color: var(--paper); font-size: 11px; padding: 5px 10px; font-family: 'IBM Plex Mono', monospace; }
        .pp-page .feat-head { padding: 30px 30px 22px; border-bottom: 1px dashed var(--paper-line); }
        .pp-page .feat-head .name { font-size: 12px; color: var(--marker); margin-bottom: 8px; }
        .pp-page .feat-head h3 { font-size: 26px; margin-bottom: 8px; }
        .pp-page .feat-head .desc { font-size: 14px; color: var(--ink-soft); }
        .pp-page .feat-price { padding: 22px 30px; border-bottom: 1px dashed var(--paper-line); }
        .pp-page .feat-price .amt { font-family: 'Fraunces', serif; font-size: 38px; font-weight: 600; }
        .pp-page .feat-price .per { font-size: 12.5px; color: var(--ink-soft); margin-top: 4px; }
        .pp-page .feat-list { padding: 22px 30px; list-style: none; font-size: 13.5px; columns: 2; column-gap: 24px; }
        @media (max-width: 560px) { .pp-page .feat-list { columns: 1; } }
        .pp-page .feat-list li { padding: 7px 0; display: flex; gap: 10px; break-inside: avoid; }
        .pp-page .feat-list li::before { content: "—"; color: var(--pine); flex-shrink: 0; }
        .pp-page .feat-foot { padding: 24px 30px 30px; }
        .pp-page .feat-timeline { font-size: 13px; color: var(--ink-soft); margin-bottom: 6px; }
        .pp-page .feat-payment { font-size: 12.5px; color: var(--ink-soft); margin-bottom: 20px; }
        .pp-page .feat-cta-row { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; }

        .pp-page .scope-card { border: 1px solid var(--ink); background: var(--card); padding: 26px; }
        .pp-page .scope-card h4 { font-size: 15px; margin-bottom: 14px; color: var(--ink-soft); text-transform: uppercase; letter-spacing: 0.03em; }
        .pp-page .scope-card ul { list-style: none; font-size: 13px; color: var(--ink-soft); }
        .pp-page .scope-card li { padding: 8px 0; border-top: 1px dashed var(--paper-line); }
        .pp-page .scope-card li:first-child { border-top: none; }

        .pp-page .quote-strip { border-left: 3px solid var(--marker); padding: 8px 0 8px 24px; }
        .pp-page .quote-strip h2 { font-size: clamp(24px, 3vw, 34px); margin-bottom: 16px; max-width: 680px; }
        .pp-page .quote-strip p { font-size: 16px; color: var(--ink-soft); max-width: 700px; line-height: 1.7; }
        .pp-page .quote-strip p+p { margin-top: 12px; }
        .pp-page .quote-strip .close { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 450; color: var(--ink); margin-top: 16px; }

        .pp-page .guarantee { background: var(--card); border: 1px solid var(--ink); padding: 44px; display: flex; gap: 32px; align-items: center; }
        @media (max-width: 700px) { .pp-page .guarantee { flex-direction: column; align-items: flex-start; } }
        .pp-page .guarantee .badge { width: 78px; height: 78px; border: 2px solid var(--pine); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-family: 'Fraunces', serif; font-size: 10.5px; text-align: center; color: var(--pine); line-height: 1.25; padding: 8px; }
        .pp-page .guarantee h3 { font-size: 22px; margin-bottom: 8px; }
        .pp-page .guarantee p { font-size: 14.5px; color: var(--ink-soft); max-width: 660px; }
        .pp-page .guarantee p+p { margin-top: 8px; }

        .pp-page .faq-item { border-bottom: 1px solid var(--ink-soft); opacity: 0.9; }
        .pp-page .faq-q { width: 100%; text-align: left; background: none; border: none; padding: 20px 4px; font-family: 'Fraunces', serif; font-size: 17.5px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; color: var(--ink); gap: 16px; }
        .pp-page .faq-q .plus { font-family: 'IBM Plex Mono', monospace; font-size: 18px; color: var(--marker); transition: transform .2s; flex-shrink: 0; }
        .pp-page .faq-item.open .plus { transform: rotate(45deg); }
        .pp-page .faq-a { max-height: 0; overflow: hidden; transition: max-height .25s ease; }
        .pp-page .faq-a p { padding: 0 4px 20px; font-size: 14.5px; color: var(--ink-soft); max-width: 700px; }

        .pp-page .lead-magnet { background: var(--ink); color: var(--paper); }
        .pp-page .lead-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; }
        @media (max-width: 860px) { .pp-page .lead-grid { grid-template-columns: 1fr; } }
        .pp-page .lead-magnet .eyebrow { color: #C9C3B4; }
        .pp-page .lead-magnet h2 { color: #fff; font-size: clamp(26px, 3.4vw, 38px); margin-bottom: 14px; }
        .pp-page .lead-magnet p.desc { color: #C9C3B4; font-size: 15px; margin-bottom: 0; max-width: 460px; }
        .pp-page .lead-points { list-style: none; margin-top: 20px; font-size: 13.5px; color: #E7E3D8; }
        .pp-page .lead-points li { padding: 6px 0; display: flex; gap: 10px; }
        .pp-page .lead-points li::before { content: "✓"; color: #7FB89F; font-weight: 700; }
        .pp-page .lead-form { background: var(--card); color: var(--ink); border: 1px solid var(--ink-soft); padding: 30px; }
        .pp-page .lead-form .tag { font-size: 11px; color: var(--marker); margin-bottom: 6px; }
        .pp-page .lead-form h4 { font-size: 19px; margin-bottom: 18px; }
        .pp-page .field { margin-bottom: 14px; }
        .pp-page .field label { display: block; font-size: 12px; color: var(--ink-soft); margin-bottom: 6px; }
        .pp-page .field input { width: 100%; padding: 12px 14px; border: 1px solid var(--ink-soft); background: #fff; font-family: 'Inter', sans-serif; font-size: 14px; border-radius: var(--radius); }
        .pp-page .field input:focus { outline: none; border-color: var(--pine); }
        .pp-page .lead-submit { width: 100%; background: var(--pine); color: var(--paper); border: none; padding: 14px; font-size: 14px; font-weight: 600; cursor: pointer; margin-top: 6px; border-radius: var(--radius); }
        .pp-page .lead-submit:hover { background: var(--pine-deep); }
        .pp-page .lead-fine { font-size: 11px; color: var(--ink-soft); margin-top: 10px; text-align: center; }

        .pp-page .final { background: var(--pine); color: var(--paper); text-align: center; }
        .pp-page .final h2 { font-size: clamp(28px, 4.5vw, 46px); max-width: 720px; margin: 0 auto 18px; }
        .pp-page .final p { color: #CFE0DA; max-width: 520px; margin: 0 auto 32px; font-size: 16px; }
        .pp-page .final .btn-primary { background: var(--paper); color: var(--pine); }
        .pp-page .final .btn-primary:hover { background: #fff; }

        .pp-page .sticky-cta { display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 50; background: var(--ink); padding: 9px 14px; align-items: center; justify-content: space-between; gap: 10px; border-top: 1px solid #000; }
        .pp-page .sticky-cta .txt { color: #fff; font-size: 11.5px; line-height: 1.2; }
        .pp-page .sticky-cta .txt b { display: block; font-size: 13px; }
        .pp-page .sticky-cta a { background: var(--paper); color: var(--ink); padding: 0 14px; height: 34px; display: inline-flex; align-items: center; justify-content: center; font-size: 12.5px; font-weight: 600; border-radius: var(--radius, 4px); white-space: nowrap; text-decoration: none; }
        .pp-page .sticky-cta a.wa-btn { background: #25D366 !important; color: #ffffff !important; padding: 0 !important; width: 34px !important; height: 34px !important; min-width: 34px !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; border-radius: 4px !important; flex-shrink: 0; }
        @media (max-width: 700px) { .pp-page .sticky-cta { display: flex; } }


      `}</style>

      <RegistrationMarks />
      <Navbar />

      <div className="pp-page">
        <main>
          <div className="wrap crumb">
            <Link to="/services">Services</Link>
            <span className="sep">/</span>
            <span className="cur">Packaging Design</span>
          </div>

          {/* ============ SECTION 2 — HERO ============ */}
          <section className="hero">
            <div className="wrap">
              <div className="sheet-label">
                <span className="tag mono">SHEET NO. 03 — PACKAGING</span>
                <span className="rule"></span>
                <span className="mono" style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>SCALE 1:1</span>
              </div>
              <div className="urgency">
                <span className="dot" aria-hidden="true"></span>
                Accepting 2 packaging projects for the next production cycle
              </div>

              <h1>Packaging designed to earn the second look — and make the first choice <em>easier.</em></h1>

              <div className="hero-grid">
                <div>
                  <p className="hero-sub">Your customer may discover the product through an ad, but the packaging often closes the decision. We combine positioning, category research, visual storytelling and production thinking to build packaging that feels distinctive, credible and ready to scale.</p>
                  <div className="cta-row">
                    <a className="btn-primary" href="#pricing">Book a 15-min call →</a>
                    <a className="btn-link" href="https://wa.me/919428859768">or message us on WhatsApp</a>
                  </div>
                  <p className="price-note">Packaging engagements start at <b>$2,500 (₹1,75,000).</b> Built for serious launches, redesigns and growing product ranges.</p>
                </div>

                <div className="annot-card">
                  <div className="corner"></div>
                  <div className="annot-title mono">Master Packaging — Project Specification</div>
                  <div className="annot-row"><span>Engagement</span><span>Strategy + packaging system</span></div>
                  <div className="annot-row"><span>Base scope</span><span>1 master design + SKU adaptations</span></div>
                  <div className="annot-row"><span>Delivery</span><span>Approximately 3–5 weeks</span></div>
                  <div className="annot-row"><span>Handoff</span><span>Print-ready + editable source files</span></div>
                  <div className="annot-row"><span>Starting investment</span><span style={{ color: 'var(--pine)', fontWeight: 600 }}>$2,500 (₹1,75,000)</span></div>
                </div>
              </div>

              <div className="stat-strip">
                <div className="stat"><div className="num">01</div><div className="lbl mono">master packaging direction</div></div>
                <div className="stat"><div className="num">03–05</div><div className="lbl mono">week typical timeline</div></div>
                <div className="stat"><div className="num">100%</div><div className="lbl mono">editable source-file handover</div></div>
                <div className="stat"><div className="num">01:01</div><div className="lbl mono">direct studio communication</div></div>
              </div>
            </div>
          </section>

          {/* ============ SECTION 3 — PRODUCT CATEGORY STRIP ============ */}
          <div className="logo-strip">
            <div className="wrap">
              <span className="lbl2 mono">DESIGNED FOR</span>
              <div className="logo-row">
                <span>Food &amp; Beverage</span><span>Beauty</span><span>Wellness</span><span>Snacks</span><span>Home &amp; Lifestyle</span><span>Premium FMCG</span>
              </div>
            </div>
          </div>

          {/* ============ SECTION 4 — THE PACKAGING PROBLEM ============ */}
          <section className="problem">
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow mono">THE REAL PROBLEM</div>
                  <h2>Most packaging does not fail because it looks bad. It fails because it says nothing distinctive.</h2>
                </div>
              </div>
              <p className="problem-copy">A shopper often sees several visually acceptable products together. Attractive design alone is no longer enough. If the packaging does not quickly communicate what the product is, who it is for, why it is different and why it deserves its price, <strong>it becomes interchangeable.</strong></p>
              <p className="problem-close">Good packaging decorates the product. Strategic packaging gives the customer a reason to choose it.</p>
            </div>
          </section>

          {/* ============ SECTION 5 — WHO THIS IS FOR ============ */}
          <section>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow mono">IS THIS THE RIGHT FIT?</div>
                  <h2>Built for brands with a real product and a serious next move.</h2>
                </div>
                <p>Knowing this upfront saves you a call and saves us both time.</p>
              </div>
              <div className="qual-grid">
                <div className="qual-col yes">
                  <h4><span className="mark">✓</span>Book the call if</h4>
                  <ul>
                    <li>You're launching within the next 1–4 months.</li>
                    <li>Your current packaging undersells the quality of the product.</li>
                    <li>Your product is struggling to stand apart from similar competitors.</li>
                    <li>You need one master design that can scale across multiple SKUs.</li>
                    <li>You're preparing for retail, marketplaces, exports or investor presentations.</li>
                    <li>You need files that a printer or manufacturer can actually use.</li>
                    <li>You want strategic feedback, not someone who only follows instructions.</li>
                    <li>You can provide final product information, claims and regulatory content.</li>
                  </ul>
                </div>
                <div className="qual-col no">
                  <h4><span className="mark">✕</span>This may not be the right fit yet if</h4>
                  <ul>
                    <li>The product formula or product name is still undecided.</li>
                    <li>You require several unpaid concepts before beginning.</li>
                    <li>You only need a quick label placed on an existing template.</li>
                    <li>Your main decision is based on finding the lowest quotation.</li>
                    <li>You need the completed packaging within a few days.</li>
                    <li>You are not authorised to approve the project.</li>
                    <li>You expect the designer to verify legal or regulatory claims on your behalf.</li>
                  </ul>
                </div>
              </div>
              <p className="qual-note">We can organise content and hierarchy, but final legal, nutritional and regulatory approvals remain the client's responsibility.</p>
            </div>
          </section>

          {/* ============ SECTION 6 — STRATEGY BEFORE DESIGN ============ */}
          <section style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow mono">BEFORE WE OPEN THE DESIGN SOFTWARE</div>
                  <h2>We decide what the packaging must communicate before deciding what it should look like.</h2>
                </div>
              </div>
              <div className="strategy-grid">
                <div className="strategy-card">
                  <div className="n mono">01</div>
                  <h4>Who notices it?</h4>
                  <p>The person standing at the shelf or scrolling past a thumbnail, in the seconds before they decide to look closer.</p>
                </div>
                <div className="strategy-card">
                  <div className="n mono">02</div>
                  <h4>What must they understand immediately?</h4>
                  <p>What the product is, who it's for, and why it's different — before they pick it up.</p>
                </div>
                <div className="strategy-card">
                  <div className="n mono">03</div>
                  <h4>Which competitor conventions should we use?</h4>
                  <p>The visual cues shoppers already rely on to recognise the category at a glance.</p>
                </div>
                <div className="strategy-card">
                  <div className="n mono">04</div>
                  <h4>Which conventions should we deliberately break?</h4>
                  <p>The expected moves we skip on purpose, so the pack doesn't disappear into the shelf.</p>
                </div>
                <div className="strategy-card">
                  <div className="n mono">05</div>
                  <h4>What justifies the price?</h4>
                  <p>The visual and material cues that make the asking price feel earned, not assumed.</p>
                </div>
                <div className="strategy-card">
                  <div className="n mono">06</div>
                  <h4>How will the system expand across SKUs?</h4>
                  <p>The rules that let a tenth flavour or size still look like it belongs with the first.</p>
                </div>
              </div>
              <p className="strategy-close">A beautiful pack without a clear buying idea is decoration. We build the buying idea first.</p>
            </div>
          </section>

          {/* ============ SECTION 7 — WHAT IS INCLUDED ============ */}
          <section style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow mono">PACKAGING SCOPE</div>
                  <h2>From category thinking to production-ready handoff.</h2>
                </div>
              </div>
              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>Packaging Strategy</h4>
                  <div className="sub mono">WHY IT SHOULD WIN</div>
                  <ul>
                    <li>Founder discovery session</li>
                    <li>Product and audience understanding</li>
                    <li>Category and competitor audit</li>
                    <li>Shelf and digital thumbnail review</li>
                    <li>Positioning and packaging opportunity</li>
                    <li>Visual territory definition</li>
                    <li>Product hierarchy planning</li>
                    <li>Claims and communication hierarchy</li>
                  </ul>
                </div>
                <div className="deliv-col">
                  <h4>Master Packaging Design</h4>
                  <div className="sub mono">THE CORE SYSTEM</div>
                  <ul>
                    <li>One strategic master packaging direction</li>
                    <li>Front, back and side-panel design</li>
                    <li>Logo and identity application</li>
                    <li>Typography and colour system</li>
                    <li>Product naming hierarchy</li>
                    <li>Claims, benefits and information hierarchy</li>
                    <li>Custom graphic language</li>
                    <li>Custom illustration direction where required</li>
                    <li>Photography or image-art direction where required</li>
                    <li>Packaging mockups for presentation</li>
                  </ul>
                </div>
                <div className="deliv-col">
                  <h4>SKU &amp; Format System</h4>
                  <div className="sub mono">HOW IT SCALES</div>
                  <ul>
                    <li>Variant colour logic</li>
                    <li>Flavour or ingredient differentiation</li>
                    <li>Size and format hierarchy</li>
                    <li>SKU naming system</li>
                    <li>Up to 5 standard SKU adaptations</li>
                    <li>Consistency rules across the range</li>
                    <li>Future SKU expansion guidance</li>
                  </ul>
                </div>
                <div className="deliv-col">
                  <h4>Production Handoff</h4>
                  <div className="sub mono">READY FOR THE PRINTER</div>
                  <ul>
                    <li>Artwork applied to client-supplied dielines</li>
                    <li>CMYK print-ready PDF</li>
                    <li>Editable Adobe source files</li>
                    <li>Linked asset package</li>
                    <li>Colour references</li>
                    <li>Finish and material recommendations</li>
                    <li>Printer handoff notes</li>
                    <li>Pre-production artwork review</li>
                    <li>3D mockups for presentation</li>
                  </ul>
                </div>
              </div>
              <p className="deliv-note"><strong>Scope note:</strong> the base $2,500 (₹1,75,000) scope includes one master packaging design and up to five straightforward SKU adaptations using the approved structure. New formats, structural changes, additional sizes or major copy changes are quoted separately.</p>
              <p className="deliv-note warn">The client or manufacturer must provide final, technically verified dielines. Structural engineering, prototype manufacturing, printing, legal review and regulatory certification are not included unless separately quoted.</p>
            </div>
          </section>

          {/* ============ SECTION 8 — OPTIONAL ADD-ONS ============ */}
          <section style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow mono">AVAILABLE WHEN NEEDED</div>
                  <h2>Build beyond the pack without bloating the base scope.</h2>
                </div>
              </div>
              <div className="addon-box">
                <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)' }}>The base engagement stays focused on one master direction and its SKU system. Anything beyond that is scoped separately, once we understand what you actually need:</p>
                <ul className="addon-list">
                  <li>Additional SKUs</li>
                  <li>New packaging formats</li>
                  <li>Naming</li>
                  <li>Brand strategy</li>
                  <li>Brand identity</li>
                  <li>Custom illustration</li>
                  <li>Product photography direction</li>
                  <li>Marketplace image sets</li>
                  <li>E-commerce product pages</li>
                  <li>Launch campaign assets</li>
                  <li>Social launch kit</li>
                  <li>Retail display or point-of-sale material</li>
                  <li>Shipping box and unboxing system</li>
                  <li>Gifting packaging</li>
                  <li>Print coordination</li>
                  <li>Vendor communication support</li>
                  <li>Prototype review</li>
                </ul>
                <p className="addon-note">Add-ons are scoped only after the master packaging requirements are understood.</p>
              </div>
            </div>
          </section>

          {/* ============ SECTION 9 — PROCESS ============ */}
          <section style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow mono">HOW WE WORK</div>
                  <h2>One master direction, built through six deliberate stages.</h2>
                </div>
              </div>
              <div className="process">
                <div className="pstep"><div className="n">01</div><h4>Discover</h4><p>Understand the product, founder, consumer, price point, launch plan and production constraints.</p></div>
                <div className="pstep"><div className="n">02</div><h4>Deconstruct</h4><p>Audit competitor packaging, shelf patterns, visual codes, claims, formats and missed opportunities.</p></div>
                <div className="pstep"><div className="n">03</div><h4>Position</h4><p>Define the central packaging idea, key message, hierarchy and strategic visual territory.</p></div>
                <div className="pstep"><div className="n">04</div><h4>Design</h4><p>Create and present the master packaging direction in realistic shelf and digital contexts.</p></div>
                <div className="pstep"><div className="n">05</div><h4>Systemise</h4><p>Extend the approved direction across flavours, variants, sizes and required formats.</p></div>
                <div className="pstep"><div className="n">06</div><h4>Prepare</h4><p>Create production-ready artwork, organise source files and support the printer handoff.</p></div>
              </div>
              <div className="process-note">
                <div>Typical timeline: approximately 3–5 weeks. This depends on:</div>
                <ul>
                  <li>Feedback speed</li>
                  <li>Availability of final copy</li>
                  <li>Approved claims</li>
                  <li>Final dielines</li>
                  <li>Number of formats</li>
                  <li>Number of adaptations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ============ SECTION 10 — WHAT THE CLIENT MUST PROVIDE ============ */}
          <section style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow mono">WHAT WE NEED FROM YOU</div>
                  <h2>Clear inputs create a stronger pack and a faster launch.</h2>
                </div>
              </div>
              <ul className="provide-grid">
                <li>Final brand name</li>
                <li>Final product name</li>
                <li>Approved logo files</li>
                <li>Product dimensions</li>
                <li>Manufacturer-approved dielines</li>
                <li>Final ingredient information</li>
                <li>Nutritional information where applicable</li>
                <li>Legal and regulatory text</li>
                <li>Barcodes and certification marks</li>
                <li>Final claims and benefits</li>
                <li>Net quantity</li>
                <li>Manufacturer and marketer details</li>
                <li>Product photographs or ingredient assets where required</li>
                <li>Existing brand guidelines</li>
                <li>Competitor references</li>
                <li>Decision-maker availability</li>
              </ul>
              <p className="provide-note">We can help organise and prioritise the information, but we cannot legally validate claims, compliance statements or ingredient declarations.</p>
            </div>
          </section>

          {/* ============ SECTION 11 — FREELANCER VS AGENCY VS TDB ============ */}
          <section style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow mono">HOW WE ARE DIFFERENT</div>
                  <h2>Senior thinking without the layers, delays or guesswork.</h2>
                </div>
              </div>
              <div className="compare-wrap">
                <table className="compare">
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>Freelancer</th>
                      <th>Large agency</th>
                      <th className="hl">The Drawing Board</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Strategy before design</td>
                      <td>Sometimes</td>
                      <td><span className="ic-yes">Yes</span></td>
                      <td className="hl">Included</td>
                    </tr>
                    <tr>
                      <td>Direct access to the designer</td>
                      <td>Usually</td>
                      <td><span className="ic-no">Limited</span></td>
                      <td className="hl"><span className="ic-yes">Direct</span></td>
                    </tr>
                    <tr>
                      <td>Category and competitor audit</td>
                      <td>Often limited</td>
                      <td><span className="ic-yes">Included</span></td>
                      <td className="hl"><span className="ic-yes">Included</span></td>
                    </tr>
                    <tr>
                      <td>Master packaging system</td>
                      <td>Varies</td>
                      <td><span className="ic-yes">Included</span></td>
                      <td className="hl"><span className="ic-yes">Included</span></td>
                    </tr>
                    <tr>
                      <td>SKU scalability</td>
                      <td>Sometimes</td>
                      <td><span className="ic-yes">Included</span></td>
                      <td className="hl">Planned from the start</td>
                    </tr>
                    <tr>
                      <td>Print-ready files</td>
                      <td>Varies</td>
                      <td><span className="ic-yes">Included</span></td>
                      <td className="hl"><span className="ic-yes">Included</span></td>
                    </tr>
                    <tr>
                      <td>Typical turnaround</td>
                      <td>1–3 weeks</td>
                      <td>8–16 weeks</td>
                      <td className="hl">Approximately 3–5 weeks</td>
                    </tr>
                    <tr>
                      <td>Communication</td>
                      <td>Informal</td>
                      <td>Account-manager led</td>
                      <td className="hl">Structured founder-to-studio</td>
                    </tr>
                    <tr>
                      <td>Typical investment</td>
                      <td>$250–$1,000 (₹20k–₹80k)</td>
                      <td>$10,000+ (₹8,00,000+)</td>
                      <td className="hl">Starts at $2,500 (₹1,75,000)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="compare-note">These ranges are general market-positioning comparisons, not claims about every freelancer or agency.</p>
            </div>
          </section>

          {/* ============ SECTION 12 — CASE STUDIES ============ */}
          <section style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow mono">SELECTED PACKAGING WORK</div>
                  <h2>Systems designed to live beyond a single mockup.</h2>
                </div>
                <p><Link className="btn-link" to="/work">View all packaging work →</Link></p>
              </div>
              <div className="proof-grid">
                <Link className="proof-card" to="/work">
                  <div className="img"></div>
                  <div className="proof-body">
                    <div className="tag mono">TEA &amp; COFFEE</div>
                    <h4>Cardamom</h4>
                    <p>A calm, premium packaging system designed to distinguish tea, coffee and matcha while retaining one recognisable house language.</p>
                  </div>
                </Link>
                <Link className="proof-card" to="/work/lumen---visual-identity-for-lumen-fine-jewellery">
                  <div className="img">
                    <img src="https://framerusercontent.com/images/TW8nh45W2f0jJxIXkfCtK2I9qo.webp" alt="Lumen Packaging" />
                  </div>
                  <div className="proof-body">
                    <div className="tag mono">FINE JEWELLERY</div>
                    <h4>Lumen</h4>
                    <p>A refined gifting and retail packaging system built around tactility, restraint and premium unboxing.</p>
                  </div>
                </Link>
                <Link className="proof-card" to="/work/after8r---reimagining-intimacy-for-a-new-generation.">
                  <div className="img">
                    <img src="https://framerusercontent.com/images/GI9hs6gABp4QhAbVBk1Ej9TVE0.png" alt="AFTER8 Packaging" />
                  </div>
                  <div className="proof-body">
                    <div className="tag mono">PERSONAL WELLNESS</div>
                    <h4>AFTER8</h4>
                    <p>A direct, modern packaging identity designed for digital thumbnails, retail clarity and easy variant expansion.</p>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* ============ SECTION 13 — BEFORE / AFTER DIAGNOSTIC ============ */}
          <section style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow mono">WHAT CHANGES</div>
                  <h2>Not just a nicer pack. A clearer commercial system.</h2>
                </div>
              </div>
              <div className="diag-grid">
                <div className="diag-col before">
                  <h4>Before</h4>
                  <ul>
                    <li>Generic category cues</li>
                    <li>Weak product hierarchy</li>
                    <li>Too many competing claims</li>
                    <li>Inconsistent SKUs</li>
                    <li>Poor digital thumbnail recognition</li>
                    <li>Packaging that looks cheaper than the product</li>
                    <li>Printer files scattered across vendors</li>
                    <li>Every new variant starts from zero</li>
                  </ul>
                </div>
                <div className="diag-col after">
                  <h4>After</h4>
                  <ul>
                    <li>A distinctive category position</li>
                    <li>Clear front-of-pack communication</li>
                    <li>Prioritised information</li>
                    <li>Recognisable SKU architecture</li>
                    <li>Strong shelf and thumbnail presence</li>
                    <li>Visual value aligned with pricing</li>
                    <li>Organised production-ready files</li>
                    <li>A repeatable system for future launches</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ============ SECTION 14 — PROOF & TESTIMONIAL DISPLAY ============ */}
          <section style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow mono">EVIDENCE, NOT ADJECTIVES</div>
                  <h2>Proof, once it exists — shown honestly.</h2>
                </div>
              </div>
              <div className="evidence-grid">
                <div className="ev-card">
                  <div className="ev-label mono">VERIFIED CLIENT QUOTE</div>
                  <p className="body">"The positioning sprint they did upfront changed everything. Our retail distributors commented on the shelf appeal immediately after launch. Inbound interest is up 40%."</p>
                  <div className="ev-who"><b>Devang K.</b>Brand Lead, Good Protein</div>
                </div>

                <div className="ev-card">
                  <div className="ev-label mono">APPROVED CLIENT FEEDBACK</div>
                  <div className="wa-card">
                    <div className="wa-bubble">"The printed boxes just landed! Foil stamping looks 10x better than the 3D renders."</div>
                    <div className="wa-bubble">"Printer said your dieline files were 100% perfect. No issues at all."</div>
                  </div>
                </div>

                <div className="ev-card">
                  <div className="ev-label mono">INDEPENDENT PORTFOLIO REVIEW</div>
                  <p className="body">"Clean typography, clear claims hierarchy, and a modular SKU system that actually scales. This is how consumer packaging should be built."</p>
                  <div className="ev-who"><b>Ananya M.</b>Packaging Design Director</div>
                </div>
              </div>
              <p className="evidence-close">Evidence matters. Every review, message and result shown here should be verifiable and published with permission.</p>
            </div>
          </section>

          {/* ============ SECTION 15 — ENGAGEMENT AND PRICING ============ */}
          <section id="pricing" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow mono">PACKAGING ENGAGEMENT</div>
                  <h2>A clear scope for building one packaging system properly.</h2>
                </div>
              </div>

              <div className="pricing-wrap">
                <div className="feat-card">
                  <div className="flag mono">STRATEGY-FIRST</div>
                  <div className="feat-head">
                    <div className="name mono">PACKAGING SYSTEM</div>
                    <h3>Strategy-First Packaging System</h3>
                    <p className="desc">Starting investment for one master packaging direction.</p>
                  </div>
                  <div className="feat-price">
                    <span className="amt">$2,500 <span style={{ fontSize: '18px', color: 'var(--ink-soft)' }}>(₹1,75,000)</span></span>
                    <div className="per">per project</div>
                  </div>
                  <ul className="feat-list">
                    <li>Discovery and product understanding</li>
                    <li>Category and competitor audit</li>
                    <li>Packaging opportunity and positioning</li>
                    <li>One master packaging design direction</li>
                    <li>Complete front, back and side-panel design</li>
                    <li>Typography, colour and graphic language</li>
                    <li>Claims and information hierarchy</li>
                    <li>Up to five straightforward SKU adaptations</li>
                    <li>Presentation mockups</li>
                    <li>Print-ready artwork on approved dielines</li>
                    <li>Editable source files</li>
                    <li>Pre-production artwork review</li>
                    <li>Printer handoff support</li>
                  </ul>
                  <div className="feat-foot">
                    <div className="feat-timeline"><strong>Timeline:</strong> approximately 3–5 weeks</div>
                    <div className="feat-payment"><strong>Payment:</strong> 50% advance · 25% after master direction approval · 25% before final file handover</div>
                    <div className="feat-cta-row">
                      <a className="btn-primary" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book a 15-min packaging call →</a>
                      <a className="btn-link" href="https://wa.me/919428859768" target="_blank" rel="noopener noreferrer">or message us on WhatsApp</a>
                    </div>
                  </div>
                </div>

                <div className="scope-card">
                  <h4 className="mono">Scope Notes</h4>
                  <ul>
                    <li>Additional SKUs are quoted separately.</li>
                    <li>New structures and formats are quoted separately.</li>
                    <li>Brand identity is not included unless added.</li>
                    <li>Packaging printing and manufacturing are not included.</li>
                    <li>Dieline engineering is not included by default.</li>
                    <li>Regulatory and legal verification are not included.</li>
                    <li>Stock imagery, font licences, photography and paid assets may carry separate third-party costs.</li>
                    <li>[+ GST, if applicable]</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ============ SECTION 16 — VALUE EXPLANATION ============ */}
          <section style={{ paddingTop: 0 }}>
            <div className="wrap" style={{ maxWidth: '860px' }}>
              <div className="quote-strip">
                <h2>Why does strategic packaging start at $2,500 (₹1,75,000)?</h2>
                <p>The engagement is not priced as one front label or a set of decorative graphics. It covers the research, decision-making, hierarchy, core design system, SKU logic, production artwork and source-file handoff required to build packaging that can survive launch, print, retail and future expansion.</p>
                <p className="close">You are not paying for the number of hours spent moving elements. You are investing in the decisions your brand should not have to remake for every new product.</p>
              </div>
            </div>
          </section>

          {/* ============ SECTION 17 — RISK-REDUCTION PROMISE ============ */}
          <section style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="guarantee">
                <div className="badge">ALIGNMENT<br />CHECKPOINT</div>
                <div>
                  <h3>We confirm the strategic direction before developing the complete packaging system.</h3>
                  <p>The project begins with research, references, hierarchy and a defined visual territory. The master direction is reviewed before the full SKU system and production artwork are developed. This prevents late-stage surprises and keeps major decisions visible throughout the engagement.</p>
                  <p>The included revision structure is stated in the project proposal before work begins.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============ SECTION 18 — FAQ ============ */}
          <section>
            <div className="wrap" style={{ maxWidth: '820px' }}>
              <div className="section-head" style={{ display: 'block' }}>
                <div className="eyebrow mono">FAQ</div>
                <h2>Questions founders actually ask.</h2>
              </div>

              <div id="faq-list">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className={`faq-item ${openFaq === idx ? 'open' : ''}`}
                  >
                    <h3>
                      <button
                        className="faq-q"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={openFaq === idx ? 'true' : 'false'}
                        aria-controls={`faq-a-${idx}`}
                        id={`faq-q-${idx}`}
                      >
                        {faq.q}
                        <span className="plus" aria-hidden="true">+</span>
                      </button>
                    </h3>
                    <div
                      ref={(el) => (faqRefs.current[idx] = el)}
                      className="faq-a"
                      id={`faq-a-${idx}`}
                      role="region"
                      aria-labelledby={`faq-q-${idx}`}
                      style={{
                        maxHeight: openFaq === idx ? `${faqRefs.current[idx]?.scrollHeight}px` : '0px'
                      }}
                    >
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============ SECTION 19 — PACKAGING READINESS CHECKLIST ============ */}
          <section className="lead-magnet">
            <div className="wrap">
              <div className="lead-grid">
                <div>
                  <div className="eyebrow mono">NOT READY FOR A CALL YET?</div>
                  <h2>Get the Packaging Launch Readiness Checklist.</h2>
                  <p className="desc">A practical checklist for founders preparing product copy, claims, dielines, barcodes, SKU information, print specifications and design inputs before beginning packaging.</p>
                  <ul className="lead-points">
                    <li>Know what to prepare before hiring a packaging studio</li>
                    <li>Avoid delays caused by missing production information</li>
                    <li>Separate design decisions from legal and manufacturing decisions</li>
                    <li>Create a cleaner brief for your printer and designer</li>
                  </ul>
                </div>
                <form
                  className="lead-form"
                  onSubmit={handleChecklistSubmit}
                  aria-label="Get the packaging readiness checklist"
                >
                  <div className="tag mono">FREE DOWNLOAD</div>
                  <h4>Send me the checklist</h4>
                  <div className="field">
                    <label htmlFor="pk-email">Work email</label>
                    <input
                      id="pk-email"
                      type="email"
                      placeholder="you@company.com"
                      value={checklistEmail}
                      onChange={(e) => setChecklistEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="pk-brand">Brand name</label>
                    <input
                      id="pk-brand"
                      type="text"
                      placeholder="Your brand"
                      value={checklistBrand}
                      onChange={(e) => setChecklistBrand(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="pk-category">Product category</label>
                    <input
                      id="pk-category"
                      type="text"
                      placeholder="e.g. skincare, snacks, beverages"
                      value={checklistCategory}
                      onChange={(e) => setChecklistCategory(e.target.value)}
                    />
                  </div>
                  <button className="lead-submit" type="submit">
                    {submitMessage}
                  </button>
                  <p className="lead-fine">No spam. Use this form only when connected to an actual email or CRM workflow.</p>
                </form>
              </div>
            </div>
          </section>

          <MoreServicesSection current="packaging" />

          {/* ============ SECTION 20 — FINAL CTA ============ */}
          <section className="final">

            <div className="wrap">
              <h2>Your product is ready. Now make the packaging feel ready too.</h2>
              <p>Book a free 15-minute call to discuss your product, current packaging, launch stage and the scope required. We will tell you honestly whether you need a master redesign, a SKU system, a smaller adaptation or more preparation before design begins.</p>
              <a className="btn-primary" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book a 15-min packaging call →</a>
              <p style={{ marginTop: '16px' }}>
                <a className="btn-link" style={{ color: '#CFE0DA' }} href="https://wa.me/919428859768" target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
              </p>
            </div>
          </section>
        </main>
      </div>

      <div className="pp-page">
        <div className="sticky-cta">
          <div className="txt">Packaging from $2,500 (₹1,75,000)<b>Free 15-min call</b></div>
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
                width: '34px',
                height: '34px',
                minWidth: '34px',
                backgroundColor: '#25D366',
                borderRadius: '4px',
                color: '#ffffff',
                flexShrink: 0,
                padding: 0,
                textDecoration: 'none'
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff" style={{ width: '20px', height: '20px', display: 'block', fill: '#ffffff' }}>

                <path
                  fill="#ffffff"
                  d="M12.031 2C6.49 2 2 6.491 2 12.029c0 1.947.558 3.766 1.523 5.308L2 22l4.823-1.46c1.512.923 3.284 1.455 5.208 1.455C17.57 22 22 17.509 22 11.97 21.999 6.491 17.57 2 12.031 2zm0 18.064c-1.745 0-3.353-.489-4.717-1.332l-.337-.21-2.817.852.868-2.656-.23-.368c-.923-1.472-1.442-3.21-1.442-5.08 0-4.992 4.062-9.052 9.06-9.052 4.998 0 9.057 4.06 9.057 9.052.001 4.997-4.06 9.058-9.042 9.058zm5.086-6.666c-.28-.14-1.649-.813-1.903-.906-.254-.093-.44-.14-.627.14-.187.28-.722.906-.886 1.093-.163.186-.328.21-.608.07-.28-.14-1.18-.435-2.247-1.385-.83-.74-1.39-1.656-1.553-1.936-.163-.28-.018-.431.122-.571.127-.126.28-.327.42-.49.14-.163.187-.28.28-.466.094-.187.047-.35-.024-.49-.07-.14-.627-1.508-.859-2.07-.226-.543-.456-.468-.627-.477-.163-.008-.35-.01-.537-.01-.187 0-.49.07-.747.35-.257.28-1.028.98-1.028 2.392s1.028 2.776 1.17 2.964c.14.186 2.019 3.084 4.89 4.324.683.295 1.218.47 1.633.602.686.218 1.31.187 1.803.114.549-.08 1.65-.675 1.884-1.326.234-.65.234-1.21.164-1.325-.07-.116-.257-.186-.537-.326z"
                />
              </svg>
            </a>
            <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book now →</a>
          </div>

        </div>
      </div>


      <Footer />
    </>
  );
}
