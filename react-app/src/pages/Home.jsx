import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import projectsData from '../data/projectsData.json';

const clientLogos = [
  'https://framerusercontent.com/images/jvX90qghPHJL3qnqQdBnybbwoPI.svg',
  'https://framerusercontent.com/images/3vfrISIBFawjaqBNwju2ZP980.svg',
  'https://framerusercontent.com/images/19ZeQsDD81JOdettIHDE1ikCEs.svg',
  'https://framerusercontent.com/images/7RnVmFSILEnMJlUerrGTUeutQF4.svg',
  'https://framerusercontent.com/images/X17UeZ66G2aPi2E5oaguyUBNjH0.svg',
  'https://framerusercontent.com/images/Vqw7aWyA7x4wJiDIcXoCKAnzpA.svg',
  'https://framerusercontent.com/images/BRWURrnqB3rQuyCEvHaihG6efsI.svg'
];

export default function Home() {
  const featuredProjects = projectsData.slice(0, 6);

  return (
    <>
      <RegistrationMarks />
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="wrap">
          <div className="sheet-label">
            <span className="tag">SHEET 01 // OVERVIEW</span>
            <div className="rule"></div>
          </div>
          <h1>Strategy-First Branding For <em>Founder-Led Business</em> To Turn Ideas Into Real Brands.</h1>

          <div className="hero-grid">
            <div>
              <p className="hero-sub">
                Branding, websites, packaging, motion graphics and photography — crafted to connect, inspire, and grow your business. We turn your business into a brand that scales strategically, visually, and across every touchpoint.
              </p>
              <div className="cta-row">
                <Link to="/contact" className="btn-primary">Let’s Collaborate &rarr;</Link>
                <Link to="/work" className="btn-link">Explore Work</Link>
              </div>
              <p className="price-note">Projects start at <b>1,75,000/-</b> ($8,500) &bull; Turnaround <b>3&ndash;6 weeks</b></p>
            </div>

            {/* Annotated Metric Card */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">STUDIO PERFORMANCE SPECS</div>
              <div className="annot-row">
                <span>Brands Launched</span>
                <span>25+ Across Industries</span>
              </div>
              <div className="annot-row">
                <span>Combined Experience</span>
                <span>10+ Years Senior Craft</span>
              </div>
              <div className="annot-row">
                <span>Avg. Engagement Growth</span>
                <span>+40% Lift</span>
              </div>
              <div className="annot-row">
                <span>Primary Disciplines</span>
                <span>Brand, Web, Pack, Photo</span>
              </div>
              <div className="annot-row">
                <span>Booking Status</span>
                <span style={{ color: 'var(--pine)', fontWeight: 600 }}>Q3 Sprints Open</span>
              </div>
            </div>
          </div>

          {/* Stat Strip */}
          <div className="stat-strip">
            <div className="stat">
              <div className="num">25+</div>
              <div className="lbl">Brands Launched Across Industries</div>
            </div>
            <div className="stat">
              <div className="num">10+ Years</div>
              <div className="lbl">Combined Creative Experience</div>
            </div>
            <div className="stat">
              <div className="num">+40%</div>
              <div className="lbl">Avg. Audience Engagement Growth</div>
            </div>
            <div className="stat">
              <div className="num">100%</div>
              <div className="lbl">Fixed Scope & Delivery Promise</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Client Logos Ticker */}
      <section className="marquee-section">
        <div className="wrap">
          <div className="eyebrow" style={{ textAlign: 'center', marginBottom: '24px' }}>TRUSTED BY FORWARD-THINKING BRANDS</div>
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {clientLogos.concat(clientLogos).map((logoUrl, i) => (
                <div key={i} className="marquee-item">
                  <img src={logoUrl} alt={`Client logo ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / About Us Section with Responsive Cards Grid */}
      <section>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">ABOUT US & CORE VALUES</div>
              <h2>Strategy-Led, Design-Driven, Human-Focused.</h2>
            </div>
            <p>We turn your business into a brand that scales strategically, visually, and across every touchpoint.</p>
          </div>

          <div className="values-grid">
            {/* Visual Card 1 */}
            <div className="annot-card card-val" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="card-img-box">
                <img src="https://framerusercontent.com/images/SzRYtW3gumxhjmxmvpYLl0WYuVo.jpg" alt="Brands Launched" loading="lazy" />
              </div>
              <div style={{ padding: '24px' }}>
                <div className="eyebrow">25+ BRANDS LAUNCHED</div>
                <h4 style={{ fontSize: '20px', marginBottom: '8px' }}>Strategic Creativity</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)' }}>Every project starts with purpose — rooted in strategy and executed with clarity across all industries.</p>
              </div>
            </div>

            {/* Visual Card 2 */}
            <div className="annot-card card-val" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="card-img-box">
                <img src="https://framerusercontent.com/images/9ivjCTLXLCnuZ4dxAIE9YKA3g.jpeg" alt="Combined Experience" loading="lazy" />
              </div>
              <div style={{ padding: '24px' }}>
                <div className="eyebrow">10+ YEARS EXPERIENCE</div>
                <h4 style={{ fontSize: '20px', marginBottom: '8px' }}>End-To-End Craft</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)' }}>From concept to launch, we cover every touchpoint — brand identity, web development, packaging, and visuals.</p>
              </div>
            </div>

            {/* Visual Card 3 */}
            <div className="annot-card card-val" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="card-img-box">
                <img src="https://framerusercontent.com/images/su5cXza26dFS3mIr1IBsz28UuIY.jpg" alt="Engagement Growth" loading="lazy" />
              </div>
              <div style={{ padding: '24px' }}>
                <div className="eyebrow">+40% AVG GROWTH</div>
                <h4 style={{ fontSize: '20px', marginBottom: '8px' }}>Collaborative Process</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)' }}>We work closely with our clients, making sure ideas evolve through open dialogue and measurable audience lift.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Featured Work with Real Images */}
      <section style={{ background: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">LATEST BUILDS & CASE STUDIES</div>
              <h2>A look at the brands, websites, and visuals we’ve brought to life.</h2>
            </div>
            <Link to="/work" className="btn-link">View All {projectsData.length} Projects &rarr;</Link>
          </div>

          <div className="proof-grid">
            {featuredProjects.map((p, idx) => (
              <Link key={p.slug || idx} to={`/work/${p.slug}`} className="proof-card has-img">
                <div className="img">
                  <img src={p.coverImage} alt={p.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="proof-body">
                  <div className="tag">{p.tag}</div>
                  <h4>{p.title}</h4>
                  <p>{p.description || 'Complete brand identity, packaging design, and digital build.'}</p>
                  <span className="proof-metric">VIEW CASE STUDY ({p.imageCount} ASSETS)</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">PRACTICE AREAS</div>
              <h2>Comprehensive branding, web development & packaging design.</h2>
            </div>
            <Link to="/services" className="btn-link">All Services & Scope &rarr;</Link>
          </div>

          <div className="deliv-grid">
            <div className="deliv-col">
              <h4>Branding</h4>
              <div className="sub">// STRATEGY & IDENTITY</div>
              <ul>
                <li>Bold strategic visual identities</li>
                <li>Positioning & narrative framework</li>
                <li>Logo systems & typography</li>
                <li>Comprehensive brand guidelines</li>
              </ul>
              <Link to="/services" className="go">Explore Branding &rarr;</Link>
            </div>

            <div className="deliv-col">
              <h4>Packaging Design</h4>
              <div className="sub">// UNBOXING & PRINT</div>
              <ul>
                <li>Unboxing experience design</li>
                <li>Structural package dielines</li>
                <li>Foil stamping & embossing specs</li>
                <li>3D photorealistic renders</li>
              </ul>
              <Link to="/services" className="go">Explore Packaging &rarr;</Link>
            </div>

            <div className="deliv-col">
              <h4>UI UX & Web Dev</h4>
              <div className="sub">// HIGH-CODE & FRAMER</div>
              <ul>
                <li>Fast, responsive websites</li>
                <li>Custom Framer & Webflow builds</li>
                <li>Shopify & E-Commerce engines</li>
                <li>Sub-second speed optimization</li>
              </ul>
              <Link to="/services" className="go">Explore Web &rarr;</Link>
            </div>

            <div className="deliv-col">
              <h4>Photography & Motion</h4>
              <div className="sub">// VISUAL STORYTELLING</div>
              <ul>
                <li>Brand photography sessions</li>
                <li>3D product motion graphics</li>
                <li>Campaign & launch collateral</li>
                <li>Social media asset kits</li>
              </ul>
              <Link to="/services" className="go">Explore Visuals &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={{ background: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">OUR METHODOLOGY</div>
              <h2>From Idea to Execution, Step by Step.</h2>
            </div>
            <p>No endless meetings or bloated agency overhead. Just structured, milestone-driven progress.</p>
          </div>

          <div className="process">
            <div className="pstep">
              <div className="n">STEP 01</div>
              <h4>Discovery & Strategy</h4>
              <p>Understanding your business, target market, and strategic position to chart a clear design path.</p>
            </div>
            <div className="pstep">
              <div className="n">STEP 02</div>
              <h4>Visual Direction</h4>
              <p>Creating concept directions and visual moodboards to establish your distinct aesthetic identity.</p>
            </div>
            <div className="pstep">
              <div className="n">STEP 03</div>
              <h4>Design & Code Build</h4>
              <p>Crafting high-fidelity UI, typography, packaging dielines, and clean code builds.</p>
            </div>
            <div className="pstep">
              <div className="n">STEP 04</div>
              <h4>Launch & Handoff</h4>
              <p>Final domain launch, master vector file export, print vendor handoff, and team training.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="final">
        <div className="wrap">
          <h2>Ready to turn your business into a real brand?</h2>
          <p>Schedule a discovery call or send your project inquiry to start your engagement.</p>
          <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer" className="btn-primary">Book 15-Min Call on Cal.com &rarr;</a>
        </div>
      </section>

      <StickyMobileCTA title="The Drawing Board" subtitle="Projects start at 1,75,000/-" buttonText="Let's Collaborate →" link="https://cal.com/dandelion-nrvrze" />
      <Footer />
    </>
  );
}
