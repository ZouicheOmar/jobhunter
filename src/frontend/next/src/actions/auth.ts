'use server';

import { SESSION_COOKIE_NAME } from '@/lib';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export const loginInAction = async () => {
  const cookieStore = await cookies();
  console.log('current cookies', cookieStore.getAll());

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

  cookieStore.set(SESSION_COOKIE_NAME, jsession);
  redirect('http://localhost:3000/me');
};
