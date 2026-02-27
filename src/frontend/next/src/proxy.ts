import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES, SESSION_COOKIE_NAME } from './lib';
import { fetchClient } from './actions';

export const isSessionValid: (cookie: string) => Promise<Boolean> = async () =>
  (await fetchClient(ROUTES.API.AUTH.ME)).status == 200;

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (request.nextUrl.pathname.startsWith('/me')) {
    if (!sessionCookie) return NextResponse.redirect(new URL('/', request.url));
    else if (!isSessionValid(sessionCookie.value)) return NextResponse.redirect(new URL('/', request.url));
    else return NextResponse.next();
  }
  if (request.nextUrl.pathname == '/' && sessionCookie && (await isSessionValid(sessionCookie.value)))
    return NextResponse.redirect(new URL('/me', request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/me/:path*', '/api/:path*'],
};
