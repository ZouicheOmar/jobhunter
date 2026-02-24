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

export const SESSION_COOKIE_NAME = 'jhsession';
export const FRONT_BASE = process.env.JH_FRONT_URL || 'http://localhost:3000';
export const API_BASE = 'http://localhost:8000';

export const ROUTES = {
  SCRAPPER: {
    BASE: 'http://127.0.0.1:5000/scrap/',
    JOB_POSTING: 'http://127.0.0.1:5000/scrap/job_posting',
  },

  LLM_EXTRACT: {
    BASE: 'http://127.0.0.1:5001/api/extract',
  },

  API: {
    BASE: `${API_BASE}/`,
    CANDID: {
      BASE: `${API_BASE}/candid`,
      PAGE: (page: number) => `${API_BASE}/candid?page=${page}`,
      FILTERED: (filters: string) => `${API_BASE}/candid?${filters}`,
      ID: (id: number) => `${API_BASE}/candid/${id}`,
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
    CONTRACT: `${API_BASE}/contract`,
    COMPLETION: {
      DEFAULT: `${API_BASE}/completion`,
      CITY: (v: string) => `${API_BASE}/completion/city?value=${v}`,
      WEBSITE: (v: string) => `${API_BASE}/completion/website?value=${v}`,
      COMPANY: (v: string) => `${API_BASE}/completion/company?value=${v}`,
      TECH: (v: string) => `${API_BASE}/completion/tech?value=${v}`,
    },
  },
};

export const COMPLETION_DELAY = 500;
export const LOGGED_BASE_FRONT_ROUTE = FRONT_BASE + '/me';

export type NavRouteType = {
  path: string;
  label: string;
};

export const NAV_ROUTES: NavRouteType[] = [
  {
    path: '/me',
    label: 'Overview',
  },
  {
    path: '/me/candids',
    label: 'Candids',
  },
  {
    path: '/me/companies',
    label: 'Companies',
  },
];
