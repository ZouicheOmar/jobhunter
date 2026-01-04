import { Candid } from "@/types/CandidType";
import { Link1Icon } from "@radix-ui/react-icons";
import { Building, Link, MapPin, MoveUpRight } from "lucide-react";
import { Badge } from "./Badge";


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
    rejected,
    dateApply
  } = candid;

  return <>
    <div className={`border rounded py-2 px-3 shadow-xs ${rejected && "border-red-500/20 bg-red-500/15"}`}>
      <p >
        {url ? (
          <span className="font-medium">
            <a href={url} target="_blank">
              <Link size="0.9em" className="inline mb-[2px] mr-[4px]" />
              {title}
            </a>
          </span>
        ) : (
          <span className="font-medium"> {title} </span>
        )} | <span className="uppercase"> {company}</span> {` \u2015 `} <span className="text-gray-700 capitalize">{city}</span>
      </p>

      <div className="flex flex-col w-full text-gray-600 ">
        <div className="flex w-full gap-3 text-gray-600">
          <p>
            {candid.contractType && <span className="text-gray-400 "> Contract Type </span>}
            {candid.industry && <span className="text-gray-400 "> Industry </span>}

            {unsolicited && <span className="text-blue-600 font-bold italic">Unsolicited</span>}
            <span>{` \u2015 `}</span>
            <span >
              Applied on {dateApply}
            </span>
            <span>{` \u2015 `}</span>
            <span className="text-neutral-400">
              {answer ? "Pending" : "cf. progression"}
            </span>

          </p>
        </div>
        <div className="max-w-full flex flex-wrap gap-1 wrap overflow-clip capitalize text-sm">
          {
            stack.length > 0 && stack.map((name, k) => <Badge key={k} >{name}</Badge>)
          }
        </div>
      </div>
    </div >
  </>

}
