import { createStore } from "zustand";

import type { Candid } from "@/types/CandidType";

export type MainState = {
  list: Candid[];
}
export type MainActions = {
  getAll: () => void;
  deleteById: (id: number) => void;
  filter: () => void;
}
export type MainStore = MainState & MainActions;
export const defaultInitialState: MainState = {
  list: []
};
export const initMainStore = (): MainState => {
  return {
    list: [
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
        id: 2,
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

    ]
  }
}
export const createMainStore = (
  initState: MainState = defaultInitialState,
) => {
  return createStore<MainStore>((set) => ({
    ...initState,
    getAll: () => (state: MainState) => state.list,
    deleteById: (id: number) => set((state) => ({ list: [] })),
    filter: () => console.log("hello should fetch now")
  }))

}
