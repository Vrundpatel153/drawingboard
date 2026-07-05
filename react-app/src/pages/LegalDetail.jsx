import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fixFramerSSRStyles, extractBreakpointMap } from '../utils/framerPageUtils';

// Module-level cache: avoids re-fetching on back-navigation
const pageCache = new Map();

export default function LegalDetail() {
  const { legalId } = useParams();
  const navigate = useNavigate();
  const [legalData, setLegalData] = useState(() => pageCache.get(legalId) || null);
  const [loading, setLoading] = useState(!pageCache.has(legalId));
  const [error, setError] = useState(false);

  useEffect(() => {
    // If already cached, skip fetch entirely
    if (pageCache.has(legalId)) {
      setLegalData(pageCache.get(legalId));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);
    
    // Fetch legal page HTML and styles JSON
    fetch(`/legal/${legalId}.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Legal page not found');
        }
        return res.json();
      })
      .then((data) => {
        pageCache.set(legalId, data);
        setLegalData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [legalId]);

  useEffect(() => {
    if (!legalData) return;

    // Set page title
    document.title = legalData.title || 'Legal Document';

    // Inject styles with Framer SSR fixes
    const styleElements = [];
    if (legalData.styles) {
      const breakpointMap = extractBreakpointMap(document.body);
      legalData.styles.forEach((css, index) => {
        const el = document.createElement('style');
        el.id = `page-style-legal-${legalId}-${index}`;
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
  }, [legalData, legalId, navigate]);

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

  if (error || !legalData) {
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
        <h2>Document Not Found</h2>
        <button onClick={() => navigate('/')} style={{
          padding: '10px 20px',
          borderRadius: '50px',
          border: '1px solid #ffffff',
          background: 'transparent',
          color: '#ffffff',
          cursor: 'pointer'
        }}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: legalData.htmlContent }} />
  );
}
