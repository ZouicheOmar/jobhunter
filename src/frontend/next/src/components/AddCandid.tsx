"use client";
import { ComponentProps, useEffect } from "react";
import { Button } from "./schadcn/Button";
import { useShallow } from "zustand/shallow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./schadcn/Select";

import { useAddCandidStore } from "@/stores/useAddCandid";
import { useCandidStore } from "@/stores/useCandidStore";
import { postCandid } from "@/lib/api";
import { CONTRACT_TYPES } from "@/lib";
import { CandidCreate } from "@/types";
import { dateApplyValueAdapter } from "@/lib";

import AddCandidCityInput from "./AddCandidCityInput";
import AddCandidWebsiteInput from "./AddCandidWebsiteInput";
import AddCandidCompanyInput from "./AddCandidCompanyInput";
import AddCandidTechInput from "./AddCandidTechInput";
import { LLMExtractApiResponse } from "@/types/LLMExtractApiReponse";

const CloseButton = ({ onClick }: ComponentProps<"button">) => (
  <Button onClick={onClick} className="bg-destructive/75 hover:bg-destructive">
    {`close \u2717`}
  </Button>
);

function Controls() {
  const loading = useAddCandidStore(useShallow((state) => state.loading));

  const addCandid = useCandidStore((state) => state.addCandid);
  const toggle = useAddCandidStore((state) => state.toggle);
  const reset = useAddCandidStore((state) => state.reset);
  const postCandid = useAddCandidStore((state) => state.postCandid);

  return (
    <div className="flex justify-between gap-2">
      <div>
        <CloseButton onClick={toggle} />
        <Button
          className="ml-2 bg-secondary text-secondary-foreground hover:text-secondary"
          onClick={reset}
        >
          clear
        </Button>
      </div>
      <Button
        className="ml-2"
        onClick={async () => {
          try {
            const candid = await postCandid();
            addCandid(candid);
            toggle();
            console.log("candid", candid);
          } catch (e) {
            console.log("error addind candid");
          }
        }}
        // disabled={city == '' || companyName == '' || title == ''}
      >
        submit
      </Button>
    </div>
  );
}

const AddCandidBooleans = () => {
  const unso = useAddCandidStore(useShallow((state) => state.unsolicited));
  const upUnso = useAddCandidStore(
    useShallow((state) => state.updateUnsolicited)
  );

  const to = useAddCandidStore(useShallow((state) => state.techOffer));
  const upTo = useAddCandidStore(useShallow((state) => state.updateTechOffer));

  return (
    <div>
      <div className="inline mr-4">
        <input
          id="isCandidTech"
          type="checkbox"
          defaultChecked={to}
          onChange={(e) => upTo(e.target.checked)}
          className="align-middle mr-1"
        />
        <label
          htmlFor="isCandidTech"
          className={`text-neutral-500 align-text-top ${
            to && "text-neutral-900"
          }`}
        >
          Tech offer
        </label>
      </div>

      <div className="inline">
        <input
          id="unso"
          type="checkbox"
          defaultChecked={unso}
          onChange={(e) => upUnso(e.target.checked)}
          className="align-middle mr-1"
        />
        <label
          htmlFor="Unso"
          className={`text-neutral-500 align-text-top ${
            unso && "text-neutral-900"
          }`}
        >
          Unsolicited
        </label>
      </div>
    </div>
  );
};

export function AddCandid() {
  const loading = useAddCandidStore(useShallow((state) => state.loading));
  const toggle = useAddCandidStore((state) => state.toggle);

  const url = useAddCandidStore(useShallow((state) => state.url));
  const title = useAddCandidStore(useShallow((state) => state.title));
  // const companyDesc = useAddCandidStore(useShallow((state) => state.companyDesc));
  const dateApply = useAddCandidStore(useShallow((state) => state.dateApply));

  const answer = useAddCandidStore(useShallow((state) => state.answer));
  const updateAnswer = useAddCandidStore(
    useShallow((state) => state.updateAnswer)
  );

  const contract = useAddCandidStore(useShallow((state) => state.contract));
  const updateContract = useAddCandidStore(
    useShallow((state) => state.updateContract)
  );

  const updateUrl = useAddCandidStore((state) => state.updateUrl);
  const updateTitle = useAddCandidStore((state) => state.updateTitle);

  const updateDateApply = useAddCandidStore((state) => state.updateDateApply);

  const lookupUrl = useAddCandidStore((state) => state.lookupUrl);

  useEffect(() => {
    console.log("contract", contract);
  }, [contract]);

  return (
    <div
      className={`${
        loading ? "animate-pulse" : ""
      } relative p-4 border rounded shadow-sm flex flex-col gap-3`}
    >
      <div className="flex items-center gap-2">
        <input
          id="url"
          type="text"
          placeholder="url of the offer"
          className="w-full p-1 px-2 block bg-gray-100 rounded "
          onChange={(e) => updateUrl(e.target.value)}
          value={url}
        />
        <Button onClick={() => lookupUrl()}>look up offer</Button>
      </div>

      <div className="grid grid-rows-1 md:grid-rows-1 gap-3">
        <input
          type="text"
          className="h-fit p-1 px-2 block bg-gray-100 rounded"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => updateTitle(e.target.value)}
        />

        <AddCandidCompanyInput />
        <AddCandidCityInput />
        <AddCandidWebsiteInput />

        <div className="col-span-2 flex gap-3">
          <div className="grow-1 flex px-2 gap-3 bg-gray-100 rounded items-center">
            <label className="min-w-fit leading-[2em] text-muted-foreground">
              {" "}
              Application Date{" "}
            </label>
            <input
              id="dateApply"
              type="date"
              // defaultValue="2026-06-01"
              value={dateApply}
              onChange={(e) => updateDateApply(e.target.value)}
              className="w-full h-full grow-1 "
            />
          </div>
        </div>
      </div>

      <AddCandidTechInput />

      <div className="border p-1 [&_div]:inline [&_div]:mr-2">
        <p className="font-medium underline"> Contract Type : </p>
        {CONTRACT_TYPES.map((c, key) => (
          <div key={key}>
            <input
              type="radio"
              name="contractType"
              id={c}
              value={contract.type}
              onChange={(e) => updateContract({ type: c, duration: 0 })}
              className="align-top mr-2 mt-[5px]"
            />
            <label htmlFor={c} className="align-text-top capitalize">
              {c.replace("_", " ").toLowerCase()}
            </label>
          </div>
        ))}
      </div>
      <div className="border">
        <label htmlFor="contractDuration" className="align-text-top mr-2">
          Duration (months)
        </label>
        <input
          id="contractDuration"
          type="number"
          value={contract.duration}
          min="0"
          max="36"
          className="border rounded align-top mt-[2px]"
          onChange={(e) =>
            updateContract({ ...contract, duration: e.target.value })
          }
        />
      </div>

      <AddCandidBooleans />
      <Controls />
    </div>
  );
}
// <Select
//   defaultValue="default"
//   value={contract.type}
//   onValueChange={(v) => updateContract({ type: v, duration: 0 })}
// >
//   <SelectTrigger className="grow-1 rounded border-none text-base">
//     <SelectValue placeholder="Contract Type" />
//   </SelectTrigger>
//
//   <SelectContent position="popper" sticky="partial">
//     <SelectItem value="default">non specified</SelectItem>
//     {CONTRACT_TYPES.map((contract, key) => (
//       <SelectItem key={key} className="text-base" value={contract}>
//         {contract}
//       </SelectItem>
//     ))}
//   </SelectContent>
// </Select>
