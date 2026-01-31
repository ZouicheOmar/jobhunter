import { ROUTES } from '../consts';
import { Candid, CandidCreate, CandidsPage, CandidUpdate, CandidUpdateRestricted } from '@/types';

export type GetCandidsPageFn = (page: number) => Promise<CandidsPage>;
export type GetAllCandidsFn = () => Promise<Candid[]>;
export type PostCandidFn = (candid: CandidCreate) => Promise<Candid>;
export type UpdateCandidFn = (candid: CandidUpdateRestricted) => Promise<Candid>;

// should have city and page as params too
// filter input will redirect on click
export const getCandidsPage: GetCandidsPageFn = async (page) => {
  const req = await fetch(ROUTES.API.CANDIDS.PAGE(page));
  if (req.status >= 400) return null;
  const json = await req.json();
  return json;
};

export const postCandid: PostCandidFn = async (candid) => {
  try {
    const req = await fetch(ROUTES.API.CANDID.BASE, {
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
  const req = await fetch(ROUTES.API.CANDID.ID(id));
  if (req.status >= 400) return null;
  const json = await req.json();
  return json;
};

export const udpateCandid: UpdateCandidFn = async (candid) => {
  const req = await fetch(ROUTES.API.CANDID.ID(candid.id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(candid),
  });
  if (req.status >= 400) return null;
  const json = await req.json();
  console.log('res from patch ', json);
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
  console.log('res from patch set rejected ', json);
  return json;
};
