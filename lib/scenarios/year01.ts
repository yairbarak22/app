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
  {
    id: "y1-career-fair",
    year: 1,
    age: 22,
    slot: "y1-graduation",
    headline: "The Career Fair Gauntlet",
    text:
      "Senior year career fair: a defense contractor with a fishbowl of stress balls, a YC startup whose booth is one guy and a QR code, and a Big Tech recruiter with a line around the gym. You have three resumes left and one future.",
    choices: [
      {
        id: "defense-stable",
        label: "Take the defense contractor gig — clearance, pension, peace",
        outcome: {
          text:
            "The pay is solid, the deadlines are measured in years, and your code ships on hardware you're not allowed to describe. Your college friends mock the badge lanyard. Your landlord does not.",
          effect: { netWorth: 40_000, burnout: 5, title: "SWE I (Cleared)" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "qr-code-startup",
        label: "Scan the QR code — join the one-guy startup",
        outcome: {
          text:
            "The 'office tour' is a Discord link. But the founder is weirdly compelling, the equity is real, and by week two you've shipped more than your entire senior capstone. Ramen for dinner. Again.",
          effect: { netWorth: 6_000, burnout: 10, title: "Founding Engineer" },
          next: "y2-startup-ramen",
        },
      },
      {
        id: "wait-in-line",
        label: "Wait two hours in the Big Tech line like everyone else",
        outcome: {
          text:
            "The line was worth it. Three months later you're badging into a building with a slide nobody uses, holding an offer letter your parents laminated. You are a statistic, and the statistic pays great.",
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
      "Your favorite professor slides a funded PhD offer across the desk: 'Five years, a stipend, and the life of the mind.' Meanwhile your inbox holds a Big Tech offer worth six times the stipend, and your roommate is already incorporated in Delaware.",
    choices: [
      {
        id: "phd-one-semester",
        label: "Accept the PhD — you're a scholar now",
        outcome:{
          text:
            "One semester in, you realize 'the life of the mind' means reviewing papers at 2 AM for free. You master out, take the industry offer, and keep the 'PhD (dropped)' story for interviews. It weirdly always lands.",
          effect: { netWorth: 25_000, burnout: 20, title: "Junior SWE (Recovering Academic)" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "industry-now",
        label: "Take the money — academia will still be broke later",
        outcome: {
          text:
            "You sign the Big Tech offer and frame the professor's rejection email next to your diploma. Your first paycheck exceeds the annual stipend. You donate to the lab's coffee fund out of guilt.",
          effect: { netWorth: 45_000, burnout: 10, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "research-startup",
        label: "Split the difference — join a research-y startup",
        outcome: {
          text:
            "You find a seed-stage company spun out of a lab, where the CTO has a PhD and the runway has nine months. Papers by day, prod incidents by night. Both worlds. Both sets of problems.",
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
      "Two offers, same company: San Francisco HQ where 'everything happens,' or fully remote from your hometown where rent is a rounding error. Your group chat is split. Your mom has opinions. Your bank account has $412.",
    choices: [
      {
        id: "move-to-sf",
        label: "Move to SF — be where the action is",
        outcome: {
          text:
            "Your studio costs $3,400 and shares a wall with a startup that pivots audibly. But the serendipity is real: every coffee line is a networking event, and your career compounds at Valley speed.",
          effect: { netWorth: 35_000, burnout: 15, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "remote-hometown",
        label: "Stay home — same salary, one-fifth the rent",
        outcome: {
          text:
            "You bank the coastal salary in a town where it makes you minor nobility. Your commute is a hallway. The FOMO is real but so is your savings rate, and your savings rate is winning.",
          effect: { netWorth: 50_000, burnout: 5, title: "Junior SWE (Remote)" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "cousins-agency",
        label: "Join your cousin's scrappy dev agency instead",
        outcome: {
          text:
            "Five clients, no process, and you're 'CTO' by month three because you're the only one who knows Git. It's chaos with a paycheck. You learn more in a year than any onboarding could teach.",
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
      "A Big Tech recruiter gives you 72 hours to sign before the offer 'explodes' — while a startup you loved is still 'finalizing budget.' The countdown timer in the email is animated. Someone designed that on purpose.",
    choices: [
      {
        id: "sign-now",
        label: "Sign before it explodes. A bird in hand",
        outcome: {
          text:
            "You sign with 51 hours to spare and sleep like a baby. The startup emails their offer a week later — lower anyway. Sometimes the boring choice is just correct, no matter what Twitter says.",
          effect: { netWorth: 45_000, burnout: 10, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "call-the-bluff",
        label: "Call the bluff — no real deadline survives a counter-question",
        outcome: {
          text:
            "'I need two weeks to compare offers,' you write, hands shaking. The 'exploding' offer quietly gains two weeks and $10K. You learn the most valuable engineering skill of all: negotiation is just refusing to panic.",
          effect: { netWorth: 55_000, burnout: 20, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "let-it-explode",
        label: "Let it explode. You didn't want a company that does countdowns",
        outcome: {
          text:
            "The timer hits zero, the offer dies, and you feel free. The startup comes through with real equity and a founder who answers your texts. Your risk tolerance has been noted by the universe.",
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
      "Your favorite TA from junior year calls: she's employee #0 at a stealth startup with 'a founder you'd recognize' and wants you as employee #1. She can't say what it does. The equity is enormous. The information is zero. Meanwhile, a signed Big Tech offer sits in your inbox, being extremely legible.",
    choices: [
      {
        id: "take-legible-offer",
        label: "Take the Big Tech offer — you can read every line of it",
        outcome: {
          text:
            "You choose the known quantity and start collecting RSUs like a sensible adult. The stealth startup deletes its landing page eight months later. Or was that a pivot? You'll never know, and that's fine.",
          effect: { netWorth: 45_000, burnout: 10, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "buy-the-ticket",
        label: "Join the stealth startup — buy the lottery ticket",
        gamble: [
          {
            chance: 0.15,
            label: "It's the real thing — founder is famous, funding is huge",
            text:
              "The stealth veil drops: the founder sold his last company for nine figures, and the seed round was oversubscribed before you signed. You're employee #1 at the hottest company nobody's heard of yet, with equity that makes your friends' RSUs look like arcade tokens.",
            effect: { netWorth: 70_000, burnout: 10, title: "Employee #1 (Golden Ticket)" },
            next: "y2-startup-ramen",
          },
          {
            chance: 0.85,
            label: "It's three guys and a pitch deck",
            text:
              "The 'founder you'd recognize' is recognizable mainly from LinkedIn engagement bait. The product is a Figma file. You're broke by spring — but you shipped an MVP solo, and that story is weirdly gold in every interview after.",
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
      "The recruiter's 'final' offer is $15K under what the salary sites say your role pays. Every negotiation guide says counter. Every anxiety neuron says they'll pull the offer and you'll die broke. The recruiter is waiting. Statistically, companies almost never rescind. Almost.",
    choices: [
      {
        id: "sign-as-is",
        label: "Sign as offered — a sure thing is a sure thing",
        outcome: {
          text:
            "You sign in four minutes and sleep beautifully. You'll never know what the counter would have gotten you, which is its own kind of peace — the cheap kind, but real.",
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
            label: "They come up — better base plus a signing bonus",
            text:
              "Twenty-four sweaty hours later: 'Great news — we got approval.' A better base, a signing bonus, and the life-changing discovery that the first number was never the real number. You will negotiate everything forever now.",
            effect: { netWorth: 58_000, burnout: 10, title: "Junior SWE @ Big Tech" },
            next: "y2-bigtech-oncall",
          },
          {
            chance: 0.3,
            label: "Offer rescinded — 'we've decided to move forward with other candidates'",
            text:
              "You drew the one hiring manager on Earth who takes counters personally. The offer evaporates in a two-line email. The startup that's been courting you gets a very motivated yes by Friday — and honestly, their equity might age better than your dignity did this week.",
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
      "Your uncle — who calls every laptop a 'MacBook' regardless of brand — announces at Thanksgiving that his golf buddy is 'basically running' a trillion-dollar tech company and can 'walk your resume right in.' The family stares at you expectantly over the stuffing. The referral is either a golden ticket or a bit.",
    choices: [
      {
        id: "apply-cold",
        label: "Thank him warmly, apply through the portal like everyone",
        outcome: {
          text:
            "You grind the standard loop: recruiter screen, five rounds, one take-home. The offer lands on your own merits, which matters to exactly you. Your uncle takes full credit at Christmas anyway. Let him.",
          effect: { netWorth: 40_000, burnout: 15, title: "Junior SWE @ Big Tech" },
          next: "y2-bigtech-oncall",
        },
      },
      {
        id: "use-the-uncle",
        label: "Take the uncle referral — what's the worst that happens",
        gamble: [
          {
            chance: 0.5,
            label: "Golf buddy is real — you skip half the loop",
            text:
              "Shockingly, the golf buddy is a real director who really answers real emails. Your resume skips the pile, the loop shrinks to three rounds, and you start two months before your cohort. Nepotism-adjacent? Sure. Effective? Extremely.",
            effect: { netWorth: 50_000, burnout: 5, title: "Junior SWE @ Big Tech" },
            next: "y2-bigtech-oncall",
          },
          {
            chance: 0.5,
            label: "Golf buddy retired in 2019 — months lost waiting",
            text:
              "The 'referral' turns out to be a forwarded email to a retiree's dead inbox. You waited three months on it before applying cold like you should have in September. The offer still comes — later, leaner, and with an unbeatable story about managing family expectations.",
            effect: { netWorth: 20_000, burnout: 15, title: "Junior SWE @ Big Tech" },
            next: "y2-bigtech-oncall",
          },
        ],
      },
      {
        id: "startup-instead",
        label: "Skip the whole circus — join the startup that already said yes",
        outcome: {
          text:
            "While the family debates referral etiquette, you sign with the seed-stage startup that made an offer without a single whiteboard puzzle. Your uncle tells everyone you work 'in crypto.' Close enough.",
          effect: { netWorth: 8_000, burnout: 10, title: "Founding Engineer" },
          next: "y2-startup-ramen",
        },
      },
    ],
  },
];
