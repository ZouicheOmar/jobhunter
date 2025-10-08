import { CityDto, TechDto, type Candid } from "@/types/CandidType";
import { create } from "zustand";
import { useActionsStore } from "./useActions";

const list = [
  {
    addDate: "string",
    answer: false,
    cityDto: { name: "paris" },
    company: "string",
    id: 1,
    stack: [
      { name: "react" },
      { name: "redux" },
      { name: "software engineer" }
    ],
    title: "string",
    unsolicited: false,
    url: "string",
    websiteDto: { name: "linkedin" }
  },

  {
    addDate: "string",
    answer: false,
    cityDto: { name: "paris" },
    company: "string",
    id: 2,
    stack: [
      { name: "react" },
      { name: "redux" },
      { name: "tanstack query" }
    ],
    title: "developper fullstack",
    unsolicited: true,
    url: "string",
    websiteDto: { name: "linkedin" }
  },

  {
    addDate: "string",
    answer: false,
    cityDto: { name: "paris" },
    company: "string",
    id: 3,
    stack: [
      { name: "react" },
      { name: "redux" },
      { name: "tanstack query" }
    ],
    title: "frontend engineer",
    unsolicited: true,
    url: "string",
    websiteDto: { name: "linkedin" }
  }
];

export type DummyState = {
  list: Candid[]

  cities: CityDto[],
  techs: TechDto[],

  loading: boolean;
  error: boolean;
}
export type DummyActions = {
  getCandids: () => void;
  getCities: () => void;
  getTechs: () => void;
  getAll: () => void;
  handleParseFile: () => void;
}

export const useDummyStore = create<DummyState & DummyAction>((set, get) => ({
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

  getCandids: async () => {
    const url = "http://localhost:8080/candid";
    const req = await fetch(url)

    set({ loading: false })
    if (!req.ok) {
      set({ error: true })
      console.log("error fetching candids")
    }
    const json = await req.json();
    set({ list: json })
    set({ filteredList: json })
  },
  getCities: async () => {
    const url = "http://localhost:8080/city";
    const req = await fetch(url)

    set({ loading: false })
    if (!req.ok) {
      set({ error: true })
      console.log("error fetching candids")
    }
    const json = await req.json();
    set({ cities: json })
  },
  getTechs: async () => {
    const url = "http://localhost:8080/tech";
    const req = await fetch(url)

    set({ loading: false })
    if (!req.ok) {
      set({ error: true })
      console.log("error fetching candids")
    }
    const json = await req.json();
    set({ techs: json })
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

    useActionsStore.getState().updatePagination(jsonCandids.length);

    set({ list: jsonCandids });
    set({ filteredList: jsonCandids });
    set({ cities: jsonCities });
    set({ techs: jsonTechs });
    set({ contracts: jsonContracts });
  },

  addCandid: (candid) => set((state) => ({
    list: [candid, ...state.list],
    filteredList: [candid, ...state.filteredList]
  })),

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

