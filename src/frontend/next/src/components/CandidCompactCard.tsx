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
    <div className="relative border py-1 px-2 pl-8 flex justify-between gap-2 text-sm rounded shadow-xs">
      <div className=" flex flex-col  w-1/2">
        {unsolicited && (
          <span
            className="absolute text-sideways-lr bg-black/50 start-0 top-0 bottom-0
          rounded-tl rounded-bl text-gray-100 text-center outline
          outline-black/50"
          >  unsol. </span>
        )}
        <span className="font-medium">
          <a href={url} target="_blank">
            {title}
            <MoveUpRight size="1.1em" className="inline  mb-[4px] ml-[4px]" />
          </a>
        </span>

        <div className="flex flex-col w-full text-gray-600 text-xs">
          <div className="flex w-full  gap-6 text-gray-600 text-xs">
            {candid.contractType && <span className="text-gray-400 "> Contract Type </span>}
            {candid.industry && <span className="text-gray-400 "> Industry </span>}
            <span className="" >
              {addDate}
            </span>
          </div>
          <div className="flex w-full  italic gap-6 text-gray-600 text-xs">
            {
              stack.length > 0 && stack.map(({ name }, k) => <span key={k} className="text-gray-400 "> {name} </span>)
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
