import { GetCompletionListFn } from "@/lib/types";
import {
  BasicEntity,
  BasicEntityList,
  BasicEntityFormat,
  City,
  Company,
  Website,
} from "@/types";
import { ChangeEventHandler, RefObject } from "react";

export type UpdateValueFn<T> = (v: T) => void;
export type UpdateCompletionListFn<T> = (v: T[]) => void;

export type UseInputWithSelectProps = (
  value: string,
  updateValue: UpdateValueFn<BasicEntity>,
  updateCompletionList: UpdateCompletionListFn<BasicEntityList>,
  getCompletion: (v: string) => Promise<BasicEntityList>
) => {
  loading: boolean;
  error: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  handleChange: ChangeEventHandler;
  handleSpanClick: ChangeEventHandler;
};

export interface InputWithSelectProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  completionList: BasicEntity[];
  updateValue: UpdateValueFn<BasicEntity>;
  updateCompletionList: UpdateCompletionListFn<BasicEntityList>;
  getCompletion: GetCompletionListFn<BasicEntity>;
}

export interface InputWithSelectCompletionListProps {
  list: BasicEntityList;
  cb: (v: BasicEntity) => void;
}

export interface InputWithSelectCompletionListItemProps {
  item: BasicEntity;
  cb: (v: BasicEntity) => void;
}
