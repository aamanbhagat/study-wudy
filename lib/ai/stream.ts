import { useEffect, useRef, useState } from "react";

export interface SSEStreamOptions {
  url: string;
  body: unknown;
  onDelta: (delta: string) => void;
  onDone?: () => void;
  onError?: (err: Error) => void;
  signal?: AbortSignal;
}

export async function streamSSE({ url, body, onDelta, onDone, onError, signal }: SSEStreamOptions) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    });
    if (!res.ok || !res.body) {
      const text = await res.text().catch(() => "");
      throw new Error(text || `HTTP ${res.status}`);
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split("\n\n");
      buffer = events.pop() ?? "";
      for (const evt of events) {
        const lines = evt.split("\n");
        let event = "message";
        let data = "";
        for (const line of lines) {
          if (line.startsWith("event:")) event = line.slice(6).trim();
          else if (line.startsWith("data:")) data += line.slice(5).trim();
        }
        if (event === "done") {
          onDone?.();
          return;
        }
        if (event === "error") {
          try {
            const parsed = JSON.parse(data);
            throw new Error(parsed.error ?? "stream error");
          } catch (err) {
            throw err instanceof Error ? err : new Error("stream error");
          }
        }
        if (data) {
          try {
            const parsed = JSON.parse(data);
            if (typeof parsed.delta === "string") onDelta(parsed.delta);
          } catch {
            // ignore malformed chunks
          }
        }
      }
    }
    onDone?.();
  } catch (e) {
    if ((e as Error).name === "AbortError") return;
    onError?.(e as Error);
  }
}

export function useElapsedSeconds(running: boolean, startedAt: number | null) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(startedAt);
  useEffect(() => {
    startRef.current = startedAt;
  }, [startedAt]);
  useEffect(() => {
    if (!running || !startedAt) return;
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - (startRef.current ?? Date.now())) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [running, startedAt]);
  return elapsed;
}

export function formatClock(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
