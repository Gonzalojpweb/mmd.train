import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import Gym from '@/models/Gym'

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account }) {
          try {
            console.log("--- INICIANDO SIGNIN ---");
            console.log("Email intentando entrar:", user.email);
            
            await connectDB()
            console.log("MongoDB Conectado correctamente.");
            
            // Si es Google, permitimos auto-registro si no existe
            if (account?.provider === 'google') {
                // 1. Aseguramos que el gimnasio MMD exista (Upsert)
                // Si no existe lo crea, si existe lo ignora.
                const gym = await Gym.findOneAndUpdate(
                    { slug: 'mmd' },
                    { 
                        name: 'MMD Entrenamiento', 
                        slug: 'mmd', 
                        active: true 
                    },
                    { upsert: true, new: true }
                )
                console.log("Gimnasio verificado/creado con ID:", gym?._id);

                const exists = await User.findOne({ email: user.email })
                
                if (!exists) {
                    console.log("Usuario no existe en BD, procediendo a crear...");
                    // El primer usuario con este correo será admin automáticamente
                    const adminEmail = process.env.ADMIN_EMAIL || 'pgonzalojose@gmail.com'
                    const isNewAdmin = user.email === adminEmail

                    // Creamos el nuevo usuario atleta o admin con gymId
                    await User.create({
                        gymId: gym._id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: isNewAdmin ? 'admin' : 'alumno',
                        active: true,
                        passwordHash: 'google-oauth'
                    })
                    console.log("Nuevo usuario creado exitosamente.");
                } else {
                    console.log("Usuario ya existe en BD.");
                }
                return true
            }

            // Para login tradicional (email/password), el usuario ya debe existir
            const exists = await User.findOne({ email: user.email })
            return !!exists
          } catch (error) {
            console.error("!!! ERROR CRÍTICO EN SIGNIN !!!", error);
            // Esto mandará el detalle al log de Vercel
            return false;
          }
        },
        async session({ session }) {
            await connectDB()
            const dbUser = await User.findOne({ email: session.user.email }).lean() as any
            if (dbUser) {
                session.user.id = dbUser._id.toString()
                session.user.role = dbUser.role
                session.user.gymId = dbUser.gymId?.toString()
            }
            return session
        },
        async redirect({ url, baseUrl }) {
            // Si la URL es relativa (ej: '/auth/redirect'), la combinamos con baseUrl
            if (url.startsWith('/')) return `${baseUrl}${url}`
            // Si ya es absoluta y pertenece a la aplicación, la aceptamos
            if (url.startsWith(baseUrl)) return url
            return baseUrl
        },
    },
})