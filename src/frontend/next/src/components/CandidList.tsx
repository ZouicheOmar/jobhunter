import { CandidCard } from "./CandidCard";
import { CandidCompactCard } from "./CandidCompactCard";
import { useCandidsStore } from "@/stores/useCandidsStore";
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
import { useControls } from "@/stores/useControls";

export const CandidList = () => {
  const list = useCandidsStore((state) => state.list);
  const filteredList = useCandidsStore((state) => state.filteredList);
  const getAll = useCandidsStore((state) => state.getAll);

  const currentPage = useActionsStore((state) => state.currentPage);
  const perPage = useActionsStore((state) => state.perPage);

  const cityFilter = useActionsStore((state) => state.cityFilter);
  const techFilter = useActionsStore((state) => state.techFilter);
  const reset = useActionsStore((state) => state.reset);

  const compact = useControls((state) => state.compact);

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
          .map((candid, key) => compact ? (
            <CandidCompactCard
              key={candid?.id || key}
              candid={candid}
            />) :
            (<CandidCard
              key={candid?.id}
              candid={candid}
            />)
          ))
          : (<Card>
            <CardHeader >
              <CardTitle >
                no results ..
              </CardTitle>
              {
                cityFilter != "default" && techFilter !== "default" && (
                  <>
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
                  </>
                )
              }
            </CardHeader>
          </Card>)
      }
    </div>
  </>

}
