'use client'

import { useState } from 'react'
import { Plus, X, Loader2, Save } from 'lucide-react'

interface BodyRecordFormProps {
    userId: string
    onSuccess: () => void
    onClose: () => void
}

export default function BodyRecordForm({ userId, onSuccess, onClose }: BodyRecordFormProps) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        age: '',
        sex: 'male',
        date: new Date().toISOString().split('T')[0]
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/body-records', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    ...formData,
                    weight: Number(formData.weight),
                    height: Number(formData.height),
                    age: Number(formData.age),
                })
            })

            if (!res.ok) throw new Error('Error al guardar la medición')

            onSuccess()
            onClose()
        } catch (error) {
            console.error(error)
            alert('Error al guardar la medición')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-950 border border-white/10 w-full max-w-md rounded-[2rem] overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black uppercase italic tracking-tighter text-white">
                            Nueva <span className="text-brand">Medición</span>
                        </h2>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Registrar progreso físico</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-zinc-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Peso (kg)</label>
                            <input 
                                type="number" 
                                step="0.1"
                                required
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand/40 transition-all"
                                placeholder="75.5"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Altura (cm)</label>
                            <input 
                                type="number" 
                                required
                                value={formData.height}
                                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand/40 transition-all"
                                placeholder="175"
                            />
                            <p className="text-[8px] text-zinc-600 font-bold uppercase ml-1">Ingresar en cm (Ej: 175)</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Edad</label>
                            <input 
                                type="number" 
                                required
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand/40 transition-all"
                                placeholder="25"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Sexo</label>
                            <select 
                                value={formData.sex}
                                onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand/40 transition-all appearance-none"
                            >
                                <option value="male">Masculino</option>
                                <option value="female">Femenino</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Fecha de Medición</label>
                        <input 
                            type="date" 
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full bg-zinc-900 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand/40 transition-all"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full mt-4 bg-brand text-black font-black uppercase italic py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-brand/90 transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        {loading ? 'Guardando...' : 'Guardar Medición'}
                    </button>
                </form>
            </div>
        </div>
    )
}
