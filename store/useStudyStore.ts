import { create } from "zustand";

interface StudyState {
  activeSessionId: string | null;
  activeTopicId: string | null;
  activeSubtopicId: string | null;
  startedAt: number | null;
  setActiveSession: (sessionId: string, topicId?: string, subtopicId?: string) => void;
  endSession: () => void;
}

export const useStudyStore = create<StudyState>((set) => ({
  activeSessionId: null,
  activeTopicId: null,
  activeSubtopicId: null,
  startedAt: null,
  setActiveSession: (sessionId, topicId, subtopicId) =>
    set({
      activeSessionId: sessionId,
      activeTopicId: topicId ?? null,
      activeSubtopicId: subtopicId ?? null,
      startedAt: Date.now(),
    }),
  endSession: () =>
    set({ activeSessionId: null, activeTopicId: null, activeSubtopicId: null, startedAt: null }),
}));
