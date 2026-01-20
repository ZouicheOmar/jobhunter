import { City } from "./City";
import { Company } from "./Company";
import { ContractCreate } from "./Contract";
import { Website } from "./Website";

export type HiringOrganization = {
  name: string;
};
export type PostalAddress = {
  addressCountry?: string;
  addressLocality?: string;
  addressRegion?: string;
  streetAddress?: string;
  postalCode?: string;
};

export type Place = {
  address: PostalAddress;
};

export type ScrapApiRespone = {
  title: string;
  employmentType: string;
  hiringOrganization: HiringOrganization;
  jobLocation: Place | Place[];
  description: string;
};

export type DataFromScrap = {
  city?: City;
  company?: Company;
  website?: Website;
  title: string;
  contract: ContractCreate;
};
