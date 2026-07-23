import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import ArrowIcon from '../components/ArrowIcon';

export default function Services() {
  return (
    <>
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
          <p>We eliminate agency bloat and deliver high-impact branding, custom websites, and physical packaging systems under predictable fixed sprint pricing.</p>

          <div className="hero-grid" style={{ marginTop: '40px' }}>
            <div className="cta-row">
              <Link to="/contact" className="btn-primary">Request Proposal <ArrowIcon /></Link>
              <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer" className="btn-link">Schedule Discovery Call <ArrowIcon size={13} /></a>
            </div>

            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">ENGAGEMENT SPECS</div>
              <div className="annot-row">
                <span>Brand Identity Package</span>
                <span>From $8,500</span>
              </div>
              <div className="annot-row">
                <span>Web Design & Build</span>
                <span>From $12,000</span>
              </div>
              <div className="annot-row">
                <span>Packaging System</span>
                <span>From $6,500</span>
              </div>
              <div className="annot-row">
                <span>Retainer Sprints</span>
                <span>$5,000 / Mo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Block */}
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
              <p><strong>Most design agencies operate on bloated hourly models</strong> that incentivize drag, endless revisions, and vague deliverables. Brands end up with template design that blends into the noise.</p>
              <p>At <strong>The Drawing Board</strong>, we operate as an elite engineering studio. We build distinct visual identities, bespoke digital systems, and tangible unboxing experiences that convert curiosity into market equity.</p>
            </div>

            <div className="insight-card">
              <div className="lbl">// STUDIO PRINCIPLE</div>
              <p>"Design is not cosmetic decoration. It is the visual architecture of authority, trust, and perceived market value."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Breakdown */}
      <section>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">DELIVERABLE ARCHITECTURE</div>
              <h2>Four specialized practice areas.</h2>
            </div>
            <p>Every service includes complete source vector handoffs, documentation, and production files.</p>
          </div>

          <div className="deliv-grid">
            <div className="deliv-col">
              <h4>01. Brand Identity</h4>
              <div className="sub">// STRATEGY & VISUAL SYSTEM</div>
              <ul>
                <li>Market Positioning & Narrative</li>
                <li>Primary, Secondary & Mark Logos</li>
                <li>Custom Typography Curation</li>
                <li>Color Architecture & Ratios</li>
                <li>Comprehensive Brand Book (PDF)</li>
                <li>Social & Presentation Assets</li>
              </ul>
              <Link to="/contact" className="go">Book Branding <ArrowIcon size={12} /></Link>
            </div>

            <div className="deliv-col">
              <h4>02. Web & Digital</h4>
              <div className="sub">// UI/UX & HIGH-CODE BUILD</div>
              <ul>
                <li>Information Architecture</li>
                <li>High-Fidelity Wireframes</li>
                <li>Custom Responsive UI/UX</li>
                <li>Framer / Webflow Development</li>
                <li>CMS & E-Commerce Integration</li>
                <li>SEO & Speed Optimization</li>
              </ul>
              <Link to="/contact" className="go">Book Web Build <ArrowIcon size={12} /></Link>
            </div>

            <div className="deliv-col">
              <h4>03. Packaging</h4>
              <div className="sub">// UNBOXING & PRINT SPECS</div>
              <ul>
                <li>Structural Package Dielines</li>
                <li>Label & Box Artwork</li>
                <li>3D Photorealistic Renders</li>
                <li>Material & Finish Specifications</li>
                <li>Pre-Press File Handoff</li>
                <li>Manufacturer Print Coordination</li>
              </ul>
              <Link to="/contact" className="go">Book Packaging <ArrowIcon size={12} /></Link>
            </div>

            <div className="deliv-col">
              <h4>04. Monthly Sprints</h4>
              <div className="sub">// CONTINUOUS EVOLUTION</div>
              <ul>
                <li>Dedicated Senior Designer Time</li>
                <li>Campaign & Social Collateral</li>
                <li>Landing Page Iterations</li>
                <li>Conversion Rate Optimization</li>
                <li>Async Slack / Loom Support</li>
                <li>Pause or Cancel Anytime</li>
              </ul>
              <Link to="/contact" className="go">Start Sprint <ArrowIcon size={12} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Banner */}
      <section style={{ background: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
        <div className="wrap">
          <div className="guarantee">
            <div className="badge">100%<br />PROMISE</div>
            <div>
              <h3>Transparent Fixed Pricing Guarantee</h3>
              <p>No unexpected bills or scope creep. We provide a single fixed-price proposal detailing all deliverables, milestone schedules, and IP ownership transfers before work begins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="final">
        <div className="wrap">
          <h2>Ready to transform your brand architecture?</h2>
          <p>Let's map out your project deliverables, timeline, and exact scope.</p>
          <Link to="/contact" className="btn-primary">Inquire About Services <ArrowIcon /></Link>
        </div>
      </section>

      <StickyMobileCTA title="Services & Pricing" subtitle="Q3 Engagements Open" buttonText="Inquire Now" />
      <Footer />
    </>
  );
}

