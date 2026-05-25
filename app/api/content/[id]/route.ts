import { NextRequest } from "next/server";
import { readSubtopicContent, readTopicContent } from "@/lib/content-cache";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const url = new URL(req.url);
  const kind = url.searchParams.get("kind") ?? "subtopic";
  const content = kind === "topic" ? await readTopicContent(id) : await readSubtopicContent(id);
  if (content === null) {
    return Response.json({ cached: false }, { status: 404 });
  }
  return Response.json({ cached: true, content });
}
