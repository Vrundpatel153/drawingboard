import React, { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import ArrowIcon from '../components/ArrowIcon';
import ProjectAssetModal from '../components/ProjectAssetModal';
import { usePageAnimations } from '../hooks/usePageAnimations';
import projectsData from '../data/projectsData.json';

const CAL_URL = "https://cal.com/dandelion-nrvrze";
const WHATSAPP_URL = "https://wa.me/918401391983?text=Hi%20The%20Drawing%20Board%2C%20I%20would%20like%20to%20discuss%20a%20commercial%20spatial%20%2F%20interior%20design%20project.";

export default function SpatialWork() {
  const [filter, setFilter] = useState('all');
  const [modalProject, setModalProject] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);
  const pageRef = useRef(null);

  usePageAnimations(pageRef);

  const openAssetModal = (proj, idx = 0) => {
    setModalProject(proj);
    setModalIndex(idx);
  };

  // Dedicated Spatial & Interior Design Projects
  const spatialProjects = useMemo(() => {
    const list = projectsData.filter(p => p.category === 'spatial');
    
    // Custom order: Flagship Fine Dining -> Artisanal Bakery -> Boho -> Rustic -> Industrial
    const order = [
      'ghalia-acarverde-restaurant-spatial-design',
      'maison-cafe-bakery-spatial-design',
      'arcomi-boho-cafe-spatial-design',
      'rooted-rustic-cafe-spatial-design',
      'ouur-cafe-spatial-design'
    ];

    const sorted = [...list].sort((a, b) => {
      const idxA = order.indexOf(a.slug);
      const idxB = order.indexOf(b.slug);
      return (idxA !== -1 ? idxA : 99) - (idxB !== -1 ? idxB : 99);
    });

    return sorted;
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return spatialProjects;
    if (filter === 'dining') {
      return spatialProjects.filter(p => p.slug.includes('ghalia'));
    }
    if (filter === 'bakery') {
      return spatialProjects.filter(p => p.slug.includes('maison') || p.slug.includes('rooted'));
    }
    if (filter === 'coffee') {
      return spatialProjects.filter(p => p.slug.includes('arcomi') || p.slug.includes('ouur'));
    }
    return spatialProjects;
  }, [filter, spatialProjects]);

  return (
    <>
      <RegistrationMarks />
      <Navbar />

      <div ref={pageRef} className="spatial-work-page">
        {/* Style Overrides for Polish & Grid Consistency */}
        <style>{`
          .spatial-work-page {
            background: var(--paper);
            min-height: 100vh;
          }
          .spatial-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
            margin-top: 36px;
          }
          @media (max-width: 900px) {
            .spatial-grid {
              grid-template-columns: 1fr;
              gap: 24px;
            }
          }
          .spatial-card {
            background: var(--card);
            border: 1px solid var(--ink);
            display: flex;
            flex-direction: column;
            text-decoration: none;
            color: inherit;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            position: relative;
            overflow: hidden;
          }
          .spatial-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 14px 28px rgba(27, 27, 23, 0.08);
          }
          .spatial-card .img-box {
            position: relative;
            aspect-ratio: 16 / 10;
            overflow: hidden;
            background: #121413;
          }
          .spatial-card .img-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.5s ease;
          }
          .spatial-card:hover .img-box img {
            transform: scale(1.04);
          }
          .spatial-card-body {
            padding: 28px;
            display: flex;
            flex-direction: column;
            flex: 1;
            justify-content: space-between;
          }
          .spatial-card-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 12px;
            flex-wrap: wrap;
          }
          .spatial-badge {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--pine);
            font-weight: 600;
          }
          .spatial-scope {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 10.5px;
            color: var(--ink-soft);
            letter-spacing: 0.04em;
          }
          .spatial-card-title {
            font-family: 'Fraunces', serif;
            font-size: clamp(20px, 2vw, 24px);
            color: var(--ink);
            margin: 0 0 10px;
            line-height: 1.25;
            font-weight: 600;
          }
          .spatial-card-desc {
            font-size: 14px;
            color: var(--ink-soft);
            line-height: 1.6;
            margin: 0 0 20px;
          }
          .spatial-highlights {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 24px;
          }
          .spatial-pill {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 10.5px;
            background: rgba(27, 27, 23, 0.04);
            border: 1px dashed var(--paper-line);
            padding: 4px 10px;
            color: var(--ink);
            border-radius: 2px;
          }
          .spatial-card-foot {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 18px;
            border-top: 1px dashed var(--paper-line);
            margin-top: auto;
          }
          .spatial-action-link {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 12px;
            font-weight: 600;
            color: var(--marker);
            display: inline-flex;
            align-items: center;
            gap: 6px;
            text-decoration: none;
          }
          .spatial-quickview-btn {
            background: none;
            border: none;
            cursor: pointer;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11px;
            color: var(--ink-soft);
            text-decoration: underline;
            padding: 0;
            transition: color 0.15s;
          }
          .spatial-quickview-btn:hover {
            color: var(--pine);
          }
          .spatial-filter-bar {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 32px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--paper-line);
          }
          .spatial-filter-btn {
            background: transparent;
            border: 1px solid var(--paper-line);
            padding: 8px 16px;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11.5px;
            letter-spacing: 0.05em;
            color: var(--ink-soft);
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .spatial-filter-btn:hover {
            border-color: var(--ink);
            color: var(--ink);
          }
          .spatial-filter-btn.active {
            background: var(--ink);
            color: #FFF;
            border-color: var(--ink);
            font-weight: 600;
          }
          .spatial-stats-strip {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-top: 40px;
            padding: 24px;
            background: var(--card);
            border: 1px solid var(--ink);
          }
          @media (max-width: 768px) {
            .spatial-stats-strip {
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
            }
          }
          .spatial-stat-item .num {
            font-family: 'Fraunces', serif;
            font-size: clamp(26px, 3.2vw, 36px);
            color: var(--ink);
            font-weight: 600;
            line-height: 1;
            margin-bottom: 6px;
          }
          .spatial-stat-item .lbl {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11px;
            color: var(--ink-soft);
            text-transform: uppercase;
            letter-spacing: 0.06em;
          }
        `}</style>

        {/* ── 01. Hero Section ── */}
        <section className="hero-lite" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
          <div className="wrap">
            <div className="crumb" style={{ marginBottom: '14px', display: 'flex', alignItems: 'center' }}>
              <Link to="/" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>HOME</Link>
              <span style={{ margin: '0 8px', color: 'var(--marker)' }}>/</span>
              <span style={{ color: 'var(--ink)', fontWeight: 600 }}>SPATIAL &amp; INTERIOR WORK</span>
            </div>

            <div className="sheet-label" style={{ marginBottom: '16px' }}>
              SHEET 06 // SPATIAL &amp; INTERIOR ARCHITECTURE WORK
            </div>

            <div className="eyebrow" style={{ color: 'var(--marker)', marginBottom: '8px' }}>
              COMMERCIAL ARCHITECTURE &amp; BRAND ENVIRONMENTS
            </div>

            <h1 style={{ fontSize: 'clamp(36px, 5.2vw, 68px)', lineHeight: 1.08, margin: '0 0 20px' }}>
              Spatial &amp; Interior <em>Work.</em>
            </h1>

            <p className="hero-sub" style={{ maxWidth: '820px', fontSize: 'clamp(16px, 1.8vw, 19px)', color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 32px' }}>
              We build brands you can step into. 100+ master photorealistic 3D interior renders, material specification packages, and zoned hospitality environments — translating 2D identity into physical architecture, lighting mood, and intuitive customer circulation.
            </p>

            <div className="cta-row" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/services/spatial-branding" className="btn-primary">
                Explore Spatial Capabilities &amp; Method <ArrowIcon size={14} />
              </Link>
              <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)' }}>
                Schedule Spatial Discovery Call
              </a>
              <Link to="/work" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--marker)', textDecoration: 'none', marginLeft: 'auto' }}>
                View 2D Brand &amp; Packaging Work →
              </Link>
            </div>

            {/* Quick Metrics Strip */}
            <div className="spatial-stats-strip">
              <div className="spatial-stat-item">
                <div className="num">05</div>
                <div className="lbl">COMMERCIAL FLAGSHIPS</div>
              </div>
              <div className="spatial-stat-item">
                <div className="num">100+</div>
                <div className="lbl">3D MASTER RENDERS</div>
              </div>
              <div className="spatial-stat-item">
                <div className="num">GLOBAL</div>
                <div className="lbl">UAE · KSA · TURKEY</div>
              </div>
              <div className="spatial-stat-item">
                <div className="num">100%</div>
                <div className="lbl">CONTRACTOR HANDOFF SPECS</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02. Filter Bar & Projects Grid ── */}
        <section style={{ padding: '0 0 90px' }}>
          <div className="wrap">
            <div className="spatial-filter-bar">
              <button
                className={`spatial-filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                [ ALL SPATIAL WORK ({spatialProjects.length}) ]
              </button>
              <button
                className={`spatial-filter-btn ${filter === 'dining' ? 'active' : ''}`}
                onClick={() => setFilter('dining')}
              >
                [ FINE DINING &amp; RESTAURANTS ]
              </button>
              <button
                className={`spatial-filter-btn ${filter === 'bakery' ? 'active' : ''}`}
                onClick={() => setFilter('bakery')}
              >
                [ ARTISANAL CAFÉS &amp; BAKERIES ]
              </button>
              <button
                className={`spatial-filter-btn ${filter === 'coffee' ? 'active' : ''}`}
                onClick={() => setFilter('coffee')}
              >
                [ SPECIALTY COFFEE &amp; BARS ]
              </button>
              <span className="mono" style={{ marginLeft: 'auto', fontSize: '11.5px', color: 'var(--ink-soft)' }}>
                SHOWING {filteredProjects.length} SPATIAL CASE {filteredProjects.length === 1 ? 'STUDY' : 'STUDIES'}
              </span>
            </div>

            {/* Grid */}
            <div className="spatial-grid">
              {filteredProjects.map((project, idx) => {
                const targetLink = `/work/${project.slug}`;
                const imageCount = project.images?.length || project.imageCount || 1;

                // Project-specific highlights
                let highlights = ['Commercial Architecture', 'Material Palette', 'Lighting Design', 'Customer Journey'];
                let scopeLabel = 'Commercial Interior';
                if (project.slug.includes('ghalia')) {
                  highlights = ['Parametric Walnut Ceilings', 'Emerald Stone Bar', 'Bronze Chandeliers', 'Velvet Booths'];
                  scopeLabel = 'Fine Dining Restaurant · Istanbul';
                } else if (project.slug.includes('maison')) {
                  highlights = ['Fluted Travertine Counters', 'Pastry Vitrines', 'Terracotta Limewash', 'Arched Wall Niches'];
                  scopeLabel = 'Artisanal Bakery & Café · Dubai';
                } else if (project.slug.includes('arcomi')) {
                  highlights = ['Curved Arched Openings', 'Textured Sand Plaster', 'Woven Cane Furniture', 'Biophilic Lighting'];
                  scopeLabel = 'Boho-Mediterranean Café · Riyadh';
                } else if (project.slug.includes('rooted')) {
                  highlights = ['Layered Timber Ceilings', 'Earthen Plaster Walls', 'Ceramic Sconces', 'Bespoke Banquettes'];
                  scopeLabel = 'Rustic Café Experience · UAE';
                } else if (project.slug.includes('ouur')) {
                  highlights = ['Brushed Stainless Bar', 'Fluted Timber Joinery', 'Seamless Micro-Cement', 'Linear Track Lighting'];
                  scopeLabel = 'Industrial Specialty Coffee · Copenhagen';
                }

                return (
                  <div key={project.slug || idx} className="spatial-card">
                    <Link to={targetLink} className="img-box" aria-label={project.title}>
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        loading="lazy"
                      />
                      <span
                        className="mono"
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          left: '10px',
                          background: 'rgba(27,27,23,0.92)',
                          backdropFilter: 'blur(4px)',
                          color: '#FFF',
                          fontSize: '10.5px',
                          padding: '3px 8px',
                          letterSpacing: '0.05em',
                          border: '1px solid rgba(255,255,255,0.2)',
                          zIndex: 2,
                          borderRadius: '2px'
                        }}
                      >
                        {imageCount} MASTER RENDERS
                      </span>
                    </Link>

                    <div className="spatial-card-body">
                      <div>
                        <div className="spatial-card-meta">
                          <span className="spatial-badge">SPATIAL BRANDING &amp; ENVIRONMENTS</span>
                          <span className="spatial-scope">{scopeLabel}</span>
                        </div>

                        <h3 className="spatial-card-title">
                          <Link to={targetLink} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {project.title}
                          </Link>
                        </h3>

                        <p className="spatial-card-desc">
                          {project.description}
                        </p>

                        <div className="spatial-highlights">
                          {highlights.map((h, hIdx) => (
                            <span key={hIdx} className="spatial-pill">{h}</span>
                          ))}
                        </div>
                      </div>

                      <div className="spatial-card-foot">
                        <Link to={targetLink} className="spatial-action-link">
                          <span>EXPLORE FULL CASE STUDY</span>
                          <ArrowIcon size={13} />
                        </Link>

                        {project.images && project.images.length > 0 && (
                          <button
                            type="button"
                            className="spatial-quickview-btn"
                            onClick={() => openAssetModal(project, 0)}
                          >
                            Quick View {imageCount} Assets ↗
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 03. Capabilities & Architectural Translation Banner ── */}
        <section style={{ background: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)', padding: '72px 0' }}>
          <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '36px', alignItems: 'center' }}>
            <div>
              <div className="mono" style={{ fontSize: '11.5px', color: 'var(--marker)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                THE DRAWING BOARD // INTEGRATED METHOD
              </div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.15, margin: '0 0 16px' }}>
                From 2D Brand Identity to 3D Physical Reality.
              </h2>
              <p style={{ color: 'var(--ink-soft)', fontSize: '15px', lineHeight: 1.6, margin: '0 0 24px' }}>
                We translate brand strategy, typography scales, and tactile material tokens into structural architecture, exterior signage, and customer circulation. We do not do residential spaces — we engineer commercial destinations built to drive customer dwell-time and brand authority.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link to="/services/spatial-branding" className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>
                  Read Our Translation Method <ArrowIcon size={13} />
                </Link>
                <Link to="/get-quote" className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px', background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)' }}>
                  Get Spatial Quote
                </Link>
              </div>
            </div>

            <div style={{ background: 'var(--paper)', border: '1px dashed var(--paper-line)', padding: '28px' }}>
              <div className="mono" style={{ fontSize: '11px', color: 'var(--pine)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                // SPATIAL CAPABILITIES MATRIX
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: 'var(--ink)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--pine)', fontWeight: 600 }}>01</span> Commercial Space Planning &amp; Operational Zoning
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--pine)', fontWeight: 600 }}>02</span> Exterior Fascia, Blade &amp; ADA Wayfinding Signage
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--pine)', fontWeight: 600 }}>03</span> Bespoke Counter Geometry, Banquettes &amp; Millwork
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--pine)', fontWeight: 600 }}>04</span> Photorealistic 3D Visualization &amp; Lighting Temp Specs
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--pine)', fontWeight: 600 }}>05</span> Turnkey Material Schedules for General Contractors
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── 04. Final CTA ── */}
        <section className="final" style={{ padding: '90px 0', background: 'var(--ink)', color: '#FFF' }}>
          <div className="wrap" style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <div className="mono" style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#CFE0DA', textTransform: 'uppercase', marginBottom: '14px', opacity: 0.9 }}>
              COMMERCIAL INTAKE // SPATIAL ENGAGEMENTS
            </div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.15, margin: '0 0 16px', color: '#FFF' }}>
              Have a commercial space in planning?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: 1.6, margin: '0 auto 32px', maxWidth: '620px' }}>
              We collaborate with restaurateurs, specialty coffee founders, and boutique retail brands worldwide. Let’s talk site dimensions, concept vision, and timeline.
            </p>

            <div className="cta-button-group" style={{ justifyContent: 'center' }}>
              <Link to="/get-quote" className="btn-primary btn-quote">
                Get Architectural Quote <ArrowIcon size={14} />
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary btn-wa">
                <span>💬</span> WhatsApp Consultation
              </a>
              <Link to="/contact" className="btn-primary btn-contact" style={{ background: 'transparent', color: '#FFF', border: '1px solid rgba(255,255,255,0.3)' }}>
                Discuss Your Site Brief
              </Link>
            </div>
          </div>
        </section>

        <StickyMobileCTA
          title="Spatial &amp; Interior Work"
          subtitle="100+ Master Renders"
          buttonText="Get Quote →"
          link="/get-quote"
        />

        <Footer />
      </div>

      {/* Asset Lightbox Modal */}
      {modalProject && (
        <ProjectAssetModal
          project={modalProject}
          initialIndex={modalIndex}
          onClose={() => setModalProject(null)}
        />
      )}
    </>
  );
}

