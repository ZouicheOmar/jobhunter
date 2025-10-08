import { useActionsStore } from "@/stores/useActions"
import { Button } from "./schadcn/Button"

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
  const totalPages = useActionsStore((state) => state.totalPages);
  const currentPage = useActionsStore((state) => state.currentPage);
  const incrCurrentPage = useActionsStore((state) => state.incrCurrentPage)
  const dcrCurrentPage = useActionsStore((state) => state.dcrCurrentPage)

  const goFirstPage = useActionsStore((state) => state.goFirstPage)
  const goLastPage = useActionsStore((state) => state.goLastPage)

  return (
    <Pagination>
      <PaginationContent className="select-none">

        <PaginationItem >
          <span onClick={() => goFirstPage()}>
            .. First
          </span>
        </PaginationItem>

        <PaginationItem onClick={() => dcrCurrentPage()}>
          <PaginationPrevious />
        </PaginationItem>

        {currentPage >= 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          {currentPage + 1}
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem onClick={() => incrCurrentPage()}>
          <PaginationNext />
        </PaginationItem>

        <PaginationItem >
          <span onClick={() => goLastPage()}>
            .. Last
          </span>
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}

// <div className="flex gap-2 justify-center">
//   {
//     [...Array(totalPages).keys()].map((item, key) => (<Button key={key}>{item + 1}</Button>))
//   }
// </div>
