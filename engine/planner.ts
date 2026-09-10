import type { AppState, Block, BlockKind, Exercise, SessionState, VocabItem, CardState, GrammarTopic } from "@/lib/types";
import type { Content } from "@/content/types";
import { rng, shuffle, hashString } from "./rng";
import { weekday, dateString } from "./days";
import { isDue, reviewPriority, isLeech } from "./srs";
import { isLearned, isMastered } from "./mastery";
import { newWordsToday, candidateNewWords } from "./level";

/** Estimated seconds per exercise, used to fill time budgets. */
export const SECONDS: Record<Exercise["kind"], number> = {
  vocabMeet: 40, vocabMcq: 10, vocabCloze: 18, vocabProduce: 18, vocabColloc: 12, vocabSpeak: 25,
  chunkMeet: 25, chunkProduce: 15, grammarLesson: 240, grammarItem: 35, trapItem: 30, oralTranslate: 20,
  monologue: 400, quickfire: 200, retell: 240, readAloud: 180, speakWrite: 300, dailyRating: 45,
};

const BLOCK_TITLES: Record<BlockKind, string> = {
  warmup: "חימום: חזרה על מילים וביטויים",
  grammarMain: "דקדוק: הנושא הנוכחי",
  fluencyA: "שטף א׳: תרגום מהיר בקול",
  newWords: "מילים חדשות",
  grammarReview: "דקדוק: חזרה מרווחת",
  fluencyB: "שטף ב׳: דיבור",
  cooldown: "סיכום: דבר, כתוב, בדוק",
  weeklyTest: "מבחן שבועי",
};

const BASE_MINUTES: Record<BlockKind, number> = {
  warmup: 10, grammarMain: 12, fluencyA: 6, newWords: 10, grammarReview: 6, fluencyB: 10, cooldown: 6, weeklyTest: 12,
};

export function exerciseForStage(word: VocabItem, card: CardState, rand: () => number, content: Content): Exercise {
  const stage = card.stage;
  if (stage <= 1) return mcqFor(word, content, rand);
  if (stage === 2) return { kind: "vocabCloze", wordId: word.id };
  if (stage === 3) return { kind: "vocabProduce", wordId: word.id };
  if (stage === 4) return word.colloc ? { kind: "vocabColloc", wordId: word.id } : { kind: "vocabProduce", wordId: word.id };
  // stage 5+: alternate speaking and production
  return rand() < 0.5 ? { kind: "vocabSpeak", wordId: word.id } : { kind: "vocabProduce", wordId: word.id };
}

export function mcqFor(word: VocabItem, content: Content, rand: () => number): Exercise {
  const pool = content.vocab.filter((v) => v.id !== word.id && v.pos === word.pos && v.he !== word.he);
  const alt = pool.length >= 3 ? pool : content.vocab.filter((v) => v.id !== word.id && v.he !== word.he);
  const distractors = shuffle(alt, rand).slice(0, 3).map((v) => v.he);
  const options = shuffle([word.he, ...distractors], rand);
  return { kind: "vocabMcq", wordId: word.id, options, answerIndex: options.indexOf(word.he) };
}

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

/** Topics that are unlocked: all prerequisites learned (or none). */
export function unlockedTopics(state: AppState, content: Content): GrammarTopic[] {
  return content.topics.filter((t) => t.prereqs.every((p) => {
    const ts = state.topics[p];
    return ts ? isLearned(ts) || ts.p >= 0.6 : false;
  }));
}

export function currentTopic(state: AppState, content: Content): GrammarTopic | null {
  const unlocked = unlockedTopics(state, content);
  for (const t of unlocked) {
    const ts = state.topics[t.id];
    if (!ts || !isLearned(ts)) return t;
  }
  return null;
}

/** Items of a topic not seen recently, seeded. */
function pickItems(topic: GrammarTopic, state: AppState, n: number, rand: () => number): Exercise[] {
  const seen = new Set(state.topics[topic.id]?.seen ?? []);
  const fresh = topic.items.filter((i) => !seen.has(i.id));
  const pool = fresh.length >= n ? fresh : [...fresh, ...topic.items.filter((i) => seen.has(i.id))];
  return shuffle(pool, rand).slice(0, n).map((i) => ({ kind: "grammarItem", topicId: topic.id, itemId: i.id }));
}

function lru<T extends { id: string }>(items: T[], state: AppState, rand: () => number, exclude: Set<string> = new Set()): T | null {
  const candidates = items.filter((i) => !exclude.has(i.id));
  if (!candidates.length) return null;
  const never = candidates.filter((i) => state.used[i.id] === undefined);
  if (never.length) return shuffle(never, rand)[0];
  return candidates.slice().sort((a, b) => state.used[a.id] - state.used[b.id])[0];
}

export function buildSession(state: AppState, content: Content, day: number, minutes: number): SessionState {
  const seed = hashString(`${state.createdAt}|${day}`);
  const rand = rng(seed);
  const factor = Math.max(0.25, Math.min(1.5, minutes / 60));
  const wd = weekday(day);
  const isTestDay = wd === 6; // Saturday
  const blocks: Block[] = [];
  const mk = (kind: BlockKind, queue: Exercise[], minOverride?: number): Block => {
    const mins = Math.round((minOverride ?? BASE_MINUTES[kind]) * factor);
    return { kind, titleHe: BLOCK_TITLES[kind], minutes: mins, queue: fill(queue, mins * 60), done: 0, retried: [] };
  };

  // ---- 1. warm-up: due vocab & chunk reviews
  const dueVocab = Object.entries(state.vocab)
    .filter(([, c]) => c.reps > 0 && isDue(c, day))
    .sort((a, b) => reviewPriority(b[1], day) - reviewPriority(a[1], day));
  const dueChunks = Object.entries(state.chunks).filter(([, c]) => c.reps > 0 && isDue(c, day));
  const warm: Exercise[] = [];
  const vocabEx = dueVocab.map(([id, c]) => {
    const w = content.vocabById.get(id);
    return w ? exerciseForStage(w, c, rand, content) : null;
  }).filter((e): e is Exercise => !!e);
  const chunkEx: Exercise[] = dueChunks.map(([id]) => ({ kind: "chunkProduce", chunkId: id }));
  // interleave: one chunk after every 5 vocab
  let ci = 0;
  vocabEx.forEach((e, i) => {
    warm.push(e);
    if ((i + 1) % 5 === 0 && ci < chunkEx.length) warm.push(chunkEx[ci++]);
  });
  while (ci < chunkEx.length) warm.push(chunkEx[ci++]);
  // introduce new chunks when the chunk deck is small (2 per day)
  const introducedChunks = Object.keys(state.chunks).length;
  if (introducedChunks < content.chunks.length && !isTestDay) {
    const fresh = content.chunks.filter((c) => !state.chunks[c.id]);
    for (const c of shuffle(fresh, rand).slice(0, 2)) warm.push({ kind: "chunkMeet", chunkId: c.id });
  }
  // leech rescue: re-meet leeches
  for (const [id, c] of dueVocab) if (isLeech(c) && content.vocabById.has(id)) warm.unshift({ kind: "vocabMeet", wordId: id });
  blocks.push(mk("warmup", warm, warm.length ? undefined : 1));

  const topic = currentTopic(state, content);
  const learnedTopics = content.topics.filter((t) => state.topics[t.id] && isLearned(state.topics[t.id]) && !isMastered(state.topics[t.id]));

  if (isTestDay) {
    // ---- weekly test: 12 grammar + 8 vocab
    const practiced = content.topics.filter((t) => (state.topics[t.id]?.attempts ?? 0) > 0);
    const test: Exercise[] = [];
    const per = practiced.length ? Math.max(1, Math.ceil(12 / practiced.length)) : 0;
    for (const t of shuffle(practiced, rand)) {
      for (const e of pickItems(t, state, per, rand)) if (test.length < 12) test.push(e);
    }
    const introduced = Object.entries(state.vocab).filter(([, c]) => c.reps > 0 && c.stage >= 2);
    for (const [id] of shuffle(introduced, rand).slice(0, 8)) test.push({ kind: "vocabCloze", wordId: id });
    const q = shuffle(test, rand);
    blocks.push({ kind: "weeklyTest", titleHe: BLOCK_TITLES.weeklyTest, minutes: Math.round(12 * factor), queue: q, done: 0, retried: [] });
  } else {
    // ---- 2. grammar main
    const main: Exercise[] = [];
    if (topic) {
      const ts = state.topics[topic.id];
      if (!ts?.lessonSeen) main.push({ kind: "grammarLesson", topicId: topic.id });
      const nMain = ts?.lessonSeen ? 12 : 8;
      main.push(...pickItems(topic, state, nMain, rand));
      // interleave 1-2 recent learned topics (desirable difficulty)
      const recent = learnedTopics.slice(-2);
      const inter: Exercise[] = [];
      for (const t of recent) inter.push(...pickItems(t, state, 2, rand));
      const mixed = [...main];
      inter.forEach((e, i) => mixed.splice(Math.min(mixed.length, 3 + i * 3), 0, e));
      blocks.push(mk("grammarMain", mixed));
    } else {
      // everything learned: pure review
      blocks.push(mk("grammarMain", learnedTopics.flatMap((t) => pickItems(t, state, 3, rand))));
    }

    // ---- 3. fluency A: oral translation on today's topic + recent topics
    const oralA: Exercise[] = [];
    const targetTopics = [topic?.id, ...learnedTopics.slice(-2).map((t) => t.id)].filter((x): x is string => !!x);
    const usedOral = new Set(Object.keys(state.used).filter((k) => k.startsWith("ot-") && day - state.used[k] < 14));
    const oralPool = content.oral.filter((o) => (o.topic ? targetTopics.includes(o.topic) : true) && !usedOral.has(o.id));
    const oralPoolB = content.oral.filter((o) => !usedOral.has(o.id) && !oralPool.includes(o));
    for (const o of [...shuffle(oralPool, rand), ...shuffle(oralPoolB, rand)].slice(0, 18)) oralA.push({ kind: "oralTranslate", id: o.id });
    blocks.push(mk("fluencyA", oralA));

    // ---- 4. new words
    const n = newWordsToday(state, day, factor);
    const { current, next } = candidateNewWords(state, content.vocab);
    const nNext = Math.round(n * 0.3);
    const chosen = [...shuffle(current, rand).slice(0, n - Math.min(nNext, next.length)), ...shuffle(next, rand).slice(0, nNext)].slice(0, n);
    const nw: Exercise[] = [];
    for (let i = 0; i < chosen.length; i += 4) {
      const group = chosen.slice(i, i + 4);
      for (const w of group) nw.push({ kind: "vocabMeet", wordId: w.id });
      for (const w of group) nw.push(mcqFor(w, content, rand));
      for (const w of group) nw.push({ kind: "vocabCloze", wordId: w.id });
    }
    blocks.push({ kind: "newWords", titleHe: BLOCK_TITLES.newWords, minutes: Math.round(BASE_MINUTES.newWords * factor), queue: nw, done: 0, retried: [] });
  }

  // ---- 5. grammar review: weakest due topics + trap drills
  const review: Exercise[] = [];
  const dueTopics = content.topics
    .filter((t) => {
      const ts = state.topics[t.id];
      return ts && ts.attempts > 0 && ts.due <= day && t.id !== topic?.id && !isMastered(ts);
    })
    .sort((a, b) => state.topics[a.id].p - state.topics[b.id].p)
    .slice(0, 3);
  for (const t of dueTopics) review.push(...pickItems(t, state, 4, rand));
  const trapIds = Object.entries(state.trapHits).filter(([, n]) => n > 0).map(([id]) => id);
  for (const tid of shuffle(trapIds, rand).slice(0, 2)) {
    const trap = content.trapById.get(tid);
    if (trap?.drills.length) {
      const d = shuffle(trap.drills, rand)[0];
      review.splice(Math.min(review.length, 2), 0, { kind: "trapItem", trapId: tid, itemId: d.id });
    }
  }
  if (!review.length && topic) review.push(...pickItems(topic, state, 4, rand));
  blocks.push(mk("grammarReview", review));

  // ---- 6. fluency B: rotate by weekday
  const rotation: Exercise["kind"][] = ["monologue", "quickfire", "retell", "readAloud", "monologue", "quickfire", "retell"];
  const kindB = rotation[wd];
  const fb: Exercise[] = [];
  const maxBand = Math.min(4, state.band + 1);
  if (kindB === "monologue") {
    const p = lru(content.prompts.filter((p) => p.band <= maxBand), state, rand) ?? lru(content.prompts, state, rand);
    if (p) fb.push({ kind: "monologue", promptId: p.id });
  } else if (kindB === "quickfire") {
    const q = lru(content.qaSets, state, rand);
    if (q) fb.push({ kind: "quickfire", setId: q.id });
  } else if (kindB === "retell") {
    const s = lru(content.stories, state, rand);
    if (s) fb.push({ kind: "retell", storyId: s.id });
    const sc = lru(content.scripts, state, rand);
    if (sc && factor >= 1) fb.push({ kind: "readAloud", scriptId: sc.id });
  } else {
    const sc = lru(content.scripts, state, rand);
    if (sc) fb.push({ kind: "readAloud", scriptId: sc.id });
    const q = lru(content.qaSets, state, rand);
    if (q && factor >= 1) fb.push({ kind: "quickfire", setId: q.id });
  }
  if (factor >= 0.5) blocks.push({ kind: "fluencyB", titleHe: BLOCK_TITLES.fluencyB, minutes: Math.round(BASE_MINUTES.fluencyB * factor), queue: fb, done: 0, retried: [] });

  // ---- 7. cool-down: speak-then-write + rating
  const cool: Exercise[] = [];
  const usedPromptIds = new Set(fb.filter((e) => e.kind === "monologue").map((e) => (e as { promptId: string }).promptId));
  const sw = lru(content.prompts.filter((p) => p.band <= maxBand), state, rand, usedPromptIds) ?? lru(content.prompts, state, rand, usedPromptIds);
  if (sw && factor >= 0.5) cool.push({ kind: "speakWrite", promptId: sw.id });
  cool.push({ kind: "dailyRating" });
  blocks.push({ kind: "cooldown", titleHe: BLOCK_TITLES.cooldown, minutes: Math.round(BASE_MINUTES.cooldown * factor), queue: cool, done: 0, retried: [] });

  return {
    day,
    date: dateString(new Date(day * 86400000 + new Date().getTimezoneOffset() * 60000 + 12 * 3600000)),
    seed,
    blocks: blocks.filter((b) => b.queue.length > 0),
    blockIndex: 0,
    startedAt: Date.now(),
    elapsedMs: 0,
    stats: { reviews: 0, reviewsCorrect: 0, newWords: 0, grammarItems: 0, grammarCorrect: 0, fluency: [], oral: { total: 0, got: 0 } },
    intro: {},
    practicedTopics: [],
    finished: false,
  };
}

export function sessionMinutes(s: SessionState): number {
  return s.blocks.reduce((a, b) => a + b.minutes, 0);
}
