import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getHostname(url) {
  const parsed = URL.parse(url).host.split('.');
  if (parsed.length == 3)
    return parsed[1]
  else
    return parsed[0]
}

export function getTodayDate() {
  const d = new Date();
  let date = d.getDate().toString();
  date = date.length == 1 ? date = "0" + date : date;
  return d.getFullYear() + "-" + d.getMonth() + "-" + date;
}
