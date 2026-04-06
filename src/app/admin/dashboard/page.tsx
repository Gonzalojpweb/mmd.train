import { getUsers } from '@/actions/users'
import { getRecentPayments } from '@/actions/payments'
import { getScheduleSlots } from '@/actions/classes'

export default async function AdminDashboard() {
    // Simulando llamadas reales a la BD para tener algunos KPIs
    const users = await getUsers()
    const payments = await getRecentPayments()
    const slots = await getScheduleSlots()

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Visión General</h1>
                <p className="text-gray-400">Resumen de actividad diaria del entrenamiento de alto rendimiento.</p>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Card 1: Alumnos */}
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">👥</div>
                    <p className="text-sm font-medium text-gray-400 mb-1">Alumnos Activos</p>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-4xl font-black text-white">{users.length}</h2>
                        <span className="text-xs text-brand font-bold">+12 este mes</span>
                    </div>
                </div>

                {/* Card 2: Clases Hoy */}
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group border-brand/30">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">🏃‍♂️</div>
                    <p className="text-sm font-medium text-gray-400 mb-1">Clases Programadas Hoy</p>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-4xl font-black text-white">{slots.length}</h2>
                        <span className="text-xs text-green-400 font-bold">Todas confirmadas</span>
                    </div>
                </div>

                {/* Card 3: Reservas / Asistencia */}
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">🎯</div>
                    <p className="text-sm font-medium text-gray-400 mb-1">Reservas del Día</p>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-4xl font-black text-white">45</h2>
                        <span className="text-xs text-gray-500 font-medium">de 60 lugares</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 mt-4 rounded-full overflow-hidden">
                        <div className="bg-brand h-full w-[75%] rounded-full"></div>
                    </div>
                </div>

                {/* Card 4: Ingresos (Mensual) */}
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">💳</div>
                    <p className="text-sm font-medium text-gray-400 mb-1">Ingresos (Mes actual)</p>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-4xl font-black text-white">${payments.length > 0 ? payments.reduce((acc: any, p: any) => acc + p.amount, 0) : '350K'}</h2>
                    </div>
                </div>
                
            </div>

            {/* Quick Actions & Recent Activity Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {/* Main Activity Chart Placeholder */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl min-h-[400px]">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand"></span>
                        Asistencia Semanal
                    </h3>
                    <div className="w-full h-64 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-gray-500 text-sm">
                        [Gráfico de barras de asistencia aquí]
                    </div>
                </div>

                {/* Agenda Breve */}
                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-4">Próximas Clases</h3>
                    <div className="space-y-4">
                        {[
                            { time: '18:00', type: 'Levantamiento Olímpico', slots: '12/15' },
                            { time: '19:00', type: 'Deportivo', slots: '20/20' },
                            { time: '20:00', type: 'Semi Personalizado', slots: '5/8' }
                        ].map((mClass, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5 hover:border-brand/50 transition-colors cursor-pointer">
                                <div>
                                    <p className="text-white font-medium text-sm">{mClass.type}</p>
                                    <p className="text-brand text-xs font-bold">{mClass.time}</p>
                                </div>
                                <div className="text-xs text-gray-400 font-mono">
                                    {mClass.slots}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-3 rounded-xl bg-brand text-black font-bold uppercase text-xs tracking-wider hover:bg-brand-hover transition-colors">
                        Ver Agenda Completa
                    </button>
                </div>
            </div>
        </div>
    )
}