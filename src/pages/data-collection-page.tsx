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
import dataJson from "@/data/data.json";
import { usePagination } from "@/hooks/use-pagination";
import { useSearch } from "@/hooks/use-search";
import { DataItem } from "@/types/excel-data";
import { ArrowUpDown, Search } from "lucide-react";
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
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
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">
                      <button className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100">
                        Hostname
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <button className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100">
                        เลข ทรัพย์สิน
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <button className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100">
                        Serial Number
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <button className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100">
                        Asset Owner
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <button className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100">
                        Location
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr
                      key={`${item.Hostname}-${index}`}
                      className={`border-b last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                        index % 2 === 0
                          ? "bg-white dark:bg-slate-950"
                          : "bg-slate-50 dark:bg-slate-900"
                      }`}
                    >
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {item.Hostname}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item["เลข ทรัพย์สิน"] || "-"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item["Serial Number"] || "-"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item["Asset Owner"] || "-"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {item["Location of Work"] || "-"}
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
