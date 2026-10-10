import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import ArrowIcon from '../components/ArrowIcon';
import projectsData from '../data/projectsData.json';
import saasProjectsData from '../data/saasProjectsData.json';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { DISCUSS_URL } from '../utils/siteConfig';

export default function Work() {
  const [filter, setFilter] = useState('all');
  const pageRef = useRef(null);

  usePageAnimations(pageRef);

  const allCombinedProjects = React.useMemo(() => {
    // Map saasProjectsData to match the projectsData item schema
    const formattedSaas = saasProjectsData.map(sp => ({
      slug: sp.slug,
      title: `${sp.title} — ${sp.tag}`,
      category: 'saas',
      tag: 'SAAS BRANDING',
      description: sp.shortDescription || sp.description,
      coverImage: sp.coverImage,
      isSaas: true,
      behanceUrl: sp.behanceUrl,
      images: sp.images,
      imageCount: sp.imageCount || 1
    }));
    return [...projectsData, ...formattedSaas];
  }, []);

  const filteredProjects = allCombinedProjects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'saas') return p.category === 'saas' || (p.tag && p.tag.toUpperCase().includes('SAAS'));
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

          /* SaaS Branding Dedicated Section Styles */
          .saas-showcase-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
            width: 100%;
          }

          @media (max-width: 1024px) {
            .saas-showcase-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 24px;
            }
          }

          @media (max-width: 768px) {
            .saas-showcase-grid {
              grid-template-columns: 1fr !important;
              gap: 24px;
            }
          }

          .saas-showcase-card {
            border: 1.5px solid var(--ink);
            background: var(--card);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            border-radius: 2px;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
          }

          .saas-showcase-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 14px 30px rgba(27, 27, 23, 0.08);
          }

          .saas-card-img-wrap {
            position: relative;
            width: 100%;
            aspect-ratio: 16/10;
            background: #111;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .saas-card-img-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.45s ease;
          }

          .saas-showcase-card:hover .saas-card-img-wrap img {
            transform: scale(1.04);
          }

          .saas-spec-pill {
            position: absolute;
            top: 12px;
            right: 12px;
            background: var(--ink);
            color: var(--paper);
            font-size: 10.5px;
            padding: 3px 8px;
            font-weight: 600;
            letter-spacing: 0.05em;
            border: 1px solid rgba(255, 255, 255, 0.2);
            z-index: 2;
          }

          .saas-card-content {
            padding: 24px;
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .saas-card-tag {
            font-size: 11px;
            color: var(--pine);
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 8px;
          }

          .saas-card-title {
            font-size: 22px;
            font-family: 'Fraunces', serif;
            color: var(--ink);
            margin: 0 0 12px 0;
            line-height: 1.25;
          }

          .saas-card-desc {
            font-size: 13.5px;
            color: var(--ink-soft);
            line-height: 1.55;
            margin-bottom: 16px;
            flex: 1;
          }

          .saas-deliverables-list {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 20px;
          }

          .saas-del-tag {
            font-size: 10.5px;
            padding: 2px 7px;
            background: rgba(27, 27, 23, 0.05);
            border: 1px solid var(--paper-line);
            color: var(--ink-soft);
            border-radius: 2px;
          }

          .saas-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 14px;
            border-top: 1px dashed var(--paper-line);
            margin-top: auto;
          }

          .saas-view-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 11.5px;
            font-weight: 600;
            color: var(--marker);
            text-decoration: none;
            letter-spacing: 0.04em;
            transition: color 0.15s;
          }

          .saas-showcase-card:hover .saas-view-btn {
            color: var(--pine);
          }

          .saas-behance-link {
            font-size: 11px;
            color: var(--ink-soft);
            text-decoration: none;
            opacity: 0.7;
            transition: opacity 0.15s, color 0.15s;
          }

          .saas-behance-link:hover {
            opacity: 1;
            color: var(--ink);
          }
        `}</style>

        {/* Page Hero */}
        <section className="hero-lite">
          <div className="wrap">
            <div className="sheet-label">
              <span className="sheet-meta mono">SELECTED CASE STUDIES // PORTFOLIO ARCHIVE</span>
              <div className="rule"></div>
            </div>
            <h1>Proof over promises: <em>Selected Case Studies</em>.</h1>
            <p>Explore our recent work across brand positioning, digital platforms, Framer development, and physical packaging systems.</p>
            <p style={{ marginTop: '14px' }}>
              <Link className="btn-secondary-cta" to="/brand-readiness">
                Get Quote <ArrowIcon size={13} />
              </Link>
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
                <button className={`ftab ${filter === 'saas' ? 'on' : ''}`} onClick={() => handleFilter('saas')}>[ SAAS BRANDING ]</button>
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
              {filteredProjects.map((project, idx) => {
                const targetLink = project.isSaas ? '/saas-branding' : `/work/${project.slug}`;
                return (
                  <Link
                    key={project.slug || idx}
                    to={targetLink}
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
                      <ArrowIcon size={14} />
                    </div>
                  </div>
                </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            DEDICATED SECTION: SAAS BRANDING (18 OBRAZUR CASE STUDIES)
           ════════════════════════════════════════════════════════════════ */}
        <section id="saas-branding" style={{ background: 'var(--paper)', borderTop: '2px solid var(--ink)', padding: '90px 0' }}>
          <div className="wrap">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '44px', borderBottom: '1px dashed var(--paper-line)', paddingBottom: '24px' }}>
              <div>
                <div className="mono" style={{ fontSize: '12px', color: 'var(--marker)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                  FEATURED DISCIPLINE // SOFTWARE &amp; CLOUD ARCHITECTURES
                </div>
                <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 54px)', lineHeight: 1.1, margin: 0, fontFamily: "'Fraunces', serif" }}>
                  SaaS Branding
                </h2>
              </div>
              <div style={{ maxWidth: '520px' }}>
                <p style={{ color: 'var(--ink-soft)', fontSize: '15px', lineHeight: 1.6, margin: '0 0 12px 0' }}>
                  A curated suite of 18 high-performance software brand architectures sourced from the Obrazur design studio portfolio. Precision identity engineering built for AI generative models, cloud infrastructure, developer tools, and enterprise workflows.
                </p>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Link to="/saas-branding" className="mono" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pine)', textDecoration: 'underline' }}>
                    EXPLORE FULL SAAS METHODOLOGY ↗
                  </Link>
                  <span className="mono" style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>
                    [ 18 PRODUCTION DESIGNS ]
                  </span>
                </div>
              </div>
            </div>

            {/* 18 SaaS Branding Designs Showcase */}
            <div className="saas-showcase-grid">
              {saasProjectsData.map((project, idx) => (
                <div key={project.slug || idx} className="saas-showcase-card">
                  <div className="saas-card-img-wrap">
                    <img
                      src={project.coverImage}
                      alt={`${project.title} - ${project.shortDescription}`}
                      loading="lazy"
                    />
                    <span className="saas-spec-pill mono">
                      SPEC {String(idx + 1).padStart(2, '0')} // {project.year}
                    </span>
                  </div>
                  <div className="saas-card-content">
                    <div className="saas-card-tag mono">
                      {project.tag}
                    </div>
                    <h3 className="saas-card-title">
                      {project.title}
                    </h3>
                    <p className="saas-card-desc">
                      {project.description}
                    </p>

                    {project.deliverables && (
                      <div className="saas-deliverables-list">
                        {project.deliverables.map((del, dIdx) => (
                          <span key={dIdx} className="saas-del-tag mono">{del}</span>
                        ))}
                      </div>
                    )}

                    <div className="saas-card-footer">
                      <Link to={`/work/saas-${project.slug}`} className="saas-view-btn mono">
                        <span>EXPLORE CASE SPEC</span>
                        <ArrowIcon size={13} />
                      </Link>
                      {project.behanceUrl && (
                        <a
                          href={project.behanceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="saas-behance-link mono"
                          title="Verified Behance project source"
                        >
                          BEHANCE ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
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
            <a href={DISCUSS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Start Your Case Study <ArrowIcon /></a>
          </div>
        </section>

        <StickyMobileCTA title="Work Archive" subtitle={`${projectsData.length} Selected Projects`} buttonText="WhatsApp Us" link="https://wa.me/919428859768?text=Hello%20The%20Drawing%20Board%2C%20I%20am%20interested%20in%20discussing%20a%20project!" />
        <Footer />
      </div>
    </>
  );
}
