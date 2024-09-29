import { getSession } from '@/actions';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { paths } from './constants';

// Paths for guest and private routes
const guestRoutes = [paths.register];
const privateRoutes = [paths.dashboard, paths.account, paths.post];

// Helper function to check if user is logged in based on session
async function isAuthenticated() {
  const session = await getSession();

  if (session?.sessionId === undefined) {
    return false;
  }

  return true;
}

// Middleware function to handle routing based on authentication
export async function middleware(req: NextRequest) {
  const isAuth = await isAuthenticated();

  const { pathname } = req.nextUrl;

  if (pathname === paths.base && isAuth) {
    return NextResponse.redirect(new URL(paths.dashboard, req.url));
  }

  // Check if the user is accessing a private route but is not logged in
  if (privateRoutes.some((route) => pathname.startsWith(route)) && !isAuth) {
    const queryParamString = new URLSearchParams(
      `redirect_to=${pathname}`
    ).toString();

    return NextResponse.redirect(
      new URL(`${paths.login}?${queryParamString}`, req.url)
    );
  }

  // Check if the user is accessing a guest route but is logged in
  if (guestRoutes.some((route) => pathname.startsWith(route)) && isAuth) {
    return NextResponse.redirect(new URL(paths.dashboard, req.url));
  }

  // Continue to the requested route if no redirection is required
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Guest
    '/register/:path*',

    // Private
    '/dashboard',
    '/account/:path*',
    '/post/:path*',

    // Common
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
