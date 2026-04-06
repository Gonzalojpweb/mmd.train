import Link from "next/link";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-between min-h-[100dvh] bg-background font-sans p-6 sm:p-12 relative overflow-hidden">
      
      {/* Luz de fondo ambiental (Glassmorphism sutil) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand opacity-5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Spacer Arriba */}
      <div className="w-full h-1/4"></div>

      {/* Titular Principal Centrado */}
      <main className="flex flex-col items-center justify-center w-full z-10 flex-1">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center uppercase tracking-tighter leading-[1.1] max-w-5xl [text-shadow:_0_0_30px_rgba(255,230,0,0.2)]" style={{ color: '#FFE600' }}>
          Animarse te acerca más al éxito
        </h1>
      </main>

      {/* Sección Inferior: Logo y Botones de Acción */}
      <div className="w-full flex flex-col items-center justify-end z-10 pb-4 mt-8 flex-1">
        
        {/* Logo MMD */}
        <div className="mb-10 sm:mb-16">
            <img 
                src="https://res.cloudinary.com/dt6iu9m9f/image/upload/v1775491311/logo-removebg-preview_1_zupjab.png"
                alt="MMD Entrenamiento Logo"
                className="h-14 sm:h-20 w-auto object-contain opacity-90 drop-shadow-2xl"
                style={{ filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.5))" }}
            />
        </div>

        {/* Botones */}
        <div className="flex flex-col w-full max-w-sm gap-4">
            <LoginButton />
            
            {/* Registro tradicional */}
            <Link 
                href="/register" 
                className="w-full flex items-center justify-center py-4 bg-transparent border border-white/20 hover:border-brand/50 text-white font-bold uppercase tracking-widest rounded-xl transition-all hover:bg-white/5 active:scale-95"
            >
                Registrarme
            </Link>
        </div>

      </div>
    </div>
  );
}
