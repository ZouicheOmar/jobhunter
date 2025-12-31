import InputWithSelect from "./InputWithSelect";
import { useAddCandidStore } from "@/stores/useAddCandid";
import { useShallow } from "zustand/shallow";

import { getCityCompletion } from "@/lib/api";

export default function AddCandidCityInput() {

  const city = useAddCandidStore(useShallow((state) => state.city));
  const updateCityName = useAddCandidStore((state) => state.updateCityName);

  const cityCompletionList = useAddCandidStore(useShallow((state) => state.completionList));
  const updateCityCompletionList = useAddCandidStore(useShallow((state) => state.updateCompletionList));

  // const cityCompletionListUrl = "";

  return (
    <InputWithSelect
      id="city"
      placeholder="City, Location"
      value={city}
      updateValue={updateCityName}
      completionList={cityCompletionList}
      updateCompletionList={updateCityCompletionList}
      getCompletions={getCityCompletion}
    />
  )
}
