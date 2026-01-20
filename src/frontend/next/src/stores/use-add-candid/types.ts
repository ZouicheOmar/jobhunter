import {
  UpdateCompletionListFn,
  UpdateValueFn,
} from "@/components/ui-elements/input-with-select";
import {
  CandidCreate,
  Tech,
  Website,
  Company,
  City,
  Candid,
  ContractCreate,
  TechCreate,
  CompanyCreate,
  WebsiteCreate,
} from "@/types";

export interface ComponentStateSlice {
  scrapPending: boolean;
  llmExtractPending: boolean;
  checkExistingDataPending: boolean;
  scrapError: boolean;
  llmExtractError: boolean;
  checkExistingDataError: boolean;
  reset: () => void;
}

export interface TitleSlice {
  title: string;
  updateTitle: (v: string) => void;
}

export interface TechSlice {
  tech: TechCreate;
  stack: TechCreate[];
  techCompletionList: Tech[];
  alreadyInStackError: boolean;

  // set default in typed parameters ?
  updateAlreadyInStackError: (v?: boolean) => void;

  updateTech: (v: TechCreate) => void;

  setStack: (v: Tech[]) => void;

  updateStack: () => void;
  updateStackFromSuggestionList: (v: Tech) => void;
  removeStackItem: (v: TechCreate) => void; // update this

  updateTechCompletionList: (v: Tech[]) => void;
  resetTechCompletionList: () => void;
}

export interface UrlSlice {
  url: string;
  updateUrl: (v: string) => void;
  lookupUrl: () => void;
}

export interface CitySlice {
  city: City;
  cityCompletionList: City[];
  updateCity: UpdateValueFn<City>;
  updateCityCompletionList: UpdateCompletionListFn<City[]>;
}

export interface CompanySlice {
  company: Company | CompanyCreate;
  companyCompletionList: Company[];
  updateCompany: UpdateValueFn<Company>;
  updateCompanyCompletionList: UpdateCompletionListFn<City[]>;
}

export interface WebsiteSlice {
  website: WebsiteCreate;
  websiteCompletionList: Website[];
  updateWebsite: UpdateValueFn<Website>;
  updateWebsiteCompletionList: UpdateCompletionListFn<Website[]>;
}

export interface ContractSlice {
  contract: ContractCreate;
  updateContract: (v: ContractCreate) => void;
}

export interface RemainingSlice {
  techOffer: boolean;
  unsolicited: boolean;
  answer: boolean;
  dateApply: string;

  updateTechOffer: (v: boolean) => void;
  updateUnsolicited: (v: boolean) => void;
  updateAnswer: (v: boolean) => void;
  updateDateApply: (v: string) => void;
  postCandid: () => Promise<Candid>;
}

export type AddCandidStore = ComponentStateSlice &
  TechSlice &
  TitleSlice &
  UrlSlice &
  CitySlice &
  CompanySlice &
  WebsiteSlice &
  ContractSlice &
  RemainingSlice;
