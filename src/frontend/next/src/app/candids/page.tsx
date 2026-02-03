import { notFound, redirect } from 'next/navigation';

import { CandidList, CandidsActions } from '@/components/candid-components';
import { Pagination } from '@/components/page-elements';
import { getCandidsPageFiltered } from '@/lib';
import { extractPaginationData, makeCandidsPageFilters } from '@/lib/utils';
import { UrlParams } from '@/types';
import { MonoLayoutTitle } from '@/components/layout/Mono';

export default async function Page(props: { searchParams?: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams;
  if (searchParams == undefined || Object.keys(searchParams).length == 0) redirect('/candids?page=0', 'replace');

  const filters = makeCandidsPageFilters(searchParams);
  const data = await getCandidsPageFiltered(filters);
  if (!data) return notFound();

  const { content, ...pageableData } = data;
  const paginationProps = extractPaginationData(pageableData);

  const urlParams: UrlParams = {
    path: '/candids',
    searchParams: searchParams,
  };

  return (
    <>
      <MonoLayoutTitle title="Candidatures" />
      <CandidsActions />
      <CandidList candids={content} />
      <Pagination page={paginationProps} urlParams={urlParams} />
    </>
  );
}
