import { useActionStore } from "@/stores/useAction";
import { Button } from "./schadcn/Button";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./schadcn/Paginator";

export const Paginator = () => {
  const totalPages = useActionStore((state) => state.totalPages);
  const currentPage = useActionStore((state) => state.currentPage);

  const updateCurrentPage = useActionStore((state) => state.updateCurrentPage);

  const goFirstPage = useActionStore((state) => state.goFirstPage);
  const goLastPage = useActionStore((state) => state.goLastPage);

  return (
    <Pagination>
      <PaginationContent className="select-none">
        <PaginationItem>
          <span onClick={() => goFirstPage()}>.. First</span>
        </PaginationItem>

        <PaginationItem onClick={() => updateCurrentPage(currentPage - 1)}>
          <PaginationPrevious />
        </PaginationItem>

        {currentPage >= 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>{currentPage + 1}</PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem onClick={() => updateCurrentPage(currentPage + 1)}>
          <PaginationNext />
        </PaginationItem>

        <PaginationItem>
          <span onClick={() => goLastPage()}>.. Last</span>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

// <div className="flex gap-2 justify-center">
//   {
//     [...Array(totalPages).keys()].map((item, key) => (<Button key={key}>{item + 1}</Button>))
//   }
// </div>
