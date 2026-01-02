import { useCandidsStore } from "@/stores/useCandidsStore";
import { Button } from "./schadcn/Button";
import { useAddCandidStore } from "@/stores/useAddCandid";
import { useControls } from "@/stores/useControls";
import { Filters } from "./Filters";
import { Toggle } from "./schadcn/Toggle";
import { CircleSmall } from "lucide-react";

function ControlsButton({ label, ...props }) {
  return (<Button className="p-2 rounded-bl-md" {...props} >
    {label}
  </Button>)
}

const ControlsLayouts = () => {
  const toggleCompact = useControls((s) => s.toggleCompact)
  return (
    <div
      className="flex gap-2 justify-start items-center" >
      <Toggle
        defaultPressed
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
        <span className="mr-1">
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
      className=" sticky z-50 top-4
      flex flex-wrap justify-start
      p-4 py-2.5 
      border rounded rounded-bl-md
      shadow-sm  bg-white
      gap-x-6 gap-y-2" >
      <div
        className="flex  gap-2 justify-start items-center" >
        {/* <span className="text-muted-foreground"> Controls </span> */}
        <ControlsButton label="Add"
          onClick={() => {
            // if toggle
            window.scrollTo({ top: 48, behavior: "smooth" })
            toggle()
          }
          }
        />

        <ControlsButton label="Parse File"
          disabled
          onClick={() => handleParseFile()}
        />
        <ControlsLayouts />
      </div>
      <Filters />
    </div>
  </>

}
