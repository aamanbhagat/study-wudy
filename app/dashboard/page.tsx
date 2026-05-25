"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Layers,
  PencilLine,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Calendar,
  ArrowRight,
  Flame,
  History,
} from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ContributionHeatmap } from "@/components/dashboard/ContributionHeatmap";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  getDashboardStats,
  getDailyActivity,
  getRecentStudied,
  getInProgressSessions,
  type DashboardStats,
} from "@/lib/dashboard-stats";
import type { StudiedEntry } from "@/lib/studied-tracker";
import type { SessionPayload } from "@/lib/study-sessions";
import { cn } from "@/lib/utils";

const FIELD_THEME = {
  math: { chip: "bg-field-math-bg text-field-math", bar: "bg-field-math", label: "Mathematics" },
  cs: { chip: "bg-field-cs-bg text-field-cs", bar: "bg-field-cs", label: "Computer Science" },
  physics: { chip: "bg-field-physics-bg text-field-physics", bar: "bg-field-physics", label: "Physics & Rocket Science" },
} as const;

const FIELD_BG: Record<string, string> = {
  math: "bg-field-math-bg text-field-math",
  cs: "bg-field-cs-bg text-field-cs",
  physics: "bg-field-physics-bg text-field-physics",
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<{ date: string; minutes: number }[]>([]);
  const [recentStudied, setRecentStudied] = useState<StudiedEntry[]>([]);
  const [inProgress, setInProgress] = useState<SessionPayload[]>([]);

  useEffect(() => {
    setStats(getDashboardStats());
    setActivity(getDailyActivity(365));
    setRecentStudied(getRecentStudied(6));
    setInProgress(getInProgressSessions().slice(0, 4));
  }, []);

  const today = new Date();
  const greeting = useMemo(() => {
    const h = today.getHours();
    if (h < 5) return "Up late";
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    if (h < 21) return "Good evening";
    return "Good night";
  }, [today]);

  if (!stats) {
    return (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Loading dashboard…</p>
      </div>
    );
  }

  const overallPct =
    stats.totalSubtopics > 0 ? Math.round((stats.studiedSubtopics / stats.totalSubtopics) * 100) : 0;
  const totalHoursThisWeek = (stats.weekMinutes / 60).toFixed(1);

  const insightLines = buildInsight(stats, inProgress[0] ?? null);

  return (
    <div className="space-y-8">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-sm text-muted-foreground">{format(today, "EEEE, MMMM d")}</p>
          <h1 className="text-3xl font-bold tracking-tight">{greeting}.</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {stats.currentStreak > 0 && (
            <Badge variant="secondary" className="gap-1.5 px-2.5 py-1">
              <Flame className="h-3.5 w-3.5 text-orange-500" /> {stats.currentStreak}-day streak
            </Badge>
          )}
          <Button asChild variant="brand" size="sm">
            <Link href="/study">
              {inProgress.length > 0 ? "Resume studying" : "Start studying"}{" "}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card className="border-brand-navy/10 bg-gradient-to-br from-brand-navy to-brand-navy-light text-white">
          <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gold/20 ring-1 ring-brand-gold/40">
              <Sparkles className="h-5 w-5 text-brand-gold" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
                Today&apos;s snapshot
              </p>
              <p className="mt-0.5 text-sm text-white/90">{insightLines.join(" ")}</p>
            </div>
            <Button asChild variant="gold" size="sm" className="shrink-0">
              <Link href={inProgress.length > 0 ? "/study" : "/curriculum"}>
                {inProgress.length > 0 ? "Resume" : "Pick a topic"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={Target}
          label="Subtopics studied"
          value={`${stats.studiedSubtopics}/${stats.totalSubtopics}`}
          hint={`${overallPct}% of curriculum`}
          accent="navy"
          delay={0}
        />
        <StatCard
          icon={Trophy}
          label="Total XP"
          value={stats.totalXp.toLocaleString()}
          hint={`Level ${stats.level}`}
          accent="gold"
          delay={0.05}
        />
        <StatCard
          icon={Layers}
          label="Cards reviewed"
          value={stats.cardsReviewed.toLocaleString()}
          hint={
            stats.cardsReviewed === 0
              ? "Open Review Cards to start"
              : `${stats.masteredCount} mastered`
          }
          accent="cs"
          delay={0.1}
        />
        <StatCard
          icon={TrendingUp}
          label="Hours this week"
          value={totalHoursThisWeek}
          hint={`${stats.todayMinutes}m today`}
          accent="physics"
          delay={0.15}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-brand-navy" /> In progress
              </CardTitle>
              <Badge variant="outline">{inProgress.length} paused</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {inProgress.length === 0 ? (
                <div className="rounded-md border border-dashed py-8 text-center text-sm text-muted-foreground">
                  No paused sessions. Start one and use{" "}
                  <span className="font-medium text-foreground">Save &amp; exit</span> to come back later.
                </div>
              ) : (
                inProgress.map((s, i) => (
                  <motion.div
                    key={s.sessionId}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                    className="flex items-center justify-between rounded-lg border bg-card p-3 transition-colors hover:bg-accent/40"
                  >
                    <div className="flex items-center gap-3">
                      <span className={cnFlag(FIELD_BG[s.field])}>{s.field.toUpperCase()}</span>
                      <div>
                        <p className="text-sm font-medium leading-tight">
                          {s.topicNumber} {s.topicTitle}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {s.subtopicTitle ?? "Whole topic"} ·{" "}
                          {Math.round((s.accumSec ?? 0) / 60)}m of {s.durationMinutes}m
                        </p>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/study/${s.sessionId}`}>Resume</Link>
                    </Button>
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-brand-navy" /> Coverage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(["math", "cs", "physics"] as const).map((k) => {
                const f = stats.byField[k];
                return (
                  <div key={k} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cnFlag(FIELD_THEME[k].chip)}>{FIELD_THEME[k].label}</span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {f.studied}/{f.total}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className={cn("h-full", FIELD_THEME[k].bar)}
                        style={{ width: `${f.pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {f.pct}% · {Math.round(f.totalSeconds / 60)}m studied
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-brand-navy" /> Activity (last 12 months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ContributionHeatmap data={activity} days={365} />
          </CardContent>
        </Card>
      </motion.div>

      {recentStudied.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <History className="h-5 w-5 text-brand-navy" /> Recently studied
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y rounded-md border">
                {recentStudied.map((e) => (
                  <li key={e.subtopicId}>
                    <Link
                      href={`/learn/${encodeURIComponent(e.subtopicId)}`}
                      className="flex items-center gap-3 px-3 py-2 text-sm transition-colors hover:bg-accent/40"
                    >
                      <Badge variant="outline" className={FIELD_BG[e.fieldKey]}>
                        {e.fieldKey}
                      </Badge>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 font-medium">{e.subtopicTitle}</p>
                        <p className="text-xs text-muted-foreground">{e.topicTitle}</p>
                      </div>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {Math.round(e.totalSeconds / 60)}m
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Separator />

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Quick actions
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <QuickAction href="/study" icon={BookOpen} label="Continue studying" tone="navy" />
          <QuickAction href="/cards" icon={Layers} label="Review cards" tone="cs" />
          <QuickAction href="/tests" icon={Brain} label="Take a test" tone="gold" />
          <QuickAction href="/notes" icon={PencilLine} label="Open notes" tone="physics" />
        </div>
      </motion.section>
    </div>
  );
}

function buildInsight(stats: DashboardStats, paused: SessionPayload | null): string[] {
  const lines: string[] = [];
  if (stats.totalSessions === 0) {
    lines.push(
      "Welcome — pick any subtopic in the Curriculum Map to start your first session.",
    );
    return lines;
  }
  const overallPct =
    stats.totalSubtopics > 0 ? Math.round((stats.studiedSubtopics / stats.totalSubtopics) * 100) : 0;
  lines.push(
    `You've studied ${stats.studiedSubtopics} subtopics (${overallPct}% of the curriculum) across ${stats.totalSessions} sessions.`,
  );
  if (stats.currentStreak >= 2) {
    lines.push(`${stats.currentStreak}-day streak going — keep it up.`);
  }
  if (paused) {
    lines.push(
      `Paused session: "${paused.topicTitle}" at ${Math.round((paused.accumSec ?? 0) / 60)}m.`,
    );
  } else if (stats.todayMinutes === 0) {
    lines.push("No study time logged today — even 15 minutes counts.");
  }
  return lines;
}

function cnFlag(extra: string) {
  return `inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${extra}`;
}

function QuickAction({
  href,
  icon: Icon,
  label,
  tone,
}: {
  href: string;
  icon: typeof BookOpen;
  label: string;
  tone: "navy" | "gold" | "cs" | "physics";
}) {
  const tones: Record<string, string> = {
    navy: "from-brand-navy to-brand-navy-light text-white",
    gold: "from-brand-gold to-brand-gold-light text-brand-navy",
    cs: "from-field-cs to-emerald-400 text-white",
    physics: "from-field-physics to-purple-400 text-white",
  };
  return (
    <Link
      href={href}
      className={`group flex items-center justify-between rounded-lg bg-gradient-to-br p-4 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md ${tones[tone]}`}
    >
      <span className="flex items-center gap-2.5 text-sm font-semibold">
        <Icon className="h-4 w-4" /> {label}
      </span>
      <ArrowRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
