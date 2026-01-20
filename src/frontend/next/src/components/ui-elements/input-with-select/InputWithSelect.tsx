"use client";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { InputWithSelectProps, UseInputWithSelectProps } from "./types";
import { BasicEntity } from "@/types";
import { InputWithSelecCompletionList } from "./InputWithSelectCompletionList";
import { InputLabel } from "../InputLabel";

const LoadingSpan = () => (
  <span
    className="m-0 px-2 text-gray-300
    h-fit leading-[2em] inline-block"
  >
    Searching ...
  </span>
);

const NoResultsSpan = () => (
  <span
    className="m-0 px-2
    h-fit leading-[2em] inline-block text-red-400"
  >
    No result found...
  </span>
);

export const useInputWithSelect: UseInputWithSelectProps = (
  value,
  updateValue,
  updateCompletionList,
  getCompletion
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const delay = 500;

  const inputRef = useRef<HTMLInputElement>(null);
  const [TID, setTID] = useState<NodeJS.Timeout>();

  const handleSpanClick = useCallback(
    (item: BasicEntity) => {
      updateValue(item);
      updateCompletionList([]);
      if (inputRef.current) inputRef.current.blur();
    },
    [value]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateValue({ name: e.target.value, id: null });
      clearTimeout(TID);

      if (!e.target.value) {
        setError(false);
        setLoading(false);
        return;
      }

      setTID(
        setTimeout(async () => {
          try {
            setLoading(true);
            const data = await getCompletion(e.target.value);
            data.length ? setError(false) : setError(true);
            updateCompletionList(data);
          } catch (e) {
            throw new Error("could not fetch completion list");
          } finally {
            console.log("should be setting loading to false");
            setLoading(false);
          }
        }, delay)
      );
      setLoading(false);
    },
    [TID, loading]
  );

  return {
    loading,
    error,
    inputRef,
    handleChange,
    handleSpanClick,
  };
};

export const InputWithSelect = ({
  id,
  label,
  placeholder,
  value,
  completionList,
  updateValue,
  updateCompletionList,
  getCompletion,
}: InputWithSelectProps) => {
  const { loading, error, inputRef, handleChange, handleSpanClick } =
    useInputWithSelect(value, updateValue, updateCompletionList, getCompletion);

  return (
    <div>
      <InputLabel label={label} />
      <div className="flex flex-col gap-1">
        <input
          id={id}
          ref={inputRef}
          type="text"
          className="w-full h-fit p-1 px-2 block bg-neutral-200 rounded"
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        {value.length ? (
          error ? (
            <NoResultsSpan />
          ) : completionList.length ? (
            <InputWithSelecCompletionList
              list={completionList}
              cb={handleSpanClick}
            />
          ) : loading ? (
            <LoadingSpan />
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
