import { ROUTES } from '@/lib';
import { fetchClient } from './fetchClient';
import { CompanyPage } from '@/types';

type GetCompanyPageFn = (page: number, orderByDateApply: boolean) => Promise<CompanyPage | null>;

export const getCompanyPage: GetCompanyPageFn = async (page, orderByDateApply = true) => {
  const res = await fetchClient(ROUTES.API.COMPANY.PAGE(page, orderByDateApply));
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
};

export const getCompanyById = async (id: number): Promise<Company | null> => {
  const res = await fetchClient(ROUTES.API.COMPANY.BY_ID(id));
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
};
