import { StateCreator } from "zustand";
import { AddCandidStore, TechSlice } from "../types";
import { Tech } from "@/types";
import { indexInList } from "@/lib/utils/misc";

export const techSlice: StateCreator<AddCandidStore, [], [], TechSlice> = (
  set,
  get
) => ({
  tech: { name: "", id: null },
  stack: [],
  techCompletionList: [],
  alreadyInStackError: false,

  updateTech: (v) => set({ tech: v }),

  setStack: (v) => {
    const stack = get().stack;
    set({ stack: [...stack, ...v] });
  },

  updateStack: () => {
    const stack = get().stack;
    const tech = get().tech;
    let isInStack = indexInList(tech, stack);
    if (isInStack != -1) return set({ alreadyInStackError: true }); // handle error in here;

    const list = get().techCompletionList;
    let index = indexInList(tech, list);

    set({
      stack: [...stack, index == -1 ? tech : list[index]],
      techCompletionList: [],
      tech: { name: "", id: null },
    });
  },

  updateAlreadyInStackError: (v = false) => set({ alreadyInStackError: v }),

  updateStackFromSuggestionList: (tech: Tech) => {
    const stack = get().stack;
    let isIn = indexInList(tech, stack) != -1;
    return isIn
      ? set({ alreadyInStackError: true })
      : set({
          tech: { name: "", id: null },
          stack: [...stack, tech],
          techCompletionList: [],
        });
  },

  removeStackItem: (v) => {
    let index = -1;

    for (const item of get().stack) {
      index += 1;
      if (item.id == v.id) break;
    }

    if (index == -1) return;
    set({ stack: get().stack.toSpliced(index, 1) });
  },

  updateTechCompletionList: (v) => set({ techCompletionList: v }),

  resetTechCompletionList: () => set({ techCompletionList: [] }),
});
