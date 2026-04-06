'use client'

import { useState } from 'react'

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

// Helper to mimic the grid colors
const getColorForClass = (type: string) => {
    switch (type) {
        case 'Personalizado': return 'bg-red-600 text-white border-red-500' /* Based on 7:00 y 12:00 bloque rojo */
        case 'Personalizado G2': return 'bg-brand text-black border-yellow-400' /* based on 9:00 bloque amarillo */
        case 'Semi Personalizado': return 'bg-white text-black border-gray-200'
        case 'Personalizado y Deportivo': return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white border-orange-500'
        case 'Deportivo': return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white border-orange-500'
        case 'Niños': return 'bg-brand text-black border-yellow-400'
        case 'Levantamiento Olímpico': return 'bg-red-700 text-white border-red-900'
        case 'Entrenamiento Libre': return 'bg-white text-black border-gray-200'
        default: return 'bg-panel text-white border-border'
    }
}

// Simulando la data de un día Lunes basándonos en la foto
const MOCK_SCHEDULE = [
    { time: '07:00', type: 'Personalizado', status: 'Lleno', slots: '5/5' },
    { time: '08:00', type: 'Semi Personalizado', status: 'Disponible', slots: '3/8' },
    { time: '09:00', type: 'Personalizado G2', status: 'Disponible', slots: '1/5' },
    { time: '10:00', type: 'Personalizado y Deportivo', status: 'Disponible', slots: '5/10' },
    { time: '12:00', type: 'Personalizado', status: 'Lleno', slots: '5/5' },
    { time: '15:00', type: 'Personalizado y Deportivo', status: 'Disponible', slots: '4/10' },
    { time: '16:00', type: 'Deportivo', status: 'Disponible', slots: '12/20' },
    { time: '17:00', type: 'Niños', status: 'Disponible', slots: '10/15' },
    { time: '18:00', type: 'Semi Personalizado', status: 'Lleno', slots: '8/8' },
    { time: '19:00', type: 'Deportivo', status: 'Disponible', slots: '18/20' },
    { time: '20:00', type: 'Semi Personalizado', status: 'Disponible', slots: '6/8' },
]

export default function BookingsPage() {
    const [selectedDay, setSelectedDay] = useState('Lunes')

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom flex flex-col h-full fade-in duration-500 pb-10">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Turnos y Grilla</h1>
                <p className="text-gray-400 text-sm">Selecciona un día para reservar clase.</p>
            </div>

            {/* Day Selector (Horizontal Scroll) */}
            <div className="flex overflow-x-auto gap-3 pb-2 snap-x hide-scrollbar">
                {DAYS.map((day) => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`snap-center shrink-0 px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                            selectedDay === day
                                ? 'bg-brand text-black shadow-[0_0_10px_rgba(255,230,0,0.5)]'
                                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                        }`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {/* List of Time Slots */}
            <div className="space-y-4 mt-6">
                {selectedDay === 'Sábado' ? (
                    <div className="glass-panel p-8 rounded-2xl text-center border-white/10">
                        <span className="text-4xl mb-4 block">🏟️</span>
                        <h3 className="text-xl font-bold text-white mb-2">Entrenamiento Libre</h3>
                        <p className="text-gray-400 text-sm">Horario de llegada libre de 9:00 a 11:00 hs. ¡No se requiere reserva previa!</p>
                    </div>
                ) : (
                    MOCK_SCHEDULE.map((slot, idx) => (
                        <div key={idx} className={`relative flex items-stretch rounded-2xl overflow-hidden border ${getColorForClass(slot.type)}`}>
                            {/* Time Block (left) */}
                            <div className="w-20 shrink-0 bg-black/30 backdrop-blur-sm flex items-center justify-center border-r border-[inherit]/20">
                                <span className="font-black text-lg tracking-tighter">{slot.time}</span>
                            </div>
                            
                            {/* Content Block (Right) */}
                            <div className="flex-1 p-4 flex flex-col justify-center">
                                <h4 className="font-bold text-lg leading-tight mb-1 uppercase tracking-wider text-inherit drop-shadow-md">{slot.type}</h4>
                                <div className="flex justify-between items-center mt-2">
                                    <span className={`text-xs font-bold px-2 py-1 rounded border border-black/20 bg-black/10`}>
                                        {slot.slots}
                                    </span>
                                    <button 
                                        disabled={slot.status === 'Lleno'}
                                        className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-transform active:scale-95 ${
                                            slot.status === 'Lleno' 
                                                ? 'bg-black/20 text-white/50 cursor-not-allowed opacity-50' 
                                                : 'bg-black/50 text-white hover:bg-black/70'
                                        }`}
                                    >
                                        {slot.status === 'Lleno' ? 'Sin Cupo' : 'Reservar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
