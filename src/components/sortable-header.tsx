"use client";

import { SortDirection } from "@/hooks/use-table-sorting";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface SortableHeaderProps<T> {
  column: keyof T;
  label: string;
  sortColumn: keyof T | null;
  sortDirection: SortDirection;
  onSort: (column: keyof T) => void;
}

export function SortableHeader<T>({
  column,
  label,
  sortColumn,
  sortDirection,
  onSort,
}: SortableHeaderProps<T>) {
  const isActive = sortColumn === column;

  const getSortIcon = () => {
    if (!isActive) {
      return <ArrowUpDown className="h-3 w-3" />;
    }
    if (sortDirection === "asc") {
      return <ArrowUp className="h-3 w-3" />;
    }
    if (sortDirection === "desc") {
      return <ArrowDown className="h-3 w-3" />;
    }
    return <ArrowUpDown className="h-3 w-3" />;
  };

  return (
    <button
      onClick={() => onSort(column)}
      className={`flex items-center gap-2 font-semibold text-sm transition-colors ${
        isActive
          ? "text-slate-900 dark:text-slate-100"
          : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
      }`}
    >
      {label}
      {getSortIcon()}
    </button>
  );
}
