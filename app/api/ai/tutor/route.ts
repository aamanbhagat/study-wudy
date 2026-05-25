import { NextRequest } from "next/server";
import { tutorSystemPrompt, type TutorMode } from "@/lib/ai/prompts";
import { rateLimit, rateLimitResponse } from "@/lib/ai/rate-limit";
import { streamChatResponse, type Provider } from "@/lib/ai/provider";

export const runtime = "nodejs";
export const maxDuration = 60;

type Attachment = { type: "image"; mediaType: string; data: string };

interface TutorRequest {
  mode?: TutorMode;
  topicTitle?: string;
  provider?: Provider;
  history: Array<{ role: "user" | "assistant"; content: string; attachments?: Attachment[] }>;
}

export async function POST(req: NextRequest) {
  const limited = rateLimit("tutor", { capacity: 30, refillPerMinute: 30 });
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterMs);

  let body: TutorRequest;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const mode = (body.mode ?? "explain") as TutorMode;
  const system = tutorSystemPrompt(mode, body.topicTitle);

  const messages = body.history.map((m) => ({
    role: m.role,
    content: m.content,
    images: m.role === "user" ? m.attachments?.map((a) => ({ mediaType: a.mediaType, data: a.data })) : undefined,
  }));

  try {
    return streamChatResponse({ provider: body.provider, system, messages });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
}
