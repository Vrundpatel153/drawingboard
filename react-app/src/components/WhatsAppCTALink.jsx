import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WHATSAPP_URL } from '../utils/siteConfig';

/**
 * WhatsAppCTALink — wraps any WhatsApp CTA.
 * On click: navigates current tab to /thank-you, then opens WhatsApp in new tab.
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
    if (skipThankYou) return;
    e.preventDefault();
    // 1. Navigate current tab to /thank-you immediately
    navigate('/thank-you');
    // 2. Open WhatsApp in new tab / app
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 20);
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
