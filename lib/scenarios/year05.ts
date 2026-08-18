import type { Scenario } from "../types";

/**
 * YEAR 5 (age 26) — the year before the winter.
 * Pools: y5-bigtech-staffpacket (+2), y5-rocketship (+2),
 *        y5-startup-seriesb (+2), y5-founder-pmf (+2).
 */
export const YEAR_05: Scenario[] = [
  // ---------------------------------------------------------------- Big Tech
  {
    id: "y5-bigtech-staffpacket",
    year: 5,
    age: 26,
    headline: "The Staff Packet",
    text:
      "Promo season: Staff needs 'scope,' 'impact,' and a packet that counts as fiction. The one Staff-shaped project: the Great Migration™ — 900 services onto a database you'll all hate in three years.",
    choices: [
      {
        id: "lead-migration",
        label: "Lead the Great Migration™. Glory or death",
        outcome: {
          text:
            "Twelve months of scope creep, four near-death incidents, one launch email with 47 people cc'd — and the committee says yes. 'Staff' hits your signature.",
          effect: { netWorth: 85_000, burnout: 25, title: "Staff SWE @ Big Tech" },
          next: "y6-winter-bigtech",
        },
      },
      {
        id: "manager-track",
        label: "Switch to the manager track",
        outcome: {
          text:
            "You trade your IDE for a calendar shaped like a Tetris loss. Commits: zero. Influence: not.",
          effect: { netWorth: 75_000, burnout: 20, title: "Engineering Manager" },
          next: "y6-winter-bigtech",
        },
      },
      {
        id: "protect-peace",
        label: "Skip promo. Senior is a fine place to live",
        outcome: {
          text:
            "You watch two colleagues destroy their marriages for a title bump and decide Senior pays plenty. You sleep nine hours.",
          effect: { netWorth: 65_000, burnout: -10 },
          next: "y6-winter-bigtech",
        },
      },
    ],
  },
  {
    id: "y5-conference-circuit",
    year: 5,
    age: 26,
    slot: "y5-bigtech-staffpacket",
    headline: "The Conference Circuit",
    text:
      "Your caching-layer talk escapes containment — three conferences want it. You now have a speaker page and a manager asking, with an eyebrow, if the travel is 'roadmap-aligned.'",
    choices: [
      {
        id: "lean-into-devrel-fame",
        label: "Lean in — become the face of caching",
        outcome: {
          text:
            "Three conferences, one viral talk, a decade of hallway-track referrals. Your slides have fans; your Jira has cobwebs.",
          effect: { netWorth: 60_000, burnout: 10, title: "Senior SWE (Conference Famous)" },
          next: "y6-winter-bigtech",
        },
      },
      {
        id: "decline-and-ship",
        label: "Decline — impact lives in prod",
        outcome: {
          text:
            "A colleague blossoms on stage with your deck (credited, mostly) while you ship the thing the talks were about. The promo committee prefers your kind of famous.",
          effect: { netWorth: 75_000, burnout: 15 },
          next: "y6-winter-bigtech",
        },
      },
      {
        id: "speak-and-ship",
        label: "Do both. Sleep is a config setting",
        outcome: {
          text:
            "Red-eyes to keynotes, PRs from airport lounges — for one shining year you're everywhere. Your body files a formal complaint for later delivery.",
          effect: { netWorth: 85_000, burnout: 30, title: "Staff SWE (Exhausted, Famous)" },
          next: "y6-winter-bigtech",
        },
      },
    ],
  },
  {
    id: "y5-secret-project",
    year: 5,
    age: 26,
    slot: "y5-bigtech-staffpacket",
    headline: "The CEO's Secret Project",
    text:
      "A director you've met twice offers the CEO's secret skunkworks: no details until you transfer. The last secret project became a keynote; the one before, a write-off nobody mentions.",
    choices: [
      {
        id: "join-skunkworks",
        label: "Join. You didn't get into tech to be safe",
        outcome: {
          text:
            "Behind the door: a moonshot with silly funding and CEO attention like a heat lamp. It half-works, and everyone gets promoted before the public hears of it.",
          effect: { netWorth: 90_000, burnout: 25, title: "Staff SWE (Skunkworks)" },
          next: "y6-winter-bigtech",
        },
      },
      {
        id: "decline-politely",
        label: "Decline — mystery isn't compensation",
        outcome: {
          text:
            "You ask three questions they can't answer and pass. The project ships as a demo, then quietly unships; your boring load-bearing work compounds in daylight.",
          effect: { netWorth: 68_000, burnout: 5 },
          next: "y6-winter-bigtech",
        },
      },
      {
        id: "join-then-canceled",
        label: "Join — and ride it even if it gets canceled",
        outcome: {
          text:
            "Eight months of the most fun engineering of your life, then a Friday email: 'strategic realignment.' The project dies; the skills and the CEO's follow don't.",
          effect: { netWorth: 72_000, burnout: 15 },
          next: "y6-winter-bigtech",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Rocket ship
  {
    id: "y5-rocketship",
    year: 5,
    age: 26,
    headline: "Rocket Ship Physics",
    text:
      "The company doubled again; the all-hands has an IPO countdown and a stage shaped like the logo. Your options are worth seven figures on paper — paper being the operative word.",
    choices: [
      {
        id: "grind-for-ipo",
        label: "Grind for the IPO. Sleep when you're liquid",
        outcome: {
          text:
            "You ship the flagship launch, own two on-call rotations, and measure time in 'quarters until lockup.' Your dating profile has said 'busy season' for a year.",
          effect: { netWorth: 55_000, burnout: 30 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "pace-yourself",
        label: "Pace yourself — mute Slack after 7 PM",
        outcome: {
          text:
            "A director says 'we need more urgency' directly at your face. You nod, log off at 6:58, and outlive him at the company.",
          effect: { netWorth: 45_000, burnout: 5 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "early-secondary",
        label: "Sell 20% of your options on secondary",
        outcome: {
          text:
            "The internal forum calls you paper-handed; you call it not keeping your whole net worth in one private company. The wire is the most money you've ever seen.",
          effect: { netWorth: 70_000, burnout: 5 },
          next: "y6-winter-startup",
        },
      },
    ],
  },
  {
    id: "y5-accidental-manager",
    year: 5,
    age: 26,
    slot: "y5-rocketship",
    headline: "Hypergrowth Made You a Manager",
    text:
      "Your team of four became fourteen in a quarter, and the org chart quietly rearranged itself around you. Nobody asked. Monday's offsite agenda is blank and has your name on it.",
    choices: [
      {
        id: "embrace-the-chart",
        label: "Embrace it — you were standing there",
        outcome: {
          text:
            "You learn management live, in prod, with fourteen humans as the test environment. Half your calls get reversed; the team gels anyway.",
          effect: { netWorth: 60_000, burnout: 20, title: "Engineering Manager (Field Promoted)" },
          next: "y6-winter-startup",
        },
      },
      {
        id: "hire-own-replacement",
        label: "Run it, then hire your own replacement",
        outcome: {
          text:
            "You recruit a proper EM, hand over a healthier team, and slide back to IC. Rarest move in tech: voluntarily giving up a kingdom.",
          effect: { netWorth: 50_000, burnout: 5, title: "Senior Eng @ Rocket Ship" },
          next: "y6-winter-startup",
        },
      },
      {
        id: "refuse-the-chart",
        label: "Refuse — an engineer, not a calendar",
        outcome: {
          text:
            "You escalate until the org chart un-rearranges. Leadership calls it 'career limiting'; you call it knowing yourself at 26.",
          effect: { netWorth: 55_000, burnout: 10 },
          next: "y6-winter-startup",
        },
      },
    ],
  },
  {
    id: "y5-founder-worship",
    year: 5,
    age: 26,
    slot: "y5-rocketship",
    headline: "The Cult of the Founder",
    text:
      "The CEO's podcasts are required watching, his mantras are on the walls, and questioning the roadmap is 'not a culture fit.' The product is genuinely great, which makes it all harder to file.",
    choices: [
      {
        id: "drink-the-koolaid",
        label: "Believe. All-in on the mission and the man",
        outcome: {
          text:
            "You stop keeping score and start keeping faith. The conviction is rocket fuel — you outship everyone into the inner circle, where the refreshes are sincere.",
          effect: { netWorth: 55_000, burnout: 20 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "quiet-cynic",
        label: "Take the equity, skip the sermons",
        outcome: {
          text:
            "Excellent work, one eyebrow permanently raised — fluent in mantra, never singing. When the hype wobbles, you never over-believed or over-allocated.",
          effect: { netWorth: 48_000, burnout: 5 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "anonymous-memes",
        label: "Run the anonymous meme account",
        outcome: {
          text:
            "Your burner becomes the company's true all-hands — even the execs follow it. You are never caught, a fact you'll take to your grave.",
          effect: { netWorth: 42_000, burnout: -5 },
          next: "y6-winter-startup",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Series B startup
  {
    id: "y5-startup-seriesb",
    year: 5,
    age: 26,
    headline: "The Adults Arrive",
    text:
      "Series B closes and the board installs 'operators': a CRO with a boat, a COO with a framework, a Head of People scheduling a meeting about meeting culture. The garage era is over.",
    choices: [
      {
        id: "play-politics",
        label: "Learn politics. Secure your seat at the table",
        outcome: {
          text:
            "The real product is the org chart. You pre-wire decisions and survive two consultant-designed reorgs — it works, and you hate that it works.",
          effect: { netWorth: 40_000, burnout: 15 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "small-secondary",
        label: "Take a small secondary and de-risk your life",
        outcome: {
          text:
            "You sell just enough equity to kill the student loans dead. The relief is physical, like removing a backpack you forgot you were wearing.",
          effect: { netWorth: 65_000, burnout: 5 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "jump-before-vest",
        label: "Read the room and jump to Big Tech",
        outcome: {
          text:
            "By the third 'strategic realignment' email you're three interviews deep elsewhere. Two months later, half your old team follows you out.",
          effect: { netWorth: 70_000, burnout: 10, title: "Senior SWE @ Big Tech" },
          next: "y6-winter-bigtech",
        },
      },
    ],
  },
  {
    id: "y5-enterprise-pivot",
    year: 5,
    age: 26,
    slot: "y5-startup-seriesb",
    headline: "The Enterprise Pivot",
    text:
      "The new CRO's first slide: 'We go upmarket.' Overnight the roadmap fills with SSO, audit logs, and a compliance acronym you have to look up. The pricing page now starts with 'Contact Sales.'",
    choices: [
      {
        id: "learn-to-sell",
        label: "Put on the vest — learn enterprise",
        outcome: {
          text:
            "You join sales calls as 'the technical voice' and turn out to be great at procurement English. Your equity's value quietly triples in the model.",
          effect: { netWorth: 55_000, burnout: 15, title: "Principal Eng (Field)" },
          next: "y6-winter-startup",
        },
      },
      {
        id: "guard-dev-product",
        label: "Defend the developer product",
        outcome: {
          text:
            "You defend the free tier like a public defender. Half the battles die to 'revenue realities,' but the goodwill you save becomes the moat.",
          effect: { netWorth: 40_000, burnout: 15 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "join-skunk-team",
        label: "Escape to the skunkworks team",
        outcome: {
          text:
            "While the org learns to spell SOC 2, you prototype the next product with three people and no meetings. The company's future, or a very fun dead end.",
          effect: { netWorth: 45_000, burnout: 10 },
          next: "y6-winter-startup",
        },
      },
    ],
  },
  {
    id: "y5-ipo-rumors",
    year: 5,
    age: 26,
    slot: "y5-startup-seriesb",
    headline: "Bankers in the Building",
    text:
      "Two people in genuinely excellent suits toured the office, and the CFO's calendar went private. The IPO thread hits 400 replies; your options have a strike price and no exit — yet.",
    choices: [
      {
        id: "exercise-early",
        label: "Exercise early — bet on the rumor",
        outcome: {
          text:
            "You wire a scary check to buy your own options and start the tax clock. Until the IPO, it's a very illiquid paper you check like a heart monitor.",
          effect: { netWorth: -15_000, burnout: 10 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "secondary-now",
        label: "Sell now — rumors aren't liquidity",
        outcome: {
          text:
            "A secondary fund takes a slice at a discount. Coworkers call it selling the bottom; you call it having a net worth that exists.",
          effect: { netWorth: 65_000, burnout: 5 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "ignore-the-suits",
        label: "Ignore the suits and keep shipping",
        outcome: {
          text:
            "You mute the thread and close out the quarter's actual work. Whatever the suits decide, the codebase will still need you.",
          effect: { netWorth: 48_000, burnout: 5 },
          next: "y6-winter-startup",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Founder
  {
    id: "y5-founder-pmf",
    year: 5,
    age: 26,
    headline: "Product-Market Fit (Allegedly)",
    text:
      "Something's working: churn is down, a stranger tweeted about you unprompted, revenue has a pulse. Now every advisor has a different plan, and all of them start with 'AI.'",
    choices: [
      {
        id: "pivot-to-ai",
        label: "Pivot to AI. The VCs are begging",
        outcome: {
          text:
            "You duct-tape an LLM onto the product and rewrite the homepage to say 'autonomous.' You are now an AI company the way a hot dog is a sandwich.",
          effect: { netWorth: 0, burnout: 20, title: "AI Founder (Pivoted)" },
          next: "y6-winter-founder",
        },
      },
      {
        id: "boring-revenue",
        label: "Ignore the hype. Compound the boring revenue",
        outcome: {
          text:
            "You ship what customers ask for and invoice them — so ancient it's avant-garde. VCs call you 'un-fundable'; your accountant calls you 'profitable.'",
          effect: { netWorth: 30_000, burnout: 10 },
          next: "y6-winter-founder",
        },
      },
      {
        id: "crypto-angel",
        label: "Take the pool-party angel's fat check",
        outcome: {
          text:
            "The wire clears, which is more than his reputation does. He wants a board seat, weekly 'vibe checks,' and 'token mechanics.' The texts never stop.",
          effect: { netWorth: 45_000, burnout: 15 },
          next: "y6-winter-founder",
        },
      },
    ],
  },
  {
    id: "y5-employee-one-quits",
    year: 5,
    age: 26,
    slot: "y5-founder-pmf",
    headline: "Employee #1 Rage-Quits",
    text:
      "Employee #1 — garage year, equity and belief — quits with an essay about 'founder blind spots' and posts a public version. It gets traction. Some of it is unfair. Some of it isn't.",
    choices: [
      {
        id: "public-postmortem",
        label: "Respond publicly — own the fair parts",
        outcome: {
          text:
            "Your reply is so measured it becomes the rare internet moment where everyone comes out better. The ex-employee DMs you a truce.",
          effect: { netWorth: 10_000, burnout: 15 },
          next: "y6-winter-founder",
        },
      },
      {
        id: "quiet-settlement",
        label: "Settle privately — accelerate vesting",
        outcome: {
          text:
            "A generous exit and one honest dinner later, the thread loses steam. It costs money and pride; it buys a lifelong reference.",
          effect: { netWorth: -10_000, burnout: 10 },
          next: "y6-winter-founder",
        },
      },
      {
        id: "let-work-answer",
        label: "Say nothing. Let the next two quarters answer",
        outcome: {
          text:
            "You ship, hire well, and quietly fix the two true criticisms. By the time anyone rereads the thread, the company it describes no longer exists.",
          effect: { netWorth: 20_000, burnout: 15 },
          next: "y6-winter-founder",
        },
      },
    ],
  },
  {
    id: "y5-platform-risk",
    year: 5,
    age: 26,
    slot: "y5-founder-pmf",
    headline: "Platform Roulette",
    text:
      "Your product runs on one giant platform's API, and this morning's new pricing eats 60% of your margin in 90 days. Their developer advocate replied to your panic with a meme.",
    choices: [
      {
        id: "rebuild-off-platform",
        label: "Rebuild off-platform — never again",
        outcome: {
          text:
            "Three brutal months rebuilding the core in-house. Next year's price hike sends competitors scrambling while you watch from a safe, smug distance.",
          effect: { netWorth: 5_000, burnout: 25 },
          next: "y6-winter-founder",
        },
      },
      {
        id: "negotiate-partnership",
        label: "Fly out and negotiate a partnership tier",
        outcome: {
          text:
            "The pricing was an opening bid — you leave with a discount and a named contact who answers emails. The dependency remains, but now it has a phone number.",
          effect: { netWorth: 35_000, burnout: 10 },
          next: "y6-winter-founder",
        },
      },
      {
        id: "multi-platform-hedge",
        label: "Go multi-platform — abstract it away",
        outcome: {
          text:
            "An abstraction layer over three providers triples the integration surface and halves the panic. 'Platform risk' moves from existential to line-item.",
          effect: { netWorth: 20_000, burnout: 15 },
          next: "y6-winter-founder",
        },
      },
    ],
  },
  {
    id: "y5-promo-appeal",
    year: 5,
    age: 26,
    slot: "y5-bigtech-staffpacket",
    headline: "The Appeal",
    text:
      "'Strong packet, not this cycle.' There's a one-shot appeal: winners get the level now, losers get a file note that reads 'impatient.' Your mentor says appeal; your manager says wait.",
    choices: [
      {
        id: "wait-a-cycle",
        label: "Wait — packets age like wine",
        outcome: {
          text:
            "You bank the feedback, land one more marquee project, and clear the bar next cycle without drama. Patience: still undefeated in committee rooms.",
          effect: { netWorth: 65_000, burnout: 5 },
          next: "y6-winter-bigtech",
        },
      },
      {
        id: "file-the-appeal",
        label: "File the appeal — the packet is strong NOW",
        gamble: [
          {
            chance: 0.35,
            label: "Appeal lands — Staff, immediately",
            text:
              "The second committee reaches the obvious conclusion in forty minutes: Staff, backdated comp, and a quiet legend. Your mentor buys the drinks.",
            effect: { netWorth: 95_000, burnout: 10, title: "Staff SWE @ Big Tech" },
            next: "y6-winter-bigtech",
          },
          {
            chance: 0.65,
            label: "Denied — 'impatient' enters your file",
            text:
              "The appeal dies to 'calibration consistency,' and two directors now pronounce your name with a faint eyebrow. The promo comes eventually. The eyebrow stays.",
            effect: { netWorth: 55_000, burnout: 15 },
            next: "y6-winter-bigtech",
          },
        ],
      },
    ],
  },
  {
    id: "y5-exercise-loan",
    year: 5,
    age: 26,
    slot: "y5-rocketship",
    headline: "The Exercise Loan",
    text:
      "A specialty lender will front six figures to early-exercise your options — huge tax savings if the IPO comes, a debt crater if it doesn't. The all-hands countdown clock says 'soon™.'",
    choices: [
      {
        id: "exercise-nothing",
        label: "Exercise nothing — debt and options don't mix",
        outcome: {
          text:
            "You pass on the loan and let the options ride. Less optimal on some spreadsheet, infinitely calmer in every dream.",
          effect: { netWorth: 45_000, burnout: 5 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "loan-and-exercise",
        label: "Take the loan — exercise everything",
        gamble: [
          {
            chance: 0.45,
            label: "IPO in window — the tax play prints",
            text:
              "The IPO lands inside your window and the loan play works exactly as the spreadsheet promised. The lender sends a fruit basket; you send your accountant one.",
            effect: { netWorth: 130_000, burnout: 10 },
            next: "y6-winter-startup",
          },
          {
            chance: 0.55,
            label: "IPO delays — interest bleeds you monthly",
            text:
              "'Soon™' becomes 'market conditions,' and you now pay monthly interest for the privilege of owning your own upside. No fruit basket arrives.",
            effect: { netWorth: -40_000, burnout: 20 },
            next: "y6-winter-startup",
          },
        ],
      },
    ],
  },
  {
    id: "y5-cro-alliance",
    year: 5,
    age: 26,
    slot: "y5-startup-seriesb",
    headline: "The CRO's Invitation",
    text:
      "The CRO — boat guy — wants you to co-sponsor his reorg: engineering under revenue pods, you running the biggest one. If it wins, you rise; if it dies, you're 'his person' here.",
    choices: [
      {
        id: "stay-neutral",
        label: "Stay neutral — let execs fight execs",
        outcome: {
          text:
            "You listen politely and commit to nothing, a skill worth more than most certifications. Both survivors still trust you. Switzerland: strong Q3.",
          effect: { netWorth: 40_000, burnout: 10 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "back-the-cro",
        label: "Back the CRO's plan — ride the reorg up",
        gamble: [
          {
            chance: 0.5,
            label: "His plan wins — you run the biggest pod",
            text:
              "The board buys the revenue-pod gospel: Director title, flagship pod, seats at tables you used to hear about secondhand. You still decline the boat invite.",
            effect: { netWorth: 70_000, burnout: 10, title: "Director of Engineering" },
            next: "y6-winter-startup",
          },
          {
            chance: 0.5,
            label: "CRO flames out — you're 'his person' now",
            text:
              "The board passes, the CRO 'transitions out,' and you spend a year laundering the association through good work. Don't co-sign what you can't co-steer.",
            effect: { netWorth: 20_000, burnout: 20 },
            next: "y6-winter-startup",
          },
        ],
      },
    ],
  },
  {
    id: "y5-whale-demo",
    year: 5,
    age: 26,
    slot: "y5-founder-pmf",
    headline: "The Whale Demo",
    text:
      "A Fortune 100 wants a custom demo in six weeks — a deal that triples revenue in one signature but pauses ten smaller deals. Your advisor says whales ghost; your board says whales fund Series As.",
    choices: [
      {
        id: "keep-the-fish",
        label: "Keep the small deals — schools beat whales",
        outcome: {
          text:
            "You close seven of ten and build the compounding base boring companies are made of. The whale's custom demo becomes a competitor's lost year.",
          effect: { netWorth: 25_000, burnout: 10 },
          next: "y6-winter-founder",
        },
      },
      {
        id: "chase-the-whale",
        label: "Bet the quarter on the whale demo",
        gamble: [
          {
            chance: 0.4,
            label: "Whale signs — seven-figure contract",
            text:
              "Procurement moves at whale speed — slow, then all at once. The contract triples revenue and re-prices your next round. Ahab was just underfunded.",
            effect: { netWorth: 80_000, burnout: 15 },
            next: "y6-winter-founder",
          },
          {
            chance: 0.6,
            label: "Whale ghosts after the demo",
            text:
              "One flawless demo, two enthusiastic follow-ups, then silence: 'budget re-prioritization.' Three small fish found other vendors. Whales ghost.",
            effect: { netWorth: -10_000, burnout: 20 },
            next: "y6-winter-founder",
          },
        ],
      },
    ],
  },
];
