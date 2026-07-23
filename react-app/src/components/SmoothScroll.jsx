import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────
   Lenis smooth scroll — re-initializes on each route change.
   Scroll-to-top is delayed to sync with the page transition animation
   (transition peak is ~600ms in, when the viewport is completely covered).
───────────────────────────────────────────────────────────────────────── */
export default function SmoothScroll({ children }) {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Feed Lenis into GSAP ticker for ScrollTrigger sync
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Delayed scroll-to-top to match the transition cover peak (~600ms)
    // This prevents the old page content from jumping before it is covered
    const scrollTimeout = setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }, 600);

    // Refresh ScrollTrigger after content settles
    // Delay matches transition exit phase (~1.2s total animation)
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 1200);

    return () => {
      clearTimeout(scrollTimeout);
      clearTimeout(refreshTimeout);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [location.pathname]);

  return children;
}
