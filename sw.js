const CACHE = 'pdx-flight-entry-v2';
const FILES = ['./', './index.html', './manifest.json', './icon.svg'];
self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(CACHE).then(function(cache){ return cache.addAll(FILES); }));
  self.skipWaiting();
});
self.addEventListener('activate', function(event) {
  event.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }));
  self.clients.claim();
});
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(function(cached){ return cached || fetch(event.request); }));
});
