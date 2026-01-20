import { useShallow } from "zustand/shallow";

import { useAddCandidStore } from "@/stores/use-add-candid/useAddCandid";
import { InputWithSelect } from "../ui-elements/input-with-select";

import { getCityCompletion } from "@/lib/api";

export const AddCandidCityInput = () => {
  const city = useAddCandidStore(useShallow((state) => state.city));
  const updateCity = useAddCandidStore((state) => state.updateCity);

  const cityCompletionList = useAddCandidStore(
    useShallow((state) => state.cityCompletionList)
  );
  const updateCityCompletionList = useAddCandidStore(
    useShallow((state) => state.updateCityCompletionList)
  );

  return (
    <InputWithSelect
      id="city"
      label="Location"
      placeholder="Location(s) (City) of the job, or remote, or hybrid"
      value={city.name}
      updateValue={updateCity}
      completionList={cityCompletionList}
      updateCompletionList={updateCityCompletionList}
      getCompletion={getCityCompletion}
    />
  );
};
