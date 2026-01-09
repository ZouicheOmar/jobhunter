import { Candid } from "./Candid";

export type CandidsPageSearchParams = {
  page?: string;
};

export interface PageMetaData {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type CandidsPage = {
  content: Candid[];
  page: PageMetaData;
};

