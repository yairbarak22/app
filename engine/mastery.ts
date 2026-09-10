import type { TopicState } from "@/lib/types";

/** Bayesian Knowledge Tracing parameters. */
const P_LEARN = 0.12;
const P_SLIP = 0.1;
const P_GUESS_TYPED = 0.05;
const P_GUESS_MCQ = 0.25;

export const TOPIC_INTERVALS = [1, 3, 7, 14, 30, 60];

export function newTopic(pInit = 0.2): TopicState {
  return { p: pInit, attempts: 0, correct: 0, days: [], due: 0, interval: 0, lessonSeen: false, recent: [], seen: [] };
}

export function updateTopic(t: TopicState, correct: boolean, guessable: boolean, day: number, itemId?: string): TopicState {
  const guess = guessable ? P_GUESS_MCQ : P_GUESS_TYPED;
  const p = t.p;
  let post: number;
  if (correct) {
    const denom = p * (1 - P_SLIP) + (1 - p) * guess;
    post = (p * (1 - P_SLIP)) / denom;
  } else {
    const denom = p * P_SLIP + (1 - p) * (1 - guess);
    post = (p * P_SLIP) / denom;
  }
  const pNew = post + (1 - post) * P_LEARN;
  const days = t.days.includes(day) ? t.days : [...t.days, day].slice(-60);
  const recent = [...t.recent, correct ? 1 : 0].slice(-20) as (0 | 1)[];
  const seen = itemId ? [...t.seen.filter((x) => x !== itemId), itemId].slice(-40) : t.seen;
  return { ...t, p: Math.min(0.99, Math.max(0.01, pNew)), attempts: t.attempts + 1, correct: t.correct + (correct ? 1 : 0), days, recent, seen };
}

/** Called once at the end of a session in which the topic was practiced; schedules the next spaced review. */
export function scheduleTopic(t: TopicState, day: number): TopicState {
  const last = t.recent.slice(-8);
  const acc = last.length ? last.reduce<number>((a, b) => a + b, 0) / last.length : 0;
  let interval: number;
  if (acc >= 0.8) {
    const idx = TOPIC_INTERVALS.indexOf(t.interval);
    interval = TOPIC_INTERVALS[Math.min(TOPIC_INTERVALS.length - 1, idx + 1)];
  } else if (acc >= 0.6) {
    interval = Math.max(1, t.interval);
  } else {
    interval = 1;
  }
  return { ...t, interval, due: day + interval };
}

export function isMastered(t: TopicState): boolean {
  return t.p >= 0.9 && t.attempts >= 12 && t.days.length >= 3;
}

/** "Learned" = good enough to move the main slot to the next topic; review keeps it alive until mastered. */
export function isLearned(t: TopicState): boolean {
  return isMastered(t) || (t.p >= 0.8 && t.attempts >= 8);
}

export function recentAccuracy(t: TopicState, n = 10): number | null {
  const r = t.recent.slice(-n);
  if (!r.length) return null;
  return r.reduce<number>((a, b) => a + b, 0) / r.length;
}
