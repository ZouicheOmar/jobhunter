import InputWithSelect from "./InputWithSelect";
import { useAddCandidStore } from "@/stores/useAddCandid";
import { useShallow } from "zustand/shallow";

import { getCompanyCompletion } from "@/lib/api";
import { CompanyDto } from "@/types/CandidType";

const formatCompanyCompletion = (company: CompanyDto) => company.name;


export default function AddCandidCompanyInput() {

  const companyName = useAddCandidStore(useShallow((state) => state.companyName));
  const companyCompletionList = useAddCandidStore(useShallow((state) => state.companyCompletionList));

  const updateCompanyName = useAddCandidStore(useShallow((state) => state.updateCompanyName));
  const updateCompanyCompletionList = useAddCandidStore(useShallow((state) => state.updateCompanyCompletionList));

  return (
    <InputWithSelect
      id="company"
      placeholder="Company"
      value={companyName}
      completionList={companyCompletionList}
      updateValue={updateCompanyName}
      updateCompletionList={updateCompanyCompletionList}
      formatItem={formatCompanyCompletion}
      getCompletion={getCompanyCompletion}
    />
  )
}
