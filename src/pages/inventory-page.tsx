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
import inventoryJson from "@/data/inventory.json";
import { usePagination } from "@/hooks/use-pagination";
import { useSearch } from "@/hooks/use-search";
import { InventoryItem } from "@/types/excel-data";
import { AlertTriangle, Package, TrendingUp } from "lucide-react";
import { useEffect } from "react";

export default function InventoryPage() {
  const inventoryData: InventoryItem[] = inventoryJson as InventoryItem[];

  const { query, setQuery, filteredData } = useSearch(inventoryData, [
    "TDM Inventory",
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

  const totalItems_all = inventoryData.reduce(
    (sum, item) => sum + (item["จำนวนที่มี"] || 0),
    0
  );
  const totalUsed = inventoryData.reduce(
    (sum, item) => sum + (item["เบิกใช้งาน"] || 0),
    0
  );
  const totalRemaining = inventoryData.reduce(
    (sum, item) => sum + (item["คงเหลือ"] || 0),
    0
  );

  const inventoryStats = [
    {
      title: "รายการทั้งหมด",
      value: totalItems_all.toLocaleString(),
      icon: Package,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950",
    },
    {
      title: "เบิกใช้งาน",
      value: totalUsed.toLocaleString(),
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-950",
    },
    {
      title: "คงเหลือ",
      value: totalRemaining.toLocaleString(),
      icon: AlertTriangle,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-950",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            คลังสินค้า
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            ติดตามและจัดการรายการสินค้าคงคลังของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inventoryStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.title}
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>รายการสินค้า</CardTitle>
                <CardDescription>
                  จัดการสินค้าคงคลังของคุณ ({filteredData.length} รายการ)
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Input
                    placeholder="ค้นหาคลังสินค้า..."
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
                      TDM Inventory
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      จำนวนที่มี
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      เบิกใช้งาน
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      คงเหลือ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => {
                    return (
                      <tr
                        key={`${item["TDM Inventory"]}-${index}`}
                        className={`border-b last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                          index % 2 === 0
                            ? "bg-white dark:bg-slate-950"
                            : "bg-slate-50 dark:bg-slate-900"
                        }`}
                      >
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {item["TDM Inventory"]}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-700 dark:text-slate-300">
                            {item["จำนวนที่มี"]?.toLocaleString() || 0}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-700 dark:text-slate-300">
                            {item["เบิกใช้งาน"]?.toLocaleString() || 0}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {item["คงเหลือ"]?.toLocaleString() || 0}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
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
