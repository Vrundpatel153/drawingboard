import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import MoreServicesSection from '../components/MoreServicesSection';
import ArrowIcon from '../components/ArrowIcon';
import { DISCUSS_URL, WHATSAPP_URL, WHATSAPP_NUMBER } from '../utils/siteConfig';
import { usePageAnimations } from '../hooks/usePageAnimations';
import useSEO from '../hooks/useSEO';

/* ─────────────────────────────────────────────────────────────────────────────
   Brand-to-Product Data Rules
   ───────────────────────────────────────────────────────────────────────────── */
const BP_PAIRS = [
  {
    title: 'Brand token → Design token',
    shortA: 'Brand token',
    shortB: 'Design token',
    note: 'One decision in the brand file becomes a named token the product reads. Change it once and the product follows.',
    brandRender: (hex) => (
      <div>
        <div className="sb-swatch" style={{ background: hex, height: '70px', fontSize: '10px' }}>brand.signal</div>
        <span className="sb-lbl" style={{ marginTop: '6px' }}>One decision</span>
      </div>
    ),
    prodRender: (hex) => (
      <pre className="sb-code-box">{`--brand-signal: ${hex};
--color-action:  var(--brand-signal);
--color-focus:   var(--brand-signal);
--chart-1:       var(--brand-signal);`}</pre>
    )
  },
  {
    title: 'Brand colour → Product state',
    shortA: 'Brand colour',
    shortB: 'Product state',
    note: 'Colour is given a job. The accent means a decision is needed, green means safe to proceed. Used the same way everywhere, users learn it without reading.',
    brandRender: () => (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
        <div className="sb-swatch" style={{ background: 'var(--sb-ink)' }}>ink</div>
        <div className="sb-swatch" style={{ background: 'var(--sb-accent)' }}>accent</div>
        <div className="sb-swatch" style={{ background: 'var(--sb-ok)' }}>ok</div>
      </div>
    ),
    prodRender: () => (
      <div className="sb-m-card" style={{ padding: '6px 12px' }}>
        <div className="sb-t-row"><b style={{ fontSize: '12px' }}>Engineering</b><span className="sb-chip ok">Ready</span></div>
        <div className="sb-t-row"><b style={{ fontSize: '12px' }}>Sales</b><span className="sb-chip a">Review</span></div>
        <div className="sb-t-row" style={{ border: 0 }}><b style={{ fontSize: '12px' }}>Operations</b><span className="sb-chip">Draft</span></div>
      </div>
    )
  },
  {
    title: 'Typographic principle → Interface hierarchy',
    shortA: 'Typographic principle',
    shortB: 'Interface hierarchy',
    note: 'The display face is reserved for what matters most: the page title and the one key number. Everything else steps down in a fixed order.',
    brandRender: () => (
      <div>
        <div className="sb-hero-sample-aa">Aa</div>
        <span className="sb-lbl" style={{ marginTop: '6px' }}>Display for emphasis · sans for reading</span>
      </div>
    ),
    prodRender: () => (
      <div className="sb-m-card">
        <span className="sb-lbl">Total payroll</span>
        <div className="sb-word" style={{ fontSize: '32px', lineHeight: 1.1, margin: '4px 0' }}>₹48.2L</div>
        <div style={{ fontSize: '12px', color: 'var(--sb-mute)' }}>214 employees · on schedule</div>
      </div>
    )
  },
  {
    title: 'Brand shape → Component geometry',
    shortA: 'Brand shape',
    shortB: 'Component geometry',
    note: 'The radius chosen for the mark is the radius of every control. Switch the Shape in the hero and watch buttons, inputs and chips follow.',
    brandRender: () => (
      <div>
        <span className="sb-mark lg" style={{ '--s': '72px' }}></span>
        <span className="sb-lbl" style={{ marginTop: '6px' }}>Symbol geometry</span>
      </div>
    ),
    prodRender: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span className="sb-btn" style={{ alignSelf: 'flex-start' }}>Approve run</span>
        <div className="sb-fld">Search people</div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span className="sb-chip a">Review</span>
          <span className="sb-chip ok">Ready</span>
        </div>
      </div>
    )
  },
  {
    title: 'Brand motion → Interaction behaviour',
    shortA: 'Brand motion',
    shortB: 'Interaction behaviour',
    note: '"180ms ease-out. Nothing bounces." is both a brand line and an engineering spec. Press replay.',
    brandRender: () => (
      <div>
        <div className="sb-word" style={{ fontSize: '19px', lineHeight: 1.2 }}>180ms ease-out.<br />Nothing bounces.</div>
        <span className="sb-lbl" style={{ marginTop: '8px' }}>Motion principle</span>
      </div>
    ),
    prodRender: (hex, triggerReplay, replayKey) => (
      <div className="sb-m-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span className="sb-lbl">Approving pay run</span>
        <div className="sb-fill-track">
          <div key={replayKey} className="sb-fill" style={{ background: hex }}></div>
        </div>
        <button type="button" className="sb-btn sb-btn-dark" onClick={triggerReplay} style={{ alignSelf: 'flex-start', cursor: 'pointer' }}>
          Replay Motion
        </button>
      </div>
    )
  },
  {
    title: 'Brand voice → Product microcopy',
    shortA: 'Brand voice',
    shortB: 'Product microcopy',
    note: 'A voice is only real if it holds in the error state. Same facts, said the way the company would say them.',
    brandRender: () => (
      <div>
        <div className="sb-word" style={{ fontSize: '19px', lineHeight: 1.2 }}>Plain.<br />Precise.<br />Never cute.</div>
        <span className="sb-lbl" style={{ marginTop: '8px' }}>Voice principle</span>
      </div>
    ),
    prodRender: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div className="sb-m-card" style={{ opacity: 0.65 }}>
          <span className="sb-lbl">Generic Template</span>
          <div style={{ fontSize: '12px', marginTop: '4px' }}>Oops! Something went wrong. Please try again.</div>
        </div>
        <div className="sb-m-card" style={{ borderColor: 'var(--sb-accent)' }}>
          <span className="sb-lbl" style={{ color: 'var(--sb-accent)' }}>Halden System</span>
          <div style={{ fontSize: '12px', marginTop: '4px', fontWeight: 500 }}>Run paused. 3 employees are missing tax IDs. Add them to continue.</div>
        </div>
      </div>
    )
  }
];

const DIAGNOSTIC_CHECKS = [
  "Your product has matured but the identity hasn't.",
  "The marketing website sells a different company than the product delivers.",
  "Your designers keep making one-off UI decisions.",
  "You're moving from founder-led sales to larger enterprise accounts.",
  "You're preparing to raise institutional capital.",
  "You're entering enterprise procurement cycles.",
  "You're launching a major new version or multi-product suite.",
  "Your website, pitch deck and product no longer share the same visual language."
];

const SCENE_NAMES = ['Idea', 'Identity', 'Website', 'Product', 'System', 'Launch'];

const FAQ_ITEMS = [
  {
    q: 'How much does a SaaS brand engagement cost?',
    a: 'Brand Identity starts at ₹4,75,000 ($4,960). Brand Identity + UI/UX is ₹7,25,000 ($7,600). Brand Identity + Web + App Launch starts at ₹10,00,000 ($10,500+). Final pricing is itemized and fixed before any work begins, with zero surprise overages.'
  },
  {
    q: 'How long does a sprint typically take?',
    a: 'About 5–7 weeks for Brand Identity, 8–10 weeks for Brand + UI/UX, and 10–14 weeks for the full launch engagement. Timeline velocity depends largely on feedback turnaround and alignment speed.'
  },
  {
    q: 'Who on our team will work with you?',
    a: 'You collaborate directly with senior design leads from discovery to deployment. There are no account managers, junior handoffs, or agency middlemen.'
  },
  {
    q: 'Will you work directly with our engineering and product team?',
    a: 'Yes. We engineer the system specifically for developer handoff: Figma token libraries, design tokens (JSON/CSS variables), responsive auto-layout components, and live walkthrough sessions.'
  },
  {
    q: 'Can we start with identity and add product UI later?',
    a: 'Yes. The identity foundation is architected from day one so that product interface tokens slide seamlessly in later without having to repeat discovery or positioning.'
  },
  {
    q: 'What do we own at project completion?',
    a: 'You receive 100% intellectual property ownership upon final payment, including all raw vector assets, editable Figma libraries, custom icon sets, and master design guidelines.'
  },
  {
    q: 'How do revision cycles work?',
    a: 'We present one or two considered creative territories, choose the winning direction with leadership, and refine it through clearly scheduled approval checkpoints rather than disorganized open-ended rounds.'
  },
  {
    q: 'We already have traction. Is this a rebrand or a refresh?',
    a: 'Either. We begin with an honest audit of hard-earned customer recognition to decide what to preserve, evolve, or replace. Flint and Rizza were both structured to modernize authority while compounding existing equity.'
  },
  {
    q: 'Do you only work on software brands?',
    a: 'No. Our portfolio includes high-craft consumer products as well as software (such as Flint and Rizza). The methodology is unified: deep positioning first, followed by an architectural system built to scale.'
  },
  {
    q: 'What if we are not sure whether our brand is ready?',
    a: 'Take our 2-minute Brand Readiness Diagnostic. It calculates a quantitative readiness score and indicates exactly which dimension requires senior studio attention first.'
  }
];

export default function SaaSBrandingPage() {
  const pageRef = useRef(null);
  useSEO();
  usePageAnimations(pageRef);

  // Halden interactive theme state
  const [accent, setAccent] = useState('coral'); // 'coral' | 'cobalt' | 'ochre'
  const [shape, setShape] = useState('sharp');   // 'sharp' | 'soft' | 'round'
  const [type, setType] = useState('serif');     // 'serif' | 'grotesk' | 'mono'
  const [autoTheme, setAutoTheme] = useState(true);

  // Diagnostic checklist state
  const [checkedItems, setCheckedItems] = useState([]);

  // Brand -> Product active pair
  const [bpIndex, setBpIndex] = useState(0);
  const [replayKey, setReplayKey] = useState(0);

  // Scene explorer active tab
  const [activeScene, setActiveScene] = useState(0);

  // Tier 2 toggle ('web' vs 'product')
  const [tier2Surface, setTier2Surface] = useState('web');

  // FAQ accordion open states
  const [openFaqs, setOpenFaqs] = useState({});

  // Color hexes & radii mapping
  const ACCENT_HEX = { coral: '#E5532D', cobalt: '#2B50AA', ochre: '#C98A12' };
  const SHAPE_RAD = { sharp: '2px', soft: '6px', round: '14px' };
  const FONT_NAME = { serif: 'Fraunces', grotesk: 'Inter', mono: 'IBM Plex Mono' };

  // Auto-cycle demo theme every 3.2s until user interaction
  useEffect(() => {
    if (!autoTheme) return;
    const seq = [
      { a: 'cobalt', s: 'soft', t: 'grotesk' },
      { a: 'ochre', s: 'round', t: 'mono' },
      { a: 'coral', s: 'sharp', t: 'serif' }
    ];
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % seq.length;
      setAccent(seq[step].a);
      setShape(seq[step].s);
      setType(seq[step].t);
    }, 3200);
    return () => clearInterval(interval);
  }, [autoTheme]);

  const handleManualTheme = (setter, val) => {
    setAutoTheme(false);
    setter(val);
  };

  const toggleCheck = (idx) => {
    setCheckedItems(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const toggleFaq = (idx) => {
    setOpenFaqs(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const checkedCount = checkedItems.length;

  return (
    <>
      <div ref={pageRef} className="saas-branding-wrapper">
        <RegistrationMarks />
        <Navbar />

        {/* Embedded Scoped Style Tokens */}
        <style>{`
          .saas-branding-wrapper {
            --sb-paper: var(--paper, #EFEBE2);
            --sb-card: var(--card, #F7F4EC);
            --sb-ink: #16213E;
            --sb-accent: ${ACCENT_HEX[accent]};
            --sb-radius: ${SHAPE_RAD[shape]};
            --sb-font: ${FONT_NAME[type] === 'Fraunces' ? "'Fraunces', Georgia, serif" : FONT_NAME[type] === 'Inter' ? "'Inter', sans-serif" : "'IBM Plex Mono', monospace"};
            --sb-ok: #2F7D6B;
            --sb-mute: #6B7280;
            --sb-soft: #E9ECF3;
            --sb-line: #D8D2C2;
            background: var(--paper);
            color: var(--ink);
            overflow-x: hidden;
            width: 100%;
            max-width: 100%;
            position: relative;
          }

          .saas-branding-wrapper * {
            box-sizing: border-box;
          }

          .sb-mono { font-family: 'IBM Plex Mono', monospace; }
          .sb-serif { font-family: 'Fraunces', Georgia, serif; }
          .sb-word { font-family: var(--sb-font); font-weight: 600; letter-spacing: -0.015em; word-break: break-word; }

          .sb-hero-grid {
            display: grid;
            grid-template-columns: 0.95fr 1.05fr;
            gap: 40px;
            align-items: start;
            margin-top: 36px;
            width: 100%;
          }
          .sb-hero-grid > div {
            min-width: 0;
            max-width: 100%;
          }

          .sb-stage {
            background: #FAF8F3;
            border: 1px solid var(--ink);
            padding: 20px;
            position: relative;
            box-shadow: 0 4px 20px rgba(0,0,0,0.03);
            max-width: 100%;
            overflow: hidden;
          }
          .sb-stage-corner {
            position: absolute;
            top: -1px;
            right: -1px;
            width: 24px;
            height: 24px;
            background: var(--marker);
            clip-path: polygon(0 0, 100% 0, 100% 100%);
          }

          .sb-ctrls {
            display: flex;
            flex-wrap: wrap;
            gap: 10px 14px;
            margin-bottom: 16px;
            background: var(--card);
            padding: 12px;
            border: 1px dashed var(--line);
            max-width: 100%;
          }
          .sb-cg { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
          .sb-cg span { font: 500 10px 'IBM Plex Mono', monospace; text-transform: uppercase; color: var(--ink-soft); }
          .sb-cg button {
            border: 1px solid var(--ink);
            background: transparent;
            font: 600 11px 'Inter', sans-serif;
            padding: 5px 10px;
            cursor: pointer;
            color: var(--ink);
            transition: all 0.15s ease;
          }
          .sb-cg button.active {
            background: var(--ink);
            color: var(--paper);
          }
          .sb-cg button.swb {
            width: 26px;
            height: 26px;
            padding: 0;
            border-radius: 2px;
          }
          .sb-cg button.swb.active {
            box-shadow: 0 0 0 2px var(--paper), 0 0 0 3.5px var(--ink);
          }

          .sb-dna-strip {
            display: flex;
            align-items: center;
            gap: 10px 14px;
            flex-wrap: wrap;
            background: #ffffff;
            border: 1px solid var(--sb-line);
            border-radius: var(--sb-radius);
            padding: 10px 14px;
            font-size: 11.5px;
            max-width: 100%;
          }
          .sb-dna-strip .k { font: 500 9.5px 'IBM Plex Mono', monospace; color: var(--sb-mute); text-transform: uppercase; }

          .sb-surfaces {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-top: 14px;
            width: 100%;
          }
          .sb-surfaces > div { min-width: 0; }

          .sb-m-card {
            background: #ffffff;
            border: 1px solid var(--sb-line);
            border-radius: var(--sb-radius);
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            min-width: 0;
          }
          .sb-lbl { font: 500 9.5px 'IBM Plex Mono', monospace; letter-spacing: 0.05em; text-transform: uppercase; color: var(--sb-mute); }

          .sb-mark {
            --s: 28px;
            width: var(--s);
            height: var(--s);
            background: var(--sb-ink);
            border-radius: var(--sb-radius);
            position: relative;
            display: inline-block;
            flex-shrink: 0;
          }
          .sb-mark::after {
            content: '';
            position: absolute;
            right: 18%;
            bottom: 18%;
            width: 34%;
            height: 34%;
            background: var(--sb-accent);
            border-radius: calc(var(--sb-radius) / 2);
          }
          .sb-mark.lg { --s: 46px; }
          .sb-mark.sm { --s: 18px; }

          .sb-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: var(--sb-accent);
            color: #ffffff;
            font: 600 11px 'Inter', sans-serif;
            padding: 7px 12px;
            border-radius: var(--sb-radius);
            border: none;
            white-space: nowrap;
          }
          .sb-btn.o { background: transparent; color: var(--sb-ink); border: 1px solid var(--sb-ink); }
          .sb-btn-dark { background: var(--sb-ink); color: #ffffff; }

          .sb-chip {
            display: inline-block;
            font: 600 9.5px 'Inter', sans-serif;
            padding: 3px 8px;
            border-radius: calc(var(--sb-radius) * 1.5);
            background: var(--sb-soft);
          }
          .sb-chip.ok { background: rgba(47, 125, 107, 0.15); color: var(--sb-ok); }
          .sb-chip.a { background: rgba(229, 83, 45, 0.15); color: var(--sb-accent); }

          .sb-tokens-bar {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1px;
            background: var(--sb-line);
            border: 1px solid var(--sb-line);
            margin-top: 14px;
            width: 100%;
          }
          .sb-tokens-bar > div {
            background: #ffffff;
            padding: 8px 10px;
            font: 500 10.5px 'IBM Plex Mono', monospace;
            min-width: 0;
          }
          .sb-tokens-bar b { display: block; color: var(--sb-mute); font-size: 8.5px; text-transform: uppercase; }

          .sb-verify-row {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            margin-top: 48px;
            border-top: 1px solid var(--ink);
            border-bottom: 1px solid var(--ink);
            background: var(--card);
            width: 100%;
          }
          .sb-verify-row > div {
            padding: 18px 20px;
            border-right: 1px solid var(--ink);
            font-size: 13.5px;
            color: var(--ink-soft);
            line-height: 1.4;
            min-width: 0;
          }
          .sb-verify-row > div:last-child { border-right: none; }
          .sb-verify-row b { display: block; font: 600 10.5px 'IBM Plex Mono', monospace; text-transform: uppercase; color: var(--marker); margin-bottom: 4px; }

          /* Diagnostic Section */
          .sb-checks-list { list-style: none; padding: 0; margin: 0; }
          .sb-checks-list li { border-top: 1px solid var(--ink); }
          .sb-checks-list li:last-child { border-bottom: 1px solid var(--ink); }
          .sb-checks-list label {
            display: flex;
            gap: 14px;
            align-items: flex-start;
            padding: 14px 4px;
            cursor: pointer;
            font-size: 15px;
            line-height: 1.4;
            transition: background 0.15s ease;
          }
          .sb-checks-list label:hover { background: rgba(0,0,0,0.02); }
          .sb-check-box {
            width: 20px;
            height: 20px;
            border: 1.5px solid var(--ink);
            display: grid;
            place-content: center;
            background: #fff;
            flex-shrink: 0;
            margin-top: 2px;
          }
          .sb-check-box.checked::after {
            content: '';
            width: 10px;
            height: 10px;
            background: var(--marker);
          }

          /* Brand to Product Grid */
          .sb-bp-grid {
            display: grid;
            grid-template-columns: 0.75fr 1.25fr;
            border: 1px solid rgba(255,255,255,0.2);
            margin-top: 32px;
            width: 100%;
          }
          .sb-bp-grid > div { min-width: 0; }
          .sb-bp-list button {
            width: 100%;
            text-align: left;
            padding: 18px 22px;
            background: transparent;
            color: var(--paper);
            border: none;
            border-bottom: 1px solid rgba(255,255,255,0.14);
            cursor: pointer;
            transition: all 0.15s ease;
          }
          .sb-bp-list button:last-child { border-bottom: none; }
          .sb-bp-list button.active {
            background: var(--paper);
            color: var(--ink);
          }
          .sb-bp-list button.active .n { color: var(--marker); }
          .sb-bp-list .n { font: 600 11px 'IBM Plex Mono', monospace; color: #E8826F; }

          .sb-bp-preview-grid {
            display: grid;
            grid-template-columns: 1fr 32px 1fr;
            gap: 12px;
            align-items: center;
            background: #FAF8F3;
            padding: 18px;
            border: 1px solid var(--ink);
            width: 100%;
          }
          .sb-bp-preview-grid > div { min-width: 0; }

          .sb-code-box {
            background: var(--sb-ink);
            color: #E9ECF3;
            padding: 12px;
            font: 11.5px/1.6 'IBM Plex Mono', monospace;
            border-radius: var(--sb-radius);
            overflow-x: auto;
            margin: 0;
            max-width: 100%;
          }
          .sb-swatch {
            border-radius: var(--sb-radius);
            display: flex;
            align-items: flex-end;
            padding: 6px 8px;
            font: 500 9.5px 'IBM Plex Mono', monospace;
            color: #fff;
          }
          .sb-fld {
            border: 1px solid var(--sb-line);
            border-radius: var(--sb-radius);
            padding: 8px 10px;
            font-size: 11px;
            background: #fff;
            color: var(--sb-mute);
          }
          .sb-t-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px dashed var(--sb-line);
            padding: 6px 0;
          }
          .sb-fill-track {
            height: 8px;
            background: var(--sb-line);
            border-radius: var(--sb-radius);
            overflow: hidden;
          }
          .sb-fill {
            height: 100%;
            width: 100%;
            animation: sbFill 1.2s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
          }
          @keyframes sbFill {
            from { width: 0%; }
            to { width: 100%; }
          }

          /* Flint Chapters Grid */
          .flint-chapters-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 16px;
            width: 100%;
          }
          .flint-col-8 {
            grid-column: span 8;
            min-height: 320px;
            border: 1px solid var(--ink);
            overflow: hidden;
            border-radius: 4px;
          }
          .flint-col-4 {
            grid-column: span 4;
            min-height: 320px;
            border: 1px solid var(--ink);
            overflow: hidden;
            border-radius: 4px;
          }
          .flint-col-6 {
            grid-column: span 6;
            min-height: 300px;
            border: 1px solid var(--ink);
            overflow: hidden;
            border-radius: 4px;
          }

          /* Architectural Layers Rows */
          .sb-layer-row {
            display: grid;
            grid-template-columns: 70px 1.2fr 1.8fr 1fr;
            gap: 24px;
            padding: 30px 0;
            border-bottom: 1px solid var(--ink);
            align-items: start;
            width: 100%;
          }
          .sb-layer-row > div { min-width: 0; }

          /* Rizza Framework Grid */
          .sb-rizza-grid {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 20px;
            width: 100%;
          }
          .sb-rizza-grid > div { min-width: 0; }

          /* Scene Explorer Grid */
          .sb-scene-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 14px;
            width: 100%;
          }
          .sb-scene-grid > div { min-width: 0; }

          .sb-audit-grid {
            display: grid;
            grid-template-columns: 140px 1fr;
            border: 1px solid var(--sb-line);
            background: #FAF8F3;
            border-radius: var(--sb-radius);
            overflow: hidden;
            width: 100%;
          }
          .sb-audit-grid > div { min-width: 0; }

          /* Pricing Grid */
          .sb-pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
            gap: 24px;
            align-items: stretch;
            width: 100%;
          }

          /* Responsive Breakpoints */
          @media (max-width: 960px) {
            .sb-hero-grid { grid-template-columns: 1fr; gap: 32px; }
            .sb-bp-grid { grid-template-columns: 1fr; }
            .sb-bp-list button { border-bottom: 1px solid rgba(255,255,255,0.18); }
            .sb-verify-row { grid-template-columns: repeat(2, 1fr); }
            .sb-verify-row > div:nth-child(2n) { border-right: none; }
            .sb-verify-row > div:last-child { grid-column: span 2; border-bottom: none; }
            .sb-layer-row { grid-template-columns: 50px 1fr; gap: 14px; padding: 22px 0; }
            .sb-layer-row > div:nth-child(3),
            .sb-layer-row > div:nth-child(4) { grid-column: 2 / -1; }
            .sb-scene-grid { grid-template-columns: 1fr; }
          }
          @media (max-width: 768px) {
            .flint-chapters-grid { grid-template-columns: 1fr !important; gap: 12px; }
            .flint-col-8, .flint-col-4, .flint-col-6 { grid-column: span 1 !important; min-height: 220px !important; }
            .sb-rizza-grid { grid-template-columns: 1fr !important; }
            .sb-audit-grid { grid-template-columns: 1fr; }
            .sb-surfaces { grid-template-columns: 1fr; }
            .sb-pricing-grid { grid-template-columns: 1fr !important; gap: 20px; }
          }
          @media (max-width: 600px) {
            .sb-bp-preview-grid { grid-template-columns: 1fr; text-align: left; }
            .sb-tokens-bar { grid-template-columns: repeat(2, 1fr); }
            .sb-verify-row { grid-template-columns: 1fr; }
            .sb-verify-row > div { border-right: none !important; border-bottom: 1px solid var(--ink); }
            .sb-verify-row > div:last-child { grid-column: auto; border-bottom: none; }
            .sb-layer-row { grid-template-columns: 1fr; gap: 10px; }
            .sb-layer-row > div:nth-child(3),
            .sb-layer-row > div:nth-child(4) { grid-column: 1 / -1; }
            .sb-stage { padding: 12px; }
            .sb-ctrls { padding: 8px; gap: 6px 10px; }
            .sb-cg button { padding: 4px 7px; font-size: 10px; }
          }
        `}</style>

        {/* ════════════════════════════════════════════════════════════════
            01 HERO SECTION
           ════════════════════════════════════════════════════════════════ */}
        <section className="hero-lite" style={{ paddingBottom: '70px' }}>
          <div className="wrap">
            <div className="sheet-label">
              <span className="sheet-meta mono">PRACTICE AREA 02 // SAAS BRANDING &amp; PRODUCT UI/UX // STRATEGY → IDENTITY → INTERFACE</span>
              <div className="rule"></div>
            </div>

            <div style={{ display: 'inline-block', font: "12px 'IBM Plex Mono', monospace", color: 'var(--pine)', background: 'rgba(36,70,59,0.08)', border: '1px solid rgba(36,70,59,0.25)', padding: '8px 14px', marginBottom: '22px' }}>
              We collaborate with a limited cohort of product teams each cycle so senior creative direction stays directly in the work.
            </div>

            <h1 style={{ fontSize: 'clamp(36px, 5.2vw, 74px)', lineHeight: 1.04, maxWidth: '960px' }}>
              Your product shouldn't look like it was built by <em style={{ fontStyle: 'normal', color: 'var(--pine)', boxShadow: 'inset 0 -0.12em 0 rgba(184,65,46,0.35)' }}>three different companies.</em>
            </h1>

            <div className="sb-hero-grid">
              <div>
                <p style={{ fontSize: '18px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '20px' }}>
                  The Drawing Board builds SaaS brands from the outside in: strategic positioning, master identity, marketing website, and product UI/UX, engineered as one cohesive, connected system.
                </p>

                <div style={{ borderLeft: '2px solid var(--marker)', padding: '4px 0 4px 16px', font: "italic 400 20px/1.35 'Fraunces', Georgia, serif", color: 'var(--ink)', marginBottom: '28px' }}>
                  One design system across your brand, website, and product—so the company stops looking like three disconnected entities.
                </div>

                <div className="cta-row" style={{ marginBottom: '28px' }}>
                  <a href={DISCUSS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Discuss Your Product <ArrowIcon size={14} />
                  </a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary-cta">
                    Chat on WhatsApp <ArrowIcon size={14} />
                  </a>
                </div>

                {/* Quick Jump Pricing Row */}
                <div style={{ borderTop: '1px solid var(--ink)', paddingTop: '12px', maxWidth: '480px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px 12px', padding: '10px 0', borderBottom: '1px dashed var(--border)', fontSize: '14px' }}>
                    <span style={{ color: 'var(--ink-soft)' }}>Brand Identity System</span>
                    <b className="sb-mono" style={{ color: 'var(--pine)' }}>from ₹4,75,000 ($4,960)</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px 12px', padding: '10px 0', borderBottom: '1px dashed var(--border)', fontSize: '14px' }}>
                    <span style={{ color: 'var(--ink-soft)' }}>Brand + Product UI/UX Suite</span>
                    <b className="sb-mono" style={{ color: 'var(--pine)' }}>from ₹7,25,000 ($7,600)</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px 12px', padding: '10px 0', fontSize: '14px' }}>
                    <span style={{ color: 'var(--ink-soft)' }}>Full Launch Ecosystem (Brand + Web + App)</span>
                    <b className="sb-mono" style={{ color: 'var(--pine)' }}>from ₹10,00,000+ ($10,500+)</b>
                  </div>
                </div>
              </div>

              {/* Live Interactive Halden Canvas */}
              <div className="sb-stage">
                <div className="sb-stage-corner"></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="sb-lbl" style={{ color: 'var(--ink)' }}>Fig. 01 // Interactive Brand-to-Product Architecture</span>
                  <span className="sb-lbl">Demo product "Halden"</span>
                </div>

                {/* Controls */}
                <div className="sb-ctrls">
                  <div className="sb-cg">
                    <span>Colour</span>
                    <button type="button" className={`swb ${accent === 'coral' ? 'active' : ''}`} style={{ background: '#E5532D' }} onClick={() => handleManualTheme(setAccent, 'coral')} title="Coral"></button>
                    <button type="button" className={`swb ${accent === 'cobalt' ? 'active' : ''}`} style={{ background: '#2B50AA' }} onClick={() => handleManualTheme(setAccent, 'cobalt')} title="Cobalt"></button>
                    <button type="button" className={`swb ${accent === 'ochre' ? 'active' : ''}`} style={{ background: '#C98A12' }} onClick={() => handleManualTheme(setAccent, 'ochre')} title="Ochre"></button>
                  </div>

                  <div className="sb-cg">
                    <span>Shape</span>
                    <button type="button" className={shape === 'sharp' ? 'active' : ''} onClick={() => handleManualTheme(setShape, 'sharp')}>Sharp</button>
                    <button type="button" className={shape === 'soft' ? 'active' : ''} onClick={() => handleManualTheme(setShape, 'soft')}>Soft</button>
                    <button type="button" className={shape === 'round' ? 'active' : ''} onClick={() => handleManualTheme(setShape, 'round')}>Round</button>
                  </div>

                  <div className="sb-cg">
                    <span>Type</span>
                    <button type="button" className={type === 'serif' ? 'active' : ''} onClick={() => handleManualTheme(setType, 'serif')}>Serif</button>
                    <button type="button" className={type === 'grotesk' ? 'active' : ''} onClick={() => handleManualTheme(setType, 'grotesk')}>Grotesk</button>
                    <button type="button" className={type === 'mono' ? 'active' : ''} onClick={() => handleManualTheme(setType, 'mono')}>Mono</button>
                  </div>
                </div>

                {/* DNA Strip */}
                <div className="sb-dna-strip">
                  <span className="k">01 Strategy</span>
                  <span className="sb-word" style={{ fontSize: '13px' }}>Payroll that closes itself.</span>
                  <span className="k" style={{ marginLeft: 'auto' }}>02 Brand DNA</span>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    <i style={{ width: '14px', height: '14px', background: 'var(--sb-ink)', borderRadius: 'calc(var(--sb-radius)/2)' }}></i>
                    <i style={{ width: '14px', height: '14px', background: 'var(--sb-accent)', borderRadius: 'calc(var(--sb-radius)/2)' }}></i>
                    <i style={{ width: '14px', height: '14px', background: 'var(--sb-ok)', borderRadius: 'calc(var(--sb-radius)/2)' }}></i>
                  </div>
                  <span className="sb-word" style={{ fontSize: '16px' }}>Aa</span>
                  <div style={{ width: '18px', height: '18px', border: '1.5px solid var(--sb-ink)', borderRadius: 'var(--sb-radius)' }}></div>
                </div>

                {/* 3 Connected Surfaces */}
                <div className="sb-surfaces">
                  <div className="sb-m-card">
                    <span className="sb-lbl">03 Identity</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="sb-mark lg"></span>
                      <div>
                        <h5 className="sb-word" style={{ margin: 0, fontSize: '16px' }}>Halden</h5>
                        <span className="sb-lbl" style={{ display: 'block', marginTop: '2px' }}>Autonomous payroll</span>
                      </div>
                    </div>
                  </div>

                  <div className="sb-m-card">
                    <span className="sb-lbl">04 Website</span>
                    <h5 className="sb-word" style={{ margin: 0, fontSize: '14px', lineHeight: 1.2 }}>Payroll that closes itself.</h5>
                    <span className="sb-btn" style={{ fontSize: '10px', padding: '5px 8px', alignSelf: 'flex-start' }}>Book a demo</span>
                  </div>

                  <div className="sb-m-card">
                    <span className="sb-lbl">05 Product UI</span>
                    <div className="sb-word" style={{ fontSize: '22px', lineHeight: 1 }}>₹48.2L</div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <span className="sb-chip ok">Ready</span>
                      <span className="sb-chip a">Review</span>
                    </div>
                  </div>
                </div>

                {/* Tokens Bar */}
                <div className="sb-tokens-bar">
                  <div><b>color.action</b><span>{ACCENT_HEX[accent]}</span></div>
                  <div><b>radius.control</b><span>{SHAPE_RAD[shape]}</span></div>
                  <div><b>type.display</b><span>{FONT_NAME[type]}</span></div>
                  <div><b>06 System</b><span>3 surfaces, 1 source</span></div>
                </div>
              </div>
            </div>

            {/* Verification Strip */}
            <div className="sb-verify-row">
              <div><b>Verified Work</b>Flint &amp; technology brand systems</div>
              <div><b>Clear Pricing</b>Transparent sprint investment models</div>
              <div><b>Deliverables</b>Itemised specs with vector IP handover</div>
              <div><b>Senior Access</b>Direct communication with the makers</div>
              <div><b>Handoff</b>Figma token libraries, guidelines, code-ready</div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            02 DIAGNOSTIC: WHEN COMPANIES NEED THIS
           ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)', padding: '80px 0' }}>
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '36px', alignItems: 'start' }}>
              <div>
                <div className="eyebrow" style={{ color: 'var(--marker)', fontFamily: "'IBM Plex Mono', monospace" }}>WHEN COMPANIES NEED THIS</div>
                <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 46px)', lineHeight: 1.1, margin: '12px 0 20px' }}>
                  Your product is better than your brand looks.
                </h2>
                <p style={{ fontSize: '17px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '16px' }}>
                  The logo came from a founder's weekend, the website from a standard template, the app interface from whatever the first engineer shipped. That worked while every sale was personal.
                </p>
                <p style={{ fontSize: '17px', color: 'var(--ink)', lineHeight: 1.6, fontWeight: 500 }}>
                  Then the business scales, and enterprise buyers start comparing you with incumbents who look finished. <em>Buyers can't read your roadmap. They read your brand.</em>
                </p>
              </div>

              <div>
                <div className="eyebrow" style={{ color: 'var(--marker)', fontFamily: "'IBM Plex Mono', monospace" }}>DIAGNOSTIC // SELECT APPLICABLE FRICTION POINTS</div>
                <ul className="sb-checks-list" style={{ marginTop: '14px' }}>
                  {DIAGNOSTIC_CHECKS.map((text, idx) => {
                    const isChecked = checkedItems.includes(idx);
                    return (
                      <li key={idx}>
                        <label onClick={(e) => { e.preventDefault(); toggleCheck(idx); }}>
                          <div className={`sb-check-box ${isChecked ? 'checked' : ''}`}></div>
                          <span style={{ color: isChecked ? 'var(--ink)' : 'var(--ink-soft)', fontWeight: isChecked ? 600 : 400 }}>{text}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>

                {/* Dynamic Status Readout */}
                <div style={{ marginTop: '20px', padding: '20px', background: 'var(--paper)', border: '1px dashed var(--ink)' }}>
                  <b className="sb-mono" style={{ display: 'block', fontSize: '12px', color: 'var(--marker)', marginBottom: '6px' }}>
                    [ {checkedCount} of 8 POINTS IDENTIFIED ]
                  </b>
                  <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', margin: 0, lineHeight: 1.5 }}>
                    {checkedCount === 0 && "Nothing ticked yet. Select what applies to review your current organizational alignment."}
                    {checkedCount > 0 && checkedCount < 3 && "Early tension signals identified. A unified brand sprint will prevent fragmentation before you scale sales outreach."}
                    {checkedCount >= 3 && "Critical strategic inflection point: your product and sales ambitions have clearly outgrown your exterior brand system. A unified system will directly accelerate close rates."}
                  </p>

                  {checkedCount >= 3 && (
                    <div className="cta-row" style={{ marginTop: '16px' }}>
                      <a href={DISCUSS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                        Discuss Your Product <ArrowIcon size={14} />
                      </a>
                      <Link to="/brand-readiness" className="btn-secondary-cta">
                        Take Brand Readiness Check <ArrowIcon size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3 Core Studio Rationales */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1px', background: 'var(--ink)', border: '1px solid var(--ink)', marginTop: '48px' }}>
              <div style={{ background: 'var(--paper)', padding: '28px' }}>
                <div className="sb-mono" style={{ fontSize: '11px', color: 'var(--marker)', marginBottom: '8px' }}>01 // EFFICIENCY</div>
                <h4 style={{ fontSize: '19px', marginBottom: '8px' }}>One brief, not three vendors</h4>
                <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', margin: 0 }}>
                  When a branding agency, a web studio, and a product freelancer each reinterpret the company, you pay for the same thinking three times. Here it's decided once.
                </p>
              </div>

              <div style={{ background: 'var(--paper)', padding: '28px' }}>
                <div className="sb-mono" style={{ fontSize: '11px', color: 'var(--marker)', marginBottom: '8px' }}>02 // SCALABILITY</div>
                <h4 style={{ fontSize: '19px', marginBottom: '8px' }}>Rules that survive rapid growth</h4>
                <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', margin: 0 }}>
                  Your first ten screens can survive improvisation. Your next two hundred cannot. Tokens, typography curves, and component systems make every release faster instead of harder.
                </p>
              </div>

              <div style={{ background: 'var(--paper)', padding: '28px' }}>
                <div className="sb-mono" style={{ fontSize: '11px', color: 'var(--marker)', marginBottom: '8px' }}>03 // PRODUCTION HANDOVER</div>
                <h4 style={{ fontSize: '19px', marginBottom: '8px' }}>A handover your engineers respect</h4>
                <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', margin: 0 }}>
                  Figma libraries, token structures, responsive auto-layout constraints, and specs prepared for actual engineers rather than an award jury.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            03 SELECTED WORK: FLINT & RIZZA
           ════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '90px 0' }}>
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: '44px' }}>
              <div>
                <div className="eyebrow" style={{ color: 'var(--marker)', fontFamily: "'IBM Plex Mono', monospace" }}>SELECTED WORK // TECHNOLOGY &amp; SOFTWARE</div>
                <h2 style={{ fontSize: 'clamp(30px, 4vw, 50px)' }}>Technology brand systems, in full.</h2>
              </div>
              <p style={{ color: 'var(--ink-soft)', maxWidth: '440px', fontSize: '15.5px' }}>
                Flint demonstrates our master enterprise B2B brand architecture. Rizza showcases our brand-into-product interface translation methodology.
              </p>
            </div>

            {/* ── FLINT CASE STUDY SHOWCASE (FULL CODEBASE ASSETS) ── */}
            <article style={{ borderTop: '2px solid var(--ink)', paddingTop: '32px', marginBottom: '80px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px', alignItems: 'end', marginBottom: '28px' }}>
                <div>
                  <div className="sb-mono" style={{ fontSize: '12px', color: 'var(--marker)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    ENTERPRISE B2B SAAS // PROCESS AUTOMATION
                  </div>
                  <h3 style={{ fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.9, margin: 0, fontFamily: "'Fraunces', Georgia, serif" }}>
                    Flint
                  </h3>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13.5px' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px dashed var(--border)' }}>
                    <span style={{ color: 'var(--ink-soft)' }}>Engagement</span>
                    <b>Enterprise Brand Identity System</b>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px dashed var(--border)' }}>
                    <span style={{ color: 'var(--ink-soft)' }}>Visual Identity</span>
                    <b>Custom mathematical flare mark &amp; wordmark</b>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px dashed var(--border)' }}>
                    <span style={{ color: 'var(--ink-soft)' }}>Applications</span>
                    <b>Web UI, executive decks, credentials, environmental</b>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px dashed var(--border)' }}>
                    <span style={{ color: 'var(--ink-soft)' }}>Outcome</span>
                    <b style={{ color: 'var(--pine)' }}>+340% qualified enterprise inquiries</b>
                  </li>
                </ul>
              </div>

              {/* Flint Hero Banner (21:9) */}
              <div style={{ width: '100%', height: 'clamp(220px, 46vw, 480px)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--ink)', background: 'var(--card)', marginBottom: '24px' }}>
                <img src="/images/flint/flint_01.png" alt="Flint Enterprise SaaS Brand Identity" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Flint Image Chapters Grid */}
              <div className="flint-chapters-grid">
                {/* Wordmark + Symbol */}
                <div className="flint-col-8" style={{ background: '#000' }}>
                  <img src="/images/flint/flint_02.png" alt="Flint Wordmark & Symbol" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* Symbol Construction */}
                <div className="flint-col-4" style={{ background: '#111' }}>
                  <img src="/images/flint/flint_03.png" alt="Flint Symbol Construction" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Typography Hierarchy */}
                <div className="flint-col-6" style={{ background: '#0a0a0a' }}>
                  <img src="/images/flint/flint_04.png" alt="Flint Typography System" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* Pattern & Graphic Language */}
                <div className="flint-col-6" style={{ background: '#0a0a0a' }}>
                  <img src="/images/flint/flint_06.png" alt="Flint Visual Pattern Architecture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Web UI & App Icon */}
                <div className="flint-col-8">
                  <img src="/images/flint/flint_08.png" alt="Flint Web Platform Application" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="flint-col-4">
                  <img src="/images/flint/flint_12.png" alt="Flint Digital Icon & UI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                <Link to="/work/flint-business-automation-brand-identity" className="btn-secondary-cta">
                  Explore Full Flint Case Study &amp; 24 Assets <ArrowIcon size={14} />
                </Link>
              </div>
            </article>

            {/* ── RIZZA FRAMEWORK SHOWCASE ── */}
            <article style={{ borderTop: '2px solid var(--ink)', paddingTop: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px', alignItems: 'end', marginBottom: '24px' }}>
                <div>
                  <div className="sb-mono" style={{ fontSize: '12px', color: 'var(--marker)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    TALENT PLATFORM // BRAND → PRODUCT UI/UX CONTINUITY
                  </div>
                  <h3 style={{ fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.9, margin: 0, fontFamily: "'Fraunces', Georgia, serif" }}>
                    Rizza
                  </h3>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13.5px' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px dashed var(--border)' }}>
                    <span style={{ color: 'var(--ink-soft)' }}>Engagement</span>
                    <b>Brand Identity Redesign + Product Interface</b>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px dashed var(--border)' }}>
                    <span style={{ color: 'var(--ink-soft)' }}>Brand System</span>
                    <b>Logo / symbol, expressive palette, typography</b>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px dashed var(--border)' }}>
                    <span style={{ color: 'var(--ink-soft)' }}>Product Interface</span>
                    <b>UI elements, dashboard states, ~7–10 core screens</b>
                  </li>
                </ul>
              </div>

              {/* Rizza Strategic Statement Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: 'var(--card)', border: '1px solid var(--ink)', padding: '24px', borderRadius: '3px' }}>
                  <div className="sb-mono" style={{ fontSize: '11px', color: 'var(--marker)', marginBottom: '8px' }}>01 // THE TENSION</div>
                  <div style={{ font: "600 24px/1.2 'Fraunces', Georgia, serif" }}>Legacy hiring platforms treat ambitious humans as cold résumés.</div>
                </div>
                <div style={{ background: 'var(--card)', border: '1px solid var(--ink)', padding: '24px', borderRadius: '3px' }}>
                  <div className="sb-mono" style={{ fontSize: '11px', color: 'var(--pine)', marginBottom: '8px' }}>02 // STRATEGIC REPOSITIONING</div>
                  <div style={{ font: "600 24px/1.2 'Fraunces', Georgia, serif" }}>Make compatibility evaluation expressive, human, and culturally resonant.</div>
                </div>
              </div>

              {/* Structured Asset Slots */}
              <div className="sb-rizza-grid">
                <div style={{ background: 'repeating-linear-gradient(135deg,#E4DFD0 0 12px,#ECE8DB 12px 24px)', border: '1px solid var(--ink)', minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px' }}>
                  <div className="sb-mono" style={{ fontSize: '11px', color: 'var(--marker)' }}>RIZZA // MASTER IDENTITY &amp; SYMBOL SPEC</div>
                  <div className="sb-mono" style={{ fontSize: '11px', background: 'var(--paper)', padding: '6px 10px', border: '1px solid var(--ink)', alignSelf: 'flex-start' }}>Brand Visual Architecture System</div>
                </div>

                <div style={{ background: 'repeating-linear-gradient(135deg,#E4DFD0 0 12px,#ECE8DB 12px 24px)', border: '1px solid var(--ink)', minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px' }}>
                  <div className="sb-mono" style={{ fontSize: '11px', color: 'var(--marker)' }}>RIZZA // PRODUCT INTERFACE TOKENS</div>
                  <div className="sb-mono" style={{ fontSize: '11px', background: 'var(--paper)', padding: '6px 10px', border: '1px solid var(--ink)', alignSelf: 'flex-start' }}>Component Library Handover Specs</div>
                </div>
              </div>
            </article>

            {/* Earlier Systems Strip */}
            <div style={{ display: 'flex', gap: '14px 28px', flexWrap: 'wrap', alignItems: 'baseline', marginTop: '56px', paddingTop: '20px', borderTop: '1px dashed var(--ink)', fontSize: '14px', color: 'var(--ink-soft)' }}>
              <span className="sb-mono" style={{ fontSize: '11.5px', textTransform: 'uppercase', color: 'var(--ink)' }}>Earlier studio systems:</span>
              <Link to="/work/after8" style={{ fontWeight: 600, color: 'var(--ink)', borderBottom: '1px solid var(--marker)' }}>AFTER8®</Link>
              <Link to="/work/lumen" style={{ fontWeight: 600, color: 'var(--ink)', borderBottom: '1px solid var(--marker)' }}>LUMEN &amp; CO.</Link>
              <Link to="/work" style={{ fontWeight: 600, color: 'var(--ink)', borderBottom: '1px solid var(--marker)' }}>SOUL BREW</Link>
              <span>Applied with the identical discipline: one core idea engineered cleanly across all touchpoints.</span>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            04 BRAND → PRODUCT: THE SIGNATURE ARGUMENT
           ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '90px 0' }}>
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: '32px' }}>
              <div>
                <div className="eyebrow" style={{ color: '#E8826F', fontFamily: "'IBM Plex Mono', monospace" }}>THE SIGNATURE ARGUMENT</div>
                <h2 style={{ color: 'var(--paper)', fontSize: 'clamp(30px, 4vw, 50px)' }}>Your brand shouldn't disappear after login.</h2>
              </div>
              <p style={{ color: '#C9C3B4', maxWidth: '440px', fontSize: '15.5px' }}>
                The software interface is where your brand spends 95% of its user relationship. Select a translation rule below:
              </p>
            </div>

            <div className="sb-bp-grid">
              <div className="sb-bp-list">
                {BP_PAIRS.map((pair, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={bpIndex === idx ? 'active' : ''}
                    onClick={() => setBpIndex(idx)}
                  >
                    <div className="n">0{idx + 1} // RULE</div>
                    <div style={{ fontSize: '16.5px', fontWeight: 600, fontFamily: "'Fraunces', Georgia, serif", marginTop: '2px' }}>
                      {pair.shortA} <span style={{ opacity: 0.6 }}>→</span> {pair.shortB}
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ padding: 'clamp(16px, 3.5vw, 28px)', background: 'var(--paper)', color: 'var(--ink)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--ink-soft)' }} className="sb-mono">
                  <span>Fig. 02 // Translation Rule #0{bpIndex + 1}</span>
                  <span>Fictional system "Halden"</span>
                </div>

                <div className="sb-bp-preview-grid">
                  <div>
                    <span className="sb-lbl" style={{ color: 'var(--ink)', display: 'block', marginBottom: '8px' }}>Brand Decision</span>
                    {BP_PAIRS[bpIndex].brandRender(ACCENT_HEX[accent])}
                  </div>
                  <div style={{ textAlign: 'center', color: 'var(--marker)', fontWeight: 'bold', fontSize: '20px' }} className="sb-mono">→</div>
                  <div>
                    <span className="sb-lbl" style={{ color: 'var(--ink)', display: 'block', marginBottom: '8px' }}>Product Implementation</span>
                    {BP_PAIRS[bpIndex].prodRender(ACCENT_HEX[accent], () => setReplayKey(k => k + 1), replayKey)}
                  </div>
                </div>

                <p style={{ font: "400 17px/1.45 'Fraunces', Georgia, serif", color: 'var(--ink)', margin: 0 }}>
                  {BP_PAIRS[bpIndex].note}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            05 SCENES: ONE IDEA → MANY SURFACES
           ════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '90px 0' }}>
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: '36px' }}>
              <div>
                <div className="eyebrow" style={{ color: 'var(--marker)', fontFamily: "'IBM Plex Mono', monospace" }}>ONE IDEA → SIX SURFACES</div>
                <h2 style={{ fontSize: 'clamp(28px, 3.8vw, 48px)' }}>Follow one decision from the logo to the launch.</h2>
              </div>
              <p style={{ color: 'var(--ink-soft)', maxWidth: '440px' }}>
                The persistent top DNA never changes. Everything rendered below is that foundational DNA engineered across application surfaces.
              </p>
            </div>

            {/* Scene Selectors */}
            <div style={{ display: 'flex', overflowX: 'auto', border: '1px solid var(--ink)', background: 'var(--card)', marginBottom: '24px' }}>
              {SCENE_NAMES.map((name, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveScene(idx)}
                  style={{
                    flex: 1,
                    minWidth: '100px',
                    padding: '14px 10px',
                    border: 'none',
                    borderRight: idx < SCENE_NAMES.length - 1 ? '1px solid var(--ink)' : 'none',
                    background: activeScene === idx ? 'var(--pine)' : 'transparent',
                    color: activeScene === idx ? 'var(--paper)' : 'var(--ink)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontWeight: 600,
                    fontSize: '15px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span className="sb-mono" style={{ display: 'block', fontSize: '10px', color: activeScene === idx ? '#E8B3A8' : 'var(--marker)' }}>
                    0{idx + 1}
                  </span>
                  {name}
                </button>
              ))}
            </div>

            {/* Active Scene Stage */}
            <div style={{ background: '#FAF8F3', border: '1px solid var(--ink)', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }} className="sb-mono">
                <span className="sb-lbl" style={{ color: 'var(--ink)' }}>Fig. 03 // Scene: {SCENE_NAMES[activeScene]}</span>
                <span className="sb-lbl">HALDEN BRAND SYSTEM SPEC</span>
              </div>

              {/* Persistent Brand DNA Bar */}
              <div className="sb-dna-strip" style={{ marginBottom: '20px' }}>
                <span className="k">System DNA</span>
                <span className="sb-mark sm"></span>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <i style={{ width: '12px', height: '12px', background: 'var(--sb-ink)', borderRadius: '2px' }}></i>
                  <i style={{ width: '12px', height: '12px', background: 'var(--sb-accent)', borderRadius: '2px' }}></i>
                  <i style={{ width: '12px', height: '12px', background: 'var(--sb-ok)', borderRadius: '2px' }}></i>
                </div>
                <span className="sb-word" style={{ fontSize: '15px' }}>Aa</span>
                <span className="sb-mono" style={{ fontSize: '11px', color: 'var(--sb-mute)' }}>180ms ease-out</span>
              </div>

              {/* Scene 0: Idea */}
              {activeScene === 0 && (
                <div style={{ padding: '24px', background: '#fff', border: '1px solid var(--sb-line)', borderRadius: 'var(--sb-radius)' }}>
                  <span className="sb-lbl">Strategic Positioning Statement</span>
                  <h3 className="sb-word" style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '10px 0 20px', lineHeight: 1.05 }}>
                    Payroll that closes itself.
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', borderTop: '2px solid var(--sb-ink)', paddingTop: '16px' }}>
                    <div><span className="sb-lbl">Category</span><b style={{ display: 'block', marginTop: '4px' }}>Autonomous Global Payroll</b></div>
                    <div><span className="sb-lbl">Buyer</span><b style={{ display: 'block', marginTop: '4px' }}>VP Finance &amp; Operations</b></div>
                    <div><span className="sb-lbl">Strategic Own</span><b style={{ display: 'block', marginTop: '4px' }}>Month-end without the scramble</b></div>
                  </div>
                </div>
              )}

              {/* Scene 1: Identity */}
              {activeScene === 1 && (
                <div className="sb-scene-grid">
                  <div style={{ background: '#fff', border: '1px solid var(--sb-line)', padding: '20px', borderRadius: 'var(--sb-radius)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '160px' }}>
                    <span className="sb-mark lg" style={{ '--s': '56px' }}></span>
                    <div>
                      <div className="sb-word" style={{ fontSize: '36px' }}>Halden</div>
                      <span className="sb-lbl" style={{ marginTop: '4px' }}>Master Logotype &amp; Squirle Seal</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div className="sb-m-card"><span className="sb-lbl">Type</span><div className="sb-word" style={{ fontSize: '32px' }}>Aa</div></div>
                    <div className="sb-m-card">
                      <span className="sb-lbl">Palette</span>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginTop: '6px' }}>
                        <div className="sb-swatch" style={{ background: 'var(--sb-ink)' }}>ink</div>
                        <div className="sb-swatch" style={{ background: 'var(--sb-accent)' }}>action</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scene 2: Website */}
              {activeScene === 2 && (
                <div style={{ border: '1px solid var(--sb-line)', background: '#fff', borderRadius: 'var(--sb-radius)', overflow: 'hidden' }}>
                  <div style={{ padding: '8px 14px', background: 'var(--sb-soft)', display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <i style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ccc' }}></i>
                    <i style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ccc' }}></i>
                    <span className="sb-mono" style={{ fontSize: '10px', color: 'var(--sb-mute)', marginLeft: '10px' }}>halden.so</span>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="sb-mark sm"></span>
                        <b className="sb-word">Halden</b>
                      </div>
                      <span className="sb-btn" style={{ fontSize: '11px' }}>Book a Demo</span>
                    </div>
                    <h4 className="sb-word" style={{ fontSize: '26px', margin: '0 0 10px' }}>Run compliant global payroll without the month-end scramble.</h4>
                    <p style={{ fontSize: '13px', color: 'var(--sb-mute)', margin: 0 }}>Automated withholding, contractor payouts, and verified tax filings across 14 jurisdictions.</p>
                  </div>
                </div>
              )}

              {/* Scene 3: Product */}
              {activeScene === 3 && (
                <div className="sb-audit-grid">
                  <div style={{ background: 'var(--sb-ink)', color: '#fff', padding: '14px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className="sb-word" style={{ fontSize: '14px', marginBottom: '8px' }}>Halden OS</div>
                    <div style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px' }}>Overview</div>
                    <div style={{ padding: '4px 8px' }}>Pay Runs</div>
                    <div style={{ padding: '4px 8px' }}>Reports</div>
                  </div>
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h5 className="sb-word" style={{ margin: 0, fontSize: '15px' }}>October Pay Run</h5>
                      <span className="sb-btn">Execute Run</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      <div className="sb-m-card"><span className="sb-lbl">Total Run</span><b>₹48.2L</b></div>
                      <div className="sb-m-card"><span className="sb-lbl">Employees</span><b>214</b></div>
                      <div className="sb-m-card"><span className="sb-lbl">Audit Flags</span><b style={{ color: 'var(--sb-accent)' }}>0</b></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scene 4: System */}
              {activeScene === 4 && (
                <div>
                  <pre className="sb-code-box" style={{ padding: '16px' }}>{`/* halden.design-tokens.json — Single source of truth */
color.ink:        #16213E;
color.action:     var(--accent);
color.success:    #2F7D6B;
radius.control:   var(--shape);
type.display:     var(--display);
motion.base:      180ms ease-out;
/* Change once in token sheet -> updates Web + Product + Deck simultaneously */`}</pre>
                </div>
              )}

              {/* Scene 5: Launch */}
              {activeScene === 5 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '14px' }}>
                  <div style={{ background: 'var(--sb-ink)', color: '#fff', padding: '20px', borderRadius: 'var(--sb-radius)', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <span className="sb-mark sm" style={{ background: '#fff' }}></span>
                    <h4 className="sb-word" style={{ fontSize: '20px', margin: 0 }}>Series A Pitch Deck: Autonomous Commercial Payroll</h4>
                    <span className="sb-lbl" style={{ color: '#aaa' }}>12 MASTER SLIDES</span>
                  </div>
                  <div style={{ background: 'var(--sb-accent)', color: '#fff', padding: '20px', borderRadius: 'var(--sb-radius)', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <span className="sb-mark sm" style={{ background: '#fff' }}></span>
                    <h4 className="sb-word" style={{ fontSize: '20px', margin: 0 }}>LinkedIn &amp; Product Hunt Keynote Release Visuals</h4>
                    <span className="sb-lbl" style={{ color: '#fff' }}>MULTI-FORMAT SPECS</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            06 ARCHITECTURE: WHAT WE BUILD
           ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)', padding: '90px 0' }}>
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: '44px' }}>
              <div>
                <div className="eyebrow" style={{ color: 'var(--marker)', fontFamily: "'IBM Plex Mono', monospace" }}>WHAT WE BUILD // 4 ARCHITECTURAL LAYERS</div>
                <h2 style={{ fontSize: 'clamp(30px, 4vw, 50px)' }}>One strategic foundation, translated across every surface.</h2>
              </div>
              <p style={{ color: 'var(--ink-soft)', maxWidth: '440px', fontSize: '15.5px' }}>
                Four layers, each built on the one before. Every engagement begins with positioning and concludes with production-grade assets your team owns forever.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Layer 1 */}
              <div className="sb-layer-row">
                <div style={{ font: "600 36px/1 'Fraunces', Georgia, serif", color: 'var(--pine)' }}>01</div>
                <div>
                  <h4 style={{ fontSize: '22px', margin: 0 }}>Strategic Foundation</h4>
                  <div className="sb-mono" style={{ fontSize: '11px', color: 'var(--marker)', marginTop: '4px' }}>WHAT THE COMPANY SHOULD OWN</div>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  Founder &amp; product discovery · Buyer persona mapping · Category &amp; competitor whitespace audit · Core value claim &amp; reason to believe · Messaging direction &amp; elevator narrative.
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontSize: '10.5px', padding: '4px 8px', border: '1px solid var(--ink)', background: 'var(--paper)' }} className="sb-mono">Brand Identity</span>
                  <span style={{ fontSize: '10.5px', padding: '4px 8px', border: '1px solid var(--ink)', background: 'var(--paper)' }} className="sb-mono">Brand + UI/UX</span>
                  <span style={{ fontSize: '10.5px', padding: '4px 8px', border: '1px solid var(--ink)', background: 'var(--paper)' }} className="sb-mono">Full Launch</span>
                </div>
              </div>

              {/* Layer 2 */}
              <div className="sb-layer-row">
                <div style={{ font: "600 36px/1 'Fraunces', Georgia, serif", color: 'var(--pine)' }}>02</div>
                <div>
                  <h4 style={{ fontSize: '22px', margin: 0 }}>Identity System</h4>
                  <div className="sb-mono" style={{ fontSize: '11px', color: 'var(--marker)', marginTop: '4px' }}>HOW THE COMPANY IS RECOGNISED</div>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  Mathematical logomark architecture · Responsive brand lockups · Color token ratios &amp; accessible contrast · Typographic curation · Custom icon set · Brand book &amp; master vectors.
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontSize: '10.5px', padding: '4px 8px', border: '1px solid var(--ink)', background: 'var(--paper)' }} className="sb-mono">Brand Identity</span>
                  <span style={{ fontSize: '10.5px', padding: '4px 8px', border: '1px solid var(--ink)', background: 'var(--paper)' }} className="sb-mono">Brand + UI/UX</span>
                  <span style={{ fontSize: '10.5px', padding: '4px 8px', border: '1px solid var(--ink)', background: 'var(--paper)' }} className="sb-mono">Full Launch</span>
                </div>
              </div>

              {/* Layer 3 */}
              <div className="sb-layer-row">
                <div style={{ font: "600 36px/1 'Fraunces', Georgia, serif", color: 'var(--pine)' }}>03</div>
                <div>
                  <h4 style={{ fontSize: '22px', margin: 0 }}>Interface System</h4>
                  <div className="sb-mono" style={{ fontSize: '11px', color: 'var(--marker)', marginTop: '4px' }}>HOW THE PRODUCT IS EXPERIENCED</div>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  Marketing website UI/UX strategy · Responsive multi-breakpoint Figma wireframes · Design tokens (variables) · Core UI components (buttons, tables, forms, chips) · Developer specs.
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontSize: '10.5px', padding: '4px 8px', border: '1px dashed var(--border)', opacity: 0.5 }} className="sb-mono">Optional</span>
                  <span style={{ fontSize: '10.5px', padding: '4px 8px', border: '1px solid var(--ink)', background: 'var(--paper)' }} className="sb-mono">1 Surface (Web or App)</span>
                  <span style={{ fontSize: '10.5px', padding: '4px 8px', border: '1px solid var(--ink)', background: 'var(--paper)' }} className="sb-mono">Both Surfaces</span>
                </div>
              </div>

              {/* Layer 4 */}
              <div className="sb-layer-row" style={{ borderBottom: 'none' }}>
                <div style={{ font: "600 36px/1 'Fraunces', Georgia, serif", color: 'var(--pine)' }}>04</div>
                <div>
                  <h4 style={{ fontSize: '22px', margin: 0 }}>Launch Ecosystem</h4>
                  <div className="sb-mono" style={{ fontSize: '11px', color: 'var(--marker)', marginTop: '4px' }}>HOW THE COMPANY ENTERS THE MARKET</div>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  High-speed custom website deployment · Investor &amp; sales deck master templates · Social media templates · Product Hunt / keynote assets · Direct launch support.
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontSize: '10.5px', padding: '4px 8px', border: '1px dashed var(--border)', opacity: 0.5 }} className="sb-mono">Deck only</span>
                  <span style={{ fontSize: '10.5px', padding: '4px 8px', border: '1px dashed var(--border)', opacity: 0.5 }} className="sb-mono">Basic support</span>
                  <span style={{ fontSize: '10.5px', padding: '4px 8px', border: '1px solid var(--ink)', background: 'var(--paper)' }} className="sb-mono">Full Launch Suite</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            07 TRANSPARENT INVESTMENT & SPRINT MODELS
           ════════════════════════════════════════════════════════════════ */}
        <section id="investment" style={{ padding: '90px 0' }}>
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: '44px' }}>
              <div>
                <div className="eyebrow" style={{ color: 'var(--marker)', fontFamily: "'IBM Plex Mono', monospace" }}>TRANSPARENT SPRINT INVESTMENT</div>
                <h2 style={{ fontSize: 'clamp(30px, 4vw, 50px)' }}>The investment follows how far the system reaches.</h2>
              </div>
              <p style={{ color: 'var(--ink-soft)', maxWidth: '440px', fontSize: '15.5px' }}>
                Every engagement ships an authoritative, vector-complete brand identity. The difference is how deeply it penetrates into your website, software UI, and go-to-market assets.
              </p>
            </div>

            {/* 3 Tier Cards */}
            <div className="sb-pricing-grid">
              {/* Tier 1 */}
              <div style={{ background: 'var(--card)', border: '1px solid var(--ink)', display: 'flex', flexDirection: 'column', padding: '32px' }}>
                <span className="sb-mono" style={{ fontSize: '11px', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>TIER 01 // FOUNDATION</span>
                <h3 style={{ fontSize: '24px', margin: '8px 0 4px' }}>Brand Identity</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-soft)', marginBottom: '20px' }}>Strategy, market positioning, and a complete visual identity system.</p>
                <div style={{ font: "600 38px/1 'Fraunces', Georgia, serif", color: 'var(--ink)', marginBottom: '4px' }}>₹4,75,000</div>
                <span className="sb-mono" style={{ fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '20px' }}>$4,960 / fixed scope sprint</span>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', fontSize: '13.5px', color: 'var(--ink-soft)', flex: 1 }}>
                  <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ Founder &amp; product strategic discovery</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ Category, competitor &amp; whitespace audit</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ Positioning narrative &amp; brand elevator claim</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ Logo mark architecture (primary &amp; product seals)</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ Typography hierarchy &amp; accessible color tokens</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ 12-slide master pitch deck template</li>
                  <li style={{ padding: '8px 0' }}>✓ Full vector source files &amp; guidelines PDF</li>
                </ul>

                <div className="sb-mono" style={{ fontSize: '12px', color: 'var(--pine)', marginBottom: '16px' }}>Sprint timeline: 5–7 weeks</div>
                <a href={DISCUSS_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary-cta" style={{ textAlign: 'center', justifyContent: 'center' }}>
                  Discuss Brand Identity <ArrowIcon size={14} />
                </a>
              </div>

              {/* Tier 2 (Featured) */}
              <div style={{ background: 'var(--card)', border: '2.5px solid var(--pine)', display: 'flex', flexDirection: 'column', padding: '32px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--pine)', color: '#fff', fontSize: '10px', padding: '4px 10px', fontWeight: 600 }} className="sb-mono">
                  POPULAR FOR FUNDED TEAMS
                </div>
                <span className="sb-mono" style={{ fontSize: '11px', color: 'var(--pine)', textTransform: 'uppercase' }}>TIER 02 // IDENTITY + INTERFACE</span>
                <h3 style={{ fontSize: '24px', margin: '8px 0 4px' }}>Brand Identity + UI/UX</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-soft)', marginBottom: '16px' }}>The complete brand identity, plus the digital interface your buyers touch.</p>
                <div style={{ font: "600 38px/1 'Fraunces', Georgia, serif", color: 'var(--pine)', marginBottom: '4px' }}>₹7,25,000</div>
                <span className="sb-mono" style={{ fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '16px' }}>$7,600 / one digital surface included</span>

                {/* Surface Toggle */}
                <div style={{ display: 'flex', border: '1px solid var(--ink)', marginBottom: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setTier2Surface('web')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: tier2Surface === 'web' ? 'var(--ink)' : 'transparent',
                      color: tier2Surface === 'web' ? 'var(--paper)' : 'var(--ink)',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Marketing Website UI
                  </button>
                  <button
                    type="button"
                    onClick={() => setTier2Surface('product')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: tier2Surface === 'product' ? 'var(--ink)' : 'transparent',
                      color: tier2Surface === 'product' ? 'var(--paper)' : 'var(--ink)',
                      border: 'none',
                      borderLeft: '1px solid var(--ink)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Product App UI/UX
                  </button>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', fontSize: '13.5px', color: 'var(--ink-soft)', flex: 1 }}>
                  <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)', fontWeight: 600, color: 'var(--ink)' }}>★ Everything in Brand Identity Foundation, plus:</li>
                  {tier2Surface === 'web' ? (
                    <>
                      <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ High-conversion marketing website strategy</li>
                      <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ Message hierarchy &amp; section wireframes</li>
                      <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ Responsive UI/UX for up to 8 page templates</li>
                      <li style={{ padding: '8px 0' }}>✓ Figma design system tokens &amp; developer handoff</li>
                    </>
                  ) : (
                    <>
                      <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ Product design tokens (JSON, variables)</li>
                      <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ Core UI component library (forms, tables, chips)</li>
                      <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ UI/UX for up to 3 core application user flows</li>
                      <li style={{ padding: '8px 0' }}>✓ Developer walkthrough &amp; token specifications</li>
                    </>
                  )}
                </ul>

                <div className="sb-mono" style={{ fontSize: '12px', color: 'var(--pine)', marginBottom: '16px' }}>Sprint timeline: 8–10 weeks</div>
                <a href={DISCUSS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>
                  Discuss Brand + UI/UX <ArrowIcon size={14} />
                </a>
              </div>

              {/* Tier 3 */}
              <div style={{ background: 'var(--card)', border: '1px solid var(--ink)', display: 'flex', flexDirection: 'column', padding: '32px' }}>
                <span className="sb-mono" style={{ fontSize: '11px', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>TIER 03 // FULL LAUNCH</span>
                <h3 style={{ fontSize: '24px', margin: '8px 0 4px' }}>Brand + Web + App Launch</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-soft)', marginBottom: '20px' }}>The whole company, fully engineered and ready to enter the market.</p>
                <div style={{ font: "600 38px/1 'Fraunces', Georgia, serif", color: 'var(--ink)', marginBottom: '4px' }}>₹10,00,000+</div>
                <span className="sb-mono" style={{ fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '20px' }}>$10,500+ / custom scope proposal</span>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', fontSize: '13.5px', color: 'var(--ink-soft)', flex: 1 }}>
                  <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)', fontWeight: 600, color: 'var(--ink)' }}>★ Everything in Tier 02 for BOTH surfaces, plus:</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ Production website design &amp; code build (React/Framer)</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ Comprehensive design system &amp; full prototype flows</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ Executive investor &amp; sales deck master templates</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>✓ Social launch campaign &amp; announcement assets</li>
                  <li style={{ padding: '8px 0' }}>✓ Dedicated launch-week engineer coordination</li>
                </ul>

                <div className="sb-mono" style={{ fontSize: '12px', color: 'var(--pine)', marginBottom: '16px' }}>Sprint timeline: 10–14 weeks</div>
                <a href={DISCUSS_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary-cta" style={{ textAlign: 'center', justifyContent: 'center' }}>
                  Discuss Full Launch <ArrowIcon size={14} />
                </a>
              </div>
            </div>

            {/* Structured Payment Terms */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '20px', marginTop: '36px' }}>
              <div style={{ border: '1px solid var(--ink)', background: 'var(--card)', padding: '24px' }}>
                <h4 style={{ fontSize: '17px', marginBottom: '12px' }}>Structured Payment Schedule</h4>
                <ol style={{ paddingLeft: '18px', fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.8 }}>
                  <li>50% deposit to secure sprint window &amp; initiate discovery</li>
                  <li>25% upon executive approval of identity &amp; UI direction</li>
                  <li>25% prior to production code handoff &amp; source vector delivery</li>
                </ol>
              </div>

              <div style={{ border: '1px solid var(--ink)', background: 'var(--card)', padding: '24px' }}>
                <h4 style={{ fontSize: '17px', marginBottom: '12px' }}>Our Qualification Standard</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
                  This engagement is purpose-built for teams where commercial credibility directly influences whether contracts close or rounds succeed. If your business is ready for senior design governance, we move fast and deliver cleanly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            08 FREQUENTLY ASKED QUESTIONS
           ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)', padding: '90px 0' }}>
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: '44px' }}>
              <div>
                <div className="eyebrow" style={{ color: 'var(--marker)', fontFamily: "'IBM Plex Mono', monospace" }}>QUESTIONS FOUNDERS ASK</div>
                <h2 style={{ fontSize: 'clamp(30px, 4vw, 50px)' }}>Everything you'd want to know before a call.</h2>
              </div>
              <p style={{ color: 'var(--ink-soft)', maxWidth: '440px', fontSize: '15.5px' }}>
                Direct, transparent answers regarding scope, IP ownership, developer collaboration, and pricing.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = !!openFaqs[idx];
                return (
                  <div key={idx} style={{ border: '1px solid var(--ink)', background: 'var(--paper)' }}>
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      style={{
                        width: '100%',
                        padding: '20px 24px',
                        background: 'transparent',
                        border: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'left',
                        font: "600 17px 'Fraunces', Georgia, serif",
                        color: 'var(--ink)',
                        cursor: 'pointer'
                      }}
                    >
                      <span>{item.q}</span>
                      <span className="sb-mono" style={{ fontSize: '20px', transition: 'transform 0.2s', transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 24px 20px', fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: '820px' }}>
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            09 FINAL CTA SECTION
           ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '90px 0' }}>
          <div className="wrap">
            <div className="eyebrow" style={{ color: '#E8826F', fontFamily: "'IBM Plex Mono', monospace" }}>NEXT STEP // COMMENCE SPRINT</div>
            <h2 style={{ color: 'var(--paper)', fontSize: 'clamp(32px, 5vw, 62px)', maxWidth: '860px', margin: '14px 0 20px' }}>
              Build the SaaS brand buyers trust before the demo.
            </h2>
            <p style={{ color: '#C9C3B4', fontSize: '18px', maxWidth: '620px', lineHeight: 1.6, marginBottom: '32px' }}>
              Book a direct 15-minute call to discuss your product requirements, or take the two-minute Brand Readiness Diagnostic to evaluate where your system stands.
            </p>
            <div className="cta-row" style={{ gap: '16px' }}>
              <a href={DISCUSS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
                Discuss Your Product <ArrowIcon size={14} />
              </a>
              <Link to="/brand-readiness" className="btn-secondary-cta" style={{ border: '1px solid rgba(255,255,255,0.4)', color: 'var(--paper)' }}>
                Take Brand Readiness Check <ArrowIcon size={14} />
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary-cta" style={{ border: '1px solid rgba(255,255,255,0.4)', color: 'var(--paper)' }}>
                Prefer WhatsApp <ArrowIcon size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* More Services Section */}
        <MoreServicesSection current="saas-branding" />

        {/* Global Footer */}
        <Footer />

        {/* Sticky Mobile CTA */}
        <StickyMobileCTA
          title="SaaS Branding"
          subtitle="From ₹4,75,000 ($4,960)"
          buttonText="Discuss"
          link={DISCUSS_URL}
        />
      </div>
    </>
  );
}
