export type HiringOrganization = {
  name: string;
};
export type PostalAddress = {
  addressCountry?: string;
  addressLocality?: string;
  addressRegion?: string;
  streetAddress?: string;
  postalCode?: string;
};

export type Place = {
  address: PostalAddress;
};

export type ScrapApiRespone = {
  title: string;
  employmentType: string;
  hiringOrganization: HiringOrganization;
  jobLocation: Place | Place[];
  description: string;
};
