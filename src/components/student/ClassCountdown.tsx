'use client'

import React, { useState, useEffect } from 'react'
import { Clock, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ClassCountdownProps {
    nextClass: any
}

export default function ClassCountdown({ nextClass }: ClassCountdownProps) {
    const [timeLeft, setTimeLeft] = useState<string>('')
    const [isNear, setIsNear] = useState(false)

    useEffect(() => {
        if (!nextClass) return

        const calculateTime = () => {
            const classDate = new Date(nextClass.date)
            const [hours, minutes] = nextClass.startTime.split(':')
            classDate.setHours(parseInt(hours), parseInt(minutes), 0)

            const now = new Date()
            const diff = classDate.getTime() - now.getTime()

            if (diff <= 0) {
                setTimeLeft('¡Ya comenzó!')
                setIsNear(true)
                return
            }

            const h = Math.floor(diff / (1000 * 60 * 60))
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            
            setIsNear(h < 1) // Menos de 1 hora

            if (h > 24) {
                setTimeLeft(`${Math.floor(h / 24)}d ${h % 24}h`)
            } else {
                setTimeLeft(`${h}h ${m}m`)
            }
        }

        calculateTime()
        const timer = setInterval(calculateTime, 60000) // Update every minute
        return () => clearInterval(timer)
    }, [nextClass])

    if (!nextClass) return (
        <div className="bg-zinc-900/50 rounded-2xl p-4 border border-white/5 flex items-center justify-center gap-3">
            <Clock size={16} className="text-zinc-600" />
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Sin turnos próximos</span>
        </div>
    )

    return (
        <div className={cn(
            "relative overflow-hidden rounded-2xl p-4 border transition-all duration-500",
            isNear 
                ? "bg-brand/10 border-brand shadow-[0_0_20px_rgba(255,230,0,0.1)]" 
                : "bg-zinc-900 border-white/5"
        )}>
            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        isNear ? "bg-brand text-black" : "bg-white/5 text-brand"
                    )}>
                        <Zap size={16} className={isNear ? "animate-pulse" : ""} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Próxima Clase</p>
                        <h4 className="text-sm font-bold text-white uppercase italic">
                            {nextClass.classTypeId?.name} - {nextClass.startTime}
                        </h4>
                    </div>
                </div>
                
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Comienza en</p>
                    <p className={cn(
                        "text-xl font-black italic tracking-tighter",
                        isNear ? "text-brand" : "text-white"
                    )}>
                        {timeLeft}
                    </p>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-brand/5 to-transparent pointer-events-none" />
        </div>
    )
}
