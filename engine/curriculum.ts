import type { Exercise, GrammarTopic, Strand, VocabItem } from "@/lib/types";
import type { Content } from "@/content/types";
import { rng, shuffle, hashString } from "./rng";

/**
 * The course is a fixed ladder of units, not a stream of daily surprises: the
 * learner can see the whole road, jump anywhere, and pick up a half-finished unit.
 * Units are derived from the content bank by a pure function, so the same content
 * always produces the same syllabus — a saved position never points somewhere else
 * after a rebuild.
 */

export type SectionKind = "lesson" | "words" | "drill" | "oral" | "speak" | "wrap";

export interface UnitSection {
  id: string;
  kind: SectionKind;
  titleHe: string;
  exercises: Exercise[];
  minutes: number;
}

export interface Unit {
  id: string; // "u07"
  number: number; // 1-based
  kind: "teach" | "review";
  titleHe: string;
  subtitleHe: string;
  strand: Strand;
  chapterHe: string;
  topicId: string | null;
  wordIds: string[];
  chunkIds: string[];
  sections: UnitSection[];
  minutes: number;
  total: number; // exercises in the unit, the denominator of its progress
}

export interface Chapter {
  strand: Strand;
  titleHe: string;
  units: Unit[];
}

export const CHAPTER_HE: Record<Strand, string> = {
  tenses: "זמנים",
  modals: "פעלים מודאליים",
  conditionals: "משפטי תנאי",
  "passive-reported": "סביל ודיבור עקיף",
  questions: "שאלות",
  "articles-nouns": "תוויות ושמות עצם",
  prepositions: "מילות יחס",
  "verb-patterns": "תבניות פועל",
  clauses: "פסוקיות והשוואה",
  "word-order": "סדר מילים",
};

/** Rough seconds per exercise, used to show an honest time estimate per unit. */
const SECONDS: Record<Exercise["kind"], number> = {
  vocabMeet: 40, vocabMcq: 10, vocabCloze: 18, vocabProduce: 18, vocabColloc: 12, vocabSpeak: 25,
  chunkMeet: 25, chunkProduce: 15, grammarLesson: 240, grammarItem: 35, trapItem: 30, oralTranslate: 20,
  monologue: 400, quickfire: 200, retell: 240, readAloud: 180, speakWrite: 300, dailyRating: 45,
};

export const WORDS_PER_UNIT = 16;
export const CHUNKS_PER_UNIT = 2;
export const DRILL_ITEMS = 12; // taught in the unit; the rest feed review units and spaced review
export const ORAL_PER_UNIT = 6;
/** A review unit lands after this many teaching units. */
export const REVIEW_EVERY = 5;

/** A stable identity for an exercise, so progress survives rebuilds and re-entries. */
export function exerciseKey(e: Exercise): string {
  switch (e.kind) {
    case "vocabMeet":
    case "vocabMcq":
    case "vocabCloze":
    case "vocabProduce":
    case "vocabColloc":
    case "vocabSpeak":
      return `${e.kind}:${e.wordId}`;
    case "chunkMeet":
    case "chunkProduce":
      return `${e.kind}:${e.chunkId}`;
    case "grammarLesson":
      return `lesson:${e.topicId}`;
    case "grammarItem":
      return `item:${e.itemId}`;
    case "trapItem":
      return `trap:${e.itemId}`;
    case "oralTranslate":
      return `oral:${e.id}`;
    case "monologue":
      return `speak:${e.promptId}`;
    case "quickfire":
      return `qa:${e.setId}`;
    case "retell":
      return `retell:${e.storyId}`;
    case "readAloud":
      return `read:${e.scriptId}`;
    case "speakWrite":
      return `write:${e.promptId}`;
    case "dailyRating":
      return "rating";
  }
}

function sectionMinutes(exercises: Exercise[]): number {
  return Math.max(1, Math.round(exercises.reduce((a, e) => a + SECONDS[e.kind], 0) / 60));
}

/** Words ordered easy-first, themes mixed inside each band so a unit is never monotonous. */
export function orderedWords(vocab: readonly VocabItem[]): VocabItem[] {
  const byBand = [1, 2, 3, 4].map((b) => shuffle(vocab.filter((v) => v.band === b), rng(hashString(`band-${b}`))));
  return byBand.flat();
}

function mcqFor(word: VocabItem, pool: readonly VocabItem[], rand: () => number): Exercise {
  const sameKind = pool.filter((v) => v.id !== word.id && v.pos === word.pos && v.he !== word.he);
  const source = sameKind.length >= 3 ? sameKind : pool.filter((v) => v.id !== word.id && v.he !== word.he);
  const distractors = shuffle(source, rand).slice(0, 3).map((v) => v.he);
  const options = shuffle([word.he, ...distractors], rand);
  return { kind: "vocabMcq", wordId: word.id, options, answerIndex: options.indexOf(word.he) };
}

/** Meet four words, then recognize those four, then use them in a sentence. */
function wordSection(words: VocabItem[], chunkIds: string[], pool: readonly VocabItem[], unitId: string, rand: () => number): UnitSection {
  const exercises: Exercise[] = [];
  for (let i = 0; i < words.length; i += 4) {
    const group = words.slice(i, i + 4);
    for (const w of group) exercises.push({ kind: "vocabMeet", wordId: w.id });
    for (const w of group) exercises.push(mcqFor(w, pool, rand));
    for (const w of group) exercises.push({ kind: "vocabCloze", wordId: w.id });
  }
  for (const c of chunkIds) exercises.push({ kind: "chunkMeet", chunkId: c });
  return { id: `${unitId}-words`, kind: "words", titleHe: "מילים וביטויים חדשים", exercises, minutes: sectionMinutes(exercises) };
}

function speakingExercise(index: number, content: Content): Exercise | null {
  const kind = index % 4;
  if (kind === 0 && content.prompts.length) return { kind: "monologue", promptId: content.prompts[Math.floor(index / 4) % content.prompts.length].id };
  if (kind === 1 && content.qaSets.length) return { kind: "quickfire", setId: content.qaSets[Math.floor(index / 4) % content.qaSets.length].id };
  if (kind === 2 && content.stories.length) return { kind: "retell", storyId: content.stories[Math.floor(index / 4) % content.stories.length].id };
  if (kind === 3 && content.scripts.length) return { kind: "readAloud", scriptId: content.scripts[Math.floor(index / 4) % content.scripts.length].id };
  return null;
}

function sortedItems(topic: GrammarTopic): GrammarTopic["items"] {
  return [...topic.items].sort((a, b) => a.id.localeCompare(b.id));
}

/** Build the whole syllabus. Pure and deterministic for a given content bank. */
export function buildCurriculum(content: Content): Unit[] {
  const words = orderedWords(content.vocab);
  const chunks = [...content.chunks].sort((a, b) => a.group.localeCompare(b.group) || a.id.localeCompare(b.id));
  const topics = content.topics; // already sorted by teaching order

  // Lay out the unit skeleton first: a teaching unit per topic, a review unit after
  // every REVIEW_EVERY of them.
  const skeleton: { topic: GrammarTopic | null; covers: GrammarTopic[] }[] = [];
  let sinceReview = 0;
  const recent: GrammarTopic[] = [];
  for (const t of topics) {
    skeleton.push({ topic: t, covers: [] });
    recent.push(t);
    sinceReview++;
    if (sinceReview === REVIEW_EVERY) {
      skeleton.push({ topic: null, covers: recent.slice(-REVIEW_EVERY) });
      sinceReview = 0;
    }
  }
  if (sinceReview > 0) skeleton.push({ topic: null, covers: recent.slice(-sinceReview) });

  const unitCount = skeleton.length;
  // Spread the words evenly: the first few units take one extra rather than the last
  // unit swallowing every leftover and becoming three times the size of its siblings.
  const perUnit = Math.max(4, Math.floor(words.length / unitCount));
  const extra = Math.max(0, words.length - perUnit * unitCount);
  const wordStart = (i: number) => i * perUnit + Math.min(i, extra);

  const units: Unit[] = skeleton.map((slot, i) => {
    const number = i + 1;
    const id = `u${String(number).padStart(2, "0")}`;
    const rand = rng(hashString(id));
    const wordSlice = words.slice(wordStart(i), wordStart(i + 1));
    const chunkStart = chunks.length ? (i * CHUNKS_PER_UNIT) % chunks.length : 0;
    const chunkSlice = chunks.slice(chunkStart, chunkStart + CHUNKS_PER_UNIT);
    const sections: UnitSection[] = [];

    const strand: Strand = slot.topic?.strand ?? slot.covers[slot.covers.length - 1]?.strand ?? "tenses";

    // 1. the lesson (teaching units only)
    if (slot.topic) {
      const ex: Exercise[] = [{ kind: "grammarLesson", topicId: slot.topic.id }];
      sections.push({ id: `${id}-lesson`, kind: "lesson", titleHe: "השיעור", exercises: ex, minutes: sectionMinutes(ex) });
    }

    // 2. new words and chunks
    sections.push(wordSection(wordSlice, chunkSlice.map((c) => c.id), content.vocab, id, rand));

    // 3. grammar drill: the topic's first items, or a mix from the units under review
    const drill: Exercise[] = slot.topic
      ? sortedItems(slot.topic)
          .slice(0, DRILL_ITEMS)
          .map((it) => ({ kind: "grammarItem", topicId: slot.topic!.id, itemId: it.id }))
      : slot.covers.flatMap((t) =>
          sortedItems(t)
            .slice(DRILL_ITEMS, DRILL_ITEMS + Math.ceil(10 / Math.max(1, slot.covers.length)))
            .map((it) => ({ kind: "grammarItem" as const, topicId: t.id, itemId: it.id })),
        );
    if (drill.length) {
      sections.push({
        id: `${id}-drill`,
        kind: "drill",
        titleHe: slot.topic ? "תרגול הנושא" : "חזרה על הנושאים האחרונים",
        exercises: drill,
        minutes: sectionMinutes(drill),
      });
    }

    // 4. rapid oral translation on exactly this unit's grammar
    const topicIds = slot.topic ? [slot.topic.id] : slot.covers.map((t) => t.id);
    const oralPool = content.oral.filter((o) => o.topic && topicIds.includes(o.topic));
    const oral = (oralPool.length ? oralPool : content.oral).slice(0, ORAL_PER_UNIT);
    if (oral.length) {
      const ex: Exercise[] = oral.map((o) => ({ kind: "oralTranslate", id: o.id }));
      sections.push({ id: `${id}-oral`, kind: "oral", titleHe: "תרגום מהיר בקול", exercises: ex, minutes: sectionMinutes(ex) });
    }

    // 5. a speaking task, rotating through the four techniques
    const speak = speakingExercise(i, content);
    if (speak) sections.push({ id: `${id}-speak`, kind: "speak", titleHe: "משימת דיבור", exercises: [speak], minutes: sectionMinutes([speak]) });

    // 6. speak, write it down, get it scanned
    const prompt = content.prompts.length ? content.prompts[(i * 3 + 1) % content.prompts.length] : null;
    const wrap: Exercise[] = [];
    if (prompt) wrap.push({ kind: "speakWrite", promptId: prompt.id });
    wrap.push({ kind: "dailyRating" });
    sections.push({ id: `${id}-wrap`, kind: "wrap", titleHe: "סיכום: דבר, כתוב, בדוק", exercises: wrap, minutes: sectionMinutes(wrap) });

    const total = sections.reduce((a, s) => a + s.exercises.length, 0);
    const minutes = sections.reduce((a, s) => a + s.minutes, 0);
    const coverNames = slot.covers.map((t) => t.titleHe);
    const reviewTitle = `חזרה: ${coverNames.slice(0, 2).join(" · ")}${coverNames.length > 2 ? ` ועוד ${coverNames.length - 2}` : ""}`;

    return {
      id,
      number,
      kind: slot.topic ? "teach" : "review",
      titleHe: slot.topic ? slot.topic.titleHe : reviewTitle,
      subtitleHe: `${wordSlice.length} מילים · ${drill.length} תרגילי דקדוק · ${oral.length} משפטי דיבור`,
      strand,
      chapterHe: CHAPTER_HE[strand] ?? "",
      topicId: slot.topic?.id ?? null,
      wordIds: wordSlice.map((w) => w.id),
      chunkIds: chunkSlice.map((c) => c.id),
      sections,
      minutes,
      total,
    };
  });

  return units;
}

/** Group units into chapters for the table of contents, preserving unit order. */
export function chaptersOf(units: readonly Unit[]): Chapter[] {
  const out: Chapter[] = [];
  for (const u of units) {
    const last = out[out.length - 1];
    if (last && last.strand === u.strand) last.units.push(u);
    else out.push({ strand: u.strand, titleHe: u.chapterHe, units: [u] });
  }
  return out;
}

export interface UnitStatus {
  done: number;
  total: number;
  percent: number;
  state: "new" | "started" | "done";
}

export function unitStatus(unit: Unit, done: readonly string[] | undefined): UnitStatus {
  const keys = new Set(unit.sections.flatMap((s) => s.exercises.map(exerciseKey)));
  let n = 0;
  for (const k of done ?? []) if (keys.has(k)) n++;
  const total = unit.total;
  const percent = total ? Math.round((n / total) * 100) : 0;
  return { done: n, total, percent, state: n === 0 ? "new" : n >= total ? "done" : "started" };
}

/** The unit to offer on the home screen: the first one that is not finished. */
export function nextUnit(units: readonly Unit[], progress: Record<string, { done: string[] }>): Unit {
  const started = units.find((u) => {
    const st = unitStatus(u, progress[u.id]?.done);
    return st.state === "started";
  });
  if (started) return started;
  const fresh = units.find((u) => unitStatus(u, progress[u.id]?.done).state !== "done");
  return fresh ?? units[units.length - 1];
}
