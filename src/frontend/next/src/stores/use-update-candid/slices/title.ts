import { StateCreator } from "zustand";
import { AddCandidStore, TitleSlice } from "../types";

export const titleSlice: StateCreator<AddCandidStore, [], [], TitleSlice> = (
  set
) => ({
  title: "",
  updateTitle: (v: string) => set({ title: v }),
});
