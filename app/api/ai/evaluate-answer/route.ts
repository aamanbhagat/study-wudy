import { NextRequest } from "next/server";
import { evaluateAnswerPrompt, testResultsAnalysisPrompt, type QuestionType } from "@/lib/ai/prompts";
import { rateLimit, rateLimitResponse } from "@/lib/ai/rate-limit";
import { parseJsonResponse } from "@/lib/ai/parse";
import { generateJsonText, type Provider } from "@/lib/ai/provider";

export const runtime = "nodejs";
export const maxDuration = 30;

interface SingleEvalRequest {
  question: string;
  idealAnswer: string | null;
  studentAnswer: string;
  questionType: QuestionType;
  provider?: Provider;
}

interface BatchAnalysisRequest {
  analysis: true;
  questions: { topic: string; verdict: string; explanation: string }[];
  provider?: Provider;
}

type Body = SingleEvalRequest | BatchAnalysisRequest;

function isAnalysis(b: Body): b is BatchAnalysisRequest {
  return (b as BatchAnalysisRequest).analysis === true;
}

export async function POST(req: NextRequest) {
  const limited = rateLimit("evaluate-answer", { capacity: 30, refillPerMinute: 30 });
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterMs);

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const prompt = isAnalysis(body)
    ? testResultsAnalysisPrompt({ questions: body.questions })
    : evaluateAnswerPrompt(body);

  let text: string;
  try {
    text = await generateJsonText({
      provider: body.provider,
      prompt,
      maxTokens: isAnalysis(body) ? 1024 : 768,
    });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }

  try {
    const parsed = parseJsonResponse(text);
    return Response.json(parsed);
  } catch {
    return Response.json({ error: "Could not parse response", raw: text }, { status: 502 });
  }
}
