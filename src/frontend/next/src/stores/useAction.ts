import { create } from "zustand";
import { StateCreator } from "zustand";

interface FilterSlice {
  city: string; // should not be string
  tech: string;
  updateCity: (v: string) => void;
  updateTech: (v: string) => void;
}

interface PaginationSlice {
  currentPage: number;
  totalPages: number;
  totalItems: number;

  incrCurrentPage: () => void;
  dcrCurrentPage: () => void;
  updateCurrentPage: (v: number) => void;

  updateTotalPages: (v: number) => void;
  updateTotalItems: (v: number) => void;

  updatePagination: (n: number) => void;

  goFirstPage: () => void;
  goLastPage: () => void;
  reset: () => void;
}
type ActionStore = FilterSlice & PaginationSlice;

const filterSlice: StateCreator<ActionStore, [], [], FilterSlice> = (set) => ({
  city: "",
  tech: "",
  updateCity: (v) => set({ city: v }),
  updateTech: (v) => set({ tech: v }),
});

const paginationSlice: StateCreator<ActionStore, [], [], PaginationSlice> = (
  set,
  get,
  store,
) => ({
  currentPage: 0,
  totalPages: 0,
  totalItems: 0,

  incrCurrentPage: () =>
    set({ currentPage: get().currentPage > 0 ? get().currentPage - 1 : 0 }),
  dcrCurrentPage: () =>
    set({
      currentPage:
        get().currentPage < get().totalPages
          ? get().currentPage + 1
          : get().totalPages,
    }),

  updateCurrentPage: (n) => set({ currentPage: n }),
  updateTotalPages: (n) => set({ totalPages: n }),
  updateTotalItems: (n) => set({ totalItems: n }),

  updatePagination: (n: number) =>
    set({ totalItems: n, totalPages: Math.ceil(n / 10) }),

  goFirstPage: () => set({ currentPage: 0 }),
  goLastPage: () => set({ currentPage: get().totalPages - 1 }),

  reset: () => set(store.getInitialState()),
});

export const useActionStore = create<ActionStore>((...a) => ({
  ...filterSlice(...a),
  ...paginationSlice(...a),
}));
