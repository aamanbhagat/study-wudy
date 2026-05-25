// SM-2 spaced repetition algorithm.
// Reference: https://www.supermemo.com/en/blog/application-of-a-computer-to-improve-the-results-obtained-in-working-with-the-supermemo-method
// quality: 0..5 — 0 = total blackout, 5 = perfect recall

export interface SM2Card {
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
}

export interface SM2Result extends SM2Card {
  dueAt: Date;
}

export function reviewCard(card: SM2Card, quality: number, now: Date = new Date()): SM2Result {
  const q = Math.max(0, Math.min(5, quality));

  let { easeFactor, intervalDays, repetitions } = card;

  if (q < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    if (repetitions === 0) intervalDays = 1;
    else if (repetitions === 1) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * easeFactor);
    repetitions += 1;
  }

  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));

  const dueAt = new Date(now);
  dueAt.setDate(dueAt.getDate() + intervalDays);

  return { easeFactor: Number(easeFactor.toFixed(2)), intervalDays, repetitions, dueAt };
}

export const NEW_CARD: SM2Card = { easeFactor: 2.5, intervalDays: 0, repetitions: 0 };
