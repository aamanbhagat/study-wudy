"use client";

import { Flame } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StreakCounterProps {
  days: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StreakCounter({ days, size = "md", className }: StreakCounterProps) {
  const sizes = {
    sm: { wrapper: "gap-1.5 text-xs", icon: "h-3.5 w-3.5" },
    md: { wrapper: "gap-2 text-sm", icon: "h-4 w-4" },
    lg: { wrapper: "gap-2.5 text-base", icon: "h-5 w-5" },
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "inline-flex items-center rounded-full bg-orange-50 px-3 py-1 font-semibold text-orange-700 ring-1 ring-inset ring-orange-200",
        sizes[size].wrapper,
        className,
      )}
    >
      <Flame className={cn("text-orange-500", sizes[size].icon)} />
      <span>{days}</span>
      <span className="font-medium text-orange-600/80">day{days === 1 ? "" : "s"}</span>
    </motion.div>
  );
}
