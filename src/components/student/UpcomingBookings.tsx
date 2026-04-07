'use client'

import React, { useTransition } from 'react'
import { Calendar, Trash2, Loader2, MapPin, Clock } from 'lucide-react'
import { cancelBooking } from '@/actions/bookings'
import { cn } from '@/lib/utils'

interface UpcomingBookingsProps {
    bookings: any[]
    showHistory?: boolean
}

export default function UpcomingBookings({ bookings, showHistory = false }: UpcomingBookingsProps) {
    const [isPending, startTransition] = useTransition()

    // Filter bookings based on role
    const filteredBookings = showHistory 
        ? bookings 
        : bookings.filter(b => b.status === 'confirmed')

    const handleCancel = async (id: string) => {
        if (!confirm('¿Deseas cancelar esta reserva?')) return
        startTransition(async () => {
            await cancelBooking(id)
        })
    }

    if (filteredBookings.length === 0) return null

    return (
        <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-zinc-800" />
                Turnos Confirmados
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
                {filteredBookings.map((booking: any) => {
                    const session = booking.sessionId
                    const dateStr = new Date(session.date).toLocaleDateString('es-ES', { 
                        weekday: 'short', 
                        day: 'numeric', 
                        month: 'short' 
                    })
                    
                    const isPast = booking.status === 'attended' || booking.status === 'cancelled'

                    return (
                        <div 
                            key={booking._id}
                            className={cn(
                                "bg-zinc-900 border rounded-[2rem] overflow-hidden shadow-[0_0_20px_rgba(255,230,0,0.05)] animate-in slide-in-from-left-4 duration-500",
                                !isPast ? "border-brand/40" : "border-white/5 opacity-80"
                            )}
                        >
                            <div className="p-5 flex gap-5">
                                <div className={cn(
                                    "w-16 h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-lg",
                                    !isPast ? "bg-brand text-black" : "bg-zinc-800 text-zinc-500"
                                )}>
                                    <span className="text-[10px] font-black uppercase leading-tight">{dateStr.split(' ')[0]}</span>
                                    <span className="text-2xl font-black leading-none">{dateStr.split(' ')[1]}</span>
                                </div>
                                
                                <div className="flex flex-col justify-center flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Clock size={12} className="text-brand" />
                                        <span className="text-sm font-bold text-white uppercase tracking-wider">{session.startTime}</span>
                                    </div>
                                    <h4 className="text-white font-black text-xl leading-tight uppercase italic tracking-tighter">
                                        {session.classTypeId?.name}
                                    </h4>
                                </div>
                            </div>

                            <button 
                                onClick={() => handleCancel(booking._id)}
                                disabled={isPending}
                                className="w-full py-4 bg-white/5 hover:bg-red-500/10 text-zinc-400 hover:text-red-500 font-bold text-xs transition-all uppercase tracking-[0.2em] mt-2 border-t border-white/5 flex items-center justify-center gap-2"
                            >
                                {isPending ? <Loader2 size={14} className="animate-spin" /> : <><Trash2 size={14} /> Cancelar Turno</>}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
