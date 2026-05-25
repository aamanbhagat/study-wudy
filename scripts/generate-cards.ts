/* eslint-disable no-console */
/**
 * Bulk-generate flashcards for every subtopic of a subject using Gemini.
 * Primary model: gemini-3.1-pro-preview (high quality, 250 RPD daily cap).
 * Fallback: gemini-2.5-flash (10k RPD) — used automatically once Pro hits its
 * daily quota.
 *
 * Saves to data/cards/cards-<subtopicId>.json. Resumable.
 *
 * Usage:
 *   GOOGLE_GEMINI_API_KEY=... npx tsx scripts/generate-cards.ts math
 *   GOOGLE_GEMINI_API_KEY=... npx tsx scripts/generate-cards.ts all
 *   PRIMARY_MODEL=gemini-3.1-pro-preview FALLBACK_MODEL=gemini-2.5-flash \
 *     RPM=60 CONCURRENCY=8 npx tsx scripts/generate-cards.ts all
 */
import { promises as fs } from "fs";
import path from "path";
import { CURRICULUM, type CurriculumField } from "../lib/curriculum-data";
import { GoogleGenerativeAI } from "@google/generative-ai";

const CARDS_DIR = path.join(process.cwd(), "data", "cards");
const RPM = Number(process.env.RPM ?? 60);
const CONCURRENCY = Number(process.env.CONCURRENCY ?? 8);
const MIN_GAP_MS = Math.ceil(60_000 / RPM);
const MIN_CARDS = 5;
const MAX_CARDS = 10;
const PRIMARY_MODEL = process.env.PRIMARY_MODEL ?? "gemini-3.1-pro-preview";
const FALLBACK_MODEL = process.env.FALLBACK_MODEL ?? "gemini-2.5-flash";

// Once primary hits a daily-quota 429 we stop trying it for the rest of the run.
let primaryExhausted = false;

function isDailyQuotaError(msg: string): boolean {
  return /429|quota|exceed|generate_requests_per_model_per_day|GenerateRequestsPerDayPerProjectPerModel/i.test(
    msg,
  );
}

interface GeneratedCard {
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
}

function safeId(id: string) {
  return id.replace(/[^a-z0-9-_]/gi, "_");
}

function cardsPath(id: string) {
  return path.join(CARDS_DIR, `cards-${safeId(id)}.json`);
}

async function exists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

class RateLimiter {
  private nextAllowedAt = 0;
  private mutex: Promise<void> = Promise.resolve();
  constructor(private gapMs: number) {}
  async wait(): Promise<void> {
    const release = this.mutex;
    let resolveNext!: () => void;
    this.mutex = new Promise<void>((r) => (resolveNext = r));
    await release;
    const now = Date.now();
    const slot = Math.max(now, this.nextAllowedAt);
    this.nextAllowedAt = slot + this.gapMs;
    const waitMs = slot - now;
    resolveNext();
    if (waitMs > 0) await new Promise((r) => setTimeout(r, waitMs));
  }
}

function buildPrompt(args: { subTitle: string; topicTitle: string; fieldName: string }) {
  return `You are creating spaced-repetition flashcards for a student studying ${args.fieldName} from absolute zero to elite level.

Topic: "${args.topicTitle}"
Subtopic to cover comprehensively: "${args.subTitle}"

Produce ${MIN_CARDS}–${MAX_CARDS} high-quality flashcards that COMPLETELY cover the subtopic so the student forgets nothing.

Rules:
- Front = a precise question, prompt, or fill-in-the-blank.
- Back = the answer, derivation, or definition. Be exact, not vague.
- Use LaTeX for math: inline $...$, display $$...$$.
- Mix question types: definitions, derivations, applications, edge cases, formulas to memorize, intuitive explanations.
- Vary difficulty across the set: 1-2 easy (definitions/recognition), 2-4 medium (application), 1-3 hard (derivation/synthesis).
- Each card should be atomic — one concept per card.
- No two cards should ask essentially the same thing.
- For coding/CS topics, use small code snippets in fenced \`\`\` blocks where helpful.
- Keep front under ~200 chars and back under ~600 chars unless a derivation requires more.

Return STRICT JSON only — no markdown fences, no preamble:
{
  "cards": [
    { "front": "<question>", "back": "<answer>", "difficulty": "easy" | "medium" | "hard" },
    ...
  ]
}`;
}

async function generateOne(
  client: GoogleGenerativeAI,
  args: { subTitle: string; topicTitle: string; fieldName: string },
): Promise<{ cards: GeneratedCard[]; modelUsed: string }> {
  // Try primary first unless it's already exhausted.
  if (!primaryExhausted) {
    try {
      const cards = await callModel(client, PRIMARY_MODEL, args);
      return { cards, modelUsed: PRIMARY_MODEL };
    } catch (e) {
      const msg = (e as Error).message;
      if (isDailyQuotaError(msg)) {
        primaryExhausted = true;
        console.warn(
          `\n⚠️  Primary model (${PRIMARY_MODEL}) hit daily quota — switching all subsequent calls to ${FALLBACK_MODEL}\n`,
        );
      } else {
        // Re-throw non-quota errors so the retry wrapper can handle them.
        throw e;
      }
    }
  }
  const cards = await callModel(client, FALLBACK_MODEL, args);
  return { cards, modelUsed: FALLBACK_MODEL };
}

async function callModel(
  client: GoogleGenerativeAI,
  modelName: string,
  args: { subTitle: string; topicTitle: string; fieldName: string },
): Promise<GeneratedCard[]> {
  const model = client.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 4096,
      responseMimeType: "application/json",
    },
  });
  const result = await model.generateContent(buildPrompt(args));
  const text = result.response.text();
  const parsed = parseFlexibleJson(text);
  if (!parsed || !Array.isArray(parsed.cards) || parsed.cards.length < MIN_CARDS) {
    throw new Error(`Got only ${parsed?.cards?.length ?? 0} cards`);
  }
  return parsed.cards.slice(0, MAX_CARDS);
}

/**
 * Gemini occasionally emits JSON with unescaped backslashes coming from LaTeX
 * (e.g. \frac instead of \\frac). Try strict JSON.parse first, then repair.
 */
function parseFlexibleJson(text: string): { cards: GeneratedCard[] } | null {
  const stripped = text
    .replace(/^﻿/, "")
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  try {
    return JSON.parse(stripped);
  } catch {
    /* fall through */
  }
  // Escape any backslash that isn't already a valid JSON escape character.
  // Valid: \\ \/ \" \b \f \n \r \t \uXXXX
  const repaired = stripped.replace(/\\(?!["\\/bfnrtu])/g, "\\\\");
  try {
    return JSON.parse(repaired);
  } catch {
    return null;
  }
}

async function withRetry<T>(label: string, fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      const msg = (e as Error).message;
      const isRate = /quota|rate|429|exceed/i.test(msg);
      const wait = isRate ? 30_000 : 4_000 * Math.pow(2, i);
      console.error(`[${label}] failed (attempt ${i + 1}/${attempts}): ${msg}`);
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, wait));
    }
  }
  throw lastErr;
}

async function main() {
  const target = (process.argv[2] ?? "all") as CurriculumField["key"] | "all";
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GOOGLE_GEMINI_API_KEY is not set.");
    process.exit(1);
  }
  const client = new GoogleGenerativeAI(apiKey);
  await fs.mkdir(CARDS_DIR, { recursive: true });

  interface JobInput {
    index: number;
    total: number;
    subId: string;
    subTitle: string;
    topicId: string;
    topicTitle: string;
    fieldKey: string;
    fieldName: string;
  }
  const all: JobInput[] = [];
  const fields = target === "all" ? CURRICULUM : CURRICULUM.filter((f) => f.key === target);
  if (fields.length === 0) {
    console.error(`Unknown field: ${target}`);
    process.exit(1);
  }
  for (const field of fields) {
    for (const phase of field.phases) {
      for (const topic of phase.topics) {
        for (const sub of topic.subtopics) {
          all.push({
            index: 0,
            total: 0,
            subId: sub.id,
            subTitle: sub.title,
            topicId: topic.id,
            topicTitle: topic.title,
            fieldKey: field.key,
            fieldName: field.name,
          });
        }
      }
    }
  }
  all.forEach((j, i) => {
    j.index = i + 1;
    j.total = all.length;
  });

  console.log(`Target: ${target}`);
  console.log(`Total subtopics: ${all.length}`);
  console.log(`Primary model: ${PRIMARY_MODEL} (auto-fallback to ${FALLBACK_MODEL})`);
  console.log(`RPM cap: ${RPM} · concurrency: ${CONCURRENCY} · min gap: ${MIN_GAP_MS}ms`);
  console.log("---");

  const limiter = new RateLimiter(MIN_GAP_MS);
  let made = 0;
  let totalCards = 0;
  let skipped = 0;
  let failed = 0;
  const startedAt = Date.now();
  let cursor = 0;

  async function worker(workerId: number) {
    while (true) {
      const myIdx = cursor++;
      if (myIdx >= all.length) return;
      const item = all[myIdx];
      const filePath = cardsPath(item.subId);
      const tag = `${item.index}/${item.total}`;
      if (await exists(filePath)) {
        skipped++;
        if (skipped % 50 === 0) console.log(`[${tag}] skip (cached)`);
        continue;
      }
      await limiter.wait();
      const label = `w${workerId} ${item.topicTitle} → ${item.subTitle}`;
      try {
        const { cards, modelUsed } = await withRetry(label, () =>
          generateOne(client, {
            subTitle: item.subTitle,
            topicTitle: item.topicTitle,
            fieldName: item.fieldName,
          }),
        );
        const payload = {
          subtopicId: item.subId,
          subtopicTitle: item.subTitle,
          topicId: item.topicId,
          topicTitle: item.topicTitle,
          field: item.fieldKey,
          model: modelUsed,
          generatedAt: new Date().toISOString(),
          cards,
        };
        await fs.writeFile(filePath, JSON.stringify(payload, null, 2), "utf8");
        made++;
        totalCards += cards.length;
        const elapsed = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
        const rate = made / elapsed;
        const remaining = all.length - skipped - made - failed;
        const etaSec = rate > 0 ? Math.round(remaining / rate) : 0;
        console.log(
          `[${tag}] ✓ ${cards.length} cards (${modelUsed}) · done ${made + skipped}/${all.length} · ETA ~${Math.round(etaSec / 60)}m`,
        );
      } catch (e) {
        failed++;
        console.error(`[${tag}] ✗ ${(e as Error).message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i + 1)));

  console.log("---");
  console.log(
    `Done. generated: ${made} files (${totalCards} cards) · cached-skip: ${skipped} · failed: ${failed}`,
  );
  console.log(`Wall time: ${Math.round((Date.now() - startedAt) / 60000)} min`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
