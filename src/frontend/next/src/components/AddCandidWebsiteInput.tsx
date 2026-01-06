import InputWithSelect from "./InputWithSelect";
import { useAddCandidStore } from "@/stores/useAddCandid";
import { useShallow } from "zustand/shallow";

import { getWebsiteCompletion } from "@/lib/api";
import { Website } from "@/types";

import { formatBasicTypeEntity } from "@/lib";

export default function AddCandidWebsiteInput() {
  const website = useAddCandidStore(useShallow((state) => state.website));
  const websiteCompletionList = useAddCandidStore(
    useShallow((state) => state.websiteCompletionList),
  );

  const updateWebsiteCompletionList = useAddCandidStore(
    useShallow((state) => state.updateWebsiteCompletionList),
  );
  const updateWebsite = useAddCandidStore(
    useShallow((state) => state.updateWebsite),
  );

  return (
    <InputWithSelect
      id="website"
      placeholder="Website"
      value={website.name}
      completionList={websiteCompletionList}
      updateValue={updateWebsite}
      updateCompletionList={updateWebsiteCompletionList}
      getCompletion={getWebsiteCompletion}
      formatItem={formatBasicTypeEntity}
    />
  );
}
