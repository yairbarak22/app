import type { Scenario } from "../types";

/**
 * YEAR 13 (age 34) — one last cycle / the endgame board meeting.
 * Pools: y13-lastcycle (+3), y13-endgame-founder (+3).
 */
export const YEAR_13: Scenario[] = [
  // ---------------------------------------------------------------- Last cycle
  {
    id: "y13-lastcycle",
    year: 13,
    age: 34,
    headline: "One Last Cycle",
    text:
      "The market is booming again — it does that — and there's always one more offer. The recruiter on the phone wasn't born when you wrote your first line of code. (Okay, he was. Barely.)",
    choices: [
      {
        id: "final-mega-grant",
        label: "Chase one final mega-grant",
        outcome: {
          text:
            "One last heist: obscene grant, brilliant team, you the graybeard where you were once the kid. You screenshot the vest schedule for your memoirs.",
          effect: { netWorth: 200_000, burnout: 25 },
          next: "y14-legacy",
        },
      },
      {
        id: "emeritus-coast",
        label: "Coast into emeritus mode",
        outcome: {
          text:
            "You become the 30-minute meeting people book before big decisions, kindly noting their 'novel architecture' was tried in 2019. Easiest money of your career.",
          effect: { netWorth: 90_000, burnout: -5 },
          next: "y14-legacy",
        },
      },
      {
        id: "health-wakeup",
        label: "Actually listen to the doctor",
        outcome: {
          text:
            "The bloodwork was a warning shot. You hire a trainer, take the decade-deferred sabbatical, and learn your resting heart rate had opinions about your career.",
          effect: { netWorth: 40_000, burnout: -25 },
          next: "y14-legacy",
        },
      },
    ],
  },
  {
    id: "y13-ceo-for-hire",
    year: 13,
    age: 34,
    slot: "y13-lastcycle",
    headline: "The CEO-for-Hire Call",
    text:
      "A board you've advised wants you as CEO: the founder will step aside ('mostly') and someone else's dream becomes yours to manage. It's flattering, and also a live grenade with a salary.",
    choices: [
      {
        id: "take-the-chair",
        label: "Take it — go be the CEO",
        outcome: {
          text:
            "Everything you advised from the cheap seats is harder at the wheel, but the company steadies into your old advice. Turns out you meant it.",
          effect: { netWorth: 100_000, burnout: 25, title: "CEO (Hired Gun)" },
          next: "y14-finalact",
        },
      },
      {
        id: "advise-instead",
        label: "Counter: power, no pager",
        outcome: {
          text:
            "Two days a week, real authority, none of the 2 AM ownership — the company gets 80% of your value for 20% of your life, a trade you've spent 13 years pricing.",
          effect: { netWorth: 90_000, burnout: -5, title: "Executive Advisor" },
          next: "y14-legacy",
        },
      },
      {
        id: "decline-all",
        label: "Decline — you know how that movie ends",
        outcome: {
          text:
            "You've watched hired-gun CEOs get ground between founders and boards for a decade, so you pass. The founder un-steps-aside within a year, as prophesied.",
          effect: { netWorth: 80_000, burnout: -10 },
          next: "y14-legacy",
        },
      },
    ],
  },
  {
    id: "y13-adjunct-offer",
    year: 13,
    age: 34,
    slot: "y13-lastcycle",
    headline: "The Classroom Calls",
    text:
      "Your alma mater asks you to teach the systems course that changed your life. The pay is a rounding error on your last bonus, and something in you says yes before you do.",
    choices: [
      {
        id: "teach-alongside",
        label: "Teach one course alongside the day job",
        outcome: {
          text:
            "Tuesday nights become sacred: forty students, real systems, zero corporate abstraction. The students rate you 'surprisingly not boring.'",
          effect: { netWorth: 70_000, burnout: 10, title: "Engineer & Adjunct" },
          next: "y14-legacy",
        },
      },
      {
        id: "full-adjunct-year",
        label: "Take a full teaching year",
        outcome: {
          text:
            "The pay cut is comical, but the Tuesday-night feeling when a student's eyes light up is not available at any comp band.",
          effect: { netWorth: 30_000, burnout: -20, title: "Visiting Lecturer" },
          next: "y14-legacy",
        },
      },
      {
        id: "guest-lectures-only",
        label: "Guest-lecture twice a semester",
        outcome: {
          text:
            "Two lectures a term, maximum war stories, zero grading — and the mega-grant keeps vesting. Scarcity, as always, is excellent marketing.",
          effect: { netWorth: 90_000, burnout: 0 },
          next: "y14-legacy",
        },
      },
    ],
  },
  {
    id: "y13-lifetime-award",
    year: 13,
    age: 34,
    slot: "y13-lastcycle",
    headline: "The Luminary Award",
    text:
      "An industry body hands you a 'Luminary Award' at a gala with lukewarm salmon and a career highlight reel set to inspirational strings. You are thirty-four, and officially context.",
    choices: [
      {
        id: "leverage-into-boards",
        label: "Cash the prestige into board seats",
        outcome: {
          text:
            "The award is a skeleton key: two board interviews and an advisory rate that doubles without negotiation. Luminary is a job title with excellent margins.",
          effect: { netWorth: 120_000, burnout: 10, title: "Board Member & Luminary" },
          next: "y14-legacy",
        },
      },
      {
        id: "aw-shucks-keep-coding",
        label: "Say thanks, back to the terminal Monday",
        outcome: {
          text:
            "You give a 90-second speech, put the trophy behind a monitor, and push a commit Monday at 9:14 AM. The commit ships — that was the acceptance speech.",
          effect: { netWorth: 90_000, burnout: 5 },
          next: "y14-legacy",
        },
      },
      {
        id: "midlife-speedrun",
        label: "Have the midlife crisis",
        outcome: {
          text:
            "'Lifetime achievement at 34' triggers a spectacular quarter: a motorcycle ridden twice, a silent retreat, and — inconveniently — clarity.",
          effect: { netWorth: -60_000, burnout: -15 },
          next: "y14-legacy",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- Endgame founder
  {
    id: "y13-endgame-founder",
    year: 13,
    age: 34,
    headline: "The Endgame Board Meeting",
    text:
      "The bankers say the window is open and acquirers are circling, but a board faction thinks the next phase needs 'a different kind of CEO.' Everything is on the table, including your chair.",
    choices: [
      {
        id: "file-ipo",
        label: "Go public — ring the bell or die trying",
        outcome: {
          text:
            "The S-1 drops, the roadshow eats 11 cities and one suit purchased under duress, and on pricing night you hold a number that used to be a dream.",
          effect: { netWorth: 100_000, burnout: 25 },
          next: "y14-finalact",
        },
      },
      {
        id: "sell-to-bidder",
        label: "Start the bidding war. Sell at the top",
        outcome: {
          text:
            "You run the auction like a product launch, sign a number that breaks group chats, and walk out of the building you built — extremely, permanently rich.",
          effect: { netWorth: 1_500_000, burnout: 10, title: "Exited Founder" },
          ending: "retired",
        },
      },
      {
        id: "board-coup",
        label: "▶ Rally your allies — watch a video",
        requiresAd: true,
        outcome: {
          text:
            "One furious weekend of phone calls later, Monday's vote isn't close. The ringleader 'rotates off the board' and your chair is yours until you say otherwise.",
          effect: { netWorth: 150_000, burnout: 15 },
          next: "y14-finalact",
        },
        adFallback: {
          text:
            "The votes were counted before you knew there was a vote — you're out of your own company, with a non-disparagement clause you test daily at dinner parties.",
          effect: { netWorth: 400_000, burnout: 20, title: "Founder (Ousted)" },
          next: "y14-finalact",
        },
      },
    ],
  },
  {
    id: "y13-mega-secondary",
    year: 13,
    age: 34,
    slot: "y13-endgame-founder",
    headline: "The Crossover Whale",
    text:
      "A crossover fund offers to buy 30% of your stake at a valuation that makes the last round look shy. Your lawyer triple-checks for the catch; there's no catch, which is the catch.",
    choices: [
      {
        id: "sell-thirty",
        label: "Sell the full 30% — generational money",
        outcome: {
          text:
            "The wire is a number your banking app displays with disbelief. Whatever happens now — IPO, winter, asteroid — your family's story is permanently rewritten.",
          effect: { netWorth: 1_200_000, burnout: 10 },
          next: "y14-finalact",
        },
      },
      {
        id: "sell-ten-keep-control",
        label: "Sell 10% — liquidity, keep the grip",
        outcome: {
          text:
            "A meaningful slice off the table, full voting weight for the endgame — balance, the rarest position in a founder's portfolio, briefly achieved.",
          effect: { netWorth: 400_000, burnout: 10 },
          next: "y14-finalact",
        },
      },
      {
        id: "refuse-all-in",
        label: "Refuse — max ownership into the finale",
        outcome: {
          text:
            "You decline nine figures of certainty, a decision your spouse ratifies with one long exhale. Paper-rich, iron-committed, impossible to bluff.",
          effect: { netWorth: 50_000, burnout: 20 },
          next: "y14-finalact",
        },
      },
    ],
  },
  {
    id: "y13-buy-old-employer",
    year: 13,
    age: 34,
    slot: "y13-endgame-founder",
    headline: "Full Circle, Discounted",
    text:
      "Your first employer — the one that put you on a layoff list — is selling your old division, priced to move. Buying it would be strategic, and also delicious.",
    choices: [
      {
        id: "buy-the-division",
        label: "Buy it — the poetry is free",
        outcome: {
          text:
            "You buy it and personally re-onboard engineers who once watched you get walked out. The integration is brutal; the symmetry is perfect.",
          effect: { netWorth: -150_000, burnout: 25, title: "CEO (Full Circle)" },
          next: "y14-finalact",
        },
      },
      {
        id: "poach-their-people",
        label: "Skip the deal — poach their best twenty",
        outcome: {
          text:
            "Why buy the org chart when the org chart is interviewing? Twenty offers, fifteen yeses, zero integration risk — the division sells to PE as a husk.",
          effect: { netWorth: 60_000, burnout: 15 },
          next: "y14-finalact",
        },
      },
      {
        id: "pass-stay-focused",
        label: "Pass — revenge is not a strategy",
        outcome: {
          text:
            "You write 'no' in one line and keep the discipline, then watch a competitor spend two years digesting it — metrics up, teeth visible.",
          effect: { netWorth: 80_000, burnout: 10 },
          next: "y14-finalact",
        },
      },
    ],
  },
  {
    id: "y13-succession-mirror",
    year: 13,
    age: 34,
    slot: "y13-endgame-founder",
    headline: "The Succession Mirror",
    text:
      "Your lead director asks over breakfast: 'Are you the IPO CEO, or the founder who got us here?' It's asked with love and a spreadsheet.",
    choices: [
      {
        id: "prove-youre-it",
        label: "Become the IPO CEO on purpose",
        outcome: {
          text:
            "You treat the gap like a syllabus — media training, governance bootcamps, mock analyst grillings that leave marks — until even the skeptical director concedes.",
          effect: { netWorth: 100_000, burnout: 25 },
          next: "y14-finalact",
        },
      },
      {
        id: "hire-president",
        label: "Hire a president for the parts you'd fake",
        outcome: {
          text:
            "You hire a president who genuinely loves analyst days and keep the parts with your fingerprints in the foundation. The org exhales.",
          effect: { netWorth: 120_000, burnout: 10, title: "Founder-CEO (With a President)" },
          next: "y14-finalact",
        },
      },
      {
        id: "hand-over-chairman",
        label: "Hand over the chair, take chairman",
        outcome: {
          text:
            "'I'm the founder who got us here.' You promote from within, take chairman, and clap loudest at the new CEO's first standing ovation — finally off the hook.",
          effect: { netWorth: 600_000, burnout: -15, title: "Founder & Chairman" },
          next: "y14-finalact",
        },
      },
    ],
  },
  {
    id: "y13-preipo-exec-gig",
    year: 13,
    age: 34,
    slot: "y13-lastcycle",
    headline: "The Pre-IPO Parachute",
    text:
      "A pre-IPO decacorn wants you as VP of Engineering, paid almost entirely in equity. Their S-1 is 'drafted,' and their CFO says 'imminent' the way weathermen say 'chance of rain.'",
    choices: [
      {
        id: "stay-put-safe",
        label: "Stay put — 'imminent' isn't a comp plan",
        outcome: {
          text:
            "You keep the cash comp you can spend this decade. The decacorn's IPO happens when it happens — to other people, on their timeline.",
          effect: { netWorth: 90_000, burnout: 5 },
          next: "y14-legacy",
        },
      },
      {
        id: "take-equity-gig",
        label: "Take the VP seat — bet on 'imminent'",
        gamble: [
          {
            chance: 0.5,
            label: "IPO in the window — equity prints",
            text:
              "The S-1 undrafts itself, the equity converts into the largest number of your career, and 'VP at their IPO' becomes the first thing strangers know about you.",
            effect: { netWorth: 350_000, burnout: 15, title: "VP Eng (IPO Class)" },
            achievement: "big-bonus",
            next: "y14-finalact",
          },
          {
            chance: 0.5,
            label: "Postponed — two years of paper",
            text:
              "'Imminent' survives four board meetings before dying quietly in a Reuters paragraph. The equity waits — it's good at that.",
            effect: { netWorth: 40_000, burnout: 20 },
            next: "y14-legacy",
          },
        ],
      },
    ],
  },
  {
    id: "y13-patent-troll",
    year: 13,
    age: 34,
    slot: "y13-lastcycle",
    headline: "The Troll Under the Bridge",
    text:
      "A patent troll claims your open-source library infringes a 2004 patent on 'transmitting data via a network.' Settling costs $40K; fighting is 'winnable, which is different from won.'",
    choices: [
      {
        id: "settle-quietly",
        label: "Settle — $40K makes it disappear today",
        outcome: {
          text:
            "You wire the ransom, sign the NDA, and fund the troll's next dozen letters. It's the rational move — everyone says so, glad they didn't have to make it.",
          effect: { netWorth: -40_000, burnout: 10 },
          next: "y14-legacy",
        },
      },
      {
        id: "fight-the-troll",
        label: "Fight — invalidate the patent",
        gamble: [
          {
            chance: 0.65,
            label: "Troll crushed, fees awarded",
            text:
              "Your lawyers find prior art from 1998 (a fax standard, deliciously), the patent dies, and the court awards fees. Some fights are donations to the commons.",
            effect: { netWorth: 60_000, burnout: 15 },
            next: "y14-legacy",
          },
          {
            chance: 0.35,
            label: "Win slowly, expensively",
            text:
              "You win eventually — technically, exhaustedly — after spending triple the settlement explaining APIs to a court reporter. The precedent helps strangers.",
            effect: { netWorth: -90_000, burnout: 25 },
            next: "y14-legacy",
          },
        ],
      },
    ],
  },
  {
    id: "y13-shaky-window",
    year: 13,
    age: 34,
    slot: "y13-endgame-founder",
    headline: "Filing Into the Wind",
    text:
      "One agenda item: file the S-1 into a market the bankers call 'constructive but selective' (translation: coin flip), or wait for spring and risk the window sealing. Your CFO has both decks ready.",
    choices: [
      {
        id: "wait-for-spring",
        label: "Wait for spring — file into strength",
        outcome: {
          text:
            "You spend the winter making the numbers unarguable, and spring arrives with a better market — the patient founder's small, real edge.",
          effect: { netWorth: 80_000, burnout: 15 },
          next: "y14-finalact",
        },
      },
      {
        id: "file-into-wind",
        label: "File now — fortune favors the bold",
        gamble: [
          {
            chance: 0.5,
            label: "Window holds — priced well, out clean",
            text:
              "The selective market selects you: the roadshow overbooks, pricing lands at the top of the range, and your CFO frames the 'constructive but selective' email.",
            effect: { netWorth: 300_000, burnout: 20 },
            next: "y14-finalact",
          },
          {
            chance: 0.5,
            label: "Pulled — public wounds, private co",
            text:
              "Eleven cities in, the market rolls over and you pull the deal with your financials already public. The company is fine; 'fine' takes a year to feel true.",
            effect: { netWorth: 20_000, burnout: 30 },
            next: "y14-finalact",
          },
        ],
      },
    ],
  },
  {
    id: "y13-guidance-gamble",
    year: 13,
    age: 34,
    slot: "y13-endgame-founder",
    headline: "The Guidance Game",
    text:
      "Pre-IPO analyst day: aggressive guidance juices the valuation but hands you a public promise to keep, quarterly, forever. Your CRO swears the pipeline supports it — your CRO also swears at golf.",
    choices: [
      {
        id: "guide-conservative",
        label: "Guide conservative — beat and raise",
        outcome: {
          text:
            "You set the bar where you can clear it with a backpack on and begin the beat-and-raise cadence markets marry for life. Metronomes get premium multiples.",
          effect: { netWorth: 70_000, burnout: 10 },
          next: "y14-finalact",
        },
      },
      {
        id: "guide-aggressive",
        label: "Guide aggressive — the pipeline says fly",
        gamble: [
          {
            chance: 0.55,
            label: "Beat and raise — the valuation rips",
            text:
              "The pipeline was real: two beats and the stock reprices like it owes you an apology. The CRO gets a boat; you get everything else.",
            effect: { netWorth: 250_000, burnout: 15 },
            next: "y14-finalact",
          },
          {
            chance: 0.45,
            label: "Miss by 4% — the credibility tax",
            text:
              "One whale deal slips a quarter, guidance misses by a rounding error, and the stock drops 30% in an afternoon. Markets keep receipts.",
            effect: { netWorth: -60_000, burnout: 25 },
            next: "y14-finalact",
          },
        ],
      },
    ],
  },
];
