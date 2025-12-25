import { Button } from "@/components/ui/button";
import {
  closeAlert,
  showConfirmAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "@/lib/alerts";
import { LogOut, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

interface NavbarProps {
  onMenuClick: () => void;
  onToggleCollapse: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  const handleLogout = async () => {
    const confirmed = await showConfirmAlert(
      "ยืนยันการออกจากระบบ",
      "คุณแน่ใจหรือไม่ที่จะออกจากระบบ?",
      "ใช่, ออกจากระบบ",
      "ยกเลิก"
    );

    if (!confirmed) {
      return;
    }

    showLoadingAlert("กำลังออกจากระบบ...", "กรุณารอสักครู่");

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");

    closeAlert();
    await showSuccessAlert("ออกจากระบบสำเร็จ", "คุณได้ออกจากระบบเรียบร้อยแล้ว");

    router.push("/login");
    router.refresh();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="h-16 border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl sticky top-0 z-30 transition-all duration-300 supports-backdrop-filter:bg-white/60">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 min-[350px]:flex">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white">
              Benz&apos;s Excel Reader
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
              title={
                !mounted
                  ? "เปลี่ยนธีม"
                  : theme === "dark"
                    ? "เปลี่ยนเป็นโหมดสว่าง"
                    : "เปลี่ยนเป็นโหมดมืด"
              }
            >
              {!mounted ? (
                <Moon className="h-5 w-5 text-slate-500" />
              ) : theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] transition-all duration-300 rotate-0 scale-100" />
              ) : (
                <Moon className="h-5 w-5 text-slate-500 transition-all duration-300 rotate-0 scale-100" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2 rounded-full border-slate-200 dark:border-slate-800 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/30 dark:hover:text-red-400 dark:hover:border-red-900 transition-all duration-300"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">ออกจากระบบ</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
