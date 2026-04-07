'use client'

import { useState, useEffect, use as useReact } from 'react'
import { getUserById } from '@/actions/users'
import BodyRecordForm from '@/components/BodyRecordForm'
import {
    User,
    Target,
    Clock,
    Plus,
    ChevronRight,
    Zap,
    Calendar,
    Users
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BodyRecord {
    _id: string
    date: string
    weight: number
    height: number
    age: number
    sex: 'male' | 'female'
    imc: number
    imcClassification: string
    idealWeight: number
}

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = useReact(params)
    const [user, setUser] = useState<any>(null)
    const [records, setRecords] = useState<BodyRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            const userData = await getUserById(id)
            setUser(userData)

            const res = await fetch(`/api/body-records?userId=${id}`)
            if (res.ok) {
                const recordsData = await res.json()
                setRecords(recordsData)
            }
        } catch (error) {
            console.error('Error fetching student data:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    if (loading && !user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Zap className="animate-spin text-brand" size={48} />
            </div>
        )
    }

    const latestRecord = records.length > 0 ? records[0] : null

    return (
        <div className="space-y-8 pb-20 animate-in fade-in duration-700">
            {/* Header / Navigation */}
            <div className="flex items-center justify-between">
                <Link
                    href="/admin/users"
                    className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
                >
                    <div className="p-2 bg-zinc-900 border border-white/5 rounded-xl group-hover:border-brand/40 transition-all">
                        <ChevronRight size={18} className="rotate-180" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Volver a Alumnos</span>
                </Link>

                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-brand text-black px-6 py-3 rounded-2xl font-black uppercase italic text-xs hover:scale-105 transition-all shadow-lg shadow-brand/20"
                >
                    <Plus size={18} />
                    Nueva Medición
                </button>
            </div>

            {/* Profile Summary Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    {/* User Info Card */}
                    <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-[80px] -mr-16 -mt-16 rounded-full" />

                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center p-1 mb-6">
                                {user?.image ? (
                                    <img src={user.image} alt={user.name} className="w-full h-full object-cover rounded-2xl" />
                                ) : (
                                    <User size={40} className="text-zinc-700" />
                                )}
                            </div>
                            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-1">
                                {user?.name}
                            </h2>
                            <p className="text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                                # {user?._id?.toString().slice(-6) || '......'}
                            </p>

                            <div className="grid grid-cols-2 gap-4 w-full mt-4">
                                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4">
                                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Edad</p>
                                    <p className="text-lg font-black text-white italic">{latestRecord?.age || '—'}</p>
                                </div>
                                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4">
                                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Sexo</p>
                                    <p className="text-lg font-black text-white italic uppercase">{latestRecord?.sex === 'male' ? 'M' : latestRecord?.sex === 'female' ? 'F' : '—'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    {latestRecord && (
                        <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8">
                            <div className="flex items-center gap-2 mb-6">
                                <Zap size={18} className="text-brand" />
                                <h3 className="text-sm font-black uppercase italic tracking-tighter text-white">Estado Actual</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-brand">
                                            <Users size={18} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Peso</span>
                                    </div>
                                    <span className="text-xl font-black text-white italic">{latestRecord.weight}<small className="text-[10px] ml-1 opacity-50 not-italic">kg</small></span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-brand">
                                            <ChevronRight size={18} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Altura</span>
                                    </div>
                                    <span className="text-xl font-black text-white italic">{latestRecord.height}<small className="text-[10px] ml-1 opacity-50 not-italic">cm</small></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Stats Area */}
                <div className="lg:col-span-2 space-y-8">
                    {latestRecord ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* IMC Card */}
                            <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Zap size={80} />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                        Índice de Masa Corporal
                                        <Target size={12} />
                                    </p>
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <h4 className="text-2xl md:text-4xl font-black italic tracking-tighter text-white">{latestRecord.imc}</h4>
                                        <span className={cn(
                                            "px-3 py-1 rounded-lg text-[10px] font-black uppercase italic",
                                            latestRecord.imcClassification === 'Normal' ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"
                                        )}>
                                            {latestRecord.imcClassification}
                                        </span>
                                    </div>

                                    <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden mt-8">
                                        <div
                                            className="h-full bg-brand"
                                            style={{ width: `${Math.min((latestRecord.imc / 40) * 100, 100)}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-2 text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                                        <span>Bajo</span>
                                        <span>Normal</span>
                                        <span>Sobrepeso</span>
                                        <span>Obeso</span>
                                    </div>
                                </div>
                            </div>

                            {/* Ideal Weight Card */}
                            <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Target size={80} />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                        Peso Ideal Estimado
                                        <Target size={12} />
                                    </p>
                                    <div className="flex items-baseline gap-2 mb-8">
                                        <h4 className="text-2xl md:text-4xl font-black italic tracking-tighter text-white">{latestRecord.idealWeight}</h4>
                                        <span className="text-zinc-500 text-sm font-black italic">kg</span>
                                    </div>
                                    <p className="text-[10px] text-zinc-500 font-bold max-w-[200px] leading-relaxed uppercase tracking-wider">
                                        Cálculo basado en la fórmula de Devine según género y estatura.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-zinc-950 border border-dashed border-white/10 rounded-[2.5rem] p-20 flex flex-col items-center text-center">
                            <Zap size={48} className="text-zinc-800 mb-6" />
                            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">Sin mediciones registradas</h3>
                            <p className="text-zinc-500 text-sm mb-8">Todavía no hay datos antropométricos para este alumno.</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="bg-zinc-900 border border-white/5 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-brand/40 hover:text-brand transition-all"
                            >
                                Iniciar Seguimiento
                            </button>
                        </div>
                    )}

                    {/* History Section */}
                    {records.length > 0 && (
                        <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden">
                            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Clock size={18} className="text-brand" />
                                    <h3 className="text-sm font-black uppercase italic tracking-tighter text-white">Historial de Mediciones</h3>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="px-8 py-4 text-[8px] font-black text-zinc-600 uppercase tracking-widest">Fecha</th>
                                            <th className="px-8 py-4 text-[8px] font-black text-zinc-600 uppercase tracking-widest">Peso</th>
                                            <th className="px-8 py-4 text-[8px] font-black text-zinc-600 uppercase tracking-widest">IMC</th>
                                            <th className="px-8 py-4 text-[8px] font-black text-zinc-600 uppercase tracking-widest">Clasificación</th>
                                            <th className="px-8 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {records.map((record) => (
                                            <tr key={record._id} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-4 md:px-8 py-6">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar size={14} className="text-zinc-600" />
                                                        <span className="text-[10px] md:text-xs font-bold text-white uppercase italic">
                                                            {new Date(record.date).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 md:px-8 py-6">
                                                    <span className="text-xs md:text-sm font-black text-white italic">{record.weight} kg</span>
                                                </td>
                                                <td className="px-4 md:px-8 py-6">
                                                    <span className="text-xs md:text-sm font-black text-brand italic">{record.imc}</span>
                                                </td>
                                                <td className="px-4 md:px-8 py-6 hidden sm:table-cell">
                                                    <span className={cn(
                                                        "px-2 py-1 rounded text-[8px] font-black uppercase italic",
                                                        record.imcClassification === 'Normal' ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"
                                                    )}>
                                                        {record.imcClassification}
                                                    </span>
                                                </td>
                                                <td className="px-4 md:px-8 py-6 text-right">
                                                    <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 transition-all">
                                                        <ChevronRight size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Form */}
            {showForm && (
                <BodyRecordForm
                    userId={id}
                    onClose={() => setShowForm(false)}
                    onSuccess={fetchData}
                />
            )}
        </div>
    )
}
