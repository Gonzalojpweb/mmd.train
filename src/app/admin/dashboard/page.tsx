import { getUsers } from '@/actions/users'
import { getMonthlyRevenue } from '@/actions/payments'
import { getDashboardKPIs, getAdminBookings } from '@/actions/bookings'
import { Calendar, Users, Target, Zap, TrendingUp, Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default async function AdminDashboard() {
    const kpis = await getDashboardKPIs()
    const monthlyRevenue = await getMonthlyRevenue()
    const todaySessions = await getAdminBookings()

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            {/* Header Section */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-brand font-black uppercase tracking-[0.2em] text-[10px]">
                    <div className="w-8 h-[1px] bg-brand" />
                    Resumen del Sistema
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic">
                    Dashboard <span className="text-brand">MMD</span>
                </h1>
            </div>

            {/* KPI Cards Grid - Premium Aesthetic */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Alumnos Card */}
                <div className="bg-zinc-900 border border-white/5 p-6 rounded-[2.5rem] relative overflow-hidden group shadow-xl transition-all hover:border-brand/30">
                    <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Users size={120} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Alumnos Totales</p>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-5xl font-black text-white italic tracking-tighter">{kpis.totalStudents}</h2>
                            <span className="text-[10px] text-brand font-bold uppercase tracking-widest">+12%</span>
                        </div>
                    </div>
                </div>

                {/* Clases Hoy Card */}
                <div className="bg-zinc-900 border border-brand/20 p-6 rounded-[2.5rem] relative overflow-hidden group shadow-[0_0_30px_rgba(255,230,0,0.05)] transition-all hover:border-brand/50">
                    <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Zap size={120} className="text-brand" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Clases de Hoy</p>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-5xl font-black text-white italic tracking-tighter">{kpis.sessionsToday}</h2>
                        </div>
                    </div>
                </div>

                {/* Reservas Hoy Card */}
                <div className="bg-zinc-900 border border-white/5 p-6 rounded-[2.5rem] relative overflow-hidden group shadow-xl transition-all hover:border-brand/30">
                    <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity text-brand">
                        <Target size={120} />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Reservas del Día</p>
                            <h2 className="text-5xl font-black text-white italic tracking-tighter mb-4">{kpis.bookingsToday}</h2>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                            <div 
                                className="bg-brand h-full rounded-full transition-all duration-1000" 
                                style={{ width: `${Math.min(kpis.capacityUsage * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Ingresos Card */}
                <div className="bg-zinc-900 border border-white/5 p-6 rounded-[2.5rem] relative overflow-hidden group shadow-xl transition-all hover:border-brand/30">
                    <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <TrendingUp size={120} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Ingresos (Mes)</p>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-4xl font-black text-white italic tracking-tighter">
                                ${monthlyRevenue.toLocaleString('es-AR')}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions & Recent Activity Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Próximas Clases - Real Data */}
                <div className="lg:col-span-2 bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                            <Calendar size={20} className="text-brand" />
                            Agenda del Día
                        </h3>
                        <Link href="/admin/bookings" className="text-[10px] font-black uppercase tracking-widest text-brand hover:underline">
                            Ver Asistencias
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {todaySessions.length === 0 ? (
                            <div className="p-12 text-center border border-dashed border-white/5 rounded-3xl text-zinc-600 text-sm italic">
                                No hay clases registradas para hoy.
                            </div>
                        ) : (
                            todaySessions.map((session: any) => (
                                <div 
                                    key={session._id} 
                                    className="group flex items-center justify-between p-5 rounded-3xl bg-zinc-950 border border-white/5 hover:border-brand/40 transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-6">
                                        <div 
                                            className="w-1.5 h-10 rounded-full" 
                                            style={{ backgroundColor: session.classTypeId?.color }}
                                        />
                                        <div>
                                            <p className="text-white font-black text-lg uppercase italic tracking-tighter leading-tight">
                                                {session.classTypeId?.name}
                                            </p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={12} className="text-zinc-500" />
                                                    <span className="text-[10px] font-bold text-zinc-400 uppercase">{session.startTime}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users size={12} className="text-zinc-500" />
                                                    <span className="text-[10px] font-bold text-brand uppercase">{session.bookings.length} Anotados</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-zinc-700 group-hover:text-brand transition-colors" />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Sidebar Column: Quick Stats or Tips */}
                <div className="space-y-8">
                    <div className="bg-brand rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h4 className="text-black font-black text-2xl uppercase italic tracking-tighter leading-none mb-2">
                                Tip del<br/>Día
                            </h4>
                            <p className="text-black/80 font-bold text-xs uppercase tracking-wider">
                                Mantén la grilla actualizada para una mejor experiencia del alumno.
                            </p>
                        </div>
                        <div className="absolute right-[-10%] bottom-[-10%] opacity-20 text-[100px]">💪</div>
                    </div>

                    <div className="bg-zinc-950 border border-white/5 p-8 rounded-[2.5rem]">
                        <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Acceso Rápido</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'Alumnos', href: '/admin/users' },
                                { name: 'Finanzas', href: '/admin/finances' },
                                { name: 'Grilla', href: '/admin/classes' },
                                { name: 'Reservas', href: '/admin/bookings' }
                            ].map((link) => (
                                <Link 
                                    key={link.name}
                                    href={link.href}
                                    className="h-12 flex items-center justify-center rounded-xl bg-white/5 text-zinc-400 text-[10px] font-black uppercase tracking-widest hover:bg-brand hover:text-black transition-all"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}