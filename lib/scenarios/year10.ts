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
      "Your reputation now walks into rooms first. A frontier lab offers double comp, a startup offers the CTO chair, and your employer, sensing danger like a herd animal, floats a retention package.",
    choices: [
      {
        id: "frontier-double",
        label: "Take the frontier lab's double comp",
        outcome: {
          text:
            "The offer letter reads like a typo. It isn't. You're back in the fastest room in the industry, where weekends are a legacy feature.",
          effect: { netWorth: 220_000, burnout: 25, title: "Principal MTS" },
          next: "y11-goldenyears",
        },
      },
      {
        id: "cto-chair",
        label: "Take the CTO chair — run the machine",
        outcome: {
          text:
            "Sixty engineers, real traction, a CEO who wants a technical partner. Week two, you delete the meeting everyone hated. The org notices. This might work.",
          effect: { netWorth: 70_000, burnout: 20, title: "CTO" },
          next: "y11-empire",
        },
      },
      {
        id: "take-counter",
        label: "Take the counter — expensive loyalty",
        outcome: {
          text:
            "You let it 'marinate' one week, then accept a package that makes your comp band a rumor. Same desk, forty percent more money. Leverage is beautiful.",
          effect: { netWorth: 140_000, burnout: 10 },
          achievement: "big-bonus",
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
      "One recruiter email becomes an auction: three companies, offers leapfrogging each other while you sleep. The real question — what should the next decade feel like — keeps getting rescheduled.",
    choices: [
      {
        id: "auction-yourself",
        label: "Run the auction to the top",
        outcome: {
          text:
            "You play the offers against each other with spite-fueled precision. The final number is 40% above the first. You cashed the whole irrational wave.",
          effect: { netWorth: 180_000, burnout: 15, title: "Distinguished Eng (Auctioned)" },
          next: "y11-goldenyears",
        },
      },
      {
        id: "pick-the-mission",
        label: "Take the lowest offer — the mission one",
        outcome: {
          text:
            "You pick the healthcare infra company that pays 'only' very well. The recruiters are baffled. Your Sunday-night dread does not transfer.",
          effect: { netWorth: 90_000, burnout: 5, title: "Principal Eng (On Purpose)" },
          next: "y11-goldenyears",
        },
      },
      {
        id: "cto-dark-horse",
        label: "Take the dark horse CTO gig",
        outcome: {
          text:
            "The smallest logo gets your yes: forty people, terrifying equity, a CEO who listens. Big Tech peers think you've lost it. You want the director's chair.",
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
      "A startup you've advised asks you onto its actual board — advisor shares, real fiduciary duty. Your employer's outside-activities policy raises a legal eyebrow. Prestige and conflict arrive bundled.",
    choices: [
      {
        id: "take-seat-navigate",
        label: "Take the seat — navigate the policy maze",
        outcome: {
          text:
            "Three approvals and a conflict doc thicker than the board deck. But you learn governance a decade early. The shares may be worthless; the apprenticeship isn't.",
          effect: { netWorth: 120_000, burnout: 10, title: "Principal Eng & Board Member" },
          next: "y11-goldenyears",
        },
      },
      {
        id: "decline-cleanly",
        label: "Decline — your focus isn't for rent",
        outcome: {
          text:
            "You pass warmly and keep advising informally. The startup hires a professional director; you keep your undivided attention — the scarce asset all along.",
          effect: { netWorth: 100_000, burnout: 5 },
          next: "y11-goldenyears",
        },
      },
      {
        id: "all-in-operator",
        label: "Counter: join as operator, not observer",
        outcome: {
          text:
            "'I don't want to watch — I want the wheel.' They recover in a week and hand you the CTO chair with founder-grade equity. The bigger bet: yourself, full-time.",
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
      "Your talk gets clipped, subtitled, and launched into five million feeds. An agent emails about 'the book.' Your employer emails about 'media training.' Fame arrives uninvited, with paperwork.",
    choices: [
      {
        id: "become-the-brand",
        label: "Lean in — book, podcast, creator pivot",
        outcome: {
          text:
            "The book hits lists, the podcast books your heroes, and 'engineer' drops to the second line of your bio. You're famous in the exact niche you used to lurk.",
          effect: { netWorth: 110_000, burnout: 10, title: "Author & Engineer" },
          next: "y11-goldenyears",
        },
      },
      {
        id: "stay-builder",
        label: "Decline it all — builder, not brand",
        outcome: {
          text:
            "You send a polite no and go back to the terminal. What remains: inbound from exactly the right people, and a career measured in shipped things, not impressions.",
          effect: { netWorth: 130_000, burnout: 15, title: "Distinguished Engineer" },
          next: "y11-goldenyears",
        },
      },
      {
        id: "fame-into-founding",
        label: "Convert the audience into a company",
        outcome: {
          text:
            "Five million views is a distribution channel pointed at you. You announce the company in a video; the waitlist hits 40K before the incorporation clears.",
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
      "It arrives on a Tuesday: 'We'd love to explore ways to work together.' Corp dev. Your company is officially prey — or opportunity, depending on the multiple. Everyone always takes the meeting.",
    choices: [
      {
        id: "entertain-acquisition",
        label: "Take the meeting. Everything has a price",
        outcome: {
          text:
            "Four meetings and a dinner later, a number gets said out loud. It's a real number. The dance begins; you're reading M&A newsletters at midnight.",
          effect: { netWorth: 20_000, burnout: 10 },
          next: "y11-empire",
        },
      },
      {
        id: "refuse-moonshot",
        label: "Decline — empire, not exit",
        outcome: {
          text:
            "You send the politest 'no' ever written: 'We're the acquirer someday.' Morale spikes. So does the pressure — you just publicly bet the company on the moonshot.",
          effect: { netWorth: 10_000, burnout: 20 },
          next: "y11-empire",
        },
      },
      {
        id: "hire-operator",
        label: "Hire an operator CEO, fire yourself",
        outcome: {
          text:
            "You hire a grown-up who's scaled this playbook twice and keep the vision. The company speeds up; your resting heart rate goes down. Everyone wins, weirdly.",
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
      "A banker you didn't hire buys you lunch to say one sentence: 'You could be public in 24 months.' The company isn't ready. Neither are you. That's not a no.",
    choices: [
      {
        id: "professionalize-everything",
        label: "Start the clock — professionalize now",
        outcome: {
          text:
            "New CFO, real audit firm, revenue recognition that would survive a courtroom. When the window opens, you'll be the rare company that's actually ready.",
          effect: { netWorth: 40_000, burnout: 20 },
          next: "y11-empire",
        },
      },
      {
        id: "stay-scrappy",
        label: "Ignore the whisper — stay scrappy",
        outcome: {
          text:
            "You thank the banker and keep the loose, fast machine that got you here. Velocity, once professionalized away, never comes back. The scoreboard can wait.",
          effect: { netWorth: 30_000, burnout: 15 },
          next: "y11-empire",
        },
      },
      {
        id: "secondary-first",
        label: "Take a fat secondary this round first",
        outcome: {
          text:
            "A proper founder secondary puts life-changing money in the vault before the public-market casino opens. Calm founders decide better. You just bought the calm.",
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
      "Your COO — the one investors call 'the adult' — resigns to run a bigger company. Fair. Devastating, but fair. Her org wobbles within a week: the truest compliment an operator gets.",
    choices: [
      {
        id: "counter-aggressively",
        label: "Counter with everything — even co-CEO",
        outcome: {
          text:
            "A package that makes the board wince, plus the President title she earned years ago. She stays. Lesson: pay people before the market does it for you.",
          effect: { netWorth: -40_000, burnout: 15 },
          next: "y11-empire",
        },
      },
      {
        id: "promote-within-coo",
        label: "Promote her deputy — trust the system",
        outcome: {
          text:
            "Her #2 steps up and the cadence holds — great operators build machines that survive them. Your old COO texts: 'told you the system worked.'",
          effect: { netWorth: 20_000, burnout: 10 },
          next: "y11-empire",
        },
      },
      {
        id: "flat-org-experiment",
        label: "Don't replace her — go flat-org",
        outcome: {
          text:
            "Four leads and a dashboard work beautifully for one quarter, then become a governance seminar taught by consequences. You re-create the role in month five.",
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
      "Plot twist: this time YOU'RE the corp dev email. Your struggling competitor — great team, dying cap table — would sell for less than you raised last round. First times are usually expensive.",
    choices: [
      {
        id: "buy-them",
        label: "Buy them — the whole map square",
        outcome: {
          text:
            "Two products become one roadmap, two teams one org (eventually). Integration is 80% of the work and 0% of the press release. Empire: expanded.",
          effect: { netWorth: -50_000, burnout: 20, title: "CEO (Acquirer Era)" },
          next: "y11-empire",
        },
      },
      {
        id: "acquihire-lite",
        label: "Skip the company, hire their best five",
        outcome: {
          text:
            "Why buy the restaurant when the chefs are on LinkedIn? Five offers in a week; their customers migrate to you for free. M&A outcome, org-chart price.",
          effect: { netWorth: 10_000, burnout: 15 },
          next: "y11-empire",
        },
      },
      {
        id: "let-them-die",
        label: "Do nothing — gravity is free",
        outcome: {
          text:
            "You let the market do the acquiring. Eight months later their customers arrive needing migration help you happily invoice. Patience is an M&A strategy.",
          effect: { netWorth: 30_000, burnout: 5 },
          next: "y11-empire",
        },
      },
    ],
  },
  {
    id: "y10-exchange-cto-call",
    year: 10,
    age: 31,
    slot: "y10-poach",
    headline: "The Exchange Job",
    text:
      "An exchange CTO offer from an old crypto contact: triple comp, 'material' equity. Either the next great fintech or a subpoena factory with a gym. 'We're totally not like the other ones.'",
    choices: [
      {
        id: "decline-exchange",
        label: "Decline — that's what the others said",
        outcome: {
          text:
            "You pass and keep your compliance-boring career. The exchange becomes either a fintech darling or a Netflix documentary. You check occasionally, with popcorn.",
          effect: { netWorth: 120_000, burnout: 10 },
          next: "y11-goldenyears",
        },
      },
      {
        id: "take-exchange-cto",
        label: "Take the CTO seat — triple comp, eyes open",
        gamble: [
          {
            chance: 0.3,
            label: "It's legit — absurd comp, real company",
            text:
              "You audit everything before signing and — miracle — it holds. Licensed, audited, profitable, boring. 'Not like the other ones' was, this once, true.",
            effect: { netWorth: 300_000, burnout: 20, title: "CTO (The Legit Exchange)" },
            next: "y11-empire",
          },
          {
            chance: 0.7,
            label: "It implodes — you exit clean but singed",
            text:
              "The 'market-making subsidiary' turns out to be a nesting doll of conflicts. You resign a week before the news does. The comp was real. So was the documentary.",
            effect: { netWorth: 40_000, burnout: 30, title: "Ex-CTO (Clean Hands)" },
            next: "y11-goldenyears",
          },
        ],
      },
    ],
  },
  {
    id: "y10-resignation-bluff",
    year: 10,
    age: 31,
    slot: "y10-poach",
    headline: "The Resignation Gambit",
    text:
      "You have a good-not-great outside offer and a theory: the legendary counteroffer budget only unlocks for people actually walking out. To trigger it, you have to mean it enough to be believed.",
    choices: [
      {
        id: "take-outside-offer",
        label: "Just take the outside offer",
        outcome: {
          text:
            "You skip the theater and sign the real thing. The legendary counter budget remains a legend. Your ex-teammates test the theory themselves, with mixed results.",
          effect: { netWorth: 150_000, burnout: 15, title: "Distinguished Eng (New Logo)" },
          next: "y11-goldenyears",
        },
      },
      {
        id: "resign-for-counter",
        label: "Resign and mean it — trigger the counter",
        gamble: [
          {
            chance: 0.55,
            label: "Massive counter — stay for 40% more",
            text:
              "The counter arrives before dinner: 40% more, bigger scope, 'we should have done this a year ago.' You un-resign gracefully. The legend required a hostage.",
            effect: { netWorth: 220_000, burnout: 10 },
            achievement: "big-bonus",
            next: "y11-goldenyears",
          },
          {
            chance: 0.45,
            label: "'We understand' — one-way door",
            text:
              "No counter — just a calendar invite titled 'Transition Planning.' You take the outside offer. Some doors are exits the moment you touch them.",
            effect: { netWorth: 80_000, burnout: 20, title: "Distinguished Eng (Committed Now)" },
            next: "y11-goldenyears",
          },
        ],
      },
    ],
  },
  {
    id: "y10-moonshot-feature",
    year: 10,
    age: 31,
    slot: "y10-founder-crossroads",
    headline: "The Category Bet",
    text:
      "Product pitches the moonshot: an eighteen-month feature that redefines the category — or quietly eats a fifth of runway. The mockup gives the board chills. Mockups are free. Eighteen months aren't.",
    choices: [
      {
        id: "incremental-roadmap",
        label: "Ship the boring, compounding roadmap",
        outcome: {
          text:
            "You file the mockup under someday and ship the boring quarters. Revenue compounds; someday keeps its place in the drawer, glowing faintly.",
          effect: { netWorth: 30_000, burnout: 10 },
          next: "y11-empire",
        },
      },
      {
        id: "greenlight-moonshot",
        label: "Green-light the moonshot",
        gamble: [
          {
            chance: 0.45,
            label: "It defines the category",
            text:
              "Eighteen months later the category reorganizes around your vocabulary. Competitors' roadmaps become tribute acts. The chills were prophecy.",
            effect: { netWorth: 90_000, burnout: 15, title: "CEO (Category King)" },
            next: "y11-empire",
          },
          {
            chance: 0.55,
            label: "Quiet launch, quieter uptake",
            text:
              "The moonshot ships late and lands soft. Chills aren't demand; a fifth of the runway becomes a case study, and the roadmap resumes, chastened.",
            effect: { netWorth: -30_000, burnout: 25 },
            next: "y11-empire",
          },
        ],
      },
    ],
  },
  {
    id: "y10-debt-acquisition",
    year: 10,
    age: 31,
    slot: "y10-founder-crossroads",
    headline: "Leverage, Literally",
    text:
      "Your struggling competitor will sell — at a price you can only reach with venture debt: covenants, warrants, a payment that assumes nothing goes wrong. The debt sits on YOUR balance sheet either way.",
    choices: [
      {
        id: "grow-organic",
        label: "Pass — grow over their body organically",
        outcome: {
          text:
            "You skip the leveraged feast and win the slow way. The competitor fades on its own schedule; your balance sheet stays clean enough to survive any weather.",
          effect: { netWorth: 35_000, burnout: 10 },
          next: "y11-empire",
        },
      },
      {
        id: "buy-with-debt",
        label: "Take the debt — consolidate now",
        gamble: [
          {
            chance: 0.5,
            label: "Consolidation pays — the merger prints",
            text:
              "Customers stay, engineers stay, and pricing power services the debt with room to spare. Two years later the market is yours. Leverage, once, like a scalpel.",
            effect: { netWorth: 80_000, burnout: 15, title: "CEO (Consolidator)" },
            next: "y11-empire",
          },
          {
            chance: 0.5,
            label: "Covenant trips — the debt runs you now",
            text:
              "Integration runs 40% over, a covenant trips, and the lender now approves your hires. You sell a division to breathe. The scalpel, mishandled, is just a knife.",
            effect: { netWorth: -60_000, burnout: 25 },
            next: "y11-empire",
          },
        ],
      },
    ],
  },
];
