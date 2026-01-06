import { CandidCard } from "./CandidCard";
import { CandidCompactCard } from "./CandidCompactCard";
import { useCandidStore } from "@/stores/useCandidStore";
import { useEffect } from "react";

import { Card, CardHeader, CardTitle } from "./schadcn/Card";

import { useActionStore } from "@/stores/useAction";
import { useControls } from "@/stores/useControls";

export const CandidList = () => {
  const candids = useCandidStore((state) => state.candids);
  const getCandids = useCandidStore((state) => state.getCandids);

  const currentPage = useActionStore((state) => state.currentPage);
  const perPage = 10;

  const compact = useControls((state) => state.compact);

  useEffect(() => {
    getCandids();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-2">
      {candids.length > 0 ? (
        candids
          .slice(
            currentPage * perPage,
            Math.min((currentPage + 1) * perPage, candids.length),
          )
          .map((candid, key) =>
            compact ? (
              <CandidCompactCard key={candid?.id || key} candid={candid} />
            ) : (
              <CandidCard key={candid?.id} candid={candid} />
            ),
          )
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>no results ..</CardTitle>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};
