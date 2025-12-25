import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Package, Plus, Search, TrendingUp } from "lucide-react";

export default function InventoryPage() {
  const inventoryStats = [
    {
      title: "รายการทั้งหมด",
      value: "1,234",
      icon: Package,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950",
    },
    {
      title: "สต็อคต่ำ",
      value: "23",
      icon: AlertTriangle,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-950",
    },
    {
      title: "มีสินค้า",
      value: "1,187",
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-950",
    },
  ];

  const inventoryItems = [
    {
      sku: "SKU001",
      name: "แล็ปท็อป Dell XPS 15",
      category: "อิเล็กทรอนิกส์",
      quantity: 45,
      price: 1299.99,
      status: "มีสินค้า",
    },
    {
      sku: "SKU002",
      name: "เก้าอี้สำนักงาน Pro",
      category: "เฟอร์นิเจอร์",
      quantity: 12,
      price: 299.99,
      status: "สต็อคต่ำ",
    },
    {
      sku: "SKU003",
      name: "เมาส์ไร้สาย",
      category: "อุปกรณ์เสริม",
      quantity: 156,
      price: 29.99,
      status: "มีสินค้า",
    },
    {
      sku: "SKU004",
      name: "จอมอนิเตอร์ 27 นิ้ว",
      category: "อิเล็กทรอนิกส์",
      quantity: 8,
      price: 449.99,
      status: "สต็อคต่ำ",
    },
    {
      sku: "SKU005",
      name: "โคมไฟตั้งโต๊ะ LED",
      category: "แสงสว่าง",
      quantity: 89,
      price: 39.99,
      status: "มีสินค้า",
    },
    {
      sku: "SKU006",
      name: "คีย์บอร์ดเมคคานิคอล",
      category: "อุปกรณ์เสริม",
      quantity: 67,
      price: 129.99,
      status: "มีสินค้า",
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
                <CardDescription>จัดการสินค้าคงคลังของคุณ</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="ค้นหาคลังสินค้า..." className="pl-9" />
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  เพิ่มรายการ
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      SKU
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      ชื่อสินค้า
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      หมวดหมู่
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      ปริมาณ
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      ราคา
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      สถานะ
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      การดำเนินการ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item, index) => (
                    <tr
                      key={item.sku}
                      className={`border-b last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                        index % 2 === 0
                          ? "bg-white dark:bg-slate-950"
                          : "bg-slate-50 dark:bg-slate-900"
                      }`}
                    >
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {item.sku}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item.name}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item.quantity}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          ${item.price.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.status === "มีสินค้า"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            แก้ไข
                          </Button>
                          <Button variant="ghost" size="sm">
                            ดู
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
