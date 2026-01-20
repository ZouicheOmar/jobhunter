import { Tech } from "@/types";
import { ROUTES } from "../consts";

export async function getOrCreateStack(v: string[]): Promise<Tech[]> {
  try {
    const req = await fetch(ROUTES.API.COMPLETION.TECH(v));
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
}

export async function getTechsFromScrapper(v: string[]): Promise<Tech[]> {
  try {
    const req = await fetch(ROUTES.API.TECH.ALL_BY_NAME(v));
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
}
