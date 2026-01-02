'use client'

import { Controls } from "./Controls";
import { CandidList } from "./CandidList";
import { Title } from "./Title";
import { AddCandid } from "./AddCandid";
import { Paginator } from "./Paginator";
import { TopInfo } from "./TopInfo";

import { useAddCandidStore } from "@/stores/useAddCandid";



export const CandidWrapper = () => {
  // this goes to useUI
  const showAddCandid = useAddCandidStore((state) => state.show);
  return <>
    <main className="w-full">
      <div className="w-full flex flex-col gap-4">
        <Title />
        <Controls />
        {/* rename to stats <TopInfo /> */}
        {showAddCandid && <AddCandid />}
        <CandidList />
        <Paginator />
      </div>
    </main>
  </>
}
