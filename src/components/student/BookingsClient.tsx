'use client'

import React, { useState } from 'react'
import { Calendar, History, Plus, Clock, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import BookingList from './BookingList'
import UpcomingBookings from './UpcomingBookings'

interface BookingsClientProps {
    sessions: any[]
    bookings: any[]
}

export default function BookingsClient({ sessions, bookings }: BookingsClientProps) {
    const [activeTab, setActiveTab] = useState<'mine' | 'all'>('mine')

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-24">
            {/* Page Header */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-brand font-black uppercase tracking-[0.2em] text-[10px]">
                    <div className="w-8 h-[1px] bg-brand" />
                    Gestión de Clases
                </div>
                <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
                    Mis <span className="text-brand">Turnos</span>
                </h1>
            </div>

            {/* Custom Premium Tabs */}
            <div className="flex p-1 bg-zinc-900/50 border border-white/5 rounded-2xl">
                <button
                    onClick={() => setActiveTab('mine')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                        activeTab === 'mine' 
                            ? "bg-brand text-black shadow-lg" 
                            : "text-zinc-500 hover:text-white"
                    )}
                >
                    <Clock size={14} />
                    Mi Agenda
                </button>
                <button
                    onClick={() => setActiveTab('all')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                        activeTab === 'all' 
                            ? "bg-brand text-black shadow-lg" 
                            : "text-zinc-500 hover:text-white"
                    )}
                >
                    <Plus size={14} />
                    Reservar
                </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[40vh]">
                {activeTab === 'mine' ? (
                    <div className="space-y-8">
                        {bookings.length > 0 ? (
                            <UpcomingBookings bookings={bookings} showHistory={true} />
                        ) : (
                            <div className="flex flex-col items-center justify-center p-16 bg-zinc-900/20 border border-dashed border-white/10 rounded-[2.5rem] text-center">
                                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-white/5">
                                    <Calendar size={24} className="text-zinc-700" />
                                </div>
                                <h3 className="text-white font-black uppercase italic tracking-tighter text-lg mb-2">No tienes turnos</h3>
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest max-w-[200px]">
                                    Todavía no te has anotado a ninguna clase esta semana.
                                </p>
                                <button 
                                    onClick={() => setActiveTab('all')}
                                    className="mt-8 px-8 py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-brand hover:bg-brand hover:text-black transition-all"
                                >
                                    Ver Grilla Disponible
                                </button>
                            </div>
                        )}
                        
                        {/* History Placeholder or Info */}
                        <div className="pt-8 border-t border-white/5">
                            <div className="flex items-center gap-2 text-zinc-600 text-[8px] font-black uppercase tracking-[0.2em]">
                                <History size={10} />
                                Info de Asistencia
                            </div>
                            <p className="mt-2 text-zinc-500 text-[10px] leading-relaxed">
                                Recuerda que puedes cancelar tu turno hasta 2 horas antes de la clase. Pasado ese tiempo, la clase se contará como asistida.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Clases Disponibles</h3>
                            <div className="px-3 py-1 bg-brand/10 border border-brand/20 rounded-full text-[8px] font-black text-brand uppercase">
                                Próximos 7 días
                            </div>
                        </div>
                        <BookingList sessions={sessions} />
                    </div>
                )}
            </div>
        </div>
    )
}
