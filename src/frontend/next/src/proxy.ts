import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE_NAME } from './lib';

const AUTH_ME_ENDPOINT = 'http://localhost:8000/auth/me';

export const isSessionValid: () => Promise<Boolean> = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);

  if (!session) return false;
  const { value } = session;

  const req = await fetch(AUTH_ME_ENDPOINT, {
    headers: { Cookie: 'JSESSIONID=' + value },
  });

  if (!req.ok) return false;
  return true;
};

export async function proxy(request: NextRequest) {
  const session = await isSessionValid();
  return session ? NextResponse.next() : NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: '/me/:path*',
};
