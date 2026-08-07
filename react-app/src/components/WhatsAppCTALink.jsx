import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WHATSAPP_URL } from '../utils/siteConfig';

/**
 * WhatsAppCTALink — wraps any WhatsApp CTA.
 * On click: opens WA in new tab AND navigates current tab to /thank-you.
 *
 * Props:
 *   className, style, children — passed through to the <a> tag
 *   href — optional override (default: WHATSAPP_URL from siteConfig)
 *   skipThankYou — if true, behaves like a normal external link (default: false)
 */
export default function WhatsAppCTALink({
  children,
  className,
  style,
  href,
  skipThankYou = false,
  ...rest
}) {
  const navigate = useNavigate();
  const waUrl = href || WHATSAPP_URL;

  const handleClick = (e) => {
    if (skipThankYou) return; // let default browser behavior handle it
    e.preventDefault();
    // Open WhatsApp in a new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    // Navigate current page to Thank You
    navigate('/thank-you');
  };

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}
