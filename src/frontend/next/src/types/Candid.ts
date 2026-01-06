import { City } from "./City";
import type { Company } from "./Company";
import { Contract, ContractCreate } from "./Contract";
import type { Tech } from "./Tech";
import type { Website } from "./Website";

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
  company: Company;
  city: City;
  website: Website;
  contract: ContractCreate;
  stack: Tech[];
};
