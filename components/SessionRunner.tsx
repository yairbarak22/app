"use client";
import { useEffect, useMemo, useRef } from "react";
import type { Exercise, Grade, SessionState } from "@/lib/types";
import { CONTENT } from "@/content";
import { ProgressBar, Button, Card, Pill } from "./ui";
import { VocabMeet, VocabMcqEx, VocabClozeEx, VocabProduceEx, VocabCollocEx, VocabSpeakEx, ChunkMeetEx, ChunkProduceEx } from "./VocabExercises";
import { GrammarLesson, GrammarItemEx, TrapItemEx, isGuessable } from "./GrammarExercises";
import { OralTranslateEx, MonologueEx, QuickfireEx, RetellEx, ReadAloudEx, SpeakWriteEx, DailyRatingEx } from "./FluencyExercises";
import * as A from "@/lib/actions";
import { hashString } from "@/engine/rng";
import { unitById } from "@/lib/curriculum";
import { unitStatus } from "@/engine/curriculum";
import { useAppState } from "@/lib/store";

function exKey(e: Exercise, blockIndex: number, done: number): string {
  return `${blockIndex}:${done}:${JSON.stringify(e)}`;
}

export function SessionRunner({ session }: { session: SessionState }) {
  const state = useAppState();
  const block = session.blocks[session.blockIndex];
  const isTest = block?.kind === "weeklyTest";
  const unit = unitById(session.unitId);
  const unitProgress = unit ? unitStatus(unit, state.units[unit.id]?.done) : null;

  // Track active time: tick often, pause when the tab is hidden, and flush what is
  // left when the component unmounts so short sessions are not logged as zero.
  const lastTick = useRef(Date.now());
  useEffect(() => {
    const flush = () => {
      const now = Date.now();
      const delta = now - lastTick.current;
      lastTick.current = now;
      if (!document.hidden && delta > 0 && delta < 120000) A.addElapsed(delta);
    };
    lastTick.current = Date.now();
    const id = setInterval(flush, 5000);
    const onVisibility = () => {
      if (document.hidden) flush();
      else lastTick.current = Date.now();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
      flush();
    };
  }, []);

  const totals = useMemo(() => {
    const all = session.blocks.reduce((a, b) => a + b.queue.length, 0);
    const done = session.blocks.reduce((a, b) => a + b.done, 0);
    return { all, done };
  }, [session]);

  if (!block || session.finished) return null;
  const ex = block.queue[block.done];
  if (!ex) return null;
  const key = exKey(ex, session.blockIndex, block.done);
  const seed = hashString(key) ^ session.seed;

  const vocabDone = (wordId: string) => (g: Grade) => {
    A.reviewVocab(wordId, g);
    // failed reviews come back later in the same block
    A.advance(g === 0 ? ex : undefined);
  };

  const render = () => {
    switch (ex.kind) {
      case "vocabMeet": {
        const w = CONTENT.vocabById.get(ex.wordId);
        if (!w) return null;
        const isNew = block.kind === "newWords";
        return (
          <VocabMeet
            word={w}
            onDone={() => {
              if (isNew) A.introMeet(w.id);
              A.advance();
            }}
          />
        );
      }
      case "vocabMcq": {
        const w = CONTENT.vocabById.get(ex.wordId);
        if (!w) return null;
        const isNew = block.kind === "newWords";
        return (
          <VocabMcqEx
            word={w}
            options={ex.options}
            answerIndex={ex.answerIndex}
            onDone={(g) => {
              if (isNew) {
                A.introCheck(w.id, g >= 2, false);
                A.advance();
              } else vocabDone(w.id)(g);
            }}
          />
        );
      }
      case "vocabCloze": {
        const w = CONTENT.vocabById.get(ex.wordId);
        if (!w) return null;
        const isNew = block.kind === "newWords";
        return (
          <VocabClozeEx
            word={w}
            isTest={isTest}
            onDone={(g) => {
              if (isNew) {
                A.introCheck(w.id, g >= 2, true);
                A.advance();
              } else {
                if (isTest) A.testVocabResult(g >= 2);
                vocabDone(w.id)(g);
              }
            }}
          />
        );
      }
      case "vocabProduce": {
        const w = CONTENT.vocabById.get(ex.wordId);
        return w ? <VocabProduceEx word={w} onDone={vocabDone(w.id)} /> : null;
      }
      case "vocabColloc": {
        const w = CONTENT.vocabById.get(ex.wordId);
        return w?.colloc ? <VocabCollocEx word={w} onDone={vocabDone(w.id)} /> : null;
      }
      case "vocabSpeak": {
        const w = CONTENT.vocabById.get(ex.wordId);
        return w ? <VocabSpeakEx word={w} onDone={vocabDone(w.id)} /> : null;
      }
      case "chunkMeet": {
        const c = CONTENT.chunkById.get(ex.chunkId);
        return c ? (
          <ChunkMeetEx
            chunk={c}
            onDone={() => {
              A.meetChunk(c.id);
              A.advance();
            }}
          />
        ) : null;
      }
      case "chunkProduce": {
        const c = CONTENT.chunkById.get(ex.chunkId);
        return c ? (
          <ChunkProduceEx
            chunk={c}
            onDone={(g) => {
              A.reviewChunk(c.id, g);
              A.advance(g === 0 ? ex : undefined);
            }}
          />
        ) : null;
      }
      case "grammarLesson": {
        const t = CONTENT.topicById.get(ex.topicId);
        return t ? (
          <GrammarLesson
            topic={t}
            onDone={() => {
              A.lessonSeen(t.id);
              A.advance();
            }}
          />
        ) : null;
      }
      case "grammarItem": {
        const t = CONTENT.topicById.get(ex.topicId);
        const item = t?.items.find((i) => i.id === ex.itemId);
        if (!t || !item) return null;
        return (
          <GrammarItemEx
            item={item}
            topicTitle={t.titleHe}
            seed={seed}
            badge={isTest ? { text: "מבחן שבועי", tone: "warn" } : undefined}
            onDone={(correct) => {
              A.answerGrammar(t.id, item.id, correct, isGuessable(item), isTest);
              A.advance(correct ? undefined : ex, 8);
            }}
          />
        );
      }
      case "trapItem": {
        const trap = CONTENT.trapById.get(ex.trapId);
        const item = trap?.drills.find((d) => d.id === ex.itemId);
        if (!trap || !item) return null;
        return (
          <TrapItemEx
            trap={trap}
            item={item}
            seed={seed}
            onDone={(correct) => {
              A.answerTrap(trap.id, correct);
              A.advance();
            }}
          />
        );
      }
      case "oralTranslate": {
        const o = CONTENT.oral.find((x) => x.id === ex.id);
        return o ? (
          <OralTranslateEx
            item={o}
            onDone={(mark) => {
              A.oralResult(o.id, mark);
              A.advance();
            }}
          />
        ) : null;
      }
      case "monologue": {
        const p = CONTENT.prompts.find((x) => x.id === ex.promptId);
        return p ? (
          <MonologueEx
            prompt={p}
            chunks={CONTENT.chunks}
            onDone={(r) => {
              A.fluencyRating(p.id, r);
              A.advance();
            }}
          />
        ) : null;
      }
      case "quickfire": {
        const s = CONTENT.qaSets.find((x) => x.id === ex.setId);
        return s ? (
          <QuickfireEx
            set={s}
            onDone={(r) => {
              A.fluencyRating(s.id, r);
              A.advance();
            }}
          />
        ) : null;
      }
      case "retell": {
        const s = CONTENT.stories.find((x) => x.id === ex.storyId);
        return s ? (
          <RetellEx
            story={s}
            onDone={(r) => {
              A.fluencyRating(s.id, r);
              A.advance();
            }}
          />
        ) : null;
      }
      case "readAloud": {
        const s = CONTENT.scripts.find((x) => x.id === ex.scriptId);
        return s ? (
          <ReadAloudEx
            script={s}
            onDone={(r) => {
              A.fluencyRating(s.id, r);
              A.advance();
            }}
          />
        ) : null;
      }
      case "speakWrite": {
        const p = CONTENT.prompts.find((x) => x.id === ex.promptId);
        return p ? (
          <SpeakWriteEx
            prompt={p}
            traps={CONTENT.traps}
            onDone={(r, trapIds) => {
              A.speakWriteResult(p.id, trapIds, r);
              A.advance();
            }}
          />
        ) : null;
      }
      case "dailyRating":
        return (
          <DailyRatingEx
            onDone={(r) => {
              A.fluencyRating("daily", r);
              A.advance();
            }}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {unit && unitProgress && (
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="font-bold">
              יחידה {unit.number} · {unit.titleHe}
            </div>
            <span className="text-sm text-muted tabular-nums">
              {unitProgress.done}/{unitProgress.total} ביחידה
            </span>
          </div>
        )}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Pill tone="brand">{block.titleHe}</Pill>
            <span className="text-sm text-muted tabular-nums">
              {block.done + 1}/{block.queue.length}
            </span>
          </div>
          <span className="text-sm text-muted tabular-nums">
            שלב {session.blockIndex + 1} מתוך {session.blocks.length} · {Math.round(session.elapsedMs / 60000)} דק׳
          </span>
        </div>
        <ProgressBar value={totals.done} max={totals.all} />
      </div>

      <div key={key}>{render()}</div>

      <div className="flex justify-between items-center pt-2">
        <button type="button" onClick={() => A.skipBlock()} className="text-sm text-muted hover:underline">
          דלג על השלב הזה
        </button>
        <button
          type="button"
          onClick={() => {
            A.finishSession();
          }}
          className="text-sm text-muted hover:underline"
        >
          סיים את הסשן עכשיו
        </button>
      </div>
    </div>
  );
}
