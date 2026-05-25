import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FIELD_COLORS: Record<FieldKey, { fg: string; bg: string; label: string }> = {
  math: { fg: "text-field-math", bg: "bg-field-math-bg", label: "Mathematics" },
  cs: { fg: "text-field-cs", bg: "bg-field-cs-bg", label: "Computer Science" },
  physics: { fg: "text-field-physics", bg: "bg-field-physics-bg", label: "Physics & Rocket Science" },
};

export type FieldKey = "math" | "cs" | "physics";

export const KNOWLEDGE_LEVELS = [
  { level: 0, label: "Not started", color: "bg-knowledge-0" },
  { level: 1, label: "Heard of it", color: "bg-knowledge-1" },
  { level: 2, label: "Familiar", color: "bg-knowledge-2" },
  { level: 3, label: "Working", color: "bg-knowledge-3" },
  { level: 4, label: "Proficient", color: "bg-knowledge-4" },
  { level: 5, label: "Mastered", color: "bg-knowledge-5" },
] as const;

export function formatDate(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
