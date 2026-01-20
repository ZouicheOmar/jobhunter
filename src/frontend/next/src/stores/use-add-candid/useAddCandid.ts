import { AddCandidStore } from "./types";

import {
  citySlice,
  companyNameSlice,
  componentStateSlice,
  contractSlice,
  remainingSlice,
  techSlice,
  titleSlice,
  urlSlice,
  websiteSlice,
} from "./slices";
import { create } from "zustand";

export const useAddCandidStore = create<AddCandidStore>((...a) => ({
  ...componentStateSlice(...a),
  ...urlSlice(...a),
  ...titleSlice(...a),
  ...citySlice(...a),
  ...companyNameSlice(...a),
  ...websiteSlice(...a),
  ...techSlice(...a),
  ...contractSlice(...a),
  ...remainingSlice(...a),
}));
