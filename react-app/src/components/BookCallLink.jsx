import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CAL_COM_URL = 'https://cal.com/dandelion-nrvrze';

/**
 * BookCallLink — reusable wrapper for Cal.com booking buttons.
 * Opens Cal.com in a new tab and navigates current tab to /thank-you.
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
    window.open(href, '_blank', 'noopener,noreferrer');
    navigate('/thank-you');
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
