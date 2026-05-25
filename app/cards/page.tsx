"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import {
  Layers,
  RotateCcw,
  Check,
  Sparkles,
  Pause,
  Play,
  ArrowRight,
  ArrowLeft,
  ArrowLeftRight,
  Filter,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MarkdownWithMath } from "@/components/shared/MarkdownWithMath";
import {
  attachProgress,
  dueCards,
  recordReview,
  setSuspended,
  type AnkiCard,
  type CardRating,
  type CardContent as CardContentType,
} from "@/lib/cards-store";
import { CURRICULUM } from "@/lib/curriculum-data";
import { getLastStudied } from "@/lib/curriculum-helpers";
import type { FieldKey } from "@/lib/types";
import { cn } from "@/lib/utils";

const FIELD_THEME: Record<FieldKey, string> = {
  math: "bg-field-math-bg text-field-math",
  cs: "bg-field-cs-bg text-field-cs",
  physics: "bg-field-physics-bg text-field-physics",
};

const RATING_BUTTONS: { rating: CardRating; label: string; tone: string; sub: string }[] = [
  { rating: "again", label: "Again", tone: "bg-rose-100 text-rose-900 hover:bg-rose-200", sub: "<1m" },
  { rating: "hard", label: "Hard", tone: "bg-amber-100 text-amber-900 hover:bg-amber-200", sub: "<10m" },
  {
    rating: "good",
    label: "Good",
    tone: "bg-emerald-100 text-emerald-900 hover:bg-emerald-200",
    sub: "next interval",
  },
  { rating: "easy", label: "Easy", tone: "bg-sky-100 text-sky-900 hover:bg-sky-200", sub: "longer" },
];

interface SessionMeta {
  reviewed: number;
  remembered: number;
  startedAt: number;
  total: number;
}

export default function CardsPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading cards…</p>}>
      <CardsPageInner />
    </Suspense>
  );
}

function CardsPageInner() {
  const search = useSearchParams();
  const queryTopic = search.get("topic");
  const querySub = search.get("subtopic");

  const [field, setField] = useState<"all" | FieldKey>("all");
  const [topicId, setTopicId] = useState<string>("all");
  const [subtopicId, setSubtopicId] = useState<string>("all");

  const [cards, setCards] = useState<AnkiCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [flipped, setFlipped] = useState(false);
  const [tab, setTab] = useState("review");
  const [queue, setQueue] = useState<AnkiCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewCard, setPreviewCard] = useState<AnkiCard | null>(null);
  const [session, setSession] = useState<SessionMeta>({
    reviewed: 0,
    remembered: 0,
    startedAt: Date.now(),
    total: 0,
  });
  const [showStats, setShowStats] = useState(false);

  // Initial filter from URL or last-studied
  useEffect(() => {
    if (querySub) {
      const lookupSub = (() => {
        for (const f of CURRICULUM) {
          for (const p of f.phases) {
            for (const t of p.topics) {
              const s = t.subtopics.find((x) => x.id === querySub);
              if (s) return { fieldKey: f.key, topicId: t.id };
            }
          }
        }
        return null;
      })();
      if (lookupSub) {
        setField(lookupSub.fieldKey);
        setTopicId(lookupSub.topicId);
        setSubtopicId(querySub);
        return;
      }
    }
    if (queryTopic) {
      const lookup = findTopicMeta(queryTopic);
      if (lookup) {
        setField(lookup.field);
        setTopicId(queryTopic);
        return;
      }
    }
    const last = getLastStudied();
    if (last) {
      setField(last.fieldKey);
      setTopicId(last.topicId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Topics filtered by selected field
  const availableTopics = useMemo(() => {
    if (field === "all") return CURRICULUM.flatMap((f) => f.phases.flatMap((p) => p.topics));
    return CURRICULUM.find((f) => f.key === field)?.phases.flatMap((p) => p.topics) ?? [];
  }, [field]);

  // Subtopics filtered by selected topic
  const availableSubtopics = useMemo(() => {
    if (topicId === "all") return [];
    return availableTopics.find((t) => t.id === topicId)?.subtopics ?? [];
  }, [availableTopics, topicId]);

  // Reset deeper selections when parent filter changes
  useEffect(() => {
    if (topicId === "all") return;
    if (!availableTopics.some((t) => t.id === topicId)) setTopicId("all");
  }, [field, availableTopics, topicId]);
  useEffect(() => {
    if (subtopicId === "all") return;
    if (!availableSubtopics.some((s) => s.id === subtopicId)) setSubtopicId("all");
  }, [topicId, availableSubtopics, subtopicId]);

  // Fetch cards whenever filter changes
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    const url = new URL("/api/cards/list", window.location.origin);
    if (field !== "all") url.searchParams.set("field", field);
    if (topicId !== "all") url.searchParams.set("topic", topicId);
    if (subtopicId !== "all") url.searchParams.set("subtopic", subtopicId);
    fetch(url.toString())
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: { cards: CardContentType[] }) => {
        if (!active) return;
        const withProgress = attachProgress(data.cards);
        setCards(withProgress);
        const due = dueCards(withProgress).length;
        setSession({ reviewed: 0, remembered: 0, startedAt: Date.now(), total: due });
        setFlipped(false);
      })
      .catch((e: Error) => {
        if (!active) return;
        setError(e.message);
        setCards([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [field, topicId, subtopicId]);

  // Build the queue when cards change. Due cards first, then non-due.
  useEffect(() => {
    const due = dueCards(cards);
    const dueIds = new Set(due.map((c) => c.id));
    const upcoming = cards
      .filter((c) => !c.suspended && !dueIds.has(c.id))
      .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime());
    const built = [...due, ...upcoming];
    setQueue(built);
    setCurrentIndex(0);
    setSession({
      reviewed: 0,
      remembered: 0,
      startedAt: Date.now(),
      total: due.length,
    });
    setFlipped(false);
  }, [cards]);

  const current = queue[currentIndex] ?? null;
  const dueCount = useMemo(() => dueCards(cards).length, [cards]);
  const progress = session.total > 0 ? Math.round((session.reviewed / session.total) * 100) : 0;

  function rate(rating: CardRating) {
    if (!current) return;
    const next = recordReview(current.id, rating, {
      easeFactor: current.easeFactor,
      intervalDays: current.intervalDays,
      repetitions: current.repetitions,
      dueAt: current.dueAt,
      lastReviewedAt: current.lastReviewedAt,
      suspended: current.suspended,
      createdAt: current.createdAt,
    });
    // Update card content in queue (don't reshuffle; user is mid-navigation)
    setQueue((prev) => prev.map((c) => (c.id === current.id ? { ...c, ...next } : c)));
    setSession((s) => ({
      ...s,
      reviewed: s.reviewed + 1,
      remembered: s.remembered + (rating === "again" ? 0 : 1),
    }));
    setFlipped(false);
    advance();
  }

  function advance() {
    setCurrentIndex((i) => {
      const nextIdx = i + 1;
      if (nextIdx >= queue.length) {
        setShowStats(true);
        return i;
      }
      return nextIdx;
    });
  }

  function goBack() {
    setCurrentIndex((i) => Math.max(0, i - 1));
    setFlipped(false);
  }

  function goNext() {
    if (currentIndex >= queue.length - 1) return;
    setCurrentIndex((i) => i + 1);
    setFlipped(false);
  }

  function toggleSuspend(id: string) {
    const card = cards.find((c) => c.id === id);
    if (!card) return;
    setSuspended(id, !card.suspended);
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, suspended: !c.suspended } : c)));
  }

  const filterDescription = describeFilter(field, topicId, subtopicId);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Review Cards</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Spaced repetition (SM-2). {dueCount} due now · {cards.length} match filter.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Layers className="h-4 w-4" />
          <span>
            Session: {session.reviewed}/{session.total}
          </span>
        </div>
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
            <Label className="text-[10px] uppercase tracking-wider">Topic</Label>
            <Select value={topicId} onValueChange={setTopicId}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="All topics" />
              </SelectTrigger>
              <SelectContent className="max-h-[420px]">
                <SelectItem value="all">All topics</SelectItem>
                {field === "all"
                  ? CURRICULUM.map((f) => (
                      <SelectGroup key={f.key}>
                        <SelectLabel className="text-[10px] uppercase tracking-wider">
                          {f.name}
                        </SelectLabel>
                        {f.phases.flatMap((p) =>
                          p.topics.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              <span className="font-mono text-xs text-muted-foreground">{t.number}</span>{" "}
                              {t.title}
                            </SelectItem>
                          )),
                        )}
                      </SelectGroup>
                    ))
                  : availableTopics.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        <span className="font-mono text-xs text-muted-foreground">{t.number}</span>{" "}
                        {t.title}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-wider">Subtopic</Label>
            <Select
              value={subtopicId}
              onValueChange={setSubtopicId}
              disabled={topicId === "all"}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="All subtopics" />
              </SelectTrigger>
              <SelectContent className="max-h-[420px]">
                <SelectItem value="all">All subtopics</SelectItem>
                {availableSubtopics.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground md:col-span-3">
            <Filter className="h-3.5 w-3.5" />
            <span>{filterDescription}</span>
            {(field !== "all" || topicId !== "all" || subtopicId !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto h-7"
                onClick={() => {
                  setField("all");
                  setTopicId("all");
                  setSubtopicId("all");
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="review">Review queue ({dueCount})</TabsTrigger>
          <TabsTrigger value="browser">Browser ({cards.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="mt-4 space-y-4">
          {session.total > 0 && <Progress value={progress} className="h-2" />}

          {error ? (
            <Card className="border-rose-200 bg-rose-50">
              <CardContent className="flex items-center gap-3 py-6 text-rose-900">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">{error}</p>
              </CardContent>
            </Card>
          ) : loading ? (
            <Card className="border-dashed">
              <CardContent className="py-8 text-center text-sm text-muted-foreground">
                Loading cards…
              </CardContent>
            </Card>
          ) : !current ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check className="h-6 w-6" />
                </div>
                <p className="text-lg font-semibold">
                  {cards.length === 0 ? "No cards generated for this filter" : "All caught up"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {cards.length === 0
                    ? "Run the card generator: npx tsx scripts/generate-cards.ts"
                    : "No cards due right now. Come back later or change the filter."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <ReviewCard
              card={current}
              flipped={flipped}
              onFlip={() => setFlipped((f) => !f)}
              onRate={rate}
              onPrev={goBack}
              onNext={goNext}
              canPrev={currentIndex > 0}
              canNext={currentIndex < queue.length - 1}
              total={queue.length}
              position={currentIndex + 1}
            />
          )}
        </TabsContent>

        <TabsContent value="browser" className="mt-4">
          <CardBrowser cards={cards} onSuspend={toggleSuspend} onPreview={(c) => setPreviewCard(c)} />
        </TabsContent>
      </Tabs>

      <CardPreviewDialog card={previewCard} onClose={() => setPreviewCard(null)} />

      <SessionStatsDialog
        open={showStats}
        meta={session}
        onClose={() => {
          setShowStats(false);
          setSession((s) => ({ ...s, reviewed: 0, remembered: 0, startedAt: Date.now() }));
        }}
      />
    </div>
  );
}

function findTopicMeta(topicId: string): { field: FieldKey; title: string } | null {
  for (const f of CURRICULUM) {
    for (const p of f.phases) {
      const t = p.topics.find((x) => x.id === topicId);
      if (t) return { field: f.key, title: t.title };
    }
  }
  return null;
}

function describeFilter(field: "all" | FieldKey, topicId: string, subtopicId: string) {
  const parts: string[] = [];
  parts.push(
    field === "all"
      ? "All subjects"
      : field === "math"
        ? "Mathematics"
        : field === "cs"
          ? "Computer Science"
          : "Physics & Rocket Science",
  );
  if (topicId !== "all") {
    const t = findTopicMeta(topicId);
    if (t) parts.push(t.title);
  }
  if (subtopicId !== "all") {
    for (const f of CURRICULUM) {
      for (const p of f.phases) {
        for (const t of p.topics) {
          const s = t.subtopics.find((x) => x.id === subtopicId);
          if (s) parts.push(s.title);
        }
      }
    }
  }
  return parts.join(" · ");
}

function ReviewCard({
  card,
  flipped,
  onFlip,
  onRate,
  onPrev,
  onNext,
  canPrev,
  canNext,
  total,
  position,
}: {
  card: AnkiCard;
  flipped: boolean;
  onFlip: () => void;
  onRate: (r: CardRating) => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  total: number;
  position: number;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <Badge variant="outline" className={FIELD_THEME[card.field]}>
          {card.topicTitle}
        </Badge>
        <span>
          Card {position}/{total}
        </span>
      </div>

      <div className="relative" style={{ perspective: "1200px" }}>
        <motion.div
          className="relative h-[380px] w-full cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={onFlip}
        >
          <Face side="front" card={card}>
            <MarkdownWithMath content={card.front} />
            <p className="mt-6 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeftRight className="h-3 w-3" /> Click to flip
            </p>
          </Face>
          <Face side="back" card={card}>
            <MarkdownWithMath content={card.back} />
          </Face>
        </motion.div>
      </div>

      <AnimatePresence>
        {flipped ? (
          <motion.div
            key="rating"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
          >
            {RATING_BUTTONS.map((b) => (
              <button
                key={b.rating}
                onClick={() => onRate(b.rating)}
                className={cn(
                  "flex flex-col items-center justify-center rounded-lg border px-3 py-3 text-sm font-semibold transition-colors",
                  b.tone,
                )}
              >
                {b.label}
                <span className="text-[10px] font-normal opacity-70">{b.sub}</span>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="show-answer"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <Button variant="brand" size="lg" onClick={onFlip}>
              Show answer <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between border-t pt-3">
        <Button variant="outline" size="sm" onClick={onPrev} disabled={!canPrev}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <span className="text-xs text-muted-foreground">
          Use Back / Next to navigate without rating
        </span>
        <Button variant="outline" size="sm" onClick={onNext} disabled={!canNext}>
          Next <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Face({
  side,
  card,
  children,
}: {
  side: "front" | "back";
  card: AnkiCard;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute inset-0 flex flex-col rounded-xl border bg-card p-6 shadow-sm"
      style={{
        backfaceVisibility: "hidden",
        transform: side === "back" ? "rotateY(180deg)" : undefined,
      }}
    >
      <div className="mb-3 flex items-center gap-2">
        <Badge variant="outline" className="capitalize">
          {card.difficulty}
        </Badge>
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
          {side === "front" ? "Question" : "Answer"}
        </span>
        <span className="ml-auto text-[10px] text-muted-foreground">
          ef {card.easeFactor.toFixed(2)} · int {card.intervalDays}d
        </span>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
      <p className="mt-2 text-[10px] uppercase tracking-wide text-muted-foreground">
        {card.subtopicTitle}
      </p>
    </div>
  );
}

function CardBrowser({
  cards,
  onSuspend,
  onPreview,
}: {
  cards: AnkiCard[];
  onSuspend: (id: string) => void;
  onPreview: (card: AnkiCard) => void;
}) {
  const [sortKey, setSortKey] = useState<"due" | "topic" | "ease">("due");
  const sorted = useMemo(() => {
    const list = [...cards];
    list.sort((a, b) => {
      if (sortKey === "topic") return a.topicTitle.localeCompare(b.topicTitle);
      if (sortKey === "ease") return b.easeFactor - a.easeFactor;
      return new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime();
    });
    return list;
  }, [cards, sortKey]);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg">Cards in filter</CardTitle>
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground">Sort:</span>
          {(["due", "topic", "ease"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setSortKey(k)}
              className={cn(
                "rounded-md px-2 py-1 capitalize",
                sortKey === k
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent",
              )}
            >
              {k}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {sorted.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">No cards match this filter.</p>
          )}
          {sorted.map((c) => {
            const dueDate = new Date(c.dueAt);
            const overdue = dueDate.getTime() <= Date.now();
            return (
              <div
                key={c.id}
                className="grid grid-cols-12 items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-accent/30"
              >
                <button
                  type="button"
                  onClick={() => onPreview(c)}
                  className="col-span-5 min-w-0 text-left transition-colors hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  <p className="line-clamp-1 font-medium">{stripMath(c.front)}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.topicTitle} · {c.subtopicTitle}
                  </p>
                </button>
                <div className="col-span-2">
                  <Badge variant="outline" className={FIELD_THEME[c.field]}>
                    {c.field}
                  </Badge>
                </div>
                <div className="col-span-2 text-xs text-muted-foreground">
                  {c.suspended ? (
                    <Badge variant="secondary">suspended</Badge>
                  ) : overdue ? (
                    <span className="font-semibold text-rose-600">due now</span>
                  ) : (
                    <span title={format(dueDate, "PPpp")}>in {formatDistanceToNow(dueDate)}</span>
                  )}
                </div>
                <div className="col-span-2 text-xs text-muted-foreground tabular-nums">
                  ef {c.easeFactor.toFixed(2)} · int {c.intervalDays}d
                </div>
                <div className="col-span-1 flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onSuspend(c.id)}
                    title={c.suspended ? "Resume" : "Suspend"}
                  >
                    {c.suspended ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function CardPreviewDialog({
  card,
  onClose,
}: {
  card: AnkiCard | null;
  onClose: () => void;
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  useEffect(() => {
    setShowAnswer(false);
  }, [card?.id]);
  return (
    <Dialog open={card !== null} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl">
        {card && (
          <>
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={FIELD_THEME[card.field]}>
                  {card.topicTitle}
                </Badge>
                <Badge variant="secondary" className="capitalize">
                  {card.difficulty}
                </Badge>
              </div>
              <DialogTitle className="pt-2 text-base">{card.subtopicTitle}</DialogTitle>
              <DialogDescription>
                ef {card.easeFactor.toFixed(2)} · interval {card.intervalDays}d ·{" "}
                {card.suspended ? "suspended" : "active"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <div className="rounded-md border bg-muted/30 p-4">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Question
                </p>
                <MarkdownWithMath content={card.front} />
              </div>

              {showAnswer ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-md border-l-4 border-brand-gold bg-brand-gold/5 p-4"
                >
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-brand-gold-dark">
                    Answer
                  </p>
                  <MarkdownWithMath content={card.back} />
                </motion.div>
              ) : (
                <div className="flex justify-center">
                  <Button variant="brand" onClick={() => setShowAnswer(true)}>
                    Show answer <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SessionStatsDialog({
  open,
  meta,
  onClose,
}: {
  open: boolean;
  meta: SessionMeta;
  onClose: () => void;
}) {
  const minutes = Math.max(1, Math.round((Date.now() - meta.startedAt) / 60000));
  const retention = meta.reviewed > 0 ? Math.round((meta.remembered / meta.reviewed) * 100) : 0;
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-gold" /> Review complete
          </DialogTitle>
          <DialogDescription>You cleared the queue.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-3 text-center">
          <Stat value={meta.reviewed} label="Reviewed" />
          <Stat value={`${retention}%`} label="Retention" />
          <Stat value={`${minutes}m`} label="Time" />
        </div>
        <DialogFooter>
          <Button variant="brand" onClick={onClose}>
            <RotateCcw className="h-4 w-4" /> Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-lg border p-3">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}

function stripMath(s: string) {
  return s
    .replace(/\$\$([\s\S]*?)\$\$/g, "[math]")
    .replace(/\$(.*?)\$/g, "[math]")
    .replace(/[*_`]/g, "")
    .trim();
}
