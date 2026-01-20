import { CONTRACT_TYPES } from "@/lib";
import { StateCreator } from "zustand";
import { AddCandidStore, ContractSlice } from "../types";

export const contractSlice: StateCreator<
  AddCandidStore,
  [],
  [],
  ContractSlice
> = (set) => ({
  contract: { type: CONTRACT_TYPES[CONTRACT_TYPES.length - 1], duration: 0 },
  updateContract: (v) =>
    set({ contract: { type: v.type, duration: v.duration || 0 } }),
});
