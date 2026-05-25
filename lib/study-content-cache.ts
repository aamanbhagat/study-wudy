import { promises as fs } from "fs";
import path from "path";

export const STUDY_CONTENT_DIR = path.join(process.cwd(), "data", "study-content");

function safeId(id: string) {
  return id.replace(/[^a-z0-9-_]/gi, "_");
}

export function studyContentPath(subtopicId: string) {
  return path.join(STUDY_CONTENT_DIR, `study-${safeId(subtopicId)}.md`);
}

export async function readStudyContent(subtopicId: string): Promise<string | null> {
  try {
    return await fs.readFile(studyContentPath(subtopicId), "utf8");
  } catch {
    return null;
  }
}

export async function writeStudyContent(subtopicId: string, content: string) {
  await fs.mkdir(STUDY_CONTENT_DIR, { recursive: true });
  await fs.writeFile(studyContentPath(subtopicId), content, "utf8");
}

export async function listStudyContent(): Promise<string[]> {
  try {
    return await fs.readdir(STUDY_CONTENT_DIR);
  } catch {
    return [];
  }
}
