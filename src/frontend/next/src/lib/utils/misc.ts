import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Candid, CandidCreate, Tech, TechCreate } from '@/types';
import { CONTRACT_TYPES } from '../consts';

export const getEmptyCandid: () => Candid = () => ({
  id: 113,
  title: 'Développeur fullstack',
  url: 'http://www.wttj.com/12345AZE',
  unsolicited: true,
  techOffer: true,
  dateApply: '2026-01-10',
  answer: false,
  company: { id: 1, name: 'capgemini' },
  city: { id: 5, name: 'toulouse' },
  website: { id: 1, name: 'indeed' },
  contract: { id: 1, type: CONTRACT_TYPES[CONTRACT_TYPES.length - 1], duration: 0 },
  stack: [
    { id: 1, name: 'typescript' },
    { id: 1, name: 'react' },
    { id: 1, name: 'java' },
  ],
});

export function getHostname(url: string): string | null {
  let parsed = URL.parse(url);
  if (parsed?.host) {
    let v = parsed.host.split('.');
    return v.length == 3 ? v[1] : v[0];
  }
  return null;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isNameInstack: (name: string, stack: Tech[]) => number = (name, stack) => {
  let i = -1;
  stack.forEach((tech, index) => {
    if (tech.name == name) i = index;
    return;
  });
  return i;
};

export const filterFoundStack: (formStack: string[], extractedStack: Tech[]) => TechCreate[] = (
  formStack,
  extractedStack
) => {
  const resultStack: TechCreate[] = [];

  formStack.forEach((techName) => {
    let index = isNameInstack(techName, extractedStack);
    if (index != -1) resultStack.push(extractedStack[index]);
    else resultStack.push({ name: techName, id: null });
  });

  return resultStack;
};

export const indexInList = (item: Tech | TechCreate, list: Tech[] | TechCreate[]) => {
  for (let i = 0; i < list.length; i++) if (item.name == list[i].name) return i;
  return -1;
};
