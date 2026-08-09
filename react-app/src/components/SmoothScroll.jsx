import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let globalLenis = null;

export function getLenis() {
  return globalLenis;
}

/* ─────────────────────────────────────────────────────────────────────────
   Lenis Smooth Scroll — 120Hz/60Hz Hardware Acceleration.
   Integrated synchronously with GSAP Ticker & ScrollTrigger.
───────────────────────────────────────────────────────────────────────── */
export default function SmoothScroll({ children }) {
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    // Singleton Lenis instance: prevents recreation / destroy lag on route change
    if (!globalLenis) {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        infinite: false,
      });

      globalLenis = lenis;
      window.__lenis = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      const tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    }

    lenisRef.current = globalLenis;

    // Instantly reset scroll to top on navigation
    window.scrollTo(0, 0);
    globalLenis.scrollTo(0, { immediate: true });

    // Refresh layout measurements after route transition
    const timer = setTimeout(() => {
      if (globalLenis) {
        globalLenis.resize();
        ScrollTrigger.refresh();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);

  return children;
}
