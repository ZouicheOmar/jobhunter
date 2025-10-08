import { create } from "zustand";
import { useDummyStore } from "./dummyStore";

export const useActionsStore = create((set, get, store) => ({
  cityFilter: "default",
  techFilter: "default",

  currentPage: 0,
  totalPages: 0,
  totalItems: 0,

  perPage: 5,

  incrCurrentPage: () => {
    if (get().currentPage + 1 < get().totalPages)
      set({ currentPage: get().currentPage + 1 })
  },

  dcrCurrentPage: () => {
    if (get().currentPage > 0)
      set({ currentPage: get().currentPage - 1 })
  },

  updateCityFilter: (city) => {
    set({ cityFilter: city })
    useDummyStore.getState().filterList({ city: city, tech: get().techFilter })
    get().updatePagination(useDummyStore.getState().filterList);
  },

  updateTechFilter: (tech) => {
    set({ techFilter: tech })
    useDummyStore.getState().filterList({ city: get().cityFilter, tech: tech })
    get().updatePagination(useDummyStore.getState().filterList);
  },

  updateCurrentPage: (n: number) => set({ currentPage: n }),
  updateTotalItems: (n: number) => set({ totalItems: n }),
  updateTotalPages: (n: number) => set({ totalPages: n }),

  updatePagination: (n: number) => set((state) => ({
    totalItems: n,
    totalPages: Math.ceil(n / state.perPage),
  })),

  goFirstPage: () => {
    set({ currentPage: 0 })
  },

  goLastPage: () => {
    const page = get().totalPages - 1;
    set({ currentPage: page });
  },


  reset: () => {
    set(store.getInitialState())
    useDummyStore.getState().filterList({ city: "default", tech: "default" })
  }
}))
