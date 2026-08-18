import type { Scenario } from "../types";

/**
 * YEAR 14 (age 35) — legacy and the final act.
 * Pools: y14-legacy (+3), y14-finalact (+3).
 */
export const YEAR_14: Scenario[] = [
  // ---------------------------------------------------------------- Legacy
  {
    id: "y14-legacy",
    year: 14,
    age: 35,
    headline: "Succession Planning",
    text:
      "The new grads ship in hours what took your generation quarters, and they say 'legacy code' about things you wrote proudly. You're not obsolete — you're context.",
    choices: [
      {
        id: "mentor-legacy",
        label: "Build the bench — outlive your badge",
        outcome: {
          text:
            "Docs that survive you, three promotions with your fingerprints and your name nowhere — the least measurable work you've done, and the most durable.",
          effect: { netWorth: 100_000, burnout: -5 },
          next: "y15-laststandup",
        },
      },
      {
        id: "spite-promo",
        label: "One more promo, purely out of spite",
        outcome: {
          text:
            "Someone in calibration said you'd 'plateaued.' You produce the strongest packet of your career at 35 — the point was never the money. (The money's great.)",
          effect: { netWorth: 150_000, burnout: 20 },
          next: "y15-laststandup",
        },
      },
      {
        id: "year-sabbatical",
        label: "Take the one-year sabbatical",
        outcome: {
          text:
            "Unpaid, unplugged, unreachable. In month five you remember what your brain sounds like when nothing is on fire.",
          effect: { netWorth: 0, burnout: -30 },
          next: "y15-laststandup",
        },
      },
    ],
  },
  {
    id: "y14-last-itch",
    year: 14,
    age: 35,
    slot: "y14-legacy",
    headline: "The Last Itch",
    text:
      "It arrives at 2 AM: an idea so obviously yours you sketch the architecture on a grocery receipt. It sits on your desk for a week, radiating.",
    choices: [
      {
        id: "scratch-it-lightly",
        label: "Build it as a weekend side quest",
        outcome: {
          text:
            "You ship it on weekends with one collaborator and zero investors, and a niche adores it. Not every idea needs a board; some just need a Saturday.",
          effect: { netWorth: 80_000, burnout: 10, title: "Engineer & Side-Quester" },
          next: "y15-laststandup",
        },
      },
      {
        id: "full-send-again",
        label: "Full send — one more company",
        outcome: {
          text:
            "The receipt becomes a deck becomes a seed round in eleven days. You're back at day zero by choice — older, faster, immune to every mistake except the new ones.",
          effect: { netWorth: -100_000, burnout: 25, title: "Founder (One More Time)" },
          next: "y15-laststandup",
        },
      },
      {
        id: "write-the-book",
        label: "Write the book instead",
        outcome: {
          text:
            "The receipt-idea is really a book: fourteen years, written for the person you were at 22. It changes four hundred careers — better math than most startups.",
          effect: { netWorth: 60_000, burnout: -10, title: "Author (Reluctant)" },
          next: "y15-laststandup",
        },
      },
    ],
  },
  {
    id: "y14-protege-ipo",
    year: 14,
    age: 35,
    slot: "y14-legacy",
    headline: "The Protégé Rings the Bell",
    text:
      "The junior whose first pull request you gently rewrote takes their company public on a Thursday, and thanks you from the podium. You cry at your desk and deny it forever.",
    choices: [
      {
        id: "cash-and-celebrate",
        label: "Sell at the lockup, frame the photo",
        outcome: {
          text:
            "You sell into strength and take the protégé to the taco place where you once explained pointers. Mentorship: variable compensation, infinite duration.",
          effect: { netWorth: 400_000, burnout: -5 },
          next: "y15-laststandup",
        },
      },
      {
        id: "roll-into-next",
        label: "Become their permanent backer",
        outcome: {
          text:
            "You keep the position and make a promise: whatever they build next, you're the first call. The relationship compounds past money.",
          effect: { netWorth: 100_000, burnout: 5, title: "Backer of Protégés" },
          next: "y15-laststandup",
        },
      },
      {
        id: "quiet-index",
        label: "Diversify quietly, post one taco photo",
        outcome: {
          text:
            "You sell most into the index like the boring adult you've become and post nothing but one photo of the taco place. The protégé understands completely.",
          effect: { netWorth: 250_000, burnout: 0 },
          next: "y15-laststandup",
        },
      },
    ],
  },
  {
    id: "y14-product-sunset",
    year: 14,
    age: 35,
    slot: "y14-legacy",
    headline: "The Sunset Email",
    text:
      "The product you built in year two gets its sunset email: 'deprecated effective Q3.' Twelve years of uptime, ended in two corporate paragraphs.",
    choices: [
      {
        id: "write-the-eulogy",
        label: "Write the eulogy thread",
        outcome: {
          text:
            "Strangers reply with their own dead products and the thread goes quietly viral. For one night, the internet is a wake.",
          effect: { netWorth: 60_000, burnout: -5 },
          next: "y15-laststandup",
        },
      },
      {
        id: "open-source-rescue",
        label: "Rescue it — negotiate an open-source release",
        outcome: {
          text:
            "Three months of license archaeology later, the code goes Apache 2.0 — a fork thrives under two maintainers in Poland who love it more than the company did.",
          effect: { netWorth: 40_000, burnout: 15 },
          next: "y15-laststandup",
        },
      },
      {
        id: "let-it-go",
        label: "Let it go — you don't have to bury it",
        outcome: {
          text:
            "You read the email twice, react with one emoji, and close the laptop. That product already did its job: it built the engineer who built everything after it.",
          effect: { netWorth: 80_000, burnout: 0 },
          next: "y15-laststandup",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Final act
  {
    id: "y14-finalact",
    year: 14,
    age: 35,
    headline: "The Final Act",
    text:
      "Fourteen years from a dorm room to the outcome year. Whatever happens next — the bell, the wire, the handoff — this is the chapter the documentary lingers on.",
    choices: [
      {
        id: "ring-the-bell",
        label: "Ring the bell — take the company public",
        outcome: {
          text:
            "You ring the bell with the garage crew as your ticker crawls across the wall, and the stock pops 30%. Somewhere, your first rejection email composts quietly.",
          effect: { netWorth: 3_500_000, burnout: 15, title: "Founder & CEO (Public)" },
          next: "y15-laststandup",
        },
      },
      {
        id: "eleventh-hour-sale",
        label: "Take the eleventh-hour mega-acquisition",
        outcome: {
          text:
            "Seventy-two hours before the roadshow, an acquirer calls with a number that makes the IPO math look like a tip jar. You sign at midnight.",
          effect: { netWorth: 2_000_000, burnout: 5, title: "Exited Founder" },
          next: "y15-laststandup",
        },
      },
      {
        id: "window-closes",
        label: "The market turns — pull the IPO, grind on",
        outcome: {
          text:
            "Three weeks before pricing, the bankers say 'postpone.' You address the all-hands with a steady voice and shaking hands — the dream is deferred, not dead.",
          effect: { netWorth: 50_000, burnout: 25 },
          next: "y15-laststandup",
        },
      },
    ],
  },
  {
    id: "y14-dual-class-war",
    year: 14,
    age: 35,
    slot: "y14-finalact",
    headline: "The Dual-Class War",
    text:
      "The IPO lawyers offer two futures: dual-class shares that keep you in control 'in perpetuity,' or one-share-one-vote that the index funds — and two of your own board members — demand. The fight leaks.",
    choices: [
      {
        id: "keep-control",
        label: "Fight for the dual-class",
        outcome: {
          text:
            "You win 10x voting shares after a bruising month, and the IPO prices slightly lower — the control discount, itemized. You'd pay it twice.",
          effect: { netWorth: 150_000, burnout: 25, title: "Founder-CEO (Controlled)" },
          next: "y15-laststandup",
        },
      },
      {
        id: "concede-for-price",
        label: "Concede — one share, one vote, full price",
        outcome: {
          text:
            "You take the vanilla structure and the valuation bump, betting performance is the real control. The activists circle a year later, as the lawyers predicted.",
          effect: { netWorth: 300_000, burnout: 10 },
          next: "y15-laststandup",
        },
      },
      {
        id: "pe-exit-instead",
        label: "Skip the circus — take the PE exit",
        outcome: {
          text:
            "Full acquisition, two more years as CEO, and nobody ever says 'proxy advisory' to you again. The wire is enormous; the silence is better.",
          effect: { netWorth: 1_500_000, burnout: 5, title: "CEO (Private, At Peace)" },
          next: "y15-laststandup",
        },
      },
    ],
  },
  {
    id: "y14-down-ipo",
    year: 14,
    age: 35,
    slot: "y14-finalact",
    headline: "Pricing Below the Line",
    text:
      "The bankers propose a price below your last private round — the dreaded 'down IPO.' Early employees made whole, late investors furious, and the call is yours by 9 PM Eastern.",
    choices: [
      {
        id: "price-it-anyway",
        label: "Price it — real beats perfect",
        outcome: {
          text:
            "You take the down IPO, then three beats in a row take the stock past the old private mark. Liquidity forgives everything.",
          effect: { netWorth: 800_000, burnout: 20, title: "Founder & CEO (Public, Humbled)" },
          next: "y15-laststandup",
        },
      },
      {
        id: "pull-and-wait",
        label: "Pull it — never sell at a discount",
        outcome: {
          text:
            "You walk at 8:52 PM and absorb a year of 'what happened to their IPO' articles. The wait probably buys billions — the 'probably' costs a year of sleep.",
          effect: { netWorth: 100_000, burnout: 25 },
          next: "y15-laststandup",
        },
      },
      {
        id: "flat-sale-strategic",
        label: "Call the strategic — sell flat tonight",
        outcome: {
          text:
            "One phone call turns pricing night into deal night: cash at the last private round before midnight. Certainty — the most underrated exit multiple.",
          effect: { netWorth: 1_200_000, burnout: 10, title: "Exited Founder (Flat, Whole)" },
          next: "y15-laststandup",
        },
      },
    ],
  },
  {
    id: "y14-employee-tender",
    year: 14,
    age: 35,
    slot: "y14-finalact",
    headline: "The Order of the Wire",
    text:
      "The tender structure needs deciding: who sells, in what order. The spreadsheet has 'Execs first,' 'Pro-rata,' and a third tab you added at 1 AM labeled 'employees_first_v2_FINAL.'",
    choices: [
      {
        id: "employees-first",
        label: "Employees first — you sell last",
        outcome: {
          text:
            "Early employees and the support team sell first at full price; execs wait a cycle. Some legacies are wire-transfer shaped.",
          effect: { netWorth: 500_000, burnout: -10, title: "Founder (Employees First)" },
          next: "y15-laststandup",
        },
      },
      {
        id: "pro-rata-all",
        label: "Pro-rata — clean, fair, defensible",
        outcome: {
          text:
            "Everyone sells the same percentage, employee #4 to Series C. Nobody's thrilled, nobody's wronged, and the meeting takes eleven minutes.",
          effect: { netWorth: 700_000, burnout: 5 },
          next: "y15-laststandup",
        },
      },
      {
        id: "execs-first-standard",
        label: "Execs first — it's how it's done",
        outcome: {
          text:
            "The money is excellent and immediate. Two months later, a Glassdoor review titled 'Watch the tender order' does numbers internally.",
          effect: { netWorth: 900_000, burnout: 20 },
          next: "y15-laststandup",
        },
      },
    ],
  },
  {
    id: "y14-package-bet",
    year: 14,
    age: 35,
    slot: "y14-legacy",
    headline: "The Voluntary Exit Bet",
    text:
      "A restructuring opens one last voluntary package: a year's pay to walk. Everyone says your name will fill a consulting book fast — everyone not personally betting a salary on it.",
    choices: [
      {
        id: "stay-employed",
        label: "Decline — the paycheck is a fine hammock",
        outcome: {
          text:
            "You keep the badge and another year of maximum-earnings comfort. The consulting dream keeps its spot on the someday shelf, next to the pizza oven.",
          effect: { netWorth: 100_000, burnout: 10 },
          next: "y15-laststandup",
        },
      },
      {
        id: "take-package-consult",
        label: "Take the package — bet on your name",
        gamble: [
          {
            chance: 0.6,
            label: "Book fills fast — severance is profit",
            text:
              "Three anchor clients sign inside five weeks at rates that make the old salary look quaint. The package money never gets touched.",
            effect: { netWorth: 180_000, burnout: -10, title: "Consultant (In Demand)" },
            next: "y15-laststandup",
          },
          {
            chance: 0.4,
            label: "Slow start — six months of polite maybes",
            text:
              "The market books 'exploratory calls' with your name for two full quarters before anyone signs. Right call, rough spread.",
            effect: { netWorth: 20_000, burnout: 10, title: "Consultant (Eventually)" },
            next: "y15-laststandup",
          },
        ],
      },
    ],
  },
  {
    id: "y14-price-the-pop",
    year: 14,
    age: 35,
    slot: "y14-finalact",
    headline: "Pricing Night",
    text:
      "The bankers recommend leaving money on the table to buy a first-day pop. Pricing aggressive keeps that money — unless the stock breaks issue and 'broken IPO' leads every story forever.",
    choices: [
      {
        id: "bankers-price",
        label: "Take the bankers' price — buy the pop",
        outcome: {
          text:
            "You pop 40% at the open and CNBC calls it 'a blockbuster debut' — of money that was yours this morning. Fame trades rich.",
          effect: { netWorth: 1_500_000, burnout: 10, title: "Founder & CEO (Public)" },
          next: "y15-laststandup",
        },
      },
      {
        id: "price-aggressive",
        label: "Price aggressive — keep the table money",
        gamble: [
          {
            chance: 0.5,
            label: "It sticks — maximum proceeds",
            text:
              "The price holds and closes up a dignified 6% — no fireworks, just hundreds of millions that stayed with the people who built it. The bankers sulk beautifully.",
            effect: { netWorth: 2_500_000, burnout: 15, title: "Founder & CEO (Public)" },
            next: "y15-laststandup",
          },
          {
            chance: 0.5,
            label: "Breaks issue — 'broken IPO' headlines",
            text:
              "The stock slips under the offer by lunch, and 'broken IPO' glues itself to your ticker for two quarters. The proceeds were real; so is the narrative tax.",
            effect: { netWorth: 900_000, burnout: 25, title: "Founder & CEO (Public)" },
            next: "y15-laststandup",
          },
        ],
      },
    ],
  },
  {
    id: "y14-lockup-ride",
    year: 14,
    age: 35,
    slot: "y14-finalact",
    headline: "The Lockup Question",
    text:
      "Public, paper-rich, and locked up for 180 days while the stock does whatever it wants with your net worth. A bank offers a hedging collar; riding it naked means the full rocket or the full crater.",
    choices: [
      {
        id: "collar-it",
        label: "Take the collar — sleep at night",
        outcome: {
          text:
            "You cap the dream to kill the nightmare. The stock finishes inside the collar anyway, which the bank calls 'well-priced' and you call 'six months of naps.'",
          effect: { netWorth: 1_000_000, burnout: 5 },
          next: "y15-laststandup",
        },
      },
      {
        id: "ride-naked",
        label: "Ride the lockup naked — full exposure",
        gamble: [
          {
            chance: 0.45,
            label: "Stock doubles — the full rocket",
            text:
              "Two beat-and-raise quarters send the stock up 2x by the day you can sell. The banking app's push notifications become a genre of joy.",
            effect: { netWorth: 2_200_000, burnout: 10 },
            next: "y15-laststandup",
          },
          {
            chance: 0.55,
            label: "Halved before you can sell",
            text:
              "Quarter two misses by a hair and your lockup expires into the crater. Still wealthy — but the collar you declined haunts every future dinner party.",
            effect: { netWorth: 500_000, burnout: 20 },
            next: "y15-laststandup",
          },
        ],
      },
    ],
  },
];
