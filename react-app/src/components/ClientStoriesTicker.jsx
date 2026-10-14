import React from 'react';
import { clientTestimonials } from '../data/clientTestimonials';

export default function ClientStoriesTicker() {
  // Duplicate testimonials array for an infinite loop with zero seam
  const tickerItems = [...clientTestimonials, ...clientTestimonials];

  return (
    <div className="client-stories-container">
      <style>{`
        .client-stories-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 12px 0;
          mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
        }

        .client-stories-track {
          display: flex;
          gap: 18px;
          width: max-content;
          animation: client-stories-scroll 50s linear infinite;
        }

        .client-stories-container:hover .client-stories-track {
          animation-play-state: paused;
        }

        @keyframes client-stories-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* ── Image Card ── */
        .client-story-img-card {
          position: relative;
          width: clamp(190px, 18vw, 225px);
          height: 330px;
          flex-shrink: 0;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #1A1A17;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }

        .client-story-img-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          display: block;
          transition: transform 0.4s ease;
        }

        .client-story-img-card:hover img {
          transform: scale(1.03);
        }

        .client-story-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 50%, rgba(12, 12, 10, 0.92) 100%);
          pointer-events: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 14px;
          box-sizing: border-box;
        }

        .client-story-img-badge {
          align-self: flex-end;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.04em;
          color: #7FB89F;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 4px 8px;
          border-radius: 999px;
        }

        .client-story-img-caption {
          color: #fff;
        }

        .client-story-img-name {
          font-family: 'Fraunces', serif;
          font-size: 14px;
          font-weight: 600;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.25;
        }

        .client-story-img-role {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 11px;
          color: #B5B0A1;
          margin-top: 2px;
          line-height: 1.2;
        }

        /* ── Quote Card ── */
        .client-story-quote-card {
          width: clamp(280px, 26vw, 340px);
          height: 330px;
          flex-shrink: 0;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #1D1D19;
          padding: 24px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          transition: border-color 0.25s ease, transform 0.25s ease;
        }

        .client-story-quote-card:hover {
          border-color: rgba(255, 255, 255, 0.24);
          transform: translateY(-2px);
        }

        .client-story-quote-top {
          display: flex;
          flex-direction: column;
        }

        .client-story-quote-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .client-story-stars {
          color: #E5A93C;
          font-size: 13px;
          letter-spacing: 2px;
        }

        .client-story-verified {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9.5px;
          letter-spacing: 0.05em;
          color: #7FB89F;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .client-story-verified::before {
          content: '';
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #7FB89F;
        }

        .client-story-quote-text {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 13.5px;
          line-height: 1.6;
          color: #E2DDD2;
          margin: 0;
          font-style: normal;
          display: -webkit-box;
          -webkit-line-clamp: 7;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .client-story-quote-foot {
          border-top: 1px dashed rgba(255, 255, 255, 0.12);
          padding-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .client-story-quote-author {
          font-family: 'Fraunces', serif;
          font-size: 14.5px;
          font-weight: 600;
          color: #FFFFFF;
          margin: 0;
        }

        .client-story-quote-role {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 11.5px;
          color: #9E9886;
          margin-top: 2px;
        }

        .client-story-quote-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          color: #7FB89F;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: rgba(127, 184, 159, 0.08);
          border: 1px solid rgba(127, 184, 159, 0.2);
          padding: 3px 8px;
          border-radius: 4px;
        }

        /* ── Responsive Mobile Sizing ── */
        @media (max-width: 640px) {
          .client-story-img-card {
            width: 170px;
            height: 290px;
          }
          .client-story-quote-card {
            width: 260px;
            height: 290px;
            padding: 18px;
          }
          .client-story-quote-text {
            font-size: 12.5px;
            line-height: 1.5;
            -webkit-line-clamp: 6;
          }
          .client-story-img-name {
            font-size: 13px;
          }
          .client-story-quote-author {
            font-size: 13.5px;
          }
        }
      `}</style>

      <div className="client-stories-track" aria-label="Auto scrolling client stories and testimonials">
        {tickerItems.map((item, idx) => (
          <React.Fragment key={`${item.id}-${idx}`}>
            {/* 1. Founder Photo Card */}
            <div className="client-story-img-card">
              <img
                src={item.image}
                alt={`${item.name} — ${item.role}`}
                loading="lazy"
              />
              <div className="client-story-img-overlay">
                <span className="client-story-img-badge">{item.badge}</span>
                <div className="client-story-img-caption">
                  <h4 className="client-story-img-name">{item.name}</h4>
                  <p className="client-story-img-role">{item.role}</p>
                </div>
              </div>
            </div>

            {/* 2. Founder Quote Description Card */}
            <div className="client-story-quote-card">
              <div className="client-story-quote-top">
                <div className="client-story-quote-meta">
                  <div className="client-story-stars">★★★★★</div>
                  <div className="client-story-verified">VERIFIED CLIENT</div>
                </div>
                <p className="client-story-quote-text">“{item.quote}”</p>
              </div>

              <div className="client-story-quote-foot">
                <div>
                  <h5 className="client-story-quote-author">{item.name}</h5>
                  <p className="client-story-quote-role">{item.role}</p>
                </div>
                <span className="client-story-quote-tag">THE DRAWING BOARD</span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
