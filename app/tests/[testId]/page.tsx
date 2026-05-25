"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, ArrowRight, Send, Sparkles, Eye, EyeOff, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MarkdownWithMath } from "@/components/shared/MarkdownWithMath";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { loadTest, upsertTest, type StoredTest, type TestSubmissionAnswer } from "@/lib/tests-store";
import { formatClock } from "@/lib/ai/stream";
import { useAiProvider } from "@/lib/ai/use-provider";
import { cn } from "@/lib/utils";

interface EvalResponse {
  score: number;
  verdict: "correct" | "partial" | "incorrect";
  explanation: string;
  key_misconceptions: string[];
}

export default function ActiveTestPage() {
  const params = useParams<{ testId: string }>();
  const router = useRouter();
  const testId = params.testId;
  const provider = useAiProvider();

  const [test, setTest] = useState<StoredTest | null>(null);
  const [missing, setMissing] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, TestSubmissionAnswer>>({});
  const [evaluating, setEvaluating] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [showLatexPreview, setShowLatexPreview] = useState(false);
  const [tick, setTick] = useState(0);
  const startedAtRef = useRef<number>(Date.now());
  const questionStartedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    const t = loadTest(testId);
    if (!t) {
      setMissing(true);
      return;
    }
    setTest(t);
    setAnswers(t.answers ?? {});
    startedAtRef.current = t.startedAt ? new Date(t.startedAt).getTime() : Date.now();
    questionStartedAtRef.current = Date.now();
    setHydrated(true);
  }, [testId]);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!test) return;
    upsertTest({ ...test, answers });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  useEffect(() => {
    questionStartedAtRef.current = Date.now();
  }, [currentIdx]);

  const elapsedSec = useMemo(
    () => Math.floor((Date.now() - startedAtRef.current) / 1000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tick],
  );

  if (missing) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Test not found</h1>
        <Button asChild variant="brand">
          <Link href="/tests">New test</Link>
        </Button>
      </div>
    );
  }
  if (!hydrated || !test) return <p className="text-sm text-muted-foreground">Loading test…</p>;

  const total = test.questions.length;
  const targetSec = test.durationMinutes * 60;
  const remaining = Math.max(0, targetSec - elapsedSec);
  const overTime = elapsedSec > targetSec;
  const q = test.questions[currentIdx];
  const ans = answers[q.id];
  const answeredCount = Object.values(answers).filter((a) => a.answer !== null && a.answer !== "").length;

  function recordAnswer(answer: TestSubmissionAnswer["answer"]) {
    setAnswers((prev) => ({
      ...prev,
      [q.id]: {
        answer,
        evaluation: prev[q.id]?.evaluation,
        timeSpentSec: Math.floor((Date.now() - questionStartedAtRef.current) / 1000),
      },
    }));
  }

  async function evaluateCurrent() {
    if (!ans?.answer) return;
    setEvaluating(true);
    try {
      const studentAnswer = Array.isArray(ans.answer)
        ? `Selected indices: ${ans.answer.join(", ")}`
        : String(ans.answer);
      const res = await fetch("/api/ai/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q.prompt,
          idealAnswer: q.ideal_answer,
          studentAnswer,
          questionType: q.type,
          provider,
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as EvalResponse;
      setAnswers((prev) => ({ ...prev, [q.id]: { ...prev[q.id], evaluation: data } }));
    } catch (e) {
      setAnswers((prev) => ({
        ...prev,
        [q.id]: {
          ...prev[q.id],
          evaluation: {
            score: 0,
            verdict: "incorrect",
            explanation: `Evaluation failed: ${(e as Error).message}`,
            key_misconceptions: [],
          },
        },
      }));
    } finally {
      setEvaluating(false);
    }
  }

  function finish() {
    if (!test) return;
    const finalTest: StoredTest = {
      ...(test as StoredTest),
      answers,
      status: "completed",
      completedAt: new Date().toISOString(),
    };
    upsertTest(finalTest);
    router.push(`/tests/${test.id}/results`);
  }

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/tests" className="text-muted-foreground hover:text-foreground">
            Tests
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">{test.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-sm tabular-nums",
              overTime ? "border-rose-500 text-rose-600" : "",
            )}
          >
            <Clock className="h-3.5 w-3.5" />
            {formatClock(remaining)}
            <span className="text-xs text-muted-foreground">/ {formatClock(targetSec)}</span>
          </div>
          <Button variant="destructive" size="sm" onClick={() => setEndOpen(true)}>
            <StopCircle className="h-4 w-4" /> Submit test
          </Button>
        </div>
      </header>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Question {currentIdx + 1} of {total}
          </span>
          <span>{answeredCount} answered</span>
        </div>
        <Progress value={Math.round(((currentIdx + 1) / total) * 100)} className="h-1.5" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="font-mono text-sm text-muted-foreground">Q{currentIdx + 1}.</span>
                <span>{q.topic}</span>
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {q.type}
                </Badge>
                <Badge variant="secondary" className="capitalize">
                  {q.difficulty}
                </Badge>
                <Badge>{q.points} pts</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <MarkdownWithMath content={q.prompt} />

              {q.type === "mcq" && q.options && (
                <div className="space-y-2">
                  {q.options.map((opt, i) => {
                    const selected = Array.isArray(ans?.answer) && ans.answer.includes(i);
                    return (
                      <label
                        key={i}
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors",
                          selected ? "border-brand-navy bg-brand-navy/5" : "hover:bg-accent/40",
                        )}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={selected}
                          onChange={() => recordAnswer([i])}
                          className="mt-1 h-4 w-4 accent-brand-navy"
                        />
                        <div className="flex-1 text-sm">
                          <MarkdownWithMath content={opt} className="prose-sm" />
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}

              {q.type === "multi" && q.options && (
                <div className="space-y-2">
                  {q.options.map((opt, i) => {
                    const selected = Array.isArray(ans?.answer) && ans.answer.includes(i);
                    return (
                      <label
                        key={i}
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors",
                          selected ? "border-brand-navy bg-brand-navy/5" : "hover:bg-accent/40",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => {
                            const cur = Array.isArray(ans?.answer) ? ans.answer : [];
                            const next = cur.includes(i)
                              ? cur.filter((x) => x !== i)
                              : [...cur, i].sort((a, b) => a - b);
                            recordAnswer(next);
                          }}
                          className="mt-1 h-4 w-4 accent-brand-navy"
                        />
                        <div className="flex-1 text-sm">
                          <MarkdownWithMath content={opt} className="prose-sm" />
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}

              {q.type === "open" && (
                <div className="space-y-3">
                  <Textarea
                    value={typeof ans?.answer === "string" ? ans.answer : ""}
                    onChange={(e) => recordAnswer(e.target.value)}
                    placeholder="Write your answer. LaTeX with $...$ supported."
                    className="min-h-[200px] font-mono text-sm"
                  />
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowLatexPreview((s) => !s)}
                      type="button"
                    >
                      {showLatexPreview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      {showLatexPreview ? "Hide" : "Show"} preview
                    </Button>
                  </div>
                  {showLatexPreview && typeof ans?.answer === "string" && ans.answer.trim() && (
                    <div className="rounded-md border bg-muted/30 p-3">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Preview
                      </p>
                      <MarkdownWithMath content={ans.answer} className="prose-sm" />
                    </div>
                  )}
                </div>
              )}

              {q.type === "code" && (
                <CodeEditor
                  language={q.language ?? "python"}
                  value={
                    typeof ans?.answer === "string"
                      ? ans.answer
                      : (q.starter_code ?? "# Write your solution\n")
                  }
                  onChange={(v) => recordAnswer(v ?? "")}
                />
              )}

              {(q.type === "open" || q.type === "code") && (
                <div className="flex items-center gap-2">
                  <Button onClick={evaluateCurrent} disabled={!ans?.answer || evaluating} variant="outline">
                    {evaluating ? "Evaluating…" : "Evaluate this answer"} <Send className="h-3.5 w-3.5" />
                  </Button>
                  {ans?.evaluation && (
                    <Badge
                      variant={ans.evaluation.verdict === "correct" ? "default" : ans.evaluation.verdict === "partial" ? "secondary" : "destructive"}
                      className="capitalize"
                    >
                      {ans.evaluation.verdict} · {Math.round(ans.evaluation.score * 100)}%
                    </Badge>
                  )}
                </div>
              )}

              {ans?.evaluation && (
                <div className="rounded-md border bg-muted/30 p-3">
                  <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Sparkles className="h-3 w-3 text-brand-gold" /> AI feedback
                  </p>
                  <MarkdownWithMath content={ans.evaluation.explanation} className="prose-sm" />
                  {ans.evaluation.key_misconceptions.length > 0 && (
                    <div className="mt-2 text-xs">
                      <p className="font-semibold">Key misconceptions:</p>
                      <ul className="list-disc pl-4 text-muted-foreground">
                        {ans.evaluation.key_misconceptions.map((k, i) => (
                          <li key={i}>{k}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-4 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
              disabled={currentIdx === 0}
            >
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>
            {currentIdx === total - 1 ? (
              <Button variant="brand" onClick={() => setEndOpen(true)}>
                Finish test <Send className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="brand" onClick={() => setCurrentIdx((i) => Math.min(total - 1, i + 1))}>
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>

        <aside className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Question map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-1.5">
                {test.questions.map((qq, i) => {
                  const a = answers[qq.id];
                  const answered = a && a.answer !== null && a.answer !== "";
                  const active = i === currentIdx;
                  return (
                    <button
                      key={qq.id}
                      onClick={() => setCurrentIdx(i)}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-md border text-xs font-semibold transition-colors",
                        active
                          ? "border-brand-navy bg-brand-navy text-white"
                          : answered
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "hover:bg-accent",
                      )}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-[10px] text-muted-foreground">
                Click a number to jump. Green = answered.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>

      <Dialog open={endOpen} onOpenChange={setEndOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit test?</DialogTitle>
            <DialogDescription>
              {answeredCount} of {total} questions answered. Once submitted, you&apos;ll see the full
              results page with AI analysis.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEndOpen(false)}>
              Keep working
            </Button>
            <Button variant="brand" onClick={finish}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
