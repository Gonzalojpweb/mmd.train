import { auth, signOut } from '@/lib/auth'
import Image from 'next/image'

export default async function TopHeader() {
    const session = await auth()

    return (
        <header className="fixed top-0 left-0 right-0 h-20 bg-background/90 backdrop-blur-md border-b border-white/5 z-40 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-panel overflow-hidden border-2 border-brand flex items-center justify-center relative">
                    {/* Placeholder Avatar */}
                    <span className="text-xl">👤</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-widest font-black">Hola, Atleta</span>
                    <h1 className="text-lg font-bold text-white leading-none mt-1">
                        {session?.user?.name || 'Alumno'}
                    </h1>
                </div>
            </div>
            
            <form action={async () => {
                'use server';
                await signOut({ redirectTo: '/login' });
            }}>
                <button type="submit" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                </button>
            </form>
        </header>
    )
}
