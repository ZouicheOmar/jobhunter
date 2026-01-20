import { Company, BasicEntityFormat } from "@/types";

export const formatTwoDigits = (s: string) => (s.length == 1 ? "0" + s : s);
export const formatCompanyCompletion = (company: Company) => company.name;
export const formatBasicEntity: BasicEntityFormat = (e) => e.name;
