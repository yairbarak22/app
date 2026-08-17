import { SCENARIOS } from "./scenarios";
import type {
  Ending,
  EndingKind,
  GameStats,
  RandomEvent,
  Scenario,
  StatEffect,
} from "./types";

export { SCENARIOS };

/**
 * Pure game engine + helpers. No React in this file.
 *
 * Content lives in lib/scenarios/year01.ts … year15.ts — one file per career
 * year. Each year is organized into POOLS: a hub scenario plus alternate
 * variants tagged with `slot: <hubId>`. Any `next` pointer that targets a hub
 * id resolves to a random member of that pool, so every run deals a different
 * hand of scenarios.
 *
 * Career map (Years 1–15, ages 22–36):
 *   Y1–3   Early game: Big Tech vs. startup, first layoff scare.
 *   Y4–5   Mid game setup: golden handcuffs, rocket ships, founding.
 *   Y6     THE TECH WINTER — industry-wide layoffs hit every path.
 *   Y7–11  Mid game: AI gold rush, politics, scaling, acquisitions.
 *   Y12–15 Endgame: F-U money math, IPOs, exits, and the last standup.
 */

export const STARTING_AGE = 22;

/** Passive burnout recovery applied on every year transition (the PTO you actually took). */
export const YEARLY_BURNOUT_RECOVERY = 5;

export const INITIAL_STATS: GameStats = {
  netWorth: -30_000, // student loans. welcome to the industry.
  burnout: 10,
  title: "CS Grad (Unemployed)",
};

/** Hub id of the Year 1 pool — resolve through `resolveNext` to pick an opening. */
export const FIRST_SCENARIO_ID = "y1-graduation";

// ---------------------------------------------------------------------------
// RNG EVENTS — rolled once per year transition, max one fires per year.
// Order matters: earlier entries roll first. Keep repeatable events last.
// ---------------------------------------------------------------------------

export const RANDOM_EVENTS: RandomEvent[] = [
  {
    id: "crypto-winter",
    headline: "📉 Crypto Winter",
    text:
      "Your 'diversified portfolio' (three memecoins and an NFT of a sad ape) drops 80% overnight. You stop checking the app. The app misses you.",
    effect: { netWorth: -15_000, burnout: 5 },
    probability: 0.25,
    minYear: 2,
    once: true,
  },
  {
    id: "viral-tweet",
    headline: "🚀 Viral Moment",
    text:
      "Your shitpost about daily standups ('a meeting that could have been a meeting') goes viral. You gain 40K followers and a newsletter with actual paid subscribers.",
    effect: { netWorth: 4_000, burnout: -5 },
    probability: 0.2,
    once: true,
  },
  {
    id: "market-crash",
    headline: "📉 The Correction",
    text:
      "The market drops 25% in a month and CNBC anchors start using their serious voices. Your portfolio — RSUs, index funds, dreams — takes the haircut with it. You were told this would happen. You did not believe them.",
    effect: { netWorthPct: -0.25, burnout: 5 },
    probability: 0.12,
    minYear: 5,
    once: true,
  },
  {
    id: "everything-rally",
    headline: "📈 The Everything Rally",
    text:
      "Rates drop, earnings beat, and the entire market decides to go up and to the right for a year straight. Every dollar you didn't panic-sell quietly grows a fifth. You feel like a genius. You are a passenger.",
    effect: { netWorthPct: 0.2 },
    probability: 0.12,
    minYear: 6,
    once: true,
  },
  {
    id: "angel-payout",
    headline: "🦄 The $5K Miracle",
    text:
      "That tiny check you wrote into a college friend's startup years ago — the one you'd written off entirely — just got marked up in their unicorn round. A secondary buyer wants your shares. Your best investment was a Venmo with a rocket emoji.",
    effect: { netWorth: 120_000 },
    probability: 0.08,
    minYear: 9,
    once: true,
  },
  {
    id: "back-gives-out",
    headline: "🏥 Your Back Files a Complaint",
    text:
      "Fifteen thousand hours in a chair present their invoice: your back gives out reaching for a USB cable. Physical therapy, a standing desk, and a new appreciation for the phrase 'ergonomic intervention.' The body keeps the score, and it's been keeping yours.",
    effect: { netWorth: -8_000, burnout: 10 },
    probability: 0.1,
    minYear: 7,
    once: true,
  },
  {
    id: "surprise-reorg",
    headline: "🔀 Surprise Reorg",
    text:
      "A calendar invite titled 'Org Update' appears at 4:55 PM on a Friday. New manager, new mission statement, same job. Your promo doc resets to draft. Nobody can explain why this happened, including the people who did it.",
    effect: { burnout: 10 },
    probability: 0.1,
    minYear: 4,
  },
];

// ---------------------------------------------------------------------------
// Scenario pools & lookup
// ---------------------------------------------------------------------------

const scenarioIndex = new Map(SCENARIOS.map((s) => [s.id, s]));

/**
 * Pool key → member scenario ids. A hub's key is its own id; variants join
 * their hub's pool via `slot`. Scenarios without variants form a pool of one.
 */
export const SCENARIO_POOLS: Map<string, string[]> = (() => {
  const pools = new Map<string, string[]>();
  for (const scenario of SCENARIOS) {
    const key = scenario.slot ?? scenario.id;
    pools.set(key, [...(pools.get(key) ?? []), scenario.id]);
  }
  return pools;
})();

/**
 * Resolve a `next` pointer to a concrete scenario id. Hub ids pick a random
 * pool member; ids without a pool pass through unchanged. `rng` is injectable
 * for tests.
 */
export function resolveNext(
  nextId: string,
  rng: () => number = Math.random,
): string {
  const pool = SCENARIO_POOLS.get(nextId);
  if (!pool || pool.length === 0) return nextId;
  return pool[Math.floor(rng() * pool.length)];
}

export function getScenario(id: string): Scenario {
  const scenario = scenarioIndex.get(id);
  if (!scenario) throw new Error(`Unknown scenario id: ${id}`);
  return scenario;
}

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

export function clampBurnout(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function applyEffect(stats: GameStats, effect: StatEffect): GameStats {
  const pctDelta =
    effect.netWorthPct && stats.netWorth > 0
      ? Math.round(stats.netWorth * effect.netWorthPct)
      : 0;
  return {
    netWorth: stats.netWorth + (effect.netWorth ?? 0) + pctDelta,
    burnout: clampBurnout(stats.burnout + (effect.burnout ?? 0)),
    title: effect.title ?? stats.title,
  };
}

/**
 * Roll the RNG table for a year transition. Returns the first event that fires
 * (max one per year keeps the pacing tight). `rng` is injectable for tests.
 */
export function rollRandomEvent(
  year: number,
  firedEventIds: ReadonlySet<string>,
  rng: () => number = Math.random,
): RandomEvent | null {
  for (const event of RANDOM_EVENTS) {
    if (event.minYear && year < event.minYear) continue;
    if (event.once && firedEventIds.has(event.id)) continue;
    if (rng() < event.probability) return event;
  }
  return null;
}

export function ageForYear(year: number): number {
  return STARTING_AGE - 1 + year;
}

export function buildEnding(kind: EndingKind, stats: GameStats): Ending {
  if (kind === "burnout") {
    return {
      kind,
      headline: "TOTAL BURNOUT",
      achievement:
        "Melted down in a sprint retro and moved to a cabin with no Wi-Fi. The industry sends its thoughts and prayers.",
    };
  }

  // Retired — tiered by how much you escaped with.
  const nw = stats.netWorth;
  if (nw >= 5_000_000) {
    return {
      kind,
      headline: "GENERATIONAL WEALTH",
      achievement:
        "Left with the kind of money that gets a building named after you. Your grandkids' grandkids will have opinions about yachts.",
    };
  }
  if (nw >= 1_000_000) {
    return {
      kind,
      headline: "RETIRED RICH",
      achievement:
        "Cleared seven figures and logged off on your own terms. The spreadsheet says you never have to open Jira again.",
    };
  }
  if (nw >= 250_000) {
    return {
      kind,
      headline: "COMFORTABLY OUT",
      achievement:
        "Not yacht money — freedom money. Nobody can make you attend a standup ever again, and that's worth more anyway.",
    };
  }
  return {
    kind,
    headline: "OUT OF THE GAME",
    achievement:
      "Escaped with your health and your stories, if not the bag. The industry took its cut. It always does.",
  };
}

export function formatMoney(amount: number): string {
  const abs = Math.abs(amount);
  const formatted =
    abs >= 1_000_000
      ? `$${(abs / 1_000_000).toFixed(abs % 1_000_000 === 0 ? 0 : 1)}M`
      : `$${Math.round(abs / 1_000)}K`;
  return amount < 0 ? `-${formatted}` : formatted;
}
