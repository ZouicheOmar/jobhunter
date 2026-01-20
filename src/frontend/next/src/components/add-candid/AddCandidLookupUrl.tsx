import { useAddCandidStore } from "@/stores/use-add-candid/useAddCandid";
import { useShallow } from "zustand/shallow";

import { Button } from "../schadcn/Button";

export default function AddCandidLookupUrl() {
  const url = useAddCandidStore(useShallow((state) => state.url));
  const updateUrl = useAddCandidStore((state) => state.updateUrl);
  const lookupUrl = useAddCandidStore((state) => state.lookupUrl);

  return (
    <>
      <input
        id="url"
        type="text"
        placeholder="url of the offer"
        className="w-full p-1 px-2 block bg-gray-100 rounded"
        onChange={(e) => updateUrl(e.target.value)}
        value={url}
      />
      <Button onClick={() => lookupUrl()}>look up offer</Button>
    </>
  );
}
