import { auth } from '@/lib/auth'
import { getUserProfileStats } from '@/actions/bookings'
import ClassCountdown from '@/components/student/ClassCountdown'
import GamificationStats from '@/components/student/GamificationStats'
import { User, LogOut, Settings, Award } from 'lucide-react'

export default async function ProfilePage() {
    const session = await auth()
    const stats = await getUserProfileStats()

    return (
        <div className="space-y-8 animate-in slide-in-from-right fade-in duration-700 pb-24">
            {/* Page Header */}
            <div>
                <div className="flex items-center gap-2 text-brand font-black uppercase tracking-[0.2em] text-[10px] mb-1">
                    <div className="w-8 h-[1px] bg-brand" />
                    Mi Progreso
                </div>
                <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
                    Perfil <span className="text-brand">MMD</span>
                </h1>
            </div>

            {/* Profile Hero Section */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand/20 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000" />
                <div className="relative bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full border-4 border-black bg-zinc-800 flex items-center justify-center overflow-hidden shadow-2xl mb-4">
                        {session?.user?.image ? (
                            <img src={session.user.image} alt={session.user.name || ''} className="w-full h-full object-cover" />
                        ) : (
                            <User size={40} className="text-zinc-600" />
                        )}
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                        {session?.user?.name}
                    </h2>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{session?.user?.email}</p>
                    
                    {/* Level Badge */}
                    <div className="mt-4 flex items-center gap-2 px-4 py-1.5 bg-brand text-black rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        <Award size={12} />
                        GUERRERO NIVEL {Math.floor(stats.attendedCount / 10) + 1}
                    </div>
                </div>
            </div>

            {/* LIVE COUNTDOWN */}
            <ClassCountdown nextClass={stats.nextClass} />

            {/* GAMIFICATION STATS */}
            <GamificationStats stats={stats} />

            {/* Biometrics & Subscription (Simplified for cleaner look) */}
            <div className="grid grid-cols-1 gap-6">
                <div className="bg-zinc-950 border border-white/5 p-6 rounded-[2rem] space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-3">Suscripción</h3>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-white font-bold">Plan Mensual</span>
                            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Vence: 25 May, 2026</span>
                        </div>
                        <span className="bg-green-500/10 text-green-500 text-[10px] font-black px-3 py-1 rounded-full border border-green-500/20">ACTIVA</span>
                    </div>
                </div>

                <div className="bg-zinc-950 border border-white/5 p-6 rounded-[2rem] space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-3">Ajustes Rápidos</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 h-12 bg-white/5 border border-white/5 rounded-xl text-zinc-400 font-bold text-xs hover:bg-white/10 transition-all">
                            <Settings size={14} /> Editar
                        </button>
                        <button className="flex items-center justify-center gap-2 h-12 bg-red-500/10 border border-red-500/10 rounded-xl text-red-500 font-bold text-xs hover:bg-red-500/20 transition-all">
                            <LogOut size={14} /> Salir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

