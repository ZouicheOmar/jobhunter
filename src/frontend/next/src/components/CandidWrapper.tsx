'use client'

import { Controls } from "./Controls";
import { CandidList } from "./CandidList";
import { Title } from "./Title";
import { AddCandid } from "./AddCandid";
import { useAddCandidStore } from "@/stores/useAddCandid";
import { useEffect } from "react";
import { Paginator } from "./Paginator";
import { TopInfo } from "./TopInfo";



export const CandidWrapper = () => {
  const showAddCandid = useAddCandidStore((state) => state.show);
  return <>
    <div className="w-full flex flex-col gap-4">
      <Title />
      <Controls />
      <TopInfo />
      {showAddCandid && <AddCandid />}
      <CandidList />
      <Paginator />
    </div>
  </>
}
