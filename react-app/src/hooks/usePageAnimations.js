/**
 * useGSAPAnimations — Comprehensive animation hook
 * Handles all page-level GSAP ScrollTrigger animations
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger);

// Safely try to register SplitText (premium plugin fallback)
try { gsap.registerPlugin(SplitText); } catch {}

export function usePageAnimations() {
  const location = useLocation();

  useEffect(() => {
    // Small timeout to let DOM settle after route change
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // ── 1. Eyebrow labels ────────────────────────────────────────────
        gsap.utils.toArray('.eyebrow').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 10, letterSpacing: '0.3em' },
            {
              opacity: 1, y: 0, letterSpacing: '0.12em',
              duration: 0.7, ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 2. Section headings h2 / h3 ──────────────────────────────────
        gsap.utils.toArray('section h2, section h3').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0,
              duration: 0.85, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 3. Hero headings ─────────────────────────────────────────────
        gsap.utils.toArray('.hero h1, .hero-lite h1').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' },
            {
              opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)',
              duration: 1.1, ease: 'expo.out', delay: 0.15
            }
          );
        });

        // ── 4. Hero subtext ──────────────────────────────────────────────
        gsap.utils.toArray('.hero-sub, .hero p, .hero-lite > .wrap > p').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', delay: 0.35 }
          );
        });

        // ── 5. CTA row buttons ───────────────────────────────────────────
        gsap.utils.toArray('.cta-row .btn-primary, .cta-row .btn-link').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: 0.5 + i * 0.12 }
          );
        });

        // ── 6. Stat strip numbers ────────────────────────────────────────
        gsap.utils.toArray('.stat').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0,
              duration: 0.65, ease: 'power2.out',
              delay: i * 0.1,
              scrollTrigger: { trigger: el.closest('.stat-strip') || el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );

          // Animate the number counting
          const numEl = el.querySelector('.num');
          if (numEl) {
            const raw = numEl.textContent.replace(/[^0-9.]/g, '');
            const num = parseFloat(raw);
            if (!isNaN(num) && num > 0 && num < 10000) {
              gsap.fromTo({ val: 0 }, { val: num },
                {
                  duration: 1.5, ease: 'power2.out', delay: 0.3 + i * 0.1,
                  onUpdate: function () {
                    const prefix = numEl.textContent.match(/^[^0-9]*/)?.[0] || '';
                    const suffix = numEl.textContent.replace(/^[^0-9]*[\d.]+/, '') || '';
                    numEl.textContent = prefix + Math.round(this.targets()[0].val) + suffix;
                  },
                  scrollTrigger: { trigger: el.closest('.stat-strip') || el, start: 'top 88%', toggleActions: 'play none none none' }
                }
              );
            }
          }
        });

        // ── 7. Cards with stagger ─────────────────────────────────────────
        const cardGroups = [
          { selector: '.proof-grid .proof-card', stagger: 0.12 },
          { selector: '.case-grid .case-card', stagger: 0.1 },
          { selector: '.article-grid .article-card', stagger: 0.1 },
          { selector: '.values-grid .annot-card', stagger: 0.12 },
          { selector: '.deliv-grid .deliv-col', stagger: 0.1 },
          { selector: '.team-grid .team-card', stagger: 0.12 },
          { selector: '.problem-grid > *', stagger: 0.15 },
        ];

        cardGroups.forEach(({ selector, stagger }) => {
          const cards = gsap.utils.toArray(selector);
          if (!cards.length) return;
          gsap.fromTo(cards,
            { opacity: 0, y: 32 },
            {
              opacity: 1, y: 0,
              duration: 0.75, ease: 'power2.out',
              stagger,
              scrollTrigger: { trigger: cards[0], start: 'top 90%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 8. Process steps horizontal stagger ───────────────────────────
        gsap.utils.toArray('.pstep').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, x: -20 },
            {
              opacity: 1, x: 0,
              duration: 0.65, ease: 'power2.out',
              delay: i * 0.13,
              scrollTrigger: { trigger: el.closest('.process') || el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 9. Section-head ───────────────────────────────────────────────
        gsap.utils.toArray('.section-head').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 24 },
            {
              opacity: 1, y: 0,
              duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 10. Annot card metric rows ────────────────────────────────────
        gsap.utils.toArray('.annot-card .annot-row').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, x: 12 },
            {
              opacity: 1, x: 0,
              duration: 0.5, ease: 'power1.out',
              delay: 0.6 + i * 0.09,
              scrollTrigger: { trigger: el.closest('.annot-card') || el, start: 'top 85%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 11. Meta strip cells ──────────────────────────────────────────
        gsap.utils.toArray('.meta-strip .meta-cell').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0,
              duration: 0.6, ease: 'power2.out',
              delay: i * 0.08,
              scrollTrigger: { trigger: el.closest('.meta-strip') || el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 12. Gallery figures ───────────────────────────────────────────
        gsap.utils.toArray('.gallery figure, .gallery img').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, scale: 0.97 },
            {
              opacity: 1, scale: 1,
              duration: 0.85, ease: 'power2.out',
              delay: i * 0.08,
              scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 13. Spec grid / brand swatches ────────────────────────────────
        gsap.utils.toArray('.spec-grid > *, .swatch').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, scale: 0.92, y: 16 },
            {
              opacity: 1, scale: 1, y: 0,
              duration: 0.7, ease: 'back.out(1.4)',
              delay: i * 0.07,
              scrollTrigger: { trigger: el.closest('.spec-grid') || el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 14. Guarantee / badge ─────────────────────────────────────────
        gsap.utils.toArray('.guarantee').forEach((el) => {
          const badge = el.querySelector('.badge');
          const content = el.querySelectorAll('h3, p');
          if (badge) {
            gsap.fromTo(badge,
              { opacity: 0, scale: 0.8, rotation: -5 },
              {
                opacity: 1, scale: 1, rotation: 0,
                duration: 0.7, ease: 'back.out(1.7)',
                scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
              }
            );
          }
          if (content.length) {
            gsap.fromTo(content,
              { opacity: 0, x: 20 },
              {
                opacity: 1, x: 0,
                duration: 0.75, ease: 'power2.out',
                delay: 0.2, stagger: 0.1,
                scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
              }
            );
          }
        });

        // ── 15. FAQ items ─────────────────────────────────────────────────
        gsap.utils.toArray('.faq-item').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, x: -16 },
            {
              opacity: 1, x: 0,
              duration: 0.55, ease: 'power2.out',
              delay: i * 0.08,
              scrollTrigger: { trigger: el.closest('section') || el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 16. Quick links ───────────────────────────────────────────────
        gsap.utils.toArray('.quick-link').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, x: 16 },
            {
              opacity: 1, x: 0,
              duration: 0.5, ease: 'power2.out',
              delay: i * 0.1,
              scrollTrigger: { trigger: el.closest('.quick-links') || el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 17. Contact form ──────────────────────────────────────────────
        gsap.utils.toArray('.contact-form').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0,
              duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 18. Info card ─────────────────────────────────────────────────
        gsap.utils.toArray('.info-card').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0,
              duration: 0.75, ease: 'power2.out',
              delay: 0.2,
              scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 19. Roster grid items ─────────────────────────────────────────
        gsap.utils.toArray('.roster-grid .roster-item').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1, scale: 1,
              duration: 0.5, ease: 'power2.out',
              delay: i * 0.06,
              scrollTrigger: { trigger: el.closest('.roster-grid') || el, start: 'top 90%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 20. Final section CTA ─────────────────────────────────────────
        gsap.utils.toArray('.final').forEach((el) => {
          const children = el.querySelectorAll('h2, p, a, button');
          gsap.fromTo(children,
            { opacity: 0, y: 28 },
            {
              opacity: 1, y: 0,
              duration: 0.8, ease: 'power2.out',
              stagger: 0.15,
              scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 21. Marquee logos entrance ────────────────────────────────────
        gsap.utils.toArray('.marquee-section').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0 },
            {
              opacity: 1, duration: 0.9, ease: 'power1.out',
              scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 22. Sheet label ───────────────────────────────────────────────
        gsap.utils.toArray('.sheet-label').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, scaleX: 0, transformOrigin: 'left' },
            { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.inOut', delay: 0.05 }
          );
        });

        // ── 23. Blog/Work detail hero dek ────────────────────────────────
        gsap.utils.toArray('.dek, .blog-body > p:first-child').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', delay: 0.45 }
          );
        });

        // ── 24. Execution grid items ──────────────────────────────────────
        gsap.utils.toArray('.exec-grid > *').forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, y: 24 },
            {
              opacity: 1, y: 0,
              duration: 0.65, ease: 'power2.out',
              delay: i * 0.09,
              scrollTrigger: { trigger: el.closest('.exec-grid') || el, start: 'top 88%', toggleActions: 'play none none none' }
            }
          );
        });

        // ── 25. Parallax hero image (light) ──────────────────────────────
        gsap.utils.toArray('.hero-img-wrap img, .spotlight-img-box img').forEach((el) => {
          gsap.to(el, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section') || el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            }
          });
        });

      });

      return () => {
        ctx.revert();
      };
    }, 120);

    return () => clearTimeout(timer);
  }, [location.pathname]);
}
