import { getAvailableSessions, getUserBookings } from '@/actions/bookings'
import UpcomingBookings from '@/components/student/UpcomingBookings'
import BookingList from '@/components/student/BookingList'
import { cn } from '@/lib/utils'

export default async function HomeOverviewPage() {
    const sessions = await getAvailableSessions()
    const bookings = await getUserBookings()

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-24">
            {/* Motivation Banner */}
            <div className="w-full bg-brand rounded-[2.5rem] p-8 relative overflow-hidden shadow-[0_0_40px_rgba(255,230,0,0.15)]">
                <div className="relative z-10">
                    <h2 className="text-black text-3xl font-black uppercase italic tracking-tighter leading-[0.85] mb-2">
                        Listos para<br/>hoy?
                    </h2>
                    <p className="text-black/80 font-bold text-xs uppercase tracking-widest max-w-[70%]">
                        Supera tus límites hoy.
                    </p>
                </div>
                {/* Decoration */}
                <div className="absolute right-[-10%] bottom-[-10%] opacity-30 text-[140px] leading-none select-none pointer-events-none">
                    🏋️‍♂️
                </div>
            </div>

            {/* User Active Bookings */}
            <UpcomingBookings bookings={bookings} />

            {/* Weekly Progress (Example visual) */}
            <div className="bg-zinc-900/30 rounded-[2rem] p-6 border border-white/5">
                <div className="flex justify-between items-end mb-4">
                    <h3 className="text-white/60 font-black text-xs uppercase tracking-widest">Tu Progreso</h3>
                    <span className="text-brand font-black text-xs">{bookings.length} / 4 Clases</span>
                </div>
                <div className="flex gap-2 w-full h-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div 
                            key={i} 
                            className={cn(
                                "flex-1 rounded-full transition-all duration-1000",
                                i <= bookings.length ? "bg-brand shadow-[0_0_10px_rgba(255,230,0,0.5)]" : "bg-white/5"
                            )} 
                        />
                    ))}
                </div>
            </div>

            {/* Available Classes Grid */}
            <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-zinc-800" />
                    Reservar Turno
                </h3>
                <BookingList sessions={sessions} />
            </div>
        </div>
    )
}