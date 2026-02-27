'use server';
import { City } from '@/types';
import { ROUTES } from '../consts';
import { fetchClient } from '@/actions';

export async function getCityByZipcode(zipcode: string): Promise<City> {
  const req = await fetchClient(ROUTES.API.CITY.BY_ZIPCODE(zipcode));
  if (req.status == 404) throw Error('error fetching city');
  const json = await req.json();
  console.log('json', json);
  return json;
}

export async function getCityByName(name: string): Promise<City> {
  const req = await fetchClient(ROUTES.API.CITY.BY_NAME(name.toLowerCase()));
  if (req.status == 404) throw Error('error fetching city');
  const json = await req.json();
  console.log('json', json);
  return json;
}

export async function getCity(name: string | undefined, zipcode: string | undefined): Promise<City | null> {
  let city: City | null = null;
  try {
    if (zipcode) city = await getCityByZipcode(zipcode);
    else if (!city && name) city = await getCityByName(name.toLowerCase());
  } catch (e) {
    console.log('problem fetching city by zipcode');
  }
  return city;
}
