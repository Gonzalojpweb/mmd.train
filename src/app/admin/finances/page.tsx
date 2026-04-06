import { getRecentPayments, getMonthlyRevenue } from '@/actions/payments'
import { DollarSign, TrendingUp, ArrowUpRight, Clock, User, CreditCard } from 'lucide-react'

export default async function FinancesPage() {
    const payments = await getRecentPayments()
    const monthlyTotal = await getMonthlyRevenue()

    return (
        <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 text-brand font-black uppercase tracking-[0.2em] text-[10px] mb-1">
                    <div className="w-8 h-[1px] bg-brand" />
                    Contabilidad
                </div>
                <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                    Control de <span className="text-brand">Ingresos</span>
                </h1>
            </div>

            {/* Revenue Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900 border border-brand/20 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                    <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <TrendingUp size={160} className="text-brand" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Total Mensual (ARS)</p>
                        <h2 className="text-5xl font-black text-white italic tracking-tighter">${monthlyTotal.toLocaleString('es-AR')}</h2>
                        <div className="flex items-center gap-2 mt-4 text-green-500 text-[10px] font-black uppercase tracking-widest">
                            <ArrowUpRight size={14} /> +15.3% vs mes anterior
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <DollarSign size={160} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Pagos Confirmados</p>
                        <h2 className="text-5xl font-black text-white italic tracking-tighter">{payments.length}</h2>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-4">Transacciones este mes</p>
                    </div>
                </div>
            </div>

            {/* Recent Payments Table */}
            <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden">
                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
                    <h3 className="text-xs font-black uppercase tracking-widest text-white">Transacciones Recientes</h3>
                    <button className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-brand transition-colors">Exportar CSV</button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-zinc-900/30">
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">Alumno</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">Monto</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">Fecha</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">Estado</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">Referencia</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {payments.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-12 text-center text-zinc-600 text-sm italic">No hay pagos registrados aún.</td>
                                </tr>
                            ) : (
                                payments.map((payment: any) => (
                                    <tr key={payment._id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-brand">
                                                    <User size={14} />
                                                </div>
                                                <span className="text-sm font-black text-white uppercase italic tracking-tighter">{payment.userId?.name || 'Desconocido'}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-black text-brand tracking-tighter">${payment.amount.toLocaleString('es-AR')}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-1.5 text-zinc-500">
                                                <Clock size={12} />
                                                <span className="text-[10px] font-bold uppercase">{new Date(payment.createdAt).toLocaleDateString('es-AR')}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${
                                                payment.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                                            }`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-1.5 text-zinc-600 group-hover:text-zinc-400 transition-colors">
                                                <CreditCard size={12} />
                                                <span className="text-[10px] font-mono">{payment._id.toString().slice(-8).toUpperCase()}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
