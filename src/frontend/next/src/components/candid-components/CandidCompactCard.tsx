import { Candid } from '@/types';
import { ArrowBigRight, ArrowRight, ExternalLink, Eye, Link as LinkIcon, Trash } from 'lucide-react';

import { formatBasicEntity as fb } from '@/lib/utils';
import Link from 'next/link';
import { SetRejected } from './SetRejected';

const DetailedApplicationLink = ({ applicationId }: { applicationId: number }) => (
  <Link
    href={`/candid/${applicationId}`}
    id="link"
    className="inline-block rounded-full p-2
          transition-all bg-neutral-200 hover:bg-neutral-300 hover:text-black h-fit
          dalay-500 w-fit self-end"
  >
    <ArrowRight size="1.2em" strokeWidth={2} />
  </Link>
);

const JobOfferingPageLink = ({ jobOfferingUrl }: { jobOfferingUrl: string }) => (
  <Link
    href={jobOfferingUrl}
    id="link"
    className="inline-block rounded-md p-2 py-1 
          transition-all bg-neutral-200 hover:bg-neutral-300 h-fit
          dalay-500 hover:text-black
          w-fit self-end"
  >
    <ExternalLink size="1em" className="inline mr-[4px] mb-[2px]" />
    <span className="inline-block">Job offering page</span>
  </Link>
);

const Links = ({
  applicationId,
  jobOfferingUrl,
  rejected,
}: {
  applicationId: number;
  jobOfferingUrl: string;
  rejected: boolean;
}) => (
  <div className="flex justify-end md:flex-col gap-2 md:gap-1" id="links">
    <div className="flex justify-end gap-2 md:gap-1" id="links">
      {!rejected && <SetRejected applicationId={applicationId} />}
      <DetailedApplicationLink applicationId={applicationId} />
    </div>
    <JobOfferingPageLink jobOfferingUrl={jobOfferingUrl} />
  </div>
);

export const CandidCompactCard = ({ candid }: { candid: Candid }) => {
  const { id, title, answer, stack, url, website, rejected, unsolicited, city, company, contract, dateApply } = candid;

  return (
    <>
      <div
        className={`border 
          ${rejected ? 'bg-neutral-100/50 text-neutral-600 border-red-200' : 'bg-neutral-100'} 
          flex flex-col gap-2 md:gap-1
        md:flex-row justify-between rounded-lg py-2 px-4 transition-height`}
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
        <Links jobOfferingUrl={url} applicationId={id} rejected={rejected} />
      </div>
    </>
  );
};
