'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { name: 'Alumnos', href: '/admin/users', icon: '👥' },
  { name: 'Clases', href: '/admin/classes', icon: '📅' },
  { name: 'Asistencia', href: '/admin/bookings', icon: '✅' },
  { name: 'Finanzas', href: '/admin/finances', icon: '💰' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 border-r border-border glass-panel flex flex-col z-50">
      {/* Brand Header */}
      <div className="h-20 flex items-center justify-center border-b border-border">
        <div className="w-10 h-10 bg-brand rounded-full items-center justify-center flex mr-3">
            <span className="text-black font-black text-xl italic tracking-tighter">M</span>
        </div>
        <h2 className="text-xl font-bold uppercase tracking-widest text-white">MMD</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                isActive
                  ? 'bg-brand text-black shadow-[0_0_15px_rgba(255,230,0,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer Branding */}
      <div className="p-6 text-xs text-center text-gray-500 border-t border-border">
        Alto Rendimiento
      </div>
    </aside>
  )
}
