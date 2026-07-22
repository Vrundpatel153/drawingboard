import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import blogsData from '../data/blogsData.json';

export default function BlogDetail() {
  const { blogId } = useParams();

  // Find blog or fallback to first blog
  const blog = blogsData.find(
    b => b.slug === blogId || b.slug.includes(blogId || '')
  ) || blogsData[0];

  const currentIndex = blogsData.indexOf(blog);
  const nextBlog = blogsData[(currentIndex + 1) % blogsData.length];

  return (
    <>
      <RegistrationMarks />
      <Navbar />

      <section className="hero-lite">
        <div className="wrap">
          <div className="crumb" style={{ padding: 0, marginBottom: '20px' }}>
            <Link to="/insights">Insights</Link>
            <span className="sep">/</span>
            <span className="cur">{blog.title}</span>
          </div>
          <div className="sheet-label">
            <span className="tag">{blog.tag} // ESSAY</span>
            <div className="rule"></div>
          </div>
          <h1>{blog.title}</h1>
          <p style={{ marginTop: '16px', color: 'var(--ink-soft)' }} className="mono">
            BY MARCUS VANCE &bull; STUDIO DISPATCH &bull; PUBLISHED IN THE DRAWING BOARD JOURNAL
          </p>

          {/* Cover Image Container */}
          <div className="hero-visual has-img" style={{ marginTop: '36px' }}>
            <img src={blog.coverImage} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="annot-card" style={{ padding: '36px', background: 'var(--card)' }}>
            <div className="corner"></div>
            <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Architectural Framework & Execution</h3>
            <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--ink)', marginBottom: '20px' }}>
              In modern design engineering, restraint is authority. When a brand strips away unnecessary decoration and focuses on pure typographic hierarchy, crisp dielines, and clean digital performance, it commands attention without shouting.
            </p>
            <p style={{ fontSize: '16px', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: '28px' }}>
              Our studio approach treats every project asset as an essential structural component. By pairing high-contrast visual systems with sub-second digital load speeds, we help visionary founders build brands that scale.
            </p>

            {/* Gallery Images if available */}
            {blog.images && blog.images.length > 1 && (
              <div className="gallery" style={{ marginTop: '32px' }}>
                {blog.images.slice(1).map((imgUrl, idx) => (
                  <div key={idx} className="shot">
                    <div className="img" style={{ background: 'none' }}>
                      <img src={imgUrl} alt={`${blog.title} figure ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="cap">Figure {String(idx + 1).padStart(2, '0')}: Journal Visual Spec #{idx + 1}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="cta-row" style={{ marginTop: '40px' }}>
              <Link to={`/blog/${nextBlog.slug}`} className="btn-primary">Read Next Essay: {nextBlog.title} &rarr;</Link>
              <Link to="/insights" className="btn-link">Back to All Essays</Link>
            </div>
          </div>
        </div>
      </section>

      <StickyMobileCTA title={blog.title} subtitle="Studio Journal" buttonText="Next Essay →" link={`/blog/${nextBlog.slug}`} />
      <Footer />
    </>
  );
}
