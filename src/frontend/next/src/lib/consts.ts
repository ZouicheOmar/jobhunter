export const CONTRACT_TYPES = [
  'FULL_TIME',
  'PART_TIME',
  'CONTRACTOR',
  'TEMPORARY',
  'INTERN',
  'VOLUNTEER',
  'PER_DIEM',
  'OTHER',
];

// const API_BASE = "http://192.168.1.30:8080";
const API_BASE = 'http://127.0.0.1:8080';

export const ROUTES = {
  SCRAPPER: {
    // TODO fix to /api/scrap/v1?/
    BASE: 'http://127.0.0.1:5000/scrap/',
    JOB_POSTING: 'http://127.0.0.1:5000/scrap/job_posting',
  },

  LLM_EXTRACT: {
    BASE: 'http://127.0.0.1:5001/api/extract/',
  },

  API: {
    BASE: `${API_BASE}/`,
    CANDIDS: {
      BASE: `${API_BASE}/candids/`,
      PAGE: (page: number) => `${API_BASE}/candids?page=${page}`,
      ID: (id: number) => `${API_BASE}/candids/${id}`,
      REJECTED: (id: number) => `${API_BASE}/candid/${id}/rejected`,
    },
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
      ALL_BY_NAME: (stack: string[]) => `${API_BASE}/tech?names=${stack.map((i) => i.trim()).join(',')}`,
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
