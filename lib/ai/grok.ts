import { xai } from "@ai-sdk/xai";
import { streamText, generateText, type LanguageModel } from "ai";

let _model: LanguageModel | null = null;
let _jsonModel: LanguageModel | null = null;

export const GROK_MODEL = process.env.GROK_MODEL ?? "grok-4";

function ensureKey() {
  const key = process.env.XAI_API_KEY;
  if (!key) throw new Error("XAI_API_KEY is not set");
  return key;
}

export function getGrokModel(): LanguageModel {
  ensureKey();
  if (_model) return _model;
  _model = xai(GROK_MODEL);
  return _model;
}

export function getGrokJsonModel(): LanguageModel {
  ensureKey();
  if (_jsonModel) return _jsonModel;
  _jsonModel = xai(GROK_MODEL);
  return _jsonModel;
}

export interface GrokMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function grokGenerateJson({
  prompt,
  system,
  maxTokens,
}: {
  prompt: string;
  system?: string;
  maxTokens?: number;
}): Promise<string> {
  const result = await generateText({
    model: getGrokJsonModel(),
    system: system ?? "You return strict JSON only. Never wrap responses in markdown fences.",
    prompt,
    maxOutputTokens: maxTokens ?? 4096,
    temperature: 0.4,
  });
  return result.text.trim();
}

export function grokStreamText(args: {
  system: string;
  messages: GrokMessage[];
  maxTokens?: number;
}) {
  return streamText({
    model: getGrokModel(),
    system: args.system,
    messages: args.messages.map((m) => ({ role: m.role, content: m.content })),
    maxOutputTokens: args.maxTokens ?? 4096,
    temperature: 0.7,
  });
}
