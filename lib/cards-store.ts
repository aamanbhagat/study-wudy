"use client";

// SM-2 progress + suspended state stored in localStorage,
// keyed by card id (subtopicId#index). Card content comes from /api/cards/list.

import { reviewCard, NEW_CARD, type SM2Card } from "@/lib/algorithms/sm2";
import type { FieldKey } from "@/lib/types";
import { pullAll, pushItem, pushAll } from "@/lib/cloud-sync";

export type CardRating = "again" | "hard" | "good" | "easy";

export interface CardContent {
  id: string; // `${subtopicId}#${index}`
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
  field: FieldKey;
  topicId: string;
  topicTitle: string;
  subtopicId: string;
  subtopicTitle: string;
}

export interface CardProgress extends SM2Card {
  dueAt: string; // ISO
  lastReviewedAt: string | null;
  suspended: boolean;
  createdAt: string;
}

export interface AnkiCard extends CardContent, CardProgress {}

const PROGRESS_KEY = "anki-progress-v2";
const TABLE = "user_card_progress" as const;

function ratingToQuality(r: CardRating): number {
  switch (r) {
    case "again": return 1;
    case "hard": return 3;
    case "good": return 4;
    case "easy": return 5;
  }
}

function loadProgressMap(): Record<string, CardProgress> {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(PROGRESS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, CardProgress>;
  } catch {
    return {};
  }
}

function saveProgressMap(map: Record<string, CardProgress>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(map));
}

function progressTimestamp(p: CardProgress) {
  return p.lastReviewedAt ?? p.createdAt;
}

export function attachProgress(content: CardContent[]): AnkiCard[] {
  const map = loadProgressMap();
  const now = new Date().toISOString();
  return content.map((c) => {
    const p = map[c.id];
    if (p) return { ...c, ...p };
    // New card — due immediately so the user can start reviewing
    return {
      ...c,
      ...NEW_CARD,
      dueAt: now,
      lastReviewedAt: null,
      suspended: false,
      createdAt: now,
    };
  });
}

export function recordReview(cardId: string, rating: CardRating, prev?: CardProgress) {
  const quality = ratingToQuality(rating);
  const base: SM2Card = prev ?? NEW_CARD;
  const r = reviewCard(base, quality, new Date());
  const next: CardProgress = {
    easeFactor: r.easeFactor,
    intervalDays: r.intervalDays,
    repetitions: r.repetitions,
    dueAt: r.dueAt.toISOString(),
    lastReviewedAt: new Date().toISOString(),
    suspended: prev?.suspended ?? false,
    createdAt: prev?.createdAt ?? new Date().toISOString(),
  };
  const map = loadProgressMap();
  map[cardId] = next;
  saveProgressMap(map);
  void pushItem(TABLE, cardId, next, progressTimestamp(next));
  return next;
}

export function setSuspended(cardId: string, suspended: boolean) {
  const map = loadProgressMap();
  const cur = map[cardId];
  if (cur) {
    cur.suspended = suspended;
  } else {
    map[cardId] = {
      ...NEW_CARD,
      dueAt: new Date().toISOString(),
      lastReviewedAt: null,
      suspended,
      createdAt: new Date().toISOString(),
    };
  }
  saveProgressMap(map);
  void pushItem(TABLE, cardId, map[cardId], new Date().toISOString());
}

export function deleteProgress(cardId: string) {
  const map = loadProgressMap();
  delete map[cardId];
  saveProgressMap(map);
}

export function dueCards(cards: AnkiCard[], now = new Date()): AnkiCard[] {
  return cards
    .filter((c) => !c.suspended && new Date(c.dueAt).getTime() <= now.getTime())
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime());
}

export async function fetchCardContent(params: {
  field?: FieldKey;
  topicId?: string;
  subtopicId?: string;
}): Promise<CardContent[]> {
  const url = new URL("/api/cards/list", window.location.origin);
  if (params.field) url.searchParams.set("field", params.field);
  if (params.topicId) url.searchParams.set("topic", params.topicId);
  if (params.subtopicId) url.searchParams.set("subtopic", params.subtopicId);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as { cards: CardContent[] };
  return data.cards;
}

/**
 * Pull every card progress row from Supabase and merge into local by
 * `lastReviewedAt` (last write wins). New local cards get pushed up.
 */
export async function syncCardProgressFromCloud(): Promise<{ pulled: number; pushed: number }> {
  if (typeof window === "undefined") return { pulled: 0, pushed: 0 };
  const cloud = await pullAll<CardProgress>(TABLE);
  const local = loadProgressMap();
  let pulled = 0;
  for (const row of cloud) {
    const cur = local[row.id];
    if (!cur) {
      local[row.id] = row.payload;
      pulled += 1;
      continue;
    }
    const curTs = new Date(progressTimestamp(cur)).getTime();
    const remoteTs = new Date(progressTimestamp(row.payload)).getTime();
    if (remoteTs >= curTs) {
      local[row.id] = row.payload;
      pulled += 1;
    }
  }
  saveProgressMap(local);

  const cloudIds = new Set(cloud.map((r) => r.id));
  const toPush = Object.entries(local)
    .filter(([id]) => !cloudIds.has(id))
    .map(([id, payload]) => ({ id, payload, updated_at: progressTimestamp(payload) }));
  if (toPush.length > 0) await pushAll(TABLE, toPush);
  return { pulled, pushed: toPush.length };
}
