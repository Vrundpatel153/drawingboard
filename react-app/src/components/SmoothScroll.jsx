/**
 * SmoothScroll — Global Lenis + GSAP ScrollTrigger provider
 * Handles: Lenis smooth scroll, page transitions, viewport animations
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePageAnimations } from '../hooks/usePageAnimations';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const location = useLocation();
  const lenisRef = useRef(null);
  const transitionRef = useRef(null);

  // Mount Lenis once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // On route change: scroll to top + page transition
  useEffect(() => {
    if (!lenisRef.current) return;

    // Scroll to top immediately
    lenisRef.current.scrollTo(0, { immediate: true });

    // Kill all existing ScrollTriggers on route change
    ScrollTrigger.getAll().forEach((st) => st.kill());

    // Page entrance animation
    const wrapper = document.querySelector('#page-wrapper');
    if (wrapper) {
      gsap.fromTo(
        wrapper,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
        }
      );
    }
  }, [location.pathname]);

  // Run page-level scroll animations
  usePageAnimations();

  return children;
}
