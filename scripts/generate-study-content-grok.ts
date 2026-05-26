/* eslint-disable no-console */
/**
 * Bulk-generate any missing study-session content using xAI Grok via the
 * Vercel AI SDK. Resumable — only generates files not already on disk.
 *
 * Usage:
 *   XAI_API_KEY=... npx tsx scripts/generate-study-content-grok.ts all
 *   GROK_MODEL=grok-4 RPM=60 CONCURRENCY=4 npx tsx scripts/generate-study-content-grok.ts physics
 *
 * Writes data/study-content/study-<subtopicId>.md.
 * Live progress is appended to .gen-grok-study.log and .gen-grok-study.status.json.
 */
import { promises as fs } from "fs";
import path from "path";
import { generateText } from "ai";
import { xai } from "@ai-sdk/xai";
import { CURRICULUM, type CurriculumField } from "../lib/curriculum-data";
import { deepStudyContentPrompt } from "../lib/ai/prompts";

const STUDY_DIR = path.join(process.cwd(), "data", "study-content");
const LOG_FILE = path.join(process.cwd(), ".gen-grok-study.log");
const STATUS_FILE = path.join(process.cwd(), ".gen-grok-study.status.json");
const RPM = Number(process.env.RPM ?? 60);
const CONCURRENCY = Number(process.env.CONCURRENCY ?? 4);
const MIN_GAP_MS = Math.ceil(60_000 / RPM);
const MAX_TOKENS = Number(process.env.MAX_TOKENS ?? 16384);
const MODEL = process.env.GROK_MODEL ?? "grok-4";

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

async function callGrok(args: {
  subtopicTitle: string;
  topicTitle: string;
  fieldName: string;
  phaseTitle: string;
}): Promise<string> {
  const system = deepStudyContentPrompt(args);
  const result = await generateText({
    model: xai(MODEL),
    system,
    prompt: `Begin the in-depth lesson on "${args.subtopicTitle}" from the topic "${args.topicTitle}".`,
    maxOutputTokens: MAX_TOKENS,
    temperature: 0.6,
  });
  return result.text;
}

async function withRetry<T>(label: string, fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      const msg = (e as Error).message;
      const isRate = /rate|overloaded|quota|exceed|429/i.test(msg);
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
  await fs.mkdir(STUDY_DIR, { recursive: true });
  await fs.writeFile(LOG_FILE, "", "utf8").catch(() => {});

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

  // Pre-filter only the ones missing on disk so progress numbers reflect work to do.
  const todo: Job[] = [];
  for (const j of all) {
    if (!(await exists(studyPath(j.subId)))) todo.push(j);
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
  let totalChars = 0;
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
      kind: "study-content",
      model: MODEL,
      target,
      curriculumTotal: totalAll,
      alreadyCached: alreadyDone,
      pending: totalToDo,
      generatedThisRun: made,
      failedThisRun: failed,
      remaining,
      elapsedSec: elapsed,
      etaSec,
      etaMin: Math.round(etaSec / 60),
      ratePerMin: Math.round(rate * 60 * 100) / 100,
      totalCharsGenerated: totalChars,
      active: activeLabel,
      updatedAt: new Date().toISOString(),
    });
  }

  async function worker(workerId: number) {
    while (true) {
      const myIdx = cursor++;
      if (myIdx >= todo.length) return;
      const item = todo[myIdx];
      const filePath = studyPath(item.subId);
      const tag = `${myIdx + 1}/${totalToDo}`;
      // Re-check in case another worker handled it (impossible here but cheap).
      if (await exists(filePath)) continue;
      await limiter.wait();
      const label = `w${workerId} ${item.topicTitle} → ${item.subTitle}`;
      await persistStatus(label);
      try {
        const content = await withRetry(label, () =>
          callGrok({
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
        const line = `[${tag}] ✓ ${(content.length / 1000).toFixed(1)}k chars · ${item.subTitle}`;
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
  const summary = `Done. generated: ${made} · failed: ${failed} · already-cached: ${alreadyDone}`;
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
