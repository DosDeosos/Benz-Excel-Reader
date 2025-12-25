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
import logJson from "@/data/log.json";
import { useSearch } from "@/hooks/use-search";
import { useTableSorting } from "@/hooks/use-table-sorting";
import { LogItem } from "@/types/excel-data";
import { useEffect } from "react";

export default function LogPage() {
  const data: LogItem[] = logJson as LogItem[];

  const { query, setQuery, filteredData } = useSearch(data, [
    "Name-Surename  ผู้ขอเบิก",
    "Detail",
    "ผู้ให้เบิก",
    "ผู้รับเบิก",
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
            บันทึกการเบิก-คืน
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            ติดตามประวัติการเบิกและคืนอุปกรณ์
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  บันทึกการเบิก-คืน
                </CardTitle>
                <CardDescription>
                  ทั้งหมด {filteredData.length} รายการ
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Input
                    placeholder="ค้นหาบันทึก..."
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
                  <TableHead className="w-20">
                    <SortableHeader
                      column="No"
                      label="ลำดับ"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={toggleSort}
                    />
                  </TableHead>
                  <TableHead className="w-50">
                    <SortableHeader
                      column="Name-Surename  ผู้ขอเบิก"
                      label="ผู้ขอเบิก"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={toggleSort}
                    />
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <SortableHeader
                      column="Detail"
                      label="รายละเอียด"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={toggleSort}
                    />
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    <SortableHeader
                      column="ผู้ให้เบิก"
                      label="ผู้ให้เบิก"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={toggleSort}
                    />
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    <SortableHeader
                      column="ผู้รับเบิก"
                      label="ผู้รับเบิก"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={toggleSort}
                    />
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    <SortableHeader
                      column="วันที่คืน"
                      label="วันที่คืน"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={toggleSort}
                    />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow key={`${item.No}-${index}`}>
                    <TableCell>{item.No || "-"}</TableCell>
                    <TableCell className="font-medium">
                      {item["Name-Surename  ผู้ขอเบิก"] || "-"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.Detail || "-"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {item["ผู้ให้เบิก"] || "-"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {item["ผู้รับเบิก"] || "-"}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {item["วันที่คืน"]
                        ? new Date(item["วันที่คืน"]).toLocaleDateString(
                            "th-TH"
                          )
                        : "-"}
                    </TableCell>
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
