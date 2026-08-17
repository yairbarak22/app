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
    id: "y3-promo-snub",
    year: 3,
    age: 24,
    slot: "y3-bigtech-efficiency",
    headline: "The Promo That Wasn't",
    text:
      "Promo results drop: the VP's favorite — whose biggest shipped artifact this year is a vision doc — gets Senior. You, who kept the actual product alive, get 'trending toward.' Your manager says 'timing' four times in one meeting.",
    choices: [
      {
        id: "confront-with-receipts",
        label: "Confront your manager with a doc of receipts",
        outcome: {
          text:
            "Twelve pages of shipped work, incident saves, and peer quotes. Your manager goes quiet, then goes to bat. The promo lands next cycle with a back-dated comp adjustment — and a new mutual understanding: you keep receipts.",
          effect: { netWorth: 50_000, burnout: 15, title: "Senior SWE @ Big Tech" },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "interview-out",
        label: "Skip the appeal — let the market run your promo committee",
        outcome: {
          text:
            "Three weeks of interviews produce the promo your committee couldn't: Senior title, better pay, new company. Your old manager calls it 'a big loss for the team.' It was. That was the point.",
          effect: { netWorth: 60_000, burnout: 10, title: "Senior SWE" },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "sulk-productively",
        label: "Sulk productively — pour the rage into open source",
        outcome: {
          text:
            "Your revenge arc is a side library that quietly hits 5K stars. Recruiters start emails with 'big fan of your work,' which your promo committee never said once. The industry noticed even if the VP didn't.",
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
      "Your first equity cliff vests the same week the stock does something the finance subreddits call 'interesting.' Suddenly you own real money that changes value while you sleep, and everyone from your barber to your uncle has a thesis.",
    choices: [
      {
        id: "sell-everything",
        label: "Sell it all — diversify like the textbooks say",
        outcome: {
          text:
            "You auto-sell every vest into index funds like a financially literate adult. The stock proceeds to double, and your coworkers remind you weekly. You sleep fine. Boring is a strategy with excellent long-run stats.",
          effect: { netWorth: 55_000, burnout: 5, title: "SWE II @ Big Tech" },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "diamond-hands",
        label: "Hold everything — you work here, you KNOW it's going up",
        outcome: {
          text:
            "Your entire net worth now moves with one ticker, which makes every all-hands feel like a seance. It mostly goes up this year. 'Concentration risk' remains a phrase for future-you to Google at 2 AM.",
          effect: { netWorth: 38_000, burnout: 10, title: "SWE II @ Big Tech" },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "sell-half",
        label: "Sell half. Keep half. Anger both camps equally",
        outcome: {
          text:
            "The coward's compromise, aka the correct answer. Half your money is boring, half is a lottery ticket, and you have a defensible sentence ready for any dinner-party argument in the Bay Area.",
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
      "Your beloved manager quits on a Tuesday, two seniors follow her by Friday, and the reorg vultures start circling the org chart. You're suddenly the longest-tenured person on a team you joined eighteen months ago.",
    choices: [
      {
        id: "step-up-tl",
        label: "Step up — become tech lead of the wreckage",
        outcome: {
          text:
            "You inherit a roadmap you didn't write, a codebase only you now understand, and three new grads who look at you like you have answers. Trial by fire, passed. The title catches up two quarters later.",
          effect: { netWorth: 60_000, burnout: 20, title: "Tech Lead" },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "follow-the-manager",
        label: "Follow your manager to her new company",
        outcome: {
          text:
            "The best managers take their people with them; you take the hint and the offer. Same trust, new logo, better equity. The old team's Slack goes quiet within a quarter. You got out at the top.",
          effect: { netWorth: 50_000, burnout: 10, title: "Senior SWE" },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "coast-the-chaos",
        label: "Coast the chaos — nobody's tracking anything right now",
        outcome: {
          text:
            "In the fog of reorg, you quietly take four-day weekends and let the metrics dashboards rot. By the time new leadership arrives and asks 'what does this team do,' you have a tan and a rehearsed answer.",
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
  {
    id: "y3-early-acquihire",
    year: 3,
    age: 24,
    slot: "y3-startup-seriesa",
    headline: "The Early Exit Knock",
    text:
      "A mid-size public company offers to buy the whole startup — mostly for the team, a little for the tech, nothing for the dream. The founder is torn between 'we're worth 10x this' and the fact that payroll clears in nine days.",
    choices: [
      {
        id: "take-the-soft-landing",
        label: "Vote yes — a soft landing beats a hard lesson",
        outcome: {
          text:
            "The deal closes and your two years of ramen convert into a real retention package and a Senior title at a company with, luxuriously, a payroll department. The product dies in a year. The people don't.",
          effect: { netWorth: 60_000, burnout: 5, title: "Senior SWE (Acquired)" },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "fight-to-stay-indie",
        label: "Fight the deal — you didn't come this far for a badge",
        outcome: {
          text:
            "Your impassioned 'we haven't even tried yet' speech swings the founder. The offer dies; a bridge check appears; the chip on the whole team's shoulder becomes load-bearing. Now you have to be right.",
          effect: { netWorth: 5_000, burnout: 15 },
          next: "y4-startup-scale",
        },
      },
      {
        id: "leave-to-found",
        label: "Let them decide — you're leaving to start your own anyway",
        outcome: {
          text:
            "Watching acquirers price your work taught you exactly how the game works, and now you want your own board seat at the table. You resign warmly, incorporate coldly, and start from zero with eyes open.",
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
      "The founder announces he's 'recharging at Burning Man,' then extends the recharge by three weeks, then stops answering entirely. Investors are calling YOUR phone now. There are six employees, one bank account, and zero adults in the room. You look around. You're the adult.",
    choices: [
      {
        id: "hold-it-together",
        label: "Hold the company together until he resurfaces",
        outcome: {
          text:
            "You run payroll, calm investors, and ship the release — a full CEO cosplay with an engineer's salary. The founder returns 'transformed' to a company that quietly no longer needs him. Everyone knows who kept the lights on.",
          effect: { netWorth: 15_000, burnout: 25, title: "Acting CTO" },
          next: "y4-startup-scale",
        },
      },
      {
        id: "board-mutiny",
        label: "Call the investors — it's time for a grown-up conversation",
        outcome: {
          text:
            "The board 'transitions' the founder to an advisory role he'll describe differently at parties. You get equity, a real title, and a masterclass in how power actually moves. It felt bad. It was correct.",
          effect: { netWorth: 20_000, burnout: 20, title: "Head of Engineering" },
          next: "y4-startup-scale",
        },
      },
      {
        id: "bail-cleanly",
        label: "Not your circus — take the Big Tech offer in your inbox",
        outcome: {
          text:
            "Some ships aren't yours to save. You give two honest weeks, wish everyone luck, and badge into a company where nobody's location is a mystery. The startup limps on a year without you. You check its Crunchbase sometimes.",
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
      "Your startup's better-funded rival slides into your DMs with double the salary and a signing bonus that would erase your student loans in one wire. Taking it means building against everything you've shipped for two years — and they know that's exactly what they're buying.",
    choices: [
      {
        id: "defect",
        label: "Take the money. Loyalty is a luxury good",
        outcome: {
          text:
            "The wire clears and the loans die. Your old team unfollows you in waves, and for six months every feature you ship feels like an away game. But the mortgage-shaped future in your head gets ten years closer.",
          effect: { netWorth: 45_000, burnout: 10, title: "Senior Eng @ The Rival" },
          next: "y4-startup-scale",
        },
      },
      {
        id: "leverage-it",
        label: "Show the founder the offer — let leverage do its work",
        outcome: {
          text:
            "The founder goes pale, then generous: a raise, real equity acceleration, and a 'don't ever do that to me again' laugh that isn't fully a laugh. Same desk, meaningfully better deal. Leverage only works if you'd really walk.",
          effect: { netWorth: 30_000, burnout: 10 },
          next: "y4-startup-scale",
        },
      },
      {
        id: "loyal-quietly",
        label: "Delete the DM. You're building something here",
        outcome: {
          text:
            "You never even mention it. Some decisions are about the person you're becoming, not the number you're worth. The rival flames out spectacularly next year, and you feel precisely one ounce of shame about how good that feels.",
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
      "Reorg season, and your promo is 'deferred pending headcount clarity' for the second cycle. A director in a sister org whispers that squeaky wheels are getting retained AND promoted right now — leadership fears attrition more than precedent. You could make an ultimatum. During a reorg. Bold move, Cotton.",
    choices: [
      {
        id: "heads-down-safe",
        label: "Keep your head down — reorgs eat the loud first",
        outcome: {
          text:
            "You stay quiet, ship steadily, and let the reorg pass over you like weather. The promo arrives a cycle late with no drama attached. Boring, effective, alive: the reorg survivor's triad.",
          effect: { netWorth: 40_000, burnout: 10 },
          next: "y4-bigtech-handcuffs",
        },
      },
      {
        id: "promo-ultimatum",
        label: "Deliver the ultimatum — promo this cycle or I walk",
        gamble: [
          {
            chance: 0.6,
            label: "It works — promo plus a retention grant",
            text:
              "Forty-eight hours after your carefully-worded 'career conversation,' the deferred promo un-defers itself and a retention grant appears like an apology. Fear of attrition: the most reliable budget line in tech.",
            effect: { netWorth: 70_000, burnout: 10, title: "Senior SWE @ Big Tech" },
            achievement: "big-bonus",
            next: "y4-bigtech-handcuffs",
          },
          {
            chance: 0.4,
            label: "Called — your name moves UP the layoff list",
            text:
              "Your ultimatum reaches a VP who's cutting 15% and grateful for volunteers. 'We'll accept your timeline' means you're out in the reorg wave with standard severance and a lesson about reading rooms during winters.",
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
      "The annual company hackathon ups the stakes: $50K cash to the winning team, plus a promo fast-track. Two hundred teams enter. Your idea is genuinely good; your competition includes an intern team that's been 'exploring LLMs' suspiciously professionally. One week. All in, or ship the roadmap?",
    choices: [
      {
        id: "skip-hackathon",
        label: "Skip it — the roadmap doesn't ship itself",
        outcome: {
          text:
            "You ship the quarter while the office fills with energy drinks and hubris. The winning demo is impressive; your shipped feature is real. Both statements will appear in different people's promo packets.",
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
            label: "You win — $50K and a promo fast-track",
            text:
              "Your demo makes the CTO laugh and then makes him quiet, which is the good sequence. The $50K clears, the fast-track engages, and the intern team asks to join YOUR project. Best week of your career so far.",
            effect: { netWorth: 65_000, burnout: 15, title: "SWE II (Hackathon Champion)" },
            achievement: "big-bonus",
            next: "y4-bigtech-handcuffs",
          },
          {
            chance: 0.7,
            label: "The intern LLM team wins — you get a t-shirt",
            text:
              "The interns' agent demo does something genuinely unholy and takes the crown. You place top ten, earn a t-shirt sized XXL-only, and lose a week of roadmap. The demo you built quietly becomes a real feature next year — uncredited, naturally.",
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
      "The Series A brings a small secondary window: you can sell a slice of your vested equity at the new price, once, this month. The VCs project the next round at 2-3x 'based on pipeline.' VCs also projected your competitor's round, which didn't happen. One-time window. Choose your hands.",
    choices: [
      {
        id: "sell-a-slice",
        label: "Sell a modest slice — first real money wins",
        outcome: {
          text:
            "You sell 8% of your stake and experience the novel sensation of a bank account with a comma. The rest rides. Diversification at 24: your future self starts a gratitude journal.",
          effect: { netWorth: 50_000, burnout: 5 },
          next: "y4-startup-scale",
        },
      },
      {
        id: "hold-everything",
        label: "Hold everything — the next round reprices it all",
        gamble: [
          {
            chance: 0.35,
            label: "Next round doubles — your stake balloons",
            text:
              "Fourteen months later the B closes at 2.4x and your unsold stake is worth a small house in a mid-size city. The 'pipeline' was real this once. You become insufferable about conviction for exactly one fundraising cycle.",
            effect: { netWorth: 90_000, burnout: 10 },
            next: "y4-startup-scale",
          },
          {
            chance: 0.65,
            label: "Flat round — window closed, paper stays paper",
            text:
              "The next round lands flat 'in this environment,' and the secondary window never reopens. Your equity remains a strongly-held opinion. The slice you didn't sell would have been a car. You bike to work now, for exercise, you tell everyone.",
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
      "A rival startup's CEO makes an unusual offer over an expensive dinner: not just you — your whole three-person pod, hired as a unit, with you as the lead. A 'lift-out,' he calls it, like you're a kidney. The catch: you have to recruit your own teammates out, quietly, before your founder hears.",
    choices: [
      {
        id: "decline-liftout",
        label: "Decline — you don't strip-mine your own team",
        outcome: {
          text:
            "You pass on the dinner's proposition and sleep clean. The rival CEO respects it, weirdly, and tells people you're 'loyal to a fault' — a review that follows you around and opens more doors than it closes.",
          effect: { netWorth: 12_000, burnout: 10 },
          next: "y4-startup-scale",
        },
      },
      {
        id: "attempt-liftout",
        label: "Run the lift-out — team package, you as lead",
        gamble: [
          {
            chance: 0.5,
            label: "Clean extraction — all three hired, you lead",
            text:
              "Three resignations land on the founder's desk in one morning, choreographed like a heist. The rival honors everything: team intact, you leading, comp corrected across the board. Your old founder subtweets for a month. Your new team ships like they've been together for years — because they have.",
            effect: { netWorth: 55_000, burnout: 10, title: "Team Lead (Lift-Out)" },
            next: "y4-startup-scale",
          },
          {
            chance: 0.5,
            label: "The plan leaks — you're radioactive at both companies",
            text:
              "One teammate tells his girlfriend, who knows the founder's sister. The confrontation is public, the rival CEO 'pauses the conversation' to avoid drama, and you spend a year as 'the one who tried to poach the pod.' Survivable. Educational. Loud.",
            effect: { netWorth: 5_000, burnout: 20 },
            next: "y4-startup-scale",
          },
        ],
      },
    ],
  },
];
