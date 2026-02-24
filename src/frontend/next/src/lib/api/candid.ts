'use server';

import { cookies } from 'next/headers';
import { ROUTES, SESSION_COOKIE_NAME } from '../consts';
import { Candid, CandidCreate, CandidUpdateRestricted, ResourcePage } from '@/types';

export type GetCandidsPageFn = (page: number) => Promise<ResourcePage<Candid>>;
export type GetAllCandidsFn = () => Promise<Candid[]>;
export type PostCandidFn = (candid: CandidCreate) => Promise<Candid>;
export type UpdateCandidFn = (candid: CandidUpdateRestricted) => Promise<Candid>;

const fetchClient = async (url: string, postData: any = undefined) => {
  const cookieStore = await cookies();
  const sess = cookieStore.get(SESSION_COOKIE_NAME);
  return fetch(url, {
    headers: {
      Cookie: 'JSESSIONID=' + sess?.value,
    },
    ...(postData && { ...postData }),
  });
};

export const getCandidsPageFiltered = async (filters: string) => {
  const url = 'http://localhost:8000/candid?' + filters;
  const req = await fetchClient(url, { method: 'GET' });

  if (!req.ok) return null;

  const json = await req.json();
  console.log('json from : http://localhost:8000/candid', json);
  return json;
};

export const ggetCandidsPageFiltered = async (filters: string) => {
  const url = ROUTES.API.CANDID.FILTERED(filters);
  const req = await fetch(url, { credentials: 'include' });
  if (req.status >= 400) return null;
  const json = await req.json();
  return json;
};

export const getCandidsPage: GetCandidsPageFn = async (page) => {
  const req = await fetch(ROUTES.API.CANDID.PAGE(page));
  if (req.status >= 400) return null;
  const json = await req.json();
  return json;
};

export const postCandid: PostCandidFn = async (candid) => {
  try {
    const req = await fetchClient(ROUTES.API.CANDID.BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(candid),
    });
    const json = await req.json();
    return json;
  } catch (e) {
    throw new Error('Could not create candid');
  }
};

export const getCandidById = async (id: number) => {
  const req = await fetch(ROUTES.API.CANDIDS.ID(id));
  if (req.status >= 400) return null;
  const json = await req.json();
  return json;
};

export const udpateCandid: UpdateCandidFn = async (candid) => {
  const req = await fetch(ROUTES.API.CANDIDS.ID(candid.id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(candid),
  });
  if (req.status >= 400) return null;
  const json = await req.json();
  return json;
};

export const setCandidRejected = async (id: number) => {
  const req = await fetch(ROUTES.API.CANDID.REJECTED(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id }),
  });
  if (req.status >= 400) return null;
  const json = await req.json();
  return json;
};
