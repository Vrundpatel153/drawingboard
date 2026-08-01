import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import MoreServicesSection from '../components/MoreServicesSection';
import { WHATSAPP_URL } from '../utils/siteConfig';



/* ─────────────────────────────────────────────────────────────────────────────
   BrandingPage — pixel-perfect port of branding-page-redesign (1).html
   ───────────────────────────────────────────────────────────────────────────── */
export default function BrandingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ email: '', company: '' });
  const [currency, setCurrency] = useState('INR');
  const [growthSlide, setGrowthSlide] = useState(0);
  const [scaleSlide, setScaleSlide] = useState(0);


  const foundationPrices = {
    INR: '₹2,37,000/-',
    USD: '$2,475/-',
    GBP: '£1,850/-',
  };

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




  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

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
    {
      q: "What's included in the logo suite?",
      a: "A primary logo for main use, a secondary (or lockup) version for tight spaces, and a standalone icon or favicon mark — so your logo works on a website, a business card, and an app icon without redrawing it each time.",
    },
    {
      q: "What does the color and typography system cover?",
      a: "A primary and secondary palette with exact codes for print and screen, plus a display and body typeface pairing with defined weights and sizing — so anyone on your team can build a slide, a post, or a page that still looks on-brand.",
    },
    {
      q: "What's a brand guideline, and do I actually need one?",
      a: "It's the reference document that shows logo usage, color codes, type rules, and tone of voice in one place. You need it the moment more than one person — a designer, a printer, a freelancer — touches your brand.",
    },
    {
      q: "How many packaging SKUs are included?",
      a: "The Scale tier includes up to 6 SKUs (individual product variants or sizes). Additional SKUs beyond that are quoted per unit once we know your product range.",
    },
    {
      q: "Do you help with brand voice and messaging?",
      a: "Yes, from the Growth tier up. We define your core message, tone of voice, and key phrases so your website copy, ads, and sales deck all sound like the same company.",
    },
    {
      q: "What are your payment terms?",
      a: "50% to begin work, 50% on final delivery. For the Scale tier, we can split into three milestone payments — ask on the call.",
    },
    {
      q: "How many revision rounds do I get?",
      a: "Foundation includes 3 initial logo directions plus one refinement round. Growth and Scale include revisions through to final sign-off, within the agreed timeline.",
    },
    {
      q: "What if I don't like any of the directions?",
      a: "Covered by our Direction Guarantee — we run a second strategy and concept round at no extra cost. This is rare once positioning is locked, but it has never cost a client extra.",
    },
    {
      q: "Do I own the files once the project ends?",
      a: "Yes, fully. You receive source files (AI, Figma, or equivalent), fonts with license terms, and export-ready assets. Nothing is held back or licensed to us.",
    },
    {
      q: "Can I see work in my industry before booking?",
      a: "Yes — mention your industry on the call and we'll walk through the closest relevant case study, including what worked and what we'd change next time.",
    },
    {
      q: "What happens after I book the call?",
      a: "15 minutes to understand your business and stage. If it's a fit, we send a scoped proposal within 48 hours — no obligation, no hard sell.",
    },
  ];

  return (
    <>
      <style>{`
        /* ── Branding Page Scoped Styles ─────────────────────────────── */

        /* hero */
        .bp-hero { padding: 28px 0 64px; position: relative; }
        @media (max-width: 768px) {
          .bp-hero { padding: 18px 0 40px; }
        }
        .bp-sheet-label { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }

        .bp-sheet-label .tag { font-size: 12px; padding: 6px 10px; border: 1px solid var(--ink); }
        .bp-sheet-label .rule { flex: 1; height: 1px; background: var(--ink-soft); opacity: 0.4; }
        .bp-hero h1 { font-size: clamp(38px, 5.4vw, 72px); max-width: 920px; }
        .bp-hero h1 em { font-style: normal; color: var(--pine); }
        .bp-hero-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 56px; align-items: start; margin-top: 34px; }
        @media (max-width: 920px) { .bp-hero-grid { grid-template-columns: 1fr; } }
        .bp-hero-sub { font-size: 18px; color: var(--ink-soft); max-width: 520px; margin-bottom: 30px; }
        .bp-cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; margin-bottom: 20px; }
        .bp-btn-primary { background: var(--pine); color: var(--paper); padding: 15px 26px; font-size: 14.5px; font-weight: 600; border-radius: var(--radius); display: inline-flex; align-items: center; gap: 8px; transition: background .15s; text-decoration: none; }
        .bp-btn-primary:hover { background: var(--pine-deep); }
        .bp-btn-link { font-size: 14.5px; border-bottom: 1px solid currentColor; padding-bottom: 2px; color: var(--ink-soft); text-decoration: none; }
        .bp-price-note { font-size: 13px; color: var(--ink-soft); }
        .bp-price-note b { color: var(--ink); }

        /* annotated card */
        .bp-annot-card { background: var(--card); border: 1px solid var(--ink); padding: 26px; position: relative; }
        .bp-annot-card .corner { position: absolute; top: -1px; right: -1px; width: 26px; height: 26px; background: var(--marker); clip-path: polygon(0 0, 100% 0, 100% 100%); }
        .bp-annot-row { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px dashed var(--paper-line); padding: 10px 0; font-size: 13px; }
        .bp-annot-row:last-child { border-bottom: none; }
        .bp-annot-row span:first-child { color: var(--ink-soft); }
        .bp-annot-title { font-size: 12px; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 14px; }

        /* stat strip */
        .bp-stat-strip { display: flex; gap: 0; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); margin-top: 56px; }
        .bp-stat { flex: 1; padding: 22px 24px; border-right: 1px solid var(--ink); }
        .bp-stat:last-child { border-right: none; }
        .bp-stat .num { font-family: 'Fraunces', serif; font-size: 34px; font-weight: 600; color: var(--pine); }
        .bp-stat .lbl { font-size: 12.5px; color: var(--ink-soft); margin-top: 4px; }
        @media (max-width: 700px) { .bp-stat-strip { flex-wrap: wrap; } .bp-stat { flex: 1 1 50%; border-bottom: 1px solid var(--ink); } }

        /* urgency badge */
        .bp-urgency { display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; background: var(--card); border: 1px solid var(--ink); padding: 7px 12px; margin-bottom: 22px; }
        .bp-urgency .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--marker); animation: bp-pulse 1.6s infinite; }
        @keyframes bp-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        /* section head */
        .bp-section-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 44px; flex-wrap: wrap; }
        .bp-eyebrow { font-size: 12px; color: var(--marker); margin-bottom: 10px; }
        .bp-section-head h2 { font-size: clamp(28px, 3.4vw, 42px); max-width: 640px; }
        .bp-section-head p { color: var(--ink-soft); max-width: 380px; font-size: 15px; }

        /* logo strip */
        .bp-logo-strip { border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); padding: 0; }
        .bp-logo-strip .bp-wrap { display: flex; align-items: center; gap: 0; padding: 0 32px; max-width: 1180px; margin: 0 auto; }
        .bp-logo-strip .lbl2 { font-size: 11px; color: var(--ink-soft); padding: 18px 24px 18px 0; white-space: nowrap; border-right: 1px solid var(--paper-line); }
        .bp-logo-row { display: flex; flex: 1; overflow-x: auto; }
        .bp-logo-row span { flex: 1; text-align: center; padding: 18px 20px; font-family: 'Fraunces', serif; font-weight: 600; font-size: 16px; color: var(--ink-soft); border-right: 1px solid var(--paper-line); white-space: nowrap; }
        .bp-logo-row span:last-child { border-right: none; }

        /* problem section */
        .bp-problem-section { background: var(--ink); color: var(--paper); padding: 80px 0; }
        .bp-problem-section .bp-section-head p, .bp-problem-section .bp-eyebrow { color: #C9C3B4; }
        .bp-problem-copy { font-size: 19px; line-height: 1.65; max-width: 760px; color: #E7E3D8; }
        .bp-problem-copy strong { color: #fff; }

        /* deliverables grid */
        .bp-deliv-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--ink); border: 1px solid var(--ink); }
        @media (max-width: 900px) { .bp-deliv-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .bp-deliv-grid { grid-template-columns: 1fr; } }
        .bp-deliv-col { background: var(--card); padding: 26px 22px; }
        .bp-deliv-col h4 { font-size: 15px; margin-bottom: 6px; }
        .bp-deliv-col .sub { font-size: 12px; color: var(--marker); margin-bottom: 16px; }
        .bp-deliv-col ul { list-style: none; font-size: 13.5px; color: var(--ink-soft); }
        .bp-deliv-col li { padding: 7px 0; border-top: 1px dashed var(--paper-line); }
        .bp-deliv-col li:first-child { border-top: none; }

        /* process steps */
        .bp-process { display: flex; gap: 0; overflow-x: auto; border-top: 1px solid var(--ink); }
        .bp-pstep { flex: 1; min-width: 190px; padding: 24px 20px; border-right: 1px solid var(--ink-soft); position: relative; }
        .bp-pstep:last-child { border-right: none; }
        .bp-pstep .n { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--marker); }
        .bp-pstep h4 { font-size: 17px; margin: 8px 0 6px; }
        .bp-pstep p { font-size: 13px; color: var(--ink-soft); }

        /* qualifier grid */
        .bp-qual-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--ink); border: 1px solid var(--ink); }
        @media (max-width: 760px) { .bp-qual-grid { grid-template-columns: 1fr; } }
        .bp-qual-col { background: var(--card); padding: 30px 28px; }
        .bp-qual-col.bp-no { background: #EFEBE2; }
        .bp-qual-col h4 { font-size: 16px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
        .bp-qual-col h4 .mark { width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
        .bp-qual-col.bp-yes h4 .mark { background: var(--pine); color: var(--paper); }
        .bp-qual-col.bp-no h4 .mark { background: transparent; border: 1.5px solid var(--ink-soft); color: var(--ink-soft); }
        .bp-qual-col ul { list-style: none; font-size: 14px; color: var(--ink-soft); }
        .bp-qual-col li { padding: 8px 0; border-top: 1px dashed var(--paper-line); }
        .bp-qual-col li:first-child { border-top: none; }

        /* comparison table */
        .bp-compare-wrap { overflow-x: auto; border: 1px solid var(--ink); }
        table.bp-compare { width: 100%; border-collapse: collapse; min-width: 640px; background: var(--card); }
        table.bp-compare th, table.bp-compare td { padding: 16px 18px; text-align: left; font-size: 13.5px; border-bottom: 1px solid var(--paper-line); }
        table.bp-compare th { font-family: 'Fraunces', serif; font-size: 15px; font-weight: 600; background: var(--card); border-bottom: 1px solid var(--ink); }
        table.bp-compare th.hl { color: var(--pine); }
        table.bp-compare td.hl { background: #E4EDE9; font-weight: 600; }
        table.bp-compare tr:last-child td { border-bottom: none; }
        table.bp-compare td:first-child { color: var(--ink-soft); }
        .bp-ic-yes { color: var(--pine); font-weight: 700; }
        .bp-ic-no { color: #B0A995; }

        /* proof grid */
        .bp-proof-grid { display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 20px; }
        @media (max-width: 860px) { .bp-proof-grid { grid-template-columns: 1fr; } }
        .bp-proof-card { border: 1px solid var(--ink); background: var(--card); overflow: hidden; transition: box-shadow .2s; }
        .bp-proof-card:hover { box-shadow: 0 4px 20px rgba(27,27,23,0.12); }
        .bp-proof-img { background: linear-gradient(135deg, #d8d2c1, #c3bda9); position: relative; aspect-ratio: 4/3; overflow: hidden; }
        .bp-proof-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .35s ease; }
        .bp-proof-card:hover .bp-proof-img img { transform: scale(1.04); }
        .bp-proof-body { padding: 18px 20px; }
        .bp-proof-body .tag { font-size: 11px; color: var(--marker); margin-bottom: 6px; }
        .bp-proof-body h4 { font-size: 18px; margin-bottom: 6px; }
        .bp-proof-body p { font-size: 13px; color: var(--ink-soft); }
        .bp-proof-card.big .bp-proof-img { aspect-ratio: 16/10; }
        .bp-proof-metric { display: inline-block; margin-top: 12px; font-family: 'IBM Plex Mono', monospace; font-size: 13px; background: var(--pine); color: var(--paper); padding: 5px 10px; }

        /* guarantee */
        .bp-guarantee { background: var(--card); border: 1px solid var(--ink); padding: 44px; display: flex; gap: 32px; align-items: center; }
        @media (max-width: 700px) { .bp-guarantee { flex-direction: column; align-items: flex-start; } }
        .bp-guarantee .bp-badge { width: 74px; height: 74px; border: 2px solid var(--pine); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-family: 'Fraunces', serif; font-size: 11px; text-align: center; color: var(--pine); line-height: 1.2; padding: 8px; }
        .bp-guarantee h3 { font-size: 22px; margin-bottom: 8px; }
        .bp-guarantee p { font-size: 14.5px; color: var(--ink-soft); max-width: 640px; }

        /* testimonials */
        .bp-testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 860px) { .bp-testi-grid { grid-template-columns: 1fr; } }
        .bp-testi-card { border: 1px solid var(--ink); background: var(--card); padding: 26px; display: flex; flex-direction: column; }
        .bp-testi-stars { color: var(--marker); font-size: 13px; margin-bottom: 14px; letter-spacing: 2px; }
        .bp-testi-card .bp-body { font-size: 14.5px; line-height: 1.6; flex: 1; margin-bottom: 18px; }
        .bp-testi-who { display: flex; align-items: center; gap: 10px; font-size: 12.5px; color: var(--ink-soft); border-top: 1px dashed var(--paper-line); padding-top: 14px; }
        .bp-testi-who .bp-av { width: 32px; height: 32px; border-radius: 50%; background: var(--pine); color: var(--paper); display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 13px; font-weight: 600; flex-shrink: 0; }
        .bp-testi-who b { color: var(--ink); }

        /* ── SOCIAL PROOF SECTION ────────────────────────────────────── */
        .bp-sp-section { background: var(--ink); padding: 80px 0; overflow: hidden; }
        .bp-sp-head { margin-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.10); padding-bottom: 28px; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; }
        .bp-sp-section .bp-eyebrow { color: #C9C3B4; }
        .bp-sp-section h2 { color: #fff; font-size: clamp(24px, 3vw, 38px); max-width: 580px; margin: 0; }
        .bp-sp-section h2 em { font-style: normal; color: #7FB89F; }
        .bp-sp-head-sub { font-size: 13px; color: #8B8571; font-family: 'IBM Plex Mono', monospace; text-align: right; }

        /* ── SLIDER ROW WRAPPER ──────────────────────────────────────── */
        .bp-sp-row { margin-bottom: 48px; }
        .bp-sp-row:last-child { margin-bottom: 0; }
        .bp-sp-row-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .bp-sp-row-title { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #7FB89F; letter-spacing: 0.08em; text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
        .bp-sp-row-title::before { content: ''; width: 6px; height: 6px; background: #7FB89F; border-radius: 50%; display: inline-block; }
        .bp-sp-scroll-hint { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #8B8571; display: flex; align-items: center; gap: 6px; }

        /* ── HORIZONTAL SCROLL CONTAINER ─────────────────────────────── */
        .bp-sp-slider {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding-bottom: 16px;
          margin-bottom: -16px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(127,184,159,0.3) rgba(255,255,255,0.05);
        }
        .bp-sp-slider::-webkit-scrollbar { height: 4px; }
        .bp-sp-slider::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 2px; }
        .bp-sp-slider::-webkit-scrollbar-thumb { background: rgba(127,184,159,0.3); border-radius: 2px; }
        .bp-sp-slider::-webkit-scrollbar-thumb:hover { background: rgba(127,184,159,0.6); }

        .bp-sp-card {
          scroll-snap-align: start;
          flex-shrink: 0;
        }

        /* ── ROW 1: WHATSAPP MARQUEE INFINITE LOOP ── */
        @keyframes bp-wa-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .bp-sp-wa-marquee-wrap {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 12px 0 24px;
          mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
        }

        .bp-sp-wa-marquee-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: bp-wa-marquee 32s linear infinite;
          will-change: transform;
        }

        .bp-sp-wa-marquee-wrap:hover .bp-sp-wa-marquee-track {
          animation-play-state: paused;
        }

        .bp-sp-wa-img-card {
          width: 230px;
          height: 440px;
          background: var(--card);
          border: 1.5px solid var(--ink);
          border-radius: 6px;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
          position: relative;
        }

        .bp-sp-wa-img-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 14px 36px rgba(0,0,0,0.16);
          border-color: var(--pine);
        }

        .bp-sp-wa-img-header {
          padding: 8px 12px;
          background: rgba(27,27,23,0.05);
          border-bottom: 1px dashed var(--paper-line);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 600;
          color: var(--pine);
          letter-spacing: 0.04em;
        }

        .bp-sp-wa-img-body {
          flex: 1;
          width: 100%;
          overflow: hidden;
          background: #0d1418;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bp-sp-wa-img-body img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 768px) {
          .bp-sp-wa-img-card {
            width: 185px;
            height: 360px;
          }
          .bp-sp-wa-marquee-track {
            animation-duration: 22s;
          }
        }

        .bp-sp-wa-bar { background: #1E2B22; padding: 6px 12px; display: flex; align-items: center; justify-content: space-between; }
        .bp-sp-wa-bar span { font-family: 'IBM Plex Mono', monospace; font-size: 9.5px; color: #5a7a65; letter-spacing: 0.06em; }
        .bp-sp-wa-header { background: #2A3D33; padding: 10px 14px; display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .bp-sp-wa-hav { width: 32px; height: 32px; border-radius: 50%; background: #3D5948; border: 1.5px solid #4A6B55; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #7FB89F; font-family: 'Fraunces', serif; flex-shrink: 0; }
        .bp-sp-wa-hname { font-size: 12.5px; color: #E0DDD5; font-weight: 600; }
        .bp-sp-wa-hstatus { font-size: 10px; color: #7FB89F; }
        .bp-sp-wa-hdots { margin-left: auto; color: #5a7a65; font-size: 16px; line-height: 1; letter-spacing: 1px; }
        .bp-sp-wa-body { padding: 14px 12px; display: flex; flex-direction: column; gap: 8px; background: #12150F; flex: 1; min-height: 180px; }
        .bp-sp-wa-msg { max-width: 88%; border-radius: 0 8px 8px 8px; background: #1E2B1A; border: 1px solid rgba(255,255,255,0.06); padding: 9px 12px; font-size: 12.5px; color: #D8D3C6; line-height: 1.5; position: relative; }
        .bp-sp-wa-msg.bp-sent { align-self: flex-end; border-radius: 8px 0 8px 8px; background: #1A2E1E; border-color: rgba(127,184,159,0.15); }
        .bp-sp-wa-time { font-size: 9.5px; color: #5a7a65; text-align: right; margin-top: 4px; font-family: 'IBM Plex Mono', monospace; }
        .bp-sp-wa-foot { background: #1E2B22; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
        .bp-sp-wa-foot span { font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: #3D5948; letter-spacing: 0.07em; }
        .bp-sp-wa-foot .bp-sp-wa-dot { width: 6px; height: 6px; border-radius: 50%; background: #3D5948; }

        /* ── ROW 2: VIDEO TESTIMONIAL CARDS (EMPTY FRAMES) ───────────── */
        .bp-sp-video-card {
          border: 1px solid rgba(255,255,255,0.10);
          background: #111109;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        .bp-sp-video-card.vert { width: clamp(220px, 60vw, 260px); }
        .bp-sp-video-card.wide { width: clamp(300px, 78vw, 400px); }

        .bp-sp-video-frame { position: relative; background: #1a1a16; overflow: hidden; }
        .bp-sp-video-card.vert .bp-sp-video-frame { aspect-ratio: 9/14; }
        .bp-sp-video-card.wide .bp-sp-video-frame { aspect-ratio: 16/9; }

        /* crosshair empty-frame markers */
        .bp-sp-frame-inner { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 12px; }
        .bp-sp-frame-inner::before,
        .bp-sp-frame-inner::after { content: ''; position: absolute; background: rgba(255,255,255,0.06); }
        .bp-sp-frame-inner::before { width: 100%; height: 1px; top: 50%; }
        .bp-sp-frame-inner::after  { width: 1px; height: 100%; left: 50%; }
        /* corner ticks on the frame */
        .bp-sp-video-frame::before,
        .bp-sp-video-frame::after { content: ''; position: absolute; width: 16px; height: 16px; z-index: 2; }
        .bp-sp-video-frame::before { top: 8px; left: 8px; border-top: 1.5px solid rgba(255,255,255,0.25); border-left: 1.5px solid rgba(255,255,255,0.25); }
        .bp-sp-video-frame::after  { bottom: 8px; right: 8px; border-bottom: 1.5px solid rgba(255,255,255,0.25); border-right: 1.5px solid rgba(255,255,255,0.25); }

        .bp-sp-play-btn { width: 50px; height: 50px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center; transition: border-color .2s, transform .2s; position: relative; z-index: 3; }
        .bp-sp-video-card:hover .bp-sp-play-btn { border-color: rgba(255,255,255,0.6); transform: scale(1.08); }
        .bp-sp-play-btn svg { width: 18px; height: 18px; fill: rgba(255,255,255,0.55); margin-left: 3px; }
        .bp-sp-video-card:hover .bp-sp-play-btn svg { fill: #fff; }
        .bp-sp-video-type { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.35); letter-spacing: 0.08em; position: relative; z-index: 3; }
        .bp-sp-video-label { position: absolute; top: 10px; left: 10px; z-index: 4; background: var(--marker); color: var(--paper); font-family: 'IBM Plex Mono', monospace; font-size: 9px; padding: 3px 7px; letter-spacing: 0.06em; }

        .bp-sp-video-foot { padding: 12px 14px; display: flex; align-items: center; gap: 10px; border-top: 1px solid rgba(255,255,255,0.07); background: #111109; }
        .bp-sp-vav { width: 30px; height: 30px; border-radius: 50%; background: #2a3f35; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 11.5px; font-weight: 600; color: #7FB89F; flex-shrink: 0; }
        .bp-sp-vname { font-size: 12.5px; color: #D8D3C6; font-weight: 600; line-height: 1.2; }
        .bp-sp-vrole  { font-size: 10.5px; color: #6B6556; }

        /* ── ROW 3: TEXT QUOTE CARDS ─────────────────────────────────── */
        .bp-sp-quote-card {
          width: clamp(300px, 78vw, 380px);
          border: 1px solid rgba(255,255,255,0.10);
          background: var(--card);
          padding: 26px 24px;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        .bp-sp-stars { color: var(--marker); font-size: 11.5px; letter-spacing: 3px; margin-bottom: 14px; }
        .bp-sp-qs { font-size: 42px; font-family: 'Fraunces', serif; color: var(--pine); line-height: 0.6; margin-bottom: 10px; display: block; opacity: 0.7; }
        .bp-sp-quote-card blockquote { font-family: 'Fraunces', serif; font-size: clamp(14.5px, 1.4vw, 17px); font-weight: 450; color: var(--ink); line-height: 1.65; flex: 1; margin: 0 0 20px; }
        .bp-sp-quote-who { display: flex; align-items: center; gap: 10px; padding-top: 14px; border-top: 1px dashed rgba(27,27,23,0.2); margin-top: auto; }
        .bp-sp-quote-av { width: 32px; height: 32px; border-radius: 50%; background: var(--pine); color: var(--paper); font-family: 'Fraunces', serif; font-size: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bp-sp-qname { font-size: 12.5px; color: var(--ink); font-weight: 600; }
        .bp-sp-qrole { font-size: 11.5px; color: var(--ink-soft); }

        /* ── PROOF BADGE STRIP ───────────────────────────────────────── */
        .bp-sp-badge { margin-top: 36px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .bp-sp-badge-left { display: flex; align-items: center; gap: 8px; }
        .bp-sp-dot { width: 7px; height: 7px; border-radius: 50%; background: #7FB89F; flex-shrink: 0; animation: bp-pulse 2s infinite; }
        .bp-sp-badge-left span { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #8B8571; letter-spacing: 0.04em; }
        .bp-sp-badge-stats { display: flex; gap: 24px; flex-wrap: wrap; }
        .bp-sp-stat-item { text-align: center; }
        .bp-sp-stat-item .bp-sp-stat-num { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 600; color: #fff; display: block; }
        .bp-sp-stat-item .bp-sp-stat-lbl { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #8B8571; letter-spacing: 0.04em; }

        /* pricing tiers */
        .bp-tiers { display: grid; grid-template-columns: repeat(2, minmax(0, 540px)); justify-content: center; gap: 32px; align-items: stretch; }
        @media (max-width: 940px) { .bp-tiers { grid-template-columns: 1fr; gap: 24px; } }

        .bp-tier { border: 1px solid var(--ink); background: var(--card); display: flex; flex-direction: column; position: relative; width: 100%; box-sizing: border-box; overflow: hidden; }
        .bp-tier.bp-feat { border: 2px solid var(--pine); }
        .bp-tier .bp-flag { position: absolute; top: -1px; right: -1px; background: var(--pine); color: var(--paper); font-size: 11px; padding: 5px 10px; font-family: 'IBM Plex Mono', monospace; z-index: 2; }
        .bp-currency-toggle { display: inline-flex; align-items: center; gap: 3px; background: rgba(27, 27, 23, 0.06); padding: 3px; border-radius: 4px; border: 1px solid var(--paper-line); }
        .bp-curr-btn { background: transparent; border: none; color: var(--ink-soft); font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; font-weight: 600; padding: 4px 8px; border-radius: 2px; cursor: pointer; transition: all 0.15s ease; line-height: 1; }
        .bp-curr-btn:hover { color: var(--ink); background: rgba(0, 0, 0, 0.05); }
        .bp-curr-btn.active { background: var(--pine); color: var(--paper); }
        .bp-tier-head { padding: 26px 24px 20px; border-bottom: 1px dashed var(--paper-line); min-height: 220px; box-sizing: border-box; display: flex; flex-direction: column; }
        .bp-slot-badge { display: inline-flex; align-items: center; gap: 8px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; color: var(--pine); background: rgba(36, 70, 59, 0.08); border: 1px solid rgba(36, 70, 59, 0.2); padding: 5px 12px; border-radius: 20px; margin-top: 10px; align-self: flex-start; letter-spacing: 0.04em; }
        .bp-slot-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--marker); box-shadow: 0 0 6px rgba(184, 65, 46, 0.6); animation: bp-slot-blink 1.8s infinite ease-in-out; }
        @keyframes bp-slot-blink { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.25; transform: scale(0.85); } }
        .bp-tier-price { padding: 22px 24px; border-bottom: 1px dashed var(--paper-line); min-height: 122px; box-sizing: border-box; display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
        .bp-tier-price .amt { font-family: 'Fraunces', serif; font-size: 54px; font-weight: 700; color: var(--ink); letter-spacing: -0.02em; line-height: 1.05; display: block; }
        .bp-tier-price .per { font-size: 12px; color: var(--ink-soft); margin-top: 6px; display: block; }
        .bp-deliv-bar { display: flex; justify-content: space-between; align-items: center; padding: 12px 24px; background: rgba(27,27,23,0.03); border-bottom: 1px dashed var(--paper-line); box-sizing: border-box; }
        .bp-tier-slide { width: 100%; flex: 0 0 100%; box-sizing: border-box; padding: 20px 24px; min-height: 220px; }
        
        @media (max-width: 940px) {
          .bp-tier-head { min-height: auto; padding: 22px 18px 16px; }
          .bp-tier-price { min-height: auto; padding: 18px; flex-wrap: wrap; }
          .bp-tier-price .amt { font-size: 44px; }
          .bp-deliv-bar { padding: 10px 16px; flex-wrap: wrap; gap: 8px; }
          .bp-tier-slide { padding: 16px 18px; min-height: auto; }
          .bp-tier-foot { padding: 18px; }
        }
        @media (max-width: 480px) {
          .bp-tier-head { padding: 18px 14px 14px; }
          .bp-tier-head h3 { font-size: 20px; }
          .bp-tier-price { padding: 14px; }
          .bp-tier-price .amt { font-size: 36px; }
          .bp-deliv-bar { padding: 10px 12px; }
          .bp-tier-slide { padding: 14px 12px; }
          .bp-tier-foot { padding: 14px; }
          .bp-curr-btn { padding: 3px 6px; font-size: 10px; }
        }


        .bp-tier-list { padding: 0; flex: 1; list-style: none; font-size: 13.5px; }
        .bp-tier-list li { padding: 8px 0; display: flex; gap: 10px; }
        .bp-tier-list li::before { content: "—"; color: var(--pine); flex-shrink: 0; }
        .bp-tier-foot { padding: 22px 24px 26px; margin-top: auto; }



        .bp-tier-btn { display: block; text-align: center; padding: 13px; border: 1.5px solid var(--ink); font-size: 13.5px; font-weight: 600; text-decoration: none; color: var(--ink); transition: opacity .15s; }
        .bp-tier.bp-feat .bp-tier-btn { background: var(--pine); color: var(--paper); border-color: var(--pine); }
        .bp-tier-btn:hover { opacity: 0.85; }
        .bp-tier-time { font-size: 12px; color: var(--ink-soft); text-align: center; margin-top: 10px; }

        /* faq */
        .bp-faq-item { border-bottom: 1px solid var(--ink-soft); opacity: 0.9; }
        .bp-faq-q { width: 100%; text-align: left; background: none; border: none; padding: 20px 4px; font-family: 'Fraunces', serif; font-size: 18px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; color: var(--ink); }
        .bp-faq-q .bp-plus { font-family: 'IBM Plex Mono', monospace; font-size: 18px; color: var(--marker); transition: transform .2s; }
        .bp-faq-item.open .bp-plus { transform: rotate(45deg); }
        .bp-faq-a { overflow: hidden; transition: max-height .25s ease; }
        .bp-faq-a p { padding: 0 4px 20px; font-size: 14.5px; color: var(--ink-soft); max-width: 680px; }

        /* lead magnet */
        .bp-lead-magnet { background: var(--ink); color: var(--paper); padding: 80px 0; }
        .bp-lead-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; }
        @media (max-width: 860px) { .bp-lead-grid { grid-template-columns: 1fr; } }
        .bp-lead-magnet .bp-eyebrow { color: #C9C3B4; }
        .bp-lead-magnet h2 { color: #fff; font-size: clamp(26px, 3.4vw, 38px); margin-bottom: 14px; }
        .bp-lead-magnet p.bp-desc { color: #C9C3B4; font-size: 15px; margin-bottom: 0; max-width: 460px; }
        .bp-lead-points { list-style: none; margin-top: 20px; font-size: 13.5px; color: #E7E3D8; }
        .bp-lead-points li { padding: 6px 0; display: flex; gap: 10px; }
        .bp-lead-points li::before { content: "✓"; color: #7FB89F; font-weight: 700; }
        .bp-lead-form { background: var(--card); color: var(--ink); border: 1px solid var(--ink-soft); padding: 30px; }
        .bp-lead-form .bp-tag { font-size: 11px; color: var(--marker); margin-bottom: 6px; }
        .bp-lead-form h4 { font-size: 19px; margin-bottom: 18px; }
        .bp-field { margin-bottom: 14px; }
        .bp-field label { display: block; font-size: 12px; color: var(--ink-soft); margin-bottom: 6px; }
        .bp-field input { width: 100%; padding: 12px 14px; border: 1px solid var(--ink-soft); background: #fff; font-family: 'Inter', sans-serif; font-size: 14px; border-radius: var(--radius); }
        .bp-field input:focus { outline: none; border-color: var(--pine); }
        .bp-lead-submit { width: 100%; background: var(--pine); color: var(--paper); border: none; padding: 14px; font-size: 14px; font-weight: 600; cursor: pointer; margin-top: 6px; border-radius: var(--radius); transition: background .15s; }
        .bp-lead-submit:hover { background: var(--pine-deep); }
        .bp-lead-fine { font-size: 11px; color: var(--ink-soft); margin-top: 10px; text-align: center; }

        /* final CTA */
        .bp-final { background: var(--pine); color: var(--paper); text-align: center; padding: 80px 0; }
        .bp-final h2 { font-size: clamp(30px, 4.5vw, 48px); max-width: 720px; margin: 0 auto 18px; }
        .bp-final p { color: #CFE0DA; max-width: 520px; margin: 0 auto 32px; font-size: 16px; }
        .bp-final .bp-btn-primary { background: var(--paper); color: var(--pine); }
        .bp-final .bp-btn-primary:hover { background: #fff; }

        /* sticky mobile CTA */
        .bp-sticky-cta { display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 50; background: var(--ink); padding: 14px 18px; align-items: center; justify-content: space-between; gap: 14px; border-top: 1px solid #000; }
        .bp-sticky-cta .bp-txt { color: #fff; font-size: 13px; }
        .bp-sticky-cta .bp-txt b { display: block; font-size: 14.5px; }
        .bp-sticky-cta a { background: var(--paper); color: var(--ink); padding: 11px 18px; font-size: 13px; font-weight: 600; border-radius: var(--radius); white-space: nowrap; text-decoration: none; }
        .bp-sticky-cta a.wa-btn { background: #25D366 !important; color: #ffffff !important; padding: 0 !important; width: 38px !important; height: 38px !important; min-width: 38px !important; display: inline-flex !important; alignItems: center !important; justifyContent: center !important; border-radius: 4px !important; }
        @media (max-width: 700px) { .bp-sticky-cta { display: flex; } }


        /* wrap */
        .bp-wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }

        /* Logo Marquee Section */
        .bp-logo-marquee-section {
          padding: 60px 0;
          background: var(--card);
          border-top: 1px solid var(--ink);
          border-bottom: 1px solid var(--ink);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-sizing: border-box;
          width: 100%;
        }
        .bp-marquee-title {
          text-align: center;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: var(--ink-soft);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .bp-marquee-row {
          width: 100%;
          overflow: hidden;
          display: flex;
          position: relative;
        }
        /* Fade overlay effects */
        .bp-marquee-row::before,
        .bp-marquee-row::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 140px;
          z-index: 2;
          pointer-events: none;
        }
        .bp-marquee-row::before {
          left: 0;
          background: linear-gradient(90deg, var(--paper) 0%, transparent 100%);
        }
        .bp-marquee-row::after {
          right: 0;
          background: linear-gradient(-90deg, var(--paper) 0%, transparent 100%);
        }
        .bp-marquee-track {
          display: flex;
          align-items: center;
          gap: 70px;
          width: max-content;
          animation: bp-marquee-slide-ltr 35s linear infinite;
        }
        .bp-marquee-track.rtl {
          animation-name: bp-marquee-slide-rtl;
        }
        .bp-marquee-track.fast {
          animation-duration: 28s;
        }
        .bp-marquee-track.slow {
          animation-duration: 42s;
        }
        .bp-marquee-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bp-marquee-item img {
          height: 30px;
          width: auto;
          object-fit: contain;
          filter: brightness(0);
          opacity: 1;
          transition: transform 0.3s ease;
        }
        .bp-marquee-item img:hover {
          transform: scale(1.05);
        }
        @keyframes bp-marquee-slide-ltr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes bp-marquee-slide-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        /* Mobile layout styling - resize and compact */
        @media (max-width: 768px) {
          .bp-logo-marquee-section {
            padding: 40px 0;
            gap: 12px;
          }
          .bp-marquee-track {
            gap: 40px;
          }
          .bp-marquee-item img {
            height: 20px; /* Resize and compact for smaller screens */
          }
          .bp-marquee-row::before,
          .bp-marquee-row::after {
            width: 60px;
          }
        }

        /* ── Full Width End-to-End PC Layout Experiment ─────────────────── */
        @media (min-width: 1024px) {
          .bp-full-page .wrap {
            max-width: 100% !important;
            padding-left: 64px !important;
            padding-right: 64px !important;
          }
          .bp-full-page .bp-tiers {
            grid-template-columns: repeat(2, 1fr) !important;
            max-width: 100% !important;
            gap: 40px !important;
          }
          .bp-full-page .bp-hero h1 {
            max-width: 1200px !important;
          }
          .bp-full-page .bp-section-head h2 {
            max-width: 1000px !important;
          }
          .bp-full-page .bp-problem-copy {
            max-width: 100% !important;
          }
        }
      `}</style>

      <RegistrationMarks />
      <Navbar />

      <main className="bp-full-page">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="bp-hero">
          <div className="wrap">
            <div className="bp-sheet-label">
              <span className="tag mono">SHEET NO. 02 — BRANDING</span>
              <span className="rule"></span>
              <span className="mono" style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>SCALE 1:1</span>
            </div>

            <div className="bp-urgency">
              <span className="dot"></span>
              Booking 3 more brand projects for Q3 2026 — next slot opens August
            </div>

            <h1>
              Branding for founders who need to look built, not just brand-new.{' '}
              <em>Position, identity, proof.</em>
            </h1>

            <div className="bp-hero-grid">
              <div>
                <p className="bp-hero-sub">
                  We design strategy-first identity systems for founders past the "just get a logo" stage — a clear market position, a visual system your team can actually run with, and the credibility to charge what you're worth.
                </p>
                <div className="bp-cta-row">
                  <a className="bp-btn-primary" href="#pricing">Book a 15-min call →</a>
                  <a className="bp-btn-link" href="https://wa.me/919428859768">or message us on WhatsApp</a>
                </div>
                <p className="bp-price-note">Projects start at <b>₹4,75,000/-.</b> Built for founders serious about long-term growth.</p>
              </div>

              <div className="bp-annot-card">
                <div className="corner"></div>
                <div className="bp-annot-title mono">Sonar — SaaS Platform</div>
                <div className="bp-annot-row"><span>Scope</span><span>Full identity + guidelines</span></div>
                <div className="bp-annot-row"><span>Delivery</span><span>3 weeks</span></div>
                <div className="bp-annot-row"><span>Result</span><span style={{ color: 'var(--pine)', fontWeight: 600 }}>+70% inquiries</span></div>
                <div className="bp-annot-row"><span>Client since</span><span>2024</span></div>
              </div>
            </div>

            <div className="bp-stat-strip">
              <div className="bp-stat"><div className="num">40+</div><div className="lbl mono">brands launched</div></div>
              <div className="bp-stat"><div className="num">70%</div><div className="lbl mono">avg. lift in inbound inquiries</div></div>
              <div className="bp-stat"><div className="num">2–6</div><div className="lbl mono">week delivery window</div></div>
              <div className="bp-stat"><div className="num">4.9</div><div className="lbl mono">avg. client rating</div></div>
            </div>
          </div>
        </section>

        {/* ── LOGO STRIP ───────────────────────────────────────────────── */}
        <div className="bp-logo-strip">
          <div className="bp-wrap">
            <span className="lbl2 mono">TRUSTED BY FOUNDERS AT</span>
            <div className="bp-logo-row">
              <span>Sonar</span><span>Lumen</span><span>Northbyte</span><span>AFTER8</span><span>Shiba's</span>
            </div>
          </div>
        </div>

        {/* ── THE PROBLEM ──────────────────────────────────────────────── */}
        <section className="bp-problem-section">
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">THE PROBLEM</div>
                <h2>A weak brand is a tax on every sale you try to make.</h2>
              </div>
              <p>Customers decide whether to trust you in the seconds before they've read a word of your pitch.</p>
            </div>
            <p className="bp-problem-copy">
              Before a prospect reads your pricing, your case studies, or your product — they've already formed an opinion from your logo, your site, your deck.{' '}
              <strong>If that first impression looks improvised, every claim you make afterward has to work twice as hard.</strong>{' '}
              Strategy-first branding fixes the impression before it costs you the meeting.
            </p>
          </div>
        </section>

        {/* ── IS THIS YOU? ─────────────────────────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">IS THIS YOU?</div>
                <h2>Built for a specific kind of founder — not everyone.</h2>
              </div>
              <p>Knowing this upfront saves you a call and saves us both time.</p>
            </div>
            <div className="bp-qual-grid">
              <div className="bp-qual-col bp-yes">
                <h4><span className="mark">✓</span>Book the call if</h4>
                <ul>
                  <li>You're raising, launching, or pitching in the next 1–3 months</li>
                  <li>You've outgrown a logo made on Canva or Fiverr</li>
                  <li>You need one system your whole team can use consistently</li>
                  <li>You want a partner who pushes back, not just executes</li>
                </ul>
              </div>
              <div className="bp-qual-col bp-no">
                <h4><span className="mark">✕</span>Not a fit yet if</h4>
                <ul>
                  <li>You're pre-revenue and still validating the idea</li>
                  <li>You need something live this week — we don't rush strategy</li>
                  <li>You want the cheapest logo you can find, not a system</li>
                  <li>You're not the final decision-maker on brand direction</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT'S INCLUDED ──────────────────────────────────────────── */}
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">WHAT'S INCLUDED</div>
                <h2>Everything in one system, nothing duplicated.</h2>
              </div>
              <p>Grouped by what each piece is actually for — strategy, identity, documentation, and launch.</p>
            </div>
            <div className="bp-deliv-grid">
              <div className="bp-deliv-col">
                <h4>Strategy</h4>
                <div className="sub mono">WHY</div>
                <ul>
                  <li>Brand discovery &amp; research</li>
                  <li>Positioning &amp; competitive read</li>
                  <li>Messaging pillars &amp; voice</li>
                </ul>
              </div>
              <div className="bp-deliv-col">
                <h4>Identity System</h4>
                <div className="sub mono">HOW IT LOOKS</div>
                <ul>
                  <li>Logo suite — primary, secondary, icon</li>
                  <li>Unlimited concepts until it's right*</li>
                  <li>Color system &amp; typography pairing</li>
                  <li>Visual language &amp; graphic elements</li>
                </ul>
              </div>
              <div className="bp-deliv-col">
                <h4>Guidelines &amp; Files</h4>
                <div className="sub mono">HOW TO USE IT</div>
                <ul>
                  <li>Brand guideline (PDF + web)</li>
                  <li>Source files, all formats</li>
                  <li>Stationery — cards, letterhead, deck</li>
                </ul>
              </div>
              <div className="bp-deliv-col">
                <h4>Launch Kit</h4>
                <div className="sub mono">OPTIONAL</div>
                <ul>
                  <li>Website header &amp; banner kit</li>
                  <li>Social launch assets</li>
                  <li>Packaging design (by SKU)</li>
                </ul>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--ink-soft)', marginTop: '10px' }}>
              *Foundation tier includes 3 concept directions; Full System and above include revisions until sign-off.
            </p>
          </div>
        </section>

        {/* ── HOW WE WORK ──────────────────────────────────────────────── */}
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">HOW WE WORK</div>
                <h2>Five weeks, five stages, no guessing.</h2>
              </div>
            </div>
            <div className="bp-process">
              <div className="bp-pstep"><div className="n">01</div><h4>Discover</h4><p>Interviews, market scan, competitor teardown.</p></div>
              <div className="bp-pstep"><div className="n">02</div><h4>Position</h4><p>Lock the one sentence you want to own.</p></div>
              <div className="bp-pstep"><div className="n">03</div><h4>Design</h4><p>Logo, color, type — three directions, one winner.</p></div>
              <div className="bp-pstep"><div className="n">04</div><h4>Systemise</h4><p>Guidelines, files, stationery, ready to hand off.</p></div>
              <div className="bp-pstep"><div className="n">05</div><h4>Launch</h4><p>Website header, social kit, go live.</p></div>
            </div>
          </div>
        </section>

        {/* ── HOW WE COMPARE ───────────────────────────────────────────── */}
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">HOW WE COMPARE</div>
                <h2>Where a freelancer or a big agency falls short.</h2>
              </div>
              <p>Not a knock on either — just a different job than what most founders need at this stage.</p>
            </div>
            <div className="bp-compare-wrap">
              <table className="bp-compare">
                <tbody>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Freelancer</th>
                    <th>Big agency</th>
                    <th className="hl">The Drawing Board</th>
                  </tr>
                  <tr>
                    <td>Strategy before design</td>
                    <td><span className="bp-ic-no">Rarely</span></td>
                    <td><span className="bp-ic-yes">Yes</span></td>
                    <td className="hl"><span className="bp-ic-yes">Yes</span></td>
                  </tr>
                  <tr>
                    <td>Typical turnaround</td>
                    <td>1–2 weeks</td>
                    <td>8–12 weeks</td>
                    <td className="hl">2–6 weeks</td>
                  </tr>
                  <tr>
                    <td>Direct access to your designer</td>
                    <td><span className="bp-ic-yes">Yes</span></td>
                    <td><span className="bp-ic-no">Rarely</span></td>
                    <td className="hl"><span className="bp-ic-yes">Yes</span></td>
                  </tr>
                  <tr>
                    <td>You own all source files</td>
                    <td>Sometimes</td>
                    <td><span className="bp-ic-yes">Yes</span></td>
                    <td className="hl"><span className="bp-ic-yes">Yes</span></td>
                  </tr>
                  <tr>
                    <td>Built for founders, not enterprises</td>
                    <td><span className="bp-ic-yes">Yes</span></td>
                    <td><span className="bp-ic-no">No</span></td>
                    <td className="hl"><span className="bp-ic-yes">Yes</span></td>
                  </tr>
                  <tr>
                    <td>Typical investment</td>
                    <td>₹15,000 – ₹60,000</td>
                    <td>₹15,00,000+</td>
                    <td className="hl">₹4,75,000/- – ₹6,50,000/-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── LOGOS SLIDER ROW ────────────────────────────────────────── */}
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

        {/* ── PROOF ────────────────────────────────────────────────────── */}
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="bp-section-head">
              <div>
                <div className="bp-eyebrow mono">PROOF</div>
                <h2>Recent work, real outcomes.</h2>
              </div>
              <p><Link className="bp-btn-link" to="/work">View all work →</Link></p>
            </div>
            <div className="bp-proof-grid">
              <Link to="/work/after8r---reimagining-intimacy-for-a-new-generation." className="bp-proof-card big" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="bp-proof-img" style={{ background: 'none' }}>
                  <img
                    src="https://framerusercontent.com/images/GI9hs6gABp4QhAbVBk1Ej9TVE0.png"
                    alt="After8® — Branding"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div className="bp-proof-body">
                  <div className="tag mono">BRANDING & PACKAGING</div>
                  <h4>After8®</h4>
                  <p>Strategic brand identity and packaging design for a new-generation intimacy brand — full system from naming to shelf.</p>
                  <span className="bp-proof-metric">Full identity system</span>
                </div>
              </Link>
              <Link to="/work/lumen-fine-jewellery" className="bp-proof-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="bp-proof-img" style={{ background: 'none' }}>
                  <img
                    src="https://framerusercontent.com/images/Gj0gd8TaOnBqjox9iFb1KV8EbY.jpeg"
                    alt="Lumen Fine Jewellery"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div className="bp-proof-body">
                  <div className="tag mono">FINE JEWELLERY</div>
                  <h4>Lumen</h4>
                  <p>Identity and packaging system built for premium retail shelf presence.</p>
                </div>
              </Link>
              <Link to="/work/shiba-s-bar-kitchen-and-bar" className="bp-proof-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="bp-proof-img" style={{ background: 'none' }}>
                  <img
                    src="https://framerusercontent.com/images/hm5rbPr45EhYVKWHrF6fMu8xGA.png"
                    alt="Shiba's Bar & Kitchen"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div className="bp-proof-body">
                  <div className="tag mono">HOSPITALITY</div>
                  <h4>Shiba's Bar &amp; Kitchen</h4>
                  <p>Bar and restaurant identity spanning signage, menus, and stationery.</p>
                </div>
              </Link>
            </div>

            <div className="bp-guarantee" style={{ marginTop: '36px' }}>
              <div className="bp-badge">DIRECTION<br />GUARANTEE</div>
              <div>
                <h3>If the first direction misses, we go again — free.</h3>
                <p>If you don't feel genuine pull toward at least one of the initial concept directions, we run a second round of strategy and concepts at no extra cost. We only get paid when you're confident to launch, not just when time runs out.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ─────────────────────────────────────────────── */}
        <section className="bp-sp-section">
          <div className="wrap">

            {/* Main Section Header */}
            <div className="bp-sp-head">
              <div>
                <div className="bp-eyebrow mono">SOCIAL PROOF</div>
                <h2>Real founders. Real results. <em>In their own words.</em></h2>
              </div>
            </div>

            {/* ── ROW 1: WHATSAPP SCREENSHOTS HORIZONTAL SLIDER ─────────── */}
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


            {/* ── ROW 2: VIDEO TESTIMONIALS ────────────────────────────────── */}
            <div className="bp-sp-row">
              <div className="bp-sp-row-head">
                <div className="bp-sp-row-title">02 // Client Video Testimonials</div>
              </div>

              <div className="bp-sp-slider">
                {/* Video Card 1 (Vertical) */}
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

                {/* Video Card 2 (Vertical) */}
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
                      <div className="bp-sp-vrole">Owner, Shiba's Bar & Kitchen</div>
                    </div>
                  </div>
                </div>

                {/* Video Card 3 (Vertical) */}
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

                {/* Video Card 4 (Vertical) */}
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


            {/* ── ROW 3: FOUNDER QUOTES AUTO INFINITE MARQUEE ─────────────────── */}
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

        {/* ── PRICING ──────────────────────────────────────────────────── */}
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
              {/* Growth — Featured Card 1 */}

              <div className="bp-tier bp-feat">
                <div className="bp-tier-head">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <div className="name mono" style={{ margin: 0 }}>GROWTH</div>
                    {/* Currency Toggle inside header */}
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
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--pine)', marginBottom: '4px' }}>Brand Identity + Packaging</div>
                  <p className="desc" style={{ margin: 0 }}>For funded or scaling brands that need to look the part everywhere.</p>
                  <div className="bp-slot-badge mono">
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


                {/* Unified Deliverables Bar */}
                <div className="bp-deliv-bar">
                  <span className="mono" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--ink-soft)', letterSpacing: '0.05em' }}>
                    DELIVERABLES ({growthSlide + 1}/2)
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
                      onClick={() => setGrowthSlide((prev) => (prev > 0 ? prev - 1 : 1))}
                      style={{ background: 'var(--card)', border: '1px solid var(--ink)', borderRadius: '2px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', marginLeft: '4px', lineHeight: 1 }}
                      title="Previous slide"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => setGrowthSlide((prev) => (prev < 1 ? prev + 1 : 0))}
                      style={{ background: 'var(--card)', border: '1px solid var(--ink)', borderRadius: '2px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', lineHeight: 1 }}
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
                        <li>Brand discovery &amp; positioning</li>
                        <li>Logo — 3 directions, 1 refined</li>
                        <li>Color &amp; typography system</li>
                        <li>Compact brand guideline (PDF)</li>
                      </ul>
                    </div>
                    <div className="bp-tier-slide">
                      <ul className="bp-tier-list" style={{ padding: 0, margin: 0 }}>
                        <li>Messaging pillars &amp; voice guide</li>
                        <li>Full guideline (PDF + web-based)</li>
                        <li>Stationery suite (cards, deck, letterhead)</li>
                        <li>Website header &amp; banner kit</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bp-tier-foot">
                  <a className="bp-tier-btn" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book a 15-min call</a>
                  <div className="bp-tier-time">3–4 week delivery</div>
                </div>
              </div>

              {/* Scale — Card 2 */}
              <div className="bp-tier">
                <div className="bp-tier-head">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <div className="name mono" style={{ margin: 0 }}>SCALE</div>
                    {/* Currency Toggle inside header */}
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
                  <h3>Brand + Packaging</h3>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--pine)', marginBottom: '4px' }}>Brand Identity + Packaging + Website/App</div>
                  <p className="desc" style={{ margin: 0 }}>For product brands going to retail or e-commerce shelf.</p>
                  <div className="bp-slot-badge mono">
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



                {/* Unified Deliverables Bar */}
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
                      style={{ background: 'var(--card)', border: '1px solid var(--ink)', borderRadius: '2px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', lineHeight: 1 }}
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
                        <li>Brand discovery &amp; positioning</li>
                        <li>Logo — 3 directions, 1 refined</li>
                        <li>Color &amp; typography system</li>
                        <li>Compact brand guideline (PDF)</li>
                      </ul>
                    </div>
                    <div className="bp-tier-slide">
                      <ul className="bp-tier-list" style={{ padding: 0, margin: 0 }}>
                        <li>Messaging pillars &amp; voice guide</li>
                        <li>Full guideline (PDF + web-based)</li>
                        <li>Stationery suite (cards, deck, letterhead)</li>
                        <li>Website header &amp; banner kit</li>
                      </ul>
                    </div>
                    <div className="bp-tier-slide">
                      <ul className="bp-tier-list" style={{ padding: 0, margin: 0 }}>
                        <li>Packaging design, up to 6 SKUs</li>
                        <li>Social &amp; digital launch assets</li>
                        <li>Launch-day asset checklist</li>
                      </ul>
                    </div>
                  </div>
                </div>



                <div className="bp-tier-foot">
                  <a className="bp-tier-btn" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book a 15-min call</a>
                  <div className="bp-tier-time">4–6 week delivery</div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--ink-soft)', marginTop: '30px' }}>

              All tiers: 50% to start, 50% on delivery. No long-term retainer required — you own every file at handoff.
            </p>

          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section>
          <div className="wrap" style={{ maxWidth: '820px' }}>
            <div className="bp-section-head" style={{ display: 'block' }}>
              <div className="bp-eyebrow mono">FAQ</div>
              <h2>Questions founders actually ask.</h2>
            </div>

            <div>
              {faqs.map((faq, idx) => (
                <div key={idx} className={`bp-faq-item${openFaq === idx ? ' open' : ''}`}>
                  <button className="bp-faq-q" onClick={() => toggleFaq(idx)}>
                    {faq.q}
                    <span className="bp-plus">+</span>
                  </button>
                  <div
                    className="bp-faq-a"
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
        <section className="bp-lead-magnet">
          <div className="wrap">
            <div className="bp-lead-grid">
              <div>
                <div className="bp-eyebrow mono">NOT READY FOR A CALL YET?</div>
                <h2>Get the 12-point Brand Audit Checklist.</h2>
                <p className="bp-desc">
                  The same checklist we use on discovery calls to spot where a brand is quietly losing trust — logo, messaging, and site, in one PDF.
                </p>
                <ul className="bp-lead-points">
                  <li>Self-score your current brand in 10 minutes</li>
                  <li>Spot the 3 most common credibility gaps we see in founder-led brands</li>
                  <li>No call required — sent straight to your inbox</li>
                </ul>
              </div>
              <div className="bp-lead-form">
                <div className="bp-tag mono">FREE DOWNLOAD</div>
                <h4>Send me the checklist</h4>
                <div className="bp-field">
                  <label>Work email</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="bp-field">
                  <label>Company name</label>
                  <input
                    type="text"
                    placeholder="Your company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <button className="bp-lead-submit">Send me the checklist →</button>
                <p className="bp-lead-fine">No spam. One follow-up email, then it's your call whether you want to talk further.</p>
              </div>
            </div>
          </div>
        </section>

        <MoreServicesSection current="branding" />

        {/* ── FINAL CTA ────────────────────────────────────────────────── */}
        <section className="bp-final">

          <div className="wrap">
            <h2>Ready to look like the company you're becoming?</h2>
            <p>Book a free 15-minute call. We'll tell you honestly whether you need a foundation, a full system, or nothing at all yet.</p>
            <a className="bp-btn-primary" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book a 15-min call →</a>
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

          <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book now →</a>
        </div>
      </div>


      <Footer />
    </>
  );
}
