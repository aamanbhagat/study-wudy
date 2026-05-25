"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatDistanceToNow, startOfDay, isAfter, subDays } from "date-fns";
import {
  Activity,
  BookOpen,
  Calendar,
  History as HistoryIcon,
  Search,
  Target,
  Trophy,
  Trash2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listStudied, type StudiedEntry } from "@/lib/studied-tracker";
import { listSessions, deleteSession, type SessionPayload as StoredSession } from "@/lib/study-sessions";
import { CURRICULUM } from "@/lib/curriculum-data";
import type { FieldKey } from "@/lib/types";
import { cn } from "@/lib/utils";

const FIELD_THEME: Record<FieldKey, { chip: string; bar: string }> = {
  math: { chip: "bg-field-math-bg text-field-math", bar: "bg-field-math" },
  cs: { chip: "bg-field-cs-bg text-field-cs", bar: "bg-field-cs" },
  physics: { chip: "bg-field-physics-bg text-field-physics", bar: "bg-field-physics" },
};

type RangeFilter = "all" | "today" | "week" | "month";

export default function HistoryPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
      <HistoryInner />
    </Suspense>
  );
}

function HistoryInner() {
  const [studied, setStudied] = useState<StudiedEntry[]>([]);
  const [sessions, setSessions] = useState<StoredSession[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [search, setSearch] = useState("");
  const [field, setField] = useState<"all" | FieldKey>("all");
  const [range, setRange] = useState<RangeFilter>("all");

  function refresh() {
    setStudied(listStudied());
    setSessions(listSessions());
  }

  useEffect(() => {
    refresh();
    setHydrated(true);
  }, []);

  const cutoff = useMemo(() => {
    const now = new Date();
    if (range === "today") return startOfDay(now);
    if (range === "week") return subDays(now, 7);
    if (range === "month") return subDays(now, 30);
    return null;
  }, [range]);

  const filteredStudied = useMemo(() => {
    const q = search.trim().toLowerCase();
    return studied.filter((e) => {
      if (field !== "all" && e.fieldKey !== field) return false;
      if (cutoff && !isAfter(new Date(e.lastStudiedAt), cutoff)) return false;
      if (q) {
        const haystack = `${e.subtopicTitle} ${e.topicTitle}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [studied, field, cutoff, search]);

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      if (field !== "all" && s.field !== field) return false;
      const d = new Date(s.savedAt ?? s.startedAt);
      if (cutoff && !isAfter(d, cutoff)) return false;
      return true;
    });
  }, [sessions, field, cutoff]);

  const stats = useMemo(() => {
    const subtopicCount = filteredStudied.length;
    const topicSet = new Set(filteredStudied.map((e) => e.topicId));
    const totalSec = filteredStudied.reduce((s, e) => s + e.totalSeconds, 0);
    const sessionCount = filteredSessions.length;
    const completed = filteredSessions.filter((s) => s.status === "completed").length;
    const paused = filteredSessions.filter((s) => s.status === "paused").length;
    const byField = { math: 0, cs: 0, physics: 0 };
    for (const e of filteredStudied) byField[e.fieldKey] += 1;
    return { subtopicCount, topicCount: topicSet.size, totalSec, sessionCount, completed, paused, byField };
  }, [filteredStudied, filteredSessions]);

  // Group studied by topic for the per-topic breakdown
  const groupedByTopic = useMemo(() => {
    const map = new Map<
      string,
      { topicId: string; topicTitle: string; fieldKey: FieldKey; entries: StudiedEntry[]; totalSeconds: number; lastStudiedAt: string }
    >();
    for (const e of filteredStudied) {
      const cur = map.get(e.topicId);
      if (cur) {
        cur.entries.push(e);
        cur.totalSeconds += e.totalSeconds;
        if (new Date(e.lastStudiedAt) > new Date(cur.lastStudiedAt)) cur.lastStudiedAt = e.lastStudiedAt;
      } else {
        map.set(e.topicId, {
          topicId: e.topicId,
          topicTitle: e.topicTitle,
          fieldKey: e.fieldKey,
          entries: [e],
          totalSeconds: e.totalSeconds,
          lastStudiedAt: e.lastStudiedAt,
        });
      }
    }
    return Array.from(map.values()).sort(
      (a, b) => new Date(b.lastStudiedAt).getTime() - new Date(a.lastStudiedAt).getTime(),
    );
  }, [filteredStudied]);

  const totalSubtopicsInCurriculum = useMemo(
    () =>
      CURRICULUM.reduce(
        (sum, f) =>
          sum +
          f.phases.reduce(
            (s2, p) => s2 + p.topics.reduce((s3, t) => s3 + t.subtopics.length, 0),
            0,
          ),
        0,
      ),
    [],
  );

  const overallPct = Math.round((stats.subtopicCount / totalSubtopicsInCurriculum) * 100);

  function clearAll() {
    if (!confirm("Clear all study history? This cannot be undone.")) return;
    if (typeof window !== "undefined") window.localStorage.removeItem("studied-subtopics-v1");
    refresh();
  }

  function removeSession(id: string) {
    deleteSession(id);
    refresh();
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study History</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything you&apos;ve studied, with filters and time tracking.
          </p>
        </div>
        {studied.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            <Trash2 className="h-4 w-4" /> Clear history
          </Button>
        )}
      </header>

      <Card>
        <CardContent className="grid gap-3 p-4 md:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-wider">Subject</Label>
            <Select value={field} onValueChange={(v) => setField(v as typeof field)}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="physics">Physics & Rocket Science</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-wider">Range</Label>
            <Select value={range} onValueChange={(v) => setRange(v as RangeFilter)}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-wider">Search</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by topic / subtopic"
                className="h-9 pl-8"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile
          icon={BookOpen}
          label="Subtopics studied"
          value={stats.subtopicCount}
          hint={`of ${totalSubtopicsInCurriculum} total`}
          tone="navy"
        />
        <StatTile
          icon={Layers}
          label="Topics covered"
          value={stats.topicCount}
          hint="distinct"
          tone="cs"
        />
        <StatTile
          icon={Activity}
          label="Time invested"
          value={formatHHMM(stats.totalSec)}
          hint="active study"
          tone="amber"
        />
        <StatTile
          icon={Trophy}
          label="Sessions"
          value={stats.sessionCount}
          hint={`${stats.completed} done · ${stats.paused} paused`}
          tone="gold"
        />
      </div>

      {/* Curriculum % */}
      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">Curriculum coverage</span>
            <span className="font-mono tabular-nums text-muted-foreground">
              {overallPct}% · {stats.subtopicCount}/{totalSubtopicsInCurriculum}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full bg-brand-navy transition-all" style={{ width: `${overallPct}%` }} />
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {(["math", "cs", "physics"] as const).map((k) => {
              const total = CURRICULUM.find((f) => f.key === k)?.phases.reduce(
                (s, p) => s + p.topics.reduce((s2, t) => s2 + t.subtopics.length, 0),
                0,
              ) ?? 0;
              const pct = total > 0 ? Math.round((stats.byField[k] / total) * 100) : 0;
              return (
                <div key={k} className="rounded-md border p-2">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("h-2 w-2 rounded-full", FIELD_THEME[k].bar)} />
                    <span className="font-medium capitalize">
                      {k === "math" ? "Math" : k === "cs" ? "CS" : "Physics"}
                    </span>
                    <span className="ml-auto tabular-nums text-muted-foreground">
                      {stats.byField[k]}/{total}
                    </span>
                  </div>
                  <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className={cn("h-full", FIELD_THEME[k].bar)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {hydrated && filteredStudied.length === 0 && filteredSessions.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-10 text-center">
            <HistoryIcon className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm font-semibold">No history yet</p>
            <p className="text-xs text-muted-foreground">
              Start a study session and progress will be recorded here.
            </p>
            <Button asChild variant="brand" size="sm" className="mt-3">
              <Link href="/study">Start a session</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Per-topic breakdown */}
          {groupedByTopic.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="h-4 w-4 text-brand-navy" /> By topic
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {groupedByTopic.map((g, i) => (
                    <motion.div
                      key={g.topicId}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(0.2, i * 0.02) }}
                      className="grid grid-cols-12 items-center gap-3 px-4 py-3"
                    >
                      <Badge
                        variant="outline"
                        className={cn("col-span-2 w-fit", FIELD_THEME[g.fieldKey].chip)}
                      >
                        {g.fieldKey}
                      </Badge>
                      <div className="col-span-5 min-w-0">
                        <p className="line-clamp-1 text-sm font-medium">{g.topicTitle}</p>
                        <p className="text-xs text-muted-foreground">
                          {g.entries.length} subtopic{g.entries.length === 1 ? "" : "s"} ·{" "}
                          last {formatDistanceToNow(new Date(g.lastStudiedAt), { addSuffix: true })}
                        </p>
                      </div>
                      <div className="col-span-3 text-xs text-muted-foreground tabular-nums">
                        {formatHHMM(g.totalSeconds)} studied
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/study?topic=${encodeURIComponent(g.topicId)}`}>
                            Continue <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Subtopic-level activity */}
          {filteredStudied.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="h-4 w-4 text-brand-navy" /> Subtopic activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredStudied.map((e) => (
                    <Link
                      key={e.subtopicId}
                      href={`/learn/${encodeURIComponent(e.subtopicId)}`}
                      className="grid grid-cols-12 items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/30"
                    >
                      <Badge
                        variant="outline"
                        className={cn("col-span-2 w-fit", FIELD_THEME[e.fieldKey].chip)}
                      >
                        {e.fieldKey}
                      </Badge>
                      <div className="col-span-5 min-w-0">
                        <p className="line-clamp-1 text-sm font-medium">{e.subtopicTitle}</p>
                        <p className="text-xs text-muted-foreground">{e.topicTitle}</p>
                      </div>
                      <div className="col-span-2 text-xs text-muted-foreground">
                        {e.visitCount} visit{e.visitCount === 1 ? "" : "s"}
                      </div>
                      <div className="col-span-2 text-xs text-muted-foreground tabular-nums">
                        {formatHHMM(e.totalSeconds)}
                      </div>
                      <div className="col-span-1 text-right text-[10px] text-muted-foreground">
                        {formatDistanceToNow(new Date(e.lastStudiedAt), { addSuffix: true })}
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sessions list */}
          {filteredSessions.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-4 w-4 text-brand-navy" /> Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredSessions.map((s) => {
                    const elapsed = s.accumSec ?? 0;
                    const target = s.durationMinutes * 60;
                    const pct = Math.min(100, Math.round((elapsed / target) * 100));
                    const fieldChip = FIELD_THEME[s.field].chip;
                    return (
                      <div key={s.sessionId} className="grid grid-cols-12 items-center gap-3 px-4 py-3">
                        <Badge variant="outline" className={cn("col-span-2 w-fit", fieldChip)}>
                          {s.field}
                        </Badge>
                        <div className="col-span-5 min-w-0">
                          <p className="line-clamp-1 text-sm font-medium">
                            {s.topicNumber} {s.topicTitle}
                          </p>
                          {s.subtopicTitle && (
                            <p className="line-clamp-1 text-xs text-muted-foreground">
                              {s.subtopicTitle}
                            </p>
                          )}
                          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full bg-brand-navy"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                        <div className="col-span-2 text-xs">
                          <Badge
                            variant={
                              s.status === "completed"
                                ? "default"
                                : s.status === "paused"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="capitalize"
                          >
                            {s.status ?? "in_progress"}
                          </Badge>
                        </div>
                        <div className="col-span-2 text-xs text-muted-foreground tabular-nums">
                          {formatHHMM(elapsed)} / {s.durationMinutes}m
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSession(s.sessionId)}
                            title="Remove from history"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
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
  value: string | number;
  hint: string;
  tone: "navy" | "cs" | "amber" | "gold";
}) {
  const tones: Record<string, string> = {
    navy: "bg-brand-navy/10 text-brand-navy",
    cs: "bg-field-cs-bg text-field-cs",
    amber: "bg-amber-50 text-amber-700",
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
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", tones[tone])}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function formatHHMM(sec: number) {
  if (sec < 60) return `${sec}s`;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}
