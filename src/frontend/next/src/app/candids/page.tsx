import { notFound } from 'next/navigation';

import { CandidList, CandidsActions } from '@/components/candid-components';
import { Pagination } from '@/components/page-elements';
import { getCandidsPageFiltered, ROUTES } from '@/lib';
import { CandidsPageSearchParams } from '@/types';
import { MonoLayoutTitle } from '@/components/layout/Mono';
import { extractPaginationData, makeCandidsPageFilters } from '@/lib/utils';

export default async function Page(props: { searchParams?: Promise<CandidsPageSearchParams> }) {
  const searchParams = await props.searchParams;
  const filters = makeCandidsPageFilters(searchParams);

  const data = await getCandidsPageFiltered(filters);
  if (!data) return notFound();

  const { content, ...pageableData } = data;
  const paginationProps = extractPaginationData(pageableData);

  // TODO: variant="detached" on monolayouttitle
  return (
    <div className="w-full">
      <MonoLayoutTitle title="Candidatures" className="bg-neutral-100 p-4 py-6 border rounded-3xl" />
      <CandidsActions />
      <CandidList candids={content} />
      <Pagination page={paginationProps} />
    </div>
  );
}
