import { getAnthropicClient, ANTHROPIC_MODEL } from "@/lib/ai/client";
import { getGeminiModel } from "@/lib/ai/gemini";
import type Anthropic from "@anthropic-ai/sdk";
import type { Part } from "@google/generative-ai";

export type Provider = "anthropic" | "gemini";

export function resolveProvider(requested?: Provider | null): Provider {
  if (requested === "anthropic" || requested === "gemini") return requested;
  const env = (process.env.AI_PROVIDER ?? "").toLowerCase();
  if (env === "gemini") return "gemini";
  if (env === "anthropic") return "anthropic";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.GOOGLE_GEMINI_API_KEY) return "gemini";
  return "anthropic";
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  images?: { mediaType: string; data: string }[];
}

interface StreamArgs {
  provider?: Provider;
  system: string;
  messages: ChatMessage[];
  maxTokens?: number;
}

function toGeminiParts(content: string, images?: { mediaType: string; data: string }[]): Part[] {
  if (!images || images.length === 0) return [{ text: content }];
  const parts: Part[] = images.map((img) => ({
    inlineData: { mimeType: img.mediaType, data: img.data },
  }));
  if (content) parts.push({ text: content });
  return parts;
}

function toAnthropicMessages(messages: ChatMessage[]): Anthropic.Messages.MessageParam[] {
  return messages.map((m) => {
    if (m.images && m.images.length) {
      const blocks: Anthropic.Messages.ContentBlockParam[] = m.images.map((img) => ({
        type: "image",
        source: {
          type: "base64",
          media_type: img.mediaType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
          data: img.data,
        },
      }));
      if (m.content) blocks.push({ type: "text", text: m.content });
      return { role: m.role, content: blocks };
    }
    return { role: m.role, content: m.content };
  });
}

export function streamChatResponse(args: StreamArgs): Response {
  const provider = resolveProvider(args.provider);
  const encoder = new TextEncoder();

  const sse = new ReadableStream<Uint8Array>({
    async start(controller) {
      const sendDelta = (text: string) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta: text })}\n\n`));
      const sendDone = () => controller.enqueue(encoder.encode(`event: done\ndata: {}\n\n`));
      const sendError = (msg: string) =>
        controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ error: msg })}\n\n`));

      try {
        if (provider === "gemini") {
          const model = getGeminiModel({ system: args.system });
          const last = args.messages[args.messages.length - 1];
          if (!last) throw new Error("No messages provided");
          const history = args.messages.slice(0, -1).map((m) => ({
            role: m.role === "assistant" ? ("model" as const) : ("user" as const),
            parts: toGeminiParts(m.content, m.images),
          }));
          const chat = model.startChat({ history });
          const result = await chat.sendMessageStream(toGeminiParts(last.content, last.images));
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) sendDelta(text);
          }
        } else {
          const client = getAnthropicClient();
          const stream = await client.messages.stream({
            model: ANTHROPIC_MODEL,
            max_tokens: args.maxTokens ?? 4096,
            system: args.system,
            messages: toAnthropicMessages(args.messages),
          });
          for await (const event of stream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              sendDelta(event.delta.text);
            }
          }
        }
        sendDone();
        controller.close();
      } catch (e) {
        sendError((e as Error).message);
        controller.close();
      }
    },
  });

  return new Response(sse, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

interface JsonArgs {
  provider?: Provider;
  prompt: string;
  maxTokens?: number;
  system?: string;
}

export async function generateJsonText({ provider, prompt, maxTokens, system }: JsonArgs): Promise<string> {
  const p = resolveProvider(provider);
  if (p === "gemini") {
    const model = getGeminiModel({ json: true, system });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }
  const client = getAnthropicClient();
  const result = await client.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: maxTokens ?? 1024,
    system: system ?? "You return strict JSON only. Never wrap responses in markdown fences.",
    messages: [{ role: "user", content: prompt }],
  });
  return result.content.map((c) => (c.type === "text" ? c.text : "")).join("").trim();
}
