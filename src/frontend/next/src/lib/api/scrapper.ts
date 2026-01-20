import { ScrapApiRespone } from "@/types";
import { ROUTES } from "../consts";

export async function scrapUrl(url: string): Promise<ScrapApiRespone> {
  // handle connection refused..
  try {
    const req = await fetch(ROUTES.SCRAPPER.BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
      }),
    });
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
}
