import { Candid } from "@/types";
import { ServerCandidCompactCard } from "./ServerCandidCompactCard";

export const ServerCandidList = ({ candids }: { candids: Candid[] }) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-1 justify-center gap-2">
      {candids.map((candid, key) => (
        <ServerCandidCompactCard key={key} candid={candid} />
      ))}
    </div>
  );
};
