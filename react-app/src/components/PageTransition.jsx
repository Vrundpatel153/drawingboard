import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function PageTransition({ children }) {
  const location = useLocation();
  const overlayRef = useRef(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (overlayRef.current) {
      const el = overlayRef.current;
      gsap.killTweensOf(el);
      
      const tl = gsap.timeline();
      tl.set(el, { scaleY: 1, transformOrigin: 'top center', opacity: 1, pointerEvents: 'all' })
        .to(el, {
          scaleY: 0,
          duration: 0.5,
          ease: 'power3.inOut',
          delay: 0.05,
          onComplete: () => {
            gsap.set(el, { pointerEvents: 'none', opacity: 0 });
          }
        });
    }
  }, [location.pathname]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* ── Ultra-Smooth Architectural Transition Overlay Curtain ── */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--pine)',
          zIndex: 99999,
          pointerEvents: 'none',
          opacity: 0,
          transformOrigin: 'top center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          className="mono"
          style={{
            color: 'var(--paper)',
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.8
          }}
        >
          THE DRAWING BOARD STUDIO
        </div>
      </div>

      {children}
    </div>
  );
}
