import { useEffect, useRef } from 'react';

/**
 * usePWA — registers service worker and manages PWA install prompt.
 *
 * Returns { promptInstall } so components can trigger the native install prompt.
 *
 * Usage:
 *   const { promptInstall } = usePWA();
 */
export default function usePWA() {
  const deferredPromptRef = useRef(null);

  useEffect(() => {
    // ── 1. Register Service Worker (Production Only) ───────────────────────
    const isLocalhost = Boolean(
      window.location.hostname === 'localhost' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
    );

    if ('serviceWorker' in navigator) {
      if (isLocalhost) {
        // Unregister service worker on localhost to avoid corrupting Vite dev server
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const reg of registrations) {
            reg.unregister();
          }
        });
        if ('caches' in window) {
          caches.keys().then((keys) => {
            for (const key of keys) caches.delete(key);
          });
        }
      } else {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then((reg) => {
              console.log('[PWA] Service Worker registered:', reg.scope);
            })
            .catch((err) => {
              console.warn('[PWA] SW registration failed:', err);
            });
        });
      }
    }

    // ── 2. Capture the native install prompt ─────────────────────────────
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPromptRef.current = e;
      // Dispatch custom event so other components know prompt is available
      window.dispatchEvent(new CustomEvent('pwa-installable'));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // ── Trigger native install dialog ───────────────────────────────────────
  const promptInstall = async () => {
    const prompt = deferredPromptRef.current;
    if (!prompt) return null;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    deferredPromptRef.current = null;
    return outcome; // 'accepted' | 'dismissed'
  };

  return { promptInstall };
}
