import { CURRICULUM, type CurriculumField, type CurriculumPhase, type CurriculumTopic, type CurriculumSubtopic } from "@/lib/curriculum-data";

export interface SubtopicCursor {
  field: CurriculumField;
  phase: CurriculumPhase;
  topic: CurriculumTopic;
  subtopic: CurriculumSubtopic;
}

/**
 * Returns the next subtopic in reading order — within a topic, then to the
 * next topic in the same phase, then the next phase, then the next field.
 * Returns null if at the very end.
 */
export function findNextSubtopic(currentSubtopicId: string): SubtopicCursor | null {
  const flat: SubtopicCursor[] = [];
  for (const field of CURRICULUM) {
    for (const phase of field.phases) {
      for (const topic of phase.topics) {
        for (const subtopic of topic.subtopics) {
          flat.push({ field, phase, topic, subtopic });
        }
      }
    }
  }
  const idx = flat.findIndex((c) => c.subtopic.id === currentSubtopicId);
  if (idx < 0 || idx >= flat.length - 1) return null;
  return flat[idx + 1];
}

export function findPrevSubtopic(currentSubtopicId: string): SubtopicCursor | null {
  const flat: SubtopicCursor[] = [];
  for (const field of CURRICULUM) {
    for (const phase of field.phases) {
      for (const topic of phase.topics) {
        for (const subtopic of topic.subtopics) {
          flat.push({ field, phase, topic, subtopic });
        }
      }
    }
  }
  const idx = flat.findIndex((c) => c.subtopic.id === currentSubtopicId);
  if (idx <= 0) return null;
  return flat[idx - 1];
}
