"use client";

import { useMemo, useState } from "react";

export function useSearch<T>(data: T[], searchKeys: (keyof T)[]) {
  const [query, setQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!query) return data;

    const lowerQuery = query.toLowerCase();

    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerQuery);
      })
    );
  }, [data, query, searchKeys]);

  return {
    query,
    setQuery,
    filteredData,
  };
}
