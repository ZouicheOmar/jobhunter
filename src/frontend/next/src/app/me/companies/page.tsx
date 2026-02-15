import { notFound, redirect } from 'next/navigation';

import { CompanyPageSearchParams, UrlParams } from '@/types';
import { getCompanyPage } from '@/lib';

import { CompaniesPageFilters, CompaniesPageList } from '@/components/companies';
import { Pagination } from '@/components/page-elements';
import { MonoLayoutTitle } from '@/components/layout/Mono';

export default async function Page(props: { searchParams?: Promise<CompanyPageSearchParams> }) {
  const searchParams = await props.searchParams;
  if (Object.keys(searchParams).length == 0) redirect('/company?page=0');

  const pageNumber = Number(searchParams?.page) || 0;
  const orderByDateApply = Boolean(searchParams?.orderByDateApply) || true;

  const data = await getCompanyPage(pageNumber, orderByDateApply);
  if (!data) return notFound();
  console.log(data);

  const { content, page } = data;
  const urlParams: UrlParams = {
    path: '/company',
    searchParams: searchParams,
  };

  return (
    <>
      <MonoLayoutTitle title="companies" />
      <CompaniesPageFilters />
      <CompaniesPageList data={content} />
      <Pagination page={page} urlParams={urlParams} />
    </>
  );
}
