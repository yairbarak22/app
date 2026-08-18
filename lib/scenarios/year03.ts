import type { Scenario } from "../types";

/**
 * YEAR 3 (age 24) — first layoff scare / Series A.
 * Pools: y3-bigtech-efficiency (+3 variants), y3-startup-seriesa (+3 variants).
 */
export const YEAR_03: Scenario[] = [
  // ---------------------------------------------------------------- Big Tech
  {
    id: "y3-bigtech-efficiency",
    year: 3,
    age: 24,
    headline: "Reorg Roulette",
    text:
      "The stock dipped, so the CEO posted a memo about 'doing more with less' from his third yacht. The reorg flattens your org — and an HR friend tips you off: your name is on the list.",
    choices: [
      {
        id: "take-severance",
        label: "Take the severance, test the market",
        outcome: {
          text:
            "Twelve weeks' severance, green LinkedIn banner, 400 applications into the void. But you're free — and you'll never trust a memo containing 'journey' again.",
          effect: { netWorth: 20_000, burnout: 20, title: "SWE II (Open to Work)" },
          next: "y4-open-market",
        },
      },
      {
        id: "pull-strings",
        label: "▶ Pull strings — watch a video to survive",
        requiresAd: true,
        outcome: {
          text:
            "You mention you alone hold prod access to billing; your skip-level 'goes to bat.' Your name vanishes, someone else's appears. You don't ask. Promo to Senior.",
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
        label: "Rage-apply and force a counter-offer",
        outcome: {
          text:
            "You interview out of spite and land Senior at a competitor. Your manager suddenly finds counter-offer budget. You leave anyway — loyalty is a one-way street.",
          effect: { netWorth: 55_000, burnout: 15, title: "Senior SWE" },
          next: "y4-bigtech-handcuffs",
        },
      },
    ],
  },
  {
    id: "y3-promo-snub",
    year: 3,
    age: 24,
    slot: "y3-bigtech-efficiency",
    headline: "The Promo That Wasn't",
    text:
      "Promo results: the VP's favorite — whose biggest artifact this year is a vision doc — makes Senior. You, who kept the product alive, get 'trending toward.' Your manager says 'timing' four times.",
    choices: [
      {
        id: "confront-with-receipts",
        label: "Confront your manager with receipts",
        outcome: {
          text:
            "Twelve pages of shipped work and incident saves. Your manager goes quiet, then goes to bat. Promo lands next cycle, back-dated — they know you keep receipts.",
          effect: { netWorth: 50_000, burnout: 15, title: "Senior SWE @ Big Tech" },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "interview-out",
        label: "Let the market run your promo committee",
        outcome: {
          text:
            "Three weeks of interviews deliver what the committee couldn't: Senior, better pay, new logo. Your old manager calls it 'a big loss.' It was. That was the point.",
          effect: { netWorth: 60_000, burnout: 10, title: "Senior SWE" },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "sulk-productively",
        label: "Sulk productively — rage into open source",
        outcome: {
          text:
            "Your revenge library quietly hits 5K stars. Recruiters open with 'big fan of your work,' which the promo committee never said once. The industry noticed.",
          effect: { netWorth: 40_000, burnout: 5, title: "SWE II (Known on GitHub)" },
          next: "y4-bigtech-handcuffs",
        },
      },
    ],
  },
  {
    id: "y3-first-cliff",
    year: 3,
    age: 24,
    slot: "y3-bigtech-efficiency",
    headline: "The Cliff Vests",
    text:
      "Your first cliff vests the same week the stock does something finance subreddits call 'interesting.' You now own money that changes value while you sleep, and even your barber has a thesis.",
    choices: [
      {
        id: "sell-everything",
        label: "Sell it all — diversify like the books",
        outcome: {
          text:
            "You auto-sell into index funds like an adult. The stock doubles; coworkers remind you weekly. You sleep fine. Boring has excellent long-run stats.",
          effect: { netWorth: 55_000, burnout: 5, title: "SWE II @ Big Tech" },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "diamond-hands",
        label: "Hold it all — you work here, you KNOW",
        outcome: {
          text:
            "Your net worth moves with one ticker; every all-hands feels like a seance. It mostly goes up this year. 'Concentration risk' is future-you's 2 AM Google.",
          effect: { netWorth: 38_000, burnout: 10, title: "SWE II @ Big Tech" },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "sell-half",
        label: "Sell half. Keep half. Anger both camps",
        outcome: {
          text:
            "The coward's compromise, aka the correct answer. Half boring, half lottery ticket, and a defensible sentence for every Bay Area dinner-party argument.",
          effect: { netWorth: 47_000, burnout: 5, title: "SWE II @ Big Tech" },
          next: "y4-bigtech-handcuffs",
        },
      },
    ],
  },
  {
    id: "y3-team-implodes",
    year: 3,
    age: 24,
    slot: "y3-bigtech-efficiency",
    headline: "The Team Implodes",
    text:
      "Your beloved manager quits Tuesday, two seniors follow by Friday, and the reorg vultures circle. You're now the longest-tenured person on a team you joined eighteen months ago.",
    choices: [
      {
        id: "step-up-tl",
        label: "Step up — tech lead of the wreckage",
        outcome: {
          text:
            "You inherit a roadmap you didn't write, a codebase only you understand, and new grads who think you have answers. Trial by fire: passed. Title catches up later.",
          effect: { netWorth: 60_000, burnout: 20, title: "Tech Lead" },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "follow-the-manager",
        label: "Follow your manager to her new company",
        outcome: {
          text:
            "The best managers take their people; you take the hint and the offer. Same trust, new logo, better equity. The old team's Slack goes quiet within a quarter.",
          effect: { netWorth: 50_000, burnout: 10, title: "Senior SWE" },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "coast-the-chaos",
        label: "Coast the chaos — nobody's tracking now",
        outcome: {
          text:
            "In the reorg fog you take four-day weekends and let the dashboards rot. When new leadership asks 'what does this team do,' you have a tan and an answer.",
          effect: { netWorth: 38_000, burnout: -10, title: "SWE II @ Big Tech" },
          next: "y4-bigtech-handcuffs",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Startup
  {
    id: "y3-startup-seriesa",
    year: 3,
    age: 24,
    headline: "Series A or Bust",
    text:
      "A term sheet lands — $8M at terms the founder calls 'founder-friendly, mostly.' In lieu of a raise, he offers a shiny title. The VCs want 'senior leadership in place.' You are the senior leadership.",
    choices: [
      {
        id: "take-vp-title",
        label: "Take VP of Engineering (of a 5-person team)",
        outcome: {
          text:
            "You now attend board meetings and unclog the office sink. The title looks incredible on LinkedIn and means nothing in your bank account — yet. The cliff looms.",
          effect: { netWorth: 12_000, burnout: 15, title: "VP of Engineering (of 5)" },
          next: "y4-startup-scale",
        },
      },
      {
        id: "sell-secondary",
        label: "Negotiate a secondary — sell 10% now",
        outcome: {
          text:
            "The VCs grumble but let you take chips off the table. Real money hits your account for the first time in three years. You buy a mattress that isn't inflatable.",
          effect: { netWorth: 85_000, burnout: 5, title: "Founding Engineer (Liquid)" },
          next: "y4-startup-scale",
        },
      },
      {
        id: "start-own-thing",
        label: "Quit and start your OWN thing",
        outcome: {
          text:
            "You walk from unvested equity with a laptop, a domain, and unearned confidence. Your idea is 'Uber for something.' Your cofounder is a group chat.",
          effect: { netWorth: -12_000, burnout: 20, title: "Founder (Pre-Idea)" },
          next: "y4-founder-garage",
        },
      },
    ],
  },
  {
    id: "y3-early-acquihire",
    year: 3,
    age: 24,
    slot: "y3-startup-seriesa",
    headline: "The Early Exit Knock",
    text:
      "A public company offers to buy the startup — mostly for the team, a little for the tech, nothing for the dream. The founder is torn between 'we're worth 10x this' and payroll clearing in nine days.",
    choices: [
      {
        id: "take-the-soft-landing",
        label: "Vote yes — soft landing beats hard lesson",
        outcome: {
          text:
            "Two years of ramen become a retention package and a Senior title at a place with, luxuriously, payroll. The product dies in a year. The people don't.",
          effect: { netWorth: 60_000, burnout: 5, title: "Senior SWE (Acquired)" },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "fight-to-stay-indie",
        label: "Fight the deal — you're not here for a badge",
        outcome: {
          text:
            "Your 'we haven't even tried' speech swings the founder. The offer dies, a bridge check appears, the team's chip goes load-bearing. Now you have to be right.",
          effect: { netWorth: 5_000, burnout: 15 },
          next: "y4-startup-scale",
        },
      },
      {
        id: "leave-to-found",
        label: "Let them decide — you're off to found",
        outcome: {
          text:
            "Watching acquirers price your work taught you the game. You resign warmly, incorporate coldly, and start from zero with eyes open.",
          effect: { netWorth: -10_000, burnout: 15, title: "Founder (Pre-Idea)" },
          next: "y4-founder-garage",
        },
      },
    ],
  },
  {
    id: "y3-founder-vanishes",
    year: 3,
    age: 24,
    slot: "y3-startup-seriesa",
    headline: "The Founder Goes Dark",
    text:
      "The founder 'recharges at Burning Man,' then goes silent. Investors call YOUR phone. Six employees, one bank account, zero adults in the room. You look around. You're the adult.",
    choices: [
      {
        id: "hold-it-together",
        label: "Hold it together until he resurfaces",
        outcome: {
          text:
            "You run payroll, calm investors, ship the release — CEO cosplay on an engineer's salary. He returns 'transformed' to a company that no longer needs him.",
          effect: { netWorth: 15_000, burnout: 25, title: "Acting CTO" },
          next: "y4-startup-scale",
        },
      },
      {
        id: "board-mutiny",
        label: "Call the investors — grown-up time",
        outcome: {
          text:
            "The board 'transitions' him to an advisory role he'll describe differently at parties. You get equity, a title, a masterclass in power. Felt bad. Was correct.",
          effect: { netWorth: 20_000, burnout: 20, title: "Head of Engineering" },
          next: "y4-startup-scale",
        },
      },
      {
        id: "bail-cleanly",
        label: "Not your circus — take the Big Tech offer",
        outcome: {
          text:
            "Some ships aren't yours to save. Two honest weeks, then you badge into a company where nobody's location is a mystery. You check its Crunchbase sometimes.",
          effect: { netWorth: 50_000, burnout: 5, title: "Senior SWE @ Big Tech" },
          next: "y4-bigtech-handcuffs",
        },
      },
    ],
  },
  {
    id: "y3-rival-poach",
    year: 3,
    age: 24,
    slot: "y3-startup-seriesa",
    headline: "The Rival Comes Courting",
    text:
      "The better-funded rival DMs: double salary and a signing bonus that erases your loans in one wire. The job is building against everything you've shipped — which is exactly what they're buying.",
    choices: [
      {
        id: "defect",
        label: "Take the money. Loyalty is a luxury good",
        outcome: {
          text:
            "The wire clears; the loans die. Your old team unfollows in waves, and every feature feels like an away game. The mortgage-shaped future gets ten years closer.",
          effect: { netWorth: 45_000, burnout: 10, title: "Senior Eng @ The Rival" },
          next: "y4-startup-scale",
        },
      },
      {
        id: "leverage-it",
        label: "Show the founder the offer — leverage",
        outcome: {
          text:
            "The founder goes pale, then generous: a raise, equity acceleration, and a laugh that isn't fully a laugh. Leverage only works if you'd really walk.",
          effect: { netWorth: 30_000, burnout: 10 },
          next: "y4-startup-scale",
        },
      },
      {
        id: "loyal-quietly",
        label: "Delete the DM. You're building something",
        outcome: {
          text:
            "You never mention it. The rival flames out spectacularly next year, and you feel precisely one ounce of shame about how good that feels.",
          effect: { netWorth: 8_000, burnout: 5 },
          next: "y4-startup-scale",
        },
      },
    ],
  },
  {
    id: "y3-counter-poker",
    year: 3,
    age: 24,
    slot: "y3-bigtech-efficiency",
    headline: "The Ultimatum Cycle",
    text:
      "Promo 'deferred pending headcount clarity' for a second cycle. A director whispers that squeaky wheels are getting retained AND promoted right now. An ultimatum. During a reorg. Bold move, Cotton.",
    choices: [
      {
        id: "heads-down-safe",
        label: "Keep your head down — reorgs eat the loud",
        outcome: {
          text:
            "You ship steadily and let the reorg pass over you like weather. The promo arrives a cycle late, no drama. Boring, effective, alive: the reorg survivor's triad.",
          effect: { netWorth: 40_000, burnout: 10 },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "promo-ultimatum",
        label: "Ultimatum — promo this cycle or I walk",
        gamble: [
          {
            chance: 0.6,
            label: "It works — promo + retention grant",
            text:
              "Forty-eight hours later the promo un-defers and a retention grant appears like an apology. Fear of attrition: the most reliable budget line in tech.",
            effect: { netWorth: 70_000, burnout: 10, title: "Senior SWE @ Big Tech" },
            achievement: "big-bonus",
            next: "y4-bigtech-handcuffs",
          },
          {
            chance: 0.4,
            label: "Called — you move UP the layoff list",
            text:
              "Your ultimatum reaches a VP cutting 15% and grateful for volunteers. 'We'll accept your timeline.' You're out with severance and a lesson about winters.",
            effect: { netWorth: 15_000, burnout: 20, title: "SWE II (Ultimatum Backfired)" },
            next: "y4-open-market",
          },
        ],
      },
    ],
  },
  {
    id: "y3-hackathon-allin",
    year: 3,
    age: 24,
    slot: "y3-bigtech-efficiency",
    headline: "The $50K Hackathon",
    text:
      "The company hackathon ups the stakes: $50K cash and a promo fast-track. Two hundred teams enter. Your idea is genuinely good; the intern team has been 'exploring LLMs' suspiciously professionally.",
    choices: [
      {
        id: "skip-hackathon",
        label: "Skip it — the roadmap doesn't ship itself",
        outcome: {
          text:
            "You ship the quarter while the office fills with energy drinks and hubris. Their demo is impressive; your feature is real. Both go in someone's promo packet.",
          effect: { netWorth: 45_000, burnout: 5 },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "allin-hackathon",
        label: "Go all in — one week, one demo, $50K",
        gamble: [
          {
            chance: 0.3,
            label: "You win — $50K and a fast-track",
            text:
              "Your demo makes the CTO laugh, then go quiet — the good sequence. The $50K clears and the intern team asks to join YOUR project. Best week of your career.",
            effect: { netWorth: 65_000, burnout: 15, title: "SWE II (Hackathon Champion)" },
            achievement: "big-bonus",
            next: "y4-bigtech-handcuffs",
          },
          {
            chance: 0.7,
            label: "The intern LLM team wins",
            text:
              "The interns' agent demo does something unholy and wins. You get an XXL-only t-shirt. Your demo quietly ships as a real feature next year — uncredited.",
            effect: { netWorth: 40_000, burnout: 15 },
            next: "y4-bigtech-handcuffs",
          },
        ],
      },
    ],
  },
  {
    id: "y3-hold-or-sell",
    year: 3,
    age: 24,
    slot: "y3-startup-seriesa",
    headline: "Diamond Hands, Startup Edition",
    text:
      "A one-time secondary window: sell a slice of vested equity at the new price, this month only. The VCs project 2-3x 'based on pipeline.' They also projected your competitor's round. Choose your hands.",
    choices: [
      {
        id: "sell-a-slice",
        label: "Sell a modest slice — real money first",
        outcome: {
          text:
            "You sell 8% and experience a bank account with a comma. The rest rides. Diversification at 24: your future self starts a gratitude journal.",
          effect: { netWorth: 50_000, burnout: 5 },
          next: "y4-startup-scale",
        },
      },
      {
        id: "hold-everything",
        label: "Hold everything — the next round reprices",
        gamble: [
          {
            chance: 0.35,
            label: "Next round doubles — stake balloons",
            text:
              "The B closes at 2.4x and your unsold stake is worth a small house in a mid-size city. You become insufferable about conviction for one fundraising cycle.",
            effect: { netWorth: 90_000, burnout: 10 },
            next: "y4-startup-scale",
          },
          {
            chance: 0.65,
            label: "Flat round — paper stays paper",
            text:
              "The round lands flat 'in this environment'; the window never reopens. The unsold slice would've been a car. You bike to work now — for exercise, you say.",
            effect: { netWorth: 10_000, burnout: 15 },
            next: "y4-startup-scale",
          },
        ],
      },
    ],
  },
  {
    id: "y3-liftout-gamble",
    year: 3,
    age: 24,
    slot: "y3-startup-seriesa",
    headline: "The Lift-Out",
    text:
      "A rival CEO offers, over expensive dinner, to hire your whole three-person pod as a unit — you as lead. A 'lift-out,' like you're a kidney. Catch: you recruit them out before your founder hears.",
    choices: [
      {
        id: "decline-liftout",
        label: "Decline — don't strip-mine your own team",
        outcome: {
          text:
            "You pass and sleep clean. The rival CEO respects it, weirdly, and tells people you're 'loyal to a fault' — a review that opens more doors than it closes.",
          effect: { netWorth: 12_000, burnout: 10 },
          next: "y4-startup-scale",
        },
      },
      {
        id: "attempt-liftout",
        label: "Run the lift-out — team package, you lead",
        gamble: [
          {
            chance: 0.5,
            label: "Clean extraction — all three hired",
            text:
              "Three resignations land in one morning, choreographed like a heist. Team intact, you leading, comp corrected. Your old founder subtweets for a month.",
            effect: { netWorth: 55_000, burnout: 10, title: "Team Lead (Lift-Out)" },
            next: "y4-startup-scale",
          },
          {
            chance: 0.5,
            label: "Leak — radioactive at both companies",
            text:
              "A teammate tells his girlfriend, who knows the founder's sister. The rival 'pauses the conversation'; you spend a year as the one who tried to poach the pod.",
            effect: { netWorth: 5_000, burnout: 20 },
            next: "y4-startup-scale",
          },
        ],
      },
    ],
  },
];
