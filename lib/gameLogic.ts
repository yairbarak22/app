import { SCENARIOS } from "./scenarios";
import type {
  Achievement,
  Ending,
  EndingKind,
  GambleOutcome,
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
// ACHIEVEMENTS — unlocked mid-run, each with a prize applied on unlock.
// Sources: stat milestones (checkStatAchievements), title changes
// (titleAchievements), explicit outcome tags, and luck (gamble/ad detection
// in the store).
// ---------------------------------------------------------------------------

export const ACHIEVEMENTS: Achievement[] = [
  // Money & survival milestones
  {
    id: "debt-free",
    icon: "🎉",
    name: "Out of the Red",
    description: "Student loans: destroyed. Net worth crossed $0.",
    reward: { burnout: -5 },
  },
  {
    id: "six-figures",
    icon: "💯",
    name: "Six Figures",
    description: "Net worth crossed $100K. The money starts working for you.",
    reward: { netWorth: 5_000 },
  },
  {
    id: "quarter-club",
    icon: "📈",
    name: "Quarter Club",
    description: "Net worth crossed $250K.",
    reward: { netWorth: 10_000 },
  },
  {
    id: "two-commas",
    icon: "🤑",
    name: "Two Commas",
    description: "Millionaire. The spreadsheet confirms it.",
    reward: { burnout: -10 },
  },
  {
    id: "generational-track",
    icon: "🏝️",
    name: "Generational Track",
    description: "Net worth crossed $3M. The grandkids are covered.",
    reward: { netWorth: 50_000 },
  },
  {
    id: "near-meltdown",
    icon: "🫠",
    name: "Near-Meltdown",
    description: "Hit 90% burnout and lived to tell. Wake-up call cashed.",
    reward: { burnout: -15 },
  },
  {
    id: "zen-engineer",
    icon: "🧘",
    name: "Zen Engineer",
    description: "Burnout at 10% or less after year 6. Teach us your ways.",
    reward: { netWorth: 10_000 },
  },
  {
    id: "decade-club",
    icon: "🎖️",
    name: "Decade Club",
    description: "Reached year 8. Officially industry furniture.",
    reward: { netWorth: 15_000 },
  },
  {
    id: "endgame",
    icon: "🏆",
    name: "The Endgame",
    description: "Reached year 12. Few careers make it this far intact.",
    reward: { netWorth: 25_000 },
  },
  // Career events
  {
    id: "founder-mode",
    icon: "🚀",
    name: "Founder Mode",
    description: "Started your own company. God help you.",
    reward: { burnout: -5 },
  },
  {
    id: "corner-office",
    icon: "👔",
    name: "Corner Office",
    description: "Reached an executive title. The meetings found you.",
    reward: { netWorth: 10_000 },
  },
  {
    id: "the-exit",
    icon: "💰",
    name: "The Exit",
    description: "Sold a company. The wire cleared. Champagne bonus included.",
    reward: { netWorth: 25_000, burnout: -10 },
  },
  {
    id: "acquihired",
    icon: "📦",
    name: "Acquihired",
    description: "Sold the team, kept the story. Retention sweetener attached.",
    reward: { netWorth: 10_000 },
  },
  {
    id: "rang-the-bell",
    icon: "🔔",
    name: "Rang the Bell",
    description: "Took a company public. IPO-pop bonus on the house.",
    reward: { netWorth: 100_000 },
  },
  {
    id: "unicorn-rider",
    icon: "🦄",
    name: "Unicorn Rider",
    description: "Rode a $1B+ valuation. The horn is real (on paper).",
    reward: { netWorth: 20_000 },
  },
  {
    id: "gave-back",
    icon: "🎓",
    name: "Gave Back",
    description: "Taught the next generation the things the docs won't say.",
    reward: { burnout: -10 },
  },
  {
    id: "big-bonus",
    icon: "💵",
    name: "The Fat Bonus",
    description: "Landed a serious bonus. Payroll asked if it was a typo.",
    reward: { netWorth: 15_000 },
  },
  {
    id: "winter-proof",
    icon: "🧊",
    name: "Winter-Proof",
    description: "Kept your job through the Tech Winter. The list lost.",
    reward: { netWorth: 10_000 },
  },
  {
    id: "boomerang",
    icon: "🪃",
    name: "Boomerang",
    description: "Left. Came back. No hard feelings, better badge photo.",
    reward: { burnout: -5 },
  },
  // Luck
  {
    id: "against-the-odds",
    icon: "🍀",
    name: "Against the Odds",
    description: "Won a gamble at 30% or worse. The dice owed you one.",
    reward: { netWorth: 10_000 },
  },
  {
    id: "snake-eyes",
    icon: "🎲",
    name: "Snake Eyes",
    description: "Lost the safe bet. Consolation beer money enclosed.",
    reward: { netWorth: 2_000 },
  },
  {
    id: "called-a-favor",
    icon: "🕊️",
    name: "Called in a Favor",
    description: "A connection saved your career at the exact right moment.",
    reward: { burnout: -5 },
  },
];

const achievementIndex = new Map(ACHIEVEMENTS.map((a) => [a.id, a]));

export function getAchievement(id: string): Achievement {
  const achievement = achievementIndex.get(id);
  if (!achievement) throw new Error(`Unknown achievement id: ${id}`);
  return achievement;
}

/** Achievements inferred automatically from a newly acquired title. */
export function titleAchievements(title: string): string[] {
  const ids: string[] = [];
  if (/Exited|Sold for Parts/i.test(title)) ids.push("the-exit");
  if (/Acquihired/i.test(title)) ids.push("acquihired");
  if (/Founder|Co-CEO/i.test(title) && !/Founding Engineer/i.test(title))
    ids.push("founder-mode");
  if (/\b(VP|CTO|Chairman|Chief|Head of Engineering|President)\b/.test(title))
    ids.push("corner-office");
  if (/Public/i.test(title)) ids.push("rang-the-bell");
  if (/Unicorn/i.test(title)) ids.push("unicorn-rider");
  if (/Professor|Adjunct|Instructor|Lecturer|Mentor/i.test(title))
    ids.push("gave-back");
  return ids;
}

/** Stat/progress milestones crossed by this turn's stat change. */
export function checkStatAchievements(
  prev: GameStats,
  next: GameStats,
  year: number,
): string[] {
  const ids: string[] = [];
  if (prev.netWorth < 0 && next.netWorth >= 0) ids.push("debt-free");
  if (prev.netWorth < 100_000 && next.netWorth >= 100_000) ids.push("six-figures");
  if (prev.netWorth < 250_000 && next.netWorth >= 250_000) ids.push("quarter-club");
  if (prev.netWorth < 1_000_000 && next.netWorth >= 1_000_000) ids.push("two-commas");
  if (prev.netWorth < 3_000_000 && next.netWorth >= 3_000_000)
    ids.push("generational-track");
  if (next.burnout >= 90 && next.burnout < 100) ids.push("near-meltdown");
  if (year >= 6 && next.burnout <= 10) ids.push("zen-engineer");
  if (year >= 8) ids.push("decade-club");
  if (year >= 12) ids.push("endgame");
  return ids;
}

/** Roll a gamble: pick one outcome according to its displayed odds. */
export function resolveGamble(
  gamble: GambleOutcome[],
  rng: () => number = Math.random,
): GambleOutcome {
  const roll = rng();
  let cumulative = 0;
  for (const outcome of gamble) {
    cumulative += outcome.chance;
    if (roll < cumulative) return outcome;
  }
  return gamble[gamble.length - 1];
}

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
