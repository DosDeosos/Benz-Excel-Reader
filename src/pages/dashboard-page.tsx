import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, DollarSign, TrendingUp, Users } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "รายได้รวม",
      value: "$45,231.89",
      change: "+20.1% จากเดือนที่แล้ว",
      icon: DollarSign,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-950",
    },
    {
      title: "ผู้ใช้ที่ใช้งาน",
      value: "2,350",
      change: "+180 ผู้ใช้ใหม่",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950",
    },
    {
      title: "คำสั่งซื้อทั้งหมด",
      value: "12,234",
      change: "+19% จากเดือนที่แล้ว",
      icon: BarChart3,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-950",
    },
    {
      title: "อัตราการเติบโต",
      value: "+12.5%",
      change: "เติบโตอย่างต่อเนื่อง",
      icon: TrendingUp,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-950",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 animate-in slide-in-from-left-4 fade-in duration-500">
            แดชบอร์ด
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 animate-in slide-in-from-left-4 fade-in duration-500 delay-100">
            ยินดีต้อนรับกลับมา! นี่คือภาพรวมของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="animate-in zoom-in-50 fade-in duration-500 fill-mode-backwards"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
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
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300">
            <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
              <CardHeader>
                <CardTitle>กิจกรรมล่าสุด</CardTitle>
                <CardDescription>กิจกรรมล่าสุดของระบบ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "ผู้ใช้ใหม่ลงทะเบียน", time: "2 นาทีที่แล้ว" },
                    {
                      action: "คำสั่งซื้อ #1234 เสร็จสมบูรณ์",
                      time: "15 นาทีที่แล้ว",
                    },
                    { action: "อัปเดตคลังสินค้า", time: "1 ชั่วโมงที่แล้ว" },
                    { action: "สร้างรายงาน", time: "2 ชั่วโมงที่แล้ว" },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/50 px-2 rounded-lg transition-colors cursor-default"
                    >
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {activity.action}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-500">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500">
            <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
              <CardHeader>
                <CardTitle>สถิติด่วน</CardTitle>
                <CardDescription>ภาพรวมเมตริกประสิทธิภาพ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { label: "อัตราการแปลง", value: "3.2%", progress: 32 },
                    {
                      label: "มูลค่าคำสั่งซื้อเฉลี่ย",
                      value: "$89.50",
                      progress: 65,
                    },
                    {
                      label: "ความพึงพอใจของลูกค้า",
                      value: "94%",
                      progress: 94,
                    },
                    { label: "เวลาตอบสนอง", value: "1.2s", progress: 45 },
                  ].map((metric, index) => (
                    <div key={index} className="space-y-2 group">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {metric.label}
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-50">
                          {metric.value}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-linear-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-1000 ease-out group-hover:scale-x-[1.02] origin-left"
                          style={{ width: `${metric.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
