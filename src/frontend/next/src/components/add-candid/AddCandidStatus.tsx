import { useAddCandidStore } from "@/stores/use-add-candid";
import { LoaderCircle } from "lucide-react";

const Load = () => (
  <LoaderCircle
    color="#c8c6c7"
    size="1em"
    strokeWidth="3"
    className="inline animate-spin"
  />
);

const StatusMessage = ({ message }: { message: string }) => (
  <li>
    <Load />
    <span className="ml-3">{message}...</span>
  </li>
);

export const AddCandidStatus = () => {
  const scrapPending = useAddCandidStore((s) => s.scrapPending);
  const llmExtractPending = useAddCandidStore((s) => s.llmExtractPending);
  const cedp = useAddCandidStore((s) => s.checkExistingDataPending);

  if (!scrapPending && !llmExtractPending && !cedp) return null;

  return (
    <div className="flex md:flex-row md:gap-6 border border-2 rounded-lg p-3">
      <ul className="list-inside">
        {scrapPending && (
          <StatusMessage message="Scrapping job posting page..." />
        )}
        {llmExtractPending && (
          <StatusMessage message="Extracting tech stack from job description..." />
        )}
        {cedp && <StatusMessage message="Retrieving existing data..." />}
      </ul>
    </div>
  );
};
