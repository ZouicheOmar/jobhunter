"use client";

import { useState, useCallback, useRef, useEffect } from "react";

import { useAddCandidStore } from "@/stores/useAddCandid";
import { Tech, TechCreate } from "@/types";

import { getTechCompletion } from "@/lib/api";
import { formatBasicTypeEntity } from "@/lib";

import { Button } from "./schadcn/Button";

interface CompletionItemProps {
  item: Tech | TechCreate;
}

interface ItemProps extends CompletionItemProps {
  rmCallback?: (t: Tech | TechCreate) => void;
  completion?: boolean;
}

const ItemCompletion = ({ item }: CompletionItemProps) => {
  return (
    <div
      className="border rounded mr-1 px-1 select-none inline-block
      align-text-bottom break-all text-blue-800 px-2 hover:cursor-pointer
      hover:bg-blue-100 hover:border-blue-300 hover:shadow transition-colors
      transition-shadow"
    >
      <span className={`capitalize`}>{formatBasicTypeEntity(item)}</span>
    </div>
  );
};

const Item = ({ item, rmCallback, completion }: ItemProps) => {
  if (completion) return <ItemCompletion item={item} />;

  return (
    <div
      onClick={() => cb(item)}
      className={`border rounded
      mr-2 mb-1 px-1
      select-none
      inline-block
      align-text-bottom
      break-all
      ${
        !item.id
          ? "bg-yellow-300/80 text-yellow-900 border-yellow-800/20"
          : "bg-green-100 text-green-700 border-green-800/20"
      }
      `}
    >
      <span className="capitalize mr-1">{formatBasicTypeEntity(item)}</span>
      {item.id && !completion ? (
        <span className=" text-green-500">{`\u2714`}</span>
      ) : (
        <> </>
      )}
      <button
        onClick={() => rmCallback && rmCallback(item)}
        className="text-red-300 ml-3 hover:text-red-500 hover:cursor-pointer"
      >
        {`\u{2715}`}
      </button>
    </div>
  );
};

const StackItems = () => {
  const list = useAddCandidStore((state) => state.stack);
  const removeStackItem = useAddCandidStore((state) => state.removeStackItem);
  return (
    <div>
      {list.map((item, key) => (
        <Item key={key} item={item} rmCallback={removeStackItem} />
      ))}
    </div>
  );
};

const TechSuggestionList = () => {
  const list = useAddCandidStore((state) => state.techCompletionList);
  return (
    <div className="mb-1">
      {list.map((i, k) => (
        <Item key={k} item={i} completion />
      ))}
    </div>
  );
};

export default function AddCandidTechInput() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const delay = 500;

  const inputRef = useRef<HTMLInputElement>(null);
  const [TID, setTID] = useState<NodeJS.Timeout>();

  const tech = useAddCandidStore((state) => state.tech);
  const stack = useAddCandidStore((state) => state.stack);
  const techCompletionList = useAddCandidStore(
    (state) => state.techCompletionList
  );

  const updateTech = useAddCandidStore((state) => state.updateTech);
  const updateStack = useAddCandidStore((state) => state.updateStack);
  const setStack = useAddCandidStore((state) => state.setStack);
  const updateTechCompletionList = useAddCandidStore(
    (state) => state.updateTechCompletionList
  );

  const handleChange = useCallback(
    (e) => {
      updateTech({ name: e.target?.value, id: -1 });
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
            const data = await getTechCompletion(e.target.value);
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

  // useEffect(() => {{{{
  //   const inStack: Tech[] = [
  //     {
  //       name: "javascript",
  //       id: 1,
  //     },
  //     {
  //       name: "typescript",
  //       id: 1,
  //     },
  //     {
  //       name: "tanstack",
  //       id: 0,
  //     },
  //     {
  //       name: "git",
  //       id: 3,
  //     },
  //     {
  //       name: "java",
  //       id: 0,
  //     },
  //   ];
  //
  //   const completionList = inStack.map((item, k) => ({
  //     name: item.name,
  //     id: k + 1,
  //   }));
  //   console.log(completionList);
  //   updateTechCompletionList(completionList);
  //   setStack(inStack);
  // }, []);}}}

  return (
    <div>
      <div className="flex gap-2 items-baseline mb-2">
        <input
          id="tech"
          type="text"
          autoComplete="off"
          ref={inputRef}
          placeholder="Tech stack"
          className="w-full h-fit p-1 px-2 block bg-gray-100 rounded"
          value={tech.name}
          // onChange={(e) => updateTech(e.target.value)}
          onChange={handleChange}
        />
        <Button
          onClick={(e) => {
            updateStack();
            e.target.previousSibling.focus();
          }}
          disabled={tech.name == ""}
        >
          add
        </Button>
        <Button disabled={true}>refetch</Button>
      </div>
      {techCompletionList.length > 0 && <TechSuggestionList />}
      {stack?.length > 0 && <StackItems />}
    </div>
  );
}
