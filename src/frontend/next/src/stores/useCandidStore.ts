import { create } from "zustand";

import { fetchAllCandids, postCandid } from "@/lib/api";
import { Candid } from "@/types";
import { StateCreator } from "zustand";

interface CandidListStateSlice {
  pending: boolean;
  error: boolean;
  setPending: (v: boolean) => void;
  setError: (v: boolean) => void;
}

interface CandidListSlice {
  candids: Candid[];
  addCandid: (v: Candid) => void;
  getCandids: () => void;
}

type CandidStore = CandidListSlice & CandidListStateSlice;

const candidListStateSlice: StateCreator<
  CandidStore,
  [],
  [],
  CandidListStateSlice
> = (set) => ({
  pending: false,
  error: false,
  setPending: (v: boolean) => set({ pending: v }),
  setError: (v: boolean) => set({ error: v }),
});

const candidListSlice: StateCreator<CandidStore, [], [], CandidListSlice> = (
  set,
  get,
) => ({
  candids: [],
  addCandid: (v) => set({ candids: [...get().candids, v] }),
  getCandids: async () => {
    try {
      const candids = await fetchAllCandids();
      set({ candids: candids.reverse() });
    } catch (e) {
      throw new Error("Problem fetching candids or cities or techs");
    }
  },
});

export const useCandidStore = create<CandidStore>((...a) => ({
  ...candidListStateSlice(...a),
  ...candidListSlice(...a),
}));
