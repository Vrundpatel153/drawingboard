import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const wordRef     = useRef(null);
  const ballRef     = useRef(null);
  const letterRefs  = useRef([]);
  const dotlessIRef = useRef(null);
  const lineRef     = useRef(null);

  const text  = "The Drawing Board";
  const chars = text.split("");

  useEffect(() => {
    // Hide ball and line initially
    gsap.set(ballRef.current, { opacity: 0 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center center' });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit wipe — faster clip-path collapse
          gsap.to(containerRef.current, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 0.65,          // was 0.95 → 0.65
            ease: "power4.inOut",
            onComplete: () => { if (onComplete) onComplete(); }
          });
        }
      });

      gsap.set(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      });

      // ── 1. Letters slide up — tightened stagger & duration ──────────────
      tl.fromTo(".preloader-char",
        { opacity: 0, y: 35, rotateX: -70, skewX: 6 },
        { opacity: 1, y: 0, rotateX: 0, skewX: 0,
          duration: 0.55,            // was 0.75
          stagger: 0.018,            // was 0.025
          ease: "power4.out" }
      );

      // ── 2. Baseline rule — faster draw ──────────────────────────────────
      tl.to(lineRef.current, { scaleX: 1, duration: 0.45, ease: "power3.inOut" }, "-=0.35"); // was 0.7 / -=0.45

      // ── 3. Ball drop — same physics, compressed timing ───────────────────
      tl.add(() => {
        const ball      = ballRef.current;
        const targetEl  = dotlessIRef.current;
        if (!ball || !targetEl) return;

        const parentRect = wordRef.current.getBoundingClientRect();
        const fontSize   = parseFloat(getComputedStyle(wordRef.current).fontSize);

        let charRect;
        try {
          const range = document.createRange();
          range.selectNodeContents(targetEl);
          charRect = range.getBoundingClientRect();
        } catch (_) {
          charRect = targetEl.getBoundingClientRect();
        }

        const ballSize = ball.getBoundingClientRect().width || fontSize * 0.15;
        const landX = (charRect.left + charRect.right) / 2 - parentRect.left - ballSize / 2;
        const landY = charRect.top - parentRect.top + fontSize * 0.18;
        const dropHeight = fontSize * 3.0;   // was 3.5
        const startY     = landY - dropHeight;

        gsap.set(ball, { left: 0, top: 0, x: landX, y: startY, opacity: 1, scale: 1 });

        // Drop + bounces — all durations × 0.78
        gsap.timeline()
          .to(ball, { y: landY, duration: 0.40, ease: "power3.in" })          // was 0.55
          .to(ball, { scaleY: 0.6, scaleX: 1.4, duration: 0.055, ease: "power1.out" })
          .to(ball, { scaleY: 1.0, scaleX: 1.0, duration: 0.08, ease: "power2.out" })
          // Bounce 1
          .to(ball, { y: landY - fontSize * 0.50, duration: 0.18, ease: "power2.out" }) // was 0.25
          .to(ball, { y: landY, duration: 0.15, ease: "power2.in" })
          .to(ball, { scaleY: 0.78, scaleX: 1.22, duration: 0.05, ease: "power1.out" })
          .to(ball, { scaleY: 1.0,  scaleX: 1.0,  duration: 0.06, ease: "power2.out" })
          // Bounce 2
          .to(ball, { y: landY - fontSize * 0.20, duration: 0.13, ease: "power2.out" })
          .to(ball, { y: landY, duration: 0.11, ease: "power2.in" })
          .to(ball, { scaleY: 0.88, scaleX: 1.12, duration: 0.04, ease: "power1.out" })
          .to(ball, { scaleY: 1.0,  scaleX: 1.0,  duration: 0.05, ease: "power2.out" })
          // Bounce 3 — settle
          .to(ball, { y: landY - fontSize * 0.06, duration: 0.08, ease: "power2.out" })
          .to(ball, { y: landY, duration: 0.07, ease: "power2.in" })
          .to(targetEl, { y: 2, duration: 0.05, yoyo: true, repeat: 1 }, "-=0.07");
      });

      // ── 4. Colour shift — sooner, slightly faster ────────────────────────
      tl.to(".preloader-char", {
        color: '#24463B',
        duration: 0.28,              // was 0.35
        stagger: 0.012,              // was 0.015
        ease: "power2.out"
      }, "+=0.95");                  // was +=1.4

      // ── 5. Brief hold — trimmed ──────────────────────────────────────────
      tl.to({}, { duration: 0.30 }); // was 0.55
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: '#EFEBE2',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(27,27,23,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(27,27,23,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          ref={wordRef}
          style={{
            position: 'relative',
            perspective: '1000px',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            userSelect: 'none',
            paddingBottom: '20px',
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(28px, 6vw, 68px)',
            fontWeight: 600,
          }}
        >
          {/* Ball */}
          <div
            ref={ballRef}
            style={{
              position: 'absolute',
              width: '0.15em', height: '0.15em',
              borderRadius: '50%',
              background: '#B8412E',
              boxShadow: '0 2px 6px rgba(184, 65, 46, 0.25)',
              transformOrigin: 'bottom center',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />

          {chars.map((char, index) => {
            const isSpace = char === " ";
            const isI     = char.toLowerCase() === "i" && index === 8;

            return (
              <span
                key={index}
                ref={el => {
                  letterRefs.current[index] = el;
                  if (isI) dotlessIRef.current = el;
                }}
                className="preloader-char"
                style={{
                  color: '#1B1B17',
                  display: 'inline-block',
                  whiteSpace: isSpace ? 'pre' : 'normal',
                  transformStyle: 'preserve-3d',
                  position: 'relative',
                }}
              >
                {isI ? "ı" : char}
              </span>
            );
          })}
        </div>

        <div
          ref={lineRef}
          style={{
            width: '100%', maxWidth: '480px', height: '1px',
            background: 'var(--ink, #1B1B17)',
            opacity: 0.35, marginTop: '-10px'
          }}
        />
      </div>

      {/* Footer metadata */}
      <div style={{
        position: 'absolute', bottom: '8%', left: '6%', right: '6%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px dashed rgba(27,27,23,0.15)', paddingTop: '12px'
      }}>
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '9px', letterSpacing: '0.08em', color: '#1B1B17', opacity: 0.4 }}>SYS.LOAD // STABLE_ENV</span>
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '9px', letterSpacing: '0.08em', color: '#1B1B17', opacity: 0.4 }}>THE DRAWING BOARD © 2026</span>
      </div>
    </div>
  );
}
