import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import ArrowIcon from '../components/ArrowIcon';
import projectsData from '../data/projectsData.json';
import { usePageAnimations } from '../hooks/usePageAnimations';

export default function Work() {
  const [filter, setFilter] = useState('all');
  const pageRef = useRef(null);

  usePageAnimations(pageRef);

  const filteredProjects = projectsData.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'branding') return p.category === 'branding' || (p.tag && p.tag.includes('BRANDING'));
    if (filter === 'food') return p.category === 'food' || (p.tag && (p.tag.includes('FOOD') || p.tag.includes('BEVERAGE') || p.tag.includes('RESTAURANT') || p.tag.includes('CAFE'))) || ['pronto', 'matcha', 'murami', 'soul-brew'].some(s => (p.slug || '').includes(s));
    if (filter === 'packaging') return p.category === 'packaging' || (p.tag && p.tag.includes('PACKAGING'));
    if (filter === 'web') return p.category === 'web' || (p.tag && (p.tag.includes('WEB') || p.tag.includes('UI UX')));
    if (filter === 'photography') return p.category === 'photography' || (p.tag && p.tag.includes('PHOTO'));
    return true;
  });

  const handleFilter = (val) => {
    setFilter(val);
  };

  return (
    <>
      <div ref={pageRef}>
        <RegistrationMarks />
        <Navbar />

        <style>{`
          /* Work Grid Layout & Case Cards */
          .work-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
            width: 100%;
          }

          @media (max-width: 1024px) {
            .work-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 24px;
            }
          }

          @media (max-width: 768px) {
            .work-grid {
              grid-template-columns: 1fr !important;
              gap: 24px;
            }
          }

          .work-case-card {
            border: 1.5px solid var(--ink);
            background: var(--card);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            text-decoration: none;
            border-radius: 2px;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
          }

          .work-case-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 28px rgba(27, 27, 23, 0.08);
          }

          .work-case-card .img-box {
            width: 100%;
            aspect-ratio: 16/10;
            overflow: hidden;
            background: var(--card);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .work-case-card .img-box img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: transform 0.45s ease;
            display: block;
          }

          .work-case-card:hover .img-box img {
            transform: scale(1.04);
          }

          .work-card-body {
            padding: 24px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .work-card-tag {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11px;
            color: var(--pine);
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 8px;
          }

          .work-card-title {
            font-size: 22px;
            font-family: 'Fraunces', serif;
            color: var(--ink);
            margin-bottom: 10px;
            line-height: 1.25;
          }

          .work-card-desc {
            font-size: 14px;
            color: var(--ink-soft);
            line-height: 1.55;
            margin-bottom: 20px;
          }

          .work-card-link {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11.5px;
            font-weight: 600;
            color: var(--marker);
            letter-spacing: 0.04em;
            margin-top: auto;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: color 0.15s;
          }

          .work-case-card:hover .work-card-link {
            color: var(--pine);
          }
        `}</style>

        {/* Page Hero */}
        <section className="hero-lite">
          <div className="wrap">
            <div className="sheet-label">
              <span className="tag">SHEET 03 // PORTFOLIO ARCHIVE</span>
              <div className="rule"></div>
            </div>
            <h1>Proof over promises: <em>Selected Case Studies</em>.</h1>
            <p>Explore our recent work across brand positioning, digital platforms, Framer development, and physical packaging systems.</p>
            <p style={{ marginTop: '14px' }}>
              <a className="btn-link" href="https://wa.me/919428859768?text=Hello%20The%20Drawing%20Board%2C%20I%20am%20interested%20in%20discussing%20a%20project!" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14.5px', color: 'var(--pine)', fontWeight: 600 }}>
                Prefer WhatsApp for discussion →
              </a>
            </p>

            {/* Stat Strip */}
            <div className="stat-strip">
              <div className="stat">
                <div className="num">120+</div>
                <div className="lbl">Projects Completed</div>
              </div>
              <div className="stat">
                <div className="num">14 Awards</div>
                <div className="lbl">Design &amp; Craft Honors</div>
              </div>
              <div className="stat">
                <div className="num">+340%</div>
                <div className="lbl">Top Growth Spike</div>
              </div>
              <div className="stat">
                <div className="num">94%</div>
                <div className="lbl">Client Retention Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Long Grid Section */}
        <section style={{ paddingBottom: '80px' }}>
          <div className="wrap">
            {/* Top Navigation & Filters Bar */}
            <div
              style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                marginBottom: '32px',
                flexWrap: 'wrap',
                gap: '16px',
                borderBottom: '1px dashed var(--paper-line)',
                paddingBottom: '20px'
              }}
            >
              {/* Category Filter Tabs */}
              <div className="filter-tabs" style={{ margin: 0, padding: 0 }}>
                <button className={`ftab ${filter === 'all' ? 'on' : ''}`} onClick={() => handleFilter('all')}>[ ALL PROJECTS ]</button>
                <button className={`ftab ${filter === 'branding' ? 'on' : ''}`} onClick={() => handleFilter('branding')}>[ BRANDING ]</button>
                <button className={`ftab ${filter === 'food' ? 'on' : ''}`} onClick={() => handleFilter('food')}>[ FOOD ]</button>
                <button className={`ftab ${filter === 'web' ? 'on' : ''}`} onClick={() => handleFilter('web')}>[ WEB &amp; DIGITAL ]</button>
                <button className={`ftab ${filter === 'packaging' ? 'on' : ''}`} onClick={() => handleFilter('packaging')}>[ PACKAGING ]</button>
              </div>

              {/* Counter Badge */}
              <span className="mono" style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--ink-soft)', letterSpacing: '0.05em' }}>
                [ {filteredProjects.length} CASE {filteredProjects.length === 1 ? 'STUDY' : 'STUDIES'} ]
              </span>
            </div>

            {/* Long Grid Layout */}
            <div className="work-grid">
              {filteredProjects.map((project, idx) => (
                <Link
                  key={project.slug || idx}
                  to={`/work/${project.slug}`}
                  className="work-case-card"
                >
                  <div className="img-box">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="work-card-body">
                    <div>
                      <div className="work-card-tag">
                        {project.tag}
                      </div>
                      <h3 className="work-card-title">
                        {project.title}
                      </h3>
                      <p className="work-card-desc">
                        {project.description || 'Strategic brand identity, packaging design, and digital build.'}
                      </p>
                    </div>
                    <div className="work-card-link">
                      <span>{project.imageCount > 0 ? `${project.imageCount} REAL ASSETS` : 'EXPLORE CASE STUDY'}</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section style={{ background: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="guarantee">
              <div className="badge">PROVEN<br />QUALITY</div>
              <div>
                <h3>Built to Outlast Trends</h3>
                <p>We craft design solutions rooted in enduring typographic principles and clean architectural structure. No cookie-cutter templates or disposable trends.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="final">
          <div className="wrap">
            <h2>Have a project that requires precision design?</h2>
            <p>Let's discuss how we can engineer your brand for market leadership.</p>
            <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer" className="btn-primary">Start Your Case Study <ArrowIcon /></a>
          </div>
        </section>

        <StickyMobileCTA title="Work Archive" subtitle={`${projectsData.length} Selected Projects`} buttonText="WhatsApp Us" link="https://wa.me/919428859768?text=Hello%20The%20Drawing%20Board%2C%20I%20am%20interested%20in%20discussing%20a%20project!" />
        <Footer />
      </div>
    </>
  );
}
