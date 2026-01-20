import { InputWithSelectCompletionListItem } from "./InputWithSelectCompletionListItem";
import { InputWithSelectCompletionListProps } from "./types";

export const InputWithSelecCompletionList = ({
  list,
  cb,
}: InputWithSelectCompletionListProps) => (
  <div
    className="h-fit min-h-[4.5em]
    flex flex-wrap gap-x-1
    gap-y-1 md:gap-y-0"
  >
    {list.map((i, k) => (
      <InputWithSelectCompletionListItem key={k} item={i} cb={cb} />
    ))}
  </div>
);
