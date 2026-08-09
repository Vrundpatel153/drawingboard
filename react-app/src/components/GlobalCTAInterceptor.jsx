import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * GlobalCTAInterceptor
 * Intercepts any click on WhatsApp or Cal.com links across the entire website.
 * Automatically navigates the current tab to /thank-you immediately,
 * while launching the external WhatsApp chat or Cal.com scheduling window in a new tab.
 */
export default function GlobalCTAInterceptor() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const rawHref = anchor.getAttribute('href') || anchor.href || '';
      if (!rawHref) return;

      const isCal = rawHref.includes('cal.com');
      const isWA  = rawHref.includes('wa.me') || rawHref.includes('whatsapp.com');

      if (isCal || isWA) {
        // Intercept click event
        e.preventDefault();
        e.stopPropagation();

        // 1. Navigate current tab to /thank-you immediately
        navigate('/thank-you');

        // 2. Open external Cal.com or WhatsApp window in new tab
        setTimeout(() => {
          window.open(rawHref, '_blank', 'noopener,noreferrer');
        }, 10);
      }
    };

    // Listen on document at capture phase so no sub-elements can cancel it
    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => document.removeEventListener('click', handleGlobalClick, { capture: true });
  }, [navigate]);

  return null;
}
