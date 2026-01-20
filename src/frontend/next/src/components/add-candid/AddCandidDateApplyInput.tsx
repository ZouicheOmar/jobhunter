import { useShallow } from "zustand/shallow";
import { useAddCandidStore } from "@/stores/use-add-candid/useAddCandid";
import { InputLabel } from "../ui-elements";

export const AddCandidDateApplyInput = () => {
  const dateApply = useAddCandidStore(useShallow((state) => state.dateApply));
  const updateDateApply = useAddCandidStore((state) => state.updateDateApply);

  return (
    <div className="rounded">
      <InputLabel label="Application Date" />
      <input
        id="dateApply"
        type="date"
        value={dateApply}
        onChange={(e) => updateDateApply(e.target.value)}
        className="rounded bg-neutral-200 py-1 px-3 w-1/3"
      />
    </div>
  );
};
