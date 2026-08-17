import type { Scenario } from "../types";

/**
 * YEAR 10 (age 31) — the poach and the crossroads.
 * Pools: y10-poach (+3), y10-founder-crossroads (+3).
 */
export const YEAR_10: Scenario[] = [
  // ---------------------------------------------------------------- The poach
  {
    id: "y10-poach",
    year: 10,
    age: 31,
    headline: "The Poach",
    text:
      "Your reputation now walks into rooms before you do. This month it walked into two: a frontier AI lab offering to double your comp, and a hot startup offering the CTO chair. Meanwhile your current employer, sensing danger like a herd animal, preemptively floats a retention package.",
    choices: [
      {
        id: "frontier-double",
        label: "Take the frontier lab money — double comp, double intensity",
        outcome: {
          text:
            "The offer letter reads like a typo, but it isn't. You're back in the fastest room in the industry, surrounded by people who think weekends are a legacy feature. The vest schedule alone could retire your parents.",
          effect: { netWorth: 220_000, burnout: 25, title: "Principal MTS" },
          next: "y11-goldenyears",
        },
      },
      {
        id: "cto-chair",
        label: "Take the CTO chair — it's time to run the whole machine",
        outcome: {
          text:
            "Sixty engineers, a product with real traction, and a CEO who actually wants a technical partner. You spend week one just listening. Week two, you delete the standing meeting that everyone hated. The org notices. This might work.",
          effect: { netWorth: 70_000, burnout: 20, title: "CTO" },
          next: "y11-empire",
        },
      },
      {
        id: "take-counter",
        label: "Take the counter — loyalty, but make it expensive",
        outcome: {
          text:
            "You let the retention conversation 'marinate' for exactly one week, then accept a package that makes your comp band a rumor. Same job, same desk, forty percent more money. Leverage is a beautiful thing when you finally have it.",
          effect: { netWorth: 140_000, burnout: 10 },
          next: "y11-goldenyears",
        },
      },
    ],
  },
  {
    id: "y10-bidding-war",
    year: 10,
    age: 31,
    slot: "y10-poach",
    headline: "The Bidding War",
    text:
      "It started as one recruiter email and became an auction: three companies, five conversations, and offers that keep leapfrogging each other while you sleep. Your calendar is a diplomatic crisis. Somewhere in the frenzy, the actual question — what do you want the next decade to feel like — keeps getting rescheduled.",
    choices: [
      {
        id: "auction-yourself",
        label: "Run the auction to the top — this market won't last",
        outcome: {
          text:
            "You play the offers against each other with the cold precision of someone who read every negotiation book out of spite. The final number is 40% above the first. Markets are irrational exactly once per career at this amplitude — you cashed the whole wave.",
          effect: { netWorth: 180_000, burnout: 15, title: "Distinguished Eng (Auctioned)" },
          next: "y11-goldenyears",
        },
      },
      {
        id: "pick-the-mission",
        label: "Take the lowest offer — it's the only one you'd do for free",
        outcome: {
          text:
            "You pick the healthcare infrastructure company that pays 'only' very well, because the demo made you feel something the other pitches didn't. The recruiters are baffled. Your Sunday-night dread, notably, does not transfer to the new job.",
          effect: { netWorth: 90_000, burnout: 5, title: "Principal Eng (On Purpose)" },
          next: "y11-goldenyears",
        },
      },
      {
        id: "cto-dark-horse",
        label: "Take the dark horse — CTO of the startup nobody's heard of yet",
        outcome: {
          text:
            "The smallest logo in the auction gets your yes: forty people, terrifying equity upside, a CEO who listens. Your Big Tech peers think you've lost it. You've just seen this movie from the other side, and this time you want the director's chair.",
          effect: { netWorth: 70_000, burnout: 20, title: "CTO" },
          next: "y11-empire",
        },
      },
    ],
  },
  {
    id: "y10-board-seat-offer",
    year: 10,
    age: 31,
    slot: "y10-poach",
    headline: "The Board Seat",
    text:
      "A startup you've informally advised for two years asks you to join its actual board — advisor shares, real fiduciary duty, your name in the filings. Your employer's outside-activities policy has a paragraph about this written in the legal equivalent of a raised eyebrow. Prestige and conflict-of-interest arrive as a bundle.",
    choices: [
      {
        id: "take-seat-navigate",
        label: "Take the seat — navigate the policy maze properly",
        outcome: {
          text:
            "Three approvals, one recusal framework, and a conflict-of-interest doc thicker than the board deck. But you're in the room where startups actually get steered, learning governance a decade before your peers. The advisor shares might be worthless. The apprenticeship isn't.",
          effect: { netWorth: 120_000, burnout: 10, title: "Principal Eng & Board Member" },
          next: "y11-goldenyears",
        },
      },
      {
        id: "decline-cleanly",
        label: "Decline — your focus is your edge, and it's not for rent",
        outcome: {
          text:
            "You pass with a warm note and keep advising informally, minus the fiduciary weight. The startup finds a professional director; you keep your undivided attention, which — as your undivided results keep proving — was the scarce asset all along.",
          effect: { netWorth: 100_000, burnout: 5 },
          next: "y11-goldenyears",
        },
      },
      {
        id: "all-in-operator",
        label: "Counter their offer — you'll join as an operator, not an observer",
        outcome: {
          text:
            "'I don't want to watch from the board — I want the wheel.' They take a week to recover, then hand you the CTO chair with founder-grade equity. The board seat becomes a footnote to a much bigger bet: yourself, full-time.",
          effect: { netWorth: 70_000, burnout: 20, title: "CTO" },
          next: "y11-empire",
        },
      },
    ],
  },
  {
    id: "y10-viral-talk",
    year: 10,
    age: 31,
    slot: "y10-poach",
    headline: "The Talk That Escaped",
    text:
      "Your conference talk — twenty minutes of hard-won truths about a decade in tech — gets clipped, subtitled, and algorithmically launched into five million feeds. A literary agent emails about 'the book.' A podcast network emails about 'the show.' Your employer emails about 'media training.' Fame has arrived, uninvited, with paperwork.",
    choices: [
      {
        id: "become-the-brand",
        label: "Lean in — book deal, podcast, the creator pivot",
        outcome: {
          text:
            "The book hits lists, the podcast books guests you used to read about, and 'engineer' becomes the second line of your bio. The income diversifies beautifully; the identity takes a year to renegotiate. You're famous now in the exact niche you used to lurk.",
          effect: { netWorth: 110_000, burnout: 10, title: "Author & Engineer" },
          next: "y11-goldenyears",
        },
      },
      {
        id: "stay-builder",
        label: "Decline it all — you're a builder, not a brand",
        outcome: {
          text:
            "You send the agent a polite no and go back to the terminal, letting the clip age out of the algorithm. What remains: inbound from exactly the people you wanted to reach, and a career still measured in shipped things rather than impressions. The work was the point.",
          effect: { netWorth: 130_000, burnout: 15, title: "Distinguished Engineer" },
          next: "y11-goldenyears",
        },
      },
      {
        id: "fame-into-founding",
        label: "Convert the audience into a company — launch on the wave",
        outcome: {
          text:
            "Five million views is a distribution channel most startups would kill for, and it's currently pointed at you. You announce the company in a follow-up video; the waitlist crosses 40K before the incorporation paperwork clears. Audience-first founding: unlocked.",
          effect: { netWorth: 60_000, burnout: 20, title: "Founder (Audience-Backed)" },
          next: "y11-empire",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Crossroads
  {
    id: "y10-founder-crossroads",
    year: 10,
    age: 31,
    headline: "The Corp Dev Email",
    text:
      "It arrives on a Tuesday: 'We've been following your progress and would love to explore ways to work together.' Corp dev. The company you're running is officially prey — or opportunity, depending on the multiple. The board wants to 'at least take the meeting.' Everyone always takes the meeting.",
    choices: [
      {
        id: "entertain-acquisition",
        label: "Take the meeting. Everything has a price",
        outcome: {
          text:
            "You take the meeting, then four more meetings, then a dinner where nobody mentions the acquisition until dessert. A number gets said out loud. It's a real number. The dance begins, and you're suddenly reading M&A newsletters at midnight.",
          effect: { netWorth: 20_000, burnout: 10 },
          next: "y11-empire",
        },
      },
      {
        id: "refuse-moonshot",
        label: "Decline. You're building an empire, not an exit",
        outcome: {
          text:
            "You send the politest 'no' ever written and forward it to the team with one line: 'We're the acquirer someday.' Morale spikes. So does the pressure — you just publicly bet the company on the moonshot.",
          effect: { netWorth: 10_000, burnout: 20 },
          next: "y11-empire",
        },
      },
      {
        id: "hire-operator",
        label: "Fire yourself as day-to-day boss — hire an operator CEO",
        outcome: {
          text:
            "You recruit a grown-up who's scaled this exact playbook twice, keep the chairman seat and the product vision, and stop being the bottleneck for expense reports. The company speeds up. Your resting heart rate goes down. Everyone wins, weirdly.",
          effect: { netWorth: 60_000, burnout: -20, title: "Founder & Chairman" },
          next: "y11-empire",
        },
      },
    ],
  },
  {
    id: "y10-ipo-whisper",
    year: 10,
    age: 31,
    slot: "y10-founder-crossroads",
    headline: "The 24-Month Whisper",
    text:
      "A banker you didn't hire buys you an expensive lunch to say one sentence: 'You could be public in 24 months.' The words rearrange your brain chemistry. Going public means audits, boards, sarbanes-oxley-flavored everything — and a scoreboard the whole world can see. The company isn't ready. Neither are you. That's not a no.",
    choices: [
      {
        id: "professionalize-everything",
        label: "Start the clock — professionalize everything now",
        outcome: {
          text:
            "New CFO, real audit firm, revenue recognition that would survive a courtroom. The company puts on its grown-up clothes two years early and grumbles about the fit. But when the window opens, you'll be the rare company that's actually ready — readiness being the moat nobody tweets about.",
          effect: { netWorth: 40_000, burnout: 20 },
          next: "y11-empire",
        },
      },
      {
        id: "stay-scrappy",
        label: "Ignore the whisper — scrappy is why you're winning",
        outcome: {
          text:
            "You thank the banker, expense nothing, and keep running the loose, fast machine that got you here. The IPO window will open and close and open again — velocity, once professionalized away, never comes back. The scoreboard can wait for the score.",
          effect: { netWorth: 30_000, burnout: 15 },
          next: "y11-empire",
        },
      },
      {
        id: "secondary-first",
        label: "Before any window — take a real secondary this round",
        outcome: {
          text:
            "Whatever the 24-month future holds, you de-risk the present: a proper founder secondary in the next round puts life-changing money in the vault before the public-market casino opens. Calm founders make better IPO decisions. You just bought the calm.",
          effect: { netWorth: 150_000, burnout: 10 },
          next: "y11-empire",
        },
      },
    ],
  },
  {
    id: "y10-coo-poached",
    year: 10,
    age: 31,
    slot: "y10-founder-crossroads",
    headline: "The Empty COO Chair",
    text:
      "Your COO — the one who turned your chaos into an operating cadence, the one investors call 'the adult' — resigns to run a bigger company. Fair. Devastating, but fair. The org she built starts wobbling within a week, which is the truest compliment an operator ever gets.",
    choices: [
      {
        id: "counter-aggressively",
        label: "Counter with everything — equity, title, co-CEO if needed",
        outcome: {
          text:
            "You put a package on the table that makes the board wince and give her the President title she'd earned two years ago. She stays — genuinely moved, materially retained. Expensive lesson in paying people before the market does it for you.",
          effect: { netWorth: -40_000, burnout: 15 },
          next: "y11-empire",
        },
      },
      {
        id: "promote-within-coo",
        label: "Promote her deputy — the system she built can run itself",
        outcome: {
          text:
            "Her #2 steps up and the operating cadence holds — the mark of a great operator is that leaving doesn't break the machine. The deputy grows into the chair in two quarters. Your old COO sends a one-line text: 'told you the system worked.'",
          effect: { netWorth: 20_000, burnout: 10 },
          next: "y11-empire",
        },
      },
      {
        id: "flat-org-experiment",
        label: "Don't replace her — run the flat-org experiment",
        outcome: {
          text:
            "You distribute the COO role across four leads and a dashboard, which works beautifully for one quarter and then becomes a governance seminar taught by consequences. You re-create the role in month five, humbled and better informed about why hierarchies keep getting reinvented.",
          effect: { netWorth: 10_000, burnout: 25 },
          next: "y11-empire",
        },
      },
    ],
  },
  {
    id: "y10-acquire-competitor",
    year: 10,
    age: 31,
    slot: "y10-founder-crossroads",
    headline: "Predator's Turn",
    text:
      "Plot twist: this time YOU'RE the corp dev email. Your struggling competitor — great team, dying cap table — signals they'd sell for less than you raised last round. You've never bought a company. There's a first time for everything, and it's usually expensive.",
    choices: [
      {
        id: "buy-them",
        label: "Buy them — team, tech, customers, the whole map square",
        outcome: {
          text:
            "Your first acquisition: two products become one roadmap, two teams become one org (eventually, after the migration slide loses its italics), and the category consolidates around you. Integration is 80% of the work and 0% of the press release. Empire: expanded.",
          effect: { netWorth: -50_000, burnout: 20, title: "CEO (Acquirer Era)" },
          next: "y11-empire",
        },
      },
      {
        id: "acquihire-lite",
        label: "Skip the company — hire their five best people",
        outcome: {
          text:
            "Why buy the restaurant when the chefs are updating LinkedIn? You interview their core team 'coincidentally' and extend five offers in one week. The competitor winds down; their customers migrate to you organically. M&A outcome, org-chart price.",
          effect: { netWorth: 10_000, burnout: 15 },
          next: "y11-empire",
        },
      },
      {
        id: "let-them-die",
        label: "Do nothing — gravity is free",
        outcome: {
          text:
            "You pass and let the market do the acquiring. The competitor sunsets in eight months; their customers arrive at your door needing migration help you happily invoice for. Sometimes the best M&A strategy is patience with a sales team.",
          effect: { netWorth: 30_000, burnout: 5 },
          next: "y11-empire",
        },
      },
    ],
  },
];
