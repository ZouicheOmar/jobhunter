import InputWithSelect from "./InputWithSelect";
import { useAddCandidStore } from "@/stores/useAddCandid";
import { useShallow } from "zustand/shallow";

import { getWebsiteCompletion } from "@/lib/api";

const formatWebsiteCompletion = (websiteName: string) => websiteName;

export default function AddCandidWebsiteInput() {

  const websiteName = useAddCandidStore(useShallow((state) => state.websiteName));
  const websiteCompletionList = useAddCandidStore(useShallow((state) => state.completionList));

  const updateWebsiteCompletionList = useAddCandidStore(useShallow((state) => state.updateCityCompletionList));
  const updateWebsiteName = useAddCandidStore(useShallow((state) => state.updateWebsiteName));

  return (
    <InputWithSelect
      id="website"
      placeholder="Website"
      value={websiteName}
      completionList={websiteCompletionList}
      updateValue={updateWebsiteName}
      updateCompletionList={updateWebsiteCompletionList}
      getCompletion={getWebsiteCompletion}
      format={formatWebsiteCompletion}
    />
  )
}
