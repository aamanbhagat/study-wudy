"use client";

import type { FieldKey } from "@/lib/types";
import { pullAll, pushItem, deleteItem, pushAll } from "@/lib/cloud-sync";

export interface SessionPayload {
  sessionId: string;
  topicId: string;
  topicTitle: string;
  topicNumber: string;
  subtopicId?: string | null;
  subtopicTitle?: string | null;
  field: FieldKey;
  fieldName?: string;
  sessionType: string;
  durationMinutes: number;
  startedAt: string;
  // Runtime state — present once the session has been saved/paused at least once.
  status?: "in_progress" | "paused" | "completed";
  accumSec?: number;
  lastRecallAt?: number;
  recalls?: SavedRecall[];
  savedAt?: string;
}

export interface SavedRecall {
  promptedAtSec: number;
  score: number;
  response: string;
  feedback?: string;
}

const TABLE = "user_study_sessions" as const;

function key(id: string) {
  return `session:${id}`;
}

export function loadSession(id: string): SessionPayload | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(key(id));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionPayload;
  } catch {
    return null;
  }
}

export function saveSession(payload: SessionPayload) {
  if (typeof window === "undefined") return;
  // Stamp the save time so cloud merge by updated_at works correctly.
  const stamped: SessionPayload = { ...payload, savedAt: payload.savedAt ?? new Date().toISOString() };
  window.localStorage.setItem(key(stamped.sessionId), JSON.stringify(stamped));
  // Fire-and-forget cloud push.
  void pushItem(TABLE, stamped.sessionId, stamped, stamped.savedAt);
}

export function deleteSession(id: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key(id));
  void deleteItem(TABLE, id);
}

export function listSessions(): SessionPayload[] {
  if (typeof window === "undefined") return [];
  const out: SessionPayload[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i);
    if (!k || !k.startsWith("session:")) continue;
    const raw = window.localStorage.getItem(k);
    if (!raw) continue;
    try {
      out.push(JSON.parse(raw) as SessionPayload);
    } catch {
      // skip malformed
    }
  }
  return out.sort(
    (a, b) =>
      new Date(b.savedAt ?? b.startedAt).getTime() -
      new Date(a.savedAt ?? a.startedAt).getTime(),
  );
}

export function listSavedSessions(): SessionPayload[] {
  return listSessions().filter((s) => s.status === "paused");
}

export function listInProgressSessions(): SessionPayload[] {
  return listSessions().filter((s) => s.status === "paused" || s.status === "in_progress");
}

/**
 * Pull all sessions for the current user from Supabase and merge into
 * localStorage by `savedAt` (last write wins). Local-only sessions are
 * pushed up so they aren't lost.
 */
export async function syncSessionsFromCloud(): Promise<{ pulled: number; pushed: number }> {
  if (typeof window === "undefined") return { pulled: 0, pushed: 0 };
  const cloud = await pullAll<SessionPayload>(TABLE);

  const cloudIds = new Set(cloud.map((r) => r.id));
  let pulled = 0;
  for (const row of cloud) {
    const local = loadSession(row.id);
    const localTs = local?.savedAt ?? local?.startedAt;
    const remoteTs = row.payload.savedAt ?? row.payload.startedAt ?? row.updated_at;
    if (!local || !localTs || new Date(remoteTs).getTime() >= new Date(localTs).getTime()) {
      window.localStorage.setItem(key(row.id), JSON.stringify(row.payload));
      pulled += 1;
    }
  }

  // Push local sessions that aren't in cloud yet.
  const toPush: Array<{ id: string; payload: SessionPayload; updated_at?: string }> = [];
  for (const s of listSessions()) {
    if (!cloudIds.has(s.sessionId)) {
      toPush.push({ id: s.sessionId, payload: s, updated_at: s.savedAt });
    }
  }
  if (toPush.length > 0) await pushAll(TABLE, toPush);
  return { pulled, pushed: toPush.length };
}

/**
 * XP awarded for a session: base award scales with target completion,
 * plus a bonus for studying past target.
 *   base = 50 XP if you hit at least 75% of target
 *   per-minute = 1 XP/minute up to target
 *   overtime = 2 XP/minute past target (extra commitment, doubled rate)
 */
export function computeXp(elapsedSec: number, targetMinutes: number) {
  const elapsedMin = elapsedSec / 60;
  const targetMin = Math.max(1, targetMinutes);
  const onTrack = Math.min(elapsedMin, targetMin);
  const overtime = Math.max(0, elapsedMin - targetMin);
  const base = elapsedMin >= targetMin * 0.75 ? 50 : 0;
  const onTrackXp = Math.round(onTrack * 1);
  const overtimeXp = Math.round(overtime * 2);
  return {
    total: base + onTrackXp + overtimeXp,
    base,
    onTrackXp,
    overtimeXp,
    elapsedMin: Math.round(elapsedMin),
    overtimeMin: Math.round(overtime),
  };
}
