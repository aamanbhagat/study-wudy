"use client";

import { pullAll, pushItem, pushAll } from "@/lib/cloud-sync";

const KEY = "studied-subtopics-v1";
const TABLE = "user_studied_subtopics" as const;

export interface StudiedEntry {
  subtopicId: string;
  subtopicTitle: string;
  topicId: string;
  topicTitle: string;
  fieldKey: "math" | "cs" | "physics";
  fieldName: string;
  firstStudiedAt: string;
  lastStudiedAt: string;
  totalSeconds: number;
  visitCount: number;
}

function loadAll(): Record<string, StudiedEntry> {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, StudiedEntry>;
  } catch {
    return {};
  }
}

function saveAll(map: Record<string, StudiedEntry>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(map));
}

export function markStudied(entry: Omit<StudiedEntry, "firstStudiedAt" | "lastStudiedAt" | "totalSeconds" | "visitCount"> & {
  addSeconds?: number;
}) {
  const map = loadAll();
  const now = new Date().toISOString();
  const cur = map[entry.subtopicId];
  let next: StudiedEntry;
  if (cur) {
    cur.lastStudiedAt = now;
    cur.totalSeconds += entry.addSeconds ?? 0;
    cur.visitCount += 1;
    next = cur;
  } else {
    next = {
      subtopicId: entry.subtopicId,
      subtopicTitle: entry.subtopicTitle,
      topicId: entry.topicId,
      topicTitle: entry.topicTitle,
      fieldKey: entry.fieldKey,
      fieldName: entry.fieldName,
      firstStudiedAt: now,
      lastStudiedAt: now,
      totalSeconds: entry.addSeconds ?? 0,
      visitCount: 1,
    };
    map[entry.subtopicId] = next;
  }
  saveAll(map);
  void pushItem(TABLE, entry.subtopicId, next, next.lastStudiedAt);
}

export function listStudied(): StudiedEntry[] {
  const map = loadAll();
  return Object.values(map).sort(
    (a, b) => new Date(b.lastStudiedAt).getTime() - new Date(a.lastStudiedAt).getTime(),
  );
}

export function studiedSummary() {
  const all = listStudied();
  const byField = { math: 0, cs: 0, physics: 0 };
  const topicSet = new Set<string>();
  let totalSec = 0;
  for (const e of all) {
    byField[e.fieldKey] = (byField[e.fieldKey] ?? 0) + 1;
    topicSet.add(e.topicId);
    totalSec += e.totalSeconds;
  }
  return {
    totalSubtopics: all.length,
    totalTopics: topicSet.size,
    totalSeconds: totalSec,
    byField,
  };
}

/**
 * Pull every studied subtopic from Supabase and merge into local. Conflicts
 * resolved by `lastStudiedAt` (last write wins), with `totalSeconds` and
 * `visitCount` taking the max so logging from multiple devices doesn't lose
 * minutes.
 */
export async function syncStudiedFromCloud(): Promise<{ pulled: number; pushed: number }> {
  if (typeof window === "undefined") return { pulled: 0, pushed: 0 };
  const cloud = await pullAll<StudiedEntry>(TABLE);
  const local = loadAll();
  let pulled = 0;
  for (const row of cloud) {
    const cur = local[row.id];
    const remote = row.payload;
    if (!cur) {
      local[row.id] = remote;
      pulled += 1;
      continue;
    }
    const localTs = new Date(cur.lastStudiedAt).getTime();
    const remoteTs = new Date(remote.lastStudiedAt).getTime();
    if (remoteTs >= localTs) {
      local[row.id] = {
        ...remote,
        // Preserve the *first* studied time across devices.
        firstStudiedAt:
          new Date(cur.firstStudiedAt) < new Date(remote.firstStudiedAt)
            ? cur.firstStudiedAt
            : remote.firstStudiedAt,
        // Keep the higher count/seconds in case devices logged independently.
        totalSeconds: Math.max(cur.totalSeconds, remote.totalSeconds),
        visitCount: Math.max(cur.visitCount, remote.visitCount),
      };
      pulled += 1;
    }
  }
  saveAll(local);

  // Push local entries that don't exist in cloud yet.
  const cloudIds = new Set(cloud.map((r) => r.id));
  const toPush = Object.values(local)
    .filter((e) => !cloudIds.has(e.subtopicId))
    .map((e) => ({ id: e.subtopicId, payload: e, updated_at: e.lastStudiedAt }));
  if (toPush.length > 0) await pushAll(TABLE, toPush);
  return { pulled, pushed: toPush.length };
}
