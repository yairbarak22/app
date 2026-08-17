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
      "Promo season. To make Staff you need 'scope,' 'impact,' and a document so persuasive it should count as fiction. There's exactly one Staff-shaped project available: the Great Migration™ — moving 900 services off a database everyone hates to a database everyone will hate in three years.",
    choices: [
      {
        id: "lead-migration",
        label: "Lead the Great Migration™. Glory or death",
        outcome: {
          text:
            "Eighteen months of scope creep compressed into twelve, four near-death incidents, and a launch email with 47 people cc'd. But the packet writes itself, the committee says yes, and 'Staff' hits your email signature.",
          effect: { netWorth: 85_000, burnout: 25, title: "Staff SWE @ Big Tech" },
          next: "y6-winter-bigtech",
        },
      },
      {
        id: "manager-track",
        label: "Switch to the manager track — become the org chart",
        outcome: {
          text:
            "You trade your IDE for a calendar that looks like a Tetris loss. You spend your days translating between 'leadership wants' and 'the team can.' Your commits drop to zero. Your influence does not.",
          effect: { netWorth: 75_000, burnout: 20, title: "Engineering Manager" },
          next: "y6-winter-bigtech",
        },
      },
      {
        id: "protect-peace",
        label: "Skip the promo cycle. Senior is a fine place to live",
        outcome: {
          text:
            "You watch two colleagues destroy their marriages for a title bump and decide Senior pays plenty. You mentor the juniors, ship good work, and leave at five. Somewhere, a promo committee shrugs. You sleep nine hours.",
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
      "Your internal talk about the caching layer escapes containment: a real conference wants it, then two more. Suddenly you have a speaker page, a headshot debate, and a manager asking — supportively, but with an eyebrow — whether all this travel is 'roadmap-aligned.'",
    choices: [
      {
        id: "lean-into-devrel-fame",
        label: "Lean in — become the public face of the caching layer",
        outcome: {
          text:
            "Three conferences, one viral talk, and a hallway-track network that will feed you referrals for a decade. Your slides have fans. Your Jira has cobwebs. The trade is better than it looks on paper.",
          effect: { netWorth: 60_000, burnout: 10, title: "Senior SWE (Conference Famous)" },
          next: "y6-winter-bigtech",
        },
      },
      {
        id: "decline-and-ship",
        label: "Decline the circuit — impact lives in prod, not on stage",
        outcome: {
          text:
            "You send your deck to a colleague who blossoms on stage with your material (credited, mostly) while you ship the thing the talks were about. The promo committee prefers your version of famous.",
          effect: { netWorth: 75_000, burnout: 15 },
          next: "y6-winter-bigtech",
        },
      },
      {
        id: "speak-and-ship",
        label: "Do both. Sleep is a config setting",
        outcome: {
          text:
            "Red-eyes to keynotes, PRs from airport lounges, a calendar that requires archaeology. For one shining year you are everywhere — stage, prod, promo list. Your body files a formal complaint for later delivery.",
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
      "A director you've met twice invites you to a windowless floor: the CEO's secret skunkworks needs 'someone exactly like you.' No details until you transfer. The last secret project became a keynote; the one before became a write-off nobody mentions.",
    choices: [
      {
        id: "join-skunkworks",
        label: "Join. You didn't get into tech to be safe",
        outcome: {
          text:
            "Behind the badge-locked door: a moonshot with silly funding and CEO attention like a heat lamp. It half-works, which for moonshots is a triumph — and everyone on the team gets promoted before the public ever hears of it.",
          effect: { netWorth: 90_000, burnout: 25, title: "Staff SWE (Skunkworks)" },
          next: "y6-winter-bigtech",
        },
      },
      {
        id: "decline-politely",
        label: "Decline politely — mystery is not a compensation package",
        outcome: {
          text:
            "You ask three questions they can't answer and pass with a handshake. The project later ships as a demo, then quietly unships. Your visible, boring, load-bearing work keeps compounding in daylight.",
          effect: { netWorth: 68_000, burnout: 5 },
          next: "y6-winter-bigtech",
        },
      },
      {
        id: "join-then-canceled",
        label: "Join — and ride it even if it gets canceled",
        outcome: {
          text:
            "Eight months of the most fun engineering of your life, then a Friday email: 'strategic realignment.' The project dies; the skills and the CEO's LinkedIn follow don't. Cancellation, it turns out, is survivable and instructive.",
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
      "The company doubled again. The all-hands features a countdown to IPO and a CEO who says 'this is the hardest thing I've ever done' from a stage shaped like the logo. Your options are worth seven figures on paper. Paper is the operative word.",
    choices: [
      {
        id: "grind-for-ipo",
        label: "Grind for the IPO. Sleep when you're liquid",
        outcome: {
          text:
            "You ship the flagship launch, own two on-call rotations, and start measuring time in 'quarters until lockup.' Your dating profile says 'busy season.' It has said that for eleven months.",
          effect: { netWorth: 55_000, burnout: 30 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "pace-yourself",
        label: "Pace yourself — mute Slack after 7 PM",
        outcome: {
          text:
            "You do excellent work at a human speed and let the martyrs fight over the 2 AM heroics. A director once says 'we need more urgency' directly at your face. You nod, log off at 6:58, and outlive him at the company.",
          effect: { netWorth: 45_000, burnout: 5 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "early-secondary",
        label: "Sell 20% of your options in the secondary market",
        outcome: {
          text:
            "The finance bros on the internal forum call you paper-handed. You call it 'not having 100% of your net worth in one private company.' The wire hits. It's the most money you've ever seen with your name on it.",
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
      "Your team of four became fourteen in one quarter, and since you were here first, the org chart quietly rearranged itself around you. Nobody asked. There's an offsite Monday and you're apparently running it. The agenda doc is blank and has your name on it.",
    choices: [
      {
        id: "embrace-the-chart",
        label: "Embrace it — hypergrowth promotes whoever's standing there",
        outcome: {
          text:
            "You learn management the hypergrowth way: live, in prod, with fourteen humans as the test environment. Half your decisions are wrong and reversed within a week. The team somehow gels anyway. Battlefield commissions count.",
          effect: { netWorth: 60_000, burnout: 20, title: "Engineering Manager (Field Promoted)" },
          next: "y6-winter-startup",
        },
      },
      {
        id: "hire-own-replacement",
        label: "Run the offsite, then hire a real manager above yourself",
        outcome: {
          text:
            "You recruit a proper EM, hand over a team in better shape than you found it, and slide back into the IC seat with everyone's gratitude and none of the meetings. Rarest move in tech: voluntarily giving up a kingdom.",
          effect: { netWorth: 50_000, burnout: 5, title: "Senior Eng @ Rocket Ship" },
          next: "y6-winter-startup",
        },
      },
      {
        id: "refuse-the-chart",
        label: "Refuse loudly — you are an engineer, not a calendar",
        outcome: {
          text:
            "You escalate until the org chart un-rearranges itself. Leadership calls it 'career limiting.' You call it 'knowing yourself at 26,' which is worth more than the title they were too cheap to pay for anyway.",
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
      "The CEO's podcast appearances have become required watching, his mantras are on the walls, and questioning the roadmap in public is now 'not being a culture fit.' The product is genuinely great, which makes the whole thing harder to file under a single feeling.",
    choices: [
      {
        id: "drink-the-koolaid",
        label: "Believe. All-in on the mission and the man",
        outcome: {
          text:
            "You stop keeping score and start keeping faith. The conviction is rocket fuel: you outship everyone and get pulled into the inner circle, where the mantras are ironically quoted and the equity refreshes are sincere.",
          effect: { netWorth: 55_000, burnout: 20 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "quiet-cynic",
        label: "Stay quietly cynical — take the equity, skip the sermons",
        outcome: {
          text:
            "You do excellent work with one eyebrow permanently raised, fluent in mantra but never singing. When the hype cycle wobbles later, you're the one who never over-believed — and never over-allocated.",
          effect: { netWorth: 48_000, burnout: 5 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "anonymous-memes",
        label: "Run the anonymous meme account about the mantras",
        outcome: {
          text:
            "Your burner account becomes the company's true all-hands: even the execs follow it. You are never caught, a fact you will take to your grave along with the best engagement metrics of your career.",
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
      "Series B closes and the board installs 'experienced operators': a CRO with a boat, a COO with a framework, and a Head of People who schedules a meeting about meeting culture. The founder now wears a vest and says 'alignment' unprompted. The garage era is officially over.",
    choices: [
      {
        id: "play-politics",
        label: "Learn politics. Secure your seat at the table",
        outcome: {
          text:
            "You discover that the real product is the org chart. You pre-wire decisions, collect allies, and survive two reorgs designed by consultants. It works. You hate that it works.",
          effect: { netWorth: 40_000, burnout: 15 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "small-secondary",
        label: "Take a small secondary and de-risk your life",
        outcome: {
          text:
            "You sell just enough equity to kill your student loans dead and put away a real emergency fund. The relief is physical, like taking off a backpack you forgot you were wearing since college.",
          effect: { netWorth: 65_000, burnout: 5 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "jump-before-vest",
        label: "Read the room and jump to Big Tech",
        outcome: {
          text:
            "When the third 'strategic realignment' email lands, you're already three interviews deep elsewhere. You exit with your vested shares and your sanity. Two months later, half your old team follows you out.",
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
      "The new CRO's first slide says 'We go upmarket.' Overnight the roadmap fills with SSO, audit logs, and a compliance acronym you have to look up. The developers who loved your product are getting a pricing page that starts with 'Contact Sales.'",
    choices: [
      {
        id: "learn-to-sell",
        label: "Put on the metaphorical vest — learn the enterprise game",
        outcome: {
          text:
            "You start joining sales calls as 'the technical voice' and discover you're good at it: translating roadmap into procurement English. The deals are huge, the sales engineers love you, and your equity's value quietly triples in the model.",
          effect: { netWorth: 55_000, burnout: 15, title: "Principal Eng (Field)" },
          next: "y6-winter-startup",
        },
      },
      {
        id: "guard-dev-product",
        label: "Defend the developer product the company was built on",
        outcome: {
          text:
            "You fight for the free tier and the API like a public defender. Half your battles are lost to 'revenue realities,' but the developer goodwill you save becomes the moat everyone later pretends was strategy.",
          effect: { netWorth: 40_000, burnout: 15 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "join-skunk-team",
        label: "Escape to the skunkworks team building 'what's next'",
        outcome: {
          text:
            "While the org learns to spell SOC 2, you prototype the next product with three people and no meetings. It might be the future of the company or a very fun dead end — either way, you're coding again.",
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
      "Two people in genuinely excellent suits toured the office today, and the CFO's calendar is suddenly private. The internal forum's IPO speculation thread hits 400 replies. Your options have a strike price, a dream, and no exit — yet.",
    choices: [
      {
        id: "exercise-early",
        label: "Exercise your options early — bet on the rumor",
        outcome: {
          text:
            "You wire a scary check to buy your own options and start the tax clock. If the IPO lands, this is the smartest money you ever spent. Until then it's a very illiquid piece of paper you check like a heart monitor.",
          effect: { netWorth: -15_000, burnout: 10 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "secondary-now",
        label: "Sell what you can now — rumors are not liquidity",
        outcome: {
          text:
            "A secondary fund takes a slice at a discount to the whisper number. Your coworkers call it selling the bottom. You call it 'having a net worth that exists.' Both positions will feel very smart at different future moments.",
          effect: { netWorth: 65_000, burnout: 5 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "ignore-the-suits",
        label: "Ignore the suits and keep shipping",
        outcome: {
          text:
            "You mute the speculation thread and close out the quarter's actual work. Whatever the suits decide, the codebase will still need you — a fact that has outlasted every rumor cycle in tech history.",
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
      "Something's working. Churn is down, a stranger tweeted about you unprompted, and revenue has a pulse. Now every advisor has a different plan for you, and all of them start with the word 'AI.'",
    choices: [
      {
        id: "pivot-to-ai",
        label: "Pivot to AI agents. The VCs are literally begging",
        outcome: {
          text:
            "You duct-tape an LLM onto the product and rewrite the homepage to say 'autonomous.' Inbound triples. Some of it is even customers. You are now an AI company, in the sense that a hot dog is a sandwich.",
          effect: { netWorth: 0, burnout: 20, title: "AI Founder (Pivoted)" },
          next: "y6-winter-founder",
        },
      },
      {
        id: "boring-revenue",
        label: "Ignore the hype. Compound the boring revenue",
        outcome: {
          text:
            "You ship what customers ask for and invoice them for it, a strategy so ancient it's become avant-garde. $30K MRR. The VCs call you 'un-fundable.' Your accountant calls you 'profitable.'",
          effect: { netWorth: 30_000, burnout: 10 },
          next: "y6-winter-founder",
        },
      },
      {
        id: "crypto-angel",
        label: "Take a fat angel check from a guy you met at a pool party",
        outcome: {
          text:
            "The wire clears, which is more than you can say for his reputation. He wants a board seat, weekly 'vibe checks,' and for you to 'explore token mechanics.' The money spends fine. The texts never stop.",
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
      "Your first hire — the one who worked the garage year for equity and belief — quits with a essay-length farewell about 'founder blind spots' and posts a subtweet-shaped version publicly. It gets uncomfortable traction. Some of it is unfair. Some of it isn't.",
    choices: [
      {
        id: "public-postmortem",
        label: "Respond publicly — own the fair parts, correct the rest",
        outcome: {
          text:
            "Your reply is so measured and self-aware that it becomes the rare internet moment where everyone comes out better. Two candidates cite it in interviews. The ex-employee DMs you a truce. Growth, witnessed.",
          effect: { netWorth: 10_000, burnout: 15 },
          next: "y6-winter-founder",
        },
      },
      {
        id: "quiet-settlement",
        label: "Handle it privately — accelerate their vesting, part clean",
        outcome: {
          text:
            "A generous exit package and one honest dinner later, the public thread quietly loses steam. It costs real money and a slice of pride. It buys a reference who, years later, still says 'we grew up together.'",
          effect: { netWorth: -10_000, burnout: 10 },
          next: "y6-winter-founder",
        },
      },
      {
        id: "let-work-answer",
        label: "Say nothing. Let the next two quarters answer",
        outcome: {
          text:
            "You ship, hire well, and fix the two criticisms that were true without announcing it. By the time anyone rereads the thread, the company it describes no longer exists. Silence, deployed correctly, is a statement.",
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
      "Your entire product runs on one giant platform's API — and this morning they announced new pricing, effective in 90 days, that eats 60% of your margin. Their developer advocate replied to your panic with a meme. The meme was not reassuring.",
    choices: [
      {
        id: "rebuild-off-platform",
        label: "Rebuild off-platform — never again at their mercy",
        outcome: {
          text:
            "Three brutal months rebuilding the core in-house. Margins recover, sovereignty achieved — and when the platform hikes prices again next year, you watch your competitors scramble from a safe, smug distance.",
          effect: { netWorth: 5_000, burnout: 25 },
          next: "y6-winter-founder",
        },
      },
      {
        id: "negotiate-partnership",
        label: "Fly out and negotiate a partnership tier",
        outcome: {
          text:
            "Turns out the pricing was an opening bid. You leave with a partner discount, a co-marketing slot, and a named contact who answers emails. The dependency remains — but now it has a phone number.",
          effect: { netWorth: 35_000, burnout: 10 },
          next: "y6-winter-founder",
        },
      },
      {
        id: "multi-platform-hedge",
        label: "Go multi-platform — abstract the dependency away",
        outcome: {
          text:
            "You build an abstraction layer over three providers, which triples the integration surface and halves the panic. Costs are up, sleep is up, and 'platform risk' moves from existential to line-item.",
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
      "The committee's verdict: 'strong packet, not this cycle.' But there's a rarely-used appeal process — one shot, review by a different committee, reputation on the line. Winners get the level immediately. Losers get a permanent note that reads, between the lines, 'impatient.' Your mentor says appeal. Your manager says wait. They can't both be right.",
    choices: [
      {
        id: "wait-a-cycle",
        label: "Wait the cycle — packets age like wine, appeals like milk",
        outcome: {
          text:
            "You bank the feedback, land one more marquee project, and clear the bar next cycle without drama. The extra six months sting less than a failed appeal would have. Patience: still undefeated in committee rooms.",
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
            label: "Appeal lands — Staff, effective immediately",
            text:
              "The second committee reads the same packet and reaches the obvious conclusion in forty minutes. Staff, backdated comp, and a quiet legend: the one who appealed and won. Your mentor buys the drinks and says nothing smug, loudly.",
            effect: { netWorth: 95_000, burnout: 10, title: "Staff SWE @ Big Tech" },
            next: "y6-winter-bigtech",
          },
          {
            chance: 0.65,
            label: "Appeal denied — 'impatient' enters your file",
            text:
              "The appeal dies in review with a note about 'calibration consistency.' Nothing changes on paper except everything: two directors now pronounce your name with a faint eyebrow. The promo comes eventually. The eyebrow takes longer.",
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
      "A specialty lender will front you six figures to early-exercise all your rocket-ship options — huge tax savings if the IPO comes soon, a personal debt crater if it doesn't. The loan doc's font is elegant. The interest clause is not. The IPO countdown clock at all-hands currently says 'soon™.'",
    choices: [
      {
        id: "exercise-nothing",
        label: "Exercise nothing — debt and options don't mix",
        outcome: {
          text:
            "You pass on the loan and let the options ride unexercised. Less optimal on some spreadsheet, infinitely calmer in every dream. The lender's follow-up emails achieve spam-folder velocity by June.",
          effect: { netWorth: 45_000, burnout: 5 },
          next: "y6-winter-startup",
        },
      },
      {
        id: "loan-and-exercise",
        label: "Take the loan — exercise everything before the IPO",
        gamble: [
          {
            chance: 0.45,
            label: "IPO within the window — the tax play prints",
            text:
              "The IPO lands inside your holding window and the loan play works exactly as the spreadsheet promised: long-term rates on a life-changing gain. The lender sends a fruit basket. You send your accountant one.",
            effect: { netWorth: 130_000, burnout: 10 },
            next: "y6-winter-startup",
          },
          {
            chance: 0.55,
            label: "IPO delays — interest bleeds you monthly",
            text:
              "'Soon™' becomes 'market conditions,' and the loan's interest meter runs while your shares stay paper. You're now paying monthly for the privilege of owning your own upside. The fruit basket does not arrive.",
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
      "The new CRO — boat guy — invites you to co-sponsor his reorg proposal: engineering aligned under revenue pods, with you running the biggest one. If his plan wins the board, you rise with him. If it dies, you're 'his person' at a company that just rejected him. Politics is now offering you equity in itself.",
    choices: [
      {
        id: "stay-neutral",
        label: "Stay neutral — let the executives fight executives",
        outcome: {
          text:
            "You listen politely and commit to nothing, a skill worth more than most certifications. The reorg fight resolves without your fingerprints on it, and both survivors still trust you. Switzerland: strong Q3.",
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
              "The board buys the revenue-pod gospel, and you ascend with the tide: Director title, the flagship pod, and a seat at tables you used to hear about secondhand. The boat guy delivers. You still decline the boat invite.",
            effect: { netWorth: 70_000, burnout: 10, title: "Director of Engineering" },
            next: "y6-winter-startup",
          },
          {
            chance: 0.5,
            label: "CRO flames out — you're 'his person' now",
            text:
              "The board passes, the CRO 'transitions out' within two quarters, and his org chart dies with his login. You spend a year laundering the association through good work. The lesson, engraved: don't co-sign what you can't co-steer.",
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
      "A Fortune 100 wants a custom demo in six weeks — a deal that would triple your revenue in one signature. Preparing it properly means pausing every other deal in the pipeline: ten smaller fish released to chase one whale. Your sales advisor says whales ghost. Your board says whales fund Series As. The ocean says nothing.",
    choices: [
      {
        id: "keep-the-fish",
        label: "Keep the ten small deals — schools beat whales",
        outcome: {
          text:
            "You close seven of the ten small deals and build the compounding base that boring companies are made of. The whale swims to a competitor, who spends a year building its custom demo. You spend the year growing.",
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
              "The demo lands in a conference room with more VPs than chairs, and procurement moves at whale speed — slow, then all at once. The contract triples revenue and re-prices your next round before you've raised it. Ahab was just underfunded.",
            effect: { netWorth: 80_000, burnout: 15 },
            next: "y6-winter-founder",
          },
          {
            chance: 0.6,
            label: "Whale ghosts after the demo",
            text:
              "Six weeks of custom work, one flawless demo, two enthusiastic follow-ups — then the ocean goes silent. 'Budget re-prioritization.' The paused pipeline half-thaws; three small fish found other vendors. Whales, it turns out, ghost.",
            effect: { netWorth: -10_000, burnout: 20 },
            next: "y6-winter-founder",
          },
        ],
      },
    ],
  },
];
