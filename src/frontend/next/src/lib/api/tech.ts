'use server';
import { Tech } from '@/types';
import { ROUTES } from '../consts';
import { fetchClient } from '@/actions';

export async function getOrCreateStack(v: string[]): Promise<Tech[]> {
  try {
    const req = await fetchClient(ROUTES.API.COMPLETION.TECH(v));
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
}

export async function getTechsFromScrapper(v: string[]): Promise<Tech[]> {
  try {
    const req = await fetchClient(ROUTES.API.TECH.ALL_BY_NAME(v));
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
}
