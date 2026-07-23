import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE TRANSITION — Layered Up-Down cinematic wipe
   Three overlapping panels sliding up to cover, then up to reveal.
   Theme: Ink → Pine green border → Paper grid.
   Holds the previous route content until the screen is fully covered,
   preventing visual flash of the new page before transition finishes.
───────────────────────────────────────────────────────────────────────────── */
export default function PageTransition({ children }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const lastPath = useRef(location.pathname);

  const inkRef = useRef(null);
  const pineRef = useRef(null);
  const paperRef = useRef(null);
  const isFirst = useRef(true);

  // Sync state if pathname has NOT changed (regular component updates)
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

    const ink = inkRef.current;
    const pine = pineRef.current;
    const paper = paperRef.current;

    if (!ink || !pine || !paper) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.inOut', duration: 0.55 }
      });

      // Show panels
      tl.set([ink, pine, paper], { display: 'flex', yPercent: 100 })

        // 1. Ink panel slide up to cover
        .to(ink, { yPercent: 0 })

        // 2. Pine green follows
        .to(pine, { yPercent: 0 }, "-=0.45")

        // 3. Paper grid panel settles at 0
        .to(paper, { yPercent: 0 }, "-=0.45")

        // Fade in monogram on paper panel
        .fromTo(".transition-monogram", 
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          "-=0.1"
        )

        // At peak (completely covered), switch content to new children & scroll to top
        .add(() => {
          lastPath.current = location.pathname;
          setDisplayChildren(children);
          window.scrollTo(0, 0);
        })

        // Hold peak moment
        .to({}, { duration: 0.25 })

        // 4. Staggered exit upwards to reveal the new page
        .to(paper, { yPercent: -100 })
        .to(pine, { yPercent: -100 }, "-=0.45")
        .to(ink, { yPercent: -100 }, "-=0.45")

        // Fade out monogram
        .to(".transition-monogram", { opacity: 0, duration: 0.2 }, "<")

        // Reset positions
        .set([ink, pine, paper], { display: 'none', yPercent: 100 });
    });

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      
      {/* Panel 1: Ink */}
      <div
        ref={inkRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#1B1B17',
          zIndex: 10000,
          display: 'none',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* Panel 2: Pine */}
      <div
        ref={pineRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#24463B',
          zIndex: 10001,
          display: 'none',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* Panel 3: Paper + Grid */}
      <div
        ref={paperRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#EFEBE2',
          backgroundImage: `
            linear-gradient(rgba(27,27,23,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,27,23,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          zIndex: 10002,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        <div className="transition-monogram" style={{ textAlign: 'center', opacity: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '16px',
            opacity: 0.4
          }}>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '9px', color: '#1B1B17' }}>[01]</span>
            <span style={{ width: '6px', height: '6px', border: '1px solid #1B1B17' }} />
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '9px', color: '#1B1B17' }}>[02]</span>
          </div>

          <div style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(20px, 4vw, 32px)',
            fontWeight: 600,
            color: '#1B1B17',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '8px'
          }}>
            The Drawing Board
          </div>

          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: '#B8412E',
            textTransform: 'uppercase',
            opacity: 0.8
          }}>
            // ARCHITECTURAL IDENTITY
          </div>
        </div>
      </div>

      {/* Render the displayChildren (holding old route until covered) */}
      <div>{displayChildren}</div>
    </div>
  );
}
