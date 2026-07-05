import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fixFramerSSRStyles, extractBreakpointMap } from '../utils/framerPageUtils';

// Module-level cache: avoids re-fetching on back-navigation
const pageCache = new Map();

export default function BlogDetail() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(() => pageCache.get(blogId) || null);
  const [loading, setLoading] = useState(!pageCache.has(blogId));
  const [error, setError] = useState(false);

  useEffect(() => {
    // If already cached, skip fetch entirely
    if (pageCache.has(blogId)) {
      setBlogData(pageCache.get(blogId));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);
    
    // Fetch blog HTML and styles JSON
    fetch(`/blogs/${blogId}.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Blog post not found');
        }
        return res.json();
      })
      .then((data) => {
        pageCache.set(blogId, data);
        setBlogData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [blogId]);

  useEffect(() => {
    if (!blogData) return;

    // Set page title
    document.title = blogData.title || 'Blog Detail';

    // Inject styles with Framer SSR fixes
    const styleElements = [];
    if (blogData.styles) {
      const breakpointMap = extractBreakpointMap(document.body);
      blogData.styles.forEach((css, index) => {
        const el = document.createElement('style');
        el.id = `page-style-blog-${blogId}-${index}`;
        el.textContent = fixFramerSSRStyles(css, breakpointMap);
        document.head.appendChild(el);
        styleElements.push(el);
      });
    }

    // Bind hover classes
    try {
      const bindHover = (el) => {
        el.addEventListener('mouseenter', () => { el.classList.add('hover'); });
        el.addEventListener('mouseleave', () => { el.classList.remove('hover'); });
      };
      document.querySelectorAll('[class*=" framer-v-"],[class^="framer-v-"]').forEach(bindHover);
    } catch (e) {
      console.error("Hover error:", e);
    }

    // Run clone-marquee ticker initialization
    try {
      const uls = document.querySelectorAll('ul[style*="flex-direction: row"]');
      uls.forEach((ul) => {
        let real = Array.from(ul.querySelectorAll('li[aria-hidden="false"]'));
        if (!real.length) {
          const all = ul.querySelectorAll('li');
          real = Array.from(all).slice(0, Math.ceil(all.length / 3));
        }
        if (!real.length) return;
        const w = real.reduce((s, li) => s + li.offsetWidth, 0);
        if (!w) return;
        const id = 'cloneMarquee' + Math.random().toString(36).slice(2);
        const s = document.createElement('style');
        s.textContent = `@keyframes ${id}{from{transform:translateX(0)}to{transform:translateX(-${w}px)}}`;
        document.head.appendChild(s);
        styleElements.push(s);
        ul.style.willChange = 'transform';
        ul.style.transform = '';
        ul.style.animation = `${id} ${w / 80}s linear infinite`;
      });
    } catch (e) {
      console.error("Marquee error:", e);
    }

    // Intercept clicks to avoid reloads
    const handleLinkClick = (e) => {
      const anchor = e.target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (!href) return;
        
        if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || href.startsWith('#')) {
          return;
        }
        
        e.preventDefault();
        let target = href;
        if (target.startsWith('.')) {
          target = target.substring(1);
        }
        if (!target.startsWith('/')) {
          target = '/' + target;
        }
        if (target === '/index.html') {
          target = '/';
        }
        
        // Map routes correctly
        if (target === '/about') {
          target = '/studio';
        } else if (target === '/blog') {
          target = '/insights';
        } else if (target === '/service') {
          target = '/service';
        } else if (target === '/work') {
          target = '/work';
        }
        
        navigate(target);
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      styleElements.forEach(el => el.remove());
      document.removeEventListener('click', handleLinkClick);
    };
  }, [blogData, blogId, navigate]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'rgb(245, 245, 245)'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          border: '3px solid rgba(29, 3, 86, 0.15)',
          borderTopColor: 'rgb(29, 3, 86)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !blogData) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000000',
        color: '#ffffff',
        fontFamily: 'sans-serif',
        gap: '20px'
      }}>
        <h2>Post Not Found</h2>
        <button onClick={() => navigate('/insights')} style={{
          padding: '10px 20px',
          borderRadius: '50px',
          border: '1px solid #ffffff',
          background: 'transparent',
          color: '#ffffff',
          cursor: 'pointer'
        }}>
          Back to Insights
        </button>
      </div>
    );
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: blogData.htmlContent }} />
  );
}
