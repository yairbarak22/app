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
];
