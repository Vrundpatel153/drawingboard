import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE TRANSITION — Snappy single-panel wipe (ink → reveal)
   Total duration: ~0.65s  (was ~1.8s across 3 panels)
   • One ink panel slides UP to cover in 0.30s
   • Content swaps instantly while covered
   • Panel slides UP-OUT in 0.30s to reveal new page
   • Small golden mark flashes at peak for brand continuity
───────────────────────────────────────────────────────────────────────────── */
export default function PageTransition({ children }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const lastPath = useRef(location.pathname);

  const panelRef    = useRef(null);
  const markRef     = useRef(null);
  const isFirst     = useRef(true);
  const isAnimating = useRef(false);

  // Sync state when pathname hasn't changed (regular re-renders)
  useEffect(() => {
    if (location.pathname === lastPath.current) {
      setDisplayChildren(children);
    }
  }, [children, location.pathname]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      lastPath.current = location.pathname;
      return;
    }

    const panel = panelRef.current;
    const mark  = markRef.current;
    if (!panel || isAnimating.current) return;

    isAnimating.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => { isAnimating.current = false; }
      });

      // ── Start: panel sits below viewport, hidden ──────────────────────────
      tl.set(panel, { display: 'flex', yPercent: 102, willChange: 'transform' })
        .set(mark,  { opacity: 0 })

        // ── IN: panel slides up to cover screen ──────────────────────────────
        .to(panel, { yPercent: 0, duration: 0.30 })

        // ── Flash brand mark at peak ──────────────────────────────────────────
        .to(mark, { opacity: 1, duration: 0.10, ease: 'none' }, '-=0.05')

        // ── Swap content at exact peak ────────────────────────────────────────
        .add(() => {
          lastPath.current = location.pathname;
          setDisplayChildren(children);
          window.scrollTo(0, 0);
        })

        // ── Very brief hold so the eye registers the brand mark ───────────────
        .to({}, { duration: 0.06 })

        // ── OUT: panel continues upward to reveal new page ────────────────────
        .to(mark,  { opacity: 0, duration: 0.08, ease: 'none' })
        .to(panel, { yPercent: -102, duration: 0.28, ease: 'power3.inOut' }, '-=0.05')

        // ── Cleanup ───────────────────────────────────────────────────────────
        .set(panel, { display: 'none', yPercent: 102, willChange: 'auto' });
    });

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>

      {/* Single fast-wipe panel */}
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
        {/* Minimal golden mark — just the logo mark SVG, tiny & centered */}
        <div
          ref={markRef}
          style={{ opacity: 0 }}
        >
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

      {/* Page content */}
      <div>{displayChildren}</div>
    </div>
  );
}
