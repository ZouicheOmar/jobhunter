import { BasicEntity } from './BasicEntity';
import { Candid } from './Candid';
import { Company } from './Company';

export type CandidsPageSearchParams = {
  page?: string;
  tech_id?: number;
  city_id?: number;
  company?: string;
};

export type ResourcePageContent<T> = {
  content: BasicEntity<T>;
};

export type ResourcePageData = {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
};

export type ResourcePage<T> = ResourcePageContent<T> & ResourcePageData;

export interface PaginationProps {
  number: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface PageMetaData {
  number: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

interface CandidsPageMetaData {
  empty: boolean;
  first: boolean;
  last: boolean;

  number: number;
  numberOfElements: number;
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

export type UrlParams = {
  path: string;
  searchParams: Record<string, string>;
};
