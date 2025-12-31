
const ROUTES = {
  SCRAPPER: {
    BASE: "http://localhost:5000/scrap/",
  },
  API: {
    BASE: "http://localhost:8080/",
    CANDID: "http://localhost:8080/candid",
    CITY: 'http://localhost:8080/city',
    TECH: 'http://localhost:8080/tech',
    CONTRACT: 'http://localhost:8080/contract', // won't use this, maybe for configering
    COMPLETION: {
      CITY: 'http://localhost:8080/completion/city'
    }
  },
}

type ScrapApiRespone = {
  title: string;
  company_name: string;
  location: string;
  contract_type: string;
}

export async function scrapUrl(url: string): Promise<ScrapApiRespone> {
  try {
    const req = await fetch(ROUTES.SCRAPPER.BASE,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url
        })
      }
    );
    const json = await req.json();
    console.log("DATA FROM LOOKUP", json[1]);
    return json;
  } catch (e) {
    throw e;
  }
}

export async function fetchAllCandids() {
  try {
    const [candids, cities, techs] = await Promise.all(
      [
        fetch(ROUTES.API.CANDID),
        // fetch(ROUTES.API.CITY),
        fetch(ROUTES.API.TECH),
        fetch(ROUTES.API.CONTRACT),
      ]
    );

    const [jsonCandids, jsonCities, jsonTechs] =
      await Promise.all([candids.json(), cities.json(), techs.json()]);

    console.log(jsonCandids[0]);
    return {
      // fix: should not reverse it but 
      // set it in the right order from the backend
      // candids: jsonCandids,
      candids: jsonCandids.reverse(),
      // cities: jsonCities,
      techs: jsonTechs
    }

  } catch (e) {
    throw e;
  }
}

export async function postCandid(payload) {
  try {
    const req = await fetch(ROUTES.API.CANDID, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
}

export async function getCityCompletion() {
  try {
    const req = await fetch(ROUTES.API.COMPLETION.CITY, {
      // add path here
      // OR compose url somehow
    })
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
}
