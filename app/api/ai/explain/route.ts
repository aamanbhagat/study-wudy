import { NextRequest } from "next/server";
import { studyExplainPrompt } from "@/lib/ai/prompts";
import { rateLimit, rateLimitResponse } from "@/lib/ai/rate-limit";
import { streamChatResponse, type Provider } from "@/lib/ai/provider";

export const runtime = "nodejs";
export const maxDuration = 60;

interface ExplainRequest {
  topicTitle: string;
  subtopics?: string[];
  knowledgeLevel?: number;
  provider?: Provider;
}

export async function POST(req: NextRequest) {
  const limited = rateLimit("explain", { capacity: 10, refillPerMinute: 10 });
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterMs);

  let body: ExplainRequest;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.topicTitle) return Response.json({ error: "topicTitle required" }, { status: 400 });

  const system = studyExplainPrompt(body.topicTitle, body.subtopics ?? [], body.knowledgeLevel ?? 0);

  try {
    return streamChatResponse({
      provider: body.provider,
      system,
      messages: [{ role: "user", content: `Begin the study guide for "${body.topicTitle}".` }],
    });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
}
