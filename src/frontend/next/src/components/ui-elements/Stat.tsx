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
      <div className="flex flex-wrap items-center w-fit">
        <p className="capitalize w-[160px] text-neutral-600"> {label} </p>
        <div
          className="relative rounded
          overflow-hidden 
          w-[160px] h-5 px-2
          bg-neutral-100
          flex justify-between
          text-sm"
        >
          <div
            className="absolute z-0 top-0 left-0 bg-blue-700/30 h-full"
            style={{
              width: percent,
            }}
          ></div>
          <span className="inline-block h-fit z-10">{part} </span>
          <span>{showTotal ? total : percent} </span>
        </div>
      </div>
    </>
  );
};

// <div className="border border-red-500 w-full px-2 text-xs left-0 z-10 flex justify-between items-center">
// </div>
