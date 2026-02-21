import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE_NAME } from './lib';

const AUTH_ME_ENDPOINT = 'http://localhost:8000/auth/me';

export const isSessionValid: (cookie: string) => Promise<Boolean> = async (cookie) => {
  const req = await fetch(AUTH_ME_ENDPOINT, {
    headers: { Cookie: 'JSESSIONID=' + cookie },
  });
  if (req.status == 200) return true;
  else return false;
};

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/me')) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie) return NextResponse.redirect(new URL('/', request.url));
    else if (!isSessionValid(sessionCookie.value)) return NextResponse.redirect(new URL('/', request.url));
    else {
      return NextResponse.next();
    }
  }
  return NextResponse.next();

  // else if (request.nextUrl.pathname.startsWith('/api')) {
  //   // en fait là cet appel est fait à partir d'un server component
  //   // qui tourne sur le server
  //   // vers un route handler qui tourne aussi sur le server.
  //   // Donc y aura pas de cookie étant donnée que les cookie
  //   // font partie d'un méchanisme de stockage propre à au navigateur.
  //   console.log('proxy client to /api request', request);
  //   return NextResponse.next();
  // }
}

export const config = {
  matcher: ['/me/:path*', '/api/:path*'],
};
