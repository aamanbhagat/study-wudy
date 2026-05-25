"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Sparkles,
  Brain,
  GraduationCap,
  Layers,
  Trash2,
  ArrowRight,
  Clock,
  ChevronRight,
  X as CloseIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CURRICULUM } from "@/lib/curriculum-data";
import { findTopic } from "@/lib/curriculum-helpers";
import {
  loadTests,
  upsertTest,
  deleteTest,
  computeAutoScore,
  type StoredTest,
} from "@/lib/tests-store";
import type { TestType, TestDifficulty } from "@/lib/ai/prompts";
import type { GenerateTestResponse } from "@/app/api/ai/generate-test/route";
import type { FieldKey } from "@/lib/types";
import { useAiProvider } from "@/lib/ai/use-provider";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const TEST_TYPES: { value: TestType; label: string; icon: typeof Trophy; sub: string }[] = [
  { value: "quick", label: "Quick Check", icon: Sparkles, sub: "5 questions, ~10 min" },
  { value: "topic", label: "Topic Test", icon: Brain, sub: "8 questions, ~25 min" },
  { value: "phase", label: "Phase Exam", icon: GraduationCap, sub: "12 questions, ~45 min" },
  { value: "cross", label: "Cross-Domain", icon: Layers, sub: "10 questions, ~30 min" },
];

const DIFFICULTIES: { value: TestDifficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  { value: "elite", label: "Elite" },
];

const FIELD_THEME: Record<FieldKey, { chip: string; bar: string; ring: string }> = {
  math: { chip: "bg-field-math-bg text-field-math", bar: "bg-field-math", ring: "ring-field-math/40" },
  cs: { chip: "bg-field-cs-bg text-field-cs", bar: "bg-field-cs", ring: "ring-field-cs/40" },
  physics: {
    chip: "bg-field-physics-bg text-field-physics",
    bar: "bg-field-physics",
    ring: "ring-field-physics/40",
  },
};

// Per-topic selection: optional set of subtopic ids; empty set = all subtopics.
type TopicSelections = Record<string, Set<string>>;

export default function TestsPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
      <TestsPageInner />
    </Suspense>
  );
}

function TestsPageInner() {
  const router = useRouter();
  const search = useSearchParams();
  const provider = useAiProvider();

  const [field, setField] = useState<FieldKey>("math");
  const [type, setType] = useState<TestType>("quick");
  const [difficulty, setDifficulty] = useState<TestDifficulty>("medium");
  const [selections, setSelections] = useState<TopicSelections>({});
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<StoredTest[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate history + handle ?topic= query param.
  useEffect(() => {
    setHistory(loadTests());
    const queryTopic = search.get("topic");
    if (queryTopic) {
      const lookup = findTopic(queryTopic);
      if (lookup) {
        setField(lookup.field.key);
        setSelections({ [queryTopic]: new Set() });
        setExpandedTopic(queryTopic);
      }
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fieldData = useMemo(() => CURRICULUM.find((f) => f.key === field)!, [field]);

  const selectedTopicCount = Object.keys(selections).length;
  const selectedSubtopicCount = Object.values(selections).reduce((sum, s) => sum + s.size, 0);

  function toggleTopic(topicId: string) {
    setSelections((prev) => {
      const next = { ...prev };
      if (topicId in next) delete next[topicId];
      else next[topicId] = new Set();
      return next;
    });
    setExpandedTopic((cur) => (cur === topicId ? cur : topicId));
  }

  function toggleSubtopic(topicId: string, subId: string) {
    setSelections((prev) => {
      const cur = prev[topicId] ?? new Set<string>();
      const next = new Set(cur);
      if (next.has(subId)) next.delete(subId);
      else next.add(subId);
      return { ...prev, [topicId]: next };
    });
  }

  function clearTopic(topicId: string) {
    setSelections((prev) => {
      const next = { ...prev };
      delete next[topicId];
      return next;
    });
  }

  function clearAll() {
    setSelections({});
    setExpandedTopic(null);
  }

  function aiChoose() {
    const pool = fieldData.phases.flatMap((p) => p.topics);
    if (pool.length === 0) return;
    const picks: TopicSelections = {};
    for (let i = 0; i < Math.min(3, pool.length); i++) {
      const t = pool[Math.floor(Math.random() * pool.length)];
      picks[t.id] = new Set();
    }
    setSelections(picks);
    setExpandedTopic(Object.keys(picks)[0] ?? null);
  }

  function buildPayloadTopics() {
    return Object.entries(selections).map(([topicId, subSet]) => {
      const lookup = findTopic(topicId);
      if (!lookup) return null;
      const allSubs = lookup.topic.subtopics.map((s) => s.title);
      const chosen = subSet.size === 0
        ? allSubs
        : lookup.topic.subtopics.filter((s) => subSet.has(s.id)).map((s) => s.title);
      return { id: topicId, title: lookup.topic.title, subtopics: chosen };
    }).filter((x): x is { id: string; title: string; subtopics: string[] } => x !== null);
  }

  async function startTest() {
    const topics = buildPayloadTopics();
    if (topics.length === 0) {
      setError("Pick at least one topic.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/generate-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testType: type,
          difficulty,
          topics: topics.map(({ title, subtopics }) => ({ title, subtopics })),
          provider,
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as GenerateTestResponse;
      const id = `test-${Date.now().toString(36)}`;
      const test: StoredTest = {
        id,
        title: data.title || `${type} test`,
        type,
        difficulty,
        topicIds: topics.map((t) => t.id),
        topicTitles: topics.map((t) => t.title),
        durationMinutes: data.duration_minutes ?? 30,
        questions: data.questions,
        answers: {},
        status: "in_progress",
        startedAt: new Date().toISOString(),
        completedAt: null,
        finalScore: null,
        createdAt: new Date().toISOString(),
      };
      upsertTest(test);
      router.push(`/tests/${id}`);
    } catch (e) {
      setError((e as Error).message);
      setSubmitting(false);
    }
  }

  function removeTest(id: string) {
    deleteTest(id);
    setHistory(loadTests());
  }

  const theme = FIELD_THEME[field];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Tests</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a subject, then drill into topics and subtopics. AI generates the test.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Step 1: Subject */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">
                  1
                </span>
                Choose subject
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
                      onClick={() => {
                        setField(f.key);
                        clearAll();
                      }}
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

          {/* Step 2: Topics & subtopics */}
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">
                  2
                </span>
                Pick topics & subtopics
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" onClick={aiChoose}>
                  <Sparkles className="h-3.5 w-3.5" /> AI Choose
                </Button>
                {selectedTopicCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAll}>
                    Clear
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-md border">
                <div className="max-h-[480px] overflow-auto p-1">
                  {fieldData.phases.map((phase) => (
                    <div key={phase.id} className="mb-2">
                      <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Phase {phase.number} — {phase.title}
                      </p>
                      <ul className="space-y-0.5">
                        {phase.topics.map((t) => {
                          const sel = selections[t.id];
                          const checked = sel !== undefined;
                          const partial = checked && sel.size > 0 && sel.size < t.subtopics.length;
                          const isExpanded = expandedTopic === t.id;
                          return (
                            <li key={t.id}>
                              <div
                                className={cn(
                                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                                  checked ? "bg-brand-navy/5" : "hover:bg-accent/40",
                                )}
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  ref={(el) => {
                                    if (el) el.indeterminate = !!partial;
                                  }}
                                  onChange={() => toggleTopic(t.id)}
                                  className="h-4 w-4 accent-brand-navy"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedTopic((cur) => (cur === t.id ? null : t.id))
                                  }
                                  className="flex flex-1 items-center gap-2 text-left"
                                >
                                  <ChevronRight
                                    className={cn(
                                      "h-3.5 w-3.5 text-muted-foreground transition-transform",
                                      isExpanded && "rotate-90",
                                    )}
                                  />
                                  <span className="font-mono text-xs text-muted-foreground">
                                    {t.number}
                                  </span>
                                  <span className="flex-1">{t.title}</span>
                                  {checked && (
                                    <Badge variant="outline" className="h-5 text-[10px]">
                                      {sel.size === 0
                                        ? `all (${t.subtopics.length})`
                                        : `${sel.size}/${t.subtopics.length}`}
                                    </Badge>
                                  )}
                                </button>
                              </div>

                              <AnimatePresence initial={false}>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.18 }}
                                    className="overflow-hidden"
                                  >
                                    <ul
                                      className={cn(
                                        "ml-7 my-1 border-l-2 pl-3 pr-2 pb-2 space-y-0.5",
                                        FIELD_THEME[field].ring.replace("ring-", "border-"),
                                      )}
                                    >
                                      {t.subtopics.map((s) => {
                                        const subSelected =
                                          checked && sel.size > 0 && sel.has(s.id);
                                        const allMode = checked && sel.size === 0;
                                        return (
                                          <li key={s.id}>
                                            <label
                                              className={cn(
                                                "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors",
                                                (subSelected || allMode) && "bg-brand-navy/5",
                                                "hover:bg-accent/40",
                                              )}
                                            >
                                              <input
                                                type="checkbox"
                                                checked={!!checked && (allMode || subSelected)}
                                                onChange={() => {
                                                  if (!checked) {
                                                    // selecting a subtopic auto-selects topic with just that sub
                                                    setSelections((prev) => ({
                                                      ...prev,
                                                      [t.id]: new Set([s.id]),
                                                    }));
                                                    return;
                                                  }
                                                  toggleSubtopic(t.id, s.id);
                                                }}
                                                className="h-3.5 w-3.5 accent-brand-navy"
                                              />
                                              <span
                                                className={cn(
                                                  "h-1.5 w-1.5 shrink-0 rounded-full",
                                                  theme.bar,
                                                  "opacity-50",
                                                )}
                                              />
                                              <span className="flex-1">{s.title}</span>
                                            </label>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTopicCount > 0 && (
                <div className="flex flex-wrap gap-1">
                  {Object.entries(selections).map(([topicId, subSet]) => {
                    const lookup = findTopic(topicId);
                    if (!lookup) return null;
                    const total = lookup.topic.subtopics.length;
                    const sub = subSet.size === 0 ? `all ${total}` : `${subSet.size}/${total}`;
                    return (
                      <Badge
                        key={topicId}
                        variant="outline"
                        className={cn("gap-1.5", FIELD_THEME[lookup.field.key].chip)}
                      >
                        <span>{lookup.topic.title}</span>
                        <span className="text-[10px] opacity-70">{sub}</span>
                        <button
                          onClick={() => clearTopic(topicId)}
                          className="opacity-60 hover:opacity-100"
                          aria-label={`Remove ${lookup.topic.title}`}
                        >
                          <CloseIcon className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 3: Type + difficulty */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">
                  3
                </span>
                Configure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Test type</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {TEST_TYPES.map((t) => {
                    const Icon = t.icon;
                    const active = t.value === type;
                    return (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setType(t.value)}
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
                          <span className="block text-sm font-semibold">{t.label}</span>
                          <span className="block text-xs text-muted-foreground">{t.sub}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={difficulty} onValueChange={(v) => setDifficulty(v as TestDifficulty)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTIES.map((d) => (
                      <SelectItem key={d.value} value={d.value}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right summary card */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Ready?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subject</span>
                  <span className="font-medium">{fieldData.name}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{TEST_TYPES.find((t) => t.value === type)?.label}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Difficulty</span>
                  <span className="font-medium capitalize">{difficulty}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Topics</span>
                  <span className="font-medium">{selectedTopicCount}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Specific subtopics</span>
                  <span className="font-medium">
                    {selectedSubtopicCount === 0 ? "all" : selectedSubtopicCount}
                  </span>
                </li>
              </ul>
              <Button
                variant="brand"
                className="w-full"
                onClick={startTest}
                disabled={selectedTopicCount === 0 || submitting}
              >
                {submitting ? "Generating…" : "Generate & start"} <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-xs text-muted-foreground">
                Generation needs ANTHROPIC_API_KEY or GOOGLE_GEMINI_API_KEY in .env.local.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {hydrated && history.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Recent tests
          </h2>
          <Card>
            <CardContent className="divide-y p-0">
              {history.map((t) => {
                const score = t.finalScore ?? computeAutoScore(t).pct;
                const startedRel = t.startedAt
                  ? formatDistanceToNow(new Date(t.startedAt), { addSuffix: true })
                  : "—";
                return (
                  <div key={t.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{t.title}</p>
                        <Badge variant="outline" className="capitalize">
                          {t.type}
                        </Badge>
                        <Badge variant="secondary" className="capitalize">
                          {t.difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t.topicTitles.slice(0, 3).join(", ")}
                        {t.topicTitles.length > 3 ? ` +${t.topicTitles.length - 3}` : ""} · {startedRel}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {t.status === "completed" ? (
                        <span className="font-mono text-lg font-bold tabular-nums">{score}%</span>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <Clock className="h-3 w-3" /> in progress
                        </Badge>
                      )}
                      <Button asChild variant="outline" size="sm">
                        <Link href={t.status === "completed" ? `/tests/${t.id}/results` : `/tests/${t.id}`}>
                          {t.status === "completed" ? "Results" : "Resume"}
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeTest(t.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>
      )}

      <Dialog open={submitting}>
        <DialogContent hideClose>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-gold" /> Generating test…
            </DialogTitle>
            <DialogDescription>
              Writing {selectedTopicCount} topic{selectedTopicCount === 1 ? "" : "s"} of questions.
              Usually takes 5–15 seconds.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
