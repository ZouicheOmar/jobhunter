import { useAddCandidStore } from "@/stores/use-add-candid/useAddCandid";
import { useShallow } from "zustand/shallow";
import { Button } from "../schadcn/Button";
import { InputLabel } from "../ui-elements";

export const AddCandidUrlInput = () => {
  const url = useAddCandidStore(useShallow((state) => state.url));
  const updateUrl = useAddCandidStore((state) => state.updateUrl);
  const lookupUrl = useAddCandidStore((state) => state.lookupUrl);

  return (
    <div>
      <InputLabel label="url" />

      <div className="flex">
        <input
          id="url"
          type="text"
          placeholder="url to the job offering page"
          className="inline-block p-1 px-2 block bg-neutral-200 rounded mr-2 grow"
          onChange={(e) => updateUrl(e.target.value)}
          value={url}
        />
        <button
          className="float-right rounded px-2
          inline-block
          bg-neutral-900
          text-white leading-none 
          font-medium
          focus-visible:border-ring 
          focus-visible:ring-teal-400
          focus-visible:ring-[4px]"
          onClick={() => lookupUrl()}
        >
          look up offer
        </button>
      </div>
    </div>
  );
};
