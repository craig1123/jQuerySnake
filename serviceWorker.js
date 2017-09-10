var urlsToCache = [
    './index.html',
    './app/img/grass.jpg',
    './app/img/snake.png',
    './app/img/favicon.ico',
    'https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js',
    './app/snake.js',
    './app/styles/styles.css',
];

var version = 'v1';

self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Installed version ', version);
  event.waitUntil(
    caches.open(version)
      .then(function(cache) {
      console.log("opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [version];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (version && cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleted old cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});