/* eslint-disable no-console */
/**
 * Retry just the card subtopics that failed during the main run. Reads
 * subtopic IDs from argv (or falls back to a known list), uses a stricter
 * prompt that tells Grok to keep LaTeX backslash-safe, and tolerates more
 * JSON edge cases.
 */
import { promises as fs } from "fs";
import path from "path";
import { generateText } from "ai";
import { xai } from "@ai-sdk/xai";
import { CURRICULUM } from "../lib/curriculum-data";

const CARDS_DIR = path.join(process.cwd(), "data", "cards");
const MODEL = process.env.GROK_MODEL ?? "grok-4.3";
const MIN_CARDS = 5;
const MAX_CARDS = 10;

const FAILED_IDS = process.argv.slice(2).length > 0
  ? process.argv.slice(2)
  : [
      "physics-p2-2-5-diffraction-single-slit-intensity-pattern-derivation",
      "physics-p3-3-3-thrust-coefficient-c-f-f-p-ca-derivation",
      "physics-p3-3-2-orbital-elements-keplerian-semi-major-axis-a-eccentricity-e-inclination-i-raan-argument-of-perigee-true-anomaly",
    ];

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

interface SubLookup {
  subId: string;
  subTitle: string;
  topicId: string;
  topicTitle: string;
  fieldKey: string;
  fieldName: string;
}

function findSub(id: string): SubLookup | null {
  for (const f of CURRICULUM) {
    for (const p of f.phases) {
      for (const t of p.topics) {
        for (const s of t.subtopics) {
          if (s.id === id) {
            return {
              subId: s.id,
              subTitle: s.title,
              topicId: t.id,
              topicTitle: t.title,
              fieldKey: f.key,
              fieldName: f.name,
            };
          }
        }
      }
    }
  }
  return null;
}

function buildPrompt(args: { subTitle: string; topicTitle: string; fieldName: string }) {
  return `Create ${MIN_CARDS}-${MAX_CARDS} spaced-repetition flashcards for an elite student of ${args.fieldName}.

Topic: "${args.topicTitle}"
Subtopic: "${args.subTitle}"

CRITICAL formatting rules for the JSON output:
- Output ONLY a JSON object. No prose. No markdown fences.
- All backslashes inside strings MUST be doubled. Example: write "\\\\frac{a}{b}" not "\\frac{a}{b}".
- Use double-dollar for display math: "$$\\\\nabla \\\\cdot \\\\mathbf{E} = \\\\rho/\\\\varepsilon_0$$".
- Use single-dollar for inline math.
- Mix difficulties: 1-2 easy, 2-4 medium, 1-3 hard.
- Each card is atomic — one concept per card.

Schema:
{
  "cards": [
    { "front": "<question>", "back": "<answer>", "difficulty": "easy" | "medium" | "hard" }
  ]
}`;
}

function parseFlexibleJson(text: string): { cards: GeneratedCard[] } | null {
  let stripped = text
    .replace(/^﻿/, "")
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  // If wrapped in extra prose, find first `{` and last `}`.
  const first = stripped.indexOf("{");
  const last = stripped.lastIndexOf("}");
  if (first > 0 || last < stripped.length - 1) {
    if (first >= 0 && last > first) stripped = stripped.slice(first, last + 1);
  }

  const tries: string[] = [stripped];
  // Repair: escape lone backslashes.
  tries.push(stripped.replace(/\\(?!["\\/bfnrtu])/g, "\\\\"));
  // Repair: collapse newlines inside strings can be tricky. Try removing
  // raw newlines between quotes (best-effort).
  tries.push(
    stripped
      .replace(/\\(?!["\\/bfnrtu])/g, "\\\\")
      .replace(/(?<="\s*:\s*"[^"]*?)\n/g, "\\n"),
  );

  for (const t of tries) {
    try {
      const parsed = JSON.parse(t);
      if (parsed && Array.isArray(parsed.cards)) return parsed;
    } catch {
      /* keep trying */
    }
  }
  return null;
}

async function callGrok(args: { subTitle: string; topicTitle: string; fieldName: string }) {
  const result = await generateText({
    model: xai(MODEL),
    system:
      "You return strict, parseable JSON only. Backslashes in strings must be escaped (\\\\ not \\). Never use markdown fences.",
    prompt: buildPrompt(args),
    maxOutputTokens: 4096,
    temperature: 0.4,
  });
  return result.text;
}

async function generateOne(sub: SubLookup): Promise<GeneratedCard[]> {
  const attempts = 4;
  let lastErr = "";
  for (let i = 0; i < attempts; i++) {
    try {
      const raw = await callGrok({
        subTitle: sub.subTitle,
        topicTitle: sub.topicTitle,
        fieldName: sub.fieldName,
      });
      const parsed = parseFlexibleJson(raw);
      if (!parsed || !Array.isArray(parsed.cards) || parsed.cards.length < MIN_CARDS) {
        lastErr = `parsed ${parsed?.cards?.length ?? 0} cards (raw len=${raw.length})`;
        // Save the raw output of the last attempt for debugging.
        if (i === attempts - 1) {
          await fs.writeFile(
            path.join(CARDS_DIR, `_raw-${safeId(sub.subId)}.txt`),
            raw,
            "utf8",
          );
        }
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }
      return parsed.cards.slice(0, MAX_CARDS);
    } catch (e) {
      lastErr = (e as Error).message;
      await new Promise((r) => setTimeout(r, 4000));
    }
  }
  throw new Error(lastErr);
}

async function main() {
  if (!process.env.XAI_API_KEY) {
    console.error("XAI_API_KEY is not set");
    process.exit(1);
  }
  await fs.mkdir(CARDS_DIR, { recursive: true });

  console.log(`Retrying ${FAILED_IDS.length} cards via ${MODEL}`);
  let made = 0;
  let failed = 0;
  const stillFailed: string[] = [];
  for (const id of FAILED_IDS) {
    const sub = findSub(id);
    if (!sub) {
      console.error(`× ${id}: not in curriculum`);
      stillFailed.push(id);
      failed++;
      continue;
    }
    try {
      const cards = await generateOne(sub);
      const payload = {
        subtopicId: sub.subId,
        subtopicTitle: sub.subTitle,
        topicId: sub.topicId,
        topicTitle: sub.topicTitle,
        field: sub.fieldKey,
        model: MODEL,
        generatedAt: new Date().toISOString(),
        cards,
      };
      await fs.writeFile(cardsPath(sub.subId), JSON.stringify(payload, null, 2), "utf8");
      made++;
      console.log(`✓ ${sub.subTitle} (${cards.length} cards)`);
    } catch (e) {
      failed++;
      stillFailed.push(id);
      console.error(`✗ ${sub.subTitle}: ${(e as Error).message}`);
    }
  }
  console.log("---");
  console.log(`Recovered: ${made} · still failed: ${failed}`);
  if (stillFailed.length) {
    console.log("Still failed:");
    stillFailed.forEach((id) => console.log(`  ${id}`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
