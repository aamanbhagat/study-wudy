import { promises as fs } from "fs";
import path from "path";
import { CURRICULUM } from "./curriculum-data";

const CARDS_DIR = path.join(process.cwd(), "data", "cards");

export interface GeneratedCard {
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface CardFile {
  subtopicId: string;
  subtopicTitle: string;
  topicId: string;
  topicTitle: string;
  field: "math" | "cs" | "physics";
  generatedAt: string;
  cards: GeneratedCard[];
}

function safeId(id: string) {
  return id.replace(/[^a-z0-9-_]/gi, "_");
}

export async function readCardsForSubtopic(subtopicId: string): Promise<CardFile | null> {
  const filePath = path.join(CARDS_DIR, `cards-${safeId(subtopicId)}.json`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as CardFile;
  } catch {
    return null;
  }
}

export interface CardsIndex {
  total: number;
  bySubject: Record<"math" | "cs" | "physics", number>;
  files: { subtopicId: string }[];
}

export async function listGeneratedCards(): Promise<CardsIndex> {
  let entries: string[] = [];
  try {
    entries = await fs.readdir(CARDS_DIR);
  } catch {
    return { total: 0, bySubject: { math: 0, cs: 0, physics: 0 }, files: [] };
  }
  const files = entries
    .filter((n) => n.startsWith("cards-") && n.endsWith(".json"))
    .map((n) => n.replace(/^cards-/, "").replace(/\.json$/, ""));

  // Map sub ids back to fields via the curriculum.
  const fieldOf = new Map<string, "math" | "cs" | "physics">();
  for (const f of CURRICULUM) {
    for (const p of f.phases) {
      for (const t of p.topics) {
        for (const s of t.subtopics) {
          fieldOf.set(safeId(s.id), f.key);
        }
      }
    }
  }
  const bySubject = { math: 0, cs: 0, physics: 0 };
  for (const id of files) {
    const k = fieldOf.get(id);
    if (k) bySubject[k]++;
  }
  return { total: files.length, bySubject, files: files.map((id) => ({ subtopicId: id })) };
}

export async function readCardsForSubtopics(subtopicIds: string[]): Promise<CardFile[]> {
  const out: CardFile[] = [];
  for (const id of subtopicIds) {
    const cf = await readCardsForSubtopic(id);
    if (cf) out.push(cf);
  }
  return out;
}
