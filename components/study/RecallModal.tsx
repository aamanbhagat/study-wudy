"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MarkdownWithMath } from "@/components/shared/MarkdownWithMath";
import { Badge } from "@/components/ui/badge";
import { useAiProvider } from "@/lib/ai/use-provider";

interface RecallResult {
  score: number;
  covered: string[];
  missed: string[];
  errors: string[];
  feedback: string;
  next_action: string;
}

interface RecallModalProps {
  open: boolean;
  topicTitle: string;
  subtopics: string[];
  prompt: string;
  onComplete: (score: number, response: string, feedback: RecallResult) => void;
}

export function RecallModal({ open, topicTitle, subtopics, prompt, onComplete }: RecallModalProps) {
  const provider = useAiProvider();
  const [recall, setRecall] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<RecallResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setRecall("");
      setResult(null);
      setError(null);
      setTimeout(() => textareaRef.current?.focus(), 200);
    }
  }, [open]);

  async function submit() {
    if (!recall.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/evaluate-recall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicTitle, subtopics, studentRecall: recall, provider }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as RecallResult;
      setResult(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  function close() {
    if (!result) return;
    onComplete(result.score, recall, result);
  }

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-2xl"
        hideClose
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-gold" /> Recall Check
          </DialogTitle>
          <DialogDescription>
            {prompt} Without scrolling back, write what you remember about{" "}
            <span className="font-semibold text-foreground">{topicTitle}</span>. Don&apos;t worry about
            structure — just dump what&apos;s in your head.
          </DialogDescription>
        </DialogHeader>

        {!result ? (
          <div className="space-y-3">
            <Textarea
              ref={textareaRef}
              value={recall}
              onChange={(e) => setRecall(e.target.value)}
              placeholder="From memory only…"
              className="min-h-[180px]"
              disabled={submitting}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex justify-end gap-2">
              <Button onClick={submit} disabled={!recall.trim() || submitting} variant="brand">
                {submitting ? "Evaluating…" : "Submit recall"} <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border bg-muted/40 p-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Score</p>
                <p className="text-2xl font-bold">{result.score} / 5</p>
              </div>
              <Badge variant={result.score >= 3 ? "default" : "destructive"}>
                {result.score >= 4
                  ? "Strong"
                  : result.score >= 3
                    ? "Solid"
                    : result.score >= 2
                      ? "Partial"
                      : "Restudy"}
              </Badge>
            </div>
            <MarkdownWithMath
              content={[
                `**Feedback** — ${result.feedback}`,
                result.covered.length ? `**Covered:** ${result.covered.join(", ")}` : "",
                result.missed.length ? `**Missed:** ${result.missed.join(", ")}` : "",
                result.errors.length ? `**Errors:** ${result.errors.join(", ")}` : "",
                `**Next:** ${result.next_action}`,
              ]
                .filter(Boolean)
                .join("\n\n")}
            />
            <div className="flex justify-end">
              <Button onClick={close} variant="brand">
                Continue session
              </Button>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
