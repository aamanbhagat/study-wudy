import { CURRICULUM, type CurriculumField, type CurriculumPhase, type CurriculumTopic, type CurriculumSubtopic } from "@/lib/curriculum-data";

export interface SubtopicLookup {
  field: CurriculumField;
  phase: CurriculumPhase;
  topic: CurriculumTopic;
  subtopic: CurriculumSubtopic;
}

export interface TopicLookup {
  field: CurriculumField;
  phase: CurriculumPhase;
  topic: CurriculumTopic;
}

export function findSubtopic(subtopicId: string): SubtopicLookup | null {
  for (const field of CURRICULUM) {
    for (const phase of field.phases) {
      for (const topic of phase.topics) {
        const subtopic = topic.subtopics.find((s) => s.id === subtopicId);
        if (subtopic) return { field, phase, topic, subtopic };
      }
    }
  }
  return null;
}

export function findTopic(topicId: string): TopicLookup | null {
  for (const field of CURRICULUM) {
    for (const phase of field.phases) {
      const topic = phase.topics.find((t) => t.id === topicId);
      if (topic) return { field, phase, topic };
    }
  }
  return null;
}

const LAST_STUDIED_KEY = "last-studied-v1";

export interface LastStudied {
  fieldKey: "math" | "cs" | "physics";
  topicId: string;
  topicTitle: string;
  subtopicId: string;
  subtopicTitle: string;
  studiedAt: string;
}

export function setLastStudied(value: LastStudied) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LAST_STUDIED_KEY, JSON.stringify(value));
}

export function getLastStudied(): LastStudied | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(LAST_STUDIED_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LastStudied;
  } catch {
    return null;
  }
}
