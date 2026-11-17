/* Service worker de Signal : la page s'ouvre même sans réseau. Changer VERSION à chaque mise à jour. */
const VERSION = 'signal-v2-ludogo-3';
const SHELL = ['/', '/index.html', '/home.css', '/home.js', '/logo.js', '/catalog.js', '/logo-ludogo.svg', '/manifest.webmanifest',
  '/fonts/poppins-Light.woff', '/fonts/poppins-Regular.woff', '/fonts/poppins-Medium.woff', '/fonts/poppins-Bold.woff', '/icons/icon-192.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;
  const isPage = r.mode === 'navigate' || /\.(html|js|css)$/.test(u.pathname) || u.pathname === '/';
  if (isPage) { // réseau d'abord : les mises à jour du catalogue arrivent tout de suite
    e.respondWith(fetch(r).then((res) => { const cp = res.clone(); caches.open(VERSION).then((c) => c.put(r, cp)); return res; }).catch(() => caches.match(r).then((m) => m || caches.match('/index.html'))));
  } else { // images, polices, icônes : cache d'abord
    e.respondWith(caches.match(r).then((m) => m || fetch(r).then((res) => { if (res.ok) { const cp = res.clone(); caches.open(VERSION).then((c) => c.put(r, cp)); } return res; })));
  }
});
