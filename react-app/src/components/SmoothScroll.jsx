import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────
   Lenis smooth scroll — optimized for 60fps/120Hz performance.
   Disables touch hijacking on mobile/touch devices to use native GPU touch inertia.
───────────────────────────────────────────────────────────────────────── */
export default function SmoothScroll({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Detect touch capability or mobile screen
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 768;

    const lenis = new Lenis({
      duration: isTouch ? 0 : 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: !isTouch,
      wheelMultiplier: 0.9,
      syncTouch: false,
      smoothTouch: false,
      touchMultiplier: 0,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(500, 33);

    const scrollTimeout = setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }, 600);

    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 1000);

    return () => {
      clearTimeout(scrollTimeout);
      clearTimeout(refreshTimeout);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [location.pathname]);

  return children;
}
