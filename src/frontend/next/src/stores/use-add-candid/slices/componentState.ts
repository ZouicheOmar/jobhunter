import { StateCreator } from "zustand";
import { AddCandidStore, ComponentStateSlice } from "../types";

export const componentStateSlice: StateCreator<
  AddCandidStore,
  [],
  [],
  ComponentStateSlice
> = (set, get, store) => ({
  scrapPending: false,
  llmExtractPending: false,
  scrapError: false,
  checkExistingDataPending: false,
  llmExtractError: false,
  error: false,
  checkExistingDataError: false,
  reset: () => set({ ...store.getInitialState() }),
});
