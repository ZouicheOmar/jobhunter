import { City } from './City';
import { Tech } from './Tech';
import { Website } from './Website';
import { Company } from './Company';
import { Candid } from './Candid';

export type BasicEntity = Candid | City | Website | Company | Tech;
export type BasicEntityList<T> = T[];
export type BasicEntityListFixed = Candid[] | City[] | Website[] | Company[] | Tech[];

export type BasicEntityFormat = (e: BasicEntity) => string | null;
