'use server';

import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/lib';

export const fetchClient = async (url: string, postData: any = undefined) => {
  const cookieStore = await cookies();
  const sess = cookieStore.get(SESSION_COOKIE_NAME);
  return fetch(url, {
    headers: {
      ...(postData && { ...{ 'Content-Type': 'application/json' } }),
      Cookie: 'JSESSIONID=' + sess?.value,
    },
    ...(postData && { ...postData }),
  });
};
