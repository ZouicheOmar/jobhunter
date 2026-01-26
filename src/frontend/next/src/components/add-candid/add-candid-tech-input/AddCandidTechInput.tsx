"use client";

import {
  useState,
  useCallback,
  useRef,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";

import { useAddCandidStore } from "@/stores/use-add-candid/useAddCandid";
import { Tech } from "@/types";

import { getTechCompletion } from "@/lib/api";

import { Button } from "../../schadcn/Button";
import { AddCandidInputStackItems } from "./AddCandidTechInputStackItems";
import { AddCandidTechInputCompletionList } from "./AddCandidTechInputSuggestionItems";
import { HLine, InputLabel } from "@/components/ui-elements";

const AddButton = ({
  cb,
  disabled,
}: {
  cb: MouseEventHandler;
  disabled: boolean;
}) => (
  <Button onClick={cb} disabled={disabled}>
    add
  </Button>
);

export const useAddCandidTechInput = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const delay = 500;

  const inputRef = useRef<HTMLInputElement>(null);
  const [TID, setTID] = useState<NodeJS.Timeout>();

  const alreadyInStackError = useAddCandidStore(
    (state) => state.alreadyInStackError
  );

  const tech = useAddCandidStore((state) => state.tech);
  const stack = useAddCandidStore((state) => state.stack);
  const techCompletionList = useAddCandidStore(
    (state) => state.techCompletionList
  );

  const updateTech = useAddCandidStore((state) => state.updateTech);
  const updateStack = useAddCandidStore((state) => state.updateStack);

  const updateTechCompletionList = useAddCandidStore(
    (state) => state.updateTechCompletionList
  );

  const updateAlreadyInStackError = useAddCandidStore(
    (state) => state.updateAlreadyInStackError
  );

  const handleAddButton: MouseEventHandler = (e) => {
    updateStack();
    (
      (e.target as HTMLButtonElement)?.previousSibling as HTMLInputElement
    )?.focus();
  };

  const handleChange = useCallback<ChangeEventHandler>(
    (e) => {
      const value = (e.target as HTMLInputElement)?.value || "";
      updateAlreadyInStackError();

      if (!value) {
        console.log("HANDLE : value is empty");
        // return;
      }

      updateTech({ name: value, id: 0 });
      clearTimeout(TID);

      setTID(
        setTimeout(async () => {
          try {
            setLoading(true);
            const data = await getTechCompletion(value);
            data.length ? setError(false) : setError(true);
            updateTechCompletionList(data);
          } catch (e) {
            throw new Error("could not fetch tech completion list");
          } finally {
            setLoading(false);
          }
        }, delay)
      );
      setLoading(false);
    },
    [TID, loading]
  );

  const handleItemClick = (tech: Tech) => {
    updateTech(tech);
    updateTechCompletionList([]);
    updateStack();
    updateTech({ name: "", id: null });
    if (inputRef.current) inputRef.current.blur();
  };

  return {
    tech,
    alreadyInStackError,
    handleAddButton,
    handleChange,
    stack,
    techCompletionList,
  };
};

const ErrorMessage = ({ show, name }: { show: boolean; name: string }) =>
  show ? (
    <p className="w-full block p-1 px-2 text-red-600 bg-red-50 border rounded border-red-100">
      <span className="capitalize"> {name} </span>
      is already filled
    </p>
  ) : null;

export const AddCandidTechInput = () => {
  const { tech, handleAddButton, handleChange, alreadyInStackError } =
    useAddCandidTechInput();

  return (
    <>
      <div>
        <InputLabel label="Stack" />
        <div className="flex gap-2 items-center mb-2">
          <div className="w-full">
            <input
              id="tech"
              type="text"
              autoComplete="off"
              placeholder="Technology stack, programming languages, frameworks, tools... "
              className="w-full p-1 px-2 block bg-neutral-200 rounded"
              value={tech.name}
              onChange={handleChange}
            />
            <ErrorMessage show={alreadyInStackError} name={tech.name} />
          </div>
          <AddButton cb={handleAddButton} disabled={tech.name == ""} />
          <Button disabled={true}>refetch</Button>
        </div>
        <AddCandidTechInputCompletionList />
        <AddCandidInputStackItems />
      </div>
      <HLine />
    </>
  );
};
