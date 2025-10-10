import { create } from "zustand";
import { useCandidsStore } from "./useCandidsStore";

export type AddCandidState = {
  show: boolean;
  loading: boolean;
  error: boolean;

  url: string;
  title: string;
  city: string;
  company: string;
  website: string;
  companyDesc: string | null;

  stack: string[],

};

export type AddCandidActions = {
  toggle: () => void
  updateUrl: () => void;
  updateTitle: () => void;
  updateCity: () => void;
  updateCompany: () => void;
  updateCompanyDesc: () => void;
  updateWebsite: () => void;
  updateStack: () => void;
  updateTech: () => void;
  lookupUrl: () => void;
  reset: () => void;
};

export type AddCandidStore = AddCandidState & AddCandidActions;

export const useAddCandidStore = create<AddCandidStore>((set, get, store) => ({
  show: false,
  loading: false,
  error: false,

  url: '',
  title: '',
  city: '',
  company: '',
  website: '',

  contract: '',

  tech: '',
  stack: [],

  updateStack: () => {
    const prevStack = get().stack;
    const tech = get().tech;
    if (!prevStack.includes(tech)) {
      set({ stack: [...prevStack, tech], tech: '' });
    }
  },

  removeTech: (tech: string) => {
    const index = get().stack.indexOf(tech);
    console.log(tech, index)
    if (index > -1) {
      const prevStack = get().stack;
      prevStack.splice(index, 1);
      console.log(prevStack);
      set({ stack: [...prevStack] });
    }
  },

  updateTech: (tech) => set(() => ({ tech: tech })),
  updateUrl: (url) => set(() => ({ url: url })),
  updateContract: (contract) => set(() => ({ contract: contract })),

  companyDesc: null,

  updateTitle: (title) => set(() => ({ title: title })),
  updateCity: (city) => set(() => ({ city: city })),
  updateCompany: (company) => set(() => ({ company: company })),
  updateWebsite: (website) => set(() => ({ website: website })),

  reset: () => set(store.getInitialState()),
  toggle: () => set((state) => ({ show: !state.show })),

  logall: () => console.log(get().show),

  lookupUrl: async () => {
    set({ loading: true });
    const reqUrl = "http://localhost:5000/handle_scrap_url/"
    const req = await fetch(reqUrl,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: get().url
        })
      }
    );

    set({ loading: false });

    if (!req.ok) {
      set({ error: true });
      console.log("ERROR SCRAPPING")
      return;
    }

    const json = await req.json();
    console.log("DATA", json);

    const { city: dataCity,
      company_desc,
      company: dataCompany,
      contract: dataContract,
      position: dataPosition,
      startDate: dataStartDate,
      tech_stack,
      title: dataTitle,
      website: dataWebsite } = json;

    set({
      city: dataCity,
      title: dataPosition,
      company: dataCompany,
      website: dataWebsite,
      companyDesc: company_desc,
      contract: dataContract,
      stack: [...tech_stack],
    })

  },

  postCandid: async () => {
    const date = new Date();
    const candid = {
      url: get().url,
      title: get().title,
      cityDto: { name: get().city, },
      websiteDto: { name: get().website },
      url: get().url,
      company: get().company,
      stack: get().stack.map((item) => ({ name: item })),
      unsolicited: true,
      answer: false,
      addDate: date.toISOString(),
    }
    console.log(candid);

    const url = "http://localhost:8080/candid";
    const req = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(candid)

    })

    if (!req.ok) return console.log("probleme posting candid");
    const json = await req.json();

    set(store.getInitialState());
    useCandidsStore.getInitialState().addCandid(json);
  }




}))
