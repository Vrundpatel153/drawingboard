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
          gsap.to(containerRef.current, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 0.95,
            ease: "power4.inOut",
            onComplete: () => { if (onComplete) onComplete(); }
          });
        }
      });

      gsap.set(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      });

      // ── 1. Letters slide up into view ────────────────────────────────────
      tl.fromTo(".preloader-char",
        { opacity: 0, y: 45, rotateX: -80, skewX: 8 },
        { opacity: 1, y: 0, rotateX: 0, skewX: 0,
          duration: 0.75, stagger: 0.025, ease: "power4.out" }
      );

      // ── 2. Baseline rule draws in ────────────────────────────────────────
      tl.to(lineRef.current, { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, "-=0.45");

      // ── 3. Position ball directly above the 'i', then drop it ───────────
      tl.add(() => {
        const ball      = ballRef.current;
        const targetEl  = dotlessIRef.current;
        if (!ball || !targetEl) return;

        const parentRect = wordRef.current.getBoundingClientRect();
        const fontSize   = parseFloat(getComputedStyle(wordRef.current).fontSize);

        // Range API → true ink bounding box of the glyph (not the line-height box)
        let charRect;
        try {
          const range = document.createRange();
          range.selectNodeContents(targetEl);
          charRect = range.getBoundingClientRect();
        } catch (_) {
          charRect = targetEl.getBoundingClientRect();
        }

        // Ball pixel size (0.15em rendered)
        const ballSize = ball.getBoundingClientRect().width || fontSize * 0.15;

        // ── Final resting position ───────────────────────────────────────
        // X: horizontally centred over the 'i' glyph
        const landX = (charRect.left + charRect.right) / 2 - parentRect.left - ballSize / 2;

        // Y: ball sits exactly on the glyph TOP area.
        // Since charRect.top is at the font's ascender/cap-height level,
        // subtracting a full ballSize makes it hover too high.
        // We bring it down to sit naturally where the dot of 'i' belongs.
        const landY = charRect.top - parentRect.top - ballSize * 0.1;

        // ── Starting position: same X, high above ───────────────────────
        const dropHeight = fontSize * 3.5;
        const startY     = landY - dropHeight;

        // Place ball at start
        gsap.set(ball, {
          left: 0, top: 0,
          x: landX,
          y: startY,
          opacity: 1,
          scale: 1,
        });

        // ── Drop straight down then bounce AT the landing spot ───────────
        // Bounces go UP from the landing position — the ball never goes below it.
        gsap.timeline()
          // Fall to the dot position
          .to(ball, { y: landY, duration: 0.55, ease: "power3.in" })
          // Squish on first landing
          .to(ball, { scaleY: 0.6, scaleX: 1.4, duration: 0.07, ease: "power1.out" })
          .to(ball, { scaleY: 1.0, scaleX: 1.0, duration: 0.10, ease: "power2.out" })
          // Bounce 1 — high
          .to(ball, { y: landY - fontSize * 0.55, duration: 0.25, ease: "power2.out" })
          .to(ball, { y: landY, duration: 0.20, ease: "power2.in" })
          .to(ball, { scaleY: 0.75, scaleX: 1.25, duration: 0.06, ease: "power1.out" })
          .to(ball, { scaleY: 1.0,  scaleX: 1.0,  duration: 0.08, ease: "power2.out" })
          // Bounce 2 — medium
          .to(ball, { y: landY - fontSize * 0.22, duration: 0.18, ease: "power2.out" })
          .to(ball, { y: landY, duration: 0.14, ease: "power2.in" })
          .to(ball, { scaleY: 0.85, scaleX: 1.15, duration: 0.05, ease: "power1.out" })
          .to(ball, { scaleY: 1.0,  scaleX: 1.0,  duration: 0.07, ease: "power2.out" })
          // Bounce 3 — small settle
          .to(ball, { y: landY - fontSize * 0.07, duration: 0.10, ease: "power2.out" })
          .to(ball, { y: landY, duration: 0.09, ease: "power2.in" })
          // Tiny tap on the letter
          .to(targetEl, { y: 3, duration: 0.06, yoyo: true, repeat: 1 }, "-=0.09");
      });

      // ── 4. Colour shifts to pine green after ball settles (~1.35s drop+bounces) ──
      tl.to(".preloader-char", {
        color: '#24463B',
        duration: 0.35,
        stagger: 0.015,
        ease: "power2.out"
      }, "+=1.4");

      // ── 5. Brief pause so the settled ball is visible before exit ────────
      tl.to({}, { duration: 0.55 });
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
          {/* Ball — positioned inside wordRef, animates via x/y transforms */}
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
