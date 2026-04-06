'use client'

import React, { useState, useTransition } from 'react'
import { Calendar, Users, Check, Loader2, Plus, Info } from 'lucide-react'
import { createBooking } from '@/actions/bookings'
import { cn } from '@/lib/utils'

interface BookingListProps {
    sessions: any[]
}

export default function BookingList({ sessions }: BookingListProps) {
    const [isPending, startTransition] = useTransition()
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

    const handleBooking = async (session: any) => {
        setSelectedSessionId(session._id)
        setMessage(null)
        
        startTransition(async () => {
            try {
                const res = await createBooking(session)
                if (res.success) {
                    setMessage({ text: '¡Reserva confirmada!', type: 'success' })
                }
            } catch (error: any) {
                setMessage({ text: error.message || 'Error al reservar', type: 'error' })
            } finally {
                setSelectedSessionId(null)
            }
        })
    }

    if (sessions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/20 border border-dashed border-white/10 rounded-[2rem]">
                <Info size={40} className="text-zinc-700 mb-4" />
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Próximamente</p>
                <p className="text-zinc-600 text-xs mt-1">La grilla se está preparando.</p>
            </div>
        )
    }

    // Group by Date for better UX
    const grouped = sessions.reduce((acc: any, s: any) => {
        const dateKey = new Date(s.date).toLocaleDateString('es-ES', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
        })
        if (!acc[dateKey]) acc[dateKey] = []
        acc[dateKey].push(s)
        return acc
    }, {})

    return (
        <div className="space-y-8 pb-20">
            {Object.keys(grouped).map((date) => (
                <div key={date} className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-zinc-800" />
                        {date}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-3">
                        {grouped[date].map((session: any) => {
                            const isFull = session.bookedCount >= session.capacity
                            const isLoading = isPending && selectedSessionId === session._id

                            return (
                                <div 
                                    key={session._id}
                                    className={cn(
                                        "group relative overflow-hidden bg-zinc-900/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between transition-all hover:bg-zinc-900/60 active:scale-[0.98]",
                                        isFull && "opacity-60 grayscale cursor-not-allowed"
                                    )}
                                >
                                    {/* Color Indicator */}
                                    <div 
                                        className="absolute left-0 top-0 bottom-0 w-1.5 opacity-80" 
                                        style={{ backgroundColor: session.classTypeId?.color || '#FFE600' }}
                                    />

                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center justify-center min-w-[60px] h-12 bg-white/5 rounded-xl border border-white/5">
                                            <span className="text-lg font-black text-white">{session.startTime}</span>
                                        </div>
                                        
                                        <div className="flex flex-col">
                                            <h4 className="font-bold text-white text-base leading-tight">
                                                {session.classTypeId?.name}
                                            </h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <div className="flex items-center gap-1">
                                                    <Users size={12} className="text-zinc-500" />
                                                    <span className="text-[10px] font-bold text-zinc-400">
                                                        {session.bookedCount} / {session.capacity}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => !isFull && handleBooking(session)}
                                        disabled={isFull || isPending}
                                        className={cn(
                                            "h-10 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                                            isFull 
                                                ? "bg-zinc-800 text-zinc-500" 
                                                : "bg-brand text-black hover:bg-brand-hover active:scale-95"
                                        )}
                                    >
                                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : isFull ? 'Lleno' : 'Reservar'}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}

            {/* Message Toast (Simplified) */}
            {message && (
                <div className={cn(
                    "fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full font-bold text-sm shadow-2xl animate-in slide-in-from-bottom-8 duration-300 z-50",
                    message.type === 'success' ? "bg-green-500 text-white" : "bg-red-500 text-white"
                )}>
                    {message.text}
                </div>
            )}
        </div>
    )
}
