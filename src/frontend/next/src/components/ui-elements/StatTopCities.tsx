import { Stat } from './Stat';
import { CandidPerCity } from '@/lib/api/stats';

const Label = () => <p className=" text-sm sm:text-lg md:text-xl text-neutral-700">Top Cities</p>;

const Stats = ({ list, total }: { list: CandidPerCity[]; total: number }) => (
  <div className="grow pt-4">
    {list.map(({ city: { name }, numCandids: part }, key) => (
      <Stat key={key} label={name} part={part} total={total} />
    ))}
  </div>
);

const MainStat = ({ list }: { list: CandidPerCity[] }) => (
  <div className="self-end">
    <p className="text-lg sm:text-xl md:text-3xl text-end font-medium capitalize ">{list[0].city.name}</p>
    <p className="sm:text-lg text-end text-neutral-700 font-medium capitalize">
      {`${list[0].numCandids} applications`}
    </p>
  </div>
);

export const StatTopCities = ({ list, total }: { list: CandidPerCity[]; total: number }) => (
  <div className="grow bg-neutral-100 flex flex-col rounded-xl p-4   min-w-1/4">
    <Label />
    <div className="flex flex-wrap">
      <Stats list={list} total={total} />
      <MainStat list={list} />
    </div>
  </div>
);
