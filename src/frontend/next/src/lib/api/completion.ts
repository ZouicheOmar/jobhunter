import { City, Tech, Website, Company } from "@/types";
import { ROUTES } from "../consts";
import { GetCompletionListFn } from "../types";

export const getWebsiteCompletion: GetCompletionListFn<Website> = async (v) => {
  try {
    const req = await fetch(ROUTES.API.COMPLETION.WEBSITE(v));
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
};

export const getCompanyCompletion: GetCompletionListFn<Company> = async (v) => {
  try {
    const req = await fetch(ROUTES.API.COMPLETION.COMPANY(v));
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
};

export const getTechCompletion: GetCompletionListFn<Tech> = async (v) => {
  try {
    const req = await fetch(ROUTES.API.COMPLETION.TECH(v));
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
};

export const getCityCompletion: GetCompletionListFn<City> = async (v) => {
  try {
    const req = await fetch(ROUTES.API.COMPLETION.CITY(v));
    const json = await req.json();
    return json;
  } catch (e) {
    throw e;
  }
};
