const CACHE_NAME = 'mmd-cache-v2';
const STATIC_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/logo.png',
];

// Instalación: precachear recursos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      // Activar inmediatamente sin esperar a que se cierren las tabs viejas
      return self.skipWaiting();
    })
  );
});

// Activación: limpiar caches viejas y tomar control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      // Tomar control de todas las tabs inmediatamente
      return self.clients.claim();
    })
  );
});

// Fetch: estrategia Network First para páginas, Cache First para assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar requests del mismo origen
  if (url.origin !== location.origin) {
    return;
  }

  // Para navegación (HTML), siempre intentar la red primero
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match('/');
      })
    );
    return;
  }

  // Para assets estáticos: Cache First
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return cachedResponse || fetch(request).then((response) => {
        // Guardar en cache si es una respuesta válida
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      });
    })
  );
});
