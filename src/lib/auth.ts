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
            await connectDB()
            
            // Si es Google, permitimos auto-registro si no existe
            if (account?.provider === 'google') {
                const exists = await User.findOne({ email: user.email })
                
                if (!exists) {
                    // Buscamos el gym por defecto (mmd)
                    const gym = await Gym.findOne({ slug: 'mmd' })
                    if (!gym) return false 

                    // Creamos el nuevo usuario atleta con gymId
                    await User.create({
                        gymId: gym._id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: 'alumno', // Por defecto todos son alumnos
                        active: true,
                        passwordHash: 'google-oauth'
                    })
                }
                return true
            }

            // Para otros (ej: login tradicional), el usuario ya debe existir
            const exists = await User.findOne({ email: user.email })
            return !!exists
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