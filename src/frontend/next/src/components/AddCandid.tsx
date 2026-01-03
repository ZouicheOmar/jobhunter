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

import { getTodayDate, getHostname } from "@/lib/utils";
import { CONTRACT_TYPES } from "@/lib/consts";
import AddCandidCityInput from "./AddCandidCityInput";
import AddCandidWebsiteInput from "./AddCandidWebsiteInput";

export function AddCandid() {

  const loading = useAddCandidStore(useShallow((state) => state.loading));
  const toggle = useAddCandidStore((state) => state.toggle);

  const url = useAddCandidStore(useShallow((state) => state.url));
  const title = useAddCandidStore(useShallow((state) => state.title));
  const companyName = useAddCandidStore(useShallow((state) => state.companyName));
  const website = useAddCandidStore(useShallow((state) => state.website));
  const companyDesc = useAddCandidStore(useShallow((state) => state.companyDesc));
  const addDate = useAddCandidStore(useShallow((state) => state.addDate));

  const unsolicited = useAddCandidStore(useShallow((state) => state.unsolicited));
  const updateUnsolicited = useAddCandidStore(useShallow((state) => state.updateUnsolicited));

  const techOffer = useAddCandidStore(useShallow((state) => state.techOffer));
  const updateTechOffer = useAddCandidStore(useShallow((state) => state.updateTechOffer));

  const answer = useAddCandidStore(useShallow((state) => state.answer));
  const updateAnswer = useAddCandidStore(useShallow((state) => state.updateAnswer));

  const contract = useAddCandidStore(useShallow((state) => state.contract));
  const updateContract = useAddCandidStore(useShallow((state) => state.updateContract));

  const tech = useAddCandidStore((state) => state.tech);
  const stack = useAddCandidStore((state) => state.stack);

  const updateUrl = useAddCandidStore((state) => state.updateUrl);
  const updateTitle = useAddCandidStore((state) => state.updateTitle);
  const updateCompanyName = useAddCandidStore((state) => state.updateCompanyName);
  const updateWebsite = useAddCandidStore((state) => state.updateWebsite);
  const updateCompanyDesc = useAddCandidStore((state) => state.updateCompanyDesc);
  const updateTech = useAddCandidStore((state) => state.updateTech);
  const updateStack = useAddCandidStore((state) => state.updateStack);
  const updateAddDate = useAddCandidStore((state) => state.updateAddDate);
  const removeTech = useAddCandidStore((state) => state.removeTech);

  const postCandid = useAddCandidStore((state) => state.postCandid);
  const lookupUrl = useAddCandidStore((state) => state.lookupUrl);

  const addCandid = useCandidsStore((state) => state.addCandid);

  const reset = useAddCandidStore((state) => state.reset);

  return (
    <div className={`${loading && "animate-pulse"} p-4 border rounded shadow-sm flex flex-col gap-3`}>
      <div className="flex items-center gap-2">
        <input id="url"
          type="text"
          placeholder="url of the offer"
          className="w-full p-1 px-2 block bg-gray-100 rounded"
          onChange={(e) => updateUrl(e.target.value)}
          value={url}
        />
        <Button onClick={() => lookupUrl()} >
          look up offer
        </Button>
      </div>

      <div className="grid grid-rows-1 md:grid-rows-1 gap-3">
        <input
          type="text"
          className="p-1 px-2 block bg-gray-100 rounded"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => updateTitle(e.target.value)}
        />

        <input id="company"
          type="text"
          placeholder="Company Name"
          className="p-1 px-2 block bg-gray-100 rounded"
          value={companyName}
          onChange={(e) => updateCompanyName(e.target.value)}
        />

        <AddCandidCityInput />
        <AddCandidWebsiteInput />

        {companyDesc && (<div>
          <input id="companyDesc"
            type="text"
            placeholder="brief summary on the company"
            className="w-full p-1 px-2 block bg-gray-100 rounded"
            value={companyDesc}
            onChange={(e) => updateCompanyDesc(e.target.value)}
          />
        </div>)}

        <div className="col-span-2 flex gap-3">
          <div className="grow-1 flex px-2 gap-3 bg-gray-100 rounded items-center">
            <label className="min-w-fit leading-[2em] text-muted-foreground"> Application Date </label>
            <input
              id="addDate"
              type="date"
              placeholder="Apply date"
              className="w-full h-full grow-1 "
              value={addDate}
              onChange={(e) => updateAddDate(e.target.value)}
            />
          </div>

          <Select
            id="contract"
            defaultValue="default"
            value={contract}
            onValueChange={(v) => updateContract(v)}
          >
            <SelectTrigger className="grow-1 rounded border-none text-base">
              <SelectValue placeholder="Contract Type" />
            </SelectTrigger>

            <SelectContent >
              <SelectItem value="default">non specified</SelectItem>
              {CONTRACT_TYPES.map((contract, key) => <SelectItem key={key} className="text-base" value={contract}>{contract}</SelectItem>)}
            </SelectContent>

          </Select>
        </div>

      </div>

      <div >
        <div className="flex gap-2  items-baseline">
          <input id="tech"
            type="text"
            placeholder="Tech stack"
            className="w-full p-1 px-2 block bg-gray-100 rounded w-fit"
            value={tech}
            onChange={(e) => updateTech(e.target.value)}
          />
          <Button
            onClick={(e) => {
              updateStack();
              e.target.previousSibling.focus();
            }}
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

      <div className="flex">
        <div className="flex items-center gap-2 px-1">
          <input
            id="isCandidTech"
            type="checkbox"
            value={techOffer}
            onChange={(e) => updateTechOffer(e.target.checked)}
          />
          <label htmlFor="isCandidTech" className="text-muted-foreground"> tech offer ? </label>
        </div>

        <div className="flex items-center gap-2 px-2">
          <input
            id="unsolicited"
            type="checkbox"
            onChange={(e) => updateUnsolicited(e.target.checked)}
          />
          <label htmlFor="unsolicited" className="text-muted-foreground" > unsolicited ? </label>
        </div>
      </div>


      <div className="flex justify-between gap-2">
        <Button
          onClick={() => toggle()}
          className="bg-destructive/75 hover:bg-destructive"
        >
          {`close \u2717`}
        </Button>
        <div>
          <Button
            variant="secondary"
            onClick={() => reset()}
          >
            clear
          </Button>
          <Button
            className="ml-2"
            onClick={async () => {
              try {
                const candid = await postCandid()
                addCandid(candid);
              } catch (e) {
                console.log("error addind candid");
              }
            }}
          // disabled={city == '' || companyName == '' || title == ''}
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
