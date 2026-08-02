import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────
   Lenis smooth scroll — optimized for 60fps/120Hz hardware performance.
   Provides buttery smooth inertia scrolling on desktop PC layout.
───────────────────────────────────────────────────────────────────────── */
export default function SmoothScroll({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Detect touch capability or mobile screen
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 768;

    const lenis = new Lenis({
      duration: isTouch ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: !isTouch,
      wheelMultiplier: 1.0,
      syncTouch: false,
      smoothTouch: false,
      touchMultiplier: 0,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let reqId;
    function update(time) {
      lenis.raf(time);
      reqId = requestAnimationFrame(update);
    }
    reqId = requestAnimationFrame(update);

    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimeout);
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, [location.pathname]);

  return children;
}
