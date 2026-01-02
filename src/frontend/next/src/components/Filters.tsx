import { useActionsStore } from "@/stores/useActions"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./schadcn/Select"
import { useCandidsStore } from "@/stores/useCandidsStore"
import { useEffect } from "react"

export const Filters = () => {
  const cities = useCandidsStore((state) => state.cities)
  const techs = useCandidsStore((state) => state.techs)

  const cityFilter = useActionsStore((state) => state.cityFilter)
  const techFilter = useActionsStore((state) => state.techFilter)

  const updateCityFilter = useActionsStore((state) => state.updateCityFilter)
  const updateTechFilter = useActionsStore((state) => state.updateTechFilter)


  return (
    <div className="flex gap-2">

      <Select defaultValue="default" value={cityFilter} onValueChange={(v) => updateCityFilter(v)}>
        <SelectTrigger className="max-w-[120px]  rounded rounded-bl-md" size="sm">
          <SelectValue placeholder="city" />
        </SelectTrigger>
        <SelectContent >
          <SelectItem className="" value="default">all cities</SelectItem>
          {cities.map((city, key) => <SelectItem key={key} className="" value={city.name}>{city.name}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select defaultValue="default" value={techFilter} onValueChange={(v) => updateTechFilter(v)}>
        <SelectTrigger className="w-[120px]  rounded rounded-bl-md" size="sm" >
          <SelectValue placeholder="tech" />
        </SelectTrigger>
        <SelectContent >
          <SelectItem className="" value="default">all techs</SelectItem>
          {techs.map((tech, key) => tech.name && <SelectItem key={key} className="" value={tech.name}>{tech.name}</SelectItem>)}
        </SelectContent>
      </Select>

    </div >
  )
}
