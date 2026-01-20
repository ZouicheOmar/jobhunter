import { CandidPerCity } from "@/lib/api/stats";
import { Stat } from "./Stat";

export const TopCities = ({
  list,
  total,
}: {
  list: CandidPerCity[];
  total: number;
}) => (
  <div className="px-3">
    {list.map(({ city: { name }, numCandids: part }, key) => (
      <Stat key={key} label={name} part={part} total={total} />
    ))}
  </div>
);
