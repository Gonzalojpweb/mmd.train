import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            role: 'admin' | 'alumno'
            gymId: string
        } & DefaultSession['user']
    }
}