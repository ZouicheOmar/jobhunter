import { StatCardProps } from '../types';

export const StatCard = ({ label, data, dataSecond }: StatCardProps) => (
  <div className="grow bg-neutral-100 flex flex-col justify-between rounded-xl p-3 md:p-4 h-30 md:h-40 min-w-1/4">
    <p className="text-sm sm:text-lg md:text-xl text-neutral-700"> {label} </p>
    <div>
      <p className="text-lg sm:text-xl md:text-3xl text-end font-medium capitalize ">{data}</p>
      {dataSecond && <p className="sm:text-lg text-end text-neutral-700 font-medium capitalize">{dataSecond}</p>}
    </div>
  </div>
);
