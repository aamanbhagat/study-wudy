"use client";

import { createClient } from "@/lib/supabase/client";

export interface Note {
  id: string;
  user_id: string | null;
  topic_id: string | null;
  topic_title: string | null;
  title: string;
  body: string;
  pinned: boolean;
  created_at: string;
  updated_at: string;
}

const LOCAL_KEY = "user-notes-v1";

// If we hit a missing-table or RLS error once, stop trying Supabase for the
// rest of the session — fall back to localStorage silently.
let supabaseUnavailable = false;

function isSchemaMissing(message: string) {
  return /schema cache|does not exist|relation .* does not exist|user_notes/i.test(message);
}

function loadLocal(): Note[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(LOCAL_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Note[];
  } catch {
    return [];
  }
}

function saveLocal(notes: Note[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(notes));
}

async function getUserId(): Promise<string | null> {
  if (supabaseUnavailable) return null;
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    return data.user?.id ?? null;
  } catch {
    return null;
  }
}

export async function listNotes(): Promise<Note[]> {
  const userId = await getUserId();
  if (!userId || supabaseUnavailable) {
    return [...loadLocal()].sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    );
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_notes")
    .select("*, topics(title)")
    .order("pinned", { ascending: false })
    .order("updated_at", { ascending: false });
  if (error) {
    if (isSchemaMissing(error.message)) {
      supabaseUnavailable = true;
      console.warn(
        "user_notes table missing in Supabase — falling back to localStorage. Run migration 0003_notes.sql to enable cloud sync.",
      );
    } else {
      console.warn("listNotes Supabase error, falling back to local:", error.message);
    }
    return loadLocal();
  }
  return (data ?? []).map((row: NoteRow) => ({
    id: row.id,
    user_id: row.user_id,
    topic_id: row.topic_id,
    topic_title: row.topics?.title ?? null,
    title: row.title,
    body: row.body,
    pinned: row.pinned,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));
}

interface NoteRow {
  id: string;
  user_id: string;
  topic_id: string | null;
  title: string;
  body: string;
  pinned: boolean;
  created_at: string;
  updated_at: string;
  topics?: { title: string } | null;
}

function upsertLocal(note: Partial<Note> & { id?: string }): Note {
  const list = loadLocal();
  const now = new Date().toISOString();
  if (note.id) {
    const idx = list.findIndex((n) => n.id === note.id);
    if (idx >= 0) {
      const merged = { ...list[idx], ...note, updated_at: now } as Note;
      list[idx] = merged;
      saveLocal(list);
      return merged;
    }
  }
  const created: Note = {
    id: note.id ?? `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    user_id: null,
    topic_id: note.topic_id ?? null,
    topic_title: note.topic_title ?? null,
    title: note.title ?? "Untitled note",
    body: note.body ?? "",
    pinned: note.pinned ?? false,
    created_at: now,
    updated_at: now,
  };
  list.unshift(created);
  saveLocal(list);
  return created;
}

export async function upsertNote(note: Partial<Note> & { id?: string }): Promise<Note> {
  const userId = await getUserId();
  if (!userId || supabaseUnavailable) {
    return upsertLocal(note);
  }
  const supabase = createClient();
  const payload = {
    id: note.id,
    user_id: userId,
    topic_id: note.topic_id ?? null,
    title: note.title ?? "Untitled note",
    body: note.body ?? "",
    pinned: note.pinned ?? false,
  };
  const { data, error } = await supabase
    .from("user_notes")
    .upsert(payload, { onConflict: "id" })
    .select("*, topics(title)")
    .single();
  if (error || !data) {
    if (error && isSchemaMissing(error.message)) {
      supabaseUnavailable = true;
      console.warn(
        "user_notes table missing in Supabase — saving to localStorage instead. Run migration 0003_notes.sql to enable cloud sync.",
      );
      return upsertLocal(note);
    }
    throw new Error(error?.message ?? "Failed to save note");
  }
  const row = data as NoteRow;
  return {
    id: row.id,
    user_id: row.user_id,
    topic_id: row.topic_id,
    topic_title: row.topics?.title ?? null,
    title: row.title,
    body: row.body,
    pinned: row.pinned,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function deleteNote(id: string): Promise<void> {
  const userId = await getUserId();
  if (!userId || supabaseUnavailable || id.startsWith("local-")) {
    saveLocal(loadLocal().filter((n) => n.id !== id));
    return;
  }
  const supabase = createClient();
  const { error } = await supabase.from("user_notes").delete().eq("id", id);
  if (error) {
    if (isSchemaMissing(error.message)) {
      supabaseUnavailable = true;
      saveLocal(loadLocal().filter((n) => n.id !== id));
      return;
    }
    throw new Error(error.message);
  }
}
