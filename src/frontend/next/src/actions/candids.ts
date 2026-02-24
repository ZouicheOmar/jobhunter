'use server';

import { Candid, CandidCreate, CandidUpdateRestricted, ResourcePage } from '@/types';
import { fetchClient } from './fetchClient';
import { ROUTES } from '@/lib';
import { getEmptyCandid } from '@/lib/utils';

export type GetCandidsPageFn = (page: number) => Promise<ResourcePage<Candid>>;
export type GetAllCandidsFn = () => Promise<Candid[]>;
export type PostCandidFn = (candid: CandidCreate) => Promise<Candid>;
export type UpdateCandidFn = (candid: CandidUpdateRestricted) => Promise<Candid>;

export const getCandidsPageFiltered = async (filters: string) => {
  const req = await fetchClient(ROUTES.API.CANDID.FILTERED(filters), { method: 'GET' });
  if (!req.ok) return null;
  return await req.json();
};

export const postCandid: PostCandidFn = async (candid) => {
  const c = getEmptyCandid();
  const res = await fetchClient('http://localhost:8000/candid', {
    method: 'POST',
    // body: JSON.stringify(candid),
    body: JSON.stringify(c),
  });
  if (!res.ok) throw new Error('problem posting candid ' + res.status + res.statusText);
  return await res.json();
};

// todo test
export const setCandidRejected = async (id: number) => {
  const req = await fetchClient(ROUTES.API.CANDID.REJECTED(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id }),
  });
  if (req.status >= 400) return null;
  const json = await req.json();
  return json;
};
