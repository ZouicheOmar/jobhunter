import { PageMetaData } from '@/types';
import Link from 'next/link';

const PaginationItem = ({ page, active }: { page: number; active?: boolean; href?: string }) => (
  <li>
    <Link
      data-active={active}
      className=" 
      inline-block 
      border rounded-full px-4 py-2
      data-[active=true]:border-blue-200 data-[active=true]:bg-blue-100
      data-[active=true]:shadow-sm hover:bg-neutral-100 hover:cursor-pointer transition-colors"
      href={`/candids?page=${page}`}
    >
      {page + 1}
    </Link>
  </li>
);

const PaginationElipsis = () => (
  <li>
    {' '}
    <span className="border cursor-default inline-block text-center w-[2em] px-2"> ... </span>{' '}
  </li>
);

const PaginationPrevious = ({ current }: { current: number }) => (
  <Link
    data-disabled={current == 0}
    className="border p-4 rounded-full 
      data-[disabled=true]:text-neutral-400
      data-[disabled=true]:cursor-default
      hover:data-[disabled=false]:bg-neutral-100
    "
    href={`/candids?page=${current - 1}`}
  >
    Previous
  </Link>
);

const PaginationNext = ({ current, max }: { current: number; max: number }) => (
  <Link
    data-disabled={current == max - 1}
    className="border p-4 rounded-full 
      data-[disabled=true]:text-neutral-400
      data-[disabled=true]:cursor-default
      hover:data-[disabled=false]:bg-neutral-100
    "
    href={`/candids?page=${current + 1}`}
  >
    Next
  </Link>
);

export const Pagination = ({ page }: { page: PageMetaData }) => {
  const { number, totalPages } = page;
  return (
    <nav className="my-12 h-fit flex gap-2 justify-center items-center">
      <PaginationPrevious current={number} />
      <ul className="flex w-[18em] justify-center items-center gap-x-2">
        {number > 0 && <PaginationItem page={0} />}
        {number > 1 && <PaginationElipsis />}
        {number > 1 && <PaginationItem page={number - 1} />}
        <PaginationItem page={number} active={true} />
        {number < totalPages - 1 && <PaginationItem page={number + 1} />}
        {totalPages - number > 2 && (
          <>
            <PaginationElipsis />
            <PaginationItem page={totalPages - 1} />
          </>
        )}
      </ul>
      <PaginationNext current={number} max={totalPages} />
    </nav>
  );
};
