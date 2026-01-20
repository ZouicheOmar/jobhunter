import { Candid } from "@/types";
import { CandidCompactCard } from "./CandidCompactCard";

export const CandidList = ({ candids }: { candids: Candid[] }) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-1 justify-center gap-2">
      {candids.map((candid, key) => (
        <CandidCompactCard key={key} candid={candid} />
      ))}
    </div>
  );
};
