import { auth } from '@/lib/auth'

export default async function ProfilePage() {
    const session = await auth()

    return (
        <div className="space-y-6 animate-in slide-in-from-right fade-in duration-500 pb-10">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Mi Perfil</h1>
                <p className="text-gray-400 text-sm">Gestiona tu información personal y progreso.</p>
            </div>

            {/* Profile Header */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center relative mt-6">
                <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-brand/20 to-transparent rounded-t-2xl"></div>
                <div className="w-24 h-24 rounded-full border-4 border-panel bg-background z-10 flex items-center justify-center -mt-10 overflow-hidden relative">
                    <span className="text-4xl relative z-10">👤</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-4">{session?.user?.name || 'Alumno Fitness'}</h2>
                <p className="text-brand text-sm font-bold uppercase tracking-wider">{session?.user?.email}</p>
                <button className="mt-4 px-4 py-2 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-wide hover:bg-white/20 transition-colors">
                    Cambiar Foto
                </button>
            </div>

            {/* Biometrics Form */}
            <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white border-b border-border pb-3 mb-4">Medidas Físicas</h3>
                
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs text-gray-400 font-bold uppercase">Edad (años)</label>
                            <input 
                                type="number" 
                                placeholder="Ej: 25"
                                className="w-full bg-background border border-border rounded-xl p-3 text-white focus:outline-none focus:border-brand transition-colors"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-gray-400 font-bold uppercase">Altura (cm)</label>
                            <input 
                                type="number" 
                                placeholder="Ej: 175"
                                className="w-full bg-background border border-border rounded-xl p-3 text-white focus:outline-none focus:border-brand transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-gray-400 font-bold uppercase">Peso Actual (kg)</label>
                        <input 
                            type="number" 
                            step="0.1"
                            placeholder="Ej: 75.5"
                            className="w-full bg-background border border-border rounded-xl p-3 text-white focus:outline-none focus:border-brand transition-colors"
                        />
                    </div>

                    <button 
                        type="button"
                        className="w-full bg-brand hover:bg-brand-hover text-black font-black uppercase tracking-wider py-4 rounded-xl mt-4 transition-all active:scale-95"
                    >
                        Guardar Cambios
                    </button>
                </form>
            </div>

            {/* Membership Details */}
            <div className="glass-panel p-6 rounded-2xl border-brand/20">
                <h3 className="text-lg font-bold text-white border-b border-border pb-3 mb-4 flex items-center justify-between">
                    Suscripción <span className="text-green-500 text-xs px-2 py-1 bg-green-500/10 rounded">ACTIVA</span>
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Plan Actual</span>
                        <span className="text-white font-bold">Mensual - 4 Días</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Vencimiento</span>
                        <span className="text-white font-bold">25 de Mayo, 2026</span>
                    </div>
                </div>
                <button className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors rounded-xl border border-white/10">
                    Realizar Pago / Renovar
                </button>
            </div>
        </div>
    )
}
