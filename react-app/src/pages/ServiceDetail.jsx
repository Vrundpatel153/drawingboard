import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Module-level cache: avoids re-fetching on back-navigation
const pageCache = new Map();

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState(() => pageCache.get(serviceId) || null);
  const [loading, setLoading] = useState(!pageCache.has(serviceId));
  const [error, setError] = useState(false);

  useEffect(() => {
    // If already cached, skip fetch entirely
    if (pageCache.has(serviceId)) {
      setServiceData(pageCache.get(serviceId));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);
    
    // Fetch service HTML and styles JSON
    fetch(`/services/${serviceId}.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Service not found');
        }
        return res.json();
      })
      .then((data) => {
        pageCache.set(serviceId, data);
        setServiceData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [serviceId]);

  useEffect(() => {
    if (!serviceData) return;


    // Set page title
    document.title = serviceData.title || 'Service Detail';

    // Inject styles
    const styleElements = [];
    if (serviceData.styles) {
      serviceData.styles.forEach((css, index) => {
        const el = document.createElement('style');
        el.id = `page-style-service-${serviceId}-${index}`;
        el.textContent = css.replace(/\bopacity\s*:\s*0\b/g, 'opacity: 1');
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
  }, [serviceData, serviceId, navigate]);

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

  if (error || !serviceData) {
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
        <h2>Service Layout Not Found</h2>
        <button onClick={() => navigate('/service')} style={{
          padding: '10px 20px',
          borderRadius: '50px',
          border: '1px solid #ffffff',
          background: 'transparent',
          color: '#ffffff',
          cursor: 'pointer'
        }}>
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Fix: framer-DuWwj uses display:contents inline which ignores padding/box-model.
          Override to display:flex with column direction so the padding:140px top pushes content below the fixed navbar. */}
      <style>{`
        [data-framer-root].framer-DuWwj,
        .framer-DuWwj[data-framer-root] {
          display: flex !important;
          flex-flow: column !important;
          align-items: center !important;
          width: 100% !important;
          padding-bottom: 60px !important;
          gap: 60px !important;
        }
        @media (max-width: 1199px) {
          [data-framer-root].framer-DuWwj,
          .framer-DuWwj[data-framer-root] {
            padding-bottom: 40px !important;
            gap: 40px !important;
          }
        }

        /* Card container logic for ServiceDetail pages */
        a[href^="./"], a[href^="../service/"] {
          cursor: pointer;
        }
        
        /* Service card hover background */
        a[href^="./"]:hover > div > div > div[style*="rgb(227, 227, 227)"],
        a[href^="../service/"]:hover > div > div > div[style*="rgb(227, 227, 227)"],
        a[href^="./"]:hover [style*="background-color:rgb(227, 227, 227)"],
        a[href^="./"]:hover [style*="background-color: rgb(227, 227, 227)"],
        a[href^="../service/"]:hover [style*="background-color:rgb(227, 227, 227)"],
        a[href^="../service/"]:hover [style*="background-color: rgb(227, 227, 227)"] {
          background-color: rgb(29, 3, 86) !important;
          transition: background-color 0.25s ease !important;
        }

        /* Service card hover text color */
        a[href^="./"]:hover h3,
        a[href^="./"]:hover h4,
        a[href^="./"]:hover h5,
        a[href^="./"]:hover p,
        a[href^="./"]:hover .framer-text,
        a[href^="./"]:hover [style*="color:rgb(29, 3, 86)"],
        a[href^="./"]:hover [style*="color: rgb(29, 3, 86)"],
        a[href^="./"]:hover [style*="color:rgb(41, 12, 102)"],
        a[href^="./"]:hover [style*="color: rgb(41, 12, 102)"],
        a[href^="../service/"]:hover h3,
        a[href^="../service/"]:hover h4,
        a[href^="../service/"]:hover h5,
        a[href^="../service/"]:hover p,
        a[href^="../service/"]:hover .framer-text,
        a[href^="../service/"]:hover [style*="color:rgb(29, 3, 86)"],
        a[href^="../service/"]:hover [style*="color: rgb(29, 3, 86)"],
        a[href^="../service/"]:hover [style*="color:rgb(41, 12, 102)"],
        a[href^="../service/"]:hover [style*="color: rgb(41, 12, 102)"] {
          color: rgb(255, 255, 255) !important;
          --framer-text-color: rgb(255, 255, 255) !important;
          --extracted-1lwpl3i: rgb(255, 255, 255) !important;
          --extracted-r6o4lv: rgb(255, 255, 255) !important;
          transition: color 0.25s ease !important;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: serviceData.htmlContent }} />
    </>
  );
}
