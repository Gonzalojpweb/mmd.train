'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { name: 'Alumnos', href: '/admin/users', icon: '👥' },
  { name: 'Clases', href: '/admin/classes', icon: '📅' },
  { name: 'Asistencia', href: '/admin/bookings', icon: '✅' },
  { name: 'Finanzas', href: '/admin/finances', icon: '💰' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-5 left-4 z-50 p-2 bg-panel border border-border rounded-lg text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </>
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 h-screen fixed left-0 top-0 border-r border-border glass-panel flex flex-col z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-center border-b border-border mt-14 md:mt-0">
          <img 
            src="https://res.cloudinary.com/dt6iu9m9f/image/upload/v1775491311/logo-removebg-preview_1_zupjab.png"
            alt="MMD Logo"
            className="h-10 w-auto object-contain opacity-90 drop-shadow-lg"
          />
        </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
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
    </>
  )
}
