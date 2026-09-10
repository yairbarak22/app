import { describe, it, expect } from "vitest";
import { newCard, review, graduate, isLeech } from "./srs";
import { newTopic, updateTopic, scheduleTopic, isMastered, isLearned } from "./mastery";

describe("srs", () => {
  it("grows intervals on good answers", () => {
    let c = graduate(newCard(100), true, 100);
    expect(c.due).toBe(101);
    c = review(c, 2, 101);
    expect(c.interval).toBe(3);
    c = review(c, 2, 104);
    expect(c.interval).toBeGreaterThanOrEqual(7);
    expect(c.stage).toBe(4);
  });
  it("resets on again and marks leeches", () => {
    let c = graduate(newCard(0), true, 0);
    for (let i = 0; i < 6; i++) c = review(c, 0, i);
    expect(c.interval).toBe(0);
    expect(isLeech(c)).toBe(true);
    expect(c.stage).toBe(1);
  });
  it("never schedules in the past", () => {
    const c = review(graduate(newCard(0), false, 0), 1, 5);
    expect(c.due).toBeGreaterThan(5);
  });
});

describe("mastery", () => {
  it("rises with correct answers and falls with wrong ones", () => {
    let t = newTopic();
    const p0 = t.p;
    t = updateTopic(t, true, false, 1, "a");
    expect(t.p).toBeGreaterThan(p0);
    const p1 = t.p;
    t = updateTopic(t, false, false, 1, "b");
    expect(t.p).toBeLessThan(p1);
    expect(t.seen).toEqual(["a", "b"]);
  });
  it("needs attempts across days to master", () => {
    let t = newTopic();
    for (let i = 0; i < 12; i++) t = updateTopic(t, true, false, 1);
    expect(t.p).toBeGreaterThan(0.9);
    expect(isMastered(t)).toBe(false);
    expect(isLearned(t)).toBe(true);
    t = updateTopic(t, true, false, 2);
    t = updateTopic(t, true, false, 3);
    expect(isMastered(t)).toBe(true);
  });
  it("schedules longer intervals when accurate", () => {
    let t = newTopic();
    for (let i = 0; i < 8; i++) t = updateTopic(t, true, false, 1);
    t = scheduleTopic(t, 1);
    expect(t.interval).toBe(1);
    t = scheduleTopic(t, 2);
    expect(t.interval).toBe(3);
  });
});
