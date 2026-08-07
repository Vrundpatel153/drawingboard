// The Drawing Board — Service Worker v1.0
// Full PWA with background sync and caching strategy

const CACHE_NAME = 'tdb-cache-v1';
const STATIC_CACHE = 'tdb-static-v1';
const IMAGE_CACHE = 'tdb-images-v1';

// Core static assets to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/404.html',
  '/favicon.svg',
  '/site.webmanifest',
  '/logo.svg',
  '/offline.html',
];

// ── INSTALL: pre-cache static shell ────────────────────────────────────────
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Pre-cache partial failure:', err);
      });
    })
  );
});

// ── ACTIVATE: clean old caches ──────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== STATIC_CACHE && key !== IMAGE_CACHE)
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// ── FETCH: Network-first for HTML, Cache-first for assets/images ────────────
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET, chrome-extension, and external analytics
  if (
    event.request.method !== 'GET' ||
    url.protocol === 'chrome-extension:' ||
    url.hostname.includes('google-analytics') ||
    url.hostname.includes('googletagmanager') ||
    url.hostname.includes('facebook') ||
    url.hostname.includes('connect.facebook') ||
    url.hostname.includes('cal.com') ||
    url.hostname.includes('wa.me') ||
    url.hostname.includes('cloudinary') ||
    url.hostname.includes('fonts.googleapis') ||
    url.hostname.includes('fonts.gstatic')
  ) {
    return;
  }

  // Images: cache-first, fallback network
  if (
    event.request.destination === 'image' ||
    url.pathname.match(/\.(png|jpg|jpeg|webp|svg|gif|avif|ico)$/)
  ) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        try {
          const response = await fetch(event.request);
          if (response.ok) cache.put(event.request, response.clone());
          return response;
        } catch {
          return new Response('', { status: 408 });
        }
      })
    );
    return;
  }

  // JS/CSS: stale-while-revalidate
  if (
    event.request.destination === 'script' ||
    event.request.destination === 'style' ||
    url.pathname.match(/\.(js|css|woff2|woff|ttf)$/)
  ) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);
        const networkFetch = fetch(event.request).then((response) => {
          if (response.ok) cache.put(event.request, response.clone());
          return response;
        }).catch(() => cached);
        return cached || networkFetch;
      })
    );
    return;
  }

  // HTML navigation: network-first, fallback to cached index, then offline
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            caches.open(STATIC_CACHE).then((cache) => cache.put(event.request, response.clone()));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          const indexPage = await caches.match('/');
          if (indexPage) return indexPage;
          return caches.match('/offline.html');
        })
    );
    return;
  }

  // Default: network with cache fallback
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// ── PUSH NOTIFICATION HANDLER ───────────────────────────────────────────────
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'The Drawing Board';
  const options = {
    body: data.body || 'Strategy-first design studio for ambitious founders.',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag: 'tdb-notification',
    renotify: false,
    data: { url: data.url || '/' },
    actions: [
      { action: 'view', title: 'Explore Work' },
      { action: 'book', title: 'Book a Call' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// ── NOTIFICATION CLICK ──────────────────────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.action === 'book'
    ? 'https://cal.com/dandelion-nrvrze'
    : (event.notification.data?.url || '/');
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      return clients.openWindow(targetUrl);
    })
  );
});
