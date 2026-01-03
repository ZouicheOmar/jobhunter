import InputWithSelect from "./InputWithSelect";
import { useAddCandidStore } from "@/stores/useAddCandid";
import { useShallow } from "zustand/shallow";

import { getCityCompletion } from "@/lib/api";

const formatCityCompletion = (cityDto: string) => cityDto.name;

export default function AddCandidCityInput() {

  const cityName = useAddCandidStore(useShallow((state) => state.cityName));
  const updateCityName = useAddCandidStore((state) => state.updateCityName);

  const cityCompletionList = useAddCandidStore(useShallow((state) => state.completionList));
  const updateCityCompletionList = useAddCandidStore(useShallow((state) => state.updateCityCompletionList));

  // je fais le update ici...

  // const cityCompletionListUrl = "";

  return (
    <InputWithSelect
      id="city"
      placeholder="City, Location"
      value={cityName}
      updateValue={updateCityName}
      completionList={cityCompletionList}
      updateCompletionList={updateCityCompletionList}
      // NOTE ici j'avais un bug, faut de grappe sur getCompletion
      // Comment est ce que j'aurai pû exploiter TS pour éviter ça ?
      getCompletion={getCityCompletion}
      formatItem={formatCityCompletion}
    />
  )
}
