import { City } from "@/types/CandidType";
import { create } from "domain";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { combine } from "zustand/middleware";

type InputWithSelectProps = {
  id: string;
  placeholder: string;
  value: string;
  completionList: string[];
  updateValue: (v: string) => string;
  updateCompletionList: (v: string) => string[];
  // TODO this component should not be bound to the city type
  getCompletion: (v: string) => Promise<City>; // should be general..
}

const LoadingSpan = () => (
  <span className="m-0 px-2 text-gray-300
    h-fit leading-[2em] inline-block"
  >
    Searching ...
  </span>
)

const NoResultsSpan = () => (
  <span
    className="m-0 px-2
    h-fit leading-[2em] inline-block text-red-400"
  >
    No result found...
  </span>
)


const CompletionListItem = ({ item, cb }) => (
  <span
    onClick={() => cb(item)}
    className=" m-0 px-2 border rounded
                  w-full md:w-[49%] min-h-[2em] h-[2em]
                  leading-[2em] inline-block
                  cursor-pointer break-all"
  >
    {item.name}
  </span>
)

const CompletionList = ({ list, cb }) => (
  <div
    className="h-fit min-h-[4.5em]
    flex flex-wrap gap-x-1
    gap-y-1 md:gap-y-0"
  >
    {list.map((i: City, k: number) =>
      <CompletionListItem item={i} key={k} cb={cb} />)
    }
  </div>

)

// TODO select suggestion item with arrows..
export default function InputWithSelect({
  id,
  placeholder,
  value,
  completionList,
  updateValue,
  updateCompletionList,
  getCompletion,
  // TODO ItemFormat
}: InputWithSelectProps) {

  // TODO another method to decide loading or error state..
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const delay = 500;

  const inputRef = useRef<HTMLInputElement>(null)
  const [TID, setTID] = useState<NodeJS.Timeout>();

  const handleSpanClick = useCallback((i) => {
    updateValue(i.name);
    updateCompletionList([]);
    if (inputRef.current) inputRef.current.blur();
  }, [value])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    updateValue(e.target?.value);
    clearTimeout(TID);

    if (!e.target.value) {
      updateCompletionList([]);
      setError(false);
      setLoading(false);
      return;
    }

    setTID(
      setTimeout(
        async () => {
          try {
            setLoading(true);
            const data: Promise<City[]> = await getCompletion(e.target.value)
            data.length ? setError(false) : setError(true);
            updateCompletionList(data);
          } catch (e) {
            throw new Error("could not fetch completion list")
          } finally {
            setLoading(false);
          }
        },
        delay
      )
    );
    setLoading(false);
  }, [TID, loading]);

  return (
    <div className="rounded col-span-1 flex flex-col gap-1" >
      <input
        ref={inputRef}
        type="text"
        className="w-full h-fit p-1 px-2 block bg-gray-100 rounded"
        autoComplete="off"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {
        value.length
          ? error
            ? <NoResultsSpan />
            : completionList.length
              ? <CompletionList list={completionList} cb={handleSpanClick} />
              : loading
                ? <LoadingSpan />
                : <></>
          : <></>
      }
    </div >
  )
}
