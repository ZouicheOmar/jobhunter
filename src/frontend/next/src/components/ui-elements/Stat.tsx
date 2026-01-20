export const Stat = ({
  label,
  part,
  total,
  showTotal = false,
}: {
  label: string;
  part: number;
  total: number;
  showTotal?: boolean;
}) => {
  const percent = `${Math.floor((part / total) * 100)}%`;

  return (
    <>
      <div className="flex flex-wrap items-center mb-1 w-fit ">
        <div className="w-[180px] capitalize"> {label} </div>
        <div className="relative rounded-xl overflow-hidden bg-neutral-200 w-[180px] h-7 ">
          <div className="absolute w-full top-[2px] left-0 px-2 z-10 flex justify-between">
            <span>{part} </span>
            <span>{showTotal ? total : percent} </span>
          </div>
          <div
            className="absolute z-0 top-0 left-0 bg-blue-500 h-full"
            style={{
              width: percent,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};
