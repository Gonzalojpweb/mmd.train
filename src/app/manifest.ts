import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MMD Entrenamiento',
    short_name: 'MMD',
    description: 'Sistema de gestión y entrenamiento para MMD',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#FFE600',
    icons: [
      {
        src: 'https://res.cloudinary.com/dt6iu9m9f/image/upload/v1775491311/logo-removebg-preview_1_zupjab.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://res.cloudinary.com/dt6iu9m9f/image/upload/v1775491311/logo-removebg-preview_1_zupjab.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
