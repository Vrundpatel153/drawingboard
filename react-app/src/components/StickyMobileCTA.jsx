import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowIcon from './ArrowIcon';
import { WHATSAPP_URL } from '../utils/siteConfig';

export default function StickyMobileCTA({ title = "The Drawing Board", subtitle = "Now Booking Q3 Sprints", buttonText = "WhatsApp Us", link = WHATSAPP_URL }) {
  const cleanBtnText = (buttonText || '').replace(/[→&rarr;->]/g, '').trim();
  const isExternal = link?.startsWith('http');
  const isWhatsApp = link?.includes('wa.me') || link?.includes('whatsapp');
  const navigate = useNavigate();

  const handleWAClick = (e) => {
    e.preventDefault();
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
    navigate('/thank-you');
  };

  const handleCtaBtnClick = (e) => {
    if (isWhatsApp) {
      e.preventDefault();
      window.open(link, '_blank', 'noopener,noreferrer');
      navigate('/thank-you');
    }
  };

  return (
    <div className="sticky-cta">
      <div className="txt">
        <b>{title}</b>
        <span>{subtitle}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {/* WhatsApp icon button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact on WhatsApp"
          className="wa-btn"
          onClick={handleWAClick}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '34px',
            height: '34px',
            minWidth: '34px',
            backgroundColor: '#25D366',
            borderRadius: '4px',
            color: '#ffffff',
            flexShrink: 0,
            padding: 0,
            textDecoration: 'none'
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff" style={{ width: '20px', height: '20px', display: 'block', fill: '#ffffff' }}>
            <path
              fill="#ffffff"
              d="M12.031 2C6.49 2 2 6.491 2 12.029c0 1.947.558 3.766 1.523 5.308L2 22l4.823-1.46c1.512.923 3.284 1.455 5.208 1.455C17.57 22 22 17.509 22 11.97 21.999 6.491 17.57 2 12.031 2zm0 18.064c-1.745 0-3.353-.489-4.717-1.332l-.337-.21-2.817.852.868-2.656-.23-.368c-.923-1.472-1.442-3.21-1.442-5.08 0-4.992 4.062-9.052 9.06-9.052 4.998 0 9.057 4.06 9.057 9.052.001 4.997-4.06 9.058-9.042 9.058zm5.086-6.666c-.28-.14-1.649-.813-1.903-.906-.254-.093-.44-.14-.627.14-.187.28-.722.906-.886 1.093-.163.186-.328.21-.608.07-.28-.14-1.18-.435-2.247-1.385-.83-.74-1.39-1.656-1.553-1.936-.163-.28-.018-.431.122-.571.127-.126.28-.327.42-.49.14-.163.187-.28.28-.466.094-.187.047-.35-.024-.49-.07-.14-.627-1.508-.859-2.07-.226-.543-.456-.468-.627-.477-.163-.008-.35-.01-.537-.01-.187 0-.49.07-.747.35-.257.28-1.028.98-1.028 2.392s1.028 2.776 1.17 2.964c.14.186 2.019 3.084 4.89 4.324.683.295 1.218.47 1.633.602.686.218 1.31.187 1.803.114.549-.08 1.65-.675 1.884-1.326.234-.65.234-1.21.164-1.325-.07-.116-.257-.186-.537-.326z"
            />
          </svg>
        </a>
        {/* Main CTA button */}
        {isExternal ? (
          <a href={link} target="_blank" rel="noopener noreferrer" onClick={handleCtaBtnClick}>
            {cleanBtnText} <ArrowIcon size={12} />
          </a>
        ) : (
          <Link to={link}>
            {cleanBtnText} <ArrowIcon size={12} />
          </Link>
        )}
      </div>
    </div>
  );
}
