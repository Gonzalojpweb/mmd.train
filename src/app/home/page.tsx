export default async function HomeOverviewPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Motivation Banner */}
            <div className="w-full bg-brand rounded-2xl p-6 relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-black text-2xl font-black uppercase italic tracking-tighter leading-none mb-1">Listos para<br/>hoy?</h2>
                    <p className="text-black/80 font-medium text-sm max-w-[70%]">No dejes para mañana lo que puedes levantar hoy.</p>
                </div>
                {/* Decoration */}
                <div className="absolute right-[-20%] bottom-[-20%] opacity-20 text-[120px] leading-none">
                    🏋️‍♂️
                </div>
            </div>

            {/* Weekly Progress */}
            <div className="glass-panel rounded-2xl p-5 border-white/5">
                <div className="flex justify-between items-end mb-3">
                    <h3 className="text-white font-bold text-lg">Tu Semana</h3>
                    <span className="text-brand font-black">2 / 4 Clases</span>
                </div>
                <div className="flex gap-2 w-full h-3">
                    <div className="flex-1 bg-brand rounded-full"></div>
                    <div className="flex-1 bg-brand rounded-full"></div>
                    <div className="flex-1 bg-white/10 rounded-full"></div>
                    <div className="flex-1 bg-white/10 rounded-full"></div>
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center mt-3">¡Vas por buen camino! Agenda tus turnos faltantes.</p>
            </div>

            {/* Next Class */}
            <div className="glass-panel rounded-2xl p-1 border-white/5 overflow-hidden border border-brand/30">
                <div className="p-4 flex gap-4">
                    <div className="w-16 h-16 rounded-xl bg-white/5 flex flex-col items-center justify-center border border-white/10 shrink-0">
                        <span className="text-sm font-black text-brand">HOY</span>
                        <span className="text-xl font-bold text-white">18:00</span>
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-xs font-bold text-brand uppercase tracking-wider">Turno Confirmado</span>
                        <h4 className="text-white font-bold text-lg leading-tight mt-1">Semi Personalizado</h4>
                    </div>
                </div>
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-gray-300 font-medium text-sm transition-colors uppercase tracking-wider mt-2 border-t border-white/5">
                    Cancelar Reserva
                </button>
            </div>
        </div>
    )
}