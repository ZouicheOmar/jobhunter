import { City } from "./City";
import { Tech, TechCreate } from "./Tech";
import { Website } from "./Website";
import { Company } from "./Company";

export type BasicTypeEntity = City | Tech | Website | Company | TechCreate;
export type BasicTypeEntityList = BasicTypeEntity[];
export type BasicTypeEntityFormat = (e: BasicTypeEntity) => string | null;
