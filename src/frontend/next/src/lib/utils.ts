import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTodayDate() {
  const d = new Date();
  // return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
}
