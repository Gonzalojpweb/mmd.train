'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function LoginButton() {
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async () => {
        setIsLoading(true)
        try {
            await signIn('google', { callbackUrl: '/auth/redirect' })
        } catch (error) {
            console.error('Login error:', error)
            setIsLoading(false)
        }
    }

    return (
        <button 
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center py-4 bg-brand hover:bg-brand-hover text-black font-black uppercase tracking-widest rounded-xl transition-transform hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,230,0,0.2)] disabled:opacity-70 disabled:cursor-wait"
        >
            {isLoading ? (
                <div className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Conectando...</span>
                </div>
            ) : (
                "Iniciar Sesión"
            )}
        </button>
    )
}
