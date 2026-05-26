/* eslint-disable no-console */
/**
 * Bilingual study-content generator using xAI Grok.
 *
 * For every subtopic in the curriculum, generates:
 *   data/study-content/en/study-<id>.md  (polished English)
 *   data/study-content/hi/study-<id>.md  (Hinglish, Roman script)
 *
 * Resumable — only generates files not already on disk.
 *
 * Live status:
 *   .gen-bilingual.log
 *   .gen-bilingual.status.json
 *
 * Usage:
 *   XAI_API_KEY=... npx tsx scripts/generate-bilingual-study.ts all
 *   LANG=en npx tsx scripts/generate-bilingual-study.ts all     # only English
 *   LANG=hi npx tsx scripts/generate-bilingual-study.ts all     # only Hinglish
 *   FORCE=1 npx tsx scripts/generate-bilingual-study.ts all     # ignore disk cache
 *   GROK_MODEL=grok-4.3 RPM=60 CONCURRENCY=4 npx tsx scripts/generate-bilingual-study.ts all
 */
import { promises as fs } from "fs";
import path from "path";
import { generateText } from "ai";
import { xai } from "@ai-sdk/xai";
import { CURRICULUM, type CurriculumField } from "../lib/curriculum-data";
import { deepStudyContentPrompt } from "../lib/ai/prompts";

const STUDY_DIR = path.join(process.cwd(), "data", "study-content");
const LOG_FILE = path.join(process.cwd(), ".gen-bilingual.log");
const STATUS_FILE = path.join(process.cwd(), ".gen-bilingual.status.json");
const RPM = Number(process.env.RPM ?? 60);
const CONCURRENCY = Number(process.env.CONCURRENCY ?? 4);
const MIN_GAP_MS = Math.ceil(60_000 / RPM);
const MAX_TOKENS = Number(process.env.MAX_TOKENS ?? 16384);
const MODEL = process.env.GROK_MODEL ?? "grok-4.3";
const LANG_FILTER = (process.env.LANG ?? "both").toLowerCase() as "en" | "hi" | "both";
const FORCE = process.env.FORCE === "1";

type Lang = "en" | "hi";

function safeId(id: string) {
  return id.replace(/[^a-z0-9-_]/gi, "_");
}
function studyPath(id: string, lang: Lang) {
  return path.join(STUDY_DIR, lang, `study-${safeId(id)}.md`);
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
  lang: Lang;
}): Promise<string> {
  const system = deepStudyContentPrompt(args);
  const userPrompt =
    args.lang === "hi"
      ? `Shuru karo "${args.subtopicTitle}" par in-depth lesson, jo "${args.topicTitle}" topic ka part hai.`
      : `Begin the in-depth lesson on "${args.subtopicTitle}" from the topic "${args.topicTitle}".`;
  const result = await generateText({
    model: xai(MODEL),
    system,
    prompt: userPrompt,
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

interface Job {
  subId: string;
  subTitle: string;
  topicTitle: string;
  fieldName: string;
  phaseTitle: string;
  lang: Lang;
}

async function main() {
  const target = (process.argv[2] ?? "all") as CurriculumField["key"] | "all";
  if (!process.env.XAI_API_KEY) {
    console.error("XAI_API_KEY is not set.");
    process.exit(1);
  }
  await fs.mkdir(path.join(STUDY_DIR, "en"), { recursive: true });
  await fs.mkdir(path.join(STUDY_DIR, "hi"), { recursive: true });
  await fs.writeFile(LOG_FILE, "", "utf8").catch(() => {});

  const fields = target === "all" ? CURRICULUM : CURRICULUM.filter((f) => f.key === target);
  if (fields.length === 0) {
    console.error(`Unknown field: ${target}. Use math | cs | physics | all`);
    process.exit(1);
  }

  // Build the list of all (subtopic × lang) jobs we might need to do.
  const langs: Lang[] =
    LANG_FILTER === "en" ? ["en"] : LANG_FILTER === "hi" ? ["hi"] : ["en", "hi"];

  const jobs: Job[] = [];
  for (const field of fields) {
    for (const phase of field.phases) {
      for (const topic of phase.topics) {
        for (const sub of topic.subtopics) {
          for (const lang of langs) {
            jobs.push({
              subId: sub.id,
              subTitle: sub.title,
              topicTitle: topic.title,
              fieldName: field.name,
              phaseTitle: `Phase ${phase.number} — ${phase.title}`,
              lang,
            });
          }
        }
      }
    }
  }

  // Filter to actual work — skip if the file already exists, unless FORCE.
  const todo: Job[] = [];
  if (FORCE) {
    todo.push(...jobs);
  } else {
    for (const j of jobs) {
      if (!(await exists(studyPath(j.subId, j.lang)))) todo.push(j);
    }
  }

  const total = jobs.length;
  const totalToDo = todo.length;
  const alreadyDone = total - totalToDo;
  const todoEn = todo.filter((j) => j.lang === "en").length;
  const todoHi = todo.filter((j) => j.lang === "hi").length;

  console.log(`Target: ${target} · langs: ${langs.join(",")}`);
  console.log(
    `Total jobs: ${total} · cached: ${alreadyDone} · to generate: ${totalToDo} (en=${todoEn}, hi=${todoHi})`,
  );
  console.log(`Model: ${MODEL} (xAI)`);
  console.log(`RPM cap: ${RPM} · concurrency: ${CONCURRENCY} · min gap: ${MIN_GAP_MS}ms`);
  console.log(`Force regenerate: ${FORCE}`);
  console.log("---");

  const limiter = new RateLimiter(MIN_GAP_MS);
  let madeEn = 0;
  let madeHi = 0;
  let failed = 0;
  let totalChars = 0;
  const failures: { id: string; lang: Lang; reason: string }[] = [];
  const startedAt = Date.now();
  let cursor = 0;

  async function persistStatus(activeLabel: string | null = null) {
    const made = madeEn + madeHi;
    const elapsed = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
    const rate = made / elapsed;
    const remaining = totalToDo - made - failed;
    const etaSec = rate > 0 ? Math.round(remaining / rate) : 0;
    await writeStatus({
      kind: "study-content-bilingual",
      model: MODEL,
      target,
      langs,
      curriculumTotalJobs: total,
      alreadyCached: alreadyDone,
      pending: totalToDo,
      pendingEn: todoEn,
      pendingHi: todoHi,
      generatedThisRun: made,
      generatedEn: madeEn,
      generatedHi: madeHi,
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
      const filePath = studyPath(item.subId, item.lang);
      const tag = `${myIdx + 1}/${totalToDo}`;
      // Skip if another race created it (shouldn't happen here, but cheap).
      if (!FORCE && (await exists(filePath))) continue;
      await limiter.wait();
      const label = `w${workerId} [${item.lang}] ${item.topicTitle} → ${item.subTitle}`;
      await persistStatus(label);
      try {
        const content = await withRetry(label, () =>
          callGrok({
            subtopicTitle: item.subTitle,
            topicTitle: item.topicTitle,
            fieldName: item.fieldName,
            phaseTitle: item.phaseTitle,
            lang: item.lang,
          }),
        );
        if (!content || content.length < 1500) {
          throw new Error(`Response too short (${content?.length ?? 0} chars)`);
        }
        await fs.writeFile(filePath, content, "utf8");
        if (item.lang === "en") madeEn++;
        else madeHi++;
        totalChars += content.length;
        const line = `[${tag}] ✓ [${item.lang}] ${(content.length / 1000).toFixed(1)}k chars · ${item.subTitle}`;
        console.log(line);
        await appendLog(line);
      } catch (e) {
        failed++;
        const reason = (e as Error).message;
        failures.push({ id: item.subId, lang: item.lang, reason });
        const line = `[${tag}] ✗ [${item.lang}] ${item.subTitle} — ${reason}`;
        console.error(line);
        await appendLog(line);
      }
      await persistStatus(null);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i + 1)));

  await persistStatus(null);
  const summary = `Done. en: ${madeEn} · hi: ${madeHi} · failed: ${failed} · already-cached: ${alreadyDone}`;
  console.log("---");
  console.log(summary);
  console.log(`Wall time: ${Math.round((Date.now() - startedAt) / 60000)} min`);
  await appendLog("---");
  await appendLog(summary);
  if (failures.length > 0) {
    await appendLog("Failures:");
    for (const f of failures) await appendLog(`  [${f.lang}] ${f.id}: ${f.reason}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
