"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Layers, Sparkles, AlertCircle, ArrowRight, ArrowLeftRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MarkdownWithMath } from "@/components/shared/MarkdownWithMath";
import {
  attachProgress,
  recordReview,
  type AnkiCard,
  type CardRating,
  type CardContent as CardContentType,
} from "@/lib/cards-store";
import { cn } from "@/lib/utils";

interface InSessionFlashcardsProps {
  topicId: string;
  topicTitle: string;
  subtopicId: string | null;
}

const RATING_BUTTONS: { rating: CardRating; label: string; tone: string; sub: string }[] = [
  { rating: "again", label: "Again", tone: "bg-rose-100 text-rose-900 hover:bg-rose-200", sub: "<1m" },
  { rating: "hard", label: "Hard", tone: "bg-amber-100 text-amber-900 hover:bg-amber-200", sub: "<10m" },
  { rating: "good", label: "Good", tone: "bg-emerald-100 text-emerald-900 hover:bg-emerald-200", sub: "ok" },
  { rating: "easy", label: "Easy", tone: "bg-sky-100 text-sky-900 hover:bg-sky-200", sub: "longer" },
];

export function InSessionFlashcards({ topicId, subtopicId }: InSessionFlashcardsProps) {
  const [cards, setCards] = useState<AnkiCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scope, setScope] = useState<"subtopic" | "topic">(subtopicId ? "subtopic" : "topic");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState<Set<string>>(new Set());

  useEffect(() => {
    setScope(subtopicId ? "subtopic" : "topic");
  }, [subtopicId]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setIndex(0);
    setFlipped(false);
    setReviewed(new Set());
    const url = new URL("/api/cards/list", window.location.origin);
    if (scope === "subtopic" && subtopicId) {
      url.searchParams.set("subtopic", subtopicId);
    } else {
      url.searchParams.set("topic", topicId);
    }
    fetch(url.toString())
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: { cards: CardContentType[] }) => {
        if (!active) return;
        setCards(attachProgress(data.cards));
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
  }, [topicId, subtopicId, scope]);

  const current = cards[index] ?? null;
  const total = cards.length;
  const progress = useMemo(() => {
    return Math.round((reviewed.size / Math.max(1, total)) * 100);
  }, [reviewed, total]);

  function rate(rating: CardRating) {
    if (!current) return;
    recordReview(current.id, rating, {
      easeFactor: current.easeFactor,
      intervalDays: current.intervalDays,
      repetitions: current.repetitions,
      dueAt: current.dueAt,
      lastReviewedAt: current.lastReviewedAt,
      suspended: current.suspended,
      createdAt: current.createdAt,
    });
    setReviewed((prev) => {
      const next = new Set(prev);
      next.add(current.id);
      return next;
    });
    advance();
  }

  function advance() {
    setFlipped(false);
    setIndex((i) => (i + 1 < total ? i + 1 : i));
  }

  function goPrev() {
    setFlipped(false);
    setIndex((i) => Math.max(0, i - 1));
  }

  function goNext() {
    setFlipped(false);
    setIndex((i) => Math.min(total - 1, i + 1));
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <Layers className="h-4 w-4 text-brand-navy" />
        <p className="text-sm font-semibold">Flashcards</p>
        <Badge variant="outline" className="ml-1 text-[10px]">
          {reviewed.size}/{total} reviewed
        </Badge>
        <div className="ml-auto flex items-center gap-1 rounded-md bg-muted p-0.5 text-[11px]">
          {subtopicId && (
            <button
              onClick={() => setScope("subtopic")}
              className={cn(
                "rounded px-2 py-0.5 transition-colors",
                scope === "subtopic"
                  ? "bg-background font-medium text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Subtopic
            </button>
          )}
          <button
            onClick={() => setScope("topic")}
            className={cn(
              "rounded px-2 py-0.5 transition-colors",
              scope === "topic"
                ? "bg-background font-medium text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Topic
          </button>
        </div>
      </div>

      {total > 0 && (
        <div className="h-1 w-full bg-muted">
          <div className="h-full bg-brand-navy transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="space-y-3 p-3">
          {error ? (
            <div className="flex items-start gap-2 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          ) : loading ? (
            <p className="p-4 text-center text-sm text-muted-foreground">Loading flashcards…</p>
          ) : total === 0 ? (
            <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
              <Sparkles className="mx-auto mb-1 h-4 w-4 text-brand-gold" />
              No flashcards generated for this {scope === "subtopic" ? "subtopic" : "topic"} yet.
              <Button asChild variant="link" size="sm" className="mt-1 h-auto p-0 text-xs">
                <Link href={`/cards?topic=${encodeURIComponent(topicId)}`}>Open full cards page</Link>
              </Button>
            </div>
          ) : current ? (
            <>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>
                  Card {index + 1} / {total}
                </span>
                {reviewed.has(current.id) && (
                  <span className="inline-flex items-center gap-1 text-emerald-600">
                    <Check className="h-3 w-3" /> Rated
                  </span>
                )}
              </div>

              <div className="relative" style={{ perspective: "1200px" }}>
                <motion.div
                  className="relative h-[260px] w-full cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  onClick={() => setFlipped((f) => !f)}
                >
                  <MiniFace side="front" card={current}>
                    <MarkdownWithMath content={current.front} className="prose-sm" />
                    <p className="mt-3 inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                      <ArrowLeftRight className="h-3 w-3" /> Click to flip
                    </p>
                  </MiniFace>
                  <MiniFace side="back" card={current}>
                    <MarkdownWithMath content={current.back} className="prose-sm" />
                  </MiniFace>
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                {flipped ? (
                  <motion.div
                    key="rate"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-2 gap-1.5"
                  >
                    {RATING_BUTTONS.map((b) => (
                      <button
                        key={b.rating}
                        onClick={() => rate(b.rating)}
                        className={cn(
                          "flex flex-col items-center justify-center rounded-md border px-2 py-2 text-xs font-semibold transition-colors",
                          b.tone,
                        )}
                      >
                        {b.label}
                        <span className="text-[9px] font-normal opacity-70">{b.sub}</span>
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="show"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center"
                  >
                    <Button variant="brand" size="sm" onClick={() => setFlipped(true)}>
                      Show answer <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between border-t pt-2">
                <Button variant="outline" size="sm" onClick={goPrev} disabled={index === 0}>
                  Prev
                </Button>
                <span className="text-[10px] text-muted-foreground">
                  Use Prev / Next to navigate
                </span>
                <Button variant="outline" size="sm" onClick={goNext} disabled={index >= total - 1}>
                  Next
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </ScrollArea>
    </div>
  );
}

function MiniFace({
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
      className="absolute inset-0 flex flex-col rounded-lg border bg-card p-3 shadow-sm"
      style={{
        backfaceVisibility: "hidden",
        transform: side === "back" ? "rotateY(180deg)" : undefined,
      }}
    >
      <div className="mb-1.5 flex items-center gap-1.5 text-[10px]">
        <Badge variant="outline" className="capitalize">
          {card.difficulty}
        </Badge>
        <span className="uppercase tracking-wide text-muted-foreground">
          {side === "front" ? "Question" : "Answer"}
        </span>
        <span className="ml-auto text-muted-foreground">
          ef {card.easeFactor.toFixed(2)} · int {card.intervalDays}d
        </span>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
