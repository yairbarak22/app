import type { AppState, Band, VocabItem } from "@/lib/types";
import { isDue } from "./srs";

export function dueVocabCount(state: AppState, day: number): number {
  let n = 0;
  for (const c of Object.values(state.vocab)) if (isDue(c, day) && c.reps > 0) n++;
  return n;
}

/** Retention over the last 7 logged days (fraction correct on reviews), or null if not enough data. */
export function retention7(state: AppState): number | null {
  const last = state.history.slice(-7);
  const reviews = last.reduce((a, d) => a + d.reviews, 0);
  if (reviews < 30) return null;
  return last.reduce((a, d) => a + d.reviewsCorrect, 0) / reviews;
}

/** How many new words to introduce today, regulated by review load and retention. */
export function newWordsToday(state: AppState, day: number, minutesFactor = 1): number {
  const base = state.settings.newWordsPerDay;
  const due = dueVocabCount(state, day);
  const ret = retention7(state);
  let n = base;
  if (due > 120) n = base * 0.5;
  else if (due > 80) n = base * 0.75;
  if (ret !== null && ret < 0.8) n = Math.min(n, base * 0.6);
  else if (ret !== null && ret > 0.92 && due < 60) n = base * 1.3;
  n = Math.round(n * minutesFactor);
  return Math.max(0, Math.min(25, n));
}

/** Choose the pool of not-yet-introduced words for today: 70% current band, 30% next band (mixed), never known words. */
export function candidateNewWords(state: AppState, vocab: VocabItem[]): { current: VocabItem[]; next: VocabItem[] } {
  const known = new Set(state.known);
  const fresh = vocab.filter((v) => !state.vocab[v.id] && !known.has(v.id));
  const band = state.band;
  const current = fresh.filter((v) => v.band <= band);
  const next = fresh.filter((v) => v.band === Math.min(4, band + 1) && band < 4);
  return { current, next };
}

/** Advance the band when the current band is nearly exhausted. */
export function maybeAdvanceBand(state: AppState, vocab: VocabItem[]): Band {
  const known = new Set(state.known);
  const remaining = vocab.filter((v) => v.band <= state.band && !state.vocab[v.id] && !known.has(v.id)).length;
  if (remaining < 20 && state.band < 4) return (state.band + 1) as Band;
  return state.band;
}
