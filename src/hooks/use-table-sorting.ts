"use client";

import { useCallback, useMemo, useState } from "react";

export type SortDirection = "asc" | "desc" | null;

interface UseTableSortingProps<T> {
  data: T[];
  itemsPerPage?: number;
}

export function useTableSorting<T>({
  data,
  itemsPerPage = 10,
}: UseTableSortingProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [pageSize, setPageSize] = useState(itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === "asc" ? 1 : -1;
      if (bValue == null) return sortDirection === "asc" ? -1 : 1;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();

      if (aString < bString) return sortDirection === "asc" ? -1 : 1;
      if (aString > bString) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));

  const paginatedData = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, validCurrentPage, pageSize]);

  const toggleSort = useCallback((column: keyof T) => {
    setSortColumn((prevColumn) => {
      if (prevColumn === column) {
        setSortDirection((prevDirection) => {
          if (prevDirection === "asc") return "desc";
          if (prevDirection === "desc") return null;
          return "asc";
        });
      } else {
        setSortDirection("asc");
      }
      return column;
    });

    setCurrentPage(1);
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(() => {
        const maxPages = Math.ceil(sortedData.length / pageSize);
        const newPage = Math.max(1, Math.min(page, maxPages));
        return newPage;
      });
    },
    [sortedData.length, pageSize]
  );

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => {
      const maxPages = Math.ceil(sortedData.length / pageSize);
      return prev < maxPages ? prev + 1 : prev;
    });
  }, [sortedData.length, pageSize]);

  const previousPage = useCallback(() => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const changePageSize = useCallback((newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  }, []);

  return {
    paginatedData,
    sortedData,
    sortColumn,
    sortDirection,
    toggleSort,
    currentPage: validCurrentPage,
    totalPages,
    pageSize,
    changePageSize,
    goToPage,
    nextPage,
    previousPage,
    resetToFirstPage,
    hasNextPage: validCurrentPage < totalPages,
    hasPreviousPage: validCurrentPage > 1,
    startIndex: (validCurrentPage - 1) * pageSize + 1,
    endIndex: Math.min(validCurrentPage * pageSize, sortedData.length),
    totalItems: sortedData.length,
  };
}
