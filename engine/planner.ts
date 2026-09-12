import type { AppState, Block, BlockKind, Exercise, SessionState, VocabItem, CardState, GrammarTopic } from "@/lib/types";
import type { Content } from "@/content/types";
import type { Unit } from "./curriculum";
import { exerciseKey } from "./curriculum";
import { rng, shuffle, hashString } from "./rng";
import { weekday, dateString } from "./days";
import { isDue, reviewPriority, isLeech } from "./srs";
import { isMastered } from "./mastery";

/** Estimated seconds per exercise, used to fill time budgets. */
export const SECONDS: Record<Exercise["kind"], number> = {
  vocabMeet: 40, vocabMcq: 10, vocabCloze: 18, vocabProduce: 18, vocabColloc: 12, vocabSpeak: 25,
  chunkMeet: 25, chunkProduce: 15, grammarLesson: 240, grammarItem: 35, trapItem: 30, oralTranslate: 20,
  monologue: 400, quickfire: 200, retell: 240, readAloud: 180, speakWrite: 300, dailyRating: 45,
};

const BLOCK_TITLES: Record<BlockKind, string> = {
  warmup: "חימום: חזרה על מילים וביטויים",
  grammarMain: "דקדוק",
  fluencyA: "שטף: תרגום מהיר בקול",
  newWords: "מילים חדשות",
  grammarReview: "חזרה מרווחת",
  fluencyB: "משימת דיבור",
  cooldown: "סיכום",
  weeklyTest: "מבחן שבועי",
};

const SECTION_BLOCK: Record<string, BlockKind> = {
  lesson: "grammarMain",
  words: "newWords",
  drill: "grammarMain",
  oral: "fluencyA",
  speak: "fluencyB",
  wrap: "cooldown",
};

function emptyStats(): SessionState["stats"] {
  return { reviews: 0, reviewsCorrect: 0, newWords: 0, grammarItems: 0, grammarCorrect: 0, fluency: [], oral: { total: 0, got: 0 } };
}

function shell(unitId: string | null, day: number, seed: number, blocks: Block[]): SessionState {
  return {
    unitId,
    day,
    date: dateString(new Date(day * 86400000 + new Date().getTimezoneOffset() * 60000 + 12 * 3600000)),
    seed,
    blocks: blocks.filter((b) => b.queue.length > 0),
    blockIndex: 0,
    startedAt: Date.now(),
    elapsedMs: 0,
    stats: emptyStats(),
    intro: {},
    practicedTopics: [],
    finished: false,
  };
}

function block(kind: BlockKind, titleHe: string, queue: Exercise[], minutes?: number): Block {
  return {
    kind,
    titleHe,
    minutes: minutes ?? Math.max(1, Math.round(queue.reduce((a, e) => a + SECONDS[e.kind], 0) / 60)),
    queue,
    done: 0,
    retried: [],
  };
}

export function exerciseForStage(word: VocabItem, card: CardState, rand: () => number, content: Content): Exercise {
  const stage = card.stage;
  if (stage <= 1) return mcqFor(word, content, rand);
  if (stage === 2) return { kind: "vocabCloze", wordId: word.id };
  if (stage === 3) return { kind: "vocabProduce", wordId: word.id };
  if (stage === 4) return word.colloc ? { kind: "vocabColloc", wordId: word.id } : { kind: "vocabProduce", wordId: word.id };
  return rand() < 0.5 ? { kind: "vocabSpeak", wordId: word.id } : { kind: "vocabProduce", wordId: word.id };
}

export function mcqFor(word: VocabItem, content: Content, rand: () => number): Exercise {
  const pool = content.vocab.filter((v) => v.id !== word.id && v.pos === word.pos && v.he !== word.he);
  const alt = pool.length >= 3 ? pool : content.vocab.filter((v) => v.id !== word.id && v.he !== word.he);
  const distractors = shuffle(alt, rand).slice(0, 3).map((v) => v.he);
  const options = shuffle([word.he, ...distractors], rand);
  return { kind: "vocabMcq", wordId: word.id, options, answerIndex: options.indexOf(word.he) };
}

/** Fill a queue up to a time budget, always keeping at least one exercise. */
function fill(queue: Exercise[], seconds: number): Exercise[] {
  const out: Exercise[] = [];
  let used = 0;
  for (const e of queue) {
    if (used + SECONDS[e.kind] > seconds && out.length > 0) break;
    out.push(e);
    used += SECONDS[e.kind];
  }
  return out;
}

/** Vocabulary and chunk cards that are due today, hardest first. */
export function dueReviewQueue(state: AppState, content: Content, day: number, rand: () => number): Exercise[] {
  const dueVocab = Object.entries(state.vocab)
    .filter(([, c]) => c.reps > 0 && isDue(c, day))
    .sort((a, b) => reviewPriority(b[1], day) - reviewPriority(a[1], day));
  const dueChunks = Object.entries(state.chunks).filter(([, c]) => c.reps > 0 && isDue(c, day));

  const vocabEx = dueVocab
    .map(([id, c]) => {
      const w = content.vocabById.get(id);
      return w ? exerciseForStage(w, c, rand, content) : null;
    })
    .filter((e): e is Exercise => !!e);
  const chunkEx: Exercise[] = dueChunks.map(([id]) => ({ kind: "chunkProduce", chunkId: id }));

  // one chunk after every five words, so the warm-up does not turn into a word list
  const out: Exercise[] = [];
  let ci = 0;
  vocabEx.forEach((e, i) => {
    out.push(e);
    if ((i + 1) % 5 === 0 && ci < chunkEx.length) out.push(chunkEx[ci++]);
  });
  while (ci < chunkEx.length) out.push(chunkEx[ci++]);

  // a leech is re-introduced before it is tested again
  for (const [id, c] of dueVocab) if (isLeech(c) && content.vocabById.has(id)) out.unshift({ kind: "vocabMeet", wordId: id });
  return out;
}

/** Grammar topics whose spaced review has come due, weakest first, plus personal traps. */
function reviewQueue(state: AppState, content: Content, day: number, rand: () => number, excludeTopic?: string | null): Exercise[] {
  const out: Exercise[] = [];
  const dueTopics = content.topics
    .filter((t) => {
      const ts = state.topics[t.id];
      return ts && ts.attempts > 0 && ts.due <= day && t.id !== excludeTopic && !isMastered(ts);
    })
    .sort((a, b) => state.topics[a.id].p - state.topics[b.id].p)
    .slice(0, 3);
  for (const t of dueTopics) {
    const seen = new Set(state.topics[t.id]?.seen ?? []);
    const fresh = t.items.filter((i) => !seen.has(i.id));
    const pool = fresh.length >= 4 ? fresh : t.items;
    for (const it of shuffle(pool, rand).slice(0, 4)) out.push({ kind: "grammarItem", topicId: t.id, itemId: it.id });
  }
  const trapIds = Object.entries(state.trapHits)
    .filter(([, n]) => n > 0)
    .map(([id]) => id);
  for (const tid of shuffle(trapIds, rand).slice(0, 2)) {
    const trap = content.trapById.get(tid);
    if (trap?.drills.length) out.splice(Math.min(out.length, 2), 0, { kind: "trapItem", trapId: tid, itemId: shuffle(trap.drills, rand)[0].id });
  }
  return out;
}

/**
 * A unit run: the exercises of the unit that are not done yet, preceded by a short
 * warm-up of whatever is due for review today. Review exercises are deliberately
 * outside the unit, so they never inflate its progress.
 */
export function buildUnitSession(state: AppState, content: Content, unit: Unit, day: number, opts: { reviewMinutes?: number; restart?: boolean } = {}): SessionState {
  const seed = hashString(`${unit.id}|${day}`);
  const rand = rng(seed);
  const done = new Set(opts.restart ? [] : (state.units[unit.id]?.done ?? []));
  const blocks: Block[] = [];

  const warm = fill(dueReviewQueue(state, content, day, rand), (opts.reviewMinutes ?? 8) * 60);
  if (warm.length) blocks.push(block("warmup", BLOCK_TITLES.warmup, warm));

  for (const section of unit.sections) {
    const remaining = section.exercises.filter((e) => !done.has(exerciseKey(e)));
    if (!remaining.length) continue;
    blocks.push(block(SECTION_BLOCK[section.kind] ?? "grammarMain", section.titleHe, remaining, section.minutes));
  }

  return shell(unit.id, day, seed, blocks);
}

/** A review-only session: no new material, just what is due. On Saturdays, a mixed test. */
export function buildReviewSession(state: AppState, content: Content, day: number, minutes = 20): SessionState {
  const seed = hashString(`review|${day}`);
  const rand = rng(seed);
  const blocks: Block[] = [];
  const isTestDay = weekday(day) === 6;

  const warm = fill(dueReviewQueue(state, content, day, rand), Math.round(minutes * 0.55) * 60);
  if (warm.length) blocks.push(block("warmup", BLOCK_TITLES.warmup, warm));

  if (isTestDay) {
    const practiced = content.topics.filter((t) => (state.topics[t.id]?.attempts ?? 0) > 0);
    const test: Exercise[] = [];
    const per = practiced.length ? Math.max(1, Math.ceil(12 / practiced.length)) : 0;
    for (const t of shuffle(practiced, rand)) {
      for (const it of shuffle(t.items, rand).slice(0, per)) if (test.length < 12) test.push({ kind: "grammarItem", topicId: t.id, itemId: it.id });
    }
    const introduced = Object.entries(state.vocab).filter(([, c]) => c.reps > 0 && c.stage >= 2);
    for (const [id] of shuffle(introduced, rand).slice(0, 8)) test.push({ kind: "vocabCloze", wordId: id });
    if (test.length) blocks.push(block("weeklyTest", BLOCK_TITLES.weeklyTest, shuffle(test, rand)));
  } else {
    const rev = fill(reviewQueue(state, content, day, rand), Math.round(minutes * 0.45) * 60);
    if (rev.length) blocks.push(block("grammarReview", BLOCK_TITLES.grammarReview, rev));
  }

  blocks.push(block("cooldown", BLOCK_TITLES.cooldown, [{ kind: "dailyRating" }]));
  return shell(null, day, seed, blocks);
}

export function sessionMinutes(s: SessionState): number {
  return s.blocks.reduce((a, b) => a + b.minutes, 0);
}

export function sessionTotals(s: SessionState): { done: number; all: number } {
  return {
    all: s.blocks.reduce((a, b) => a + b.queue.length, 0),
    done: s.blocks.reduce((a, b) => a + b.done, 0),
  };
}

/** True when a grammar topic still has unanswered items — used by the unit list. */
export function topicUnseen(state: AppState, topic: GrammarTopic): number {
  const seen = new Set(state.topics[topic.id]?.seen ?? []);
  return topic.items.filter((i) => !seen.has(i.id)).length;
}
