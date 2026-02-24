'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE_NAME } from '../consts';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const AUTH_ENDPOINT = 'http://localhost:8000/auth';
// const LOGIN_ENDPOINT = AUTH_ENDPOINT + '/login';

const LOGIN_ENDPOINT = 'http://localhost:3000/api/auth';

const postReqInit: RequestInit = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
};

const makeSesionCookie: (heads: Headers) => RequestCookie = (heads) => {
  const serverSessionId = heads.getSetCookie()[0].split(';')[0].split('=')[1];
  if (!serverSessionId || !serverSessionId.length) throw new Error('problem setting session cookie');
  return {
    name: SESSION_COOKIE_NAME,
    value: serverSessionId,
    httpOnly: true,
    path: '/',
  };
};

export const loginAction: (fd: FormData) => Promise<void> = async (fd) => {
  console.log('login server action');

  const creds = JSON.stringify({ username: fd.get('username'), password: fd.get('password') });
  const req = await fetch(LOGIN_ENDPOINT, {
    body: creds,
    ...postReqInit,
  });

  if (!req.ok) throw new Error('problem logging in');
  else {
    const t = req.text();
    console.log('returned from api', t);
  }
};
