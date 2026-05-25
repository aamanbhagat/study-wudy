import { GoogleGenerativeAI, type GenerativeModel } from "@google/generative-ai";

let _client: GoogleGenerativeAI | null = null;

export function getGeminiClient() {
  if (_client) return _client;
  const key = process.env.GOOGLE_GEMINI_API_KEY;
  if (!key) throw new Error("GOOGLE_GEMINI_API_KEY is not set");
  _client = new GoogleGenerativeAI(key);
  return _client;
}

export const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";

export function getGeminiModel(opts?: { json?: boolean; system?: string }): GenerativeModel {
  const client = getGeminiClient();
  return client.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: opts?.system,
    generationConfig: opts?.json
      ? { responseMimeType: "application/json", temperature: 0.4, maxOutputTokens: 4096 }
      : { temperature: 0.7, maxOutputTokens: 4096 },
  });
}
