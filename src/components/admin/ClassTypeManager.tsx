'use client'

import React, { useState } from 'react'
import { Plus, Trash2, Edit2, Check, X, Palette } from 'lucide-react'
import { createClassType, updateClassType, deleteClassType } from '@/actions/classes'
import { cn } from '@/lib/utils'

interface ClassTypeManagerProps {
    initialTypes: any[]
}

export default function ClassTypeManager({ initialTypes }: ClassTypeManagerProps) {
    const [types, setTypes] = useState(initialTypes)
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    
    // Form state
    const [formData, setFormData] = useState({ name: '', color: '#FFE600' })
    const [isLoading, setIsLoading] = useState(false)

    const handleCreate = async () => {
        if (!formData.name) return
        setIsLoading(true)
        try {
            const newType = await createClassType(formData)
            setTypes([...types, newType])
            setFormData({ name: '', color: '#FFE600' })
            setIsAdding(false)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este tipo de clase?')) return
        try {
            await deleteClassType(id)
            setTypes(types.filter(t => t._id !== id))
        } catch (error) {
            console.error(error)
        }
    }

    const handleUpdate = async (id: string) => {
        setIsLoading(true)
        try {
            const updated = await updateClassType(id, formData)
            setTypes(types.map(t => t._id === id ? updated : t))
            setEditingId(null)
            setFormData({ name: '', color: '#FFE600' })
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const startEdit = (type: any) => {
        setEditingId(type._id)
        setFormData({ name: type.name, color: type.color })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Tipos de Entrenamiento</h3>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-brand text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-brand-hover transition-colors"
                >
                    <Plus size={16} />
                    Nuevo Tipo
                </button>
            </div>

            {/* Formulario de Adición/Edición */}
            {(isAdding || editingId) && (
                <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Nombre</label>
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Ej: Personalizado"
                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Color</label>
                            <div className="flex gap-2">
                                <input 
                                    type="color" 
                                    value={formData.color}
                                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                                    className="h-12 w-16 bg-black border border-white/10 rounded-xl p-1 outline-none cursor-pointer"
                                />
                                <input 
                                    type="text" 
                                    value={formData.color}
                                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                                    className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-white uppercase font-mono text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <button 
                                onClick={editingId ? () => handleUpdate(editingId) : handleCreate}
                                disabled={isLoading}
                                className="flex-1 h-12 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? 'Guardando...' : <><Check size={18}/> {editingId ? 'Actualizar' : 'Crear'}</>}
                            </button>
                            <button 
                                onClick={() => { setIsAdding(false); setEditingId(null); setFormData({name: '', color: '#FFE600'}); }}
                                className="h-12 w-12 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-all flex items-center justify-center"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Lista de Tipos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {types.map((type: any) => (
                    <div 
                        key={type._id}
                        className="group relative bg-zinc-900/30 border border-white/5 rounded-2xl p-5 hover:border-brand/30 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div 
                                    className="w-4 h-4 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]" 
                                    style={{ backgroundColor: type.color || '#FFE600' }}
                                />
                                <h4 className="font-bold text-lg text-white group-hover:text-brand transition-colors">
                                    {type.name}
                                </h4>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => startEdit(type)}
                                    className="p-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all"
                                >
                                    <Edit2 size={14} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(type._id)}
                                    className="p-2 bg-red-950/30 text-red-500 rounded-lg hover:bg-red-950/50 transition-all border border-red-500/20"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        
                        {/* Indicador de color estético */}
                        <div 
                            className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-30"
                            style={{ backgroundColor: type.color }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
