import { Button } from "../schadcn/Button";
import { useAddCandidStore } from "@/stores/use-add-candid/useAddCandid";

export const AddCandidControls = () => {
  const postCandid = useAddCandidStore((state) => state.postCandid);
  const reset = useAddCandidStore((state) => state.reset);

  return (
    <div className="flex justify-between gap-2">
      <div>
        <button
          className="rounded p-2 px-4
          inline-block
          bg-neutral-300
          hover:bg-neutral-200
          transition-colors
          text-black leading-none 
          font-medium
          focus-visible:border-ring 
          focus-visible:ring-teal-400
          focus-visible:ring-[4px]"
          onClick={reset}
        >
          clear
        </button>
      </div>
      <button
        className="
        rounded p-2 px-4
          inline-block
          transition-colors
          text-white leading-none 
          bg-neutral-900
          hover:bg-neutral-800
          hover:outline
          hover:cursor-pointer
          hover:outline-2
          hover:outline-offset-2
          hover:outline-red-500
          font-medium
          focus-visible:border-ring 
          focus-visible:ring-teal-400
          focus-visible:ring-[4px]
        ml-2"
        onClick={postCandid}
        disabled={false}
      >
        submit
      </button>
    </div>
  );
};
