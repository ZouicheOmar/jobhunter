'use server';

import { ROUTES } from '@/lib';
import { fetchClient } from './fetchClient';

export const getCompletion = async (entity: string, v: string) => {
  const res = await fetchClient(ROUTES.API.COMPLETION.DEFAULT + '/' + entity + '?value=' + v);
  if (!res.ok) throw new Error('problem fetching completion');
  return await res.json();
};
