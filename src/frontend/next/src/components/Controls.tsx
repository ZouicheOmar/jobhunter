import { useCandidsStore } from "@/stores/useCandidsStore";
import { Button } from "./schadcn/Button";
import { useAddCandidStore } from "@/stores/useAddCandid";
import { useControls } from "@/stores/useControls";
import { Filters } from "./Filters";
import { Toggle } from "./schadcn/Toggle";
import { CircleSmall } from "lucide-react";

function ControlsButton({ label, ...props }) {
  return (<Button className="text-xs  px-2 py-0 rounded-bl-md" {...props} >
    {label}
  </Button>)
}

const ControlsLayouts = () => {
  const toggleCompact = useControls((s) => s.toggleCompact)
  return (
    <div
      className="flex gap-2 justify-start items-center" >
      <Toggle
        variant="default"
        size="sm"
        className="
        border
        text-muted-foreground
        rounded rounded-bl-md
        *:[svg]:stroke-1
        data-[state=on]:bg-blue-100
        data-[state=on]:*:[svg]:fill-blue-500
        data-[state=on]:*:[svg]:stroke-blue-500
        data-[state=on]:border-blue-200
        px-2
        "
        onPressedChange={(v) => toggleCompact(v)}
      >
        <CircleSmall />
        <span className="text-xs mr-1">
          Compact
        </span>
      </Toggle>
    </div >
  )
}

export const Controls = () => {
  const toggle = useAddCandidStore((state) => state.toggle);
  const handleParseFile = useCandidsStore((state) => state.handleParseFile)

  return <>
    <div
      className="sticky z-50 top-4 bg-white p-2 pt-2.5 text-xs border rounded rounded-bl-md shadow-sm flex justify-start gap-6" >
      <div
        className="flex  gap-2 justify-start items-center" >
        {/* <span className="text-muted-foreground"> Controls </span> */}
        <ControlsButton label="Add"
          onClick={() => toggle()}
        />

        <ControlsButton label="Parse File"
          disabled
          onClick={() => handleParseFile()}
        />
      </div>
      <Filters />
      <ControlsLayouts />
    </div>
  </>

}
