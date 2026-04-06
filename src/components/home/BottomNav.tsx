'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
    { name: 'Inicio', href: '/home', icon: '🏠', exact: true },
    { name: 'Turnos', href: '/home/bookings', icon: '📅' },
    { name: 'Perfil', href: '/home/profile', icon: '👤' }
]

export default function BottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-panel border-t border-border z-50 px-6 pb-2 safe-area-pb">
            <ul className="flex items-center justify-between h-full max-w-md mx-auto">
                {NAV_ITEMS.map((item) => {
                    const isActive = item.exact 
                        ? pathname === item.href 
                        : pathname.startsWith(item.href)

                    return (
                        <li key={item.href} className="flex-1">
                            <Link href={item.href} className="flex flex-col items-center justify-center space-y-1 py-2 outline-none">
                                <span className={`text-2xl transition-transform duration-300 ${isActive ? 'scale-110' : 'opacity-50 hover:opacity-80'}`}>
                                    {item.icon}
                                </span>
                                <span className={`text-[10px] font-bold tracking-wide uppercase transition-colors ${isActive ? 'text-brand' : 'text-gray-500'}`}>
                                    {item.name}
                                </span>
                                {/* Dot indicator */}
                                <div className={`w-1 h-1 rounded-full mt-1 transition-opacity ${isActive ? 'bg-brand opacity-100' : 'opacity-0'}`} />
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
