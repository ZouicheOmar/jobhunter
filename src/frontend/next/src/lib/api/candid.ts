import { ROUTES } from "../consts";
import { Candid, CandidCreate, CandidsPage } from "@/types";

export type GetCandidsPageFn = (page: number) => Promise<CandidsPage>;
export type GetAllCandidsFn = () => Promise<Candid[]>;
export type PostCandidFn = (candid: CandidCreate) => Promise<Candid>;

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
    const req = await fetch(ROUTES.API.CANDID, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(candid),
    });
    const json = await req.json();
    return json;
  } catch (e) {
    throw new Error("Could not create candid");
  }
};
