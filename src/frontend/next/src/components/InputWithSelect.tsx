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

export default function InputWithSelect({
  id,
  placeholder,
  value,
  completionList,
  updateValue,
  updateCompletionList,
  getCompletion
}: InputWithSelectProps) {

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
      return;
    }

    setTID(
      setTimeout(
        async () => {
          try {
            const data: Promise<City[]> = await getCompletion(e.target.value)
            console.log("completion city suggestions ?", data);
            updateCompletionList(data);
          } catch (e) {
            // how to create an exception ?
            throw new Error("could not fetch completion list")
          }
        },
        delay
      )
    );
  }, [TID]);

  return (
    <div className="rounded flex flex-col gap-1" >
      <input
        ref={inputRef}
        type="text"
        className="w-full p-1 px-2 block bg-gray-100 rounded"
        autoComplete="off"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {completionList.length ? (
        <div className="h-[4.5em] min-h-[4.5em] w-full flex flex-wrap gap-x-1 gap-y-0">
          {completionList.map((i: City, k: number) => (
            <span
              key={k}
              onClick={() => handleSpanClick(i)}
              className=" m-0 px-2 border rounded
                  w-[49%] min-h-[2em] h-[2em]
                  leading-[2em] inline-block
                  cursor-pointer" >
              {i.name}
            </span>))
          }
        </div>)
        : (<></>)}
    </div>
  )
}
