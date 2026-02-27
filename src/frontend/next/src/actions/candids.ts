'use server';

import { Candid, CandidCreate, CandidUpdateRestricted, ResourcePage } from '@/types';
import { fetchClient } from './fetchClient';
import { API_BASE, ROUTES } from '@/lib';
import { getEmptyCandid } from '@/lib/utils';

export type GetCandidsPageFn = (page: number) => Promise<ResourcePage<Candid>>;
export type GetAllCandidsFn = () => Promise<Candid[]>;
export type PostCandidFn = (candid: CandidCreate) => Promise<Candid>;
export type UpdateCandidFn = (candid: CandidUpdateRestricted) => Promise<Candid>;

class PostCandidError extends Error {
  message = 'Problem posting candid';
}

export const getCandidsPageFiltered = async (filters: string) => {
  const req = await fetchClient(ROUTES.API.CANDID.FILTERED(filters), { method: 'GET' });
  if (!req.ok) return null;
  return await req.json();
};

export const postCandid: PostCandidFn = async (candid) => {
  console.log('data to post', candid);
  try {
    // const res = await fetchClient('http://localhost:8000/candid', {
    const res = await fetchClient(ROUTES.API.CANDID.BASE, {
      method: 'POST',
      body: JSON.stringify(candid),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const setCandidRejected = async (id: number) => {
  const res = await fetchClient(ROUTES.API.CANDID.REJECTED(id), {
    method: 'PATCH',
    body: JSON.stringify({ id: id }),
  });

  if (!res.ok) throw new Error('cannot set candid to rejected ' + res.status);
  return await res.json();
};
