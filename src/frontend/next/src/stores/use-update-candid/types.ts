import { Candid } from '@/types';

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

export interface UrlSlice {
  url: string;
  updateUrl: (v: string) => void;
  lookupUrl: () => void;
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
  // updateCandid: () => Promise<Candid>;
  updateCandid: (id: number) => void;
}

export type UpdateCandidStore = ComponentStateSlice & UrlSlice & TitleSlice & RemainingSlice;
