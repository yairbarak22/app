import type { Scenario } from "../types";

/**
 * YEAR 6 (age 27) — THE TECH WINTER. Hits every path.
 * Pools: y6-winter-bigtech (+3), y6-winter-startup (+3), y6-winter-founder (+3).
 */
export const YEAR_06: Scenario[] = [
  // ---------------------------------------------------------------- Big Tech
  {
    id: "y6-winter-bigtech",
    year: 6,
    age: 27,
    headline: "The Tech Winter",
    text:
      "A 'Year of Efficiency': not a reorg, an ice age. Twelve percent gone in one morning, whole orgs deleted like feature flags. A friend in HR texts you a single skull. Your name is on the list.",
    choices: [
      {
        id: "winter-severance",
        label: "Take the package and brave the frozen market",
        outcome: {
          text:
            "You walk into a market where every company is 'pausing hiring.' Recruiters who once spammed you now mark your emails as read. Winter is undefeated.",
          effect: { netWorth: 0, burnout: 20, title: "Staff-ish SWE (Frozen Out)" },
          next: "y7-comeback",
        },
      },
      {
        id: "winter-pull-strings",
        label: "▶ Pull strings — watch a video to survive",
        requiresAd: true,
        outcome: {
          text:
            "A director who owes you from the Great Migration™ edits a spreadsheet at 11 PM, and your name comes off the list. You keep the badge and a survivor's twitch.",
          effect: { netWorth: 50_000, burnout: 10 },
          achievement: "winter-proof",
          next: "y7-ai-goldrush",
        },
        adFallback: {
          text:
            "The director who owed you got cut in the same wave. Security collects your badge with the warmth of a parking meter.",
          effect: { netWorth: 10_000, burnout: 25, title: "Laid Off (Winter Class of Y6)" },
          next: "y7-comeback",
        },
      },
      {
        id: "winter-volunteer",
        label: "Volunteer and disappear to Japan",
        outcome: {
          text:
            "Four months of konbini eggs and pilgrimage trails, phone on airplane mode. The industry burns without you; you feel nothing. It's incredible.",
          effect: { netWorth: 15_000, burnout: -25, title: "Funemployed (Abroad)" },
          next: "y7-comeback",
        },
      },
    ],
  },
  {
    id: "y6-winter-pip",
    year: 6,
    age: 27,
    slot: "y6-winter-bigtech",
    headline: "Winter by Another Name",
    text:
      "Too image-conscious for layoffs, your company ships winter as paperwork: a surprise PIP with goals written by someone who's never seen your codebase. The 'supportive framework' has a 60-day timer.",
    choices: [
      {
        id: "fight-with-receipts",
        label: "Fight it — bury the PIP in receipts",
        outcome: {
          text:
            "You produce a document so thorough it deserves a DOI: shipped work, saved incidents, peer testimony. The PIP dies; your manager transfers mysteriously.",
          effect: { netWorth: 45_000, burnout: 20 },
          achievement: "winter-proof",
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "negotiate-exit",
        label: "Negotiate the exit — take door two",
        outcome: {
          text:
            "You skip the 60-day theater and negotiate straight to three months' pay. The PIP goals remain unachieved forever, like the framework deserved.",
          effect: { netWorth: 25_000, burnout: 10, title: "Senior SWE (Strategically Departed)" },
          next: "y7-comeback",
        },
      },
      {
        id: "interview-on-pip",
        label: "Smile at the PIP, interview like mad",
        outcome: {
          text:
            "Syncs by day, interviews by night — the offer lands two weeks before the timer. Your resignation thanks everyone for 'the supportive framework.'",
          effect: { netWorth: 50_000, burnout: 15, title: "Senior SWE (Escaped)" },
          next: "y7-ai-goldrush",
        },
      },
    ],
  },
  {
    id: "y6-winter-three-jobs",
    year: 6,
    age: 27,
    slot: "y6-winter-bigtech",
    headline: "The Survivors' Ward",
    text:
      "You survived the wave — 'congratulations.' Your reward: the work of the three people who didn't. Leadership calls it 'expanded scope'; your calendar calls it a hostage situation.",
    choices: [
      {
        id: "grind-through",
        label: "Absorb it all — be the load-bearing one",
        outcome: {
          text:
            "Three jobs on caffeine and grim competence — when the audit comes, your name is on everything. The retention grant is real; so is the eye twitch.",
          effect: { netWorth: 55_000, burnout: 30 },
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "public-boundaries",
        label: "Three jobs, one paycheck — pick two",
        outcome: {
          text:
            "You email a priority list and make leadership choose what drops. The org learns your yes means something because your no does.",
          effect: { netWorth: 40_000, burnout: 10 },
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "fog-coast",
        label: "Quiet-coast — nothing's measurable now",
        outcome: {
          text:
            "In the post-layoff fog, dashboards die and standups shrink. History will record this quarter as 'transitional'; you'll record it as 'restful.'",
          effect: { netWorth: 35_000, burnout: -5 },
          next: "y7-comeback",
        },
      },
    ],
  },
  {
    id: "y6-winter-relocation",
    year: 6,
    age: 27,
    slot: "y6-winter-bigtech",
    headline: "Relocate or Terminate",
    text:
      "The cost-cutting memo has a twist: your org is 'consolidating' to the Austin hub. Relocate on the company's dime or take a 'voluntary separation.' Three weeks, one lease, a life that wasn't consulted.",
    choices: [
      {
        id: "take-the-move",
        label: "Take the move — Austin, kept salary",
        outcome: {
          text:
            "Coastal pay in a barbecue economy, a half-empty hub like a frontier town with standing desks. Rent drops 40%; tacos improve 400%.",
          effect: { netWorth: 45_000, burnout: 10, title: "Staff SWE (Austin Hub)" },
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "take-separation",
        label: "Take the separation — life over line item",
        outcome: {
          text:
            "You choose your city and your people over the org chart. You regret nothing — except checking the relocated org's Slack once: they're all apartment hunting.",
          effect: { netWorth: 20_000, burnout: 15, title: "Staff SWE (Open to Work)" },
          next: "y7-comeback",
        },
      },
      {
        id: "remote-exception",
        label: "▶ Watch a video to reach the exec sponsor",
        requiresAd: true,
        outcome: {
          text:
            "Your skip-skip-level — a fan of your incident writeup — signs a one-line exception: 'retain, remote.' You keep the job, the city, and a debt payable later.",
          effect: { netWorth: 55_000, burnout: 5, title: "Staff SWE (Remote Exception)" },
          achievement: "winter-proof",
          next: "y7-ai-goldrush",
        },
        adFallback: {
          text:
            "The exec's calendar never opens; you're separated by default on a Friday, in a form letter that misspells your name. Nothing personal — which makes it worse.",
          effect: { netWorth: 10_000, burnout: 20, title: "Laid Off (Winter Class of Y6)" },
          next: "y7-comeback",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Startup
  {
    id: "y6-winter-startup",
    year: 6,
    age: 27,
    headline: "Tech Winter: The Down Round",
    text:
      "The IPO countdown vanishes from the all-hands deck. Then the down round: 40% haircut, options underwater, layoffs at noon. The rocket ship is now a submarine.",
    choices: [
      {
        id: "loyal-paycut",
        label: "Stay loyal through the cut. Captains, etc.",
        outcome: {
          text:
            "You take the 15% cut and keep the lights on while the tourists flee. Leadership's thanks: a 'Wartime Team' mug, not redeemable for currency.",
          effect: { netWorth: -10_000, burnout: 20 },
          next: "y7-survivor",
        },
      },
      {
        id: "winter-soft-landing",
        label: "▶ Watch a video — call in a soft landing",
        requiresAd: true,
        outcome: {
          text:
            "'I was literally about to call you.' Two weeks later you're badged into Big Tech on a hiring-freeze exception — the group chat calls it a wartime airlift.",
          effect: { netWorth: 55_000, burnout: 10, title: "Senior SWE @ Big Tech" },
          achievement: "winter-proof",
          next: "y7-ai-goldrush",
        },
        adFallback: {
          text:
            "Your old manager was laid off too — auto-reply: 'taking time with family.' The wave reaches your row by Thursday, and you pack the mug yourself.",
          effect: { netWorth: 5_000, burnout: 25, title: "Laid Off (Winter Class of Y6)" },
          next: "y7-comeback",
        },
      },
      {
        id: "retention-grant",
        label: "Negotiate a retention grant to stay",
        outcome: {
          text:
            "You walk in with a competing offer (real) and a poker face (fake), and walk out with a retention package. The grant vests monthly; so does the stress.",
          effect: { netWorth: 40_000, burnout: 25 },
          achievement: "big-bonus",
          next: "y7-survivor",
        },
      },
    ],
  },
  {
    id: "y6-winter-acquihire-rumor",
    year: 6,
    age: 27,
    slot: "y6-winter-startup",
    headline: "The Acquihire Rumor Mill",
    text:
      "A journalist tweets that your struggling startup is 'in talks' with two acquirers. The founder denies everything at all-hands, using the exact cadence of a person confirming everything.",
    choices: [
      {
        id: "position-as-key",
        label: "Become the asset any acquirer must keep",
        outcome: {
          text:
            "You quietly become the only person who can run the core systems, and the data room reflects it. The retention offers are tiered; yours is the top tier.",
          effect: { netWorth: 45_000, burnout: 15, title: "Senior Eng (Key Person Clause)" },
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "organize-the-engineers",
        label: "Organize the engineers into a bloc",
        outcome: {
          text:
            "Eight engineers, one polite collective letter: replacing you all costs more than paying you all. Solidarity — surprisingly compatible with capitalism.",
          effect: { netWorth: 30_000, burnout: 20 },
          next: "y7-survivor",
        },
      },
      {
        id: "jump-before-news",
        label: "Jump before the news does",
        outcome: {
          text:
            "You land at Big Tech ten days before the acquisition announcement — and its hiring freeze. Timing isn't everything; it's the only thing.",
          effect: { netWorth: 40_000, burnout: 10, title: "Senior SWE @ Big Tech" },
          next: "y7-ai-goldrush",
        },
      },
    ],
  },
  {
    id: "y6-winter-paycut-vote",
    year: 6,
    age: 27,
    slot: "y6-winter-startup",
    headline: "The Vote",
    text:
      "The founder puts it to the company: everyone takes a 20% cut and nobody is laid off, or layoffs hit 20% and salaries hold. The poll is anonymous. The consequences aren't.",
    choices: [
      {
        id: "vote-cut-stay",
        label: "Vote for the cut — nobody left on ice",
        outcome: {
          text:
            "The cut passes 71-29 and the company gets closer — the shared bruise becomes shared purpose, and the loyalty premium pays out when the thaw comes.",
          effect: { netWorth: -15_000, burnout: 15 },
          next: "y7-survivor",
        },
      },
      {
        id: "vote-layoffs",
        label: "Vote layoffs — half-funding helps no one",
        outcome: {
          text:
            "The option nobody admits voting for wins 52-48. You keep your full salary and a complicated relationship with anonymous polls.",
          effect: { netWorth: 30_000, burnout: 25 },
          next: "y7-survivor",
        },
      },
      {
        id: "abstain-interview",
        label: "Abstain — quietly test the market",
        outcome: {
          text:
            "You skip the vote and book interviews, hedging both outcomes. Democracy is beautiful; liquidity is portable.",
          effect: { netWorth: 35_000, burnout: 10, title: "Senior SWE (Elsewhere)" },
          next: "y7-comeback",
        },
      },
    ],
  },
  {
    id: "y6-winter-cooked-books",
    year: 6,
    age: 27,
    slot: "y6-winter-startup",
    headline: "The Runway Is a Lie",
    text:
      "During a late-night deploy, the CFO's screen-share flashes a forbidden tab: the 'investor runway' and the real runway differ by seven months. You know. You can't un-know.",
    choices: [
      {
        id: "confront-ceo",
        label: "Confront the CEO privately",
        outcome: {
          text:
            "He doesn't deny it — 'confidence is a resource too.' A bridge gets raised on honest terms, and you become the person the CEO can't bluff.",
          effect: { netWorth: 20_000, burnout: 20 },
          next: "y7-survivor",
        },
      },
      {
        id: "tell-the-board",
        label: "Tell the board — some fictions fire people",
        outcome: {
          text:
            "The independent director takes action: audited numbers, a chastened CEO, a plan built on reality. Never quite forgiven, never once wrong.",
          effect: { netWorth: 25_000, burnout: 25 },
          next: "y7-survivor",
        },
      },
      {
        id: "leave-quietly",
        label: "Leave — don't debug others' ethics",
        outcome: {
          text:
            "You exit with clean references and a practiced line about 'new challenges.' Seven months later the implosion makes the newsletters.",
          effect: { netWorth: 40_000, burnout: 10, title: "Senior SWE (Elsewhere)" },
          next: "y7-comeback",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Founder
  {
    id: "y6-winter-founder",
    year: 6,
    age: 27,
    headline: "Tech Winter: Funding Freeze",
    text:
      "The VCs who fought over your last round now answer with 'love the hustle — circling back in Q3.' There is no Q3. Five months of runway, a team that believes in you — and belief doesn't make payroll.",
    choices: [
      {
        id: "cut-burn",
        label: "Cut burn to the bone — lay off your friends",
        outcome: {
          text:
            "You make the list yourself and deliver every message yourself. In the garage-days photo, half the faces don't work here anymore.",
          effect: { netWorth: 0, burnout: 30 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "winter-warm-intro",
        label: "▶ Watch a video for a warm Tier-1 intro",
        requiresAd: true,
        outcome: {
          text:
            "The partner takes the meeting 'as a favor' and stays 40 minutes over. A bridge lands at flat — this year, the same as 'oversubscribed.' Payroll clears.",
          effect: { netWorth: 25_000, burnout: 10 },
          next: "y7-founder-grind",
        },
        adFallback: {
          text:
            "The intro goes to voicemail, the bridge collapses on a Friday, and you personally loan the company payroll — a sentence your accountant makes you repeat.",
          effect: { netWorth: -30_000, burnout: 25 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "acquihire",
        label: "Take the acquihire — sell for parts",
        outcome: {
          text:
            "Big Tech buys the team and quietly deletes the product. 'We couldn't be more excited,' says the press release. You could be — but the retention money is real.",
          effect: { netWorth: 130_000, burnout: 10, title: "Acquihired Founder" },
          next: "y7-ai-goldrush",
        },
      },
    ],
  },
  {
    id: "y6-winter-revenue-share",
    year: 6,
    age: 27,
    slot: "y6-winter-founder",
    headline: "The Devil's Revenue Deal",
    text:
      "VC money is frozen; a revenue-based fund offers cash now for 20% of top-line until they've made 2.5x. No dilution — just a tax on every future dollar. The term sheet fits on one page. Scarier.",
    choices: [
      {
        id: "take-rbf",
        label: "Take the deal — survive now, optimize later",
        outcome: {
          text:
            "The wire lands, payroll steadies, and every invoice gains an invisible passenger taking its cut. Expensive money — but money, in a season without any.",
          effect: { netWorth: 40_000, burnout: 15 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "refuse-cut-deeper",
        label: "Refuse — cut deeper, keep every dollar",
        outcome: {
          text:
            "You shrink to a crew that fits in one car and a burn rate that fits in a checking account. Ownership: retained the hard way.",
          effect: { netWorth: 0, burnout: 25 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "pivot-to-services",
        label: "Pivot to consulting — sell the hours",
        outcome: {
          text:
            "You duct-tape a services arm onto the company: slower dream, faster cash. Two clients quietly become your biggest product customers.",
          effect: { netWorth: 30_000, burnout: 20, title: "Founder (Consulting Era)" },
          next: "y7-founder-grind",
        },
      },
    ],
  },
  {
    id: "y6-winter-shutdown-call",
    year: 6,
    age: 27,
    slot: "y6-winter-founder",
    headline: "The Orderly Shutdown Speech",
    text:
      "Your lead investor brings a deck. Slide two: an orderly shutdown, capital returned, reputations 'preserved.' He wrote your company off in his model last quarter — you can hear it in his tenses.",
    choices: [
      {
        id: "defy-the-deck",
        label: "Refuse the funeral — not a slide yet",
        outcome: {
          text:
            "You thank him for the deck and decline the burial. The team shrinks to true believers and crawls on via revenue, spite, and a group chat named 'still alive.'",
          effect: { netWorth: 0, burnout: 30 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "wind-down-gracefully",
        label: "Wind down clean — land the team softly",
        outcome: {
          text:
            "You return the capital, place every employee, and write the shutdown post people call 'a class act.' The preserved reputation is real currency.",
          effect: { netWorth: 20_000, burnout: 10, title: "Founder (Wound Down With Honor)" },
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "sell-ip-competitor",
        label: "Sell the IP to your competitor quietly",
        outcome: {
          text:
            "Your rival buys the tech, the patents, and — awkwardly — the Slack emoji pack. Six figures more than the shutdown deck offered.",
          effect: { netWorth: 60_000, burnout: 10, title: "Founder (Sold for Parts)" },
          next: "y7-ai-goldrush",
        },
      },
    ],
  },
  {
    id: "y6-winter-gov-contract",
    year: 6,
    age: 27,
    slot: "y6-winter-founder",
    headline: "The Government Lifeline",
    text:
      "Salvation arrives wearing a lanyard: a state agency wants your product, via 340 pages of procurement and an 11-month payment cycle. The least glamorous money in software — maybe the only money left.",
    choices: [
      {
        id: "chase-the-contract",
        label: "Chase it — boring money is still money",
        outcome: {
          text:
            "Eight months of compliance forms and one FIPS acronym you now dream about. Government revenue has no hype cycle — it just arrives, quarterly, forever.",
          effect: { netWorth: 45_000, burnout: 20, title: "Founder (GovTech, Somehow)" },
          next: "y7-founder-grind",
        },
      },
      {
        id: "stay-pure",
        label: "Pass — compliance would eat the product",
        outcome: {
          text:
            "You do the math on 340 pages versus four people and decline. When the market thaws, you're the fastest thing left standing in the category.",
          effect: { netWorth: 0, burnout: 20 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "both-badly",
        label: "Try to do both with four people",
        outcome: {
          text:
            "Compliance by day, product by night, quality by neither. You win the contract, lose two customers, and learn focus is a feature you shipped too late.",
          effect: { netWorth: -10_000, burnout: 25 },
          next: "y7-founder-grind",
        },
      },
    ],
  },
  {
    id: "y6-winter-transfer-lottery",
    year: 6,
    age: 27,
    slot: "y6-winter-bigtech",
    headline: "The Transfer Window",
    text:
      "Layoffs land in two weeks, and the rumor map says your org is 'red,' infra is 'green.' A mid-freeze transfer needs three approvals — and half-finished transfers get cut from both orgs' books at once.",
    choices: [
      {
        id: "stand-your-ground",
        label: "Stay put — trust the record, not the map",
        outcome: {
          text:
            "The wave takes a third of the org and leaves you standing — winded, employed, owner of three more services by Friday. The map was half right, like maps.",
          effect: { netWorth: 30_000, burnout: 20 },
          achievement: "winter-proof",
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "sprint-the-transfer",
        label: "Sprint the transfer — three approvals",
        gamble: [
          {
            chance: 0.5,
            label: "Approved in time — safe in the green org",
            text:
              "You speedrun the paperwork like a heist, VP signature obtained at a coffee machine. The transfer clears four days before the wave; your new badge works fine.",
            effect: { netWorth: 50_000, burnout: 10, title: "Staff SWE (Infra Org)" },
            achievement: "winter-proof",
            next: "y7-ai-goldrush",
          },
          {
            chance: 0.5,
            label: "Frozen mid-process — cut from both books",
            text:
              "The third approval sits in a VP's inbox when the freeze drops. You exist in neither org's headcount, which HR resolves the efficient way.",
            effect: { netWorth: 10_000, burnout: 25, title: "Laid Off (Lost in Transfer)" },
            next: "y7-comeback",
          },
        ],
      },
    ],
  },
  {
    id: "y6-winter-jump-bet",
    year: 6,
    age: 27,
    slot: "y6-winter-bigtech",
    headline: "The Winter-Proof Startup",
    text:
      "Mid-freeze, a 'winter-proof' startup — gov contracts, boring revenue — offers you a lead role. Jumping means trading severance protection for a claim never tested by an actual winter.",
    choices: [
      {
        id: "cling-to-badge",
        label: "Stay badged — ride out the wave",
        outcome: {
          text:
            "The cut misses you by one row in the org chart — close enough to hear it. Employed, intact, newly appreciative of boring Fridays.",
          effect: { netWorth: 25_000, burnout: 20 },
          achievement: "winter-proof",
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "jump-midwinter",
        label: "Jump to the 'winter-proof' startup",
        gamble: [
          {
            chance: 0.4,
            label: "Actually winter-proof — checks clear",
            text:
              "The government checks clear quarterly and the roadmap ignores the news cycle entirely. Winter-proof was real, and you bought in at the bottom.",
            effect: { netWorth: 55_000, burnout: 10, title: "Eng Lead (Winter-Proof)" },
            achievement: "winter-proof",
            next: "y7-ai-goldrush",
          },
          {
            chance: 0.6,
            label: "They lay off too — six weeks in",
            text:
              "The anchor contract 'rebids' and the startup cuts a third of staff — last in, first out. Six weeks of tenure, zero severance, one cold lesson in adjectives.",
            effect: { netWorth: 0, burnout: 25, title: "Laid Off (Twice in One Winter)" },
            next: "y7-comeback",
          },
        ],
      },
    ],
  },
  {
    id: "y6-winter-underwater-buy",
    year: 6,
    age: 27,
    slot: "y6-winter-startup",
    headline: "Buying the Bottom",
    text:
      "The down round comes with a grim perk: employees may buy shares at the crushed valuation. Trade of the decade, or good money into a submarine. The CFO is buying. The CFO also priced the round.",
    choices: [
      {
        id: "preserve-cash",
        label: "Pass — cash is a position too",
        outcome: {
          text:
            "You keep your powder dry and your exposure singular: salary only. In winters, liquidity is its own kind of alpha.",
          effect: { netWorth: 15_000, burnout: 15 },
          next: "y7-survivor",
        },
      },
      {
        id: "buy-the-dip",
        label: "Buy the dip — the CFO is buying",
        gamble: [
          {
            chance: 0.35,
            label: "V-shaped recovery — that was the bottom",
            text:
              "Eighteen months un-crush the valuation: a recovery round above the old peak, your winter shares up 4x. The trade you'll bore people with forever.",
            effect: { netWorth: 70_000, burnout: 10 },
            next: "y7-survivor",
          },
          {
            chance: 0.65,
            label: "The bottom had a basement",
            text:
              "Your 'discounted' shares stay below even the crushed price — the CFO was averaging down from worse. Insider buying: sometimes conviction, sometimes cope.",
            effect: { netWorth: -25_000, burnout: 20 },
            next: "y7-survivor",
          },
        ],
      },
    ],
  },
  {
    id: "y6-winter-severance-poker",
    year: 6,
    age: 27,
    slot: "y6-winter-startup",
    headline: "The Voluntary Package",
    text:
      "A voluntary severance window opens: three months' pay to walk before the involuntary round decides for you. It's a bet you can outrun a frozen market that answers email with an away message.",
    choices: [
      {
        id: "keep-the-seat",
        label: "Decline — hold the seat through the storm",
        outcome: {
          text:
            "The involuntary round grazes your team but misses you, and by spring you're running what's left. Not the comfortable path — the compounding one.",
          effect: { netWorth: 20_000, burnout: 20 },
          next: "y7-survivor",
        },
      },
      {
        id: "take-package-bet",
        label: "Take the package — bet on a fast rehire",
        gamble: [
          {
            chance: 0.55,
            label: "Rehired in five weeks — double-dip",
            text:
              "A warm intro lands a Senior role in week five while the package keeps paying. Legal double-dipping: the winter's rarest trick.",
            effect: { netWorth: 60_000, burnout: 5, title: "Senior SWE (Landed Fast)" },
            achievement: "big-bonus",
            next: "y7-ai-goldrush",
          },
          {
            chance: 0.45,
            label: "Frozen market — seven months of silence",
            text:
              "The package runs out in month three; the market thaws in month seven. You learn the exact sound a savings account makes when it drains.",
            effect: { netWorth: -10_000, burnout: 20 },
            next: "y7-comeback",
          },
        ],
      },
    ],
  },
  {
    id: "y6-winter-ai-hailmary",
    year: 6,
    age: 27,
    slot: "y6-winter-founder",
    headline: "The Hail Mary Pivot",
    text:
      "Your one live advisor says the quiet part: 'The only checks this year have AI in the memo line.' A hard pivot could catch the boom — or join a crater of identical pivots. Five months. One throw.",
    choices: [
      {
        id: "stay-the-course-lean",
        label: "Stay the course — leanness beats fashion",
        outcome: {
          text:
            "You keep shipping the unfashionable thing customers pay for. The freeze eventually thaws for boring revenue too — it just doesn't tweet about it.",
          effect: { netWorth: 5_000, burnout: 20 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "throw-the-hailmary",
        label: "Hard pivot to AI — catch the wave early",
        gamble: [
          {
            chance: 0.4,
            label: "Early wave caught — pivots into the boom",
            text:
              "You rebuild around the models months early, and when the wave breaks you're standing on it: inbound, press, the first term sheet of the thaw.",
            effect: { netWorth: 50_000, burnout: 15, title: "AI Founder (Early)" },
            next: "y7-founder-grind",
          },
          {
            chance: 0.6,
            label: "Crowded crater — one of a hundred pivots",
            text:
              "Launch day: ninety-nine identical 'AI-powered' homepages, four with better funding. The wave arrives; you're underneath it.",
            effect: { netWorth: -25_000, burnout: 25 },
            next: "y7-founder-grind",
          },
        ],
      },
    ],
  },
  {
    id: "y6-winter-shark-bridge",
    year: 6,
    age: 27,
    slot: "y6-winter-founder",
    headline: "The Shark's Bridge",
    text:
      "One investor still writes checks — shark terms: a 3x liquidation pref that eats every future where you're not a unicorn. The alternative: cut to the bone and race the runway. The shark smiles.",
    choices: [
      {
        id: "take-shark-terms",
        label: "Take the bridge — encumbered beats dead",
        outcome: {
          text:
            "You sign the 3x pref with a steady hand and a clenched jaw. Payroll is safe; your exit math is now a hostage negotiation scheduled for later.",
          effect: { netWorth: 10_000, burnout: 20 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "race-the-clock",
        label: "Refuse the shark — race the runway",
        gamble: [
          {
            chance: 0.5,
            label: "Revenue closes the gap — cap table clean",
            text:
              "Five months of feral, invoice-chasing focus later, revenue crosses burn with six weeks to spare. The team shirt says 'DEFAULT ALIVE' and nobody's laughing.",
            effect: { netWorth: 35_000, burnout: 15 },
            next: "y7-founder-grind",
          },
          {
            chance: 0.5,
            label: "Miss payroll once — near-death",
            text:
              "The race comes up two weeks short and you cover payroll from your own account. A customer prepayment saves the company on a Thursday afternoon.",
            effect: { netWorth: -30_000, burnout: 30 },
            next: "y7-founder-grind",
          },
        ],
      },
    ],
  },
];
