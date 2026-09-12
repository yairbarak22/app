import { describe, it, expect, beforeEach } from "vitest";
import * as A from "./actions";
import { getState, replaceState, defaultState } from "./store";
import { CURRICULUM } from "./curriculum";
import { unitStatus, exerciseKey, nextUnit } from "@/engine/curriculum";
import type { Exercise } from "./types";

/**
 * Drives a whole unit through the real action layer, the way the screens do, and
 * checks that progress is credited, the unit closes, and the course moves on.
 */
function answer(ex: Exercise, correct: boolean, isNew: boolean) {
  switch (ex.kind) {
    case "grammarLesson":
      A.lessonSeen(ex.topicId);
      break;
    case "grammarItem":
      A.answerGrammar(ex.topicId, ex.itemId, correct, false);
      break;
    case "trapItem":
      A.answerTrap(ex.trapId, correct);
      break;
    case "vocabMeet":
      if (isNew) A.introMeet(ex.wordId);
      break;
    case "vocabMcq":
      if (isNew) A.introCheck(ex.wordId, correct, false);
      else A.reviewVocab(ex.wordId, correct ? 2 : 0);
      break;
    case "vocabCloze":
      if (isNew) A.introCheck(ex.wordId, correct, true);
      else A.reviewVocab(ex.wordId, correct ? 2 : 0);
      break;
    case "vocabProduce":
    case "vocabColloc":
    case "vocabSpeak":
      A.reviewVocab(ex.wordId, correct ? 2 : 0);
      break;
    case "chunkMeet":
      A.meetChunk(ex.chunkId);
      break;
    case "chunkProduce":
      A.reviewChunk(ex.chunkId, correct ? 2 : 0);
      break;
    case "oralTranslate":
      A.oralResult(ex.id, correct ? 2 : 0);
      break;
    case "monologue":
      A.fluencyRating(ex.promptId, { fluency: 2, accuracy: 2, coverage: 2 });
      break;
    case "quickfire":
      A.fluencyRating(ex.setId, { fluency: 2, accuracy: 2, coverage: 2 });
      break;
    case "retell":
      A.fluencyRating(ex.storyId, { fluency: 2, accuracy: 2, coverage: 2 });
      break;
    case "readAloud":
      A.fluencyRating(ex.scriptId, { fluency: 2, accuracy: 2, coverage: 2 });
      break;
    case "speakWrite":
      A.speakWriteResult(ex.promptId, [], { fluency: 2, accuracy: 2, coverage: 2 });
      break;
    case "dailyRating":
      A.fluencyRating("daily", { fluency: 2, accuracy: 2, coverage: 2 });
      break;
  }
}

/** Play the open session to the end. Returns how many exercises were answered. */
function playSession(allCorrect = true, limit = 2000): number {
  let n = 0;
  for (; n < limit; n++) {
    const s = getState().session;
    if (!s || s.finished) break;
    const block = s.blocks[s.blockIndex];
    if (!block) break;
    const ex = block.queue[block.done];
    if (!ex) break;
    answer(ex, allCorrect, block.kind === "newWords");
    A.advance();
  }
  return n;
}

beforeEach(() => {
  const s = defaultState();
  s.placementDone = true;
  replaceState(s);
});

describe("working through a unit", () => {
  it("credits every exercise, closes the unit, and moves the course forward", () => {
    const unit = CURRICULUM[0];
    A.startUnit(unit.id);
    expect(getState().session?.unitId).toBe(unit.id);
    expect(getState().units[unit.id].startedAt).toBeTruthy();

    const answered = playSession();
    expect(answered).toBe(unit.total); // a fresh account has nothing due, so no warm-up

    const after = getState();
    const status = unitStatus(unit, after.units[unit.id].done);
    expect(status.state).toBe("done");
    expect(status.percent).toBe(100);
    expect(after.units[unit.id].completedAt).toBeTruthy();
    expect(after.session?.finished).toBe(true);
    expect(after.history).toHaveLength(1);
    expect(after.history[0].completed).toBe(true);
    expect(nextUnit(CURRICULUM, after.units).id).toBe(CURRICULUM[1].id);
  });

  it("teaches the words and the grammar topic of that unit, not of another", () => {
    const unit = CURRICULUM[1];
    A.startUnit(unit.id);
    playSession();
    const s = getState();
    for (const id of unit.wordIds) expect(s.vocab[id]).toBeTruthy();
    expect(s.topics[unit.topicId!]).toBeTruthy();
    expect(s.topics[unit.topicId!].lessonSeen).toBe(true);
    expect(s.topics[unit.topicId!].attempts).toBeGreaterThan(5);
    const otherWord = CURRICULUM[5].wordIds[0];
    expect(s.vocab[otherWord]).toBeUndefined();
  });

  it("resumes a half-finished unit without repeating what was answered", () => {
    const unit = CURRICULUM[2];
    A.startUnit(unit.id);
    // answer a third of it, then walk away
    const third = Math.floor(unit.total / 3);
    for (let i = 0; i < third; i++) {
      const s = getState().session!;
      const block = s.blocks[s.blockIndex];
      answer(block.queue[block.done], true, block.kind === "newWords");
      A.advance();
    }
    const midway = unitStatus(unit, getState().units[unit.id].done);
    expect(midway.done).toBe(third);
    A.abandonSession();

    A.startUnit(unit.id);
    const remaining = getState().session!.blocks.reduce((a, b) => a + b.queue.length, 0);
    expect(remaining).toBe(unit.total - third);
    const answeredKeys = new Set(getState().units[unit.id].done);
    for (const b of getState().session!.blocks) for (const e of b.queue) expect(answeredKeys.has(exerciseKey(e))).toBe(false);

    playSession();
    expect(unitStatus(unit, getState().units[unit.id].done).state).toBe("done");
  });

  it("restarts a finished unit when asked, keeping the learning state", () => {
    const unit = CURRICULUM[3];
    A.startUnit(unit.id);
    playSession();
    expect(unitStatus(unit, getState().units[unit.id].done).state).toBe("done");
    const cards = Object.keys(getState().vocab).length;

    A.startUnit(unit.id, { restart: true });
    expect(unitStatus(unit, getState().units[unit.id].done).done).toBe(0);
    expect(getState().session!.blocks.reduce((a, b) => a + b.queue.length, 0)).toBe(unit.total);
    expect(Object.keys(getState().vocab).length).toBe(cards); // words stay learned
  });

  it("lets the learner jump ahead to any unit", () => {
    const far = CURRICULUM[20];
    A.startUnit(far.id);
    playSession();
    const s = getState();
    expect(unitStatus(far, s.units[far.id].done).state).toBe("done");
    expect(nextUnit(CURRICULUM, s.units).id).toBe(CURRICULUM[0].id); // earlier units are still waiting
  });

  it("does not credit the unit for review exercises done in its warm-up", () => {
    // first unit teaches words, which become due later
    const first = CURRICULUM[0];
    A.startUnit(first.id);
    playSession();

    const state = getState();
    for (const id of Object.keys(state.vocab)) state.vocab[id].due = 0; // everything is due now
    replaceState(state);

    const second = CURRICULUM[1];
    A.startUnit(second.id);
    const session = getState().session!;
    expect(session.blocks[0].kind).toBe("warmup");
    const warmSize = session.blocks[0].queue.length;
    expect(warmSize).toBeGreaterThan(0);

    playSession();
    const status = unitStatus(second, getState().units[second.id].done);
    expect(status.done).toBe(second.total);
    expect(status.total).toBe(second.total); // warm-up did not inflate the unit
  });
});

describe("review sittings", () => {
  it("never touch unit progress", () => {
    const unit = CURRICULUM[0];
    A.startUnit(unit.id);
    playSession();
    const state = getState();
    for (const id of Object.keys(state.vocab)) state.vocab[id].due = 0;
    replaceState(state);

    const before = JSON.stringify(getState().units);
    A.startReview();
    expect(getState().session?.unitId).toBeNull();
    playSession();
    expect(JSON.stringify(getState().units)).toBe(before);
  });

  it("still advance the spaced repetition schedule", () => {
    const unit = CURRICULUM[0];
    A.startUnit(unit.id);
    playSession();
    const state = getState();
    const wordId = unit.wordIds[0];
    state.vocab[wordId].due = 0;
    replaceState(state);
    const intervalBefore = getState().vocab[wordId].interval;

    A.startReview();
    playSession();
    expect(getState().vocab[wordId].interval).toBeGreaterThanOrEqual(intervalBefore);
    expect(getState().vocab[wordId].reps).toBeGreaterThan(1);
  });
});
