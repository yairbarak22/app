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
      "You're 29, comfortable, and quietly bored. The money is real now — the kind that makes a spreadsheet with a retirement tab. But every day feels like the same standup, and a voice in your head keeps asking 'is this it?' The voice sounds suspiciously like your college self.",
    choices: [
      {
        id: "push-principal",
        label: "Push for Principal — become the person whose docs get quoted",
        outcome: {
          text:
            "You pick the hairiest technical problem in the company and make it your personality for a year. It works. Your design doc gets cargo-culted across three orgs, and your comp band now has a comma where you didn't expect one.",
          effect: { netWorth: 120_000, burnout: 25, title: "Principal Engineer" },
          next: "y9-politics",
        },
      },
      {
        id: "coast-invest",
        label: "Coast at work, get serious about investing",
        outcome: {
          text:
            "You automate your job 30% and your savings 100%. Index funds, max 401(k), backdoor Roth — the personal-finance subreddit would weep with pride. Compound interest becomes your favorite coworker.",
          effect: { netWorth: 85_000, burnout: -10 },
          next: "y9-politics",
        },
      },
      {
        id: "angel-checks",
        label: "Write angel checks into friends' startups",
        outcome: {
          text:
            "You Venmo your way onto five cap tables with checks that used to be a down payment. Four of the five founders stop replying to texts within a year. The fifth keeps sending charts that go up. You choose to believe the charts.",
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
      "You come back from a three-month sabbatical to discover the org rearranged itself in your absence: your project has a new owner, your desk has a new occupant, and your manager has a new manager. Nobody is hostile. Everybody has simply... moved on. The org, it turns out, heals over people like bark over a nail.",
    choices: [
      {
        id: "reearn-the-seat",
        label: "Re-earn the seat — six months of undeniable work",
        outcome: {
          text:
            "You skip the territorial whining and just ship: two quarters of quietly excellent work that makes the 'wait, who owns this now?' question answer itself. The org re-forms around you like it never forgot. It did forget. You made it remember.",
          effect: { netWorth: 80_000, burnout: 15 },
          next: "y9-politics",
        },
      },
      {
        id: "fresh-eyes-leverage",
        label: "Use the outsider eyes — propose what nobody inside can see",
        outcome: {
          text:
            "Three months of distance gave you what consultants charge millions for: the ability to see the obvious. Your 'here's what we're all pretending not to notice' doc lands like a meteor, and leadership hands you a new org to fix the mess it names.",
          effect: { netWorth: 95_000, burnout: 10, title: "Principal Eng (Fresh Eyes)" },
          next: "y9-politics",
        },
      },
      {
        id: "realize-want-out",
        label: "Admit the sabbatical told you something — start planning the exit",
        outcome: {
          text:
            "The org moved on without you and — here's the thing — you moved on without it. You coast gracefully while building the exit: savings rate up, side bets seeded, resume warm. The cage door is open. You're just choosing your moment.",
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
      "The dev tool you built on weekends — to fix your own annoyance — hits 20K GitHub stars and a front-page launch you didn't write. Three companies use it in production. One emailed asking for an enterprise license. Your employer's IP policy, which you skimmed at onboarding six years ago, enters the chat.",
    choices: [
      {
        id: "monetize-it",
        label: "Monetize — licenses, sponsors, the whole indie playbook",
        outcome: {
          text:
            "You clear the IP review (barely, with a lawyer), launch paid tiers, and watch the side project out-earn your bonus. It's a second job that feels like a first love. The day-job standup starts feeling like a hobby you're too polite to quit.",
          effect: { netWorth: 60_000, burnout: 15, title: "Engineer & Maintainer (Paid)" },
          next: "y9-politics",
        },
      },
      {
        id: "donate-to-foundation",
        label: "Donate it to a foundation — take the reputation, skip the invoices",
        outcome: {
          text:
            "You hand the project to a neutral foundation, keep a maintainer seat, and convert 20K stars into the kind of industry standing money can't buy and recruiters can't ignore. Every conference now knows your name. Your weekends return home.",
          effect: { netWorth: 85_000, burnout: -5, title: "Principal Eng (OSS Famous)" },
          next: "y9-politics",
        },
      },
      {
        id: "company-claims-ip",
        label: "The company claims it — fight for your nights and weekends",
        outcome: {
          text:
            "Legal sends a letter with the word 'derivative' in it; you send back commit timestamps, personal hardware receipts, and a quiet fury. The settlement: you keep the project, they get a shout-out. The fight costs a year of goodwill and buys a lifetime lesson about page 14 of employment agreements.",
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
      "A year inside the frontier lab: the work is a decade ahead of everything else, the Slack debates cite philosophy papers, and someone in the kitchen is always saying 'timelines.' Then the tender offer email lands — you can sell a chunk of your equity at a valuation with a B in it.",
    choices: [
      {
        id: "tender-sell",
        label: "Sell in the tender. Diversification is a love language",
        outcome: {
          text:
            "You sell a slice at a number your parents don't believe and your financial advisor frames. The true believers side-eye you at lunch. You buy index funds and sleep like a Victorian orphan who's been adopted by a duke.",
          effect: { netWorth: 350_000, burnout: 10 },
          next: "y9-politics",
        },
      },
      {
        id: "hold-for-agi",
        label: "Hold everything. If the mission works, money is irrelevant anyway",
        outcome: {
          text:
            "You decline the tender and go back to work. Your equity remains a thought experiment with a dollar sign. Your conviction is either visionary or a cautionary tale, and you won't know which for years. The uncertainty has a weight.",
          effect: { netWorth: 60_000, burnout: 25 },
          next: "y9-politics",
        },
      },
      {
        id: "spectacular-burnout",
        label: "Admit the pace is unsustainable — take a real break",
        outcome: {
          text:
            "You hit a wall at 2 AM on a Tuesday, mid-eval-run, and finally say it out loud: 'I can't keep doing this.' The lab, to its credit, grants a sabbatical. You spend six months relearning how to be a person. It mostly works.",
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
      "The lab's biggest launch is a week out, and the safety team's eval report has one red cell nobody can explain away. Product says the red cell is 'measurement noise.' Safety says that's what red cells always get called. You're the engineer whose name is on the deployment script, which makes your opinion suddenly, uncomfortably load-bearing.",
    choices: [
      {
        id: "side-with-safety",
        label: "Back the safety team — the red cell decides, not the deadline",
        outcome: {
          text:
            "The launch slips three weeks while the red cell gets root-caused: real, rare, fixable. Product fumes, then forgets; safety remembers forever. You've made an enemy of a deadline and an ally of everyone who was quietly holding their breath.",
          effect: { netWorth: 60_000, burnout: 15, title: "MTS (Trusted by Safety)" },
          next: "y9-politics",
        },
      },
      {
        id: "side-with-shipping",
        label: "Ship it — red cells are why there's a rollback plan",
        outcome: {
          text:
            "The launch lands, the metrics soar, and the red cell never materializes in prod — this time. You get the launch bonus and a tiny permanent tenant in the back of your mind that pays rent in 3 AM what-ifs.",
          effect: { netWorth: 90_000, burnout: 20 },
          next: "y9-politics",
        },
      },
      {
        id: "broker-compromise",
        label: "Broker the middle path — staged rollout with tripwires",
        outcome: {
          text:
            "You design the compromise: 1% rollout, automated tripwires, safety sign-off at each stage. Both teams claim victory, which is how you know it worked. The playbook becomes lab standard with your name in the doc header.",
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
      "The other frontier lab — the one your lab's all-hands refers to only as 'them' — offers you 1.5x everything: comp, scope, and a mission statement that reads suspiciously like your current one with the adjectives rearranged. Loyalty in this industry has a market price, and yours was just quoted.",
    choices: [
      {
        id: "defect-for-money",
        label: "Take it — missions are similar, multiples aren't",
        outcome: {
          text:
            "You cross the street for 1.5x and discover the grass is the same shade of research-lab beige. New badge, new NDAs, same beautiful impossible problems. Your old lab's group chat goes quiet for exactly one news cycle.",
          effect: { netWorth: 150_000, burnout: 15, title: "Senior MTS (Defected)" },
          next: "y9-politics",
        },
      },
      {
        id: "leak-for-counter",
        label: "Show your lab the offer — let them match it",
        outcome: {
          text:
            "The counter arrives in 48 hours: not quite 1.5x, plus an equity refresh and a scope you actually wanted. You stay, richer and slightly radioactive — everyone now knows you priced the mission. The mission, notably, did not price you first.",
          effect: { netWorth: 120_000, burnout: 10 },
          next: "y9-politics",
        },
      },
      {
        id: "loyalty-discount",
        label: "Decline without leverage — you're here for this lab's version",
        outcome: {
          text:
            "You delete the email and take the loyalty discount, a real number you occasionally calculate in weak moments. What you keep: the project you started, the team you trust, and the specific version of the future you actually believe in. Expensive. Yours.",
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
      "A Big Tech corp-dev team 'would love to find time' — the mating call of acquisition. Diligence begins: data rooms, retention spreadsheets, and executives practicing the word 'synergy' in the mirror. Your equity is either about to mean everything or nothing.",
    choices: [
      {
        id: "champion-deal",
        label: "Champion the deal — get this thing across the line",
        outcome: {
          text:
            "You run diligence like a launch: crisp docs, clean answers, no surprises. The deal closes. The all-hands cries. Your options convert into actual, spendable money, and your new badge says a trillion-dollar company's name on it.",
          effect: { netWorth: 300_000, burnout: 10, title: "Eng Lead (Post-Acquisition)" },
          next: "y9-politics",
        },
      },
      {
        id: "deal-collapses",
        label: "Stay neutral and keep shipping — deals die all the time",
        outcome: {
          text:
            "Three weeks before signing, the acquirer's stock dips 8% and the deal dies in a phone call that lasts four minutes. The CEO announces 'we were never for sale' to a room that has read the leaked deck. Back to work.",
          effect: { netWorth: 30_000, burnout: 20 },
          next: "y9-zombie",
        },
      },
      {
        id: "leave-before-deal",
        label: "Don't wait for the coin flip — jump to another rocket",
        outcome: {
          text:
            "You've seen enough M&A limbo to know it breaks people. You take a strong offer at a growth-stage company while your old coworkers refresh the news for updates about their own jobs. Cold? Maybe. Liquid? Yes.",
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
      "The acquisition closed — congratulations — and the fine print introduces itself: half your payout is an 'earnout' gated on two years of retention and targets set by people who've never seen your codebase. You are now extremely well-paid and extremely not free. The cage is golden. The cage is also a cage.",
    choices: [
      {
        id: "grind-the-earnout",
        label: "Grind the full earnout — two years, every dollar",
        outcome: {
          text:
            "You hit every gate, survive two integrations and one 'harmonization,' and collect the last tranche to the day. The money is enormous. The two years are gone. You do the math on both and decline to publish the result.",
          effect: { netWorth: 120_000, burnout: 25 },
          next: "y9-politics",
        },
      },
      {
        id: "negotiate-early-release",
        label: "Negotiate an early release — 70% now beats 100% miserable",
        outcome: {
          text:
            "Six months in, you trade the remaining earnout for a discounted lump sum and your freedom. The acquirer gets certainty; you get out before the integration meetings achieve sentience. Everyone wins, especially your blood pressure.",
          effect: { netWorth: 80_000, burnout: 5, title: "Eng Lead (Released Early)" },
          next: "y9-politics",
        },
      },
      {
        id: "coast-and-collect",
        label: "Coast the earnout — do exactly what the targets say, nothing more",
        outcome: {
          text:
            "You read the earnout targets like a contract lawyer and hit precisely them. Innovation: zero. Compliance: total. The acquirer gets what it measured, a lesson in incentive design they'll bill someone else to learn. You get paid in full.",
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
      "Mid-diligence, the acquirer's engineers find it: the licensing shortcut in the core module — the one YOU wrote at 2 AM in year one, flagged 'TODO: fix before anyone rich looks at this.' Someone rich is looking at it. The deal team wants answers. Your commit hash is on everything.",
    choices: [
      {
        id: "own-and-fix",
        label: "Own it — full disclosure and a remediation plan by Friday",
        outcome: {
          text:
            "You present the sin and the fix in one memo, priced and scheduled. The acquirer discounts the deal 4% and doubles their opinion of you — 'the one who tells the truth under fire' goes in someone's notes. The deal survives. So does your name.",
          effect: { netWorth: 60_000, burnout: 15, title: "Eng Lead (Post-Acquisition)" },
          next: "y9-politics",
        },
      },
      {
        id: "rewrite-history",
        label: "Quietly rewrite it this weekend and hope diligence moves on",
        outcome: {
          text:
            "Your stealth weekend rewrite is technically flawless and forensically obvious — diligence teams read git logs like detectives. The trust damage costs more than the code ever would have. The deal dies of a thousand new questions.",
          effect: { netWorth: 50_000, burnout: 20 },
          next: "y9-zombie",
        },
      },
      {
        id: "blame-architecture",
        label: "Frame it as 'known tech debt' in the architecture doc",
        outcome: {
          text:
            "You launder the skeleton through a 'technical debt register' where it sits alongside forty mundane items, hoping for camouflage. The acquirer's lawyers find it anyway — lawyers always read appendix C — and the deal limps into a 'strategic pause.'",
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
      "The winter survivors get the spring. Suddenly your metrics are 'a story,' your story is 'a deck,' and you're pitching Sand Hill Road twice a day for six weeks. Sixty meetings. Fifty-five passes. Three term sheets. One decision.",
    choices: [
      {
        id: "tier1-brutal-terms",
        label: "Take the Tier-1 fund with the brutal terms",
        outcome: {
          text:
            "The brand-name fund leads at a serious valuation — with a board seat, a 2x participating preference, and a partner who texts 'thoughts?' at 6 AM. The logo on the press release opens every door. The terms close a few behind you.",
          effect: { netWorth: 40_000, burnout: 20, title: "CEO & Co-Founder" },
          next: "y9-scale",
        },
      },
      {
        id: "boutique-friendly",
        label: "Take the smaller fund with founder-friendly terms",
        outcome: {
          text:
            "Less money, better terms, and a partner who was a founder herself and answers emails like a human. The TechCrunch headline is smaller. Your ownership percentage is not.",
          effect: { netWorth: 25_000, burnout: 10, title: "CEO & Co-Founder" },
          next: "y9-scale",
        },
      },
      {
        id: "reject-vc",
        label: "Tear up the term sheets — bootstrap forever",
        outcome: {
          text:
            "You email three funds a polite no and take a screenshot for posterity. Revenue is the only investor now. Growth is slower, but every dollar of it is yours, and board meetings are you, a mirror, and a P&L that behaves.",
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
      "The new board's first ask: 'executive bench.' You need a Head of Sales, a Head of Product, and possibly a Head of Heads. The candidates fall into two species: FAANG refugees with gorgeous resumes and startup mutts with scar tissue. Every hire reshapes the company's DNA. No pressure.",
    choices: [
      {
        id: "poach-faang",
        label: "Poach from FAANG — buy the playbooks",
        outcome: {
          text:
            "The FAANG execs arrive with frameworks, planning cadences, and salary expectations that bend your budget. Half the process is overkill; the other half is why big companies are big. The company grows up fast — and grumbles about it hourly.",
          effect: { netWorth: 20_000, burnout: 15 },
          next: "y9-scale",
        },
      },
      {
        id: "promote-within",
        label: "Promote the garage-days people — loyalty over pedigree",
        outcome: {
          text:
            "Your employee #4 becomes Head of Product and outworks every framework, because she's been living the product since it was a whiteboard. The board frets about 'experience gaps.' The metrics don't. Some things scale better than resumes: context.",
          effect: { netWorth: 35_000, burnout: 10 },
          next: "y9-scale",
        },
      },
      {
        id: "fractional-everything",
        label: "Go fractional — rent executives until product-market-fit-fit",
        outcome: {
          text:
            "A fractional CFO, a fractional CMO, and a full-time sense of flexibility. It's executive function by subscription — 60% of the wisdom at 30% of the burn, cancelable anytime. The board calls it creative. Your runway calls it genius.",
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
      "The angel from the pool party — remember his 'vibe checks'? — resurfaces the week your Series A closes, claiming his SAFE came with a board seat 'per our conversation.' There was no such conversation. There is, unfortunately, one ambiguous voice memo. Your lawyer listens to it four times and says 'huh.'",
    choices: [
      {
        id: "buy-him-out",
        label: "Buy him out entirely — expensive amnesia",
        outcome: {
          text:
            "You pay a premium to convert his SAFE and part ways forever, wiring away a chunk of the fresh round for the cleanest cap table in the portfolio. The board seat question dies with the wire. Peace, it turns out, has a list price.",
          effect: { netWorth: -60_000, burnout: 10 },
          next: "y9-scale",
        },
      },
      {
        id: "give-observer-seat",
        label: "Offer a board observer seat — feed the ego, guard the votes",
        outcome: {
          text:
            "He gets a chair with no vote, a title for his Twitter bio, and quarterly opportunities to say 'just riffing here.' You get his network, his silence on the voice memo, and control of every decision that matters. Diplomacy: annoying, effective.",
          effect: { netWorth: 10_000, burnout: 20 },
          next: "y9-scale",
        },
      },
      {
        id: "lawyer-up",
        label: "Lawyer up — the cap table is not a vibe",
        outcome: {
          text:
            "Your counsel dismantles the voice-memo theory in one crisp letter with exhibits. He folds before mediation, muttering about 'founder ingratitude' to anyone at the pool who'll listen. Legal fees hurt. Precedent pays: nobody ever tries you again.",
          effect: { netWorth: -30_000, burnout: 15 },
          next: "y9-scale",
        },
      },
    ],
  },
];
