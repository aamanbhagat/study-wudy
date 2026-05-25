"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { format, subDays, startOfWeek, addDays, getMonth } from "date-fns";
import { cn } from "@/lib/utils";

interface HeatmapDay {
  date: string;
  minutes: number;
}

interface HeatmapProps {
  data?: HeatmapDay[];
  days?: number;
}

function intensity(minutes: number) {
  if (minutes <= 0) return "bg-slate-100 dark:bg-slate-800";
  if (minutes < 30) return "bg-emerald-200 dark:bg-emerald-900/60";
  if (minutes < 90) return "bg-emerald-400 dark:bg-emerald-700";
  if (minutes < 180) return "bg-emerald-500 dark:bg-emerald-600";
  return "bg-emerald-600 dark:bg-emerald-500";
}

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function ContributionHeatmap({ data = [], days = 365 }: HeatmapProps) {
  const { weeks, monthLabels } = useMemo(() => {
    const map = new Map(data.map((d) => [d.date, d.minutes] as const));
    const today = new Date();
    const start = startOfWeek(subDays(today, days - 1), { weekStartsOn: 0 });
    const totalCells = days + subDays(today, days - 1).getDay();
    const weekCount = Math.ceil(totalCells / 7) + 1;

    const weeks: ({ date: Date; minutes: number } | null)[][] = [];
    for (let i = 0; i < weekCount; i++) {
      const week: ({ date: Date; minutes: number } | null)[] = [];
      for (let j = 0; j < 7; j++) {
        const date = addDays(start, i * 7 + j);
        if (date > today) {
          week.push(null);
          continue;
        }
        const key = format(date, "yyyy-MM-dd");
        week.push({ date, minutes: map.get(key) ?? 0 });
      }
      if (week.some(Boolean)) weeks.push(week);
    }

    // Compute month labels: emit a label for the first week where a given month
    // first appears, but skip labels that would crowd a neighbour.
    const monthLabels: { weekIndex: number; label: string }[] = [];
    let lastMonth = -1;
    let lastLabeledWeek = -Infinity;
    weeks.forEach((week, wi) => {
      const firstReal = week.find((c): c is { date: Date; minutes: number } => c !== null);
      if (!firstReal) return;
      const m = getMonth(firstReal.date);
      if (m !== lastMonth) {
        // Need enough breathing room from the previous label (≥3 weeks)
        // and at least 2 weeks before the right edge.
        if (wi - lastLabeledWeek >= 3 && wi <= weeks.length - 2) {
          monthLabels.push({ weekIndex: wi, label: MONTH_NAMES[m] });
          lastLabeledWeek = wi;
        }
        lastMonth = m;
      }
    });

    return { weeks, monthLabels };
  }, [data, days]);

  const TILE = 10; // px
  const GAP = 3; // px
  const COL = TILE + GAP;

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto pb-1">
        <div className="inline-block">
          {/* Month labels */}
          <div
            className="relative ml-7 mb-1 text-[11px] text-muted-foreground"
            style={{ height: 14, width: weeks.length * COL }}
          >
            {monthLabels.map((m) => (
              <span
                key={`${m.weekIndex}-${m.label}`}
                className="absolute top-0"
                style={{ left: m.weekIndex * COL }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            {/* Day-of-week labels (Mon, Wed, Fri) */}
            <div className="flex flex-col text-[11px] leading-none text-muted-foreground" style={{ gap: GAP }}>
              {DAY_LABELS.map((d, i) => (
                <span key={i} className="flex items-center" style={{ height: TILE }}>
                  {d}
                </span>
              ))}
            </div>

            {/* Cells grid */}
            <div className="flex" style={{ gap: GAP }}>
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                  {week.map((cell, di) => {
                    if (!cell) {
                      return (
                        <span key={di} style={{ height: TILE, width: TILE }} aria-hidden />
                      );
                    }
                    const { date, minutes } = cell;
                    return (
                      <motion.div
                        key={di}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (wi * 7 + di) * 0.0008 }}
                        title={`${format(date, "MMM d, yyyy")} · ${minutes} min`}
                        style={{ height: TILE, width: TILE }}
                        className={cn("rounded-[2px]", intensity(minutes))}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
        <span>Less</span>
        <span style={{ height: TILE, width: TILE }} className="rounded-[2px] bg-slate-100 dark:bg-slate-800" />
        <span style={{ height: TILE, width: TILE }} className="rounded-[2px] bg-emerald-200 dark:bg-emerald-900/60" />
        <span style={{ height: TILE, width: TILE }} className="rounded-[2px] bg-emerald-400 dark:bg-emerald-700" />
        <span style={{ height: TILE, width: TILE }} className="rounded-[2px] bg-emerald-500 dark:bg-emerald-600" />
        <span style={{ height: TILE, width: TILE }} className="rounded-[2px] bg-emerald-600 dark:bg-emerald-500" />
        <span>More</span>
      </div>
    </div>
  );
}
