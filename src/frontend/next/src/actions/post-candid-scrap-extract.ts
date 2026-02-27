'use server';
import { ROUTES } from '@/lib';
import { HiringOrganization, Place, DataFromScrap, City, Company, Website } from '@/types';
import { fetchClient } from './fetchClient';

export type ContractLooseDto = {
  contractType: string;
  duration: number;
};
export type PostCandidResolveDataArg = {
  applicationHostname?: string;
  scrapped: {
    title: string;
    employmentType: string;
    hiringOrganization: HiringOrganization;
    jobLocation: Place | Place[];
  };
};
export type PostCandidResolveDataFn = (data: PostCandidResolveDataArg) => Promise<DataFromScrap>;

export type PostCandidResolveDataResult = {
  title: string;
  employmentType: ContractLooseDto;
  website: Website;
  company: Company;
  city: City;
};

export const postCandidResolveData: PostCandidResolveDataFn = async (data) => {
  console.log('CALL: postCandidResolveData');
  const res = await fetchClient(ROUTES.API.RESOLVE_POST_DATA, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('problem resolving data');

  const resolvedData: Promise<DataFromScrap> = await res.json();
  console.log('resolved data', resolvedData);
  return resolvedData;
};
