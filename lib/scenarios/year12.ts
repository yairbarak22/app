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
      "A rainy Sunday, a spreadsheet, a realization: at a 4% withdrawal rate you might already be done. The question isn't 'can you retire' — it's 'who are you if you do?'",
    choices: [
      {
        id: "retire-now",
        label: "Retire. Now. The spreadsheet has spoken",
        outcome: {
          text:
            "You give notice on a Tuesday and the strangest part is how normal it feels. Week one, you sleep. Week two, you panic. Week three, you start living.",
          effect: { burnout: -30, title: "Retired (FIRE)" },
          ending: "retired",
        },
      },
      {
        id: "one-more-vest",
        label: "One more vest cycle — the grant's too big",
        outcome: {
          text:
            "'Just one more year' — the most expensive sentence in tech. The grant vests, the goalposts walk twenty yards downfield, and you're rich with a 7 AM alarm.",
          effect: { netWorth: 160_000, burnout: 15 },
          next: "y13-lastcycle",
        },
      },
      {
        id: "advisor-era",
        label: "Advisor mode — five companies, no standups",
        outcome: {
          text:
            "Badge traded for portfolio: five advisories, two observer seats, actual white space. You're 'in tech' the way a retired athlete is 'in sports.' It suits you.",
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
      "Your three most successful friends propose the inevitable: 'We should start a fund.' Either the start of a dynasty or the most expensive way to ruin four friendships. Historically, a coin flip.",
    choices: [
      {
        id: "start-the-fund",
        label: "Start the fund — your network IS the asset",
        outcome: {
          text:
            "You raise a modest fund from operators who trust you. Two bets look genius, one insane, and the friendships survive Q1 — venture's hardest benchmark.",
          effect: { netWorth: 80_000, burnout: 10, title: "General Partner" },
          next: "y13-lastcycle",
        },
      },
      {
        id: "lp-only",
        label: "LP check only — arms-length friendship",
        outcome: {
          text:
            "You invest in the fund, not the friendship-endangering job of running it. Dinners stay dinners; capital works while you don't. The cleanest seat has no vote.",
          effect: { netWorth: 120_000, burnout: 5 },
          next: "y13-lastcycle",
        },
      },
      {
        id: "retire-instead-fund",
        label: "Decline both — the spreadsheet says free",
        outcome: {
          text:
            "Mid-pitch you realize you're being recruited into a new decade of obligations, and opt for the exit ramp. The fund launches without you; both vehicles perform.",
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
      "The house appears on a Sunday scroll: the porch, the light, the office window from your head. It costs 'a meaningful fraction of everything.' Two calculators open in adjacent tabs and argue.",
    choices: [
      {
        id: "buy-the-house",
        label: "Buy it — you can't compound into a home",
        outcome: {
          text:
            "You wire the down payment with shaking hands and wake up in the life you were saving for. The net worth chart dips; the 'why am I doing this' chart resolves.",
          effect: { netWorth: -400_000, burnout: -15 },
          next: "y13-lastcycle",
        },
      },
      {
        id: "keep-renting",
        label: "Keep renting — the spreadsheet wins",
        outcome: {
          text:
            "You close the tab and let the delta compound into a second retirement. The landlord repaints beige yearly. Discipline: costly off-spreadsheet, lucrative on it.",
          effect: { netWorth: 140_000, burnout: 10 },
          next: "y13-lastcycle",
        },
      },
      {
        id: "modest-house-retire",
        label: "Buy the modest version, retire on the rest",
        outcome: {
          text:
            "The smaller house, the almost-as-good porch. The delta between dream and modest is exactly one early retirement. The office window faces east. It's enough.",
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
      "The market picks your retirement-math year to drop 30% and sit there, smugly. 'Done' is suddenly 'almost.' The FIRE forums split into factions, all typing from desks they claim to be leaving soon.",
    choices: [
      {
        id: "one-more-year-club",
        label: "Work one more year — rebuild the buffer",
        outcome: {
          text:
            "You join the One More Year club with a reminder labeled 'ACTUALLY LEAVE.' The market recovers; the buffer overfills; the reminder fires into a meeting.",
          effect: { netWorth: 130_000, burnout: 15 },
          next: "y13-lastcycle",
        },
      },
      {
        id: "retire-leaner",
        label: "Retire anyway — flexibility beats buffer",
        outcome: {
          text:
            "You retire into the drawdown, leaner budget, escape hatch never pulled. The scariest year to retire was just the cheapest year to buy your freedom.",
          effect: { burnout: -25, title: "Retired (Bear Market Class)" },
          ending: "retired",
        },
      },
      {
        id: "consult-bridge",
        label: "Quit the job, consult two days a week",
        outcome: {
          text:
            "You resign from the badge but not the invoice: two advisory days a week cover expenses while the portfolio heals. Retirement with training wheels made of money.",
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
      "The wire cleared months ago; the champagne is flat. Trip taken, house bought, awkward money talks had. It's 9 AM on a Wednesday and you have nothing to do. The best and worst feeling you've ever had.",
    choices: [
      {
        id: "vineyard-out",
        label: "Actually retire — buy land, log off",
        outcome: {
          text:
            "You buy acreage with terrible cell coverage on purpose and learn what tomatoes need. Colleagues visit and can't stop checking their phones. You don't miss it.",
          effect: { burnout: -40, title: "Exited & Gone" },
          ending: "retired",
        },
      },
      {
        id: "vc-partner",
        label: "Join a VC fund — switch sides",
        outcome: {
          text:
            "A Tier-1 fund makes you the 'operator partner.' You say 'circling back' unironically and pass on two future unicorns in year one — it's tradition.",
          effect: { netWorth: 100_000, burnout: 5, title: "Partner @ VC Fund" },
          next: "y13-lastcycle",
        },
      },
      {
        id: "company-two",
        label: "Start company #2 — with taste",
        outcome: {
          text:
            "The itch wins. Company #2 skips every year-one mistake: real problem, real customers, killers from the last war. Your reputation raises the seed in a week.",
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
      "The exit money sits in treasuries while you avoid its biggest question: what's it FOR? The teacher who taught you recursion still makes $52K. The money is quiet. The question isn't.",
    choices: [
      {
        id: "give-big-now",
        label: "Give big, give now",
        outcome: {
          text:
            "Teacher salaries, twelve scholarships, your old teacher's robotics lab — anonymous until a grateful school board outs you. The chart dips. Nothing else does.",
          effect: { netWorth: -300_000, burnout: -20, title: "Exited Founder (Philanthropist)" },
          next: "y13-lastcycle",
        },
      },
      {
        id: "build-foundation",
        label: "Build a foundation with a thesis",
        outcome: {
          text:
            "A small, sharp foundation: clear thesis, measurable grants, no galas. Less this year, forever after. You didn't retire — you just changed what compounds.",
          effect: { netWorth: -100_000, burnout: 5, title: "Founder (Of a Foundation)" },
          next: "y13-lastcycle",
        },
      },
      {
        id: "invest-first",
        label: "Grow it first — give more later",
        outcome: {
          text:
            "A giving trigger at 2x, capital in boring compounders. Airtight logic; the recursion teacher still makes $52K meanwhile. You'll revisit. You tell yourself that.",
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
      "Word got out that you write checks: forty pitches a week, half from people you know, all 'just raising a small pre-seed.' Every pass might be the one your memoir regrets.",
    choices: [
      {
        id: "spray-and-pray",
        label: "Spray and pray — thirty small checks",
        outcome: {
          text:
            "The region's default first check: thirty cap tables, one legendary spreadsheet. Most will die; two look terrifyingly alive. Every founder now calls you first.",
          effect: { netWorth: -200_000, burnout: 10, title: "Super Angel" },
          next: "y13-lastcycle",
        },
      },
      {
        id: "concentrated-bets",
        label: "Concentrate — three serious bets",
        outcome: {
          text:
            "Three serious checks, real ownership, board involvement. Two hit milestones early. Concentration: terrifying in theory, clarifying in practice.",
          effect: { netWorth: -100_000, burnout: 10, title: "Angel (Concentrated)" },
          next: "y13-lastcycle",
        },
      },
      {
        id: "incubate-one",
        label: "Co-build one company, founding investor",
        outcome: {
          text:
            "One founder, one problem, one desk two days a week — their sweat, your scars. By spring it's growing fast enough to make you nervous in the good way.",
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
      "Post-Series-B life: triple the headcount, triple the targets, a board that treats 'ambitious' as the minimum viable adjective. The only direction acknowledged is up; the only speed is faster.",
    choices: [
      {
        id: "grind-100m",
        label: "Grind to $100M ARR",
        outcome: {
          text:
            "You live in dashboards, hire a CRO with a god complex, cross $100M ARR. The milestone tweet gets 40K likes. You read it alone in a city you couldn't name.",
          effect: { netWorth: 60_000, burnout: 25 },
          next: "y13-endgame-founder",
        },
      },
      {
        id: "derisk-secondary",
        label: "Sell another secondary — de-risk",
        outcome: {
          text:
            "Another round, another carve-out. Your balance sheet divorces the company's fate. Nothing scares a board like a founder who doesn't need the money.",
          effect: { netWorth: 300_000, burnout: 10 },
          next: "y13-endgame-founder",
        },
      },
      {
        id: "emergency-bridge",
        label: "Take the emergency bridge and fight",
        outcome: {
          text:
            "Two missed quarters, and the board wants 'options.' You take a bridge at a haircut and lead the turnaround. Hardest year of your life. The company lives.",
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
      "Every banker says it: 'You need a CFO who's taken a company public.' Forty such humans exist, all priced accordingly. The best one just interviewed YOU for an hour — two questions you couldn't answer.",
    choices: [
      {
        id: "hire-the-assassin",
        label: "Hire her — pay the terrifying package",
        outcome: {
          text:
            "Her package makes the comp committee sweat; her first quarter makes them evangelists. Some hires are expenses. This one's infrastructure.",
          effect: { netWorth: 50_000, burnout: 15 },
          next: "y13-endgame-founder",
        },
      },
      {
        id: "promote-the-controller",
        label: "Promote your loyal controller",
        outcome: {
          text:
            "Your controller knows the books like a memoir and grows into the seat through three brutal audits. One flawless earnings dry-run shuts the pedigree topic down.",
          effect: { netWorth: 40_000, burnout: 20 },
          next: "y13-endgame-founder",
        },
      },
      {
        id: "delay-ipo-year",
        label: "Delay the IPO a year — hire unhurried",
        outcome: {
          text:
            "You push the window a year and run the search like an acquisition. The delay costs momentum, buys certainty — 'nothing improvised' is worth a turn of valuation.",
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
      "A major outlet publishes 'The Human Cost of [Your Company]'s Growth Machine' — five anonymous exes and two damning Slack screenshots. The board calls. Your mom texts 'is everything ok??'",
    choices: [
      {
        id: "own-and-reform",
        label: "Own the true parts — fix them loudly",
        outcome: {
          text:
            "Your memo names what was true and what you got wrong — no lawyer-speak. Follow-up headline: 'A CEO Who Admitted It.' Three sources DM you; one says thanks.",
          effect: { netWorth: 20_000, burnout: 20 },
          next: "y13-endgame-founder",
        },
      },
      {
        id: "fight-the-narrative",
        label: "Fight it — receipts and rebuttal",
        outcome: {
          text:
            "You publish a point-by-point rebuttal with documents, winning the argument and losing the vibe. Media fights are scored on posture, not evidence.",
          effect: { netWorth: 40_000, burnout: 25 },
          next: "y13-endgame-founder",
        },
      },
      {
        id: "crisis-pr",
        label: "Hire the crisis firm",
        outcome: {
          text:
            "The firm costs a Ferrari a month and delivers a news cycle that moves on schedule. Effective, hollow — you bought your way out of a conversation you needed.",
          effect: { netWorth: -50_000, burnout: 15 },
          next: "y13-endgame-founder",
        },
      },
    ],
  },
  {
    id: "y12-lumpsum-bet",
    year: 12,
    age: 33,
    slot: "y12-fumoney",
    headline: "The Windfall Question",
    text:
      "A vest, a bonus, and a tender land the same month — your biggest-ever pile of cash. Research says lump-sum beats DCA two-thirds of the time. The research never met your amygdala at a market top.",
    choices: [
      {
        id: "dca-the-pile",
        label: "DCA it over a year — skip the regret",
        outcome: {
          text:
            "Twelve automated buys, then you stop looking. Mathematically mediocre, emotionally perfect — no day can ever be The Day You Blew It. Your amygdala sends thanks.",
          effect: { netWorth: 120_000, burnout: 5 },
          next: "y13-lastcycle",
        },
      },
      {
        id: "lump-sum-now",
        label: "Lump sum today — the math says now",
        gamble: [
          {
            chance: 0.6,
            label: "Up year — optimal entry, maximum growth",
            text:
              "The market grinds up 20% and your day-one entry captures every point. Your spreadsheet beat your feelings, and you develop the quiet superiority to prove it.",
            effect: { netWorth: 220_000, burnout: 0 },
            next: "y13-lastcycle",
          },
          {
            chance: 0.4,
            label: "You bought the top — the exact top",
            text:
              "Your wire settles on what charts later label the peak, then a 15% slide you experience daily, personally. The long run has never comforted anyone in October.",
            effect: { netWorth: -60_000, burnout: 10 },
            next: "y13-lastcycle",
          },
        ],
      },
    ],
  },
  {
    id: "y12-seed-best-friend",
    year: 12,
    age: 33,
    slot: "y12-fumoney",
    headline: "The Best Friend's Round",
    text:
      "Your oldest friend — the garage roommate — needs $150K to close his seed round. Decent idea; family founder. Money between friends is a bridge or a wall, and you find out which after it's built.",
    choices: [
      {
        id: "decline-preserve",
        label: "Decline with love — friendship > equity",
        outcome: {
          text:
            "You say no over a long dinner you pay for, so honestly that he agrees. In twenty years neither of you will remember the startup. You'll remember the dinner.",
          effect: { netWorth: 130_000, burnout: 5 },
          next: "y13-lastcycle",
        },
      },
      {
        id: "write-the-check",
        label: "Write the $150K check",
        gamble: [
          {
            chance: 0.35,
            label: "It works — money and friendship compound",
            text:
              "Year two, the startup finds its market. The check marks up alongside something rarer: a friendship that survived money. He thanks you by name, voice cracking.",
            effect: { netWorth: 180_000, burnout: -5 },
            next: "y13-lastcycle",
          },
          {
            chance: 0.65,
            label: "It dies — the friendship goes weird",
            text:
              "The startup dies in eighteen months. He apologizes too much; the group chat develops a polite frost. The money you'd written off. The weirdness you hadn't.",
            effect: { netWorth: -150_000, burnout: 10 },
            next: "y13-lastcycle",
          },
        ],
      },
    ],
  },
  {
    id: "y12-anchor-lp",
    year: 12,
    age: 33,
    slot: "y12-postexit",
    headline: "The Anchor Ask",
    text:
      "A first-time manager — sharp, hungry, unproven — asks you to anchor her fund: the big check that makes other LPs comfortable. First-time funds have the widest outcome distribution in finance.",
    choices: [
      {
        id: "small-check-support",
        label: "Write a small check — support, not anchor",
        outcome: {
          text:
            "You come in as a regular LP with a fifth of the ask — belief signaled, pile unbet. She closes slightly smaller and remembers you kindly. Optionality preserved.",
          effect: { netWorth: 100_000, burnout: 5 },
          next: "y13-lastcycle",
        },
      },
      {
        id: "anchor-the-fund",
        label: "Anchor it — big check, better economics",
        gamble: [
          {
            chance: 0.4,
            label: "She's the real thing — kingmaker status",
            text:
              "Her fund catches a generational company in month seven, and anchor economics turn the win into a windfall. Every hot first-time manager now calls you first.",
            effect: { netWorth: 200_000, burnout: 5 },
            next: "y13-lastcycle",
          },
          {
            chance: 0.6,
            label: "A decade of 'early days'",
            text:
              "Two write-offs, five zombies, one maybe. Quarterly letters master optimistic past tense. Your check ages in a cellar with no label — not gone, just geological.",
            effect: { netWorth: -120_000, burnout: 5 },
            next: "y13-lastcycle",
          },
        ],
      },
    ],
  },
  {
    id: "y12-rollup-spree",
    year: 12,
    age: 33,
    slot: "y12-warpath",
    headline: "The Roll-Up Thesis",
    text:
      "Your CFO slides a deck across the table: two smaller competitors, buyable, financed with debt and stock. Integration, she notes on slide nine, 'is where roll-ups go to die.' Then she waits.",
    choices: [
      {
        id: "organic-path",
        label: "Decline — one company, one culture",
        outcome: {
          text:
            "You keep compounding the machine you understand. A PE roll-up buys the targets and spends three years digesting them. You grow past the whole indigestion.",
          effect: { netWorth: 50_000, burnout: 15 },
          next: "y13-endgame-founder",
        },
      },
      {
        id: "execute-rollup",
        label: "Execute the roll-up — integrate or die",
        gamble: [
          {
            chance: 0.45,
            label: "Integration works — category owner",
            text:
              "Eighteen brutal months of systems mergers and culture triage later: one brand, one platform, sixty percent share. Slide nine was a warning, not a prophecy.",
            effect: { netWorth: 150_000, burnout: 20, title: "CEO (The Consolidator)" },
            next: "y13-endgame-founder",
          },
          {
            chance: 0.55,
            label: "Integration hell — zero cultures",
            text:
              "Slide nine was a prophecy. Three codebases refuse to merge; the debt arrives monthly regardless. You spend two years un-buying what you bought, at a discount.",
            effect: { netWorth: -80_000, burnout: 30 },
            next: "y13-endgame-founder",
          },
        ],
      },
    ],
  },
  {
    id: "y12-superbowl-ad",
    year: 12,
    age: 33,
    slot: "y12-warpath",
    headline: "The Big Game Ad",
    text:
      "Your CMO wants $7M for thirty seconds of the Big Game — full send. Either a category-defining flex or the priciest way to confuse 100 million people. The deck's last slide just says 'BRAND.'",
    choices: [
      {
        id: "performance-marketing",
        label: "Keep the $7M in performance marketing",
        outcome: {
          text:
            "You feed the funnel that reports its own ROI weekly. It works, unglamorously. No war room, no cameo — just pipeline, the only trophy the board recognizes.",
          effect: { netWorth: 55_000, burnout: 10 },
          next: "y13-endgame-founder",
        },
      },
      {
        id: "run-the-ad",
        label: "Run the ad — thirty seconds, full send",
        gamble: [
          {
            chance: 0.3,
            label: "Cultural moment — the ad becomes THE ad",
            text:
              "The cameo lands, the joke lands, and by halftime your brand is a meme in the best way. Monday's pipeline triples the record. 'BRAND,' vindicated.",
            effect: { netWorth: 180_000, burnout: 10 },
            next: "y13-endgame-founder",
          },
          {
            chance: 0.7,
            label: "$7M for a national shrug",
            text:
              "You run third in a break with a beer ad people still quote. A hundred million people retain a QR code nobody scanned. The board retitles the CMO.",
            effect: { netWorth: -90_000, burnout: 20 },
            next: "y13-endgame-founder",
          },
        ],
      },
    ],
  },
];
