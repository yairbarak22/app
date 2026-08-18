import type { Scenario } from "../types";

/**
 * YEAR 4 (age 25) — mid-game setup.
 * Pools: y4-bigtech-handcuffs (+2), y4-open-market (+2),
 *        y4-founder-garage (+2), y4-startup-scale (+2).
 */
export const YEAR_04: Scenario[] = [
  // ---------------------------------------------------------------- Big Tech
  {
    id: "y4-bigtech-handcuffs",
    year: 4,
    age: 25,
    headline: "Golden Handcuffs",
    text:
      "Your RSU refresher lands and the four-year math gets real. Then a pre-IPO recruiter slides into your DMs saying 'rocket ship' with zero irony.",
    choices: [
      {
        id: "sign-refresher",
        label: "Sign the refresher. Vest in peace",
        outcome: {
          text:
            "Four more years of handcuffs, a reminder for every vest date. You catch yourself defending the company in group chats.",
          effect: { netWorth: 95_000, burnout: 10 },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "join-rocketship",
        label: "Jump to the pre-IPO rocket ship",
        outcome: {
          text:
            "You trade liquid RSUs for paper options, an unused climbing wall, and a Slack that never sleeps.",
          effect: { netWorth: 45_000, burnout: 15, title: "Senior Eng @ Rocket Ship" },
          next: "y5-rocketship",
        },
      },
      {
        id: "coast-mode",
        label: "Coast. Rest and vest. You've earned this",
        outcome: {
          text:
            "You log off at 5:01 and take up bouldering. Your promo packet does not exist, and you're at peace with that — mostly.",
          effect: { netWorth: 65_000, burnout: -10 },
          next: "y5-bigtech-staffpacket",
        },
      },
    ],
  },
  {
    id: "y4-ai-team-transfer",
    year: 4,
    age: 25,
    slot: "y4-bigtech-handcuffs",
    headline: "The Internal Gold Rush",
    text:
      "The company spins up an elite internal AI team — 'top performers only.' Half your org applies within the hour; your team still needs the roadmap you promised.",
    choices: [
      {
        id: "fight-for-seat",
        label: "Fight for a seat on the AI team",
        outcome: {
          text:
            "Two interviews and one strategic coffee later, you're in — your old team's goodbye card contains a passive-aggressive haiku. Worth it.",
          effect: { netWorth: 70_000, burnout: 20, title: "SWE, AI Platform" },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "stay-loyal-ship",
        label: "Stay and ship what you promised",
        outcome: {
          text:
            "You ship while the transfer window closes. Your director notices the one person who didn't chase the shiny thing — that trust compounds.",
          effect: { netWorth: 65_000, burnout: 5 },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "both-jobs",
        label: "Do both — day job plus 20% on the AI team",
        outcome: {
          text:
            "The '20% project' is 40% and everyone knows it. You're visible in two orgs and asleep in neither.",
          effect: { netWorth: 80_000, burnout: 30 },
          next: "y5-bigtech-staffpacket",
        },
      },
    ],
  },
  {
    id: "y4-manager-chair",
    year: 4,
    age: 25,
    slot: "y4-bigtech-handcuffs",
    headline: "The Empty Manager Chair",
    text:
      "Your manager quits and the director offers you the chair 'on an interim basis' — corporate for 'prove it for free.' The other candidate schedules meetings about meetings.",
    choices: [
      {
        id: "take-em-role",
        label: "Take the chair — protect the team",
        outcome: {
          text:
            "'Interim' lasts four months, then the title sticks. Management: the art of being tired in a different way.",
          effect: { netWorth: 70_000, burnout: 15, title: "Engineering Manager" },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "recruit-own-boss",
        label: "Decline — hand-pick your next boss",
        outcome: {
          text:
            "You 'informally' vet every EM candidate and steer the offer to the one who asks about team health. Best hire you never officially made.",
          effect: { netWorth: 62_000, burnout: 0 },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "interim-then-back",
        label: "Try it interim — with an IC escape hatch",
        outcome: {
          text:
            "Four months of calendar Tetris confirm it: you love building and merely tolerate humans in aggregate. You take the escape hatch with zero shame.",
          effect: { netWorth: 66_000, burnout: 10, title: "Senior SWE (Returned IC)" },
          next: "y5-bigtech-staffpacket",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Open market
  {
    id: "y4-open-market",
    year: 4,
    age: 25,
    headline: "The 400-Application Gauntlet",
    text:
      "The job market read the same macro news as your old CEO. Every posting has 3,000 applicants, 'we went with another candidate' is the new good morning, and your severance is evaporating.",
    choices: [
      {
        id: "downlevel",
        label: "Take the down-level at a boring company",
        outcome: {
          text:
            "Insurance-adjacent software on a stack old enough to vote — but the paycheck clears and nobody Slacks you on weekends. Your cortisol sends thanks.",
          effect: { netWorth: 35_000, burnout: 10, title: "SWE II (Again)" },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "crypto-contract",
        label: "Contract for a chaotic crypto startup",
        outcome: {
          text:
            "The pay is absurd, the codebase is a crime scene, and the founder communicates in 2 AM voice memos. You stack cash with your resume open in another tab.",
          effect: { netWorth: 70_000, burnout: 20, title: "Contract Eng (Web3, Regrettably)" },
          next: "y5-rocketship",
        },
      },
      {
        id: "found-from-ashes",
        label: "Screw it — finally build the thing",
        outcome: {
          text:
            "You incorporate from your kitchen table, and the fear of dying unemployed becomes a feature roadmap. Nothing motivates like spite.",
          effect: { netWorth: -15_000, burnout: 10, title: "Founder (Post-Layoff)" },
          next: "y5-founder-pmf",
        },
      },
    ],
  },
  {
    id: "y4-ghosting-season",
    year: 4,
    age: 25,
    slot: "y4-open-market",
    headline: "Ghosting Season",
    text:
      "Nine final rounds this quarter, two ghostings after the 'team fit dinner,' one rejection addressed to someone else. Your therapist opens with 'any word from the fintech one?'",
    choices: [
      {
        id: "spreadsheet-warfare",
        label: "Go spreadsheet warfare on the search",
        outcome: {
          text:
            "Forty leads, staged follow-ups — rejections become churn, not verdicts. Week six, the pipeline converts into a solid Senior offer.",
          effect: { netWorth: 40_000, burnout: 10, title: "Senior SWE (Rehired)" },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "contract-bridge",
        label: "Take contract work, skip full-time",
        outcome: {
          text:
            "Contract rates that make salaried friends do arithmetic at parties. One client — a rocket-ship startup — keeps hinting at conversion.",
          effect: { netWorth: 55_000, burnout: 10, title: "Contract Engineer" },
          next: "y5-rocketship",
        },
      },
      {
        id: "niche-down",
        label: "Niche down — become the payments person",
        outcome: {
          text:
            "You become one of twelve humans who truly grok card-network reconciliation, and recruiters learn your first name. Specialization: the cheat code.",
          effect: { netWorth: 48_000, burnout: 15, title: "Senior SWE (Payments)" },
          next: "y5-bigtech-staffpacket",
        },
      },
    ],
  },
  {
    id: "y4-bootcamp-arc",
    year: 4,
    age: 25,
    slot: "y4-open-market",
    headline: "The Teaching Arc",
    text:
      "A bootcamp offers a teaching gig while you hunt: decent pay, grateful students, the healing power of explaining closures. Your LeetCode streak guilt-trips you nightly.",
    choices: [
      {
        id: "teach-and-heal",
        label: "Teach — remember why you liked this",
        outcome: {
          text:
            "Your students ship janky, glorious projects and one cries at graduation. You return to interviewing with your soul re-inflated.",
          effect: { netWorth: 25_000, burnout: -15, title: "Instructor & Engineer" },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "leetcode-monk",
        label: "Enter LeetCode monk mode — 300 problems",
        outcome: {
          text:
            "Two problems before breakfast, mocks at lunch, system design before bed. Joyless, and it works — Big Tech, front door, level bump.",
          effect: { netWorth: 42_000, burnout: 20, title: "Senior SWE @ Big Tech" },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "build-in-public",
        label: "Build your side project in public instead",
        outcome: {
          text:
            "Daily changelogs, honest metrics, a tiny devoted audience — by month four, real revenue. The job hunt quietly becomes optional.",
          effect: { netWorth: 18_000, burnout: 5, title: "Indie Hacker" },
          next: "y5-founder-pmf",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Founder
  {
    id: "y4-founder-garage",
    year: 4,
    age: 25,
    headline: "Default Alive?",
    text:
      "Month four of founding: two pivots, 11 signups (6 are you), and a savings graph shaped like a ski slope. Pick a survival strategy.",
    choices: [
      {
        id: "apply-yc",
        label: "Apply to YC on vibes and zero traction",
        outcome: {
          text:
            "Against all odds, you're in — the interview was 9 minutes and one partner just stared. You learn to say 'we're crushing it' with a straight face.",
          effect: { netWorth: 5_000, burnout: 15, title: "YC Founder" },
          next: "y5-founder-pmf",
        },
      },
      {
        id: "bootstrap-boring",
        label: "Bootstrap boring — B2B SaaS for dentists",
        outcome: {
          text:
            "No TechCrunch headline, but dentists pay invoices on time — $4K MRR and climbing. Your VC friends call it a 'lifestyle business.'",
          effect: { netWorth: 20_000, burnout: 10, title: "Bootstrapped Founder" },
          next: "y5-founder-pmf",
        },
      },
      {
        id: "crawl-back",
        label: "Crawl back to Big Tech",
        outcome: {
          text:
            "You tell the interviewer the startup 'taught you ownership,' and they nod knowingly. Your first paycheck feels like a warm bath.",
          effect: { netWorth: 55_000, burnout: 5, title: "Senior SWE @ Big Tech" },
          achievement: "boomerang",
          next: "y5-bigtech-staffpacket",
        },
      },
    ],
  },
  {
    id: "y4-cofounder-dating",
    year: 4,
    age: 25,
    slot: "y4-founder-garage",
    headline: "Cofounder Dating",
    text:
      "Cofounder dating: a sales guy who says 'rocket ship' unironically, your college best friend, and a stranger with a suspiciously empty calendar. Choosing wrong costs years. So does choosing nothing.",
    choices: [
      {
        id: "solo-anyway",
        label: "Found alone. You've met your options",
        outcome: {
          text:
            "You do everything: code, sales, board practice against the mirror. Slower and lonelier — but every equity point is yours.",
          effect: { netWorth: 10_000, burnout: 20, title: "Solo Founder" },
          next: "y5-founder-pmf",
        },
      },
      {
        id: "take-sales-guy",
        label: "Take the sales guy — he sells, you code",
        outcome: {
          text:
            "He closes three customers off a demo held together with tape — the 'rocket ship' guy is why revenue exists. You still veto his tweet drafts.",
          effect: { netWorth: 18_000, burnout: 10, title: "Cofounder & CTO" },
          next: "y5-founder-pmf",
        },
      },
      {
        id: "best-friend-5050",
        label: "Go 50/50 with your best friend",
        outcome: {
          text:
            "Best thing to ever happen to the company; slow-motion gamble with the friendship. You write the 'what if this goes bad' doc anyway.",
          effect: { netWorth: 8_000, burnout: 10, title: "Cofounder & CTO" },
          next: "y5-founder-pmf",
        },
      },
    ],
  },
  {
    id: "y4-first-check",
    year: 4,
    age: 25,
    slot: "y4-founder-garage",
    headline: "The First Check",
    text:
      "An angel offers $200K on a SAFE with a cap that makes your lawyer friend spit-take. He wants 'weekly involvement' and calls himself a 'micro-VC macro-thinker.' The bank balance says listen.",
    choices: [
      {
        id: "take-the-check",
        label: "Take it. Oxygen now, dilution later",
        outcome: {
          text:
            "The wire hits and payroll exists — so do Monday 'jam sessions' of competitor screenshots. Runway: extended. Cap table: scarred but alive.",
          effect: { netWorth: 25_000, burnout: 15 },
          next: "y5-founder-pmf",
        },
      },
      {
        id: "revenue-instead",
        label: "Pass — grind to revenue instead",
        outcome: {
          text:
            "You close three discounted annual prepays instead — worse money, infinitely better bosses. The pristine cap table pays for itself later.",
          effect: { netWorth: 15_000, burnout: 15, title: "Bootstrapped Founder" },
          next: "y5-founder-pmf",
        },
      },
      {
        id: "accelerator-abroad",
        label: "Join a foreign accelerator instead",
        outcome: {
          text:
            "Three months in Europe: modest stipend, brutal mentors, demo day in a converted cathedral. You come home with a customer and opinions about espresso.",
          effect: { netWorth: 8_000, burnout: 10 },
          next: "y5-founder-pmf",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Startup employee
  {
    id: "y4-startup-scale",
    year: 4,
    age: 25,
    headline: "Scaling Pains",
    text:
      "Series A hits and the founder rents an office with a neon 'Do Epic Sh*t' sign. Half your job is now interviews; the other half is apologizing for the codebase you wrote in year one.",
    choices: [
      {
        id: "hire-fast",
        label: "Hire fast — become a real VP",
        outcome: {
          text:
            "Fifteen reports, three of them 'senior to you in years but not in title.' You stop writing code and start writing Notion docs about writing code.",
          effect: { netWorth: 30_000, burnout: 25 },
          next: "y5-startup-seriesb",
        },
      },
      {
        id: "stay-hands-on",
        label: "Stay hands-on — let them hire a VP",
        outcome: {
          text:
            "The new VP's first act is a meeting called 'Process.' You keep shipping — the code respects you, and that's what matters. Right?",
          effect: { netWorth: 25_000, burnout: 10, title: "Principal Eng (De Facto)" },
          next: "y5-startup-seriesb",
        },
      },
      {
        id: "parlay-title",
        label: "Parlay the title into a rocket-ship gig",
        outcome: {
          text:
            "'VP of Engineering' opens doors even when the team was five people. The rocket ship's equity packet makes you close the laptop slowly.",
          effect: { netWorth: 60_000, burnout: 10, title: "Eng Lead @ Rocket Ship" },
          next: "y5-rocketship",
        },
      },
    ],
  },
  {
    id: "y4-equity-refresh",
    year: 4,
    age: 25,
    slot: "y4-startup-scale",
    headline: "The 409A Awakening",
    text:
      "The 409A reveals what your options are 'worth' — a spreadsheet with two load-bearing fantasies. The founder offers a comp conversation, and he knows you've been reading.",
    choices: [
      {
        id: "negotiate-hard",
        label: "Negotiate hard — bring the whole memo",
        outcome: {
          text:
            "You arrive with market data and leave with a raise and a refresh. 'You've been talking to someone' — yes, the internet, where salaries are public now.",
          effect: { netWorth: 45_000, burnout: 10 },
          next: "y5-startup-seriesb",
        },
      },
      {
        id: "accept-graciously",
        label: "Accept the refresh, keep the peace",
        outcome: {
          text:
            "You stay the founder's easiest conversation, buying goodwill you can't bank — and leaving money there instead. Both facts will matter later.",
          effect: { netWorth: 25_000, burnout: 5 },
          next: "y5-startup-seriesb",
        },
      },
      {
        id: "salary-for-equity",
        label: "Trade salary for more equity",
        outcome: {
          text:
            "A pay cut for a bigger slice — a bet your landlord does not co-sign. If it fails, it's an expensive lesson in the phrase 'preferred stock.'",
          effect: { netWorth: 5_000, burnout: 10 },
          next: "y5-startup-seriesb",
        },
      },
    ],
  },
  {
    id: "y4-monolith-reckoning",
    year: 4,
    age: 25,
    slot: "y4-startup-scale",
    headline: "The Monolith You Built",
    text:
      "The codebase you heroically wrote in year one is now every new hire's first complaint. The deploy takes 40 minutes, and someone just called code you wrote at 23 'legacy.'",
    choices: [
      {
        id: "lead-the-rewrite",
        label: "Lead the rewrite — your mess, your mop",
        outcome: {
          text:
            "Nine months of strangler-fig migration later, new hires compliment a system that is secretly your apology. Deeply satisfying either way.",
          effect: { netWorth: 30_000, burnout: 25, title: "Principal Eng (Redemption Arc)" },
          next: "y5-startup-seriesb",
        },
      },
      {
        id: "duct-tape-velocity",
        label: "Defend the monolith — duct tape and ship",
        outcome: {
          text:
            "'It's not legacy, it's proven,' you say, patching cracks while sales keeps selling. Somewhere a future engineer curses your name.",
          effect: { netWorth: 35_000, burnout: 15 },
          next: "y5-startup-seriesb",
        },
      },
      {
        id: "hire-consultants",
        label: "Hire fancy consultants to 'assess'",
        outcome: {
          text:
            "Six weeks and a shocking invoice later, their deck recommends exactly what you'd been saying — but in Helvetica, so the founder finally listens.",
          effect: { netWorth: 20_000, burnout: 10 },
          next: "y5-startup-seriesb",
        },
      },
    ],
  },
  {
    id: "y4-refresher-poker",
    year: 4,
    age: 25,
    slot: "y4-bigtech-handcuffs",
    headline: "The Phantom Offer",
    text:
      "Rumor says the comp committee only opens the big budget for flight risks. You have no competing offer — but you could imply one, deniably, over coffee. Comp poker with cards you don't hold.",
    choices: [
      {
        id: "sign-standard",
        label: "Sign standard — bluffing is for poker",
        outcome: {
          text:
            "You take the standard grant and keep your integrity un-audited. Some pots aren't worth the tell.",
          effect: { netWorth: 90_000, burnout: 10 },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "imply-the-offer",
        label: "Imply a competing offer over coffee",
        gamble: [
          {
            chance: 0.55,
            label: "Committee blinks — massive refresh",
            text:
              "'Exploring options' reaches the comp committee in 72 hours and returns as a refresh 40% over standard. Your market position was a latte and good posture.",
            effect: { netWorth: 120_000, burnout: 10 },
            achievement: "big-bonus",
            next: "y5-bigtech-staffpacket",
          },
          {
            chance: 0.45,
            label: "'We wish you the best' — bluff called",
            text:
              "Your manager, unexpectedly zen: 'If you've got something better, take it.' You scramble to make the bluff real — thankfully the rocket ship still answers.",
            effect: { netWorth: 45_000, burnout: 20, title: "Senior Eng @ Rocket Ship" },
            next: "y5-rocketship",
          },
        ],
      },
    ],
  },
  {
    id: "y4-two-doors",
    year: 4,
    age: 25,
    slot: "y4-open-market",
    headline: "Two Doors, One Résumé",
    text:
      "Two offers on one Friday: a boring insurer with a pension, or seed-startup employee #4 with equity that's either a down payment or wallpaper. Severance runs out in three weeks.",
    choices: [
      {
        id: "insurer-door",
        label: "Take the insurer — pensions are punk rock",
        outcome: {
          text:
            "You pick the company whose literal product is managing risk, which feels thematically correct. 'Boring' turns out to be a luxury good.",
          effect: { netWorth: 35_000, burnout: 5, title: "Senior SWE (Insured)" },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "startup-door",
        label: "Take the seed startup — employee #4",
        gamble: [
          {
            chance: 0.25,
            label: "It's a rocket — early seat on a real one",
            text:
              "Eight months in, growth goes vertical and a Tier-1 fund preempts the A. You took the seat everyone claims they would have — mid-layoff. Legend behavior.",
            effect: { netWorth: 55_000, burnout: 10, title: "Founding Eng (Early & Right)" },
            next: "y5-rocketship",
          },
          {
            chance: 0.75,
            label: "It dies in 8 months — back to the market",
            text:
              "The seed round was the last round. You're back in the gauntlet with a better story, thinner savings, and equity wallpaper that never got printed.",
            effect: { netWorth: 10_000, burnout: 20 },
            next: "y5-bigtech-staffpacket",
          },
        ],
      },
    ],
  },
  {
    id: "y4-pivot-or-persist",
    year: 4,
    age: 25,
    slot: "y4-founder-garage",
    headline: "Five Months of Runway",
    text:
      "Your idea has polite users and impolite growth, and a customer interview just exposed a much bigger adjacent problem. Chasing it means torching eight months of code on five months of runway.",
    choices: [
      {
        id: "persist-current",
        label: "Persist — the learning has to compound",
        outcome: {
          text:
            "The polite users slowly become paying users. It's not a rocket, it's a staircase — and staircases also go up.",
          effect: { netWorth: 15_000, burnout: 15 },
          next: "y5-founder-pmf",
        },
      },
      {
        id: "hard-pivot",
        label: "Hard pivot — bet on the bigger problem",
        gamble: [
          {
            chance: 0.45,
            label: "The new idea catches instantly",
            text:
              "The pivot lands like it was always the plan: three design partners in a month and a market that pulls. Eight months of dead code becomes tuition.",
            effect: { netWorth: 30_000, burnout: 10 },
            next: "y5-founder-pmf",
          },
          {
            chance: 0.55,
            label: "Three months lost — worse off now",
            text:
              "The bigger problem has bigger incumbents, and you burn three of five months learning why. The sunk cost fallacy sends its regards.",
            effect: { netWorth: -20_000, burnout: 20 },
            next: "y5-founder-pmf",
          },
        ],
      },
    ],
  },
  {
    id: "y4-rockstar-roulette",
    year: 4,
    age: 25,
    slot: "y4-startup-scale",
    headline: "The 10x Candidate",
    text:
      "A legend enters your pipeline: systems you've studied, references that say 'genius' — and two that say 'genius, but.' He costs both open headcounts; the safe pick is two solid mid-levels.",
    choices: [
      {
        id: "two-solids",
        label: "Hire two solid mids — teams beat heroes",
        outcome: {
          text:
            "They arrive, gel, and grind the backlog down like weather eroding a mountain. Nothing about it makes a good story — the highest compliment in hiring.",
          effect: { netWorth: 28_000, burnout: 10 },
          next: "y5-startup-seriesb",
        },
      },
      {
        id: "hire-the-legend",
        label: "Hire the legend — absorb the 'but'",
        gamble: [
          {
            chance: 0.5,
            label: "The 'but' stays dormant — he ships",
            text:
              "He ships the entire Q3 roadmap by mid-August; the 'but' surfaces only as strong opinions about tabs. Other founders ask about this hire at dinners.",
            effect: { netWorth: 45_000, burnout: 5 },
            next: "y5-startup-seriesb",
          },
          {
            chance: 0.5,
            label: "The 'but' arrives — two engineers quit",
            text:
              "Steamrolled reviews, midnight rewrites of merged code, two resignations citing 'team dynamics.' References that say 'but' mean but.",
            effect: { netWorth: 10_000, burnout: 25 },
            next: "y5-startup-seriesb",
          },
        ],
      },
    ],
  },
];
