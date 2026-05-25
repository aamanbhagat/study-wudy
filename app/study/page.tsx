"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowRight,
  BookOpen,
  Brain,
  ListChecks,
  Repeat,
  Target,
  Pause,
  Play,
  Trash2,
  History,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CURRICULUM } from "@/lib/curriculum-data";
import {
  listInProgressSessions,
  saveSession,
  deleteSession,
  type SessionPayload as StoredSession,
} from "@/lib/study-sessions";
import { formatClock } from "@/lib/ai/stream";
import { toast } from "sonner";
import type { FieldKey } from "@/lib/types";
import { listStudied, studiedSummary, type StudiedEntry } from "@/lib/studied-tracker";
import { cn } from "@/lib/utils";

const SESSION_TYPES = [
  { value: "guided", label: "Guided Study", icon: BookOpen, hint: "AI-built study guide + recall checks" },
  { value: "practice", label: "Practice Problems", icon: Target, hint: "Solve problems on this topic" },
  { value: "review", label: "Review", icon: Repeat, hint: "Refresh a topic you already know" },
  { value: "quiz", label: "Quiz Yourself", icon: Brain, hint: "Mixed questions, AI evaluation" },
  { value: "feynman", label: "Feynman Teach", icon: ListChecks, hint: "Teach AI as a confused student" },
] as const;
type SessionType = (typeof SESSION_TYPES)[number]["value"];

const FIELD_THEME: Record<FieldKey, { chip: string; bar: string; ring: string }> = {
  math: { chip: "bg-field-math-bg text-field-math", bar: "bg-field-math", ring: "ring-field-math/40" },
  cs: { chip: "bg-field-cs-bg text-field-cs", bar: "bg-field-cs", ring: "ring-field-cs/40" },
  physics: {
    chip: "bg-field-physics-bg text-field-physics",
    bar: "bg-field-physics",
    ring: "ring-field-physics/40",
  },
};

export default function StudySetupPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
      <StudySetupInner />
    </Suspense>
  );
}

function StudySetupInner() {
  const router = useRouter();
  const search = useSearchParams();

  const [field, setField] = useState<FieldKey>("math");
  const [topicId, setTopicId] = useState<string>("");
  const [subtopicId, setSubtopicId] = useState<string>("none");
  const [sessionType, setSessionType] = useState<SessionType>("guided");
  const [duration, setDuration] = useState(60);
  const [submitting, setSubmitting] = useState(false);

  const [savedSessions, setSavedSessions] = useState<StoredSession[]>([]);
  const [studied, setStudied] = useState<StudiedEntry[]>([]);
  const [studiedStats, setStudiedStats] = useState({
    totalSubtopics: 0,
    totalTopics: 0,
    totalSeconds: 0,
    byField: { math: 0, cs: 0, physics: 0 },
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSavedSessions(listInProgressSessions());
    setStudied(listStudied());
    setStudiedStats(studiedSummary());
    setHydrated(true);
  }, []);

  // Topics for the selected subject
  const topics = useMemo(() => {
    const f = CURRICULUM.find((c) => c.key === field);
    if (!f) return [];
    return f.phases.flatMap((p) =>
      p.topics.map((t) => ({
        id: t.id,
        title: t.title,
        number: t.number,
        phase: `Phase ${p.number} — ${p.title}`,
        subtopics: t.subtopics,
      })),
    );
  }, [field]);

  const topic = topics.find((t) => t.id === topicId) ?? null;

  // Pre-select via ?topic= query param (from learn page tiles)
  useEffect(() => {
    const queryTopic = search.get("topic");
    if (queryTopic) {
      for (const f of CURRICULUM) {
        for (const p of f.phases) {
          const found = p.topics.find((t) => t.id === queryTopic);
          if (found) {
            setField(f.key);
            setTopicId(found.id);
            return;
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whenever field changes, reset topic if the current one isn't in the new field
  useEffect(() => {
    if (!topicId) {
      const first = topics[0];
      if (first) setTopicId(first.id);
      return;
    }
    if (!topics.some((t) => t.id === topicId)) {
      setTopicId(topics[0]?.id ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field, topics.length]);

  // Reset subtopic when topic changes
  useEffect(() => {
    setSubtopicId("none");
  }, [topicId]);

  function startSession() {
    if (!topic) return;
    setSubmitting(true);
    const sessionId = `local-${Date.now().toString(36)}`;
    const subtopic = topic.subtopics.find((s) => s.id === subtopicId);
    const payload = {
      sessionId,
      topicId: topic.id,
      topicTitle: topic.title,
      topicNumber: topic.number,
      subtopicId: subtopic?.id ?? null,
      subtopicTitle: subtopic?.title ?? null,
      field,
      fieldName:
        field === "math" ? "Mathematics" : field === "cs" ? "Computer Science" : "Physics & Rocket Science",
      sessionType,
      durationMinutes: duration,
      startedAt: new Date().toISOString(),
    };
    if (typeof window !== "undefined") {
      window.localStorage.setItem(`session:${sessionId}`, JSON.stringify(payload));
    }
    router.push(`/study/${sessionId}`);
  }

  function resumeSession(s: StoredSession) {
    saveSession({ ...s, status: "paused", savedAt: new Date().toISOString() });
    router.push(`/study/${s.sessionId}`);
  }

  function removeSession(id: string) {
    if (!confirm("Delete this saved session?")) return;
    deleteSession(id);
    setSavedSessions(listInProgressSessions());
    toast.success("Session deleted.");
  }

  return (
    <div className="space-y-6">
      <motion.header initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold tracking-tight">New Study Session</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a subject, drill into a topic, and dive in.
        </p>
      </motion.header>

      {hydrated && savedSessions.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <History className="h-4 w-4" /> Saved sessions ({savedSessions.length})
          </h2>
          <Card>
            <CardContent className="divide-y p-0">
              {savedSessions.map((s) => {
                const elapsed = s.accumSec ?? 0;
                const target = s.durationMinutes * 60;
                const pct = Math.min(100, Math.round((elapsed / target) * 100));
                const fieldChip = FIELD_THEME[s.field].chip;
                const fieldName =
                  s.fieldName ??
                  (s.field === "math"
                    ? "Mathematics"
                    : s.field === "cs"
                      ? "Computer Science"
                      : "Physics");
                return (
                  <div key={s.sessionId} className="flex items-center gap-3 px-4 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-amber-50 text-amber-700">
                      <Pause className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className={fieldChip}>
                          {fieldName}
                        </Badge>
                        <p className="font-medium leading-tight">
                          {s.topicNumber} {s.topicTitle}
                        </p>
                        {s.subtopicTitle && (
                          <span className="text-xs text-muted-foreground">· {s.subtopicTitle}</span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {formatClock(elapsed)} of {s.durationMinutes}m studied · saved{" "}
                        {formatDistanceToNow(new Date(s.savedAt ?? s.startedAt), { addSuffix: true })}
                      </p>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-secondary">
                        <div className="h-full bg-brand-navy" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="brand" size="sm" onClick={() => resumeSession(s)}>
                        <Play className="h-3.5 w-3.5" /> Resume
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSession(s.sessionId)}
                        title="Delete saved session"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.section>
      )}

      {hydrated && studied.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <Target className="h-4 w-4" /> What you&apos;ve studied
          </h2>
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat label="Subtopics" value={studiedStats.totalSubtopics} />
                <Stat label="Topics" value={studiedStats.totalTopics} />
                <Stat label="Total time" value={formatHHMM(studiedStats.totalSeconds)} />
                <Stat
                  label="By subject"
                  value={`${studiedStats.byField.math}M · ${studiedStats.byField.cs}C · ${studiedStats.byField.physics}P`}
                />
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Recent
                </p>
                <ul className="divide-y rounded-md border">
                  {studied.slice(0, 6).map((e) => (
                    <li key={e.subtopicId} className="flex items-center gap-3 px-3 py-2 text-sm">
                      <Badge variant="outline" className={FIELD_THEME[e.fieldKey].chip}>
                        {e.fieldKey}
                      </Badge>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 font-medium">{e.subtopicTitle}</p>
                        <p className="text-xs text-muted-foreground">
                          {e.topicTitle} · {formatDistanceToNow(new Date(e.lastStudiedAt), { addSuffix: true })}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">
                        {formatHHMM(e.totalSeconds)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Step 1 — Subject */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <StepBadge n={1} /> Choose subject
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-3">
                {CURRICULUM.map((f) => {
                  const active = f.key === field;
                  const ftheme = FIELD_THEME[f.key];
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setField(f.key)}
                      className={cn(
                        "flex items-start gap-3 rounded-lg border p-3 text-left transition-all",
                        active
                          ? cn("border-brand-navy bg-brand-navy/5 ring-1", ftheme.ring)
                          : "hover:border-foreground/20 hover:bg-accent/40",
                      )}
                    >
                      <span className={cn("mt-0.5 h-3 w-3 shrink-0 rounded-full", ftheme.bar)} />
                      <span>
                        <span className="block text-sm font-semibold">{f.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {f.phases.length} phases ·{" "}
                          {f.phases.reduce((s, p) => s + p.topics.length, 0)} topics
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Step 2 — Topic + optional subtopic */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <StepBadge n={2} /> Pick a topic
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Topic</Label>
                <Select value={topicId} onValueChange={setTopicId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[420px]">
                    {/* Group topics by phase */}
                    {CURRICULUM.find((c) => c.key === field)?.phases.map((phase) => (
                      <SelectGroup key={phase.id}>
                        <SelectLabel className="text-[10px] uppercase tracking-wider">
                          Phase {phase.number} — {phase.title}
                        </SelectLabel>
                        {phase.topics.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            <span className="font-mono text-xs text-muted-foreground">{t.number}</span>{" "}
                            {t.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
                {topic && (
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <Badge variant="outline" className={FIELD_THEME[field].chip}>
                      {topic.phase}
                    </Badge>
                    <span className="text-muted-foreground">
                      {topic.subtopics.length} subtopics
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <Label>Focus on a specific subtopic (optional)</Label>
                <Select value={subtopicId} onValueChange={setSubtopicId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Cover all subtopics" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[420px]">
                    <SelectItem value="none">— Cover all subtopics —</SelectItem>
                    {topic?.subtopics.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Leaving this on &quot;cover all&quot; gives a broader study guide.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 — Type + duration */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <StepBadge n={3} /> Configure session
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Session type</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {SESSION_TYPES.map((s) => {
                    const Icon = s.icon;
                    const active = s.value === sessionType;
                    return (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setSessionType(s.value)}
                        className={cn(
                          "flex items-start gap-3 rounded-lg border p-3 text-left transition-all",
                          active
                            ? "border-brand-navy bg-brand-navy/5 ring-1 ring-brand-navy/20"
                            : "hover:border-foreground/20 hover:bg-accent/40",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
                            active ? "bg-brand-navy text-white" : "bg-muted text-foreground",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">{s.label}</span>
                          <span className="block text-xs text-muted-foreground">{s.hint}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-end justify-between">
                  <Label>Duration</Label>
                  <span className="font-mono text-sm tabular-nums">{duration} min</span>
                </div>
                <Slider
                  min={15}
                  max={180}
                  step={5}
                  value={[duration]}
                  onValueChange={(v) => setDuration(v[0])}
                />
                <div className="flex justify-between text-[10px] uppercase tracking-wide text-muted-foreground">
                  <span>15m</span>
                  <span>60m</span>
                  <span>120m</span>
                  <span>180m</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Ready?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-muted/40 p-3 text-sm">
                <p className="font-semibold">{topic?.title ?? "—"}</p>
                <p className="text-xs text-muted-foreground">
                  {field === "math" ? "Mathematics" : field === "cs" ? "Computer Science" : "Physics"} ·{" "}
                  {topic?.phase}
                </p>
                {subtopicId !== "none" && topic && (
                  <p className="mt-1 text-xs">
                    <span className="text-muted-foreground">Focus:</span>{" "}
                    {topic.subtopics.find((s) => s.id === subtopicId)?.title}
                  </p>
                )}
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">
                    {SESSION_TYPES.find((s) => s.value === sessionType)?.label}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{duration} minutes</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Recall checks</span>
                  <span className="font-medium">every 15 min</span>
                </li>
              </ul>
              <Button
                variant="brand"
                className="w-full"
                onClick={startSession}
                disabled={!topic || submitting}
              >
                Start session <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">
      {n}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border bg-muted/30 p-2.5 text-center">
      <p className="text-lg font-bold tabular-nums">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

function formatHHMM(totalSec: number) {
  if (totalSec < 60) return `${totalSec}s`;
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}
