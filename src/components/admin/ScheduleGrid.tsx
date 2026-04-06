'use client'

import React, { useState } from 'react'
import { Plus, Clock, Users, User, Trash2, Edit2, Calendar } from 'lucide-react'
import { deleteScheduleSlot, createScheduleSlot, updateScheduleSlot } from '@/actions/classes'
import { cn } from '@/lib/utils'

interface ScheduleGridProps {
    initialSlots: any[]
    classTypes: any[]
}

const DAYS = [
    { name: 'Lunes', value: 1 },
    { name: 'Martes', value: 2 },
    { name: 'Miércoles', value: 3 },
    { name: 'Jueves', value: 4 },
    { name: 'Viernes', value: 5 },
    { name: 'Sábados', value: 6 },
]

const TIMES = [
    '07:00', '08:00', '09:00', '10:00', '12:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
]

export default function ScheduleGrid({ initialSlots, classTypes }: ScheduleGridProps) {
    const [slots, setSlots] = useState(initialSlots)
    const [selectedSlot, setSelectedSlot] = useState<any>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        classTypeId: '',
        dayOfWeek: 1,
        startTime: '08:00',
        endTime: '09:00',
        capacity: 15,
        instructor: ''
    })

    const handleSave = async () => {
        if (!formData.classTypeId || !formData.startTime) return
        try {
            if (selectedSlot) {
                const updated = await updateScheduleSlot(selectedSlot._id, formData)
                setSlots(slots.map(s => s._id === selectedSlot._id ? { ...updated, classTypeId: classTypes.find(ct => ct._id === formData.classTypeId) } : s))
            } else {
                const created = await createScheduleSlot(formData)
                setSlots([...slots, { ...created, classTypeId: classTypes.find(ct => ct._id === formData.classTypeId) }])
            }
            closeModal()
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        if (!confirm('¿Eliminar este horario?')) return
        try {
            await deleteScheduleSlot(id)
            setSlots(slots.filter(s => s._id !== id))
        } catch (error) {
            console.error(error)
        }
    }

    const openModal = (day?: number, time?: string, slot?: any) => {
        if (slot) {
            setSelectedSlot(slot)
            setFormData({
                classTypeId: slot.classTypeId._id,
                dayOfWeek: slot.dayOfWeek,
                startTime: slot.startTime,
                endTime: slot.endTime,
                capacity: slot.capacity,
                instructor: slot.instructor || ''
            })
        } else {
            setSelectedSlot(null)
            setFormData({
                ...formData,
                dayOfWeek: day || 1,
                startTime: time || '08:00',
                endTime: time ? `${parseInt(time.split(':')[0]) + 1}:00` : '09:00'
            })
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedSlot(null)
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between overflow-x-auto pb-2">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-white/5 rounded-full text-xs text-zinc-400">
                        <Calendar size={12} className="text-brand" />
                        Grilla Semanal
                    </div>
                </div>
            </div>

            {/* Grid Container */}
            <div className="relative overflow-x-auto rounded-3xl border border-white/10 bg-zinc-950/50 backdrop-blur-xl">
                <div className="min-w-[800px]">
                    {/* Header */}
                    <div className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-white/10">
                        <div className="p-4 flex items-center justify-center border-r border-white/10 bg-zinc-900/50">
                            <Clock size={16} className="text-zinc-500" />
                        </div>
                        {DAYS.map((day) => (
                            <div key={day.value} className="p-4 text-center font-black uppercase text-xs tracking-widest text-zinc-400 bg-zinc-900/20 last:bg-zinc-800/20">
                                {day.name}
                            </div>
                        ))}
                    </div>

                    {/* Body */}
                    {TIMES.map((time) => (
                        <div key={time} className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group">
                            {/* Time Label */}
                            <div className="p-4 text-center text-sm font-bold text-zinc-500 border-r border-white/10 bg-zinc-900/30">
                                {time}
                            </div>

                            {/* Day Cells */}
                            {DAYS.map((day) => {
                                const slot = slots.find(s => s.dayOfWeek === day.value && s.startTime === time)
                                return (
                                    <div 
                                        key={`${day.value}-${time}`} 
                                        className="relative p-2 h-24 border-r border-white/5 last:border-0 group/cell cursor-pointer"
                                        onClick={() => openModal(day.value, time, slot)}
                                    >
                                        {slot ? (
                                            <div 
                                                className="h-full w-full rounded-xl p-2 flex flex-col justify-between transition-all hover:scale-[1.02] active:scale-95 shadow-lg group-hover/cell:ring-2 ring-white/20"
                                                style={{ backgroundColor: slot.classTypeId?.color || '#333' }}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <span className="text-[10px] font-black uppercase leading-tight text-black/80 drop-shadow-sm truncate pr-4">
                                                        {slot.classTypeId?.name}
                                                    </span>
                                                    <button 
                                                        onClick={(e) => handleDelete(slot._id, e)}
                                                        className="opacity-0 group-hover/cell:opacity-100 p-1 bg-black/20 hover:bg-black/40 rounded-md transition-all text-black/80"
                                                    >
                                                        <Trash2 size={10} />
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="flex items-center gap-1 bg-black/10 px-1.5 py-0.5 rounded-full">
                                                        <Users size={8} className="text-black/60" />
                                                        <span className="text-[8px] font-bold text-black/80">{slot.capacity}</span>
                                                    </div>
                                                    {slot.instructor && (
                                                        <div className="flex items-center gap-1">
                                                            <User size={8} className="text-black/60" />
                                                            <span className="text-[8px] font-bold text-black/80 truncate max-w-[40px] uppercase">{slot.instructor}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-full w-full border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center opacity-0 group-hover/cell:opacity-100 transition-opacity hover:border-white/20">
                                                <Plus size={16} className="text-zinc-600" />
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal de Edición/Creación Pop-up */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-zinc-900 border border-white/10 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-6 flex items-center gap-2">
                            {selectedSlot ? 'Editar Horario' : 'Nuevo Horario'}
                            <div className="h-2 w-2 bg-brand rounded-full" />
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest pl-1">Tipo de Clase</label>
                                <select 
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand outline-none"
                                    value={formData.classTypeId}
                                    onChange={(e) => setFormData({...formData, classTypeId: e.target.value})}
                                >
                                    <option value="">Selecciona un tipo...</option>
                                    {classTypes.map(ct => (
                                        <option key={ct._id} value={ct._id}>{ct.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest pl-1">Capacidad</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white"
                                        value={formData.capacity}
                                        onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest pl-1">Instructor</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white"
                                        value={formData.instructor}
                                        onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                                        placeholder="Ej: Juan Peréz"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest pl-1">Desde</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white"
                                        value={formData.startTime}
                                        onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest pl-1">Hasta</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white"
                                        value={formData.endTime}
                                        onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button 
                                    onClick={handleSave}
                                    className="flex-1 bg-brand text-black font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-brand-hover transition-all text-sm"
                                >
                                    Guardar
                                </button>
                                <button 
                                    onClick={closeModal}
                                    className="px-6 bg-zinc-800 text-white font-bold rounded-2xl hover:bg-zinc-700 transition-all text-sm"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
