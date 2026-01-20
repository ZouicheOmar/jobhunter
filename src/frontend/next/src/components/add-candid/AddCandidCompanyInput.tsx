import { useAddCandidStore } from "@/stores/use-add-candid/useAddCandid";
import { useShallow } from "zustand/shallow";
import { InputWithSelect } from "../ui-elements/input-with-select";

import { getCompanyCompletion } from "@/lib/api";

import { InputLabel } from "../ui-elements";

export const AddCandidCompanyInput = () => {
  const company = useAddCandidStore(useShallow((state) => state.company));
  const companyCompletionList = useAddCandidStore(
    useShallow((state) => state.companyCompletionList)
  );

  const updateCompanyName = useAddCandidStore(
    useShallow((state) => state.updateCompany)
  );
  const updateCompanyCompletionList = useAddCandidStore(
    useShallow((state) => state.updateCompanyCompletionList)
  );

  return (
    <InputWithSelect
      id="company"
      label="Company"
      placeholder="Company's name"
      value={company.name}
      completionList={companyCompletionList}
      updateValue={updateCompanyName}
      updateCompletionList={updateCompanyCompletionList}
      getCompletion={getCompanyCompletion}
    />
  );
};
