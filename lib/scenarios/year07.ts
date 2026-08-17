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
    id: "y7-prompt-title-wars",
    year: 7,
    age: 28,
    slot: "y7-ai-goldrush",
    headline: "The Prompt Engineer Salary Leak",
    text:
      "An internal comp leak reveals the new 'AI Prompt Engineers' — hired last quarter, some without CS degrees — earn double your salary. One of them asked you yesterday what a database index is. The document spreads through the org like a controlled burn that isn't controlled.",
    choices: [
      {
        id: "retitle-yourself",
        label: "If you can't beat the title, take the title",
        outcome: {
          text:
            "You transfer to the AI org, learn the tooling in three weekends, and accept the comp band with a straight face. Same engineering skills, new label, double pay. The market is irrational; your mortgage is not.",
          effect: { netWorth: 95_000, burnout: 10, title: "AI Engineer (Rebranded)" },
          next: "y8-goldencage",
        },
      },
      {
        id: "comp-crusade",
        label: "Take the leak to leadership — fix the bands for everyone",
        outcome: {
          text:
            "You channel the org's rage into a comp-review campaign with spreadsheets instead of pitchforks. Six months later the bands converge upward — partially, grudgingly, historically. Half the org owes you a raise they'll never know about.",
          effect: { netWorth: 70_000, burnout: 15 },
          next: "y8-goldencage",
        },
      },
      {
        id: "quietly-both",
        label: "Say nothing, learn everything — become the bridge",
        outcome: {
          text:
            "You skip the outrage and become the rare engineer who speaks both systems and prompts fluently. Within a year the 'prompt engineer' title dies industry-wide, and the people who can actually do both inherit everything.",
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
    headline: "Voluntold: The AI Ethics Council",
    text:
      "The company forms an 'AI Responsibility Council' and your name is on it — nobody remembers volunteering you. The council has a charter, a Slack channel, and zero veto power. The first product it reviews ships before the review meeting ends.",
    choices: [
      {
        id: "take-it-seriously",
        label: "Take it seriously — make the rubber stamp grow teeth",
        outcome: {
          text:
            "You draft real review criteria, block one genuinely bad launch, and absorb the fury of three PMs. The council becomes something between respected and feared. 'Responsible AI' starts meaning a thing you personally enforce.",
          effect: { netWorth: 70_000, burnout: 15, title: "Senior Eng, AI Governance" },
          next: "y8-goldencage",
        },
      },
      {
        id: "rubber-stamp",
        label: "Attend, nod, approve — it's a checkbox and everyone knows it",
        outcome: {
          text:
            "You optimize the council for minimal calendar damage and keep shipping. When a launch goes sideways months later, the postmortem quotes the council's approval — with your name — and you learn what rubber stamps are actually for: fingerprints.",
          effect: { netWorth: 85_000, burnout: 10 },
          next: "y8-goldencage",
        },
      },
      {
        id: "leverage-the-seat",
        label: "Use the seat as a periscope into every org's roadmap",
        outcome: {
          text:
            "Review meetings turn out to be the best intelligence in the company: you see every launch a quarter early. You start placing yourself on the winning projects before they're announced. Ethics council: unexpectedly excellent career telescope.",
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
    id: "y7-referral-mafia",
    year: 7,
    age: 28,
    slot: "y7-comeback",
    headline: "The Alumni Mafia",
    text:
      "Your laid-off cohort turned itself into a referral machine: a Discord where ex-coworkers trade intros, interview intel, and offer numbers like a union with better memes. Three warm doors are open. All that's left is choosing which favor to call in — and owing it back forever.",
    choices: [
      {
        id: "call-every-favor",
        label: "Work the network shamelessly — that's what it's for",
        outcome: {
          text:
            "Two intros and one rigged mock interview later, you land a Staff-adjacent role you'd never have cold-applied to. The Discord pins your offer letter (numbers redacted, barely). You now owe the mafia. You will pay gladly, forever.",
          effect: { netWorth: 55_000, burnout: 10, title: "Senior SWE (Networked In)" },
          next: "y8-goldencage",
        },
      },
      {
        id: "cold-apply-pride",
        label: "Refuse the charity — earn it through the front door",
        outcome: {
          text:
            "You grind the open market on principle and land a fair offer that's 15% worse than the referred one would have been. Your pride is intact and slightly poorer. The Discord calls you 'the artisanal one.' It's not a compliment. It's not not one.",
          effect: { netWorth: 40_000, burnout: 20, title: "Senior SWE (Front Door)" },
          next: "y8-goldencage",
        },
      },
      {
        id: "join-alumni-startup",
        label: "Join the startup three alumni just founded",
        outcome: {
          text:
            "The band gets back together — same trust, no legacy code, and a seed check from a fund that bets on 'proven teams with grudges.' The equity might be worthless. The mornings aren't: you like these people, and it turns out that's most of the job.",
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
      "Three recruiters in one week suggest the same plot twist: 'With your communication skills, have you considered product?' The PM market is somehow hot while eng is lukewarm. You'd trade the compiler for roadmap decks — and the on-call pager for stakeholder feelings, which also page.",
    choices: [
      {
        id: "go-pm",
        label: "Take the PM role — influence without a pager",
        outcome: {
          text:
            "You cross the aisle and discover PM is engineering with worse tools and better lunches: same problems, argued in prose. Your eng background makes you dangerous in roadmap fights. The engineers trust you, which is the entire job, it turns out.",
          effect: { netWorth: 50_000, burnout: 10, title: "Senior Product Manager" },
          next: "y8-goldencage",
        },
      },
      {
        id: "double-down-eng",
        label: "Double down on engineering — depth is the moat",
        outcome: {
          text:
            "You politely decline the identity crisis and go deeper instead: distributed systems, the unfashionable kind of expertise that compounds. When the market fully recovers, depth is what's scarce — and scarce is what's paid.",
          effect: { netWorth: 45_000, burnout: 15, title: "Senior SWE (Deep End)" },
          next: "y8-goldencage",
        },
      },
      {
        id: "devrel-detour",
        label: "Split the difference — developer advocacy",
        outcome: {
          text:
            "Code half the week, conference talks the other half, and an audience that grows every time you're honest about tradeoffs. The pay is decent, the travel is real, and 'what do you actually do' becomes your hardest technical question.",
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
          achievement: "big-bonus",
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
    id: "y7-new-cto-above",
    year: 7,
    age: 28,
    slot: "y7-survivor",
    headline: "The Adult the Board Ordered",
    text:
      "The board's one condition for the bridge round arrives on a Monday: a new CTO, twenty years your senior, hired 'to add experience.' He's read about your winter heroics. He also reorganized his last three companies into org charts shaped like his opinions.",
    choices: [
      {
        id: "ally-with-cto",
        label: "Become his right hand — absorb everything he knows",
        outcome: {
          text:
            "You choose apprenticeship over turf war and he teaches you the stuff no blog post covers: board management, pricing wars, when to sandbag a forecast. When he retires in two years, his recommendation letter is one sentence: 'Hire them before I do.'",
          effect: { netWorth: 50_000, burnout: 10, title: "VP Eng (Heir Apparent)" },
          next: "y8-acquisition",
        },
      },
      {
        id: "outshine-him",
        label: "Compete — the org already follows you anyway",
        outcome: {
          text:
            "You out-ship, out-know, and out-loyalty him for three straight quarters until the org chart is a technicality. He leaves 'for a bigger opportunity' and the board hands you the title with a knowing look. Expensive way to learn you didn't need permission.",
          effect: { netWorth: 55_000, burnout: 25, title: "CTO (By Attrition)" },
          next: "y8-acquisition",
        },
      },
      {
        id: "take-payout-leave",
        label: "Read the signal — cash the retention and exit up",
        outcome: {
          text:
            "A board that hires above you has told you the ceiling's height. You finish the retention cliff, hand over a clean org, and take a Staff role at Big Tech where the politics are at least well-funded. No hard feelings. Just arithmetic.",
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
      "The freeze lifts and you can finally hire again — three headcount for a mountain of work. Your DMs are full of the people you laid off eight months ago, some gracious, some rightfully bitter, all excellent. HR suggests 'fresh perspectives.' Your guilt suggests otherwise.",
    choices: [
      {
        id: "rehire-the-best",
        label: "Bring back the best of the laid-off — with raises",
        outcome: {
          text:
            "Three boomerangs return at corrected salaries, onboarded in a day because they never mentally left. The message to the whole org is louder than any all-hands: people here get treated like people, eventually, with interest.",
          effect: { netWorth: 40_000, burnout: 10 },
          next: "y8-acquisition",
        },
      },
      {
        id: "fresh-blood",
        label: "Hire new — the winter team needs new DNA, not reruns",
        outcome: {
          text:
            "You hire three outsiders who ask 'why is it built this way' until the org actually answers. The boomerang candidates land well elsewhere; two send gracious notes, one sends nothing, which is also an answer. The new blood transfuses.",
          effect: { netWorth: 45_000, burnout: 15 },
          next: "y8-acquisition",
        },
      },
      {
        id: "hybrid-bench",
        label: "One boomerang, one new grad, one wildcard",
        outcome: {
          text:
            "The portfolio approach: experience, energy, and a career-switcher from aerospace who refactors like she's stress-testing a wing. The team chemistry shouldn't work and absolutely does. Diversification: not just for RSUs.",
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
  {
    id: "y7-bigco-clone",
    year: 7,
    age: 28,
    slot: "y7-founder-grind",
    headline: "The Giant Clones You",
    text:
      "A trillion-dollar company announces, at its developer conference, a feature that is your entire product — same use case, same UI patterns, suspiciously same onboarding copy. The keynote audience applauds. Your investors text 'thoughts?' Your traffic doubles from the attention. Panic and opportunity, arriving together.",
    choices: [
      {
        id: "outrun-them",
        label: "Outrun them — ship weekly while they ship quarterly",
        outcome: {
          text:
            "Their version needs six teams and a VP alignment offsite per feature; yours needs a Tuesday. A year later theirs is 'in maintenance mode' and your churn from the scare is fully recovered. Speed is the moat nobody can acquire.",
          effect: { netWorth: 40_000, burnout: 25 },
          next: "y8-seriesa",
        },
      },
      {
        id: "niche-harder",
        label: "Niche down — own the workflows a giant can't bother with",
        outcome: {
          text:
            "You go deep on the regulated, ugly, lucrative corners of the use case that a keynote will never mention. The giant keeps the tourists; you keep the professionals — who, conveniently, are the ones with budgets.",
          effect: { netWorth: 50_000, burnout: 10 },
          next: "y8-seriesa",
        },
      },
      {
        id: "they-copied-us",
        label: "Write the 'they copied us' thread — turn theft into distribution",
        outcome: {
          text:
            "Screenshots, side-by-sides, and one perfectly-calibrated tone of aggrieved-but-classy. The thread does eight figures of impressions; 'the startup that got cloned' becomes your brand and your funnel. Being wronged, correctly narrated, is marketing.",
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
      "Your bookkeeper triple-checks and confirms the impossible: last quarter, the company made money. Actual profit, in a winter, without meaning to. The VCs who ghosted you last year are suddenly 'circling back' — funny how Q3 finally arrived. You have leverage for the first time. It's disorienting.",
    choices: [
      {
        id: "raise-on-strength",
        label: "Raise now — on your terms, from a position of strength",
        outcome: {
          text:
            "Profitable founders write their own term sheets, it turns out. You raise a modest round at a kind valuation with clean terms, from the one fund that answered emails in the winter. Everyone else gets a polite pass and a screenshot for your memoir.",
          effect: { netWorth: 30_000, burnout: 10 },
          next: "y8-seriesa",
        },
      },
      {
        id: "default-alive-forever",
        label: "Stay default alive — profit IS the strategy now",
        outcome: {
          text:
            "You frame the P&L (literally, above your desk) and keep compounding without dilution. Growth is slower; ownership is total; board meetings remain a mirror. The VCs call it 'lifestyle.' Your accountant calls it 'rare.'",
          effect: { netWorth: 45_000, burnout: 5, title: "Founder (Default Alive)" },
          next: "y8-seriesa",
        },
      },
      {
        id: "splurge-on-growth",
        label: "Reinvest everything — pour the profit into growth",
        outcome: {
          text:
            "You hire two salespeople and turn the marketing dial from 'word of mouth' to 'measurable.' The P&L dips back to red — the intentional kind this time, each dollar traced. Profit was proof; growth is the plan.",
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
      "A two-month-old AI startup — three researchers and a demo that made you say 'oh no' out loud — offers you founding engineer: half your current salary, 2% equity, and a seat on what might be the wave of the decade. Your Big Tech comp is excellent and feels, suddenly, like a very comfortable way to miss everything.",
    choices: [
      {
        id: "stay-ai-adjacent",
        label: "Stay at Big Tech — ride the wave from a yacht, not a surfboard",
        outcome: {
          text:
            "You keep the comp and work the AI beat from inside the fortress: big models, big GPUs, big paychecks. The seed startup's journey will be someone else's memoir. Yours has a 401(k) match.",
          effect: { netWorth: 85_000, burnout: 10 },
          next: "y8-goldencage",
        },
      },
      {
        id: "join-the-seed",
        label: "Take the surfboard — founding engineer at the seed startup",
        gamble: [
          {
            chance: 0.3,
            label: "Breakout — Series A at 10x in nine months",
            text:
              "The demo that made you say 'oh no' makes the market say it louder: a preempted Series A at 10x the seed price, your 2% suddenly worth a real house. You're early at the breakout company of the cycle, with the war stories accruing daily.",
            effect: { netWorth: 120_000, burnout: 20, title: "Founding Eng (Breakout)" },
            next: "y8-goldencage",
          },
          {
            chance: 0.7,
            label: "GPU bills eat the seed round",
            text:
              "The models are hungry and the seed round is finite: compute burns 70% of the raise before product-market fit shows up. The startup sells its research team quietly and returns the rest. Half salary for a year, one incredible education, zero regrets you'll admit to.",
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
      "A credible leak says a trillion-dollar company is opening a major engineering hub in a cheap, sunny city — hiring thousands, with early joiners getting seniority gravity for years. Moving there BEFORE the announcement means betting a cross-country move on a rumor. Real estate there is still cheap. So is talk.",
    choices: [
      {
        id: "stay-remote-safe",
        label: "Stay put — rumors don't pay moving costs",
        outcome: {
          text:
            "You keep the remote setup and the known life. The hub rumor resolves eventually — they always do, one way or the other — and either way, your couch stays where you like it.",
          effect: { netWorth: 35_000, burnout: 5 },
          next: "y8-goldencage",
        },
      },
      {
        id: "move-on-the-rumor",
        label: "Move early — be local before the gold rush",
        gamble: [
          {
            chance: 0.5,
            label: "Hub opens — early-mover advantage compounds",
            text:
              "The announcement drops eight months after your boxes did, and suddenly you're the rare 'local hire with tenure in the ecosystem.' You join the hub's founding class with a promotion attached, and your cheap house appreciates like it heard the news too.",
            effect: { netWorth: 65_000, burnout: 10, title: "Senior SWE (Hub Founding Class)" },
            next: "y8-goldencage",
          },
          {
            chance: 0.5,
            label: "Hub canceled — new city, old job hunt",
            text:
              "'Strategic re-evaluation of our real estate footprint.' The hub dies in a press release, and you're job hunting from a city chosen by a rumor. The sun is real, at least. The gold rush was a weather report.",
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
      "The CEO, rebuilding from the winter wreckage, offers the survivors a deal: cut your salary 40% for a year in exchange for 4x the equity — a bet that the turnaround you're personally building will actually work. It's the most honest comp conversation you've ever had. It's also poker with your own rent.",
    choices: [
      {
        id: "keep-salary",
        label: "Keep the salary — you've bet enough on this company",
        outcome: {
          text:
            "You decline the swap and keep the paycheck; your labor is already the biggest position you hold here. The turnaround proceeds either way — with your effort, not your rent money.",
          effect: { netWorth: 45_000, burnout: 15 },
          next: "y8-acquisition",
        },
      },
      {
        id: "swap-for-equity",
        label: "Take the swap — 40% pay cut for 4x equity",
        gamble: [
          {
            chance: 0.45,
            label: "Turnaround works — the equity 5x's",
            text:
              "The lean year works: revenue stabilizes, a recovery round reprices everything upward, and your 4x grant lands on a 5x valuation. The salary you gave up comes back as a multiple. The CEO frames the offer letter. So do you.",
            effect: { netWorth: 90_000, burnout: 15 },
            next: "y8-acquisition",
          },
          {
            chance: 0.55,
            label: "Slow bleed continues — cheap year, expensive lesson",
            text:
              "The turnaround turns slowly, then not much at all. You worked a brutal year at 60% pay for equity that stays decorative. The CEO's gratitude is genuine and non-transferable. Rent poker: the house won this hand.",
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
      "Your entire annual marketing budget fits in one hand — and your head of growth wants to spend it all on a single coordinated launch: press embargo, conference keynote slot, influencer seeding, one perfect Tuesday. The alternative is the drip: small, steady, survivable. The launch either detonates or fizzles. Tuesdays don't negotiate.",
    choices: [
      {
        id: "drip-marketing",
        label: "Drip it — twelve months of small, steady bets",
        outcome: {
          text:
            "You spread the budget across the year like a sensible farmer, and the funnel grows the boring way: measurably. No fireworks, no craters. The growth chart looks like a staircase built by someone patient.",
          effect: { netWorth: 30_000, burnout: 10 },
          next: "y8-seriesa",
        },
      },
      {
        id: "bet-the-launch",
        label: "One perfect Tuesday — bet the budget on the big launch",
        gamble: [
          {
            chance: 0.5,
            label: "It detonates — the launch goes genuinely viral",
            text:
              "The embargo holds, the keynote lands, and by Tuesday night your signup queue has a queue. A month of traffic arrives in a day, and — the real prize — it sticks. 'Where were you during the launch' becomes company lore.",
            effect: { netWorth: 75_000, burnout: 10 },
            next: "y8-seriesa",
          },
          {
            chance: 0.5,
            label: "Crickets — the internet was busy that day",
            text:
              "A bigger company announces a bigger thing four hours before your embargo lifts, and your perfect Tuesday dies in its shadow. The budget is spent, the press pieces run on page nine, and the funnel shrugs. Timing: rented, never owned.",
            effect: { netWorth: -20_000, burnout: 20 },
            next: "y8-seriesa",
          },
        ],
      },
    ],
  },
];
