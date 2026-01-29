import { UpdateCandidStore } from './types';

import { componentStateSlice, remainingSlice, titleSlice, urlSlice } from './slices';
import { create } from 'zustand';

export const useUpdateCandidStore = create<UpdateCandidStore>((...a) => ({
  ...urlSlice(...a),
  ...componentStateSlice(...a),
  ...titleSlice(...a),
  ...remainingSlice(...a),
}));
