export type FieldKey = "math" | "cs" | "physics";

export type KnowledgeLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface Field {
  id: string;
  key: FieldKey;
  name: string;
  description: string | null;
  position: number;
  created_at: string;
}

export interface Phase {
  id: string;
  field_id: string;
  number: number;
  title: string;
  subtitle: string | null;
  est_duration: string | null;
  position: number;
}

export interface Topic {
  id: string;
  phase_id: string;
  field_id: string;
  number: string;
  title: string;
  description: string | null;
  position: number;
}

export interface Subtopic {
  id: string;
  topic_id: string;
  title: string;
  body: string | null;
  position: number;
}

export interface TopicProgress {
  id: string;
  user_id: string;
  topic_id: string;
  knowledge_level: KnowledgeLevel;
  confidence: number;
  last_studied_at: string | null;
  total_study_minutes: number;
  notes: string | null;
  updated_at: string;
}

export interface SubtopicProgress {
  id: string;
  user_id: string;
  subtopic_id: string;
  knowledge_level: KnowledgeLevel;
  confidence: number;
  last_studied_at: string | null;
  updated_at: string;
}

export interface StudySession {
  id: string;
  user_id: string;
  topic_id: string | null;
  subtopic_id: string | null;
  started_at: string;
  ended_at: string | null;
  duration_minutes: number | null;
  xp_earned: number;
  notes: string | null;
}

export interface DailyPlan {
  id: string;
  user_id: string;
  plan_date: string;
  plan_json: unknown;
  ai_insight: string | null;
  total_minutes_target: number;
  completed: boolean;
}

export interface ReviewCard {
  id: string;
  user_id: string;
  topic_id: string | null;
  subtopic_id: string | null;
  front: string;
  back: string;
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  due_at: string;
  last_reviewed_at: string | null;
}

export interface Test {
  id: string;
  user_id: string;
  title: string;
  field: FieldKey | null;
  topic_id: string | null;
  questions_json: unknown;
  total_questions: number;
  duration_minutes: number;
  status: "draft" | "in_progress" | "completed";
  score: number | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface XpLedger {
  id: string;
  user_id: string;
  amount: number;
  reason: string;
  metadata: unknown;
  created_at: string;
}

export interface Streak {
  id: string;
  user_id: string;
  current_days: number;
  longest_days: number;
  last_active_date: string;
  freezes_remaining: number;
  updated_at: string;
}
