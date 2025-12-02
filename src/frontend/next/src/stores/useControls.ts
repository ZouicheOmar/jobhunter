import { create } from "zustand";

// TODO: define type

export const useControls = create((set) => ({
  // this should define state of the controls button group
  // and replace useActions because it means nothing
  compact: true,
  toggleCompact: (value: Boolean) => set({ compact: value }),

  filtres: {
    city: "paris",
    tech: "react"
  },
  updateFiltres: () => console.log("update filtres"),

  showAddForm: false,
  toggleShowAddForm: () => set((state) => ({ showAddForm: !state.showAddForm })),
}))
