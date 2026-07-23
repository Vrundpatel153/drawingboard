import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * usePageAnimations — scroll-reveal + entrance animations scoped to a container ref.
 * Pass a ref pointing to the page wrapper div.
 */
export function usePageAnimations(containerRef) {
  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      /* ── 1. Hero titles (immediate, no scroll trigger) ── */
      el.querySelectorAll('.hero h1, .hero-lite h1, .case-hero h1').forEach((h) => {
        gsap.fromTo(h,
          { opacity: 0, y: 36, skewY: 0.8 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: 'power3.out' }
        );
      });

      el.querySelectorAll('.hero-sub, .case-hero .dek, .hero-lite > .wrap > p').forEach((p, i) => {
        gsap.fromTo(p,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75, delay: 0.15 + i * 0.07, ease: 'power2.out' }
        );
      });

      el.querySelectorAll('.sheet-label').forEach((sl) => {
        gsap.fromTo(sl,
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out' }
        );
      });

      el.querySelectorAll('.cta-row').forEach((row) => {
        gsap.fromTo(row,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.65, delay: 0.28, ease: 'power2.out' }
        );
      });

      /* ── 2. Section heads on scroll ── */
      el.querySelectorAll('.section-head').forEach((sh) => {
        gsap.fromTo(sh,
          { opacity: 0, y: 26 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: sh, start: 'top 88%', toggleActions: 'play none none none' }
          }
        );
      });

      /* ── 3. Card grid children — stagger cascade ── */
      ['.proof-grid', '.case-grid', '.article-grid', '.team-grid', '.values-grid'].forEach((sel) => {
        el.querySelectorAll(sel).forEach((grid) => {
          gsap.fromTo(Array.from(grid.children),
            { opacity: 0, y: 38 },
            {
              opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
              scrollTrigger: { trigger: grid, start: 'top 87%', toggleActions: 'play none none none' }
            }
          );
        });
      });

      /* ── 4. Deliverables grid ── */
      el.querySelectorAll('.deliv-grid').forEach((grid) => {
        gsap.fromTo(Array.from(grid.children),
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });

      /* ── 5. Problem grid ── */
      el.querySelectorAll('.problem-grid').forEach((grid) => {
        gsap.fromTo(Array.from(grid.children),
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: grid, start: 'top 86%', toggleActions: 'play none none none' }
          }
        );
      });

      /* ── 6. Process steps ── */
      el.querySelectorAll('.process').forEach((proc) => {
        gsap.fromTo(proc.querySelectorAll('.pstep'),
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.55, stagger: 0.09, ease: 'power2.out',
            scrollTrigger: { trigger: proc, start: 'top 86%', toggleActions: 'play none none none' }
          }
        );
      });

      /* ── 7. Stat strip ── */
      el.querySelectorAll('.stat').forEach((stat, i) => {
        gsap.fromTo(stat,
          { opacity: 0, scale: 0.88, y: 14 },
          {
            opacity: 1, scale: 1, y: 0, duration: 0.6, delay: i * 0.06, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: stat, start: 'top 91%', toggleActions: 'play none none none' }
          }
        );
      });

      /* ── 8. Cards & blocks ── */
      el.querySelectorAll('.annot-card, .insight-card, .guarantee, .contact-form, .info-card, .spec-grid').forEach((el2) => {
        gsap.fromTo(el2,
          { opacity: 0, y: 26 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el2, start: 'top 88%', toggleActions: 'play none none none' }
          }
        );
      });

      /* ── 9. Gallery shots ── */
      el.querySelectorAll('.gallery').forEach((gal) => {
        gsap.fromTo(gal.querySelectorAll('.shot'),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: 'power2.out',
            scrollTrigger: { trigger: gal, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });

      /* ── 10. Roster grid ── */
      el.querySelectorAll('.roster-grid').forEach((grid) => {
        gsap.fromTo(grid.querySelectorAll('.roster-item'),
          { opacity: 0, scale: 0.93 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: grid, start: 'top 87%', toggleActions: 'play none none none' }
          }
        );
      });

      /* ── 11. FAQ items ── */
      el.querySelectorAll('.faq-item').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: 18 },
          {
            opacity: 1, x: 0, duration: 0.48, delay: i * 0.04, ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 91%', toggleActions: 'play none none none' }
          }
        );
      });

      /* ── 12. Meta strip cells ── */
      el.querySelectorAll('.meta-strip').forEach((strip) => {
        gsap.fromTo(strip.querySelectorAll('.meta-cell'),
          { opacity: 0, y: 18 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: strip, start: 'top 91%', toggleActions: 'play none none none' }
          }
        );
      });

      /* ── 13. Final CTA section ── */
      el.querySelectorAll('.final h2, .final p, .final a').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, delay: i * 0.09, ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' }
          }
        );
      });

    }, el);

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);
}
