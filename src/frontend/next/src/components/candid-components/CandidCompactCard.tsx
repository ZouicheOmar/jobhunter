import { Candid } from "@/types";
import { Link } from "lucide-react";
import { Badge } from "../ui-elements/Badge";

import { formatBasicEntity as fb } from "@/lib/utils";

export const CandidCompactCard = ({ candid }: { candid: Candid }) => {
  const {
    id,
    title,
    answer,
    stack,
    url,
    website,
    unsolicited,
    city,
    company,
    contract,
    dateApply,
  } = candid;

  return (
    <>
      <div className="border bg-neutral-100 rounded-lg py-2 px-4 ">
        <p>
          {url ? (
            <span className="font-medium">
              <a href={url} target="_blank">
                <Link size="0.9em" className="inline mb-[2px] mr-[4px]" />
                {title}
              </a>
            </span>
          ) : (
            <span className="font-medium"> {title} </span>
          )}{" "}
          | <span className="uppercase"> {fb(company)}</span> {` \u2015 `}{" "}
          <span className="text-gray-700 capitalize">{fb(city)}</span>
        </p>

        <div className="flex flex-col gap-1 w-full text-gray-600 ">
          <div className="flex w-full gap-3 text-gray-600">
            <p>
              {contract.type && (
                <span className="text-gray-400 "> {contract.type}</span>
              )}

              {unsolicited && (
                <span className="text-blue-600 font-bold italic">
                  Unsolicited
                </span>
              )}
              <span>{` \u2015 `}</span>
              <span>Applied on {dateApply}</span>
              <span>{` \u2015 `}</span>
              <span className="text-neutral-400">
                {answer ? "Pending" : "cf. progression"}
              </span>
            </p>
          </div>
          <div className="max-w-full flex flex-wrap gap-1 wrap overflow-clip capitalize text-xs">
            {stack.length > 0 &&
              stack.map((tech, k) => <Badge key={k}>{fb(tech)}</Badge>)}
          </div>
        </div>
      </div>
    </>
  );
};
