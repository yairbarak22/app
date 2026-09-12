import { describe, it, expect } from "vitest";
import { CONTENT } from "@/content";
import { buildUnitSession, buildReviewSession, sessionMinutes, sessionTotals } from "./planner";
import { buildCurriculum, chaptersOf, exerciseKey, unitStatus, nextUnit, type Unit } from "./curriculum";
import { defaultState } from "@/lib/store";
import type { AppState } from "@/lib/types";
import { newCard, graduate } from "./srs";
import { newTopic, updateTopic } from "./mastery";

const UNITS = buildCurriculum(CONTENT);

function fresh(): AppState {
  const s = defaultState();
  s.createdAt = "2026-01-01T00:00:00.000Z";
  s.placementDone = true;
  return s;
}

describe("content integrity", () => {
  it("has the full syllabus", () => {
    expect(CONTENT.vocab.length).toBeGreaterThan(800);
    expect(CONTENT.topics.length).toBeGreaterThanOrEqual(44);
    expect(CONTENT.oral.length).toBeGreaterThanOrEqual(250);
    expect(CONTENT.chunks.length).toBeGreaterThanOrEqual(90);
  });
  it("has unique ids everywhere", () => {
    const vids = CONTENT.vocab.map((v) => v.id);
    expect(new Set(vids).size).toBe(vids.length);
    const tids = CONTENT.topics.map((t) => t.id);
    expect(new Set(tids).size).toBe(tids.length);
    const oids = CONTENT.oral.map((o) => o.id);
    expect(new Set(oids).size).toBe(oids.length);
  });
  it("every topic has a unique teaching order and resolvable prereqs", () => {
    const orders = CONTENT.topics.map((t) => t.order);
    expect(new Set(orders).size).toBe(orders.length);
    const ids = new Set(CONTENT.topics.map((t) => t.id));
    for (const t of CONTENT.topics) for (const p of t.prereqs) expect(ids.has(p)).toBe(true);
  });
});

describe("curriculum", () => {
  it("covers every grammar topic exactly once, in teaching order", () => {
    const taught = UNITS.filter((u) => u.kind === "teach").map((u) => u.topicId);
    expect(taught).toEqual(CONTENT.topics.map((t) => t.id));
  });
  it("mixes in a review unit at a regular rhythm", () => {
    const reviews = UNITS.filter((u) => u.kind === "review");
    expect(reviews.length).toBeGreaterThanOrEqual(8);
    for (const u of reviews) {
      expect(u.topicId).toBeNull();
      expect(u.sections.some((s) => s.kind === "lesson")).toBe(false);
    }
  });
  it("teaches every word once and only once", () => {
    const all = UNITS.flatMap((u) => u.wordIds);
    expect(new Set(all).size).toBe(all.length);
    expect(all.length).toBe(CONTENT.vocab.length);
  });
  it("introduces easy words before hard ones", () => {
    const band = (id: string) => CONTENT.vocabById.get(id)!.band;
    const firstUnitAvg = UNITS[0].wordIds.reduce((a, id) => a + band(id), 0) / UNITS[0].wordIds.length;
    const lastUnit = UNITS[UNITS.length - 1];
    const lastAvg = lastUnit.wordIds.reduce((a, id) => a + band(id), 0) / lastUnit.wordIds.length;
    expect(firstUnitAvg).toBeLessThan(lastAvg);
  });
  it("gives every unit a lesson or a review drill, words, speaking and a wrap-up", () => {
    for (const u of UNITS) {
      const kinds = u.sections.map((s) => s.kind);
      expect(kinds).toContain("words");
      expect(kinds).toContain("drill");
      expect(kinds).toContain("wrap");
      expect(u.total).toBeGreaterThan(20);
      expect(u.minutes).toBeGreaterThan(10);
      expect(u.minutes).toBeLessThan(90);
    }
  });
  it("targets the oral sentences at the unit's own grammar", () => {
    const unit = UNITS.find((u) => u.topicId === "g-past-simple")!;
    const oral = unit.sections.find((s) => s.kind === "oral")!;
    for (const e of oral.exercises) {
      const item = CONTENT.oral.find((o) => o.id === (e as { id: string }).id)!;
      expect(item.topic).toBe("g-past-simple");
    }
  });
  it("is deterministic", () => {
    expect(JSON.stringify(buildCurriculum(CONTENT))).toBe(JSON.stringify(UNITS));
  });
  it("groups units into chapters that keep the unit order", () => {
    const chapters = chaptersOf(UNITS);
    expect(chapters.length).toBeGreaterThan(5);
    expect(chapters.flatMap((c) => c.units.map((u) => u.number))).toEqual(UNITS.map((u) => u.number));
    for (const c of chapters) expect(c.titleHe.length).toBeGreaterThan(1);
  });
  it("uses stable exercise keys", () => {
    const keys = UNITS[0].sections.flatMap((s) => s.exercises.map(exerciseKey));
    expect(new Set(keys).size).toBe(keys.length);
    expect(keys.some((k) => k.startsWith("vocabMeet:"))).toBe(true);
  });
});

describe("unit progress", () => {
  const unit: Unit = UNITS[0];
  const keys = unit.sections.flatMap((s) => s.exercises.map(exerciseKey));

  it("counts nothing for an untouched unit", () => {
    const st = unitStatus(unit, undefined);
    expect(st).toMatchObject({ done: 0, percent: 0, state: "new" });
  });
  it("counts part of a unit in progress", () => {
    const st = unitStatus(unit, keys.slice(0, Math.floor(keys.length / 2)));
    expect(st.state).toBe("started");
    expect(st.percent).toBeGreaterThan(40);
    expect(st.percent).toBeLessThan(60);
  });
  it("marks a unit done when every exercise is done", () => {
    expect(unitStatus(unit, keys).state).toBe("done");
  });
  it("ignores keys that belong to other units", () => {
    expect(unitStatus(unit, ["item:does-not-exist", "oral:nope"]).done).toBe(0);
  });
  it("offers the first unfinished unit, preferring one already started", () => {
    const progress: Record<string, { done: string[] }> = {};
    expect(nextUnit(UNITS, progress).id).toBe(UNITS[0].id);
    progress[UNITS[0].id] = { done: keys };
    expect(nextUnit(UNITS, progress).id).toBe(UNITS[1].id);
    const u3keys = UNITS[2].sections.flatMap((s) => s.exercises.map(exerciseKey));
    progress[UNITS[2].id] = { done: u3keys.slice(0, 3) };
    expect(nextUnit(UNITS, progress).id).toBe(UNITS[2].id);
  });
});

describe("unit session", () => {
  it("runs the unit in order and fits a sensible sitting", () => {
    const s = buildUnitSession(fresh(), CONTENT, UNITS[0], 20000);
    expect(s.unitId).toBe(UNITS[0].id);
    expect(s.blocks[0].queue[0].kind).toBe("grammarLesson");
    expect(sessionMinutes(s)).toBeGreaterThan(15);
    expect(sessionMinutes(s)).toBeLessThan(80);
    expect(s.blocks.every((b) => b.queue.length > 0)).toBe(true);
  });
  it("skips what the learner already finished in that unit", () => {
    const state = fresh();
    const unit = UNITS[0];
    const keys = unit.sections.flatMap((s) => s.exercises.map(exerciseKey));
    state.units[unit.id] = { done: keys.slice(0, 30) };
    const s = buildUnitSession(state, CONTENT, unit, 20000);
    expect(sessionTotals(s).all).toBe(unit.total - 30);
  });
  it("can restart a finished unit from the beginning", () => {
    const state = fresh();
    const unit = UNITS[0];
    state.units[unit.id] = { done: unit.sections.flatMap((s) => s.exercises.map(exerciseKey)) };
    expect(sessionTotals(buildUnitSession(state, CONTENT, unit, 20000)).all).toBe(0);
    expect(sessionTotals(buildUnitSession(state, CONTENT, unit, 20000, { restart: true })).all).toBe(unit.total);
  });
  it("puts due reviews in front of the new material without counting them in the unit", () => {
    const state = fresh();
    const w = CONTENT.vocab[0];
    state.vocab[w.id] = graduate(newCard(19990), true, 19990);
    const s = buildUnitSession(state, CONTENT, UNITS[1], 20000);
    expect(s.blocks[0].kind).toBe("warmup");
    expect(s.blocks[0].queue.some((e) => "wordId" in e && e.wordId === w.id)).toBe(true);
  });
  it("is deterministic for a given unit and day", () => {
    const a = buildUnitSession(fresh(), CONTENT, UNITS[3], 20000);
    const b = buildUnitSession(fresh(), CONTENT, UNITS[3], 20000);
    expect(JSON.stringify(a.blocks)).toBe(JSON.stringify(b.blocks));
  });
});

describe("review session", () => {
  it("has something to do even on a fresh account", () => {
    const s = buildReviewSession(fresh(), CONTENT, 20000);
    expect(s.unitId).toBeNull();
    expect(s.blocks.length).toBeGreaterThan(0);
  });
  it("reviews due cards and weak topics", () => {
    const state = fresh();
    const w = CONTENT.vocab[5];
    state.vocab[w.id] = graduate(newCard(19990), true, 19990);
    state.topics["g-past-simple"] = { ...updateTopic(newTopic(), false, false, 19990, "x"), due: 0 };
    const s = buildReviewSession(state, CONTENT, 19998); // a Wednesday, not the test day
    expect(s.blocks.some((b) => b.kind === "warmup")).toBe(true);
    expect(s.blocks.some((b) => b.kind === "grammarReview")).toBe(true);
  });
  it("drills the traps caught in the learner's own writing", () => {
    const state = fresh();
    if (!CONTENT.traps.length) return;
    state.trapHits[CONTENT.traps[0].id] = 2;
    state.topics["g-past-simple"] = { ...updateTopic(newTopic(), false, false, 19990, "x"), due: 0 };
    const s = buildReviewSession(state, CONTENT, 19998);
    expect(s.blocks.some((b) => b.queue.some((e) => e.kind === "trapItem"))).toBe(true);
  });
  it("becomes a mixed test on Saturday", () => {
    const state = fresh();
    state.topics["g-past-simple"] = updateTopic(newTopic(), true, false, 19990, "x");
    const sat = 20000 + ((6 - ((20000 + 4) % 7) + 7) % 7);
    const s = buildReviewSession(state, CONTENT, sat);
    expect(s.blocks.some((b) => b.kind === "weeklyTest")).toBe(true);
  });
});

describe("session termination", () => {
  it("re-queues a missed exercise once, so a session always ends", () => {
    const s = buildUnitSession(fresh(), CONTENT, UNITS[0], 20000);
    const b = s.blocks[0];
    const before = b.queue.length;
    const ex = b.queue[0];
    const key = JSON.stringify(ex);
    const requeue = (blk: typeof b, e: typeof ex) => {
      blk.done += 1;
      const k = JSON.stringify(e);
      if (!blk.retried.includes(k)) {
        blk.retried.push(k);
        blk.queue.splice(Math.min(blk.queue.length, blk.done + 6), 0, e);
      }
    };
    for (let i = 0; i < 50; i++) requeue(b, ex);
    expect(b.retried).toEqual([key]);
    expect(b.queue.length).toBe(before + 1);
  });
});

describe("unit sizing", () => {
  it("keeps every unit roughly the same size", () => {
    const sizes = UNITS.map((u) => u.wordIds.length);
    expect(Math.max(...sizes) - Math.min(...sizes)).toBeLessThanOrEqual(1);
    const totals = UNITS.map((u) => u.total);
    expect(Math.max(...totals)).toBeLessThan(Math.min(...totals) * 1.6);
  });
  it("still teaches the whole word bank", () => {
    expect(UNITS.flatMap((u) => u.wordIds).length).toBe(CONTENT.vocab.length);
  });
});
