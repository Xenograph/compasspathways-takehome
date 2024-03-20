import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "./ui/pagination";

type Props = {
  pageNum: number;
  more: boolean;
  searchParams: { [key: string]: string | string[] | undefined };
};

const Paginator: React.FC<Props> = ({ pageNum, more, searchParams }) => {
  return (
    <Pagination>
      <PaginationContent>
        {pageNum > 1 && (
          <PaginationItem>
            <PaginationPrevious href={{
                  query: { ...searchParams, page: pageNum - 1 },
                }} />
          </PaginationItem>
        )}
        {pageNum > 2 && (
          <>
            <PaginationItem>
              <PaginationLink href={{
                  query: { ...searchParams, page: 1 },
                }}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        {pageNum > 1 && (
          <PaginationItem>
            <PaginationLink href={{
                  query: { ...searchParams, page: pageNum - 1 },
                }}>
              {pageNum - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {pageNum}
          </PaginationLink>
        </PaginationItem>
        {more && (
          <>
            <PaginationItem>
              <PaginationLink href={{
                  query: { ...searchParams, page: pageNum + 1 },
                }}>
                {pageNum + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={{
                  query: { ...searchParams, page: pageNum + 1 },
                }}
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default Paginator;
