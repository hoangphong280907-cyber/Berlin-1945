/* BERLIN 1945: FLAKTURM — Service Worker (Offline & Audio Range Cache) */
const CORE_CACHE = 'flakturm-core-v2';
const CDN_CACHE = 'flakturm-cdn-v1';

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./flak-splash.jpg",
  "./searchlight-pod.png",
  "./audio/aa_fire.mp3",
  "./audio/bgm.mp3",
  "./audio/bomb_explode.mp3",
  "./audio/bomb_explode_1.mp3",
  "./audio/bomb_explode_2.mp3",
  "./audio/bomb_explode_3.mp3",
  "./audio/bomb_explode_4.mp3",
  "./audio/distant_boom_1.mp3",
  "./audio/distant_boom_2.mp3",
  "./audio/dogfight.mp3",
  "./audio/flak_128.mp3",
  "./audio/plane_crash.mp3",
  "./audio/plane_explode.mp3",
  "./audio/plane_explode_1.mp3",
  "./audio/plane_explode_2.mp3",
  "./audio/plane_explode_3.mp3",
  "./audio/plane_explode_4.mp3",
  "./audio/plane_flyover.mp3",
  "./audio/plane_flyover_1.mp3",
  "./audio/plane_flyover_2.mp3",
  "./audio/plane_flyover_3.mp3",
  "./audio/sam_launch.mp3"
];

const CDN_HOSTS = [
  'unpkg.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CORE_CACHE);
    await Promise.allSettled(
      CORE_ASSETS.map(async (url) => {
        try {
          const req = new Request(url, { cache: 'reload' });
          const res = await fetch(req);
          if (res && res.ok) {
            await cache.put(url, res);
          }
        } catch (_) {
          // Bỏ qua nếu file tùy chọn chưa tồn tại
        }
      })
    );
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((k) => k !== CORE_CACHE && k !== CDN_CACHE)
        .map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

// Hỗ trợ HTTP Range (206 Partial Content) khi phát file .mp3 từ CacheStorage
async function createRangeResponse(request, cachedResponse) {
  const rangeHeader = request.headers.get('range');
  if (!rangeHeader || !cachedResponse) return cachedResponse;

  const arrayBuffer = await cachedResponse.arrayBuffer();
  const totalBytes = arrayBuffer.byteLength;
  const match = /bytes=(\d*)-(\d*)/.exec(rangeHeader);
  if (!match) return new Response(arrayBuffer, {
    status: 200,
    headers: cachedResponse.headers
  });

  const start = match[1] ? parseInt(match[1], 10) : 0;
  const end = match[2] ? Math.min(parseInt(match[2], 10), totalBytes - 1) : totalBytes - 1;

  if (start >= totalBytes || start > end) {
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${totalBytes}` }
    });
  }

  const sliced = arrayBuffer.slice(start, end + 1);
  const headers = new Headers(cachedResponse.headers);
  headers.set('Content-Range', `bytes ${start}-${end}/${totalBytes}`);
  headers.set('Content-Length', String(sliced.byteLength));
  headers.set('Accept-Ranges', 'bytes');

  return new Response(sliced, {
    status: 206,
    statusText: 'Partial Content',
    headers
  });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1. Tài nguyên nội bộ cùng domain (HTML, Audio MP3, Ảnh, Manifest)
  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(CORE_CACHE);
      const cached = await cache.match(request, { ignoreSearch: true });

      if (cached) {
        if (request.headers.has('range')) {
          return createRangeResponse(request, cached);
        }
        return cached;
      }

      try {
        const networkRes = await fetch(request);
        if (networkRes && networkRes.ok && networkRes.status === 200) {
          cache.put(request, networkRes.clone());
        }
        return networkRes;
      } catch (_) {
        if (request.mode === 'navigate') {
          const fallback = await cache.match('./index.html');
          if (fallback) return fallback;
        }
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      }
    })());
    return;
  }

  // 2. Tài nguyên CDN (Three.js module & Google Fonts) -> Cache-First để chạy Offline
  if (CDN_HOSTS.some((host) => url.hostname === host || url.hostname.endsWith('.' + host))) {
    event.respondWith((async () => {
      const cache = await caches.open(CDN_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;

      try {
        const networkRes = await fetch(request);
        if (networkRes && (networkRes.ok || networkRes.type === 'opaque')) {
          cache.put(request, networkRes.clone());
        }
        return networkRes;
      } catch (_) {
        return new Response('', { status: 504, statusText: 'CDN Offline' });
      }
    })());
  }
});
