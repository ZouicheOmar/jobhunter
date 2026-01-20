import { Tech, TechCreate } from "@/types";
import { useAddCandidStore } from "@/stores/use-add-candid/useAddCandid";
import { formatBasicEntity as fb } from "@/lib/utils";

const cn = {
  base: " border rounded mr-2 mb-1 px-1 select-none inline-block align-text-bottom break-all",
  exists: (id: number) =>
    id
      ? "bg-green-100 text-green-700 border-green-800/20"
      : "bg-yellow-300/80 text-yellow-900 border-yellow-800/20",
};

export type ItemProps = {
  completion?: boolean;
  item: Tech;
};

export const CompletionItem = ({ item }: ItemProps) => {
  const cb = useAddCandidStore((state) => state.updateStackFromSuggestionList);

  return (
    <div
      className="border rounded mr-1 px-1 select-none inline-block
      align-text-bottom break-all text-blue-800 px-2 hover:cursor-pointer
      hover:bg-blue-100 hover:border-blue-300 hover:shadow transition-colors
      transition-shadow"
      onClick={() => {
        cb(item);
      }}
    >
      <span className={`capitalize`}>{fb(item)}</span>
    </div>
  );
};

const StackItem = ({ item }: ItemProps) => {
  const cb = useAddCandidStore((state) => state.removeStackItem);
  return (
    <div className={`${cn.base} ${cn.exists(item.id)}`}>
      <span className="capitalize mr-1">{fb(item as Tech)}</span>
      {item.id ? <span className=" text-green-500">{`\u2714`}</span> : <></>}
      <button
        className="text-red-300 ml-3 hover:text-red-500 hover:cursor-pointer"
        onClick={() => cb(item)}
      >
        {`\u{2715}`}
      </button>
    </div>
  );
};

export const AddCandidTechInputItem = ({ item, completion }: ItemProps) => {
  if (completion) return <CompletionItem item={item} />;
  return <StackItem item={item} />;
};
