import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE TRANSITION — Snappy single-panel wipe
   Swaps DOM children synchronously on route change so backgrounded tabs
   never get stuck on previous routes when opening external windows.
───────────────────────────────────────────────────────────────────────────── */
export default function PageTransition({ children }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const lastPath = useRef(location.pathname);

  const panelRef    = useRef(null);
  const markRef     = useRef(null);
  const isFirst     = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      lastPath.current = location.pathname;
      return;
    }

    // Always update DOM children & scroll top immediately on route change
    lastPath.current = location.pathname;
    setDisplayChildren(children);
    window.scrollTo(0, 0);

    const panel = panelRef.current;
    const mark  = markRef.current;
    if (!panel) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' }
      });

      // Start position: panel sits below viewport
      tl.set(panel, { display: 'flex', yPercent: 100, willChange: 'transform' })
        .set(mark,  { opacity: 0 })
        // Slide up over new content
        .to(panel, { yPercent: 0, duration: 0.22 })
        .to(mark, { opacity: 1, duration: 0.08 }, '-=0.04')
        .to({}, { duration: 0.05 })
        // Exit up to reveal new page
        .to(mark, { opacity: 0, duration: 0.06 })
        .to(panel, { yPercent: -100, duration: 0.22 }, '-=0.04')
        .set(panel, { display: 'none', yPercent: 100, willChange: 'auto' });
    });

    return () => ctx.revert();
  }, [location.pathname, children]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Wipe panel */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#1B1B17',
          zIndex: 10000,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div ref={markRef} style={{ opacity: 0 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="30.445 142.642 44.42 47.091"
            style={{ width: '36px', height: '40px', display: 'block' }}
          >
            <rect x="30.445" y="142.642" fill="#A19071" width="44.42" height="25.732"/>
            <rect x="30.445" y="159.392" fill="#A19071" width="22.685" height="30.341"/>
          </svg>
        </div>
      </div>

      <div>{displayChildren}</div>
    </div>
  );
}
