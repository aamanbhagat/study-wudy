import { NextRequest } from "next/server";
import { dailyPlanPrompt } from "@/lib/ai/prompts";
import { rateLimit, rateLimitResponse } from "@/lib/ai/rate-limit";
import { parseJsonResponse } from "@/lib/ai/parse";
import { rankTopics, type ScoreInput } from "@/lib/algorithms/priority-scoring";
import { generateJsonText, type Provider } from "@/lib/ai/provider";

export const runtime = "nodejs";
export const maxDuration = 30;

interface DailyPlanRequest {
  candidates: (ScoreInput & { topicTitle: string })[];
  totalMinutesTarget?: number;
  fieldFocus?: string;
  provider?: Provider;
}

export interface DailyPlanResponse {
  insight: string;
  blocks: { topic: string; field: string; minutes: number; kind: string; reason: string }[];
  total_minutes: number;
}

export async function POST(req: NextRequest) {
  const limited = rateLimit("daily-plan", { capacity: 6, refillPerMinute: 6 });
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterMs);

  let body: DailyPlanRequest;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.candidates || body.candidates.length === 0)
    return Response.json({ error: "candidates required" }, { status: 400 });

  const ranked = rankTopics(body.candidates).slice(0, 12);
  const candidatesForPrompt = ranked.map((r) => ({
    topic: body.candidates.find((c) => c.topicId === r.topicId)?.topicTitle ?? r.topicId,
    field: r.field,
    score: r.score,
    level: r.knowledgeLevel,
    daysSince: r.daysSinceLastStudy,
  }));

  let text: string;
  try {
    text = await generateJsonText({
      provider: body.provider,
      prompt: dailyPlanPrompt({
        candidates: candidatesForPrompt,
        totalMinutesTarget: body.totalMinutesTarget ?? 240,
        fieldFocus: body.fieldFocus,
      }),
      maxTokens: 1024,
    });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }

  try {
    const parsed = parseJsonResponse<DailyPlanResponse>(text);
    return Response.json({ ...parsed, ranked });
  } catch {
    return Response.json({ error: "Could not parse response", raw: text }, { status: 502 });
  }
}
