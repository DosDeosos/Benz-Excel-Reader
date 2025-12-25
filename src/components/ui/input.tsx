import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-blue-600/20 selection:text-blue-600 dark:selection:text-blue-400 border-slate-200 dark:border-slate-800 h-10 w-full min-w-0 rounded-xl border bg-white/50 dark:bg-slate-950/50 px-3 py-1 text-base shadow-sm transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm backdrop-blur-sm",
        "focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 dark:focus-visible:ring-blue-500/20",
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/10 dark:aria-invalid:ring-red-500/20",
        "hover:border-slate-300 dark:hover:border-slate-700",
        className
      )}
      {...props}
    />
  );
}

export { Input };
