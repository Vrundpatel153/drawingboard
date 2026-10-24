import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  trackDiscussProjectClick,
  trackGetQuoteClick,
  trackMetaWhatsAppClick,
  trackMetaCalComClick,
  trackMetaEmailClick,
  trackMetaPhoneClick
} from '../utils/metaEvents';

/**
 * GlobalCTAInterceptor
 * Intercepts any click on:
 * - "Discuss Your Project" buttons
 * - "Get Quote" / "Get a Quote" buttons
 * - Cal.com scheduling links
 * - WhatsApp consultation links
 * - Direct Email (mailto:) and Phone (tel:) links
 *
 * Actions triggered:
 * 1. Meta Browser Pixel (fbq) tracking with standard 'Contact' & 'Schedule' engagement events (never unsubmitted Lead).
 * 2. Meta Conversions API (Graph API v19.0) with deduplicated eventIDs & rich user matching data.
 * 3. Google Tag Manager (GTM) dataLayer push with engagement tracking.
 * 4. Google Analytics 4 (gtag) 'contact_click' / 'schedule_click' events (leaving 'generate_lead' strictly for form submissions).
 */
export default function GlobalCTAInterceptor() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a, button, [role="button"]');
      if (!anchor) return;

      const rawHref =
        anchor.getAttribute('href') ||
        anchor.href ||
        anchor.getAttribute('data-href') ||
        anchor.getAttribute('data-url') ||
        '';

      const buttonText = (anchor.textContent || '').trim().replace(/\s+/g, ' ');
      const lowerText = buttonText.toLowerCase();
      const ctaData = (anchor.getAttribute('data-cta') || '').toLowerCase();
      const elementId = (anchor.getAttribute('id') || '').toLowerCase();

      // Check intent
      const isDiscuss =
        ctaData.includes('discuss') ||
        elementId.includes('discuss') ||
        lowerText.includes('discuss your project') ||
        lowerText.includes('discuss the project') ||
        lowerText.includes('discuss this scope') ||
        lowerText.includes('discuss your website');

      const isQuote =
        ctaData.includes('quote') ||
        elementId.includes('quote') ||
        lowerText.includes('get quote') ||
        lowerText.includes('get a quote') ||
        lowerText.includes('request a quote');

      const isGoogleForm = rawHref.includes('docs.google.com/forms') || rawHref.includes('forms.gle');
      const isCal  = rawHref.includes('cal.com') || isGoogleForm;
      const isWA   = rawHref.includes('wa.me') || rawHref.includes('whatsapp.com') || rawHref.includes('api.whatsapp.com');
      const isMail = rawHref.startsWith('mailto:');
      const isTel  = rawHref.startsWith('tel:');

      // If this click matches any lead or conversion action
      if (isDiscuss || isQuote || isCal || isWA || isMail || isTel) {
        const details = {
          buttonText: buttonText || (
            isDiscuss ? 'Discuss Your Project' :
            isQuote ? 'Get Quote' :
            isCal ? (isGoogleForm ? 'Discuss Your Project' : 'Book a Call') :
            isWA ? 'WhatsApp Us' :
            isMail ? 'Email Us' : 'Call Us'
          ),
          targetUrl: rawHref,
          elementId: elementId || undefined,
          page: window.location.pathname
        };

        if (isDiscuss) {
          trackDiscussProjectClick(details);
        } else if (isQuote) {
          trackGetQuoteClick(details);
          // If it's a link to contact or brand-readiness, navigate smoothly
          if (rawHref.includes('/contact')) {
            e.preventDefault();
            e.stopPropagation();
            navigate('/contact');
            return;
          }
        } else if (isCal) {
          trackMetaCalComClick(details);
        } else if (isWA) {
          trackMetaWhatsAppClick(details);
        } else if (isMail) {
          trackMetaEmailClick(details);
        } else if (isTel) {
          trackMetaPhoneClick(details);
        }
      }
    };

    // Listen on document at capture phase so no child component cancels it
    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => document.removeEventListener('click', handleGlobalClick, { capture: true });
  }, [navigate]);

  return null;
}
