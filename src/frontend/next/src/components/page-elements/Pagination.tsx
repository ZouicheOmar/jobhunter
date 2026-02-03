import { PaginationProps, UrlParams } from '@/types';
import Link from 'next/link';

const PaginationItem = ({ page, active, href }: { page: number; active?: boolean; href: string }) => (
  <li>
    <Link
      data-active={active}
      className=" 
      inline-block 
      border rounded-full px-4 py-2
      data-[active=true]:border-blue-200 data-[active=true]:bg-blue-100
      data-[active=true]:shadow-sm hover:bg-neutral-100 hover:cursor-pointer transition-colors"
      href={href}
    >
      {page + 1}
    </Link>
  </li>
);

const PaginationElipsis = () => (
  <li>
    {' '}
    <span className="cursor-default inline-block text-center w-[2em] px-2"> ... </span>{' '}
  </li>
);

const PaginationPrevious = ({ isFirst, href }: { isFirst: boolean; href: string }) => (
  <Link
    data-disabled={isFirst}
    className="border p-4 rounded-full 
      data-[disabled=true]:text-neutral-400
      data-[disabled=true]:cursor-default
      hover:data-[disabled=false]:bg-neutral-100
    "
    href={href}
  >
    Previous
  </Link>
);

const PaginationNext = ({ isLast, href }: { isLast: boolean; href: string }) => (
  <Link
    data-disabled={isLast}
    className="border p-4 rounded-full 
      data-[disabled=true]:text-neutral-400
      data-[disabled=true]:cursor-default
      hover:data-[disabled=false]:bg-neutral-100"
    href={href}
  >
    Next
  </Link>
);

const gt = ({ path, searchParams }: UrlParams, n: number) => {
  let url = new URLSearchParams();
  let v = Object.keys(searchParams);
  if (v.length) {
    for (const i in v) {
      if (v[i] == 'page') url.append('page', n);
      else url.append(v[i], searchParams[v[i]]);
    }
  }
  return path + '?' + url;
};

export const Pagination = ({ page, urlParams }: { page: PaginationProps; urlParams: UrlParams }) => {
  const { number: n, totalPages, first, last, empty } = page;

  if (empty) return null;

  return (
    <nav className="my-12 h-fit flex gap-2 justify-center items-center">
      <ul className="flex w-fit min-w-[18em] justify-center items-center gap-x-2">
        <PaginationPrevious isFirst={first} href={gt(urlParams, n - 1)} />
        {n > 0 && <PaginationItem page={0} href={gt(urlParams, 0)} />}
        {n > 1 && <PaginationElipsis />}
        {n > 1 && <PaginationItem page={n - 1} href={gt(urlParams, n - 1)} />}
        <PaginationItem page={n} active={true} href={gt(urlParams, n)} />
        {n < totalPages - 1 && <PaginationItem page={n + 1} href={gt(urlParams, n + 1)} />}
        {totalPages - n > 2 && (
          <>
            <PaginationElipsis />
            <PaginationItem page={totalPages - 1} href={gt(urlParams, totalPages - 1)} />
          </>
        )}
      </ul>
      <PaginationNext isLast={last} href={gt(urlParams, n + 1)} />
    </nav>
  );
};
