import { NextRequest } from "next/server";
import { sessionFeedbackPrompt } from "@/lib/ai/prompts";
import { rateLimit, rateLimitResponse } from "@/lib/ai/rate-limit";
import { parseJsonResponse } from "@/lib/ai/parse";
import { generateJsonText, type Provider } from "@/lib/ai/provider";

export const runtime = "nodejs";
export const maxDuration = 30;

interface SessionFeedbackRequest {
  topicTitle: string;
  durationMinutes: number;
  recallScores: number[];
  notes?: string;
  provider?: Provider;
}

interface SessionFeedbackResponse {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  knowledge_level_delta: number;
  xp_award: number;
  anki_cards: { front: string; back: string }[];
  next_recommendation: string;
}

export async function POST(req: NextRequest) {
  const limited = rateLimit("session-feedback", { capacity: 10, refillPerMinute: 10 });
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterMs);

  let body: SessionFeedbackRequest;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.topicTitle) return Response.json({ error: "topicTitle required" }, { status: 400 });

  let text: string;
  try {
    text = await generateJsonText({
      provider: body.provider,
      prompt: sessionFeedbackPrompt(body),
      maxTokens: 2048,
    });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }

  try {
    const parsed = parseJsonResponse<SessionFeedbackResponse>(text);
    return Response.json(parsed);
  } catch {
    return Response.json({ error: "Could not parse response", raw: text }, { status: 502 });
  }
}
