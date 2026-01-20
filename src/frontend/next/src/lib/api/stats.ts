import { Candid, City } from "@/types";

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
  try {
    const url = "http://localhost:8080/stats";
    const req = await fetch(url);
    const json = await req.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
