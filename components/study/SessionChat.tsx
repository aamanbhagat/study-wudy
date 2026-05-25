"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MarkdownWithMath } from "@/components/shared/MarkdownWithMath";
import { streamSSE } from "@/lib/ai/stream";
import { useAiProvider } from "@/lib/ai/use-provider";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface SessionChatProps {
  topicTitle: string;
}

export function SessionChat({ topicTitle }: SessionChatProps) {
  const provider = useAiProvider();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  async function send() {
    if (!input.trim() || streaming) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: input.trim() };
    const assistantId = crypto.randomUUID();
    const history = [...messages, userMsg];
    setMessages([...history, { id: assistantId, role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);
    const controller = new AbortController();
    abortRef.current = controller;
    await streamSSE({
      url: "/api/ai/tutor",
      body: {
        mode: "explain",
        topicTitle,
        provider,
        history: history.map(({ role, content }) => ({ role, content })),
      },
      onDelta: (delta) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + delta } : m)),
        );
      },
      onError: (err) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + `\n\n_Error: ${err.message}_` } : m,
          ),
        );
      },
      signal: controller.signal,
    });
    setStreaming(false);
    abortRef.current = null;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <MessageSquare className="h-4 w-4 text-brand-navy" />
        <p className="text-sm font-semibold">Tutor</p>
        <span className="ml-auto text-[10px] uppercase tracking-wide text-muted-foreground">In-session</span>
      </div>
      <ScrollArea className="flex-1" ref={scrollRef as never}>
        <div className="space-y-3 p-4">
          {messages.length === 0 && (
            <div className="rounded-lg border border-dashed bg-muted/30 p-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-1.5 font-semibold text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-brand-gold" /> Ask anything about the topic
              </p>
              <p className="mt-1">
                Stuck on a derivation? Want a worked example? Ask. Tutor knows the topic context.
              </p>
            </div>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "rounded-lg border px-3 py-2 text-sm",
                m.role === "user"
                  ? "ml-6 border-brand-navy/20 bg-brand-navy/5"
                  : "mr-6 border-brand-gold/30 bg-brand-gold/5",
              )}
            >
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {m.role === "user" ? "You" : "Tutor"}
              </p>
              {m.role === "assistant" ? (
                <MarkdownWithMath content={m.content || (streaming ? "…" : "")} className="prose-sm" />
              ) : (
                <p>{m.content}</p>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-3">
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                void send();
              }
            }}
            placeholder="Ask the tutor… (⌘+Enter to send)"
            className="min-h-[60px] resize-none text-sm"
          />
          <Button onClick={send} disabled={streaming || !input.trim()} variant="brand" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
