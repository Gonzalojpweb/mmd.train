'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import LoginButton from '@/components/LoginButton'

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        weight: '',
        height: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        
        // Simulating registration for now, later we adds Server Actions
        setTimeout(() => {
            console.log('Registering user:', formData)
            setIsLoading(false)
            alert('Registro exitoso. Ahora inicia sesión.')
            router.push('/')
        }, 1500)
    }

    return (
        <div className="flex flex-col items-center justify-center h-[100dvh] bg-background p-4 overflow-hidden">
            <div className="w-full max-w-sm flex flex-col h-full max-h-[850px] animate-in fade-in slide-in-from-bottom duration-500 overflow-hidden">
                
                {/* Header Compacto */}
                <div className="text-center mb-4 shrink-0">
                    <Link href="/">
                        <img 
                            src="https://res.cloudinary.com/dt6iu9m9f/image/upload/v1775491311/logo-removebg-preview_1_zupjab.png"
                            alt="MMD Logo"
                            className="h-10 w-auto mx-auto mb-2"
                        />
                    </Link>
                    <h1 className="text-xl font-black text-white uppercase italic tracking-tighter">Únete al equipo</h1>
                </div>

                {/* Formulario Compacto */}
                <form onSubmit={handleSubmit} className="glass-panel p-4 rounded-xl space-y-3 border-white/5 flex-1 flex flex-col justify-between overflow-y-auto hide-scrollbar">
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Nombre Completo</label>
                            <input 
                                required
                                type="text" 
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-brand transition-colors"
                                placeholder="Ej: Juan Pérez"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Email</label>
                            <input 
                                required
                                type="email" 
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-brand transition-colors"
                                placeholder="tu@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Password</label>
                                <input 
                                    required
                                    type="password" 
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-brand transition-colors"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Confirmar</label>
                                <input 
                                    required
                                    type="password" 
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-brand transition-colors"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Fecha de Nacimiento</label>
                            <input 
                                required
                                type="date" 
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-brand transition-colors"
                                value={formData.birthDate}
                                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Peso (kg)</label>
                                <input 
                                    type="number" 
                                    step="0.1"
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-brand transition-colors"
                                    placeholder="75.0"
                                    value={formData.weight}
                                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Altura (cm)</label>
                                <input 
                                    type="number" 
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-brand transition-colors"
                                    placeholder="175"
                                    value={formData.height}
                                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-brand hover:bg-brand-hover text-black font-black uppercase tracking-widest py-3 rounded-lg mt-2 transition-all active:scale-95 disabled:opacity-50 text-sm"
                    >
                        {isLoading ? "Creando..." : "Completar"}
                    </button>
                </form>

                {/* Footer y Social Compacto */}
                <div className="shrink-0 space-y-3 mt-4">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                        <div className="relative flex justify-center text-[8px] uppercase"><span className="bg-background px-2 text-gray-500 tracking-[0.2em]">O REGÍSTRATE CON</span></div>
                    </div>

                    <LoginButton />

                    <p className="text-center text-gray-500 text-xs">
                        ¿Ya tienes cuenta? <Link href="/" className="text-brand font-bold hover:underline">Inicia Sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
