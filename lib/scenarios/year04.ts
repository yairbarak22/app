import type { Scenario } from "../types";

/**
 * YEAR 4 (age 25) — mid-game setup.
 * Pools: y4-bigtech-handcuffs (+2), y4-open-market (+2),
 *        y4-founder-garage (+2), y4-startup-scale (+2).
 */
export const YEAR_04: Scenario[] = [
  // ---------------------------------------------------------------- Big Tech
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
        outcome: {
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
    id: "y4-ai-team-transfer",
    year: 4,
    age: 25,
    slot: "y4-bigtech-handcuffs",
    headline: "The Internal Gold Rush",
    text:
      "The company spins up an elite internal AI team, and the transfer posting reads like a velvet rope: 'top performers only.' Half your org applies within the hour. Your current team, meanwhile, still needs you to ship the roadmap you promised.",
    choices: [
      {
        id: "fight-for-seat",
        label: "Fight for a seat on the AI team",
        outcome: {
          text:
            "Two internal interviews and one strategic coffee later, you're in. The work is bleeding-edge, the scrutiny is constant, and your old team's goodbye card has a passive-aggressive haiku in it. Worth it.",
          effect: { netWorth: 70_000, burnout: 20, title: "SWE, AI Platform" },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "stay-loyal-ship",
        label: "Stay and ship what you promised",
        outcome: {
          text:
            "You finish the roadmap while the transfer window closes. Your director notices — the one person who didn't chase the shiny thing. That reputation compounds quietly, like a bond ladder made of trust.",
          effect: { netWorth: 65_000, burnout: 5 },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "both-jobs",
        label: "Do both — day job plus 20% on the AI team",
        outcome: {
          text:
            "The '20% project' is 40% and everyone knows it. You're visible in two orgs and asleep in neither. Your calendar looks like a merge conflict. Both teams would fight to keep you, which is the plan.",
          effect: { netWorth: 80_000, burnout: 30 },
          next: "y5-bigtech-staffpacket",
        },
      },
    ],
  },
  {
    id: "y4-manager-chair",
    year: 4,
    age: 25,
    slot: "y4-bigtech-handcuffs",
    headline: "The Empty Manager Chair",
    text:
      "Your manager leaves for a startup and the director offers you the chair 'on an interim basis' — the corporate phrase for 'prove it for free.' The team is watching. The other candidate is the guy who schedules meetings about meetings.",
    choices: [
      {
        id: "take-em-role",
        label: "Take the chair — someone has to protect this team",
        outcome: {
          text:
            "'Interim' lasts four months, then the title sticks. You spend your days shielding the team from the org and your evenings missing the compiler. Management: the art of being tired in a different way.",
          effect: { netWorth: 70_000, burnout: 15, title: "Engineering Manager" },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "recruit-own-boss",
        label: "Decline — then hand-pick your next boss yourself",
        outcome: {
          text:
            "You interview every EM candidate 'informally' and steer the offer to the one who asks about the team's health before its velocity. Best hire you never made officially. The meeting-scheduler guy remains at large.",
          effect: { netWorth: 62_000, burnout: 0 },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "interim-then-back",
        label: "Try it interim — with a written escape hatch back to IC",
        outcome: {
          text:
            "Four months of calendar Tetris confirm the hypothesis: you love building things and merely tolerate humans in aggregate. You exercise the escape clause with zero shame and a priceless new empathy for every manager you'll ever have.",
          effect: { netWorth: 66_000, burnout: 10, title: "Senior SWE (Returned IC)" },
          next: "y5-bigtech-staffpacket",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Open market
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
    id: "y4-ghosting-season",
    year: 4,
    age: 25,
    slot: "y4-open-market",
    headline: "Ghosting Season",
    text:
      "You've done nine final rounds this quarter. Two companies ghosted after the 'team fit dinner.' One sent a rejection addressed to a different candidate's name. Your therapist now starts sessions with 'any word from the fintech one?'",
    choices: [
      {
        id: "spreadsheet-warfare",
        label: "Go full spreadsheet warfare — treat the search like a sales pipeline",
        outcome: {
          text:
            "Forty leads, staged follow-ups, conversion metrics. Dehumanizing the process weirdly rehumanizes you — rejections become churn, not verdicts. Week six, the pipeline converts: a solid Senior offer from a company that answered emails.",
          effect: { netWorth: 40_000, burnout: 10, title: "Senior SWE (Rehired)" },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "contract-bridge",
        label: "Take contract work and stop chasing full-time for a while",
        outcome: {
          text:
            "Three-month contracts at rates that make salaried friends do arithmetic at parties. No promo cycles, no performance reviews, no pretending to care about Q3 OKRs. One client is a rocket-ship startup that keeps hinting at conversion.",
          effect: { netWorth: 55_000, burnout: 10, title: "Contract Engineer" },
          next: "y5-rocketship",
        },
      },
      {
        id: "niche-down",
        label: "Niche down hard — become 'the payments infrastructure person'",
        outcome: {
          text:
            "You stop being one of 3,000 generalists and become one of twelve people who deeply understand card-network reconciliation. Suddenly recruiters use your first name. Specialization: the cheat code nobody wants to hear about.",
          effect: { netWorth: 48_000, burnout: 15, title: "Senior SWE (Payments)" },
          next: "y5-bigtech-staffpacket",
        },
      },
    ],
  },
  {
    id: "y4-bootcamp-arc",
    year: 4,
    age: 25,
    slot: "y4-open-market",
    headline: "The Teaching Arc",
    text:
      "A coding bootcamp offers you a teaching gig while you hunt: decent pay, grateful students, and the strange healing power of explaining closures to someone who actually wants to know. Meanwhile your LeetCode streak guilt-trips you nightly.",
    choices: [
      {
        id: "teach-and-heal",
        label: "Teach for a while — remember why you liked this",
        outcome: {
          text:
            "Turns out you love this. Your students ship janky, glorious projects and one cries at graduation. You return to interviewing with your soul re-inflated — and an answer to 'tell me about leadership' that's actually true.",
          effect: { netWorth: 25_000, burnout: -15, title: "Instructor & Engineer" },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "leetcode-monk",
        label: "Decline. Enter LeetCode monk mode — 90 days, 300 problems",
        outcome: {
          text:
            "You live in the grind house: two problems before breakfast, mock interviews at lunch, system design before bed. It's joyless and it works — you re-enter Big Tech through the front door with a level bump.",
          effect: { netWorth: 42_000, burnout: 20, title: "Senior SWE @ Big Tech" },
          next: "y5-bigtech-staffpacket",
        },
      },
      {
        id: "build-in-public",
        label: "Build your side project in public instead",
        outcome: {
          text:
            "Daily changelogs, honest metrics, a tiny devoted audience. By month four it makes actual revenue — small, but yours. The job hunt quietly becomes optional, which changes its taste entirely.",
          effect: { netWorth: 18_000, burnout: 5, title: "Indie Hacker" },
          next: "y5-founder-pmf",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Founder
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
    id: "y4-cofounder-dating",
    year: 4,
    age: 25,
    slot: "y4-founder-garage",
    headline: "Cofounder Dating",
    text:
      "Everyone says 'don't found alone,' so you've been cofounder dating: a sales guy who says 'rocket ship' unironically, your best friend from college, and a stranger from a matching site whose calendar is suspiciously empty. Choosing wrong costs years. So does choosing nothing.",
    choices: [
      {
        id: "solo-anyway",
        label: "Found alone. You've met your options",
        outcome: {
          text:
            "You do everything: code, sales, and arguing with yourself in the mirror for board practice. It's slower and lonelier — but every equity point is yours, and there's nobody to fight with except the compiler.",
          effect: { netWorth: 10_000, burnout: 20, title: "Solo Founder" },
          next: "y5-founder-pmf",
        },
      },
      {
        id: "take-sales-guy",
        label: "Take the sales guy — you can't sell and he can't code. Perfect",
        outcome: {
          text:
            "He closes your first three customers off a demo held together with tape, and you grudgingly admit the 'rocket ship' guy is the reason there's revenue. You still veto his tweet drafts, chief product decision of the year.",
          effect: { netWorth: 18_000, burnout: 10, title: "Cofounder & CTO" },
          next: "y5-founder-pmf",
        },
      },
      {
        id: "best-friend-5050",
        label: "50/50 with your best friend, handshake and all",
        outcome: {
          text:
            "Working with your best friend is the best thing that's ever happened to the company and a slow-motion gamble with the friendship. You write the awkward 'what if this goes bad' doc anyway. Adults now. Technically.",
          effect: { netWorth: 8_000, burnout: 10, title: "Cofounder & CTO" },
          next: "y5-founder-pmf",
        },
      },
    ],
  },
  {
    id: "y4-first-check",
    year: 4,
    age: 25,
    slot: "y4-founder-garage",
    headline: "The First Check",
    text:
      "An angel offers your first real check — $200K on a SAFE with a cap so low your lawyer friend does a spit-take. He also wants 'weekly involvement' and once described himself as a 'micro-VC macro-thinker.' The bank balance says listen.",
    choices: [
      {
        id: "take-the-check",
        label: "Take it. Oxygen now, dilution later",
        outcome: {
          text:
            "The wire hits and payroll exists now. So do the Monday 'jam sessions' where he shares screenshots of competitors and asks 'thoughts?' You mute strategically. Runway: extended. Cap table: scarred but alive.",
          effect: { netWorth: 25_000, burnout: 15 },
          next: "y5-founder-pmf",
        },
      },
      {
        id: "revenue-instead",
        label: "Pass — grind to revenue and keep the cap table clean",
        outcome: {
          text:
            "You close three customers on discounted annual prepays instead — worse money, infinitely better bosses. The cap table stays pristine, a fact future-you will toast at every subsequent negotiation.",
          effect: { netWorth: 15_000, burnout: 15, title: "Bootstrapped Founder" },
          next: "y5-founder-pmf",
        },
      },
      {
        id: "accelerator-abroad",
        label: "Join a foreign accelerator with a stipend and a stage",
        outcome: {
          text:
            "Three months in a European program: modest stipend, brutal mentor feedback, and a demo day in a converted cathedral. You come home with an international customer and opinions about espresso.",
          effect: { netWorth: 8_000, burnout: 10 },
          next: "y5-founder-pmf",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Startup employee
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
  {
    id: "y4-equity-refresh",
    year: 4,
    age: 25,
    slot: "y4-startup-scale",
    headline: "The 409A Awakening",
    text:
      "Post-Series-A paperwork reveals what your options are 'worth,' and the spreadsheet requires several assumptions, two of which are load-bearing fantasies. The founder offers a comp conversation. You've been reading about how this works. He knows you've been reading.",
    choices: [
      {
        id: "negotiate-hard",
        label: "Negotiate hard — comps, benchmarks, the whole memo",
        outcome: {
          text:
            "You arrive with market data and leave with a raise, a refresh, and the founder's grudging respect. 'You've been talking to someone.' Yes: the internet, where the salaries are public now. Welcome to the new meta.",
          effect: { netWorth: 45_000, burnout: 10 },
          next: "y5-startup-seriesb",
        },
      },
      {
        id: "accept-graciously",
        label: "Accept the standard refresh and keep the peace",
        outcome: {
          text:
            "You take the offer as given and stay the founder's easiest conversation. It buys goodwill you can't put in a bank — and leaves money there instead. Both facts will matter later, in opposite directions.",
          effect: { netWorth: 25_000, burnout: 5 },
          next: "y5-startup-seriesb",
        },
      },
      {
        id: "salary-for-equity",
        label: "Trade salary for more equity — you're here for the upside",
        outcome: {
          text:
            "You take a pay cut for a bigger slice, a bet your landlord does not co-sign. If this works, it's the best trade of your life. If it doesn't, it's a very expensive lesson in the phrase 'preferred stock.'",
          effect: { netWorth: 5_000, burnout: 10 },
          next: "y5-startup-seriesb",
        },
      },
    ],
  },
  {
    id: "y4-monolith-reckoning",
    year: 4,
    age: 25,
    slot: "y4-startup-scale",
    headline: "The Monolith You Built",
    text:
      "The codebase you heroically wrote in year one is now the thing every new hire complains about in their first week. The deploy takes 40 minutes, the tests are 'aspirational,' and someone just used the word 'legacy' about code you wrote at 23.",
    choices: [
      {
        id: "lead-the-rewrite",
        label: "Lead the great rewrite yourself — your mess, your mop",
        outcome: {
          text:
            "Nine months of strangler-fig migration while the feature roadmap breathes down your neck. You emerge with a system that new hires compliment — not knowing they're complimenting your apology. Deeply satisfying either way.",
          effect: { netWorth: 30_000, burnout: 25, title: "Principal Eng (Redemption Arc)" },
          next: "y5-startup-seriesb",
        },
      },
      {
        id: "duct-tape-velocity",
        label: "Defend the monolith — duct tape and ship features",
        outcome: {
          text:
            "'It's not legacy, it's proven,' you say, patching around the cracks while sales keeps selling. The company grows faster than the code rots — barely. Somewhere a future engineer curses your name. They'll understand someday.",
          effect: { netWorth: 35_000, burnout: 15 },
          next: "y5-startup-seriesb",
        },
      },
      {
        id: "hire-consultants",
        label: "Bring in the fancy consultants to 'assess the architecture'",
        outcome: {
          text:
            "Six weeks and a shocking invoice later, their deck recommends... exactly what you'd been saying, but in Helvetica. The founder finally listens because it costs money now. You cite this event in every future argument.",
          effect: { netWorth: 20_000, burnout: 10 },
          next: "y5-startup-seriesb",
        },
      },
    ],
  },
];
