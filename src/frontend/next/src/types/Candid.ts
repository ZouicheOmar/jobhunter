import { City } from './City';
import type { Company, CompanyCreate } from './Company';
import { Contract, ContractCreate } from './Contract';
import type { Tech, TechCreate } from './Tech';
import type { Website, WebsiteCreate } from './Website';

export type Candid = {
  id: number;
  url: string;
  title: string;
  unsolicited: boolean;
  techOffer: boolean;
  answer: boolean;
  dateApply: string;
  company: Company;
  city: City;
  website: Website;
  stack: Tech[];
  contract: Contract;
};

export type CandidCreate = {
  url: string;
  title: string;
  unsolicited: boolean;
  techOffer: boolean;
  answer: boolean;
  dateApply: string;
  company: CompanyCreate;
  city: City;
  website: WebsiteCreate;
  contract: ContractCreate;
  stack: TechCreate[];
};

export type CandidUpdateRestricted = {
  id: number;
  url?: string;
  title?: string;
  unsolicited?: boolean;
  techOffer?: boolean;
  answer?: boolean;
};

export type CandidUpdate = {
  id: number;

  url: string;
  title: string;
  unsolicited: boolean;
  techOffer: boolean;
  answer: boolean;

  dateApply: string;
  company: CompanyCreate;
  city: City;
  website: WebsiteCreate;
  contract: ContractCreate;
  stack: TechCreate[];
};
