import { City } from "@/types";
import { ROUTES } from "../consts";

export async function getCityByZipcode(zipcode: string): Promise<City> {
  const req = await fetch(ROUTES.API.CITY.BY_ZIPCODE(zipcode));
  if (req.status == 404) throw Error("error fetching city");
  const json = await req.json();
  return json;
}

export async function getCityByName(name: string): Promise<City> {
  const req = await fetch(ROUTES.API.CITY.BY_NAME(name.toLowerCase()));
  if (req.status == 404) throw Error("error fetching city");
  const json = await req.json();
  return json;
}

export async function getCity(
  name: string | undefined,
  zipcode: string | undefined
): Promise<City | null> {
  let city: City | null = null;
  if (zipcode) {
    try {
      city = await getCityByZipcode(zipcode);
    } catch (e) {
      console.log("problem fetching city by zipcode");
    }
  }
  if (!city && name) {
    try {
      city = await getCityByName(name.toLowerCase());
    } catch (e) {
      console.log("problem fetching city by name");
    }
  }
  return city;
}
