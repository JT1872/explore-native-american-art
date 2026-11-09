/* Explore Native Art — offline cache after first secure (HTTPS) load */
const CACHE = "ena-v1-2026-11-09-kiosk-a";
const ASSETS = [
  "./",
  "./index.html",
  "./VOICE_GUIDE.md",
  "./css/styles.css",
  "./js/content.js",
  "./js/app.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./assets/heroes/CREDITS.md",
  "./assets/heroes/basket-card.webp",
  "./assets/heroes/basket-hero.jpg",
  "./assets/heroes/basket-hero.webp",
  "./assets/heroes/jewelry-card.webp",
  "./assets/heroes/jewelry-hero.jpg",
  "./assets/heroes/jewelry-hero.webp",
  "./assets/heroes/painting-card.webp",
  "./assets/heroes/painting-hero.jpg",
  "./assets/heroes/painting-hero.webp",
  "./assets/heroes/pottery-card.webp",
  "./assets/heroes/pottery-hero.jpg",
  "./assets/heroes/pottery-hero.webp",
  "./assets/heroes/rug-card.webp",
  "./assets/heroes/rug-hero.jpg",
  "./assets/heroes/rug-hero.webp",
  "./assets/heroes/sandpainting-card.webp",
  "./assets/heroes/sandpainting-hero.jpg",
  "./assets/heroes/sandpainting-hero.webp",
  "./assets/heroes/sculpture-card.webp",
  "./assets/heroes/sculpture-hero.jpg",
  "./assets/heroes/sculpture-hero.webp",
  "./assets/brand/tanner-trading-logo.png",
  "./assets/brand/tanner-trading-logo-header.webp",
  "./assets/brand/tanner-trading-logo-home.webp",
  "./assets/brand/SOURCE.md",
];
/* Note: assets/videos/*.mp4 are intentionally NOT precached (large files). */
/* Vimeo / player.vimeo.com are never cached — streaming only when online. */

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; }).map(function (k) {
          return caches.delete(k);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  // Never put private buyer module responses into the education SW cache
  try {
    var u = new URL(req.url);
    if (u.pathname.indexOf("/buyer/") !== -1) return;
    // Do not cache large intro films in the education SW
    if (/\.(mp4|webm|mov)(\?|$)/i.test(u.pathname)) return;
    // Never intercept Vimeo / CDN video streams
    if (/vimeo\.com$/i.test(u.hostname) || /\.vimeocdn\.com$/i.test(u.hostname) || /vimeocdn\.com$/i.test(u.hostname)) return;
  } catch (e) {}
  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (cache) {
          cache.put(req, copy);
        });
        return res;
      }).catch(function () {
        if (req.mode === "navigate") {
          return caches.match("./index.html");
        }
        return new Response("Offline", { status: 503, statusText: "Offline" });
      });
    })
  );
});
