import { useShallow } from "zustand/shallow";

import { useAddCandidStore } from "@/stores/use-add-candid/useAddCandid";

export const AddCandidBooleans = () => {
  const unso = useAddCandidStore(useShallow((state) => state.unsolicited));
  const upUnso = useAddCandidStore(
    useShallow((state) => state.updateUnsolicited)
  );

  const to = useAddCandidStore(useShallow((state) => state.techOffer));
  const upTo = useAddCandidStore(useShallow((state) => state.updateTechOffer));

  return (
    <div className="p-1">
      <div className="inline mr-4">
        <input
          id="isCandidTech"
          type="checkbox"
          defaultChecked={to}
          onChange={(e) => upTo(e.target.checked)}
          className="align-middle mr-1"
        />
        <label
          htmlFor="isCandidTech"
          className={`text-neutral-500 align-text-top ${
            to && "text-neutral-900"
          }`}
        >
          Tech offer
        </label>
      </div>

      <div className="inline">
        <input
          id="unso"
          type="checkbox"
          defaultChecked={unso}
          onChange={(e) => upUnso(e.target.checked)}
          className="align-middle mr-1"
        />
        <label
          htmlFor="Unso"
          className={`text-neutral-500 align-text-top ${
            unso && "text-neutral-900"
          }`}
        >
          Unsolicited
        </label>
      </div>
    </div>
  );
};
