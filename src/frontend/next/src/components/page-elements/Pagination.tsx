import { PageMetaData, PaginationProps, PagnisationProps } from '@/types';
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

const PaginationPrevious = ({ isFirst, number }: { isFirst: boolean; number: number }) => (
  <Link
    data-disabled={isFirst}
    className="border p-4 rounded-full 
      data-[disabled=true]:text-neutral-400
      data-[disabled=true]:cursor-default
      hover:data-[disabled=false]:bg-neutral-100
    "
    href={`/candids?page=${number - 1}`}
  >
    Previous
  </Link>
);

const PaginationNext = ({ isLast, number }: { isLast: boolean; number: number }) => (
  <Link
    data-disabled={isLast}
    className="border p-4 rounded-full 
      data-[disabled=true]:text-neutral-400
      data-[disabled=true]:cursor-default
      hover:data-[disabled=false]:bg-neutral-100"
    href={`/candids?page=${number + 1}`}
  >
    Next
  </Link>
);

export const Pagination = ({ page }: { page: PaginationProps }) => {
  const { number, totalPages, first, last, empty } = page;

  if (empty) return null;

  return (
    <nav className="my-12 h-fit flex gap-2 justify-center items-center">
      <ul className="flex w-fit min-w-[18em] justify-center items-center gap-x-2">
        <PaginationPrevious isFirst={first} number={number} />
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
      <PaginationNext isLast={last} number={number} />
    </nav>
  );
};
