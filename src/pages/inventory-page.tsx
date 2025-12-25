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
import inventoryJson from "@/data/inventory.json";
import { useSearch } from "@/hooks/use-search";
import { useTableSorting } from "@/hooks/use-table-sorting";
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
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-50">
                    <SortableHeader
                      column="TDM Inventory"
                      label="TDM Inventory"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={toggleSort}
                    />
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    <SortableHeader
                      column="จำนวนที่มี"
                      label="จำนวนที่มี"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={toggleSort}
                    />
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <SortableHeader
                      column="เบิกใช้งาน"
                      label="เบิกใช้งาน"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={toggleSort}
                    />
                  </TableHead>
                  <TableHead>
                    <SortableHeader
                      column="คงเหลือ"
                      label="คงเหลือ"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={toggleSort}
                    />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow key={`${item["TDM Inventory"]}-${index}`}>
                    <TableCell className="font-medium">
                      {item["TDM Inventory"]}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {item["จำนวนที่มี"]?.toLocaleString() || 0}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item["เบิกใช้งาน"]?.toLocaleString() || 0}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item["คงเหลือ"]?.toLocaleString() || 0}
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
