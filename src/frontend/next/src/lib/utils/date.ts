import { formatTwoDigits } from "../utils";

export const daysAgo = (datestr: string) => {
  const date = new Date(datestr);
  const today = new Date();
  const days = Math.floor((today - date) / (1000 * 60 * 60 * 24));
  return days == 0 ? "today" : `${days} ${days > 1 ? "days" : "day"}`;
};

export function getTodayDate() {
  const d = new Date();
  let date = d.getDate().toString();
  date = date.length == 1 ? (date = "0" + date) : date;
  return d.getFullYear() + "-" + d.getMonth() + "-" + date;
}

export const formatDate = (d: Date) =>
  d.getFullYear().toString() +
  "-" +
  formatTwoDigits((d.getMonth() + 1).toString()) +
  "-" +
  formatTwoDigits(d.getDate().toString());

export const dateApplyValueAdapter = (date: Date) => date.toString();
