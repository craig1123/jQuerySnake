'use strict';

var cacheVersion = 1;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
var offlineUrl = 'index.html';

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
          './img/grass.jpg',
          './img/snake.png',
          './img/favicon.ico',
          offlineUrl
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
    // request.mode = navigate isn't supported in all browsers
    // so include a check for Accept: text/html header.
    if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
          fetch(event.request.url).catch(function(error) {
              // Return the offline page
              return caches.match(offlineUrl);
          })
        );
    }
    else {
        // Respond with everything else if we can
        event.respondWith(caches.match(event.request)
                .then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});