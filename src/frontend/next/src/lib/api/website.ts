'use server';
import { Website } from '@/types';
import { ROUTES } from '../consts';
import { fetchClient } from '@/actions';

export async function getOrCreateWebsiteByName(name: string): Promise<Website> {
  try {
    const req = await fetchClient(ROUTES.API.WEBSITE.BY_NAME(name));
    const json = await req.json();
    console.log('website', json);
    return json;
  } catch (e) {
    throw Error('error fetching Website');
  }
}
