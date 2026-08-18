import type { Scenario } from "../types";

/**
 * YEAR 1 (age 22) — the opening move.
 * Pool: y1-graduation (hub) + 4 variants. Every run starts with a random
 * pick from this pool.
 */
export const YEAR_01: Scenario[] = [
  {
    id: "y1-graduation",
    year: 1,
    age: 22,
    headline: "Graduation Day",
    text:
      "CS degree, $30K in loans, LinkedIn banner set to 'Open to Work.' Recruiters circle, your roommate has a startup, and your first real career decision is due.",
    choices: [
      {
        id: "grind-leetcode",
        label: "Grind 300 LeetCode and take Big Tech",
        outcome: {
          text:
            "Six rounds and a design-Twitter interview later: $150K TC, a badge, unlimited LaCroix. Your parents finally stop asking questions.",
          effect: { netWorth: 45_000, burnout: 15, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "join-startup",
        label: "Join your roommate's startup as #3",
        outcome: {
          text:
            "The pay is 'competitive for the stage' (it's not), but you got 1.5% and a made-up title. The office is a garage. Literally.",
          effect: { netWorth: 8_000, burnout: 10, title: "Founding Engineer" },
          next: "y2-startup-ramen",
        },
      },
      {
        id: "hold-out-quant",
        label: "Hold out for the quant fund offer",
        outcome: {
          text:
            "Three months of mental-math interviews, then the hedge fund ghosts you. You take Big Tech anyway, humbled and behind on rent.",
          effect: { netWorth: 30_000, burnout: 25, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
    ],
  },
  {
    id: "y1-career-fair",
    year: 1,
    age: 22,
    slot: "y1-graduation",
    headline: "The Career Fair Gauntlet",
    text:
      "Career fair: a defense contractor with stress balls, a YC startup that's one guy and a QR code, and a Big Tech line around the gym. Three resumes left, one future.",
    choices: [
      {
        id: "defense-stable",
        label: "Take the defense gig — clearance, peace",
        outcome: {
          text:
            "Solid pay, deadlines measured in years, code on hardware you can't describe. Friends mock the lanyard. Your landlord does not.",
          effect: { netWorth: 40_000, burnout: 5, title: "SWE I (Cleared)" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "qr-code-startup",
        label: "Scan the QR code — join the one-guy startup",
        outcome: {
          text:
            "The 'office tour' is a Discord link, but by week two you've out-shipped your senior capstone. Ramen for dinner. Again.",
          effect: { netWorth: 6_000, burnout: 10, title: "Founding Engineer" },
          next: "y2-startup-ramen",
        },
      },
      {
        id: "wait-in-line",
        label: "Wait two hours in the Big Tech line",
        outcome: {
          text:
            "Three months later you badge past a slide nobody uses, offer letter laminated by your parents. You're a statistic, and the statistic pays great.",
          effect: { netWorth: 45_000, burnout: 15, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
    ],
  },
  {
    id: "y1-grad-school-bait",
    year: 1,
    age: 22,
    slot: "y1-graduation",
    headline: "The PhD Temptation",
    text:
      "Your professor slides over a funded PhD: 'five years, a stipend, the life of the mind.' Your inbox holds a Big Tech offer worth six stipends. Your roommate is already incorporated in Delaware.",
    choices: [
      {
        id: "phd-one-semester",
        label: "Accept the PhD — you're a scholar now",
        outcome:{
          text:
            "One semester of reviewing papers at 2 AM for free, then you master out and take the industry offer. The 'PhD (dropped)' story always lands in interviews.",
          effect: { netWorth: 25_000, burnout: 20, title: "Junior SWE (Recovering Academic)" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "industry-now",
        label: "Take the money — academia stays broke",
        outcome: {
          text:
            "You sign Big Tech and frame the rejection email. Your first paycheck beats the annual stipend. You donate to the lab's coffee fund out of guilt.",
          effect: { netWorth: 45_000, burnout: 10, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "research-startup",
        label: "Split it — join a research-y startup",
        outcome: {
          text:
            "A lab spinout with a PhD CTO and nine months of runway. Papers by day, prod incidents by night. Both worlds, both sets of problems.",
          effect: { netWorth: 10_000, burnout: 15, title: "Research Engineer" },
          next: "y2-startup-ramen",
        },
      },
    ],
  },
  {
    id: "y1-hometown-vs-valley",
    year: 1,
    age: 22,
    slot: "y1-graduation",
    headline: "Hometown or the Valley",
    text:
      "Same company, two offers: SF HQ where 'everything happens,' or remote from your hometown where rent is a rounding error. Your mom has opinions. Your bank account has $412.",
    choices: [
      {
        id: "move-to-sf",
        label: "Move to SF — be where the action is",
        outcome: {
          text:
            "Your $3,400 studio shares a wall with a startup that pivots audibly. But every coffee line is networking, and your career compounds at Valley speed.",
          effect: { netWorth: 35_000, burnout: 15, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "remote-hometown",
        label: "Stay home — same salary, one-fifth rent",
        outcome: {
          text:
            "Coastal salary, hometown prices: you're minor nobility now. The FOMO is real, but so is your savings rate, and the savings rate is winning.",
          effect: { netWorth: 50_000, burnout: 5, title: "Junior SWE (Remote)" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "cousins-agency",
        label: "Join your cousin's dev agency instead",
        outcome: {
          text:
            "Five clients, no process, and you're 'CTO' by month three because only you know Git. Chaos with a paycheck, and a year of forced learning.",
          effect: { netWorth: 15_000, burnout: 10, title: "Agency 'CTO'" },
          next: "y2-startup-ramen",
        },
      },
    ],
  },
  {
    id: "y1-exploding-offer",
    year: 1,
    age: 22,
    slot: "y1-graduation",
    headline: "The Exploding Offer",
    text:
      "Big Tech gives you 72 hours before the offer 'explodes' — while your dream startup is still 'finalizing budget.' The countdown timer in the email is animated. On purpose.",
    choices: [
      {
        id: "sign-now",
        label: "Sign before it explodes. A bird in hand",
        outcome: {
          text:
            "You sign with 51 hours to spare. The startup's offer arrives a week later — lower anyway. Sometimes the boring choice is just correct.",
          effect: { netWorth: 45_000, burnout: 10, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "call-the-bluff",
        label: "Call the bluff — deadlines fear questions",
        outcome: {
          text:
            "'I need two weeks,' you write, hands shaking. The offer quietly gains two weeks and $10K. Negotiation is just refusing to panic.",
          effect: { netWorth: 55_000, burnout: 20, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "let-it-explode",
        label: "Let it explode — no countdown companies",
        outcome: {
          text:
            "The timer hits zero and you feel free. The startup delivers real equity and a founder who texts back. The universe notes your risk tolerance.",
          effect: { netWorth: 8_000, burnout: 10, title: "Founding Engineer" },
          next: "y2-startup-ramen",
        },
      },
    ],
  },
  {
    id: "y1-stealth-lottery",
    year: 1,
    age: 22,
    slot: "y1-graduation",
    headline: "The Stealth Startup Lottery",
    text:
      "Your old TA is employee #0 at a stealth startup with 'a founder you'd recognize' and wants you as #1. Equity: enormous. Information: zero. Your signed Big Tech offer sits in your inbox, being legible.",
    choices: [
      {
        id: "take-legible-offer",
        label: "Take Big Tech — you can read every line",
        outcome: {
          text:
            "You pick the known quantity and collect RSUs like an adult. The stealth startup deletes its landing page in eight months. Or pivots. You'll never know.",
          effect: { netWorth: 45_000, burnout: 10, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "buy-the-ticket",
        label: "Join stealth — buy the lottery ticket",
        gamble: [
          {
            chance: 0.15,
            label: "Real deal — famous founder, huge round",
            text:
              "The veil drops: nine-figure-exit founder, oversubscribed seed. You're #1 at the hottest unknown company, and your friends' RSUs now look like arcade tokens.",
            effect: { netWorth: 70_000, burnout: 10, title: "Employee #1 (Golden Ticket)" },
            next: "y2-startup-ramen",
          },
          {
            chance: 0.85,
            label: "It's three guys and a pitch deck",
            text:
              "The 'famous founder' is famous on LinkedIn. The product is a Figma file. You're broke by spring — but you shipped an MVP solo, and that story is interview gold.",
            effect: { netWorth: 2_000, burnout: 15, title: "Founding Engineer" },
            next: "y2-startup-ramen",
          },
        ],
      },
    ],
  },
  {
    id: "y1-negotiation-gamble",
    year: 1,
    age: 22,
    slot: "y1-graduation",
    headline: "Negotiate or Fold",
    text:
      "The 'final' offer is $15K under market. Every guide says counter; every anxiety neuron says they'll pull it. Companies almost never rescind. Almost.",
    choices: [
      {
        id: "sign-as-is",
        label: "Sign as offered — a sure thing",
        outcome: {
          text:
            "You sign in four minutes and sleep beautifully. You'll never know what the counter would've gotten — which is its own peace. The cheap kind, but real.",
          effect: { netWorth: 40_000, burnout: 5, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "counter-hard",
        label: "Counter $20K over with comps attached",
        gamble: [
          {
            chance: 0.7,
            label: "They come up — base + signing bonus",
            text:
              "Twenty-four sweaty hours later: 'we got approval.' Better base, signing bonus, and proof the first number was never real. You'll negotiate everything now.",
            effect: { netWorth: 58_000, burnout: 10, title: "Junior SWE @ Big Tech" },
            next: "y2-bigtech-oncall",
          },
          {
            chance: 0.3,
            label: "Rescinded — 'moving forward with others'",
            text:
              "You drew the one manager who takes counters personally; the offer dies in two lines. The startup gets a very motivated yes by Friday.",
            effect: { netWorth: 5_000, burnout: 20, title: "Founding Engineer" },
            next: "y2-startup-ramen",
          },
        ],
      },
    ],
  },
  {
    id: "y1-thanksgiving-referral",
    year: 1,
    age: 22,
    slot: "y1-graduation",
    headline: "The Thanksgiving Referral",
    text:
      "Your uncle announces at Thanksgiving that his golf buddy 'basically runs' a trillion-dollar tech company and can 'walk your resume right in.' The family stares over the stuffing. Golden ticket or bit?",
    choices: [
      {
        id: "apply-cold",
        label: "Thank him, apply through the portal",
        outcome: {
          text:
            "You grind the standard loop and the offer lands on your own merits, which matters to exactly you. Your uncle takes full credit at Christmas anyway. Let him.",
          effect: { netWorth: 40_000, burnout: 15, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "use-the-uncle",
        label: "Take the uncle referral — what's the worst",
        gamble: [
          {
            chance: 0.5,
            label: "Golf buddy is real — skip half the loop",
            text:
              "The golf buddy is a real director with a real inbox. Your loop shrinks to three rounds and you start two months early. Nepotism-adjacent, extremely effective.",
            effect: { netWorth: 50_000, burnout: 5, title: "Junior SWE @ Big Tech" },
            next: "y2-bigtech-oncall",
          },
          {
            chance: 0.5,
            label: "He retired in 2019 — months lost",
            text:
              "The 'referral' is a forwarded email to a dead inbox. Three months lost before applying cold. The offer still comes — later, leaner, with a story about family.",
            effect: { netWorth: 20_000, burnout: 15, title: "Junior SWE @ Big Tech" },
            next: "y2-bigtech-oncall",
          },
        ],
      },
      {
        id: "startup-instead",
        label: "Skip the circus — take the startup's yes",
        outcome: {
          text:
            "While the family debates etiquette, you sign with the startup that hired you without a whiteboard. Your uncle tells everyone you work 'in crypto.' Close enough.",
          effect: { netWorth: 8_000, burnout: 10, title: "Founding Engineer" },
          next: "y2-startup-ramen",
        },
      },
    ],
  },
];
