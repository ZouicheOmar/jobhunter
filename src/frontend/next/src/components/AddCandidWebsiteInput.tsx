import InputWithSelect from "./InputWithSelect";
import { useAddCandidStore } from "@/stores/useAddCandid";
import { useShallow } from "zustand/shallow";

import { getWebsiteCompletion } from "@/lib/api";
import { WebsiteDto } from "@/types/CandidType";

const formatWebsiteCompletion = (website: WebsiteDto) => website.name;

export default function AddCandidWebsiteInput() {

  const websiteName = useAddCandidStore(useShallow((state) => state.websiteName));
  const websiteCompletionList = useAddCandidStore(useShallow((state) => state.websiteCompletionList));

  const updateWebsiteCompletionList = useAddCandidStore(useShallow((state) => state.updateWebsiteCompletionList));
  const updateWebsiteName = useAddCandidStore(useShallow((state) => state.updateWebsiteName));

  return (
    <InputWithSelect
      id="website"
      placeholder="Website"
      value={websiteName}
      completionList={websiteCompletionList}
      updateValue={updateWebsiteName}
      updateCompletionList={updateWebsiteCompletionList}
      formatItem={formatWebsiteCompletion}
      getCompletion={getWebsiteCompletion}
    />
  )
}
