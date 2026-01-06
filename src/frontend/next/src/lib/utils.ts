import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CONTRACT_TYPE_ENG, CONTRACT_TYPE_FR } from "./enums";
import { BasicTypeEntityFormat, Company } from "@/types";

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
