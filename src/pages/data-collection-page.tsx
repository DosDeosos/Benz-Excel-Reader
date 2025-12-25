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
import dataJson from "@/data/data.json";
import { DataItem } from "@/types/excel-data";
import { ArrowUpDown, Download, Filter, Search } from "lucide-react";

export default function DataCollectionPage() {
  const data: DataItem[] = dataJson as DataItem[];

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
                  ทั้งหมด {data.length} รายการที่พร้อมใช้งาน
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="ค้นหาข้อมูล..." className="pl-9" />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  ตัวกรอง
                </Button>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  ส่งออก
                </Button>
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
                  {data.map((item, index) => (
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
        </Card>
      </div>
    </DashboardLayout>
  );
}
