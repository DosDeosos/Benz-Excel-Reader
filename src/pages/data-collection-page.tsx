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
import { ArrowUpDown, Download, Filter, Search } from "lucide-react";

export default function DataCollectionPage() {
  const sampleData = [
    {
      id: "D001",
      name: "การวิเคราะห์ผลิตภัณฑ์",
      category: "ขาย",
      records: 1250,
      lastUpdated: "2024-01-15",
    },
    {
      id: "D002",
      name: "พฤติกรรมลูกค้า",
      category: "การตลาด",
      records: 3420,
      lastUpdated: "2024-01-14",
    },
    {
      id: "D003",
      name: "บันทึกคลังสินค้า",
      category: "การดำเนินงาน",
      records: 892,
      lastUpdated: "2024-01-15",
    },
    {
      id: "D004",
      name: "รายงานทางการเงิน",
      category: "การเงิน",
      records: 567,
      lastUpdated: "2024-01-13",
    },
    {
      id: "D005",
      name: "การมีส่วนร่วมของผู้ใช้",
      category: "การวิเคราะห์",
      records: 2156,
      lastUpdated: "2024-01-15",
    },
    {
      id: "D006",
      name: "ประสิทธิภาพการขาย",
      category: "ขาย",
      records: 4321,
      lastUpdated: "2024-01-12",
    },
  ];

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
                  ทั้งหมด {sampleData.length} คอลเลกชันที่พร้อมใช้งาน
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
                        ไอดี
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <button className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100">
                        ชื่อ
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <button className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100">
                        หมวดหมู่
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <button className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100">
                        บันทึก
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <button className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100">
                        อัปเดตล่าสุด
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                        การดำเนินการ
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`border-b last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                        index % 2 === 0
                          ? "bg-white dark:bg-slate-950"
                          : "bg-slate-50 dark:bg-slate-900"
                      }`}
                    >
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {item.id}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item.name}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item.records.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {item.lastUpdated}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            ดู
                          </Button>
                          <Button variant="ghost" size="sm">
                            แก้ไข
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
