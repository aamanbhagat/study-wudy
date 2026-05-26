import { CURRICULUM, type CurriculumField, type CurriculumPhase, type CurriculumTopic, type CurriculumSubtopic } from "@/lib/curriculum-data";

export interface SubtopicCursor {
  field: CurriculumField;
  phase: CurriculumPhase;
  topic: CurriculumTopic;
  subtopic: CurriculumSubtopic;
  /** 1-based position of this subtopic within its parent topic. */
  subtopicIndex: number;
  /** Full hierarchical number, e.g. "1.1.3". */
  fullNumber: string;
}

/**
 * Flatten the curriculum into a single ordered array, attaching each
 * subtopic's 1-based index within its parent topic and a full dotted number.
 */
function flatten(): SubtopicCursor[] {
  const flat: SubtopicCursor[] = [];
  for (const field of CURRICULUM) {
    for (const phase of field.phases) {
      for (const topic of phase.topics) {
        topic.subtopics.forEach((subtopic, i) => {
          const subtopicIndex = i + 1;
          flat.push({
            field,
            phase,
            topic,
            subtopic,
            subtopicIndex,
            fullNumber: `${topic.number}.${subtopicIndex}`,
          });
        });
      }
    }
  }
  return flat;
}

export function findSubtopicCursor(currentSubtopicId: string): SubtopicCursor | null {
  const flat = flatten();
  return flat.find((c) => c.subtopic.id === currentSubtopicId) ?? null;
}

/**
 * Returns the next subtopic in reading order — within a topic, then to the
 * next topic in the same phase, then the next phase, then the next field.
 * Returns null if at the very end.
 */
export function findNextSubtopic(currentSubtopicId: string): SubtopicCursor | null {
  const flat = flatten();
  const idx = flat.findIndex((c) => c.subtopic.id === currentSubtopicId);
  if (idx < 0 || idx >= flat.length - 1) return null;
  return flat[idx + 1];
}

export function findPrevSubtopic(currentSubtopicId: string): SubtopicCursor | null {
  const flat = flatten();
  const idx = flat.findIndex((c) => c.subtopic.id === currentSubtopicId);
  if (idx <= 0) return null;
  return flat[idx - 1];
}
