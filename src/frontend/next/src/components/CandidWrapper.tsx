'use client'

import { Controls } from "./Controls";
import { CandidList } from "./CandidList";
import { Title } from "./Title";
import { useEffect } from "react";
import { useGetCityQuery, useGetTechQuery } from "@/lib/candidsApi";



export const CandidWrapper = () => {
  const { data, error } = useGetCityQuery();
  const techs = useGetTechQuery();

  useEffect(() => {
    console.log(techs)
  }, [techs])

  return <>
    <div className="w-full">
      <Title />
      <Controls />
      <CandidList />
    </div>
  </>
}
