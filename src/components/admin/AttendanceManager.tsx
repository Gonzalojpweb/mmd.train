'use client'

import React, { useState, useTransition } from 'react'
import { CheckCircle, Circle, User, Clock, Calendar, Users, ChevronRight, Search } from 'lucide-react'
import { toggleAttendance } from '@/actions/bookings'
import { cn } from '@/lib/utils'

interface AttendanceManagerProps {
    initialSessions: any[]
}

export default function AttendanceManager({ initialSessions }: AttendanceManagerProps) {
    const [isPending, startTransition] = useTransition()
    const [sessions, setSessions] = useState(initialSessions)
    const [searchTerm, setSearchTerm] = useState('')

    const handleToggle = async (bookingId: string, currentStatus: string, sessionId: string) => {
        startTransition(async () => {
            await toggleAttendance(bookingId, currentStatus)
            // Local update for immediate feedback
            setSessions(prev => prev.map(s => {
                if (s._id === sessionId) {
                    return {
                        ...s,
                        bookings: s.bookings.map((b: any) => 
                            b._id === bookingId ? { ...b, status: currentStatus === 'attended' ? 'confirmed' : 'attended' } : b
                        )
                    }
                }
                return s
            }))
        })
    }

    if (sessions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-20 bg-zinc-900/20 border border-dashed border-white/10 rounded-[3rem]">
                <Calendar size={48} className="text-zinc-700 mb-4" />
                <h4 className="text-white font-bold text-lg">Sin clases para hoy</h4>
                <p className="text-zinc-500 text-sm">No se han registrado clases ni reservas para esta fecha.</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                    type="text" 
                    placeholder="Buscar alumno..."
                    className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-white focus:border-brand outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sessions.map((session) => (
                    <div 
                        key={session._id} 
                        className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm"
                    >
                        {/* Session Header */}
                        <div 
                            className="p-6 border-b border-white/5 flex items-center justify-between"
                            style={{ borderLeft: `6px solid ${session.classTypeId?.color || '#FFE600'}` }}
                        >
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock size={14} className="text-zinc-400" />
                                    <span className="text-sm font-black text-white">{session.startTime}</span>
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-2">• {session.classTypeId?.name}</span>
                                </div>
                                <h4 className="text-white font-black text-xl uppercase italic tracking-tighter">
                                    Lista de Asistencia
                                </h4>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-brand font-black text-2xl">{session.bookings.length}</span>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase">Anotados</span>
                            </div>
                        </div>

                        {/* Bookings List */}
                        <div className="p-2">
                            {session.bookings.length === 0 ? (
                                <p className="p-8 text-center text-zinc-600 text-sm italic">Nadie se ha anotado todavía.</p>
                            ) : (
                                <div className="divide-y divide-white/5">
                                    {session.bookings
                                        .filter((b: any) => b.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) || b.userId.email.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((booking: any) => (
                                        <div 
                                            key={booking._id}
                                            className="p-4 flex items-center justify-between group hover:bg-white/[0.02] transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-500 overflow-hidden">
                                                    {booking.userId.image ? (
                                                        <img src={booking.userId.image} alt={booking.userId.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User size={20} />
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-white font-bold text-sm">{booking.userId.name}</span>
                                                    <span className="text-[10px] text-zinc-500 font-medium">{booking.userId.email}</span>
                                                </div>
                                            </div>

                                            <button 
                                                onClick={() => handleToggle(booking._id, booking.status, session._id)}
                                                disabled={isPending}
                                                className={cn(
                                                    "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all active:scale-95",
                                                    booking.status === 'attended' 
                                                        ? "bg-green-500/10 border-green-500/30 text-green-500" 
                                                        : "bg-zinc-800/50 border-white/5 text-zinc-500 hover:text-white"
                                                )}
                                            >
                                                {booking.status === 'attended' ? <CheckCircle size={18} /> : <Circle size={18} />}
                                                <span className="text-[10px] font-black uppercase tracking-widest">
                                                    {booking.status === 'attended' ? 'Presente' : 'Marcar'}
                                                </span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
