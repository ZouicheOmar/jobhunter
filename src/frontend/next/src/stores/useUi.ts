import { create } from "zustand";

// TODO: define type

export const useUI = create((set, get, store) => ({
  // this should define state to control the ui
  compact: true,
  filtres: {
    city: "paris",
    tech: "react"
  },
  toggleAddForm: false,
  toggleCompact: (value: Boolean) => set({ compact: value }),
  toggletoggleAddForm: set((state: any) => { toggleAddForm: state.toggleAddForm }),
  updateFiltres: () => console.log("update filtres"),
}))
