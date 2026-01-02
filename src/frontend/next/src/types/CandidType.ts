export type City = {
  name: string;
}
export type WebsiteDto = {
  name: string;
}
export type TechDto = {
  name: string;
}

export type Candid = {
  addDate: string;
  answer: boolean;
  cityDto: City;
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
