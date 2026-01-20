import { Website } from "@/types";
import { ROUTES } from "../consts";

export async function getOrCreateWebsiteByName(name: string): Promise<Website> {
  try {
    const req = await fetch(ROUTES.API.WEBSITE.BY_NAME(name));
    const json = await req.json();
    return json;
  } catch (e) {
    throw Error("error fetching Website");
  }
}
