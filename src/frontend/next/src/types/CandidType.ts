export type CityDto = {
  name: string;
}
export type WebsiteDto = {
  name: string;
}
export type TechDto = {
  name: string;
}

export type CandidType = {
  addDate: string;
  answer: boolean;
  cityDto: CityDto;
  company: string;
  id: number;
  stack: TechDto[];
  title: string;
  unsolicited: boolean;
  url: string;
  websiteDto: WebsiteDto;
};

export type CandidTypeSimple = {
  id: number;
  position: string;
  city: string;
};
