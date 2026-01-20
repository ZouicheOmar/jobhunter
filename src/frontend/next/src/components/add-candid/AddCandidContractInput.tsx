import { useShallow } from "zustand/shallow";
import { useAddCandidStore } from "@/stores/use-add-candid/useAddCandid";
import { CONTRACT_TYPES } from "@/lib";
import { HLine } from "../ui-elements";

export const AddCandidContractInput = () => {
  const contract = useAddCandidStore(useShallow((state) => state.contract));
  const updateContract = useAddCandidStore(
    useShallow((state) => state.updateContract)
  );

  return (
    <>
      <div>
        <div className="p-1">
          <p> Contract Type </p>
          <div className="pt-2">
            {CONTRACT_TYPES.map((c, key) => (
              <div
                key={key}
                className="
              border rounded mb-1 mr-1 px-2 py-1 inline-block hover:bg-blue-100
              hover:text-blue-900 hover:border-blue-300 hover:shadow-sm
              "
              >
                <input
                  type="radio"
                  name="contractType"
                  id={c}
                  value={contract.type}
                  onChange={(e) => updateContract({ type: c, duration: 0 })}
                  className="mr-1"
                />
                <label htmlFor={c} className="capitalize">
                  {c.replace("_", " ").toLowerCase()}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="p-1">
          <label htmlFor="contractDuration" className="align-text-top mr-2">
            Duration
          </label>
          <input
            id="contractDuration"
            type="number"
            value={contract.duration}
            min="0"
            max="36"
            className="rounded align-top mt-[1px] mr-2 border rounded px-2"
            onChange={(e) =>
              updateContract({ ...contract, duration: e.target.value })
            }
          />
          <span className="text-neutral-500 align-text-top italic">
            (in months)
          </span>
        </div>
      </div>
      <HLine />
    </>
  );
};
