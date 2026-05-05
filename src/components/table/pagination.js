import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export function PaginationTable({
  page,
  totalPage,
  handleNext,
  handleBack,
  handlePageChange,
}) {
  const generatePages = () => {
    const pages = [];
    if (totalPage < 4) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      if (page < 2) {
        pages.push(1, 2, 3, "...", totalPage);
      } else if (page >= totalPage - 1) {
        pages.push(1, "...", totalPage - 2, totalPage - 1, totalPage);
      } else {
        pages.push(1, "...", page, "...", totalPage);
      }
    }
    return pages;
  };
  const pageToShow = generatePages();
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn("text-[5px]")}
            onClick={page === 1 ? undefined : handleBack}
          />
        </PaginationItem>
        {pageToShow.map((p, index) => (
          <PaginationItem key={index}>
            {p === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={p === page}
                onClick={() => {
                  if (p !== page) {
                    handlePageChange(p);
                  }
                }}
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={page === totalPage ? undefined : handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
