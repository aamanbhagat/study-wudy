"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Beaker,
  Filter,
  Lightbulb,
  Send,
  Sparkles,
  Shuffle,
  Star,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MarkdownWithMath } from "@/components/shared/MarkdownWithMath";
import { CodeEditor } from "@/components/shared/CodeEditor";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { LAB_PROBLEMS, type LabProblem } from "@/lib/lab-problems";
import type { FieldKey } from "@/lib/types";
import { useAiProvider } from "@/lib/ai/use-provider";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const FIELD_THEME: Record<FieldKey, string> = {
  math: "bg-field-math-bg text-field-math",
  cs: "bg-field-cs-bg text-field-cs",
  physics: "bg-field-physics-bg text-field-physics",
};

const HINT_COSTS = [5, 10, 20];

interface Evaluation {
  score: number;
  verdict: "correct" | "partial" | "incorrect";
  explanation: string;
  key_misconceptions: string[];
}

export default function LabPage() {
  const [field, setField] = useState<"all" | FieldKey>("all");
  const [difficulty, setDifficulty] = useState<"all" | "1" | "2" | "3" | "4" | "5">("all");
  const [search, setSearch] = useState("");
  const [interleaved, setInterleaved] = useState<LabProblem[] | null>(null);
  const [active, setActive] = useState<LabProblem | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return LAB_PROBLEMS.filter(
      (p) =>
        (field === "all" || p.field === field) &&
        (difficulty === "all" || p.difficulty === Number(difficulty)) &&
        (!q || p.title.toLowerCase().includes(q) || p.topicTitle.toLowerCase().includes(q)),
    );
  }, [field, difficulty, search]);

  const grouped = useMemo(() => {
    const out: Record<string, LabProblem[]> = {};
    for (const p of filtered) (out[p.topicTitle] ??= []).push(p);
    return out;
  }, [filtered]);

  function startInterleaved() {
    const pool = [...LAB_PROBLEMS];
    pool.sort(() => Math.random() - 0.5);
    const slice = pool.slice(0, 5);
    setInterleaved(slice);
    setActive(slice[0]);
    toast.info("Interleaved mode: 5 problems mixed across topics.");
  }

  if (active) {
    return (
      <ErrorBoundary label="Problem view crashed">
        <ProblemView
          problem={active}
          onBack={() => {
            setActive(null);
            if (interleaved && interleaved.length > 0) {
              const remaining = interleaved.filter((p) => p.id !== active.id);
              if (remaining.length === 0) {
                setInterleaved(null);
                toast.success("Interleaved set finished.");
              } else {
                setInterleaved(remaining);
              }
            }
          }}
          onNext={() => {
            if (!interleaved) return;
            const remaining = interleaved.filter((p) => p.id !== active.id);
            if (remaining.length === 0) {
              setInterleaved(null);
              setActive(null);
              toast.success("Interleaved set finished.");
            } else {
              setInterleaved(remaining);
              setActive(remaining[0]);
            }
          }}
          interleaving={interleaved !== null}
        />
      </ErrorBoundary>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Problem Lab</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Solve. Get hints (XP cost). Submit for AI evaluation.
          </p>
        </div>
        <Button variant="brand" onClick={startInterleaved}>
          <Shuffle className="h-4 w-4" /> Interleaved mode
        </Button>
      </header>

      <Card>
        <CardContent className="flex flex-wrap items-end gap-3 p-4">
          <div className="space-y-1">
            <Label className="text-[10px] uppercase tracking-wider">Field</Label>
            <Select value={field} onValueChange={(v) => setField(v as typeof field)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All fields</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] uppercase tracking-wider">Difficulty</Label>
            <Select value={difficulty} onValueChange={(v) => setDifficulty(v as typeof difficulty)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="1">★</SelectItem>
                <SelectItem value="2">★★</SelectItem>
                <SelectItem value="3">★★★</SelectItem>
                <SelectItem value="4">★★★★</SelectItem>
                <SelectItem value="5">★★★★★</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="ml-auto flex flex-1 items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search problems…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9"
            />
          </div>
        </CardContent>
      </Card>

      {Object.keys(grouped).length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-10 text-center">
            <Beaker className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No problems match these filters.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          {Object.entries(grouped).map(([topic, items]) => (
            <Card key={topic}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Beaker className="h-4 w-4 text-brand-navy" /> {topic}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 md:grid-cols-2">
                {items.map((p, i) => (
                  <motion.button
                    key={p.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setActive(p)}
                    className="flex items-start justify-between gap-3 rounded-md border p-3 text-left transition-colors hover:bg-accent/40"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{p.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{p.kind}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Difficulty stars={p.difficulty} />
                      <Badge variant="outline" className={FIELD_THEME[p.field]}>
                        {p.field}
                      </Badge>
                    </div>
                  </motion.button>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function Difficulty({ stars }: { stars: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${stars} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn("h-3 w-3", i <= stars ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40")}
        />
      ))}
    </span>
  );
}

function ProblemView({
  problem,
  onBack,
  onNext,
  interleaving,
}: {
  problem: LabProblem;
  onBack: () => void;
  onNext: () => void;
  interleaving: boolean;
}) {
  const provider = useAiProvider();
  const [hintsShown, setHintsShown] = useState(0);
  const [answer, setAnswer] = useState(problem.starterCode ?? "");
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  function takeHint() {
    if (hintsShown >= problem.hints.length) return;
    const cost = HINT_COSTS[Math.min(HINT_COSTS.length - 1, hintsShown)];
    setHintsShown((n) => n + 1);
    toast.info(`Hint ${hintsShown + 1} unlocked · −${cost} XP`);
  }

  async function submit() {
    if (!answer.trim()) return;
    setEvaluating(true);
    setEvaluation(null);
    try {
      const res = await fetch("/api/ai/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: problem.prompt,
          idealAnswer: problem.solution,
          studentAnswer: answer,
          questionType: problem.kind === "code" ? "code" : "open",
          provider,
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as Evaluation;
      setEvaluation(data);
      if (data.verdict === "correct") toast.success("Correct! Nice work.");
      else if (data.verdict === "partial") toast.warning("Partial credit — see feedback.");
      else toast.error("Not quite — try again with the feedback.");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setEvaluating(false);
    }
  }

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
        <ArrowLeft className="h-4 w-4" /> Back to library
      </Button>
      <header>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{problem.title}</h1>
            <p className="text-sm text-muted-foreground">{problem.topicTitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <Difficulty stars={problem.difficulty} />
            <Badge variant="outline" className={FIELD_THEME[problem.field]}>
              {problem.field}
            </Badge>
            <Badge variant="secondary" className="capitalize">
              {problem.kind}
            </Badge>
          </div>
        </div>
      </header>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Problem</CardTitle>
        </CardHeader>
        <CardContent>
          <MarkdownWithMath content={problem.prompt} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-base">Your work</CardTitle>
          <div className="text-xs text-muted-foreground">
            Hints used: {hintsShown}/{problem.hints.length}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {problem.kind === "code" ? (
            <CodeEditor
              language={problem.language ?? "python"}
              value={answer}
              onChange={(v) => setAnswer(v ?? "")}
            />
          ) : (
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write your derivation or solution. LaTeX with $...$ supported."
              className="min-h-[220px] font-mono text-sm"
            />
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={submit} disabled={!answer.trim() || evaluating} variant="brand">
              {evaluating ? "Evaluating…" : "Submit for evaluation"} <Send className="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" onClick={takeHint} disabled={hintsShown >= problem.hints.length}>
              <Lightbulb className="h-3.5 w-3.5" />
              {hintsShown >= problem.hints.length
                ? "All hints used"
                : `Hint (−${HINT_COSTS[Math.min(HINT_COSTS.length - 1, hintsShown)]} XP)`}
            </Button>
            {interleaving && (
              <Button variant="ghost" onClick={onNext} className="ml-auto">
                Next problem <ChevronDown className="h-4 w-4 -rotate-90" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {hintsShown > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Lightbulb className="h-4 w-4 text-amber-500" /> Hints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-2 pl-5 text-sm">
              {problem.hints.slice(0, hintsShown).map((h, i) => (
                <li key={i}>
                  <MarkdownWithMath content={h} className="prose-sm" />
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}

      {evaluation && (
        <Card className="border-l-4 border-l-brand-gold">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-brand-gold" /> AI evaluation
              <Badge
                variant={
                  evaluation.verdict === "correct"
                    ? "default"
                    : evaluation.verdict === "partial"
                      ? "secondary"
                      : "destructive"
                }
                className="capitalize"
              >
                {evaluation.verdict} · {Math.round(evaluation.score * 100)}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownWithMath content={evaluation.explanation} />
            {evaluation.key_misconceptions.length > 0 && (
              <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
                {evaluation.key_misconceptions.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-sm">
            <span>Reference solution</span>
            <Button variant="ghost" size="sm" onClick={() => setShowSolution((s) => !s)}>
              {showSolution ? "Hide" : "Show"}
            </Button>
          </CardTitle>
        </CardHeader>
        {showSolution && (
          <CardContent>
            {problem.kind === "code" ? (
              <pre className="overflow-x-auto rounded bg-slate-900 p-3 text-xs text-slate-100">
                <code>{problem.solution}</code>
              </pre>
            ) : (
              <MarkdownWithMath content={problem.solution} />
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
