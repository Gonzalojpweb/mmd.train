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
            console.log("--- DEBUG SIGNIN START ---");
            console.log("User email:", user.email);
            console.log("Environment check:", { 
                hasMongo: !!process.env.MONGODB_URI,
                hasSecret: !!process.env.AUTH_SECRET || !!process.env.NEXTAUTH_SECRET,
                adminEmailEnv: process.env.ADMIN_EMAIL 
            });
            
            await connectDB()
            console.log("--- MongoDB: Connected Successfully ---");
            
            if (account?.provider === 'google') {
                const gym = await Gym.findOneAndUpdate(
                    { slug: 'mmd' },
                    { 
                        name: 'MMD Entrenamiento', 
                        slug: 'mmd', 
                        active: true 
                    },
                    { upsert: true, new: true }
                )
                console.log("--- Gym Found/Created ---", gym?._id);

                // Normalizamos el email para evitar fallos de mayúsculas
                const userEmail = user.email?.toLowerCase()
                const exists = await User.findOne({ email: userEmail })
                
                if (!exists) {
                    console.log("--- Creating New User ---");
                    const adminEmailFromEnv = process.env.ADMIN_EMAIL?.toLowerCase() || 'pgonzalojose@gmail.com'
                    const isNewAdmin = userEmail === adminEmailFromEnv

                    await User.create({
                        gymId: gym._id,
                        name: user.name,
                        email: userEmail,
                        image: user.image,
                        role: isNewAdmin ? 'admin' : 'alumno',
                        active: true,
                        passwordHash: 'google-oauth'
                    })
                    console.log("--- User Created Successfully ---", isNewAdmin ? "as ADMIN" : "as ALUMNO");
                } else {
                    console.log("--- User Already Exists ---", exists.role);
                }
                return true
            }

            return true
          } catch (error: any) {
            console.error("!!! FATAL AUTH ERROR !!!", error.message);
            // Si el error es de conexión de Mongo, lo sabremos aquí.
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