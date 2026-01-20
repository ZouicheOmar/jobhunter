import {
  ScrapApiRespone,
  CandidCreate,
  City,
  Tech,
  Website,
  Candid,
  Company,
  CandidsPage,
  CompanyPage,
} from "@/types";
import {
  LLMExtractApiRequest,
  LLMExtractApiResponse,
} from "@/types/LLMExtractApiReponse";

// const API_BASE = "http://192.168.1.30:8080";
const API_BASE = "http://127.0.0.1:8080";

export const ROUTES = {
  SCRAPPER: {
    // TODO fix to /api/scrap/v1?/
    BASE: "http://127.0.0.1:5000/scrap/",
  },

  LLM_EXTRACT: {
    BASE: "http://127.0.0.1:5001/api/extract/",
  },

  API: {
    BASE: `${API_BASE}/`,
    CANDIDS: {
      PAGE: (page: number) => `${API_BASE}/candid/candids?page=${page}`,
    },
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
      PAGE: (page: number, orderByDateApply: boolean) =>
        `${API_BASE}/company?page=${page}&orderByDateApply=${orderByDateApply}`,
      BY_NAME: (v: string) => `${API_BASE}/company?name=${v}`,
      BY_ID: (id: number) => `${API_BASE}/company/${id}`,
    },
    TECH: {
      BASE: `${API_BASE}/tech`,
      ALL_BY_NAME: (stack: string[]) =>
        `${API_BASE}/tech?names=${stack.map((i) => i.trim()).join(",")}`,
    },
    CONTRACT: `${API_BASE}/contract`, // won`t use this, maybe for configering
    COMPLETION: {
      CITY: (v: string) => `${API_BASE}/completion/city?value=${v}`,
      WEBSITE: (v: string) => `${API_BASE}/completion/website?value=${v}`,
      COMPANY: (v: string) => `${API_BASE}/completion/company?value=${v}`,
      TECH: (v: string) => `${API_BASE}/completion/tech?value=${v}`,
    },
  },
};
// TODO how to type a function that can throw an error
export async function getCandidsPage(
  page: number
): Promise<CandidsPage | null> {
  const req = await fetch(ROUTES.API.CANDIDS.PAGE(page));
  if (req.status >= 400) return null;

  const json = await req.json();
  return json;
}

export async function getCompanyPage(
  page: number,
  orderByDateApply: boolean = true
): Promise<CompanyPage | null> {
  const req = await fetch(ROUTES.API.COMPANY.PAGE(page, orderByDateApply));
  if (req.status >= 400) return null;

  const json = await req.json();
  return json;
}

export async function getCompanyById(id: number): Promise<Company | null> {
  const req = await fetch(ROUTES.API.COMPANY.BY_ID(id));
  if (req.status >= 400) return null;
  const json = await req.json();
  return json;
}

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

export async function extractFromDesc(
  data: LLMExtractApiRequest
): Promise<LLMExtractApiResponse> {
  try {
    const req = await fetch(ROUTES.LLM_EXTRACT.BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await req.json();
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
    const req = await fetch(ROUTES.API.COMPLETION.COMPANY(v));
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
}

export async function getOrCreateStack(v: string[]): Promise<Tech[]> {
  try {
    const req = await fetch(ROUTES.API.COMPLETION.TECH(v));
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
}

export async function getTechCompletion(v: string): Promise<Tech[]> {
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
