import type { Scenario } from "../types";

/**
 * YEAR 8 (age 29) — mid-career gravity.
 * Pools: y8-goldencage (+2), y8-frontierlab (+2), y8-acquisition (+2),
 *        y8-seriesa (+2).
 */
export const YEAR_08: Scenario[] = [
  // ---------------------------------------------------------------- Golden cage
  {
    id: "y8-goldencage",
    year: 8,
    age: 29,
    headline: "The Golden Cage",
    text:
      "You're 29, comfortable, and quietly bored. The money finally has a retirement tab, but every day is the same standup, and a voice that sounds like your college self asks 'is this it?'",
    choices: [
      {
        id: "push-principal",
        label: "Push for Principal — get quoted",
        outcome: {
          text:
            "You make the hairiest problem your personality for a year. Your design doc gets cargo-culted across three orgs; your comp band grows a comma.",
          effect: { netWorth: 120_000, burnout: 25, title: "Principal Engineer" },
          next: "y9-politics",
        },
      },
      {
        id: "coast-invest",
        label: "Coast at work, get serious investing",
        outcome: {
          text:
            "You automate your job 30% and your savings 100%. Compound interest becomes your favorite coworker.",
          effect: { netWorth: 85_000, burnout: -10 },
          next: "y9-politics",
        },
      },
      {
        id: "angel-checks",
        label: "Write angel checks into friends' startups",
        outcome: {
          text:
            "Five cap tables, one former down payment. Four founders stop texting within a year; the fifth sends charts that go up. You believe the charts.",
          effect: { netWorth: -40_000, burnout: 5, title: "Engineer & Angel" },
          next: "y9-politics",
        },
      },
    ],
  },
  {
    id: "y8-sabbatical-return",
    year: 8,
    age: 29,
    slot: "y8-goldencage",
    headline: "Return From the Void",
    text:
      "You return from a three-month sabbatical to find your project reassigned and your desk occupied. Nobody's hostile — the org just healed over you like bark over a nail.",
    choices: [
      {
        id: "reearn-the-seat",
        label: "Re-earn the seat with undeniable work",
        outcome: {
          text:
            "Two quarters of quietly excellent shipping and the org re-forms around you like it never forgot. It forgot. You made it remember.",
          effect: { netWorth: 80_000, burnout: 15 },
          next: "y9-politics",
        },
      },
      {
        id: "fresh-eyes-leverage",
        label: "Weaponize the outsider eyes",
        outcome: {
          text:
            "Distance gave you what consultants charge millions for: seeing the obvious. Your doc lands like a meteor, and leadership hands you the mess it names.",
          effect: { netWorth: 95_000, burnout: 10, title: "Principal Eng (Fresh Eyes)" },
          next: "y9-politics",
        },
      },
      {
        id: "realize-want-out",
        label: "Admit it — start planning the exit",
        outcome: {
          text:
            "The org moved on without you, and you moved on without it. You coast gracefully while building the exit. The cage door is open.",
          effect: { netWorth: 70_000, burnout: -10 },
          next: "y9-politics",
        },
      },
    ],
  },
  {
    id: "y8-side-project-stars",
    year: 8,
    age: 29,
    slot: "y8-goldencage",
    headline: "20,000 Stars",
    text:
      "Your weekend dev tool hits 20K GitHub stars and one enterprise-license inquiry. Your employer's IP policy, skimmed at onboarding six years ago, enters the chat.",
    choices: [
      {
        id: "monetize-it",
        label: "Monetize — the whole indie playbook",
        outcome: {
          text:
            "You clear the IP review with a lawyer, launch paid tiers, and watch the side project out-earn your bonus. The day job starts feeling like a hobby.",
          effect: { netWorth: 60_000, burnout: 15, title: "Engineer & Maintainer (Paid)" },
          next: "y9-politics",
        },
      },
      {
        id: "donate-to-foundation",
        label: "Donate it — keep the reputation",
        outcome: {
          text:
            "A foundation takes the project; you keep a maintainer seat and standing money can't buy. Your weekends return home.",
          effect: { netWorth: 85_000, burnout: -5, title: "Principal Eng (OSS Famous)" },
          next: "y9-politics",
        },
      },
      {
        id: "company-claims-ip",
        label: "Fight for your nights and weekends",
        outcome: {
          text:
            "Legal says 'derivative'; you send commit timestamps and hardware receipts. You keep the project and learn what page 14 of employment agreements is for.",
          effect: { netWorth: 75_000, burnout: 20 },
          next: "y9-politics",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Frontier lab
  {
    id: "y8-frontierlab",
    year: 8,
    age: 29,
    headline: "Mission Aligned",
    text:
      "A year in the frontier lab: the work is a decade ahead, the Slack debates cite philosophy papers, and someone in the kitchen is always saying 'timelines.' Then the tender offer lands — with a B in it.",
    choices: [
      {
        id: "tender-sell",
        label: "Sell in the tender — diversify",
        outcome: {
          text:
            "You sell a slice at a number your parents don't believe, buy index funds, and sleep like a Victorian orphan adopted by a duke.",
          effect: { netWorth: 350_000, burnout: 10 },
          next: "y9-politics",
        },
      },
      {
        id: "hold-for-agi",
        label: "Hold everything — the mission or bust",
        outcome: {
          text:
            "Your equity remains a thought experiment with a dollar sign. Visionary or cautionary tale — you won't know which for years.",
          effect: { netWorth: 60_000, burnout: 25 },
          next: "y9-politics",
        },
      },
      {
        id: "spectacular-burnout",
        label: "Admit the pace is breaking you",
        outcome: {
          text:
            "You hit the wall at 2 AM mid-eval-run and say it out loud. The lab grants a sabbatical; six months of relearning how to be a person mostly works.",
          effect: { netWorth: -40_000, burnout: -35, title: "MTS (On Sabbatical)" },
          next: "y9-politics",
        },
      },
    ],
  },
  {
    id: "y8-safety-vs-ship",
    year: 8,
    age: 29,
    slot: "y8-frontierlab",
    headline: "The Launch Argument",
    text:
      "The big launch is a week out and the safety evals have one red cell nobody can explain. Product calls it noise. Your name is on the deployment script.",
    choices: [
      {
        id: "side-with-safety",
        label: "Back safety — the red cell decides",
        outcome: {
          text:
            "The launch slips three weeks; the red cell was real, rare, fixable. Product fumes and forgets. Safety remembers forever.",
          effect: { netWorth: 60_000, burnout: 15, title: "MTS (Trusted by Safety)" },
          next: "y9-politics",
        },
      },
      {
        id: "side-with-shipping",
        label: "Ship it — that's what rollbacks are for",
        outcome: {
          text:
            "The metrics soar and the red cell never shows in prod — this time. The bonus arrives with a tiny tenant that pays rent in 3 AM what-ifs.",
          effect: { netWorth: 90_000, burnout: 20 },
          next: "y9-politics",
        },
      },
      {
        id: "broker-compromise",
        label: "Broker a staged rollout with tripwires",
        outcome: {
          text:
            "1% rollout, automated tripwires, sign-off per stage. Both teams claim victory, which is how you know it worked.",
          effect: { netWorth: 75_000, burnout: 10, title: "MTS (The Diplomat)" },
          next: "y9-politics",
        },
      },
    ],
  },
  {
    id: "y8-rival-lab-poach",
    year: 8,
    age: 29,
    slot: "y8-frontierlab",
    headline: "The Rival Lab Calls",
    text:
      "The rival lab — the one your all-hands calls only 'them' — offers 1.5x everything, plus your mission statement with the adjectives rearranged. Your loyalty just got a market quote.",
    choices: [
      {
        id: "defect-for-money",
        label: "Take it — multiples aren't similar",
        outcome: {
          text:
            "You cross the street for 1.5x and find the same research-lab beige. New badge, new NDAs, same beautiful impossible problems.",
          effect: { netWorth: 150_000, burnout: 15, title: "Senior MTS (Defected)" },
          next: "y9-politics",
        },
      },
      {
        id: "leak-for-counter",
        label: "Show your lab the offer, get matched",
        outcome: {
          text:
            "The counter lands in 48 hours. You stay, richer and slightly radioactive — everyone now knows you priced the mission.",
          effect: { netWorth: 120_000, burnout: 10 },
          next: "y9-politics",
        },
      },
      {
        id: "loyalty-discount",
        label: "Decline without leverage — stay loyal",
        outcome: {
          text:
            "You delete the email and take the loyalty discount, a number you calculate in weak moments. You keep the future you actually believe in. Expensive. Yours.",
          effect: { netWorth: 70_000, burnout: 5 },
          next: "y9-politics",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Acquisition
  {
    id: "y8-acquisition",
    year: 8,
    age: 29,
    headline: "Corp Dev Comes Knocking",
    text:
      "A Big Tech corp-dev team 'would love to find time' — the mating call of acquisition. Data rooms open, and your equity is about to mean everything or nothing.",
    choices: [
      {
        id: "champion-deal",
        label: "Champion the deal across the line",
        outcome: {
          text:
            "You run diligence like a launch: crisp docs, no surprises. The deal closes, the all-hands cries, and your options become spendable money.",
          effect: { netWorth: 300_000, burnout: 10, title: "Eng Lead (Post-Acquisition)" },
          next: "y9-politics",
        },
      },
      {
        id: "deal-collapses",
        label: "Stay neutral and keep shipping",
        outcome: {
          text:
            "The acquirer's stock dips 8% and the deal dies in a four-minute call. The CEO tells a room that read the leaked deck 'we were never for sale.'",
          effect: { netWorth: 30_000, burnout: 20 },
          next: "y9-zombie",
        },
      },
      {
        id: "leave-before-deal",
        label: "Skip the coin flip — jump rockets",
        outcome: {
          text:
            "M&A limbo breaks people. You take a strong offer elsewhere while old coworkers refresh the news about their own jobs. Cold? Maybe. Liquid? Yes.",
          effect: { netWorth: 55_000, burnout: 10, title: "Staff Eng @ Growth Co" },
          next: "y9-zombie",
        },
      },
    ],
  },
  {
    id: "y8-earnout-cage",
    year: 8,
    age: 29,
    slot: "y8-acquisition",
    headline: "The Earnout Cage",
    text:
      "The acquisition closed — congratulations — and half your payout is an earnout gated on two years of retention and targets set by people who've never seen your codebase.",
    choices: [
      {
        id: "grind-the-earnout",
        label: "Grind the full earnout — every dollar",
        outcome: {
          text:
            "You hit every gate and collect the last tranche to the day. The money is enormous; the two years are gone. You decline to publish the math.",
          effect: { netWorth: 120_000, burnout: 25 },
          next: "y9-politics",
        },
      },
      {
        id: "negotiate-early-release",
        label: "Negotiate out — 70% now beats misery",
        outcome: {
          text:
            "You trade the remaining earnout for a discounted lump sum and your freedom, out before the integration meetings achieve sentience.",
          effect: { netWorth: 80_000, burnout: 5, title: "Eng Lead (Released Early)" },
          next: "y9-politics",
        },
      },
      {
        id: "coast-and-collect",
        label: "Coast — do exactly what the targets say",
        outcome: {
          text:
            "You read the targets like a contract lawyer and hit precisely them. The acquirer gets what it measured. You get paid in full.",
          effect: { netWorth: 95_000, burnout: -5 },
          next: "y9-politics",
        },
      },
    ],
  },
  {
    id: "y8-diligence-skeleton",
    year: 8,
    age: 29,
    slot: "y8-acquisition",
    headline: "The Skeleton in the Data Room",
    text:
      "Mid-diligence, the acquirer finds the licensing shortcut you wrote at 2 AM in year one, flagged 'TODO: fix before anyone rich looks at this.' Someone rich is looking.",
    choices: [
      {
        id: "own-and-fix",
        label: "Own it — disclosure and a fix by Friday",
        outcome: {
          text:
            "You present the sin and the fix in one priced memo. The deal discounts 4%; the acquirer doubles their opinion of you. Truth under fire travels.",
          effect: { netWorth: 60_000, burnout: 15, title: "Eng Lead (Post-Acquisition)" },
          next: "y9-politics",
        },
      },
      {
        id: "rewrite-history",
        label: "Quietly rewrite it this weekend",
        outcome: {
          text:
            "Your stealth rewrite is technically flawless and forensically obvious — diligence reads git logs like detectives. The deal dies of new questions.",
          effect: { netWorth: 50_000, burnout: 20 },
          next: "y9-zombie",
        },
      },
      {
        id: "blame-architecture",
        label: "Bury it in the tech-debt register",
        outcome: {
          text:
            "You camouflage the skeleton among forty mundane items. The lawyers read appendix C — they always do — and the deal limps into a 'strategic pause.'",
          effect: { netWorth: 40_000, burnout: 15 },
          next: "y9-zombie",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Founder Series A
  {
    id: "y8-seriesa",
    year: 8,
    age: 29,
    headline: "The Series A Roadshow",
    text:
      "The winter survivors get the spring: your metrics are 'a story,' your story is 'a deck.' Sixty meetings, fifty-five passes, three term sheets, one decision.",
    choices: [
      {
        id: "tier1-brutal-terms",
        label: "Take the Tier-1 fund, brutal terms",
        outcome: {
          text:
            "A brand-name lead, a 2x participating preference, and a partner who texts 'thoughts?' at 6 AM. The logo opens doors; the terms close a few behind you.",
          effect: { netWorth: 40_000, burnout: 20, title: "CEO & Co-Founder" },
          next: "y9-scale",
        },
      },
      {
        id: "boutique-friendly",
        label: "Take the smaller, founder-friendly fund",
        outcome: {
          text:
            "Less money, better terms, and a partner who answers emails like a human. The TechCrunch headline is smaller. Your ownership is not.",
          effect: { netWorth: 25_000, burnout: 10, title: "CEO & Co-Founder" },
          next: "y9-scale",
        },
      },
      {
        id: "reject-vc",
        label: "Tear up the term sheets — bootstrap",
        outcome: {
          text:
            "You email three polite no's and screenshot them for posterity. Revenue is the only investor now, and every dollar of growth is yours.",
          effect: { netWorth: 50_000, burnout: 5, title: "Bootstrapped CEO" },
          next: "y9-scale",
        },
      },
    ],
  },
  {
    id: "y8-exec-hiring-spree",
    year: 8,
    age: 29,
    slot: "y8-seriesa",
    headline: "Hiring the Grown-Ups",
    text:
      "The new board wants an executive bench. The candidates: FAANG refugees with gorgeous resumes, or startup mutts with scar tissue. Every hire reshapes the company's DNA.",
    choices: [
      {
        id: "poach-faang",
        label: "Poach from FAANG — buy the playbooks",
        outcome: {
          text:
            "The execs arrive with frameworks and salary expectations that bend your budget. The company grows up fast — and grumbles about it hourly.",
          effect: { netWorth: 20_000, burnout: 15 },
          next: "y9-scale",
        },
      },
      {
        id: "promote-within",
        label: "Promote the garage-days people",
        outcome: {
          text:
            "Employee #4 becomes Head of Product and outworks every framework. The board frets about 'experience gaps.' The metrics don't.",
          effect: { netWorth: 35_000, burnout: 10 },
          next: "y9-scale",
        },
      },
      {
        id: "fractional-everything",
        label: "Rent executives — go fractional",
        outcome: {
          text:
            "A fractional CFO, a fractional CMO: 60% of the wisdom at 30% of the burn, cancelable anytime. Your runway calls it genius.",
          effect: { netWorth: 45_000, burnout: 10 },
          next: "y9-scale",
        },
      },
    ],
  },
  {
    id: "y8-angel-board-drama",
    year: 8,
    age: 29,
    slot: "y8-seriesa",
    headline: "The Pool Party Ghost Returns",
    text:
      "The pool-party angel resurfaces the week your Series A closes, claiming his SAFE included a board seat 'per our conversation.' There's one ambiguous voice memo. Your lawyer says 'huh.'",
    choices: [
      {
        id: "buy-him-out",
        label: "Buy him out — expensive amnesia",
        outcome: {
          text:
            "You pay a premium to convert his SAFE and part ways forever. The board-seat question dies with the wire. Peace has a list price.",
          effect: { netWorth: -60_000, burnout: 10 },
          next: "y9-scale",
        },
      },
      {
        id: "give-observer-seat",
        label: "Offer an observer seat, guard the votes",
        outcome: {
          text:
            "He gets a chair with no vote and quarterly chances to say 'just riffing here.' You get his silence and every decision that matters.",
          effect: { netWorth: 10_000, burnout: 20 },
          next: "y9-scale",
        },
      },
      {
        id: "lawyer-up",
        label: "Lawyer up — the cap table isn't a vibe",
        outcome: {
          text:
            "One crisp letter with exhibits and he folds before mediation. Legal fees hurt. Precedent pays: nobody ever tries you again.",
          effect: { netWorth: -30_000, burnout: 15 },
          next: "y9-scale",
        },
      },
    ],
  },
  {
    id: "y8-prorata-doubledown",
    year: 8,
    age: 29,
    slot: "y8-goldencage",
    headline: "The Pro-Rata Question",
    text:
      "The one angel check that didn't die is raising a hot Series B, and your pro-rata lets you invest ten times the original. Beer money got lucky; real money has to be right.",
    choices: [
      {
        id: "decline-prorata",
        label: "Let it lapse — house money stays house",
        outcome: {
          text:
            "The original check keeps compounding untouched; the lucky bet stays a lucky bet instead of a thesis. Boring pays the mortgage.",
          effect: { netWorth: 80_000, burnout: 0 },
          next: "y9-politics",
        },
      },
      {
        id: "exercise-prorata",
        label: "Exercise the full pro-rata — 10x check",
        gamble: [
          {
            chance: 0.35,
            label: "Marks up 4x — thesis confirmed",
            text:
              "The B becomes an oversubscribed C in eleven months, and your position marks up 4x with secondary buyers circling. Beer money grew a seat at the table.",
            effect: { netWorth: 150_000, burnout: 5 },
            next: "y9-politics",
          },
          {
            chance: 0.65,
            label: "Growth stalls — big check, long wait",
            text:
              "The chart discovers gravity two quarters after your wire clears. Not dead — just flat, illiquid, and large. You mute the friend's thread, lovingly.",
            effect: { netWorth: -50_000, burnout: 5 },
            next: "y9-politics",
          },
        ],
      },
    ],
  },
  {
    id: "y8-moonshot-research",
    year: 8,
    age: 29,
    slot: "y8-frontierlab",
    headline: "The Research Fork",
    text:
      "Annual planning offers a fork: evals infrastructure — needed, funded, promotable — or a moonshot two seniors love and everyone else calls 'a career detour with math.'",
    choices: [
      {
        id: "safe-evals",
        label: "Take the evals track — promotable",
        outcome: {
          text:
            "You build the measurement layer every team quietly depends on. No headlines, maximum leverage: your dashboards decide what ships.",
          effect: { netWorth: 80_000, burnout: 10 },
          next: "y9-politics",
        },
      },
      {
        id: "join-moonshot",
        label: "Join the moonshot for a year",
        gamble: [
          {
            chance: 0.4,
            label: "Breakthrough — paper of the year",
            text:
              "The direction cracks open in month nine and the paper rearranges half the field's roadmaps. Conference hallways now pronounce your surname correctly.",
            effect: { netWorth: 140_000, burnout: 20, title: "MTS (Breakthrough Author)" },
            next: "y9-politics",
          },
          {
            chance: 0.6,
            label: "Negative result — beautiful dead ends",
            text:
              "The direction politely declines to exist. You publish a negative result and return a year behind your cohort with expensive, real intuition.",
            effect: { netWorth: 50_000, burnout: 20 },
            next: "y9-politics",
          },
        ],
      },
    ],
  },
  {
    id: "y8-retention-poker",
    year: 8,
    age: 29,
    slot: "y8-acquisition",
    headline: "Mid-Deal Leverage",
    text:
      "Halfway through diligence, it crystallizes: the deal needs you more than you need the deal. Threatening to leave could double your package — or get you de-risked out of the story.",
    choices: [
      {
        id: "ride-quietly",
        label: "Ride quietly — unspent leverage keeps",
        outcome: {
          text:
            "You keep your seat, your silence, and your standard package. Your restraint is remembered by exactly the people who decide what you run next.",
          effect: { netWorth: 90_000, burnout: 10 },
          next: "y9-politics",
        },
      },
      {
        id: "threaten-mid-deal",
        label: "Spend the leverage — renegotiate or walk",
        gamble: [
          {
            chance: 0.6,
            label: "They can't lose you — package doubles",
            text:
              "The deal team does the 'key person risk' math and the math says pay. Your package doubles, with an acceleration clause added like an apology.",
            effect: { netWorth: 180_000, burnout: 10 },
            achievement: "big-bonus",
            next: "y9-politics",
          },
          {
            chance: 0.4,
            label: "De-risked — resignation accepted",
            text:
              "Your systems get emergency-documented and your resignation is graciously accepted before you finish making it. Leverage expires; it was Tuesday.",
            effect: { netWorth: 30_000, burnout: 20, title: "Eng Lead (Out-Leveraged)" },
            next: "y9-zombie",
          },
        ],
      },
    ],
  },
  {
    id: "y8-termsheet-bluff",
    year: 8,
    age: 29,
    slot: "y8-seriesa",
    headline: "The Phantom Term Sheet",
    text:
      "Your Series A stalls at a valuation you hate. The oldest trick in fundraising beckons: imply another term sheet exists. Partners hold dinners specifically to catch this bluff.",
    choices: [
      {
        id: "negotiate-straight",
        label: "Play it straight — traction talks",
        outcome: {
          text:
            "You push the valuation up 10% the honest way: cohort charts and pipeline. The partner cites your no-games posture at board level for years.",
          effect: { netWorth: 30_000, burnout: 10 },
          next: "y9-scale",
        },
      },
      {
        id: "bluff-the-sheet",
        label: "Imply the phantom sheet — let FOMO work",
        gamble: [
          {
            chance: 0.55,
            label: "FOMO wins — terms improve 20%",
            text:
              "'We're moving quickly with another party' does in one email what three weeks of charts couldn't. You feel slightly gross and significantly richer.",
            effect: { netWorth: 50_000, burnout: 10 },
            next: "y9-scale",
          },
          {
            chance: 0.45,
            label: "Caught — partners compared notes",
            text:
              "The partner mentions your 'other sheet' to the only other fund you pitched — over branzino. The round closes at a spite discount. Branzino remembers.",
            effect: { netWorth: 5_000, burnout: 20 },
            next: "y9-scale",
          },
        ],
      },
    ],
  },
];
