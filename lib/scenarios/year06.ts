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
      "Rates are up, growth is dead, and the CEO announces a 'Year of Efficiency' — the sequel nobody wanted. This isn't a reorg; it's an ice age. Twelve percent of the company in one morning, whole orgs deleted like feature flags. Your building's parking lot is half empty, and a friend in HR just texted you a single skull emoji. Your name is on the list.",
    choices: [
      {
        id: "winter-severance",
        label: "Take the package and brave the frozen market",
        outcome: {
          text:
            "You take the severance and walk into a market where every company is 'pausing hiring to focus on efficiency.' Your net worth holds its breath. Recruiters who once spammed you now mark your emails as read. Winter is undefeated.",
          effect: { netWorth: 0, burnout: 20, title: "Staff-ish SWE (Frozen Out)" },
          next: "y7-comeback",
        },
      },
      {
        id: "winter-pull-strings",
        label: "▶ Pull strings with leadership — watch a short video to survive the cut",
        requiresAd: true,
        outcome: {
          text:
            "One frantic week of coffee chats, a director who owes you from the Great Migration™, and a spreadsheet quietly edited at 11 PM. Your name comes off the list. You keep your badge, your vest schedule, and a survivor's twitch whenever a calendar invite says 'quick sync.'",
          effect: { netWorth: 50_000, burnout: 10 },
          achievement: "winter-proof",
          next: "y7-ai-goldrush",
        },
        adFallback: {
          text:
            "The director who owed you a favor got cut in the same wave. Security collects your badge with the warmth of a parking meter. You join the largest alumni network in tech: the recently laid off.",
          effect: { netWorth: 10_000, burnout: 25, title: "Laid Off (Winter Class of Y6)" },
          next: "y7-comeback",
        },
      },
      {
        id: "winter-volunteer",
        label: "Volunteer for the package and disappear to Japan",
        outcome: {
          text:
            "You raise your hand, take the severance, and spend four months eating konbini eggs and walking old pilgrimage trails with your phone on airplane mode. The industry burns without you. You feel nothing. It's incredible.",
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
      "Your company is too image-conscious for mass layoffs, so the winter arrives as paperwork: a surprise PIP with goals written by someone who's never seen your codebase. HR calls it 'a supportive framework.' The support has a 60-day timer on it.",
    choices: [
      {
        id: "fight-with-receipts",
        label: "Fight it — bury the PIP under a mountain of receipts",
        outcome: {
          text:
            "You produce a document so thorough it should have a DOI number: shipped work, saved incidents, peer testimony. The PIP dies in review, your manager transfers mysteriously, and everyone learns you are expensive to fabricate a case against.",
          effect: { netWorth: 45_000, burnout: 20 },
          achievement: "winter-proof",
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "negotiate-exit",
        label: "Negotiate the exit — take the severance behind door two",
        outcome: {
          text:
            "You skip the 60-day theater and negotiate straight to the package: three months' pay for a signature and a smile. Cleanest breakup in tech. The PIP goals remain unachieved forever, like the framework deserved.",
          effect: { netWorth: 25_000, burnout: 10, title: "Senior SWE (Strategically Departed)" },
          next: "y7-comeback",
        },
      },
      {
        id: "interview-on-pip",
        label: "Smile at the PIP, interview like your rent depends on it",
        outcome: {
          text:
            "By day you attend 'check-in syncs'; by night you run an interview gauntlet. The offer lands two weeks before the timer ends, and your resignation letter thanks everyone for 'the supportive framework.' The irony is fully load-bearing.",
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
      "You survived the layoff wave — 'congratulations.' Your reward: the work of the three people who didn't. Their services, their on-call, their half-finished migrations, all yours now. Leadership calls it 'an expanded scope opportunity.' Your calendar calls it a hostage situation.",
    choices: [
      {
        id: "grind-through",
        label: "Absorb it all — be the reason the org still functions",
        outcome: {
          text:
            "You run three jobs on caffeine and grim competence. When the freeze thaws and leadership audits who actually held the line, your name is on everything. The retention grant is real. So is the eye twitch.",
          effect: { netWorth: 55_000, burnout: 30 },
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "public-boundaries",
        label: "Set boundaries in writing — three jobs, one paycheck, pick two",
        outcome: {
          text:
            "You email a priority list and ask leadership to choose what drops. Silence, then grudging respect: they choose, you deliver, and the org learns your yes means something because your no does. Revolutionary stuff, apparently.",
          effect: { netWorth: 40_000, burnout: 10 },
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "fog-coast",
        label: "Quiet-coast in the chaos — nobody can measure anything right now",
        outcome: {
          text:
            "In the post-layoff fog, dashboards die and standups shrink. You keep exactly the lights on that matter and reclaim your evenings. History will record this quarter as 'transitional.' You will record it as 'restful.'",
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
      "The winter cost-cutting memo has a twist: your entire org is 'consolidating' to the new Austin hub. Relocate on the company's dime, or accept a 'voluntary separation.' You have three weeks, a lease, and a life that wasn't consulted.",
    choices: [
      {
        id: "take-the-move",
        label: "Take the move — new city, kept salary, fresh start",
        outcome: {
          text:
            "You arrive in Austin with a relocation bonus and coastal pay in a barbecue economy. The new hub is half empty and weirdly optimistic, like a frontier town with standing desks. Your rent drops 40%. Your tacos improve 400%.",
          effect: { netWorth: 45_000, burnout: 10, title: "Staff SWE (Austin Hub)" },
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "take-separation",
        label: "Take the separation — your life isn't a line item",
        outcome: {
          text:
            "You choose your city, your people, and your gym over the org chart. The package is decent, the market is frozen, and you regret nothing except checking the relocated org's Slack once — they're all apartment hunting.",
          effect: { netWorth: 20_000, burnout: 15, title: "Staff SWE (Open to Work)" },
          next: "y7-comeback",
        },
      },
      {
        id: "remote-exception",
        label: "▶ Chase a remote exception — watch a short video to reach the exec sponsor",
        requiresAd: true,
        outcome: {
          text:
            "Your skip-skip-level — who once starred your incident writeup — signs a one-line exception: 'retain, remote.' You keep the job, the city, and a debt of gratitude payable at some future, unspecified, definitely-coming moment.",
          effect: { netWorth: 55_000, burnout: 5, title: "Staff SWE (Remote Exception)" },
          achievement: "winter-proof",
          next: "y7-ai-goldrush",
        },
        adFallback: {
          text:
            "The exec sponsor's calendar never opens. The exception dies in a queue, and you're separated by default on a Friday — with a form letter that misspells your name. The winter is nothing personal, which somehow makes it worse.",
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
      "The IPO countdown clock quietly disappears from the all-hands deck. Then the down round hits: 40% haircut, your options underwater, and the CFO using the phrase 'runway discipline' like a prayer. Layoffs begin at noon. The rocket ship is now a submarine.",
    choices: [
      {
        id: "loyal-paycut",
        label: "Stay loyal through the pay cut. Captains and ships, etc.",
        outcome: {
          text:
            "You take the 15% cut and keep the lights on while the tourists flee. Leadership notices, in the way leadership notices — a shout-out in Slack and a coffee mug that says 'Wartime Team.' The mug is not redeemable for currency.",
          effect: { netWorth: -10_000, burnout: 20 },
          next: "y7-survivor",
        },
      },
      {
        id: "winter-soft-landing",
        label: "▶ Call your old manager for a soft landing — watch a short video first",
        requiresAd: true,
        outcome: {
          text:
            "Your old manager picks up on the second ring. 'I was literally about to call you.' Two weeks later you're badged into Big Tech with a Senior title and a hiring-freeze exception with your name on it. The group chat calls it a war-time airlift.",
          effect: { netWorth: 55_000, burnout: 10, title: "Senior SWE @ Big Tech" },
          achievement: "winter-proof",
          next: "y7-ai-goldrush",
        },
        adFallback: {
          text:
            "Your old manager was laid off too — his auto-reply says 'taking time with family.' The layoff wave reaches your row by Thursday. You pack the mug yourself.",
          effect: { netWorth: 5_000, burnout: 25, title: "Laid Off (Winter Class of Y6)" },
          next: "y7-comeback",
        },
      },
      {
        id: "retention-grant",
        label: "Negotiate a retention grant for staying through the storm",
        outcome: {
          text:
            "You walk into the CTO's office with a competing offer (real) and a poker face (fake). You walk out with a retention package and the job of holding the engineering org together with your bare hands. The grant vests monthly. So does the stress.",
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
      "A journalist tweets that your struggling startup is 'in talks' with two acquirers, and suddenly everyone's LinkedIn is 'open to opportunities' behind one-way glass. The founder denies everything in the all-hands, using the exact cadence of a person confirming everything.",
    choices: [
      {
        id: "position-as-key",
        label: "Make yourself the asset any acquirer must keep",
        outcome: {
          text:
            "You quietly become the only person who can run the core systems and make sure the data room reflects it. The deal closes; the retention offers are tiered; yours is the top tier. Survival is a skill and you just demonstrated it.",
          effect: { netWorth: 45_000, burnout: 15, title: "Senior Eng (Key Person Clause)" },
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "organize-the-engineers",
        label: "Organize the engineers — negotiate retention as a bloc",
        outcome: {
          text:
            "Eight engineers, one shared spreadsheet, one polite collective letter. Leadership is horrified, then arithmetic: replacing all of you costs more than paying all of you. The retention pool triples. Solidarity: surprisingly compatible with capitalism.",
          effect: { netWorth: 30_000, burnout: 20 },
          next: "y7-survivor",
        },
      },
      {
        id: "jump-before-news",
        label: "Jump before the news does — interview out this week",
        outcome: {
          text:
            "Rumors are the only leading indicator that's never wrong twice. You land at Big Tech ten days before the acquisition announcement — which comes with a hiring freeze at the merged entity. Timing isn't everything; it's the only thing.",
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
      "The founder does something unheard of: puts it to the company. Option one, everyone takes a 20% cut and nobody is laid off. Option two, layoffs hit 20% and salaries hold. The all-hands goes silent in a way Zoom has never been silent. The poll is anonymous. The consequences aren't.",
    choices: [
      {
        id: "vote-cut-stay",
        label: "Vote for the cut — nobody gets left on the ice",
        outcome: {
          text:
            "The cut passes 71-29 and something unusual happens: the company gets closer. The shared bruise becomes shared purpose, and when the thaw comes, the loyalty premium pays out in ways no spreadsheet predicted.",
          effect: { netWorth: -15_000, burnout: 15 },
          next: "y7-survivor",
        },
      },
      {
        id: "vote-layoffs",
        label: "Vote for layoffs — half-funding everyone helps no one",
        outcome: {
          text:
            "You vote for the option nobody admits to voting for, and it wins 52-48. The goodbyes are brutal; the runway math is undeniable. You keep your full salary and a complicated relationship with anonymous polls.",
          effect: { netWorth: 30_000, burnout: 25 },
          next: "y7-survivor",
        },
      },
      {
        id: "abstain-interview",
        label: "Abstain — and quietly test the market either way",
        outcome: {
          text:
            "You skip the vote and book interviews instead, hedging against both outcomes. The offer that lands makes the whole referendum someone else's story. Democracy is beautiful; liquidity is portable.",
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
      "Over a late-night deploy, the CFO's screen-share flashes a spreadsheet tab you weren't supposed to see: the 'investor runway' and the real runway differ by seven months. The all-hands numbers are theater. You know. You can't un-know.",
    choices: [
      {
        id: "confront-ceo",
        label: "Confront the CEO privately — give truth one chance",
        outcome: {
          text:
            "To his credit, he doesn't deny it — 'confidence is a resource too.' Within a month the real numbers reach the board, a bridge round gets raised on honest terms, and you become the person the CEO can't bluff. Uncomfortable. Powerful.",
          effect: { netWorth: 20_000, burnout: 20 },
          next: "y7-survivor",
        },
      },
      {
        id: "tell-the-board",
        label: "Take it to the board — some fictions are fireable",
        outcome: {
          text:
            "The independent director takes your call, then takes action: audited numbers, a chastened CEO, and an emergency plan built on reality. You're never quite forgiven and never once wrong. History will file you under 'adult supervision.'",
          effect: { netWorth: 25_000, burnout: 25 },
          next: "y7-survivor",
        },
      },
      {
        id: "leave-quietly",
        label: "Update the resume — you don't debug other people's ethics",
        outcome: {
          text:
            "You exit with clean references and a practiced answer about 'seeking new challenges.' Seven months later the startup's implosion makes the newsletters, and you feel the specific guilt-adjacent relief of someone who read the tab correctly.",
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
    headline: "Tech Winter: The Funding Freeze",
    text:
      "The VCs who fought over your last round now answer emails with 'love the hustle — circling back in Q3.' There is no Q3. Your lead investor's fund is 'pausing new deployments.' You have five months of runway and a team that believes in you. Believing doesn't make payroll.",
    choices: [
      {
        id: "cut-burn",
        label: "Cut burn to the bone — lay off your friends",
        outcome: {
          text:
            "You make the list yourself, deliver every message yourself, and cry in your car afterward, also yourself. The company survives on a skeleton crew. In the group photo from the garage days, half the faces don't work here anymore.",
          effect: { netWorth: 0, burnout: 30 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "winter-warm-intro",
        label: "▶ Get a warm intro to a Tier-1 VC — watch a short video first",
        requiresAd: true,
        outcome: {
          text:
            "The intro lands. The partner takes the meeting 'as a favor' and stays 40 minutes past the slot. A bridge round materializes at flat — which this year is the same as 'oversubscribed.' Payroll clears. You age backward slightly.",
          effect: { netWorth: 25_000, burnout: 10 },
          next: "y7-founder-grind",
        },
        adFallback: {
          text:
            "The intro goes to voicemail. The bridge round collapses on a Friday, and you personally loan the company money to make final payroll — a sentence your accountant makes you repeat twice.",
          effect: { netWorth: -30_000, burnout: 25 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "acquihire",
        label: "Sell the company for parts — take the acquihire",
        outcome: {
          text:
            "A Big Tech company buys you for the team and quietly deletes the product. The press release says 'we couldn't be more excited.' You could be more excited. But the retention package is real money, and 'Founder (Acquired)' reads great at parties.",
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
      "With VC money frozen solid, a revenue-based financing fund offers a lifeline: cash now for 20% of top-line until they've made 2.5x. No board seat, no dilution — just a tax on every future dollar, forever-ish. The term sheet fits on one page, which is somehow scarier.",
    choices: [
      {
        id: "take-rbf",
        label: "Take the deal — survive now, optimize later",
        outcome: {
          text:
            "The wire lands, payroll steadies, and every invoice now has an invisible passenger taking its cut. It's expensive money — but it's money, in a season when money has stopped believing in software. The company lives.",
          effect: { netWorth: 40_000, burnout: 15 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "refuse-cut-deeper",
        label: "Refuse — cut deeper instead and keep every future dollar",
        outcome: {
          text:
            "You shrink to a crew that fits in one car and a burn rate that fits in a checking account. Every dollar of revenue stays yours, which starts mattering enormously the moment revenue starts growing again. Ownership: retained the hard way.",
          effect: { netWorth: 0, burnout: 25 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "pivot-to-services",
        label: "Pivot to consulting — sell the team's hours to fund the dream",
        outcome: {
          text:
            "You duct-tape a services arm onto the product company: enterprise clients pay handsomely for the exact expertise you built for yourselves. It's slower dream, faster cash — and two clients quietly become your biggest product customers.",
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
      "Your lead investor requests a call and brings a deck. Slide one: 'Options.' Slide two is an orderly shutdown, capital returned, everyone's reputation 'preserved.' He means well. He also wrote off your company in his model last quarter — you can hear it in the tenses he uses.",
    choices: [
      {
        id: "defy-the-deck",
        label: "Refuse the tidy funeral — you're not a slide yet",
        outcome: {
          text:
            "You thank him for the deck and decline the burial. The team shrinks to true believers and the company crawls forward on revenue, spite, and a group chat named 'still alive.' Some slides age badly. You intend to be one of them.",
          effect: { netWorth: 0, burnout: 30 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "wind-down-gracefully",
        label: "Take the advice — wind down clean, land the team softly",
        outcome: {
          text:
            "You return the remaining capital, place every employee personally, and write the shutdown post that gets called 'a class act' by people who don't know how much it hurt. The reputation you preserved turns out to be real currency.",
          effect: { netWorth: 20_000, burnout: 10, title: "Founder (Wound Down With Honor)" },
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "sell-ip-competitor",
        label: "Sell the IP to your competitor before the market knows",
        outcome: {
          text:
            "Your rival buys the tech, the patents, and — awkwardly — the Slack emoji pack. It's not the exit of your dreams, but it's six figures more than the orderly shutdown deck offered, and your investors update their model with a rare pleasant surprise.",
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
      "In the depth of the freeze, salvation appears wearing a lanyard: a state agency wants your product, badly, through a procurement process with 340 pages of requirements and an 11-month payment cycle. It's the least glamorous money in software. It might also be the only money left.",
    choices: [
      {
        id: "chase-the-contract",
        label: "Chase it — boring money is still money",
        outcome: {
          text:
            "Eight months of compliance forms, one FIPS acronym you now dream about, and a contract that outlasts any VC's attention span. Government revenue, it turns out, doesn't have a hype cycle — it just arrives, quarterly, forever.",
          effect: { netWorth: 45_000, burnout: 20, title: "Founder (GovTech, Somehow)" },
          next: "y7-founder-grind",
        },
      },
      {
        id: "stay-pure",
        label: "Pass — the compliance burden would eat the product alive",
        outcome: {
          text:
            "You do the math on 340 pages of requirements versus a four-person team and politely decline. The product stays sharp and shippable, and when the private market thaws, you're the fastest thing left standing in the category.",
          effect: { netWorth: 0, burnout: 20 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "both-badly",
        label: "Try to do both with four people",
        outcome: {
          text:
            "Compliance by day, product by night, quality by neither. You win the contract and lose two customers, breaking exactly even in dollars and losing badly in sleep. The lesson costs a year: focus is a feature you shipped too late.",
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
      "Layoffs land in two weeks, and the org rumor mill has produced a map: your org is 'red,' the infrastructure org is 'green.' A last-minute internal transfer might save you — but transfers mid-freeze need three approvals, and half-finished transfers have a horror genre of their own: cut from both orgs' books at once.",
    choices: [
      {
        id: "stand-your-ground",
        label: "Stay put — survive on your record, not the map",
        outcome: {
          text:
            "You skip the transfer roulette and let your work speak. The wave takes a third of the org and leaves you standing — winded, employed, and owner of three more services by Friday. The map was half right, like maps.",
          effect: { netWorth: 30_000, burnout: 20 },
          achievement: "winter-proof",
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "sprint-the-transfer",
        label: "Sprint the transfer — three approvals in two weeks",
        gamble: [
          {
            chance: 0.5,
            label: "Approved in time — safe in the green org",
            text:
              "You speedrun the paperwork like it's a heist: recruiter, both directors, one VP signature obtained at a coffee machine. The transfer clears four days before the wave. Your old org shrinks by a third; your new badge works fine. Timing is a skill and you just demonstrated it.",
            effect: { netWorth: 50_000, burnout: 10, title: "Staff SWE (Infra Org)" },
            achievement: "winter-proof",
            next: "y7-ai-goldrush",
          },
          {
            chance: 0.5,
            label: "Frozen mid-process — cut from both books",
            text:
              "The third approval sits in a VP's inbox when the freeze drops. You exist in neither org's headcount, which HR resolves the efficient way. The severance letter can't decide which org to mourn you from. Transfer horror genre: new entry.",
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
      "Mid-freeze, a startup claiming to be 'winter-proof' — government contracts, boring revenue, aggressively sensible — offers you a lead role. Jumping mid-winter means leaving severance protection for a company whose 'winter-proof' claim has never actually been tested by a winter. Everything is unsinkable until the iceberg audit.",
    choices: [
      {
        id: "cling-to-badge",
        label: "Stay badged — survive the wave where you stand",
        outcome: {
          text:
            "You decline the jump and ride out the wave at your desk. The cut misses you by one row in the org chart — close enough to hear it. Employed, intact, and newly appreciative of boring Fridays.",
          effect: { netWorth: 25_000, burnout: 20 },
          achievement: "winter-proof",
          next: "y7-ai-goldrush",
        },
      },
      {
        id: "jump-midwinter",
        label: "Jump to the 'winter-proof' startup mid-freeze",
        gamble: [
          {
            chance: 0.4,
            label: "Actually winter-proof — gov contracts hold",
            text:
              "The sensible startup turns out to be exactly as boring as advertised: the government checks clear quarterly, the roadmap ignores the news cycle entirely, and you lead a calm team through the industry's worst year. Winter-proof was real. You bought in at the bottom.",
            effect: { netWorth: 55_000, burnout: 10, title: "Eng Lead (Winter-Proof)" },
            achievement: "winter-proof",
            next: "y7-ai-goldrush",
          },
          {
            chance: 0.6,
            label: "They lay off too — six weeks after you join",
            text:
              "'Winter-proof' meets its first winter and fails the audit: the anchor contract 'rebids,' and the startup cuts a third of staff — last in, first out. Six weeks of tenure, zero severance protection, one very cold lesson about marketing adjectives.",
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
      "The down round reprices everything — including a grim little perk: employees may buy additional shares at the new, crushed valuation. Buying your own company's stock during its worst year is either the trade of the decade or throwing good money into a submarine. The CFO, notably, is buying. The CFO also priced the round.",
    choices: [
      {
        id: "preserve-cash",
        label: "Pass — cash is a position too, especially in winter",
        outcome: {
          text:
            "You keep your powder dry and your exposure singular — salary only. Whatever the recovery does, your rent money won't be aboard the submarine. In winters, liquidity is its own kind of alpha.",
          effect: { netWorth: 15_000, burnout: 15 },
          next: "y7-survivor",
        },
      },
      {
        id: "buy-the-dip",
        label: "Buy in at the crushed price — the CFO is buying",
        gamble: [
          {
            chance: 0.35,
            label: "V-shaped recovery — the bottom was THE bottom",
            text:
              "The next eighteen months un-crush the valuation entirely: new logo momentum, a recovery round above the old peak, and your winter shares up 4x. Buying when the all-hands was a funeral: the trade you'll bore people with forever.",
            effect: { netWorth: 70_000, burnout: 10 },
            next: "y7-survivor",
          },
          {
            chance: 0.65,
            label: "Still underwater — the bottom had a basement",
            text:
              "The recovery arrives late and flat, and your 'discounted' shares stay stubbornly below even the crushed price. The CFO, it emerges, was averaging down from a much worse entry. You now understand insider buying: sometimes it's conviction, sometimes it's cope.",
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
      "The company opens a voluntary severance window: three months' pay to walk now, before the involuntary round decides for you. Taking it mid-winter is a bet that YOU can find work in a frozen market faster than the package runs out. The market currently answers emails with an away message.",
    choices: [
      {
        id: "keep-the-seat",
        label: "Decline — hold the seat through the storm",
        outcome: {
          text:
            "You skip the package and keep the paycheck. The involuntary round grazes your team but misses you, and by spring you're running what's left. Not the comfortable path — the compounding one.",
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
            label: "Rehired in five weeks — severance becomes a bonus",
            text:
              "Your network outperforms the market: a warm intro lands you a Senior role in week five, while the three-month package keeps paying. Double-dipping legally: the winter's rarest trick. You buy the group chat a round.",
            effect: { netWorth: 60_000, burnout: 5, title: "Senior SWE (Landed Fast)" },
            achievement: "big-bonus",
            next: "y7-ai-goldrush",
          },
          {
            chance: 0.45,
            label: "Frozen market — seven months of silence",
            text:
              "The package runs out in month three; the market stays frozen through month seven. You learn the exact sound a savings account makes when it drains. The eventual offer is fine. The seven months were not.",
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
      "Deep in the funding freeze, your one advisor with a pulse says the quiet part: 'The only checks being written this year have AI in the memo line.' A hard pivot to AI could catch the earliest wave of the next boom — or land you in a crater of a hundred identical pivots. Five months of runway. One throw.",
    choices: [
      {
        id: "stay-the-course-lean",
        label: "Stay the course — leanness beats fashion",
        outcome: {
          text:
            "You ignore the memo-line advice and keep shipping the unfashionable thing customers pay for. The freeze eventually thaws for boring revenue too — it just doesn't tweet about it.",
          effect: { netWorth: 5_000, burnout: 20 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "throw-the-hailmary",
        label: "Hard pivot to AI — catch the wave early or die trying",
        gamble: [
          {
            chance: 0.4,
            label: "Early wave caught — pivots into the boom",
            text:
              "You rebuild the product around the models months before the gold rush goes mainstream, and when the wave breaks, you're already standing on it: inbound, press, and the first term sheet of the thaw. The hail mary spirals in. Touchdown.",
            effect: { netWorth: 50_000, burnout: 15, title: "AI Founder (Early)" },
            next: "y7-founder-grind",
          },
          {
            chance: 0.6,
            label: "Crowded crater — one of a hundred pivots",
            text:
              "By launch day there are ninety-nine other 'AI-powered' pivots with identical homepages, four with better funding. The wave arrives; you're underneath it. Three months of runway gone, one demo nobody remembers. The memo line giveth and taketh.",
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
      "One investor is still writing checks this winter — at shark terms: a bridge with a 3x liquidation preference that eats most futures where you're not a unicorn. The alternative: refuse, cut to the bone, and race revenue against a five-month runway clock. The shark smiles. Sharks do that.",
    choices: [
      {
        id: "take-shark-terms",
        label: "Take the shark's bridge — alive and encumbered beats dead",
        outcome: {
          text:
            "You sign the 3x pref with a steady hand and a clenched jaw. Payroll is safe; your exit math is now a hostage negotiation scheduled for later. Survival first. Cap-table therapy second.",
          effect: { netWorth: 10_000, burnout: 20 },
          next: "y7-founder-grind",
        },
      },
      {
        id: "race-the-clock",
        label: "Refuse the shark — race revenue against the runway",
        gamble: [
          {
            chance: 0.5,
            label: "Revenue closes the gap — clean cap table intact",
            text:
              "Five months of feral, invoice-chasing focus later, revenue crosses burn with six weeks to spare. No shark, no pref stack, every future dollar still yours. The team shirt says 'DEFAULT ALIVE' and nobody's laughing — it's reverent.",
            effect: { netWorth: 35_000, burnout: 15 },
            next: "y7-founder-grind",
          },
          {
            chance: 0.5,
            label: "Miss payroll once — a near-death you'll never forget",
            text:
              "The race comes up two weeks short, and you cover payroll from your own account while everything wobbles. A customer prepayment saves the company on a Thursday afternoon. Alive, unencumbered, and permanently changed by the sound of that particular coin flip.",
            effect: { netWorth: -30_000, burnout: 30 },
            next: "y7-founder-grind",
          },
        ],
      },
    ],
  },
];
