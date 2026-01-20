import { StateCreator } from "zustand";
import { AddCandidStore, CompanySlice } from "../types";

export const companyNameSlice: StateCreator<
  AddCandidStore,
  [],
  [],
  CompanySlice
> = (set) => ({
  company: { name: "", id: null },
  companyCompletionList: [],
  // updateCompany: (v) => set({ company: v }),
  updateCompany: (v) => set({ company: v }),
  updateCompanyCompletionList: (v) => set({ companyCompletionList: v }),
});
