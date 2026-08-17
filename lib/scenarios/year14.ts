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
      "The new grads ship with AI agents in hours what took your generation quarters, and they say 'legacy code' about things you wrote proudly. You're not obsolete — you're context. The question of year fourteen is what to do with the last of your prime: stack, spite, or step back.",
    choices: [
      {
        id: "mentor-legacy",
        label: "Build the bench — make your knowledge outlive your badge",
        outcome: {
          text:
            "You spend the year making other people better: design reviews that teach, docs that survive you, three promotions that have your fingerprints on them and your name nowhere. It's the least measurable work you've done and the most durable.",
          effect: { netWorth: 100_000, burnout: -5 },
          next: "y15-laststandup",
        },
      },
      {
        id: "spite-promo",
        label: "One more promo, purely out of spite",
        outcome: {
          text:
            "Someone in calibration said you'd 'plateaued.' Big mistake. You produce the strongest packet of your career at 35 like a retired boxer winning a title fight. The promo lands. The point was never the money. (The money's great.)",
          effect: { netWorth: 150_000, burnout: 20 },
          next: "y15-laststandup",
        },
      },
      {
        id: "year-sabbatical",
        label: "Negotiate a one-year sabbatical — the full recharge",
        outcome: {
          text:
            "Unpaid, unplugged, unreachable. You walk a long trail, fix up a boat, and go four consecutive months without saying the word 'roadmap.' Somewhere in month five, you remember what your brain sounds like when nothing is on fire.",
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
      "It arrives at 2 AM, the way it always does: an idea so specific and so obviously yours that you sketch the architecture on a grocery receipt. You're 35, comfortable, and one incorporation form away from doing the whole insane thing again. The receipt sits on your desk for a week, radiating.",
    choices: [
      {
        id: "scratch-it-lightly",
        label: "Scratch it lightly — build it as a funded side quest",
        outcome: {
          text:
            "You build the receipt-idea on weekends with one collaborator and zero investors, shipping it as a polished tool that a niche adores. It makes side-project money and main-character joy. Not every idea needs a board. Some just need a Saturday.",
          effect: { netWorth: 80_000, burnout: 10, title: "Engineer & Side-Quester" },
          next: "y15-laststandup",
        },
      },
      {
        id: "full-send-again",
        label: "Full send — incorporate, raise, one more company",
        outcome: {
          text:
            "The receipt becomes a deck becomes a seed round in eleven days — your reputation does the roadshow for you. You're back at day zero by choice, older, faster, and immune to every mistake except the new ones. The itch, scratched, becomes a fire.",
          effect: { netWorth: -100_000, burnout: 25, title: "Founder (One More Time)" },
          next: "y15-laststandup",
        },
      },
      {
        id: "write-the-book",
        label: "Write the book instead — ship the pattern, not the product",
        outcome: {
          text:
            "You realize the receipt-idea is really a chapter, and the chapter is really a book: everything fourteen years taught you, written for the person you were at 22. It sells modestly and changes maybe four hundred careers. Better math than most startups.",
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
      "The junior you mentored a decade ago — the one whose first pull request you gently rewrote — takes their company public on a Thursday. Your advisor shares, accepted years ago in lieu of a consulting fee you almost invoiced, are suddenly worth actual wealth. They thank you from the podium. You cry at your desk and deny it forever.",
    choices: [
      {
        id: "cash-and-celebrate",
        label: "Sell at the lockup, celebrate loudly, frame the photo",
        outcome: {
          text:
            "You sell post-lockup into strength and take the protégé to the same taco place where you once explained pointers. The advisor shares — very nearly an invoice — become the best 'fee' of your career. Mentorship: variable compensation, infinite duration.",
          effect: { netWorth: 400_000, burnout: -5 },
          next: "y15-laststandup",
        },
      },
      {
        id: "roll-into-next",
        label: "Roll it into their next act — become their permanent backer",
        outcome: {
          text:
            "You keep most of the position and a promise: whatever they build next, you're the first call. The relationship compounds past money into something rarer — a two-decade alliance that started with a rewritten pull request and a little patience.",
          effect: { netWorth: 100_000, burnout: 5, title: "Backer of Protégés" },
          next: "y15-laststandup",
        },
      },
      {
        id: "quiet-index",
        label: "Diversify quietly — pride in public, prudence in private",
        outcome: {
          text:
            "You sell most into the index like the boring adult you've become, keep a symbolic stake, and say nothing on social media except one photo of the taco place. The protégé understands completely. That's why they thanked you from the podium.",
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
      "The product you built in year two — your first real shipped thing, the one whose launch night pizza you can still taste — gets its sunset email: 'deprecated effective Q3.' Twelve years of uptime, ended in two corporate paragraphs. Your old team's alumni channel lights up with grief emojis and one perfect screenshot of the original whiteboard.",
    choices: [
      {
        id: "write-the-eulogy",
        label: "Write the eulogy thread — give it the sendoff it earned",
        outcome: {
          text:
            "Your thread — the whiteboard photo, the 3 AM launch story, the bug that became a feature — goes quietly viral among everyone who ever shipped anything. Strangers reply with their own dead products. For one night, the internet is a wake, and it's beautiful.",
          effect: { netWorth: 60_000, burnout: -5 },
          next: "y15-laststandup",
        },
      },
      {
        id: "open-source-rescue",
        label: "Rescue it — negotiate an open-source release",
        outcome: {
          text:
            "Three months of license archaeology and one sympathetic VP later, the code goes public under Apache 2.0. A community fork appears within weeks, run by two maintainers in Poland who love it more than the company ever did. Products die. Code, properly freed, doesn't have to.",
          effect: { netWorth: 40_000, burnout: 15 },
          next: "y15-laststandup",
        },
      },
      {
        id: "let-it-go",
        label: "Let it go — you built it, you don't have to bury it",
        outcome: {
          text:
            "You read the sunset email twice, react with one emoji, and close the laptop. That product already did its job: it built the engineer who built everything after it. You keep the whiteboard photo. The rest was always temporary. Everything is.",
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
      "Fourteen years from a dorm room to this: the outcome year. Whatever happens next — the bell, the wire, the handoff — this is the chapter the documentary will linger on. The market is watching, the team is watching, and somewhere your 22-year-old self is watching hardest of all.",
    choices: [
      {
        id: "ring-the-bell",
        label: "Ring the bell — take the company public",
        outcome: {
          text:
            "You stand on the podium with the team from the garage days and ring the bell as the ticker — your ticker — crawls across the wall. The stock pops 30%. Your stake becomes a number newspapers print. Somewhere, your first rejection email composts quietly.",
          effect: { netWorth: 3_500_000, burnout: 15, title: "Founder & CEO (Public)" },
          next: "y15-laststandup",
        },
      },
      {
        id: "eleventh-hour-sale",
        label: "Take the eleventh-hour mega-acquisition instead",
        outcome: {
          text:
            "Seventy-two hours before the roadshow, a strategic acquirer calls with a number that makes the IPO math look like a tip jar. The board votes in an hour. You sign at midnight. Cash, certainty, and one hell of an epilogue.",
          effect: { netWorth: 2_000_000, burnout: 5, title: "Exited Founder" },
          next: "y15-laststandup",
        },
      },
      {
        id: "window-closes",
        label: "The market turns — pull the IPO and grind on",
        outcome: {
          text:
            "Three weeks before pricing, the market rolls over and the bankers say the word no founder wants to hear: 'postpone.' You address the all-hands with a steady voice and shaking hands. The company is fine. The dream is deferred, not dead. But it costs you a year of sleep.",
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
      "The IPO lawyers present two futures: dual-class shares that keep you in control 'in perpetuity,' or one-share-one-vote that the big index funds — and two of your own board members — insist on. The governance fight goes public via a leaked memo. Your control of your life's work is now a debate other people are having in print.",
    choices: [
      {
        id: "keep-control",
        label: "Fight for the dual-class — founders finish what they start",
        outcome: {
          text:
            "You win the structure after a bruising month: 10x voting shares, index-fund grumbling, and two governance op-eds with your face on them. The IPO prices slightly lower — the control discount, itemized. You'd pay it twice. Nobody steers this ship by proxy.",
          effect: { netWorth: 150_000, burnout: 25, title: "Founder-CEO (Controlled)" },
          next: "y15-laststandup",
        },
      },
      {
        id: "concede-for-price",
        label: "Concede — one share, one vote, full price",
        outcome: {
          text:
            "You take the vanilla structure and the valuation bump that comes with it, betting that performance — not share class — is the real control. The board applauds. The activist investors circle a year later, exactly as the lawyers predicted. Round two, someday.",
          effect: { netWorth: 300_000, burnout: 10 },
          next: "y15-laststandup",
        },
      },
      {
        id: "pe-exit-instead",
        label: "Skip the whole circus — take the private equity exit",
        outcome: {
          text:
            "Mid-governance-war, a buyout firm offers certainty: full acquisition, you stay CEO for two years, nobody ever says 'proxy advisory' to you again. You sign with the specific pleasure of leaving an argument mid-sentence. The wire is enormous. The silence is better.",
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
      "The roadshow went fine. The market didn't. Pricing night arrives with the bankers proposing a number below your last private round — a 'down IPO,' the phrase every unicorn dreads. Going public at this price makes early employees whole and late investors furious. Waiting might mean no window at all. The call is yours, tonight, by 9 PM Eastern.",
    choices: [
      {
        id: "price-it-anyway",
        label: "Price it — a real company beats a perfect valuation",
        outcome: {
          text:
            "You take the down IPO and the headlines that come with it. Then the quarters do the talking: three beats in a row and the stock crosses the old private mark within eighteen months. The employees who could finally sell send you bottle after bottle. Liquidity forgives everything.",
          effect: { netWorth: 800_000, burnout: 20, title: "Founder & CEO (Public, Humbled)" },
          next: "y15-laststandup",
        },
      },
      {
        id: "pull-and-wait",
        label: "Pull it — you don't sell the company at a discount, ever",
        outcome: {
          text:
            "You walk away from the window at 8:52 PM and absorb a year of 'what happened to their IPO' articles. The company grinds, grows, and files again into a better market. The wait costs sleep and buys billions of dollars of difference. Probably. The 'probably' is the tax.",
          effect: { netWorth: 100_000, burnout: 25 },
          next: "y15-laststandup",
        },
      },
      {
        id: "flat-sale-strategic",
        label: "Call the strategic who's been waiting — sell at flat, tonight",
        outcome: {
          text:
            "One phone call turns pricing night into deal night: the strategic acquirer matches the last private round in cash before midnight. Not the bell-ringing ending, but every cap-table tier gets paid and nobody reads a down-round headline. Certainty: the most underrated exit multiple.",
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
      "Before the final liquidity event, the bankers need one decision nobody tweets about: the tender structure — who gets to sell, how much, in what order. The spreadsheet has three tabs: 'Execs first' (standard), 'Pro-rata' (fair-ish), and a third tab you added at 1 AM labeled 'employees_first_v2_FINAL.' Your CFO calls it unusual. Your 22-year-old self calls it obvious.",
    choices: [
      {
        id: "employees-first",
        label: "Employees first — the garage crew sells before you do",
        outcome: {
          text:
            "The janitor-to-CEO ordering goes through: early employees and the support team sell first tranches at full price, execs wait a cycle. It costs you liquidity timing and buys something markets can't price — four hundred people who will tell this story forever. Some legacies are wire-transfer shaped.",
          effect: { netWorth: 500_000, burnout: -10, title: "Founder (Employees First)" },
          next: "y15-laststandup",
        },
      },
      {
        id: "pro-rata-all",
        label: "Pro-rata for everyone — clean, fair, defensible",
        outcome: {
          text:
            "Everyone sells the same percentage, from employee #4 to the Series C fund. Nobody's thrilled; nobody's wronged; the allocation meeting takes eleven minutes. Fairness, it turns out, is the quietest of all the options and ages the best in the retelling.",
          effect: { netWorth: 700_000, burnout: 5 },
          next: "y15-laststandup",
        },
      },
      {
        id: "execs-first-standard",
        label: "Standard structure — execs first, it's how it's done",
        outcome: {
          text:
            "You sign the default tab and the money is excellent and immediate. Two months later, a Glassdoor review titled 'Watch the tender order' does numbers internally. Nothing was wrong, exactly. But 'how it's done' has a cost, and it's paid in the currency you spent twelve years earning.",
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
      "A restructuring opens one last voluntary package: a year's pay to walk. Your plan B is consulting — your name should fill a client book fast, says everyone who isn't personally betting a year's salary on it. The package window closes Friday. The consulting market's opinion arrives only after you've jumped.",
    choices: [
      {
        id: "stay-employed",
        label: "Decline the package — the paycheck is a fine hammock",
        outcome: {
          text:
            "You let the window close and keep the badge, banking another year of maximum-earnings comfort. The consulting dream keeps its spot on the someday shelf, next to the novel and the pizza oven.",
          effect: { netWorth: 100_000, burnout: 10 },
          next: "y15-laststandup",
        },
      },
      {
        id: "take-package-consult",
        label: "Take the package — bet the year's pay on your own name",
        gamble: [
          {
            chance: 0.6,
            label: "Book fills in a month — severance becomes pure profit",
            text:
              "Your name works harder than you did: three anchor clients sign inside five weeks, at rates that make the old salary look quaint. The package money never gets touched — it just sits there, a year's pay earned for leaving. The someday shelf empties beautifully.",
            effect: { netWorth: 180_000, burnout: -10, title: "Consultant (In Demand)" },
            next: "y15-laststandup",
          },
          {
            chance: 0.4,
            label: "Slow start — six months of polite maybes",
            text:
              "The market likes your name and books 'exploratory calls' with it for two full quarters before anyone signs. The package money does its actual job — bridging — and the book eventually fills, later and leaner than the dream. Betting on yourself: right call, rough spread.",
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
      "The book is covered and pricing night arrives. The bankers recommend the 'orderly' price — leave money on the table, buy a first-day pop, make everyone's chart pretty. Pricing aggressive keeps that money for the company and the sellers (you) — unless the stock breaks issue and 'broken IPO' leads every story forever.",
    choices: [
      {
        id: "bankers-price",
        label: "Take the bankers' price — buy the pop, sell the story",
        outcome: {
          text:
            "You price orderly, pop 40% at the open, and watch CNBC call it 'a blockbuster debut' — of money that was yours this morning. The chart is gorgeous. The table money is gone. The trade was fame for float, and fame trades rich.",
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
            label: "It sticks — maximum proceeds, no discount",
            text:
              "The aggressive price holds through the open and closes up a modest, dignified 6%. No fireworks, no headlines — just hundreds of millions that stayed with the company and the people who built it instead of the pop-chasers. The bankers sulk beautifully.",
            effect: { netWorth: 2_500_000, burnout: 15, title: "Founder & CEO (Public)" },
            next: "y15-laststandup",
          },
          {
            chance: 0.5,
            label: "Breaks issue — 'broken IPO' leads every story",
            text:
              "The stock slips under the offer price by lunch, and 'broken IPO' becomes the phrase glued to your ticker for two quarters. The proceeds were real and enormous; the narrative tax is also real, paid in every earnings-call preamble until the numbers drown it out.",
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
      "You're public, paper-rich, and locked up for 180 days while the stock does whatever it wants with your net worth. A bank offers a hedging collar — cap your upside, floor your downside, sleep like a CFO. Riding it naked means the full rocket or the full crater, live-streamed to your banking app.",
    choices: [
      {
        id: "collar-it",
        label: "Take the collar — floor the downside, sleep at night",
        outcome: {
          text:
            "You cap the dream to kill the nightmare, locking a range that guarantees wealthy-forever regardless of what the ticker does at 3 AM. The stock finishes inside the collar anyway, which the bank calls 'a well-priced structure' and you call 'six months of naps.'",
          effect: { netWorth: 1_000_000, burnout: 5 },
          next: "y15-laststandup",
        },
      },
      {
        id: "ride-naked",
        label: "Ride the lockup naked — full exposure, full faith",
        gamble: [
          {
            chance: 0.45,
            label: "Stock doubles by lockup — the full rocket",
            text:
              "Two beat-and-raise quarters inside the lockup send the stock up 2x by the day you can finally sell. Your unhedged conviction pays in full, publicly, with the whole cap table watching. The banking app's push notifications become a genre of joy.",
            effect: { netWorth: 2_200_000, burnout: 10 },
            next: "y15-laststandup",
          },
          {
            chance: 0.55,
            label: "Earnings miss — halved before you can sell",
            text:
              "Quarter two misses by a hair, the stock halves with the sector, and your lockup expires into the crater. Still wealthy — the numbers were always life-changing — but the collar you declined becomes the ghost at every future dinner party, clinking its chains politely.",
            effect: { netWorth: 500_000, burnout: 20 },
            next: "y15-laststandup",
          },
        ],
      },
    ],
  },
];
