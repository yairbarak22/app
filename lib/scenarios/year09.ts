import type { Scenario } from "../types";

/**
 * YEAR 9 (age 30) — politics, zombies, and scale.
 * Pools: y9-politics (+2), y9-zombie (+2), y9-scale (+2).
 */
export const YEAR_09: Scenario[] = [
  // ---------------------------------------------------------------- Politics
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
    id: "y9-ai-reorg-again",
    year: 9,
    age: 30,
    slot: "y9-politics",
    headline: "The Second AI Reorg",
    text:
      "The company reorganizes around AI for the second time in three years — this time with feeling. Every org must now be 'AI-native,' a phrase whose definition changes per VP. There are winners' orgs and losers' orgs forming in real time, and musical chairs has never had this much RSU value attached.",
    choices: [
      {
        id: "land-in-winners-org",
        label: "Maneuver into the anointed AI org before the music stops",
        outcome: {
          text:
            "Two coffees, one internal transfer request timed to the hour, and you land in the org whose budget grows while everyone else's 'optimizes.' Your work is suddenly 'strategic' — same skills, new gravity. Musical chairs: won.",
          effect: { netWorth: 85_000, burnout: 15, title: "Principal Eng, AI Org" },
          next: "y10-poach",
        },
      },
      {
        id: "stay-with-people",
        label: "Stay with your team — orgs are temporary, trust isn't",
        outcome: {
          text:
            "You keep the band together through the shuffle, absorbing two orphaned engineers and a product that three VPs forgot they owned. When the reorg dust settles — they always settle — your team is the one still shipping. Leadership notices what survived.",
          effect: { netWorth: 65_000, burnout: 10 },
          next: "y10-poach",
        },
      },
      {
        id: "boring-platform-play",
        label: "Take the unfashionable platform team everyone's fleeing",
        outcome: {
          text:
            "While the ambitious stampede toward 'AI-native,' you inherit the platform everything runs on — including, inconveniently for the stampede, all the AI. Within a year, every winners'-org roadmap has a dependency with your name on it. Leverage wears overalls.",
          effect: { netWorth: 75_000, burnout: 10, title: "Principal Eng, Platform" },
          next: "y10-poach",
        },
      },
    ],
  },
  {
    id: "y9-mentee-eclipse",
    year: 9,
    age: 30,
    slot: "y9-politics",
    headline: "The Mentee Eclipse",
    text:
      "The junior you mentored through their first prod incident four years ago just shipped the company's launch of the year. Their promo packet — which you helped edit — now targets your level. The pride is real. So is the other feeling, the one you don't say out loud in calibration.",
    choices: [
      {
        id: "champion-them",
        label: "Champion their promo louder than anyone",
        outcome: {
          text:
            "You write the strongest peer review of your career — for someone else. They make the level; the story of who mentored them travels farther than any launch. Two directors start sending you their best juniors 'to Betts-ify,' a verb now. Legacy compounds weirder than money.",
          effect: { netWorth: 70_000, burnout: 5, title: "Principal Eng (The Mentor)" },
          next: "y10-poach",
        },
      },
      {
        id: "compete-quietly",
        label: "Let the ambition wake up — you're not done being great",
        outcome: {
          text:
            "Their launch lights a fire you thought had gone out at 28. You take the gnarliest project on the roadmap and ship it like you have something to prove — because you do, to yourself. Calibration notes this year: 'renewed intensity.' The mentee notices too, and grins.",
          effect: { netWorth: 80_000, burnout: 25 },
          next: "y10-poach",
        },
      },
      {
        id: "recruit-them",
        label: "Recruit them to your new pod — best people, one roof",
        outcome: {
          text:
            "You pitch them your next big thing over tacos and they say yes before the queso arrives. Mentor and mentee become peers on the org chart and co-conspirators off it. The pod ships like a heist crew. HR calls it 'a talent density concern.' You call it Tuesday.",
          effect: { netWorth: 75_000, burnout: 10 },
          next: "y10-poach",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Zombie
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
          achievement: "boomerang",
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
    id: "y9-private-equity",
    year: 9,
    age: 30,
    slot: "y9-zombie",
    headline: "The PE Playbook Arrives",
    text:
      "A private equity firm buys the zombie at a 'compelling multiple' and the playbook arrives before the ink dries: cost discipline, 'right-sizing,' and a new CFO who says 'EBITDA' the way monks say prayers. Everything soft dies first. Everything measurable gets a dashboard. You are measurable.",
    choices: [
      {
        id: "ride-the-playbook",
        label: "Ride it — PE efficiency is a masterclass if you survive it",
        outcome: {
          text:
            "You learn to speak EBITDA fluently and become the engineer who translates 'cost center' into 'kept the revenue alive.' The retention bonus is real; the operating discipline permanently rewires how you see waste. Brutal school. Genuine education.",
          effect: { netWorth: 60_000, burnout: 20 },
          next: "y10-poach",
        },
      },
      {
        id: "exit-before-grind",
        label: "Exit before the grind — the playbook doesn't need you willing",
        outcome: {
          text:
            "You've read how this movie ends — chapter three is 'do more with less,' chapter four is just 'less.' You take a clean offer elsewhere in week six, ahead of the first 'synergy review.' Timing the exit: the most underrated skill in tech.",
          effect: { netWorth: 70_000, burnout: 10, title: "Staff SWE (Elsewhere)" },
          next: "y10-poach",
        },
      },
      {
        id: "pe-golden-child",
        label: "Become the operators' favorite — run the value-creation plan",
        outcome: {
          text:
            "You volunteer to lead the technical side of the 'value creation plan,' PE-speak for the hard calls. It's grim, effective work — and the firm notices. They start flying you to look at other portfolio companies. You're not an engineer to them anymore. You're an operator.",
          effect: { netWorth: 80_000, burnout: 25, title: "CTO (PE-Approved)" },
          next: "y10-founder-crossroads",
        },
      },
    ],
  },
  {
    id: "y9-whale-client-ultimatum",
    year: 9,
    age: 30,
    slot: "y9-zombie",
    headline: "The Whale's Ultimatum",
    text:
      "The client that pays 40% of the zombie's revenue delivers an ultimatum: rebuild the integration layer to their spec in one quarter, or they churn. The spec is 80 pages. The team is seven people. The CEO has started saying 'we' in a way that means 'you.'",
    choices: [
      {
        id: "heroic-save",
        label: "Save the whale — one quarter, whatever it takes",
        outcome: {
          text:
            "Thirteen weeks of warpath engineering later, the integration ships to spec and the whale renews for three years. The company lives; the CEO takes the credit publicly and, more usefully, knows the truth privately. Your leverage is now denominated in revenue percentage.",
          effect: { netWorth: 55_000, burnout: 25 },
          next: "y10-poach",
        },
      },
      {
        id: "let-the-whale-go",
        label: "Refuse the ransom — a 40% client is a hostage situation",
        outcome: {
          text:
            "You show the board the math: meeting the spec bankrupts the roadmap for one renewal cycle. The whale churns; the company shrinks, diversifies, and — eighteen months later — is healthier than the whale ever let it be. Concentration risk: paid off, painfully.",
          effect: { netWorth: 45_000, burnout: 15 },
          next: "y10-poach",
        },
      },
      {
        id: "save-it-for-the-title",
        label: "Save the whale — for a price: the CTO title and a real grant",
        outcome: {
          text:
            "Before writing a line of code, you walk into the CEO's office with terms: title, equity, veto on the next roadmap ransom. He signs by Friday — hostages can't negotiate, and you're the only rescue team. The whale gets saved. So does your career trajectory.",
          effect: { netWorth: 50_000, burnout: 20, title: "CTO (Negotiated Under Fire)" },
          next: "y10-founder-crossroads",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Founder scale
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
  {
    id: "y9-europe-expansion",
    year: 9,
    age: 30,
    slot: "y9-scale",
    headline: "The Atlantic Question",
    text:
      "A third of your inbound now comes from Europe, where your product is being used in three languages you don't support, invoiced in a currency you don't hold, and — according to one alarming email — possibly out of compliance with an acronym. Everyone says expand. Nobody says how much it costs.",
    choices: [
      {
        id: "expand-properly",
        label: "Do it right — entity, hires, GDPR lawyer, the works",
        outcome: {
          text:
            "Six figures of setup, a Dublin entity, and a Head of EMEA who renegotiates your assumptions weekly. Painful, slow, correct: a year later Europe is 30% of revenue and your compliance answer in enterprise deals is 'yes' instead of a nervous laugh.",
          effect: { netWorth: 20_000, burnout: 20 },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "expand-cheap",
        label: "Do it cheap — one contractor, English-only, figure it out",
        outcome: {
          text:
            "One heroic contractor in Berlin duct-tapes the timezone gap, and revenue grows faster than the compliance risk — probably. The alarming-acronym email gets a folder. Cheap expansion works right up until the day it expensively doesn't. Today is not that day.",
          effect: { netWorth: 35_000, burnout: 15 },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "focus-home",
        label: "Don't expand — depth beats breadth at thirty people",
        outcome: {
          text:
            "You email the European leads a roadmap promise and a discount for their patience, then dominate the domestic market instead. Focus, the least glamorous strategy, quietly posts the best margins in the category. Europe will still be there at fifty people.",
          effect: { netWorth: 30_000, burnout: 5 },
          next: "y10-founder-crossroads",
        },
      },
    ],
  },
  {
    id: "y9-culture-memo",
    year: 9,
    age: 30,
    slot: "y9-scale",
    headline: "The Culture Memo",
    text:
      "Somewhere between employee 25 and 30, the vibe stopped scaling itself: two teams have opposite definitions of 'urgent,' someone put 'per my last message' in the all-hands channel, and a new hire asked — sincerely — 'what does this company believe?' You open a blank doc titled 'How We Work.' The cursor blinks.",
    choices: [
      {
        id: "publish-publicly",
        label: "Write it raw and publish it publicly",
        outcome: {
          text:
            "You write the memo with the trade-offs left in — what you'll never do, what you'll always choose, what it costs. It goes mildly viral in founder circles, and your next ten hires arrive pre-aligned, citing paragraph four in their cover letters. Culture, it turns out, is a recruiting channel.",
          effect: { netWorth: 30_000, burnout: 10 },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "keep-internal",
        label: "Keep it internal — culture is practiced, not performed",
        outcome: {
          text:
            "The memo stays in the handbook where it can be honest instead of impressive. You review it in every onboarding personally, and 'what does this company believe' stops being a question. No thought-leadership points scored. Every internal one.",
          effect: { netWorth: 25_000, burnout: 5 },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "chief-culture-officer",
        label: "Hire a Chief Culture Officer to handle it",
        outcome: {
          text:
            "The CCO arrives with a values workshop, a Miro board, and lanyards printed with words chosen by committee. Six months and a healthy salary later, the culture is exactly what it was, plus lanyards. You quietly write the memo yourself on a Sunday, the way you should have in March.",
          effect: { netWorth: -20_000, burnout: 10 },
          next: "y10-founder-crossroads",
        },
      },
    ],
  },
  {
    id: "y9-coup-bet",
    year: 9,
    age: 30,
    slot: "y9-politics",
    headline: "The Coup Invitation",
    text:
      "A director you trust closes her office door: a faction is moving to oust the stack-ranking SVP — testimonies gathered, skip-levels aligned, one board-adjacent ally secured. She wants your name on the list of supporters. Coups that win rewrite org charts in the winners' favor. Coups that fail publish the list.",
    choices: [
      {
        id: "stay-neutral-coup",
        label: "Stay neutral — you build systems, not conspiracies",
        outcome: {
          text:
            "You decline politely and delete the thread. The coup proceeds without you — succeeding partially, as coups do — and both factions still return your messages afterward. Neutrality: the only position with no downside case this quarter.",
          effect: { netWorth: 70_000, burnout: 10 },
          next: "y10-poach",
        },
      },
      {
        id: "join-the-coup",
        label: "Sign on — the SVP is genuinely making everything worse",
        gamble: [
          {
            chance: 0.5,
            label: "Coup succeeds — the winners redraw the map",
            text:
              "The testimonies land, the board-adjacent ally delivers, and the SVP departs to 'pursue portfolio work.' The winners' map has your name on a bigger box, drawn by the director who remembers exactly who signed early. Fortune favors the organized.",
            effect: { netWorth: 110_000, burnout: 15, title: "Senior Staff (Coup Class)" },
            next: "y10-poach",
          },
          {
            chance: 0.5,
            label: "Coup fails — the list gets published",
            text:
              "The SVP survives, as entrenched things do, and the supporter list finds its way to his desk within a week. Nothing formal happens — winters make firings loud — but your projects start dying of resource starvation. Exile, administered via budget.",
            effect: { netWorth: 40_000, burnout: 20 },
            next: "y10-poach",
          },
        ],
      },
    ],
  },
  {
    id: "y9-skiplevel-gamble",
    year: 9,
    age: 30,
    slot: "y9-politics",
    headline: "Over the VP's Head",
    text:
      "Your hostile VP has blocked your platform proposal three times with escalating creativity. The SVP — who once starred your incident writeup — has open office hours Thursday. Going over a VP's head is the org-chart equivalent of a trick shot: spectacular when it lands, unforgettable when it doesn't.",
    choices: [
      {
        id: "endure-the-vp",
        label: "Endure — outlast him with paper trails and patience",
        outcome: {
          text:
            "You document every blocked proposal with timestamps and projected costs, building a file that will outlive him. VPs rotate every eighteen months on average. Your paper trail has no rotation schedule.",
          effect: { netWorth: 65_000, burnout: 15 },
          next: "y10-poach",
        },
      },
      {
        id: "book-the-office-hours",
        label: "Book the Thursday slot — take it to the SVP",
        gamble: [
          {
            chance: 0.45,
            label: "SVP intervenes — proposal funded, VP defanged",
            text:
              "The SVP hears ten minutes, asks two questions, and ends the meeting with 'why hasn't this shipped?' The proposal gets funded over the VP's head by Friday, and the VP's blocking privileges quietly expire. Trick shot: nothing but net.",
            effect: { netWorth: 95_000, burnout: 10, title: "Principal Eng (SVP-Backed)" },
            next: "y10-poach",
          },
          {
            chance: 0.55,
            label: "SVP backs the chain of command",
            text:
              "The SVP listens politely and then does what SVPs mostly do: backs the hierarchy. 'Work it through your VP' arrives in writing, cc'd to the VP, who now has documentation of your Thursday adventure. The trick shot ricochets. It always could.",
            effect: { netWorth: 35_000, burnout: 25 },
            next: "y10-poach",
          },
        ],
      },
    ],
  },
  {
    id: "y9-zombie-equity-scoop",
    year: 9,
    age: 30,
    slot: "y9-zombie",
    headline: "The Departure Discount",
    text:
      "As colleagues flee the zombie, several offer to sell you their vested shares at desperation prices — 70% below the last round. The company is flat, not dead; the shares are cheap, not free. Buying your coworkers' abandoned hope is either vulture genius or doubling down on a horse that's lying down.",
    choices: [
      {
        id: "pass-on-scoop",
        label: "Pass — you already work here, that's exposure enough",
        outcome: {
          text:
            "You decline the discount politely and keep your capital diversified away from the building you sit in. The zombie shuffles on either way. Your portfolio doesn't smell like your employer, which auditors of your future sleep will appreciate.",
          effect: { netWorth: 60_000, burnout: 5 },
          next: "y10-poach",
        },
      },
      {
        id: "scoop-the-shares",
        label: "Buy every share offered — vulture pricing on hope",
        gamble: [
          {
            chance: 0.3,
            label: "PE acquisition at 3x — the vultures feast",
            text:
              "Fourteen months later the PE firm arrives with its EBITDA prayers and buys the zombie at 3x your entry. Your coworkers' desperation shares triple quietly in a spreadsheet nobody else saw. Vulture genius, confirmed — you buy the sellers a very awkward round of drinks.",
            effect: { netWorth: 130_000, burnout: 5 },
            next: "y10-poach",
          },
          {
            chance: 0.7,
            label: "Still a zombie — cheap shares, cheaper hope",
            text:
              "The zombie neither dies nor lives; it just continues, which is the one outcome your discount math didn't price. Your scooped shares sit in the same drawer as everyone else's, only more numerous. The horse remains lying down, breathing steadily.",
            effect: { netWorth: -30_000, burnout: 10 },
            next: "y10-poach",
          },
        ],
      },
    ],
  },
  {
    id: "y9-second-product-bet",
    year: 9,
    age: 30,
    slot: "y9-scale",
    headline: "The Second Act",
    text:
      "Your core product's growth is decelerating in the polite way charts do before board meetings get tense. The team has a second product concept — adjacent market, shared infrastructure, genuinely exciting. Multi-product companies are how empires happen. Split focus is how thirty-person companies die. Both statements are true.",
    choices: [
      {
        id: "focus-the-core",
        label: "Stay single-product — deceleration beats distraction",
        outcome: {
          text:
            "You kill the second act before it's born and pour everything into re-accelerating the core. The growth chart responds like a plant that's been watered: slowly, then visibly. One product, whole company. It's enough.",
          effect: { netWorth: 30_000, burnout: 10 },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "launch-product-two",
        label: "Green-light the second product — empires are multi-product",
        gamble: [
          {
            chance: 0.4,
            label: "Second product outgrows the first",
            text:
              "The adjacent market turns out to be the bigger one, and product two crosses product one's revenue in fourteen months. The board deck grows a second chart, then leads with it. Congratulations: you're a platform now, with the valuation grammar to match.",
            effect: { netWorth: 70_000, burnout: 15 },
            next: "y10-founder-crossroads",
          },
          {
            chance: 0.6,
            label: "Split focus — both products stall",
            text:
              "Thirty people running two roadmaps equals fifteen people running each, minus coordination tax. Both charts flatten in sympathy. You mercy-kill product two in Q3 and spend two quarters re-focusing the survivors. Empires, it turns out, are sequenced, not parallelized.",
            effect: { netWorth: -15_000, burnout: 25 },
            next: "y10-founder-crossroads",
          },
        ],
      },
    ],
  },
  {
    id: "y9-live-demo-bet",
    year: 9,
    age: 30,
    slot: "y9-scale",
    headline: "The Live Demo",
    text:
      "The industry's biggest conference offers you a keynote demo slot — five minutes, main stage, six thousand people, live. Your product demos beautifully 49 times out of 50. The 50th time involves a spinner that never stops spinning. Pre-recorded videos exist, but the crowd can smell them. Live is legend or blooper reel.",
    choices: [
      {
        id: "decline-keynote",
        label: "Decline the slot — ship the quarter instead",
        outcome: {
          text:
            "You pass the stage to a competitor who does fine, and spend the week closing two enterprise deals instead. Less legend, more revenue. The conference will run next year; the payroll runs monthly.",
          effect: { netWorth: 28_000, burnout: 10 },
          next: "y10-founder-crossroads",
        },
      },
      {
        id: "demo-live",
        label: "Demo live — legend or blooper reel, no net",
        gamble: [
          {
            chance: 0.6,
            label: "It lands — inbound floods for a quarter",
            text:
              "Five minutes, zero spinners, one spontaneous mid-demo applause break. The clip does numbers, the booth line wraps the hall, and inbound floods the pipeline for a full quarter. Live demos are a casino, and tonight the founder's table was hot.",
            effect: { netWorth: 55_000, burnout: 15 },
            next: "y10-founder-crossroads",
          },
          {
            chance: 0.4,
            label: "The spinner — six thousand witnesses",
            text:
              "The 50th time chooses the main stage. The spinner spins, the silence grows teeth, and your improvised 'well, that's why we have retries!' gets a mercy laugh. The blooper clip outperforms your entire marketing budget in reach, which is almost — almost — a win.",
            effect: { netWorth: 5_000, burnout: 25 },
            next: "y10-founder-crossroads",
          },
        ],
      },
    ],
  },
];
