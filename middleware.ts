import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware'

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req })
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  
  // Redirect authenticated users away from auth pages
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  
  // Protect dashboard and api routes
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*', '/auth/:path*']
}