import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import projectsData from '../data/projectsData.json';
import { usePageAnimations } from '../hooks/usePageAnimations';
import gsap from 'gsap';

export default function Work() {
  const [filter, setFilter] = useState('all');
  const pageRef = useRef(null);
  const gridRef = useRef(null);

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
    if (gridRef.current) {
      gsap.fromTo(Array.from(gridRef.current.children),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out' }
      );
    }
    setFilter(val);
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
              <div className="lbl">Design & Craft Honors</div>
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

      {/* Portfolio Section with Category Filters */}
      <section>
        <div className="wrap">
          {/* Filter Tabs matching work.html reference */}
          <div className="filter-tabs">
            <button className={`ftab ${filter === 'all' ? 'on' : ''}`} onClick={() => handleFilter('all')}>[ ALL PROJECTS ]</button>
            <button className={`ftab ${filter === 'branding' ? 'on' : ''}`} onClick={() => handleFilter('branding')}>[ BRANDING ]</button>
            <button className={`ftab ${filter === 'web' ? 'on' : ''}`} onClick={() => handleFilter('web')}>[ WEB & DIGITAL ]</button>
            <button className={`ftab ${filter === 'packaging' ? 'on' : ''}`} onClick={() => handleFilter('packaging')}>[ PACKAGING ]</button>
          </div>

          {/* Case Grid */}
          <div className="case-grid" ref={gridRef}>
            {filteredProjects.map((project, idx) => (
              <Link key={project.slug || idx} to={`/work/${project.slug}`} className="case-card">
                <div className="img">
                  <img src={project.coverImage} alt={project.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="case-body">
                  <div className="tag">{project.tag}</div>
                  <h4>{project.title}</h4>
                  <p>{project.description || 'Strategic brand identity, packaging design, and digital build.'}</p>
                  <span className="case-metric">{project.imageCount > 0 ? `${project.imageCount} REAL ASSETS` : 'VIEW CASE STUDY'}</span>
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
          <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer" className="btn-primary">Start Your Case Study &rarr;</a>
        </div>
      </section>

      <StickyMobileCTA title="Work Archive" subtitle={`${projectsData.length} Selected Projects`} buttonText="Book Call →" link="https://cal.com/dandelion-nrvrze" />
      <Footer />
      </div>
    </>
  );
}
