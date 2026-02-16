'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE_NAME } from '../consts';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const AUTH_ENDPOINT = 'http://localhost:8000/auth';
const LOGIN_ENDPOINT = AUTH_ENDPOINT + '/login';

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
  const creds = JSON.stringify({ username: fd.get('username'), password: fd.get('password') });
  const req = await fetch(LOGIN_ENDPOINT, {
    body: creds,
    ...postReqInit,
  });
  if (!req.ok) throw new Error('problem logging in');
  const cookiesStore = await cookies();
  cookiesStore.set(makeSesionCookie(req.headers));
  redirect('/me');
};
