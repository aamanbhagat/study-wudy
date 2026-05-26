/* eslint-disable no-console */
/**
 * Bulk-generate any missing flashcard files using xAI Grok via the Vercel AI
 * SDK. Resumable — only generates files not already on disk. Saves to
 * data/cards/cards-<subtopicId>.json with the same shape produced by the
 * Gemini script so the rest of the app reads them transparently.
 *
 * Usage:
 *   XAI_API_KEY=... npx tsx scripts/generate-cards-grok.ts all
 *   GROK_MODEL=grok-4 RPM=80 CONCURRENCY=6 npx tsx scripts/generate-cards-grok.ts physics
 *
 * Live progress: .gen-grok-cards.log and .gen-grok-cards.status.json.
 */
import { promises as fs } from "fs";
import path from "path";
import { generateText } from "ai";
import { xai } from "@ai-sdk/xai";
import { CURRICULUM, type CurriculumField } from "../lib/curriculum-data";

const CARDS_DIR = path.join(process.cwd(), "data", "cards");
const LOG_FILE = path.join(process.cwd(), ".gen-grok-cards.log");
const STATUS_FILE = path.join(process.cwd(), ".gen-grok-cards.status.json");
const RPM = Number(process.env.RPM ?? 80);
const CONCURRENCY = Number(process.env.CONCURRENCY ?? 6);
const MIN_GAP_MS = Math.ceil(60_000 / RPM);
const MIN_CARDS = 5;
const MAX_CARDS = 10;
const MODEL = process.env.GROK_MODEL ?? "grok-4";

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
  // Escape lone backslashes that break LaTeX-heavy JSON.
  const repaired = stripped.replace(/\\(?!["\\/bfnrtu])/g, "\\\\");
  try {
    return JSON.parse(repaired);
  } catch {
    return null;
  }
}

async function callGrok(args: {
  subTitle: string;
  topicTitle: string;
  fieldName: string;
}): Promise<GeneratedCard[]> {
  const result = await generateText({
    model: xai(MODEL),
    system:
      "You return strict JSON only. Never wrap responses in markdown fences. The JSON must follow the exact schema requested.",
    prompt: buildPrompt(args),
    maxOutputTokens: 4096,
    temperature: 0.5,
  });
  const parsed = parseFlexibleJson(result.text);
  if (!parsed || !Array.isArray(parsed.cards) || parsed.cards.length < MIN_CARDS) {
    throw new Error(`Got only ${parsed?.cards?.length ?? 0} cards`);
  }
  return parsed.cards.slice(0, MAX_CARDS);
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

async function appendLog(line: string) {
  await fs.appendFile(LOG_FILE, line + "\n", "utf8").catch(() => {});
}
async function writeStatus(s: object) {
  await fs.writeFile(STATUS_FILE, JSON.stringify(s, null, 2), "utf8").catch(() => {});
}

async function main() {
  const target = (process.argv[2] ?? "all") as CurriculumField["key"] | "all";
  if (!process.env.XAI_API_KEY) {
    console.error("XAI_API_KEY is not set.");
    process.exit(1);
  }
  await fs.mkdir(CARDS_DIR, { recursive: true });
  await fs.writeFile(LOG_FILE, "", "utf8").catch(() => {});

  interface JobInput {
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

  const todo: JobInput[] = [];
  for (const j of all) {
    if (!(await exists(cardsPath(j.subId)))) todo.push(j);
  }
  const totalAll = all.length;
  const totalToDo = todo.length;
  const alreadyDone = totalAll - totalToDo;

  console.log(`Target: ${target}`);
  console.log(`Curriculum: ${totalAll} subtopics · already cached: ${alreadyDone} · to generate: ${totalToDo}`);
  console.log(`Model: ${MODEL} (xAI)`);
  console.log(`RPM cap: ${RPM} · concurrency: ${CONCURRENCY} · min gap: ${MIN_GAP_MS}ms`);
  console.log("---");

  const limiter = new RateLimiter(MIN_GAP_MS);
  let made = 0;
  let totalCards = 0;
  let failed = 0;
  const failures: { id: string; title: string; reason: string }[] = [];
  const startedAt = Date.now();
  let cursor = 0;

  async function persistStatus(activeLabel: string | null = null) {
    const elapsed = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
    const rate = made / elapsed;
    const remaining = totalToDo - made - failed;
    const etaSec = rate > 0 ? Math.round(remaining / rate) : 0;
    await writeStatus({
      kind: "cards",
      model: MODEL,
      target,
      curriculumTotal: totalAll,
      alreadyCached: alreadyDone,
      pending: totalToDo,
      generatedThisRun: made,
      cardsGenerated: totalCards,
      failedThisRun: failed,
      remaining,
      elapsedSec: elapsed,
      etaSec,
      etaMin: Math.round(etaSec / 60),
      ratePerMin: Math.round(rate * 60 * 100) / 100,
      active: activeLabel,
      updatedAt: new Date().toISOString(),
    });
  }

  async function worker(workerId: number) {
    while (true) {
      const myIdx = cursor++;
      if (myIdx >= todo.length) return;
      const item = todo[myIdx];
      const filePath = cardsPath(item.subId);
      const tag = `${myIdx + 1}/${totalToDo}`;
      if (await exists(filePath)) continue;
      await limiter.wait();
      const label = `w${workerId} ${item.topicTitle} → ${item.subTitle}`;
      await persistStatus(label);
      try {
        const cards = await withRetry(label, () =>
          callGrok({
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
          model: MODEL,
          generatedAt: new Date().toISOString(),
          cards,
        };
        await fs.writeFile(filePath, JSON.stringify(payload, null, 2), "utf8");
        made++;
        totalCards += cards.length;
        const line = `[${tag}] ✓ ${cards.length} cards · ${item.subTitle}`;
        console.log(line);
        await appendLog(line);
      } catch (e) {
        failed++;
        const reason = (e as Error).message;
        failures.push({ id: item.subId, title: item.subTitle, reason });
        const line = `[${tag}] ✗ ${item.subTitle} — ${reason}`;
        console.error(line);
        await appendLog(line);
      }
      await persistStatus(null);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i + 1)));

  await persistStatus(null);
  const summary = `Done. generated: ${made} files (${totalCards} cards) · failed: ${failed} · already-cached: ${alreadyDone}`;
  console.log("---");
  console.log(summary);
  console.log(`Wall time: ${Math.round((Date.now() - startedAt) / 60000)} min`);
  await appendLog("---");
  await appendLog(summary);
  if (failures.length > 0) {
    await appendLog("Failures:");
    for (const f of failures) await appendLog(`  ${f.id}: ${f.reason}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
