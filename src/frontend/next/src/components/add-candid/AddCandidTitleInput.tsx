import { useShallow } from "zustand/shallow";
import { useAddCandidStore } from "@/stores/use-add-candid/useAddCandid";
import { InputLabel } from "../ui-elements";

const cn = {
  base: "p-1 px-2 block bg-neutral-200 rounded",
  pending: (p: boolean) => (p ? "mr-[4px] w-[calc(100%-28px)]" : "w-full"),
};

export const AddCandidTitleInput = () => {
  const title = useAddCandidStore(useShallow((state) => state.title));
  const updateTitle = useAddCandidStore((state) => state.updateTitle);

  const sp = useAddCandidStore(useShallow((state) => state.scrapPending));

  return (
    <div>
      <InputLabel label="title" />
      <input
        type="text"
        className={`${cn.base} ${cn.pending(sp)}`}
        id="title"
        placeholder="Title on the job offering page"
        value={title}
        onChange={(e) => updateTitle(e.target.value)}
      />
    </div>
  );
};
