import { NextRequest } from "next/server";
import { recallEvaluationPrompt } from "@/lib/ai/prompts";
import { rateLimit, rateLimitResponse } from "@/lib/ai/rate-limit";
import { parseJsonResponse } from "@/lib/ai/parse";
import { generateJsonText, type Provider } from "@/lib/ai/provider";

export const runtime = "nodejs";
export const maxDuration = 30;

interface EvaluateRecallRequest {
  topicTitle: string;
  subtopics: string[];
  studentRecall: string;
  provider?: Provider;
}

interface EvaluateRecallResponse {
  score: number;
  covered: string[];
  missed: string[];
  errors: string[];
  feedback: string;
  next_action: string;
}

export async function POST(req: NextRequest) {
  const limited = rateLimit("evaluate-recall", { capacity: 20, refillPerMinute: 20 });
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterMs);

  let body: EvaluateRecallRequest;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.topicTitle || !body.studentRecall)
    return Response.json({ error: "topicTitle and studentRecall required" }, { status: 400 });

  let text: string;
  try {
    text = await generateJsonText({
      provider: body.provider,
      prompt: recallEvaluationPrompt(body.topicTitle, body.subtopics ?? [], body.studentRecall),
      maxTokens: 1024,
    });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }

  try {
    const parsed = parseJsonResponse<EvaluateRecallResponse>(text);
    return Response.json(parsed);
  } catch {
    return Response.json({ error: "Could not parse response", raw: text }, { status: 502 });
  }
}
