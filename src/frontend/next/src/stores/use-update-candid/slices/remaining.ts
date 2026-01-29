import { CandidCreate, CandidUpdateRestricted } from '@/types';
import { StateCreator } from 'zustand';
import { UpdateCandidStore, RemainingSlice } from '../types';
import { formatDate } from '@/lib/utils';
import { UpdateCandid } from '@/components/update-candid';
import { udpateCandid } from '@/lib';

export const remainingSlice: StateCreator<UpdateCandidStore, [], [], RemainingSlice> = (set, get, store) => ({
  techOffer: true,
  unsolicited: false,
  answer: false,
  dateApply: formatDate(new Date()),

  updateTechOffer: (value: boolean) => set({ techOffer: value }),
  updateUnsolicited: (value: boolean) => set({ unsolicited: value }),
  updateAnswer: (value: boolean) => set({ answer: value }),
  updateDateApply: (date: string) => set({ dateApply: date }),

  updateCandid: async (id) => {
    const payload: CandidUpdateRestricted = {
      id: id,
      ...(get().url && { url: get().url }),
      ...(get().title && { title: get().title }),
      ...(get().unsolicited && { unsolicited: get().unsolicited }),
      ...(get().techOffer && { techOffer: get().techOffer }),
      ...(get().answer && { answer: get().answer }),
    };

    console.log(payload);

    try {
      const candid = await udpateCandid(payload);
      set(store.getInitialState());
      console.log(candid);
    } catch (e) {
      throw new Error('useAddCandid: error posting candid');
    }
  },
});
