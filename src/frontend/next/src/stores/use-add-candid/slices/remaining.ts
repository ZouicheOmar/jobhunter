import { CandidCreate } from "@/types";
import { StateCreator } from "zustand";
import { AddCandidStore, RemainingSlice } from "../types";
import { formatDate } from "@/lib/utils";
import { postCandid } from "@/lib";

export const remainingSlice: StateCreator<
  AddCandidStore,
  [],
  [],
  RemainingSlice
> = (set, get, store) => ({
  techOffer: true,
  unsolicited: false,
  answer: false,
  dateApply: formatDate(new Date()),

  updateTechOffer: (value: boolean) => set({ techOffer: value }),
  updateUnsolicited: (value: boolean) => set({ unsolicited: value }),
  updateAnswer: (value: boolean) => set({ answer: value }),
  updateDateApply: (date: string) => set({ dateApply: date }),

  postCandid: async () => {
    const payload: CandidCreate = {
      url: get().url,
      title: get().title,
      unsolicited: get().unsolicited,
      techOffer: get().techOffer,
      dateApply: new Date(get().dateApply).toISOString(),
      answer: false,
      company: get().company,
      city: get().city,
      website: get().website,
      contract: get().contract,
      stack: get().stack,
    };

    console.log("PAYLOAD ", payload);

    try {
      const candid = await postCandid(payload);
      set(store.getInitialState());
      return candid;
    } catch (e) {
      throw new Error("useAddCandid: error posting candid");
    }
  },
});
