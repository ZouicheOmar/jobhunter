import { create } from "zustand";
import { useCandidsStore } from "./useCandidsStore";

export const useControls = create((set, get, store) => ({
  compact: true,
  toggleCompact: (value: Boolean) => set({ compact: value }),
}))
