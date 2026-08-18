import type { Scenario } from "../types";

/**
 * YEAR 2 (age 23) — first real job, first real pain.
 * Pools: y2-bigtech-oncall (+3 variants), y2-startup-ramen (+3 variants).
 */
export const YEAR_02: Scenario[] = [
  // ---------------------------------------------------------------- Big Tech
  {
    id: "y2-bigtech-oncall",
    year: 2,
    age: 23,
    headline: "The Pager Never Sleeps",
    text:
      "You inherit on-call for a legacy service written in 2011 by someone who now farms goats in Portugal. It pages at 3 AM, nightly. Your manager calls it 'a great growth opportunity.'",
    choices: [
      {
        id: "own-the-service",
        label: "Own it — become the beast's keeper",
        outcome: {
          text:
            "You tame the alerts and become load-bearing infrastructure yourself. Promo to SWE II, fat RSU refresher, and the creeping truth that you can never quit.",
          effect: { netWorth: 60_000, burnout: 25, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "quiet-quit",
        label: "Do the minimum. Protect your peace, king",
        outcome: {
          text:
            "You mute the pager, coast through sprint planning, and rediscover hobbies. RSUs still vest. Your review says 'meets some expectations,' which will age poorly.",
          effect: { netWorth: 40_000, burnout: -5, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
    ],
  },
  {
    id: "y2-hackweek-hero",
    year: 2,
    age: 23,
    slot: "y2-bigtech-oncall",
    headline: "Hack Week Hero",
    text:
      "Your hack week tool — it auto-writes the status reports nobody reads — goes company-viral. Three VPs want demos. Your manager finds out from someone else's newsletter.",
    choices: [
      {
        id: "pitch-the-vp",
        label: "Pitch the VPs — ride it all the way up",
        outcome: {
          text:
            "You demo in a room with real windows and become a funded team of one. Visibility: acquired. Target on back: also acquired.",
          effect: { netWorth: 55_000, burnout: 20, title: "SWE II (High Visibility)" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "credit-the-team",
        label: "Share the credit with the whole team",
        outcome: {
          text:
            "Four names on the demo slide; your teammates would now follow you into a 4 AM incident. The VPs remember vaguely. Your team remembers exactly.",
          effect: { netWorth: 42_000, burnout: 5, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "hoard-it",
        label: "Keep it as your secret personal edge",
        outcome: {
          text:
            "You quietly automate a third of your job and tell no one. Output: superhuman. Calendar: empty. It's not a career strategy. It's a heist.",
          effect: { netWorth: 48_000, burnout: -5, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
    ],
  },
  {
    id: "y2-rto-mandate",
    year: 2,
    age: 23,
    slot: "y2-bigtech-oncall",
    headline: "Return to Office",
    text:
      "Memo: 'return to our collaboration culture' — three badge-ins a week, enforced by dashboard. Your commute is 90 minutes. The exec who sent it lives on a ranch in Montana.",
    choices: [
      {
        id: "comply-commute",
        label: "Comply — the podcast backlog awaits",
        outcome: {
          text:
            "You master park-and-rides and pre-9AM parking. The office is half-empty, but attendance shows green on the dashboard, and the dashboard is what gets promoted.",
          effect: { netWorth: 45_000, burnout: 15, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "coffee-badge",
        label: "Master the art of the coffee badge",
        outcome: {
          text:
            "Badge in, grab cold brew, wave at a director, badge out. Impeccable metrics; your productivity never left home. Not lying — metrics-driven presence.",
          effect: { netWorth: 42_000, burnout: 0, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "quit-for-remote",
        label: "Quit for a remote-first startup",
        outcome: {
          text:
            "You trade the badge dashboard for a startup that measures output. Pay: a haircut. Equity: a lottery ticket. Commute: eleven steps. Principles are expensive.",
          effect: { netWorth: 20_000, burnout: 5, title: "Senior Eng @ Startup" },
          next: "y3-startup-seriesa",
        },
      },
    ],
  },
  {
    id: "y2-the-outage",
    year: 2,
    age: 23,
    slot: "y2-bigtech-oncall",
    headline: "You Caused The Outage",
    text:
      "Your Friday-afternoon config change kills checkout for 43 minutes. The incident channel gains 400 members in real time. A status page is turning red because of you, personally.",
    choices: [
      {
        id: "own-it-publicly",
        label: "Own it — write the postmortem yourself",
        outcome: {
          text:
            "Your postmortem is so honest it's taught in onboarding. 'The engineer who owned it' becomes your origin story. Integrity under fire is rare in this building.",
          effect: { netWorth: 50_000, burnout: 20, title: "SWE II (Battle-Tested)" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "quiet-fix",
        label: "Fix it fast, keep the report vague",
        outcome: {
          text:
            "The revert lands in minutes and the report says 'configuration drift.' You got away with it. You know you got away with it. The knowing is a tax, paid nightly.",
          effect: { netWorth: 45_000, burnout: 15, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "guardrails-crusade",
        label: "Turn the shame into deploy guardrails",
        outcome: {
          text:
            "You build the safety rails that would have stopped you. Six months later a teammate's bad config bounces off harmlessly, and you feel something like absolution.",
          effect: { netWorth: 48_000, burnout: 10, title: "SWE II (Platform)" },
          next: "y3-bigtech-efficiency",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Startup
  {
    id: "y2-startup-ramen",
    year: 2,
    age: 23,
    headline: "Ramen Profitability",
    text:
      "Seven months of runway, a burn rate the founder calls 'aggressive but visionary.' He asks all four of you to defer salary until the round closes. It's definitely closing. Any week now.",
    choices: [
      {
        id: "defer-salary",
        label: "Believe. Defer salary for double equity",
        outcome: {
          text:
            "You're paid in vibes and options; your diet is 40% instant noodles. But the product ships, users trickle in, and that equity is starting to mean something.",
          effect: { netWorth: -18_000, burnout: 20 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "moonlight",
        label: "Keep the faith — moonlight to pay rent",
        outcome: {
          text:
            "Days: startup. Nights: WordPress for an Ohio dentist. Weekends: a blur. Your bank account recovers. Your sleep schedule files for divorce.",
          effect: { netWorth: 25_000, burnout: 30 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "jump-to-bigtech",
        label: "Jump to Big Tech before the money dies",
        outcome: {
          text:
            "You land an SWE II offer and tell the founder over coffee. He calls you a mercenary. Your new badge photo is great. Your old equity is a sentimental PDF.",
          effect: { netWorth: 50_000, burnout: 5, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
    ],
  },
  {
    id: "y2-pivot-hell",
    year: 2,
    age: 23,
    slot: "y2-startup-ramen",
    headline: "Pivot Number Three",
    text:
      "Emergency all-hands (four people, one couch): pivot three, from 'Uber for laundry' to 'B2B laundry analytics' to, as of this morning, 'AI-powered logistics.' The codebase has commitment issues.",
    choices: [
      {
        id: "back-the-vision",
        label: "Back the founder — conviction is the job",
        outcome: {
          text:
            "You rebuild the backend a third time, faster — practice makes pivot. Weirdly, this one gets traction. His 'I told you so' is insufferable and earned.",
          effect: { netWorth: 5_000, burnout: 20 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "push-your-idea",
        label: "Push YOUR idea — you actually watch users",
        outcome: {
          text:
            "You arrive with data, mockups, and the audacity of being right at 23. He fights it a week, then caves. The pivot becomes 'ours' in retelling. Whatever ships.",
          effect: { netWorth: 12_000, burnout: 20, title: "Founding Engineer (De Facto PM)" },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "leave-the-carousel",
        label: "Step off the carousel — Big Tech hatch",
        outcome: {
          text:
            "Three products in one year beats any bootcamp, and the interviewer eats the war stories up. You leave with references and a salary with sensible commas.",
          effect: { netWorth: 45_000, burnout: 5, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
    ],
  },
  {
    id: "y2-first-hires",
    year: 2,
    age: 23,
    slot: "y2-startup-ramen",
    headline: "The First Hires",
    text:
      "The seed closed and the founder hands you a mandate: 'Build the engineering team.' You've never interviewed anyone. The pipeline is your college group chat and one guy from Reddit.",
    choices: [
      {
        id: "hire-friends",
        label: "Hire your college friends — known chaos",
        outcome: {
          text:
            "Standups feel like game night and the team ships like it's finals week, permanently. HR (there is no HR) would flag the group chat. Velocity would defend it.",
          effect: { netWorth: 8_000, burnout: 15 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "hire-graybeard",
        label: "Blow the budget on one senior engineer",
        outcome: {
          text:
            "She's twice your age, thrice your salary, worth every dollar: the codebase gets boring in the best way. You learn more by osmosis than school ever taught.",
          effect: { netWorth: 2_000, burnout: 5 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "hire-nobody",
        label: "Hire nobody — you ARE the eng team",
        outcome: {
          text:
            "Why hire when you can not sleep? You ship the roadmap solo. The bus factor is one, the bus is circling, and the rubber duck hears full sentences now.",
          effect: { netWorth: 15_000, burnout: 30, title: "The Entire Eng Org" },
          next: "y3-startup-seriesa",
        },
      },
    ],
  },
  {
    id: "y2-hn-launch",
    year: 2,
    age: 23,
    slot: "y2-startup-ramen",
    headline: "#1 on Hacker News",
    text:
      "Show HN hits #1 at 7 AM; the servers hit 100% CPU by 7:15. The founder is screenshotting the traffic graph for investors while the database makes a sound databases shouldn't make.",
    choices: [
      {
        id: "allnighter-heroics",
        label: "All-nighter heroics — keep it up by hand",
        outcome: {
          text:
            "Eighteen hours of caching, queueing, and prayer. The site survives, the sign-ups stick, and you wake up mildly famous in one specific subculture.",
          effect: { netWorth: 15_000, burnout: 25 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "calm-scaling",
        label: "Waitlist now, scale calmly on Monday",
        outcome: {
          text:
            "A tasteful 'we're overwhelmed' page converts better than the product did. Scarcity is a feature. You fix the architecture over a civilized week.",
          effect: { netWorth: 10_000, burnout: 5 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "enjoy-the-moment",
        label: "Let it burn — you're reading comments",
        outcome: {
          text:
            "The site limps while you take feature requests and one unforgettable roast of your font. The users who stayed through the outage become evangelists.",
          effect: { netWorth: 6_000, burnout: -5 },
          next: "y3-startup-seriesa",
        },
      },
    ],
  },
  {
    id: "y2-weekend-rewrite",
    year: 2,
    age: 23,
    slot: "y2-bigtech-oncall",
    headline: "The Weekend Rewrite Bet",
    text:
      "In caffeinated hubris you tell your manager the flaky payments service 'could be rewritten in a weekend.' He says: 'Prove it. Monday demo, or the safe six-month plan.' The thing has you now.",
    choices: [
      {
        id: "safe-six-months",
        label: "Walk it back — the careful quarter fix",
        outcome: {
          text:
            "You un-say the brave thing and write a migration doc. It ships in a quarter, boringly and correctly. Your ego files the weekend under 'unfinished business.'",
          effect: { netWorth: 45_000, burnout: 10 },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "bet-the-weekend",
        label: "Bet the weekend — demo Monday standup",
        gamble: [
          {
            chance: 0.55,
            label: "It works — Monday makes you a legend",
            text:
              "Forty hours, nine pizzas, one 3 AM crisis — the demo handles triple the load. The VP forwards it org-wide. 'The weekend rewrite' enters folklore, name attached.",
            effect: { netWorth: 60_000, burnout: 20, title: "SWE II (Weekend Legend)" },
            next: "y3-bigtech-efficiency",
          },
          {
            chance: 0.45,
            label: "It breaks prod Monday morning",
            text:
              "It demos beautifully, then meets real traffic and folds like a lawn chair. You revert with shaking hands. The postmortem is kind; production is undefeated.",
            effect: { netWorth: 30_000, burnout: 25 },
            next: "y3-bigtech-efficiency",
          },
        ],
      },
    ],
  },
  {
    id: "y2-cfp-lottery",
    year: 2,
    age: 23,
    slot: "y2-bigtech-oncall",
    headline: "The CFP Lottery",
    text:
      "The biggest conference in your stack opens its CFP, and your draft about taming the pager beast is... actually good? Acceptance rate: brutal. Upside: a stage at 23. Your manager has seen CFPs die.",
    choices: [
      {
        id: "skip-the-cfp",
        label: "Skip it — the roadmap can't wait",
        outcome: {
          text:
            "You close the tab and ship the quarter. The conference happens without you; the roadmap doesn't. There's always next year, says everyone, annually, forever.",
          effect: { netWorth: 43_000, burnout: 0 },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "submit-the-talk",
        label: "Submit and prep like it's accepted",
        gamble: [
          {
            chance: 0.4,
            label: "Accepted — a stage at 23",
            text:
              "The acceptance lands mid-standup; you play it cool for four seconds. The talk hits, and staff engineers from other companies review your PRs for fun.",
            effect: { netWorth: 50_000, burnout: 10, title: "SWE II (Conference Speaker)" },
            next: "y3-bigtech-efficiency",
          },
          {
            chance: 0.6,
            label: "Rejected — prep becomes internal hit",
            text:
              "The rejection stings for a day. You give the talk internally and it becomes required onboarding viewing. The conference lost; the deck lives forever.",
            effect: { netWorth: 42_000, burnout: 5 },
            next: "y3-bigtech-efficiency",
          },
        ],
      },
    ],
  },
  {
    id: "y2-early-buyin",
    year: 2,
    age: 23,
    slot: "y2-startup-ramen",
    headline: "The Early Buy-In",
    text:
      "The founder, short on bridge cash, offers extra shares at seed price before the round 'definitely reprices everything.' Your savings: one emergency fund. Generational entry, or rent money on fire?",
    choices: [
      {
        id: "keep-the-cushion",
        label: "Pass — emergency funds aren't capital",
        outcome: {
          text:
            "You keep the cushion and sleep like someone with a cushion. The math haunts you at the next announcement, but certainty compounds too — in cortisol saved.",
          effect: { netWorth: 20_000, burnout: 5 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "buy-more-equity",
        label: "Wire the savings — double down",
        gamble: [
          {
            chance: 0.4,
            label: "Round doubles — your stake balloons",
            text:
              "The A closes at 2.3x in four months; your kitchen-table wire is the best trade you've ever made. You're now incapable of shutting up about 'conviction.'",
            effect: { netWorth: 35_000, burnout: 10 },
            next: "y3-startup-seriesa",
          },
          {
            chance: 0.6,
            label: "Round delays — savings go illiquid",
            text:
              "The 'definitely coming' round takes its time. Your savings now live in a cap table, and your emergency fund is a promise. Your landlord prefers currency.",
            effect: { netWorth: -15_000, burnout: 15 },
            next: "y3-startup-seriesa",
          },
        ],
      },
    ],
  },
  {
    id: "y2-client-poker",
    year: 2,
    age: 23,
    slot: "y2-startup-ramen",
    headline: "The Client Poker Game",
    text:
      "Your biggest client — 60% of revenue — demands half price or they 'reevaluate the relationship.' The founder is off-grid at Burning Man. Procurement is bluffing. Probably. He does this. Probably.",
    choices: [
      {
        id: "sign-the-discount",
        label: "Sign the discount — 60% doesn't get dared",
        outcome: {
          text:
            "You take the haircut and keep the whale. Margins wince; payroll doesn't. The founder calls it 'the right call' — founder for 'glad it wasn't me.'",
          effect: { netWorth: 15_000, burnout: 10 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "call-the-bluff",
        label: "Hold price — call procurement's bluff",
        gamble: [
          {
            chance: 0.55,
            label: "They fold — renewal at full price",
            text:
              "Three days of terrifying silence, then an invite titled 'Renewal — moving forward.' Enterprise sales' great secret: everyone bluffs, always, about everything.",
            effect: { netWorth: 30_000, burnout: 10 },
            next: "y3-startup-seriesa",
          },
          {
            chance: 0.45,
            label: "They walk — 60% of revenue exits",
            text:
              "The bluff was real. The whale churns with one polite email, and you close three emergency deals at worse discounts than the one you refused. Poker has stakes.",
            effect: { netWorth: -5_000, burnout: 20 },
            next: "y3-startup-seriesa",
          },
        ],
      },
    ],
  },
];
