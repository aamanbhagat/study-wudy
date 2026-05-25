"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import {
  Activity,
  BookOpen,
  Flame,
  Target,
  Trophy,
  Calendar,
} from "lucide-react";
import { format, subDays, startOfWeek, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CURRICULUM } from "@/lib/curriculum-data";
import {
  getDashboardStats,
  getDailyActivity,
  type DashboardStats,
} from "@/lib/dashboard-stats";
import { listSessions } from "@/lib/study-sessions";
import { listStudied } from "@/lib/studied-tracker";
import type { FieldKey, KnowledgeLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

const FIELD_HEX: Record<FieldKey, string> = {
  math: "#3B82F6",
  cs: "#10B981",
  physics: "#A855F7",
};

const FIELD_NAME: Record<FieldKey, string> = {
  math: "Math",
  cs: "CS",
  physics: "Physics",
};

const LEVEL_HEX: Record<KnowledgeLevel, string> = {
  0: "#E5E7EB",
  1: "#FCA5A5",
  2: "#FCD34D",
  3: "#86EFAC",
  4: "#34D399",
  5: "#059669",
};

interface SubtopicLevel {
  id: string;
  title: string;
  level: KnowledgeLevel;
}

interface FieldHeatmap {
  field: FieldKey;
  name: string;
  phases: { id: string; title: string; number: number; topics: { id: string; title: string; subtopics: SubtopicLevel[] }[] }[];
}

export default function ProgressPage() {
  const [tab, setTab] = useState("heatmap");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [studiedMap, setStudiedMap] = useState<Map<string, { totalSeconds: number; visitCount: number }>>(
    new Map(),
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStats(getDashboardStats());
    const map = new Map<string, { totalSeconds: number; visitCount: number }>();
    for (const e of listStudied()) {
      map.set(e.subtopicId, { totalSeconds: e.totalSeconds, visitCount: e.visitCount });
    }
    setStudiedMap(map);
    setHydrated(true);
  }, []);

  // Compute level per subtopic from real data: 0 = unstudied, 1 = visited once,
  // 2 = visited twice, 3 = visited 3+, 4 = 3+ visits & ≥10 min, 5 = 5+ visits & ≥30 min
  function computeLevel(subId: string): KnowledgeLevel {
    const s = studiedMap.get(subId);
    if (!s) return 0;
    if (s.visitCount >= 5 && s.totalSeconds >= 1800) return 5;
    if (s.visitCount >= 3 && s.totalSeconds >= 600) return 4;
    if (s.visitCount >= 3) return 3;
    if (s.visitCount >= 2) return 2;
    return 1;
  }

  const heatmapByField = useMemo<FieldHeatmap[]>(() => {
    return CURRICULUM.map((field) => ({
      field: field.key,
      name: field.name,
      phases: field.phases.map((phase) => ({
        id: phase.id,
        title: phase.title,
        number: phase.number,
        topics: phase.topics.map((t) => ({
          id: t.id,
          title: t.title,
          subtopics: t.subtopics.map((s) => ({
            id: s.id,
            title: s.title,
            level: computeLevel(s.id),
          })),
        })),
      })),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studiedMap]);

  const phaseStats = useMemo(() => {
    let levelSum = 0;
    let subCount = 0;
    let masteredCount = 0;
    for (const f of heatmapByField) {
      for (const p of f.phases) {
        for (const t of p.topics) {
          for (const s of t.subtopics) {
            subCount += 1;
            levelSum += s.level;
            if (s.level >= 4) masteredCount += 1;
          }
        }
      }
    }
    const overallPct = subCount > 0 ? Math.round((levelSum / (subCount * 5)) * 100) : 0;
    return { overallPct, masteredCount, subCount };
  }, [heatmapByField]);

  // Real chart data
  const timeData = useMemo(() => buildTimePerFieldPerWeek(), []);
  const velocityData = useMemo(() => buildSubtopicVelocity(), []);
  const dailyMinutesData = useMemo(() => buildDailyMinutes(), []);

  if (!hydrated || !stats) {
    return <p className="text-sm text-muted-foreground">Loading progress…</p>;
  }

  const totalHours = (stats.totalSeconds / 3600).toFixed(1);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Progress</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Real activity from your sessions, studied subtopics, and reviewed cards.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile
          icon={Activity}
          label="Total hours"
          value={totalHours}
          hint={`${stats.totalSessions} session${stats.totalSessions === 1 ? "" : "s"}`}
          tone="navy"
        />
        <StatTile
          icon={Flame}
          label="Current streak"
          value={String(stats.currentStreak)}
          hint={`longest ${stats.longestStreak}d`}
          tone="amber"
        />
        <StatTile
          icon={Trophy}
          label="Subtopics at L4+"
          value={String(phaseStats.masteredCount)}
          hint={`of ${phaseStats.subCount}`}
          tone="emerald"
        />
        <StatTile
          icon={Target}
          label="Curriculum %"
          value={`${phaseStats.overallPct}%`}
          hint="weighted by level"
          tone="gold"
        />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="heatmap">Knowledge heatmap</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="etas">Phase ETAs</TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap" className="mt-4 space-y-4">
          <KnowledgeHeatmap data={heatmapByField} />
          <HeatmapLegend />
        </TabsContent>

        <TabsContent value="charts" className="mt-4 grid gap-4 lg:grid-cols-2">
          <ChartCard title="Minutes per field per week" icon={Activity}>
            {timeData.length === 0 ? (
              <EmptyChart label="No sessions logged yet" />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <ChartTooltip />
                  <Bar dataKey="math" stackId="a" fill={FIELD_HEX.math} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="cs" stackId="a" fill={FIELD_HEX.cs} />
                  <Bar dataKey="physics" stackId="a" fill={FIELD_HEX.physics} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <ChartCard title="Daily minutes (last 30 days)" icon={Calendar}>
            {dailyMinutesData.every((d) => d.minutes === 0) ? (
              <EmptyChart label="No daily activity yet" />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={dailyMinutesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="dayLabel" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <ChartTooltip />
                  <Line type="monotone" dataKey="minutes" stroke="#1A3A6B" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <ChartCard title="Subtopics started per week" icon={BookOpen}>
            {velocityData.every((d) => d.topics === 0) ? (
              <EmptyChart label="No subtopics yet — start one in Curriculum Map" />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={velocityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <ChartTooltip />
                  <Bar dataKey="topics" fill="#1A3A6B" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <ChartCard title="Cumulative coverage by subject" icon={Target}>
            <div className="space-y-3 px-2 pt-2">
              {(["math", "cs", "physics"] as const).map((k) => {
                const f = stats.byField[k];
                return (
                  <div key={k} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{FIELD_NAME[k]}</span>
                      <span className="tabular-nums text-muted-foreground">
                        {f.studied}/{f.total} · {f.pct}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full"
                        style={{ width: `${f.pct}%`, backgroundColor: FIELD_HEX[k] }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {Math.round(f.totalSeconds / 60)} minutes invested
                    </p>
                  </div>
                );
              })}
            </div>
          </ChartCard>
        </TabsContent>

        <TabsContent value="etas" className="mt-4 space-y-3">
          {heatmapByField.map((f) => (
            <Card key={f.field}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-4 w-4 text-brand-navy" />
                  {f.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {f.phases.map((p) => {
                  const allSubs = p.topics.flatMap((t) => t.subtopics);
                  const total = allSubs.length;
                  const totalLevel = allSubs.reduce((s, x) => s + x.level, 0);
                  const pct = total > 0 ? Math.round((totalLevel / (total * 5)) * 100) : 0;
                  return (
                    <Link
                      key={p.id}
                      href="/curriculum"
                      className="flex items-center justify-between gap-3 rounded-md border p-3 transition-colors hover:bg-accent/30"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">
                          Phase {p.number} — {p.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {p.topics.length} topic{p.topics.length === 1 ? "" : "s"} · {total} subtopic{total === 1 ? "" : "s"}
                        </p>
                        <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
                          <div className="h-full bg-brand-navy" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {pct}%
                      </Badge>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  hint: string;
  tone: "navy" | "amber" | "emerald" | "gold";
}) {
  const tones: Record<string, string> = {
    navy: "bg-brand-navy/10 text-brand-navy",
    amber: "bg-amber-50 text-amber-700",
    emerald: "bg-emerald-50 text-emerald-700",
    gold: "bg-brand-gold/15 text-brand-gold-dark",
  };
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums">{value}</p>
            <p className="text-xs text-muted-foreground">{hint}</p>
          </div>
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", tones[tone])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChartCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Activity;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Icon className="h-4 w-4 text-brand-navy" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2 pr-3 pt-2">{children}</CardContent>
    </Card>
  );
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex h-[260px] items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
      {label}
    </div>
  );
}

function KnowledgeHeatmap({ data }: { data: FieldHeatmap[] }) {
  return (
    <div className="space-y-5">
      {data.map((field) => (
        <Card key={field.field}>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: FIELD_HEX[field.field] }} />
              {field.name}
            </CardTitle>
            <span className="text-xs text-muted-foreground">{FIELD_NAME[field.field]}</span>
          </CardHeader>
          <CardContent className="space-y-3">
            {field.phases.map((phase) => (
              <div key={phase.id} className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">
                  Phase {phase.number} — {phase.title}
                </p>
                <div className="flex flex-wrap gap-1">
                  {phase.topics.flatMap((t) =>
                    t.subtopics.map((s) => (
                      <Tooltip key={s.id}>
                        <TooltipTrigger asChild>
                          <Link
                            href={`/learn/${encodeURIComponent(s.id)}`}
                            className="block h-5 w-5 rounded-sm border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            style={{ backgroundColor: LEVEL_HEX[s.level] }}
                            aria-label={`${s.title} — level ${s.level}`}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <span className="block text-xs font-medium">{s.title}</span>
                          <span className="text-[10px] text-muted-foreground">
                            {t.title} · level {s.level} / 5
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    )),
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function HeatmapLegend() {
  return (
    <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
      <span>Level</span>
      {([0, 1, 2, 3, 4, 5] as KnowledgeLevel[]).map((l) => (
        <span key={l} className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm border" style={{ backgroundColor: LEVEL_HEX[l] }} />
          {l}
        </span>
      ))}
    </div>
  );
}

// ---- real data builders ----

function buildTimePerFieldPerWeek() {
  const sessions = listSessions();
  const out = new Map<string, { week: string; math: number; cs: number; physics: number; sortKey: number }>();
  for (const s of sessions) {
    const d = new Date(s.savedAt ?? s.startedAt);
    const w = startOfWeek(d, { weekStartsOn: 1 });
    const key = format(w, "yyyy-MM-dd");
    const label = format(w, "MMM d");
    const cur = out.get(key) ?? { week: label, math: 0, cs: 0, physics: 0, sortKey: w.getTime() };
    cur[s.field] += Math.round((s.accumSec ?? 0) / 60);
    out.set(key, cur);
  }
  return Array.from(out.values()).sort((a, b) => a.sortKey - b.sortKey).slice(-12);
}

function buildSubtopicVelocity() {
  const studied = listStudied();
  const out = new Map<string, { week: string; topics: number; sortKey: number }>();
  for (const e of studied) {
    const d = new Date(e.firstStudiedAt);
    const w = startOfWeek(d, { weekStartsOn: 1 });
    const key = format(w, "yyyy-MM-dd");
    const label = format(w, "MMM d");
    const cur = out.get(key) ?? { week: label, topics: 0, sortKey: w.getTime() };
    cur.topics += 1;
    out.set(key, cur);
  }
  // Pad with the last 8 weeks even if no data so the chart isn't all-zero
  const result = Array.from(out.values()).sort((a, b) => a.sortKey - b.sortKey);
  if (result.length === 0) {
    const now = new Date();
    for (let i = 7; i >= 0; i--) {
      const w = startOfWeek(subDays(now, i * 7), { weekStartsOn: 1 });
      result.push({ week: format(w, "MMM d"), topics: 0, sortKey: w.getTime() });
    }
  }
  return result.slice(-12);
}

function buildDailyMinutes() {
  const data = getDailyActivity(30);
  return data.map((d) => ({
    dayLabel: format(parseISO(d.date), "MMM d"),
    minutes: d.minutes,
  }));
}
