import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';

/* ─────────────────────────────────────────────────────────────────────────────
   PackagingPage — pixel-perfect port of the branding-page-redesign HTML design
   adapted for Packaging Design service with real project images & data
   ───────────────────────────────────────────────────────────────────────────── */
export default function PackagingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ email: '', company: '' });

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "What's included in a packaging dieline?",
      a: "A full structural dieline with cut, fold, and bleed marks in Illustrator/PDF format — ready to send directly to your manufacturer for printing.",
    },
    {
      q: "Do you design labels, boxes, and sleeves?",
      a: "Yes — we handle all form factors: primary packaging (boxes, bottles, pouches, tubes), secondary packaging (outer boxes, shippers), and labels for any surface.",
    },
    {
      q: "What are 3D product renders used for?",
      a: "Photorealistic renders let you see the final packaging before printing — useful for investor decks, Amazon listings, social media, and retailer pitches before committing to a print run.",
    },
    {
      q: "How many SKUs are included per project?",
      a: "The Foundation tier covers a single SKU. The Brand Suite covers up to 6 SKUs. Additional SKUs beyond 6 are quoted per unit once we know your full product range.",
    },
    {
      q: "Do you coordinate with our packaging supplier?",
      a: "Yes — direct printer handoff and sample review support are included in all packaging engagements. We also help you evaluate supplier quotes on technical specs.",
    },
    {
      q: "Can you match existing brand guidelines?",
      a: "Absolutely. If you have an existing brand system, we apply it faithfully to the packaging. If not, we'll develop the visual language as part of the project.",
    },
    {
      q: "What finish specs do you specify?",
      a: "We specify matte/gloss lamination, soft-touch, spot UV, embossing, debossing, foil stamping, and varnish — depending on what your material and budget allow.",
    },
    {
      q: "What file formats do I receive?",
      a: "You receive print-ready CMYK PDFs, layered Illustrator source files, high-res PNG/JPEG mockups, and 3D render files. Everything is print-and-press ready.",
    },
    {
      q: "What are the payment terms?",
      a: "50% to begin work, 50% on final delivery. For multi-SKU Brand Suites, we can split into milestone payments — ask on the call.",
    },
    {
      q: "How long does packaging design take?",
      a: "Single-SKU projects typically complete in 3–4 weeks. Multi-SKU Brand Suites run 4–6 weeks depending on complexity and the number of concepts.",
    },
  ];

  return (
    <>
      <style>{`
        /* ── Packaging Page Scoped Styles (pp-* prefix) ──────────────── */

        /* hero */
        .pp-hero { padding: 88px 0 64px; position: relative; }
        .pp-sheet-label { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }
        .pp-sheet-label .tag { font-size: 12px; padding: 6px 10px; border: 1px solid var(--ink); }
        .pp-sheet-label .rule { flex: 1; height: 1px; background: var(--ink-soft); opacity: 0.4; }
        .pp-hero h1 { font-size: clamp(38px, 5.4vw, 72px); max-width: 920px; }
        .pp-hero h1 em { font-style: normal; color: var(--pine); }
        .pp-hero-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 56px; align-items: start; margin-top: 34px; }
        @media (max-width: 920px) { .pp-hero-grid { grid-template-columns: 1fr; } }
        .pp-hero-sub { font-size: 18px; color: var(--ink-soft); max-width: 520px; margin-bottom: 30px; }
        .pp-cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; margin-bottom: 20px; }
        .pp-btn-primary { background: var(--pine); color: var(--paper); padding: 15px 26px; font-size: 14.5px; font-weight: 600; border-radius: var(--radius); display: inline-flex; align-items: center; gap: 8px; transition: background .15s; text-decoration: none; }
        .pp-btn-primary:hover { background: var(--pine-deep); }
        .pp-btn-link { font-size: 14.5px; border-bottom: 1px solid currentColor; padding-bottom: 2px; color: var(--ink-soft); text-decoration: none; }
        .pp-price-note { font-size: 13px; color: var(--ink-soft); }
        .pp-price-note b { color: var(--ink); }

        /* annotated card */
        .pp-annot-card { background: var(--card); border: 1px solid var(--ink); padding: 26px; position: relative; }
        .pp-annot-card .corner { position: absolute; top: -1px; right: -1px; width: 26px; height: 26px; background: var(--marker); clip-path: polygon(0 0, 100% 0, 100% 100%); }
        .pp-annot-row { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px dashed var(--paper-line); padding: 10px 0; font-size: 13px; }
        .pp-annot-row:last-child { border-bottom: none; }
        .pp-annot-row span:first-child { color: var(--ink-soft); }
        .pp-annot-title { font-size: 12px; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 14px; }

        /* stat strip */
        .pp-stat-strip { display: flex; gap: 0; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); margin-top: 56px; }
        .pp-stat { flex: 1; padding: 22px 24px; border-right: 1px solid var(--ink); }
        .pp-stat:last-child { border-right: none; }
        .pp-stat .num { font-family: 'Fraunces', serif; font-size: 34px; font-weight: 600; color: var(--pine); }
        .pp-stat .lbl { font-size: 12.5px; color: var(--ink-soft); margin-top: 4px; }
        @media (max-width: 700px) { .pp-stat-strip { flex-wrap: wrap; } .pp-stat { flex: 1 1 50%; border-bottom: 1px solid var(--ink); } }

        /* urgency badge */
        .pp-urgency { display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; background: var(--card); border: 1px solid var(--ink); padding: 7px 12px; margin-bottom: 22px; }
        .pp-urgency .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--marker); animation: pp-pulse 1.6s infinite; }
        @keyframes pp-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        /* section head */
        .pp-section-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 44px; flex-wrap: wrap; }
        .pp-eyebrow { font-size: 12px; color: var(--marker); margin-bottom: 10px; }
        .pp-section-head h2 { font-size: clamp(28px, 3.4vw, 42px); max-width: 640px; }
        .pp-section-head p { color: var(--ink-soft); max-width: 380px; font-size: 15px; }

        /* logo strip */
        .pp-logo-strip { border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); padding: 0; }
        .pp-logo-strip .pp-wrap { display: flex; align-items: center; gap: 0; padding: 0 32px; max-width: 1180px; margin: 0 auto; }
        .pp-logo-strip .lbl2 { font-size: 11px; color: var(--ink-soft); padding: 18px 24px 18px 0; white-space: nowrap; border-right: 1px solid var(--paper-line); }
        .pp-logo-row { display: flex; flex: 1; overflow-x: auto; }
        .pp-logo-row span { flex: 1; text-align: center; padding: 18px 20px; font-family: 'Fraunces', serif; font-weight: 600; font-size: 16px; color: var(--ink-soft); border-right: 1px solid var(--paper-line); white-space: nowrap; }
        .pp-logo-row span:last-child { border-right: none; }

        /* problem section */
        .pp-problem-section { background: var(--ink); color: var(--paper); padding: 80px 0; }
        .pp-problem-section .pp-section-head p, .pp-problem-section .pp-eyebrow { color: #C9C3B4; }
        .pp-problem-copy { font-size: 19px; line-height: 1.65; max-width: 760px; color: #E7E3D8; }
        .pp-problem-copy strong { color: #fff; }

        /* deliverables grid */
        .pp-deliv-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--ink); border: 1px solid var(--ink); }
        @media (max-width: 900px) { .pp-deliv-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .pp-deliv-grid { grid-template-columns: 1fr; } }
        .pp-deliv-col { background: var(--card); padding: 26px 22px; }
        .pp-deliv-col h4 { font-size: 15px; margin-bottom: 6px; }
        .pp-deliv-col .sub { font-size: 12px; color: var(--marker); margin-bottom: 16px; }
        .pp-deliv-col ul { list-style: none; font-size: 13.5px; color: var(--ink-soft); }
        .pp-deliv-col li { padding: 7px 0; border-top: 1px dashed var(--paper-line); }
        .pp-deliv-col li:first-child { border-top: none; }

        /* process steps */
        .pp-process { display: flex; gap: 0; overflow-x: auto; border-top: 1px solid var(--ink); }
        .pp-pstep { flex: 1; min-width: 190px; padding: 24px 20px; border-right: 1px solid var(--ink-soft); position: relative; }
        .pp-pstep:last-child { border-right: none; }
        .pp-pstep .n { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--marker); }
        .pp-pstep h4 { font-size: 17px; margin: 8px 0 6px; }
        .pp-pstep p { font-size: 13px; color: var(--ink-soft); }

        /* qualifier grid */
        .pp-qual-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--ink); border: 1px solid var(--ink); }
        @media (max-width: 760px) { .pp-qual-grid { grid-template-columns: 1fr; } }
        .pp-qual-col { background: var(--card); padding: 30px 28px; }
        .pp-qual-col.pp-no { background: #EFEBE2; }
        .pp-qual-col h4 { font-size: 16px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
        .pp-qual-col h4 .mark { width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
        .pp-qual-col.pp-yes h4 .mark { background: var(--pine); color: var(--paper); }
        .pp-qual-col.pp-no h4 .mark { background: transparent; border: 1.5px solid var(--ink-soft); color: var(--ink-soft); }
        .pp-qual-col ul { list-style: none; font-size: 14px; color: var(--ink-soft); }
        .pp-qual-col li { padding: 8px 0; border-top: 1px dashed var(--paper-line); }
        .pp-qual-col li:first-child { border-top: none; }

        /* comparison table */
        .pp-compare-wrap { overflow-x: auto; border: 1px solid var(--ink); }
        table.pp-compare { width: 100%; border-collapse: collapse; min-width: 640px; background: var(--card); }
        table.pp-compare th, table.pp-compare td { padding: 16px 18px; text-align: left; font-size: 13.5px; border-bottom: 1px solid var(--paper-line); }
        table.pp-compare th { font-family: 'Fraunces', serif; font-size: 15px; font-weight: 600; background: var(--card); border-bottom: 1px solid var(--ink); }
        table.pp-compare th.hl { color: var(--pine); }
        table.pp-compare td.hl { background: #E4EDE9; font-weight: 600; }
        table.pp-compare tr:last-child td { border-bottom: none; }
        table.pp-compare td:first-child { color: var(--ink-soft); }
        .pp-ic-yes { color: var(--pine); font-weight: 700; }
        .pp-ic-no { color: #B0A995; }

        /* proof grid */
        .pp-proof-grid { display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 20px; }
        @media (max-width: 860px) { .pp-proof-grid { grid-template-columns: 1fr; } }
        .pp-proof-card { border: 1px solid var(--ink); background: var(--card); overflow: hidden; transition: box-shadow .2s; }
        .pp-proof-card:hover { box-shadow: 0 4px 20px rgba(27,27,23,0.12); }
        .pp-proof-img { position: relative; aspect-ratio: 4/3; overflow: hidden; }
        .pp-proof-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .35s ease; }
        .pp-proof-card:hover .pp-proof-img img { transform: scale(1.04); }
        .pp-proof-body { padding: 18px 20px; }
        .pp-proof-body .tag { font-size: 11px; color: var(--marker); margin-bottom: 6px; }
        .pp-proof-body h4 { font-size: 18px; margin-bottom: 6px; }
        .pp-proof-body p { font-size: 13px; color: var(--ink-soft); }
        .pp-proof-card.big .pp-proof-img { aspect-ratio: 16/10; }
        .pp-proof-metric { display: inline-block; margin-top: 12px; font-family: 'IBM Plex Mono', monospace; font-size: 13px; background: var(--pine); color: var(--paper); padding: 5px 10px; }

        /* guarantee */
        .pp-guarantee { background: var(--card); border: 1px solid var(--ink); padding: 44px; display: flex; gap: 32px; align-items: center; }
        @media (max-width: 700px) { .pp-guarantee { flex-direction: column; align-items: flex-start; } }
        .pp-guarantee .pp-badge { width: 74px; height: 74px; border: 2px solid var(--pine); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-family: 'Fraunces', serif; font-size: 11px; text-align: center; color: var(--pine); line-height: 1.2; padding: 8px; }
        .pp-guarantee h3 { font-size: 22px; margin-bottom: 8px; }
        .pp-guarantee p { font-size: 14.5px; color: var(--ink-soft); max-width: 640px; }

        /* testimonials */
        .pp-testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 860px) { .pp-testi-grid { grid-template-columns: 1fr; } }
        .pp-testi-card { border: 1px solid var(--ink); background: var(--card); padding: 26px; display: flex; flex-direction: column; }
        .pp-testi-stars { color: var(--marker); font-size: 13px; margin-bottom: 14px; letter-spacing: 2px; }
        .pp-testi-card .pp-body { font-size: 14.5px; line-height: 1.6; flex: 1; margin-bottom: 18px; }
        .pp-testi-who { display: flex; align-items: center; gap: 10px; font-size: 12.5px; color: var(--ink-soft); border-top: 1px dashed var(--paper-line); padding-top: 14px; }
        .pp-testi-who .pp-av { width: 32px; height: 32px; border-radius: 50%; background: var(--pine); color: var(--paper); display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 13px; font-weight: 600; flex-shrink: 0; }
        .pp-testi-who b { color: var(--ink); }

        /* pricing tiers */
        .pp-tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: stretch; }
        @media (max-width: 940px) { .pp-tiers { grid-template-columns: 1fr; } }
        .pp-tier { border: 1px solid var(--ink); background: var(--card); display: flex; flex-direction: column; position: relative; }
        .pp-tier.pp-feat { border: 2px solid var(--pine); }
        .pp-tier .pp-flag { position: absolute; top: -1px; right: -1px; background: var(--pine); color: var(--paper); font-size: 11px; padding: 5px 10px; font-family: 'IBM Plex Mono', monospace; }
        .pp-tier-head { padding: 26px 24px 20px; border-bottom: 1px dashed var(--paper-line); }
        .pp-tier-head .name { font-size: 12px; color: var(--marker); margin-bottom: 8px; }
        .pp-tier-head h3 { font-size: 24px; margin-bottom: 8px; }
        .pp-tier-head .desc { font-size: 13.5px; color: var(--ink-soft); }
        .pp-tier-price { padding: 20px 24px; border-bottom: 1px dashed var(--paper-line); }
        .pp-tier-price .amt { font-family: 'Fraunces', serif; font-size: 32px; font-weight: 600; }
        .pp-tier-price .per { font-size: 12px; color: var(--ink-soft); }
        .pp-tier-list { padding: 20px 24px; flex: 1; list-style: none; font-size: 13.5px; }
        .pp-tier-list li { padding: 8px 0; display: flex; gap: 10px; }
        .pp-tier-list li::before { content: "—"; color: var(--pine); flex-shrink: 0; }
        .pp-tier-foot { padding: 22px 24px 26px; }
        .pp-tier-btn { display: block; text-align: center; padding: 13px; border: 1.5px solid var(--ink); font-size: 13.5px; font-weight: 600; text-decoration: none; color: var(--ink); transition: opacity .15s; }
        .pp-tier.pp-feat .pp-tier-btn { background: var(--pine); color: var(--paper); border-color: var(--pine); }
        .pp-tier-btn:hover { opacity: 0.85; }
        .pp-tier-time { font-size: 12px; color: var(--ink-soft); text-align: center; margin-top: 10px; }

        /* faq */
        .pp-faq-item { border-bottom: 1px solid var(--ink-soft); opacity: 0.9; }
        .pp-faq-q { width: 100%; text-align: left; background: none; border: none; padding: 20px 4px; font-family: 'Fraunces', serif; font-size: 18px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; color: var(--ink); }
        .pp-faq-q .pp-plus { font-family: 'IBM Plex Mono', monospace; font-size: 18px; color: var(--marker); transition: transform .2s; }
        .pp-faq-item.open .pp-plus { transform: rotate(45deg); }
        .pp-faq-a { overflow: hidden; transition: max-height .25s ease; }
        .pp-faq-a p { padding: 0 4px 20px; font-size: 14.5px; color: var(--ink-soft); max-width: 680px; }

        /* lead magnet */
        .pp-lead-magnet { background: var(--ink); color: var(--paper); padding: 80px 0; }
        .pp-lead-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; }
        @media (max-width: 860px) { .pp-lead-grid { grid-template-columns: 1fr; } }
        .pp-lead-magnet .pp-eyebrow { color: #C9C3B4; }
        .pp-lead-magnet h2 { color: #fff; font-size: clamp(26px, 3.4vw, 38px); margin-bottom: 14px; }
        .pp-lead-magnet p.pp-desc { color: #C9C3B4; font-size: 15px; margin-bottom: 0; max-width: 460px; }
        .pp-lead-points { list-style: none; margin-top: 20px; font-size: 13.5px; color: #E7E3D8; }
        .pp-lead-points li { padding: 6px 0; display: flex; gap: 10px; }
        .pp-lead-points li::before { content: "✓"; color: #7FB89F; font-weight: 700; }
        .pp-lead-form { background: var(--card); color: var(--ink); border: 1px solid var(--ink-soft); padding: 30px; }
        .pp-lead-form .pp-tag { font-size: 11px; color: var(--marker); margin-bottom: 6px; }
        .pp-lead-form h4 { font-size: 19px; margin-bottom: 18px; }
        .pp-field { margin-bottom: 14px; }
        .pp-field label { display: block; font-size: 12px; color: var(--ink-soft); margin-bottom: 6px; }
        .pp-field input { width: 100%; padding: 12px 14px; border: 1px solid var(--ink-soft); background: #fff; font-family: 'Inter', sans-serif; font-size: 14px; border-radius: var(--radius); }
        .pp-field input:focus { outline: none; border-color: var(--pine); }
        .pp-lead-submit { width: 100%; background: var(--pine); color: var(--paper); border: none; padding: 14px; font-size: 14px; font-weight: 600; cursor: pointer; margin-top: 6px; border-radius: var(--radius); transition: background .15s; }
        .pp-lead-submit:hover { background: var(--pine-deep); }
        .pp-lead-fine { font-size: 11px; color: var(--ink-soft); margin-top: 10px; text-align: center; }

        /* final CTA */
        .pp-final { background: var(--pine); color: var(--paper); text-align: center; padding: 80px 0; }
        .pp-final h2 { font-size: clamp(30px, 4.5vw, 48px); max-width: 720px; margin: 0 auto 18px; }
        .pp-final p { color: #CFE0DA; max-width: 520px; margin: 0 auto 32px; font-size: 16px; }
        .pp-final .pp-btn-primary { background: var(--paper); color: var(--pine); }
        .pp-final .pp-btn-primary:hover { background: #fff; }

        /* sticky mobile CTA */
        .pp-sticky-cta { display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 50; background: var(--ink); padding: 14px 18px; align-items: center; justify-content: space-between; gap: 14px; border-top: 1px solid #000; }
        .pp-sticky-cta .pp-txt { color: #fff; font-size: 13px; }
        .pp-sticky-cta .pp-txt b { display: block; font-size: 14.5px; }
        .pp-sticky-cta a { background: var(--paper); color: var(--ink); padding: 11px 18px; font-size: 13px; font-weight: 600; border-radius: var(--radius); white-space: nowrap; text-decoration: none; }
        @media (max-width: 700px) { .pp-sticky-cta { display: flex; } }

        .pp-wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
      `}</style>

      <RegistrationMarks />
      <Navbar />

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="pp-hero">
          <div className="wrap">
            <div className="pp-sheet-label">
              <span className="tag mono">SHEET NO. 04 — PACKAGING DESIGN</span>
              <span className="rule"></span>
              <span className="mono" style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>SCALE 1:1</span>
            </div>

            <div className="pp-urgency">
              <span className="dot"></span>
              Taking 4 more packaging projects for Q3 2026 — next slot opens August
            </div>

            <h1>
              Packaging that earns its place on the shelf —{' '}
              <em>structure, print, presence.</em>
            </h1>

            <div className="pp-hero-grid">
              <div>
                <p className="pp-hero-sub">
                  We engineer physical packaging systems that command retail shelves and elevate unboxing moments. From structural dielines to tactile foil debossing, we ensure your physical product matches your brand prestige.
                </p>
                <div className="pp-cta-row">
                  <a className="pp-btn-primary" href="#pricing">Book a 15-min call →</a>
                  <a className="pp-btn-link" href="https://wa.me/919428859768">or message us on WhatsApp</a>
                </div>
                <p className="pp-price-note">Projects start at <b>₹5,40,000.</b> Shelf-ready packaging, not just pretty mockups.</p>
              </div>

              <div className="pp-annot-card">
                <div className="corner"></div>
                <div className="pp-annot-title mono">Picco Gelato — Food & Beverage</div>
                <div className="pp-annot-row"><span>Scope</span><span>Full packaging + labels</span></div>
                <div className="pp-annot-row"><span>Delivery</span><span>4 weeks</span></div>
                <div className="pp-annot-row"><span>Result</span><span style={{ color: 'var(--pine)', fontWeight: 600 }}>Retail shelf-ready</span></div>
                <div className="pp-annot-row"><span>Client since</span><span>2024</span></div>
              </div>
            </div>

            <div className="pp-stat-strip">
              <div className="pp-stat"><div className="num">60+</div><div className="lbl mono">packaging projects delivered</div></div>
              <div className="pp-stat"><div className="num">3–5</div><div className="lbl mono">week delivery window</div></div>
              <div className="pp-stat"><div className="num">100%</div><div className="lbl mono">print-ready file handoff</div></div>
              <div className="pp-stat"><div className="num">4.9</div><div className="lbl mono">avg. client rating</div></div>
            </div>
          </div>
        </section>

        {/* ── LOGO STRIP ───────────────────────────────────────────────── */}
        <div className="pp-logo-strip">
          <div className="pp-wrap">
            <span className="lbl2 mono">TRUSTED BY BRANDS AT</span>
            <div className="pp-logo-row">
              <span>Picco</span><span>Ajumma</span><span>Good Protein</span><span>Oras</span><span>Shiba's</span>
            </div>
          </div>
        </div>

        {/* ── THE PROBLEM ──────────────────────────────────────────────── */}
        <section className="pp-problem-section">
          <div className="wrap">
            <div className="pp-section-head">
              <div>
                <div className="pp-eyebrow mono">THE PROBLEM</div>
                <h2>Generic packaging is a tax on every unit you sell.</h2>
              </div>
              <p>Shoppers decide in seconds — before reading your ingredients, your price, or your story.</p>
            </div>
            <p className="pp-problem-copy">
              On a crowded retail shelf or an Amazon listing, your packaging is your salesperson. If it looks like a template, it gets skipped.{' '}
              <strong>Structural packaging that matches your brand's ambition commands the shelf, justifies a premium price point, and converts browsers into buyers.</strong>{' '}
              Bad packaging design costs you far more per unit than good design ever will.
            </p>
          </div>
        </section>

        {/* ── IS THIS YOU? ─────────────────────────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="pp-section-head">
              <div>
                <div className="pp-eyebrow mono">IS THIS YOU?</div>
                <h2>Built for a specific kind of product brand — not everyone.</h2>
              </div>
              <p>Knowing this upfront saves you a call and saves us both time.</p>
            </div>
            <div className="pp-qual-grid">
              <div className="pp-qual-col pp-yes">
                <h4><span className="mark">✓</span>Book the call if</h4>
                <ul>
                  <li>You're launching a physical product in the next 1–3 months</li>
                  <li>You've outgrown a stock template or a rushed packaging job</li>
                  <li>You need shelf presence that matches your premium price point</li>
                  <li>You want a partner who understands print specs, not just aesthetics</li>
                </ul>
              </div>
              <div className="pp-qual-col pp-no">
                <h4><span className="mark">✕</span>Not a fit yet if</h4>
                <ul>
                  <li>You're pre-product and still validating the idea</li>
                  <li>You need print files delivered this week — we don't rush dielines</li>
                  <li>You want the cheapest packaging you can find, not a system</li>
                  <li>You're not the final decision-maker on packaging direction</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT'S INCLUDED ──────────────────────────────────────────── */}
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="pp-section-head">
              <div>
                <div className="pp-eyebrow mono">WHAT'S INCLUDED</div>
                <h2>Everything from dieline to print-ready file, nothing missed.</h2>
              </div>
              <p>Grouped by what each piece is for — structure, artwork, documentation, and launch.</p>
            </div>
            <div className="pp-deliv-grid">
              <div className="pp-deliv-col">
                <h4>Structure</h4>
                <div className="sub mono">THE FORM</div>
                <ul>
                  <li>Custom dieline engineering</li>
                  <li>Box, bottle, sleeve & label</li>
                  <li>Unboxing sequence design</li>
                </ul>
              </div>
              <div className="pp-deliv-col">
                <h4>Artwork & Renders</h4>
                <div className="sub mono">HOW IT LOOKS</div>
                <ul>
                  <li>Surface artwork & typography</li>
                  <li>3D photorealistic renders</li>
                  <li>Macro detail & texture shots</li>
                  <li>Finish & material spec sheet</li>
                </ul>
              </div>
              <div className="pp-deliv-col">
                <h4>Print Files</h4>
                <div className="sub mono">HOW TO PRODUCE IT</div>
                <ul>
                  <li>Pre-press CMYK vector PDFs</li>
                  <li>Layered Illustrator source files</li>
                  <li>Emboss / foil / spot UV callouts</li>
                </ul>
              </div>
              <div className="pp-deliv-col">
                <h4>Launch Support</h4>
                <div className="sub mono">OPTIONAL</div>
                <ul>
                  <li>Manufacturer coordination</li>
                  <li>Sample review & approval</li>
                  <li>E-commerce listing images</li>
                </ul>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--ink-soft)', marginTop: '10px' }}>
              *Foundation tier covers a single SKU; Brand Suite covers up to 6 SKUs with revisions until sign-off.
            </p>
          </div>
        </section>

        {/* ── HOW WE WORK ──────────────────────────────────────────────── */}
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="pp-section-head">
              <div>
                <div className="pp-eyebrow mono">HOW WE WORK</div>
                <h2>Five stages, zero surprises at the printer.</h2>
              </div>
            </div>
            <div className="pp-process">
              <div className="pp-pstep"><div className="n">01</div><h4>Brief</h4><p>Product specs, retail targets, competitor teardown, finish wishlist.</p></div>
              <div className="pp-pstep"><div className="n">02</div><h4>Structure</h4><p>Dieline engineering, inner tray, unboxing sequence lock.</p></div>
              <div className="pp-pstep"><div className="n">03</div><h4>Design</h4><p>Artwork, typography, colour — two directions, one winner.</p></div>
              <div className="pp-pstep"><div className="n">04</div><h4>Render</h4><p>3D photorealistic mockups for approvals and listings.</p></div>
              <div className="pp-pstep"><div className="n">05</div><h4>Handoff</h4><p>Pre-press files, sample review, manufacturer coordination.</p></div>
            </div>
          </div>
        </section>

        {/* ── HOW WE COMPARE ───────────────────────────────────────────── */}
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="pp-section-head">
              <div>
                <div className="pp-eyebrow mono">HOW WE COMPARE</div>
                <h2>Where a freelancer or a print-shop falls short.</h2>
              </div>
              <p>Not a knock on either — just a different scope than what most product brands need at launch.</p>
            </div>
            <div className="pp-compare-wrap">
              <table className="pp-compare">
                <tbody>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Freelancer</th>
                    <th>Print shop</th>
                    <th className="hl">The Drawing Board</th>
                  </tr>
                  <tr>
                    <td>Structural dieline engineering</td>
                    <td><span className="pp-ic-no">Rarely</span></td>
                    <td><span className="pp-ic-yes">Yes</span></td>
                    <td className="hl"><span className="pp-ic-yes">Yes</span></td>
                  </tr>
                  <tr>
                    <td>3D renders before print</td>
                    <td>Sometimes</td>
                    <td><span className="pp-ic-no">No</span></td>
                    <td className="hl"><span className="pp-ic-yes">Yes</span></td>
                  </tr>
                  <tr>
                    <td>Direct manufacturer coordination</td>
                    <td><span className="pp-ic-no">No</span></td>
                    <td><span className="pp-ic-yes">Yes</span></td>
                    <td className="hl"><span className="pp-ic-yes">Yes</span></td>
                  </tr>
                  <tr>
                    <td>Brand strategy + visual language</td>
                    <td>Sometimes</td>
                    <td><span className="pp-ic-no">No</span></td>
                    <td className="hl"><span className="pp-ic-yes">Yes</span></td>
                  </tr>
                  <tr>
                    <td>Typical turnaround</td>
                    <td>1–2 weeks</td>
                    <td>1 week</td>
                    <td className="hl">3–5 weeks</td>
                  </tr>
                  <tr>
                    <td>Typical investment</td>
                    <td>₹15,000 – ₹50,000</td>
                    <td>₹5,000 – ₹20,000</td>
                    <td className="hl">₹5,40,000 – ₹10,40,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── PROOF ────────────────────────────────────────────────────── */}
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="pp-section-head">
              <div>
                <div className="pp-eyebrow mono">PROOF</div>
                <h2>Recent work, real shelves.</h2>
              </div>
              <p><Link className="pp-btn-link" to="/work">View all work →</Link></p>
            </div>
            <div className="pp-proof-grid">
              {/* Big card — Picco Gelato */}
              <Link
                to="/work/picco-gelato-branding"
                className="pp-proof-card big"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div className="pp-proof-img">
                  <img
                    src="https://framerusercontent.com/images/cYvKtkgBQZ9BOFI5j8LSipd9c8.jpeg"
                    alt="Picco Gelato Branding & Packaging"
                  />
                </div>
                <div className="pp-proof-body">
                  <div className="tag mono">FOOD & BEVERAGE</div>
                  <h4>Picco Gelato</h4>
                  <p>Full packaging system for a premium gelato brand — cups, sleeves, labels, and retail signage.</p>
                  <span className="pp-proof-metric">Retail-ready in 4 weeks</span>
                </div>
              </Link>

              {/* Ajumma Kitchen */}
              <Link
                to="/work/ajumma-kitchen-modern-asian-bistro"
                className="pp-proof-card"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div className="pp-proof-img">
                  <img
                    src="https://framerusercontent.com/images/lDJGRw6ojn1T4R3Kty0DiGRtA.jpg"
                    alt="Ajumma Kitchen Packaging"
                  />
                </div>
                <div className="pp-proof-body">
                  <div className="tag mono">FOOD & HOSPITALITY</div>
                  <h4>Ajumma Kitchen</h4>
                  <p>Brand identity and packaging for a modern Asian bistro — takeaway boxes, bags, and print collateral.</p>
                </div>
              </Link>

              {/* Good Protein */}
              <Link
                to="/work/good-protein-branding-packaging-design"
                className="pp-proof-card"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div className="pp-proof-img">
                  <img
                    src="https://framerusercontent.com/images/8w3w4wCUrCCf6rHwTvx89XZMg.webp"
                    alt="Good Protein Packaging"
                  />
                </div>
                <div className="pp-proof-body">
                  <div className="tag mono">HEALTH & WELLNESS</div>
                  <h4>Good Protein</h4>
                  <p>Complete packaging suite for a D2C protein brand — pouches, labels, and e-commerce hero renders.</p>
                </div>
              </Link>
            </div>

            <div className="pp-guarantee" style={{ marginTop: '36px' }}>
              <div className="pp-badge">PRINT<br />GUARANTEE</div>
              <div>
                <h3>If the first artwork direction misses, we go again — free.</h3>
                <p>If you don't feel genuine pull toward at least one of the initial packaging directions, we run a second round of concepts at no extra cost. We only get paid when you're confident to send to print, not just when time runs out.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="pp-section-head">
              <div>
                <div className="pp-eyebrow mono">WHAT CLIENTS SAY</div>
                <h2>Founders who ship product, not just designs.</h2>
              </div>
            </div>
            <div className="pp-testi-grid">
              <div className="pp-testi-card">
                <div className="pp-testi-stars">★★★★★</div>
                <p className="pp-body">"The dieline they built was flawless — the manufacturer had zero questions, which never happens with packaging files from other studios."</p>
                <div className="pp-testi-who">
                  <div className="pp-av">PG</div>
                  <div><b>Picco Gelato</b><br />Food & Beverage</div>
                </div>
              </div>
              <div className="pp-testi-card">
                <div className="pp-testi-stars">★★★★★</div>
                <p className="pp-body">"The 3D renders they sent us were so good we used them for our Shopify launch before the physical samples even arrived."</p>
                <div className="pp-testi-who">
                  <div className="pp-av">GP</div>
                  <div><b>Good Protein</b><br />Health & Wellness</div>
                </div>
              </div>
              <div className="pp-testi-card">
                <div className="pp-testi-stars">★★★★★</div>
                <p className="pp-body">"Our takeaway boxes finally look like they belong in a premium restaurant — guests actually comment on the packaging now."</p>
                <div className="pp-testi-who">
                  <div className="pp-av">AK</div>
                  <div><b>Ajumma Kitchen</b><br />Hospitality</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRICING ──────────────────────────────────────────────────── */}
        <section id="pricing">
          <div className="wrap">
            <div className="pp-section-head">
              <div>
                <div className="pp-eyebrow mono">ENGAGEMENT MODELS</div>
                <h2>Choose the scope that fits your product line.</h2>
              </div>
              <p>Every tier ships print-ready files — the difference is SKU count and launch support.</p>
            </div>

            <div className="pp-tiers">
              {/* Foundation */}
              <div className="pp-tier">
                <div className="pp-tier-head">
                  <div className="name mono">FOUNDATION</div>
                  <h3>Single SKU Packaging</h3>
                  <p className="desc">For brands launching their first physical product and needing shelf-ready files.</p>
                </div>
                <div className="pp-tier-price">
                  <span className="amt">₹5,40,000</span>
                  <div className="per">per project, 1 SKU</div>
                </div>
                <ul className="pp-tier-list">
                  <li>Custom structural dieline</li>
                  <li>Surface artwork & typography</li>
                  <li>2 concept directions, 1 refined</li>
                  <li>3D photorealistic render</li>
                  <li>Pre-press CMYK print files</li>
                </ul>
                <div className="pp-tier-foot">
                  <a className="pp-tier-btn" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book a 15-min call</a>
                  <div className="pp-tier-time">3–4 week delivery</div>
                </div>
              </div>

              {/* Brand Suite — Featured */}
              <div className="pp-tier pp-feat">
                <div className="pp-flag mono">MOST BOOKED</div>
                <div className="pp-tier-head">
                  <div className="name mono">BRAND SUITE</div>
                  <h3>Multi-SKU System</h3>
                  <p className="desc">For product lines going to retail or e-commerce with multiple variants.</p>
                </div>
                <div className="pp-tier-price">
                  <span className="amt">₹8,75,000</span>
                  <div className="per">per project, up to 4 SKUs</div>
                </div>
                <ul className="pp-tier-list">
                  <li>Everything in Foundation</li>
                  <li>Up to 4 SKU variants</li>
                  <li>Full finish & material spec sheet</li>
                  <li>Manufacturer coordination</li>
                  <li>E-commerce listing renders</li>
                </ul>
                <div className="pp-tier-foot">
                  <a className="pp-tier-btn" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book a 15-min call</a>
                  <div className="pp-tier-time">4–5 week delivery</div>
                </div>
              </div>

              {/* Scale */}
              <div className="pp-tier">
                <div className="pp-tier-head">
                  <div className="name mono">FULL RANGE</div>
                  <h3>Complete Packaging Range</h3>
                  <p className="desc">For scaling brands with full retail presence and 6+ product variants.</p>
                </div>
                <div className="pp-tier-price">
                  <span className="amt">₹10,40,000</span>
                  <div className="per">per project, up to 6 SKUs</div>
                </div>
                <ul className="pp-tier-list">
                  <li>Everything in Brand Suite</li>
                  <li>Up to 6 SKUs + secondary packaging</li>
                  <li>Sample review & print sign-off</li>
                  <li>Social & digital launch assets</li>
                  <li>Launch-day asset checklist</li>
                </ul>
                <div className="pp-tier-foot">
                  <a className="pp-tier-btn" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book a 15-min call</a>
                  <div className="pp-tier-time">5–6 week delivery</div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--ink-soft)', marginTop: '30px' }}>
              All tiers: 50% to start, 50% on delivery. Additional SKUs beyond your tier quoted per unit.
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section>
          <div className="wrap" style={{ maxWidth: '820px' }}>
            <div className="pp-section-head" style={{ display: 'block' }}>
              <div className="pp-eyebrow mono">FAQ</div>
              <h2>Questions product founders actually ask.</h2>
            </div>

            <div>
              {faqs.map((faq, idx) => (
                <div key={idx} className={`pp-faq-item${openFaq === idx ? ' open' : ''}`}>
                  <button className="pp-faq-q" onClick={() => toggleFaq(idx)}>
                    {faq.q}
                    <span className="pp-plus">+</span>
                  </button>
                  <div
                    className="pp-faq-a"
                    style={{ maxHeight: openFaq === idx ? '300px' : '0' }}
                  >
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEAD MAGNET ──────────────────────────────────────────────── */}
        <section className="pp-lead-magnet">
          <div className="wrap">
            <div className="pp-lead-grid">
              <div>
                <div className="pp-eyebrow mono">NOT READY FOR A CALL YET?</div>
                <h2>Get our Packaging Brief Template.</h2>
                <p className="pp-desc">
                  The same brief we send every new packaging client — walks you through dimensions, materials, SKUs, and finish wishlist so your first call is 10× more productive.
                </p>
                <ul className="pp-lead-points">
                  <li>Know exactly what info to gather before talking to a designer</li>
                  <li>Understand which finish specs actually matter for your budget</li>
                  <li>No call required — sent straight to your inbox</li>
                </ul>
              </div>
              <div className="pp-lead-form">
                <div className="pp-tag mono">FREE DOWNLOAD</div>
                <h4>Send me the template</h4>
                <div className="pp-field">
                  <label>Work email</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="pp-field">
                  <label>Company / product name</label>
                  <input
                    type="text"
                    placeholder="Your brand"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <button className="pp-lead-submit">Send me the template →</button>
                <p className="pp-lead-fine">No spam. One follow-up email, then it's your call whether you want to talk further.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────── */}
        <section className="pp-final">
          <div className="wrap">
            <h2>Ready to build packaging your product deserves?</h2>
            <p>Book a free 15-minute call. We'll tell you honestly what tier fits your product line, your timeline, and your budget.</p>
            <a className="pp-btn-primary" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book a 15-min call →</a>
          </div>
        </section>
      </main>

      {/* ── STICKY MOBILE CTA ────────────────────────────────────────── */}
      <div className="pp-sticky-cta">
        <div className="pp-txt">
          Projects from ₹5,40,000
          <b>Free 15-min call</b>
        </div>
        <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book now →</a>
      </div>

      <Footer />
    </>
  );
}
