import { formatBasicEntity } from "@/lib/utils";
import { InputWithSelectCompletionListItemProps } from "./types";

export const InputWithSelectCompletionListItem = ({
  item,
  cb,
}: InputWithSelectCompletionListItemProps) => (
  <span
    onClick={() => cb(item)}
    className="m-0 px-2 border
    rounded w-full md:w-[49%] min-h-[2em] h-[2em]
    leading-[2em] inline-block cursor-pointer break-all"
  >
    {formatBasicEntity(item)}
  </span>
);
