"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Sparkles,
  ImagePlus,
  X,
  MessageSquare,
  Bug,
  Brain,
  GraduationCap,
  ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MarkdownWithMath } from "@/components/shared/MarkdownWithMath";
import { streamSSE } from "@/lib/ai/stream";
import { CURRICULUM } from "@/lib/curriculum-data";
import type { TutorMode } from "@/lib/ai/prompts";
import { useAiProvider } from "@/lib/ai/use-provider";
import { cn } from "@/lib/utils";

interface Attachment {
  type: "image";
  mediaType: string;
  data: string;
  preview: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  attachments?: Attachment[];
}

const MODES: { value: TutorMode; label: string; icon: typeof MessageSquare; hint: string }[] = [
  { value: "explain", label: "Explain", icon: MessageSquare, hint: "Clear, structured explanation" },
  { value: "debug", label: "Debug", icon: Bug, hint: "Find the mistake in your work" },
  { value: "quiz", label: "Quiz", icon: Brain, hint: "Tutor asks, you answer" },
  { value: "feynman", label: "Feynman", icon: GraduationCap, hint: "You teach, tutor plays the student" },
  { value: "plan", label: "Plan", icon: ListChecks, hint: "Plan a study path" },
];

const ALL_TOPICS = CURRICULUM.flatMap((f) =>
  f.phases.flatMap((p) =>
    p.topics.map((t) => ({
      id: t.id,
      title: t.title,
      number: t.number,
      fieldKey: f.key,
      fieldName: f.name,
    })),
  ),
);

export default function TutorPage() {
  const provider = useAiProvider();
  const [mode, setMode] = useState<TutorMode>("explain");
  const [topicId, setTopicId] = useState<string>("none");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [streaming, setStreaming] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  const topic = ALL_TOPICS.find((t) => t.id === topicId);
  const topicTitle = topic?.title;

  function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const [meta, data] = result.split(",");
      const mediaType = meta.match(/:(.*?);/)?.[1] ?? file.type;
      setAttachments((prev) => [...prev, { type: "image", mediaType, data, preview: result }]);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  async function send() {
    if (streaming) return;
    if (!input.trim() && attachments.length === 0) return;
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim() || (attachments.length > 0 ? "(See attached image)" : ""),
      attachments: attachments.length > 0 ? attachments : undefined,
    };
    const assistantId = crypto.randomUUID();
    const history = [...messages, userMsg];
    setMessages([...history, { id: assistantId, role: "assistant", content: "" }]);
    setInput("");
    setAttachments([]);
    setStreaming(true);
    const controller = new AbortController();
    abortRef.current = controller;
    await streamSSE({
      url: "/api/ai/tutor",
      body: {
        mode,
        topicTitle,
        provider,
        history: history.map((m) => ({
          role: m.role,
          content: m.content,
          attachments: m.attachments?.map(({ type, mediaType, data }) => ({ type, mediaType, data })),
        })),
      },
      onDelta: (delta) =>
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + delta } : m)),
        ),
      onError: (err) =>
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + `\n\n_Error: ${err.message}_` } : m,
          ),
        ),
      signal: controller.signal,
    });
    setStreaming(false);
    abortRef.current = null;
  }

  return (
    <div className="-my-6 flex h-[calc(100vh-2rem)] flex-col lg:-my-10 lg:h-[calc(100vh-2rem)]">
      <header className="border-b pb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI Tutor</h1>
            <p className="text-sm text-muted-foreground">
              Powered by Claude. Knows your curriculum and renders math beautifully.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1 rounded-md bg-muted p-1">
              {MODES.map((m) => {
                const Icon = m.icon;
                const active = mode === m.value;
                return (
                  <button
                    key={m.value}
                    onClick={() => setMode(m.value)}
                    title={m.hint}
                    className={cn(
                      "flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-medium transition-all",
                      active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {m.label}
                  </button>
                );
              })}
            </div>
            <Select value={topicId} onValueChange={setTopicId}>
              <SelectTrigger className="h-9 w-[260px]">
                <SelectValue placeholder="Link to topic (optional)" />
              </SelectTrigger>
              <SelectContent className="max-h-[420px]">
                <SelectGroup>
                  <SelectLabel className="text-[10px] uppercase tracking-wider">No link</SelectLabel>
                  <SelectItem value="none">— General —</SelectItem>
                </SelectGroup>
                {CURRICULUM.map((field) => (
                  <SelectGroup key={field.key}>
                    <SelectLabel className="text-[10px] uppercase tracking-wider">{field.name}</SelectLabel>
                    {field.phases.flatMap((p) =>
                      p.topics.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          <span className="font-mono text-xs text-muted-foreground">{t.number}</span>{" "}
                          {t.title}
                        </SelectItem>
                      )),
                    )}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {topic && (
          <div className="mt-2 flex items-center gap-2 text-xs">
            <Badge variant="secondary">{topic.fieldName}</Badge>
            <span className="text-muted-foreground">
              {topic.number} {topic.title}
            </span>
          </div>
        )}
      </header>

      <ScrollArea className="flex-1 py-4">
        <div ref={scrollRef} className="mx-auto max-w-3xl space-y-4 px-1">
          {messages.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="flex items-start gap-3 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gold/15 text-brand-gold-dark">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold">
                    {mode === "feynman"
                      ? "I'll play a confused student. Teach me!"
                      : `Ready in ${MODES.find((m) => m.value === mode)?.label} mode.`}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    {mode === "feynman"
                      ? "Pick a topic above, then explain it to me. I'll ask naive but probing questions."
                      : "Ask anything. Attach a photo of your notes if it helps. ⌘+Enter to send."}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  m.role === "user"
                    ? "bg-brand-navy text-white"
                    : "bg-brand-gold/15 text-brand-gold-dark ring-1 ring-brand-gold/30",
                )}
              >
                {m.role === "user" ? "You" : <Sparkles className="h-3.5 w-3.5" />}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-lg border px-4 py-3 text-sm",
                  m.role === "user"
                    ? "bg-brand-navy/5 border-brand-navy/20"
                    : "bg-card",
                )}
              >
                {m.attachments && m.attachments.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {m.attachments.map((a, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={a.preview}
                        alt="attachment"
                        className="max-h-40 rounded-md border"
                      />
                    ))}
                  </div>
                )}
                {m.role === "assistant" ? (
                  <MarkdownWithMath content={m.content || (streaming ? "…" : "")} />
                ) : (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t pt-3">
        <div className="mx-auto max-w-3xl">
          {attachments.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {attachments.map((a, i) => (
                <div key={i} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.preview} alt="preview" className="h-16 w-16 rounded-md border object-cover" />
                  <button
                    onClick={() => setAttachments((prev) => prev.filter((_, ix) => ix !== i))}
                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-end gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={onPickImage}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              title="Attach image"
            >
              <ImagePlus className="h-4 w-4" />
            </Button>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder={
                mode === "feynman"
                  ? "Teach me. I'll ask questions when I'm confused…"
                  : "Ask the tutor… (⌘+Enter to send)"
              }
              className="min-h-[56px] resize-none"
            />
            <Button
              variant="brand"
              size="icon"
              onClick={send}
              disabled={streaming || (!input.trim() && attachments.length === 0)}
              title="Send (⌘+Enter)"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
