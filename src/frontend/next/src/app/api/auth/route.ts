import { SESSION_COOKIE_NAME } from '@/lib';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  console.log('current cookies', cookieStore.getAll());

  const creds = await request.json();
  const authurl = 'http://localhost:8000/auth/login';
  const req = await fetch(authurl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(creds),
    body: JSON.stringify({
      username: 'omar',
      password: 'pass',
    }),
  });

  if (!req.ok) {
    console.log('request from route handler not ok, status:', req.status);
    return NextResponse.json({ message: 'problem logging in' });
  }

  let jsession = req.headers.getSetCookie()[0].split('=')[1].split(';')[0];

  cookieStore.set('name', 'lee');
  cookieStore.set('hell', 'ni yemak');

  return Response.json({ mess: 'ok' });
}
