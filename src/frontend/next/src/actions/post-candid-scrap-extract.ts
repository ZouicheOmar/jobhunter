'use server';
import { ROUTES } from '@/lib';
import { HiringOrganization, Place, DataFromScrap, City, Company, Website } from '@/types';
import { fetchClient } from './fetchClient';
import { PostDataResolveError } from './errors';

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
  console.log('call: postCandidResolveData');
  try {
    // let dataToSend = data;
    if (Array.isArray(data.scrapped.jobLocation)) data.scrapped.jobLocation = data.scrapped.jobLocation[0];

    const res = await fetchClient(ROUTES.API.RESOLVE_POST_DATA, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const resolvedData = await res.json();
    return resolvedData;
  } catch (e) {
    console.log(e);
    throw new PostDataResolveError();
  }
};
