const CACHE_NAME = 'cosecha-v2-cache';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalar y almacenar en hardware
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activar control inmediato
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Estrategia: Interceptar llamadas y responder desde Caché local si no hay red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});