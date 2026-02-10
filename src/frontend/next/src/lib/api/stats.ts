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
  if (req.status == 404) return null;
  const json = await req.json();
  return json;
};
