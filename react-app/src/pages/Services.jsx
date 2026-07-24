import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import ArrowIcon from '../components/ArrowIcon';
import servicesData from '../data/servicesData.json';
import { usePageAnimations } from '../hooks/usePageAnimations';

export default function Services() {
  const pageRef = useRef(null);
  usePageAnimations(pageRef);

  return (
    <>
      <div ref={pageRef}>
        <RegistrationMarks />
        <Navbar />

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

              <div className="annot-card">
                <div className="corner"></div>
                <div className="annot-title">ENGAGEMENT SPECS</div>
                {servicesData.map((s) => (
                  <div className="annot-row" key={s.id}>
                    <Link to={`/services/${s.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      <span>{s.title}</span>
                    </Link>
                    <span>From {s.startingPrice}</span>
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

        {/* Detailed Services Catalog with Images, Videos, Deliverables & Subpage Redirects */}
        <section>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">PRACTICE AREAS & SUBPAGES</div>
                <h2>Five specialized studio disciplines.</h2>
              </div>
              <p>Click any service to view its detailed subpage, pricing models, and complete deliverables breakdown.</p>
            </div>

            <div className="services-catalog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
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
                      background: 'var(--card)',
                      border: '1px solid var(--ink)',
                      padding: '32px',
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between',
                      position: 'relative'
                    }}
                  >
                    <div>
                      {/* Header Badges */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span className="mono" style={{ fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.05em', color: 'var(--ink-soft)' }}>
                          {s.eyebrow}
                        </span>
                        <span className="badge" style={{ fontSize: '11px', padding: '4px 8px', border: '1px solid var(--ink)' }}>
                          From {s.startingPrice}
                        </span>
                      </div>

                      {/* Image Preview */}
                      <div className="img-wrap" style={{ height: '200px', marginBottom: '20px', overflow: 'hidden', border: '1px solid var(--ink-soft)', borderRadius: '2px' }}>
                        <img src={s.heroImage} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>

                      <h4>{s.title}</h4>
                      <div className="sub" style={{ margin: '8px 0 16px', color: 'var(--ink-soft)', fontSize: '13px' }}>
                        // {s.tagline}
                      </div>
                      <p style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '20px', color: 'var(--ink)' }}>
                        {s.description}
                      </p>

                      <h5 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>Key Deliverables:</h5>
                      <ul style={{ paddingLeft: '18px', fontSize: '13px', lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: '24px' }}>
                        {s.deliverables.slice(0, 4).map((d, dIdx) => (
                          <li key={dIdx}>{d}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Navigation Buttons Row */}
                    <div className="cta-row" style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--ink-soft)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <Link
                        to={`/services/${s.slug}`}
                        className="btn-primary"
                        style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justify: 'center',
                          padding: '11px 16px',
                          fontSize: '13.5px',
                          fontWeight: 600,
                          letterSpacing: '-0.01em',
                          borderRadius: '4px'
                        }}
                      >
                        <span>Explore {shortName} Scope</span>
                        <ArrowIcon size={14} />
                      </Link>

                      <Link to="/contact" className="btn-secondary-card">
                        <span>Book Call</span>
                        <ArrowIcon size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
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

        <StickyMobileCTA title="Services & Subpages" subtitle="5 Practice Areas Open" buttonText="Inquire Now →" />
        <Footer />
      </div>
    </>
  );
}
