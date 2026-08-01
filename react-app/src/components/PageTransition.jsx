import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const lastPath = useRef(location.pathname);

  const inkRef = useRef(null);
  const pineRef = useRef(null);
  const paperRef = useRef(null);
  const isFirst = useRef(true);

  // Sync displayChildren whenever children changes
  useEffect(() => {
    setDisplayChildren(children);
  }, [children]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      lastPath.current = location.pathname;
      return;
    }

    const ink = inkRef.current;
    const pine = pineRef.current;
    const paper = paperRef.current;

    if (!ink || !pine || !paper) {
      setDisplayChildren(children);
      return;
    }

    let isCancelled = false;

    // Safety fallback timer: force hide transition panels after 1.1s max
    const safetyTimer = setTimeout(() => {
      if (isCancelled) return;
      setDisplayChildren(children);
      gsap.set([ink, pine, paper], { display: 'none', yPercent: 100 });
      window.scrollTo(0, 0);
    }, 1100);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.inOut', duration: 0.4 },
        onComplete: () => {
          clearTimeout(safetyTimer);
          if (!isCancelled) {
            gsap.set([ink, pine, paper], { display: 'none', yPercent: 100 });
          }
        }
      });

      tl.set([ink, pine, paper], { display: 'flex', yPercent: 100 })
        .to(ink, { yPercent: 0 })
        .to(pine, { yPercent: 0 }, "-=0.3")
        .to(paper, { yPercent: 0 }, "-=0.3")
        .fromTo(".transition-monogram", 
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          "-=0.1"
        )
        .add(() => {
          lastPath.current = location.pathname;
          setDisplayChildren(children);
          window.scrollTo(0, 0);
        })
        .to({}, { duration: 0.15 })
        .to(paper, { yPercent: -100 })
        .to(pine, { yPercent: -100 }, "-=0.3")
        .to(ink, { yPercent: -100 }, "-=0.3")
        .to(".transition-monogram", { opacity: 0, duration: 0.15 }, "<")
        .set([ink, pine, paper], { display: 'none', yPercent: 100 });
    });

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
      ctx.revert();
    };
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

      {/* Panel 3: Paper grid */}
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
          backgroundSize: '30px 30px',
          zIndex: 10002,
          display: 'none',
          alignItems: 'center',
          justify: 'center',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        <div 
          className="transition-monogram mono"
          style={{
            fontSize: '13px',
            letterSpacing: '0.18em',
            fontWeight: 600,
            color: '#24463B',
            textTransform: 'uppercase',
            opacity: 0,
          }}
        >
          [ TDB // STUDIO ]
        </div>
      </div>

      {displayChildren}
    </div>
  );
}
