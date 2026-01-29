import { Candid } from '@/types';
import { ExternalLink, Eye, Link as LinkIcon } from 'lucide-react';

import { formatBasicEntity as fb } from '@/lib/utils';
import Link from 'next/link';

const DetailedApplicationLink = ({ applicationId }: { applicationId: number }) => (
  <Link
    href={`/candid/${applicationId}`}
    id="link"
    className="inline-block rounded-md p-2 py-1
          transition-all bg-neutral-200 hover:bg-neutral-300 h-fit
          dalay-500 w-fit self-end"
  >
    <Eye size="1em" className="inline mr-[4px]" />
    <span className="inline-block">Detailed</span>
  </Link>
);

const JobOfferingPageLink = ({ jobOfferingUrl }: { jobOfferingUrl: string }) => (
  <Link
    href={jobOfferingUrl}
    id="link"
    className="inline-block rounded-md p-2 py-1 
          transition-all bg-neutral-200 hover:bg-neutral-300 h-fit
          dalay-500
          w-fit self-end
          "
  >
    <ExternalLink size="1em" className="inline mr-[4px]" />
    <span className="inline-block">Job offering page</span>
  </Link>
);

const Links = ({ applicationId, jobOfferingUrl }: { applicationId: number; jobOfferingUrl: string }) => (
  <div className="flex justify-end md:flex-col gap-2 md:gap-1" id="links">
    <DetailedApplicationLink applicationId={applicationId} />
    <JobOfferingPageLink jobOfferingUrl={jobOfferingUrl} />
  </div>
);

export const CandidCompactCard = ({ candid }: { candid: Candid }) => {
  const { id, title, answer, stack, url, website, unsolicited, city, company, contract, dateApply } = candid;

  return (
    <>
      <div
        className="border bg-neutral-100 flex flex-col gap-2 md:gap-1
        md:flex-row justify-between rounded-lg py-2 px-4 transition-height"
      >
        <div>
          <div>
            <span className="font-medium"> {title} </span>
            <br />
            <span className="uppercase"> {fb(company)}</span> {` \u2015 `}
            <span className="text-gray-700 capitalize">{fb(city)}</span>
          </div>

          <div className="flex w-full gap-3 text-gray-600">
            {contract.type && <span className="text-gray-400 "> {contract.type}</span>}

            {unsolicited && (
              <p className="inline text-blue-600 font-medium italic">
                Unsolicited <span className="text-neutral-500"> {`\u2015`} </span>
              </p>
            )}

            <span>Applied on {dateApply}</span>
          </div>
        </div>
        <Links jobOfferingUrl={url} applicationId={id} />
      </div>
    </>
  );
};
