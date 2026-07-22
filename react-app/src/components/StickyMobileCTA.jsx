import React from 'react';
import { Link } from 'react-router-dom';

export default function StickyMobileCTA({ title = "The Drawing Board", subtitle = "Now Booking Q3 Sprints", buttonText = "Get Started →", link = "/contact" }) {
  return (
    <div className="sticky-cta">
      <div className="txt">
        <b>{title}</b>
        <span>{subtitle}</span>
      </div>
      <Link to={link}>{buttonText}</Link>
    </div>
  );
}
