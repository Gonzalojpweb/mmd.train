import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user }) {
            await connectDB()
            const exists = await User.findOne({ email: user.email })
            if (!exists) return false
            return true
        },
        async session({ session }) {
            await connectDB()
            const dbUser = await User.findOne({ email: session.user.email }).lean() as any
            if (dbUser) {
                session.user.id = dbUser._id.toString()
                session.user.role = dbUser.role
                session.user.gymId = dbUser.gymId.toString()
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