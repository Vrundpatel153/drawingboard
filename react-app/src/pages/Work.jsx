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
import ProjectAssetModal from '../components/ProjectAssetModal';


export default function Work() {
  const [filter, setFilter] = useState('all');
  const [modalProject, setModalProject] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);
  const pageRef = useRef(null);

  const openAssetModal = (proj, idx = 0) => {
    setModalProject(proj);
    setModalIndex(idx);
  };

  usePageAnimations(pageRef);

  const allCombinedProjects = React.useMemo(() => {
    // Exclude saas-* items from projectsData to avoid duplicate cards, then map saasProjectsData cleanly
    const baseProjects = projectsData.filter(p => !p.slug || !p.slug.startsWith('saas-'));
    const formattedSaas = saasProjectsData.map(sp => ({
      slug: `saas-${sp.slug}`,
      title: `${sp.title} — ${sp.tag}`,
      category: 'saas',
      tag: 'SAAS BRANDING',
      description: sp.shortDescription || sp.description,
      coverImage: sp.coverImage,
      isSaas: true,
      images: sp.images,
      imageCount: sp.imageCount || 1
    }));
    return [...baseProjects, ...formattedSaas];
  }, []);

  const filteredProjects = allCombinedProjects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'saas') return p.category === 'saas' || (p.tag && p.tag.toUpperCase().includes('SAAS'));
    if (filter === 'branding') return p.category === 'branding' || (p.tag && p.tag.includes('BRANDING')) || (p.slug || '').includes('yaad');
    if (filter === 'food') return p.category === 'food' || (p.tag && (p.tag.includes('FOOD') || p.tag.includes('BEVERAGE') || p.tag.includes('RESTAURANT') || p.tag.includes('CAFE'))) || ['pronto', 'matcha', 'murami', 'soul-brew', 'coastal-buns'].some(s => (p.slug || '').includes(s));
    if (filter === 'skincare') return p.category === 'skincare' || p.category === 'skin care' || (p.tag && (p.tag.includes('SKIN') || p.tag.includes('NAIL') || p.tag.includes('BEAUTY') || p.tag.includes('BODY'))) || ['blank-body', 'crystal-nail-care-brand', 'rest-religion', 'barely', 'sage', 'iva'].some(s => (p.slug || '').includes(s));
    if (filter === 'wellness') return p.category === 'wellness' || p.category === 'health' || (p.tag && (p.tag.includes('HEALTH') || p.tag.includes('WELLNESS') || p.tag.includes('TELEHEALTH'))) || ['brave-rx', 'yaad'].some(s => (p.slug || '').includes(s));
    if (filter === 'packaging') return p.category === 'packaging' || (p.tag && p.tag.includes('PACKAGING')) || ['crystal-nail-care-brand', 'blank-body', 'rest-religion', 'yaad', 'barely', 'sage', 'iva', 'coastal-buns'].some(s => (p.slug || '').includes(s));
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
                <button className={`ftab ${filter === 'skincare' ? 'on' : ''}`} onClick={() => handleFilter('skincare')}>[ SKIN CARE ]</button>
                <button className={`ftab ${filter === 'wellness' ? 'on' : ''}`} onClick={() => handleFilter('wellness')}>[ HEALTH &amp; WELLNESS ]</button>
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
                const targetLink = `/work/${project.slug}`;
                return (
                  <Link
                    key={project.slug || idx}
                    to={targetLink}
                    className="work-case-card"
                  >
                    <div className="img-box" style={{ position: 'relative' }}>
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        loading="lazy"
                      />
                      {(project.images?.length > 1 || project.imageCount > 1) && (
                        <span
                          className="mono"
                          style={{
                            position: 'absolute',
                            bottom: '8px',
                            left: '8px',
                            background: 'rgba(27,27,23,0.88)',
                            backdropFilter: 'blur(4px)',
                            color: '#FFF',
                            fontSize: '10px',
                            padding: '2px 7px',
                            letterSpacing: '0.04em',
                            border: '1px solid rgba(255,255,255,0.2)',
                            zIndex: 2,
                            borderRadius: '2px'
                          }}
                        >
                          {project.images?.length || project.imageCount} ASSETS
                        </span>
                      )}
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
            DEDICATED SECTION: SAAS BRANDING (19 PRODUCTION CASE STUDIES)
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
                  A curated suite of {saasProjectsData.length} high-performance software brand architectures engineered by The Drawing Board. Precision identity engineering built for AI generative models, cloud infrastructure, developer tools, predictive analytics, proprietary trading, and enterprise workflows.
                </p>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Link to="/saas-branding" className="mono" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pine)', textDecoration: 'underline' }}>
                    EXPLORE FULL SAAS METHODOLOGY ↗
                  </Link>
                  <span className="mono" style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>
                    [ {saasProjectsData.length} PRODUCTION DESIGNS ]
                  </span>
                </div>
              </div>
            </div>

            {/* 19 SaaS Branding Designs Showcase */}
            <div className="saas-showcase-grid">
              {saasProjectsData.map((project, idx) => (
                <div key={project.slug || idx} className="saas-showcase-card">
                  <div className="saas-card-img-wrap" style={{ cursor: 'pointer' }} onClick={() => openAssetModal(project, 0)}>
                    <img
                      src={project.coverImage}
                      alt={`${project.title} - ${project.shortDescription}`}
                      loading="lazy"
                    />
                    <span className="saas-spec-pill mono">
                      SPEC {String(idx + 1).padStart(2, '0')} // {project.year}
                    </span>
                    <span
                      className="mono"
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        background: 'rgba(27, 27, 23, 0.9)',
                        color: '#FFF',
                        fontSize: '10px',
                        padding: '3px 8px',
                        letterSpacing: '0.04em',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 2,
                        borderRadius: '2px'
                      }}
                    >
                      {project.images?.length || project.imageCount || 16} ASSETS ↗
                    </span>
                  </div>

                  {/* Mini Preview Strip */}
                  {project.images && project.images.length > 1 && (
                    <div style={{ display: 'flex', gap: '6px', padding: '8px 12px', background: '#141410', borderBottom: '1px solid var(--paper-line)', overflowX: 'auto' }}>
                      {project.images.slice(1, 5).map((img, tIdx) => (
                        <button
                          key={tIdx}
                          type="button"
                          onClick={() => openAssetModal(project, tIdx + 1)}
                          title={`View figure ${tIdx + 2}`}
                          aria-label={`View figure ${tIdx + 2} of ${project.title}`}
                          style={{
                            flex: '0 0 44px',
                            height: '30px',
                            border: '1px solid rgba(255,255,255,0.15)',
                            background: '#000',
                            padding: 0,
                            cursor: 'pointer',
                            overflow: 'hidden',
                            borderRadius: '2px'
                          }}
                        >
                          <img src={img} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </button>
                      ))}
                      {project.images.length > 5 && (
                        <button
                          type="button"
                          onClick={() => openAssetModal(project, 5)}
                          title={`Browse all ${project.images.length} assets`}
                          style={{
                            flex: '0 0 36px',
                            height: '30px',
                            border: '1px dashed rgba(255,255,255,0.3)',
                            background: 'rgba(255,255,255,0.05)',
                            color: '#FFF',
                            font: "600 10px 'IBM Plex Mono', monospace",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            borderRadius: '2px'
                          }}
                        >
                          +{project.images.length - 5}
                        </button>
                      )}
                    </div>
                  )}

                  <div className="saas-card-content">
                    <div className="saas-card-tag mono">
                      {project.tag}
                    </div>
                    <h3 className="saas-card-title">
                      <Link to={`/work/saas-${project.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {project.title}
                      </Link>
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
                      <button
                        type="button"
                        onClick={() => openAssetModal(project, 0)}
                        style={{
                          background: 'transparent',
                          border: '1px solid var(--ink)',
                          color: 'var(--ink)',
                          font: "600 11px 'IBM Plex Mono', monospace",
                          padding: '5px 10px',
                          cursor: 'pointer',
                          borderRadius: '2px',
                          letterSpacing: '0.04em'
                        }}
                      >
                        BROWSE {project.images?.length || 16} ASSETS
                      </button>
                      <Link to={`/work/saas-${project.slug}`} className="saas-view-btn mono">
                        <span>EXPLORE SPEC</span>
                        <ArrowIcon size={13} />
                      </Link>
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
            <Link to="/brand-readiness" className="btn-primary">Get Quote <ArrowIcon /></Link>
          </div>
        </section>

        <ProjectAssetModal
          project={modalProject}
          isOpen={!!modalProject}
          onClose={() => setModalProject(null)}
          initialIndex={modalIndex}
        />
        <StickyMobileCTA title="Work Archive" subtitle={`${projectsData.length} Selected Projects`} buttonText="WhatsApp Us" link="https://wa.me/919428859768?text=Hello%20The%20Drawing%20Board%2C%20I%20am%20interested%20in%20discussing%20a%20project!" />
        <Footer />
      </div>
    </>
  );
}
