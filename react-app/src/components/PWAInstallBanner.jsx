import React, { useState, useEffect, useRef } from 'react';

/**
 * PWAInstallBanner — shown on homepage after 3s for new visitors.
 * Displays a branded "Add to Home Screen / Install App" banner.
 * Auto-dismisses after 15s if ignored.
 *
 * Props:
 *   promptInstall: function from usePWA hook
 */
export default function PWAInstallBanner({ promptInstall }) {
  const [visible, setVisible] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [notifGranted, setNotifGranted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem('tdb_pwa_dismissed')) return;
    // Don't show if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    // Don't show on mobile iOS (no install prompt API, handled via Safari "Add to Home")
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

    const handleInstallable = () => setIsInstallable(true);
    window.addEventListener('pwa-installable', handleInstallable);

    // Show banner after 3 seconds on page load
    const delay = setTimeout(() => {
      setVisible(true);
      // Auto-dismiss after 15 seconds
      timerRef.current = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('tdb_pwa_dismissed', '1');
      }, 15000);
    }, 3000);

    return () => {
      clearTimeout(delay);
      clearTimeout(timerRef.current);
      window.removeEventListener('pwa-installable', handleInstallable);
    };
  }, []);

  const handleInstall = async () => {
    const outcome = await promptInstall();
    if (outcome === 'accepted') {
      setVisible(false);
      sessionStorage.setItem('tdb_pwa_dismissed', '1');
      // Request notification permission after install
      if ('Notification' in window) {
        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
          setNotifGranted(true);
          new Notification('The Drawing Board is installed!', {
            body: 'You\'ll always have access to our studio from your home screen.',
            icon: '/favicon.svg',
            badge: '/favicon.svg',
          });
        }
      }
    }
  };

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('tdb_pwa_dismissed', '1');
    clearTimeout(timerRef.current);
  };

  // Request notification permission even without install (for browsers that support it)
  const handleNotifRequest = async () => {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
      setNotifGranted(true);
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      setNotifGranted(true);
      new Notification('Stay updated with The Drawing Board', {
        body: 'We\'ll notify you about new work, insights, and availability.',
        icon: '/favicon.svg',
        badge: '/favicon.svg',
      });
    }
    handleDismiss();
  };

  if (!visible || dismissed) return null;

  return (
    <>
      <style>{`
        @keyframes pwa-slideUp {
          from { transform: translateY(120%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pwa-slideDown {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(120%); opacity: 0; }
        }

        .pwa-banner-backdrop {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9998;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          padding: 0 16px 24px;
          pointer-events: none;
        }

        .pwa-banner {
          width: 100%;
          max-width: 520px;
          background: #1B1B17;
          border: 1.5px solid #A19071;
          border-radius: 4px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.28), 0 1px 0 rgba(161,144,113,0.3) inset;
          animation: pwa-slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          pointer-events: all;
          position: relative;
        }

        .pwa-logo {
          flex-shrink: 0;
          width: 36px;
          height: 40px;
        }

        .pwa-content {
          flex: 1;
          min-width: 0;
        }

        .pwa-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9.5px;
          letter-spacing: 0.12em;
          color: #A19071;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .pwa-title {
          font-family: 'Fraunces', serif;
          font-size: 15px;
          font-weight: 600;
          color: #F5F2EC;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pwa-desc {
          font-size: 12px;
          color: rgba(245, 242, 236, 0.6);
          line-height: 1.4;
        }

        .pwa-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .pwa-btn-install {
          background: #A19071;
          color: #1B1B17;
          border: none;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 9px 16px;
          cursor: pointer;
          white-space: nowrap;
          border-radius: 2px;
          transition: background 0.15s;
        }
        .pwa-btn-install:hover { background: #c0a97f; }

        .pwa-btn-notif {
          background: transparent;
          color: rgba(245, 242, 236, 0.75);
          border: 1px solid rgba(161,144,113,0.4);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          padding: 8px 14px;
          cursor: pointer;
          white-space: nowrap;
          border-radius: 2px;
          transition: border-color 0.15s, color 0.15s;
        }
        .pwa-btn-notif:hover { border-color: #A19071; color: #F5F2EC; }

        .pwa-close {
          position: absolute;
          top: 10px;
          right: 12px;
          background: none;
          border: none;
          color: rgba(245,242,236,0.45);
          font-size: 16px;
          cursor: pointer;
          padding: 2px 4px;
          line-height: 1;
          transition: color 0.15s;
        }
        .pwa-close:hover { color: #F5F2EC; }

        @media (max-width: 480px) {
          .pwa-banner {
            flex-wrap: wrap;
            gap: 12px;
            padding: 16px 18px 18px;
          }
          .pwa-actions {
            width: 100%;
            justify-content: flex-start;
          }
          .pwa-title { font-size: 14px; }
        }
      `}</style>

      <div className="pwa-banner-backdrop" aria-live="polite" role="region" aria-label="App install prompt">
        <div className="pwa-banner">
          <button className="pwa-close" onClick={handleDismiss} aria-label="Dismiss">✕</button>

          {/* Golden Logo Mark */}
          <svg className="pwa-logo" xmlns="http://www.w3.org/2000/svg" viewBox="30.445 142.642 44.42 47.091">
            <rect x="30.445" y="142.642" fill="#A19071" width="44.42" height="25.732"/>
            <rect x="30.445" y="159.392" fill="#A19071" width="22.685" height="30.341"/>
          </svg>

          <div className="pwa-content">
            <div className="pwa-label">The Drawing Board Studio</div>
            <div className="pwa-title">Add to Home Screen</div>
            <div className="pwa-desc">Get instant access — no browser required.</div>
          </div>

          <div className="pwa-actions">
            {isInstallable && (
              <button className="pwa-btn-install" onClick={handleInstall}>
                Install App
              </button>
            )}
            {'Notification' in window && Notification.permission === 'default' && (
              <button className="pwa-btn-notif" onClick={handleNotifRequest}>
                Notify Me
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
