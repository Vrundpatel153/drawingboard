import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StickyMobileCTA from '../components/StickyMobileCTA';
import RegistrationMarks from '../components/RegistrationMarks';
import MoreServicesSection from '../components/MoreServicesSection';
import ArrowIcon from '../components/ArrowIcon';
import useSEO from '../hooks/useSEO';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { WHATSAPP_URL, MAILTO_URL } from '../utils/siteConfig';

/* ─────────────────────────────────────────────────────────────────────────────
   SpatialBrandingPage — Comprehensive Architectural Brand Environments Experience
   Merges both spatial branding designs into a pixel-perfect, fully responsive system
   ───────────────────────────────────────────────────────────────────────────── */
export default function SpatialBrandingPage() {
  const pageRef = useRef(null);
  usePageAnimations(pageRef);

  useSEO({
    title: 'Spatial Branding & Brand Environments — The Drawing Board',
    description: 'We build brands you can step into. Comprehensive spatial branding, environmental graphic design, commercial interior concepts, and customer journey architecture.'
  });

  // State for interactive features
  const [activeStage, setActiveStage] = useState(0);
  const [activeAnatomyPin, setActiveAnatomyPin] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [formData, setFormData] = useState({
    business: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    category: 'Restaurant / Café',
    spaceType: 'New space',
    stage: 'Idea / Early planning',
    area: '',
    budget: '',
    launch: '',
    brief: '',
    services: ['Spatial strategy', 'Environmental graphics']
  });

  // Handle service checkbox toggle
  const handleServiceToggle = (svc) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter(s => s !== svc)
        : [...prev.services, svc]
    }));
  };

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.business || !formData.email) {
      setFormStatus('Please complete your name, business name, and email address.');
      return;
    }
    setFormStatus('Preparing your inquiry...');
    setTimeout(() => {
      setFormSubmitted(true);
      setFormStatus('Thank you. We have received your spatial project inquiry and will be in touch within 24 hours.');
    }, 600);
  };

  // 6 Anatomy points with coordinates and descriptions
  const anatomyPoints = [
    {
      id: 0,
      pin: { x: '18%', y: '74%' },
      number: '01',
      title: 'Entrance & Threshold',
      subtitle: 'The First 5 Seconds',
      desc: 'What the threshold communicates before a single word is read. Flooring transitions, entryway reveal framing, and initial sensory atmosphere.',
      tag: 'THRESHOLD'
    },
    {
      id: 1,
      pin: { x: '32%', y: '20%' },
      number: '02',
      title: 'Brand Signage & Recognition',
      subtitle: 'Seen From The Street',
      desc: 'External fascia, architectural lettering, directional illumination, and brand mark integration engineered for legibility at distance, speed, and night.',
      tag: 'EXTERIOR SIGN'
    },
    {
      id: 2,
      pin: { x: '52%', y: '64%' },
      number: '03',
      title: 'Customer Journey & Zoning',
      subtitle: 'Queue, Order, Linger',
      desc: 'Calculated pedestrian choreography: where customers pause, queue without blocking tables, discover merchandise, and settle into seating.',
      tag: 'CIRCULATION'
    },
    {
      id: 3,
      pin: { x: '72%', y: '78%' },
      number: '04',
      title: 'Material Language & Tactility',
      subtitle: 'Colour You Can Touch',
      desc: 'Tactile physical palette directly derived from brand identity tokens — fluted white oak, terracotta plaster, honed travertine, and brushed brass.',
      tag: 'FINISHES'
    },
    {
      id: 4,
      pin: { x: '84%', y: '32%' },
      number: '05',
      title: 'Environmental Graphics & Wall Art',
      subtitle: 'The System on the Wall',
      desc: 'Large-scale brand murals, architectural archway framing, illuminated niches, and narrative typography integrated into the structural envelope.',
      tag: 'SURFACE'
    },
    {
      id: 5,
      pin: { x: '50%', y: '16%' },
      number: '06',
      title: 'Brand Touchpoints & Tabletop',
      subtitle: 'What People Keep',
      desc: 'Physical collateral extending the spatial language: debossed leather menus, custom unboxing packaging, linen coasters, and employee uniforms.',
      tag: 'TOUCHPOINTS'
    }
  ];

  // 4 Stages from Identity to Environment
  const stages = [
    {
      step: 'Stage 01',
      title: 'The Identity',
      sub: 'Brand System On Paper',
      desc: 'The strategic logic everything inherits: primary wordmark, bespoke typography, color ratios, and editorial design rules.',
      image: '/images/spatial/brand-identity-stationery.jpg',
      caption: 'Temaki Brand Identity System — Menu, Typography & Stationery'
    },
    {
      step: 'Stage 02',
      title: 'The Materials',
      sub: 'Colour Becomes Material',
      desc: 'Brand hex values translate into tangible architectural finishes: oiled oak, brushed bronze, textured wool bouclé, and travertine.',
      image: '/images/spatial/material-language-board.jpg',
      caption: 'Architectural Material Moodboard — Oak, Stone, Slate & Textiles'
    },
    {
      step: 'Stage 03',
      title: 'The Spatial Concept',
      sub: 'Grid Becomes Plan',
      desc: 'Zoning, sightline analysis, ergonomic counter dimensions (12,400mm plan), entrance threshold, and customer circulation vectors.',
      isSvgPlan: true,
      caption: 'Architectural Layout & Spatial Circulation Vector Plan'
    },
    {
      step: 'Stage 04',
      title: 'The Environment',
      sub: 'Complete Commercial Space',
      desc: 'The final unified atmosphere: architectural lighting, fluted timber counters, illuminated niches, and tactile warmth.',
      image: '/images/spatial/cafe-interior.jpg',
      caption: 'Artisanal Bakery & Café — Complete Branded Commercial Interior'
    }
  ];

  return (
    <>
      <div ref={pageRef} className="spatial-page-wrapper">
        <RegistrationMarks />
        <Navbar />

        {/* Global Embedded Styles for Pixel-Perfect Blueprint Aesthetics */}
        <style>{`
          .spatial-page-wrapper {
            background: var(--paper, #EDE9E3);
            color: var(--ink, #1B1B17);
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
            padding-bottom: 70px;
          }

          /* Architectural Blueprint Grid Background */
          .spatial-hero-sec {
            position: relative;
            border-bottom: 1px solid var(--ink);
            background: var(--paper);
            padding: 48px 0 0 0;
            overflow: hidden;
          }

          .spatial-hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 36px;
            align-items: stretch;
          }

          @media (min-width: 960px) {
            .spatial-hero-grid {
              grid-template-columns: 1.1fr 0.9fr;
              gap: 48px;
            }
          }

          .spatial-hero-left {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-bottom: 40px;
          }

          .spatial-hero-title {
            font-family: 'Fraunces', serif;
            font-size: clamp(38px, 6.5vw, 92px);
            font-weight: 700;
            line-height: 0.95;
            letter-spacing: -0.03em;
            text-transform: uppercase;
            margin: 18px 0 24px;
            color: var(--ink);
          }

          .spatial-hero-title em {
            font-style: italic;
            font-weight: 400;
            color: var(--pine, #24463B);
          }

          .spatial-hero-sub {
            font-size: clamp(16px, 1.8vw, 21px);
            line-height: 1.5;
            max-width: 48ch;
            color: var(--ink-soft, #4A473F);
            margin-bottom: 32px;
          }

          .spatial-meta-strip {
            display: grid;
            grid-template-columns: 1fr;
            border-top: 1px solid var(--ink);
            border-bottom: 1px solid var(--ink);
            background: var(--card, #F6F3EC);
            margin-top: 24px;
          }

          @media (min-width: 768px) {
            .spatial-meta-strip {
              grid-template-columns: repeat(3, 1fr);
            }
            .spatial-meta-strip div + div {
              border-left: 1px solid var(--ink);
            }
          }

          .spatial-meta-strip div {
            padding: 16px 24px;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11.5px;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--ink);
          }

          .spatial-meta-strip div span.dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: var(--marker, #B5432E);
          }

          /* Interactive Stage Tabs & Progress */
          .stages-tab-nav {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin: 32px 0 24px;
          }

          @media (min-width: 900px) {
            .stages-tab-nav {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          .stage-tab-btn {
            border: 1px solid var(--ink);
            background: var(--card);
            padding: 16px 18px;
            cursor: pointer;
            text-align: left;
            transition: all 0.2s ease;
            position: relative;
          }

          .stage-tab-btn.active {
            background: var(--pine);
            color: var(--paper);
            border-color: var(--pine);
          }

          .stage-tab-btn .stg-num {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            opacity: 0.75;
            display: block;
            margin-bottom: 6px;
          }

          .stage-tab-btn.active .stg-num {
            color: #9FCBB6;
          }

          .stage-tab-btn h4 {
            font-family: 'Fraunces', serif;
            font-size: 18px;
            font-weight: 600;
            margin: 0;
            color: inherit;
          }

          /* System 6-Box Grid */
          .sys-grid {
            display: grid;
            grid-template-columns: 1fr;
            border-top: 1px solid var(--ink);
            border-left: 1px solid var(--ink);
            margin-top: 36px;
          }

          @media (min-width: 768px) {
            .sys-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (min-width: 1080px) {
            .sys-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          .sys-card {
            padding: 32px 28px;
            border-right: 1px solid var(--ink);
            border-bottom: 1px solid var(--ink);
            background: var(--card);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 220px;
            transition: background 0.2s ease;
          }

          .sys-card:hover {
            background: var(--paper);
          }

          .sys-card .n {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 13px;
            font-weight: 700;
            color: var(--marker);
            letter-spacing: 0.1em;
            margin-bottom: 24px;
          }

          .sys-card h3 {
            font-family: 'Fraunces', serif;
            font-size: 22px;
            font-weight: 600;
            margin: 0 0 12px;
            color: var(--ink);
          }

          .sys-card p {
            font-size: 14.5px;
            line-height: 1.55;
            color: var(--ink-soft);
            margin: 0;
          }

          /* Interactive Anatomy Pinpoint Room */
          .anatomy-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 36px;
            margin-top: 40px;
          }

          @media (min-width: 960px) {
            .anatomy-container {
              grid-template-columns: 1.25fr 0.85fr;
              gap: 48px;
            }
            .anatomy-sticky-visual {
              position: sticky;
              top: 100px;
              align-self: start;
            }
          }

          .anatomy-fig {
            position: relative;
            border: 1.5px solid var(--ink);
            border-radius: 2px;
            overflow: hidden;
            background: var(--card);
            box-shadow: 0 8px 30px rgba(0,0,0,0.06);
          }

          .anatomy-pin {
            position: absolute;
            width: 28px;
            height: 28px;
            margin-left: -14px;
            margin-top: -14px;
            border-radius: 50%;
            background: rgba(237, 233, 227, 0.95);
            border: 2px solid var(--ink);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11px;
            font-weight: 700;
            color: var(--ink);
            cursor: pointer;
            z-index: 10;
            transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          }

          .anatomy-pin:hover,
          .anatomy-pin.active {
            background: var(--marker);
            color: #FFFFFF;
            border-color: #FFFFFF;
            transform: scale(1.35);
            box-shadow: 0 0 0 4px rgba(181, 67, 46, 0.35);
          }

          .anatomy-pin-pulse {
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 1.5px solid var(--marker);
            animation: pinPulse 2s infinite ease-out;
            pointer-events: none;
          }

          @keyframes pinPulse {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(2.2); opacity: 0; }
          }

          .anatomy-step-card {
            padding: 22px 24px;
            border-left: 3px solid transparent;
            border-bottom: 1px dashed var(--paper-line);
            cursor: pointer;
            transition: all 0.2s ease;
            background: transparent;
          }

          .anatomy-step-card:hover {
            background: rgba(36, 70, 59, 0.04);
          }

          .anatomy-step-card.active {
            border-left-color: var(--marker);
            background: var(--card);
            border-bottom-color: transparent;
            box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          }

          /* Dark Blueprint Form Section */
          .spatial-enquiry-band {
            background: var(--ink, #1C1D1A);
            color: var(--paper, #EDE9E3);
            border-top: 1px solid var(--ink);
            padding: 80px 0;
            position: relative;
          }

          .spatial-form-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px 32px;
            margin-top: 40px;
          }

          @media (min-width: 768px) {
            .spatial-form-grid {
              grid-template-columns: 1fr 1fr;
            }
            .spatial-form-grid .full-span {
              grid-column: 1 / -1;
            }
          }

          .spatial-form-label {
            display: block;
            border-top: 1px dashed rgba(237, 233, 227, 0.25);
            padding-top: 14px;
          }

          .spatial-form-label span.field-tag {
            display: block;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 10.5px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #9B8A6C;
            margin-bottom: 8px;
          }

          .spatial-input,
          .spatial-select,
          .spatial-textarea {
            width: 100%;
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(237, 233, 227, 0.35);
            color: #FFFFFF;
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            padding: 8px 0;
            border-radius: 0;
            transition: border-color 0.2s ease;
          }

          .spatial-input:focus,
          .spatial-select:focus,
          .spatial-textarea:focus {
            outline: none;
            border-bottom-color: var(--marker);
          }

          .spatial-select option {
            background: #1C1D1A;
            color: #FFFFFF;
          }

          .spatial-checkbox-group {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 8px;
          }

          .spatial-checkbox-item {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            border: 1px solid rgba(237, 233, 227, 0.3);
            border-radius: 2px;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .spatial-checkbox-item.checked {
            background: var(--pine);
            border-color: var(--pine);
            color: #FFFFFF;
          }

          /* Blueprint Dotted Divider */
          .blueprint-rule {
            height: 1px;
            border-top: 1px dashed var(--paper-line);
            margin: 48px 0;
          }
        `}</style>

        {/* ── SECTION 01: HERO SECTION ── */}
        <section className="spatial-hero-sec">
          <div className="wrap">
            {/* Breadcrumb Navigation */}
            <div className="crumb" style={{ padding: 0, marginBottom: '20px' }}>
              <Link to="/services">Services</Link>
              <span className="sep">/</span>
              <span className="cur">Spatial Branding & Brand Environments</span>
            </div>

            <div className="sheet-label" style={{ marginBottom: '24px' }}>
              <span className="sheet-meta mono" style={{ color: 'var(--marker)' }}>
                SHEET 05 // SPATIAL BRANDING & BRAND ENVIRONMENTS
              </span>
              <div className="rule"></div>
            </div>

            <div className="spatial-hero-grid">
              <div className="spatial-hero-left">
                <div>
                  <div className="mono" style={{ fontSize: '11.5px', letterSpacing: '0.12em', color: 'var(--marker)', textTransform: 'uppercase', marginBottom: '12px' }}>
                    COMMERCIAL ARCHITECTURE & BRANDED ENVIRONMENTS
                  </div>
                  <h1 className="spatial-hero-title">
                    We build brands you can <em>step into</em>.
                  </h1>
                  <p className="spatial-hero-sub">
                    From the first identity on the drawing board to the physical spaces people remember. We engineer cohesive sensory environments — translating brand narrative into architecture, signage, material tactility, and intuitive customer journeys.
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                  <a href="#enquiry" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    Inquire About a Space <ArrowIcon />
                  </a>
                  <a
                    href="https://cal.com/dandelion-nrvrze"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link"
                    style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center' }}
                  >
                    Schedule 15-Min Spatial Discovery Call <ArrowIcon size={15} strokeWidth={2.5} />
                  </a>
                </div>
              </div>

              {/* Hero Image Showcase with Architectural Framing */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'relative',
                  border: '1.5px solid var(--ink)',
                  background: 'var(--card)',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  aspectRatio: '4/3',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
                }}>
                  <img
                    src="/images/spatial/restaurant-interior.jpg"
                    alt="Warm Branded Commercial Restaurant Interior"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    background: 'rgba(237, 233, 227, 0.95)',
                    border: '1px solid var(--ink)',
                    padding: '4px 10px',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--ink)'
                  }}>
                    CONCEPT STUDY // HOSPITALITY INTERIOR EXECUTION
                  </div>
                </div>

                {/* Corner Architectural Coordinates */}
                <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '10.5px', color: 'var(--ink-soft)' }}>
                  <span>LAT 40.7128° N // LON 74.0060° W</span>
                  <span>COMMERCIAL SCALE ONLY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Three-discipline Meta Strip */}
          <div className="spatial-meta-strip">
            <div><span className="dot"></span> 01 // SPATIAL BRAND STRATEGY</div>
            <div><span className="dot"></span> 02 // ENVIRONMENTAL GRAPHIC DESIGN</div>
            <div><span className="dot"></span> 03 // COMMERCIAL INTERIOR CONCEPTS</div>
          </div>
        </section>


        {/* ── SECTION 02: FROM IDENTITY TO ENVIRONMENT (4 STAGES) ── */}
        <section style={{ padding: '72px 0', borderBottom: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow mono" style={{ color: 'var(--marker)' }}>02 // THE TRANSLATION METHOD</div>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(30px, 4.8vw, 56px)', margin: '10px 0 16px' }}>
                  Good brands don’t stop at the logo.
                </h2>
              </div>
              <p style={{ maxWidth: '44ch' }}>
                They continue through every threshold, surface, sign, material texture, and customer interaction. Here is how a 2D identity expands into 3D reality.
              </p>
            </div>

            {/* Stage Selector Tabs */}
            <div className="stages-tab-nav">
              {stages.map((stg, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`stage-tab-btn ${activeStage === idx ? 'active' : ''}`}
                >
                  <span className="stg-num">{stg.step}</span>
                  <h4>{stg.title}</h4>
                </button>
              ))}
            </div>

            {/* Active Stage Display Panel */}
            <div style={{
              border: '1.5px solid var(--ink)',
              background: 'var(--card)',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '0',
              overflow: 'hidden'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                alignItems: 'center'
              }}>
                <div style={{ padding: '36px', borderBottom: '1px solid var(--ink)' }}>
                  <div className="mono" style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--marker)', marginBottom: '8px' }}>
                    {stages[activeStage].step} — {stages[activeStage].sub}
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(24px, 3.2vw, 36px)', margin: '0 0 14px', color: 'var(--ink)' }}>
                    {stages[activeStage].title}
                  </h3>
                  <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: '64ch' }}>
                    {stages[activeStage].desc}
                  </p>
                </div>

                {/* Stage Visual Container */}
                <div style={{ position: 'relative', width: '100%', minHeight: '360px', background: '#E6DDCE' }}>
                  {stages[activeStage].isSvgPlan ? (
                    /* Stage 03 Architectural Vector Plan Schematic */
                    <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '380px' }}>
                      <svg viewBox="0 0 800 480" style={{ width: '100%', height: 'auto', maxHeight: '420px', background: '#F6F3EC', border: '1px solid #1B1B17' }}>
                        {/* Blueprint Grid Lines */}
                        {Array.from({ length: 40 }).map((_, i) => (
                          <g key={i}>
                            <line x1={i * 20} y1="0" x2={i * 20} y2="480" stroke="#1B1B17" opacity="0.07" />
                            <line x1="0" y1={i * 20} x2="800" y2={i * 20} stroke="#1B1B17" opacity="0.07" />
                          </g>
                        ))}
                        {/* Outer Architectural Walls */}
                        <rect x="80" y="50" width="640" height="380" fill="none" stroke="#1B1B17" strokeWidth="4" />
                        <line x1="80" y1="240" x2="320" y2="240" stroke="#1B1B17" strokeWidth="3" />
                        <line x1="320" y1="240" x2="320" y2="330" stroke="#1B1B17" strokeWidth="3" />
                        {/* Doorway Arc */}
                        <path d="M 80 330 A 60 60 0 0 1 140 390" fill="none" stroke="#1B1B17" strokeWidth="2" strokeDasharray="4 4" />
                        {/* Main Bar / Counter */}
                        <rect x="400" y="110" width="240" height="56" fill="#1F4A3A" opacity="0.9" />
                        <text x="520" y="145" textAnchor="middle" fill="#FFFFFF" fontFamily="'IBM Plex Mono', monospace" fontSize="12" fontWeight="700">SERVICE BAR / FLUTED COUNTER</text>
                        {/* Seating Table Clusters */}
                        <circle cx="440" cy="280" r="22" fill="none" stroke="#1B1B17" strokeWidth="2" />
                        <circle cx="520" cy="280" r="22" fill="none" stroke="#1B1B17" strokeWidth="2" />
                        <circle cx="600" cy="280" r="22" fill="none" stroke="#1B1B17" strokeWidth="2" />
                        {/* Customer Journey Vector (Dashed Path) */}
                        <path d="M 100 360 C 220 360, 320 280, 420 200 S 540 180, 440 140" fill="none" stroke="#B5432E" strokeWidth="3.5" strokeDasharray="6 6" />
                        {/* Dimension & Callout Text */}
                        <text x="95" y="45" fill="#1B1B17" fontFamily="'IBM Plex Mono', monospace" fontSize="11" fontWeight="700">ZONE A · ENTRANCE THRESHOLD</text>
                        <text x="400" y="95" fill="#1B1B17" fontFamily="'IBM Plex Mono', monospace" fontSize="11" fontWeight="700">ZONE B · ARTISANAL ORDER STATION</text>
                        <text x="440" y="340" fill="#1B1B17" fontFamily="'IBM Plex Mono', monospace" fontSize="11" fontWeight="700">ZONE C · CASUAL SEATING & LINGER AREA</text>
                        <text x="400" y="455" textAnchor="middle" fill="#1B1B17" fontFamily="'IBM Plex Mono', monospace" fontSize="13" fontWeight="700">← 12,400 mm CLEAR SPAN →</text>
                      </svg>
                    </div>
                  ) : (
                    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '380px' }}>
                      <img
                        src={stages[activeStage].image}
                        alt={stages[activeStage].title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '380px' }}
                      />
                    </div>
                  )}

                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '12px',
                    background: 'rgba(237, 233, 227, 0.95)',
                    border: '1px solid var(--ink)',
                    padding: '8px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    <span className="mono" style={{ fontSize: '11px', fontWeight: 'bold' }}>
                      {stages[activeStage].caption}
                    </span>
                    <span className="mono" style={{ fontSize: '10px', color: 'var(--marker)' }}>
                      [ VERIFIED DELIVERABLE SPEC ]
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ── SECTION 03: SELECTED SPATIAL ENVIRONMENTS & CASE STUDIES ── */}
        <section id="work" style={{ padding: '72px 0', borderBottom: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow mono" style={{ color: 'var(--marker)' }}>03 // SELECTED WORK</div>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(30px, 4.8vw, 56px)', margin: '10px 0 16px' }}>
                  Brand systems, built in space.
                </h2>
              </div>
              <p className="mono" style={{ fontSize: '11.5px', color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>
                Concept studies and architectural design directions. Demonstrating how identity logic extends into commercial interiors.
              </p>
            </div>

            {/* Project 01: Café & Bakery */}
            <div style={{ marginTop: '48px', borderTop: '1px solid var(--ink)', paddingTop: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', alignItems: 'stretch' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '24px'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '24px',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      position: 'relative',
                      border: '1.5px solid var(--ink)',
                      overflow: 'hidden',
                      borderRadius: '2px',
                      aspectRatio: '16/10'
                    }}>
                      <img
                        src="/images/spatial/cafe-interior.jpg"
                        alt="Café and Bakery Concept Environment"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{
                        position: 'absolute',
                        left: '12px',
                        bottom: '12px',
                        background: 'var(--card)',
                        border: '1px solid var(--ink)',
                        padding: '4px 8px',
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '10.5px'
                      }}>
                        CONCEPT STUDY 01 // CAFÉ & BAKERY
                      </span>
                    </div>

                    <div style={{
                      background: 'var(--card)',
                      border: '1.5px solid var(--ink)',
                      padding: '28px',
                      position: 'relative'
                    }}>
                      <span className="badge" style={{ background: 'var(--marker)', color: '#FFFFFF', border: 'none', marginBottom: '12px', display: 'inline-block' }}>
                        HOSPITALITY CONCEPT
                      </span>
                      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '28px', margin: '4px 0 14px' }}>
                        Maison Boulangerie & Espresso Bar
                      </h3>
                      <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: '20px' }}>
                        A complete neighbourhood hospitality study. The warm terracotta and pine green tones of the brand identity extend onto fluted oak service bars, recessed ambient archways, and minimal brass wayfinding.
                      </p>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                        borderTop: '1px dashed var(--paper-line)',
                        paddingTop: '16px'
                      }}>
                        <div>
                          <span className="mono" style={{ fontSize: '10px', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Scope</span>
                          <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '2px' }}>Identity, Materials, Signage</div>
                        </div>
                        <div>
                          <span className="mono" style={{ fontSize: '10px', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Scale</span>
                          <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '2px' }}>1,850 sq. ft. Commercial</div>
                        </div>
                        <div>
                          <span className="mono" style={{ fontSize: '10px', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Challenge</span>
                          <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '2px' }}>Street-level recognition & queue flow</div>
                        </div>
                        <div>
                          <span className="mono" style={{ fontSize: '10px', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Materials</span>
                          <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '2px' }}>Fluted Oak, Travertine, Brass</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 02: Full-Bleed Environment with Callout Annotations */}
            <div style={{ marginTop: '56px', borderTop: '1px solid var(--ink)', paddingTop: '32px' }}>
              <div style={{ position: 'relative', border: '1.5px solid var(--ink)', overflow: 'hidden', minHeight: '380px' }}>
                <img
                  src="/images/spatial/restaurant-interior.jpg"
                  alt="Full-Bleed Commercial Dining Environment"
                  style={{ width: '100%', height: '100%', maxHeight: '560px', objectFit: 'cover', display: 'block' }}
                />

                {/* Callout Overlay Badges */}
                <div style={{
                  position: 'absolute',
                  top: '28%',
                  left: '15%',
                  background: 'rgba(237, 233, 227, 0.95)',
                  border: '1px solid var(--ink)',
                  padding: '4px 10px',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 600
                }}>
                  [A] Architectural Cove Lighting & Sconce Integration
                </div>

                <div style={{
                  position: 'absolute',
                  top: '55%',
                  left: '60%',
                  background: 'rgba(237, 233, 227, 0.95)',
                  border: '1px solid var(--ink)',
                  padding: '4px 10px',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 600
                }}>
                  [B] Fluted Timber Slat Acoustical Partitions
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '24px',
                  right: '24px',
                  background: 'var(--card)',
                  border: '1.5px solid var(--ink)',
                  padding: '20px 24px',
                  maxWidth: '360px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
                }}>
                  <div className="mono" style={{ fontSize: '10px', color: 'var(--marker)', textTransform: 'uppercase' }}>
                    03 // FULL-BLEED INTERIOR STUDY
                  </div>
                  <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', margin: '6px 0 8px' }}>
                    Dining Room Atmosphere & Acoustics
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.5, margin: 0 }}>
                    Zoned lighting, curved upholstered booths, and rhythmic slatted timber walls designed to balance intimacy and commercial table turnover.
                  </p>
                </div>
              </div>
            </div>

            {/* Project 04: Split Study (04a Identity vs 04b Spatial Execution) */}
            <div style={{ marginTop: '56px', borderTop: '1px solid var(--ink)', paddingTop: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div>
                  <div style={{ border: '1.5px solid var(--ink)', overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
                    <img
                      src="/images/spatial/brand-identity-stationery.jpg"
                      alt="Brand Identity System Stationery"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{ position: 'absolute', left: '12px', bottom: '12px', background: 'var(--card)', border: '1px solid var(--ink)', padding: '4px 8px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px' }}>
                      04A // IDENTITY ROOT: TYPOGRAPHY, PACKAGING & MENU
                    </span>
                  </div>
                  <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', marginTop: '12px' }}>The Master Identity Blueprint</h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                    The 2D visual rules: layout hierarchy, serif type scales, and graphic emblems that set the DNA for spatial translation.
                  </p>
                </div>

                <div>
                  <div style={{ border: '1.5px solid var(--ink)', overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
                    <img
                      src="/images/spatial/material-language-board.jpg"
                      alt="Spatial Material Language Moodboard"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{ position: 'absolute', left: '12px', bottom: '12px', background: 'var(--card)', border: '1px solid var(--ink)', padding: '4px 8px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px' }}>
                      04B // SPATIAL EXPRESSION: TACTILE FINISH SPECIFICATIONS
                    </span>
                  </div>
                  <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', marginTop: '12px' }}>The Material Translation</h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                    Translating visual authority into natural travertine, ribbed timber, chevron fabrics, and custom metal fixtures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ── SECTION 04: THE BRAND EXPERIENCE SYSTEM (6-CARD SYSTEM) ── */}
        <section style={{ padding: '72px 0', borderBottom: '1px solid var(--ink)', background: 'var(--card)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow mono" style={{ color: 'var(--marker)' }}>04 // THE BRAND EXPERIENCE SYSTEM</div>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(30px, 4.8vw, 56px)', margin: '10px 0 16px' }}>
                  One identity. Every dimension.
                </h2>
              </div>
              <p style={{ maxWidth: '44ch' }}>
                We structure physical touchpoints under an engineered systemic model — ensuring seamless continuity from screen to shelf to space.
              </p>
            </div>

            <div className="sys-grid">
              <div className="sys-card">
                <span className="n">01 / SYSTEM</span>
                <div>
                  <h3>Brand Identity</h3>
                  <p>The foundational design grammar and positioning narrative that every physical fixture and architectural decision inherits.</p>
                </div>
              </div>

              <div className="sys-card">
                <span className="n">02 / SYSTEM</span>
                <div>
                  <h3>Spatial Branding</h3>
                  <p>Translating brand values into tactile rooms, intuitive pathways, signature thresholds, and memorable interior moments.</p>
                </div>
              </div>

              <div className="sys-card">
                <span className="n">03 / SYSTEM</span>
                <div>
                  <h3>Environmental Graphics</h3>
                  <p>Architectural signage, illuminated wayfinding, branded wall treatments, custom pattern tilework, and exterior facades.</p>
                </div>
              </div>

              <div className="sys-card">
                <span className="n">04 / SYSTEM</span>
                <div>
                  <h3>Commercial Space Concepts</h3>
                  <p>Zoning plans, sightline optimization, customer flow layouts, and custom counter/fixture geometry for commercial environments.</p>
                </div>
              </div>

              <div className="sys-card">
                <span className="n">05 / SYSTEM</span>
                <div>
                  <h3>Material & Finish Language</h3>
                  <p>Surfaces, timber species, metal patinas, and textiles selected directly from brand color palettes, not generic catalogues.</p>
                </div>
              </div>

              <div className="sys-card">
                <span className="n">06 / SYSTEM</span>
                <div>
                  <h3>Full Sensory Touchpoints</h3>
                  <p>Tabletop collateral, uniforms, custom packaging unboxing, acoustic consideration, and cohesive branded hospitality details.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ── SECTION 05: SPATIAL ANATOMY (INTERACTIVE PINPOINT ROOM) ── */}
        <section style={{ padding: '72px 0', borderBottom: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow mono" style={{ color: 'var(--marker)' }}>05 // INSIDE THE ENVIRONMENT</div>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(30px, 4.8vw, 56px)', margin: '10px 0 16px' }}>
                  Six decisions, one room.
                </h2>
              </div>
              <p style={{ maxWidth: '44ch' }}>
                Click any numbered pin or list item below to inspect how individual architectural details work together to create brand authority.
              </p>
            </div>

            <div className="anatomy-container">
              {/* Sticky Architectural Visual with Interactive Glowing Pins */}
              <div className="anatomy-sticky-visual">
                <div className="anatomy-fig">
                  <img
                    src="/images/spatial/cafe-interior.jpg"
                    alt="Interactive Spatial Anatomy Concept Room"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />

                  {/* Interactive Coordinate Pins */}
                  {anatomyPoints.map((pt) => {
                    const isActive = activeAnatomyPin === pt.id;
                    return (
                      <button
                        key={pt.id}
                        type="button"
                        aria-label={`Inspect ${pt.title}`}
                        onClick={() => setActiveAnatomyPin(pt.id)}
                        className={`anatomy-pin ${isActive ? 'active' : ''}`}
                        style={{ left: pt.pin.x, top: pt.pin.y }}
                      >
                        {isActive && <span className="anatomy-pin-pulse"></span>}
                        {pt.number}
                      </button>
                    );
                  })}

                  {/* Floating Inspector Card for Active Pin */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '12px',
                    background: 'rgba(28, 29, 26, 0.95)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.2)',
                    padding: '12px 16px',
                    borderRadius: '2px',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div>
                      <div className="mono" style={{ fontSize: '10px', color: '#B5432E', letterSpacing: '0.1em' }}>
                        PIN {anatomyPoints[activeAnatomyPin].number} // {anatomyPoints[activeAnatomyPin].tag}
                      </div>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: '15px', fontWeight: 600 }}>
                        {anatomyPoints[activeAnatomyPin].title}
                      </div>
                    </div>
                    <span className="mono" style={{ fontSize: '11px', color: '#9FCBB6', whiteSpace: 'nowrap' }}>
                      [ ACTIVE FOCUS ]
                    </span>
                  </div>
                </div>
              </div>

              {/* Anatomy Detail Step Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {anatomyPoints.map((pt) => {
                  const isActive = activeAnatomyPin === pt.id;
                  return (
                    <div
                      key={pt.id}
                      onClick={() => setActiveAnatomyPin(pt.id)}
                      className={`anatomy-step-card ${isActive ? 'active' : ''}`}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span className="mono" style={{ fontSize: '12px', fontWeight: 'bold', color: isActive ? 'var(--marker)' : 'var(--ink-soft)' }}>
                          {pt.number} // {pt.subtitle}
                        </span>
                        <span className="mono" style={{ fontSize: '10px', padding: '2px 6px', background: isActive ? 'var(--marker)' : 'var(--paper-line)', color: isActive ? '#FFFFFF' : 'var(--ink)' }}>
                          {pt.tag}
                        </span>
                      </div>
                      <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', margin: '2px 0 8px', color: 'var(--ink)' }}>
                        {pt.title}
                      </h4>
                      <p style={{ fontSize: '14px', lineHeight: 1.55, color: 'var(--ink-soft)', margin: 0 }}>
                        {pt.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>


        {/* ── SECTION 06 & 07: WHAT WE DO (PRACTICE DISCIPLINES) ── */}
        <section style={{ padding: '72px 0', borderBottom: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow mono" style={{ color: 'var(--marker)' }}>06 // WHAT WE DO</div>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(30px, 4.8vw, 56px)', margin: '10px 0 16px' }}>
                  Designed beyond the surface.
                </h2>
              </div>
              <p style={{ maxWidth: '44ch' }}>
                Our complete spatial capabilities — from high-level brand strategy to detailed manufacturer fabrication handoffs.
              </p>
            </div>

            <div style={{ marginTop: '36px', borderTop: '1px solid var(--ink)' }}>
              {[
                {
                  n: '01',
                  title: 'Spatial Brand Strategy',
                  desc: 'The physical expression of your brand positioning: customer journey choreography, experience principles, and multi-location spatial guidelines.'
                },
                {
                  n: '02',
                  title: 'Environmental Branding & Graphics',
                  desc: 'Architectural signage, wayfinding totems, environmental typography, custom wall murals, branded acoustic treatments, and signature physical moments.'
                },
                {
                  n: '03',
                  title: 'Commercial Space & Interior Concepts',
                  desc: 'Concept space planning, operational zoning, material palettes, bespoke furniture and lighting concepts, and photorealistic 3D rendering. (Commercial spaces only; no residential).'
                },
                {
                  n: '04',
                  title: 'Hospitality & Retail Experiences',
                  desc: 'Brand-led spatial engineering tailored for restaurants, cafés, bakeries, boutique retail stores, wellness studios, and experiential brand showrooms.'
                },
                {
                  n: '05',
                  title: 'Signage & Wayfinding Systems',
                  desc: 'High-visibility external fascia signs, blade signs, illuminated window graphics, internal room wayfinding, and compliant ADA signage systems.'
                },
                {
                  n: '06',
                  title: 'Design Development & Execution Collaboration',
                  desc: 'Production-ready vector dielines, material specification schedules, and continuous coordination with your licensed architects, general contractors, and fabricators.'
                }
              ].map((svc, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '16px 32px',
                    padding: '28px 0',
                    borderBottom: '1px dashed var(--paper-line)',
                    alignItems: 'start'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                    <span className="mono" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'var(--marker)', lineHeight: 0.9 }}>
                      {svc.n}
                    </span>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '22px', margin: 0, color: 'var(--ink)' }}>
                      {svc.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0 }}>
                    {svc.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mono" style={{ fontSize: '11px', color: 'var(--ink-soft)', marginTop: '20px', letterSpacing: '0.04em' }}>
              * Execution support coordinates directly with your licensed architects, general contractors, and millwork fabricators.
            </div>
          </div>
        </section>


        {/* ── SECTION 08: OUR 6-STAGE SPRINT WORKFLOW ── */}
        <section style={{ padding: '72px 0', borderBottom: '1px solid var(--ink)', background: 'var(--card)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow mono" style={{ color: 'var(--marker)' }}>07 // OUR PROCESS</div>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(30px, 4.8vw, 56px)', margin: '10px 0 16px' }}>
                  Every great space begins with an idea.
                </h2>
              </div>
              <p style={{ maxWidth: '44ch' }}>
                A structured 6-phase engineering workflow that keeps your physical build on schedule and aligned with brand vision.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginTop: '40px'
            }}>
              {[
                { n: '01', title: 'Understand', time: 'WEEK 01', desc: 'Deep intake on business model, target customer profile, site dimensions, foot-traffic analysis, and functional operational constraints.' },
                { n: '02', title: 'Define', time: 'WEEK 02', desc: 'Synthesizing the core brand narrative into physical experience principles, spatial storytelling pillars, and visual moodboards.' },
                { n: '03', title: 'Conceptualise', time: 'WEEKS 03-04', desc: 'Developing zoning layouts, customer journey choreography, sightlines, entry reveals, and initial 3D volumetric massing.' },
                { n: '04', title: 'Design', time: 'WEEKS 05-06', desc: 'Refining identity graphics, custom signage typography, material palettes, finish schedules, and photorealistic 3D renders.' },
                { n: '05', title: 'Develop', time: 'WEEKS 07-08', desc: 'Producing detailed graphic dielines, material specification binders, lighting temperature specs, and fabrication handoff packages.' },
                { n: '06', title: 'Coordinate', time: 'LAUNCH PHASE', desc: 'Collaborating directly with your architects, interior designers, general contractors, and signmakers through final punch-list handover.' }
              ].map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--paper)',
                    border: '1px solid var(--ink)',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: '2px',
                    position: 'relative'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span className="mono" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--marker)' }}>
                        {p.n} // PHASE
                      </span>
                      <span className="mono" style={{ fontSize: '10.5px', padding: '2px 6px', border: '1px solid var(--ink)' }}>
                        {p.time}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '22px', margin: '0 0 10px' }}>{p.title}</h3>
                    <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.55 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── SECTION 09: THE DRAWING BOARD ECOSYSTEM ── */}
        <section style={{ padding: '60px 0', borderBottom: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="mono" style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--marker)', marginBottom: '12px' }}>
              08 // INTEGRATED STUDIO ECOSYSTEM
            </div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '28px', margin: '0 0 24px' }}>
              From initial identity to completed commercial experience.
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', borderTop: '1px solid var(--ink)', borderLeft: '1px solid var(--ink)' }}>
              {[
                { name: 'Brand Strategy', hl: false },
                { name: 'Brand Identity', hl: false },
                { name: 'Packaging Design', hl: false },
                { name: 'Website Design', hl: false },
                { name: 'Digital High-Code', hl: false },
                { name: 'Spatial Branding', hl: true },
                { name: 'Brand Environments', hl: true }
              ].map((tag, tIdx) => (
                <div
                  key={tIdx}
                  style={{
                    flex: '1 1 160px',
                    padding: '18px 16px',
                    borderRight: '1px solid var(--ink)',
                    borderBottom: '1px solid var(--ink)',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '11.5px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    background: tag.hl ? 'var(--pine)' : 'var(--card)',
                    color: tag.hl ? 'var(--paper)' : 'var(--ink)'
                  }}
                >
                  {tag.name} {tag.hl && '★'}
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── SECTION 10: COMPREHENSIVE PROJECT ENQUIRY (DARK BLUEPRINT) ── */}
        <div id="enquiry" className="spatial-enquiry-band">
          <div className="wrap">
            <div className="section-head" style={{ color: '#EDE9E3' }}>
              <div>
                <div className="mono" style={{ fontSize: '11.5px', color: '#9FCBB6', letterSpacing: '0.12em', marginBottom: '8px' }}>
                  09 // PROJECT ENQUIRY & BRIEF INTAKE
                </div>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(32px, 5.5vw, 68px)', margin: '0 0 16px', color: '#FFFFFF' }}>
                  Let’s build something<br />worth entering.
                </h2>
              </div>
              <p style={{ color: '#DAD3C2', maxWidth: '44ch' }}>
                Spatial projects are custom-scoped separately from brand identity engagements. Tell us about your brand, location, and vision.
              </p>
            </div>

            {formSubmitted ? (
              <div style={{
                background: 'rgba(36, 70, 59, 0.4)',
                border: '1.5px solid #8EC4B3',
                padding: '40px',
                marginTop: '40px',
                textAlign: 'center',
                borderRadius: '2px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', color: '#FFFFFF', marginBottom: '12px' }}>
                  Inquiry Received
                </h3>
                <p style={{ color: '#EDE9E3', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                  {formStatus}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: '#25D366', color: '#000', borderColor: '#25D366', display: 'inline-flex', alignItems: 'center' }}>
                    Chat Directly on WhatsApp <ArrowIcon size={16} strokeWidth={2.5} />
                  </a>
                  <button type="button" onClick={() => setFormSubmitted(false)} className="btn-link" style={{ color: '#FFFFFF' }}>
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="spatial-form-grid" noValidate>
                <label className="spatial-form-label">
                  <span className="field-tag">Business Name *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maison Boulangerie"
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    className="spatial-input"
                  />
                </label>

                <label className="spatial-form-label">
                  <span className="field-tag">Your Name *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="spatial-input"
                  />
                </label>

                <label className="spatial-form-label">
                  <span className="field-tag">Email Address *</span>
                  <input
                    type="email"
                    required
                    placeholder="alex@maison.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="spatial-input"
                  />
                </label>

                <label className="spatial-form-label">
                  <span className="field-tag">Phone / WhatsApp Number</span>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="spatial-input"
                  />
                </label>

                <label className="spatial-form-label">
                  <span className="field-tag">Project Location / City</span>
                  <input
                    type="text"
                    placeholder="e.g. London, UK / New York, NY / Mumbai, IN"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="spatial-input"
                  />
                </label>

                <label className="spatial-form-label">
                  <span className="field-tag">Business Category</span>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="spatial-select"
                  >
                    <option value="Restaurant / Café">Restaurant / Café</option>
                    <option value="Bakery / QSR">Bakery / Specialty QSR</option>
                    <option value="Retail / Boutique">Retail / Concept Boutique</option>
                    <option value="Beauty / Wellness">Beauty / Wellness & Spa</option>
                    <option value="Showroom">Experiential Showroom</option>
                    <option value="Multi-location">Multi-location Rollout</option>
                    <option value="Other Commercial">Other Commercial Space</option>
                  </select>
                </label>

                <label className="spatial-form-label">
                  <span className="field-tag">Space Condition</span>
                  <select
                    value={formData.spaceType}
                    onChange={(e) => setFormData({ ...formData, spaceType: e.target.value })}
                    className="spatial-select"
                  >
                    <option value="New space">New space (shell / warm box)</option>
                    <option value="Existing space renovation">Existing space renovation / refresh</option>
                    <option value="Multi-location expansion">Multi-location adaptation</option>
                  </select>
                </label>

                <label className="spatial-form-label">
                  <span className="field-tag">Approx. Area (Sq. Ft.)</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 2,200"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="spatial-input"
                  />
                </label>

                <div className="spatial-form-label full-span">
                  <span className="field-tag">Required Services (Select all that apply)</span>
                  <div className="spatial-checkbox-group">
                    {[
                      'Spatial strategy',
                      'Environmental graphics',
                      'Signage & wayfinding',
                      'Interior concept & zoning',
                      'Execution collaboration'
                    ].map((svc, idx) => {
                      const isChecked = formData.services.includes(svc);
                      return (
                        <div
                          key={idx}
                          onClick={() => handleServiceToggle(svc)}
                          className={`spatial-checkbox-item ${isChecked ? 'checked' : ''}`}
                        >
                          <span>{isChecked ? '✓' : '+'}</span>
                          {svc}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <label className="spatial-form-label">
                  <span className="field-tag">Project Stage</span>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    className="spatial-select"
                  >
                    <option value="Idea / Early planning">Idea / Early planning</option>
                    <option value="Site identified / Leased">Site identified / Leased</option>
                    <option value="Architecture underway">Architecture underway</option>
                    <option value="Under construction">Under construction</option>
                  </select>
                </label>

                <label className="spatial-form-label">
                  <span className="field-tag">Design Budget Range</span>
                  <input
                    type="text"
                    placeholder="e.g. $8,000 - $15,000 / ₹6.5L - ₹12L"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="spatial-input"
                  />
                </label>

                <label className="spatial-form-label full-span">
                  <span className="field-tag">Project Description / Brief & Target Launch</span>
                  <textarea
                    rows="4"
                    placeholder="Tell us about the space, customer experience goals, floor plans or references..."
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    className="spatial-textarea"
                  ></textarea>
                </label>

                <div className="full-span" style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
                  <button type="submit" className="btn-primary" style={{ background: 'var(--marker)', borderColor: 'var(--marker)', color: '#FFFFFF', padding: '14px 28px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center' }}>
                    Discuss a Project <ArrowIcon size={16} strokeWidth={2.5} />
                  </button>
                  {formStatus && (
                    <div className="mono" style={{ fontSize: '12px', color: '#E5A99D' }}>
                      {formStatus}
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>

        <MoreServicesSection current="spatial-branding" />

        <StickyMobileCTA
          title="Spatial & Environments"
          subtitle="From $6,500 · Commercial Scale Only"
          buttonText="Get Quote"
          link="/brand-readiness"
        />

        <Footer />
      </div>
    </>
  );
}
