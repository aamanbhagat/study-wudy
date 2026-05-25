/* eslint-disable no-console */
/**
 * Bulk-generate learn-page content for every subtopic of a given subject.
 *
 * Concurrency + rate-limit aware. Honors a 25 RPM Gemini cap (default 23 to leave headroom).
 *
 * Usage:
 *   npx tsx scripts/generate-content.ts math
 *   RPM=23 CONCURRENCY=5 npx tsx scripts/generate-content.ts math
 */
import { promises as fs } from "fs";
import path from "path";
import { CURRICULUM, type CurriculumField } from "../lib/curriculum-data";
import { learnSubtopicPrompt } from "../lib/ai/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

const CONTENT_DIR = path.join(process.cwd(), "data", "content");
const RPM = Number(process.env.RPM ?? 23); // stay under 25 RPM cap
const CONCURRENCY = Number(process.env.CONCURRENCY ?? 5);
const MIN_GAP_MS = Math.ceil(60_000 / RPM);

function safeId(id: string) {
  return id.replace(/[^a-z0-9-_]/gi, "_");
}

function subtopicPath(id: string) {
  return path.join(CONTENT_DIR, `subtopic-${safeId(id)}.md`);
}

async function exists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

interface JobInput {
  index: number;
  total: number;
  subId: string;
  subTitle: string;
  topicTitle: string;
  fieldName: string;
  phaseTitle: string;
}

class RateLimiter {
  private nextAllowedAt = 0;
  private mutex: Promise<void> = Promise.resolve();
  constructor(private gapMs: number) {}
  async wait(): Promise<void> {
    // Serialize the slot acquisition so each caller takes a unique slot.
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

async function generateOne(
  client: GoogleGenerativeAI,
  modelName: string,
  args: Pick<JobInput, "subTitle" | "topicTitle" | "fieldName" | "phaseTitle">,
): Promise<string> {
  const model = client.getGenerativeModel({
    model: modelName,
    systemInstruction: learnSubtopicPrompt({
      subtopicTitle: args.subTitle,
      topicTitle: args.topicTitle,
      fieldName: args.fieldName,
      phaseTitle: args.phaseTitle,
    }),
    generationConfig: { temperature: 0.6, maxOutputTokens: 8192 },
  });
  const result = await model.generateContent(
    `Teach me "${args.subTitle}" from "${args.topicTitle}". Begin the mini-lesson now.`,
  );
  return result.response.text();
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
      if (i < attempts - 1) {
        console.error(`[${label}] retrying in ${wait}ms…`);
        await new Promise((r) => setTimeout(r, wait));
      }
    }
  }
  throw lastErr;
}

async function main() {
  const target = (process.argv[2] ?? "math") as CurriculumField["key"];
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GOOGLE_GEMINI_API_KEY is not set.");
    process.exit(1);
  }
  const modelName = process.env.GEMINI_MODEL ?? "gemini-2.5-pro";
  const client = new GoogleGenerativeAI(apiKey);
  await fs.mkdir(CONTENT_DIR, { recursive: true });

  const field = CURRICULUM.find((f) => f.key === target);
  if (!field) {
    console.error(`Unknown field: ${target}. Use one of: math, cs, physics`);
    process.exit(1);
  }

  const all: JobInput[] = [];
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
  all.forEach((j, i) => {
    j.index = i + 1;
    j.total = all.length;
  });

  console.log(`Subject: ${field.name}`);
  console.log(`Total subtopics: ${all.length}`);
  console.log(`Model: ${modelName}`);
  console.log(`RPM cap: ${RPM} · concurrency: ${CONCURRENCY} · min gap: ${MIN_GAP_MS}ms`);
  console.log("---");

  const limiter = new RateLimiter(MIN_GAP_MS);
  let made = 0;
  let skipped = 0;
  let failed = 0;
  const startedAt = Date.now();
  let cursor = 0;

  async function worker(workerId: number) {
    while (true) {
      const myIdx = cursor++;
      if (myIdx >= all.length) return;
      const item = all[myIdx];
      const filePath = subtopicPath(item.subId);
      const tag = `${item.index}/${item.total}`;
      if (await exists(filePath)) {
        skipped++;
        console.log(`[${tag}] skip (cached): ${item.subTitle}`);
        continue;
      }
      await limiter.wait();
      const label = `w${workerId} ${item.topicTitle} → ${item.subTitle}`;
      console.log(`[${tag}] generating: ${label}`);
      try {
        const content = await withRetry(label, () =>
          generateOne(client, modelName, {
            subTitle: item.subTitle,
            topicTitle: item.topicTitle,
            fieldName: item.fieldName,
            phaseTitle: item.phaseTitle,
          }),
        );
        if (!content || content.trim().length < 200) throw new Error("Response too short");
        await fs.writeFile(filePath, content, "utf8");
        made++;
        const elapsed = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
        const rate = made / elapsed;
        const remaining = all.length - skipped - made - failed;
        const etaSec = rate > 0 ? Math.round(remaining / rate) : 0;
        console.log(
          `   ✓ ${(content.length / 1000).toFixed(1)}k chars · done ${made + skipped}/${all.length} · ETA ~${Math.round(etaSec / 60)}m`,
        );
      } catch (e) {
        failed++;
        console.error(`   ✗ ${(e as Error).message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i + 1)));

  console.log("---");
  console.log(`Done. generated: ${made} · cached-skip: ${skipped} · failed: ${failed}`);
  console.log(`Wall time: ${Math.round((Date.now() - startedAt) / 60000)} min`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
