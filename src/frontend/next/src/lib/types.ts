import { BasicEntityList } from "@/types";

export type GetCompletionListFn<T> = (v: string) => Promise<T[]>;
