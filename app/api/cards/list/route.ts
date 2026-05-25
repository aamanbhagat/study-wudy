import { NextRequest } from "next/server";
import { CURRICULUM } from "@/lib/curriculum-data";
import { readCardsForSubtopic, listGeneratedCards, type CardFile } from "@/lib/cards-content";
import type { FieldKey } from "@/lib/types";

export const runtime = "nodejs";

interface ResultCard {
  id: string; // unique per (subtopicId, index)
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
  field: FieldKey;
  topicId: string;
  topicTitle: string;
  subtopicId: string;
  subtopicTitle: string;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const fieldFilter = url.searchParams.get("field") as FieldKey | null;
  const topicId = url.searchParams.get("topic");
  const subtopicId = url.searchParams.get("subtopic");
  const summary = url.searchParams.get("summary") === "1";

  if (summary) {
    const idx = await listGeneratedCards();
    return Response.json(idx);
  }

  // Determine which subtopic ids to load
  const targetSubIds: string[] = [];
  for (const f of CURRICULUM) {
    if (fieldFilter && f.key !== fieldFilter) continue;
    for (const p of f.phases) {
      for (const t of p.topics) {
        if (topicId && t.id !== topicId) continue;
        for (const s of t.subtopics) {
          if (subtopicId && s.id !== subtopicId) continue;
          targetSubIds.push(s.id);
        }
      }
    }
  }

  const cardFiles: CardFile[] = [];
  for (const id of targetSubIds) {
    const cf = await readCardsForSubtopic(id);
    if (cf) cardFiles.push(cf);
  }

  const flat: ResultCard[] = [];
  for (const file of cardFiles) {
    file.cards.forEach((c, i) => {
      flat.push({
        id: `${file.subtopicId}#${i}`,
        front: c.front,
        back: c.back,
        difficulty: c.difficulty,
        field: file.field,
        topicId: file.topicId,
        topicTitle: file.topicTitle,
        subtopicId: file.subtopicId,
        subtopicTitle: file.subtopicTitle,
      });
    });
  }

  return Response.json({
    cards: flat,
    files: cardFiles.length,
    requestedSubtopics: targetSubIds.length,
  });
}
