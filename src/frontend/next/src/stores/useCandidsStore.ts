import { CityDto, TechDto, type Candid } from "@/types/CandidType";
import { create } from "zustand";
import { useActionsStore } from "./useActions";

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
  contracts: [],

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
    const [reqCandids, reqCities, reqTechs, reqContracts] = await Promise.all(
      [
        fetch("http://localhost:8080/candid"),
        fetch('http://localhost:8080/city'),
        fetch('http://localhost:8080/tech'),
        fetch('http://localhost:8080/contract'),
      ]
    )
    const [jsonCandids,
      jsonCities,
      jsonTechs,
      jsonContracts] =
      await Promise.all(
        [reqCandids.json(),
        reqCities.json(),
        reqTechs.json(),
        reqContracts.json()
        ])

    if (!reqCandids.ok) {
      set({ error: true });
      throw new Error("probleme fetching candids");
    }

    if (!reqCities.ok || !reqTechs.ok) {
      set({ error: true });
      throw new Error("probleme fetching cities or techs");
    }

    jsonCandids.reverse()

    set({ list: jsonCandids });
    set({ filteredList: jsonCandids });
    set({ cities: jsonCities });
    set({ techs: jsonTechs });
    set({ contracts: jsonContracts });

    useActionsStore.getState().updatePagination(jsonCandids.length);

  },

  addCandid: (candid) => set((state) => ({
    list: [candid, ...state.list],
    filteredList: [candid, ...state.filteredList]
  })),

  delCandid: async (id) => {
    const url = "http://localhost:8080/candid/" + id;
    const req = await fetch(url, {
      method: "DELETE"
    });
    if (!req.ok) throw new Error('probleme deleting candid');
    // should add a taoster here
    console.log("deleted successfully");

    // update the array here
    // let prevCandids = 
    // let index = 0;
    // candids.value.forEach((candid, i) => {
    //   if (candid.id == id) {
    //     index = i;
    //     return;
    //   }
    // })
    // candids.value.splice(index, 1);
  },

  postCandid: async (payload: Candid) => {
    const date = new Date();
    const data = { ...payload, addData: date.toISOString() }

    const posturl = "http://localhost:8080/candid";
    const req = await fetch(posturl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)

    })

    if (!req.ok) return console.log("probleme posting candid");
    const json = await req.json();
    set({ list: [...list, json] })
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

