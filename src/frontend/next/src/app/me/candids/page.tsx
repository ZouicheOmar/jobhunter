import { redirect, RedirectType } from 'next/navigation';

import { CandidList, CandidsActions } from '@/components/candid-components';
import { Pagination } from '@/components/page-elements';
import { apiClient, getCandidsPageFiltered, SESSION_COOKIE_NAME } from '@/lib';
import { extractPaginationData, makeCandidsPageFilters } from '@/lib/utils';
import { UrlParams } from '@/types';
import { MonoLayoutTitle } from '@/components/layout/Mono';
import { cookies } from 'next/headers';

const resourceUrl = 'http://localhost:3000/api/candids';

// const apiClient = async (url: string) => {
//   const cookieStore = await cookies();
//   const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
//
//   return fetch(url, {
//     headers: {
//       'x-jh-client-data': sessionCookie?.value,
//     },
//     credentials: 'include',
//   });
// };

export default async function Page(props: { searchParams?: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams;
  if (searchParams == undefined || Object.keys(searchParams).length == 0)
    redirect('/me/candids?page=0', RedirectType.replace);
  const filters = makeCandidsPageFilters(searchParams);

  // const data = await getCandidsPageFiltered(filters);

  const req = await apiClient(resourceUrl);
  const data = await req?.json();
  if (data) console.log(data);

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
