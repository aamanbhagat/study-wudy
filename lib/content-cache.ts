import { promises as fs } from "fs";
import path from "path";

export const CONTENT_DIR = path.join(process.cwd(), "data", "content");

function safeId(id: string) {
  return id.replace(/[^a-z0-9-_]/gi, "_");
}

export function subtopicPath(subtopicId: string) {
  return path.join(CONTENT_DIR, `subtopic-${safeId(subtopicId)}.md`);
}

export function topicPath(topicId: string) {
  return path.join(CONTENT_DIR, `topic-${safeId(topicId)}.md`);
}

export async function readSubtopicContent(subtopicId: string): Promise<string | null> {
  try {
    return await fs.readFile(subtopicPath(subtopicId), "utf8");
  } catch {
    return null;
  }
}

export async function readTopicContent(topicId: string): Promise<string | null> {
  try {
    return await fs.readFile(topicPath(topicId), "utf8");
  } catch {
    return null;
  }
}

export async function writeSubtopicContent(subtopicId: string, content: string) {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(subtopicPath(subtopicId), content, "utf8");
}

export async function writeTopicContent(topicId: string, content: string) {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(topicPath(topicId), content, "utf8");
}

export async function listGeneratedFiles(): Promise<string[]> {
  try {
    return await fs.readdir(CONTENT_DIR);
  } catch {
    return [];
  }
}
