'use server';

// use server permet au composant client d'appeler
// une fonction async à partir du navigateur, qui
// sera executée sur le server

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
