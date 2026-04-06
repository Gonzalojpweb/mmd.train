'use client'

import React from 'react'
import { Trophy, Star, Target, Flame, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GamificationStatsProps {
    stats: {
        attendedCount: number
        confirmedCount: number
        attendedThisMonth: number
        planLimit: number
    }
}

export default function GamificationStats({ stats }: GamificationStatsProps) {
    const progress = (stats.attendedThisMonth / stats.planLimit) * 100
    const roundedProgress = Math.min(Math.round(progress), 100)

    const getMessage = () => {
        if (roundedProgress >= 100) return "🔥 ¡Campeón! Has completado tu plan este mes."
        if (roundedProgress >= 50) return "⚡ ¡Vas por excelente camino! La constancia es la clave."
        if (roundedProgress > 0) return "💪 ¡Buen comienzo! Cada paso te acerca a tu meta."
        return "🏋️‍♂️ ¡Empecemos con todo! Reserva tu primera clase."
    }

    return (
        <div className="space-y-6">
            {/* Progress Gauge */}
            <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-white/5"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={364}
                                strokeDashoffset={364 - (364 * roundedProgress) / 100}
                                strokeLinecap="round"
                                className="text-brand transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black italic tracking-tighter text-white">{roundedProgress}%</span>
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Logrado</span>
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">Mi Meta Mensual</h4>
                        <p className="text-sm text-zinc-400 font-medium">{getMessage()}</p>
                    </div>
                </div>

                {/* Decoration */}
                <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                    <Trophy size={160} className="text-brand" />
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 group flex flex-col justify-between hover:border-brand/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-white/5 rounded-lg text-brand group-hover:bg-brand group-hover:text-black transition-colors">
                            <Flame size={18} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Total</span>
                    </div>
                    <div>
                        <p className="text-3xl font-black text-white tracking-tighter">{stats.attendedCount}</p>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Clases Completas</p>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 group flex flex-col justify-between hover:border-brand/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-white/5 rounded-lg text-brand group-hover:bg-brand group-hover:text-black transition-colors">
                            <Target size={18} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Reservado</span>
                    </div>
                    <div>
                        <p className="text-3xl font-black text-white tracking-tighter">{stats.confirmedCount}</p>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Próximos Turnos</p>
                    </div>
                </div>
            </div>

            {/* Loyalty Badge / Experience Bar */}
            <div className="bg-black border border-white/10 rounded-2xl p-4 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center relative overflow-hidden group-hover:bg-brand/10 transition-colors">
                    <TrendingUp size={24} className="text-brand opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1.5">
                        <span className="text-white">Nivel Guerrero</span>
                        <span className="text-brand">Exp: {stats.attendedCount * 10} pts</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-brand rounded-full transition-all duration-1000" 
                            style={{ width: `${(stats.attendedCount % 10) * 10}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
