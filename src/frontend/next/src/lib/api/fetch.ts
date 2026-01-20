import {
  HiringOrganization,
  Place,
  DataFromScrap,
  City,
  Company,
  Website,
} from "@/types";
import { getHostname } from "../utils/misc";
import { getCity } from "./city";
import { getOrCreateCompanyByName } from "./company";
import { getOrCreateWebsiteByName } from "./website";

export const fetchExistingData = async (
  url: string,
  scrappedData: {
    title: string;
    employmentType: string;
    hiringOrganization: HiringOrganization;
    jobLocation: Place | Place[];
  }
) => {
  const { title, hiringOrganization, jobLocation, employmentType } =
    scrappedData;

  const hostname = getHostname(url);

  let result: DataFromScrap = {
    title: title,
    contract: { type: employmentType, duration: 0 },
  };

  let city: City | null;
  if (Array.isArray(jobLocation)) {
    city = await getCity(
      jobLocation[0].address.addressLocality,
      jobLocation[0].address.postalCode
    );
  } else {
    city = await getCity(
      jobLocation.address.addressLocality,
      jobLocation.address.postalCode
    );
  }
  if (city) result.city = city;

  const cp: Company = await getOrCreateCompanyByName(hiringOrganization.name);
  if (cp) result.company = cp;

  let website: Website | null = hostname
    ? await getOrCreateWebsiteByName(hostname)
    : null;
  if (website) result.website = website;

  return result;
};
