"use client";

import { useEffect, useState } from "react";
import Spinner from "./icons/Spinner";
import { Input } from "./ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";

const DEBOUNCE_MS = 500;
const SEARCH_PARAM = "search";
const PAGE_PARAM = "page";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get(SEARCH_PARAM) ?? "";

  const [searchFilter, setSearchFilter] = useState(currentFilter);

  const [debouncedSearchFilter] = useDebounce(searchFilter, DEBOUNCE_MS);

  useEffect(() => {
    if (debouncedSearchFilter === currentFilter) return;
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchFilter) params.set(SEARCH_PARAM, debouncedSearchFilter);
    else params.delete(SEARCH_PARAM);
    params.delete(PAGE_PARAM);
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearchFilter]);

  return (
    <div className="relative border-black max-w-md">
      <Input
        type="text"
        placeholder="Search customers..."
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
      />
      <div role="status" className="absolute top-2 right-2">
        {currentFilter !== searchFilter && <Spinner />}
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
