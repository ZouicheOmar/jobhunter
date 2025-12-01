import { create } from "zustand";
import { useCandidsStore } from "./useCandidsStore";

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

  stack: string[],
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
  lookupUrl: () => void;
  reset: () => void;
};


const today = () => {
  const d = new Date();
  const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  return date;
}

export type AddCandidStore = AddCandidState & AddCandidActions;

export const useAddCandidStore = create<AddCandidStore>((set, get, store) => ({
  show: false,
  loading: false,
  error: false,

  // url: '',
  url: 'https://www.hellowork.com/fr-fr/emplois/68113582.html',
  title: '',
  city: '',
  companyName: '',
  website: '',

  companyDesc: null,
  contract: '',

  tech: '',
  stack: [],

  addDate: today(),

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
      const req = await fetch("http://localhost:5000/scrap/",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: get().url
          })
        }
      );

      set({ loading: false });

      const json = await req.json();
      console.log("LOG: data \n", json);


      const {
        title,
        company_name,
        location,
        contract_type
      } = json;

      set({
        title: title,
        companyName: company_name,
        city: location,
        contract: contract_type,
      })

    } catch (e) {
      set({ error: true, loading: false });
      console.log("ERROR SCRAPPING", e)
    }

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
