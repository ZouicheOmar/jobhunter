'use client'

import { useDispatch } from "react-redux"
import { add, toNewest } from "@/lib/features/candids/candidsSlice";
import { Button } from "./schadcn/Button";

export const Controls = () => {
  const dispatch = useDispatch();

  return <>
    <div className="p-2 text-xs border rounded flex gap-2 justify-start items-center">
      <span className="text-muted-foreground"> controls </span>
      <Button
        className="text-xs px-2 py-0 rounded-bl-sm"
        onClick={() => dispatch(add())}>
        add
      </Button>
      {/* <button */}
      {/*   className="px-2 m-1 border bg-gray-300 hover:bg-gray-200 */}
      {/*     transition-colors cursor-pointer" */}
      {/*   onClick={() => dispatch(fetchAllCandids())}> */}
      {/*   fetch */}
      {/* </button> */}
      <Button
        className="text-xs px-2 py-0 rounded-bl-sm"
      // onClick={() => dispatch(add())}
      >
        filter
      </Button>
      <Button
        className="text-xs px-2 py-0 rounded-bl-sm"
        onClick={() => dispatch(toNewest())}>
        newest
      </Button>

    </div>
  </>

}
