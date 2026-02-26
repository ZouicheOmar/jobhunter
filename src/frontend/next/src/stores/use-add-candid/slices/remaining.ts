import { CandidCreate } from '@/types';
import { StateCreator } from 'zustand';
import { AddCandidStore, RemainingSlice } from '../types';
import { formatDate } from '@/lib/utils';
import { postCandid } from '@/actions';

export const remainingSlice: StateCreator<AddCandidStore, [], [], RemainingSlice> = (set, get, store) => ({
  techOffer: true,
  unsolicited: false,
  answer: false,
  dateApply: formatDate(new Date()),

  updateTechOffer: (value: boolean) => set({ techOffer: value }),
  updateUnsolicited: (value: boolean) => set({ unsolicited: value }),
  updateAnswer: (value: boolean) => set({ answer: value }),
  updateDateApply: (date: string) => set({ dateApply: date }),

  postCandid: async () => {
    let stack = get().stack.map((item) => {
      if (item.id) return { id: item.id };
      return { name: item.name };
    });

    const payload: CandidCreate = {
      url: get().url,
      title: get().title,
      unsolicited: get().unsolicited,
      techOffer: get().techOffer,
      answer: false,
      dateApply: new Date(get().dateApply).toISOString(),
      cityId: get().city.id,
      website: get().website,
      company: get().company,
      contract: get().contract,
      stack: stack,
    };

    try {
      console.log('payload', payload);
      const candid = await postCandid(payload);
      set(store.getInitialState());
      return candid;
    } catch (e) {
      console.log('error', e);
      throw new Error('useAddCandid: error posting candid');
    }
  },
});
