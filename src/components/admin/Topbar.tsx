import { auth, signOut } from '@/lib/auth'

export default async function Topbar() {
  const session = await auth()

  return (
    <header className="h-20 glass-panel border-b border-border flex items-center justify-between px-8 absolute top-0 right-0 left-64 z-40">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">
          Panel de Control
        </h1>
        <p className="text-sm text-gray-400">
          Supervisando las actividades del centro
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm font-medium text-white">{session?.user?.name || 'Admin'}</p>
          <p className="text-xs text-brand uppercase tracking-wider">{session?.user?.role}</p>
        </div>
        
        {/* Sign Out Button */}
        <form action={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}>
          <button 
            type="submit" 
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors text-gray-300 hover:text-white"
            title="Cerrar sesión"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </form>
      </div>
    </header>
  )
}
