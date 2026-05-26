import { NextRequest } from "next/server";
import { readStudyContent, writeStudyContent, type StudyLang } from "@/lib/study-content-cache";
import { findSubtopic } from "@/lib/curriculum-helpers";
import { deepStudyContentPrompt } from "@/lib/ai/prompts";
import { rateLimit, rateLimitResponse } from "@/lib/ai/rate-limit";
import { resolveProvider, type Provider } from "@/lib/ai/provider";
import { getGeminiClient } from "@/lib/ai/gemini";
import { generateText } from "ai";
import { xai } from "@ai-sdk/xai";

export const runtime = "nodejs";
export const maxDuration = 180;

interface Body {
  subtopicId: string;
  forceRegenerate?: boolean;
  lang?: StudyLang;
  provider?: Provider;
}

const PRIMARY_MODEL = process.env.PRIMARY_MODEL ?? "gemini-3.1-pro-preview";
const FALLBACK_MODEL = process.env.FALLBACK_MODEL ?? "gemini-2.5-flash";
const GROK_MODEL = process.env.GROK_MODEL ?? "grok-4.3";

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
  const lang: StudyLang = body.lang === "hi" ? "hi" : "en";

  if (!body.forceRegenerate) {
    const cached = await readStudyContent(body.subtopicId, lang);
    if (cached !== null) {
      return Response.json({ cached: true, content: cached, lang });
    }
  }

  const lookup = findSubtopic(body.subtopicId);
  if (!lookup) return Response.json({ error: "Unknown subtopic" }, { status: 404 });

  const promptArgs = {
    subtopicTitle: lookup.subtopic.title,
    topicTitle: lookup.topic.title,
    fieldName: lookup.field.name,
    phaseTitle: `Phase ${lookup.phase.number} — ${lookup.phase.title}`,
    lang,
  };
  const system = deepStudyContentPrompt(promptArgs);
  const provider = resolveProvider(body.provider);

  async function callGrok(): Promise<string> {
    const result = await generateText({
      model: xai(GROK_MODEL),
      system,
      prompt: `Begin the in-depth lesson on "${promptArgs.subtopicTitle}" from the topic "${promptArgs.topicTitle}".`,
      maxOutputTokens: 16384,
      temperature: 0.6,
    });
    return result.text;
  }

  async function callGemini(modelName: string): Promise<string> {
    const client = getGeminiClient();
    const model = client.getGenerativeModel({
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
  let modelUsed: string;
  // If the resolver picks Gemini but the key isn't actually present, and Grok
  // is available, prefer Grok rather than failing with "key not set".
  const effectiveProvider: Provider =
    provider === "gemini" && !process.env.GOOGLE_GEMINI_API_KEY && process.env.XAI_API_KEY
      ? "grok"
      : provider;
  try {
    if (effectiveProvider === "grok") {
      modelUsed = GROK_MODEL;
      content = await callGrok();
    } else {
      modelUsed = PRIMARY_MODEL;
      try {
        content = await callGemini(PRIMARY_MODEL);
      } catch (e) {
        const msg = (e as Error).message;
        if (isDailyQuotaError(msg)) {
          modelUsed = FALLBACK_MODEL;
          content = await callGemini(FALLBACK_MODEL);
        } else if (process.env.XAI_API_KEY) {
          // Last-resort fallback to Grok if Gemini hard-fails for any reason.
          modelUsed = GROK_MODEL;
          content = await callGrok();
        } else {
          throw e;
        }
      }
    }
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }

  if (content && content.length > 1000) {
    try {
      await writeStudyContent(body.subtopicId, content, lang);
    } catch (e) {
      console.warn("Failed to cache study content:", (e as Error).message);
    }
  }
  return Response.json({ cached: false, content, modelUsed, lang });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const subtopicId = url.searchParams.get("subtopicId");
  const langParam = url.searchParams.get("lang");
  const lang: StudyLang = langParam === "hi" ? "hi" : "en";
  if (!subtopicId) return Response.json({ error: "subtopicId required" }, { status: 400 });
  const content = await readStudyContent(subtopicId, lang);
  if (content === null) return Response.json({ cached: false, lang }, { status: 404 });
  return Response.json({ cached: true, content, lang });
}
