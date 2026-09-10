// ---------- Content types (authored data, never mutated at runtime) ----------

/** Vocabulary difficulty band: 1 = B1-, 2 = B1, 3 = B1+, 4 = B2 */
export type Band = 1 | 2 | 3 | 4;

export type Pos = "n" | "v" | "adj" | "adv" | "phr" | "prep" | "conj" | "other";

export interface VocabItem {
  id: string; // unique, kebab-case, e.g. "v-work-deadline"
  word: string; // headword, lowercase (phrasal verbs / collocations allowed)
  pos: Pos;
  he: string; // short Hebrew gloss (1-4 words)
  def: string; // simple English definition (B1 level words only)
  examples: [string, string]; // two natural example sentences using the word
  cloze: string; // sentence with the word replaced by ___ (exactly one ___)
  clozeAnswer?: string; // the exact form used in cloze if not the headword (e.g. "decided")
  collocations?: string[]; // 1-4 common partners, e.g. "make a decision"
  band: Band;
  tags?: string[]; // theme tags, e.g. ["work"]
  trap?: string; // Hebrew note on a common Hebrew-speaker mistake with this word
  accept?: string[]; // alternative accepted answers for production (e.g. US/UK spelling)
  /** Optional stage-4 collocation MCQ: frame has one ___, options include the answer. */
  colloc?: { frame: string; answer: string; options: string[]; whyHe?: string };
}

export interface ChunkItem {
  id: string; // "c-..."
  text: string; // the formulaic chunk, e.g. "to be honest,"
  he: string; // Hebrew meaning / function
  useHe: string; // when to use it (Hebrew, one line)
  example: string; // full sentence using the chunk
  group: "opinion" | "hedge" | "story" | "agree" | "time" | "explain" | "question" | "link" | "feeling";
}

export type Strand =
  | "tenses"
  | "modals"
  | "conditionals"
  | "passive-reported"
  | "questions"
  | "articles-nouns"
  | "prepositions"
  | "verb-patterns"
  | "clauses"
  | "word-order";

export type ErrorType =
  | "tense"
  | "aspect"
  | "agreement"
  | "article"
  | "preposition"
  | "word-order"
  | "verb-form"
  | "modal"
  | "countability"
  | "word-choice"
  | "conditional"
  | "reported"
  | "passive"
  | "question-form"
  | "interference"
  | "spelling"
  | "other";

export type GrammarItem =
  | {
      id: string;
      type: "gap"; // "She ___ (go) to work every day."
      prompt: string;
      answer: string;
      accept?: string[];
      hint?: string;
      explainHe: string;
    }
  | {
      id: string;
      type: "mcq";
      prompt: string;
      options: { text: string; errorType?: ErrorType; whyHe?: string }[];
      answerIndex: number;
      explainHe: string;
    }
  | {
      id: string;
      type: "fix"; // sentence containing exactly one error; learner rewrites it
      prompt: string;
      answer: string;
      accept?: string[];
      errorType: ErrorType;
      explainHe: string;
    }
  | {
      id: string;
      type: "transform"; // rewrite using the keyword, keeping the meaning
      prompt: string;
      keyword: string;
      answer: string;
      accept?: string[];
      explainHe: string;
    }
  | {
      id: string;
      type: "order"; // put the words in order
      words: string[];
      answer: string;
      accept?: string[];
      explainHe: string;
    }
  | {
      id: string;
      type: "translate"; // Hebrew -> English, targeting the topic structure
      he: string;
      answer: string;
      accept?: string[];
      explainHe: string;
    };

export interface GrammarTopic {
  id: string; // "g-present-perfect-vs-past"
  title: string; // English title
  titleHe: string;
  strand: Strand;
  order: number; // global teaching order (lower = earlier)
  prereqs: string[]; // topic ids
  lesson: {
    explanationHe: string[]; // 3-6 short paragraphs in Hebrew
    form: { label: string; example: string }[]; // form table rows
    examples: { en: string; he: string }[]; // 5-8 examples
    contrastHe: string[]; // "בעברית אומרים... באנגלית..." notes
    commonErrors: { wrong: string; right: string; whyHe: string }[];
  };
  items: GrammarItem[]; // 20-30 mixed items
}

export interface InterferenceTrap {
  id: string; // "i-have-years"
  titleHe: string;
  wrong: string; // typical wrong sentence
  right: string;
  explainHe: string;
  /** JS regex source (case-insensitive) that detects the error in free text. */
  pattern: string;
  drills: GrammarItem[]; // 3-6 items
}

export interface SpeakingPrompt {
  id: string;
  topicHe: string;
  prompt: string; // English question / task
  keywords: string[]; // 4-6 scaffold words
  chunks: string[]; // 3 chunk texts to use
  model: string; // 90-130 word model answer
  band: Band;
}

export interface QASet {
  id: string;
  title: string;
  questions: { q: string; model: string }[]; // 8-10, model = 1-2 sentence natural answer
}

export interface RetellStory {
  id: string;
  title: string;
  text: string; // 90-120 words, B1 level
  keywords: string[]; // 5 keywords in order
  points: string[]; // 5 content points to check
}

export interface ReadAloudScript {
  id: string;
  title: string;
  /** Text with " | " pause bars between chunks and *stars* around stressed words. */
  text: string;
  words: number; // word count (without markers)
}

export interface OralTranslation {
  id: string;
  he: string;
  en: string;
  alt?: string[];
  topic?: string; // grammar topic id this sentence targets
  vocab?: string[]; // vocab ids used
}

export interface PlacementItem {
  id: string;
  kind: "vocab" | "grammar";
  band?: Band; // for vocab
  topic?: string; // for grammar
  prompt: string;
  options: string[];
  answerIndex: number;
}

// ---------- Learner state (persisted) ----------

export type Grade = 0 | 1 | 2 | 3; // again, hard, good, easy

export interface CardState {
  stage: number; // vocab ladder 0..5 (chunks: 0..2)
  interval: number; // days
  ease: number; // SM-2 ease factor, starts 2.5
  due: number; // day index
  reps: number;
  lapses: number;
  last?: number; // day index of last review
  introduced: number; // day index
}

export interface TopicState {
  p: number; // probability the topic is known (BKT)
  attempts: number;
  correct: number;
  days: number[]; // distinct day indices with practice
  due: number; // day index for spaced review
  interval: number;
  lessonSeen: boolean;
  /** recent results, newest last, max 20 */
  recent: (0 | 1)[];
  /** recently used item ids (ring, newest last, max 40) */
  seen: string[];
}

export interface DayLog {
  day: number;
  date: string; // YYYY-MM-DD
  minutes: number;
  reviews: number;
  reviewsCorrect: number;
  newWords: number;
  grammarItems: number;
  grammarCorrect: number;
  fluency?: { fluency: number; accuracy: number; coverage: number }; // 1-3 averages
  oral?: { total: number; got: number };
  weeklyTest?: { score: number; total: number };
  completed: boolean;
}

export interface Settings {
  minutes: number; // daily target (default 60)
  newWordsPerDay: number; // default 15
  name?: string;
}

export interface AppState {
  version: 1;
  createdAt: string;
  settings: Settings;
  placementDone: boolean;
  band: Band; // current new-word band
  vocab: Record<string, CardState>;
  chunks: Record<string, CardState>;
  topics: Record<string, TopicState>;
  known: string[]; // vocab ids marked "already known"
  /** interference traps detected in the learner's own writing: trapId -> pending drill count */
  trapHits: Record<string, number>;
  /** fluency content usage: content id -> last day used */
  used: Record<string, number>;
  history: DayLog[];
  session: SessionState | null;
}

// ---------- Session (planner output, consumed by the runner) ----------

export type Exercise =
  | { kind: "vocabMeet"; wordId: string }
  | { kind: "vocabMcq"; wordId: string; options: string[]; answerIndex: number }
  | { kind: "vocabCloze"; wordId: string }
  | { kind: "vocabProduce"; wordId: string }
  | { kind: "vocabColloc"; wordId: string }
  | { kind: "vocabSpeak"; wordId: string }
  | { kind: "chunkMeet"; chunkId: string }
  | { kind: "chunkProduce"; chunkId: string }
  | { kind: "grammarLesson"; topicId: string }
  | { kind: "grammarItem"; topicId: string; itemId: string }
  | { kind: "trapItem"; trapId: string; itemId: string }
  | { kind: "oralTranslate"; id: string }
  | { kind: "monologue"; promptId: string }
  | { kind: "quickfire"; setId: string }
  | { kind: "retell"; storyId: string }
  | { kind: "readAloud"; scriptId: string }
  | { kind: "speakWrite"; promptId: string }
  | { kind: "dailyRating" };

export type BlockKind =
  | "warmup"
  | "grammarMain"
  | "fluencyA"
  | "newWords"
  | "grammarReview"
  | "fluencyB"
  | "cooldown"
  | "weeklyTest";

export interface Block {
  kind: BlockKind;
  titleHe: string;
  minutes: number;
  queue: Exercise[];
  done: number; // exercises completed in this block
  /** serialized exercises already re-queued once, so a wrong answer never loops forever */
  retried: string[];
}

export interface SessionState {
  day: number;
  date: string;
  seed: number;
  blocks: Block[];
  blockIndex: number;
  startedAt: number; // epoch ms
  elapsedMs: number; // accumulated active time
  stats: {
    reviews: number;
    reviewsCorrect: number;
    newWords: number;
    grammarItems: number;
    grammarCorrect: number;
    fluency: { fluency: number; accuracy: number; coverage: number }[];
    oral: { total: number; got: number };
    weeklyTest?: { score: number; total: number };
  };
  /** new-word introduction: wordId -> passed the in-session recognition check */
  intro: Record<string, boolean>;
  /** grammar topics practiced in this session (scheduled for spaced review at the end) */
  practicedTopics: string[];
  finished: boolean;
}
