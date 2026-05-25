"use client";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const LEVELS = [
  { level: 0, label: "Not started", className: "bg-knowledge-0 text-slate-700" },
  { level: 1, label: "Heard of it", className: "bg-knowledge-1 text-red-900" },
  { level: 2, label: "Familiar", className: "bg-knowledge-2 text-yellow-900" },
  { level: 3, label: "Working knowledge", className: "bg-knowledge-3 text-green-900" },
  { level: 4, label: "Proficient", className: "bg-knowledge-4 text-emerald-900" },
  { level: 5, label: "Mastered", className: "bg-knowledge-5 text-white" },
] as const;

interface KnowledgeBadgeProps {
  level: 0 | 1 | 2 | 3 | 4 | 5;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function KnowledgeBadge({ level, size = "md", showLabel = false, className }: KnowledgeBadgeProps) {
  const meta = LEVELS[level];
  const sizes = {
    sm: "h-5 min-w-5 px-1.5 text-[10px]",
    md: "h-6 min-w-6 px-2 text-xs",
    lg: "h-8 min-w-8 px-3 text-sm",
  };

  const badge = (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-full font-semibold",
        meta.className,
        sizes[size],
        className,
      )}
    >
      <span>{level}</span>
      {showLabel && <span className="font-medium">· {meta.label}</span>}
    </span>
  );

  if (showLabel) return badge;
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent>{meta.label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
