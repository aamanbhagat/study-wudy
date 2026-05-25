"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface XPBarProps {
  xp: number;
  className?: string;
}

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 900, 1450, 2200, 3200, 4500, 6200, 8500];

function levelFromXp(xp: number) {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length - 1; i++) {
    if (xp >= LEVEL_THRESHOLDS[i] && xp < LEVEL_THRESHOLDS[i + 1]) {
      level = i + 1;
      const within = xp - LEVEL_THRESHOLDS[i];
      const range = LEVEL_THRESHOLDS[i + 1] - LEVEL_THRESHOLDS[i];
      return { level, within, range, nextAt: LEVEL_THRESHOLDS[i + 1] };
    }
  }
  const last = LEVEL_THRESHOLDS.length - 1;
  return { level: last + 1, within: xp - LEVEL_THRESHOLDS[last], range: 1, nextAt: xp };
}

export function XPBar({ xp, className }: XPBarProps) {
  const { level, within, range, nextAt } = levelFromXp(xp);
  const pct = Math.min(100, Math.round((within / range) * 100));

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-semibold text-brand-gold">Level {level}</span>
        <span className="text-muted-foreground">
          {xp.toLocaleString()} / {nextAt.toLocaleString()} XP
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-brand-gold to-brand-gold-light"
        />
      </div>
    </div>
  );
}
