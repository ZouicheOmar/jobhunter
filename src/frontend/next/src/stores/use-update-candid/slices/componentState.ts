import { StateCreator } from 'zustand';
import { UpdateCandidStore, ComponentStateSlice } from '../types';

export const componentStateSlice: StateCreator<UpdateCandidStore, [], [], ComponentStateSlice> = (set, get, store) => ({
  scrapPending: false,
  llmExtractPending: false,
  scrapError: false,
  checkExistingDataPending: false,
  llmExtractError: false,
  error: false,
  checkExistingDataError: false,
  reset: () => set({ ...store.getInitialState() }),
});
