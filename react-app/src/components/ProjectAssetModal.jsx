import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon';
import { SAAS_PROJECT_DETAILS } from '../data/saasProjectDetails';

export default function ProjectAssetModal({ project, isOpen, onClose, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialIndex]);

  const images = project?.images && project.images.length > 0
    ? project.images
    : (project?.coverImage ? [project.coverImage] : []);

  const total = images.length;

  const nextAsset = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevAsset = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextAsset();
      if (e.key === 'ArrowLeft') prevAsset();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, nextAsset, prevAsset]);

  if (!isOpen || !project || total === 0) return null;

  // Retrieve custom caption for the active image
  const projectSlug = (project.slug || '').replace(/^saas-/, '').toLowerCase();
  const detail = SAAS_PROJECT_DETAILS[projectSlug];
  const customCaption = detail?.captions && currentIndex < detail.captions.length
    ? detail.captions[currentIndex]
    : `${project.title} — System Asset Figure ${String(currentIndex + 1).padStart(2, '0')}`;

  const currentImage = images[currentIndex];
  const isVideo = typeof currentImage === 'string' && currentImage.match(/\.(mp4|webm|mov)$/i);

  const targetCaseStudy = `/work/saas-${projectSlug}`;

  return (
    <div
      className="project-asset-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Asset Gallery`}
    >
      <style>{`
        .project-asset-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 15, 12, 0.94);
          backdrop-filter: blur(8px);
          z-index: 99999;
          display: flex;
          flex-direction: column;
          color: #EFEBE2;
          font-family: 'Inter', sans-serif;
          animation: modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .pam-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          background: #141410;
        }

        .pam-meta-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .pam-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          color: #7FB89F;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .pam-title {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          color: #FAF8F3;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pam-count-badge {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: #EFEBE2;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 3px 8px;
          border-radius: 2px;
        }

        .pam-header-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .pam-cs-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: #24463B;
          color: #EFEBE2;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: background 0.15s ease;
        }

        .pam-cs-link:hover {
          background: #2f5c4d;
        }

        .pam-close-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #EFEBE2;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px;
          padding: 8px 14px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .pam-close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #FFF;
        }

        .pam-stage {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 20px 80px;
          overflow: hidden;
          min-height: 0;
        }

        .pam-main-media {
          max-width: 100%;
          max-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pam-main-media img,
        .pam-main-media video {
          max-width: 100%;
          max-height: calc(100vh - 250px);
          object-fit: contain;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .pam-nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(20, 20, 16, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFF;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 20px;
          transition: background 0.15s, border-color 0.15s;
          z-index: 10;
        }

        .pam-nav-arrow:hover {
          background: #24463B;
          border-color: #24463B;
        }

        .pam-nav-arrow.prev { left: 20px; }
        .pam-nav-arrow.next { right: 20px; }

        .pam-caption-bar {
          background: #141410;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 10px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .pam-caption-text {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: #D4CFC4;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pam-caption-counter {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: #7FB89F;
          font-weight: 600;
          white-space: nowrap;
        }

        .pam-thumbnails-strip {
          background: #0D0D0A;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 10px 20px;
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: thin;
        }

        .pam-thumb {
          flex: 0 0 68px;
          height: 48px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: #1C1C17;
          cursor: pointer;
          opacity: 0.55;
          overflow: hidden;
          padding: 0;
          transition: opacity 0.15s, border-color 0.15s;
        }

        .pam-thumb:hover {
          opacity: 0.85;
        }

        .pam-thumb.active {
          opacity: 1;
          border: 2px solid #7FB89F;
        }

        .pam-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 768px) {
          .pam-header { padding: 12px 16px; }
          .pam-title { font-size: 16px; }
          .pam-stage { padding: 10px 45px; }
          .pam-nav-arrow { width: 36px; height: 36px; font-size: 16px; }
          .pam-nav-arrow.prev { left: 6px; }
          .pam-nav-arrow.next { right: 6px; }
          .pam-caption-bar { padding: 8px 14px; flex-direction: column; align-items: flex-start; gap: 4px; }
          .pam-caption-text { white-space: normal; font-size: 11px; }
          .pam-cs-link span { display: none; }
        }
      `}</style>

      {/* Modal Container (stops click-through) */}
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="pam-header">
          <div className="pam-meta-col">
            <span className="pam-tag">{project.tag || 'SAAS BRAND ARCHITECTURE'}</span>
            <h3 className="pam-title">
              <span>{project.title}</span>
              <span className="pam-count-badge">
                [ {total} PRODUCTION ASSETS ]
              </span>
            </h3>
          </div>

          <div className="pam-header-actions">
            <Link to={targetCaseStudy} className="pam-cs-link" onClick={onClose}>
              <span>EXPLORE CASE SPEC</span>
              <ArrowIcon size={12} />
            </Link>
            <button type="button" className="pam-close-btn" onClick={onClose} aria-label="Close modal">
              CLOSE [ ✕ ]
            </button>
          </div>
        </div>

        {/* Center Stage with Prev/Next buttons */}
        <div className="pam-stage">
          <button
            type="button"
            className="pam-nav-arrow prev"
            onClick={prevAsset}
            aria-label="Previous Asset"
          >
            ←
          </button>

          <div className="pam-main-media">
            {isVideo ? (
              <video
                src={currentImage}
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            ) : (
              <img
                src={currentImage}
                alt={`${project.title} Asset ${currentIndex + 1}`}
              />
            )}
          </div>

          <button
            type="button"
            className="pam-nav-arrow next"
            onClick={nextAsset}
            aria-label="Next Asset"
          >
            →
          </button>
        </div>

        {/* Caption & Counter Bar */}
        <div className="pam-caption-bar">
          <div className="pam-caption-text">
            <strong>FIG {String(currentIndex + 1).padStart(2, '0')}:</strong> {customCaption}
          </div>
          <div className="pam-caption-counter">
            ASSET {currentIndex + 1} OF {total}
          </div>
        </div>

        {/* Thumbnails Navigation Strip */}
        <div className="pam-thumbnails-strip">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              className={`pam-thumb ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Jump to asset ${idx + 1}`}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
