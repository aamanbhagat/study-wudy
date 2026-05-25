import type { FieldKey, KnowledgeLevel } from "@/lib/types";

// Priority score: P = (5 - knowledge_level) * 2
//                   + days_since_last_study
//                   + prerequisite_bonus * 3
//                   + weak_area_bonus * 4
//                   + overdue_review_bonus * 5

export interface ScoreInput {
  topicId: string;
  knowledgeLevel: KnowledgeLevel;
  daysSinceLastStudy: number;
  isPrerequisiteForCurrent: boolean;
  isWeakArea: boolean;
  overdueReviewCount: number;
  field: FieldKey;
}

export interface ScoredTopic extends ScoreInput {
  score: number;
  breakdown: {
    levelGap: number;
    daysGap: number;
    prereq: number;
    weakArea: number;
    overdueReviews: number;
  };
}

export function scoreTopic(input: ScoreInput): ScoredTopic {
  const levelGap = (5 - input.knowledgeLevel) * 2;
  const daysGap = Math.min(60, input.daysSinceLastStudy);
  const prereq = input.isPrerequisiteForCurrent ? 3 : 0;
  const weakArea = input.isWeakArea ? 4 : 0;
  const overdueReviews = Math.min(20, input.overdueReviewCount) * 5;
  const score = levelGap + daysGap + prereq + weakArea + overdueReviews;
  return {
    ...input,
    score,
    breakdown: { levelGap, daysGap, prereq, weakArea, overdueReviews },
  };
}

export function rankTopics(inputs: ScoreInput[]): ScoredTopic[] {
  return inputs.map(scoreTopic).sort((a, b) => b.score - a.score);
}
