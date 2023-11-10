
self.addEventListener('install', (event: any) => {
    event.waitUntil(
      caches.open('v1').then((cache: any) => {
        return cache.addAll([
          '/index.html',
          '/manifest.json',
          '/favicon.ico',
          // Add more assets here
        ]);
      })
    );
});

self.addEventListener('fetch', (event: any) => {
    event.respondWith(
      caches.match(event.request).then((response: any) => {
        return response || fetch(event.request);
      })
    );
});