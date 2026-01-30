import { Candid } from './Candid';
import { Company } from './Company';

export type CandidsPageSearchParams = {
  page?: string;
  city?: string;
  company?: string;
};

export interface PageMetaData {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface CandidsPageMetaData {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type CandidsPage = {
  content: Candid[];
  page: CandidsPageMetaData;
};

export type CompanyPageSearchParams = {
  page?: string;
  orderByDateApply?: boolean;
};

interface CompanyPageMetaData {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type CompanyPage = {
  content: Company[];
  page: CompanyPageMetaData;
};
