'use client'

import { useEffect } from 'react'

export default function PWARegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Esperar a que la página esté completamente cargada
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .then((reg) => {
            console.log('[PWA] Service Worker registrado. Scope:', reg.scope)
            
            // Chequear si hay una actualización disponible
            reg.addEventListener('updatefound', () => {
              console.log('[PWA] Nueva versión del Service Worker encontrada')
            })
          })
          .catch((err) => console.error('[PWA] Error al registrar Service Worker:', err))
      })
    }
  }, [])

  return null
}
