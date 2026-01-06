import InputWithSelect from "./InputWithSelect";
import { useAddCandidStore } from "@/stores/useAddCandid";
import { useShallow } from "zustand/shallow";

import { formatBasicTypeEntity } from "@/lib";

import { getCityCompletion } from "@/lib/api";

const formatCityCompletion = (cityDto: string) => cityDto.name;

export default function AddCandidCityInput() {
  const city = useAddCandidStore(useShallow((state) => state.city));
  const updateCity = useAddCandidStore((state) => state.updateCity);

  const cityCompletionList = useAddCandidStore(
    useShallow((state) => state.cityCompletionList),
  );
  const updateCityCompletionList = useAddCandidStore(
    useShallow((state) => state.updateCityCompletionList),
  );

  return (
    <InputWithSelect
      id="city"
      placeholder="City, Location"
      value={city.name}
      updateValue={updateCity}
      completionList={cityCompletionList}
      updateCompletionList={updateCityCompletionList}
      getCompletion={getCityCompletion}
      formatItem={formatBasicTypeEntity}
    />
  );
}
