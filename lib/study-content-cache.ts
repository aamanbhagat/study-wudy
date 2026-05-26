import { promises as fs } from "fs";
import path from "path";

export const STUDY_CONTENT_DIR = path.join(process.cwd(), "data", "study-content");

export type StudyLang = "en" | "hi";

function safeId(id: string) {
  return id.replace(/[^a-z0-9-_]/gi, "_");
}

export function studyContentPath(subtopicId: string, lang: StudyLang = "en") {
  return path.join(STUDY_CONTENT_DIR, lang, `study-${safeId(subtopicId)}.md`);
}

export async function readStudyContent(
  subtopicId: string,
  lang: StudyLang = "en",
): Promise<string | null> {
  try {
    return await fs.readFile(studyContentPath(subtopicId, lang), "utf8");
  } catch {
    // Backwards-compat: if a file exists at the old flat path, treat it as English.
    if (lang === "en") {
      try {
        return await fs.readFile(
          path.join(STUDY_CONTENT_DIR, `study-${safeId(subtopicId)}.md`),
          "utf8",
        );
      } catch {
        return null;
      }
    }
    return null;
  }
}

export async function writeStudyContent(
  subtopicId: string,
  content: string,
  lang: StudyLang = "en",
) {
  await fs.mkdir(path.join(STUDY_CONTENT_DIR, lang), { recursive: true });
  await fs.writeFile(studyContentPath(subtopicId, lang), content, "utf8");
}

export async function listStudyContent(lang: StudyLang = "en"): Promise<string[]> {
  try {
    return await fs.readdir(path.join(STUDY_CONTENT_DIR, lang));
  } catch {
    return [];
  }
}
