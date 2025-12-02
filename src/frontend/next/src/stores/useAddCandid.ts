import { create } from "zustand";
import { useCandidsStore } from "./useCandidsStore";
import { getHostname, getTodayDate } from "@/lib/utils";
import { postCandid, scrapUrl } from "@/lib/api";

export type AddCandidState = {
  show: boolean;
  loading: boolean;
  error: boolean;

  url: string;
  title: string;
  city: string;
  companyName: string;
  contract: string;
  website: string;
  companyDesc: string | null;
  addDate: string;

  stack: string[]
};

export type AddCandidActions = {
  toggle: () => void
  updateUrl: () => void;
  updateTitle: () => void;
  updateCity: () => void;
  updateCompanyName: () => void;
  updateCompanyDesc: () => void;
  updateWebsite: () => void;
  updateStack: () => void;
  updateTech: () => void;
  updateAddDate: () => void;
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
  companyName: '',
  website: '',

  companyDesc: null,
  contract: '',

  tech: '',
  stack: [],

  addDate: '',

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
  updateAddDate: (date) => set(() => ({ addDate: date })),


  updateTitle: (title) => set(() => ({ title: title })),
  updateCity: (city) => set(() => ({ city: city })),
  updateCompanyName: (company) => set(() => ({ companyName: company })),
  updateWebsite: (website) => set(() => ({ website: website })),

  reset: () => set(store.getInitialState()),
  toggle: () => set((state) => ({ show: !state.show })),

  logall: () => console.log(get().show),

  lookupUrl: async () => {
    set({ loading: true });
    try {
      const {
        title,
        company_name,
        location,
        contract_type
      } = await scrapUrl(get().url);
      set({ loading: true });

      const date = getTodayDate();
      const hostname = getHostname(get().url)

      set({
        title: title,
        companyName: company_name,
        city: location,
        contract: contract_type,
        addDate: date,
        website: hostname,
      })
    } catch (e) {
      set({ error: true, loading: false });
      console.log("ERROR SCRAPPING", e)
    }
  },


  postCandid: async () => {

    let date = get().addDate ? new Date(get().addDate) : new Date();
    const payload = {
      url: get().url,
      title: get().title,
      cityDto: { name: get().city, },
      websiteDto: { name: get().website },
      company: get().companyName,
      stack: get().stack.map((item) => ({ name: item })),
      unsolicited: true,
      answer: false,
      addDate: date.toISOString(),
    }

    try {
      const candid = await postCandid(payload);
      set(store.getInitialState());
      return candid;

    } catch (e) {
      throw new Error("useAddCandid: error posting candid");
    }

  }


}))
