import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
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
        backgroundColor: '#000000',
        color: '#ffffff',
        fontFamily: 'sans-serif'
      }}>
        Loading service...
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
    <div dangerouslySetInnerHTML={{ __html: serviceData.htmlContent }} />
  );
}
