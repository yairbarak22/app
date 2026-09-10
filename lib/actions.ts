"use client";
import { update, replaceState, defaultState } from "./store";
import type { AppState, Grade, PlacementItem, Band, Exercise, Block } from "./types";
import { CONTENT } from "@/content";
import { buildSession } from "@/engine/planner";
import { newCard, review, graduate, MAX_CHUNK_STAGE } from "@/engine/srs";
import { newTopic, updateTopic, scheduleTopic } from "@/engine/mastery";
import { maybeAdvanceBand } from "@/engine/level";
import { dayIndex, dateString } from "@/engine/days";

function today(): number {
  return dayIndex();
}

function currentBlock(s: AppState): Block | null {
  const ses = s.session;
  if (!ses || ses.finished) return null;
  return ses.blocks[ses.blockIndex] ?? null;
}

// ---------- session lifecycle ----------

export function startSession(minutes?: number) {
  update((s) => {
    const day = today();
    const mins = minutes ?? s.settings.minutes;
    s.session = buildSession(s, CONTENT, day, mins);
  });
}

export function abandonSession() {
  update((s) => {
    s.session = null;
  });
}

/** Mark the current exercise done and advance; re-queue `requeue` exercise later in the block if given. */
export function advance(requeue?: Exercise, offset = 6) {
  update((s) => {
    const ses = s.session;
    const b = currentBlock(s);
    if (!ses || !b) return;
    b.done += 1;
    if (requeue) {
      // a missed exercise comes back once, later in the same block, and only once
      const key = JSON.stringify(requeue);
      if (!b.retried.includes(key)) {
        b.retried.push(key);
        b.queue.splice(Math.min(b.queue.length, b.done + offset), 0, requeue);
      }
    }
    if (b.done >= b.queue.length) {
      ses.blockIndex += 1;
      if (ses.blockIndex >= ses.blocks.length) finishSessionInternal(s);
    }
  });
}

export function skipBlock() {
  update((s) => {
    const ses = s.session;
    if (!ses || ses.finished) return;
    ses.blockIndex += 1;
    if (ses.blockIndex >= ses.blocks.length) finishSessionInternal(s);
  });
}

export function addElapsed(ms: number) {
  update((s) => {
    if (s.session && !s.session.finished) s.session.elapsedMs += ms;
  });
}

function finishSessionInternal(s: AppState) {
  const ses = s.session;
  if (!ses) return;
  ses.finished = true;
  const day = ses.day;
  for (const tid of ses.practicedTopics) {
    const t = s.topics[tid];
    if (t) s.topics[tid] = scheduleTopic(t, day);
  }
  const fl = ses.stats.fluency;
  const avg = (k: "fluency" | "accuracy" | "coverage") => (fl.length ? fl.reduce((a, x) => a + x[k], 0) / fl.length : 0);
  const log = {
    day,
    date: ses.date,
    minutes: Math.round(ses.elapsedMs / 60000),
    reviews: ses.stats.reviews,
    reviewsCorrect: ses.stats.reviewsCorrect,
    newWords: ses.stats.newWords,
    grammarItems: ses.stats.grammarItems,
    grammarCorrect: ses.stats.grammarCorrect,
    fluency: fl.length ? { fluency: avg("fluency"), accuracy: avg("accuracy"), coverage: avg("coverage") } : undefined,
    oral: ses.stats.oral.total ? ses.stats.oral : undefined,
    weeklyTest: ses.stats.weeklyTest,
    completed: true,
  };
  const idx = s.history.findIndex((h) => h.day === day);
  if (idx >= 0) s.history[idx] = { ...log, minutes: s.history[idx].minutes + log.minutes };
  else s.history.push(log);
  s.band = maybeAdvanceBand(s, CONTENT.vocab);
}

export function finishSession() {
  update((s) => finishSessionInternal(s));
}

// ---------- vocabulary ----------

export function reviewVocab(wordId: string, grade: Grade, exercise?: Exercise) {
  update((s) => {
    const ses = s.session;
    const day = ses?.day ?? today();
    const card = s.vocab[wordId] ?? newCard(day);
    s.vocab[wordId] = review(card, grade, day);
    if (ses) {
      ses.stats.reviews += 1;
      if (grade >= 2) ses.stats.reviewsCorrect += 1;
    }
    if (exercise && exercise.kind === "vocabSpeak") {
      // nothing else
    }
  });
}

/** New-word flow: meet -> mcq -> cloze. Records intro checks and graduates on the cloze. */
export function introMeet(wordId: string) {
  update((s) => {
    const day = s.session?.day ?? today();
    if (!s.vocab[wordId]) s.vocab[wordId] = newCard(day);
    if (s.session) s.session.intro[wordId] = true;
  });
}

export function introCheck(wordId: string, ok: boolean, final: boolean) {
  update((s) => {
    const ses = s.session;
    const day = ses?.day ?? today();
    if (ses) ses.intro[wordId] = (ses.intro[wordId] ?? true) && ok;
    if (final) {
      const card = s.vocab[wordId] ?? newCard(day);
      const passed = (ses?.intro[wordId] ?? true) && ok;
      s.vocab[wordId] = graduate(card, passed, day);
      if (ses) ses.stats.newWords += 1;
    }
  });
}

export function markKnown(wordId: string, known: boolean) {
  update((s) => {
    s.known = s.known.filter((k) => k !== wordId);
    if (known) {
      s.known.push(wordId);
      delete s.vocab[wordId];
    }
  });
}

// ---------- chunks ----------

export function meetChunk(chunkId: string) {
  update((s) => {
    const day = s.session?.day ?? today();
    if (!s.chunks[chunkId]) s.chunks[chunkId] = graduate(newCard(day), true, day);
  });
}

export function reviewChunk(chunkId: string, grade: Grade) {
  update((s) => {
    const day = s.session?.day ?? today();
    const card = s.chunks[chunkId] ?? newCard(day);
    s.chunks[chunkId] = review(card, grade, day, MAX_CHUNK_STAGE);
    if (s.session) {
      s.session.stats.reviews += 1;
      if (grade >= 2) s.session.stats.reviewsCorrect += 1;
    }
  });
}

// ---------- grammar ----------

export function lessonSeen(topicId: string) {
  update((s) => {
    const t = s.topics[topicId] ?? newTopic();
    s.topics[topicId] = { ...t, lessonSeen: true };
    if (s.session && !s.session.practicedTopics.includes(topicId)) s.session.practicedTopics.push(topicId);
  });
}

export function answerGrammar(topicId: string, itemId: string, correct: boolean, guessable: boolean, isTest = false) {
  update((s) => {
    const ses = s.session;
    const day = ses?.day ?? today();
    const t = s.topics[topicId] ?? newTopic();
    s.topics[topicId] = updateTopic(t, correct, guessable, day, itemId);
    if (ses) {
      ses.stats.grammarItems += 1;
      if (correct) ses.stats.grammarCorrect += 1;
      if (!ses.practicedTopics.includes(topicId)) ses.practicedTopics.push(topicId);
      if (isTest) {
        ses.stats.weeklyTest = ses.stats.weeklyTest ?? { score: 0, total: 0 };
        ses.stats.weeklyTest.total += 1;
        if (correct) ses.stats.weeklyTest.score += 1;
      }
    }
  });
}

export function testVocabResult(correct: boolean) {
  update((s) => {
    const ses = s.session;
    if (!ses) return;
    ses.stats.weeklyTest = ses.stats.weeklyTest ?? { score: 0, total: 0 };
    ses.stats.weeklyTest.total += 1;
    if (correct) ses.stats.weeklyTest.score += 1;
  });
}

export function answerTrap(trapId: string, correct: boolean) {
  update((s) => {
    const n = s.trapHits[trapId] ?? 0;
    s.trapHits[trapId] = correct ? Math.max(0, n - 1) : Math.min(5, n + 1);
    if (s.session) {
      s.session.stats.grammarItems += 1;
      if (correct) s.session.stats.grammarCorrect += 1;
    }
  });
}

// ---------- fluency ----------

export function oralResult(id: string, mark: 0 | 1 | 2) {
  update((s) => {
    const day = s.session?.day ?? today();
    s.used[id] = day;
    if (s.session) {
      s.session.stats.oral.total += 1;
      s.session.stats.oral.got += mark / 2;
    }
  });
}

export function fluencyRating(contentId: string, r: { fluency: number; accuracy: number; coverage: number }) {
  update((s) => {
    const day = s.session?.day ?? today();
    s.used[contentId] = day;
    if (s.session) s.session.stats.fluency.push(r);
  });
}

export function speakWriteResult(promptId: string, trapIds: string[], r: { fluency: number; accuracy: number; coverage: number }) {
  update((s) => {
    const day = s.session?.day ?? today();
    s.used[promptId] = day;
    for (const id of trapIds) s.trapHits[id] = Math.min(5, (s.trapHits[id] ?? 0) + 2);
    if (s.session) s.session.stats.fluency.push(r);
  });
}

// ---------- placement ----------

export function applyPlacement(answers: Record<string, number>, items: PlacementItem[]) {
  update((s) => {
    const byBand: Record<number, { ok: number; n: number }> = {};
    for (const it of items) {
      const ok = answers[it.id] === it.answerIndex;
      if (it.kind === "vocab" && it.band) {
        byBand[it.band] = byBand[it.band] ?? { ok: 0, n: 0 };
        byBand[it.band].n += 1;
        if (ok) byBand[it.band].ok += 1;
      } else if (it.kind === "grammar" && it.topic) {
        s.topics[it.topic] = { ...newTopic(ok ? 0.7 : 0.15), attempts: 1, correct: ok ? 1 : 0, recent: [ok ? 1 : 0] };
      }
    }
    let band: Band = 1;
    for (const b of [1, 2, 3, 4] as Band[]) {
      const r = byBand[b];
      if (r && r.ok / r.n >= 0.67) band = b;
      else break;
    }
    s.band = band;
    s.placementDone = true;
  });
}

export function skipPlacement() {
  update((s) => {
    s.placementDone = true;
    s.band = 1;
  });
}

// ---------- settings / data ----------

export function setSettings(patch: Partial<AppState["settings"]>) {
  update((s) => {
    s.settings = { ...s.settings, ...patch };
  });
}

export function exportJson(s: AppState): string {
  return JSON.stringify(s, null, 2);
}

export function importJson(raw: string): boolean {
  try {
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed || typeof parsed !== "object" || !("vocab" in parsed)) return false;
    replaceState(parsed);
    return true;
  } catch {
    return false;
  }
}

export function resetAll() {
  replaceState(defaultState());
}

export function todayDate(): string {
  return dateString();
}
