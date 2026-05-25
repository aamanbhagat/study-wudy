"use client";

import { useEffect, useRef, useState } from "react";
import { Save, Eye, EyeOff, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MarkdownWithMath } from "@/components/shared/MarkdownWithMath";
import { upsertNote, listNotes } from "@/lib/notes-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SessionNotesProps {
  topicId: string;
  topicTitle: string;
  subtopicId?: string | null;
  subtopicTitle?: string | null;
}

export function SessionNotes({ topicId, topicTitle, subtopicId, subtopicTitle }: SessionNotesProps) {
  // Each subtopic gets its own note. Fall back to topic-level note when no subtopic.
  const noteKey = subtopicId ?? topicId;

  const [body, setBody] = useState("");
  const [noteId, setNoteId] = useState<string | undefined>();
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Reset and load when the key changes (e.g. user navigates to a new subtopic)
  useEffect(() => {
    let active = true;
    setBody("");
    setNoteId(undefined);
    setSavedAt(null);
    setDirty(false);
    setLoading(true);
    void (async () => {
      try {
        const all = await listNotes();
        if (!active) return;
        const found = all.find((n) => n.topic_id === noteKey);
        if (found) {
          setNoteId(found.id);
          setBody(found.body);
          setSavedAt(new Date(found.updated_at));
        }
      } catch {
        // ignore
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [noteKey]);

  // Auto-save on debounce
  useEffect(() => {
    if (!dirty) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void save(true);
    }, 1500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body, dirty]);

  // Flush any pending changes when the key is about to change
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (dirty && body.trim()) {
        // Best-effort flush; fire-and-forget so unmount isn't blocked
        void save(true);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteKey]);

  async function save(silent = false) {
    if (!body.trim()) return;
    setSaving(true);
    try {
      const scopeLabel = subtopicTitle
        ? `${topicTitle} → ${subtopicTitle}`
        : topicTitle;
      const title = `Session notes — ${scopeLabel}`;
      const saved = await upsertNote({ id: noteId, title, body, topic_id: noteKey, pinned: false });
      setNoteId(saved.id);
      setSavedAt(new Date(saved.updated_at));
      setDirty(false);
      if (!silent) toast.success("Note saved.");
    } catch (e) {
      toast.error("Save failed: " + (e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const headerLabel = subtopicTitle
    ? `Notes for: ${subtopicTitle}`
    : `Notes for: ${topicTitle}`;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b px-4 py-2.5">
        <FileText className="h-4 w-4 text-brand-navy" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Notes</p>
          <p className="line-clamp-1 text-[10px] text-muted-foreground">{headerLabel}</p>
        </div>
        <span className="text-[10px] text-muted-foreground">
          {saving
            ? "Saving…"
            : dirty
              ? "Unsaved changes"
              : savedAt
                ? `Saved ${savedAt.toLocaleTimeString()}`
                : "No notes yet"}
        </span>
      </div>

      <div className="flex items-center gap-1 border-b px-2 py-1">
        <Button variant="ghost" size="sm" onClick={() => setPreview((p) => !p)}>
          {preview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {preview ? "Edit" : "Preview"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => save(false)}
          disabled={!dirty || saving}
          className="ml-auto"
        >
          <Save className="h-3.5 w-3.5" /> Save
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {loading ? (
          <p className="p-4 text-sm text-muted-foreground">Loading notes…</p>
        ) : preview ? (
          <div className="p-4">
            {body.trim() ? (
              <MarkdownWithMath content={body} className="prose-sm" />
            ) : (
              <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
                <Sparkles className="mx-auto mb-1 h-4 w-4 text-brand-gold" />
                Nothing to preview yet.
              </div>
            )}
          </div>
        ) : (
          <Textarea
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              setDirty(true);
            }}
            placeholder={`# Notes on ${subtopicTitle ?? topicTitle}\n\nWrite freely. Markdown + LaTeX supported.\n\n- Key formula: $E = mc^2$\n- Display math: $$\\nabla \\cdot \\mathbf{E} = \\rho/\\varepsilon_0$$`}
            className={cn(
              "h-full min-h-[300px] w-full resize-none rounded-none border-0 font-mono text-sm focus-visible:ring-0",
            )}
          />
        )}
      </ScrollArea>
    </div>
  );
}
