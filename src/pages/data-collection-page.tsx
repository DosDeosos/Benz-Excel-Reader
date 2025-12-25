"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { PaginationControls } from "@/components/pagination-controls";
import { SortableHeader } from "@/components/sortable-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dataJson from "@/data/data.json";
import { useSearch } from "@/hooks/use-search";
import { useTableSorting } from "@/hooks/use-table-sorting";
import { DataItem } from "@/types/excel-data";
import { useEffect } from "react";

export default function DataCollectionPage() {
  const data: DataItem[] = dataJson as DataItem[];

  const { query, setQuery, filteredData } = useSearch(data, [
    "Hostname",
    "เลข ทรัพย์สิน",
    "Serial Number",
    "Asset Owner",
    "Location of Work",
  ]);

  const {
    paginatedData,
    sortColumn,
    sortDirection,
    toggleSort,
    currentPage,
    totalPages,
    pageSize,
    changePageSize,
    goToPage,
    nextPage,
    previousPage,
    resetToFirstPage,
    hasNextPage,
    hasPreviousPage,
    startIndex,
    endIndex,
    totalItems,
  } = useTableSorting({ data: filteredData, itemsPerPage: 10 });

  useEffect(() => {
    resetToFirstPage();
  }, [query, resetToFirstPage]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            การจัดการข้อมูล
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            ดูและจัดการคอลเลกชันข้อมูลของคุณ
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>คอลเลกชันข้อมูล</CardTitle>
                <CardDescription>
                  ทั้งหมด {filteredData.length} รายการที่พร้อมใช้งาน
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Input
                    placeholder="ค้นหาข้อมูล..."
                    className="pl-9"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-50">
                    <SortableHeader
                      column="Hostname"
                      label="Hostname"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={toggleSort}
                    />
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <SortableHeader
                      column="เลข ทรัพย์สิน"
                      label="เลข ทรัพย์สิน"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={toggleSort}
                    />
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    <SortableHeader
                      column="Serial Number"
                      label="Serial Number"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={toggleSort}
                    />
                  </TableHead>
                  <TableHead className="hidden xl:table-cell">
                    <SortableHeader
                      column="Asset Owner"
                      label="Asset Owner"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={toggleSort}
                    />
                  </TableHead>
                  <TableHead>
                    <SortableHeader
                      column="Location of Work"
                      label="Location"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={toggleSort}
                    />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow key={`${item.Hostname}-${index}`}>
                    <TableCell className="font-medium">
                      {item.Hostname}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item["เลข ทรัพย์สิน"] || "-"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {item["Serial Number"] || "-"}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      {item["Asset Owner"] || "-"}
                    </TableCell>
                    <TableCell>{item["Location of Work"] || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            onPrevious={previousPage}
            onNext={nextPage}
            hasPreviousPage={hasPreviousPage}
            hasNextPage={hasNextPage}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageSizeChange={changePageSize}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
}
