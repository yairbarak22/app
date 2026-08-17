import type {
  Ending,
  EndingKind,
  GameStats,
  RandomEvent,
  Scenario,
  StatEffect,
} from "./types";

/**
 * Pure game content + pure helpers. No React in this file.
 * Writers add years here; the engine and UI never need to change.
 *
 * Career map (Years 1–15, ages 22–36):
 *   Y1–3   Early game: Big Tech vs. startup, first layoff scare.
 *   Y4–5   Mid game setup: golden handcuffs, rocket ships, founding.
 *   Y6     THE TECH WINTER — industry-wide layoffs hit every path.
 *   Y7–11  Mid game: AI gold rush, politics, scaling, acquisitions.
 *   Y12–15 Endgame: F-U money math, IPOs, exits, and the last standup.
 */

export const STARTING_AGE = 22;

/** Passive burnout recovery applied on every year transition (the PTO you actually took). */
export const YEARLY_BURNOUT_RECOVERY = 5;

export const INITIAL_STATS: GameStats = {
  netWorth: -30_000, // student loans. welcome to the industry.
  burnout: 10,
  title: "CS Grad (Unemployed)",
};

export const FIRST_SCENARIO_ID = "y1-graduation";

// ---------------------------------------------------------------------------
// SCENARIOS
// ---------------------------------------------------------------------------

export const SCENARIOS: Scenario[] = [
  // =========================================================================
  // YEAR 1 (age 22)
  // =========================================================================
  {
    id: "y1-graduation",
    year: 1,
    age: 22,
    headline: "Graduation Day",
    text:
      "You walk off the stage with a CS degree, $30K in student loans, and a LinkedIn banner that says 'Open to Work.' Recruiters are circling. Your roommate won't stop talking about his startup. Time to make your first real career decision.",
    choices: [
      {
        id: "grind-leetcode",
        label: "Grind 300 LeetCode problems and take the Big Tech offer",
        outcome: {
          text:
            "Six rounds, one take-home, and a system-design interview about designing Twitter later — you're in. $150K TC, a badge that opens doors, and unlimited LaCroix. Your parents finally stop asking questions.",
          effect: { netWorth: 45_000, burnout: 15, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "join-startup",
        label: "Join your roommate's seed-stage startup as employee #3",
        outcome: {
          text:
            "The pay is 'competitive for the stage' (it's not), but you got 1.5% equity and a title you made up yourself. You ship more in a month than most people do in a year. The office is a garage. Literally.",
          effect: { netWorth: 8_000, burnout: 10, title: "Founding Engineer" },
          next: "y2-startup-ramen",
        },
      },
      {
        id: "hold-out-quant",
        label: "Hold out for that quant fund offer — you're built different",
        outcome: {
          text:
            "Three months of mental math interviews and getting strung along by a hedge fund that 'loves your energy.' They ghost you after the final round. You take the Big Tech offer anyway, slightly humbled and very behind on rent.",
          effect: { netWorth: 30_000, burnout: 25, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
    ],
  },

  // =========================================================================
  // YEAR 2 (age 23)
  // =========================================================================
  {
    id: "y2-bigtech-oncall",
    year: 2,
    age: 23,
    headline: "The Pager Never Sleeps",
    text:
      "You've been handed the on-call rotation for a legacy service written in 2011 by someone who now farms goats in Portugal. It pages at 3 AM. Every night. Your manager calls it 'a great growth opportunity.'",
    choices: [
      {
        id: "own-the-service",
        label: "Own it. Become the only person who understands the beast",
        outcome: {
          text:
            "You rewrite the runbook, tame the alerts, and become load-bearing infrastructure yourself. Promo to SWE II, a fat RSU refresher — and the creeping realization that you can never, ever quit.",
          effect: { netWorth: 60_000, burnout: 25, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
      {
        id: "quiet-quit",
        label: "Do the minimum. Protect your peace, king",
        outcome: {
          text:
            "You mute the pager, coast through sprint planning, and rediscover hobbies. Your RSUs still vest. Your manager writes 'meets some expectations' on your review, which is a sentence that will age poorly.",
          effect: { netWorth: 40_000, burnout: -5, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
    ],
  },
  {
    id: "y2-startup-ramen",
    year: 2,
    age: 23,
    headline: "Ramen Profitability",
    text:
      "The startup has 7 months of runway and a burn rate the founder describes as 'aggressive but visionary.' He gathers the team (all four of you) and asks everyone to defer salary until the next round closes. It's definitely closing. Any week now.",
    choices: [
      {
        id: "defer-salary",
        label: "Believe. Defer salary for double the equity",
        outcome: {
          text:
            "You're now paid in vibes and stock options. Your diet is 40% instant noodles. But the product ships, users trickle in, and that equity stake is starting to look like it might actually mean something.",
          effect: { netWorth: -18_000, burnout: 20 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "moonlight",
        label: "Keep the faith — but moonlight freelance gigs to pay rent",
        outcome: {
          text:
            "Days: startup. Nights: fixing WordPress sites for a dentist in Ohio. Weekends: a blur. Your bank account recovers. Your sleep schedule files for divorce.",
          effect: { netWorth: 25_000, burnout: 30 },
          next: "y3-startup-seriesa",
        },
      },
      {
        id: "jump-to-bigtech",
        label: "Jump ship to Big Tech before the money runs out",
        outcome: {
          text:
            "You quietly interview, land an SWE II offer, and tell the founder over coffee. He calls you a mercenary. Your new badge photo is great. Your old equity is now a PDF you keep for sentimental reasons.",
          effect: { netWorth: 50_000, burnout: 5, title: "SWE II @ Big Tech" },
          next: "y3-bigtech-efficiency",
        },
      },
    ],
  },

  // =========================================================================
  // YEAR 3 (age 24)
  // =========================================================================
  {
    id: "y3-bigtech-efficiency",
    year: 3,
    age: 24,
    headline: "Reorg Roulette",
    text:
      "The stock dipped and the CEO posted a heartfelt memo about 'doing more with less' from his third yacht. A reorg flattens your org — and a friend in HR tips you off that your name is on the list.",
    choices: [
      {
        id: "take-severance",
        label: "Take the severance package and test the job market",
        outcome: {
          text:
            "Twelve weeks of severance, a LinkedIn post with the green banner, and 400 applications into the void. The market is rough, but you're free — and you learned to never trust a memo that contains the word 'journey.'",
          effect: { netWorth: 20_000, burnout: 20, title: "SWE II (Open to Work)" },
          next: "y4-open-market",
        },
      },
      {
        id: "pull-strings",
        label: "▶ Pull strings with leadership — watch a short video to survive the cut",
        requiresAd: true,
        outcome: {
          text:
            "Your skip-level 'goes to bat for you' after you casually mention you're the only one with prod access to the billing service. Your name vanishes from the list. Someone else's appears. You don't ask questions. Promo to Senior in the same cycle.",
          effect: { netWorth: 70_000, burnout: 10, title: "Senior SWE @ Big Tech" },
          next: "y4-bigtech-handcuffs",
        },
        adFallback: {
          text:
            "You couldn't get a meeting in time. Security walks you out on a Tuesday with a cardboard box and a COBRA pamphlet. At least the severance is decent.",
          effect: { netWorth: 15_000, burnout: 25, title: "SWE II (Laid Off)" },
          next: "y4-open-market",
        },
      },
      {
        id: "rage-apply",
        label: "Rage-apply everywhere and force a counter-offer",
        outcome: {
          text:
            "You interview out of spite and land a Senior offer at a competitor. Your manager suddenly discovers budget for a counter. You take the new gig anyway — loyalty is a one-way street and you finally learned to walk it.",
          effect: { netWorth: 55_000, burnout: 15, title: "Senior SWE" },
          next: "y4-bigtech-handcuffs",
        },
      },
    ],
  },
  {
    id: "y3-startup-seriesa",
    year: 3,
    age: 24,
    headline: "Series A or Bust",
    text:
      "A term sheet finally lands — $8M at terms the founder describes as 'founder-friendly, mostly.' In lieu of a raise, he offers you a shiny new title. The VCs want 'senior leadership in place.' You are the senior leadership. All of it.",
    choices: [
      {
        id: "take-vp-title",
        label: "Take the VP of Engineering title (of a 5-person team)",
        outcome: {
          text:
            "You now attend board meetings and unclog the office sink. The title looks incredible on LinkedIn and means nothing in your bank account — yet. Your equity re-vests. The cliff looms.",
          effect: { netWorth: 12_000, burnout: 15, title: "VP of Engineering (of 5)" },
          next: "y4-startup-scale",
        },
      },
      {
        id: "sell-secondary",
        label: "Negotiate a secondary — sell 10% of your shares now",
        outcome: {
          text:
            "The VCs grumble but let you take some chips off the table. Real money hits your account for the first time in three years. You buy a mattress that isn't inflatable. Life-changing.",
          effect: { netWorth: 85_000, burnout: 5, title: "Founding Engineer (Liquid)" },
          next: "y4-startup-scale",
        },
      },
      {
        id: "start-own-thing",
        label: "Quit and start your OWN thing — you've seen how the sausage is made",
        outcome: {
          text:
            "You walk away from unvested equity with a laptop, a domain name, and unearned confidence. Your idea is 'Uber for something.' Your runway is your savings account. Your cofounder is a group chat.",
          effect: { netWorth: -12_000, burnout: 20, title: "Founder (Pre-Idea)" },
          next: "y4-founder-garage",
        },
      },
    ],
  },

  // =========================================================================
  // YEAR 4 (age 25)
  // =========================================================================
  {
    id: "y4-bigtech-handcuffs",
    year: 4,
    age: 25,
    headline: "Golden Handcuffs",
    text:
      "Your RSU refresher lands and the four-year math is suddenly very real. Meanwhile a recruiter from the hottest pre-IPO company in the Valley slides into your DMs with the phrase 'rocket ship' and zero sense of irony.",
    choices: [
      {
        id: "sign-refresher",
        label: "Sign the refresher. Vest in peace",
        outcome: {
          text:
            "You lock in another four years of golden handcuffs and set a calendar reminder for every vest date. The work is fine. The money is not fine — it's excellent. You catch yourself defending the company in group chats.",
          effect: { netWorth: 95_000, burnout: 10 },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "join-rocketship",
        label: "Jump to the pre-IPO rocket ship — equity or die",
        outcome:{
          text:
            "You trade liquid RSUs for paper options and a badge at the company everyone's tweeting about. The office has a climbing wall nobody uses and a Slack that never, ever sleeps.",
          effect: { netWorth: 45_000, burnout: 15, title: "Senior Eng @ Rocket Ship" },
          next: "y5-rocketship",
        },
      },
      {
        id: "coast-mode",
        label: "Coast. Rest and vest. You've earned this",
        outcome: {
          text:
            "You do exactly your job, no more, and log off at 5:01 PM. You take up bouldering. Your therapist says you're 'making real progress.' Your promo packet does not exist, and you're at peace with that. Mostly.",
          effect: { netWorth: 65_000, burnout: -10 },
          next: "y5-bigtech-staffpacket",
        },
      },
    ],
  },
  {
    id: "y4-open-market",
    year: 4,
    age: 25,
    headline: "The 400-Application Gauntlet",
    text:
      "Turns out the job market read the same macro news as your old CEO. Every posting has 3,000 applicants, half the recruiters are also laid off, and 'we went with another candidate' is the new good morning. Your severance is evaporating.",
    choices: [
      {
        id: "downlevel",
        label: "Take the down-level offer at a boring, stable company",
        outcome: {
          text:
            "Insurance-adjacent enterprise software. The tech stack is old enough to vote, but the paycheck clears and nobody Slacks you on weekends. Your ego files a complaint. Your cortisol writes a thank-you note.",
          effect: { netWorth: 35_000, burnout: 10, title: "SWE II (Again)" },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "crypto-contract",
        label: "Contract for a chaotic well-funded crypto startup",
        outcome: {
          text:
            "The pay is absurd, the codebase is a crime scene, and the founder communicates exclusively in voice memos at 2 AM. You stack cash fast and keep your resume open in another tab at all times.",
          effect: { netWorth: 70_000, burnout: 20, title: "Contract Eng (Web3, Regrettably)" },
          next: "y5-rocketship",
        },
      },
      {
        id: "found-from-ashes",
        label: "Screw it — build the thing you always talked about",
        outcome: {
          text:
            "Getting laid off was the push you needed. You incorporate a company from your kitchen table, and the fear of dying unemployed becomes a feature roadmap. Nothing motivates like spite.",
          effect: { netWorth: -15_000, burnout: 10, title: "Founder (Post-Layoff)" },
          next: "y5-founder-pmf",
        },
      },
    ],
  },
  {
    id: "y4-founder-garage",
    year: 4,
    age: 25,
    headline: "Default Alive?",
    text:
      "Month four of founding. You've pivoted twice, your landing page has 11 signups (6 are you), and your savings graph looks like a ski slope. Time to pick a survival strategy.",
    choices: [
      {
        id: "apply-yc",
        label: "Apply to YC with maximum confidence and minimum traction",
        outcome: {
          text:
            "Against all odds — you're in. The interview was 9 minutes and one partner just stared. You move to a shared house with four other founders and learn to say 'we're crushing it' with a straight face.",
          effect: { netWorth: 5_000, burnout: 15, title: "YC Founder" },
          next: "y5-founder-pmf",
        },
      },
      {
        id: "bootstrap-boring",
        label: "Bootstrap something boring — B2B SaaS for dentists",
        outcome: {
          text:
            "No TechCrunch headline will ever mention you, but dentists pay invoices on time. $4K MRR and climbing. Your VC friends call it a 'lifestyle business' the way people call a house a 'starter home.'",
          effect: { netWorth: 20_000, burnout: 10, title: "Bootstrapped Founder" },
          next: "y5-founder-pmf",
        },
      },
      {
        id: "crawl-back",
        label: "Crawl back to Big Tech before the gap year becomes a gap decade",
        outcome: {
          text:
            "You tell the interviewer the startup 'taught you ownership.' They nod knowingly. The re-badge photo captures a person who has Seen Things. Your first paycheck feels like a warm bath.",
          effect: { netWorth: 55_000, burnout: 5, title: "Senior SWE @ Big Tech" },
          next: "y5-bigtech-staffpacket",
        },
      },
    ],
  },
  {
    id: "y4-startup-scale",
    year: 4,
    age: 25,
    headline: "Scaling Pains",
    text:
      "Series A money hits the account and the founder's first move is renting an office with a neon sign that says 'Do Epic Sh*t.' Headcount triples in a quarter. Half your job is now interviews, and the other half is apologizing for the codebase you wrote in year one.",
    choices: [
      {
        id: "hire-fast",
        label: "Hire fast and become a real VP with real reports",
        outcome: {
          text:
            "Fifteen direct reports, three of whom are 'senior to you in years but not in title,' which goes great. You stop writing code entirely and start writing Notion docs about writing code. Management: it's meetings all the way down.",
          effect: { netWorth: 30_000, burnout: 25 },
          next: "y5-startup-seriesb",
        },
      },
      {
        id: "stay-hands-on",
        label: "Stay hands-on and let them hire a VP above you",
        outcome: {
          text:
            "The new VP arrives from a company 100x your size and immediately schedules a meeting called 'Process.' You keep shipping while he builds his 'org philosophy' deck. The code respects you. That's what matters. Right?",
          effect: { netWorth: 25_000, burnout: 10, title: "Principal Eng (De Facto)" },
          next: "y5-startup-seriesb",
        },
      },
      {
        id: "parlay-title",
        label: "Parlay the startup title into a rocket-ship gig",
        outcome: {
          text:
            "Turns out 'VP of Engineering' on a resume opens doors even when the team was five people. The hottest pre-IPO company in the Valley hires you to lead a team, and your equity packet has a number that makes you close the laptop slowly.",
          effect: { netWorth: 60_000, burnout: 10, title: "Eng Lead @ Rocket Ship" },
          next: "y5-rocketship",
        },
      },
    ],
  },

  // =========================================================================
  // YEAR 5 (age 26)
  // =========================================================================
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

  // =========================================================================
  // YEAR 6 (age 27) — THE TECH WINTER
  // =========================================================================
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
          next: "y7-survivor",
        },
      },
    ],
  },
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

  // =========================================================================
  // YEAR 7 (age 28)
  // =========================================================================
  {
    id: "y7-ai-goldrush",
    year: 7,
    age: 28,
    headline: "The AI Gold Rush",
    text:
      "The winter thaws overnight because someone shipped a chatbot that passed the bar exam. Now every company is an AI company, every roadmap is a prompt, and your CEO keynotes a demo he doesn't understand. Recruiters are back, and they've learned a new word: 'agentic.'",
    choices: [
      {
        id: "rebrand-ai",
        label: "Rebrand yourself as an AI Engineer. Ride the wave",
        outcome: {
          text:
            "You read three papers, fine-tune one model, and update your LinkedIn headline. Your inbound 10x's. You are now paid a premium to explain to executives why the demo worked and production didn't. The wave is real, and you're on it.",
          effect: { netWorth: 110_000, burnout: 15, title: "AI Engineer" },
          next: "y8-goldencage",
        },
      },
      {
        id: "boring-infra",
        label: "Stay skeptical — someone has to keep the actual systems alive",
        outcome: {
          text:
            "While everyone chases the hype, you quietly become the person who makes the GPU bills 40% smaller. No keynotes, no threads, just a performance review that reads like a love letter. The hype needs infra. Infra is you.",
          effect: { netWorth: 75_000, burnout: 5 },
          next: "y8-goldencage",
        },
      },
      {
        id: "frontier-lab",
        label: "Take the frontier lab offer — the mission, the money, the madness",
        outcome: {
          text:
            "The offer letter has a comp number you screenshot and a mission statement about the fate of humanity. Your new coworkers include two ex-professors, a chess prodigy, and a guy who doesn't believe in weekends. The bar is the sky.",
          effect: { netWorth: 160_000, burnout: 30, title: "Member of Technical Staff" },
          next: "y8-frontierlab",
        },
      },
    ],
  },
  {
    id: "y7-comeback",
    year: 7,
    age: 28,
    headline: "The Comeback Tour",
    text:
      "The market is thawing, but the scars are fresh — yours and the industry's. Interview loops are longer, offers are stingier, and every recruiter call starts with 'so, walk me through the gap.' You need a move, not a job.",
    choices: [
      {
        id: "stable-landing",
        label: "Take the solid, unglamorous offer and rebuild",
        outcome: {
          text:
            "A profitable company you've never tweeted about hires you in three rounds like a functioning adult business. The work is real, the people are kind, and your heart rate returns to resting for the first time in two years.",
          effect: { netWorth: 45_000, burnout: 10, title: "Senior SWE (Rebuilt)" },
          next: "y8-goldencage",
        },
      },
      {
        id: "fractional-cto",
        label: "Go fractional — CTO-for-hire across three startups",
        outcome: {
          text:
            "You invoice like a law firm and context-switch like a browser with 90 tabs. Three startups, three codebases, three founders who all text 'quick question' at 11 PM. The money is great. The word 'boundaries' is aspirational.",
          effect: { netWorth: 60_000, burnout: 20, title: "Fractional CTO" },
          next: "y8-goldencage",
        },
      },
      {
        id: "austin-remote",
        label: "Go remote, move somewhere with a yard, log off at 5",
        outcome: {
          text:
            "You trade the coastal grind for a house with a garage and a remote gig that pays 80% of the money for 50% of the cortisol. You buy a smoker. You develop opinions about brisket. Life is suspiciously okay.",
          effect: { netWorth: 30_000, burnout: -15, title: "Senior SWE (Remote, Rested)" },
          next: "y8-goldencage",
        },
      },
    ],
  },
  {
    id: "y7-survivor",
    year: 7,
    age: 28,
    headline: "Survivor's Guilt",
    text:
      "The layoffs stopped, mostly because there's no one left to lay off. You now run what remains of engineering: eleven people, four time zones, and a roadmap written by someone who no longer works here. The board wants 'a path to default alive.' You want a nap.",
    choices: [
      {
        id: "rebuild-lean",
        label: "Rebuild lean and become genuinely indispensable",
        outcome: {
          text:
            "You cut the roadmap to three things, delete half the microservices out of mercy, and ship the product the customers actually wanted. Revenue stabilizes. The board learns your name. The title finally matches the job you've been doing for years.",
          effect: { netWorth: 50_000, burnout: 20, title: "VP of Engineering" },
          next: "y8-acquisition",
        },
      },
      {
        id: "retention-and-hunt",
        label: "Collect the retention money and quietly interview out",
        outcome: {
          text:
            "You hold the fort with one hand and interview with the other. Big Tech takes you back at Staff level — turns out 'kept a startup alive through the winter with duct tape' is the best packet material ever written.",
          effect: { netWorth: 65_000, burnout: 5, title: "Staff SWE @ Big Tech" },
          next: "y8-goldencage",
        },
      },
      {
        id: "push-to-sell",
        label: "Push the CEO to sell the company while there's something to sell",
        outcome: {
          text:
            "You make the spreadsheet the CEO refused to make and walk him through it like a eulogy. He listens. Bankers are hired. The word 'strategic alternatives' enters the vocabulary, and your equity might mean something after all.",
          effect: { netWorth: 35_000, burnout: 15 },
          next: "y8-acquisition",
        },
      },
    ],
  },
  {
    id: "y7-founder-grind",
    year: 7,
    age: 28,
    headline: "Ramen, Round Two",
    text:
      "The company survived the winter, which puts you in rare company: alive, lean, and slightly feral. The survivors' market is weird — half your competitors are dead, and their customers are wandering the wasteland with budgets.",
    choices: [
      {
        id: "whale-customer",
        label: "Hunt the whale — land one massive enterprise customer",
        outcome: {
          text:
            "Nine months of security reviews, three procurement portals, and one steak dinner where you agree to build two features you immediately regret. But the contract is seven figures, and the logo on your homepage does the selling now.",
          effect: { netWorth: 70_000, burnout: 20 },
          next: "y8-seriesa",
        },
      },
      {
        id: "bali-remote",
        label: "Go fully remote from Bali and cut burn to nothing",
        outcome: {
          text:
            "You run the company from a co-working space with a rice-paddy view, and your burn rate drops below your old rent. Revenue compounds quietly. Your investors think it's a phase. Your cortisol disagrees.",
          effect: { netWorth: 15_000, burnout: -15 },
          next: "y8-seriesa",
        },
      },
      {
        id: "merge-competitor",
        label: "Merge with your last surviving competitor",
        outcome: {
          text:
            "Two half-dead companies duct-taped together make one whole company, math that only works in a winter. The merger costs you three friendships and one product line, but the combined revenue chart finally points the right way.",
          effect: { netWorth: 35_000, burnout: 15, title: "Co-CEO (It's Complicated)" },
          next: "y8-seriesa",
        },
      },
    ],
  },

  // =========================================================================
  // YEAR 8 (age 29)
  // =========================================================================
  {
    id: "y8-goldencage",
    year: 8,
    age: 29,
    headline: "The Golden Cage",
    text:
      "You're 29, comfortable, and quietly bored. The money is real now — the kind that makes a spreadsheet with a retirement tab. But every day feels like the same standup, and a voice in your head keeps asking 'is this it?' The voice sounds suspiciously like your college self.",
    choices: [
      {
        id: "push-principal",
        label: "Push for Principal — become the person whose docs get quoted",
        outcome: {
          text:
            "You pick the hairiest technical problem in the company and make it your personality for a year. It works. Your design doc gets cargo-culted across three orgs, and your comp band now has a comma where you didn't expect one.",
          effect: { netWorth: 120_000, burnout: 25, title: "Principal Engineer" },
          next: "y9-politics",
        },
      },
      {
        id: "coast-invest",
        label: "Coast at work, get serious about investing",
        outcome: {
          text:
            "You automate your job 30% and your savings 100%. Index funds, max 401(k), backdoor Roth — the personal-finance subreddit would weep with pride. Compound interest becomes your favorite coworker.",
          effect: { netWorth: 85_000, burnout: -10 },
          next: "y9-politics",
        },
      },
      {
        id: "angel-checks",
        label: "Write angel checks into friends' startups",
        outcome: {
          text:
            "You Venmo your way onto five cap tables with checks that used to be a down payment. Four of the five founders stop replying to texts within a year. The fifth keeps sending charts that go up. You choose to believe the charts.",
          effect: { netWorth: -40_000, burnout: 5, title: "Engineer & Angel" },
          next: "y9-politics",
        },
      },
    ],
  },
  {
    id: "y8-frontierlab",
    year: 8,
    age: 29,
    headline: "Mission Aligned",
    text:
      "A year inside the frontier lab: the work is a decade ahead of everything else, the Slack debates cite philosophy papers, and someone in the kitchen is always saying 'timelines.' Then the tender offer email lands — you can sell a chunk of your equity at a valuation with a B in it.",
    choices: [
      {
        id: "tender-sell",
        label: "Sell in the tender. Diversification is a love language",
        outcome: {
          text:
            "You sell a slice at a number your parents don't believe and your financial advisor frames. The true believers side-eye you at lunch. You buy index funds and sleep like a Victorian orphan who's been adopted by a duke.",
          effect: { netWorth: 350_000, burnout: 10 },
          next: "y9-politics",
        },
      },
      {
        id: "hold-for-agi",
        label: "Hold everything. If the mission works, money is irrelevant anyway",
        outcome: {
          text:
            "You decline the tender and go back to work. Your equity remains a thought experiment with a dollar sign. Your conviction is either visionary or a cautionary tale, and you won't know which for years. The uncertainty has a weight.",
          effect: { netWorth: 60_000, burnout: 25 },
          next: "y9-politics",
        },
      },
      {
        id: "spectacular-burnout",
        label: "Admit the pace is unsustainable — take a real break",
        outcome: {
          text:
            "You hit a wall at 2 AM on a Tuesday, mid-eval-run, and finally say it out loud: 'I can't keep doing this.' The lab, to its credit, grants a sabbatical. You spend six months relearning how to be a person. It mostly works.",
          effect: { netWorth: -40_000, burnout: -35, title: "MTS (On Sabbatical)" },
          next: "y9-politics",
        },
      },
    ],
  },
  {
    id: "y8-acquisition",
    year: 8,
    age: 29,
    headline: "Corp Dev Comes Knocking",
    text:
      "A Big Tech corp-dev team 'would love to find time' — the mating call of acquisition. Diligence begins: data rooms, retention spreadsheets, and executives practicing the word 'synergy' in the mirror. Your equity is either about to mean everything or nothing.",
    choices: [
      {
        id: "champion-deal",
        label: "Champion the deal — get this thing across the line",
        outcome: {
          text:
            "You run diligence like a launch: crisp docs, clean answers, no surprises. The deal closes. The all-hands cries. Your options convert into actual, spendable money, and your new badge says a trillion-dollar company's name on it.",
          effect: { netWorth: 300_000, burnout: 10, title: "Eng Lead (Post-Acquisition)" },
          next: "y9-politics",
        },
      },
      {
        id: "deal-collapses",
        label: "Stay neutral and keep shipping — deals die all the time",
        outcome: {
          text:
            "Three weeks before signing, the acquirer's stock dips 8% and the deal dies in a phone call that lasts four minutes. The CEO announces 'we were never for sale' to a room that has read the leaked deck. Back to work.",
          effect: { netWorth: 30_000, burnout: 20 },
          next: "y9-zombie",
        },
      },
      {
        id: "leave-before-deal",
        label: "Don't wait for the coin flip — jump to another rocket",
        outcome: {
          text:
            "You've seen enough M&A limbo to know it breaks people. You take a strong offer at a growth-stage company while your old coworkers refresh the news for updates about their own jobs. Cold? Maybe. Liquid? Yes.",
          effect: { netWorth: 55_000, burnout: 10, title: "Staff Eng @ Growth Co" },
          next: "y9-zombie",
        },
      },
    ],
  },
  {
    id: "y8-seriesa",
    year: 8,
    age: 29,
    headline: "The Series A Roadshow",
    text:
      "The winter survivors get the spring. Suddenly your metrics are 'a story,' your story is 'a deck,' and you're pitching Sand Hill Road twice a day for six weeks. Sixty meetings. Fifty-five passes. Three term sheets. One decision.",
    choices: [
      {
        id: "tier1-brutal-terms",
        label: "Take the Tier-1 fund with the brutal terms",
        outcome: {
          text:
            "The brand-name fund leads at a serious valuation — with a board seat, a 2x participating preference, and a partner who texts 'thoughts?' at 6 AM. The logo on the press release opens every door. The terms close a few behind you.",
          effect: { netWorth: 40_000, burnout: 20, title: "CEO & Co-Founder" },
          next: "y9-scale",
        },
      },
      {
        id: "boutique-friendly",
        label: "Take the smaller fund with founder-friendly terms",
        outcome: {
          text:
            "Less money, better terms, and a partner who was a founder herself and answers emails like a human. The TechCrunch headline is smaller. Your ownership percentage is not.",
          effect: { netWorth: 25_000, burnout: 10, title: "CEO & Co-Founder" },
          next: "y9-scale",
        },
      },
      {
        id: "reject-vc",
        label: "Tear up the term sheets — bootstrap forever",
        outcome: {
          text:
            "You email three funds a polite no and take a screenshot for posterity. Revenue is the only investor now. Growth is slower, but every dollar of it is yours, and board meetings are you, a mirror, and a P&L that behaves.",
          effect: { netWorth: 50_000, burnout: 5, title: "Bootstrapped CEO" },
          next: "y9-scale",
        },
      },
    ],
  },

  // =========================================================================
  // YEAR 9 (age 30)
  // =========================================================================
  {
    id: "y9-politics",
    year: 9,
    age: 30,
    headline: "Game of Codes",
    text:
      "You turn 30 mid-reorg. The new SVP — hired from a company famous for stack ranking — redraws the org chart and lands you under a VP who once lost an argument to you in a design review and has the memory of an elephant. Your calendar fills with meetings that feel like chess.",
    choices: [
      {
        id: "outmaneuver",
        label: "Play the game — ally with the rival VP and outmaneuver him",
        outcome: {
          text:
            "You build a coalition like it's a raid group: the rival VP, two staff engineers, and one very influential admin. By Q3, your enemy is 'exploring opportunities outside the company' and you own his best team. You feel powerful and vaguely gross.",
          effect: { netWorth: 95_000, burnout: 25 },
          next: "y10-poach",
        },
      },
      {
        id: "transfer-reset",
        label: "Transfer teams and reset the board",
        outcome: {
          text:
            "You find an org run by an actual engineer, transfer in a week (a company record), and watch your old org's drama from a safe distance like prestige television. New team, clean slate, same paycheck.",
          effect: { netWorth: 75_000, burnout: 10 },
          next: "y10-poach",
        },
      },
      {
        id: "heads-down",
        label: "Keep your head down and outlast everyone",
        outcome: {
          text:
            "You ship, you smile in meetings, you give the VP nothing to swing at. It takes fourteen months, but the SVP gets poached, the VP follows him, and you're still here — the org's living memory, slightly more tired, fully vested.",
          effect: { netWorth: 65_000, burnout: 15 },
          next: "y10-poach",
        },
      },
    ],
  },
  {
    id: "y9-zombie",
    year: 9,
    age: 30,
    headline: "Zombie Mode",
    text:
      "The company isn't dying, but it isn't living either — flat growth, quiet quitting in the parking lot, options priced at hope. The CEO's new favorite phrase is 'profitable-ish.' You're 30, your best years are compounding somewhere, and this isn't it.",
    choices: [
      {
        id: "finally-bigtech",
        label: "Finally take the Big Tech offer that's been open for years",
        outcome: {
          text:
            "The recruiter who's emailed you every six months since college finally gets a yes. Staff level, real money, and a first week so calm you keep waiting for the emergency. There is no emergency. There's just... process. It's beautiful.",
          effect: { netWorth: 75_000, burnout: 10, title: "Staff SWE @ Big Tech" },
          next: "y10-poach",
        },
      },
      {
        id: "become-cto",
        label: "Take over as CTO when the founder 'steps back'",
        outcome: {
          text:
            "The founder announces he's 'transitioning to a board role' (translation: Miami). Suddenly the zombie is yours to resurrect. You cut two products, refocus on the one that works, and discover you might actually be good at this.",
          effect: { netWorth: 40_000, burnout: 20, title: "CTO" },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "solo-consultant",
        label: "Rage-quit into solo consulting — sell the scar tissue",
        outcome: {
          text:
            "You hang a shingle that says 'I've seen this movie before' and charge accordingly. Four clients, zero standups, and a calendar you control for the first time since college. Revenue is lumpy. Freedom is not.",
          effect: { netWorth: 50_000, burnout: -10, title: "Solo Consultant" },
          next: "y10-poach",
        },
      },
    ],
  },
  {
    id: "y9-scale",
    year: 9,
    age: 30,
    headline: "Scale or Flail",
    text:
      "Thirty employees, real revenue, and the specific chaos of a company outgrowing its founders. Your cofounder — your best friend from the garage days — wants to rewrite the product in a language he learned last month, and the disagreement is no longer technical. The board is watching.",
    choices: [
      {
        id: "buyout-cofounder",
        label: "Buy out your cofounder before this kills the company",
        outcome: {
          text:
            "The negotiation takes three months and one mediator. He leaves with a check, a tweet thread everyone reads between the lines of, and your shared history in a box. The company steadies. The group chat from the garage days goes quiet forever.",
          effect: { netWorth: -120_000, burnout: 25, title: "CEO (Sole Founder)" },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "split-roles",
        label: "Split the roles cleanly — he takes R&D, you take the company",
        outcome: {
          text:
            "A weekend offsite, one brutal honest conversation, and a new org chart with a thick line down the middle. He gets a lab and no meetings; you get the P&L and all of them. The friendship survives. The board exhales.",
          effect: { netWorth: 25_000, burnout: 10 },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "exec-coach",
        label: "▶ Get an intro to the legendary exec coach — watch a short video first",
        requiresAd: true,
        outcome: {
          text:
            "The coach — the one from the podcasts — takes you both on. Six sessions in, you're having the actual conversation you'd been avoiding for two years. The conflict dissolves into a working partnership. Worth every session.",
          effect: { netWorth: 45_000, burnout: -10 },
          next: "y10-founder-crossroads",
        },
        adFallback: {
          text:
            "The coach's waitlist is eighteen months. You and your cofounder keep 'managing it,' which means not talking about it, which means it festers into every product decision like a slow leak.",
          effect: { netWorth: 0, burnout: 20 },
          next: "y10-founder-crossroads",
        },
      },
    ],
  },

  // =========================================================================
  // YEAR 10 (age 31)
  // =========================================================================
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

  // =========================================================================
  // YEAR 11 (age 32)
  // =========================================================================
  {
    id: "y11-goldenyears",
    year: 11,
    age: 32,
    headline: "The Golden Years",
    text:
      "Your comp is now a number you don't say out loud at family dinners. But this year a peer — same age, same career, better marathon time — had a cardiac event in a quarterly business review. He's fine. You're not, exactly. You've started doing the math on what 'enough' means.",
    choices: [
      {
        id: "keep-stacking",
        label: "Keep stacking. Compounding is at maximum velocity",
        outcome: {
          text:
            "These are the highest-earning years of your life and you treat them like a harvest: heads down, vest, invest, repeat. The spreadsheet's retirement tab now has a date in it. The date is closer than you thought.",
          effect: { netWorth: 180_000, burnout: 20 },
          next: "y12-fumoney",
        },
      },
      {
        id: "downshift",
        label: "Downshift to four days — buy back your Fridays",
        outcome: {
          text:
            "You negotiate 80% time, coach a youth robotics team on Fridays, and discover that no one at work even noticed. The kids' robot is terrible and you love it more than any system you've ever shipped.",
          effect: { netWorth: 90_000, burnout: -20 },
          next: "y12-fumoney",
        },
      },
      {
        id: "nonprofit-tour",
        label: "Take the mission job — staff engineer at a nonprofit",
        outcome: {
          text:
            "You take a 70% pay cut to make government benefits websites work for people who need them. The tech is unglamorous, and the impact shows up as humans, not dashboards. Your old coworkers say 'that's so cool' with genuine confusion.",
          effect: { netWorth: 20_000, burnout: -25, title: "Staff Eng @ Nonprofit" },
          next: "y12-fumoney",
        },
      },
    ],
  },
  {
    id: "y11-empire",
    year: 11,
    age: 32,
    headline: "The Term Sheet & The Trigger",
    text:
      "Both doors open in the same month: a signed acquisition offer with a number that ends your working life, and a Series B term sheet to go build the empire. The board is split. Your cofounders group chat is split. You have two weeks and one decision.",
    choices: [
      {
        id: "sign-acquisition",
        label: "Sign the acquisition. Take the money off the table",
        outcome: {
          text:
            "You sign in a conference room with terrible lighting and champagne someone bought at Safeway. The wire lands weeks later — a number with commas you have to count twice. The product will die inside the acquirer within two years. The money will not.",
          effect: { netWorth: 900_000, burnout: 10, title: "Exited Founder" },
          next: "y12-postexit",
        },
      },
      {
        id: "series-b-bigger",
        label: "Take the Series B. This company goes all the way",
        outcome: {
          text:
            "You turn down life-changing money to chase generational money, a decision your spouse describes as 'very on brand.' The B closes, the targets triple, and the board adds a partner who says 'velocity' as a complete sentence.",
          effect: { netWorth: 50_000, burnout: 20 },
          next: "y12-warpath",
        },
      },
      {
        id: "secondary-in-round",
        label: "Take the B — but carve out a fat secondary for yourself",
        outcome: {
          text:
            "You sign the Series B and quietly sell 15% of your stake into the round. The empire dream stays alive AND your family is set no matter what happens. The VCs call it 'taking chips off the table.' You call it sleeping at night.",
          effect: { netWorth: 250_000, burnout: 10 },
          next: "y12-warpath",
        },
      },
    ],
  },

  // =========================================================================
  // YEAR 12 (age 33)
  // =========================================================================
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

  // =========================================================================
  // YEAR 13 (age 34)
  // =========================================================================
  {
    id: "y13-lastcycle",
    year: 13,
    age: 34,
    headline: "One Last Cycle",
    text:
      "The market is booming again — it does that — and the industry has one more offer for you. There's always one more offer. The kids you mentored are directors now, the tools you built are legacy, and the recruiter on the phone wasn't born when you wrote your first line of code. (Okay, he was. Barely.)",
    choices: [
      {
        id: "final-mega-grant",
        label: "Chase one final mega-grant at the hottest AI company",
        outcome: {
          text:
            "One last heist. The grant is obscene, the team is brilliant, and you're the graybeard in rooms where you were once the kid. You ship one more thing that matters and screenshot the vest schedule for your memoirs.",
          effect: { netWorth: 200_000, burnout: 25 },
          next: "y14-legacy",
        },
      },
      {
        id: "emeritus-coast",
        label: "Coast into emeritus mode — wisdom on tap, drama off",
        outcome: {
          text:
            "You become the person people book 30 minutes with before making big decisions. Half your job is telling people their 'novel architecture' was tried in 2019, kindly. It's the easiest money and the best reviews of your career.",
          effect: { netWorth: 90_000, burnout: -5 },
          next: "y14-legacy",
        },
      },
      {
        id: "health-wakeup",
        label: "The doctor said 'slow down.' Actually listen this time",
        outcome: {
          text:
            "The bloodwork was a warning shot. You hire a trainer, learn to cook, take the sabbatical you've deferred for a decade, and discover your resting heart rate had opinions about your career this whole time. The industry will wait. It always does.",
          effect: { netWorth: 40_000, burnout: -25 },
          next: "y14-legacy",
        },
      },
    ],
  },
  {
    id: "y13-endgame-founder",
    year: 13,
    age: 34,
    headline: "The Endgame Board Meeting",
    text:
      "The bankers' deck says the window is open: IPO markets are hot, and two strategic acquirers are circling with intent. Inside the boardroom, a third conversation is happening in glances — a faction thinks the next phase needs 'a different kind of CEO.' Everything is on the table, including your chair.",
    choices: [
      {
        id: "file-ipo",
        label: "File to go public. Ring the bell or die trying",
        outcome: {
          text:
            "The S-1 drops and your company's finances become the internet's business. Roadshow: 11 cities, 60 pitches, one suit purchased under duress. Pricing night, you stand in a hotel room holding a number that used to be a dream.",
          effect: { netWorth: 100_000, burnout: 25 },
          next: "y14-finalact",
        },
      },
      {
        id: "sell-to-bidder",
        label: "Start the bidding war. Sell at the top",
        outcome: {
          text:
            "You run the auction like a product launch and the strategics bid like it's the last company on Earth. The final number has a comma count that breaks group chats. You sign, you wire, you walk out of the building you built — extremely, permanently rich.",
          effect: { netWorth: 1_500_000, burnout: 10, title: "Exited Founder" },
          ending: "retired",
        },
      },
      {
        id: "board-coup",
        label: "▶ The board wants you out — watch a short video to rally your allies",
        requiresAd: true,
        outcome: {
          text:
            "You spend one furious weekend on the phone: early investors, loyal executives, the independent director who owes you the truth. Monday's vote isn't close. The faction dissolves, its ringleader 'rotates off the board,' and your chair is yours until you decide otherwise.",
          effect: { netWorth: 150_000, burnout: 15 },
          next: "y14-finalact",
        },
        adFallback: {
          text:
            "The votes were counted before you knew there was a vote. 'The board thanks you for your vision.' You're out of the CEO chair of your own company — with a severance package sized by guilt and a non-disparagement clause you test daily at dinner parties.",
          effect: { netWorth: 400_000, burnout: 20, title: "Founder (Ousted)" },
          next: "y14-finalact",
        },
      },
    ],
  },

  // =========================================================================
  // YEAR 14 (age 35)
  // =========================================================================
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

  // =========================================================================
  // YEAR 15 (age 36) — THE FINALE
  // =========================================================================
  {
    id: "y15-laststandup",
    year: 15,
    age: 36,
    headline: "The Last Standup",
    text:
      "Fifteen years. You've survived layoffs, winters, gold rushes, reorgs, and at least one open-plan office. The loans are ancient history, the spreadsheet says what it says, and for the first time the next move is entirely, terrifyingly yours. The industry will keep spinning either way — it always does. What's it going to be?",
    choices: [
      {
        id: "actually-retire",
        label: "Log off. Actually retire — for real this time",
        outcome: {
          text:
            "You archive the Slack, donate the conference swag, and set an out-of-office that just says 'No.' The first Monday feels illegal. The tenth feels like the whole point. You made it out with your health, your money, and most of your hairline. GG.",
          effect: { burnout: -40, title: "Retired" },
          ending: "retired",
        },
      },
      {
        id: "lifer-energy",
        label: "Keep building. You love this, God help you",
        outcome: {
          text:
            "Retirement lasted one spreadsheet. The truth is you'd do this for free, and now that you effectively can, the work finally feels like play. You'll be in a design review at 70 telling children about the Great Migration™, and honestly? Respect.",
          effect: { netWorth: 100_000, burnout: 10, title: "Tech Lifer (Voluntary)" },
          ending: "retired",
        },
      },
      {
        id: "give-back",
        label: "Teach. Give the next generation your scar tissue",
        outcome: {
          text:
            "You take an adjunct gig and a mentorship roster, teaching systems design to students who will absolutely build the thing that replaces everything you made. Someone has to tell them about the winters before they meet one. It might as well be you.",
          effect: { netWorth: 20_000, burnout: -20, title: "Professor of Practice" },
          ending: "retired",
        },
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// RNG EVENTS — rolled once per year transition, max one fires per year.
// Order matters: earlier entries roll first. Keep repeatable events last.
// ---------------------------------------------------------------------------

export const RANDOM_EVENTS: RandomEvent[] = [
  {
    id: "crypto-winter",
    headline: "📉 Crypto Winter",
    text:
      "Your 'diversified portfolio' (three memecoins and an NFT of a sad ape) drops 80% overnight. You stop checking the app. The app misses you.",
    effect: { netWorth: -15_000, burnout: 5 },
    probability: 0.25,
    minYear: 2,
    once: true,
  },
  {
    id: "viral-tweet",
    headline: "🚀 Viral Moment",
    text:
      "Your shitpost about daily standups ('a meeting that could have been a meeting') goes viral. You gain 40K followers and a newsletter with actual paid subscribers.",
    effect: { netWorth: 4_000, burnout: -5 },
    probability: 0.2,
    once: true,
  },
  {
    id: "market-crash",
    headline: "📉 The Correction",
    text:
      "The market drops 25% in a month and CNBC anchors start using their serious voices. Your portfolio — RSUs, index funds, dreams — takes the haircut with it. You were told this would happen. You did not believe them.",
    effect: { netWorthPct: -0.25, burnout: 5 },
    probability: 0.12,
    minYear: 5,
    once: true,
  },
  {
    id: "everything-rally",
    headline: "📈 The Everything Rally",
    text:
      "Rates drop, earnings beat, and the entire market decides to go up and to the right for a year straight. Every dollar you didn't panic-sell quietly grows a fifth. You feel like a genius. You are a passenger.",
    effect: { netWorthPct: 0.2 },
    probability: 0.12,
    minYear: 6,
    once: true,
  },
  {
    id: "angel-payout",
    headline: "🦄 The $5K Miracle",
    text:
      "That tiny check you wrote into a college friend's startup years ago — the one you'd written off entirely — just got marked up in their unicorn round. A secondary buyer wants your shares. Your best investment was a Venmo with a rocket emoji.",
    effect: { netWorth: 120_000 },
    probability: 0.08,
    minYear: 9,
    once: true,
  },
  {
    id: "back-gives-out",
    headline: "🏥 Your Back Files a Complaint",
    text:
      "Fifteen thousand hours in a chair present their invoice: your back gives out reaching for a USB cable. Physical therapy, a standing desk, and a new appreciation for the phrase 'ergonomic intervention.' The body keeps the score, and it's been keeping yours.",
    effect: { netWorth: -8_000, burnout: 10 },
    probability: 0.1,
    minYear: 7,
    once: true,
  },
  {
    id: "surprise-reorg",
    headline: "🔀 Surprise Reorg",
    text:
      "A calendar invite titled 'Org Update' appears at 4:55 PM on a Friday. New manager, new mission statement, same job. Your promo doc resets to draft. Nobody can explain why this happened, including the people who did it.",
    effect: { burnout: 10 },
    probability: 0.1,
    minYear: 4,
  },
];

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

const scenarioIndex = new Map(SCENARIOS.map((s) => [s.id, s]));

export function getScenario(id: string): Scenario {
  const scenario = scenarioIndex.get(id);
  if (!scenario) throw new Error(`Unknown scenario id: ${id}`);
  return scenario;
}

export function clampBurnout(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function applyEffect(stats: GameStats, effect: StatEffect): GameStats {
  const pctDelta =
    effect.netWorthPct && stats.netWorth > 0
      ? Math.round(stats.netWorth * effect.netWorthPct)
      : 0;
  return {
    netWorth: stats.netWorth + (effect.netWorth ?? 0) + pctDelta,
    burnout: clampBurnout(stats.burnout + (effect.burnout ?? 0)),
    title: effect.title ?? stats.title,
  };
}

/**
 * Roll the RNG table for a year transition. Returns the first event that fires
 * (max one per year keeps the pacing tight). `rng` is injectable for tests.
 */
export function rollRandomEvent(
  year: number,
  firedEventIds: ReadonlySet<string>,
  rng: () => number = Math.random,
): RandomEvent | null {
  for (const event of RANDOM_EVENTS) {
    if (event.minYear && year < event.minYear) continue;
    if (event.once && firedEventIds.has(event.id)) continue;
    if (rng() < event.probability) return event;
  }
  return null;
}

export function ageForYear(year: number): number {
  return STARTING_AGE - 1 + year;
}

export function buildEnding(kind: EndingKind, stats: GameStats): Ending {
  if (kind === "burnout") {
    return {
      kind,
      headline: "TOTAL BURNOUT",
      achievement:
        "Melted down in a sprint retro and moved to a cabin with no Wi-Fi. The industry sends its thoughts and prayers.",
    };
  }

  // Retired — tiered by how much you escaped with.
  const nw = stats.netWorth;
  if (nw >= 5_000_000) {
    return {
      kind,
      headline: "GENERATIONAL WEALTH",
      achievement:
        "Left with the kind of money that gets a building named after you. Your grandkids' grandkids will have opinions about yachts.",
    };
  }
  if (nw >= 1_000_000) {
    return {
      kind,
      headline: "RETIRED RICH",
      achievement:
        "Cleared seven figures and logged off on your own terms. The spreadsheet says you never have to open Jira again.",
    };
  }
  if (nw >= 250_000) {
    return {
      kind,
      headline: "COMFORTABLY OUT",
      achievement:
        "Not yacht money — freedom money. Nobody can make you attend a standup ever again, and that's worth more anyway.",
    };
  }
  return {
    kind,
    headline: "OUT OF THE GAME",
    achievement:
      "Escaped with your health and your stories, if not the bag. The industry took its cut. It always does.",
  };
}

export function formatMoney(amount: number): string {
  const abs = Math.abs(amount);
  const formatted =
    abs >= 1_000_000
      ? `$${(abs / 1_000_000).toFixed(abs % 1_000_000 === 0 ? 0 : 1)}M`
      : `$${Math.round(abs / 1_000)}K`;
  return amount < 0 ? `-${formatted}` : formatted;
}
