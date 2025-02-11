self.addEventListener("install",event => {

    console.log("install")
    console.log("started the caching")
    caches.open("yathish").then(cache => {
cache.addAll([
    './index.html',
    './manifest.json',
    './img/icon128.png',
    './img/icon256.png',
    './img/icon96.png',
    './img/image.webp',
    './img/image2.png',
    './img/logo.png',
    "./style.css",
    "./app.js"


])

    })
}
)

self.addEventListener("fetch",event =>{
console.log("feching the data from cache")
event.respondWith(
    caches.match(event.request).then(
        response =>{
            if(response)
            {
                return response
            }
            else
            {
                fetch(response).then(result =>{
                    return result
            })
            }
        } 
    )
)

})



// // Check if browser supports service workers and Background Sync
// if ('serviceWorker' in navigator && 'SyncManager' in window) {
//     navigator.serviceWorker.register('/service-worker.js')
//         .then(function(registration) {
//             console.log('Service Worker registered successfully.');
//             return registration.sync.register('syncCachedData');
//         })
//         .catch(function(error) {
//             console.error('Service Worker registration failed:', error);
//         });
// }

// // Service Worker logic
// self.addEventListener('sync', function(event) {
//     if (event.tag === 'syncCachedData') {
//         event.waitUntil(syncCachedData());
//     }
// });

// function syncCachedData() {
//     return caches.open('my-cache').then(function(cache) {
//         return cache.matchAll('/api/data').then(function(cachedResponses) {
//             return Promise.all(cachedResponses.map(function(response) {
//                 return fetch(response.url, {
//                     method: 'POST',
//                     body: response.body
//                 });
//             }));
//         });
//     });
// }
