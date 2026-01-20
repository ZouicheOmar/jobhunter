import { useAddCandidStore } from "@/stores/use-add-candid/useAddCandid";
import { useShallow } from "zustand/shallow";
import { InputWithSelect } from "../ui-elements/input-with-select";

import { getWebsiteCompletion } from "@/lib/api";

export const AddCandidWebsiteInput = () => {
  const website = useAddCandidStore(useShallow((state) => state.website));
  const websiteCompletionList = useAddCandidStore(
    useShallow((state) => state.websiteCompletionList)
  );

  const updateWebsiteCompletionList = useAddCandidStore(
    useShallow((state) => state.updateWebsiteCompletionList)
  );
  const updateWebsite = useAddCandidStore(
    useShallow((state) => state.updateWebsite)
  );

  return (
    <InputWithSelect
      id="website"
      label="Website"
      placeholder="Website on which the application got submitted"
      value={website.name}
      completionList={websiteCompletionList}
      updateValue={updateWebsite}
      updateCompletionList={updateWebsiteCompletionList}
      getCompletion={getWebsiteCompletion}
    />
  );
};
