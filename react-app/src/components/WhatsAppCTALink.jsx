import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WHATSAPP_URL } from '../utils/siteConfig';
import { trackMetaWhatsAppClick } from '../utils/metaEvents';

/**
 * WhatsAppCTALink — wraps any WhatsApp CTA.
 * On click: triggers Meta Pixel & Conversions API (CAPI), navigates current tab to /thank-you, then opens WhatsApp in new tab.
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

  const handleClick = () => {
    trackMetaWhatsAppClick({
      buttonText: typeof children === 'string' ? children : 'WhatsApp Us',
      targetUrl: waUrl,
      page: window.location.pathname
    });
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
