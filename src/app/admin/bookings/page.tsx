import { getAdminBookings } from '@/actions/bookings'
import AttendanceManager from '@/components/admin/AttendanceManager'

export default async function BookingsPage() {
    // Fetch sessions for today by default
    const sessions = await getAdminBookings()

    return (
        <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-brand font-black uppercase tracking-[0.2em] text-xs">
                    <div className="w-10 h-[2px] bg-brand" />
                    Asistencia
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase italic">
                    Control de <span className="text-brand">Turnos</span>
                </h2>
                <p className="text-zinc-500 text-sm max-w-lg">
                    Lleva el control de asistencia diaria. Marca quién asistió a las clases para el seguimiento de membresías.
                </p>
            </div>

            {/* Attendance Sections */}
            <AttendanceManager initialSessions={sessions} />

            {/* Footer / Info */}
            <div className="mt-20 pt-8 border-t border-white/5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                    <p>© 2026 MMD Entrenamiento - Control de Acceso</p>
                    <div className="flex gap-6 text-brand">
                        <span>Actualización en Tiempo Real</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

