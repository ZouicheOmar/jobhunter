export const Stat = ({
  label,
  part,
  total,
  showTotal = false,
}: {
  label: string;
  part: number;
  total: number;
  showTotal: boolean;
}) => {
  const percent = `${Math.floor((part / total) * 100)}%`;

  return (
    <>
      <div className="flex items-center mb-1 w-fit">
        <div className="w-[200px] capitalize"> {label} </div>
        <div className="relative border rounded bg-neutral-100 w-[200px] h-7 p-[1px]">
          <div className="absolute w-full top-[2px] left-0 px-1 z-10 flex justify-between">
            <span>{part} </span>
            <span>{showTotal ? total : percent} </span>
          </div>
          <div
            className="absolute z-0 top-0 left-0 border bg-orange-500/50 rounded h-full"
            style={{
              width: percent,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};
