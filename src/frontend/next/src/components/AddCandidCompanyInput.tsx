import InputWithSelect from "./InputWithSelect";
import { useAddCandidStore } from "@/stores/useAddCandid";
import { useShallow } from "zustand/shallow";

import { getCompanyCompletion } from "@/lib/api";
import { formatBasicTypeEntity } from "@/lib";
import { Company } from "@/types";

export default function AddCandidCompanyInput() {
  const company = useAddCandidStore(useShallow((state) => state.company));
  const companyCompletionList = useAddCandidStore(
    useShallow((state) => state.companyCompletionList),
  );

  const updateCompanyName = useAddCandidStore(
    useShallow((state) => state.updateCompany),
  );
  const updateCompanyCompletionList = useAddCandidStore(
    useShallow((state) => state.updateCompanyCompletionList),
  );

  return (
    <InputWithSelect
      id="company"
      placeholder="Company"
      value={company.name}
      completionList={companyCompletionList}
      updateValue={updateCompanyName}
      updateCompletionList={updateCompanyCompletionList}
      formatItem={formatBasicTypeEntity}
      getCompletion={getCompanyCompletion}
    />
  );
}
