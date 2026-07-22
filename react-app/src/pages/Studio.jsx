import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';

export default function Studio() {
  return (
    <>
      <RegistrationMarks />
      <Navbar />

      {/* Hero Section */}
      <section className="hero-lite">
        <div className="wrap">
          <div className="sheet-label">
            <span className="tag">SHEET 05 // STUDIO MANIFESTO</span>
            <div className="rule"></div>
          </div>
          <h1>Built on architectural discipline, <em>pure typography</em> & clean code.</h1>
          <p>The Drawing Board is an independent design engineering studio based in New York. We partner with ambitious founders to build enduring visual identity systems and high-conversion digital experiences.</p>

          {/* Stat Strip */}
          <div className="stat-strip">
            <div className="stat">
              <div className="num">2021</div>
              <div className="lbl">Year Founded</div>
            </div>
            <div className="stat">
              <div className="num">120+</div>
              <div className="lbl">Global Brand Launches</div>
            </div>
            <div className="stat">
              <div className="num">14</div>
              <div className="lbl">Design & Craft Awards</div>
            </div>
            <div className="stat">
              <div className="num">100%</div>
              <div className="lbl">Independent & Senior-Led</div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Philosophy / Manifesto */}
      <section className="problem">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">OUR PHILOSOPHY</div>
              <h2>The 4 Laws of Design Engineering.</h2>
            </div>
            <p>Principles that guide every pixel, line of code, and packaging dieline we create.</p>
          </div>

          <div className="problem-grid">
            <div className="problem-copy">
              <p><strong>1. Clarity over Noise:</strong> True luxury is subtraction. We eliminate extraneous elements until only pure typographic hierarchy and purpose remain.</p>
              <p><strong>2. Craft is Strategy:</strong> How a brand feels to touch, how fast a site loads, and how crisp a logo scales directly dictates customer willingness to pay.</p>
              <p><strong>3. Fixed Timelines, Zero Drag:</strong> Great design happens in tight, intense sprints. We work on strict milestones with zero agency bureaucracy.</p>
              <p><strong>4. End-to-End Ownership:</strong> We bridge the gap between creative visual direction and production code engineering.</p>
            </div>

            <div className="insight-card">
              <div className="lbl">// FOUNDER STATEMENT</div>
              <p>"We built The Drawing Board to give ambitious teams the craftsmanship of a high-end design atelier paired with the speed and technical rigor of a modern software studio."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Senior Team */}
      <section>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">SENIOR LEADERSHIP</div>
              <h2>Senior-only execution. No junior hand-offs.</h2>
            </div>
            <p>Your project is directly led and executed by experienced studio partners.</p>
          </div>

          <div className="team-grid">
            <div className="team-card">
              <div className="role">// CREATIVE DIRECTOR</div>
              <h4>Marcus Vance</h4>
              <p>12+ years leading brand identity and editorial packaging systems for global luxury labels and venture-backed startups.</p>
            </div>

            <div className="team-card">
              <div className="role">// HEAD OF DIGITAL CODE</div>
              <h4>Elena Rostova</h4>
              <p>Specialist in WebGL, Framer design systems, high-speed frontend architecture, and interactive web motion.</p>
            </div>

            <div className="team-card">
              <div className="role">// STRATEGY & PACKAGING</div>
              <h4>David K. Chen</h4>
              <p>Expert in physical structural packaging, dielines, sustainable materials, and supply chain pre-press execution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Roster */}
      <section style={{ background: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">SELECTED CLIENT ROSTER</div>
              <h2>Brands that trust our studio architecture.</h2>
            </div>
            <p>Partnering with seed-stage innovators through established global industry leaders.</p>
          </div>

          <div className="roster-grid">
            <div className="roster-item">AFTER8®</div>
            <div className="roster-item">Lumen & Co.</div>
            <div className="roster-item">Verve Audio</div>
            <div className="roster-item">Kroma Coffee</div>
            <div className="roster-item">Aether Capital</div>
            <div className="roster-item">Nectar Spirits</div>
            <div className="roster-item">Solstice Labs</div>
            <div className="roster-item">Oasis Health</div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="final">
        <div className="wrap">
          <h2>Want to partner with our studio?</h2>
          <p>Tell us about your brand vision, requirements, and target launch window.</p>
          <Link to="/contact" className="btn-primary">Initiate Studio Project &rarr;</Link>
        </div>
      </section>

      <StickyMobileCTA title="Studio Overview" subtitle="Senior-Led Execution" buttonText="Get Started →" />
      <Footer />
    </>
  );
}
