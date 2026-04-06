import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

/**
 * Redirects the user to the correct dashboard based on their role.
 */
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

    // Default Fallback
    redirect('/login')
}