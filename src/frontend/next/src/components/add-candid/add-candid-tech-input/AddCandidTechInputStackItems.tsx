import { useAddCandidStore } from "@/stores/use-add-candid/useAddCandid";
import { AddCandidTechInputItem } from "./AddCandidTechInputItem";
import { Tech } from "@/types";

export const AddCandidInputStackItems = () => {
  const list = useAddCandidStore((state) => state.stack);
  if (!list.length) return null;

  return (
    <div>
      {list.map((item, key) => (
        <AddCandidTechInputItem key={key} item={item as Tech} />
      ))}
    </div>
  );
};
