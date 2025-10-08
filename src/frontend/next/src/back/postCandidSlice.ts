import { createStore } from "zustand";

import type { Candid } from "@/types/CandidType";

export type PostCandidState = {
  url: string;
  company: string;
  title: string;
  position: string;
  city: string;
}

export type PostCandidActions = {
  update: (data: string) => void
}

export type PostCandidStore = PostCandidState & PostCandidActions;

export const defaultInitialState: PostCandidState = {
  url: "",
  company: "",
  title: "",
  position: "",
  city: "",
};

export const createCandidsSlice = (
  initState: PostCandidState = defaultInitialState,
) => {

  return createStore<PostCandidStore>((set) => ({
    ...initState,
    update: (data) => set((state) => state.url = data),
  }))

}
