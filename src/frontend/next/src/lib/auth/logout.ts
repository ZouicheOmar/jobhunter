'use server';

import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '../consts';
import { redirect } from 'next/navigation';

const AUTH_ENDPOINT = 'http://localhost:8000/auth';
const LOGOUT_ENDPOINT = AUTH_ENDPOINT + '/logout';

export const logoutAction = async () => {
  const req = await fetch(LOGOUT_ENDPOINT, {
    method: 'POST',
    credentials: 'include',
  });
  if (!req.ok) throw new Error('problem logging out');
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect('/');
};
