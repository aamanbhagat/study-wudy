"use client";

// Generic cloud-sync helpers for user data tables that follow the
// `(user_id, id, payload, updated_at)` shape: study sessions, studied
// subtopics, card progress, test results.
//
// Pattern: localStorage is the runtime source of truth. Every write fires a
// best-effort cloud push. On login (or first mount when authed), each store
// pulls its rows and merges into local by `updated_at` (last write wins).
// When not authed, when offline, or when a table is missing, stores degrade
// silently to local-only.

import { createClient } from "@/lib/supabase/client";

export type SyncTable =
  | "user_study_sessions"
  | "user_studied_subtopics"
  | "user_card_progress"
  | "user_test_results";

const ID_COLUMN: Record<SyncTable, string> = {
  user_study_sessions: "id",
  user_studied_subtopics: "subtopic_id",
  user_card_progress: "card_id",
  user_test_results: "id",
};

// Per-table flag: once we hit a missing-table or hard error, stop trying
// for the rest of the session.
const tableUnavailable: Record<SyncTable, boolean> = {
  user_study_sessions: false,
  user_studied_subtopics: false,
  user_card_progress: false,
  user_test_results: false,
};

function isSchemaMissing(message: string) {
  return /schema cache|does not exist|relation .* does not exist/i.test(message);
}

export async function getUserId(): Promise<string | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    return data.user?.id ?? null;
  } catch {
    return null;
  }
}

export interface CloudRow<T> {
  id: string;
  payload: T;
  updated_at: string;
}

export async function pullAll<T>(table: SyncTable): Promise<CloudRow<T>[]> {
  if (tableUnavailable[table]) return [];
  const userId = await getUserId();
  if (!userId) return [];
  try {
    const supabase = createClient();
    const idCol = ID_COLUMN[table];
    const { data, error } = await supabase
      .from(table)
      .select(`${idCol}, payload, updated_at`)
      .eq("user_id", userId);
    if (error) {
      if (isSchemaMissing(error.message)) {
        tableUnavailable[table] = true;
        console.warn(
          `${table} missing in Supabase — local only. Run migration 0004_user_data.sql for cross-device sync.`,
        );
      }
      return [];
    }
    const rows = (data ?? []) as unknown as Array<Record<string, unknown>>;
    return rows.map((row) => ({
      id: String(row[idCol]),
      payload: row.payload as T,
      updated_at: String(row.updated_at),
    }));
  } catch (e) {
    console.warn(`pullAll(${table}) failed:`, (e as Error).message);
    return [];
  }
}

export async function pushItem<T>(
  table: SyncTable,
  id: string,
  payload: T,
  updatedAt?: string,
): Promise<void> {
  if (tableUnavailable[table]) return;
  const userId = await getUserId();
  if (!userId) return;
  try {
    const supabase = createClient();
    const idCol = ID_COLUMN[table];
    const row: Record<string, unknown> = {
      user_id: userId,
      [idCol]: id,
      payload,
    };
    if (updatedAt) row.updated_at = updatedAt;
    const { error } = await supabase
      .from(table)
      .upsert(row, { onConflict: `user_id,${idCol}` });
    if (error) {
      if (isSchemaMissing(error.message)) {
        tableUnavailable[table] = true;
        console.warn(
          `${table} missing in Supabase — local only. Run migration 0004_user_data.sql for cross-device sync.`,
        );
      } else {
        console.warn(`pushItem(${table}, ${id}) error:`, error.message);
      }
    }
  } catch (e) {
    console.warn(`pushItem(${table}, ${id}) failed:`, (e as Error).message);
  }
}

export async function deleteItem(table: SyncTable, id: string): Promise<void> {
  if (tableUnavailable[table]) return;
  const userId = await getUserId();
  if (!userId) return;
  try {
    const supabase = createClient();
    const idCol = ID_COLUMN[table];
    const { error } = await supabase
      .from(table)
      .delete()
      .eq("user_id", userId)
      .eq(idCol, id);
    if (error) {
      if (isSchemaMissing(error.message)) {
        tableUnavailable[table] = true;
      } else {
        console.warn(`deleteItem(${table}, ${id}) error:`, error.message);
      }
    }
  } catch (e) {
    console.warn(`deleteItem(${table}, ${id}) failed:`, (e as Error).message);
  }
}

// Convenience: bulk-push every item. Used after a local-only burst when the
// user logs in for the first time, so prior offline work isn't lost.
export async function pushAll<T>(
  table: SyncTable,
  items: Array<{ id: string; payload: T; updated_at?: string }>,
): Promise<void> {
  if (tableUnavailable[table] || items.length === 0) return;
  const userId = await getUserId();
  if (!userId) return;
  try {
    const supabase = createClient();
    const idCol = ID_COLUMN[table];
    const rows = items.map((it) => {
      const row: Record<string, unknown> = {
        user_id: userId,
        [idCol]: it.id,
        payload: it.payload,
      };
      if (it.updated_at) row.updated_at = it.updated_at;
      return row;
    });
    const { error } = await supabase
      .from(table)
      .upsert(rows, { onConflict: `user_id,${idCol}` });
    if (error) {
      if (isSchemaMissing(error.message)) {
        tableUnavailable[table] = true;
      } else {
        console.warn(`pushAll(${table}) error:`, error.message);
      }
    }
  } catch (e) {
    console.warn(`pushAll(${table}) failed:`, (e as Error).message);
  }
}

export function isTableAvailable(table: SyncTable) {
  return !tableUnavailable[table];
}
