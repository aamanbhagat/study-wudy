"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
  accent?: "navy" | "gold" | "math" | "cs" | "physics";
  delay?: number;
}

const ACCENTS = {
  navy: "bg-brand-navy/10 text-brand-navy",
  gold: "bg-brand-gold/15 text-brand-gold-dark",
  math: "bg-field-math-bg text-field-math",
  cs: "bg-field-cs-bg text-field-cs",
  physics: "bg-field-physics-bg text-field-physics",
} as const;

export function StatCard({ icon: Icon, label, value, hint, accent = "navy", delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
              <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
              {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
            </div>
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", ACCENTS[accent])}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
