import Link from "next/link";
import LoginButton from "@/components/LoginButton";
import { MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-between min-h-[100dvh] bg-black font-sans p-6 sm:p-12 relative overflow-hidden">

      {/* Imagen de Fondo High-Impact con Efecto de Movimiento */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 scale-110 animate-slow-float"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dt6iu9m9f/image/upload/v1775500260/ChatGPT_Image_6_abr_2026_03_24_07_p.m._lawzxh.png')",
            filter: "brightness(0.7) contrast(1.1)"
          }}
        ></div>
        {/* Overlay para Oscurecer Bordes (Vignette) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40"></div>
      </div>

      {/* Luz de fondo ambiental (Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand opacity-10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      {/* Botones de Redes/Ubicación en el Top */}
      <div className="absolute top-8 right-8 z-20 flex gap-3">
        <a 
          href="https://maps.app.goo.gl/YyjRwE2tCEUFUGmE8" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white hover:text-brand hover:border-brand/40 transition-all active:scale-95 group"
          title="Ubicación"
        >
          <MapPin size={20} />
        </a>
        <a 
          href="https://www.instagram.com/mmd.entrenamiento/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white hover:text-brand hover:border-brand/40 transition-all active:scale-95 group"
          title="Instagram"
        >
          <svg 
            viewBox="0 0 24 24" 
            width="20" 
            height="20" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
      </div>

      {/* Spacer Arriba */}
      <div className="w-full h-1/4 z-10"></div>

      {/* Titular Principal Centrado */}
      <main className="flex flex-col items-center justify-center w-full z-10 flex-1">
        <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-4xl font-black text-center uppercase tracking-tighter leading-[0.95] max-w-5xl [text-shadow:_0_5px_30px_rgba(0,0,0,0.8)]" style={{ color: '#FFE600' }}>
          Animarse te <br /> acerca más <br /> al éxito
        </h1>
      </main>

      {/* Sección Inferior: Logo y Botones de Acción */}
      <div className="w-full flex flex-col items-center justify-end z-10 pb-4 mt-8 flex-1">

        {/* Logo MMD Compacto */}
        <div className="mb-10 sm:mb-16">
          <img
            src="https://res.cloudinary.com/dt6iu9m9f/image/upload/v1775491311/logo-removebg-preview_1_zupjab.png"
            alt="MMD Entrenamiento Logo"
            className="h-12 sm:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,230,0,0.4)]"
          />
        </div>

        {/* Botones */}
        <div className="flex flex-col w-full max-w-sm gap-4">
          <LoginButton />

          {/* Registro tradicional */}
          <Link
            href="/register"
            className="w-full flex items-center justify-center py-4 bg-white/5 backdrop-blur-md border border-white/10 hover:border-brand/50 text-white font-semibold uppercase tracking-widest rounded-xl transition-all hover:bg-white/10 active:scale-95"
          >
            Registrarme
          </Link>
        </div>

      </div>
    </div>
  );
}

