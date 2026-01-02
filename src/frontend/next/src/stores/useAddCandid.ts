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
  unsolicited: boolean;
  techOffer: boolean;
  answer: boolean;

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

/* input with select
 *
 * state: value
 * state: completeList
 *
 * action: update value (triggered by on change and on click)
 */
/* input (app component) types
 *
 * title : default input
 * url : default input
 *
 * city : input with select
 *
 * website : input with select or add
 * company name  : input with select or add
 * tech stack : input with select or add
 *
 * company desc : TODO (with ia), would be selected if company 
 * already exists in database
 *
 * dateApply : date input
 * */

// TODO slices pattern
//

const urlSlice = (set) => ({
  url: "",
  updateUrl: (v: string) => set(() => ({ url: v })),
  lookupUrl: async () => {
    try {
      set({ loading: true });

      const {
        title,
        company_name,
        location,
        contract_type
      } = await scrapUrl(get().url);

      const date = getTodayDate();
      const hostname = getHostname(get().url)

      set({
        title: title,
        companyName: company_name,
        cityName: location,
        contract: contract_type,
        addDate: date,
        website: hostname,
      })

      set({ loading: false });
    } catch (e) {
      set({ error: true, loading: false });
    }
  },

})

const titleSlice = (set) => ({
  title: "",
  updateTitle: (v: string) => set(() => ({ title: v })),
})

const citySlice = (set) => ({
  cityName: "",
  completionList: [],
  updateCityCompletionList: (v: string[]) => set({ completionList: v }),
  updateCityName: (v: string) => set({ cityName: v }),
})

const companyNameSlice = (set) => ({
  companyName: "",
  updateCompanyName: (v: string) => set(() => ({ companyName: v })),
})

const websiteSlice = (set) => ({
  website: "",
  updatewebsite: (v: string) => set(() => ({ website: v })),
})

const techSlice = (set, get) => ({
  tech: '',
  stack: [],

  updateTech: (tech) => set({ tech: tech }),

  updateStack: () => {
    const stack = get().stack;
    const tech = get().tech;
    !stack.includes(tech) && set({ stack: [...stack, tech], tech: '' });
  },

  removeTech: (tech: string) => {
    const index = get().stack.indexOf(tech);
    if (index > -1) {
      const prevStack = get().stack;
      prevStack.splice(index, 1);
      console.log(prevStack);
      set({ stack: [...prevStack] });
    }
  },

})

const componentStateSlice = (set, get, store) => ({
  show: false,
  loading: false,
  error: false,
  reset: () => set({ ...store.getInitialState(), show: true }),
  toggle: () => set((state) => ({ show: !state.show })),
})

const remainingSlice = (set) => ({
  techOffer: false,
  unsolicited: false,
  answer: false,
  contract: '',
  // TODO rename to dateApply
  addDate: '',
  // companyDesc: null,

  updateTechOffer: (value: boolean) => set({ techOffer: value }),
  updateUnsolicited: (value: boolean) => set({ unsolicited: value }),
  updateAnswer: (value: boolean) => set({ answer: value }),
  updateContract: (contract) => set(() => ({ contract: contract })),
  updateAddDate: (date) => set(() => ({ addDate: date })),

  // TODO refactor this
  // postCandid: async () => {
  //
  //   let date = get().addDate ? new Date(get().addDate) : new Date();
  //   const payload = {
  //     url: get().url,
  //     title: get().title,
  //     cityDto: { name: get().city, },
  //     websiteDto: { name: get().website },
  //     company: get().companyName,
  //     stack: get().stack.map((item) => ({ name: item })),
  //     unsolicited: get().unsolicited,
  //     answer: false,
  //     addDate: date.toISOString(),
  //   }
  //
  //   try {
  //     const candid = await postCandid(payload);
  //     set(store.getInitialState());
  //     return candid;
  //
  //   } catch (e) {
  //     throw new Error("useAddCandid: error posting candid");
  //   }
  //
  // }

})

export type AddCandidStore = AddCandidState & AddCandidActions;

export const useAddCandidStore = create((...a) => ({
  ...componentStateSlice(...a),
  ...urlSlice(...a),
  ...titleSlice(...a),
  ...citySlice(...a),
  ...companyNameSlice(...a),
  ...websiteSlice(...a),
  ...techSlice(...a),
  ...remainingSlice(...a),
}))
