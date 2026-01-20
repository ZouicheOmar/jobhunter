import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { CandidCreate, Tech, TechCreate } from "@/types";
import { CONTRACT_TYPES } from "../consts";

export const getEmptyCandid: () => CandidCreate = () => ({
  title: "",
  url: "",
  unsolicited: false,
  techOffer: false,
  dateApply: "",
  answer: false,
  company: { id: -1, name: "" },
  city: { id: -1, name: "" },
  website: { id: -1, name: "" },
  contract: { type: CONTRACT_TYPES[CONTRACT_TYPES.length - 1], duration: 0 },
  stack: [{ id: -1, name: "" }],
});

export function getHostname(url: string): string | null {
  let parsed = URL.parse(url);
  if (parsed?.host) {
    let v = parsed.host.split(".");
    return v.length == 3 ? v[1] : v[0];
  }
  return null;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isNameInstack: (name: string, stack: Tech[]) => number = (
  name,
  stack
) => {
  let i = -1;
  stack.forEach((tech, index) => {
    if (tech.name == name) i = index;
    return;
  });
  return i;
};

export const filterFoundStack: (
  formStack: string[],
  extractedStack: Tech[]
) => TechCreate[] = (formStack, extractedStack) => {
  const resultStack: TechCreate[] = [];

  formStack.forEach((techName) => {
    let index = isNameInstack(techName, extractedStack);
    if (index != -1) resultStack.push(extractedStack[index]);
    else resultStack.push({ name: techName, id: null });
  });

  return resultStack;
};

export const indexInList = (
  item: Tech | TechCreate,
  list: Tech[] | TechCreate[]
) => {
  for (let i = 0; i < list.length; i++) if (item.name == list[i].name) return i;
  return -1;
};
