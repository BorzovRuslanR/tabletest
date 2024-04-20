import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  total: number;
  current: number;
  setCurrent: (value: number) => void;
};

export default function TablePagination({ total, current, setCurrent }: Props) {
  const activePageIndex = current - 1;
  const bias = activePageIndex - 1 < 0 ? 0 : activePageIndex - 1;
  const pages = Array.from({ length: total }, (_, i) => i);
  const showedPagesIndex =
    bias + 5 > pages.length ? pages.slice(-5) : pages.slice(bias, bias + 5);
  return (
    <Pagination>
      <PaginationContent>
        {activePageIndex > 0 && (
          <PaginationPrevious
            onClick={() => {
              setCurrent(current - 1);
            }}
            //   disabled={activePageIndex === 0}
          />
        )}
        {activePageIndex > 1 && showedPagesIndex[0] > 0 && (
          <PaginationEllipsis />
        )}
        {showedPagesIndex.map((pageIndex) => (
          <PaginationItem>
            <PaginationLink
              key={pageIndex}
              isActive={activePageIndex === pageIndex}
              onClick={() => {
                if (activePageIndex !== pageIndex) setCurrent(pageIndex + 1);
              }}
            >
              {pageIndex + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {activePageIndex < total - 2 &&
          showedPagesIndex.length &&
          total - 1 > showedPagesIndex[showedPagesIndex.length - 1] && (
            <PaginationEllipsis />
          )}
        {activePageIndex < total - 1 && (
          <PaginationNext
            onClick={() => {
              setCurrent(current + 1);
            }}
            //   disabled={activePageIndex === total - 1}
          />
        )}
      </PaginationContent>
    </Pagination>
  );
}
