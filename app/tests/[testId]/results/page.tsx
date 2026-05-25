"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, Trophy, AlertTriangle, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MarkdownWithMath } from "@/components/shared/MarkdownWithMath";
import { loadTest, upsertTest, computeAutoScore, type StoredTest } from "@/lib/tests-store";
import { formatClock } from "@/lib/ai/stream";
import { useAiProvider } from "@/lib/ai/use-provider";
import { cn } from "@/lib/utils";

interface AnalysisResponse {
  summary: string;
  weak_areas: string[];
  patterns: string[];
  next_steps: string[];
}

export default function TestResultsPage() {
  const params = useParams<{ testId: string }>();
  const router = useRouter();
  const provider = useAiProvider();
  const [test, setTest] = useState<StoredTest | null>(null);
  const [missing, setMissing] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  useEffect(() => {
    const t = loadTest(params.testId);
    if (!t) {
      setMissing(true);
      return;
    }
    setTest(t);
  }, [params.testId]);

  const score = useMemo(() => (test ? computeAutoScore(test) : null), [test]);

  useEffect(() => {
    if (!test || test.analysis) return;
    void runAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test?.id]);

  async function runAnalysis() {
    if (!test) return;
    setAnalysisLoading(true);
    setAnalysisError(null);
    try {
      const items = test.questions.map((q) => {
        const a = test.answers[q.id];
        const verdict = a?.evaluation?.verdict ?? deriveAutoVerdict(q, a);
        const explanation = a?.evaluation?.explanation ?? "(no AI explanation)";
        return { topic: q.topic, verdict, explanation };
      });
      const res = await fetch("/api/ai/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis: true, questions: items, provider }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as AnalysisResponse;
      const updated: StoredTest = {
        ...test,
        analysis: data,
        finalScore: score?.pct ?? null,
      };
      upsertTest(updated);
      setTest(updated);
    } catch (e) {
      setAnalysisError((e as Error).message);
    } finally {
      setAnalysisLoading(false);
    }
  }

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
  if (!test || !score) return <p className="text-sm text-muted-foreground">Loading results…</p>;

  const totalTimeSec = Object.values(test.answers).reduce((sum, a) => sum + (a.timeSpentSec ?? 0), 0);
  const ringColor =
    score.pct >= 80 ? "stroke-emerald-500" : score.pct >= 60 ? "stroke-amber-500" : "stroke-rose-500";

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Button asChild variant="ghost" size="sm" className="-ml-2 mb-1">
            <Link href="/tests">
              <ArrowLeft className="h-4 w-4" /> Back to tests
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{test.title}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline" className="capitalize">
              {test.type}
            </Badge>
            <Badge variant="secondary" className="capitalize">
              {test.difficulty}
            </Badge>
            <span>· {test.questions.length} questions</span>
            <span>· {formatClock(totalTimeSec)} total</span>
          </div>
        </div>
        <Button variant="brand" onClick={() => router.push("/tests")}>
          Take another <ArrowRight className="h-4 w-4" />
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <Card>
            <CardContent className="flex flex-col items-center gap-4 p-6">
              <div className="relative h-40 w-40">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle cx="50" cy="50" r="44" className="fill-none stroke-muted" strokeWidth="10" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="44"
                    className={cn("fill-none", ringColor)}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 44}
                    initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 44 * (1 - score.pct / 100) }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold tabular-nums">{score.pct}</span>
                  <span className="text-xs text-muted-foreground">%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold">{verdictLabel(score.pct)}</p>
                <p className="text-xs text-muted-foreground">
                  {score.earned.toFixed(1)} / {score.possible} pts
                </p>
              </div>
              <div className="grid w-full grid-cols-2 gap-2 text-center text-xs">
                <div className="rounded-md border p-2">
                  <p className="text-base font-bold">
                    {Object.values(test.answers).filter((a) => a.evaluation?.verdict === "correct").length}
                  </p>
                  <p className="text-muted-foreground">Correct</p>
                </div>
                <div className="rounded-md border p-2">
                  <p className="text-base font-bold">
                    {
                      Object.values(test.answers).filter(
                        (a) => a.evaluation?.verdict === "incorrect" || a.evaluation?.verdict === "partial",
                      ).length
                    }
                  </p>
                  <p className="text-muted-foreground">Errors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-brand-gold" /> AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysisLoading && <p className="text-sm text-muted-foreground">Analyzing your test…</p>}
              {analysisError && (
                <p className="text-sm text-destructive">Could not analyze: {analysisError}</p>
              )}
              {test.analysis && (
                <div className="space-y-3 text-sm">
                  <p>{test.analysis.summary}</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Block
                      icon={AlertTriangle}
                      title="Weak areas"
                      items={test.analysis.weak_areas}
                      tone="rose"
                    />
                    <Block
                      icon={Target}
                      title="Patterns"
                      items={test.analysis.patterns}
                      tone="amber"
                    />
                    <Block
                      icon={Trophy}
                      title="Next steps"
                      items={test.analysis.next_steps}
                      tone="emerald"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Per-question review</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="space-y-2">
                {test.questions.map((q, i) => {
                  const a = test.answers[q.id];
                  const verdict = a?.evaluation?.verdict ?? deriveAutoVerdict(q, a);
                  return (
                    <AccordionItem
                      key={q.id}
                      value={q.id}
                      className="rounded-lg border bg-card"
                    >
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <div className="flex flex-1 items-center justify-between pr-3">
                          <div className="flex items-center gap-3 text-left">
                            <span className="font-mono text-xs text-muted-foreground">Q{i + 1}</span>
                            <span className="text-sm font-medium">{q.topic}</span>
                          </div>
                          <div className="flex items-center gap-2">
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
                            {a?.timeSpentSec != null && (
                              <span className="text-xs text-muted-foreground">
                                {formatClock(a.timeSpentSec)}
                              </span>
                            )}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 px-4 pb-4 pt-0">
                        <div>
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Question
                          </p>
                          <MarkdownWithMath content={q.prompt} className="prose-sm" />
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="rounded-md border bg-muted/30 p-3">
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Your answer
                            </p>
                            {renderStudentAnswer(q, a?.answer ?? null)}
                          </div>
                          <div className="rounded-md border bg-muted/30 p-3">
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Reference
                            </p>
                            {renderReference(q)}
                          </div>
                        </div>
                        {a?.evaluation && (
                          <div className="rounded-md border-l-4 border-brand-gold bg-brand-gold/5 p-3 text-sm">
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-brand-gold-dark">
                              AI evaluation
                            </p>
                            <MarkdownWithMath
                              content={a.evaluation.explanation}
                              className="prose-sm"
                            />
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Block({
  icon: Icon,
  title,
  items,
  tone,
}: {
  icon: typeof Trophy;
  title: string;
  items: string[];
  tone: "rose" | "amber" | "emerald";
}) {
  const tones = {
    rose: "bg-rose-50 border-rose-200 text-rose-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
  };
  return (
    <div className={cn("rounded-md border p-3", tones[tone])}>
      <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold">
        <Icon className="h-3.5 w-3.5" /> {title}
      </p>
      {items.length === 0 ? (
        <p className="text-xs opacity-70">—</p>
      ) : (
        <ul className="space-y-1 text-xs">
          {items.map((it, i) => (
            <li key={i}>· {it}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function deriveAutoVerdict(
  q: { type: string; correct_indices: number[] | null },
  a: { answer: string | number[] | null } | undefined,
): "correct" | "partial" | "incorrect" {
  if (!a || a.answer === null || a.answer === "") return "incorrect";
  if ((q.type === "mcq" || q.type === "multi") && Array.isArray(a.answer) && q.correct_indices) {
    const aSet = new Set(a.answer);
    const bSet = new Set(q.correct_indices);
    const equal = aSet.size === bSet.size && Array.from(aSet).every((x) => bSet.has(x));
    return equal ? "correct" : "incorrect";
  }
  return "partial";
}

function renderStudentAnswer(
  q: { type: string; options: string[] | null },
  answer: string | number[] | null,
) {
  if (answer === null) return <p className="text-sm text-muted-foreground">No answer</p>;
  if (Array.isArray(answer)) {
    if (answer.length === 0) return <p className="text-sm text-muted-foreground">No selection</p>;
    return (
      <ul className="space-y-1 text-sm">
        {answer.map((idx) => (
          <li key={idx}>
            <span className="font-mono text-xs text-muted-foreground">{idx + 1}.</span>{" "}
            <MarkdownWithMath content={q.options?.[idx] ?? ""} className="prose-sm inline" />
          </li>
        ))}
      </ul>
    );
  }
  if (q.type === "code") {
    return (
      <pre className="overflow-x-auto rounded bg-slate-900 p-2 text-xs text-slate-100">
        <code>{answer}</code>
      </pre>
    );
  }
  return <MarkdownWithMath content={answer} className="prose-sm" />;
}

function renderReference(q: {
  type: string;
  options: string[] | null;
  correct_indices: number[] | null;
  ideal_answer: string | null;
}) {
  if ((q.type === "mcq" || q.type === "multi") && q.correct_indices && q.options) {
    return (
      <ul className="space-y-1 text-sm">
        {q.correct_indices.map((idx) => (
          <li key={idx}>
            <span className="font-mono text-xs text-muted-foreground">{idx + 1}.</span>{" "}
            <MarkdownWithMath content={q.options?.[idx] ?? ""} className="prose-sm inline" />
          </li>
        ))}
      </ul>
    );
  }
  if (q.ideal_answer) return <MarkdownWithMath content={q.ideal_answer} className="prose-sm" />;
  return <p className="text-sm text-muted-foreground">—</p>;
}

function verdictLabel(pct: number) {
  if (pct >= 90) return "Excellent";
  if (pct >= 80) return "Strong";
  if (pct >= 70) return "Solid";
  if (pct >= 60) return "Passing";
  if (pct >= 40) return "Needs work";
  return "Restudy";
}
