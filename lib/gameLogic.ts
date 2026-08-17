import type {
  Ending,
  EndingKind,
  GameStats,
  RandomEvent,
  Scenario,
  StatEffect,
} from "./types";

/**
 * Pure game content + pure helpers. No React in this file.
 * Writers add years here; the engine and UI never need to change.
 */

export const STARTING_AGE = 22;

export const INITIAL_STATS: GameStats = {
  netWorth: -30_000, // student loans. welcome to the industry.
  burnout: 10,
  title: "CS Grad (Unemployed)",
};

export const FIRST_SCENARIO_ID = "y1-graduation";

// ---------------------------------------------------------------------------
// SCENARIOS — Years 1–3 (demo slice for flow testing).
// Branches: Big Tech vs. Startup, with a cross-over in Year 2.
// Year 3 on the Big Tech path includes the rewarded-ad rescue choice so the
// monetization flow is testable end to end.
// ---------------------------------------------------------------------------

export const SCENARIOS: Scenario[] = [
  {
    id: "y1-graduation",
    year: 1,
    age: 22,
    headline: "Graduation Day",
    text:
      "You walk off the stage with a CS degree, $30K in student loans, and a LinkedIn banner that says 'Open to Work.' Recruiters are circling. Your roommate won't stop talking about his startup. Time to make your first real career decision.",
    choices: [
      {
        id: "grind-leetcode",
        label: "Grind 300 LeetCode problems and take the Big Tech offer",
        outcome: {
          text:
            "Six rounds, one take-home, and a system-design interview about designing Twitter later — you're in. $150K TC, a badge that opens doors, and unlimited LaCroix. Your parents finally stop asking questions.",
          effect: { netWorth: 45_000, burnout: 15, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "join-startup",
        label: "Join your roommate's seed-stage startup as employee #3",
        outcome: {
          text:
            "The pay is 'competitive for the stage' (it's not), but you got 1.5% equity and a title you made up yourself. You ship more in a month than most people do in a year. The office is a garage. Literally.",
          effect: { netWorth: 8_000, burnout: 10, title: "Founding Engineer" },
          next: "y2-startup-ramen",
        },
      },
      {
        id: "hold-out-quant",
        label: "Hold out for that quant fund offer — you're built different",
        outcome: {
          text:
            "Three months of mental math interviews and getting strung along by a hedge fund that 'loves your energy.' They ghost you after the final round. You take the Big Tech offer anyway, slightly humbled and very behind on rent.",
          effect: { netWorth: 30_000, burnout: 25, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
    ],
  },
  {
    id: "y2-bigtech-oncall",
    year: 2,
    age: 23,
    headline: "The Pager Never Sleeps",
    text:
      "You've been handed the on-call rotation for a legacy service written in 2011 by someone who now farms goats in Portugal. It pages at 3 AM. Every night. Your manager calls it 'a great growth opportunity.'",
    choices: [
      {
        id: "own-the-service",
        label: "Own it. Become the only person who understands the beast",
        outcome: {
          text:
            "You rewrite the runbook, tame the alerts, and become load-bearing infrastructure yourself. Promo to SWE II, a fat RSU refresher — and the creeping realization that you can never, ever quit.",
          effect: { netWorth: 60_000, burnout: 25, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "quiet-quit",
        label: "Do the minimum. Protect your peace, king",
        outcome: {
          text:
            "You mute the pager, coast through sprint planning, and rediscover hobbies. Your RSUs still vest. Your manager writes 'meets some expectations' on your review, which is a sentence that will age poorly.",
          effect: { netWorth: 40_000, burnout: -5, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
    ],
  },
  {
    id: "y2-startup-ramen",
    year: 2,
    age: 23,
    headline: "Ramen Profitability",
    text:
      "The startup has 7 months of runway and a burn rate the founder describes as 'aggressive but visionary.' He gathers the team (all four of you) and asks everyone to defer salary until the next round closes. It's definitely closing. Any week now.",
    choices: [
      {
        id: "defer-salary",
        label: "Believe. Defer salary for double the equity",
        outcome: {
          text:
            "You're now paid in vibes and stock options. Your diet is 40% instant noodles. But the product ships, users trickle in, and that equity stake is starting to look like it might actually mean something.",
          effect: { netWorth: -18_000, burnout: 20 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "moonlight",
        label: "Keep the faith — but moonlight freelance gigs to pay rent",
        outcome: {
          text:
            "Days: startup. Nights: fixing WordPress sites for a dentist in Ohio. Weekends: a blur. Your bank account recovers. Your sleep schedule files for divorce.",
          effect: { netWorth: 25_000, burnout: 30 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "jump-to-bigtech",
        label: "Jump ship to Big Tech before the money runs out",
        outcome: {
          text:
            "You quietly interview, land an SWE II offer, and tell the founder over coffee. He calls you a mercenary. Your new badge photo is great. Your old equity is now a PDF you keep for sentimental reasons.",
          effect: { netWorth: 50_000, burnout: 5, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
    ],
  },
  {
    id: "y3-bigtech-efficiency",
    year: 3,
    age: 24,
    headline: "The Year of Efficiency",
    text:
      "Interest rates are up and the stock is down. The CEO posts a heartfelt memo about 'doing more with less' from his third yacht. A reorg flattens your org — and a friend in HR tips you off that your name is on the list.",
    choices: [
      {
        id: "take-severance",
        label: "Take the severance package and test the job market",
        outcome: {
          text:
            "Twelve weeks of severance, a LinkedIn post with the green banner, and 400 applications into the void. The market is brutal, but you're free — and you learned to never trust a memo that contains the word 'journey.'",
          effect: { netWorth: 20_000, burnout: 20, title: "SWE II (Open to Work)" },
        },
      },
      {
        id: "pull-strings",
        label: "▶ Pull strings with leadership — watch a short video to survive the cut",
        requiresAd: true,
        outcome: {
          text:
            "Your skip-level 'goes to bat for you' after you casually mention you're the only one with prod access to the billing service. Your name vanishes from the list. Someone else's appears. You don't ask questions. Promo to Senior in the same cycle.",
          effect: { netWorth: 70_000, burnout: 10, title: "Senior SWE @ Big Tech" },
        },
        adFallback: {
          text:
            "You couldn't get a meeting in time. Security walks you out on a Tuesday with a cardboard box and a COBRA pamphlet. At least the severance is decent.",
          effect: { netWorth: 15_000, burnout: 25, title: "SWE II (Laid Off)" },
        },
      },
      {
        id: "rage-apply",
        label: "Rage-apply everywhere and force a counter-offer",
        outcome: {
          text:
            "You interview out of spite and land a Senior offer at a competitor. Your manager suddenly discovers budget for a counter. You take the new gig anyway — loyalty is a one-way street and you finally learned to walk it.",
          effect: { netWorth: 55_000, burnout: 15, title: "Senior SWE" },
        },
      },
    ],
  },
  {
    id: "y3-startup-seriesa",
    year: 3,
    age: 24,
    headline: "Series A or Bust",
    text:
      "A term sheet finally lands — $8M at terms the founder describes as 'founder-friendly, mostly.' In lieu of a raise, he offers you a shiny new title. The VCs want 'senior leadership in place.' You are the senior leadership. All of it.",
    choices: [
      {
        id: "take-vp-title",
        label: "Take the VP of Engineering title (of a 5-person team)",
        outcome: {
          text:
            "You now attend board meetings and unclog the office sink. The title looks incredible on LinkedIn and means nothing in your bank account — yet. Your equity re-vests. The cliff looms.",
          effect: { netWorth: 12_000, burnout: 15, title: "VP of Engineering (of 5)" },
        },
      },
      {
        id: "sell-secondary",
        label: "Negotiate a secondary — sell 10% of your shares now",
        outcome: {
          text:
            "The VCs grumble but let you take some chips off the table. Real money hits your account for the first time in three years. You buy a mattress that isn't inflatable. Life-changing.",
          effect: { netWorth: 85_000, burnout: 5, title: "Founding Engineer (Liquid)" },
        },
      },
      {
        id: "start-own-thing",
        label: "Quit and start your OWN thing — you've seen how the sausage is made",
        outcome: {
          text:
            "You walk away from unvested equity with a laptop, a domain name, and unearned confidence. Your idea is 'Uber for something.' Your runway is your savings account. Your cofounder is a group chat.",
          effect: { netWorth: -12_000, burnout: 20, title: "Founder (Pre-Idea)" },
        },
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// RNG EVENTS — rolled once per year transition.
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
];

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

const scenarioIndex = new Map(SCENARIOS.map((s) => [s.id, s]));

export function getScenario(id: string): Scenario {
  const scenario = scenarioIndex.get(id);
  if (!scenario) throw new Error(`Unknown scenario id: ${id}`);
  return scenario;
}

export function clampBurnout(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function applyEffect(stats: GameStats, effect: StatEffect): GameStats {
  return {
    netWorth: stats.netWorth + (effect.netWorth ?? 0),
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
  switch (kind) {
    case "burnout":
      return {
        kind,
        headline: "TOTAL BURNOUT",
        achievement:
          "Melted down in a sprint retro and moved to a cabin with no Wi-Fi. The industry sends its thoughts and prayers.",
      };
    case "retired":
      return {
        kind,
        headline: "RETIRED RICH",
        achievement: "Logged off forever. The pager will never find you again.",
      };
    case "demo-complete":
      return {
        kind,
        headline: "END OF DEMO — YEAR 3 OF 15",
        achievement:
          stats.netWorth >= 100_000
            ? "Survived the first 3 years AND beat the market. Ship the rest of the game already."
            : "Survived the first 3 years of a tech career. It does not get easier from here.",
      };
  }
}

export function formatMoney(amount: number): string {
  const abs = Math.abs(amount);
  const formatted =
    abs >= 1_000_000
      ? `$${(abs / 1_000_000).toFixed(abs % 1_000_000 === 0 ? 0 : 1)}M`
      : `$${Math.round(abs / 1_000)}K`;
  return amount < 0 ? `-${formatted}` : formatted;
}
