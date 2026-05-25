"use client";

import { CURRICULUM } from "@/lib/curriculum-data";
import { listStudied, type StudiedEntry } from "@/lib/studied-tracker";
import { listSessions, type SessionPayload } from "@/lib/study-sessions";
import type { FieldKey } from "@/lib/types";
import { format, startOfDay, subDays } from "date-fns";

export interface DashboardStats {
  totalSeconds: number;
  totalSessions: number;
  completedSessions: number;
  studiedSubtopics: number;
  totalSubtopics: number;
  masteredCount: number; // visit count >= 2
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
  level: number;
  byField: Record<FieldKey, FieldProgress>;
  todayMinutes: number;
  weekMinutes: number;
  cardsReviewed: number;
}

export interface FieldProgress {
  studied: number;
  total: number;
  pct: number;
  totalSeconds: number;
}

interface CardProgressRow {
  lastReviewedAt: string | null;
}

function loadCardProgress(): Record<string, CardProgressRow> {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem("anki-progress-v2");
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, CardProgressRow>;
  } catch {
    return {};
  }
}

function curriculumTotals() {
  const totals = { math: 0, cs: 0, physics: 0, all: 0 };
  for (const f of CURRICULUM) {
    for (const p of f.phases) {
      for (const t of p.topics) {
        totals[f.key] += t.subtopics.length;
        totals.all += t.subtopics.length;
      }
    }
  }
  return totals;
}

export function computeStreak(activityDates: Set<string>) {
  if (activityDates.size === 0) return { current: 0, longest: 0 };
  // Iterate back from today to compute current streak
  let cur = 0;
  const today = new Date();
  for (let i = 0; i < 400; i++) {
    const d = format(subDays(today, i), "yyyy-MM-dd");
    if (activityDates.has(d)) cur += 1;
    else break;
  }
  // Longest streak (scan over all dates)
  const sorted = Array.from(activityDates).sort();
  let longest = 0;
  let run = 0;
  let prev: Date | null = null;
  for (const d of sorted) {
    const cur = new Date(d);
    if (prev) {
      const diff = (cur.getTime() - prev.getTime()) / 86400000;
      if (Math.round(diff) === 1) run += 1;
      else run = 1;
    } else run = 1;
    if (run > longest) longest = run;
    prev = cur;
  }
  return { current: cur, longest };
}

export function levelFromXp(xp: number) {
  // Simple curve — every 1000 XP is a level
  return Math.max(1, Math.floor(xp / 1000) + 1);
}

export function getDashboardStats(): DashboardStats {
  const studied = listStudied();
  const sessions = listSessions();
  const cardProgress = loadCardProgress();
  const totals = curriculumTotals();

  // Subtopics by field
  const byField: Record<FieldKey, FieldProgress> = {
    math: { studied: 0, total: totals.math, pct: 0, totalSeconds: 0 },
    cs: { studied: 0, total: totals.cs, pct: 0, totalSeconds: 0 },
    physics: { studied: 0, total: totals.physics, pct: 0, totalSeconds: 0 },
  };
  for (const e of studied) {
    byField[e.fieldKey].studied += 1;
    byField[e.fieldKey].totalSeconds += e.totalSeconds;
  }
  (Object.keys(byField) as FieldKey[]).forEach((k) => {
    byField[k].pct =
      byField[k].total > 0 ? Math.round((byField[k].studied / byField[k].total) * 100) : 0;
  });

  // Aggregate seconds by day from session savedAt + studied lastStudiedAt
  const dayMinutes = new Map<string, number>();
  for (const s of sessions) {
    const day = format(new Date(s.savedAt ?? s.startedAt), "yyyy-MM-dd");
    const sec = s.accumSec ?? 0;
    dayMinutes.set(day, (dayMinutes.get(day) ?? 0) + Math.round(sec / 60));
  }

  const totalSec = sessions.reduce((s, x) => s + (x.accumSec ?? 0), 0);
  const completedSessions = sessions.filter((s) => s.status === "completed").length;

  // XP — same formula as study session: 1 XP/minute under target, 2 XP/minute overtime
  let totalXp = 0;
  for (const s of sessions) {
    const accum = s.accumSec ?? 0;
    const elapsedMin = accum / 60;
    const targetMin = Math.max(1, s.durationMinutes);
    const onTrack = Math.min(elapsedMin, targetMin);
    const overtime = Math.max(0, elapsedMin - targetMin);
    const base = elapsedMin >= targetMin * 0.75 ? 50 : 0;
    totalXp += Math.round(base + onTrack + overtime * 2);
  }

  // Streak
  const activeDates = new Set<string>();
  for (const s of sessions) {
    if ((s.accumSec ?? 0) > 60) {
      activeDates.add(format(new Date(s.savedAt ?? s.startedAt), "yyyy-MM-dd"));
    }
  }
  const { current: currentStreak, longest: longestStreak } = computeStreak(activeDates);

  // Today / week minutes
  const todayKey = format(startOfDay(new Date()), "yyyy-MM-dd");
  const todayMinutes = dayMinutes.get(todayKey) ?? 0;
  let weekMinutes = 0;
  for (let i = 0; i < 7; i++) {
    weekMinutes += dayMinutes.get(format(subDays(new Date(), i), "yyyy-MM-dd")) ?? 0;
  }

  // Mastered = subtopic visited 2+ times AND total seconds >= 5 minutes
  const masteredCount = studied.filter((e) => e.visitCount >= 2 && e.totalSeconds >= 300).length;

  // Cards reviewed
  const cardsReviewed = Object.values(cardProgress).filter((p) => p.lastReviewedAt).length;

  return {
    totalSeconds: totalSec,
    totalSessions: sessions.length,
    completedSessions,
    studiedSubtopics: studied.length,
    totalSubtopics: totals.all,
    masteredCount,
    currentStreak,
    longestStreak,
    totalXp,
    level: levelFromXp(totalXp),
    byField,
    todayMinutes,
    weekMinutes,
    cardsReviewed,
  };
}

/**
 * Returns a list of { date, minutes } entries for the last `days` days
 * including today, suitable for the contribution heatmap.
 */
export function getDailyActivity(days: number): { date: string; minutes: number }[] {
  const sessions = listSessions();
  const studied = listStudied();
  const map = new Map<string, number>();

  for (const s of sessions) {
    const day = format(new Date(s.savedAt ?? s.startedAt), "yyyy-MM-dd");
    const sec = s.accumSec ?? 0;
    map.set(day, (map.get(day) ?? 0) + Math.round(sec / 60));
  }
  // Add fallback minutes from studied entries that aren't accounted for in sessions
  // (happens when user navigates with Next/Prev which only writes to studied, not session)
  for (const e of studied) {
    const day = format(new Date(e.lastStudiedAt), "yyyy-MM-dd");
    // Avoid double counting — only add if no sessions on that day cover similar amount
    // Simple heuristic: cap total per day at studied minutes if higher
    const existing = map.get(day) ?? 0;
    const minutes = Math.round(e.totalSeconds / 60);
    if (existing < minutes) map.set(day, minutes);
  }

  const out: { date: string; minutes: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = format(subDays(new Date(), i), "yyyy-MM-dd");
    out.push({ date: d, minutes: map.get(d) ?? 0 });
  }
  return out;
}

export function getRecentStudied(limit: number): StudiedEntry[] {
  return listStudied().slice(0, limit);
}

export function getRecommendedNext(): { topicId: string; topicTitle: string; field: FieldKey } | null {
  const studied = new Set(listStudied().map((e) => e.subtopicId));
  for (const f of CURRICULUM) {
    for (const p of f.phases) {
      for (const t of p.topics) {
        for (const s of t.subtopics) {
          if (!studied.has(s.id)) {
            return { topicId: t.id, topicTitle: t.title, field: f.key };
          }
        }
      }
    }
  }
  return null;
}

export function getInProgressSessions(): SessionPayload[] {
  return listSessions().filter((s) => s.status === "paused");
}
