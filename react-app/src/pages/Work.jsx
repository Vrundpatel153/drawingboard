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
  const [activeIdx, setActiveIdx] = useState(0);
  const pageRef = useRef(null);
  const carouselRef = useRef(null);

  usePageAnimations(pageRef);

  const filteredProjects = projectsData.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'branding') return p.category === 'branding' || p.tag.includes('BRANDING');
    if (filter === 'packaging') return p.category === 'packaging' || p.tag.includes('PACKAGING');
    if (filter === 'web') return p.category === 'web' || p.tag.includes('WEB') || p.tag.includes('UI UX');
    if (filter === 'photography') return p.category === 'photography' || p.tag.includes('PHOTO');
    return true;
  });

  const handleFilter = (val) => {
    setFilter(val);
    setActiveIdx(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.firstElementChild?.offsetWidth || 380;
    const gap = 24;
    const scrollAmount = (cardWidth + gap) * (direction === 'next' ? 1 : -1);
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.firstElementChild?.offsetWidth || 380;
    const gap = 24;
    const scrollPos = carouselRef.current.scrollLeft;
    const idx = Math.min(
      Math.max(0, Math.round(scrollPos / (cardWidth + gap))),
      filteredProjects.length - 1
    );
    setActiveIdx(idx);
  };

  return (
    <>
      <div ref={pageRef}>
        <RegistrationMarks />
        <Navbar />

        {/* Page Hero */}
        <section className="hero-lite">
          <div className="wrap">
            <div className="sheet-label">
              <span className="tag">SHEET 03 // PORTFOLIO ARCHIVE</span>
              <div className="rule"></div>
            </div>
            <h1>Proof over promises: <em>Selected Case Studies</em>.</h1>
            <p>Explore our recent work across brand positioning, digital platforms, Framer development, and physical packaging systems.</p>

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

        {/* Portfolio Carousel Section */}
        <section style={{ paddingBottom: '80px', overflow: 'hidden' }}>
          <div className="wrap">
            {/* Top Carousel Navigation & Filters Bar */}
            <div
              style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                marginBottom: '28px',
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
                <button className={`ftab ${filter === 'web' ? 'on' : ''}`} onClick={() => handleFilter('web')}>[ WEB &amp; DIGITAL ]</button>
                <button className={`ftab ${filter === 'packaging' ? 'on' : ''}`} onClick={() => handleFilter('packaging')}>[ PACKAGING ]</button>
              </div>

              {/* Counter Badge & Arrow Control Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="mono" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-soft)', letterSpacing: '0.04em' }}>
                  [ {String(activeIdx + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')} ]
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => scrollCarousel('prev')}
                    style={{
                      background: 'var(--card)',
                      border: '1.5px solid var(--ink)',
                      borderRadius: '2px',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      cursor: 'pointer',
                      fontSize: '16px',
                      color: 'var(--ink)',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--pine)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--card)'; e.currentTarget.style.color = 'var(--ink)'; }}
                    title="Previous case study"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCarousel('next')}
                    style={{
                      background: 'var(--card)',
                      border: '1.5px solid var(--ink)',
                      borderRadius: '2px',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      cursor: 'pointer',
                      fontSize: '16px',
                      color: 'var(--ink)',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--pine)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--card)'; e.currentTarget.style.color = 'var(--ink)'; }}
                    title="Next case study"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Smooth Horizontal Carousel Track */}
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="work-carousel-track"
              style={{
                display: 'flex',
                gap: '24px',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                paddingBottom: '16px',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {filteredProjects.map((project, idx) => (
                <Link
                  key={project.slug || idx}
                  to={`/work/${project.slug}`}
                  className="case-card work-carousel-card"
                  style={{
                    flex: '0 0 380px',
                    scrollSnapAlign: 'start',
                    textDecoration: 'none',
                    borderRadius: '2px',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease'
                  }}
                >
                  <div className="img" style={{ aspectRatio: '4/3', overflow: 'hidden', background: 'linear-gradient(135deg, #d8d2c1, #c3bda9)', position: 'relative' }}>
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.45s ease' }}
                    />
                  </div>
                  <div className="case-body" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div className="tag mono" style={{ fontSize: '11px', color: 'var(--pine)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '8px' }}>
                        {project.tag}
                      </div>
                      <h4 style={{ fontSize: '20px', fontFamily: "'Fraunces', serif", marginBottom: '8px', color: 'var(--ink)' }}>
                        {project.title}
                      </h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: '16px' }}>
                        {project.description || 'Strategic brand identity, packaging design, and digital build.'}
                      </p>
                    </div>
                    <span className="case-metric mono" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--marker)', letterSpacing: '0.04em' }}>
                      {project.imageCount > 0 ? `${project.imageCount} REAL ASSETS` : 'VIEW CASE STUDY →'}
                    </span>
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
