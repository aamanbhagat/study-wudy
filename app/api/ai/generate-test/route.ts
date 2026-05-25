import { NextRequest } from "next/server";
import {
  generateTestPrompt,
  type TestType,
  type TestDifficulty,
  type QuestionType,
} from "@/lib/ai/prompts";
import { rateLimit, rateLimitResponse } from "@/lib/ai/rate-limit";
import { parseJsonResponse } from "@/lib/ai/parse";
import { generateJsonText, type Provider } from "@/lib/ai/provider";

export const runtime = "nodejs";
export const maxDuration = 60;

interface GenerateTestRequest {
  testType: TestType;
  topics: { title: string; subtopics: string[] }[];
  difficulty: TestDifficulty;
  totalQuestions?: number;
  provider?: Provider;
}

export interface TestQuestion {
  id: string;
  type: QuestionType;
  topic: string;
  prompt: string;
  options: string[] | null;
  correct_indices: number[] | null;
  ideal_answer: string | null;
  language: string | null;
  starter_code: string | null;
  difficulty: TestDifficulty;
  points: number;
}

export interface GenerateTestResponse {
  title: string;
  duration_minutes: number;
  questions: TestQuestion[];
}

export async function POST(req: NextRequest) {
  const limited = rateLimit("generate-test", { capacity: 6, refillPerMinute: 6 });
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterMs);

  let body: GenerateTestRequest;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.topics || body.topics.length === 0)
    return Response.json({ error: "topics required" }, { status: 400 });

  const totalQuestions =
    body.totalQuestions ??
    (body.testType === "quick" ? 5 : body.testType === "topic" ? 8 : body.testType === "phase" ? 12 : 10);

  let text: string;
  try {
    text = await generateJsonText({
      provider: body.provider,
      prompt: generateTestPrompt({
        testType: body.testType,
        topics: body.topics,
        difficulty: body.difficulty,
        totalQuestions,
      }),
      maxTokens: 4096,
    });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }

  try {
    const parsed = parseJsonResponse<GenerateTestResponse>(text);
    return Response.json(parsed);
  } catch {
    return Response.json({ error: "Could not parse response", raw: text }, { status: 502 });
  }
}
