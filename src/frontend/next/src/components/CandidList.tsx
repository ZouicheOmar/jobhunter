import { CandidCard } from "./CandidCard";
import { useDummyStore } from "@/stores/dummyStore";
import { useEffect } from "react";
import { Button } from "./schadcn/Button";

import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./schadcn/Card";
import { useActionsStore } from "@/stores/useActions";

export const CandidList = () => {
  const list = useDummyStore((state) => state.list);
  const filteredList = useDummyStore((state) => state.filteredList);
  const getAll = useDummyStore((state) => state.getAll);

  const currentPage = useActionsStore((state) => state.currentPage);
  const perPage = useActionsStore((state) => state.perPage);

  const cityFilter = useActionsStore((state) => state.cityFilter)
  const techFilter = useActionsStore((state) => state.techFilter)
  const reset = useActionsStore((state) => state.reset)

  useEffect(() => {
    getAll();
  }, [])


  return <>
    <div
      className="flex flex-col justify-center gap-2"
    >
      {
        filteredList.length > 1 ? (filteredList
          .slice(
            currentPage * perPage,
            Math.min((currentPage + 1) * perPage, filteredList.length))
          .map(candid =>
            <CandidCard
              key={candid.id}
              candid={candid}
            />
          ))
          : (<Card className="">
            <CardHeader >
              <CardTitle >
                no results ..
              </CardTitle>
              <CardDescription>
                Didn't find any results for
                <span className="font-semibold italic">
                  {cityFilter && ` ${cityFilter}`}
                </span>
                <span className="font-semibold italic">
                  {techFilter && ` and ${techFilter}`}
                </span>
              </CardDescription>
              <CardAction>
                <Button
                  onClick={() => reset()}
                  variant="outline"
                  size="sm"
                >
                  reset filters
                </Button>
              </CardAction>
            </CardHeader>
          </Card>)
      }
    </div>
  </>

}
