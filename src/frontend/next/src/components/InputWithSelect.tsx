import { create } from "domain";
import { useCallback, useEffect, useState } from "react";
import { combine } from "zustand/middleware";

// TODO au lieu de ça, j'ai besoin d'un state interne à ce composant

const delay = 500;
export default function InputWithSelect({
  id,
  placeholder,
  value,
  updateValue,
  completionList,
  updateCompletionList,
  getCompletion
}) {
  const [TID, setTID] = useState<NodeJS.Timeout>();

  const handleChange = useCallback((e) => {
    updateValue(e.target.value);
    clearTimeout(TID);
    setTID(
      setTimeout(
        async () => {
          try {
            const data = await getCompletion()
            updateCompletionList(data);
          } catch (e) {
            throw new Error("could not fetch completion list")
          }
        },
        delay
      )
    );
  }, [TID]);

  return (
    <div className="rounded flex flex-col gap-1">
      <input
        type="text"
        className="w-full p-1 px-2 block bg-gray-100 rounded"
        autoComplete="off"

        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />

      {
        // TODO ce composant reconnaît cette liste comme réactive ?
        completionList.length ? (
          <div className="h-[4.5em] min-h-[4.5em] w-full flex flex-wrap gap-x-1 gap-y-0">
            {completionList.map((i, k) => (<span
              className="cursor-pointer
            m-0
            w-[49%] min-h-[2em] h-[2em]
            border rounded
            px-2
            leading-[2em]
            inline-block"
              key={k}>{i}</span>))
            }
          </div>) : (<></>)}
    </div>
  )
}
