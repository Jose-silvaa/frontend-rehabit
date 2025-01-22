import { NextRequest, NextResponse } from "next/server";

import { decrypt } from "./authentication/session";


  //Check if route is protected 
  const protectedRoutes = ['/dashboard', '/dashboard/habit']
  const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
    
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = req.cookies.get('session')?.value
    const session = await decrypt(cookie);

    if(isProtectedRoute && !session?.userId){
        return NextResponse.redirect(new URL('/login', req.nextUrl))       
    }

    if (
        isPublicRoute &&
        session?.userId &&
        !req.nextUrl.pathname.startsWith('/dashboard')
      ) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
      }
     
      return NextResponse.next()
}


export const config = {
  matcher: [
      '/dashboard/habit', // Exclui a rota /signup
  ],
};
