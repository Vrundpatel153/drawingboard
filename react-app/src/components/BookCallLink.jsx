import React from 'react';
import { useNavigate } from 'react-router-dom';
import { trackMetaCalComClick } from '../utils/metaEvents';

export const CAL_COM_URL = 'https://cal.com/dandelion-nrvrze';

/**
 * BookCallLink — reusable wrapper for Cal.com booking buttons.
 * On click: triggers Meta Pixel & Conversions API (CAPI), navigates current tab to /thank-you, then opens Cal.com in a new tab.
 */
export default function BookCallLink({
  children,
  className,
  style,
  href = CAL_COM_URL,
  ...rest
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    // 1. Dispatch Meta Conversions API + Pixel tracking
    trackMetaCalComClick({
      buttonText: typeof children === 'string' ? children : 'Book a Call',
      targetUrl: href,
      page: window.location.pathname
    });

    // 2. Navigate current tab to /thank-you immediately
    navigate('/thank-you');

    // 3. Open Cal.com in new tab / app
    setTimeout(() => {
      window.open(href, '_blank', 'noopener,noreferrer');
    }, 20);
  };

  return (
    <a
      href={href}
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
