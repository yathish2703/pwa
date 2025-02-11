if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(function(error) {
        console.log('Service Worker registration failed:', error);
      });
  }

self.addEventListener('install', function(event) {
event.waitUntil(
    caches.open('my-cache').then(function(cache) {
    return cache.addAll([
        '/',
        './stock_data_fetch_API.html',
        './Data.json',
        './Stock_data_Fetch_Local_Data.html',
        './icon.jpg'
    ]);
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

self.addEventListener('sync-button', function(event) {
if (event.tag === 'my-background-sync') {
    event.waitUntil(syncData());
}
});

function syncData() {
return fetch('/sync-endpoint', {
    method: 'POST',
    body: JSON.stringify({ data: 'your data' }),
    headers: {
    'Content-Type': 'application/json'
    }
}).then(function(response) {
    return response.json();
}).then(function(data) {
    console.log('Data synced successfully:', data);
}).catch(function(error) {
    console.error('Error syncing data:', error);
});
}

function requestBackgroundSync() {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready.then(function(registration) {
        return registration.sync.register('my-background-sync');
      }).then(function() {
        console.log('Background sync registered');
      }).catch(function(error) {
        console.log('Background sync registration failed:', error);
      });
    } else {
      console.log('Background sync not supported');
    }
  }