import { useAddCandidStore } from "@/stores/use-add-candid/useAddCandid";
import { AddCandidTechInputItem } from "./AddCandidTechInputItem";

export const AddCandidTechInputCompletionList = () => {
  const list = useAddCandidStore((state) => state.techCompletionList);
  if (!list.length) return null;

  return (
    <div className="mb-1">
      {list.map((i, k) => (
        <AddCandidTechInputItem key={k} item={i} completion />
      ))}
    </div>
  );
};
