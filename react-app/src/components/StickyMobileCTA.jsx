import React from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon';

export default function StickyMobileCTA({ title = "The Drawing Board", subtitle = "Now Booking Q3 Sprints", buttonText = "Get Started", link = "/contact" }) {
  const cleanBtnText = (buttonText || '').replace(/[→&rarr;->]/g, '').trim();

  return (
    <div className="sticky-cta">
      <div className="txt">
        <b>{title}</b>
        <span>{subtitle}</span>
      </div>
      <Link to={link}>
        {cleanBtnText} <ArrowIcon size={13} />
      </Link>
    </div>
  );
}

