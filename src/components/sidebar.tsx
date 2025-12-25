"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Database,
  LayoutDashboard,
  Package,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navigationItems = [
  {
    name: "แดชบอร์ด",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "ข้อมูล",
    href: "/data-collection",
    icon: Database,
  },
  {
    name: "คลังสินค้า",
    href: "/inventory",
    icon: Package,
  },
];

export function Sidebar({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] border-r transform transition-all duration-300 ease-spring",
          "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl supports-backdrop-filter:bg-white/60",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "lg:w-20" : "lg:w-72",
          "w-72 bg-linear-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900"
        )}
      >
        <div className="h-full flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 pointer-events-none" />

          <div className="h-16 flex items-center justify-between px-6 relative z-10">
            {!isCollapsed && (
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                เมนูหลัก
              </h2>
            )}
            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="hidden lg:flex hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:scale-105 transition-all"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-5 w-5 text-slate-500" />
                ) : (
                  <ChevronLeft className="h-5 w-5 text-slate-500" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2 relative z-10 scrollbar-hide">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden",
                      isActive
                        ? "text-white shadow-lg shadow-blue-500/25"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/50",
                      isCollapsed && "justify-center px-2"
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-600 dark:to-indigo-600 opacity-100" />
                    )}

                    <Icon
                      className={cn(
                        "h-5 w-5 transition-transform duration-300 relative z-10",
                        isActive
                          ? "scale-110"
                          : "group-hover:scale-110 group-hover:rotate-3",
                        isActive
                          ? "text-white"
                          : "text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      )}
                    />

                    {!isCollapsed && (
                      <span
                        className={cn(
                          "font-medium relative z-10 transition-all",
                          isActive ? "text-white" : ""
                        )}
                      >
                        {item.name}
                      </span>
                    )}

                    {!isActive && !isCollapsed && (
                      <div className="absolute inset-0 bg-linear-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
