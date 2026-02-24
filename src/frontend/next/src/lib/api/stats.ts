import { Candid, City } from '@/types';
import { API_BASE } from '../consts';
import { cookies } from 'next/headers';
import { fetchClient } from '@/actions';

export type CandidPerCity = {
  numCandids: number;
  city: City; // TODO rename to city
};

export type GetStatsResponse = {
  numCandids: number;
  numUnsolicited: number;
  lastCandid: Candid;
  topCities: CandidPerCity[];
};

export type GetStatsFn = () => Promise<GetStatsResponse>;

export const getStats: GetStatsFn = async () => {
  const url = `${API_BASE}/stats`;

  // const cookieStore = await cookies();
  // const sessCookie = cookieStore.get('jhsession');
  //
  // const cookeheader = 'JSESSIONID=' + sessCookie?.value;
  const req = await fetchClient(url);
  console.log('stats request status', req.status);
  const data = await req?.json();
  return data || null;
};
