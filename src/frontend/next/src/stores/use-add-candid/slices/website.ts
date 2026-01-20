import { StateCreator } from "zustand";
import { AddCandidStore, WebsiteSlice } from "../types";

export const websiteSlice: StateCreator<
  AddCandidStore,
  [],
  [],
  WebsiteSlice
> = (set) => ({
  // TODO verifier que le state s'appelle websiteName partout..
  website: { name: "", id: null },
  websiteCompletionList: [],
  updateWebsite: (v) => set({ website: v }),
  updateWebsiteCompletionList: (v) => set({ websiteCompletionList: v }),
});
