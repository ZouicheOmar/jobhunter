import { useSelector } from "react-redux"
import { CandidCard } from "./CandidCard";
import { CandidType } from "@/types/CandidType";

export const CandidList = () => {
  const candidsList: CandidType[] = useSelector(state => state.candids.list);
  const loading: Boolean = useSelector((state) => state.candids.loading)


  return <>
    {loading ?
      (<p> loading </p>)
      : (<div className="mt-4 flex flex-col justify-center gap-2" >
        {candidsList.map(candid =>
          <CandidCard
            key={candid.id}
            candid={candid}
          />
        )}
      </div>)
    }
  </>
}
