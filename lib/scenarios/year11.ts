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
      "Your comp is now a number you don't say out loud at family dinners. But this year a peer — same age, same career, better marathon time — had a cardiac event in a quarterly business review. He's fine. You're not, exactly. You've started doing the math on what 'enough' means.",
    choices: [
      {
        id: "keep-stacking",
        label: "Keep stacking. Compounding is at maximum velocity",
        outcome: {
          text:
            "These are the highest-earning years of your life and you treat them like a harvest: heads down, vest, invest, repeat. The spreadsheet's retirement tab now has a date in it. The date is closer than you thought.",
          effect: { netWorth: 180_000, burnout: 20 },
          next: "y12-fumoney",
        },
      },
      {
        id: "downshift",
        label: "Downshift to four days — buy back your Fridays",
        outcome: {
          text:
            "You negotiate 80% time, coach a youth robotics team on Fridays, and discover that no one at work even noticed. The kids' robot is terrible and you love it more than any system you've ever shipped.",
          effect: { netWorth: 90_000, burnout: -20 },
          next: "y12-fumoney",
        },
      },
      {
        id: "nonprofit-tour",
        label: "Take the mission job — staff engineer at a nonprofit",
        outcome: {
          text:
            "You take a 70% pay cut to make government benefits websites work for people who need them. The tech is unglamorous, and the impact shows up as humans, not dashboards. Your old coworkers say 'that's so cool' with genuine confusion.",
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
      "Your parents retire this year — the ones who co-signed the student loans, drove the moving van, and still think 'the cloud' is weather. Their retirement math is tighter than yours has been since year three. For the first time, the family's financial gravity points at you. It's an honor. It's also a spreadsheet.",
    choices: [
      {
        id: "fund-their-retirement",
        label: "Fix their math — quietly fund the gap",
        outcome: {
          text:
            "You set up the transfers and tell them it's 'a work benefit thing' so they'll accept it. Your net worth takes the hit your childhood took first. Best money you will ever spend; the spreadsheet agrees on no metric and you don't care.",
          effect: { netWorth: -100_000, burnout: -10 },
          next: "y12-fumoney",
        },
      },
      {
        id: "keep-stacking-first",
        label: "Secure your own mask first — help comes after the number",
        outcome: {
          text:
            "You run the airline-oxygen-mask logic: two more max-earning years make the help permanent instead of hopeful. It's the correct math wearing an uncomfortable coat. You automate a small monthly transfer anyway, because correct isn't everything.",
          effect: { netWorth: 170_000, burnout: 15 },
          next: "y12-fumoney",
        },
      },
      {
        id: "move-them-close",
        label: "Move them close and downshift to be around",
        outcome: {
          text:
            "You buy the duplex two streets over, shift to four days, and discover Sunday dinners are a better recurring meeting than anything on your work calendar. The career decelerates gently. Nothing else does.",
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
      "The Distinguished Engineer offer lands — the IC ladder's final rung, the level with more mythology than headcount. The comp is absurd. The expectations are 'define the technical future of the company,' written casually, as if that's a job description and not a prophecy. Twelve people company-wide have this title. Eleven look exhausted.",
    choices: [
      {
        id: "take-the-crown",
        label: "Take it — you didn't climb this far to camp below the summit",
        outcome: {
          text:
            "You accept and discover the last rung is real: your words move roadmaps you've never seen, and your calendar becomes a national resource. The comp makes your accountant laugh out loud. The weight is exactly as advertised. So is the view.",
          effect: { netWorth: 200_000, burnout: 20, title: "Distinguished Engineer" },
          next: "y12-fumoney",
        },
      },
      {
        id: "decline-protect-life",
        label: "Decline — the twelfth exhausted face won't be yours",
        outcome: {
          text:
            "You say no to the summit and mean it, a sentence that takes three drafts. Principal remains a wonderful place to live: high pay, real impact, and evenings that belong to you. The recruiter's stunned silence is its own kind of trophy.",
          effect: { netWorth: 120_000, burnout: -10 },
          next: "y12-fumoney",
        },
      },
      {
        id: "take-and-delegate",
        label: "Take it — then ruthlessly define the job on your terms",
        outcome: {
          text:
            "You accept with conditions in writing: two focus areas, no ceremonial meetings, one protected no-Slack day. Leadership blinks, then agrees — Distinguished Engineers get to distinguish themselves. Turns out the last rung is negotiable if you've already proven you'll walk.",
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
      "You fall asleep in a quarterly business review — fully asleep, head-tilt, the works — and wake up in urgent care with a diagnosis of 'severe dehydration and whatever your job is.' The doctor asks how many hours you work. You lie. She looks at the chart. The chart doesn't lie.",
    choices: [
      {
        id: "full-stop-month",
        label: "Full stop — take the medical leave seriously",
        outcome: {
          text:
            "One month of mandated nothing: walks, meals with vegetables, sleep that isn't a nap with guilt. The org survives without you, which stings for a week and then liberates you forever. You return with a resting heart rate and a resignation letter you don't send — yet.",
          effect: { netWorth: 60_000, burnout: -25 },
          next: "y12-fumoney",
        },
      },
      {
        id: "ignore-and-push",
        label: "Hydrate and get back to it — Q4 doesn't care about charts",
        outcome: {
          text:
            "You buy a smart water bottle, ignore everything else, and close the strongest quarter of your career on fumes and denial. The comp reflects it. The chart at your next physical also reflects it. Two scoreboards, one body. The body keeps score longer.",
          effect: { netWorth: 150_000, burnout: 30 },
          next: "y12-fumoney",
        },
      },
      {
        id: "chief-of-staff-life",
        label: "Hire help for your LIFE — assistant, trainer, chef, therapist",
        outcome: {
          text:
            "You staff your personal life like the executive function it apparently requires. It costs a comical amount and returns it double: sleep, strength, and the discovery that most of your stress was logistics wearing a trench coat.",
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
      "Both doors open in the same month: a signed acquisition offer with a number that ends your working life, and a Series B term sheet to go build the empire. The board is split. Your cofounders group chat is split. You have two weeks and one decision.",
    choices: [
      {
        id: "sign-acquisition",
        label: "Sign the acquisition. Take the money off the table",
        outcome: {
          text:
            "You sign in a conference room with terrible lighting and champagne someone bought at Safeway. The wire lands weeks later — a number with commas you have to count twice. The product will die inside the acquirer within two years. The money will not.",
          effect: { netWorth: 900_000, burnout: 10, title: "Exited Founder" },
          next: "y12-postexit",
        },
      },
      {
        id: "series-b-bigger",
        label: "Take the Series B. This company goes all the way",
        outcome: {
          text:
            "You turn down life-changing money to chase generational money, a decision your spouse describes as 'very on brand.' The B closes, the targets triple, and the board adds a partner who says 'velocity' as a complete sentence.",
          effect: { netWorth: 50_000, burnout: 20 },
          next: "y12-warpath",
        },
      },
      {
        id: "secondary-in-round",
        label: "Take the B — but carve out a fat secondary for yourself",
        outcome: {
          text:
            "You sign the Series B and quietly sell 15% of your stake into the round. The empire dream stays alive AND your family is set no matter what happens. The VCs call it 'taking chips off the table.' You call it sleeping at night.",
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
      "The term sheet on your desk values the company at $1.04 billion — the extra $40M added, the partner admits, 'so the headline works.' Unicorn status: a marketing event wearing a valuation costume. The team is refreshing TechCrunch hourly. The preferences stack underneath is doing quieter math.",
    choices: [
      {
        id: "take-the-horn",
        label: "Take the unicorn round — the headline IS a weapon",
        outcome: {
          text:
            "The announcement does its job: recruiting inbound triples, enterprise deals accelerate, and your parents finally understand what you do ('billion' translates). Underneath, the preference stack quietly raises the bar your exit must clear. Headlines are loans. You'll repay this one later.",
          effect: { netWorth: 100_000, burnout: 15, title: "Unicorn CEO" },
          next: "y12-warpath",
        },
      },
      {
        id: "flat-clean-round",
        label: "Take less at clean terms — no horn, no hangover",
        outcome: {
          text:
            "You raise a smaller round at an honest number with vanilla terms, and the tech press writes nothing, which is the point. No inflated bar, no down-round trap waiting in a bad year. The team grumbles for a week. Your future self sends a thank-you note.",
          effect: { netWorth: 60_000, burnout: 10 },
          next: "y12-warpath",
        },
      },
      {
        id: "sell-instead",
        label: "Use the term sheet as a stalking horse — sell the company",
        outcome: {
          text:
            "A billion-dollar term sheet is the best acquisition marketing ever printed. You quietly shop it to the strategics, and one bites at a number that makes 'unicorn' feel abstract. The empire dream ends; the compound interest era begins.",
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
      "Your biggest rival's CEO suggests dinner, then suggests something bigger: a merger of equals. Combined, you'd own the category overnight. 'Equals,' of course, is a word that survives exactly until the org chart draft — someone will run the combined company, and you're both currently smiling about it.",
    choices: [
      {
        id: "merge-and-win-chart",
        label: "Merge — and win the org chart negotiation",
        outcome: {
          text:
            "Four months of 'governance discussions' later, you're CEO of the combined entity and he's 'President, Strategy' — a title with a decaying half-life. The merged company owns the market. The integration owns your year. Category kings pay category rent.",
          effect: { netWorth: 300_000, burnout: 20, title: "CEO (Merged Entity)" },
          next: "y12-warpath",
        },
      },
      {
        id: "refuse-compete",
        label: "Decline — you'd rather beat them than marry them",
        outcome: {
          text:
            "You pass on the dinner's big idea and go back to competing, which — freed of merger fantasies — you do with renewed venom. The rivalry sharpens both companies. Analysts call the category 'unusually well-served.' You call it personal.",
          effect: { netWorth: 40_000, burnout: 20 },
          next: "y12-warpath",
        },
      },
      {
        id: "sell-to-rival",
        label: "Counter: not a merger — an acquisition, of you, by them, expensively",
        outcome: {
          text:
            "'Equals is a fiction. Buy me properly or compete with me forever.' They buy you properly. The premium reflects two years of them losing deals to you, itemized. You exit the category you helped create, extremely liquid and a little nostalgic.",
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
      "Mid-fundraise, your body files its invoice: chest tightness during the partner meeting, an ER visit you tell the team was 'a scheduling conflict,' and a cardiologist who uses the phrase 'founder syndrome' unironically. The round needs six more weeks of full-burn. Your heart has submitted a competing term sheet.",
    choices: [
      {
        id: "pause-the-raise",
        label: "Pause the raise — no valuation is worth the obituary",
        outcome: {
          text:
            "You tell the investors the truth — a first, for this industry — and pause for eight weeks of doctors, sleep, and remembering your kids' bedtimes. The round survives; two partners respect you more, one ghosts. Correct filter, painful test.",
          effect: { netWorth: 20_000, burnout: -20 },
          next: "y12-warpath",
        },
      },
      {
        id: "push-with-med-team",
        label: "Push through — with a cardiologist on retainer",
        outcome: {
          text:
            "You finish the raise wearing a heart monitor under your fundraising blazer, a fact known to exactly two people. The round closes oversubscribed. The monitor data closes less triumphantly. You got everything you wanted and paid with the only thing you can't raise more of.",
          effect: { netWorth: 80_000, burnout: 30 },
          next: "y12-warpath",
        },
      },
      {
        id: "promote-coo-to-ceo",
        label: "Hand the wheel to your COO — become executive chairman",
        outcome: {
          text:
            "The scare clarifies everything: you promote your COO to CEO, keep the chairman seat and the product soul, and sell a chunk of secondary 'for family reasons' that are, for once, exactly that. The company barely slows. Your cardiologist upgrades your prognosis to 'human.'",
          effect: { netWorth: 500_000, burnout: -15, title: "Founder & Executive Chairman" },
          next: "y12-postexit",
        },
      },
    ],
  },
];
