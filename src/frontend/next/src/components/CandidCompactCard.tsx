import { useDispatch } from "react-redux"
import { Candid } from "@/types/CandidType";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./schadcn/Card";
import { Button } from "./schadcn/Button";
import { BackpackIcon, CalendarIcon, HomeIcon, Link2Icon, Pencil1Icon, SewingPinFilledIcon, TrashIcon } from "@radix-ui/react-icons";
import { Building, Building2, Calendar, ExternalLink, Home, MapPin, MoveUpRight, Tractor } from "lucide-react";
import { Badge } from "./Badge";
import { useCandidsStore } from "@/stores/useCandidsStore";

const Section = ({ children }) => <span className="text-muted-foreground">{children} : </span>

export const CandidCompactCard = (
  { candid }: { candid: Candid }
) => {
  // const dispatch = useDispatch();
  const { id,
    title,
    answer,
    stack,
    url,
    websiteDto: website,
    unsolicited,
    cityDto: city,
    company,
    addDate
  } = candid;

  const deleteCandid = useCandidsStore((state) => state.deleteCandid)

  return <>
    <div className="border py-1 px-2 flex justify-between gap-2 text-sm rounded shadow-xs">
      <div className=" flex flex-col  w-1/2">
        <span className="font-medium">
          {title}
          <MoveUpRight className="inline" size="1.1em" className="inline  mb-[4px] ml-[4px]" />
        </span>

        <div className="flex flex-col w-full text-gray-600 text-xs">
          <div className="flex w-full  gap-6 text-gray-600 text-xs">
            <span className="text-gray-400 "> Contract Type </span>
            <span className="text-gray-400"> Industry </span>
            <span className="" >
              {addDate}
            </span>
          </div>
          <div className="flex w-full  italic gap-6 text-gray-600 text-xs">
            <span className="text-gray-400 not-italic text-gray-600 "> IF TECH : </span>
            <span className="text-gray-400 "> Javascript</span>
            <span className="text-gray-400"> Typescript </span>
            <span className="text-gray-400"> Python</span>
          </div>
        </div>

      </div>
      <div className="flex flex-col w-1/3 text-gray-700">
        <div className=" flex gap-[4px] ">
          <Building className="inline" size="1em" className="inline mt-[3px] " />
          <span className="capitalize italic w-full">
            {company}
          </span>
        </div>
        <div className="h-fit">
          <span className="capitalize ">
            <MapPin className="inline" size="1em" className="inline mb-[4px] mr-[4px]" />
            {city.name}
          </span>
        </div>
      </div>
    </div >
  </>

}
