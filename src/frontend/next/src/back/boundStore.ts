import { create, createStore } from "zustand";
import { CandidsState, createCandidsSlice } from "./candidSlice";

import { type CandidsStore } from "./candidSlice";
export type BoundStore = CandidsStore
export const createBoundStore = create<CandidsStore>()((...args) => ({
  ...createCandidsSlice(...args),
}));

export const createBoundStore = (
  initCandidState: CandidsState
) => {
  return createStore<BoundStore>(
    ...createCandidsSlice(initCandidState)
  )
}

