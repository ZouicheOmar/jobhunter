import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Candid, CandidsPageSearchParams, PaginationProps, ResourcePageData, Tech, TechCreate } from '@/types';

export const getEmptyCandid: () => Candid = () => ({
  url: 'http://www.wttj.com/12345AZE',
  title: 'à supprimer',
  unsolicited: true,
  techOffer: true,
  answer: false,
  dateApply: new Date().toISOString(),
  cityId: 590001,
  website: { id: 1 },
  company: { id: 1 },
  contract: { type: 'INTERN' },
  stack: [{ id: 402 }, { id: 403 }],
});

export function getHostname(url: string): string | null {
  let parsed = URL.parse(url);
  if (parsed?.host) {
    let v = parsed.host.split('.');
    return v.length == 3 ? v[1] : v[0];
  }
  return null;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isNameInstack: (name: string, stack: Tech[]) => number = (name, stack) => {
  let i = -1;
  stack.forEach((tech, index) => {
    if (tech.name == name) i = index;
    return;
  });
  return i;
};

export const filterFoundStack: (formStack: string[], extractedStack: Tech[]) => TechCreate[] = (
  formStack,
  extractedStack
) => {
  const resultStack: TechCreate[] = [];

  formStack.forEach((techName) => {
    let index = isNameInstack(techName, extractedStack);
    if (index != -1) resultStack.push(extractedStack[index]);
    else resultStack.push({ name: techName, id: null });
  });

  return resultStack;
};

export const indexInList = (item: Tech | TechCreate, list: Tech[] | TechCreate[]) => {
  for (let i = 0; i < list.length; i++) if (item.name == list[i].name) return i;
  return -1;
};

type extractPaginationDataFn = (v: ResourcePageData) => PaginationProps;
export const extractPaginationData: extractPaginationDataFn = ({ empty, first, last, number, totalPages }) => ({
  empty: empty,
  first: first,
  last: last,
  number: number,
  totalPages: totalPages,
});

export const makeCandidsPageFilters: (searchParams: CandidsPageSearchParams | undefined) => string = (searchParams) => {
  const pageNumber = Number(searchParams?.page) || 0;
  const techId = Number(searchParams?.tech_id) || undefined;
  const cityId = Number(searchParams?.city_id) || undefined;

  let u = `page=${pageNumber}`;

  if (cityId) u += `&city_id=${cityId}`;
  if (techId) u += `&tech_id=${techId}`;
  return u;
};

export const urlFromSearchParams = (searchParams: Record<string, string>, n: number) =>
  Object.keys(searchParams).length
    ? Object.keys(searchParams).reduce((p, c, i) => {
        let r = p;
        if (p == 'page') r = `?page=${n}`;
        return r + `&${c}=${searchParams[c]}`;
      })
    : '';

export const goTo = (searchParams: Record<string, string>, n: number) =>
  `/candids${urlFromSearchParams(searchParams, n)}`;

export const getUrl = (up: any) => `/${up.path}?${urlFromSearchParams(up.searchParams, 1)}`;
