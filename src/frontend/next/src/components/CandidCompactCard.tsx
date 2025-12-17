import { Candid } from "@/types/CandidType";
import { Link1Icon } from "@radix-ui/react-icons";
import { Building, Link, MapPin, MoveUpRight } from "lucide-react";


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
    <div className="relative border py-1 px-2 pl-8 flex justify-between gap-2 text-sm rounded shadow-xs">
      <div className=" flex flex-col  w-1/2">
        {unsolicited && (
          <span
            className="absolute text-sideways-lr bg-[#6aa7a8] start-0 top-0 bottom-0
          rounded-tl rounded-bl text-white text-center outline
          outline-[#6aa7a8]"
          >  unsol. </span>
        )}
        {url ? (
          <span className="font-medium">
            <a href={url} target="_blank">
              {title}
              <Link size="0.9em" className="inline mb-[2px] ml-[6px]" />
            </a>
          </span>
        ) : (
          <span className="font-medium">
            {title}
          </span>
        )}

        <div className="flex flex-col w-full text-gray-600 text-xs">
          <div className="flex w-full  gap-6 text-gray-600 text-xs">
            {candid.contractType && <span className="text-gray-400 "> Contract Type </span>}
            {candid.industry && <span className="text-gray-400 "> Industry </span>}
            <span className="" >
              {addDate}
            </span>
          </div>
          <div className="max-w-full flex gap-2 wrap overflow-clip italic ">
            {
              stack.length > 0 && stack.map(({ name }, k) => <span key={k} className="text-gray-400 min-w-fit"> {name} </span>)
            }
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
