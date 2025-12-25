"use client";

import { useCallback, useMemo, useState } from "react";

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage?: number;
}

export function usePagination<T>({
  data,
  itemsPerPage = 10,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));

  const paginatedData = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, validCurrentPage, itemsPerPage]);

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(() => {
        const maxPages = Math.ceil(data.length / itemsPerPage);
        const newPage = Math.max(1, Math.min(page, maxPages));
        return newPage;
      });
    },
    [data.length, itemsPerPage]
  );

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => {
      const maxPages = Math.ceil(data.length / itemsPerPage);
      return prev < maxPages ? prev + 1 : prev;
    });
  }, [data.length, itemsPerPage]);

  const previousPage = useCallback(() => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage: validCurrentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    previousPage,
    resetToFirstPage,
    hasNextPage: validCurrentPage < totalPages,
    hasPreviousPage: validCurrentPage > 1,
    startIndex: (validCurrentPage - 1) * itemsPerPage + 1,
    endIndex: Math.min(validCurrentPage * itemsPerPage, data.length),
    totalItems: data.length,
  };
}
