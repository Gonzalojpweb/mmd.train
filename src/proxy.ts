import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { pathname } = req.nextUrl

    // Definimos qué rutas son públicas (No requieren login)
    const isPublicRoute = pathname === '/' || pathname === '/register' || pathname === '/login'

    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
}