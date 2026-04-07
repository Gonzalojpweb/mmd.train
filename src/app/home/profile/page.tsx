import { auth } from '@/lib/auth'
import { getUserProfileStats } from '@/actions/bookings'
import ClassCountdown from '@/components/student/ClassCountdown'
import GamificationStats from '@/components/student/GamificationStats'
import { User, LogOut, Settings, Award, Zap, Target, Clock } from 'lucide-react'
import BodyRecord from '@/models/BodyRecord'
import { connectDB } from '@/lib/mongodb'
import { cn } from '@/lib/utils'

export default async function ProfilePage() {
    const session = await auth()
    const stats = await getUserProfileStats()
    
    await connectDB()
    const latestRecord = await BodyRecord.findOne({ userId: session?.user?.id })
        .sort({ date: -1 })
        .lean() as any

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
            
            {/* NEW: BIOMETRICS SECTION */}
            <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Zap size={80} />
                </div>
                
                <h3 className="text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    Mi Estado Físico
                    <div className="h-1 w-1 bg-brand rounded-full" />
                </h3>

                {latestRecord ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl">
                                <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Peso Actual</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-black text-white italic">{latestRecord.weight}</span>
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase">kg</span>
                                </div>
                            </div>
                            <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl">
                                <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">IMC</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-black text-brand italic">{latestRecord.imc}</span>
                                    <span className="text-[8px] px-1.5 py-0.5 bg-brand/10 text-brand rounded font-black italic uppercase">
                                        {latestRecord.imcClassification}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 border border-white/5 p-5 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-brand/10 rounded-lg text-brand">
                                    <Target size={18} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em]">Peso Ideal (Est)</p>
                                    <p className="text-sm font-black text-white italic">{latestRecord.idealWeight} kg</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Última Vez</p>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase">
                                    {new Date(latestRecord.date).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-6 text-center">
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Aún no tienes mediciones registradas.</p>
                        <p className="text-[9px] text-zinc-700 font-bold uppercase mt-1">Pídele a tu coach que te registre hoy.</p>
                    </div>
                )}
            </div>

            {/* Biometrics & Subscription */}
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

