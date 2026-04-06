import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AuthRedirectPage() {
    const session = await auth()

    if (!session) {
        redirect('/login')
    }

    if (session.user.role === 'admin') {
        redirect('/admin/dashboard')
    }
    
    if (session.user.role === 'alumno') {
        redirect('/home')
    }

    // Fallback if role is missing
    redirect('/login')
}