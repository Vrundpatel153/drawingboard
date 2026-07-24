import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const wordRef = useRef(null);
  const ballRef = useRef(null);
  const letterRefs = useRef([]);
  const dotlessIRef = useRef(null);
  const lineRef = useRef(null);

  const text = "The Drawing Board";
  const chars = text.split("");

  useEffect(() => {
    // 1. Initial hidden/scale positions
    gsap.set(ballRef.current, { opacity: 0, scale: 2.5 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center center' });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Luxury curtain exit animation - clean clipPath wipe
          gsap.to(containerRef.current, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 0.95,
            ease: "power4.inOut",
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });
        }
      });

      // Set initial clip-path
      gsap.set(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      });

      // 2. Animate letters entrance
      tl.fromTo(".preloader-char", 
        { opacity: 0, y: 45, rotateX: -80, skewX: 8 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0, 
          skewX: 0, 
          duration: 0.75, 
          stagger: 0.025, 
          ease: "power4.out" 
        }
      );

      // 3. Draw the architectural baseline under the text
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 0.7,
        ease: "power3.inOut"
      }, "-=0.45");

      // 4. Initialize the bouncing ball position dynamically
      tl.add(() => {
        const ball = ballRef.current;
        const targetElement = dotlessIRef.current;
        if (!ball || !targetElement) return;

        const parentRect = wordRef.current.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const lastLetterElement = letterRefs.current[letterRefs.current.length - 1];
        const lastLetterRect = lastLetterElement ? lastLetterElement.getBoundingClientRect() : targetRect;

        const ballRect = ball.getBoundingClientRect();
        const ballWidth = ballRect.width;

        // Position ball above and to the right of the last letter 'd'
        const startX = lastLetterRect.right - parentRect.left + 20 - (ballWidth / 2);
        const startY = lastLetterRect.top - parentRect.top - 140;

        gsap.set(ball, {
          left: 0,
          top: 0,
          x: startX,
          y: startY,
          opacity: 1,
          scale: 2.5, // Start large
        });
      });

      // 5. Bouncing and shrinking animation landing on the dot of 'i'
      tl.add(() => {
        const ball = ballRef.current;
        const targetElement = dotlessIRef.current;
        const parentRect = wordRef.current.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();

        const lastLetterElement = letterRefs.current[letterRefs.current.length - 1];
        const lastLetterRect = lastLetterElement ? lastLetterElement.getBoundingClientRect() : targetRect;

        const ballRect = ball.getBoundingClientRect();
        const ballWidth = ballRect.width;

        const startX = lastLetterRect.right - parentRect.left + 20 - (ballWidth / 2);
        const startY = lastLetterRect.top - parentRect.top - 140;

        // Exact coordinates to center the dot on the 'i'
        const finalX = (targetRect.left + targetRect.right) / 2 - parentRect.left - (ballWidth / 2);
        const finalY = targetRect.top - parentRect.top - (targetRect.height * 0.22);

        // Floor height for contact
        const bounceFloorY = targetRect.bottom - parentRect.top;

        const bounceTimeline = gsap.timeline();

        // Leftward linear move
        bounceTimeline.to(ball, {
          x: finalX,
          duration: 1.7,
          ease: "power1.out"
        });

        // Smooth shrink to exact target size (scale 1.0)
        bounceTimeline.to(ball, {
          scale: 1.0,
          duration: 1.5,
          ease: "power2.out"
        }, 0);

        // Bouncing vertical arcs
        bounceTimeline.to(ball, {
          y: bounceFloorY - (ballWidth * 0.5),
          duration: 0.35,
          ease: "power2.in"
        }, 0)
        // Bounce 1: high
        .to(ball, {
          y: startY + 50,
          duration: 0.28,
          ease: "power1.out"
        })
        .to(ball, {
          y: bounceFloorY - (ballWidth * 0.5),
          duration: 0.28,
          ease: "power2.in"
        })
        // Bounce 2: medium
        .to(ball, {
          y: startY + 85,
          duration: 0.22,
          ease: "power1.out"
        })
        .to(ball, {
          y: bounceFloorY - (ballWidth * 0.5),
          duration: 0.22,
          ease: "power2.in"
        })
        // Bounce 3: low arch to target 'i'
        .to(ball, {
          y: startY + 105,
          duration: 0.18,
          ease: "power1.out"
        })
        // Settle on the dotless 'i'
        .to(ball, {
          y: finalY,
          duration: 0.25,
          ease: "bounce.out"
        });

        // Squeeze on landing
        bounceTimeline.to(ball, {
          scaleY: 0.7,
          scaleX: 1.3,
          duration: 0.08,
          ease: "power1.out"
        })
        .to(ball, {
          scaleY: 1.0,
          scaleX: 1.0,
          duration: 0.12,
          ease: "power2.out"
        });

        // Little letter tap reaction
        bounceTimeline.to(targetElement, {
          y: 5,
          duration: 0.08,
          yoyo: true,
          repeat: 1
        }, "-=0.22");

      }, "+=0.1");

      // Warm glow transitions to Pine Green on completion
      tl.to(".preloader-char", {
        color: '#24463B',
        duration: 0.35,
        stagger: 0.015,
        ease: "power2.out"
      }, "+=0.15");

      tl.to({}, { duration: 0.4 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#EFEBE2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(27,27,23,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,27,23,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          pointerEvents: 'none'
        }}
      />

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
          {/* 2D bouncing ball dot (scales with parent font size via em) */}
          <div
            ref={ballRef}
            style={{
              position: 'absolute',
              width: '0.15em',
              height: '0.15em',
              borderRadius: '50%',
              background: '#B8412E',
              boxShadow: '0 2px 4px rgba(184, 65, 46, 0.2)',
              transformOrigin: 'bottom center',
              pointerEvents: 'none',
              zIndex: 10
            }}
          />

          {chars.map((char, index) => {
            const isSpace = char === " ";
            const isI = char.toLowerCase() === "i" && index === 8;

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
            width: '100%',
            maxWidth: '480px',
            height: '1px',
            background: 'var(--ink, #1B1B17)',
            opacity: 0.35,
            marginTop: '-10px'
          }}
        />
      </div>

      <div 
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '6%',
          right: '6%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px dashed rgba(27,27,23,0.15)',
          paddingTop: '12px'
        }}
      >
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '9px', letterSpacing: '0.08em', color: '#1B1B17', opacity: 0.4 }}>SYS.LOAD // STABLE_ENV</span>
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '9px', letterSpacing: '0.08em', color: '#1B1B17', opacity: 0.4 }}>THE DRAWING BOARD © 2026</span>
      </div>
    </div>
  );
}
