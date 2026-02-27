'use server';

import { ROUTES, SESSION_COOKIE_NAME } from '@/lib';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { fetchClient } from './fetchClient';

export const login = async (fd: FormData) => {
  const cookieStore = await cookies();

  const creds = JSON.stringify({
    username: fd.get('username'),
    password: fd.get('password'),
  });

  const req = await fetch(ROUTES.API.AUTH.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: creds,
  });

  if (!req.ok) {
    console.log('request from route handler not ok, status:', req.status);
    return NextResponse.json({ message: 'problem logging in' });
  }

  let jsession = req.headers.getSetCookie()[0].split('=')[1].split(';')[0];

  cookieStore.set(SESSION_COOKIE_NAME, jsession);
  redirect('http://localhost:3000/me');
};

export const logout = async () => {
  const cookieStore = await cookies();

  const req = await fetchClient(ROUTES.API.AUTH.LOGOUT);

  if (!req.ok) {
    console.log('could not log out:', req.status);
    return NextResponse.json({ message: 'problem logging out' });
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect('http://localhost:3000/');
};
