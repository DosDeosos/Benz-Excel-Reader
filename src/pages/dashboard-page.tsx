"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import inventoryJson from "@/data/inventory.json";
import { InventoryItem } from "@/types/excel-data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardPage() {
  const inventoryData: InventoryItem[] = inventoryJson as InventoryItem[];

  const totalItems = inventoryData.reduce(
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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            แดชบอร์ด
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            ภาพรวมสินค้าคงคลังและสถิติ
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                จำนวนทั้งหมด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {totalItems.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                เบิกใช้งานแล้ว
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {totalUsed.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                คงเหลือในคลัง
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {totalRemaining.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bar Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>สถานะสินค้าคงคลัง</CardTitle>
            <CardDescription>
              เปรียบเทียบจำนวนที่มีทั้งหมด, เบิกใช้งาน, และคงเหลือ แยกตามประเภท
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart
                data={inventoryData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 70,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-700"
                />
                <XAxis
                  dataKey="TDM Inventory"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                  tick={{ fontSize: 12, fill: "currentColor" }}
                  className="text-slate-600 dark:text-slate-400"
                  stroke="currentColor"
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "currentColor" }}
                  className="text-slate-600 dark:text-slate-400"
                  stroke="currentColor"
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    backgroundColor: "#ffffff",
                    color: "#1e293b",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{
                    color: "hsl(var(--foreground))",
                  }}
                />
                <Bar
                  dataKey="จำนวนที่มี"
                  name="จำนวนทั้งหมด"
                  fill="#94a3b8"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="เบิกใช้งาน"
                  name="เบิกใช้งาน"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="คงเหลือ"
                  name="คงเหลือ"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
