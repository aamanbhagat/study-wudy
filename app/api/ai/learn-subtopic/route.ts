import { NextRequest } from "next/server";
import { learnSubtopicPrompt } from "@/lib/ai/prompts";
import { rateLimit, rateLimitResponse } from "@/lib/ai/rate-limit";
import { streamChatResponse, type Provider } from "@/lib/ai/provider";
import { readSubtopicContent, writeSubtopicContent } from "@/lib/content-cache";

export const runtime = "nodejs";
export const maxDuration = 120;

interface LearnRequest {
  subtopicId?: string;
  subtopicTitle: string;
  topicTitle: string;
  fieldName: string;
  phaseTitle: string;
  provider?: Provider;
  forceRegenerate?: boolean;
}

export async function POST(req: NextRequest) {
  const limited = rateLimit("learn-subtopic", { capacity: 12, refillPerMinute: 12 });
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterMs);

  let body: LearnRequest;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.subtopicTitle) return Response.json({ error: "subtopicTitle required" }, { status: 400 });

  // Cache short-circuit: stream the cached content as a single chunk so the client
  // SSE handler shows it instantly without round-tripping a separate fetch.
  if (body.subtopicId && !body.forceRegenerate) {
    const cached = await readSubtopicContent(body.subtopicId);
    if (cached !== null) {
      const encoder = new TextEncoder();
      const sse = new ReadableStream<Uint8Array>({
        start(controller) {
          // Chunk into smaller pieces so the existing UI shows the streaming cursor briefly.
          const CHUNK = 600;
          for (let i = 0; i < cached.length; i += CHUNK) {
            const piece = cached.slice(i, i + CHUNK);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta: piece })}\n\n`));
          }
          controller.enqueue(encoder.encode(`event: done\ndata: ${JSON.stringify({ cached: true })}\n\n`));
          controller.close();
        },
      });
      return new Response(sse, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    }
  }

  const system = learnSubtopicPrompt(body);

  // Wrap the streaming response so we can capture the full content and write to disk on done.
  let originalResponse: Response;
  try {
    originalResponse = streamChatResponse({
      provider: body.provider,
      system,
      messages: [
        {
          role: "user",
          content: `Teach me "${body.subtopicTitle}" from "${body.topicTitle}". Begin the mini-lesson now.`,
        },
      ],
    });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }

  if (!originalResponse.body) return originalResponse;

  let fullContent = "";
  const reader = originalResponse.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const teeStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          // Pass through to client as-is.
          controller.enqueue(encoder.encode(chunk));
          // Parse out the deltas for caching.
          for (const block of chunk.split("\n\n")) {
            const lines = block.split("\n");
            let event = "message";
            let data = "";
            for (const line of lines) {
              if (line.startsWith("event:")) event = line.slice(6).trim();
              else if (line.startsWith("data:")) data += line.slice(5).trim();
            }
            if (event === "message" && data) {
              try {
                const parsed = JSON.parse(data);
                if (typeof parsed.delta === "string") fullContent += parsed.delta;
              } catch {
                // ignore
              }
            }
          }
        }
        // Persist to disk after a clean finish.
        if (body.subtopicId && fullContent.trim().length > 0) {
          try {
            await writeSubtopicContent(body.subtopicId, fullContent);
          } catch (e) {
            console.warn("Failed to cache subtopic content:", (e as Error).message);
          }
        }
      } catch (e) {
        controller.enqueue(
          encoder.encode(
            `event: error\ndata: ${JSON.stringify({ error: (e as Error).message })}\n\n`,
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(teeStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
