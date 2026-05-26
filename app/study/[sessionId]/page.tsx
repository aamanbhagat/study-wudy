"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Pause,
  Play,
  StopCircle,
  Sparkles,
  ChevronRight,
  Target,
  ArrowRight,
  Save,
  Pencil,
  Zap,
  MessageSquare,
  FileText,
  Lightbulb,
  SkipForward,
  SkipBack,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MarkdownWithMath } from "@/components/shared/MarkdownWithMath";
import { RecallModal } from "@/components/study/RecallModal";
import { SessionChat } from "@/components/study/SessionChat";
import { SessionNotes } from "@/components/study/SessionNotes";
import { InSessionFlashcards } from "@/components/study/InSessionFlashcards";
import { InSessionTest } from "@/components/study/InSessionTest";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatClock } from "@/lib/ai/stream";
import { CURRICULUM } from "@/lib/curriculum-data";
import type { FieldKey } from "@/lib/types";
import { useAiProvider } from "@/lib/ai/use-provider";
import {
  loadSession,
  saveSession,
  computeXp,
  type SessionPayload as StoredSession,
} from "@/lib/study-sessions";
import { findNextSubtopic, findPrevSubtopic } from "@/lib/curriculum-navigation";
import { markStudied } from "@/lib/studied-tracker";
import { cn } from "@/lib/utils";

interface SessionPayload {
  sessionId: string;
  topicId: string;
  topicTitle: string;
  topicNumber: string;
  subtopicId?: string | null;
  subtopicTitle?: string | null;
  field: FieldKey;
  sessionType: string;
  durationMinutes: number;
  startedAt: string;
}

interface RecallEntry {
  promptedAtSec: number;
  score: number;
  response: string;
  feedback?: string;
}

interface SessionFeedback {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  knowledge_level_delta: number;
  xp_award: number;
  anki_cards: { front: string; back: string }[];
  next_recommendation: string;
}

const FIELD_THEME: Record<FieldKey, string> = {
  math: "bg-field-math-bg text-field-math",
  cs: "bg-field-cs-bg text-field-cs",
  physics: "bg-field-physics-bg text-field-physics",
};

const SESSION_TYPE_LABEL: Record<string, string> = {
  guided: "Guided Study",
  practice: "Practice",
  review: "Review",
  quiz: "Quiz",
  feynman: "Feynman",
};

const RECALL_INTERVAL_SECONDS = 15 * 60;

function findTopic(topicId: string) {
  for (const field of CURRICULUM) {
    for (const phase of field.phases) {
      for (const topic of phase.topics) {
        if (topic.id === topicId) return { field, phase, topic };
      }
    }
  }
  return null;
}

export default function ActiveSessionPage() {
  const params = useParams<{ sessionId: string }>();
  const router = useRouter();
  const sessionId = params.sessionId;
  const provider = useAiProvider();

  const [payload, setPayload] = useState<SessionPayload | null>(null);
  const [missing, setMissing] = useState(false);
  const [running, setRunning] = useState(true);
  const [accumSec, setAccumSec] = useState(0);
  const [resumedAt, setResumedAt] = useState<number>(Date.now());
  const [tick, setTick] = useState(0);

  const [content, setContent] = useState("");
  const [contentLoading, setContentLoading] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);
  const [lang, setLang] = useState<"en" | "hi">(() => {
    if (typeof window === "undefined") return "en";
    return (window.localStorage.getItem("study-lang-pref") as "en" | "hi") || "en";
  });

  const [recallOpen, setRecallOpen] = useState(false);
  const [recalls, setRecalls] = useState<RecallEntry[]>([]);
  const [lastRecallAt, setLastRecallAt] = useState(0);

  const [endOpen, setEndOpen] = useState(false);
  const [feedback, setFeedback] = useState<SessionFeedback | null>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const explainAbort = useRef<AbortController | null>(null);

  // Load session payload from localStorage. Restore elapsed time + recalls if saved.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = loadSession(sessionId);
    if (!stored) {
      setMissing(true);
      return;
    }
    setPayload(stored);
    if (typeof stored.accumSec === "number") setAccumSec(stored.accumSec);
    if (typeof stored.lastRecallAt === "number") setLastRecallAt(stored.lastRecallAt);
    if (Array.isArray(stored.recalls)) setRecalls(stored.recalls);
    // If session was previously paused, start paused so the user can review and resume.
    if (stored.status === "paused") setRunning(false);
    setResumedAt(Date.now());
  }, [sessionId]);

  // Tick once a second while running
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  // Compute elapsed seconds (recomputed each tick by including `tick` as dep)
  const elapsedSec = useMemo(() => {
    if (!running) return accumSec;
    return accumSec + Math.floor((Date.now() - resumedAt) / 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, accumSec, resumedAt, tick]);

  // Trigger recall every 15 min
  useEffect(() => {
    if (!running) return;
    if (elapsedSec - lastRecallAt >= RECALL_INTERVAL_SECONDS && !recallOpen && !endOpen) {
      setRecallOpen(true);
      pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsedSec, lastRecallAt, running, recallOpen, endOpen]);

  // Fetch deep cached study content (or generate it). If a specific subtopic is
  // selected, use that; otherwise pick the first subtopic of the topic.
  useEffect(() => {
    if (!payload) return;
    const topicData = findTopic(payload.topicId);
    if (!topicData) return;
    const subtopicId = payload.subtopicId ?? topicData.topic.subtopics[0]?.id ?? null;
    if (!subtopicId) {
      setContentError("No subtopics defined for this topic.");
      setContentLoading(false);
      return;
    }
    const controller = new AbortController();
    explainAbort.current = controller;
    setContentLoading(true);
    setContent("");
    setContentError(null);
    void (async () => {
      try {
        const res = await fetch("/api/study-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subtopicId, lang }),
          signal: controller.signal,
        });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `HTTP ${res.status}`);
        }
        const data = (await res.json()) as { content: string; cached: boolean };
        setContent(data.content);
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        setContentError((e as Error).message);
      } finally {
        setContentLoading(false);
      }
    })();
    return () => controller.abort();
  }, [payload, lang]);

  function pause() {
    if (!running) return;
    setRunning(false);
    setAccumSec((s) => s + Math.floor((Date.now() - resumedAt) / 1000));
  }
  function resume() {
    if (running) return;
    setRunning(true);
    setResumedAt(Date.now());
  }

  function pauseAndSave() {
    if (!payload) return;
    const total = running ? accumSec + Math.floor((Date.now() - resumedAt) / 1000) : accumSec;
    if (running) {
      setRunning(false);
      setAccumSec(total);
    }
    const next: StoredSession = {
      ...(payload as StoredSession),
      status: "paused",
      accumSec: total,
      lastRecallAt,
      recalls,
      savedAt: new Date().toISOString(),
    };
    saveSession(next);
    setPayload(next);
    toast.success(`Session saved at ${formatClock(total)}. You can resume from /study.`);
    router.push("/study");
  }

  function pauseAndSaveSilent() {
    if (!payload) return;
    const total = running ? accumSec + Math.floor((Date.now() - resumedAt) / 1000) : accumSec;
    const next: StoredSession = {
      ...(payload as StoredSession),
      status: "completed",
      accumSec: total,
      lastRecallAt,
      recalls,
      savedAt: new Date().toISOString(),
    };
    saveSession(next);
    // Track studied
    if (payload.subtopicId) {
      const stored = payload as StoredSession;
      markStudied({
        subtopicId: payload.subtopicId,
        subtopicTitle: payload.subtopicTitle ?? "",
        topicId: payload.topicId,
        topicTitle: payload.topicTitle,
        fieldKey: payload.field,
        fieldName: stored.fieldName ?? payload.field,
        addSeconds: total,
      });
    }
  }

  function applyDuration(newMinutes: number) {
    if (!payload) return;
    const next: StoredSession = {
      ...(payload as StoredSession),
      durationMinutes: newMinutes,
    };
    saveSession(next);
    setPayload(next);
  }

  function handleRecallComplete(score: number, response: string, fb: { feedback: string }) {
    setRecalls((prev) => [
      ...prev,
      { promptedAtSec: elapsedSec, score, response, feedback: fb.feedback },
    ]);
    setLastRecallAt(elapsedSec);
    setRecallOpen(false);
    resume();
  }

  async function endSession() {
    pause();
    setEndOpen(true);
    if (!payload) return;
    // Mark session completed and persist final state
    const total = running ? accumSec + Math.floor((Date.now() - resumedAt) / 1000) : accumSec;
    const finalState: StoredSession = {
      ...(payload as StoredSession),
      status: "completed",
      accumSec: total,
      lastRecallAt,
      recalls,
      savedAt: new Date().toISOString(),
    };
    saveSession(finalState);
    // Track studied so the History page picks it up
    if (payload.subtopicId) {
      markStudied({
        subtopicId: payload.subtopicId,
        subtopicTitle: payload.subtopicTitle ?? "",
        topicId: payload.topicId,
        topicTitle: payload.topicTitle,
        fieldKey: payload.field,
        fieldName: (payload as StoredSession).fieldName ?? payload.field,
        addSeconds: total,
      });
    }
    setFeedbackLoading(true);
    setFeedbackError(null);
    try {
      const res = await fetch("/api/ai/session-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicTitle: payload.topicTitle,
          durationMinutes: Math.max(1, Math.round(elapsedSec / 60)),
          recallScores: recalls.map((r) => r.score),
          provider,
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }
      setFeedback((await res.json()) as SessionFeedback);
    } catch (e) {
      setFeedbackError((e as Error).message);
    } finally {
      setFeedbackLoading(false);
    }
  }

  if (missing) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Session not found</h1>
        <p className="text-sm text-muted-foreground">
          This session id has no record in this browser. Start a new session from the study setup page.
        </p>
        <Button asChild variant="brand">
          <Link href="/study">New session</Link>
        </Button>
      </div>
    );
  }

  if (!payload) {
    return <div className="text-sm text-muted-foreground">Loading session…</div>;
  }

  const topicData = findTopic(payload.topicId);
  const subtopics = topicData?.topic.subtopics.map((s) => s.title) ?? [];
  const targetSec = payload.durationMinutes * 60;
  const recallsCount = recalls.length;
  const focusScore = computeFocusScore(elapsedSec, recallsCount, targetSec);
  const xpInfo = computeXp(elapsedSec, payload.durationMinutes);
  const overtimeSec = Math.max(0, elapsedSec - targetSec);

  return (
    <div className="-mx-4 -my-6 sm:-mx-6 lg:-mx-10 lg:-my-10">
      <div className="flex flex-col gap-3 border-b bg-card px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Link href="/curriculum" className="hover:text-foreground">
            Curriculum
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span>{topicData?.field.name}</span>
          <ChevronRight className="h-3 w-3" />
          <span>Phase {topicData?.phase.number}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-foreground">
            {payload.topicNumber} {payload.topicTitle}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline" className={FIELD_THEME[payload.field]}>
            {SESSION_TYPE_LABEL[payload.sessionType] ?? payload.sessionType}
          </Badge>
          <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-1.5">
            <span
              className={cn(
                "font-mono text-2xl font-bold tabular-nums tracking-tight",
                overtimeSec > 0 && "text-brand-gold-dark",
              )}
            >
              {formatClock(elapsedSec)}
            </span>
            <span className="text-xs text-muted-foreground">/ {formatClock(targetSec)}</span>
            {overtimeSec > 0 && (
              <Badge variant="outline" className="ml-1 gap-1 border-brand-gold/40 bg-brand-gold/10 text-brand-gold-dark">
                <Zap className="h-3 w-3" /> +{formatClock(overtimeSec)}
              </Badge>
            )}
            <DurationEditor
              currentMinutes={payload.durationMinutes}
              onApply={applyDuration}
            />
          </div>
          <div className="flex items-center gap-1">
            {running ? (
              <Button variant="outline" size="sm" onClick={pause}>
                <Pause className="h-4 w-4" /> Pause
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={resume}>
                <Play className="h-4 w-4" /> Resume
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={pauseAndSave}>
              <Save className="h-4 w-4" /> Save & exit
            </Button>
            <Button variant="destructive" size="sm" onClick={endSession}>
              <StopCircle className="h-4 w-4" /> End
            </Button>
          </div>
          <FocusWidget score={focusScore} recallsCount={recallsCount} />
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[65fr_35fr] lg:h-[calc(100vh-9rem)]">
        <ScrollArea className="min-w-0 lg:h-full">
          <div className="space-y-5 px-4 py-6 sm:px-6 lg:px-10">
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Sparkles className="h-4 w-4 text-brand-gold" /> AI Study Guide
                    </CardTitle>
                    <div className="inline-flex overflow-hidden rounded-md border bg-background text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setLang("en");
                          if (typeof window !== "undefined")
                            window.localStorage.setItem("study-lang-pref", "en");
                        }}
                        className={
                          "px-2.5 py-1 font-medium transition-colors " +
                          (lang === "en"
                            ? "bg-brand-navy text-white"
                            : "text-muted-foreground hover:bg-accent")
                        }
                        aria-pressed={lang === "en"}
                      >
                        EN
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLang("hi");
                          if (typeof window !== "undefined")
                            window.localStorage.setItem("study-lang-pref", "hi");
                        }}
                        className={
                          "px-2.5 py-1 font-medium transition-colors " +
                          (lang === "hi"
                            ? "bg-brand-navy text-white"
                            : "text-muted-foreground hover:bg-accent")
                        }
                        aria-pressed={lang === "hi"}
                      >
                        HI
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {contentError ? (
                    <p className="text-sm text-destructive">{contentError}</p>
                  ) : content ? (
                    <MarkdownWithMath content={content} />
                  ) : contentLoading ? (
                    <p className="text-sm text-muted-foreground">Generating study guide…</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No content yet. Set ANTHROPIC_API_KEY in .env.local.
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {recalls.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Recall checks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {recalls.map((r, i) => (
                      <li key={i} className="flex items-start justify-between gap-3 rounded-md border p-2">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            at {formatClock(r.promptedAtSec)}
                          </p>
                          {r.feedback && <p className="text-sm">{r.feedback}</p>}
                        </div>
                        <Badge>{r.score}/5</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>

        <div className="min-w-0 border-t bg-card lg:border-l lg:border-t-0 lg:h-full">
          <SessionRightPanel
            topicTitle={payload.topicTitle}
            topicId={payload.topicId}
            subtopicId={payload.subtopicId ?? topicData?.topic.subtopics[0]?.id ?? null}
            subtopicTitle={payload.subtopicTitle ?? null}
          />
        </div>
      </div>

      <NavigationBar
        currentSubtopicId={payload.subtopicId ?? topicData?.topic.subtopics[0]?.id ?? null}
        onJump={(target) => {
          // Save current state, then start a new session on the target subtopic
          pauseAndSaveSilent();
          const newId = `local-${Date.now().toString(36)}`;
          const newPayload: StoredSession = {
            sessionId: newId,
            topicId: target.topic.id,
            topicTitle: target.topic.title,
            topicNumber: target.topic.number,
            subtopicId: target.subtopic.id,
            subtopicTitle: target.subtopic.title,
            field: target.field.key,
            fieldName: target.field.name,
            sessionType: payload.sessionType,
            durationMinutes: payload.durationMinutes,
            startedAt: new Date().toISOString(),
            status: "in_progress",
            accumSec: 0,
            lastRecallAt: 0,
            recalls: [],
          };
          saveSession(newPayload);
          router.push(`/study/${newId}`);
        }}
      />

      <RecallModal
        open={recallOpen}
        topicTitle={payload.topicTitle}
        subtopics={subtopics}
        prompt="Quick recall — 15 minutes since the last check."
        onComplete={handleRecallComplete}
      />

      <Dialog open={endOpen}>
        <DialogContent className="max-w-2xl" hideClose>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-brand-navy" /> Session Summary
            </DialogTitle>
            <DialogDescription>
              {payload.topicTitle} · {Math.round(elapsedSec / 60)} minutes ·{" "}
              {recalls.length} recall{recalls.length === 1 ? "" : "s"}
            </DialogDescription>
          </DialogHeader>
          {feedbackLoading && <p className="text-sm text-muted-foreground">Generating summary…</p>}
          {feedbackError && (
            <p className="text-sm text-destructive">Could not generate summary: {feedbackError}</p>
          )}
          {feedback && (
            <div className="space-y-3">
              <p className="text-sm">{feedback.summary}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <SummaryList title="Strengths" items={feedback.strengths} />
                <SummaryList title="Weaknesses" items={feedback.weaknesses} />
              </div>
              <div className="rounded-lg border bg-muted/40 p-3 text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <p>
                    <span className="font-semibold text-lg">+{xpInfo.total} XP</span>
                    {xpInfo.overtimeMin > 0 && (
                      <span className="ml-2 text-xs text-brand-gold-dark">
                        ({xpInfo.overtimeMin} min over target — bonus!)
                      </span>
                    )}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    level Δ {feedback.knowledge_level_delta >= 0 ? "+" : ""}
                    {feedback.knowledge_level_delta}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded border p-1.5">
                    <p className="font-mono font-semibold tabular-nums">{xpInfo.base}</p>
                    <p className="text-muted-foreground">Base</p>
                  </div>
                  <div className="rounded border p-1.5">
                    <p className="font-mono font-semibold tabular-nums">{xpInfo.onTrackXp}</p>
                    <p className="text-muted-foreground">On-track</p>
                  </div>
                  <div className="rounded border bg-brand-gold/5 p-1.5">
                    <p className="font-mono font-semibold tabular-nums text-brand-gold-dark">
                      +{xpInfo.overtimeXp}
                    </p>
                    <p className="text-muted-foreground">Overtime</p>
                  </div>
                </div>
                {feedback.anki_cards.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {feedback.anki_cards.length} review card{feedback.anki_cards.length === 1 ? "" : "s"} queued
                  </p>
                )}
              </div>
              <p className="text-sm">
                <span className="font-semibold">Next:</span> {feedback.next_recommendation}
              </p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => router.push("/study")}>
              New session
            </Button>
            <Button variant="brand" onClick={() => router.push("/dashboard")}>
              Back to dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DurationEditor({
  currentMinutes,
  onApply,
}: {
  currentMinutes: number;
  onApply: (m: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currentMinutes);
  useEffect(() => {
    if (open) setValue(currentMinutes);
  }, [open, currentMinutes]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        title="Edit duration"
        onClick={() => setOpen(true)}
      >
        <Pencil className="h-3.5 w-3.5" />
      </Button>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Adjust target duration</DialogTitle>
          <DialogDescription>
            Studying past your target earns 2× XP per minute as an overtime bonus.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex items-end justify-between">
            <Label>Target</Label>
            <span className="font-mono text-sm tabular-nums">{value} min</span>
          </div>
          <Slider min={15} max={300} step={5} value={[value]} onValueChange={(v) => setValue(v[0])} />
          <div className="flex justify-between text-[10px] uppercase tracking-wide text-muted-foreground">
            <span>15m</span>
            <span>60m</span>
            <span>180m</span>
            <span>300m</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="brand"
            onClick={() => {
              onApply(value);
              setOpen(false);
              toast.success(`Target updated to ${value} min.`);
            }}
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SessionRightPanel({
  topicTitle,
  topicId,
  subtopicId,
  subtopicTitle,
}: {
  topicTitle: string;
  topicId: string;
  subtopicId: string | null;
  subtopicTitle: string | null;
}) {
  const [tab, setTab] = useState("tutor");
  return (
    <Tabs value={tab} onValueChange={setTab} className="flex h-full flex-col">
      <TabsList className="m-2 grid grid-cols-3">
        <TabsTrigger value="tutor" className="gap-1 text-xs">
          <MessageSquare className="h-3.5 w-3.5" /> Tutor
        </TabsTrigger>
        <TabsTrigger value="notes" className="gap-1 text-xs">
          <FileText className="h-3.5 w-3.5" /> Notes
        </TabsTrigger>
        <TabsTrigger value="practice" className="gap-1 text-xs">
          <Lightbulb className="h-3.5 w-3.5" /> Practice
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tutor" className="m-0 flex-1 overflow-hidden border-t">
        <SessionChat topicTitle={topicTitle} />
      </TabsContent>
      <TabsContent value="notes" className="m-0 flex-1 overflow-hidden border-t">
        <SessionNotes
          topicId={topicId}
          topicTitle={topicTitle}
          subtopicId={subtopicId}
          subtopicTitle={subtopicTitle}
        />
      </TabsContent>
      <TabsContent value="practice" className="m-0 flex-1 overflow-hidden border-t">
        <PracticePanel topicId={topicId} subtopicId={subtopicId} />
      </TabsContent>
    </Tabs>
  );
}

function PracticePanel({
  topicId,
  subtopicId,
}: {
  topicId: string;
  subtopicId: string | null;
}) {
  const [mode, setMode] = useState<"flashcards" | "quiz" | "test">("flashcards");
  return (
    <div className="flex h-full flex-col">
      <div className="grid grid-cols-3 gap-1 border-b p-2">
        <ModePill
          label="Flashcards"
          icon={Lightbulb}
          active={mode === "flashcards"}
          onClick={() => setMode("flashcards")}
        />
        <ModePill
          label="Quiz"
          icon={Sparkles}
          active={mode === "quiz"}
          onClick={() => setMode("quiz")}
        />
        <ModePill
          label="Test"
          icon={Target}
          active={mode === "test"}
          onClick={() => setMode("test")}
        />
      </div>
      <div className="flex-1 overflow-hidden">
        {mode === "flashcards" && (
          <InSessionFlashcards
            topicId={topicId}
            topicTitle=""
            subtopicId={subtopicId}
          />
        )}
        {mode === "quiz" && <InSessionTest topicId={topicId} subtopicId={subtopicId} mode="quiz" />}
        {mode === "test" && <InSessionTest topicId={topicId} subtopicId={subtopicId} mode="test" />}
      </div>
    </div>
  );
}

function ModePill({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: typeof Target;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-brand-navy bg-brand-navy text-white"
          : "border-transparent bg-muted text-muted-foreground hover:bg-accent",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function NavigationBar({
  currentSubtopicId,
  onJump,
}: {
  currentSubtopicId: string | null;
  onJump: (target: NonNullable<ReturnType<typeof findNextSubtopic>>) => void;
}) {
  const prev = useMemo(
    () => (currentSubtopicId ? findPrevSubtopic(currentSubtopicId) : null),
    [currentSubtopicId],
  );
  const next = useMemo(
    () => (currentSubtopicId ? findNextSubtopic(currentSubtopicId) : null),
    [currentSubtopicId],
  );
  if (!prev && !next) return null;
  return (
    <div className="sticky bottom-0 z-10 grid grid-cols-1 gap-2 border-t bg-card px-4 py-2 sm:grid-cols-2 sm:px-6 lg:px-10">
      {prev ? (
        <button
          onClick={() => onJump(prev)}
          className="flex items-center gap-3 rounded-md border bg-background px-3 py-2 text-left transition-colors hover:bg-accent/40"
        >
          <SkipBack className="h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Previous</p>
            <p className="truncate text-sm font-medium">
              <span className="font-mono text-xs text-muted-foreground">{prev.fullNumber}</span>{" "}
              {prev.subtopic.title}
            </p>
          </div>
        </button>
      ) : (
        <div />
      )}
      {next ? (
        <button
          onClick={() => onJump(next)}
          className="flex items-center gap-3 rounded-md border border-brand-navy/20 bg-brand-navy/5 px-3 py-2 text-left transition-colors hover:bg-brand-navy/10"
        >
          <div className="min-w-0 flex-1 text-right sm:text-left">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Up next</p>
            <p className="truncate text-sm font-medium">
              <span className="font-mono text-xs text-muted-foreground">{next.fullNumber}</span>{" "}
              {next.subtopic.title}
            </p>
          </div>
          <SkipForward className="h-4 w-4 shrink-0 text-brand-navy" />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}

function FocusWidget({ score, recallsCount }: { score: number; recallsCount: number }) {  const pct = Math.round(score * 100);
  const tone = pct > 80 ? "text-emerald-600" : pct > 60 ? "text-amber-600" : "text-rose-600";
  return (
    <div className="ml-auto flex items-center gap-2 rounded-md border bg-background px-2.5 py-1.5">
      <Target className="h-3.5 w-3.5 text-muted-foreground" />
      <div className="leading-tight">
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Focus</p>
        <p className={cn("text-sm font-semibold tabular-nums", tone)}>{pct}%</p>
      </div>
      <span className="text-[10px] text-muted-foreground">·</span>
      <span className="text-[10px] text-muted-foreground">
        {recallsCount} recall{recallsCount === 1 ? "" : "s"}
      </span>
    </div>
  );
}

function SummaryList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border p-3">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">—</p>
      ) : (
        <ul className="list-disc space-y-1 pl-4 text-sm">
          {items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function computeFocusScore(elapsedSec: number, recallsCount: number, targetSec: number) {
  if (elapsedSec === 0) return 1;
  const expectedRecalls = Math.floor(elapsedSec / RECALL_INTERVAL_SECONDS);
  const recallRatio = expectedRecalls === 0 ? 1 : Math.min(1, recallsCount / expectedRecalls);
  const pacing = Math.min(1, elapsedSec / Math.max(60, targetSec));
  return 0.6 * recallRatio + 0.4 * pacing;
}
