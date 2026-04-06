import Sidebar from '@/components/admin/Sidebar'
import Topbar from '@/components/admin/Topbar'

export const metadata = {
  title: 'Admin | MMD Entrenamiento',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <Topbar />
      
      {/* 
        Main layout content shifts to the right on desktop to accommodate sidebar 
        and down by 20 (80px) to accommodate topbar 
      */}
      <main className="flex-1 md:ml-64 mt-20 p-4 md:p-8 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  )
}

