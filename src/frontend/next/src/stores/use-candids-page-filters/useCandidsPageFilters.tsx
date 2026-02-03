import { create } from 'zustand';

import { City, Tech, TechCreate } from '@/types';

type CityCompletionItem = {
  name: string;
  id: number | null;
};

export interface CandidsPageFilters {
  tech: TechCreate;
  city: CityCompletionItem;
  techCompletion: TechCreate[];
  cityCompletion: CityCompletionItem[];
  updateTech: (v: TechCreate) => void;
  updateCity: (v: CityCompletionItem) => void;
  updateTechCompletion: (v: Tech[]) => void;
  updateCityCompletion: (v: City[]) => void;
  resetCompletions: () => void;
}

export const useCandidsPageFilters = create<CandidsPageFilters>((set, get, store) => ({
  tech: { name: '', id: null },
  city: { name: '', id: null },
  techCompletion: [],
  cityCompletion: [],
  updateTech: (v) => set({ tech: v }),
  updateCity: (v) => set({ city: v }),
  updateTechCompletion: (v) => set({ techCompletion: v }),
  updateCityCompletion: (v) => set({ cityCompletion: v }),
  resetCompletions: () => set({ techCompletion: [], cityCompletion: [] }),
  reset: () => set(store.getInitialState()),
}));
