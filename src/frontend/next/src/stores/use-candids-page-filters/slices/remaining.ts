import { CandidUpdateRestricted } from '@/types';
import { StateCreator } from 'zustand';
import { UpdateCandidStore, RemainingSlice } from '../types';
import { formatDate } from '@/lib/utils';
import { udpateCandid } from '@/lib';

export const remainingSlice: StateCreator<UpdateCandidStore, [], [], RemainingSlice> = (set, get, store) => ({
  techOffer: true,
  unsolicited: false,
  answer: false,
  rejected: false,
  dateApply: formatDate(new Date()),

  updateTechOffer: (value: boolean) => set({ techOffer: value }),
  updateUnsolicited: (value: boolean) => set({ unsolicited: value }),
  updateAnswer: (value: boolean) => set({ answer: value }),
  updateRejected: (value: boolean) => set({ rejected: value }),
  updateDateApply: (date: string) => set({ dateApply: date }),

  updateCandid: async (id) => {
    const payload: CandidUpdateRestricted = {
      id: id,
      ...(get().title && { title: get().title }),
      ...(get().url && { url: get().url }),

      unsolicited: get().unsolicited,
      techOffer: get().techOffer,
      answer: get().answer,
      rejected: get().rejected,
    };

    console.log('PAYLAOD', payload);

    try {
      const candid = await udpateCandid(payload);
      set(store.getInitialState());
      console.log(candid);
    } catch (e) {
      throw new Error('useAddCandid: error posting candid');
    }
  },
});
