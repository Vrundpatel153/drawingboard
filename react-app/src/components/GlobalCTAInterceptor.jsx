import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  trackMetaWhatsAppClick,
  trackMetaCalComClick,
  trackMetaEmailClick,
  trackMetaPhoneClick
} from '../utils/metaEvents';

/**
 * GlobalCTAInterceptor
 * Intercepts any click on WhatsApp, Cal.com, Email (mailto:), or Phone (tel:) links across the entire website.
 * 1. Dispatches Meta Conversions API (CAPI Graph API v19.0) & Meta Browser Pixel (fbq) events with deduplicated eventIDs.
 * 2. Automatically navigates current tab to /thank-you for Cal.com & WhatsApp leads.
 * 3. Opens external window or handles action seamlessly.
 */
export default function GlobalCTAInterceptor() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a, button');
      if (!anchor) return;

      const rawHref =
        anchor.getAttribute('href') ||
        anchor.href ||
        anchor.getAttribute('data-href') ||
        anchor.getAttribute('data-url') ||
        '';

      if (!rawHref) return;

      const isCal  = rawHref.includes('cal.com');
      const isWA   = rawHref.includes('wa.me') || rawHref.includes('whatsapp.com') || rawHref.includes('api.whatsapp.com');
      const isMail = rawHref.startsWith('mailto:');
      const isTel  = rawHref.startsWith('tel:');

      if (isCal || isWA || isMail || isTel) {
        const buttonText = anchor.textContent?.trim() || (
          isCal ? 'Book a Call' :
          isWA ? 'WhatsApp Us' :
          isMail ? 'Email Us' : 'Call Us'
        );

        const details = {
          buttonText,
          targetUrl: rawHref,
          page: window.location.pathname
        };

        // 1. Fire Meta Conversions API + Pixel Events with Deduplication
        if (isCal) {
          trackMetaCalComClick(details);
          e.preventDefault();
          e.stopPropagation();
          navigate('/thank-you');
          setTimeout(() => {
            window.open(rawHref, '_blank', 'noopener,noreferrer');
          }, 10);
        } else if (isWA) {
          trackMetaWhatsAppClick(details);
          e.preventDefault();
          e.stopPropagation();
          navigate('/thank-you');
          setTimeout(() => {
            window.open(rawHref, '_blank', 'noopener,noreferrer');
          }, 10);
        } else if (isMail) {
          trackMetaEmailClick(details);
          // Let default mailto action trigger or open mail client
        } else if (isTel) {
          trackMetaPhoneClick(details);
          // Let default tel action trigger or initiate call
        }
      }
    };

    // Listen on document at capture phase so no sub-elements can cancel it
    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => document.removeEventListener('click', handleGlobalClick, { capture: true });
  }, [navigate]);

  return null;
}
