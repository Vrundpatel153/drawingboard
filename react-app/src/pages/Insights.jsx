import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import blogsData from '../data/blogsData.json';

export default function Insights() {
  const [filter, setFilter] = useState('all');

  const filteredBlogs = blogsData.filter(b => filter === 'all' || b.category === filter);
  const featuredBlog = blogsData[0];

  return (
    <>
      <RegistrationMarks />
      <Navbar />

      {/* Page Hero */}
      <section className="hero-lite">
        <div className="wrap">
          <div className="sheet-label">
            <span className="tag">SHEET 06 // STUDIO JOURNAL ({blogsData.length} ARTICLES)</span>
            <div className="rule"></div>
          </div>
          <h1>Perspectives on <em>design, strategy & craft</em>.</h1>
          <p>Essays, teardowns, and framework guides on brand architecture, digital UX engineering, and high-end packaging execution.</p>
        </div>
      </section>

      {/* Featured Spotlight Article with Responsive Grid */}
      {featuredBlog && (
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="annot-card" style={{ padding: '32px', background: 'var(--card)' }}>
              <div className="corner"></div>
              <div className="eyebrow" style={{ marginBottom: '12px' }}>FEATURED ESSAY // SPOTLIGHT</div>

              <div className="spotlight-grid">
                <div>
                  <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', marginBottom: '14px' }}>{featuredBlog.title}</h2>
                  <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.55, marginBottom: '24px' }}>
                    An architectural teardown exploring essential principles for building high-converting brand identities and digital experiences.
                  </p>
                  <Link to={`/blog/${featuredBlog.slug}`} className="btn-primary" style={{ padding: '10px 18px', fontSize: '13px' }}>Read Full Essay &rarr;</Link>
                </div>
                <div className="spotlight-img-box">
                  <img src={featuredBlog.coverImage} alt={featuredBlog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid with Real Cover Images */}
      <section>
        <div className="wrap">
          <div className="filter-tabs">
            <button className={`ftab ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>[ ALL ({blogsData.length}) ]</button>
            <button className={`ftab ${filter === 'branding' ? 'on' : ''}`} onClick={() => setFilter('branding')}>[ BRANDING ]</button>
            <button className={`ftab ${filter === 'web' ? 'on' : ''}`} onClick={() => setFilter('web')}>[ DIGITAL & CODE ]</button>
            <button className={`ftab ${filter === 'packaging' ? 'on' : ''}`} onClick={() => setFilter('packaging')}>[ PACKAGING ]</button>
          </div>

          <div className="article-grid">
            {filteredBlogs.map((blog, idx) => (
              <article key={blog.slug || idx} className="article-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ height: '180px', borderBottom: '1px solid var(--ink)', overflow: 'hidden' }}>
                  <img src={blog.coverImage} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div className="meta">
                    <span>{blog.tag}</span>
                    <span>STUDIO ESSAY</span>
                  </div>
                  <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{blog.title}</h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', flex: 1 }}>
                    Insights, processes, and tactical design principles from our senior engineering team.
                  </p>
                  <Link to={`/blog/${blog.slug}`} className="read-more" style={{ marginTop: '16px' }}>Read Article &rarr;</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="final">
        <div className="wrap">
          <h2>Subscribe to Studio Dispatches</h2>
          <p>Receive monthly articles on brand positioning, packaging specs, and web engineering. No spam, ever.</p>
          <Link to="/contact" className="btn-primary">Join Studio Newsletter &rarr;</Link>
        </div>
      </section>

      <StickyMobileCTA title="Insights & Journal" subtitle="12 Studio Essays" buttonText="Subscribe →" />
      <Footer />
    </>
  );
}
