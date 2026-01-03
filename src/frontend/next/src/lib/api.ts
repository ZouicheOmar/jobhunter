
// const api_base = "http://localhost:8080/"
const API_BASE = "http://192.168.1.30:8080"

const ROUTES = {
  SCRAPPER: {
    BASE: "http://localhost:5000/scrap/",
  },
  API: {
    BASE: `${API_BASE}/`,
    CANDID: `${API_BASE}/candid`,
    CITY: `${API_BASE}/city`,
    TECH: `${API_BASE}/tech`,
    CONTRACT: `${API_BASE}/contract`, // won`t use this, maybe for configering
    COMPLETION: {
      CITY: (v: string) => `${API_BASE}/completion/city?value=${v}`,
      WEBSITE: (v: string) => `${API_BASE}/completion/website?value=${v}`
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
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
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

    console.log(jsonCandids);

    return {
      candids: jsonCandids,
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

// Pormise<City[]>
export async function getCityCompletion(v: string): Promise<string> {
  try {
    //http://localhost:8080/completion/city?value=v
    const req = await fetch(ROUTES.API.COMPLETION.CITY(v));
    const json = await req.json();
    // return await json ??
    return json;
  } catch (e) {
    throw e;
  }
}

// Pormise<website[]>
export async function getWebsiteCompletion(v: string): Promise<string> {
  try {
    //http://localhost:8080/completion/website?value=v
    const req = await fetch(ROUTES.API.COMPLETION.WEBSITE(v));
    const json = await req.json();
    console.log("request : ", req);
    console.log("json : ", json);
    return json;
  } catch (e) {
    throw e;
  }
}

