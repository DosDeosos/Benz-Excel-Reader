"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  closeAlert,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "@/lib/alerts";
import { useState } from "react";

export default function LoginPageComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    showLoadingAlert(
      "กำลังเข้าสู่ระบบ...",
      "กรุณารอสักครู่ขณะที่เรากำลังตรวจสอบข้อมูลของคุณ"
    );

    try {
      if (username && password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", username);

        closeAlert();
        await showSuccessAlert("เข้าสู่ระบบสำเร็จ!", "ยินดีต้อนรับกลับมา!");
        window.location.href = "/dashboard";
      } else {
        closeAlert();
        await showErrorAlert(
          "เข้าสู่ระบบไม่สำเร็จ",
          "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน"
        );
      }
    } catch {
      closeAlert();
      await showErrorAlert(
        "เกิดข้อผิดพลาด",
        "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-100 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-950 dark:to-black p-4 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[100px] animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[100px] animate-pulse delay-1000" />
      </div>

      <Card className="w-full max-w-md shadow-2xl border-white/20 dark:border-slate-800/50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl relative z-10 animate-in zoom-in-95 fade-in duration-500 hover:shadow-blue-500/10 hover:border-blue-500/20 transition-all">
        <CardHeader className="space-y-2 text-center pb-8">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white">
            ยินดีต้อนรับกลับมา
          </CardTitle>
          <CardDescription className="text-base text-slate-600 dark:text-slate-400">
            กรุณาใส่ข้อมูลเพื่อเข้าสู่ระบบ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-backwards">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1"
                >
                  ชื่อผู้ใช้
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="กรอกชื่อผู้ใช้ของคุณ"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-12 bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:border-blue-500 transition-all rounded-xl"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1"
                >
                  รหัสผ่าน
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="กรอกรหัสผ่านของคุณ"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:border-blue-500 transition-all rounded-xl"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="animate-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-backwards pt-2">
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold rounded-xl"
                variant="gradient"
                disabled={loading}
              >
                {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
