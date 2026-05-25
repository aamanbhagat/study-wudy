"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  FileText,
  Plus,
  Search,
  Pin,
  PinOff,
  Save,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { listNotes, upsertNote, deleteNote, type Note } from "@/lib/notes-store";
import { CURRICULUM } from "@/lib/curriculum-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface LinkMeta {
  title: string;
  field: "math" | "cs" | "physics";
  topicNumber?: string;
  parentTopicTitle?: string;
  isSubtopic: boolean;
}

const LINK_LOOKUP = (() => {
  const map = new Map<string, LinkMeta>();
  for (const f of CURRICULUM) {
    for (const p of f.phases) {
      for (const t of p.topics) {
        map.set(t.id, { title: t.title, field: f.key, topicNumber: t.number, isSubtopic: false });
        for (const s of t.subtopics) {
          map.set(s.id, {
            title: s.title,
            field: f.key,
            topicNumber: t.number,
            parentTopicTitle: t.title,
            isSubtopic: true,
          });
        }
      }
    }
  }
  return map;
})();

const FIELD_THEME: Record<string, string> = {
  math: "bg-field-math-bg text-field-math",
  cs: "bg-field-cs-bg text-field-cs",
  physics: "bg-field-physics-bg text-field-physics",
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topicId, setTopicId] = useState<string>("none");
  const [pinned, setPinned] = useState(false);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refresh() {
    try {
      const list = await listNotes();
      setNotes(list);
      if (list.length > 0 && !activeId) selectNote(list[0]);
    } catch (e) {
      toast.error("Failed to load notes: " + (e as Error).message);
    } finally {
      setHydrated(true);
    }
  }

  function selectNote(n: Note) {
    setActiveId(n.id);
    setTitle(n.title);
    setBody(n.body);
    setTopicId(n.topic_id ?? "none");
    setPinned(n.pinned);
    setDirty(false);
  }

  function newNote() {
    setActiveId(null);
    setTitle("");
    setBody("");
    setTopicId("none");
    setPinned(false);
    setDirty(true);
  }

  async function save() {
    if (!title.trim() && !body.trim()) {
      toast.warning("Nothing to save.");
      return;
    }
    setSaving(true);
    try {
      const saved = await upsertNote({
        id: activeId ?? undefined,
        title: title.trim() || "Untitled note",
        body,
        topic_id: topicId === "none" ? null : topicId,
        pinned,
      });
      const exists = notes.some((n) => n.id === saved.id);
      const next = exists ? notes.map((n) => (n.id === saved.id ? saved : n)) : [saved, ...notes];
      setNotes(sortNotes(next));
      setActiveId(saved.id);
      setDirty(false);
      toast.success("Note saved.");
    } catch (e) {
      toast.error("Save failed: " + (e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!activeId) return;
    if (!confirm("Delete this note?")) return;
    try {
      await deleteNote(activeId);
      const next = notes.filter((n) => n.id !== activeId);
      setNotes(next);
      if (next.length > 0) selectNote(next[0]);
      else newNote();
      toast.success("Deleted.");
    } catch (e) {
      toast.error("Delete failed: " + (e as Error).message);
    }
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q) ||
        (n.topic_title ?? "").toLowerCase().includes(q),
    );
  }, [notes, search]);

  // Cmd/Ctrl + S to save.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (dirty && !saving) void save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const linkedMeta = topicId !== "none" ? LINK_LOOKUP.get(topicId) ?? null : null;

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Markdown + LaTeX. Pin important notes. ⌘+S to save.
          </p>
        </div>
        <Button onClick={newNote} variant="brand">
          <Plus className="h-4 w-4" /> New note
        </Button>
      </header>

      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <Card className="flex h-[calc(100vh-12rem)] flex-col">
          <CardHeader className="space-y-2 pb-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes…"
                className="h-9 pl-8"
              />
            </div>
            <p className="text-xs text-muted-foreground">{filtered.length} note{filtered.length === 1 ? "" : "s"}</p>
          </CardHeader>
          <ScrollArea className="flex-1">
            <div className="space-y-1 px-3 pb-3">
              {!hydrated && <p className="px-2 text-sm text-muted-foreground">Loading…</p>}
              {hydrated && filtered.length === 0 && (
                <div className="rounded-md border border-dashed p-3 text-center text-xs text-muted-foreground">
                  <FileText className="mx-auto mb-1 h-5 w-5" />
                  No notes yet. Click <span className="font-semibold">New note</span>.
                </div>
              )}
              {filtered.map((n) => {
                const meta = n.topic_id ? LINK_LOOKUP.get(n.topic_id) : null;
                const active = n.id === activeId;
                return (
                  <button
                    key={n.id}
                    onClick={() => selectNote(n)}
                    className={cn(
                      "w-full rounded-md border px-3 py-2 text-left text-sm transition-colors",
                      active ? "border-brand-navy bg-brand-navy/5" : "hover:bg-accent/40",
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      {n.pinned && <Pin className="h-3 w-3 shrink-0 text-brand-gold" />}
                      <span className="flex-1 truncate font-medium">{n.title || "Untitled"}</span>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                      {stripMarkdown(n.body) || "No content"}
                    </p>
                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>
                        {formatDistanceToNow(new Date(n.updated_at), { addSuffix: true })}
                      </span>
                      {meta && (
                        <Badge variant="outline" className={cn("h-4 text-[9px]", FIELD_THEME[meta.field])}>
                          {meta.field}
                        </Badge>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </Card>

        <motion.div
          key={activeId ?? "new"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[calc(100vh-12rem)] min-w-0 flex-col gap-3"
        >
          <Card className="min-w-0">
            <CardHeader className="space-y-3 pb-3">
              <Input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setDirty(true);
                }}
                placeholder="Note title"
                className="h-auto truncate border-0 px-0 py-0 text-xl font-semibold focus-visible:ring-0"
              />

              {linkedMeta && (
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className={FIELD_THEME[linkedMeta.field]}>
                    {linkedMeta.field}
                  </Badge>
                  {linkedMeta.isSubtopic ? (
                    <span className="truncate">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {linkedMeta.topicNumber}
                      </span>{" "}
                      {linkedMeta.parentTopicTitle} → {linkedMeta.title}
                    </span>
                  ) : (
                    <span className="truncate">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {linkedMeta.topicNumber}
                      </span>{" "}
                      {linkedMeta.title}
                    </span>
                  )}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <Select
                  value={topicId}
                  onValueChange={(v) => {
                    setTopicId(v);
                    setDirty(true);
                  }}
                >
                  <SelectTrigger className="h-8 w-full max-w-[260px] text-xs">
                    <SelectValue placeholder="Link to topic (optional)">
                      {topicId === "none"
                        ? "Link to topic (optional)"
                        : (() => {
                            const m = LINK_LOOKUP.get(topicId);
                            if (!m) return "Linked";
                            return m.isSubtopic
                              ? `${m.parentTopicTitle} → ${m.title}`
                              : `${m.topicNumber} ${m.title}`;
                          })()}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-[420px]">
                    <SelectGroup>
                      <SelectLabel>None</SelectLabel>
                      <SelectItem value="none">— No topic —</SelectItem>
                    </SelectGroup>
                    {CURRICULUM.map((field) => (
                      <SelectGroup key={field.key}>
                        <SelectLabel className="text-[10px] uppercase tracking-wider">
                          {field.name}
                        </SelectLabel>
                        {field.phases.flatMap((p) =>
                          p.topics.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              <span className="font-mono text-xs text-muted-foreground">
                                {t.number}
                              </span>{" "}
                              {t.title}
                            </SelectItem>
                          )),
                        )}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPinned((p) => !p);
                    setDirty(true);
                  }}
                >
                  {pinned ? <PinOff className="h-3.5 w-3.5" /> : <Pin className="h-3.5 w-3.5" />}
                  {pinned ? "Unpin" : "Pin"}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setPreview((p) => !p)}>
                  {preview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  {preview ? "Hide preview" : "Show preview"}
                </Button>
                <div className="ml-auto flex items-center gap-2">
                  {activeId && (
                    <Button variant="ghost" size="sm" onClick={remove}>
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </Button>
                  )}
                  <Button onClick={save} disabled={!dirty || saving} variant="brand" size="sm">
                    <Save className="h-3.5 w-3.5" />
                    {saving ? "Saving…" : dirty ? "Save" : "Saved"}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className={cn("grid min-w-0 flex-1 gap-3", preview ? "lg:grid-cols-2" : "grid-cols-1")}>
            <Card className="flex min-w-0 flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" /> Editor
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <Textarea
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                    setDirty(true);
                  }}
                  placeholder={`# Heading

Use Markdown and inline math: $\\int_0^1 x^2 \\, dx = \\frac{1}{3}$

Or display math:
$$
\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}
$$`}
                  className="h-full min-h-[60vh] w-full resize-none font-mono text-sm"
                />
              </CardContent>
            </Card>

            {preview && (
              <Card className="flex min-w-0 flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-brand-gold" /> Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto pb-4">
                  {body.trim() ? (
                    <MarkdownWithMath content={body} />
                  ) : (
                    <p className="text-sm text-muted-foreground">Nothing to preview yet.</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function sortNotes(list: Note[]) {
  return [...list].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });
}

function stripMarkdown(s: string) {
  return s
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#*_`>~-]/g, "")
    .replace(/\$\$[\s\S]*?\$\$/g, "[math]")
    .replace(/\$[^$]*\$/g, "[math]")
    .replace(/\s+/g, " ")
    .trim();
}
