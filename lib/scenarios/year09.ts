import type { Scenario } from "../types";

/**
 * YEAR 9 (age 30) — politics, zombies, and scale.
 * Pools: y9-politics (+2), y9-zombie (+2), y9-scale (+2).
 */
export const YEAR_09: Scenario[] = [
  // ---------------------------------------------------------------- Politics
  {
    id: "y9-politics",
    year: 9,
    age: 30,
    headline: "Game of Codes",
    text:
      "You turn 30 mid-reorg. The new SVP lands you under a VP who once lost a design review to you — and has the memory of an elephant. Your calendar fills with chess.",
    choices: [
      {
        id: "outmaneuver",
        label: "Ally with the rival VP, outmaneuver him",
        outcome: {
          text:
            "You build a coalition like a raid group. By Q3 your enemy is 'exploring opportunities' and you own his best team. Powerful, and vaguely gross.",
          effect: { netWorth: 95_000, burnout: 25 },
          next: "y10-poach",
        },
      },
      {
        id: "transfer-reset",
        label: "Transfer teams and reset the board",
        outcome: {
          text:
            "You find an org run by an actual engineer and watch the old drama from a distance like prestige television. Clean slate, same paycheck.",
          effect: { netWorth: 75_000, burnout: 10 },
          next: "y10-poach",
        },
      },
      {
        id: "heads-down",
        label: "Keep your head down and outlast them",
        outcome: {
          text:
            "You ship, smile, and give the VP nothing to swing at. Fourteen months later he's gone and you're still here — the org's living memory, fully vested.",
          effect: { netWorth: 65_000, burnout: 15 },
          next: "y10-poach",
        },
      },
    ],
  },
  {
    id: "y9-ai-reorg-again",
    year: 9,
    age: 30,
    slot: "y9-politics",
    headline: "The Second AI Reorg",
    text:
      "The company reorganizes around AI for the second time in three years — this time with feeling. Winners' orgs and losers' orgs form in real time, and the chairs are musical.",
    choices: [
      {
        id: "land-in-winners-org",
        label: "Maneuver into the anointed AI org",
        outcome: {
          text:
            "Two coffees and a transfer timed to the hour land you in the org whose budget grows while everyone else's 'optimizes.' Musical chairs: won.",
          effect: { netWorth: 85_000, burnout: 15, title: "Principal Eng, AI Org" },
          next: "y10-poach",
        },
      },
      {
        id: "stay-with-people",
        label: "Stay with your team — trust outlasts orgs",
        outcome: {
          text:
            "You keep the band together, absorbing two orphans and a product three VPs forgot they owned. When the dust settles, yours is the team still shipping.",
          effect: { netWorth: 65_000, burnout: 10 },
          next: "y10-poach",
        },
      },
      {
        id: "boring-platform-play",
        label: "Take the platform team everyone flees",
        outcome: {
          text:
            "The stampede goes 'AI-native'; you inherit the platform it all runs on — including the AI. Every winners' roadmap grows a dependency with your name.",
          effect: { netWorth: 75_000, burnout: 10, title: "Principal Eng, Platform" },
          next: "y10-poach",
        },
      },
    ],
  },
  {
    id: "y9-mentee-eclipse",
    year: 9,
    age: 30,
    slot: "y9-politics",
    headline: "The Mentee Eclipse",
    text:
      "The junior you mentored just shipped the launch of the year, and their promo packet — which you helped edit — now targets your level. The pride is real. So is the other feeling.",
    choices: [
      {
        id: "champion-them",
        label: "Champion their promo loudest",
        outcome: {
          text:
            "You write the strongest peer review of your career — for someone else. Directors start sending you their best juniors. Legacy compounds weirder than money.",
          effect: { netWorth: 70_000, burnout: 5, title: "Principal Eng (The Mentor)" },
          next: "y10-poach",
        },
      },
      {
        id: "compete-quietly",
        label: "Let the ambition wake back up",
        outcome: {
          text:
            "Their launch lights a fire you thought went out at 28. You ship the gnarliest project on the roadmap. Calibration notes: 'renewed intensity.'",
          effect: { netWorth: 80_000, burnout: 25 },
          next: "y10-poach",
        },
      },
      {
        id: "recruit-them",
        label: "Recruit them to your new pod",
        outcome: {
          text:
            "You pitch over tacos; they say yes before the queso. The pod ships like a heist crew. HR calls it 'a talent density concern.' You call it Tuesday.",
          effect: { netWorth: 75_000, burnout: 10 },
          next: "y10-poach",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Zombie
  {
    id: "y9-zombie",
    year: 9,
    age: 30,
    headline: "Zombie Mode",
    text:
      "The company isn't dying, but it isn't living: flat growth, quiet quitting, options priced at hope. The CEO's new favorite phrase is 'profitable-ish.' Your best years are compounding elsewhere.",
    choices: [
      {
        id: "finally-bigtech",
        label: "Finally take the Big Tech offer",
        outcome: {
          text:
            "The recruiter who's emailed since college gets a yes. Your first week is so calm you keep waiting for the emergency. There's just... process.",
          effect: { netWorth: 75_000, burnout: 10, title: "Staff SWE @ Big Tech" },
          achievement: "boomerang",
          next: "y10-poach",
        },
      },
      {
        id: "become-cto",
        label: "Take over as CTO when the founder bails",
        outcome: {
          text:
            "The founder 'transitions to a board role' (Miami). You cut two products, refocus on the one that works, and discover you're good at this.",
          effect: { netWorth: 40_000, burnout: 20, title: "CTO" },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "solo-consultant",
        label: "Rage-quit into solo consulting",
        outcome: {
          text:
            "Your shingle says 'I've seen this movie before' and you charge accordingly. Revenue is lumpy. Freedom is not.",
          effect: { netWorth: 50_000, burnout: -10, title: "Solo Consultant" },
          next: "y10-poach",
        },
      },
    ],
  },
  {
    id: "y9-private-equity",
    year: 9,
    age: 30,
    slot: "y9-zombie",
    headline: "The PE Playbook Arrives",
    text:
      "A PE firm buys the zombie and the playbook arrives before the ink dries: 'right-sizing' and a CFO who says 'EBITDA' like a prayer. Everything measurable gets a dashboard. You are measurable.",
    choices: [
      {
        id: "ride-the-playbook",
        label: "Ride it — PE school is a masterclass",
        outcome: {
          text:
            "You learn fluent EBITDA and translate 'cost center' into 'kept the revenue alive.' Brutal school. Genuine education.",
          effect: { netWorth: 60_000, burnout: 20 },
          next: "y10-poach",
        },
      },
      {
        id: "exit-before-grind",
        label: "Exit before the grind starts",
        outcome: {
          text:
            "Chapter three is 'do more with less'; chapter four is just 'less.' You leave in week six, ahead of the first 'synergy review.'",
          effect: { netWorth: 70_000, burnout: 10, title: "Staff SWE (Elsewhere)" },
          next: "y10-poach",
        },
      },
      {
        id: "pe-golden-child",
        label: "Run the value-creation plan yourself",
        outcome: {
          text:
            "You lead the hard calls, and the firm starts flying you to other portfolio companies. You're not an engineer to them anymore. You're an operator.",
          effect: { netWorth: 80_000, burnout: 25, title: "CTO (PE-Approved)" },
          next: "y10-founder-crossroads",
        },
      },
    ],
  },
  {
    id: "y9-whale-client-ultimatum",
    year: 9,
    age: 30,
    slot: "y9-zombie",
    headline: "The Whale's Ultimatum",
    text:
      "The client paying 40% of revenue delivers an ultimatum: rebuild the integration to their 80-page spec in one quarter, or churn. The CEO says 'we' in a way that means 'you.'",
    choices: [
      {
        id: "heroic-save",
        label: "Save the whale — whatever it takes",
        outcome: {
          text:
            "Thirteen weeks of warpath engineering and the whale renews for three years. The CEO takes the credit publicly and knows the truth privately.",
          effect: { netWorth: 55_000, burnout: 25 },
          next: "y10-poach",
        },
      },
      {
        id: "let-the-whale-go",
        label: "Refuse the ransom — let the whale churn",
        outcome: {
          text:
            "You show the board the math: meeting the spec bankrupts the roadmap. The whale leaves; eighteen months later the company is healthier than it ever allowed.",
          effect: { netWorth: 45_000, burnout: 15 },
          next: "y10-poach",
        },
      },
      {
        id: "save-it-for-the-title",
        label: "Save it — for the CTO title and a grant",
        outcome: {
          text:
            "You present terms before writing a line: title, equity, veto. He signs by Friday — hostages can't negotiate, and you're the only rescue team.",
          effect: { netWorth: 50_000, burnout: 20, title: "CTO (Negotiated Under Fire)" },
          next: "y10-founder-crossroads",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Founder scale
  {
    id: "y9-scale",
    year: 9,
    age: 30,
    headline: "Scale or Flail",
    text:
      "Thirty employees, real revenue, and your cofounder — your best friend from the garage — wants to rewrite the product in a language he learned last month. The board is watching.",
    choices: [
      {
        id: "buyout-cofounder",
        label: "Buy out your cofounder",
        outcome: {
          text:
            "Three months and one mediator later, he leaves with a check and a tweet thread everyone reads between the lines of. The garage group chat goes quiet forever.",
          effect: { netWorth: -120_000, burnout: 25, title: "CEO (Sole Founder)" },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "split-roles",
        label: "Split roles — he takes R&D, you the rest",
        outcome: {
          text:
            "One brutal offsite conversation, one thick line down the org chart. He gets a lab and no meetings; you get the P&L and all of them. The friendship survives.",
          effect: { netWorth: 25_000, burnout: 10 },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "exec-coach",
        label: "▶ Exec coach intro — watch a video first",
        requiresAd: true,
        outcome: {
          text:
            "The podcast coach takes you both on. Six sessions in, you're having the conversation you'd avoided for two years. Worth every session.",
          effect: { netWorth: 45_000, burnout: -10 },
          next: "y10-founder-crossroads",
        },
        adFallback: {
          text:
            "The coach's waitlist is eighteen months. You keep 'managing it,' which means not talking, which means it leaks into every product decision.",
          effect: { netWorth: 0, burnout: 20 },
          next: "y10-founder-crossroads",
        },
      },
    ],
  },
  {
    id: "y9-europe-expansion",
    year: 9,
    age: 30,
    slot: "y9-scale",
    headline: "The Atlantic Question",
    text:
      "A third of your inbound is now European: three unsupported languages, a currency you don't hold, and possible non-compliance with an acronym. Everyone says expand. Nobody says the cost.",
    choices: [
      {
        id: "expand-properly",
        label: "Do it right — entity, hires, GDPR lawyer",
        outcome: {
          text:
            "Six figures, a Dublin entity, a Head of EMEA. Painful, slow, correct: a year later Europe is 30% of revenue and your compliance answer is 'yes.'",
          effect: { netWorth: 20_000, burnout: 20 },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "expand-cheap",
        label: "Do it cheap — one contractor, English",
        outcome: {
          text:
            "One heroic Berlin contractor duct-tapes the timezone gap. Cheap expansion works right up until it expensively doesn't. Today is not that day.",
          effect: { netWorth: 35_000, burnout: 15 },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "focus-home",
        label: "Don't expand — depth beats breadth",
        outcome: {
          text:
            "You promise Europe a roadmap and dominate the domestic market instead. Focus quietly posts the best margins in the category.",
          effect: { netWorth: 30_000, burnout: 5 },
          next: "y10-founder-crossroads",
        },
      },
    ],
  },
  {
    id: "y9-culture-memo",
    year: 9,
    age: 30,
    slot: "y9-scale",
    headline: "The Culture Memo",
    text:
      "Somewhere past employee 25, the vibe stopped scaling: two definitions of 'urgent,' and a new hire sincerely asking 'what does this company believe?' You open a doc titled 'How We Work.'",
    choices: [
      {
        id: "publish-publicly",
        label: "Write it raw, publish it publicly",
        outcome: {
          text:
            "You leave the trade-offs in. It goes mildly viral, and your next ten hires arrive pre-aligned, citing paragraph four in their cover letters.",
          effect: { netWorth: 30_000, burnout: 10 },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "keep-internal",
        label: "Keep it internal — culture is practiced",
        outcome: {
          text:
            "The memo stays in the handbook where it can be honest instead of impressive. No thought-leadership points scored. Every internal one.",
          effect: { netWorth: 25_000, burnout: 5 },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "chief-culture-officer",
        label: "Hire a Chief Culture Officer",
        outcome: {
          text:
            "Six months of workshops later, the culture is what it was, plus lanyards. You write the memo yourself on a Sunday, as you should have in March.",
          effect: { netWorth: -20_000, burnout: 10 },
          next: "y10-founder-crossroads",
        },
      },
    ],
  },
  {
    id: "y9-coup-bet",
    year: 9,
    age: 30,
    slot: "y9-politics",
    headline: "The Coup Invitation",
    text:
      "A trusted director closes her door: a faction is moving to oust the stack-ranking SVP, and she wants your name on the list. Winning coups redraw org charts. Failed ones publish the list.",
    choices: [
      {
        id: "stay-neutral-coup",
        label: "Stay neutral — systems, not conspiracies",
        outcome: {
          text:
            "You decline politely and delete the thread. The coup half-succeeds without you, and both factions still return your messages.",
          effect: { netWorth: 70_000, burnout: 10 },
          next: "y10-poach",
        },
      },
      {
        id: "join-the-coup",
        label: "Sign on — the SVP is making it worse",
        gamble: [
          {
            chance: 0.5,
            label: "Coup succeeds — map redrawn",
            text:
              "The SVP departs to 'pursue portfolio work,' and the winners' map has your name on a bigger box. Fortune favors the organized.",
            effect: { netWorth: 110_000, burnout: 15, title: "Senior Staff (Coup Class)" },
            next: "y10-poach",
          },
          {
            chance: 0.5,
            label: "Coup fails — list published",
            text:
              "The SVP survives and the supporter list finds his desk within a week. Your projects start dying of resource starvation. Exile, via budget.",
            effect: { netWorth: 40_000, burnout: 20 },
            next: "y10-poach",
          },
        ],
      },
    ],
  },
  {
    id: "y9-skiplevel-gamble",
    year: 9,
    age: 30,
    slot: "y9-politics",
    headline: "Over the VP's Head",
    text:
      "Your hostile VP has blocked your platform proposal three times. The SVP holds open office hours Thursday. Going over a VP's head is a trick shot: spectacular or unforgettable.",
    choices: [
      {
        id: "endure-the-vp",
        label: "Endure — paper trails and patience",
        outcome: {
          text:
            "You document every block with timestamps and projected costs. VPs rotate every eighteen months; your paper trail has no rotation schedule.",
          effect: { netWorth: 65_000, burnout: 15 },
          next: "y10-poach",
        },
      },
      {
        id: "book-the-office-hours",
        label: "Book Thursday — take it to the SVP",
        gamble: [
          {
            chance: 0.45,
            label: "SVP intervenes — VP defanged",
            text:
              "Ten minutes, two questions, and 'why hasn't this shipped?' The proposal gets funded over the VP's head by Friday. Nothing but net.",
            effect: { netWorth: 95_000, burnout: 10, title: "Principal Eng (SVP-Backed)" },
            next: "y10-poach",
          },
          {
            chance: 0.55,
            label: "SVP backs the chain of command",
            text:
              "'Work it through your VP' arrives in writing, cc'd to the VP, who now has documentation of your Thursday adventure. The trick shot ricochets.",
            effect: { netWorth: 35_000, burnout: 25 },
            next: "y10-poach",
          },
        ],
      },
    ],
  },
  {
    id: "y9-zombie-equity-scoop",
    year: 9,
    age: 30,
    slot: "y9-zombie",
    headline: "The Departure Discount",
    text:
      "Fleeing colleagues offer you their vested shares at 70% below the last round. Buying coworkers' abandoned hope is either vulture genius or doubling down on a horse that's lying down.",
    choices: [
      {
        id: "pass-on-scoop",
        label: "Pass — you already work here",
        outcome: {
          text:
            "You keep your capital diversified away from the building you sit in. Your portfolio doesn't smell like your employer.",
          effect: { netWorth: 60_000, burnout: 5 },
          next: "y10-poach",
        },
      },
      {
        id: "scoop-the-shares",
        label: "Buy every share — vulture pricing",
        gamble: [
          {
            chance: 0.3,
            label: "PE buys at 3x — vultures feast",
            text:
              "Fourteen months later a PE firm buys the zombie at 3x your entry. You buy the sellers a very awkward round of drinks.",
            effect: { netWorth: 130_000, burnout: 5 },
            next: "y10-poach",
          },
          {
            chance: 0.7,
            label: "Still a zombie — cheaper hope",
            text:
              "The zombie neither dies nor lives — the one outcome your discount math didn't price. The horse remains lying down, breathing steadily.",
            effect: { netWorth: -30_000, burnout: 10 },
            next: "y10-poach",
          },
        ],
      },
    ],
  },
  {
    id: "y9-second-product-bet",
    year: 9,
    age: 30,
    slot: "y9-scale",
    headline: "The Second Act",
    text:
      "Core growth is decelerating the polite way charts do before boards get tense, and the team has a second product idea. Multi-product makes empires. Split focus kills thirty-person companies.",
    choices: [
      {
        id: "focus-the-core",
        label: "Stay single-product — re-accelerate",
        outcome: {
          text:
            "You kill the second act before it's born and water the core. The chart responds like a plant: slowly, then visibly. One product, whole company.",
          effect: { netWorth: 30_000, burnout: 10 },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "launch-product-two",
        label: "Green-light product two — build empires",
        gamble: [
          {
            chance: 0.4,
            label: "Product two outgrows the first",
            text:
              "The adjacent market is the bigger one; product two crosses product one in fourteen months. You're a platform now, valuation grammar included.",
            effect: { netWorth: 70_000, burnout: 15 },
            next: "y10-founder-crossroads",
          },
          {
            chance: 0.6,
            label: "Split focus — both stall",
            text:
              "Fifteen people per roadmap, minus coordination tax; both charts flatten in sympathy. Empires are sequenced, not parallelized.",
            effect: { netWorth: -15_000, burnout: 25 },
            next: "y10-founder-crossroads",
          },
        ],
      },
    ],
  },
  {
    id: "y9-live-demo-bet",
    year: 9,
    age: 30,
    slot: "y9-scale",
    headline: "The Live Demo",
    text:
      "The industry's biggest conference offers you a live keynote demo: five minutes, six thousand people. Your product demos beautifully 49 times out of 50. The 50th is an infinite spinner.",
    choices: [
      {
        id: "decline-keynote",
        label: "Decline — ship the quarter instead",
        outcome: {
          text:
            "A competitor takes the stage and does fine; you close two enterprise deals. The conference runs next year. Payroll runs monthly.",
          effect: { netWorth: 28_000, burnout: 10 },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "demo-live",
        label: "Demo live — legend or blooper reel",
        gamble: [
          {
            chance: 0.6,
            label: "It lands — inbound floods",
            text:
              "Zero spinners, one mid-demo applause break, and a quarter of flooded pipeline. Tonight the founder's table was hot.",
            effect: { netWorth: 55_000, burnout: 15 },
            next: "y10-founder-crossroads",
          },
          {
            chance: 0.4,
            label: "The spinner — 6,000 witnesses",
            text:
              "The 50th time chooses the main stage. The blooper clip out-reaches your entire marketing budget, which is almost — almost — a win.",
            effect: { netWorth: 5_000, burnout: 25 },
            next: "y10-founder-crossroads",
          },
        ],
      },
    ],
  },
];
