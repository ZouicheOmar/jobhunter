'use client'
import { Button } from "./schadcn/Button";
import { useAddCandidStore } from "@/stores/useAddCandid";
import { useCandidsStore } from "@/stores/useCandidsStore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { Badge } from "./Badge";
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
} from "./schadcn/Select";

import { getTodayDate } from "@/lib/utils";

export function AddCandid() {

  const contracts = useCandidsStore(useShallow((state) => state.contracts));
  const loading = useAddCandidStore(useShallow((state) => state.loading));

  const url = useAddCandidStore(useShallow((state) => state.url));
  const title = useAddCandidStore(useShallow((state) => state.title));
  const city = useAddCandidStore(useShallow((state) => state.city));
  const companyName = useAddCandidStore(useShallow((state) => state.companyName));
  const website = useAddCandidStore(useShallow((state) => state.website));
  const companyDesc = useAddCandidStore(useShallow((state) => state.companyDesc));
  const addDate = useAddCandidStore(useShallow((state) => state.addDate));

  const contract = useAddCandidStore(useShallow((state) => state.contract));
  const updateContract = useAddCandidStore(useShallow((state) => state.updateContract));

  const tech = useAddCandidStore((state) => state.tech);
  const stack = useAddCandidStore((state) => state.stack);

  const updateUrl = useAddCandidStore((state) => state.updateUrl);
  const updateTitle = useAddCandidStore((state) => state.updateTitle);
  const updateCity = useAddCandidStore((state) => state.updateCity);
  const updateCompanyName = useAddCandidStore((state) => state.updateCompanyName);
  const updateWebsite = useAddCandidStore((state) => state.updateWebsite);
  const updateCompanyDesc = useAddCandidStore((state) => state.updateCompanyDesc);
  const updateTech = useAddCandidStore((state) => state.updateTech);
  const updateStack = useAddCandidStore((state) => state.updateStack);
  const updateAddDate = useAddCandidStore((state) => state.updateAddDate);

  const removeTech = useAddCandidStore((state) => state.removeTech);
  const postCandid = useAddCandidStore((state) => state.postCandid);

  const lookupUrl = useAddCandidStore((state) => state.lookupUrl);
  const reset = useAddCandidStore((state) => state.reset);

  return (
    <div className={`${loading && "animate-pulse"} p-4 pb-6 border rounded shadow-sm flex flex-col gap-2`}>
      <div className="">
        <label htmlFor="url" className="pl-1"> url </label>
        <div className="flex items-center gap-2">
          <input id="url"
            type="text"
            placeholder="url of the offer"
            className="w-full p-1 block bg-gray-100 rounded"
            onChange={(e) => updateUrl(e.target.value)}
            value={url}
          />
          <Button onClick={() => lookupUrl()} >
            look up offer
          </Button>
        </div>

      </div>

      <div className="mt-2 flex gap-2">
        {/*TODO: add to state*/}
        <div className="flex items-center gap-2 border px-2">
          <input
            id="isCandidTech"
            type="checkbox"
          />
          <label htmlFor="isCandidTech" className="pr-1"> tech offer ? </label>
        </div>

        {/*TODO: add to state by default if url provided it has to be a response to an offer */}
        <div className="flex items-center gap-2 border px-2">
          <input
            id="unsolicited"
            type="checkbox"
          />
          <label htmlFor="unsolicited" > unsolicited ? </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <div className="">
          <label htmlFor="title" className="pl-1"> title </label>
          <input id="title"
            type="text"
            placeholder="title of the offer"
            className="w-full p-1 block bg-gray-100 rounded"
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
          />
        </div>

        <div className="">
          <label htmlFor="company" className="pl-1"> company </label>
          <input id="company"
            type="text"
            placeholder="company name"
            className="w-full p-1 block bg-gray-100 rounded"
            value={companyName}
            onChange={(e) => updateCompanyName(e.target.value)}
          />
        </div>

        <div className="">
          <label htmlFor="city" className="pl-1"> city </label>
          <input id="city"
            type="text"
            placeholder="city of the offer"
            className="w-full p-1 block bg-gray-100 rounded"
            value={city}
            onChange={(e) => updateCity(e.target.value)}
          />
        </div>

        <div className="">
          <label htmlFor="website" className="pl-1"> website </label>
          <input id="website"
            type="text"
            placeholder="website of the offer"
            className="w-full p-1 block bg-gray-100 rounded"
            value={website}
            onChange={(e) => updateWebsite(e.target.value)}
          />
        </div>

        {companyDesc && (<div>
          <label htmlFor="companyDesc" className="pl-1"> company description </label>
          <input id="companyDesc"
            type="text"
            placeholder="brief summary on the company"
            className="w-full p-1 block bg-gray-100 rounded"
            value={companyDesc}
            onChange={(e) => updateCompanyDesc(e.target.value)}
          />
        </div>)}

        {contracts?.length > 0 && (
          <div className="flex flex-col">
            <label htmlFor="contract" className="pl-1"> contract type </label>
            <Select
              id="contract"
              defaultValue="default"
              value={contract}
              onValueChange={(v) => updateContract(v)}
            >
              <SelectTrigger
                className="w-full">
                <SelectValue placeholder="contract type" />
              </SelectTrigger>
              <SelectContent >
                <SelectItem className="text-xs" value="default">non specified</SelectItem>
                {contracts.map((contract, key) => <SelectItem key={key} className="text-xs" value={contract}>{contract}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <label htmlFor="addDate" className="pl-1"> add date </label>
          <input
            id="addDate"
            type="date"
            className="w-full p-1 block bg-gray-100 rounded"
            value={addDate}
            onChange={(e) => updateAddDate(e.target.value)}
          />
        </div>

      </div>

      <div className="pt-2">
        <label htmlFor="tech" className="pl-1 min-w-fit"> tech stack </label>
        <div className="flex gap-2 items-baseline">
          <input id="tech"
            type="text"
            placeholder="techs mentionned in this offer"
            className="w-full p-1 block bg-gray-100 rounded w-fit"
            value={tech}
            onChange={(e) => updateTech(e.target.value)}
          />
          <Button
            onClick={() => updateStack()}
            disabled={tech == ''}
          >
            add
          </Button>
        </div>
        {stack?.length > 0 && (
          <div className="flex gap-1 flex-wrap p-1 py-2">
            {stack.map((item, key) => (<Badge key={key} >{item}
              {<span
                onClick={() => removeTech(item)}
                className="ml-1 opacity-35 hover:opacity-100 hover:bg-orange-300 rounded border hover:border-orange-700 px-1 text-center text-orange-400"> x </span>}
            </Badge>))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <div className="flex justify-end">
          <Button onClick={() => postCandid()}
            disabled={true}
          >
            clear
          </Button>
        </div>

        <div className=" flex justify-end">
          <Button onClick={() => postCandid()}
            disabled={city == '' || companyName == '' || title == ''}
          >
            submit
          </Button>
        </div>
      </div>

    </div>
  )
}

{/* <p> */ }
{/*   {stack.reduce((acc, cur) => acc + ', ' + cur)} */ }
{/* </p> */ }
