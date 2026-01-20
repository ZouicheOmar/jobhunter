import { StateCreator } from "zustand";
import { AddCandidStore, CitySlice } from "../types";

export const citySlice: StateCreator<AddCandidStore, [], [], CitySlice> = (
  set
) => ({
  city: { name: "", id: -1 }, // should not be -1
  cityCompletionList: [],
  updateCity: (v) => set({ city: v }),
  updateCityCompletionList: (v) => set({ cityCompletionList: v }),
});
