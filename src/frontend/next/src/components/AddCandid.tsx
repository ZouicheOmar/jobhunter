"use client";
import { ComponentProps } from "react";
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

const emptyCandid: CandidCreate = {
  title: "",
  url: "",
  unsolicited: false,
  techOffer: false,
  dateApply: "",
  answer: false,
  company: { id: -1, name: "" },
  city: { id: -1, name: "" },
  website: { id: -1, name: "" },
  contract: { type: CONTRACT_TYPES[CONTRACT_TYPES.length - 1], duration: 0 },
  stack: [{ id: -1, name: "" }],
};

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
    </div>
  );
}

export function AddCandid() {
  const loading = useAddCandidStore(useShallow((state) => state.loading));
  const toggle = useAddCandidStore((state) => state.toggle);

  const url = useAddCandidStore(useShallow((state) => state.url));
  const title = useAddCandidStore(useShallow((state) => state.title));
  // const companyDesc = useAddCandidStore(useShallow((state) => state.companyDesc));
  const dateApply = useAddCandidStore(useShallow((state) => state.dateApply));

  const unsolicited = useAddCandidStore(
    useShallow((state) => state.unsolicited),
  );
  const updateUnsolicited = useAddCandidStore(
    useShallow((state) => state.updateUnsolicited),
  );

  const techOffer = useAddCandidStore(useShallow((state) => state.techOffer));
  const updateTechOffer = useAddCandidStore(
    useShallow((state) => state.updateTechOffer),
  );

  const answer = useAddCandidStore(useShallow((state) => state.answer));
  const updateAnswer = useAddCandidStore(
    useShallow((state) => state.updateAnswer),
  );

  const contract = useAddCandidStore(useShallow((state) => state.contract));
  const updateContract = useAddCandidStore(
    useShallow((state) => state.updateContract),
  );

  const updateUrl = useAddCandidStore((state) => state.updateUrl);
  const updateTitle = useAddCandidStore((state) => state.updateTitle);

  const updateDateApply = useAddCandidStore((state) => state.updateDateApply);

  const lookupUrl = useAddCandidStore((state) => state.lookupUrl);

  return (
    <div
      className={`${loading && "animate-pulse"} p-4 border rounded shadow-sm flex flex-col gap-3`}
    >
      <div className="flex items-center gap-2">
        <input
          id="url"
          type="text"
          placeholder="url of the offer"
          className="w-full p-1 px-2 block bg-gray-100 rounded"
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

          <Select
            defaultValue="default"
            value={contract.type}
            onValueChange={(v) => updateContract({ type: v, duration: 0 })}
          >
            <SelectTrigger className="grow-1 rounded border-none text-base">
              <SelectValue placeholder="Contract Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="default">non specified</SelectItem>
              {CONTRACT_TYPES.map((contract, key) => (
                <SelectItem key={key} className="text-base" value={contract}>
                  {contract}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <AddCandidTechInput />

      <div className="flex">
        <div className="flex items-center gap-2 px-1">
          <input
            id="isCandidTech"
            type="checkbox"
            defaultChecked={techOffer}
            // value={Number(techOffer)}
            onChange={(e) => updateTechOffer(e.target.checked)}
          />
          <label htmlFor="isCandidTech" className="text-muted-foreground">
            {" "}
            tech offer ?{" "}
          </label>
        </div>

        <div className="flex items-center gap-2 px-2">
          <input
            id="unsolicited"
            type="checkbox"
            defaultChecked={unsolicited}
            // value={unsolicited}
            onChange={(e) => updateUnsolicited(e.target.checked)}
          />
          <label htmlFor="unsolicited" className="text-muted-foreground">
            {" "}
            unsolicited ?{" "}
          </label>
        </div>
      </div>

      <Controls />
    </div>
  );
}
