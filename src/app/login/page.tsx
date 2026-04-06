import { auth, signIn } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
    const session = await auth()

    if (session?.user?.role === 'admin') redirect('/admin/dashboard')
    if (session?.user?.role === 'alumno') redirect('/home')

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '500' }}>MMD Entrenamiento</h1>
            <form action={async () => {
                'use server'
                await signIn('google', { redirectTo: '/auth/redirect' })
            }}>
                <button type="submit" style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', fontSize: '14px', cursor: 'pointer' }}>
                    Continuar con Google
                </button>
            </form>
        </div>
    )
}