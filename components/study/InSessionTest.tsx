"use client";

import { useEffect, useMemo, useState } from "react";
import { Sparkles, AlertCircle, Trophy, ArrowRight, Check, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { MarkdownWithMath } from "@/components/shared/MarkdownWithMath";
import { findTopic } from "@/lib/curriculum-helpers";
import { useAiProvider } from "@/lib/ai/use-provider";
import type { TestDifficulty } from "@/lib/ai/prompts";
import type { GenerateTestResponse, TestQuestion } from "@/app/api/ai/generate-test/route";
import { cn } from "@/lib/utils";

interface InSessionTestProps {
  topicId: string;
  subtopicId: string | null;
  mode: "quiz" | "test";
}

const DIFFICULTIES: { value: TestDifficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  { value: "elite", label: "Elite" },
];

export function InSessionTest({ topicId, subtopicId, mode }: InSessionTestProps) {
  const provider = useAiProvider();
  const [difficulty, setDifficulty] = useState<TestDifficulty>("medium");
  const [scope, setScope] = useState<"subtopic" | "topic">(subtopicId ? "subtopic" : "topic");
  const [phase, setPhase] = useState<"setup" | "loading" | "running" | "results">("setup");
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | number[]>>({});
  const [evaluations, setEvaluations] = useState<Record<string, EvalResult>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    setScope(subtopicId ? "subtopic" : "topic");
  }, [subtopicId]);

  const totalQuestions = mode === "quiz" ? 5 : 8;
  const testType = mode === "quiz" ? "quick" : "topic";

  async function start() {
    const topicLookup = findTopic(topicId);
    if (!topicLookup) {
      setError("Topic not found.");
      return;
    }
    setPhase("loading");
    setError(null);
    try {
      const subtopicTitles =
        scope === "subtopic" && subtopicId
          ? topicLookup.topic.subtopics.filter((s) => s.id === subtopicId).map((s) => s.title)
          : topicLookup.topic.subtopics.map((s) => s.title);

      const res = await fetch("/api/ai/generate-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testType,
          difficulty,
          totalQuestions,
          provider,
          topics: [{ title: topicLookup.topic.title, subtopics: subtopicTitles }],
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as GenerateTestResponse;
      setQuestions(data.questions);
      setAnswers({});
      setEvaluations({});
      setCurrentIdx(0);
      setPhase("running");
    } catch (e) {
      setError((e as Error).message);
      setPhase("setup");
    }
  }

  function recordAnswer(qid: string, value: string | number[]) {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  async function evaluateOpen(q: TestQuestion) {
    const ans = answers[q.id];
    if (typeof ans !== "string" || !ans.trim()) return;
    setEvaluating(true);
    try {
      const res = await fetch("/api/ai/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q.prompt,
          idealAnswer: q.ideal_answer,
          studentAnswer: ans,
          questionType: q.type,
          provider,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as EvalResult;
      setEvaluations((prev) => ({ ...prev, [q.id]: data }));
    } catch (e) {
      setEvaluations((prev) => ({
        ...prev,
        [q.id]: {
          score: 0,
          verdict: "incorrect",
          explanation: `Evaluation failed: ${(e as Error).message}`,
          key_misconceptions: [],
        },
      }));
    } finally {
      setEvaluating(false);
    }
  }

  function next() {
    setCurrentIdx((i) => Math.min(questions.length - 1, i + 1));
  }
  function prev() {
    setCurrentIdx((i) => Math.max(0, i - 1));
  }
  function finish() {
    setPhase("results");
  }
  function reset() {
    setPhase("setup");
    setQuestions([]);
    setAnswers({});
    setEvaluations({});
    setCurrentIdx(0);
  }

  const score = useMemo(() => computeScore(questions, answers, evaluations), [
    questions,
    answers,
    evaluations,
  ]);

  if (phase === "setup") {
    return (
      <ScrollArea className="h-full">
        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {mode === "quiz" ? "Quick Quiz" : "Topic Test"}
            </p>
            <p className="text-sm text-muted-foreground">
              {mode === "quiz"
                ? "5 quick questions to check recall."
                : "8 questions mixing concepts, derivations, and one harder application."}
            </p>
          </div>

          {subtopicId && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Scope
              </p>
              <div className="flex gap-1 rounded-md bg-muted p-0.5 text-xs">
                <button
                  onClick={() => setScope("subtopic")}
                  className={cn(
                    "flex-1 rounded px-2 py-1.5 transition-colors",
                    scope === "subtopic"
                      ? "bg-background font-medium text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Just this subtopic
                </button>
                <button
                  onClick={() => setScope("topic")}
                  className={cn(
                    "flex-1 rounded px-2 py-1.5 transition-colors",
                    scope === "topic"
                      ? "bg-background font-medium text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Whole topic
                </button>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Difficulty
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDifficulty(d.value)}
                  className={cn(
                    "rounded-md border px-3 py-2 text-xs font-medium transition-colors",
                    difficulty === d.value
                      ? "border-brand-navy bg-brand-navy/5 text-brand-navy"
                      : "hover:border-foreground/20 hover:bg-accent/40",
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-md border border-rose-200 bg-rose-50 p-3 text-xs text-rose-900">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <Button variant="brand" size="sm" className="w-full" onClick={start}>
            Generate {mode === "quiz" ? "quiz" : "test"} <ArrowRight className="h-3.5 w-3.5" />
          </Button>
          <p className="text-[10px] text-muted-foreground">
            Generation needs ANTHROPIC_API_KEY or GOOGLE_GEMINI_API_KEY in .env.local.
          </p>
        </div>
      </ScrollArea>
    );
  }

  if (phase === "loading") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
        <Sparkles className="h-6 w-6 animate-pulse text-brand-gold" />
        <p className="text-sm font-semibold">
          Generating {totalQuestions} questions…
        </p>
        <p className="text-xs text-muted-foreground">~5–15 seconds</p>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <ScrollArea className="h-full">
        <div className="space-y-4 p-4">
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <Trophy className="mx-auto h-8 w-8 text-brand-gold" />
            <p className="mt-2 text-3xl font-bold tabular-nums">{score.pct}%</p>
            <p className="text-xs text-muted-foreground">
              {score.earned.toFixed(1)} / {score.possible} pts
            </p>
          </div>
          <div className="space-y-2">
            {questions.map((q, i) => {
              const verdict = deriveVerdict(q, answers[q.id], evaluations[q.id]);
              return (
                <div key={q.id} className="rounded-md border p-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-muted-foreground">Q{i + 1}</span>
                    <Badge
                      variant={
                        verdict === "correct"
                          ? "default"
                          : verdict === "partial"
                            ? "secondary"
                            : "destructive"
                      }
                      className="capitalize"
                    >
                      {verdict}
                    </Badge>
                  </div>
                  <MarkdownWithMath content={q.prompt} className="prose-sm mt-1" />
                  {evaluations[q.id]?.explanation && (
                    <p className="mt-1.5 text-[11px] text-muted-foreground">
                      {evaluations[q.id]!.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5" /> New {mode}
          </Button>
        </div>
      </ScrollArea>
    );
  }

  // running
  const q = questions[currentIdx];
  if (!q) return null;
  const ans = answers[q.id];
  const ev = evaluations[q.id];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <span className="text-[11px] text-muted-foreground">
          Question {currentIdx + 1}/{questions.length}
        </span>
        <Badge variant="outline" className="ml-auto capitalize">
          {q.difficulty}
        </Badge>
        <Badge>{q.points} pts</Badge>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-3 p-3">
          <MarkdownWithMath content={q.prompt} className="prose-sm" />

          {q.type === "mcq" && q.options && (
            <div className="space-y-1.5">
              {q.options.map((opt, i) => {
                const selected = Array.isArray(ans) && ans.includes(i);
                return (
                  <label
                    key={i}
                    className={cn(
                      "flex cursor-pointer items-start gap-2 rounded-md border p-2 text-xs",
                      selected ? "border-brand-navy bg-brand-navy/5" : "hover:bg-accent/40",
                    )}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      checked={selected}
                      onChange={() => recordAnswer(q.id, [i])}
                      className="mt-0.5 h-3.5 w-3.5 accent-brand-navy"
                    />
                    <MarkdownWithMath content={opt} className="prose-sm flex-1" />
                  </label>
                );
              })}
            </div>
          )}

          {q.type === "multi" && q.options && (
            <div className="space-y-1.5">
              {q.options.map((opt, i) => {
                const selected = Array.isArray(ans) && ans.includes(i);
                return (
                  <label
                    key={i}
                    className={cn(
                      "flex cursor-pointer items-start gap-2 rounded-md border p-2 text-xs",
                      selected ? "border-brand-navy bg-brand-navy/5" : "hover:bg-accent/40",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => {
                        const cur = Array.isArray(ans) ? ans : [];
                        const next = cur.includes(i)
                          ? cur.filter((x) => x !== i)
                          : [...cur, i].sort((a, b) => a - b);
                        recordAnswer(q.id, next);
                      }}
                      className="mt-0.5 h-3.5 w-3.5 accent-brand-navy"
                    />
                    <MarkdownWithMath content={opt} className="prose-sm flex-1" />
                  </label>
                );
              })}
            </div>
          )}

          {(q.type === "open" || q.type === "code") && (
            <div className="space-y-2">
              <Textarea
                value={typeof ans === "string" ? ans : ""}
                onChange={(e) => recordAnswer(q.id, e.target.value)}
                placeholder="Type your answer. LaTeX with $...$ supported."
                className="min-h-[140px] font-mono text-xs"
              />
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => evaluateOpen(q)}
                  disabled={typeof ans !== "string" || !ans.trim() || evaluating}
                >
                  {evaluating ? "Evaluating…" : "Evaluate"}
                </Button>
                {ev && (
                  <Badge
                    variant={
                      ev.verdict === "correct"
                        ? "default"
                        : ev.verdict === "partial"
                          ? "secondary"
                          : "destructive"
                    }
                    className="capitalize"
                  >
                    {ev.verdict} · {Math.round(ev.score * 100)}%
                  </Badge>
                )}
              </div>
              {ev && (
                <div className="rounded-md border-l-2 border-brand-gold bg-brand-gold/5 p-2 text-[11px]">
                  <MarkdownWithMath content={ev.explanation} className="prose-sm" />
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex items-center justify-between gap-2 border-t p-2">
        <Button variant="outline" size="sm" onClick={prev} disabled={currentIdx === 0}>
          Prev
        </Button>
        {currentIdx < questions.length - 1 ? (
          <Button variant="brand" size="sm" onClick={next}>
            Next
          </Button>
        ) : (
          <Button variant="brand" size="sm" onClick={finish}>
            Finish <Check className="h-3.5 w-3.5" />
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={reset} title="Reset">
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

interface EvalResult {
  score: number;
  verdict: "correct" | "partial" | "incorrect";
  explanation: string;
  key_misconceptions: string[];
}

function deriveVerdict(
  q: TestQuestion,
  ans: string | number[] | undefined,
  ev: EvalResult | undefined,
): "correct" | "partial" | "incorrect" {
  if (ev) return ev.verdict;
  if (!ans || (Array.isArray(ans) && ans.length === 0) || (typeof ans === "string" && !ans.trim())) {
    return "incorrect";
  }
  if ((q.type === "mcq" || q.type === "multi") && Array.isArray(ans) && q.correct_indices) {
    const aSet = new Set(ans);
    const bSet = new Set(q.correct_indices);
    const equal = aSet.size === bSet.size && Array.from(aSet).every((x) => bSet.has(x));
    return equal ? "correct" : "incorrect";
  }
  return "partial";
}

function computeScore(
  questions: TestQuestion[],
  answers: Record<string, string | number[]>,
  evaluations: Record<string, EvalResult>,
) {
  let earned = 0;
  let possible = 0;
  for (const q of questions) {
    possible += q.points;
    const ans = answers[q.id];
    const ev = evaluations[q.id];
    const verdict = deriveVerdict(q, ans, ev);
    if (verdict === "correct") earned += q.points;
    else if (verdict === "partial") earned += q.points * (ev?.score ?? 0.5);
  }
  return { earned, possible, pct: possible > 0 ? Math.round((earned / possible) * 100) : 0 };
}
