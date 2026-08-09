import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import MoreServicesSection from '../components/MoreServicesSection';
import ArrowIcon from '../components/ArrowIcon';

import servicesData from '../data/servicesData.json';
import { usePageAnimations } from '../hooks/usePageAnimations';

export default function Services() {
  const pageRef = useRef(null);
  const carouselRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [currency, setCurrency] = useState('USD');

  usePageAnimations(pageRef);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const firstChild = container.firstElementChild;
    const cardWidth = firstChild ? firstChild.getBoundingClientRect().width + 24 : 360;
    container.scrollBy({
      left: direction === 'next' ? cardWidth : -cardWidth,
      behavior: 'smooth'
    });
  };

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const firstChild = container.firstElementChild;
    const cardWidth = firstChild ? firstChild.getBoundingClientRect().width + 24 : 360;
    const index = Math.round(container.scrollLeft / cardWidth);
    setActiveCardIndex(Math.min(Math.max(0, index), servicesData.length - 1));
  };


  return (
    <>
      <div ref={pageRef}>
        <RegistrationMarks />
        <Navbar />

        <style>{`
          /* Precision Alignments for Engagement Pricing Card */
          .engagement-specs-card {
            background: var(--card);
            border: 1px solid var(--ink);
            padding: 26px;
            position: relative;
          }
          .engagement-specs-card .corner {
            position: absolute;
            top: -1px;
            right: -1px;
            width: 26px;
            height: 26px;
            background: var(--marker);
            clip-path: polygon(0 0, 100% 0, 100% 100%);
          }
          .engagement-specs-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px dashed var(--paper-line);
            padding: 12px 0;
            gap: 16px;
            transition: background 0.15s ease;
          }
          .engagement-specs-row:last-of-type {
            border-bottom: none;
          }
          .engagement-specs-title {
            flex: 1;
            min-width: 0;
            font-size: 13.5px;
            font-weight: 500;
            color: var(--ink);
            text-decoration: none;
            display: block;
            line-height: 1.4;
            transition: color 0.15s ease;
          }
          .engagement-specs-title:hover {
            color: var(--pine);
          }
          .engagement-specs-price {
            width: 145px;
            min-width: 145px;
            flex-shrink: 0;
            text-align: right;
            font-family: 'IBM Plex Mono', monospace;
            font-variant-numeric: tabular-nums;
            font-weight: 700;
            font-size: 12.5px;
            color: var(--ink);
            white-space: nowrap;
          }
          @media (max-width: 768px) {
            .engagement-specs-card {
              padding: 20px 16px;
            }
            .engagement-specs-row {
              padding: 10px 0;
              gap: 10px;
            }
            .engagement-specs-title {
              font-size: 12.5px;
            }
            .engagement-specs-price {
              width: 120px;
              min-width: 120px;
              font-size: 11.5px;
            }
          }
        `}</style>

        {/* Hero Section */}
        <section className="hero-lite">
          <div className="wrap">
            <div className="sheet-label">
              <span className="tag">SHEET 02 // SERVICES & SCOPE</span>
              <div className="rule"></div>
            </div>
            <h1>Specialized design engineering for <em>ambitious brands</em>.</h1>
            <p>
              We eliminate agency bloat and deliver high-impact branding, custom websites, physical packaging, photography, and high-code digital systems under predictable fixed pricing.
            </p>

            <div className="hero-grid" style={{ marginTop: '40px' }}>
              <div className="cta-row">
                <Link to="/contact" className="btn-primary">
                  Request Proposal <ArrowIcon />
                </Link>
                <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer" className="btn-link">
                  Schedule Discovery Call <ArrowIcon size={13} />
                </a>
              </div>

              {/* Engagement Specs Pricing Card with rock-solid tabular alignment */}
              <div className="engagement-specs-card">
                <div className="corner"></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                  <div className="annot-title" style={{ margin: 0 }}>ENGAGEMENT SPECS</div>
                  
                  {/* Currency Toggle Switch (USD default on Left, INR on Right) */}
                  <div style={{ display: 'inline-flex', padding: '2px', background: 'var(--paper)', border: '1px solid var(--ink)', borderRadius: '2px', gap: '2px' }}>
                    <button
                      type="button"
                      onClick={() => setCurrency('USD')}
                      style={{
                        background: currency === 'USD' ? 'var(--ink)' : 'transparent',
                        color: currency === 'USD' ? 'var(--paper)' : 'var(--ink-soft)',
                        border: 'none',
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '9.5px',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        padding: '3px 9px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        borderRadius: '1px'
                      }}
                    >$ USD</button>
                    <button
                      type="button"
                      onClick={() => setCurrency('INR')}
                      style={{
                        background: currency === 'INR' ? 'var(--ink)' : 'transparent',
                        color: currency === 'INR' ? 'var(--paper)' : 'var(--ink-soft)',
                        border: 'none',
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '9.5px',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        padding: '3px 9px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        borderRadius: '1px'
                      }}
                    >₹ INR</button>
                  </div>
                </div>

                {/* Service Rows with Guaranteed Tabular Non-Jumping Alignment */}
                {servicesData.map((s) => (
                  <div className="engagement-specs-row" key={s.id}>
                    <Link to={`/services/${s.slug}`} className="engagement-specs-title">
                      {s.title}
                    </Link>
                    <div className="engagement-specs-price">
                      From {currency === 'USD' ? s.startingPrice : s.startingPriceINR}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Video & Motion Showcase */}
        <section style={{ padding: '40px 0', background: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: '24px' }}>
              <div>
                <div className="eyebrow">DIGITAL MOTION & CRAFT</div>
                <h2>High-performance engineering in action.</h2>
              </div>
              <p>Combining visual art direction with ultra-responsive frontend execution.</p>
            </div>
            <div className="hero-visual has-img" style={{ height: '420px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--ink)' }}>
              <video
                src="/_assets/assets/GmWiQg0MZIvFU3cvgIL12lysLK0.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        {/* Problem Block / Principle */}
        <section className="problem">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">THE CORE CHALLENGE</div>
                <h2>Generic design costs more than premium positioning.</h2>
              </div>
              <p>Why conventional agencies fail modern founders.</p>
            </div>

            <div className="problem-grid">
              <div className="problem-copy">
                <p>
                  <strong>Most design agencies operate on bloated hourly models</strong> that incentivize drag, endless revisions, and vague deliverables. Brands end up with template design that blends into the noise.
                </p>
                <p>
                  At <strong>The Drawing Board</strong>, we operate as an elite engineering studio. We build distinct visual identities, bespoke digital systems, physical packaging, and tactile visual assets that convert curiosity into market equity.
                </p>
              </div>

              <div className="insight-card">
                <div className="lbl">// STUDIO PRINCIPLE</div>
                <p>"Design is not cosmetic decoration. It is the visual architecture of authority, trust, and perceived market value."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Services Catalog Carousel — Smooth Horizontal Scroll */}
        <section>
          <div className="wrap">
            <div className="section-head" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', marginBottom: '28px' }}>
              <div>
                <div className="eyebrow">PRACTICE AREAS & SUBPAGES</div>
                <h2>Five specialized studio disciplines.</h2>
                <p style={{ marginTop: '8px' }}>Click any service to view its detailed subpage, pricing models, and complete deliverables breakdown.</p>
              </div>

              {/* Controls Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                <div className="mono" style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--ink-soft)', letterSpacing: '0.08em' }}>
                  [ 0{activeCardIndex + 1} / 0{servicesData.length} ]
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => scrollCarousel('prev')}
                    disabled={activeCardIndex === 0}
                    aria-label="Previous Service"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '4px',
                      border: '1px solid var(--ink)',
                      background: activeCardIndex === 0 ? 'rgba(27,27,23,0.05)' : 'var(--card)',
                      color: activeCardIndex === 0 ? 'var(--ink-soft)' : 'var(--ink)',
                      opacity: activeCardIndex === 0 ? 0.4 : 1,
                      cursor: activeCardIndex === 0 ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      fontSize: '16px'
                    }}
                  >
                    ←
                  </button>
                  <button
                    onClick={() => scrollCarousel('next')}
                    disabled={activeCardIndex === servicesData.length - 1}
                    aria-label="Next Service"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '4px',
                      border: '1px solid var(--ink)',
                      background: activeCardIndex === servicesData.length - 1 ? 'rgba(27,27,23,0.05)' : 'var(--pine)',
                      color: activeCardIndex === servicesData.length - 1 ? 'var(--ink-soft)' : 'var(--paper)',
                      opacity: activeCardIndex === servicesData.length - 1 ? 0.4 : 1,
                      cursor: activeCardIndex === servicesData.length - 1 ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      fontSize: '16px'
                    }}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Smooth Horizontal Carousel Track */}
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className="services-catalog-carousel"
              style={{
                display: 'flex',
                gap: '24px',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                padding: '8px 4px 20px 4px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                willChange: 'transform',
                contain: 'layout style paint'
              }}
            >
              {servicesData.map((s) => {
                const shortName =
                  s.id === 'branding'
                    ? 'Branding'
                    : s.id === 'design'
                    ? 'UI/UX'
                    : s.id === 'development'
                    ? 'Web & Dev'
                    : s.id === 'packaging-design'
                    ? 'Packaging'
                    : 'Photography';

                return (
                  <div
                    key={s.id}
                    className="deliv-col service-card-featured"
                    style={{
                      flex: '0 0 clamp(300px, 82vw, 380px)',
                      scrollSnapAlign: 'start',
                      background: 'var(--card)',
                      border: '1px solid var(--ink)',
                      padding: '28px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      borderRadius: '4px',
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                    }}
                  >
                    <div>
                      {/* Header Badges */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span className="mono" style={{ fontSize: '12.5px', fontWeight: 'bold', letterSpacing: '0.05em', color: 'var(--ink-soft)' }}>
                          {s.eyebrow}
                        </span>
                        <span className="badge" style={{ fontSize: '11px', padding: '4px 8px', border: '1px solid var(--ink)' }}>
                          From {s.startingPrice}
                        </span>
                      </div>

                      {/* Image Preview */}
                      <Link to={`/services/${s.slug}`} className="img-wrap" style={{ height: '180px', marginBottom: '18px', overflow: 'hidden', border: '1px solid var(--ink-soft)', borderRadius: '2px', background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                        <img
                          src={s.heroImage}
                          alt={s.title}
                          loading="eager"
                          decoding="async"
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </Link>

                      <h4 style={{ fontSize: '20px', margin: '4px 0 6px' }}>
                        <Link to={`/services/${s.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {s.title}
                        </Link>
                      </h4>
                      <div className="sub" style={{ margin: '0 0 14px', color: 'var(--ink-soft)', fontSize: '12.5px' }}>
                        // {s.tagline}
                      </div>
                      <p style={{ fontSize: '13.5px', lineHeight: 1.55, marginBottom: '18px', color: 'var(--ink)' }}>
                        {s.description}
                      </p>

                      <h5 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Key Deliverables:</h5>
                      <ul style={{ paddingLeft: '16px', fontSize: '12.5px', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: '20px' }}>
                        {s.deliverables.slice(0, 4).map((d, dIdx) => (
                          <li key={dIdx}>{d}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Navigation Buttons Row */}
                    <div style={{
                      marginTop: 'auto',
                      paddingTop: '16px',
                      borderTop: '1px solid var(--ink-soft)',
                      display: 'flex',
                      flexWrap: 'nowrap',
                      gap: '10px',
                      alignItems: 'center'
                    }}>
                      <Link
                        to={`/services/${s.slug}`}
                        className="btn-primary"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '9px 13px',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}
                      >
                        Explore {shortName}
                        <ArrowIcon size={12} />
                      </Link>

                      <Link
                        to="/contact"
                        className="btn-secondary-card"
                        style={{ whiteSpace: 'nowrap', flexShrink: 0, padding: '9px 12px', fontSize: '12.5px' }}
                      >
                        Book Call
                        <ArrowIcon size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
              {servicesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!carouselRef.current) return;
                    const container = carouselRef.current;
                    const firstChild = container.firstElementChild;
                    const cardWidth = firstChild ? firstChild.getBoundingClientRect().width + 24 : 360;
                    container.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
                  }}
                  aria-label={`Go to service ${idx + 1}`}
                  style={{
                    width: activeCardIndex === idx ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    background: activeCardIndex === idx ? 'var(--pine)' : 'var(--paper-line)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              ))}
            </div>
          </div>
        </section>


        {/* Process Steps */}
        <section style={{ background: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">OUR METHODOLOGY</div>
                <h2>How we build from kick-off to launch.</h2>
              </div>
              <p>Predictable 4-phase engineering sprint model.</p>
            </div>

            <div className="deliv-grid">
              <div className="deliv-col">
                <h4>01. Discovery & Strategy</h4>
                <div className="sub">// WEEK 1</div>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                  Deep-dive into brand positioning, competitive matrix, visual benchmarks, and technical requirements.
                </p>
              </div>

              <div className="deliv-col">
                <h4>02. Architectural Design</h4>
                <div className="sub">// WEEKS 2-3</div>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                  Develop initial visual identities, packaging dielines, or high-fidelity Figma digital prototypes.
                </p>
              </div>

              <div className="deliv-col">
                <h4>03. Engineering & Build</h4>
                <div className="sub">// WEEKS 3-5</div>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                  Refine assets, write production-ready code, generate 3D renders, or edit high-res photo suites.
                </p>
              </div>

              <div className="deliv-col">
                <h4>04. Launch & Handoff</h4>
                <div className="sub">// WEEK 6+</div>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                  Deliver complete vector source files, launch digital platforms, or send print specs to printers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee Banner */}
        <section>
          <div className="wrap">
            <div className="guarantee">
              <div className="badge">100%<br />PROMISE</div>
              <div>
                <h3>Transparent Fixed Pricing Guarantee</h3>
                <p>
                  No unexpected bills or scope creep. We provide a single fixed-price proposal detailing all deliverables, milestone schedules, and full IP ownership transfers before work begins.
                </p>
              </div>
            </div>
          </div>
        </section>

        <MoreServicesSection current="uiux" />

        {/* Final CTA */}
        <section className="final">

          <div className="wrap">
            <h2>Ready to transform your brand architecture?</h2>
            <p>Let's map out your project deliverables, timeline, and exact scope.</p>
            <Link to="/contact" className="btn-primary">
              Inquire About Services <ArrowIcon />
            </Link>
          </div>
        </section>

        <StickyMobileCTA title="Services & Practice Areas" subtitle="5 Practice Areas Open" buttonText="WhatsApp Us" link="https://wa.me/919428859768?text=Hello%20The%20Drawing%20Board%2C%20I%20am%20interested%20in%20discussing%20a%20project!" />
        <Footer />
      </div>
    </>
  );
}

