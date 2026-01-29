import { scrapUrl, extractFromDesc, getTechsFromScrapper } from "@/lib";
import { fetchExistingData } from "@/lib/api/fetch";
import { filterFoundStack } from "@/lib/utils/misc";
import { StateCreator } from "zustand";
import { AddCandidStore, UrlSlice } from "../types";

export const urlSlice: StateCreator<AddCandidStore, [], [], UrlSlice> = (
  set,
  get
) => ({
  url: "",
  updateUrl: (v: string) => set(() => ({ url: v })),

  lookupUrl: async () => {
    try {
      set({
        scrapPending: true,
      });

      const url = get().url;

      const { description, ...scrappedData } = await scrapUrl(url);

      set({
        scrapPending: false,
        checkExistingDataPending: true,
      });

      const existingData = await fetchExistingData(url, scrappedData);

      set({
        title: existingData.title,
        company: existingData.company,
        ...(existingData.city && { city: existingData.city }),
        ...(existingData.website && { website: existingData.website }),
        ...(existingData.contract && { contract: existingData.contract }),

        scrapPending: false,
      });

      const { data: stack } = await extractFromDesc({ text: description });
      const foundStack = await getTechsFromScrapper(stack);
      const actualStack = filterFoundStack(stack, foundStack);

      set({
        stack: actualStack,

        llmExtractPending: false,
      });
    } catch (e) {
      set({ scrapError: true, llmExtractError: true });
    }
  },
});
