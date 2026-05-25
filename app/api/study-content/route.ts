import { NextRequest } from "next/server";
import { readStudyContent, writeStudyContent } from "@/lib/study-content-cache";
import { findSubtopic } from "@/lib/curriculum-helpers";
import { deepStudyContentPrompt } from "@/lib/ai/prompts";
import { rateLimit, rateLimitResponse } from "@/lib/ai/rate-limit";
import { getGeminiClient } from "@/lib/ai/gemini";

export const runtime = "nodejs";
export const maxDuration = 180;

interface Body {
  subtopicId: string;
  forceRegenerate?: boolean;
}

const PRIMARY_MODEL = process.env.PRIMARY_MODEL ?? "gemini-3.1-pro-preview";
const FALLBACK_MODEL = process.env.FALLBACK_MODEL ?? "gemini-2.5-flash";

function isDailyQuotaError(msg: string): boolean {
  return /429|quota|exceed|generate_requests_per_model_per_day|GenerateRequestsPerDayPerProjectPerModel/i.test(
    msg,
  );
}

export async function POST(req: NextRequest) {
  const limited = rateLimit("study-content", { capacity: 6, refillPerMinute: 6 });
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterMs);

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.subtopicId) return Response.json({ error: "subtopicId required" }, { status: 400 });

  if (!body.forceRegenerate) {
    const cached = await readStudyContent(body.subtopicId);
    if (cached !== null) {
      return Response.json({ cached: true, content: cached });
    }
  }

  const lookup = findSubtopic(body.subtopicId);
  if (!lookup) return Response.json({ error: "Unknown subtopic" }, { status: 404 });

  let client;
  try {
    client = getGeminiClient();
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }

  const promptArgs = {
    subtopicTitle: lookup.subtopic.title,
    topicTitle: lookup.topic.title,
    fieldName: lookup.field.name,
    phaseTitle: `Phase ${lookup.phase.number} — ${lookup.phase.title}`,
  };
  const system = deepStudyContentPrompt(promptArgs);

  async function callOnce(modelName: string): Promise<string> {
    const model = client!.getGenerativeModel({
      model: modelName,
      systemInstruction: system,
      generationConfig: { temperature: 0.6, maxOutputTokens: 16384 },
    });
    const result = await model.generateContent(
      `Begin the in-depth lesson on "${promptArgs.subtopicTitle}" from the topic "${promptArgs.topicTitle}".`,
    );
    return result.response.text();
  }

  let content = "";
  let modelUsed = PRIMARY_MODEL;
  try {
    content = await callOnce(PRIMARY_MODEL);
  } catch (e) {
    const msg = (e as Error).message;
    if (isDailyQuotaError(msg)) {
      try {
        modelUsed = FALLBACK_MODEL;
        content = await callOnce(FALLBACK_MODEL);
      } catch (e2) {
        return Response.json({ error: (e2 as Error).message }, { status: 500 });
      }
    } else {
      return Response.json({ error: msg }, { status: 500 });
    }
  }

  if (content && content.length > 1000) {
    try {
      await writeStudyContent(body.subtopicId, content);
    } catch (e) {
      console.warn("Failed to cache study content:", (e as Error).message);
    }
  }
  return Response.json({ cached: false, content, modelUsed });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const subtopicId = url.searchParams.get("subtopicId");
  if (!subtopicId) return Response.json({ error: "subtopicId required" }, { status: 400 });
  const content = await readStudyContent(subtopicId);
  if (content === null) return Response.json({ cached: false }, { status: 404 });
  return Response.json({ cached: true, content });
}
