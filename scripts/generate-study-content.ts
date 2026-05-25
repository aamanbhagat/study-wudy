/* eslint-disable no-console */
/**
 * Bulk-generate deep study-session content for every subtopic of a subject
 * using Gemini. Primary model: gemini-3.1-pro-preview (high quality, 250 RPD
 * daily cap). Fallback: gemini-2.5-flash (10k RPD) — used automatically once
 * Pro hits its daily quota.
 *
 * Saves to data/study-content/study-<subtopicId>.md. Resumable.
 *
 * Usage:
 *   GOOGLE_GEMINI_API_KEY=... npx tsx scripts/generate-study-content.ts math
 *   GOOGLE_GEMINI_API_KEY=... npx tsx scripts/generate-study-content.ts all
 *   PRIMARY_MODEL=gemini-3.1-pro-preview FALLBACK_MODEL=gemini-2.5-flash \
 *     RPM=23 CONCURRENCY=5 npx tsx scripts/generate-study-content.ts physics
 */
import { promises as fs } from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CURRICULUM, type CurriculumField } from "../lib/curriculum-data";
import { deepStudyContentPrompt } from "../lib/ai/prompts";

const STUDY_DIR = path.join(process.cwd(), "data", "study-content");
const RPM = Number(process.env.RPM ?? 23);
const CONCURRENCY = Number(process.env.CONCURRENCY ?? 5);
const MIN_GAP_MS = Math.ceil(60_000 / RPM);
const MAX_TOKENS = Number(process.env.MAX_TOKENS ?? 16384);
const PRIMARY_MODEL = process.env.PRIMARY_MODEL ?? "gemini-3.1-pro-preview";
const FALLBACK_MODEL = process.env.FALLBACK_MODEL ?? "gemini-2.5-flash";

let primaryExhausted = false;

function isDailyQuotaError(msg: string): boolean {
  return /429|quota|exceed|generate_requests_per_model_per_day|GenerateRequestsPerDayPerProjectPerModel/i.test(
    msg,
  );
}

function safeId(id: string) {
  return id.replace(/[^a-z0-9-_]/gi, "_");
}

function studyPath(id: string) {
  return path.join(STUDY_DIR, `study-${safeId(id)}.md`);
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

async function callModel(
  client: GoogleGenerativeAI,
  modelName: string,
  args: { subtopicTitle: string; topicTitle: string; fieldName: string; phaseTitle: string },
): Promise<string> {
  const system = deepStudyContentPrompt(args);
  const model = client.getGenerativeModel({
    model: modelName,
    systemInstruction: system,
    generationConfig: { temperature: 0.6, maxOutputTokens: MAX_TOKENS },
  });
  const result = await model.generateContent(
    `Begin the in-depth lesson on "${args.subtopicTitle}" from the topic "${args.topicTitle}".`,
  );
  return result.response.text();
}

async function generateOne(
  client: GoogleGenerativeAI,
  args: { subtopicTitle: string; topicTitle: string; fieldName: string; phaseTitle: string },
): Promise<{ content: string; modelUsed: string }> {
  if (!primaryExhausted) {
    try {
      const content = await callModel(client, PRIMARY_MODEL, args);
      return { content, modelUsed: PRIMARY_MODEL };
    } catch (e) {
      const msg = (e as Error).message;
      if (isDailyQuotaError(msg)) {
        primaryExhausted = true;
        console.warn(
          `\n⚠️  Primary model (${PRIMARY_MODEL}) hit daily quota — switching all subsequent calls to ${FALLBACK_MODEL}\n`,
        );
      } else {
        throw e;
      }
    }
  }
  const content = await callModel(client, FALLBACK_MODEL, args);
  return { content, modelUsed: FALLBACK_MODEL };
}

async function withRetry<T>(label: string, fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      const msg = (e as Error).message;
      const isRate = /rate|overloaded|quota|exceed/i.test(msg);
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
  await fs.mkdir(STUDY_DIR, { recursive: true });

  interface Job {
    index: number;
    total: number;
    subId: string;
    subTitle: string;
    topicTitle: string;
    fieldName: string;
    phaseTitle: string;
  }
  const all: Job[] = [];
  const fields = target === "all" ? CURRICULUM : CURRICULUM.filter((f) => f.key === target);
  if (fields.length === 0) {
    console.error(`Unknown field: ${target}. Use math | cs | physics | all`);
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
            topicTitle: topic.title,
            fieldName: field.name,
            phaseTitle: `Phase ${phase.number} — ${phase.title}`,
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
  console.log(`Max tokens per lesson: ${MAX_TOKENS}`);
  console.log("---");

  const limiter = new RateLimiter(MIN_GAP_MS);
  let made = 0;
  let totalChars = 0;
  let skipped = 0;
  let failed = 0;
  const startedAt = Date.now();
  let cursor = 0;

  async function worker(workerId: number) {
    while (true) {
      const myIdx = cursor++;
      if (myIdx >= all.length) return;
      const item = all[myIdx];
      const filePath = studyPath(item.subId);
      const tag = `${item.index}/${item.total}`;
      if (await exists(filePath)) {
        skipped++;
        if (skipped % 50 === 0) console.log(`[${tag}] skip (cached)`);
        continue;
      }
      await limiter.wait();
      const label = `w${workerId} ${item.topicTitle} → ${item.subTitle}`;
      try {
        const { content, modelUsed } = await withRetry(label, () =>
          generateOne(client, {
            subtopicTitle: item.subTitle,
            topicTitle: item.topicTitle,
            fieldName: item.fieldName,
            phaseTitle: item.phaseTitle,
          }),
        );
        if (!content || content.length < 1500) {
          throw new Error(`Response too short (${content?.length ?? 0} chars)`);
        }
        await fs.writeFile(filePath, content, "utf8");
        made++;
        totalChars += content.length;
        const elapsed = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
        const rate = made / elapsed;
        const remaining = all.length - skipped - made - failed;
        const etaSec = rate > 0 ? Math.round(remaining / rate) : 0;
        console.log(
          `[${tag}] ✓ ${(content.length / 1000).toFixed(1)}k chars (${modelUsed}) · done ${made + skipped}/${all.length} · ETA ~${Math.round(etaSec / 60)}m`,
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
    `Done. generated: ${made} files (${(totalChars / 1000).toFixed(1)}k chars total) · cached-skip: ${skipped} · failed: ${failed}`,
  );
  console.log(`Wall time: ${Math.round((Date.now() - startedAt) / 60000)} min`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
