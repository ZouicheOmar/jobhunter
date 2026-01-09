import { ServerCandidList } from "@/components/serverComponents/ServerCandidList";
import { ServerCandidsActions } from "@/components/serverComponents/ServerCandidsActions";
import { ROUTES } from "@/lib";
import { Candid } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type JobhunterCandidSearchParams = {
  page?: string;
};

interface PageMetaData {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

type CandidsPages = {
  content: Candid[];
  page: PageMetaData;
};

// TODO how to type a function that can throw an error
async function getCandidsPage(page: number): Promise<CandidsPages | null> {
  const req = await fetch(ROUTES.API.CANDIDS.PAGE(page));
  if (req.status >= 400) return null;

  const json = await req.json();
  return json;
}

const PaginationItem = (
  { page, active }:
    { page: number; active?: boolean; href?: string }) => (
  <li >
    <Link
      data-active={active}
      className="
              border
px-[0.1em]
              inline-block
              text-center w-[2.2em]
              data-[active=true]:border-blue-500
              data-[active=true]:bg-blue-100
              data-[active=true]:shadow-sm
              hover:bg-neutral-200
              hover:shadow-sm 
        "
      href={`/candids?page=${page}`}
    > {page + 1} </Link>
  </li>
)

const PaginationElipsis = () => (<li> <span className="border inline-block text-center w-[2em] px-2" > ... </span> </li>);


const PaginationPrevious = ({ current }: { current: number }) => (
  <Link
    data-disabled={current == 0}
    className="border px-[0.4em]
      data-[disabled=true]:text-neutral-400
      data-[disabled=true]:cursor-default
      hover:data-[disabled=false]:bg-neutral-200
      hover:data-[disabled=false]:shadow-sm 
    "
    href={`/candids?page=${current - 1}`}
  >
    Previous
  </Link>
)

const PaginationNext = ({ current, max }: { current: number, max: number }) => (
  <Link
    data-disabled={current == max - 1}
    className="border px-[0.4em] 
      data-[disabled=true]:text-neutral-400
      data-[disabled=true]:cursor-default
      hover:data-[disabled=false]:bg-neutral-200
      hover:data-[disabled=false]:shadow-sm 
    "
    href={`/candids?page=${current + 1}`}
  >
    Next
  </Link>
)

const Pagination = ({ page }: { page: PageMetaData }) => {
  const { number, totalPages } = page;
  return (
    <nav className="mt-4 h-fit flex gap-2 justify-center items-center">
      <PaginationPrevious current={number} />
      <ul className="flex w-[18em] justify-center items-center gap-x-2" >
        {number > 0 && <PaginationItem page={0} />}
        {number > 1 && <PaginationElipsis />}
        {number > 1 && <PaginationItem page={number - 1} />}
        <PaginationItem page={number} active={true} />
        {number < totalPages - 1 && <PaginationItem page={number + 1} />}
        {totalPages - number > 2 && <>
          <PaginationElipsis />
          <PaginationItem page={totalPages - 1} />
        </>
        }
      </ul>
      <PaginationNext current={number} max={totalPages} />
    </nav>
  )
}

export default async function Page(props: {
  searchParams?: Promise<JobhunterCandidSearchParams>;
}) {
  const searchParams = await props.searchParams;
  const pageNumber = Number(searchParams?.page) || 0;

  const data = await getCandidsPage(pageNumber);
  if (!data) return notFound();

  const { content, page } = data;
  console.log(page);

  return (
    <div className="w-full">
      <ServerCandidsActions />
      <ServerCandidList candids={content} />
      <Pagination page={page} />
    </div >
  );
}
