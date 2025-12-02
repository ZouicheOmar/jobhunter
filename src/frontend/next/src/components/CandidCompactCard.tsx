import { Candid } from "@/types/CandidType";
import { Building, MapPin, MoveUpRight } from "lucide-react";


export const CandidCompactCard = (
  { candid }: { candid: Candid }
) => {
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

  return <>
    <div className="border py-1 px-2 flex justify-between gap-2 text-sm rounded shadow-xs">
      <div className=" flex flex-col  w-1/2">
        <span className="font-medium">
          {title}
          <MoveUpRight size="1.1em" className="inline  mb-[4px] ml-[4px]" />
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
            <span className="text-gray-400 not-italic"> IF TECH : </span>
            <span className="text-gray-400 "> Javascript</span>
            <span className="text-gray-400"> Typescript </span>
            <span className="text-gray-400"> Python</span>
          </div>
        </div>

      </div>
      <div className="flex flex-col w-1/3 text-gray-700">
        <div className=" flex gap-[4px] ">
          <Building size="1em" className="inline mt-[3px] " />
          <span className="capitalize italic w-full">
            {company}
          </span>
        </div>
        <div className="h-fit">
          <span className="capitalize ">
            <MapPin size="1em" className="inline mb-[4px] mr-[4px]" />
            {city.name}
          </span>
        </div>
      </div>
    </div >
  </>

}
