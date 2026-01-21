import { formatBasicEntity } from "@/lib/utils";
import { InputWithSelectCompletionListItemProps } from "./types";

export const InputWithSelectCompletionListItem = ({
  item,
  cb,
}: InputWithSelectCompletionListItemProps) => (
  <span
    onClick={() => cb(item)}
    className="mr-1 my-1 px-2 border
    rounded leading-[2em] inline-block 
    cursor-pointer break-all
    hover:bg-blue-100
    hover:text-blue-900
    hover:border-blue-300
    hover:shadow-sm
    transition-colors
    transition-shadow
    capitalize
    "
  >
    {formatBasicEntity(item)}
  </span>
);
