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
      "The market is booming again — it does that — and the industry has one more offer for you. There's always one more offer. The kids you mentored are directors now, the tools you built are legacy, and the recruiter on the phone wasn't born when you wrote your first line of code. (Okay, he was. Barely.)",
    choices: [
      {
        id: "final-mega-grant",
        label: "Chase one final mega-grant at the hottest AI company",
        outcome: {
          text:
            "One last heist. The grant is obscene, the team is brilliant, and you're the graybeard in rooms where you were once the kid. You ship one more thing that matters and screenshot the vest schedule for your memoirs.",
          effect: { netWorth: 200_000, burnout: 25 },
          next: "y14-legacy",
        },
      },
      {
        id: "emeritus-coast",
        label: "Coast into emeritus mode — wisdom on tap, drama off",
        outcome: {
          text:
            "You become the person people book 30 minutes with before making big decisions. Half your job is telling people their 'novel architecture' was tried in 2019, kindly. It's the easiest money and the best reviews of your career.",
          effect: { netWorth: 90_000, burnout: -5 },
          next: "y14-legacy",
        },
      },
      {
        id: "health-wakeup",
        label: "The doctor said 'slow down.' Actually listen this time",
        outcome: {
          text:
            "The bloodwork was a warning shot. You hire a trainer, learn to cook, take the sabbatical you've deferred for a decade, and discover your resting heart rate had opinions about your career this whole time. The industry will wait. It always does.",
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
      "A board you've advised makes the ask over an expensive dinner: their startup needs a real CEO, the founder has agreed to step aside ('mostly'), and they want you. Not advice. Not a board seat. The actual chair — someone else's dream, professionally managed by you. It's flattering. It's also a live grenade with a salary.",
    choices: [
      {
        id: "take-the-chair",
        label: "Take it — you've critiqued CEOs long enough, go be one",
        outcome: {
          text:
            "You take the chair and discover that everything you advised from the cheap seats is harder at the wheel. The founder 'mostly' steps aside, mostly. But the company steadies, grows, and starts to look suspiciously like the advice you always gave. Turns out you meant it.",
          effect: { netWorth: 100_000, burnout: 25, title: "CEO (Hired Gun)" },
          next: "y14-finalact",
        },
      },
      {
        id: "advise-instead",
        label: "Counter with executive-chairman-lite — power, no pager",
        outcome: {
          text:
            "You negotiate a heavyweight advisory role: two days a week, real authority, none of the 2 AM ownership. The board grumbles and accepts. The company gets 80% of your value for 20% of your life — a trade you've spent thirteen years learning how to price.",
          effect: { netWorth: 90_000, burnout: -5, title: "Executive Advisor" },
          next: "y14-legacy",
        },
      },
      {
        id: "decline-all",
        label: "Decline — you know exactly how that movie ends",
        outcome: {
          text:
            "You've watched hired-gun CEOs get ground between founders and boards for a decade, and you politely decline the starring role. The dinner stays pleasant. Six months later the job goes to someone else and the founder un-steps-aside within a year, as prophesied.",
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
      "Your alma mater's CS department asks you to teach the systems course — the one whose 2011 version changed your life. The pay is a rounding error on your last bonus. The students are sharper than you were and allergic to war stories. The lecture hall smells exactly the same. Something in you says yes before you do.",
    choices: [
      {
        id: "teach-alongside",
        label: "Teach one course alongside the day job",
        outcome: {
          text:
            "Tuesday nights become sacred: forty students, real systems, zero corporate abstraction. Teaching forces you to actually understand things you'd been coasting on for years. Your day-job design reviews mysteriously improve. The students rate you 'surprisingly not boring.'",
          effect: { netWorth: 70_000, burnout: 10, title: "Engineer & Adjunct" },
          next: "y14-legacy",
        },
      },
      {
        id: "full-adjunct-year",
        label: "Take a full teaching year — the sabbatical with homework",
        outcome: {
          text:
            "You step off the industry treadmill for two full semesters of teaching, office hours, and rediscovering why any of this mattered. The pay cut is comical. The Tuesday-night feeling when a student's eyes light up is not available at any comp band.",
          effect: { netWorth: 30_000, burnout: -20, title: "Visiting Lecturer" },
          next: "y14-legacy",
        },
      },
      {
        id: "guest-lectures-only",
        label: "Guest-lecture twice a semester — dip the toe, keep the grant",
        outcome: {
          text:
            "You do the greatest-hits version: two lectures a term, maximum stories, zero grading. The students get the war stories the syllabus can't teach; you keep the mega-grant vesting. The department keeps asking for more. Scarcity, as always, is excellent marketing.",
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
    headline: "The Award That Makes You Feel Old",
    text:
      "An industry body gives you a 'Luminary Award' at a gala with lukewarm salmon and a highlight reel of your career set to inspirational strings. You are thirty-four. The reel ends with a photo from your first hackathon, and the whole room says 'aww.' You have officially become context. The question is what to do with it.",
    choices: [
      {
        id: "leverage-into-boards",
        label: "Cash the prestige — board seats and advisory positions",
        outcome: {
          text:
            "The award turns out to be a skeleton key: two public-company board interviews and an advisory rate that doubles without negotiation. You convert one evening of salmon into a portfolio of influence. Luminary, it turns out, is a job title with excellent margins.",
          effect: { netWorth: 120_000, burnout: 10, title: "Board Member & Luminary" },
          next: "y14-legacy",
        },
      },
      {
        id: "aw-shucks-keep-coding",
        label: "Say thanks and go back to the terminal Monday",
        outcome: {
          text:
            "You give a 90-second speech thanking three specific people, put the trophy behind a monitor, and push a commit Monday at 9:14 AM. The industry finds this iconic, which is annoying because you were just going to work. The commit ships. That was the acceptance speech.",
          effect: { netWorth: 90_000, burnout: 5 },
          next: "y14-legacy",
        },
      },
      {
        id: "midlife-speedrun",
        label: "Have the crisis — the award broke something loose",
        outcome: {
          text:
            "'Lifetime achievement at 34' triggers a spectacular quarter: a motorcycle you ride twice, a screenwriting class, a week at a silent retreat where you invent three startups in your head. You emerge with an empty garage, a full journal, and — inconveniently — clarity.",
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
      "The bankers' deck says the window is open: IPO markets are hot, and two strategic acquirers are circling with intent. Inside the boardroom, a third conversation is happening in glances — a faction thinks the next phase needs 'a different kind of CEO.' Everything is on the table, including your chair.",
    choices: [
      {
        id: "file-ipo",
        label: "File to go public. Ring the bell or die trying",
        outcome: {
          text:
            "The S-1 drops and your company's finances become the internet's business. Roadshow: 11 cities, 60 pitches, one suit purchased under duress. Pricing night, you stand in a hotel room holding a number that used to be a dream.",
          effect: { netWorth: 100_000, burnout: 25 },
          next: "y14-finalact",
        },
      },
      {
        id: "sell-to-bidder",
        label: "Start the bidding war. Sell at the top",
        outcome: {
          text:
            "You run the auction like a product launch and the strategics bid like it's the last company on Earth. The final number has a comma count that breaks group chats. You sign, you wire, you walk out of the building you built — extremely, permanently rich.",
          effect: { netWorth: 1_500_000, burnout: 10, title: "Exited Founder" },
          ending: "retired",
        },
      },
      {
        id: "board-coup",
        label: "▶ The board wants you out — watch a short video to rally your allies",
        requiresAd: true,
        outcome: {
          text:
            "You spend one furious weekend on the phone: early investors, loyal executives, the independent director who owes you the truth. Monday's vote isn't close. The faction dissolves, its ringleader 'rotates off the board,' and your chair is yours until you decide otherwise.",
          effect: { netWorth: 150_000, burnout: 15 },
          next: "y14-finalact",
        },
        adFallback: {
          text:
            "The votes were counted before you knew there was a vote. 'The board thanks you for your vision.' You're out of the CEO chair of your own company — with a severance package sized by guilt and a non-disparagement clause you test daily at dinner parties.",
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
      "A crossover fund with a nine-figure appetite offers to buy up to 30% of your personal stake at a valuation that makes the last round look shy. No board seat, no strings — they just want in before the IPO everyone assumes is coming. Your lawyer triple-checks the term sheet for the catch. There's no catch. That's the catch.",
    choices: [
      {
        id: "sell-thirty",
        label: "Sell the full 30% — generational money, today, guaranteed",
        outcome: {
          text:
            "The wire is a number your banking app displays with what feels like disbelief. Whatever happens to the company now — IPO, winter, asteroid — your family's story is permanently rewritten. You lead Monday's exec meeting noticeably calmer. Everyone notices the calm.",
          effect: { netWorth: 1_200_000, burnout: 10 },
          next: "y14-finalact",
        },
      },
      {
        id: "sell-ten-keep-control",
        label: "Sell 10% — liquidity without loosening your grip",
        outcome: {
          text:
            "You take a meaningful slice off the table and keep your full voting weight for the endgame. The crossover fund takes what it can get — everyone wants in ahead of the rumor. Balance: the rarest position in a founder's portfolio, briefly achieved.",
          effect: { netWorth: 400_000, burnout: 10 },
          next: "y14-finalact",
        },
      },
      {
        id: "refuse-all-in",
        label: "Refuse entirely — maximum ownership into the finale",
        outcome: {
          text:
            "You decline nine figures of certainty to carry maximum ownership across the finish line, a decision your spouse ratifies with one long exhale. If the finale pays, it pays historically. Until then, you are paper-rich, iron-committed, and impossible to bluff.",
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
      "Your first employer — the Big Tech giant that once put your name on a layoff list — is divesting the exact division you worked in. The bankers' teaser lands in your inbox with the org chart you used to live in, now priced to move. Buying it would be strategic. It would also be delicious. The board asks you to separate those two facts. You're trying.",
    choices: [
      {
        id: "buy-the-division",
        label: "Buy it — the tech is real and the poetry is free",
        outcome: {
          text:
            "You acquire the division, keep the good half, and personally re-onboard engineers who once watched you get walked out. The integration is brutal; the symmetry is perfect. Somewhere in a filing, your old employer's lawyers spell your name correctly at last.",
          effect: { netWorth: -150_000, burnout: 25, title: "CEO (Full Circle)" },
          next: "y14-finalact",
        },
      },
      {
        id: "poach-their-people",
        label: "Skip the deal — recruit its best twenty people instead",
        outcome: {
          text:
            "Why buy the org chart when the org chart is interviewing? You run a precision raid: twenty offers, fifteen yeses, zero integration risk. The division sells to private equity as a husk. Your alumni badge collection grows by one very satisfying logo.",
          effect: { netWorth: 60_000, burnout: 15 },
          next: "y14-finalact",
        },
      },
      {
        id: "pass-stay-focused",
        label: "Pass — revenge is not a strategy, focus is",
        outcome: {
          text:
            "You write 'no' in one line and get back to the roadmap, denying yourself the poetry and keeping the discipline. The division goes to a competitor who spends two years digesting it, a distraction you watch from a distance with your metrics up and your teeth visible.",
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
      "Your lead independent director asks the question over an unhurried breakfast: 'Are you the IPO CEO, or the founder who got us here?' It's asked with love and a spreadsheet. Public-company CEOs live in earnings calls and governance committees. You live in product reviews. The two lives share a title and almost nothing else.",
    choices: [
      {
        id: "prove-youre-it",
        label: "Prove you're both — become the IPO CEO on purpose",
        outcome: {
          text:
            "You treat the gap like a syllabus: earnings-call media training, governance bootcamps, mock analyst grillings that leave marks. Eighteen months later even the skeptical director concedes the point. The founder got you here; the CEO you built on top gets you public.",
          effect: { netWorth: 100_000, burnout: 25 },
          next: "y14-finalact",
        },
      },
      {
        id: "hire-president",
        label: "Split the job — hire a president for the parts you'd fake",
        outcome: {
          text:
            "You hire a president who genuinely loves operating reviews and analyst days, and keep product, vision, and the parts of the company that have your fingerprints in the foundation. The org exhales — everyone gets the version of you that's real.",
          effect: { netWorth: 120_000, burnout: 10, title: "Founder-CEO (With a President)" },
          next: "y14-finalact",
        },
      },
      {
        id: "hand-over-chairman",
        label: "Answer honestly — hand over the chair, take chairman",
        outcome: {
          text:
            "'I'm the founder who got us here.' You promote from within, take executive chairman, and sell enough secondary to make the decision irreversible in the best way. The new CEO's first all-hands standing ovation includes you, clapping loudest, finally off the hook.",
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
      "A pre-IPO decacorn wants you as VP of Engineering — comp structured almost entirely in equity that's worth a fortune if they go public within two years and worth a story if they don't. Their S-1 is 'drafted.' Their CFO says 'imminent' the way weathermen say 'chance of rain.'",
    choices: [
      {
        id: "stay-put-safe",
        label: "Stay where you are — 'imminent' is not a comp plan",
        outcome: {
          text:
            "You pass on the parachute and keep the cash comp you can spend this decade. The decacorn's IPO happens when it happens — to other people, with their risk tolerance, on their timeline. Yours is fine. Genuinely.",
          effect: { netWorth: 90_000, burnout: 5 },
          next: "y14-legacy",
        },
      },
      {
        id: "take-equity-gig",
        label: "Take the VP seat — bet two years on 'imminent'",
        gamble: [
          {
            chance: 0.5,
            label: "IPO inside the window — the equity prints",
            text:
              "Eighteen months in, the drafted S-1 undrafts itself and the decacorn goes out strong. Your equity-heavy package converts into the largest single number of your career, and 'VP at their IPO' becomes the first line strangers know about you.",
            effect: { netWorth: 350_000, burnout: 15, title: "VP Eng (IPO Class)" },
            achievement: "big-bonus",
            next: "y14-finalact",
          },
          {
            chance: 0.5,
            label: "Postponed indefinitely — two years of paper",
            text:
              "'Imminent' survives four board meetings, two market wobbles, and one CFO transition before dying quietly in a Reuters paragraph. You ran a great org for two years at a salary your old job called 'a base.' The equity waits. It's good at that.",
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
      "A patent troll sues you personally-adjacent: your open-source library, they claim, infringes a 2004 patent on 'transmitting data via a network in an organized fashion.' Settling costs $40K and your name on their trophy wall. Fighting costs more, takes years, and is — per your lawyer — 'winnable, which is different from won.'",
    choices: [
      {
        id: "settle-quietly",
        label: "Settle — $40K makes it disappear today",
        outcome: {
          text:
            "You wire the ransom and sign the NDA, funding the troll's next dozen letters with gritted teeth. It's the rational move; everyone says so, in the tone people use for rational moves they're glad they didn't have to make.",
          effect: { netWorth: -40_000, burnout: 10 },
          next: "y14-legacy",
        },
      },
      {
        id: "fight-the-troll",
        label: "Fight — invalidate the patent, fund the precedent",
        gamble: [
          {
            chance: 0.65,
            label: "Troll crushed — patent invalidated, fees awarded",
            text:
              "Your lawyers find prior art from 1998 (a fax standard, deliciously), the patent dies on review, and the court awards fees. The maintainer community treats you like a folk hero; the troll's trophy wall loses a dozen future names. Some fights are donations to the commons.",
            effect: { netWorth: 60_000, burnout: 15 },
            next: "y14-legacy",
          },
          {
            chance: 0.35,
            label: "Two years of depositions — winning, slowly, expensively",
            text:
              "The case grinds through motions like tectonic plates. You win eventually — technically, exhaustedly — having spent triple the settlement in fees and a hundred hours explaining APIs to a court reporter. The precedent helps strangers. The invoice helps no one.",
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
      "The board meeting has one agenda item: file the S-1 now, into a market the bankers describe as 'constructive but selective' (translation: coin flip), or wait for spring and risk the window sealing entirely. Your CFO has both decks ready. She always has both decks ready.",
    choices: [
      {
        id: "wait-for-spring",
        label: "Wait for spring — file into strength or not at all",
        outcome: {
          text:
            "You hold the filing and spend the winter making the numbers unarguable. Spring arrives with a better market and a stronger story — the patient founder's small, real edge over the market's moods.",
          effect: { netWorth: 80_000, burnout: 15 },
          next: "y14-finalact",
        },
      },
      {
        id: "file-into-wind",
        label: "File now — 'constructive but selective' favors the bold",
        gamble: [
          {
            chance: 0.5,
            label: "Window holds — priced well, out clean",
            text:
              "The selective market selects you: the roadshow overbooks, pricing lands at the top of the range, and you're public before the window even wobbles. The bold-favoring coin lands heads, and your CFO frames the 'constructive but selective' email as a trophy.",
            effect: { netWorth: 300_000, burnout: 20 },
            next: "y14-finalact",
          },
          {
            chance: 0.5,
            label: "Pulled after the roadshow — public wounds, private company",
            text:
              "Eleven cities into the roadshow, the market rolls over and the book goes soft. You pull the deal with your financials already public and your competitors already reading. The company is fine. 'Fine' takes a year to feel true again.",
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
      "Pre-IPO analyst day. Aggressive forward guidance juices the valuation now and hands you a public promise to keep, quarterly, forever. Conservative guidance prices you lower and lets you beat-and-raise like a metronome. Your CRO swears the pipeline supports aggressive. Your CRO also swears at golf.",
    choices: [
      {
        id: "guide-conservative",
        label: "Guide conservative — under-promise, over-deliver, repeat",
        outcome: {
          text:
            "You set the bar where you can clear it with a backpack on, and begin the beat-and-raise cadence that public markets marry for life. The valuation starts lower and trends only one way. Metronomes get premium multiples.",
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
              "The pipeline was real: you beat the aggressive number in the first two quarters and the stock reprices like it owes you an apology. 'Management credibility' becomes your multiple's middle name. The CRO gets a boat. You get everything else.",
            effect: { netWorth: 250_000, burnout: 15 },
            next: "y14-finalact",
          },
          {
            chance: 0.45,
            label: "Miss by 4% — the credibility tax arrives",
            text:
              "One whale deal slips one quarter, and the aggressive guidance misses by a rounding error the market treats like a confession. The stock drops 30% in an afternoon; the next four quarters are spent buying back trust at retail prices. Guidance is a promise. Markets keep receipts.",
            effect: { netWorth: -60_000, burnout: 25 },
            next: "y14-finalact",
          },
        ],
      },
    ],
  },
];
