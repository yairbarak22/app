import { describe, it, expect } from "vitest";
import { CONTENT } from "@/content";
import { buildSession, sessionMinutes, currentTopic, unlockedTopics } from "./planner";
import { defaultState } from "@/lib/store";
import type { AppState } from "@/lib/types";
import { newCard, graduate } from "./srs";
import { newTopic, updateTopic } from "./mastery";

function fresh(): AppState {
  const s = defaultState();
  s.createdAt = "2026-01-01T00:00:00.000Z";
  s.placementDone = true;
  return s;
}

describe("content integrity", () => {
  it("has the full syllabus", () => {
    expect(CONTENT.vocab.length).toBeGreaterThan(700);
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
  it("at least one topic is unlocked on day one", () => {
    expect(unlockedTopics(fresh(), CONTENT).length).toBeGreaterThan(0);
  });
});

describe("planner", () => {
  it("builds a first session that fills about the requested time", () => {
    const s = buildSession(fresh(), CONTENT, 20000, 60);
    expect(s.blocks.length).toBeGreaterThanOrEqual(4);
    expect(sessionMinutes(s)).toBeGreaterThanOrEqual(45);
    expect(sessionMinutes(s)).toBeLessThanOrEqual(75);
    expect(s.blocks.every((b) => b.queue.length > 0)).toBe(true);
  });
  it("introduces new words with meet -> recognize -> cloze", () => {
    const s = buildSession(fresh(), CONTENT, 20000, 60);
    const nw = s.blocks.find((b) => b.kind === "newWords")!;
    expect(nw.queue.filter((e) => e.kind === "vocabMeet").length).toBeGreaterThan(0);
    expect(nw.queue.filter((e) => e.kind === "vocabMcq").length).toBeGreaterThan(0);
    expect(nw.queue.filter((e) => e.kind === "vocabCloze").length).toBeGreaterThan(0);
  });
  it("starts with a lesson for the first topic, then drills it", () => {
    const s = buildSession(fresh(), CONTENT, 20000, 60);
    const g = s.blocks.find((b) => b.kind === "grammarMain")!;
    expect(g.queue[0].kind).toBe("grammarLesson");
    expect(g.queue.filter((e) => e.kind === "grammarItem").length).toBeGreaterThan(3);
  });
  it("is deterministic for the same day and different across days", () => {
    const a = buildSession(fresh(), CONTENT, 20000, 60);
    const b = buildSession(fresh(), CONTENT, 20000, 60);
    const c = buildSession(fresh(), CONTENT, 20001, 60);
    expect(JSON.stringify(a.blocks)).toBe(JSON.stringify(b.blocks));
    expect(JSON.stringify(a.blocks)).not.toBe(JSON.stringify(c.blocks));
  });
  it("shrinks gracefully when the learner has less time", () => {
    const full = buildSession(fresh(), CONTENT, 20000, 60);
    const short = buildSession(fresh(), CONTENT, 20000, 15);
    expect(sessionMinutes(short)).toBeLessThan(sessionMinutes(full));
    expect(short.blocks.length).toBeGreaterThan(0);
    // reviews and grammar survive the cut
    expect(short.blocks.some((b) => b.kind === "grammarMain")).toBe(true);
  });
  it("schedules the weekly test on Saturday", () => {
    const s = fresh();
    const day = 20000; // a Saturday if (day+4)%7===6
    const sat = day + ((6 - ((day + 4) % 7) + 7) % 7);
    s.topics["g-past-simple"] = updateTopic(newTopic(), true, false, sat - 1, "g-past-simple-01");
    const session = buildSession(s, CONTENT, sat, 60);
    expect(session.blocks.some((b) => b.kind === "weeklyTest")).toBe(true);
    expect(session.blocks.some((b) => b.kind === "newWords")).toBe(false);
  });
  it("puts due reviews in the warm-up", () => {
    const s = fresh();
    const w = CONTENT.vocab[0];
    s.vocab[w.id] = graduate(newCard(19990), true, 19990);
    const session = buildSession(s, CONTENT, 20000, 60);
    const warm = session.blocks.find((b) => b.kind === "warmup")!;
    expect(warm.queue.some((e) => "wordId" in e && e.wordId === w.id)).toBe(true);
  });
  it("drills the traps found in the learner's own writing", () => {
    const s = fresh();
    if (!CONTENT.traps.length) return;
    s.trapHits[CONTENT.traps[0].id] = 2;
    const session = buildSession(s, CONTENT, 20000, 60);
    const review = session.blocks.find((b) => b.kind === "grammarReview")!;
    expect(review.queue.some((e) => e.kind === "trapItem")).toBe(true);
  });
  it("advances through topics as they are learned", () => {
    const s = fresh();
    const first = currentTopic(s, CONTENT)!;
    for (let i = 0; i < 12; i++) s.topics[first.id] = updateTopic(s.topics[first.id] ?? newTopic(), true, false, 1, `x${i}`);
    const next = currentTopic(s, CONTENT)!;
    expect(next.id).not.toBe(first.id);
  });
});

describe("session termination", () => {
  it("re-queues a missed exercise once, so a session always ends", () => {
    const s = fresh();
    const session = buildSession(s, CONTENT, 20000, 60);
    const b = session.blocks[1];
    const before = b.queue.length;
    const ex = b.queue[0];
    const key = JSON.stringify(ex);
    // simulate the requeue rule from lib/actions.advance
    const requeue = (block: typeof b, e: typeof ex) => {
      block.done += 1;
      const k = JSON.stringify(e);
      if (!block.retried.includes(k)) {
        block.retried.push(k);
        block.queue.splice(Math.min(block.queue.length, block.done + 6), 0, e);
      }
    };
    for (let i = 0; i < 50; i++) requeue(b, ex);
    expect(b.retried).toEqual([key]);
    expect(b.queue.length).toBe(before + 1);
  });
});
