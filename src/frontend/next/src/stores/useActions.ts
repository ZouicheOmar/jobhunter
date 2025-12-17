import { create } from "zustand";
import { useCandidsStore } from "./useCandidsStore";

export const useActionsStore = create((set, get, store) => ({
  cityFilter: "default",
  techFilter: "default",

  currentPage: 0,
  totalPages: 0,
  totalItems: 0,

  perPage: 10, // and this should be computed per card layout, 
  // should have more candid when viewing with a compact card

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
    useCandidsStore.getState().filterList({ city: city, tech: get().techFilter })
    get().updatePagination(useCandidsStore.getState().filterList);
  },

  updateTechFilter: (tech) => {
    set({ techFilter: tech })
    useCandidsStore.getState().filterList({ city: get().cityFilter, tech: tech })
    get().updatePagination(useCandidsStore.getState().filterList);
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
    useCandidsStore.getState().filterList({ city: "default", tech: "default" })
  }
}))
