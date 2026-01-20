import { City } from "./City";
import { Tech } from "./Tech";
import { Website } from "./Website";
import { Company } from "./Company";

export type BasicEntity = City | Website | Company | Tech;
export type BasicEntityList = BasicEntity[];
export type BasicEntityFormat = (e: BasicEntity) => string | null;
