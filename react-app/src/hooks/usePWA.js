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
    // ── 1. Register Service Worker ─────────────────────────────────────────
    if ('serviceWorker' in navigator) {
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
