import { Candid, City } from '@/types';
import { API_BASE } from '../consts';

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
  const req = await fetch(url);

  // faut faire en sorte de gérer chaque status possible
  // et ça ça dépend de l'api
  if (req.status == 404) return null;
  if (!req.ok) {
    console.log('could not fetch server for stats');
    return null;
  }

  const data = await req?.text();
  console.log('data from server', data);

  // let data = await req?.json();
  // if (!data) data = await req?.text();
  // if (!data) return null;
  return data;
};
