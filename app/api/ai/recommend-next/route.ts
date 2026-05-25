import { NextRequest } from "next/server";
import { recommendNextPrompt } from "@/lib/ai/prompts";
import { rateLimit, rateLimitResponse } from "@/lib/ai/rate-limit";
import { parseJsonResponse } from "@/lib/ai/parse";
import { generateJsonText, type Provider } from "@/lib/ai/provider";

export const runtime = "nodejs";
export const maxDuration = 30;

interface RecommendRequest {
  recentTopics: { title: string; level: number }[];
  fieldFocus?: string;
  provider?: Provider;
}

interface RecommendResponse {
  topic: string;
  reason: string;
  estimated_minutes: number;
  prerequisites_ok: boolean;
}

export async function POST(req: NextRequest) {
  const limited = rateLimit("recommend-next", { capacity: 10, refillPerMinute: 10 });
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterMs);

  let body: RecommendRequest;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let text: string;
  try {
    text = await generateJsonText({
      provider: body.provider,
      prompt: recommendNextPrompt(body),
      maxTokens: 512,
    });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }

  try {
    const parsed = parseJsonResponse<RecommendResponse>(text);
    return Response.json(parsed);
  } catch {
    return Response.json({ error: "Could not parse response", raw: text }, { status: 502 });
  }
}
