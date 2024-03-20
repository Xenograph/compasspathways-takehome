"use client";

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
import { useSearchParams } from "next/navigation";

type Props = {
  more: boolean;
};

const Paginator: React.FC<Props> = ({ more }) => {
  const searchParams = useSearchParams();
  const pageNum = Number(searchParams.get('page')) || 1;
  const paramsObj = Object.fromEntries(searchParams.entries());

  return (
    <Pagination>
      <PaginationContent>
        {pageNum > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={{
                query: { ...paramsObj, page: pageNum - 1 },
              }}
            />
          </PaginationItem>
        )}
        {pageNum > 2 && (
          <>
            <PaginationItem>
              <PaginationLink
                href={{
                  query: { ...paramsObj, page: 1 },
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        {pageNum > 1 && (
          <PaginationItem>
            <PaginationLink
              href={{
                query: { ...paramsObj, page: pageNum - 1 },
              }}
            >
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
              <PaginationLink
                href={{
                  query: { ...paramsObj, page: pageNum + 1 },
                }}
              >
                {pageNum + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={{
                  query: { ...paramsObj, page: pageNum + 1 },
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
