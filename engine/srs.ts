import type { CardState, Grade } from "@/lib/types";

export const MAX_VOCAB_STAGE = 5;
export const MAX_CHUNK_STAGE = 2;
export const LEECH_LAPSES = 6;

export function newCard(day: number): CardState {
  return { stage: 0, interval: 0, ease: 2.5, due: day, reps: 0, lapses: 0, introduced: day };
}

/**
 * Called when a brand-new word finishes its in-session introduction
 * (meet -> recognize -> cloze). `ok` = both in-session checks were right.
 */
export function graduate(card: CardState, ok: boolean, day: number): CardState {
  return { ...card, stage: ok ? 2 : 1, interval: 1, due: day + 1, reps: 1, last: day };
}

/** SM-2 style review with a stage ladder. Deterministic. */
export function review(card: CardState, grade: Grade, day: number, maxStage = MAX_VOCAB_STAGE): CardState {
  const c = { ...card, reps: card.reps + 1, last: day };
  switch (grade) {
    case 0: // again
      c.lapses += 1;
      c.ease = Math.max(1.3, c.ease - 0.2);
      c.interval = 0;
      c.stage = Math.max(1, c.stage - 1);
      c.due = day; // re-asked in the same session; if it survives, review() with grade>=1 sets a real interval
      return c;
    case 1: // hard
      c.ease = Math.max(1.3, c.ease - 0.15);
      c.interval = c.interval <= 0 ? 1 : Math.max(1, Math.round(c.interval * 1.2));
      break;
    case 2: // good
      if (c.interval <= 0) c.interval = 1;
      else if (c.interval === 1) c.interval = 3;
      else c.interval = Math.round(c.interval * c.ease);
      c.stage = Math.min(maxStage, c.stage + 1);
      break;
    case 3: // easy
      c.ease = Math.min(3.0, c.ease + 0.15);
      c.interval = c.interval <= 0 ? 4 : Math.round(c.interval * c.ease * 1.3);
      c.stage = Math.min(maxStage, c.stage + 1);
      break;
  }
  c.interval = Math.min(c.interval, 365);
  c.due = day + c.interval;
  return c;
}

export function isLeech(card: CardState): boolean {
  return card.lapses >= LEECH_LAPSES;
}

export function isDue(card: CardState, day: number): boolean {
  return card.due <= day;
}

/** Sort key for review order: most overdue first, then lower stage first. */
export function reviewPriority(card: CardState, day: number): number {
  return (day - card.due) * 10 - card.stage;
}
