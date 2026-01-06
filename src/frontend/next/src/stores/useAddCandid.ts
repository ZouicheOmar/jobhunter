import { create, StateCreator } from "zustand";
import { getHostname, getTodayDate } from "@/lib/utils";
import { postCandid, scrapUrl } from "@/lib/api";
import {
  CandidCreate,
  Tech,
  Website,
  Company,
  City,
  Candid,
  ContractCreate,
} from "@/types";
import { formatDate } from "@/lib/utils";
import { CONTRACT_TYPES } from "@/lib";

interface ComponentStateSlice {
  show: boolean;
  loading: boolean;
  error: boolean;
  reset: () => void;
  toggle: () => void;
}

interface TitleSlice {
  title: string;
  updateTitle: (v: string) => void;
}

interface TechSlice {
  tech: Tech;
  stack: Tech[];
  techCompletionList: Tech[];
  updateTech: (v: Tech) => void;
  updateStack: () => void;
  removeStackItem: (v: Tech) => void; // update this
  updateTechCompletionList: (v: Tech[]) => void;
}

interface UrlSlice {
  url: string;
  updateUrl: (v: string) => void;
  lookupUrl: () => void;
}

interface CitySlice {
  city: City;
  cityCompletionList: City[];
  updateCity: (v: City) => void;
  updateCityCompletionList: (v: City[]) => void;
}

interface CompanySlice {
  company: Company;
  companyCompletionList: Company[];
  updateCompany: (v: Company) => void;
  updateCompanyCompletionList: (v: Company[]) => void;
}

interface WebsiteSlice {
  website: Website;
  websiteCompletionList: Website[];
  updateWebsite: (v: Website) => void;
  updateWebsiteCompletionList: (v: Website[]) => void;
}

interface ContractSlice {
  contract: ContractCreate;
  updateContract: (v: ContractCreate) => void;
}

const contractSlice: StateCreator<AddCandidStore, [], [], ContractSlice> = (
  set,
) => ({
  contract: { type: CONTRACT_TYPES[CONTRACT_TYPES.length - 1], duration: 0 },
  updateContract: (v) =>
    set({ contract: { type: v.type, duration: v.duration || 0 } }),
});

// updateContract: (v: string) => void;

interface RemainingSlice {
  techOffer: boolean;
  unsolicited: boolean;
  answer: boolean;
  // contract: string;
  dateApply: string;

  updateTechOffer: (v: boolean) => void;
  updateUnsolicited: (v: boolean) => void;
  updateAnswer: (v: boolean) => void;
  updateDateApply: (v: string) => void;
  postCandid: () => Promise<Candid>;
}

type AddCandidStore = ComponentStateSlice &
  TechSlice &
  TitleSlice &
  UrlSlice &
  CitySlice &
  CompanySlice &
  WebsiteSlice &
  ContractSlice &
  RemainingSlice;

const componentStateSlice: StateCreator<
  AddCandidStore,
  [],
  [],
  ComponentStateSlice
> = (set, _, store) => ({
  show: false,
  loading: false,
  error: false,
  reset: () => set({ ...store.getInitialState(), show: true }),
  toggle: () => set((state) => ({ show: !state.show })),
});

const titleSlice: StateCreator<AddCandidStore, [], [], TitleSlice> = (set) => ({
  title: "",
  updateTitle: (v: string) => set({ title: v }),
});

const urlSlice: StateCreator<AddCandidStore, [], [], UrlSlice> = (
  set,
  get,
) => ({
  url: "https://www.hellowork.com/fr-fr/emplois/74168933.html",
  updateUrl: (v: string) => set(() => ({ url: v })),
  lookupUrl: async () => {
    try {
      set({ loading: true });

      const { title, company_name, location, contract_type } = await scrapUrl(
        get().url,
      );

      const hostname = getHostname(get().url);

      set({
        title: title,
        company: { name: company_name, id: -1 },
        city: { name: location, id: -1 },
        contract: contract_type,
        website: { name: hostname || "", id: -1 },
      });

      // là un autre pb : city faut absolement qu'elle soit validée..
    } catch (e) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
});

const citySlice: StateCreator<AddCandidStore, [], [], CitySlice> = (set) => ({
  city: { name: "", id: -1 },
  cityCompletionList: [],
  updateCity: (v) => set({ city: v }),
  updateCityCompletionList: (v) => set({ cityCompletionList: v }),
});

const companyNameSlice: StateCreator<AddCandidStore, [], [], CompanySlice> = (
  set,
) => ({
  company: { name: "", id: -1 },
  companyCompletionList: [],
  updateCompany: (v) => set({ company: v }),
  updateCompanyCompletionList: (v) => set({ companyCompletionList: v }),
});

const websiteSlice: StateCreator<AddCandidStore, [], [], WebsiteSlice> = (
  set,
) => ({
  // TODO verifier que le state s'appelle websiteName partout..
  website: { name: "", id: -1 },
  websiteCompletionList: [],
  updateWebsite: (v) => set({ website: v }),
  updateWebsiteCompletionList: (v) => set({ websiteCompletionList: v }),
});

const techSlice: StateCreator<AddCandidStore, [], [], TechSlice> = (
  set,
  get,
) => ({
  tech: { name: "", id: -1 },
  stack: [],
  techCompletionList: [],

  updateTech: (v) => set({ tech: v }),

  updateStack: () => {
    const stack = get().stack;
    const tech = get().tech;
    !stack.includes(tech) &&
      set({ stack: [...stack, tech], tech: { name: "", id: -1 } });
  },

  removeStackItem: (v) => {
    let index = -1;

    for (const item of get().stack) {
      index += 1;
      if (item.id == v.id) break;
    }

    if (index == -1) return;
    set({ stack: get().stack.toSpliced(index, 1) });
  },

  updateTechCompletionList: (v) => set({ techCompletionList: v }),
});

const remainingSlice: StateCreator<AddCandidStore, [], [], RemainingSlice> = (
  set,
  get,
  store,
) => ({
  techOffer: true,
  unsolicited: false,
  answer: false,
  dateApply: formatDate(new Date()),

  updateTechOffer: (value: boolean) => set({ techOffer: value }),
  updateUnsolicited: (value: boolean) => set({ unsolicited: value }),
  updateAnswer: (value: boolean) => set({ answer: value }),
  updateDateApply: (date: string) => set({ dateApply: date }),

  postCandid: async () => {
    const payload: CandidCreate = {
      url: get().url,
      title: get().title,
      unsolicited: get().unsolicited,
      techOffer: get().techOffer,
      dateApply: new Date(get().dateApply).toISOString(),
      answer: false,
      company: get().company,
      city: get().city,
      website: get().website,
      contract: get().contract,
      stack: get().stack,
    };

    console.log("PAYLOAD ", payload);

    try {
      const candid = await postCandid(payload);
      set(store.getInitialState());
      return candid;
    } catch (e) {
      throw new Error("useAddCandid: error posting candid");
    }
  },
});

export const useAddCandidStore = create<AddCandidStore>((...a) => ({
  ...componentStateSlice(...a),
  ...urlSlice(...a),
  ...titleSlice(...a),
  ...citySlice(...a),
  ...companyNameSlice(...a),
  ...websiteSlice(...a),
  ...techSlice(...a),
  ...contractSlice(...a),
  ...remainingSlice(...a),
}));
