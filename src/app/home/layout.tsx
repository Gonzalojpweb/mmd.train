import BottomNav from '@/components/home/BottomNav'
import TopHeader from '@/components/home/TopHeader'

export const metadata = {
  title: 'Mi Perfil | MMD Entranamiento',
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background text-foreground min-h-screen pb-20 pt-20">
      <TopHeader />
      
      {/* Scrollable Container */}
      <main className="p-6 overflow-y-auto w-full max-w-md mx-auto">
        {children}
      </main>

      <BottomNav />
    </div>
  )
}
