import { getClassTypes, getScheduleSlots } from '@/actions/classes'
import ClassTypeManager from '@/components/admin/ClassTypeManager'
import ScheduleGrid from '@/components/admin/ScheduleGrid'

export default async function ClassesPage() {
    // Fetch data on the server
    const classTypes = await getClassTypes()
    const slots = await getScheduleSlots()

    return (
        <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-brand font-black uppercase tracking-[0.2em] text-xs">
                    <div className="w-10 h-[2px] bg-brand" />
                    Administración
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase italic">
                    Gestión de <span className="text-brand">Clases</span>
                </h2>
                <p className="text-zinc-500 text-sm max-w-lg">
                    Administra la grilla semanal, tipos de entrenamiento y capacidad de alumnos para MMD Entrenamiento.
                </p>
            </div>

            {/* Content Tabs / Sections */}
            <div className="space-y-12">
                
                {/* 1. Visual Schedule Grid (Priority) */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
                            Grilla Semanal
                            <span className="bg-zinc-800 text-zinc-400 text-[10px] px-2 py-0.5 rounded-full font-mono">
                                {slots.length} HORARIOS
                            </span>
                        </h3>
                    </div>
                    <ScheduleGrid initialSlots={slots} classTypes={classTypes} />
                </section>

                {/* 2. Class Type Management */}
                <section className="bg-zinc-950/30 rounded-[2.5rem] p-6 md:p-10 border border-white/5 scroll-mt-20">
                    <ClassTypeManager initialTypes={classTypes} />
                </section>

            </div>

            {/* Footer / Info */}
            <div className="mt-20 pt-8 border-t border-white/5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                    <p>© 2026 MMD Entrenamiento - Panel de Control</p>
                    <div className="flex gap-6">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /> Sistema Operativo</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-brand" /> Modo PWA Activo</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

