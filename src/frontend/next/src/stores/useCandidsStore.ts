import { CityDto, TechDto, type Candid } from "@/types/CandidType";
import { create } from "zustand";
import { useActionsStore } from "./useActions";
import { fetchAllCandids, postCandid } from "@/lib/api";

export type CandidsStore = {
  list: Candid[]

  cities: CityDto[],
  techs: TechDto[],

  loading: boolean;
  error: boolean;
}
export type CandidsActions = {
  getCandids: () => void;
  getCities: () => void;
  getTechs: () => void;
  getAll: () => void;
  handleParseFile: () => void;
}

export const useCandidsStore = create<CandidsStore & DummyAction>((set, get) => ({
  list: [],
  filteredList: [],

  cities: [],
  techs: [],

  loading: true,
  error: false,

  filterList: (values) => {
    const { city, tech } = values;
    set((state) => {
      if (city == "default" && tech == "default") {
        return { filteredList: [...state.list] }
      }
      else if (city !== "default" && tech == "default") {
        return { filteredList: [...state.list.filter((item) => item?.cityDto.name == city)] }
      }
      else if (city == "default" && tech !== "default") {
        return { filteredList: [...state.list.filter((item) => item?.stack.find((techItem) => techItem.name == tech) !== undefined)] }
      }
      else if (city !== "default" && tech !== "default") {
        return {
          filteredList: [...state.list.filter((item) => item?.cityDto.name == city && (item?.stack.find((techItem) => techItem.name == tech) !== undefined))]
        }
      }
    })
  },

  getAll: async () => {
    try {
      const { candids, cities, techs } = await fetchAllCandids();
      set({
        list: candids,
        filteredList: candids,
        cities: cities,
        techs: techs
      });
      useActionsStore.getState().updatePagination(candids.length);
    } catch (e) {
      set({ error: true });
      throw new Error("Problem fetching candids or cities or techs");
    }
  },

  addCandid: (candid) => set((state) => ({
    list: [candid, ...state.list],
    filteredList: [candid, ...state.filteredList]
  })),

  deleteCandid: async (id) => {
    const url = "http://localhost:8080/candid/" + id;
    const req = await fetch(url, {
      method: "DELETE"
    });
    if (!req.ok) throw new Error('probleme deleting candid');
    // should add a taoster here
    console.log("deleted successfully");
  },

  // this function is not used..
  postCandid: async (payload: Candid) => {
    try {
      // TODO: loading
      let date = payload.addDate ? new Date(payload.addDate) : new Date();
      const data = { ...payload, addDate: date.toISOString() }
      const candid = await postCandid(data)
      set((state) => ({ list: [...state.list, candid] }))
    } catch (e) {
      throw new Error("TODO: handle error on post candid");
    }
  },

  handleParseFile: async () => {
    const url = "http://localhost:8080/candid/handleFile";
    const req = await fetch(url);

    if (!req.ok)
      throw new Error("problem parsing file")

    const t = await req.text();
    console.log(t);
  }



}))

