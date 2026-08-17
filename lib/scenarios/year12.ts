import type { Scenario } from "../types";

/**
 * YEAR 12 (age 33) — the endgame begins.
 * Pools: y12-fumoney (+3), y12-postexit (+2), y12-warpath (+2).
 */
export const YEAR_12: Scenario[] = [
  // ---------------------------------------------------------------- F-U money
  {
    id: "y12-fumoney",
    year: 12,
    age: 33,
    headline: "The F-U Money Math",
    text:
      "A rainy Sunday, a spreadsheet, and a realization: at a 4% withdrawal rate, you might already be done. The number that was a fantasy at 22 is a cell reference at 33. The question is no longer 'can you retire' — it's 'who are you if you do?'",
    choices: [
      {
        id: "retire-now",
        label: "Retire. Now. The spreadsheet has spoken",
        outcome: {
          text:
            "You give notice on a Tuesday, and the strangest part is how normal it feels. No countdown, no drama — just an out-of-office that never turns off. Week one, you sleep. Week two, you panic. Week three, you start living.",
          effect: { burnout: -30, title: "Retired (FIRE)" },
          ending: "retired",
        },
      },
      {
        id: "one-more-vest",
        label: "One more vest cycle. The next grant is too big to leave",
        outcome: {
          text:
            "'Just one more year' — the most expensive sentence in tech. The grant vests, the number grows, and the goalposts quietly walk themselves twenty yards down the field. You're rich and you're still setting a 7 AM alarm.",
          effect: { netWorth: 160_000, burnout: 15 },
          next: "y13-lastcycle",
        },
      },
      {
        id: "advisor-era",
        label: "Go advisor-mode — five companies, zero standup meetings",
        outcome: {
          text:
            "You trade the badge for a portfolio: advisory shares in five startups, two board observer seats, and a calendar with actual white space. You're 'in tech' the way a retired athlete is 'in sports' — and it suits you.",
          effect: { netWorth: 60_000, burnout: -15, title: "Advisor & Investor" },
          next: "y13-lastcycle",
        },
      },
    ],
  },
  {
    id: "y12-friend-fund",
    year: 12,
    age: 33,
    slot: "y12-fumoney",
    headline: "The Group Chat Fund",
    text:
      "Your three most successful friends propose the inevitable: 'We should start a fund.' A small first vehicle, your collective networks as deal flow, and a group chat rebranded as an investment committee. It's either the beginning of a dynasty or the most expensive way to ruin four friendships. Historically, it's a coin flip.",
    choices: [
      {
        id: "start-the-fund",
        label: "Start the fund — your network IS the asset now",
        outcome: {
          text:
            "You raise a modest first fund from operators who trust your judgment, and deal flow arrives through doors only former builders can open. Two investments look genius, one looks insane, and the friendships survive quarter one — the hardest benchmark in venture.",
          effect: { netWorth: 80_000, burnout: 10, title: "General Partner" },
          next: "y13-lastcycle",
        },
      },
      {
        id: "lp-only",
        label: "Write an LP check — friends' fund, arms-length distance",
        outcome: {
          text:
            "You invest in the fund instead of the friendship-endangering job of running it. Quarterly updates arrive; group dinners stay dinners; your capital works while you don't. The cleanest seat at the table is the one without a vote.",
          effect: { netWorth: 120_000, burnout: 5 },
          next: "y13-lastcycle",
        },
      },
      {
        id: "retire-instead-fund",
        label: "Decline both — the spreadsheet says you're free",
        outcome: {
          text:
            "You realize mid-pitch that you're being recruited into a new decade of obligations and politely opt for the exit ramp instead. The friends fund launches without you; you launch a retirement with them as dinner guests. Both vehicles perform.",
          effect: { burnout: -25, title: "Retired (FIRE)" },
          ending: "retired",
        },
      },
    ],
  },
  {
    id: "y12-dream-house",
    year: 12,
    age: 33,
    slot: "y12-fumoney",
    headline: "The Dream House Ledger",
    text:
      "The house appears on a Sunday scroll: the porch, the light, the office with the window you've drawn in your head since the first cubicle. It costs exactly 'a meaningful fraction of everything.' The mortgage calculator and the retirement calculator open in adjacent tabs and begin to argue.",
    choices: [
      {
        id: "buy-the-house",
        label: "Buy it — you can't compound your way into a home",
        outcome: {
          text:
            "You wire the down payment with shaking hands and wake up in the life you were saving for. The net worth chart dips; the 'why am I doing any of this' chart resolves. Some purchases are answers, not expenses.",
          effect: { netWorth: -400_000, burnout: -15 },
          next: "y13-lastcycle",
        },
      },
      {
        id: "keep-renting",
        label: "Keep renting — the spreadsheet wins again",
        outcome: {
          text:
            "You close the listing tab and let the money keep working; the delta compounds into an entire second retirement over a decade. The landlord repaints your walls beige annually. Discipline: expensive in ways spreadsheets don't track, lucrative in ways they do.",
          effect: { netWorth: 140_000, burnout: 10 },
          next: "y13-lastcycle",
        },
      },
      {
        id: "modest-house-retire",
        label: "Buy the modest version — and retire on the difference",
        outcome: {
          text:
            "You buy the smaller house with the almost-as-good porch, and the delta between dream and modest turns out to be exactly one early retirement. You take it. The window in the office faces east. It's enough. It was always going to be enough.",
          effect: { netWorth: -200_000, burnout: -25, title: "Retired (Homeowner)" },
          ending: "retired",
        },
      },
    ],
  },
  {
    id: "y12-market-gut-punch",
    year: 12,
    age: 33,
    slot: "y12-fumoney",
    headline: "The Gut-Punch Year",
    text:
      "The market chooses this exact year — the year of your retirement math — to drop 30% and sit there, smugly. Your 'done' number is suddenly 'almost' again. The FIRE forums split into 'stay the course' and 'one more year' factions, both typing furiously from desks they claim to be leaving soon.",
    choices: [
      {
        id: "one-more-year-club",
        label: "Work one more year — rebuild the buffer properly",
        outcome: {
          text:
            "You join the One More Year club with full self-awareness and a calendar reminder labeled 'ACTUALLY LEAVE.' The market recovers; your buffer overfills; the reminder fires into a meeting you didn't need to be in. Classic club membership.",
          effect: { netWorth: 130_000, burnout: 15 },
          next: "y13-lastcycle",
        },
      },
      {
        id: "retire-leaner",
        label: "Retire anyway — flexibility beats a bigger buffer",
        outcome: {
          text:
            "You retire into the drawdown with a leaner budget and a part-time consulting escape hatch you never end up pulling. The market recovers without your permission, as markets do. Turns out the scariest year to retire was just the cheapest year to buy your freedom.",
          effect: { burnout: -25, title: "Retired (Bear Market Class)" },
          ending: "retired",
        },
      },
      {
        id: "consult-bridge",
        label: "Split it — quit the job, consult two days a week",
        outcome: {
          text:
            "You resign from the badge but not the invoice: two days a week of advisory work covers all expenses, so the portfolio can heal untouched. It's retirement with training wheels, and the wheels are made of money. Best of both spreadsheets.",
          effect: { netWorth: 70_000, burnout: -10, title: "Semi-Retired Consultant" },
          next: "y13-lastcycle",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Post-exit
  {
    id: "y12-postexit",
    year: 12,
    age: 33,
    headline: "The Morning After",
    text:
      "The wire cleared months ago and the champagne is long flat. You've done the post-exit checklist: the trip, the house, the awkward money conversations with old friends. Now it's 9 AM on a Wednesday and you have absolutely nothing to do. It's the best and worst feeling you've ever had.",
    choices: [
      {
        id: "vineyard-out",
        label: "Actually retire — buy the land, log off forever",
        outcome: {
          text:
            "You buy acreage with terrible cell coverage on purpose. The exit money compounds quietly while you learn what tomatoes need. Old colleagues visit and can't stop checking their phones. You genuinely, permanently, do not miss it.",
          effect: { burnout: -40, title: "Exited & Gone" },
          ending: "retired",
        },
      },
      {
        id: "vc-partner",
        label: "Join a fund — become the VC you always argued with",
        outcome: {
          text:
            "A Tier-1 fund hires you as the 'operator partner.' You now say 'circling back' unironically and pass on two future unicorns in your first year (everyone does — it's tradition). The carry math is long, but the game is fun from this side.",
          effect: { netWorth: 100_000, burnout: 5, title: "Partner @ VC Fund" },
          next: "y13-lastcycle",
        },
      },
      {
        id: "company-two",
        label: "Start company #2 — this time with taste",
        outcome: {
          text:
            "The itch wins. Company #2 skips every year-one mistake: real problem, real customers, hand-picked team of killers from the last war. Your reputation raises the seed round in a week. Speed-running the whole thing feels almost unfair.",
          effect: { netWorth: -80_000, burnout: 15, title: "Serial Founder" },
          next: "y13-endgame-founder",
        },
      },
    ],
  },
  {
    id: "y12-giving-question",
    year: 12,
    age: 33,
    slot: "y12-postexit",
    headline: "The Giving Question",
    text:
      "The exit money has been sitting in treasuries for months while you avoid the biggest question it asks: what's it FOR? Your alma mater calls weekly. A donor-advised fund brochure sits unopened. Meanwhile, the engineer who taught you recursion in high school still makes $52K a year. The money is quiet. The question isn't.",
    choices: [
      {
        id: "give-big-now",
        label: "Give big, give now — while it can still change lives",
        outcome: {
          text:
            "You fund CS teacher salaries in your home state, twelve full scholarships, and your old teacher's robotics lab — anonymously, then get outed by a grateful school board. The net worth chart dips. Nothing else in your life ever dips again.",
          effect: { netWorth: -300_000, burnout: -20, title: "Exited Founder (Philanthropist)" },
          next: "y13-lastcycle",
        },
      },
      {
        id: "build-foundation",
        label: "Build the machine — a foundation with an actual thesis",
        outcome: {
          text:
            "You spend a year building a small, sharp foundation with an operator's discipline: clear thesis, measurable grants, no gala dinners. It gives less this year and will give forever. Turns out you didn't retire — you just changed what compounds.",
          effect: { netWorth: -100_000, burnout: 5, title: "Founder (Of a Foundation)" },
          next: "y13-lastcycle",
        },
      },
      {
        id: "invest-first",
        label: "Grow it first — a bigger engine gives more later",
        outcome: {
          text:
            "You deploy the capital into boring compounders and set a giving trigger at 2x. The logic is airtight; the recursion teacher's salary stays $52K while it compounds. Some optimizations are correct on every axis except the one that mattered. You'll revisit. You tell yourself you'll revisit.",
          effect: { netWorth: 120_000, burnout: 5 },
          next: "y13-lastcycle",
        },
      },
    ],
  },
  {
    id: "y12-super-angel",
    year: 12,
    age: 33,
    slot: "y12-postexit",
    headline: "The Super-Angel Era",
    text:
      "Word got out that you write checks, and now your inbox is a demo day: forty pitches a week, half from people you know, all 'just raising a small pre-seed.' Your exit money could seed thirty companies or concentrate into three. Every founder you pass on might be the one your memoir regrets.",
    choices: [
      {
        id: "spray-and-pray",
        label: "Spray and pray — thirty small checks, index the ecosystem",
        outcome: {
          text:
            "You become the region's default first check: thirty companies, thirty cap tables, one legendary spreadsheet. Most will die; two look terrifyingly alive already. The portfolio's real return arrives immediately: every interesting founder in the state now calls you first.",
          effect: { netWorth: -200_000, burnout: 10, title: "Super Angel" },
          next: "y13-lastcycle",
        },
      },
      {
        id: "concentrated-bets",
        label: "Concentrate — three founders you'd bet the house on",
        outcome: {
          text:
            "You write three serious checks with real ownership and board involvement, treating angel investing like the job it secretly is. Two of the three hit their milestones early. Concentration: terrifying in theory, clarifying in practice.",
          effect: { netWorth: -100_000, burnout: 10, title: "Angel (Concentrated)" },
          next: "y13-lastcycle",
        },
      },
      {
        id: "incubate-one",
        label: "Go deepest — co-build one company as founding investor",
        outcome: {
          text:
            "You pick one founder, one problem, and one desk in their office two days a week. It's company #2 with training wheels — their sweat, your scars, shared cap table. By spring it's growing fast enough to make you nervous in the good way.",
          effect: { netWorth: -80_000, burnout: 15, title: "Co-Founder (Emeritus Energy)" },
          next: "y13-endgame-founder",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Warpath
  {
    id: "y12-warpath",
    year: 12,
    age: 33,
    headline: "The Warpath",
    text:
      "Post-Series-B life: triple the headcount, triple the targets, and a board that treats 'ambitious' as the minimum viable adjective. Your company is officially a Name People Know. The only direction the board acknowledges is up, and the only speed is faster.",
    choices: [
      {
        id: "grind-100m",
        label: "Grind to $100M ARR — the number that changes everything",
        outcome: {
          text:
            "You live in dashboards, hire a CRO with a Rolodex and a god complex, and cross $100M ARR eleven months later. The milestone tweet gets 40K likes. You read it from a hotel room, alone, in a city you couldn't name if asked.",
          effect: { netWorth: 60_000, burnout: 25 },
          next: "y13-endgame-founder",
        },
      },
      {
        id: "derisk-secondary",
        label: "Sell another secondary — de-risk while the empire builds",
        outcome: {
          text:
            "Another round, another carve-out. Your personal balance sheet is now fully divorced from the company's fate, which makes you a calmer CEO and a more dangerous negotiator. Nothing scares a board like a founder who doesn't need the money.",
          effect: { netWorth: 300_000, burnout: 10 },
          next: "y13-endgame-founder",
        },
      },
      {
        id: "emergency-bridge",
        label: "Growth stumbles — take the emergency bridge and fight",
        outcome: {
          text:
            "Two quarters miss, a competitor raises a war chest, and suddenly the board wants 'options on the table.' You take a bridge at a haircut and personally lead the turnaround. It's the hardest year of your life. The company lives.",
          effect: { netWorth: -50_000, burnout: 30 },
          next: "y13-endgame-founder",
        },
      },
    ],
  },
  {
    id: "y12-ipo-cfo-hunt",
    year: 12,
    age: 33,
    slot: "y12-warpath",
    headline: "The CFO Who's Done It",
    text:
      "Every banker says the same sentence: 'You need a CFO who's taken a company public.' There are maybe forty such humans available, they all know their market price, and the best one just finished interviewing YOU for an hour — she asks harder questions than the board and two of them you couldn't answer.",
    choices: [
      {
        id: "hire-the-assassin",
        label: "Hire her — pay the terrifying package, get the terrifying competence",
        outcome: {
          text:
            "Her package makes the comp committee sweat; her first quarter makes them evangelists. Revenue recognition tightens, the board deck grows footnotes, and bankers start using the word 'ready.' Some hires are expenses. This one's infrastructure.",
          effect: { netWorth: 50_000, burnout: 15 },
          next: "y13-endgame-founder",
        },
      },
      {
        id: "promote-the-controller",
        label: "Promote your loyal controller — bet on growth over pedigree",
        outcome: {
          text:
            "Your controller has survived every winter with you and knows the books like a memoir. She grows into the seat through sheer preparation and three brutal audit cycles. The bankers grumble about pedigree until her first flawless earnings dry-run shuts the topic down.",
          effect: { netWorth: 40_000, burnout: 20 },
          next: "y13-endgame-founder",
        },
      },
      {
        id: "delay-ipo-year",
        label: "Delay the IPO a year — hire when you're not desperate",
        outcome: {
          text:
            "You push the window a year and run the CFO search like an acquisition: slow, thorough, leverage intact. The delay costs momentum and buys certainty. When you finally file, nothing about the finance org is improvised — a sentence worth a full turn of valuation.",
          effect: { netWorth: 30_000, burnout: 10 },
          next: "y13-endgame-founder",
        },
      },
    ],
  },
  {
    id: "y12-hit-piece",
    year: 12,
    age: 33,
    slot: "y12-warpath",
    headline: "The Hit Piece",
    text:
      "A major tech outlet publishes 3,000 words titled 'The Human Cost of [Your Company]'s Growth Machine' — five anonymous ex-employees, two damning Slack screenshots, and one quote from you, two years old, reading worse than you remember saying it. The board calls. Recruiting pauses. Your mom texts 'is everything ok??'",
    choices: [
      {
        id: "own-and-reform",
        label: "Own the true parts publicly — and fix them loudly",
        outcome: {
          text:
            "Your response memo names what was true, what changed, and what you were wrong about — no lawyer-speak, no 'we can do better.' The follow-up coverage is titled 'A Rare Thing: A CEO Who Admitted It.' Three of the five anonymous sources DM you privately. Two apologize. One thanks you.",
          effect: { netWorth: 20_000, burnout: 20 },
          next: "y13-endgame-founder",
        },
      },
      {
        id: "fight-the-narrative",
        label: "Fight it — receipts, timelines, and a very public rebuttal",
        outcome: {
          text:
            "You publish a point-by-point rebuttal with documents, and win the argument while losing the vibe — 'defensive' becomes the adjective in every follow-up. The facts land; the story calcifies anyway. You learn the expensive lesson: media fights are scored on posture, not evidence.",
          effect: { netWorth: 40_000, burnout: 25 },
          next: "y13-endgame-founder",
        },
      },
      {
        id: "crisis-pr",
        label: "Hire the crisis firm — let professionals run the weather",
        outcome: {
          text:
            "The firm costs a Ferrari a month and delivers: a softer follow-up profile, a podcast appearance with pre-negotiated questions, and a news cycle that moves on schedule. Effective, expensive, and vaguely hollow — you bought your way out of a conversation you probably needed to have.",
          effect: { netWorth: -50_000, burnout: 15 },
          next: "y13-endgame-founder",
        },
      },
    ],
  },
];
