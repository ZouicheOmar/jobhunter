import {
  ScrapApiRespone,
  CandidCreate,
  City,
  Tech,
  Website,
  Candid,
  Company,
} from "@/types";

// const API_BASE = "http://192.168.1.30:8080";
const API_BASE = "http://127.0.0.1:8080";

export const ROUTES = {
  SCRAPPER: {
    BASE: "http://127.0.0.1:5000/scrap/",
  },
  API: {
    BASE: `${API_BASE}/`,
    CANDID: `${API_BASE}/candid`,
    CITY: {
      BASE: `${API_BASE}/city`,
      BY_NAME: (v: string) => `${API_BASE}/city?name=${v}`,
      BY_ZIPCODE: (v: string) => `${API_BASE}/city?zipcode=${v}`,
    },
    WEBSITE: {
      BASE: `${API_BASE}/website`,
      BY_NAME: (v: string) => `${API_BASE}/website?name=${v}`,
    },
    COMPANY: {
      BASE: `${API_BASE}/company`,
      BY_NAME: (v: string) => `${API_BASE}/company?name=${v}`,
    },
    TECH: `${API_BASE}/tech`,
    CONTRACT: `${API_BASE}/contract`, // won`t use this, maybe for configering
    COMPLETION: {
      CITY: (v: string) => `${API_BASE}/completion/city?value=${v}`,
      WEBSITE: (v: string) => `${API_BASE}/completion/website?value=${v}`,
      COMPANY: (v: string) => `${API_BASE}/completion/company?value=${v}`,
      TECH: (v: string) => `${API_BASE}/completion/tech?value=${v}`,
    },
  },
};

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
    console.log("data scrapped:");
    console.log(json);
    console.log("end data scrapped:");
    return json;
  } catch (e) {
    throw e;
  }
}

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
  name: string | null,
  zipcode: string | null,
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
      city = await getCityByName(name);
    } catch (e) {
      console.log("problem fetching city by name");
    }
  }
  return city;
}

export async function getOrCreateCompanyByName(name: string): Promise<Company> {
  try {
    const req = await fetch(ROUTES.API.WEBSITE.BY_NAME(name));
    const json = await req.json();
    return json;
  } catch (e) {
    throw Error("error fetching Website");
  }
}

export async function getOrCreateWebsiteByName(name: string): Promise<Website> {
  try {
    const req = await fetch(ROUTES.API.WEBSITE.BY_NAME(name));
    const json = await req.json();
    return json;
  } catch (e) {
    throw Error("error fetching Website");
  }
}

export async function fetchAllCandids(): Promise<Candid[]> {
  try {
    const req = await fetch(ROUTES.API.CANDID);
    const json = await req.json();
    console.log(json);
    return json;
  } catch (e) {
    throw e;
  }
}

export async function postCandid(payload: CandidCreate): Promise<Candid> {
  try {
    const req = await fetch(ROUTES.API.CANDID, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await req.json();
    return json;
  } catch (e) {
    throw new Error("Could not create candid");
  }
}

// Pormise<City[]>
export async function getCityCompletion(v: string): Promise<City[]> {
  try {
    //http://localhost:8080/completion/city?value=v
    // return await json ??
    const req = await fetch(ROUTES.API.COMPLETION.CITY(v));
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
}

// Pormise<website[]>
export async function getWebsiteCompletion(v: string): Promise<Website[]> {
  try {
    //http://localhost:8080/completion/website?value=v
    const req = await fetch(ROUTES.API.COMPLETION.WEBSITE(v));
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
}

export async function getCompanyCompletion(v: string): Promise<Company[]> {
  try {
    //http://localhost:8080/completion/Company?value=v
    const req = await fetch(ROUTES.API.COMPLETION.COMPANY(v));
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
}

export async function getTechCompletion(v: string): Promise<Tech[]> {
  try {
    //http://localhost:8080/completion/Tech?value=v
    const req = await fetch(ROUTES.API.COMPLETION.TECH(v));
    const json = await req.json();
    console.log("request (tech completion)", req);
    console.log("json (tech completion)", json);
    return json;
  } catch (e) {
    throw e;
  }
}
