if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js')
        .then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(function(error) {
            console.log('ServiceWorker registration failed: ', error);
        });
    })
}
// const offlinePage = '/offline.html';
// const STATIC_CACHE = 'app-shell-v2';
// const DYNAMIC_CACHE = 'dynamic-cache-v1';

// const APP_SHELL_ASSETS = [
//   '/',
//   'index.html',
//   'calendar.html',
//   'about.html',
//   'form.html',
//   'style.css',
//   'register.js'
// ];

// const DYNAMIC_ASSET_URLS = [
//   'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js',
//   'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/main.min.css',
//   'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
//   'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js',
//   'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css'
// ];

// // const DYNAMIC_ASSET_URLS = [
// //   'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.19/index.global.min.js',
// //   'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css',
// //   'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js',
// //   'https://code.jquery.com/jquery-3.6.0.min.js'
// // ];


// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(STATIC_CACHE)
//       .then(cache => cache.addAll(APP_SHELL_ASSETS))
//       .then(() => self.skipWaiting())
//   );
// });

// self.addEventListener('activate', event => {
//   event.waitUntil(
//     caches.keys().then(keys => {
//       return Promise.all(
//         keys
//           .filter(k => k !== STATIC_CACHE && k !== DYNAMIC_CACHE)
//           .map(k => caches.delete(k))
//       );
//     })
//   );
//   self.clients.claim();
// });

// self.addEventListener('fetch', event => {
//   const req = event.request;
//   const reqUrl = req.url;
//   // event.request.url === APP_SHELL_ASSETS

//   if (APP_SHELL_ASSETS.some(asset => reqUrl.endsWith(asset))) {
//     event.respondWith(caches.match(req));
//     return
//   } 
  
//   if (DYNAMIC_ASSET_URLS.some(url => reqUrl.startsWith(url))) {
//     event.respondWith(
//       caches.match(req).then(cacheRes => {
//         return (
//           cacheRes || 
//           fetch(req)
//           .then(networkRes => {
//             return caches.open(DYNAMIC_CACHE).then(cache => {
//               cache.put(req, networkRes.clone());
//               return networkRes;
//             });
//           })
//           .catch(() => caches.match(offlinePage))
//         );
//       })
//     );
//   }
// });


// const offlinePage = '/offline.html';
// const cacheName = 'app-shell-v2';

// const APP_SHELL_ASSETS = [
//     '/',
//     'index.html',
//     'calendar.html',
//     'about.html',
//     'form.html',
//     'style.css',
//     'register.js'
// ];

// const DYNAMIC_ASSET_URLS = [
//     'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.19/index.global.min.js',
//     'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css',
//     'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js'
// ];

// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(cacheName).then(cache => cache.addAll(APP_SHELL_ASSETS))
//   );
// });

// self.addEventListener('fetch', event => {
//   if (event.request.url === APP_SHELL_ASSETS ) {
//     event.respondWith(
//       fetch(event.request)
//         .catch(() => {
//           return caches.match(event.request)
//             .then(cached => cached || caches.match(offlinePage));
//         })
//     );
//   } else {
//     caches.match(url)
//     .then( res => {
//         if (res) {
//             return res
//         }
//         fetch(event.request)
//         .then(responRed => {
//             const repCopy = responRed.clone();
//             caches.open(DYNAMIC_ASSET_URLS, caches => {
//                 caches.add(repCopy);
//             })
//             return repCopy;
//         })
//     });
//   }
// });

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker.register('/sw.js')
//         .then(function(registration) {
//             console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         })
//         .catch(function(error) {
//             console.log('ServiceWorker registration failed: ', error);
//         });
//     })
// }