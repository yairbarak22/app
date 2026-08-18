"use client";

import { create } from "zustand";
import { showRewardedAd, skipRewardedAd } from "./ads";
import {
  applyEffect,
  buildEnding,
  checkStatAchievements,
  FIRST_SCENARIO_ID,
  getAchievement,
  getScenario,
  INITIAL_STATS,
  resolveGamble,
  resolveNext,
  rollRandomEvent,
  titleAchievements,
  YEARLY_BURNOUT_RECOVERY,
} from "./gameLogic";
import type {
  Achievement,
  Choice,
  Ending,
  GamePhase,
  GameStats,
  LogEntry,
  Outcome,
  RandomEvent,
} from "./types";

/** The roll banner shown on the outcome screen after a risky choice. */
export interface RollResult {
  chance: number;
  label: string;
  /** True when the roll landed the gamble's best payout. */
  won: boolean;
}

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
  /** Which gamble outcome the dice picked (null for deterministic choices). */
  lastRoll: RollResult | null;
  /** Achievement ids unlocked this run, in unlock order. */
  unlocked: string[];
  /** Achievements unlocked by the current outcome — shown as toasts. */
  pendingUnlocks: Achievement[];
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
  interface ResolveContext {
    roll?: RollResult;
    /** Extra achievement ids from engine detection (luck, favors). */
    extraAchievements?: string[];
  }

  const resolveOutcome = (
    choice: Choice,
    outcome: Outcome,
    context: ResolveContext = {},
  ) => {
    const { stats, currentScenarioId, log, unlocked } = get();
    const scenario = getScenario(currentScenarioId);
    const afterEffect = applyEffect(stats, outcome.effect);

    // Burnout death is checked on the raw outcome — prizes can't resurrect you.
    if (afterEffect.burnout >= 100) {
      set({
        stats: afterEffect,
        pendingOutcome: outcome,
        phase: "gameover",
        ending: buildEnding("burnout", afterEffect),
        lastRoll: context.roll ?? null,
        pendingUnlocks: [],
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
      return;
    }

    // Collect newly unlocked achievements: explicit tag → title-derived →
    // engine-detected (luck/favor) → stat milestones.
    const candidates: string[] = [];
    if (outcome.achievement) candidates.push(outcome.achievement);
    if (outcome.effect.title) candidates.push(...titleAchievements(outcome.effect.title));
    candidates.push(...(context.extraAchievements ?? []));
    candidates.push(...checkStatAchievements(stats, afterEffect, scenario.year));

    const alreadyUnlocked = new Set(unlocked);
    const newIds: string[] = [];
    for (const id of candidates) {
      if (!alreadyUnlocked.has(id) && !newIds.includes(id)) newIds.push(id);
    }

    // Apply each achievement's prize on unlock.
    let finalStats = afterEffect;
    const newAchievements = newIds.map((id) => getAchievement(id));
    for (const achievement of newAchievements) {
      if (achievement.reward) finalStats = applyEffect(finalStats, achievement.reward);
    }

    set({
      stats: finalStats,
      pendingOutcome: outcome,
      phase: "outcome",
      lastRoll: context.roll ?? null,
      unlocked: [...unlocked, ...newIds],
      pendingUnlocks: newAchievements,
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
    lastRoll: null,
    unlocked: [],
    pendingUnlocks: [],
    adPlaying: false,
    adProgress: 0,
    pendingAdChoice: null,

    startGame: () =>
      set({ phase: "scenario", currentScenarioId: resolveNext(FIRST_SCENARIO_ID) }),

    pickChoice: (choice) => {
      if (get().phase !== "scenario") return;

      // Risky choice: roll against the odds the player just read.
      if (choice.gamble) {
        const picked = resolveGamble(choice.gamble);
        const extraAchievements: string[] = [];
        // Win/loss is relative to the gamble's other outcomes, not absolute.
        const payouts = choice.gamble.map((g) => g.effect.netWorth ?? 0);
        const gained = picked.effect.netWorth ?? 0;
        const wonBest = gained === Math.max(...payouts);
        const gotWorst = gained === Math.min(...payouts);
        if (wonBest && picked.chance <= 0.3) extraAchievements.push("against-the-odds");
        if (gotWorst && picked.chance <= 0.35) extraAchievements.push("snake-eyes");
        resolveOutcome(choice, picked, {
          roll: { chance: picked.chance, label: picked.label, won: wonBest },
          extraAchievements,
        });
        return;
      }

      if (choice.requiresAd && choice.outcome) {
        set({ adPlaying: true, adProgress: 0, pendingAdChoice: choice });
        void showRewardedAd({
          onProgress: (progress) => set({ adProgress: progress }),
        }).then((result) => {
          const pending = get().pendingAdChoice;
          if (!pending?.outcome) return;
          if (result === "completed") {
            resolveOutcome(pending, pending.outcome, {
              extraAchievements: ["called-a-favor"],
            });
          } else {
            resolveOutcome(pending, pending.adFallback ?? pending.outcome);
          }
        });
        return;
      }

      if (choice.outcome) resolveOutcome(choice, choice.outcome);
    },

    skipAd: () => skipRewardedAd(),

    continueToNextYear: () => {
      const { pendingOutcome, stats, firedEventIds, log } = get();
      if (!pendingOutcome) return;

      // No `next` pointer → the run ends here (retirement, exit, finale).
      if (!pendingOutcome.next) {
        set({
          phase: "gameover",
          ending: buildEnding(pendingOutcome.ending ?? "retired", stats),
          pendingOutcome: null,
        });
        return;
      }

      const nextScenario = getScenario(resolveNext(pendingOutcome.next));
      const event = rollRandomEvent(nextScenario.year, firedEventIds);

      // Passive recovery: the PTO you actually took this year.
      let nextStats = applyEffect(stats, { burnout: -YEARLY_BURNOUT_RECOVERY });
      let nextLog = log;
      const nextFired = new Set(firedEventIds);
      if (event) {
        nextStats = applyEffect(nextStats, event.effect);
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
        lastRoll: null,
        pendingUnlocks: [],
        phase: nextStats.burnout >= 100 ? "gameover" : "scenario",
        ending: nextStats.burnout >= 100 ? buildEnding("burnout", nextStats) : null,
      });
    },

    restart: () =>
      set({
        phase: "scenario",
        stats: INITIAL_STATS,
        currentScenarioId: resolveNext(FIRST_SCENARIO_ID),
        pendingOutcome: null,
        activeRandomEvent: null,
        firedEventIds: new Set<string>(),
        log: [],
        ending: null,
        lastRoll: null,
        unlocked: [],
        pendingUnlocks: [],
        adPlaying: false,
        adProgress: 0,
        pendingAdChoice: null,
      }),
  };
});
