import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BasicTypeEntityFormat, CandidCreate, Company } from "@/types";
import { CONTRACT_TYPES } from "./consts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHostname(url: string): string | null {
  let parsed = URL.parse(url);
  if (parsed?.host) {
    let v = parsed.host.split(".");
    return v.length == 3 ? v[1] : v[0];
  }
  return null;
}

export function getTodayDate() {
  const d = new Date();
  let date = d.getDate().toString();
  date = date.length == 1 ? (date = "0" + date) : date;
  return d.getFullYear() + "-" + d.getMonth() + "-" + date;
}

export const formatTwoDigits = (s: string) => (s.length == 1 ? "0" + s : s);
export const formatDate = (d: Date) =>
  d.getFullYear().toString() +
  "-" +
  formatTwoDigits((d.getMonth() + 1).toString()) +
  "-" +
  formatTwoDigits(d.getDate().toString());

export const formatCompanyCompletion = (company: Company) => company.name;

export const dateApplyValueAdapter = (date: Date) => date.toString();

export const formatBasicTypeEntity: BasicTypeEntityFormat = (e) => e.name;
const fb = formatBasicTypeEntity;

const getEmptyCandid: () => CandidCreate = () => ({
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
