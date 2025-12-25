"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { PaginationControls } from "@/components/pagination-controls";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import logJson from "@/data/log.json";
import { usePagination } from "@/hooks/use-pagination";
import { useSearch } from "@/hooks/use-search";
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
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    previousPage,
    resetToFirstPage,
    hasNextPage,
    hasPreviousPage,
    startIndex,
    endIndex,
    totalItems,
  } = usePagination({ data: filteredData, itemsPerPage: 10 });

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
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      ลำดับ
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      ผู้ขอเบิก
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      รายละเอียด
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      ผู้ให้เบิก
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      ผู้รับเบิก
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      วันที่คืน
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr
                      key={`${item.No}-${index}`}
                      className={`border-b last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                        index % 2 === 0
                          ? "bg-white dark:bg-slate-950"
                          : "bg-slate-50 dark:bg-slate-900"
                      }`}
                    >
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item.No || "-"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {item["Name-Surename  ผู้ขอเบิก"] || "-"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item.Detail || "-"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item["ผู้ให้เบิก"] || "-"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item["ผู้รับเบิก"] || "-"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {item["วันที่คืน"]
                            ? new Date(item["วันที่คืน"]).toLocaleDateString(
                                "th-TH"
                              )
                            : "-"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
          />
        </Card>
      </div>
    </DashboardLayout>
  );
}
