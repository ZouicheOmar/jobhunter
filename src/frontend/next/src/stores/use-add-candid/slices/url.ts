import { scrapUrl, extractFromDesc, getTechsFromScrapper } from '@/lib';
import { filterFoundStack, getHostname } from '@/lib/utils/misc';
import { StateCreator } from 'zustand';
import { AddCandidStore, UrlSlice } from '../types';
import { postCandidResolveData, PostCandidResolveDataArg } from '@/actions';

export const urlSlice: StateCreator<AddCandidStore, [], [], UrlSlice> = (set, get) => ({
  url: '',
  updateUrl: (v: string) => set(() => ({ url: v })),

  lookupUrl: async () => {
    try {
      set({ scrapPending: true });

      const jobOfferUrl = get().url;
      const { description, ...scrappedData } = await scrapUrl(jobOfferUrl);

      set({
        scrapPending: false,
        checkExistingDataPending: true,
      });

      const postCandidData: PostCandidResolveDataArg = {
        applicationHostname: getHostname(jobOfferUrl),
        scrapped: scrappedData,
      };

      const resolvedData = await postCandidResolveData(postCandidData);
      console.log('====================RESOLVED DATA====================');
      console.log(resolvedData);

      set({
        title: resolvedData.title,
        company: resolvedData.company,
        ...(resolvedData.city && { city: resolvedData.city }),
        ...(resolvedData.website && { website: resolvedData.website }),
        ...(resolvedData.contract && {
          contract: {
            type: resolvedData.contract.contractType,
            duration: resolvedData.contract.duration,
          },
        }),

        llmExtractPending: true,
        checkExistingDataPending: false,
      });

      const { data: stack } = await extractFromDesc({ text: description });
      const foundStack = await getTechsFromScrapper(stack);
      const actualStack = filterFoundStack(stack, foundStack);

      set({
        stack: actualStack,
        llmExtractPending: false,
      });
    } catch (e) {
      set({
        scrapPending: false,
        checkExistingDataPending: false,
        llmExtractPending: false,

        scrapError: true,
        llmExtractError: true,
        checkExistingDataError: true,
      });
    }
  },
});
