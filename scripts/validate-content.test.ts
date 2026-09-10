/// <reference types="vite/client" />
import { describe, it, expect } from "vitest";
import type {
  VocabItem,
  GrammarTopic,
  GrammarItem,
  ChunkItem,
  InterferenceTrap,
  SpeakingPrompt,
  QASet,
  RetellStory,
  ReadAloudScript,
  OralTranslation,
} from "@/lib/types";

type Mod = Record<string, unknown>;
const vocabMods = import.meta.glob<Mod>("../content/vocab/*.ts", { eager: true });
const grammarMods = import.meta.glob<Mod>("../content/grammar/*.ts", { eager: true });
const fluencyMods = import.meta.glob<Mod>("../content/fluency/*.ts", { eager: true });
const chunkMods = import.meta.glob<Mod>("../content/chunks.ts", { eager: true });
const trapMods = import.meta.glob<Mod>("../content/interference.ts", { eager: true });

function collect<T>(mods: Record<string, Mod>, pick: (v: unknown) => v is T): { file: string; item: T }[] {
  const out: { file: string; item: T }[] = [];
  for (const [file, mod] of Object.entries(mods)) {
    if (file.endsWith("index.ts") || /\/_[^/]*$/.test(file)) continue;
    for (const val of Object.values(mod)) {
      if (Array.isArray(val)) for (const x of val) if (pick(x)) out.push({ file, item: x });
      else if (pick(val)) out.push({ file, item: val });
    }
  }
  return out;
}

const isVocab = (v: unknown): v is VocabItem => !!v && typeof v === "object" && "cloze" in v && "he" in v && "word" in v;
const isTopic = (v: unknown): v is GrammarTopic => !!v && typeof v === "object" && "lesson" in v && "items" in v;
const isChunk = (v: unknown): v is ChunkItem => !!v && typeof v === "object" && "useHe" in v;
const isTrap = (v: unknown): v is InterferenceTrap => !!v && typeof v === "object" && "pattern" in v && "drills" in v;
const isPrompt = (v: unknown): v is SpeakingPrompt => !!v && typeof v === "object" && "keywords" in v && "model" in v;
const isQA = (v: unknown): v is QASet => !!v && typeof v === "object" && "questions" in v;
const isStory = (v: unknown): v is RetellStory => !!v && typeof v === "object" && "points" in v;
const isScript = (v: unknown): v is ReadAloudScript => !!v && typeof v === "object" && "words" in v && "text" in v;
const isOral = (v: unknown): v is OralTranslation => !!v && typeof v === "object" && "he" in v && "en" in v && !("cloze" in v);

function checkItem(it: GrammarItem, where: string, errors: string[]) {
  const w = `${where}/${it.id}`;
  if (!it.explainHe || it.explainHe.trim().length < 5) errors.push(`${w}: explainHe missing`);
  if (!/[֐-׿]/.test(it.explainHe)) errors.push(`${w}: explainHe must be Hebrew`);
  switch (it.type) {
    case "gap":
      if ((it.prompt.match(/___/g) ?? []).length !== 1) errors.push(`${w}: gap prompt needs exactly one ___`);
      if (!it.answer.trim()) errors.push(`${w}: empty answer`);
      break;
    case "mcq":
      if (it.options.length < 2 || it.options.length > 4) errors.push(`${w}: mcq needs 2-4 options`);
      if (it.answerIndex < 0 || it.answerIndex >= it.options.length) errors.push(`${w}: answerIndex out of range`);
      if (new Set(it.options.map((o) => o.text.trim().toLowerCase())).size !== it.options.length) errors.push(`${w}: duplicate options`);
      break;
    case "fix":
      if (it.prompt.trim().toLowerCase() === it.answer.trim().toLowerCase()) errors.push(`${w}: fix answer equals prompt`);
      break;
    case "transform":
      if (!it.answer.toLowerCase().includes(it.keyword.toLowerCase().split(" ")[0])) errors.push(`${w}: transform answer must contain keyword`);
      break;
    case "order": {
      const norm = (s: string) => s.toLowerCase().replace(/[.,?!']/g, "").split(/\s+/).filter(Boolean).sort().join(" ");
      if (norm(it.words.join(" ")) !== norm(it.answer)) errors.push(`${w}: order words do not match answer`);
      break;
    }
    case "translate":
      if (!/[֐-׿]/.test(it.he)) errors.push(`${w}: translate.he must be Hebrew`);
      break;
  }
}

describe("vocabulary", () => {
  const all = collect(vocabMods, isVocab);
  it("has items", () => expect(all.length).toBeGreaterThan(0));
  it("is well-formed", () => {
    const errors: string[] = [];
    const ids = new Map<string, string>();
    const words = new Map<string, string>();
    for (const { file, item } of all) {
      const w = `${file}/${item.id}`;
      if (!item.id.startsWith("v-")) errors.push(`${w}: id must start with v-`);
      if (ids.has(item.id)) errors.push(`${w}: duplicate id (also in ${ids.get(item.id)})`);
      ids.set(item.id, file);
      const key = `${item.word.toLowerCase()}|${item.pos}`;
      if (words.has(key)) errors.push(`${w}: duplicate word "${item.word}" (also in ${words.get(key)})`);
      words.set(key, file);
      if ((item.cloze.match(/___/g) ?? []).length !== 1) errors.push(`${w}: cloze needs exactly one ___`);
      const ans = (item.clozeAnswer ?? item.word).toLowerCase();
      if (item.cloze.toLowerCase().includes(ans) && ans.length > 3) errors.push(`${w}: cloze reveals the answer`);
      if (!/[֐-׿]/.test(item.he)) errors.push(`${w}: he must be Hebrew`);
      if (item.examples.length !== 2 || item.examples[0] === item.examples[1]) errors.push(`${w}: need two distinct examples`);
      if (![1, 2, 3, 4].includes(item.band)) errors.push(`${w}: bad band`);
      if (item.colloc) {
        if ((item.colloc.frame.match(/___/g) ?? []).length !== 1) errors.push(`${w}: colloc frame needs one ___`);
        if (!item.colloc.options.includes(item.colloc.answer)) errors.push(`${w}: colloc options must include answer`);
        if (item.colloc.options.length < 3) errors.push(`${w}: colloc needs 3+ options`);
      }
    }
    expect(errors).toEqual([]);
  });
});

describe("grammar", () => {
  const all = collect(grammarMods, isTopic);
  it("has topics", () => expect(all.length).toBeGreaterThan(0));
  it("is well-formed", () => {
    const errors: string[] = [];
    const ids = new Set(all.map((t) => t.item.id));
    for (const { file, item: t } of all) {
      const w = `${file}/${t.id}`;
      if (!t.id.startsWith("g-")) errors.push(`${w}: id must start with g-`);
      for (const p of t.prereqs) if (!ids.has(p)) errors.push(`${w}: unknown prereq ${p}`);
      if (t.items.length < 12) errors.push(`${w}: only ${t.items.length} items (need 12+)`);
      if (t.lesson.explanationHe.length < 2) errors.push(`${w}: lesson needs explanationHe`);
      if (t.lesson.examples.length < 4) errors.push(`${w}: lesson needs 4+ examples`);
      const itemIds = new Set<string>();
      for (const it of t.items) {
        if (itemIds.has(it.id)) errors.push(`${w}/${it.id}: duplicate item id`);
        itemIds.add(it.id);
        checkItem(it, w, errors);
      }
    }
    // acyclic prerequisites
    const byId = new Map(all.map((t) => [t.item.id, t.item]));
    const seen = new Map<string, number>();
    const visit = (id: string, stack: string[]) => {
      if (seen.get(id) === 1) errors.push(`cycle: ${[...stack, id].join(" -> ")}`);
      if (seen.get(id)) return;
      seen.set(id, 1);
      for (const p of byId.get(id)?.prereqs ?? []) visit(p, [...stack, id]);
      seen.set(id, 2);
    };
    for (const id of ids) visit(id, []);
    expect(errors).toEqual([]);
  });
});

describe("chunks & traps", () => {
  it("chunks well-formed", () => {
    const all = collect(chunkMods, isChunk);
    const errors: string[] = [];
    const ids = new Set<string>();
    for (const { item } of all) {
      if (ids.has(item.id)) errors.push(`${item.id}: duplicate`);
      ids.add(item.id);
      if (!item.id.startsWith("c-")) errors.push(`${item.id}: id must start with c-`);
      if (!item.example.toLowerCase().includes(item.text.toLowerCase().replace(/[,.…]+$/, "").split("…")[0].trim()))
        errors.push(`${item.id}: example must contain the chunk`);
    }
    expect(errors).toEqual([]);
  });
  it("traps well-formed", () => {
    const all = collect(trapMods, isTrap);
    const errors: string[] = [];
    for (const { item } of all) {
      try {
        const re = new RegExp(item.pattern, "i");
        if (!re.test(item.wrong)) errors.push(`${item.id}: pattern does not match its own wrong example`);
        if (re.test(item.right)) errors.push(`${item.id}: pattern matches the correct sentence`);
      } catch (e) {
        errors.push(`${item.id}: invalid regex ${String(e)}`);
      }
      for (const d of item.drills) checkItem(d, item.id, errors);
    }
    expect(errors).toEqual([]);
  });
});

describe("fluency", () => {
  it("well-formed", () => {
    const errors: string[] = [];
    for (const { item } of collect(fluencyMods, isPrompt)) {
      const n = item.model.split(/\s+/).length;
      if (n < 60 || n > 170) errors.push(`${item.id}: model answer ${n} words (need 60-170)`);
      if (item.chunks.length < 2) errors.push(`${item.id}: need chunks`);
    }
    for (const { item } of collect(fluencyMods, isQA)) if (item.questions.length < 6) errors.push(`${item.id}: need 6+ questions`);
    for (const { item } of collect(fluencyMods, isStory)) {
      const n = item.text.split(/\s+/).length;
      if (n < 70 || n > 150) errors.push(`${item.id}: story ${n} words`);
      if (item.points.length < 4) errors.push(`${item.id}: need 4+ points`);
    }
    for (const { item } of collect(fluencyMods, isScript)) {
      const n = item.text.replace(/[|*]/g, " ").split(/\s+/).filter(Boolean).length;
      if (Math.abs(n - item.words) > 5) errors.push(`${item.id}: words=${item.words} but counted ${n}`);
      if (!item.text.includes("|")) errors.push(`${item.id}: script needs | pause bars`);
    }
    const ids = new Set<string>();
    for (const { item } of collect(fluencyMods, isOral)) {
      if (ids.has(item.id)) errors.push(`${item.id}: duplicate oral id`);
      ids.add(item.id);
      if (!/[֐-׿]/.test(item.he)) errors.push(`${item.id}: he must be Hebrew`);
    }
    expect(errors).toEqual([]);
  });
});
