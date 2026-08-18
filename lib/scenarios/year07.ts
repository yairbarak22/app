import type { Scenario } from "../types";

/**
 * YEAR 7 (age 28) — the thaw and the AI gold rush.
 * Pools: y7-ai-goldrush (+2), y7-comeback (+2), y7-survivor (+2),
 *        y7-founder-grind (+2).
 */
export const YEAR_07: Scenario[] = [
  // ---------------------------------------------------------------- Gold rush
  {
    id: "y7-ai-goldrush",
    year: 7,
    age: 28,
    headline: "The AI Gold Rush",
    text:
      "A chatbot passed the bar exam and the winter thawed overnight. Every company is an AI company now, and the recruiters are back with a new word: 'agentic.'",
    choices: [
      {
        id: "rebrand-ai",
        label: "Rebrand as an AI Engineer, ride the wave",
        outcome: {
          text:
            "Three papers, one fine-tune, one new LinkedIn headline. You're now paid a premium to explain why the demo worked and production didn't.",
          effect: { netWorth: 110_000, burnout: 15, title: "AI Engineer" },
          next: "y8-goldencage",
        },
      },
      {
        id: "boring-infra",
        label: "Stay skeptical — keep the systems alive",
        outcome: {
          text:
            "While everyone chases hype, you quietly cut the GPU bill 40%. No keynotes, just a performance review that reads like a love letter.",
          effect: { netWorth: 75_000, burnout: 5 },
          next: "y8-goldencage",
        },
      },
      {
        id: "frontier-lab",
        label: "Take the frontier lab offer",
        outcome: {
          text:
            "Comp you screenshot, a mission about the fate of humanity, and a new coworker who doesn't believe in weekends. The bar is the sky.",
          effect: { netWorth: 160_000, burnout: 30, title: "Member of Technical Staff" },
          next: "y8-frontierlab",
        },
      },
    ],
  },
  {
    id: "y7-prompt-title-wars",
    year: 7,
    age: 28,
    slot: "y7-ai-goldrush",
    headline: "The Prompt Engineer Leak",
    text:
      "A comp leak: the new 'AI Prompt Engineers' earn double your salary. One of them asked you yesterday what a database index is.",
    choices: [
      {
        id: "retitle-yourself",
        label: "If you can't beat the title, take it",
        outcome: {
          text:
            "You transfer to the AI org and accept the comp band with a straight face. Same skills, new label, double pay.",
          effect: { netWorth: 95_000, burnout: 10, title: "AI Engineer (Rebranded)" },
          next: "y8-goldencage",
        },
      },
      {
        id: "comp-crusade",
        label: "Take the leak to leadership",
        outcome: {
          text:
            "You turn the rage into spreadsheets and the bands converge upward. Half the org owes you a raise they'll never know about.",
          effect: { netWorth: 70_000, burnout: 15 },
          next: "y8-goldencage",
        },
      },
      {
        id: "quietly-both",
        label: "Say nothing, learn everything",
        outcome: {
          text:
            "You learn to speak both systems and prompts. Within a year the 'prompt engineer' title dies, and the bilinguals inherit everything.",
          effect: { netWorth: 100_000, burnout: 15, title: "AI Systems Engineer" },
          next: "y8-frontierlab",
        },
      },
    ],
  },
  {
    id: "y7-ethics-council",
    year: 7,
    age: 28,
    slot: "y7-ai-goldrush",
    headline: "The AI Ethics Council",
    text:
      "The company forms an 'AI Responsibility Council' and volunteers your name for you. It has a charter, a Slack channel, and zero veto power.",
    choices: [
      {
        id: "take-it-seriously",
        label: "Make the rubber stamp grow teeth",
        outcome: {
          text:
            "You block one genuinely bad launch and absorb the fury of three PMs. 'Responsible AI' now means a thing you personally enforce.",
          effect: { netWorth: 70_000, burnout: 15, title: "Senior Eng, AI Governance" },
          next: "y8-goldencage",
        },
      },
      {
        id: "rubber-stamp",
        label: "Attend, nod, approve — it's a checkbox",
        outcome: {
          text:
            "Months later a launch goes sideways and the postmortem quotes your approval. Rubber stamps, it turns out, hold fingerprints.",
          effect: { netWorth: 85_000, burnout: 10 },
          next: "y8-goldencage",
        },
      },
      {
        id: "leverage-the-seat",
        label: "Use the seat as a periscope",
        outcome: {
          text:
            "Review meetings show you every launch a quarter early, so you place yourself on the winners before they're announced.",
          effect: { netWorth: 80_000, burnout: 15 },
          next: "y8-frontierlab",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Comeback
  {
    id: "y7-comeback",
    year: 7,
    age: 28,
    headline: "The Comeback Tour",
    text:
      "The market is thawing but the scars are fresh. Every recruiter call starts with 'walk me through the gap.' You need a move, not a job.",
    choices: [
      {
        id: "stable-landing",
        label: "Take the unglamorous offer and rebuild",
        outcome: {
          text:
            "A profitable company hires you in three rounds like a functioning adult business. Your heart rate returns to resting.",
          effect: { netWorth: 45_000, burnout: 10, title: "Senior SWE (Rebuilt)" },
          next: "y8-goldencage",
        },
      },
      {
        id: "fractional-cto",
        label: "Go fractional CTO across three startups",
        outcome: {
          text:
            "You invoice like a law firm and context-switch like a browser with 90 tabs. The money is great; 'boundaries' is aspirational.",
          effect: { netWorth: 60_000, burnout: 20, title: "Fractional CTO" },
          next: "y8-goldencage",
        },
      },
      {
        id: "austin-remote",
        label: "Go remote, buy a yard, log off at 5",
        outcome: {
          text:
            "80% of the money for 50% of the cortisol. You buy a smoker and develop opinions about brisket. Life is suspiciously okay.",
          effect: { netWorth: 30_000, burnout: -15, title: "Senior SWE (Remote, Rested)" },
          next: "y8-goldencage",
        },
      },
    ],
  },
  {
    id: "y7-referral-mafia",
    year: 7,
    age: 28,
    slot: "y7-comeback",
    headline: "The Alumni Mafia",
    text:
      "Your laid-off cohort became a referral machine — a Discord trading intros and offer numbers like a union with better memes. Three warm doors are open.",
    choices: [
      {
        id: "call-every-favor",
        label: "Work the network shamelessly",
        outcome: {
          text:
            "Two intros and one rigged mock later, you land a role you'd never have cold-applied to. You owe the mafia now — gladly, forever.",
          effect: { netWorth: 55_000, burnout: 10, title: "Senior SWE (Networked In)" },
          next: "y8-goldencage",
        },
      },
      {
        id: "cold-apply-pride",
        label: "Refuse charity — take the front door",
        outcome: {
          text:
            "You grind the open market and land 15% worse than the referral would have. The Discord calls you 'the artisanal one.'",
          effect: { netWorth: 40_000, burnout: 20, title: "Senior SWE (Front Door)" },
          next: "y8-goldencage",
        },
      },
      {
        id: "join-alumni-startup",
        label: "Join the startup three alumni founded",
        outcome: {
          text:
            "The band reunites, seeded by a fund that bets on 'proven teams with grudges.' You like these people — that's most of the job.",
          effect: { netWorth: 45_000, burnout: 15, title: "Founding Eng (The Reunion)" },
          next: "y8-goldencage",
        },
      },
    ],
  },
  {
    id: "y7-pm-temptation",
    year: 7,
    age: 28,
    slot: "y7-comeback",
    headline: "The PM Temptation",
    text:
      "Three recruiters in one week suggest the same plot twist: 'Have you considered product?' You'd trade the pager for stakeholder feelings — which also page.",
    choices: [
      {
        id: "go-pm",
        label: "Take the PM role — no pager",
        outcome: {
          text:
            "PM is engineering with worse tools and better lunches. The engineers trust you, which turns out to be the entire job.",
          effect: { netWorth: 50_000, burnout: 10, title: "Senior Product Manager" },
          next: "y8-goldencage",
        },
      },
      {
        id: "double-down-eng",
        label: "Double down — depth is the moat",
        outcome: {
          text:
            "You decline the identity crisis and go deep on distributed systems. When the market recovers, scarce is what's paid.",
          effect: { netWorth: 45_000, burnout: 15, title: "Senior SWE (Deep End)" },
          next: "y8-goldencage",
        },
      },
      {
        id: "devrel-detour",
        label: "Split the difference — go devrel",
        outcome: {
          text:
            "Code half the week, conference talks the other half. 'What do you actually do' becomes your hardest technical question.",
          effect: { netWorth: 40_000, burnout: -5, title: "Developer Advocate" },
          next: "y8-goldencage",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Survivor
  {
    id: "y7-survivor",
    year: 7,
    age: 28,
    headline: "Survivor's Guilt",
    text:
      "The layoffs stopped — there's no one left to lay off. You run eleven engineers, four time zones, and a roadmap written by someone who no longer works here.",
    choices: [
      {
        id: "rebuild-lean",
        label: "Rebuild lean, become indispensable",
        outcome: {
          text:
            "You cut the roadmap to three things, mercy-delete half the microservices, and ship what customers wanted. The board learns your name.",
          effect: { netWorth: 50_000, burnout: 20, title: "VP of Engineering" },
          next: "y8-acquisition",
        },
      },
      {
        id: "retention-and-hunt",
        label: "Collect retention, quietly interview out",
        outcome: {
          text:
            "Big Tech takes you back at Staff level — 'kept a startup alive with duct tape' is the best packet material ever written.",
          effect: { netWorth: 65_000, burnout: 5, title: "Staff SWE @ Big Tech" },
          achievement: "big-bonus",
          next: "y8-goldencage",
        },
      },
      {
        id: "push-to-sell",
        label: "Push the CEO to sell while he can",
        outcome: {
          text:
            "You walk him through the spreadsheet like a eulogy. Bankers get hired, and your equity might mean something after all.",
          effect: { netWorth: 35_000, burnout: 15 },
          next: "y8-acquisition",
        },
      },
    ],
  },
  {
    id: "y7-new-cto-above",
    year: 7,
    age: 28,
    slot: "y7-survivor",
    headline: "The Adult the Board Ordered",
    text:
      "The board's condition for the bridge round: a new CTO, twenty years your senior, 'to add experience.' His last three companies became org charts shaped like his opinions.",
    choices: [
      {
        id: "ally-with-cto",
        label: "Become his right hand, absorb it all",
        outcome: {
          text:
            "He teaches you board management, pricing wars, when to sandbag a forecast. His retirement letter is one line: 'Hire them before I do.'",
          effect: { netWorth: 50_000, burnout: 10, title: "VP Eng (Heir Apparent)" },
          next: "y8-acquisition",
        },
      },
      {
        id: "outshine-him",
        label: "Compete — the org follows you anyway",
        outcome: {
          text:
            "You out-ship him for three quarters until he leaves 'for a bigger opportunity.' Expensive way to learn you didn't need permission.",
          effect: { netWorth: 55_000, burnout: 25, title: "CTO (By Attrition)" },
          next: "y8-acquisition",
        },
      },
      {
        id: "take-payout-leave",
        label: "Cash the retention and exit up",
        outcome: {
          text:
            "A board that hires above you has told you the ceiling's height. You hand over a clean org and take Staff at Big Tech. Just arithmetic.",
          effect: { netWorth: 45_000, burnout: 5, title: "Staff SWE @ Big Tech" },
          next: "y8-goldencage",
        },
      },
    ],
  },
  {
    id: "y7-rehire-dilemma",
    year: 7,
    age: 28,
    slot: "y7-survivor",
    headline: "The Boomerang Question",
    text:
      "The freeze lifts: three headcount, a mountain of work, and DMs full of the people you laid off eight months ago. HR suggests 'fresh perspectives.' Your guilt disagrees.",
    choices: [
      {
        id: "rehire-the-best",
        label: "Rehire the laid-off — with raises",
        outcome: {
          text:
            "Three boomerangs return at corrected salaries and onboard in a day. The message lands: people here get treated like people, with interest.",
          effect: { netWorth: 40_000, burnout: 10 },
          next: "y8-acquisition",
        },
      },
      {
        id: "fresh-blood",
        label: "Hire new DNA, not reruns",
        outcome: {
          text:
            "Three outsiders ask 'why is it built this way' until the org answers. One boomerang sends nothing back, which is also an answer.",
          effect: { netWorth: 45_000, burnout: 15 },
          next: "y8-acquisition",
        },
      },
      {
        id: "hybrid-bench",
        label: "One boomerang, one grad, one wildcard",
        outcome: {
          text:
            "Experience, energy, and an aerospace switcher who refactors like she's stress-testing a wing. Diversification: not just for RSUs.",
          effect: { netWorth: 35_000, burnout: 5 },
          next: "y8-acquisition",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Founder grind
  {
    id: "y7-founder-grind",
    year: 7,
    age: 28,
    headline: "Ramen, Round Two",
    text:
      "The company survived the winter: alive, lean, slightly feral. Half your competitors are dead, and their customers are wandering the wasteland with budgets.",
    choices: [
      {
        id: "whale-customer",
        label: "Hunt the whale enterprise customer",
        outcome: {
          text:
            "Nine months of security reviews and one steak dinner of regrettable promises later, the contract is seven figures. The logo sells for you now.",
          effect: { netWorth: 70_000, burnout: 20 },
          next: "y8-seriesa",
        },
      },
      {
        id: "bali-remote",
        label: "Run it remote from Bali, cut burn",
        outcome: {
          text:
            "You run the company from a rice-paddy view and burn less than your old rent. Investors call it a phase. Your cortisol disagrees.",
          effect: { netWorth: 15_000, burnout: -15 },
          next: "y8-seriesa",
        },
      },
      {
        id: "merge-competitor",
        label: "Merge with the last competitor standing",
        outcome: {
          text:
            "Two half-dead companies duct-taped into one whole one. It costs three friendships, but the revenue chart finally points the right way.",
          effect: { netWorth: 35_000, burnout: 15, title: "Co-CEO (It's Complicated)" },
          next: "y8-seriesa",
        },
      },
    ],
  },
  {
    id: "y7-bigco-clone",
    year: 7,
    age: 28,
    slot: "y7-founder-grind",
    headline: "The Giant Clones You",
    text:
      "A trillion-dollar company keynotes a feature that is your entire product, down to the onboarding copy. Investors text 'thoughts?' Your traffic doubles.",
    choices: [
      {
        id: "outrun-them",
        label: "Outrun them — ship weekly",
        outcome: {
          text:
            "Their version needs six teams and an alignment offsite per feature; yours needs a Tuesday. A year later theirs is 'in maintenance mode.'",
          effect: { netWorth: 40_000, burnout: 25 },
          next: "y8-seriesa",
        },
      },
      {
        id: "niche-harder",
        label: "Niche down where giants won't bother",
        outcome: {
          text:
            "You take the regulated, ugly, lucrative corners. The giant keeps the tourists; you keep the professionals with budgets.",
          effect: { netWorth: 50_000, burnout: 10 },
          next: "y8-seriesa",
        },
      },
      {
        id: "they-copied-us",
        label: "Write the 'they copied us' thread",
        outcome: {
          text:
            "Aggrieved-but-classy screenshots do eight figures of impressions. Being wronged, correctly narrated, is marketing.",
          effect: { netWorth: 60_000, burnout: 15 },
          next: "y8-seriesa",
        },
      },
    ],
  },
  {
    id: "y7-first-profit",
    year: 7,
    age: 28,
    slot: "y7-founder-grind",
    headline: "Accidentally Profitable",
    text:
      "Your bookkeeper confirms the impossible: last quarter you made actual profit, in a winter, by accident. The VCs who ghosted you are 'circling back.'",
    choices: [
      {
        id: "raise-on-strength",
        label: "Raise now, on your terms",
        outcome: {
          text:
            "Profitable founders write their own term sheets. You raise clean from the one fund that answered emails in the winter; the rest get a memoir screenshot.",
          effect: { netWorth: 30_000, burnout: 10 },
          next: "y8-seriesa",
        },
      },
      {
        id: "default-alive-forever",
        label: "Stay default alive — profit is the plan",
        outcome: {
          text:
            "You frame the P&L above your desk and compound without dilution. The VCs call it 'lifestyle.' Your accountant calls it 'rare.'",
          effect: { netWorth: 45_000, burnout: 5, title: "Founder (Default Alive)" },
          next: "y8-seriesa",
        },
      },
      {
        id: "splurge-on-growth",
        label: "Reinvest everything into growth",
        outcome: {
          text:
            "Two salespeople and a marketing dial turned to 'measurable.' The P&L dips back to red — the intentional kind. Profit was proof; growth is the plan.",
          effect: { netWorth: -20_000, burnout: 20 },
          next: "y8-seriesa",
        },
      },
    ],
  },
  {
    id: "y7-seed-ai-jump",
    year: 7,
    age: 28,
    slot: "y7-ai-goldrush",
    headline: "The Seed-Stage Siren",
    text:
      "A two-month-old AI startup — three researchers and a demo that made you say 'oh no' out loud — offers founding engineer: half your salary, 2% equity, maybe the wave of the decade.",
    choices: [
      {
        id: "stay-ai-adjacent",
        label: "Ride the wave from the Big Tech yacht",
        outcome: {
          text:
            "You work the AI beat inside the fortress: big models, big GPUs, big paychecks. The startup's journey will be someone else's memoir. Yours has a 401(k) match.",
          effect: { netWorth: 85_000, burnout: 10 },
          next: "y8-goldencage",
        },
      },
      {
        id: "join-the-seed",
        label: "Take the surfboard — founding engineer",
        gamble: [
          {
            chance: 0.3,
            label: "Breakout — Series A at 10x",
            text:
              "The market says 'oh no' louder: a preempted Series A at 10x, your 2% suddenly worth a real house. War stories accrue daily.",
            effect: { netWorth: 120_000, burnout: 20, title: "Founding Eng (Breakout)" },
            next: "y8-goldencage",
          },
          {
            chance: 0.7,
            label: "GPU bills eat the seed round",
            text:
              "Compute burns 70% of the raise before product-market fit shows up. Half salary for a year, one incredible education, zero regrets you'll admit to.",
            effect: { netWorth: 15_000, burnout: 20 },
            next: "y8-goldencage",
          },
        ],
      },
    ],
  },
  {
    id: "y7-hub-city-bet",
    year: 7,
    age: 28,
    slot: "y7-comeback",
    headline: "The Hub Rumor",
    text:
      "A credible leak: a trillion-dollar company may open a huge hub in a cheap, sunny city. Moving there early means betting a cross-country move on a rumor.",
    choices: [
      {
        id: "stay-remote-safe",
        label: "Stay put — rumors don't pay movers",
        outcome: {
          text:
            "You keep the remote setup and the known life. The rumor resolves eventually — they always do — and your couch stays where you like it.",
          effect: { netWorth: 35_000, burnout: 5 },
          next: "y8-goldencage",
        },
      },
      {
        id: "move-on-the-rumor",
        label: "Move early, beat the gold rush",
        gamble: [
          {
            chance: 0.5,
            label: "Hub opens — early-mover wins",
            text:
              "The announcement drops eight months after your boxes did. You join the founding class with a promotion, and your cheap house appreciates like it heard the news.",
            effect: { netWorth: 65_000, burnout: 10, title: "Senior SWE (Hub Founding Class)" },
            next: "y8-goldencage",
          },
          {
            chance: 0.5,
            label: "Hub canceled — new city, old hunt",
            text:
              "The hub dies in a press release, and you're job hunting from a city chosen by a rumor. The sun is real. The gold rush was a weather report.",
            effect: { netWorth: 15_000, burnout: 15 },
            next: "y8-goldencage",
          },
        ],
      },
    ],
  },
  {
    id: "y7-turnaround-swap",
    year: 7,
    age: 28,
    slot: "y7-survivor",
    headline: "The Turnaround Wager",
    text:
      "The CEO offers survivors a deal: a 40% pay cut for a year in exchange for 4x the equity. The most honest comp conversation you've ever had — and poker with your rent.",
    choices: [
      {
        id: "keep-salary",
        label: "Keep the salary — you've bet enough",
        outcome: {
          text:
            "Your labor is already the biggest position you hold here. The turnaround proceeds with your effort, not your rent money.",
          effect: { netWorth: 45_000, burnout: 15 },
          next: "y8-acquisition",
        },
      },
      {
        id: "swap-for-equity",
        label: "Take the swap — 40% cut for 4x equity",
        gamble: [
          {
            chance: 0.45,
            label: "Turnaround works — equity 5x's",
            text:
              "A recovery round reprices everything upward and your 4x grant lands on a 5x valuation. The CEO frames the offer letter. So do you.",
            effect: { netWorth: 90_000, burnout: 15 },
            next: "y8-acquisition",
          },
          {
            chance: 0.55,
            label: "Slow bleed — expensive lesson",
            text:
              "A brutal year at 60% pay for equity that stays decorative. Rent poker: the house won this hand.",
            effect: { netWorth: -15_000, burnout: 20 },
            next: "y8-acquisition",
          },
        ],
      },
    ],
  },
  {
    id: "y7-launch-or-drip",
    year: 7,
    age: 28,
    slot: "y7-founder-grind",
    headline: "One Launch to Rule Them All",
    text:
      "Your head of growth wants the entire annual marketing budget on one coordinated launch — embargo, keynote slot, one perfect Tuesday. The alternative is the drip.",
    choices: [
      {
        id: "drip-marketing",
        label: "Drip it — twelve small, steady bets",
        outcome: {
          text:
            "You spread the budget like a sensible farmer. No fireworks, no craters — just a growth staircase built by someone patient.",
          effect: { netWorth: 30_000, burnout: 10 },
          next: "y8-seriesa",
        },
      },
      {
        id: "bet-the-launch",
        label: "Bet it all on one perfect Tuesday",
        gamble: [
          {
            chance: 0.5,
            label: "It detonates — genuinely viral",
            text:
              "By Tuesday night your signup queue has a queue, and it sticks. 'Where were you during the launch' becomes company lore.",
            effect: { netWorth: 75_000, burnout: 10 },
            next: "y8-seriesa",
          },
          {
            chance: 0.5,
            label: "Crickets — the internet was busy",
            text:
              "A bigger company announces a bigger thing four hours before your embargo lifts. The press runs on page nine. Timing: rented, never owned.",
            effect: { netWorth: -20_000, burnout: 20 },
            next: "y8-seriesa",
          },
        ],
      },
    ],
  },
];
