"use client";

import type { TestQuestion } from "@/app/api/ai/generate-test/route";
import type { TestType, TestDifficulty } from "@/lib/ai/prompts";
import { pullAll, pushItem, deleteItem, pushAll } from "@/lib/cloud-sync";

export interface TestSubmissionAnswer {
  answer: string | number[] | null;
  evaluation?: {
    score: number;
    verdict: "correct" | "partial" | "incorrect";
    explanation: string;
    key_misconceptions: string[];
  };
  timeSpentSec: number;
}

export interface StoredTest {
  id: string;
  title: string;
  type: TestType;
  difficulty: TestDifficulty;
  topicIds: string[];
  topicTitles: string[];
  durationMinutes: number;
  questions: TestQuestion[];
  answers: Record<string, TestSubmissionAnswer>;
  status: "draft" | "in_progress" | "completed";
  startedAt: string | null;
  completedAt: string | null;
  finalScore: number | null;
  analysis?: {
    summary: string;
    weak_areas: string[];
    patterns: string[];
    next_steps: string[];
  };
  createdAt: string;
  updatedAt?: string;
}

const KEY = "tests-v1";
const TABLE = "user_test_results" as const;

export function loadTests(): StoredTest[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as StoredTest[];
  } catch {
    return [];
  }
}

export function saveTests(list: StoredTest[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function loadTest(id: string): StoredTest | null {
  return loadTests().find((t) => t.id === id) ?? null;
}

export function upsertTest(test: StoredTest) {
  const stamped: StoredTest = { ...test, updatedAt: new Date().toISOString() };
  const list = loadTests();
  const idx = list.findIndex((t) => t.id === stamped.id);
  if (idx >= 0) list[idx] = stamped;
  else list.unshift(stamped);
  saveTests(list);
  void pushItem(TABLE, stamped.id, stamped, stamped.updatedAt);
}

export function deleteTest(id: string) {
  saveTests(loadTests().filter((t) => t.id !== id));
  void deleteItem(TABLE, id);
}

export function computeAutoScore(test: StoredTest): { earned: number; possible: number; pct: number } {
  let earned = 0;
  let possible = 0;
  for (const q of test.questions) {
    possible += q.points;
    const ans = test.answers[q.id];
    if (!ans) continue;
    if ((q.type === "mcq" || q.type === "multi") && Array.isArray(ans.answer) && q.correct_indices) {
      const a = new Set(ans.answer);
      const b = new Set(q.correct_indices);
      const equal = a.size === b.size && Array.from(a).every((x) => b.has(x));
      if (equal) earned += q.points;
    } else if (ans.evaluation) {
      earned += ans.evaluation.score * q.points;
    }
  }
  return { earned, possible, pct: possible > 0 ? Math.round((earned / possible) * 100) : 0 };
}

function testTimestamp(t: StoredTest) {
  return t.updatedAt ?? t.completedAt ?? t.startedAt ?? t.createdAt;
}

/**
 * Pull every test from Supabase and merge into local by `updatedAt`
 * (last write wins). Local-only tests get pushed up.
 */
export async function syncTestsFromCloud(): Promise<{ pulled: number; pushed: number }> {
  if (typeof window === "undefined") return { pulled: 0, pushed: 0 };
  const cloud = await pullAll<StoredTest>(TABLE);
  const local = loadTests();
  const localById = new Map(local.map((t) => [t.id, t]));
  let pulled = 0;
  for (const row of cloud) {
    const cur = localById.get(row.id);
    const remote = row.payload;
    if (!cur) {
      localById.set(row.id, remote);
      pulled += 1;
      continue;
    }
    const curTs = new Date(testTimestamp(cur)).getTime();
    const remoteTs = new Date(testTimestamp(remote)).getTime();
    if (remoteTs >= curTs) {
      localById.set(row.id, remote);
      pulled += 1;
    }
  }
  const merged = Array.from(localById.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  saveTests(merged);

  const cloudIds = new Set(cloud.map((r) => r.id));
  const toPush = merged
    .filter((t) => !cloudIds.has(t.id))
    .map((t) => ({ id: t.id, payload: t, updated_at: testTimestamp(t) }));
  if (toPush.length > 0) await pushAll(TABLE, toPush);
  return { pulled, pushed: toPush.length };
}
