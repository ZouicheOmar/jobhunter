'use server';

import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from './consts';

export const apiClient = async (url: string) => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  return fetch(url, {
    headers: {
      'x-jh-client-data': sessionCookie?.value,
    },
    credentials: 'include',
  });
};
