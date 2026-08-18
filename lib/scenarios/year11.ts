import type { Scenario } from "../types";

/**
 * YEAR 11 (age 32) — golden years and empire decisions.
 * Pools: y11-goldenyears (+3), y11-empire (+3).
 */
export const YEAR_11: Scenario[] = [
  // ---------------------------------------------------------------- Golden years
  {
    id: "y11-goldenyears",
    year: 11,
    age: 32,
    headline: "The Golden Years",
    text:
      "Your comp is a number you don't say at family dinners. A peer with a better marathon time just had a cardiac event in a QBR. He's fine. You're not, exactly. You start doing the math on 'enough.'",
    choices: [
      {
        id: "keep-stacking",
        label: "Keep stacking — compounding at max speed",
        outcome: {
          text:
            "The highest-earning years of your life, treated like a harvest: vest, invest, repeat. The retirement tab now has a date in it — closer than you thought.",
          effect: { netWorth: 180_000, burnout: 20 },
          next: "y12-fumoney",
        },
      },
      {
        id: "downshift",
        label: "Downshift to four days — buy back Fridays",
        outcome: {
          text:
            "You negotiate 80% time and coach youth robotics on Fridays. Nobody at work notices. The kids' robot is terrible and you love it more than anything you shipped.",
          effect: { netWorth: 90_000, burnout: -20 },
          next: "y12-fumoney",
        },
      },
      {
        id: "nonprofit-tour",
        label: "Take the nonprofit mission job",
        outcome: {
          text:
            "A 70% pay cut to make government benefits sites work. The impact shows up as humans, not dashboards. Old coworkers say 'so cool' with genuine confusion.",
          effect: { netWorth: 20_000, burnout: -25, title: "Staff Eng @ Nonprofit" },
          next: "y12-fumoney",
        },
      },
    ],
  },
  {
    id: "y11-parents-retire",
    year: 11,
    age: 32,
    slot: "y11-goldenyears",
    headline: "The Parents' Ledger",
    text:
      "Your parents retire — the ones who co-signed the loans and still think 'the cloud' is weather. The family's financial gravity now points at you. It's an honor. It's also a spreadsheet.",
    choices: [
      {
        id: "fund-their-retirement",
        label: "Quietly fund the gap",
        outcome: {
          text:
            "You set up the transfers and call it 'a work benefit thing.' Best money you'll ever spend; the spreadsheet agrees on no metric and you don't care.",
          effect: { netWorth: -100_000, burnout: -10 },
          next: "y12-fumoney",
        },
      },
      {
        id: "keep-stacking-first",
        label: "Secure your own mask first",
        outcome: {
          text:
            "Oxygen-mask logic: two more max-earning years make the help permanent, not hopeful. Correct math, uncomfortable coat. You automate a small transfer anyway.",
          effect: { netWorth: 170_000, burnout: 15 },
          next: "y12-fumoney",
        },
      },
      {
        id: "move-them-close",
        label: "Move them close and downshift",
        outcome: {
          text:
            "You buy the duplex two streets over, shift to four days, and discover Sunday dinner is a better recurring meeting than anything on your work calendar.",
          effect: { netWorth: 80_000, burnout: -15 },
          next: "y12-fumoney",
        },
      },
    ],
  },
  {
    id: "y11-distinguished-offer",
    year: 11,
    age: 32,
    slot: "y11-goldenyears",
    headline: "The Last Rung",
    text:
      "The Distinguished Engineer offer lands — the IC ladder's final rung. The job description: 'define the technical future of the company.' Twelve people hold this title. Eleven look exhausted.",
    choices: [
      {
        id: "take-the-crown",
        label: "Take it — summit or nothing",
        outcome: {
          text:
            "The last rung is real: your words move roadmaps you've never seen; your comp makes your accountant laugh. The weight is as advertised. So is the view.",
          effect: { netWorth: 200_000, burnout: 20, title: "Distinguished Engineer" },
          next: "y12-fumoney",
        },
      },
      {
        id: "decline-protect-life",
        label: "Decline — protect your life",
        outcome: {
          text:
            "The 'no' takes three drafts. Principal is a wonderful place to live: high pay, real impact, evenings that are yours. The stunned silence is its own trophy.",
          effect: { netWorth: 120_000, burnout: -10 },
          next: "y12-fumoney",
        },
      },
      {
        id: "take-and-delegate",
        label: "Take it on your own terms",
        outcome: {
          text:
            "Conditions in writing: two focus areas, no ceremonial meetings, one no-Slack day. Leadership blinks, then agrees. The last rung is negotiable if you'll walk.",
          effect: { netWorth: 160_000, burnout: 10, title: "Distinguished Engineer (On Terms)" },
          next: "y12-fumoney",
        },
      },
    ],
  },
  {
    id: "y11-the-warning-shot",
    year: 11,
    age: 32,
    slot: "y11-goldenyears",
    headline: "The Warning Shot",
    text:
      "You fall asleep in a QBR — fully asleep, head-tilt, the works — and wake up in urgent care with 'severe dehydration and whatever your job is.' The doctor asks your hours. You lie. The chart doesn't.",
    choices: [
      {
        id: "full-stop-month",
        label: "Full stop — take the medical leave",
        outcome: {
          text:
            "A month of mandated nothing: walks, vegetables, guilt-free sleep. The org survives without you — which stings for a week, then liberates you forever.",
          effect: { netWorth: 60_000, burnout: -25 },
          next: "y12-fumoney",
        },
      },
      {
        id: "ignore-and-push",
        label: "Hydrate and close Q4 anyway",
        outcome: {
          text:
            "You buy a smart water bottle, ignore everything else, and close your strongest quarter on fumes. Two scoreboards, one body. The body keeps score longer.",
          effect: { netWorth: 150_000, burnout: 30 },
          next: "y12-fumoney",
        },
      },
      {
        id: "chief-of-staff-life",
        label: "Staff your life — trainer, chef, therapist",
        outcome: {
          text:
            "You staff your life like the executive function it requires. Costs a comical amount, returns double: most of your stress was logistics in a trench coat.",
          effect: { netWorth: 100_000, burnout: -15 },
          next: "y12-fumoney",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Empire
  {
    id: "y11-empire",
    year: 11,
    age: 32,
    headline: "The Term Sheet & The Trigger",
    text:
      "Both doors open the same month: a signed acquisition offer that ends your working life, and a Series B term sheet to build the empire. The board is split. Two weeks, one decision.",
    choices: [
      {
        id: "sign-acquisition",
        label: "Sign the acquisition — take the money",
        outcome: {
          text:
            "Terrible conference-room lighting, Safeway champagne. The wire has commas you count twice. The product will die inside the acquirer. The money will not.",
          effect: { netWorth: 900_000, burnout: 10, title: "Exited Founder" },
          next: "y12-postexit",
        },
      },
      {
        id: "series-b-bigger",
        label: "Take the Series B — all the way",
        outcome: {
          text:
            "You turn down life-changing money to chase generational money. The B closes, targets triple, and the board adds a partner who says 'velocity' as a sentence.",
          effect: { netWorth: 50_000, burnout: 20 },
          next: "y12-warpath",
        },
      },
      {
        id: "secondary-in-round",
        label: "Take the B — with a fat secondary",
        outcome: {
          text:
            "You sign the B and quietly sell 15% into the round. The empire dream lives AND the family is set. VCs call it 'chips off the table.' You call it sleep.",
          effect: { netWorth: 250_000, burnout: 10 },
          next: "y12-warpath",
        },
      },
    ],
  },
  {
    id: "y11-unicorn-round",
    year: 11,
    age: 32,
    slot: "y11-empire",
    headline: "The Unicorn Round",
    text:
      "The term sheet says $1.04 billion — the extra $40M added 'so the headline works.' The team refreshes TechCrunch hourly. The preference stack underneath does quieter math.",
    choices: [
      {
        id: "take-the-horn",
        label: "Take the horn — the headline IS a weapon",
        outcome: {
          text:
            "Recruiting triples and your parents finally understand you ('billion' translates). Underneath, the preference stack raises your exit bar. Headlines are loans.",
          effect: { netWorth: 100_000, burnout: 15, title: "Unicorn CEO" },
          next: "y12-warpath",
        },
      },
      {
        id: "flat-clean-round",
        label: "Raise less at clean terms",
        outcome: {
          text:
            "A smaller round, honest number, vanilla terms. The press writes nothing — that's the point. The team grumbles a week; your future self sends a thank-you note.",
          effect: { netWorth: 60_000, burnout: 10 },
          next: "y12-warpath",
        },
      },
      {
        id: "sell-instead",
        label: "Use it as a stalking horse — sell",
        outcome: {
          text:
            "A billion-dollar term sheet is the best acquisition marketing ever printed. A strategic bites at a number that makes 'unicorn' feel abstract. You take it.",
          effect: { netWorth: 850_000, burnout: 10, title: "Exited Founder" },
          next: "y12-postexit",
        },
      },
    ],
  },
  {
    id: "y11-merger-of-equals",
    year: 11,
    age: 32,
    slot: "y11-empire",
    headline: "The Merger of Equals",
    text:
      "Your biggest rival's CEO suggests dinner, then a merger of equals. Combined, you'd own the category overnight. 'Equals' survives until the org chart draft. You're both smiling about who runs it.",
    choices: [
      {
        id: "merge-and-win-chart",
        label: "Merge — and win the org chart",
        outcome: {
          text:
            "Four months of 'governance' later, you're CEO and he's 'President, Strategy' — a title with a half-life. You own the market. The integration owns your year.",
          effect: { netWorth: 300_000, burnout: 20, title: "CEO (Merged Entity)" },
          next: "y12-warpath",
        },
      },
      {
        id: "refuse-compete",
        label: "Decline — beat them, don't marry them",
        outcome: {
          text:
            "You go back to competing with renewed venom. The rivalry sharpens both companies; analysts call the category 'unusually well-served.' You call it personal.",
          effect: { netWorth: 40_000, burnout: 20 },
          next: "y12-warpath",
        },
      },
      {
        id: "sell-to-rival",
        label: "Counter: an expensive acquisition of you",
        outcome: {
          text:
            "'Equals is a fiction. Buy me properly or compete forever.' They buy you properly — the premium itemizes two years of lost deals. You exit extremely liquid.",
          effect: { netWorth: 800_000, burnout: 10, title: "Exited Founder" },
          next: "y12-postexit",
        },
      },
    ],
  },
  {
    id: "y11-founder-body-bill",
    year: 11,
    age: 32,
    slot: "y11-empire",
    headline: "The Founder's Bill Comes Due",
    text:
      "Mid-fundraise, your body files its invoice: chest tightness in the partner meeting, an ER visit billed to the team as 'a scheduling conflict.' Your heart has submitted a competing term sheet.",
    choices: [
      {
        id: "pause-the-raise",
        label: "Pause the raise — skip the obituary",
        outcome: {
          text:
            "You tell investors the truth — an industry first — and pause eight weeks for doctors and bedtimes. Two partners respect you more; one ghosts. Correct filter.",
          effect: { netWorth: 20_000, burnout: -20 },
          next: "y12-warpath",
        },
      },
      {
        id: "push-with-med-team",
        label: "Push through, cardiologist on retainer",
        outcome: {
          text:
            "You close the raise wearing a heart monitor under the blazer. Oversubscribed. You got everything you wanted, paid in the one currency you can't raise more of.",
          effect: { netWorth: 80_000, burnout: 30 },
          next: "y12-warpath",
        },
      },
      {
        id: "promote-coo-to-ceo",
        label: "Promote the COO — become chairman",
        outcome: {
          text:
            "The scare clarifies: COO becomes CEO, you keep the chairman seat and product soul, plus secondary 'for family reasons' that are, for once, exactly that.",
          effect: { netWorth: 500_000, burnout: -15, title: "Founder & Executive Chairman" },
          next: "y12-postexit",
        },
      },
    ],
  },
  {
    id: "y11-vintage-bet",
    year: 11,
    age: 32,
    slot: "y11-goldenyears",
    headline: "Fund II",
    text:
      "The friends' fund is raising Fund II and wants you as a real LP — a two-comma check, locked for a decade. Venture vintages are wine: some legendary, some vinegar, and you find out in ten years.",
    choices: [
      {
        id: "index-instead",
        label: "Index it — liquid, boring, sufficient",
        outcome: {
          text:
            "You wire it to the market, where it compounds visibly and sells in an afternoon. The friendship survives — which was the real position all along.",
          effect: { netWorth: 140_000, burnout: 5 },
          next: "y12-fumoney",
        },
      },
      {
        id: "lp-two-commas",
        label: "Write the two-comma LP check",
        gamble: [
          {
            chance: 0.45,
            label: "Vintage of the decade — carry and glory",
            text:
              "Fund II catches two breakouts early; paper marks become actual distributions. Best line in your portfolio. The friends introduce you as 'our smartest money.'",
            effect: { netWorth: 250_000, burnout: 0 },
            next: "y12-fumoney",
          },
          {
            chance: 0.55,
            label: "The J-curve is a lifestyle",
            text:
              "No disasters, no breakouts — a decade-long J-curve with quarterly meetings. The money isn't gone, just aging elsewhere. Wine metaphors stop charming by year 6.",
            effect: { netWorth: -80_000, burnout: 5 },
            next: "y12-fumoney",
          },
        ],
      },
    ],
  },
  {
    id: "y11-derisking-question",
    year: 11,
    age: 32,
    slot: "y11-goldenyears",
    headline: "The All-Time-High Question",
    text:
      "All-time highs, 90% equities, and a retirement date close enough to forecast. Advisors say derisk. Charts say the melt-up has room. One more year: victory lap or cautionary tale.",
    choices: [
      {
        id: "derisk-now",
        label: "Derisk into bonds — no drama",
        outcome: {
          text:
            "You rotate to the boring allocation and buy the specific luxury of not caring what the market does. Retirement forecast: calm, with a chance of hobbies.",
          effect: { netWorth: 90_000, burnout: -5 },
          next: "y12-fumoney",
        },
      },
      {
        id: "ride-one-more-year",
        label: "Stay fully invested one more year",
        gamble: [
          {
            chance: 0.55,
            label: "Melt-up continues — best year yet",
            text:
              "The melt-up grows an extra retirement in twelve months. Advisors were right about the risk, wrong about the year. You derisk at the top, insufferably.",
            effect: { netWorth: 200_000, burnout: 5 },
            next: "y12-fumoney",
          },
          {
            chance: 0.45,
            label: "Correction — a year's gains gone",
            text:
              "A 20% drop in six weeks takes a year of gains and your smugness. The plan survives but adds a working year. 'We discussed this,' say the advisors, hourly.",
            effect: { netWorth: -100_000, burnout: 10 },
            next: "y12-fumoney",
          },
        ],
      },
    ],
  },
  {
    id: "y11-early-window",
    year: 11,
    age: 32,
    slot: "y11-empire",
    headline: "The Early Window",
    text:
      "The bankers call, urgency in their vowels: an IPO window is open NOW — eighteen months early. Rush with rough numbers, or wait for whatever market exists later. Windows, they remind you hourly, close.",
    choices: [
      {
        id: "wait-and-build",
        label: "Wait — go public on your schedule",
        outcome: {
          text:
            "You let the window pass and spend the saved adrenaline on two clean quarters. If the next window never comes, profitable companies write their own eventually.",
          effect: { netWorth: 50_000, burnout: 15 },
          next: "y12-warpath",
        },
      },
      {
        id: "rush-the-window",
        label: "Rush it — public now",
        gamble: [
          {
            chance: 0.4,
            label: "Window holds — priced kindly",
            text:
              "The S-1 sprint takes a year off your life and adds a ticker to your name. The friendly market prices your rough edges kindly. The vowels were right.",
            effect: { netWorth: 400_000, burnout: 20, title: "Founder & CEO (Public)" },
            next: "y12-postexit",
          },
          {
            chance: 0.6,
            label: "Window slams — S-1 pulled",
            text:
              "Six weeks in, the vowels change key: 'postpone.' The pulled S-1 leaves your financials public and rivals informed. The window closed on your fingers.",
            effect: { netWorth: 30_000, burnout: 25 },
            next: "y12-warpath",
          },
        ],
      },
    ],
  },
  {
    id: "y11-price-war",
    year: 11,
    age: 32,
    slot: "y11-empire",
    headline: "The Price War",
    text:
      "Your best-funded rival cuts prices 50% overnight — a war-chest play to bleed you out. Matching means margin carnage. Holding means betting on value while sales forwards lost-deal screenshots hourly.",
    choices: [
      {
        id: "hold-price",
        label: "Hold price — sell value, not panic",
        outcome: {
          text:
            "You hold and lose the tourists. The customers who stay would've stayed anyway — now more loyal for watching you refuse to panic. Dignity: expensive.",
          effect: { netWorth: 40_000, burnout: 15 },
          next: "y12-warpath",
        },
      },
      {
        id: "match-and-outlast",
        label: "Match the cut — race to the bottom",
        gamble: [
          {
            chance: 0.5,
            label: "They run dry — you inherit the market",
            text:
              "Your leaner burn outlasts their war chest by two quarters. Their raise craters; customers migrate to the identically-priced option that isn't dying — you.",
            effect: { netWorth: 90_000, burnout: 20 },
            next: "y12-warpath",
          },
          {
            chance: 0.5,
            label: "Mutual carnage — nobody wins",
            text:
              "They had more chest than rumored. Eighteen months of matched cuts leave both companies gasping and pricing permanently broken. The only winner is the customer.",
            effect: { netWorth: -70_000, burnout: 25 },
            next: "y12-warpath",
          },
        ],
      },
    ],
  },
];
