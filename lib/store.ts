"use client";

import { create } from "zustand";
import { showRewardedAd, skipRewardedAd } from "./ads";
import {
  applyEffect,
  buildEnding,
  FIRST_SCENARIO_ID,
  getScenario,
  INITIAL_STATS,
  rollRandomEvent,
} from "./gameLogic";
import type {
  Choice,
  Ending,
  GamePhase,
  GameStats,
  LogEntry,
  Outcome,
  RandomEvent,
} from "./types";

interface GameState {
  phase: GamePhase;
  stats: GameStats;
  currentScenarioId: string;
  /** Outcome being displayed between scenario and next year. */
  pendingOutcome: Outcome | null;
  /** RNG event that fired on the last year transition, shown with the next scenario. */
  activeRandomEvent: RandomEvent | null;
  firedEventIds: Set<string>;
  log: LogEntry[];
  ending: Ending | null;
  /** Rewarded-ad modal state. */
  adPlaying: boolean;
  adProgress: number;
  pendingAdChoice: Choice | null;

  startGame: () => void;
  pickChoice: (choice: Choice) => void;
  continueToNextYear: () => void;
  skipAd: () => void;
  restart: () => void;
}

export const useGameStore = create<GameState>((set, get) => {
  const resolveOutcome = (choice: Choice, outcome: Outcome) => {
    const { stats, currentScenarioId, log } = get();
    const scenario = getScenario(currentScenarioId);
    const nextStats = applyEffect(stats, outcome.effect);

    set({
      stats: nextStats,
      pendingOutcome: outcome,
      phase: "outcome",
      adPlaying: false,
      pendingAdChoice: null,
      log: [
        ...log,
        {
          year: scenario.year,
          age: scenario.age,
          headline: scenario.headline,
          choiceLabel: choice.label,
        },
      ],
    });

    if (nextStats.burnout >= 100) {
      set({ phase: "gameover", ending: buildEnding("burnout", nextStats) });
    }
  };

  return {
    phase: "intro",
    stats: INITIAL_STATS,
    currentScenarioId: FIRST_SCENARIO_ID,
    pendingOutcome: null,
    activeRandomEvent: null,
    firedEventIds: new Set<string>(),
    log: [],
    ending: null,
    adPlaying: false,
    adProgress: 0,
    pendingAdChoice: null,

    startGame: () => set({ phase: "scenario" }),

    pickChoice: (choice) => {
      if (get().phase !== "scenario") return;

      if (choice.requiresAd) {
        set({ adPlaying: true, adProgress: 0, pendingAdChoice: choice });
        void showRewardedAd({
          onProgress: (progress) => set({ adProgress: progress }),
        }).then((result) => {
          const pending = get().pendingAdChoice;
          if (!pending) return;
          if (result === "completed") {
            resolveOutcome(pending, pending.outcome);
          } else {
            resolveOutcome(pending, pending.adFallback ?? pending.outcome);
          }
        });
        return;
      }

      resolveOutcome(choice, choice.outcome);
    },

    skipAd: () => skipRewardedAd(),

    continueToNextYear: () => {
      const { pendingOutcome, stats, firedEventIds, log } = get();
      if (!pendingOutcome) return;

      // No `next` pointer → the content ends here (demo boundary / retirement).
      if (!pendingOutcome.next) {
        set({
          phase: "gameover",
          ending: buildEnding("demo-complete", stats),
          pendingOutcome: null,
        });
        return;
      }

      const nextScenario = getScenario(pendingOutcome.next);
      const event = rollRandomEvent(nextScenario.year, firedEventIds);

      let nextStats = stats;
      let nextLog = log;
      const nextFired = new Set(firedEventIds);
      if (event) {
        nextStats = applyEffect(stats, event.effect);
        nextFired.add(event.id);
        nextLog = [
          ...log,
          {
            year: nextScenario.year,
            age: nextScenario.age,
            headline: event.headline,
            isRandomEvent: true,
          },
        ];
      }

      set({
        stats: nextStats,
        currentScenarioId: nextScenario.id,
        pendingOutcome: null,
        activeRandomEvent: event,
        firedEventIds: nextFired,
        log: nextLog,
        phase: nextStats.burnout >= 100 ? "gameover" : "scenario",
        ending: nextStats.burnout >= 100 ? buildEnding("burnout", nextStats) : null,
      });
    },

    restart: () =>
      set({
        phase: "scenario",
        stats: INITIAL_STATS,
        currentScenarioId: FIRST_SCENARIO_ID,
        pendingOutcome: null,
        activeRandomEvent: null,
        firedEventIds: new Set<string>(),
        log: [],
        ending: null,
        adPlaying: false,
        adProgress: 0,
        pendingAdChoice: null,
      }),
  };
});
