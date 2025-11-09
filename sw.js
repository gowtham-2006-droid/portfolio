const CACHE_NAME = 'gowtham-portfolio-v1';
const RUNTIME_CACHE = 'runtime-cache-v1';

// Files to cache on install
const urlsToCache = [
  '/',
  '/portfolio/',
  '/portfolio/index.html',
  '/portfolio/style.css',
  '/portfolio/script.js',
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache files
self.addEventListener('install', event => {
  console.log('📦 Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Caching files');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.warn('⚠️ Cache error:', error);
      })
  );
  
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  console.log('🔄 Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Cache-first strategy for assets
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request)
        .then(response => {
          // Return cached response if available
          if (response) {
            console.log('📦 Served from cache:', request.url);
            return response;
          }

          // Otherwise fetch from network
          return fetch(request)
            .then(response => {
              // Cache successful responses
              if (response && response.status === 200) {
                const responseToCache = response.clone();
                caches.open(RUNTIME_CACHE)
                  .then(cache => {
                    cache.put(request, responseToCache);
                  });
              }
              return response;
            })
            .catch(() => {
              // Offline fallback
              console.log('📴 Offline - serving from cache:', request.url);
              
              // Return offline page if available
              return caches.match('/portfolio/index.html')
                .then(response => {
                  if (response) return response;
                  
                  // Return error response
                  return new Response(
                    '<!DOCTYPE html><html><body><h1>Offline</h1><p>This content is not available offline.</p></body></html>',
                    {
                      status: 503,
                      statusText: 'Service Unavailable',
                      headers: new Headers({
                        'Content-Type': 'text/html'
                      })
                    }
                  );
                });
            });
        })
    );
  }
});

// Background sync for forms (future feature)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-contact-form') {
    event.waitUntil(
      // Handle form submission when back online
      fetch('/api/contact', {
        method: 'POST',
        body: localStorage.getItem('pending-form')
      })
        .then(() => {
          localStorage.removeItem('pending-form');
          console.log('✅ Form synced when back online');
        })
    );
  }
});

// Push notification handler
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  
  const options = {
    body: data.body || 'New notification from Gowtham\'s Portfolio',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%2300d9ff;stop-opacity:1" /><stop offset="100%" style="stop-color:%238338ec;stop-opacity:1" /></linearGradient></defs><circle cx="256" cy="256" r="256" fill="url(%23grad)"/><text x="256" y="340" font-size="280" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">G</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%2300d9ff" width="192" height="192" rx="45"/><text x="96" y="130" font-size="100" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">G</text></svg>',
    tag: 'gowtham-portfolio',
    requireInteraction: false
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Gowtham\'s Portfolio', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then(clientList => {
        // Check if portfolio is already open
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === '/portfolio/' && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window if not already open
        if (clients.openWindow) {
          return clients.openWindow('/portfolio/');
        }
      })
  );
});

console.log('✅ Service Worker loaded');
