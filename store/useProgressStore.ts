import { create } from "zustand";
import type { FieldKey } from "@/lib/types";

interface FieldStats {
  topicsCompleted: number;
  topicsTotal: number;
  averageKnowledge: number;
}

interface ProgressState {
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  byField: Record<FieldKey, FieldStats>;
  setProgress: (data: Partial<ProgressState>) => void;
}

const emptyField: FieldStats = { topicsCompleted: 0, topicsTotal: 0, averageKnowledge: 0 };

export const useProgressStore = create<ProgressState>((set) => ({
  totalXp: 0,
  currentStreak: 0,
  longestStreak: 0,
  byField: { math: emptyField, cs: emptyField, physics: emptyField },
  setProgress: (data) => set((s) => ({ ...s, ...data })),
}));
