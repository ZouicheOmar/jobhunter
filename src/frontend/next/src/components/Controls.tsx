import { useDummyStore } from "@/stores/dummyStore";
import { Button } from "./schadcn/Button";
import { useAddCandidStore } from "@/stores/useAddCandid";
import { Filters } from "./Filters";

export const Controls = () => {
  const toggle = useAddCandidStore((state) => state.toggle);
  const handleParseFile = useDummyStore((state) => state.handleParseFile)

  return <>
    <div
      className="p-2 text-xs border rounded shadow-sm flex justify-between" >
      <div
        className="flex gap-2 justify-start items-center" >
        <span className="text-muted-foreground"> controls </span>
        <Button
          className="text-xs px-2 py-0 rounded-bl-sm"
          onClick={() => toggle()}
        >
          add
        </Button>

        <Button
          className="text-xs px-2 py-0 rounded-bl-sm"
        // onClick={"reverse filtered"}
        >
          newest
        </Button>

        <Button
          className="text-xs px-2 py-0 rounded-bl-sm"
          onClick={() => handleParseFile()}
          disabled
        >
          parse file
        </Button>

      </div>
      <Filters />
    </div>
  </>

}
