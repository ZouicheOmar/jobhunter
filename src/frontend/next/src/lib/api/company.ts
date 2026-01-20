import { CompanyPage, Company } from "@/types";
import { ROUTES } from "../consts";

export async function getCompanyPage(
  page: number,
  orderByDateApply: boolean = true
): Promise<CompanyPage | null> {
  const req = await fetch(ROUTES.API.COMPANY.PAGE(page, orderByDateApply));
  if (req.status >= 400) return null;

  const json = await req.json();
  return json;
}

export const getCompanyById = async (id: number): Promise<Company | null> => {
  const req = await fetch(ROUTES.API.COMPANY.BY_ID(id));
  if (req.status >= 400) return null;
  const json = await req.json();
  return json;
};

export const getOrCreateCompanyByName = async (
  name: string
): Promise<Company> => {
  try {
    const req = await fetch(ROUTES.API.WEBSITE.BY_NAME(name));
    const json = await req.json();
    return json;
  } catch (e) {
    throw Error("error fetching Website");
  }
};
