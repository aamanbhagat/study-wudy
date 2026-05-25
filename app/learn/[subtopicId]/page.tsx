"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  RefreshCw,
  BookOpen,
  Layers,
  Trophy,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { MarkdownWithMath } from "@/components/shared/MarkdownWithMath";
import { findSubtopic, setLastStudied } from "@/lib/curriculum-helpers";
import { streamSSE } from "@/lib/ai/stream";
import { useAiProvider } from "@/lib/ai/use-provider";
import { cn } from "@/lib/utils";
import type { FieldKey } from "@/lib/types";

const FIELD_THEME: Record<FieldKey, { chip: string; gradient: string }> = {
  math: { chip: "bg-field-math-bg text-field-math", gradient: "from-field-math/15 to-field-math/5" },
  cs: { chip: "bg-field-cs-bg text-field-cs", gradient: "from-field-cs/15 to-field-cs/5" },
  physics: {
    chip: "bg-field-physics-bg text-field-physics",
    gradient: "from-field-physics/15 to-field-physics/5",
  },
};

export default function LearnSubtopicPage() {
  const params = useParams<{ subtopicId: string }>();
  const provider = useAiProvider();
  const subtopicId = decodeURIComponent(params.subtopicId);

  const lookup = useMemo(() => findSubtopic(subtopicId), [subtopicId]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [streamingDone, setStreamingDone] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!lookup) return;
    setLastStudied({
      fieldKey: lookup.field.key,
      topicId: lookup.topic.id,
      topicTitle: lookup.topic.title,
      subtopicId: lookup.subtopic.id,
      subtopicTitle: lookup.subtopic.title,
      studiedAt: new Date().toISOString(),
    });
    void loadLesson();
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lookup?.subtopic.id]);

  async function loadLesson(forceRegenerate = false) {
    if (!lookup) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError(null);
    setContent("");
    setStreamingDone(false);
    await streamSSE({
      url: "/api/ai/learn-subtopic",
      body: {
        subtopicId: lookup.subtopic.id,
        subtopicTitle: lookup.subtopic.title,
        topicTitle: lookup.topic.title,
        fieldName: lookup.field.name,
        phaseTitle: `Phase ${lookup.phase.number} — ${lookup.phase.title}`,
        provider,
        forceRegenerate,
      },
      signal: controller.signal,
      onDelta: (delta) => {
        setLoading(false);
        setContent((prev) => prev + delta);
      },
      onDone: () => setStreamingDone(true),
      onError: (err) => {
        setError(err.message);
        setLoading(false);
        toast.error(err.message);
      },
    });
  }

  if (!lookup) {
    return (
      <div className="space-y-3">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link href="/curriculum">
            <ArrowLeft className="h-4 w-4" /> Back to curriculum
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Subtopic not found</h1>
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t find that subtopic in the curriculum data.
        </p>
      </div>
    );
  }

  const theme = FIELD_THEME[lookup.field.key];

  return (
    <ErrorBoundary label="Lesson view crashed">
      <div className="space-y-5">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link href="/curriculum">
            <ArrowLeft className="h-4 w-4" /> Back to curriculum
          </Link>
        </Button>

        <motion.header
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <Badge variant="outline" className={theme.chip}>
              {lookup.field.name}
            </Badge>
            <ChevronRight className="h-3 w-3" />
            <span>Phase {lookup.phase.number} — {lookup.phase.title}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-mono">{lookup.topic.number}</span>
            <span>{lookup.topic.title}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{lookup.subtopic.title}</h1>
        </motion.header>

        <div className="grid gap-3 sm:grid-cols-3">
          <ActionTile
            icon={Layers}
            label="Make a flashcard"
            href={`/cards?topic=${encodeURIComponent(lookup.topic.id)}`}
            tone="cs"
          />
          <ActionTile
            icon={Trophy}
            label="Test myself"
            href={`/tests?topic=${encodeURIComponent(lookup.topic.id)}`}
            tone="gold"
          />
          <ActionTile
            icon={BookOpen}
            label="Open a study session"
            href={`/study?topic=${encodeURIComponent(lookup.topic.id)}`}
            tone="navy"
          />
        </div>

        <Card className={cn("overflow-hidden bg-gradient-to-br", theme.gradient)}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-brand-gold" /> AI Mini-Lesson
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => loadLesson(true)} disabled={loading}>
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} /> Regenerate
            </Button>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
                <p className="font-semibold">Couldn&apos;t generate the lesson.</p>
                <p className="text-xs">{error}</p>
                <p className="mt-2 text-xs text-rose-800/80">
                  Make sure your <code className="rounded bg-rose-100 px-1">ANTHROPIC_API_KEY</code> or
                  <code className="ml-1 rounded bg-rose-100 px-1">GOOGLE_GEMINI_API_KEY</code> is set in
                  <code className="ml-1 rounded bg-rose-100 px-1">.env.local</code>.
                </p>
              </div>
            ) : !content && loading ? (
              <LoadingSkeleton />
            ) : (
              <div>
                <MarkdownWithMath content={content || "_Generating…_"} />
                {!streamingDone && content && (
                  <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-brand-navy/60" aria-hidden />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
}

function ActionTile({
  icon: Icon,
  label,
  href,
  tone,
}: {
  icon: typeof Layers;
  label: string;
  href: string;
  tone: "navy" | "gold" | "cs";
}) {
  const tones: Record<string, string> = {
    navy: "from-brand-navy to-brand-navy-light text-white",
    gold: "from-brand-gold to-brand-gold-light text-brand-navy",
    cs: "from-field-cs to-emerald-400 text-white",
  };
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center justify-between gap-3 rounded-lg bg-gradient-to-br p-4 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md",
        tones[tone],
      )}
    >
      <span className="flex items-center gap-2.5 text-sm font-semibold">
        <Icon className="h-4 w-4" /> {label}
      </span>
      <ChevronRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-9/12" />
      <div className="pt-3">
        <Skeleton className="h-5 w-40" />
        <div className="mt-2 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-10/12" />
          <Skeleton className="h-3 w-7/12" />
        </div>
      </div>
    </div>
  );
}
