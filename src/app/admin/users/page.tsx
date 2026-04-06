import { getUsers } from '@/actions/users'
import { User, Mail, Calendar, ShieldCheck, Search, Filter } from 'lucide-react'

export default async function UsersPage() {
    const users = await getUsers()

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-brand font-black uppercase tracking-[0.2em] text-[10px] mb-1">
                        <div className="w-8 h-[1px] bg-brand" />
                        Base de Datos
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                        Gestión de <span className="text-brand">Alumnos</span>
                    </h1>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-brand transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Buscar alumno..." 
                            className="bg-zinc-900 border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-brand/40 transition-all w-full md:w-64"
                        />
                    </div>
                    <button className="p-3 bg-zinc-900 border border-white/5 rounded-2xl text-zinc-400 hover:text-brand hover:border-brand/40 transition-all">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {users.map((user: any) => (
                    <div key={user._id} className="group relative">
                        {/* Glow effect on hover */}
                        <div className="absolute -inset-0.5 bg-brand rounded-[2rem] blur opacity-0 group-hover:opacity-10 transition duration-500" />
                        
                        <div className="relative bg-zinc-950 border border-white/5 p-6 rounded-[2rem] flex flex-col justify-between h-full hover:border-white/10 transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center overflow-hidden">
                                        {user.image ? (
                                            <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={24} className="text-zinc-700" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-black uppercase italic tracking-tighter text-lg leading-none mb-1">
                                            {user.name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-zinc-500">
                                            <Mail size={12} />
                                            <span className="text-[10px] font-bold truncate max-w-[150px]">{user.email}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={cn(
                                    "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                                    user.role === 'admin' ? "bg-brand text-black" : "bg-zinc-800 text-zinc-400"
                                )}>
                                    {user.role}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 mt-auto">
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                                        <Calendar size={10} /> Registro
                                    </p>
                                    <p className="text-[10px] font-bold text-white uppercase italic">
                                        {new Date(user.createdAt).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                                        <ShieldCheck size={10} /> Estado
                                    </p>
                                    <p className="text-[10px] font-bold text-green-500 uppercase italic">
                                        Activo
                                    </p>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-2.5 rounded-xl bg-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-white/10 hover:text-white transition-all">
                                Ver Perfil Detallado
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}

